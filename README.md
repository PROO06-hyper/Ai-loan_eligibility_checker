# LoanSense AI — AI-Powered Loan & Credit Decision Platform
Live Demo : https://ai-loan-eligibility-checker-zeta.vercel.app/

Documentation: https://github.com/PROO06-hyper/Ai-loan_eligibility_checker/blob/main/Ai_Loan_Eligibility_Checker_8_Page_College_Format.docx

LoanSense AI is an AI-powered **BFSI (Banking, Financial Services & Insurance)** web platform designed to simplify financial decision-making through intelligent loan analysis, credit evaluation, EMI optimization, and personalized financial guidance.

The platform combines **AI-driven financial analysis, credit insights, loan calculations, Google authentication, and Google Sheets integration** into a single modern dashboard.

---

## 🚀 Key Features

### 💰 AI Loan Eligibility Checker
Evaluate loan eligibility using multiple financial parameters such as:

- Monthly income
- Existing EMIs and obligations
- Requested loan amount
- Loan tenure
- Employment type
- Loan category
- Estimated credit score
- Co-applicant income
- FOIR / DTI ratio

The system generates an AI-powered underwriting report containing:

- Underwriting verdict
- Executive financial summary
- Strengths
- Risk factors
- Recommended action plan
- Optimal loan structure
- Recommended loan amount
- Suggested tenure
- Interest-rate range
- Maximum recommended EMI
- Bank negotiation tips

---

### 📊 Credit Score Analyzer

Analyze a user's credit profile based on:

- Credit score
- Payment history
- Credit utilization
- Credit age
- Number of credit accounts
- Recent hard inquiries

The AI generates:

- Credit bureau tier
- Score health diagnosis
- Factor-by-factor analysis
- Potential score improvement estimate
- 30/60/90-day recovery roadmap
- Common mistakes to avoid

---

### 🧮 EMI Calculator & Optimizer

Calculate and analyze loan repayment scenarios using:

- Loan principal
- Interest rate
- Loan tenure
- Monthly EMI
- Total interest
- Total repayment

Users can also evaluate the impact of **additional monthly prepayments** and receive AI-based EMI optimization recommendations.

---

### 🤖 AI Financial Tips

The platform provides personalized AI-generated financial guidance based on the user's selected financial focus and profile.

Possible areas include:

- Credit improvement
- Loan planning
- Debt management
- EMI optimization
- Financial planning

---

### 🏦 Google Sheets Financial Vault

Loan, credit, and EMI records can be synchronized with Google Sheets.

The application can create dedicated sheets for:

- `Loan_Eligibility`
- `Credit_Profiles`
- `EMI_Schedules`

This allows users to maintain structured financial assessment records and review historical data.

---

### 🔐 Google Authentication

The application supports Google authentication using Firebase.

Authenticated users can connect their Google account and access Google Sheets functionality.

---

## 🛠️ Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express
- TypeScript

### AI

- Google Gemini API
- AI-powered loan underwriting
- AI credit analysis
- AI EMI optimization
- AI financial advisor

### Authentication

- Firebase Authentication
- Google Sign-In

### Data & Integrations

- Google Sheets API
- Browser Local Storage

### Development

- Bun
- Vite
- TypeScript

---

## 📁 Project Structure

```text
Ai-loan_eligibility_checker-main/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── AiFinancialTips.tsx
│   │   ├── ConfirmationModal.tsx
│   │   ├── CreditScoreAnalyzer.tsx
│   │   ├── EmiCalculator.tsx
│   │   ├── GoogleSheetsVault.tsx
│   │   ├── Header.tsx
│   │   ├── HeroBanner.tsx
│   │   └── LoanEligibilityChecker.tsx
│   │
│   ├── services/
│   │   ├── aiApi.ts
│   │   ├── firebaseAuth.ts
│   │   └── googleSheets.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── server.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
└── firebase-applet-config.json
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

### 2. Install Dependencies

Using Bun:

```bash
bun install
```

Or using npm:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file using the provided example:

```bash
cp .env.example .env
```

Add the required API configuration to your `.env` file.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Do **not** commit your `.env` file or expose private API keys in the repository.

---

## ▶️ Run the Application

### Development

Using Bun:

```bash
bun run dev
```

Or:

```bash
npm run dev
```

The Vite development server will start the application locally.

---

## 🧠 AI Architecture

The application uses a frontend-to-backend architecture for AI requests.

```text
User
  │
  ▼
React Frontend
  │
  ├── Loan Eligibility
  ├── Credit Analyzer
  ├── EMI Optimizer
  ├── Financial Tips
  └── AI Advisor
  │
  ▼
Express API Server
  │
  ▼
Gemini AI
  │
  ▼
Structured Financial Analysis
  │
  ▼
React Dashboard
```

The frontend communicates with backend API endpoints rather than directly exposing the AI API key.

---

## 🔌 API Endpoints

The backend provides AI-related endpoints including:

```text
POST /api/ai/loan-eligibility
POST /api/ai/credit-analyzer
POST /api/ai/emi-optimizer
POST /api/ai/financial-tips
POST /api/ai/advisor-chat
```

### Loan Eligibility

```text
/api/ai/loan-eligibility
```

Analyzes income, obligations, loan amount, tenure, credit score, FOIR/DTI and other applicant information.

### Credit Analyzer

```text
/api/ai/credit-analyzer
```

Evaluates credit score health and provides an improvement roadmap.

### EMI Optimizer

```text
/api/ai/emi-optimizer
```

Analyzes repayment scenarios and additional monthly payments.

### Financial Tips

```text
/api/ai/financial-tips
```

Generates personalized financial recommendations.

### AI Financial Advisor

```text
/api/ai/advisor-chat
```

Provides conversational financial guidance based on the supplied user context.

---

## 🔄 Application Workflow

```text
1. User enters financial information
              ↓
2. Application calculates financial metrics
              ↓
3. Data is sent to the backend
              ↓
4. Backend sends structured prompt to Gemini AI
              ↓
5. AI generates financial analysis
              ↓
6. Backend returns structured JSON
              ↓
7. React displays the results
              ↓
8. User can save assessment records
              ↓
9. Records can be synchronized with Google Sheets
```

---

## 📌 Important Financial Metrics

### FOIR / DTI

The platform uses debt-to-income style calculations to estimate how much of the user's income is already committed to debt obligations.

A lower ratio generally indicates greater repayment capacity.

### EMI

The EMI calculator helps users understand:

- Monthly repayment
- Total interest
- Total repayment
- Effect of loan tenure
- Effect of additional payments

### Credit Utilization

Credit utilization is analyzed as part of the overall credit profile to identify potential areas for improvement.

---

## 🔒 Security & Privacy

The project follows several basic security practices:

- API keys should be stored in environment variables.
- `.env` should not be committed to GitHub.
- AI requests are handled through the backend.
- Firebase is used for authentication.
- Google Sheets access uses authenticated Google API access.
- Session-level records may be stored using browser Local Storage.

> **Important:** This project is intended for educational, demonstration, and financial-analysis purposes. AI-generated results should not be treated as official loan approvals, credit decisions, or professional financial advice.

---

## 🎯 Use Cases

LoanSense AI can be useful for:

- Loan eligibility estimation
- Personal financial planning
- Credit profile analysis
- EMI planning
- Debt repayment analysis
- Financial education
- BFSI technology demonstrations
- FinTech projects
- AI-powered banking prototypes

---

## 🌟 Future Enhancements

Possible future improvements include:

- Real-time credit bureau integration
- Bank account aggregation
- Real lender/product comparison
- Advanced risk scoring models
- Explainable AI decisioning
- Loan document verification
- OCR-based financial document processing
- Fraud detection
- Multi-user financial dashboards
- Advanced analytics and visualizations
- Automated financial reports
- Mobile application
- Production-grade database integration

---

## 🏗️ Project Vision

**LoanSense AI** aims to demonstrate how AI can be combined with traditional financial calculations and digital banking infrastructure to create faster, more transparent, and user-friendly financial decision-support systems.

The goal is not simply to calculate whether someone can take a loan, but to provide a broader view of:

**Eligibility → Credit Health → EMI → Risk → Optimization → Financial Guidance**

---

## 📸 Screenshots

Add your project screenshots here:

```markdown
![Loan Eligibility Dashboard](screenshots/loan-dashboard.png)

![Credit Score Analyzer](screenshots/credit-analyzer.png)

![EMI Calculator](screenshots/emi-calculator.png)

![AI Financial Advisor](screenshots/ai-advisor.png)
```

---

## 🤝 Contributing

Contributions are welcome.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 📄 License

This project can be used for educational and development purposes. Add an appropriate open-source license such as MIT if you intend to distribute the project under an open-source license.

---

## 👨‍💻 Author

**Pravesh Dupare**

AI • FinTech • BFSI • Web Development • Machine Learning

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
