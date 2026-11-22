/**
 * Single source of truth for everything the site, the chatbot, and the
 * downloadable PDF say about me.
 *
 * Content follows the TQL résumé track (`mahesh_Resume.docx`): Nimbus Teck and
 * Ajanta Pharma, the UMKC projects, both degrees, and the IJRAR publication.
 * Every employer, date, and metric here is lifted from that document — add
 * nothing it doesn't claim.
 */

export const profile = {
  name: "Maheshwar Rao Bandi",
  firstName: "Maheshwar",
  lastName: "Rao Bandi",
  headline: "Full Stack AI Engineer",
  roles: ["Full Stack AI Engineer", "Full Stack Engineer", "Data Scientist"],
  location: "Topeka, KS, USA",
  phone: "+1 (913) 375-3755",
  email: "maheshwarb1406@gmail.com",
  linkedin: "https://www.linkedin.com/in/bandi-maheshwar-55987a298",
  // Display form of the URL above — kept alongside it so the two can't drift.
  linkedinHandle: "/in/bandi-maheshwar-55987a298",
  summary:
    "Full stack AI engineer with 2+ years building web apps, APIs, and LLM tools with React, Next.js, FastAPI, PostgreSQL, RAG, and Google Cloud.",
  summaryLong:
    "I cut weekly manual work about 40% at Nimbus Teck and built models behind $50M+ in annual decisions at Ajanta Pharma. I care more about solving the real problem than about the tool.",
  // Verbatim "Professional Summary" paragraph from the résumé document, used by
  // the downloadable PDF and the chatbot.
  summaryResume:
    "Full stack AI engineer with 2+ years building web apps, APIs, and LLM tools with React, Next.js, FastAPI, PostgreSQL, RAG, and Google Cloud. I cut weekly manual work about 40% at Nimbus Teck and built models behind $50M+ in annual decisions at Ajanta Pharma. I care more about solving the real problem than about the tool.",
};

export const stats = [
  { value: 2, suffix: "+", label: "Years shipping web apps & AI" },
  { value: 40, prefix: "~", suffix: "%", label: "Weekly manual work cut" },
  { value: 50, prefix: "$", suffix: "M+", label: "Annual decisions informed" },
  { value: 15, suffix: "+", label: "Models shipped to production" },
];

export const marquee = [
  "Next.js",
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "FastAPI",
  "Python",
  "PostgreSQL",
  "Firestore",
  "Cloud Run",
  "Vertex AI",
  "Gemini",
  "GPT-4",
  "LLaMA",
  "RAG",
  "Vector Search",
  "Docker",
  "CI/CD",
  "n8n",
  "Snowflake",
  "Power BI",
  "Tableau",
];

export const experience = [
  {
    company: "Nimbus Teck Inc",
    location: "Topeka, KS, USA",
    period: "Sep 2025 — Present",
    start: "2025",
    role: "Full Stack Engineer",
    current: true,
    bullets: [
      "Built responsive front-end components in Next.js, React, and Tailwind CSS (JavaScript) for web applications.",
      "Developed back-end REST APIs in FastAPI (Python) with endpoints to create and retrieve records, streaming LLM features on Gemini via Vertex AI, and webhook and ETL integrations across systems.",
      "Deployed on Google Cloud: containerized services on Cloud Run with Cloud Build CI/CD from GitHub, images in Artifact Registry, and secrets in Secret Manager.",
      "Set up PostgreSQL databases with SQL schema design and queries, input validation, and sign-in-gated access.",
      "Improved search visibility with technical SEO: metadata, canonical URLs, Open Graph, JSON-LD, and sitemaps.",
      "Cut weekly manual work about 40% by automating reporting, data prep, and document handling, and shipped AI/ML models as live services with automated monitoring and retraining.",
    ],
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JavaScript",
      "FastAPI",
      "Python",
      "Gemini",
      "Vertex AI",
      "PostgreSQL",
      "Cloud Run",
      "Cloud Build",
      "Artifact Registry",
      "Secret Manager",
      "Webhooks",
      "Technical SEO",
    ],
  },
  {
    company: "Ajanta Pharma Limited",
    location: "Mumbai, India",
    period: "Jun 2022 — Jul 2023",
    start: "2022",
    role: "Data Scientist",
    current: false,
    bullets: [
      "Built AI and forecasting models that informed $50M+ in annual inventory and pricing decisions.",
      "Lifted targeted-campaign conversion 18% with customer-segmentation and recommendation systems.",
      "Shipped 15+ models to production (Docker, MLflow, CI/CD) and unified five databases into one 5TB+ data platform.",
    ],
    stack: [
      "Forecasting",
      "Customer segmentation",
      "Recommendation systems",
      "Docker",
      "MLflow",
      "CI/CD",
    ],
  },
];

export const projects = [
  {
    index: "01",
    title: "Full-Stack AI Portfolio Platform",
    org: "Personal",
    period: "2026",
    description:
      "This site. A Next.js and React front end with a streaming AI chat assistant that answers as me, recruiter sign-in with a gated résumé, nonce-based CSP headers, and technical SEO. First shipped on Google Cloud — Cloud Run via Cloud Build, Firestore, and Gemini on Vertex AI — and now running on Cloudflare Workers with D1 and Workers AI.",
    // Verbatim résumé bullets, used by the downloadable PDF.
    bullets: [
      "Built a portfolio site with an AI chatbot: Next.js and React front end, streaming Gemini chat API, Firestore, recruiter sign-in with a gated resume, CSP headers, and technical SEO, deployed on Cloud Run via Cloud Build.",
    ],
    metric: "Live — you're on it",
    metricLabel: "Status",
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Streaming chat API",
      "Cloud Run",
      "Cloud Build",
      "Firestore",
      "Vertex AI (Gemini)",
      "Cloudflare Workers",
      "D1",
      "Workers AI",
    ],
  },
  {
    index: "02",
    title: "AI-Powered Career Navigator",
    org: "UMKC",
    period: "2025",
    description:
      "A full-stack AI + RAG app — React front end, FastAPI back end, PostgreSQL — that matches résumés to jobs using LLMs (GPT-4, LLaMA, Mistral) and retrieval over embeddings and vector search. Pulls live listings from LinkedIn, Indeed, Glassdoor, and Google Jobs, with AI assistants for résumés, cover letters, and interview prep.",
    bullets: [
      "Built a full-stack AI + RAG app with a React front end, FastAPI back end, and PostgreSQL that matches resumes to jobs using LLMs (GPT-4, LLaMA, Mistral) and RAG over embeddings and vector search.",
      "Integrated LinkedIn, Indeed, Glassdoor, and Google Jobs APIs and added AI assistants for resumes, cover letters, and interview prep; deployed on AWS.",
    ],
    metric: "4 job-board APIs",
    metricLabel: "Integrations",
    stack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "GPT-4",
      "LLaMA",
      "Mistral",
      "RAG",
      "Embeddings",
      "Vector search",
      "AWS",
    ],
  },
  {
    index: "03",
    title: "Employee Feedback & Skill Prediction Platform",
    org: "UMKC",
    period: "2024",
    description:
      "A Flask app on Hugging Face Transformers and NLTK that predicts role-specific skills and employee attrition from feedback, enriched with live job-market data from SerpAPI.",
    bullets: [
      "Built a Flask app (Hugging Face Transformers, NLTK) that predicts role-specific skills and employee attrition at 87% precision and 84% F1, with live SerpAPI job-market data; deployed on Azure.",
    ],
    metric: "87% precision · 84% F1",
    metricLabel: "Attrition model",
    stack: ["Flask", "Hugging Face Transformers", "NLTK", "SerpAPI", "Azure"],
  },
];

export const skills = [
  {
    title: "Front End",
    items: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Responsive UI components",
    ],
  },
  {
    title: "Back End & APIs",
    items: [
      "FastAPI",
      "Python",
      "Node.js",
      "Next.js API routes",
      "Flask",
      "REST APIs",
      "Webhooks",
      "Authentication",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "Google Cloud (Cloud Run, Cloud Build, Secret Manager, Vertex AI)",
      "Docker",
      "CI/CD",
      "AWS",
      "Azure",
    ],
  },
  {
    title: "Databases",
    items: [
      "PostgreSQL",
      "SQL",
      "Schema design",
      "MySQL",
      "MongoDB",
      "Firestore",
      "Snowflake",
    ],
  },
  {
    title: "AI & Automation",
    items: [
      "GPT-4",
      "Gemini",
      "LLaMA",
      "RAG",
      "Embeddings",
      "Vector search",
      "n8n",
      "Notion",
      "Monday.com",
      "ClickUp",
    ],
  },
  {
    title: "SEO & Analytics",
    items: [
      "Technical SEO (metadata, Open Graph, JSON-LD, sitemaps)",
      "Tableau",
      "Power BI",
      "Plotly",
    ],
  },
];

export const education = [
  {
    degree: "M.S., Data Science & Analytics",
    school: "University of Missouri–Kansas City",
    gpa: "3.6 / 4.0",
    period: "Aug 2023 — May 2025",
  },
  {
    degree: "B.S., Computer Science & Engineering",
    school: "KL University, India",
    gpa: "8.2 / 10",
    period: "Aug 2018 — May 2022",
  },
];

export const publication = {
  title: "M-Health Using AI and Data Science",
  venue: "IJRAR (UGC-approved)",
  year: "2021",
  role: "Co-author",
  note: "Up to 85% diagnostic accuracy.",
};

/**
 * Personal / conversational Q&A that Bandi Bot answers in the first person,
 * beyond what the résumé sections above cover. Anything here is folded into
 * the assistant's knowledge automatically (`src/lib/chat.js`), so this is the
 * one place to add or correct a short personal answer.
 */
export const faq = [
  // Example shape:
  // {
  //   q: "Are you authorized to work in the US?",
  //   a: "Yes — ...",
  // },
];

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

/**
 * The three practice areas shown on the home page. Each restates real work
 * from `experience` and `projects` above — nothing is written fresh.
 */
export const domains = [
  {
    key: "web",
    title: "Full Stack Web",
    company: "Nimbus Teck Inc",
    period: "Sep 2025 — Present",
    blurb:
      "Responsive Next.js, React, and Tailwind front ends on FastAPI REST back ends, with PostgreSQL schemas, input validation, and sign-in-gated access — deployed on Google Cloud through Cloud Build CI/CD.",
    points: [
      "Next.js · React · Tailwind CSS",
      "FastAPI REST APIs + PostgreSQL",
      "Cloud Run · Cloud Build · Secret Manager",
    ],
  },
  {
    key: "ai",
    title: "AI & Automation",
    company: "Nimbus Teck · UMKC projects",
    period: "2024 — Present",
    blurb:
      "Streaming LLM features on Gemini via Vertex AI, RAG over embeddings and vector search, and automation of reporting, data prep, and document handling.",
    points: [
      "~40% less weekly manual work",
      "Streaming Gemini features",
      "RAG + vector search (Career Navigator)",
    ],
  },
  {
    key: "ds",
    title: "Data Science",
    company: "Ajanta Pharma Limited",
    period: "Jun 2022 — Jul 2023",
    blurb:
      "Forecasting, customer-segmentation, and recommendation models in production, plus five databases unified into one 5TB+ data platform.",
    points: [
      "$50M+ annual decisions informed",
      "18% campaign conversion lift",
      "15+ models shipped to production",
    ],
  },
];

/**
 * Headline outcomes for the About page. Every figure is restated from the
 * résumé — nothing is introduced that it doesn't claim.
 */
export const achievements = [
  {
    metric: "~40%",
    label: "Less weekly manual work",
    context: "Automated reporting, data prep, and documents at Nimbus Teck",
  },
  {
    metric: "$50M+",
    label: "Annual inventory & pricing decisions informed",
    context: "AI and forecasting models at Ajanta Pharma",
  },
  {
    metric: "18%",
    label: "Higher targeted-campaign conversion",
    context: "Segmentation and recommendation systems at Ajanta Pharma",
  },
  {
    metric: "15+",
    label: "Models shipped to production",
    context: "Docker, MLflow, and CI/CD at Ajanta Pharma",
  },
  {
    metric: "5TB+",
    label: "Data platform, unified from five databases",
    context: "Ajanta Pharma",
  },
  {
    metric: "87%",
    label: "Precision on attrition prediction (84% F1)",
    context: "Employee Feedback & Skill Prediction Platform, UMKC",
  },
  {
    metric: "85%",
    label: "Diagnostic accuracy, at best",
    context: "M-Health Using AI and Data Science — IJRAR, 2021",
  },
  {
    metric: "3.6",
    label: "GPA, M.S. Data Science & Analytics",
    context: "University of Missouri–Kansas City",
  },
];
