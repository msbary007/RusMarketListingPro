# RusMarket Listing Pro

RusMarket Listing Pro is an AI-powered minimal Flask application designed to analyze and optimize Russian product listings for e-commerce platforms like Ozon and Wildberries. It uses Generative AI to automatically detect grammar, case, and phrasing errors, computes a "Persuasion Score" for your text, and injects category-specific trust signals (like "официальная гарантия") to improve conversion rates!

## Setup

1. **Clone the repository** (or download the files).
2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Set up environment variables**:
   Create a `.env` file in the root directory (or use the existing one) and add your keys:
   ```env
   FLASK_APP=app.py
   FLASK_ENV=development
   
   # Provide your preferred API Key (the current application defaults to Gemini)
   # OPENAI_API_KEY=your_openai_key_here
   GEMINI_API_KEY=your_gemini_key_here
   ```
5. **Run the Flask application**:
   ```bash
   python app.py
   ```
   The app will run at `http://localhost:5000` or `http://127.0.0.1:5000`.

## How to add your own OpenAI or Gemini API key
Simply open the `.env` file within the project directory and paste your API key after the equals sign for either `OPENAI_API_KEY` or `GEMINI_API_KEY`. The application is currently configured in `app.py` to use Gemini (`google-generativeai`), so ensuring the `GEMINI_API_KEY` is set is the easiest way to start analyzing text!

## How to use the app

1. Open your browser and navigate to `http://localhost:5000`.
2. **Paste** a Russian product listing into the text area.
3. **Choose** a category from the dropdown (or use the default if not implemented in the UI yet).
4. Click **"Analyze"**.
5. The UI will process your text and display **3 tabs**:
    - **Original**: Your original text along with its computed persuasion score.
    - **Optimized**: Your text with category-specific trust signals injected, along with an updated persuasion score.
    - **All Errors**: A list of detected grammatical or stylistic errors found in the text, complete with toggleable AI explanations.
6. You can download the text or the full JSON report using the provided buttons via the UI.

## How to test

To see RusMarket Listing Pro in action, follow these minimal steps:
1. **Clone the repo** to your local machine.
2. **Create a `.env` file** in the project root and add your `GEMINI_API_KEY` or `OPENAI_API_KEY`.
3. **Run `pip install -r requirements.txt`** in your virtual environment.
4. **Run `python app.py`**.
5. **Open `http://localhost:5000`** in your browser.
6. **Try pasting Russian text** into the provided area (or try the "Load example" dropdown if you add that later!), select a category, and click "Analyze"!

## Fixing LLM errors
If you run into issues with the AI endpoint or module imports, follow these steps:
1. Create/fix `.env` with your API key.
2. Run `pip install -r requirements.txt`.
3. Check that `python app.py` starts without module or key errors.
4. Test the `/api/optimize` route in the browser or Postman with a small Russian text.

## Deployment

You can easily deploy this minimal Flask app to production platforms like **Render**, **Railway**, or **Heroku**. Just make sure to define your `.env` variables securely in your chosen platform's environment settings!
