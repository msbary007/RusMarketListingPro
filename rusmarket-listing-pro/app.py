import os
import json
import random
import sys
import io

try:
    import pdfplumber
    HAS_PDF = True
except ImportError:
    HAS_PDF = False
    pdfplumber = None

try:
    import docx
    HAS_DOCX = True
except ImportError:
    HAS_DOCX = False
    docx = None

try:
    from flask import Flask, jsonify, request, render_template # type: ignore
    from dotenv import load_dotenv # type: ignore
    load_dotenv()
except ImportError:
    print("Run pip install -r requirements.txt if you see import errors.")
    sys.exit(1)

try:
    import google.generativeai as genai # type: ignore
    HAS_GENAI = True
except ImportError:
    print("Run pip install -r requirements.txt if you see import errors.")
    HAS_GENAI = False
    genai = None # type: ignore

app = Flask(__name__)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not (OPENAI_API_KEY or GEMINI_API_KEY):
    print("⚠️ Warning: no OpenAI or Gemini API key found. Set OPENAI_API_KEY or GEMINI_API_KEY in .env.")

if HAS_GENAI and GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY) # type: ignore

def analyze_russian_text(text, category):
    if not text.strip() or not GEMINI_API_KEY or not HAS_GENAI:
        return []
        
    model = genai.GenerativeModel('gemini-2.5-flash', generation_config={"response_mime_type": "application/json"}) # type: ignore
    
    prompt = f"""Analyze this Russian product listing for grammar, case, gender, and word-order errors and return a JSON list of errors.
Each error must have these keys:
- original_phrase
- suggested_correction
- explanation_ru
- type

Category: {category}
Text: {text}
"""
    try:
        response = model.generate_content(prompt)
        result = json.loads(response.text)
        
        if isinstance(result, list):
            return result
        elif isinstance(result, dict):
            for v in result.values():
                if isinstance(v, list):
                    return v
        return []
    except Exception as e:
        print(f"Error calling Gemini AI: {e}")
        return []

def compute_persuasion_score(text):
    if not text.strip() or not GEMINI_API_KEY or not HAS_GENAI:
        return 0
        
    model = genai.GenerativeModel('gemini-2.5-flash') # type: ignore
    
    prompt = f"""Evaluate the persuasiveness of this Russian product description. Consider clarity, trustworthiness, urgency, emotional appeal, and call-to-action. Return a single integer score from 0 to 100. DO NOT return any text other than the integer.

Text: {text}
"""
    try:
        response = model.generate_content(prompt)
        score_text = response.text.strip()
        # Extract just the digits
        score = int(''.join(filter(str.isdigit, score_text)))
        # Clamp to 0-100
        return max(0, min(100, score))
    except Exception as e:
        print(f"Error computing score with Gemini AI: {e}")
        return 0

def inject_trust_signals(text, category):
    try:
        config_path = os.path.join(os.path.dirname(__file__), 'config', 'categories.json')
        with open(config_path, 'r', encoding='utf-8') as f:
            categories = json.load(f)
            
        signals = categories.get(category, [])
        if not signals:
            return text, []
            
        # Pick 2-3 random signals if available
        num_signals = min(random.randint(2, 3), len(signals))
        selected_signals = random.sample(signals, num_signals)
        
        # Append them to the text
        if selected_signals:
            signals_text = " • ".join(selected_signals)
            text = f"{text}\n\nПреимущества: {signals_text}"
            
        return text, selected_signals
    except Exception as e:
        print(f"Error loading trust signals: {e}")
        return text, []

def extract_text_from_pdf(file_stream):
    if not HAS_PDF:
        return "Error: pdfplumber library not installed."
    try:
        with pdfplumber.open(file_stream) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() or ""
            return text.strip()
    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        return ""

def extract_text_from_docx(file_stream):
    if not HAS_DOCX:
        return "Error: python-docx library not installed."
    try:
        doc = docx.Document(file_stream)
        text = "\n".join([para.text for para in doc.paragraphs])
        return text.strip()
    except Exception as e:
        print(f"Error extracting DOCX text: {e}")
        return ""

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/optimize", methods=["POST"])
def optimize():
    if not GEMINI_API_KEY or not HAS_GENAI:
        return jsonify({
            "error": "AI API key is missing. Please configure .env and restart the app."
        })

    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400
    
    text = data.get("text", "")
    category = data.get("category", "")
    
    errors = analyze_russian_text(text, category)
    
    # We don't have a real strict LLM optimization step yet, so we just use the original text for now
    optimized_text = text 
    
    # Inject trust signals
    optimized_text, added_signals = inject_trust_signals(optimized_text, category)
    
    score_original = compute_persuasion_score(text)
    score_optimized = compute_persuasion_score(optimized_text)
    
    return jsonify({
        "original": text,
        "optimized": optimized_text,
        "errors": errors,
        "persuasion_score_original": score_original,
        "persuasion_score_optimized": score_optimized,
        "trust_signals_added": added_signals
    })

@app.route("/api/upload", methods=["POST"])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    filename = file.filename.lower()
    file_stream = io.BytesIO(file.read())
    
    text = ""
    if filename.endswith('.pdf'):
        text = extract_text_from_pdf(file_stream)
    elif filename.endswith('.docx') or filename.endswith('.doc'):
        # Note: python-docx handles .docx only. .doc is legacy and harder to parse without COM/office installed.
        # We'll try python-docx for .docx and warn for .doc
        if filename.endswith('.docx'):
            text = extract_text_from_docx(file_stream)
        else:
             return jsonify({"error": "Legacy .doc files are not supported. Please use .pdf or .docx"}), 400
    elif filename.endswith('.txt'):
        text = file_stream.getvalue().decode('utf-8', errors='ignore')
    else:
        return jsonify({"error": "Unsupported file format. Please use .pdf, .docx, or .txt"}), 400
        
    if not text:
        return jsonify({"error": "Could not extract text from the file or file is empty"}), 400
        
    return jsonify({"text": text})

@app.route("/api/examples", methods=["GET"])
def get_examples():
    try:
        config_path = os.path.join(os.path.dirname(__file__), 'config', 'examples.json')
        with open(config_path, 'r', encoding='utf-8') as f:
            return jsonify(json.load(f))
    except Exception as e:
        print(f"Error loading examples: {e}")
        return jsonify([])

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
