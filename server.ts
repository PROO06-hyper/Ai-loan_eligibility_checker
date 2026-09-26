import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AI Loan Eligibility & BFSI Platform',
    timestamp: new Date().toISOString(),
  });
});

// 1. AI Loan Underwriting & Eligibility Deep Analysis
app.post('/api/ai/loan-eligibility', async (req, res) => {
  try {
    const {
      monthlyIncome,
      existingEmi,
      loanAmountRequested,
      tenureYears,
      loanType,
      employmentType,
      creditScoreEstimate,
      coApplicantIncome,
      currencySymbol,
      calculatedFoir,
      calculatedMaxLoan,
      calculatedApprovalChance,
    } = req.body;

    const prompt = `You are a Senior BFSI Underwriting Credit Officer and Financial AI Analyst.
Analyze the following loan application dossier:
- Currency: ${currencySymbol || '$'}
- Monthly Net Income: ${currencySymbol}${monthlyIncome}
- Existing Monthly Obligations / EMI: ${currencySymbol}${existingEmi}
- Co-Applicant Income: ${currencySymbol}${coApplicantIncome || 0}
- Total Household Effective Income: ${currencySymbol}${Number(monthlyIncome) + Number(coApplicantIncome || 0)}
- Requested Loan Amount: ${currencySymbol}${loanAmountRequested}
- Requested Tenure: ${tenureYears} years
- Loan Category: ${loanType}
- Employment Classification: ${employmentType}
- Estimated Credit Score: ${creditScoreEstimate}
- Estimated Debt-to-Income / FOIR: ${calculatedFoir}%
- Mathematical Max Loan Capacity: ${currencySymbol}${calculatedMaxLoan}
- Algorithmic Approval Probability: ${calculatedApprovalChance}%

Provide an executive underwriter's report in pure JSON format (valid RFC 8259 JSON, no markdown codeblocks, no surrounding text).
The JSON must follow this exact schema:
{
  "underwritingVerdict": "Approved" | "Conditional Approval" | "High Risk / Caution" | "Declined",
  "executiveSummary": "2-3 crisp sentences summarizing the applicant's financial health, debt capacity, and bank risk appetite.",
  "strengths": ["string", "string", "string"],
  "riskFactors": ["string", "string"],
  "recommendedActionPlan": [
    {
      "step": "string (e.g. Extend tenure, add co-borrower, pay down revolving card)",
      "impact": "string (e.g. Drops FOIR by 8%, increases loan eligibility by $25,000)"
    }
  ],
  "optimalLoanStructure": {
    "recommendedAmount": number,
    "recommendedTenureMonths": number,
    "suggestedInterestRateRange": "string (e.g. 7.2% - 8.5%)",
    "recommendedMaxEmi": number
  },
  "bankNegotiationTip": "One strategic tip for negotiating lower processing fees or margin spread with lenders."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);
    res.json({ success: true, analysis: parsedData });
  } catch (error: any) {
    console.error('Error generating loan eligibility analysis:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate loan underwriting report',
    });
  }
});

// 2. AI Credit Score Diagnostic & Score Boosting Plan
app.post('/api/ai/credit-analyzer', async (req, res) => {
  try {
    const {
      creditScore,
      paymentHistoryPct,
      creditUtilizationPct,
      creditAgeYears,
      totalAccounts,
      hardInquiries,
      currencySymbol,
    } = req.body;

    const prompt = `You are a Credit Bureau Specialist and Consumer Credit Strategist (FICO & CIBIL methodology).
Analyze the consumer's credit profile:
- Credit Score: ${creditScore}
- On-Time Payment History: ${paymentHistoryPct}%
- Revolving Credit Utilization Ratio: ${creditUtilizationPct}%
- Average Credit Account Age: ${creditAgeYears} years
- Total Active Accounts: ${totalAccounts}
- Hard Inquiries in past 12 months: ${hardInquiries}

Return a detailed, actionable credit enhancement report in pure JSON format (valid RFC 8259 JSON, no markdown codeblocks, no surrounding text).
The JSON must follow this exact schema:
{
  "bureauTier": "Exceptional" | "Very Good" | "Good" | "Fair" | "Poor",
  "scoreHealthDiagnosis": "2-3 sentences diagnosing primary factors influencing this score band.",
  "factorBreakdown": [
    {
      "factorName": "Payment History (35% weight)",
      "status": "Optimal" | "Caution" | "Critical",
      "observation": "string",
      "targetBenchmark": "string"
    },
    {
      "factorName": "Credit Utilization (30% weight)",
      "status": "Optimal" | "Caution" | "Critical",
      "observation": "string",
      "targetBenchmark": "string"
    },
    {
      "factorName": "Credit Age & Mix (25% weight)",
      "status": "Optimal" | "Caution" | "Critical",
      "observation": "string",
      "targetBenchmark": "string"
    },
    {
      "factorName": "New Inquiries (10% weight)",
      "status": "Optimal" | "Caution" | "Critical",
      "observation": "string",
      "targetBenchmark": "string"
    }
  ],
  "potentialScoreGainEstimate": "string (e.g. +35 to +60 points within 90 days)",
  "recoveryRoadmap": {
    "day30Action": "Specific tactical action for month 1",
    "day60Action": "Specific tactical action for month 2",
    "day90Action": "Specific tactical action for month 3"
  },
  "topMistakeToAvoid": "One critical pitfall that would damage this specific profile (e.g. closing oldest credit card)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);
    res.json({ success: true, analysis: parsedData });
  } catch (error: any) {
    console.error('Error generating credit analysis:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate credit analysis',
    });
  }
});

// 3. AI EMI & Prepayment Optimizer
app.post('/api/ai/emi-optimizer', async (req, res) => {
  try {
    const {
      loanAmount,
      interestRate,
      tenureMonths,
      monthlyEmi,
      totalInterest,
      totalPayment,
      prepaymentExtraMonthly,
      currencySymbol,
    } = req.body;

    const prompt = `You are a Wealth Management and Debt Restructuring Advisor.
Evaluate the consumer's loan amortization profile:
- Principal Loan: ${currencySymbol || '$'}${loanAmount}
- Annual Interest Rate: ${interestRate}%
- Loan Tenure: ${tenureMonths} months (${(tenureMonths / 12).toFixed(1)} years)
- Base Monthly EMI: ${currencySymbol || '$'}${monthlyEmi}
- Total Interest Over Term: ${currencySymbol || '$'}${totalInterest}
- Total Repayment Amount: ${currencySymbol || '$'}${totalPayment}
- Optional Monthly Extra Prepayment: ${currencySymbol || '$'}${prepaymentExtraMonthly || 0}

Return an amortization optimization analysis in pure JSON format (valid RFC 8259 JSON, no markdown codeblocks, no surrounding text).
The JSON must follow this exact schema:
{
  "interestToPrincipalRatio": "string (e.g. Interest constitutes 38% of total outflow)",
  "verdictOnTenure": "string (commentary on whether tenure is optimal, too aggressive, or unnecessarily dragging)",
  "prepaymentStrategy": {
    "recommendedPrepaymentType": "Monthly Extra" | "Annual Lump Sum" | "Step-Up EMI (5% yearly)",
    "estimatedSavingsInsight": "string",
    "breakevenTenureCutMonths": number
  },
  "taxAndDeductionGuidance": "string detailing common tax shields (such as mortgage interest deductions, Section 24b/80C or local equivalents)",
  "refinancingTrigger": "string indicating when market rates drop by X% that applicant should refinance"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);
    res.json({ success: true, analysis: parsedData });
  } catch (error: any) {
    console.error('Error generating EMI optimization:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate EMI optimization',
    });
  }
});

// 4. AI Financial Tips & Personalized BFSI Advice
app.post('/api/ai/financial-tips', async (req, res) => {
  try {
    const { focusCategory, userProfileSummary } = req.body;

    const prompt = `You are an elite BFSI (Banking, Financial Services & Insurance) Strategist.
Generate 4 advanced, highly practical financial intelligence tips focused on: ${focusCategory || 'General Debt & Wealth Management'}.
Context about user: ${userProfileSummary || 'Middle-to-upper income borrower seeking to maximize borrowing power, minimize interest expense, and protect net worth.'}

Return pure JSON format (valid RFC 8259 JSON, no markdown codeblocks, no surrounding text):
{
  "category": "${focusCategory || 'Loan Optimization'}",
  "tips": [
    {
      "title": "string (punchy, professional title)",
      "tagline": "string (1 sentence summary)",
      "explanation": "string (2-3 crisp sentences detailing the tactical mechanic)",
      "financialImpact": "string (e.g. Save $4,200 in interest or boost borrowing power by 15%)",
      "difficulty": "Easy" | "Medium" | "Advanced"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);
    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error generating financial tips:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate financial tips',
    });
  }
});

// 5. Interactive Financial Copilot AI Chat
app.post('/api/ai/advisor-chat', async (req, res) => {
  try {
    const { messages, userContext } = req.body;

    const systemInstruction = `You are the AI Financial Advisor & BFSI Copilot on an executive loan eligibility and banking advisory platform.
You possess deep knowledge of credit underwriting, mortgages, personal loans, credit bureau algorithms (FICO, CIBIL, Experian), debt-to-income (DTI/FOIR) limits, interest rate spreads, and tax optimization.
Always provide grounded, mathematically rigorous, and practical guidance.
Maintain a professional, polished, encouraging tone.
When calculations are relevant, explain the underlying formula clearly.
Current User Context: ${JSON.stringify(userContext || {})}.
Keep responses well-structured with concise paragraphs, bullet points where appropriate, and clear takeaways.`;

    const formattedContents = (messages || []).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
      },
    });

    res.json({
      success: true,
      message: response.text || 'I analyzed your request. How else can I assist with your financing plan?',
    });
  } catch (error: any) {
    console.error('Error in advisor chat:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to process financial advisor response',
    });
  }
});

// Server configuration & static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BFSI AI Loan Platform server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
