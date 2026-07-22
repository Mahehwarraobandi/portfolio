export const profile = {
  name: "Maheshwar Rao Bandi",
  firstName: "Maheshwar",
  lastName: "Rao Bandi",
  roles: [
    "Generative AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
  ],
  location: "Kansas, USA",
  phone: "+1 (913) 353-5764",
  email: "maheshwarraobandi@gmail.com",
  linkedin: "https://www.linkedin.com/in/bandi-maheshwar-55987a298",
  // Display form of the URL above — kept alongside it so the two can't drift.
  linkedinHandle: "/in/bandi-maheshwar-55987a298",
  summary:
    "AI/ML Engineer and Data Scientist with 5+ years across applied ML, deep learning, and analytics — including 2+ years shipping production Generative AI systems in financial services, logistics, pharmaceuticals, and insurance.",
  summaryLong:
    "Specialized in LLM-powered applications (RAG, agentic workflows, fine-tuning with LoRA/QLoRA), LLM evaluation and observability (Ragas, LangSmith), classical and deep ML (XGBoost, Transformers, CNNs/RNNs, time-series), and multi-cloud MLOps on AWS, Azure, and GCP. Track record of translating ambiguous business problems into measurable outcomes.",
  // Verbatim "Professional Summary" paragraph from the résumé document, used by
  // the downloadable PDF so it reproduces the file exactly. The site uses the
  // shorter summary/summaryLong split above.
  summaryResume:
    "AI/ML Engineer and Data Scientist with 5+ years across applied ML, deep learning, and analytics — including 2+ years shipping production Generative AI systems in financial services, logistics, pharmaceuticals, and insurance. Specialized in LLM-powered applications (RAG, agentic workflows, fine-tuning with LoRA/QLoRA), LLM evaluation and observability (Ragas, LangSmith), classical and deep ML (XGBoost, Transformers, CNNs/RNNs, time-series), and multi-cloud MLOps on AWS, Azure, and GCP. Track record of translating ambiguous business problems into measurable outcomes — 45% support deflection at JPMC, $1.8M annual logistics savings, $50M+ pricing decisions informed by models, and 30–70% efficiency gains across automation, forecasting, and CX.",
};

export const stats = [
  { value: 5, suffix: "+", label: "Years in applied ML" },
  { value: 45, suffix: "%", label: "Support deflection at JPMC" },
  { value: 1.8, prefix: "$", suffix: "M", label: "Annual logistics savings" },
  { value: 50, prefix: "$", suffix: "M+", label: "Pricing decisions informed" },
];

export const marquee = [
  "GPT-4o",
  "Claude 3",
  "Llama 3",
  "LangGraph",
  "RAG",
  "LoRA / QLoRA",
  "Pinecone",
  "FAISS",
  "PyTorch",
  "Hugging Face",
  "Vertex AI",
  "SageMaker",
  "Bedrock",
  "Kubernetes",
  "MLflow",
  "PySpark",
  "Airflow",
  "FastAPI",
];

export const experience = [
  {
    company: "JP Morgan Chase",
    location: "Topeka, KS, USA",
    period: "Mar 2025 — Present",
    start: "2025",
    role: "Generative AI Engineer",
    current: true,
    bullets: [
      "Architected and deployed an enterprise-scale GenAI customer-support assistant on GPT-4 with hybrid retrieval (Pinecone semantic search + FAISS reranking) over 500K+ documents — sub-200ms p95 retrieval latency, 45% lower average ticket resolution time, and 30% L1 ticket deflection.",
      "Fine-tuned Llama 3 and BERT with LoRA / QLoRA on 2M tokens of proprietary financial documentation, lifting domain QA accuracy from 68% to 91% and cutting inference cost 40% via 4-bit quantization.",
      "Built an LLM observability stack (LangSmith + MLflow + Grafana) tracking token usage, hallucination rate (Ragas), and prompt drift across 12+ production agents — improving release safety and cutting bad-output incidents in early production.",
      "Productionized generative-image pipelines (Stable Diffusion, GANs) for marketing creatives and packaging mock-ups, replacing $120K/yr in external design spend.",
      "Deployed FastAPI microservices on AWS EKS with autoscaling and blue/green CI/CD via GitHub Actions and Docker, sustaining 5K+ requests/min at 99.9% uptime; integrated Azure Cognitive Services for OCR, content moderation, and image tagging into KYC workflows; delivered SHAP-based explainability dashboards for compliance and risk stakeholders.",
    ],
    stack: [
      "OpenAI API",
      "Anthropic Claude",
      "LangChain",
      "LangSmith",
      "FAISS",
      "Pinecone",
      "Hugging Face",
      "Stable Diffusion",
      "GANs",
      "Azure Cognitive Services",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "AWS EKS / SageMaker / Bedrock",
      "MLflow",
      "Weights & Biases",
      "Streamlit",
      "Grafana",
      "Tableau",
    ],
  },
  {
    company: "GXO Logistics",
    location: "Olathe, KS, USA",
    period: "Aug 2024 — Feb 2025",
    start: "2024",
    role: "Machine Learning Engineer",
    bullets: [
      "Designed and shipped demand-forecasting and route-optimization ML models (XGBoost, Random Forest, LSTM) on GCP Vertex AI, lifting forecast accuracy by 22% and saving $1.8M annually in logistics overhead.",
      "Built an NLP-powered shipment-classification engine (BERT + spaCy) processing 1M+ daily logistics records, replacing manual triage and reducing routing errors by 35%.",
      "Engineered scalable PySpark + GCP BigQuery + Apache Airflow data pipelines processing 10TB+/day at 99.5% SLA adherence.",
      "Established the MLOps backbone with MLflow, DVC, GitHub Actions, and Vertex AI Model Registry — cutting model deployment cycle from 3 weeks to 2 days.",
      "Containerized ML services with Docker and Kubernetes (GKE), exposed REST APIs (FastAPI) consumed by warehouse-management systems and led sprint planning for a 3-engineer pod against a prioritized AI roadmap.",
    ],
    stack: [
      "Python",
      "TensorFlow",
      "Keras",
      "XGBoost",
      "FB Prophet",
      "BERT",
      "spaCy",
      "GCP Vertex AI",
      "BigQuery",
      "Apache Airflow",
      "PySpark",
      "AWS SageMaker",
      "Docker",
      "Kubernetes",
      "MLflow",
      "DVC",
      "GitHub Actions",
      "Tableau",
    ],
  },
  {
    company: "Ajanta Pharma Limited",
    location: "Mumbai, India",
    period: "May 2021 — Jul 2023",
    start: "2021",
    role: "Data Scientist",
    bullets: [
      "Developed deep-learning models (CNNs, RNNs, Transformers) for pharmaceutical image classification and adverse-event text mining, achieving 94% F1 and accelerating regulatory review cycles by 28%.",
      "Built end-to-end demand-forecasting and price-elasticity models (Random Forest, Gradient Boosting, ARIMA, Linear / Logistic Regression) that informed $50M+ of annual inventory and pricing decisions.",
      "Designed scalable data pipelines on Hadoop (HDFS, Hive, HBase) and Spark (PySpark, MLlib), unifying PostgreSQL, MySQL, Oracle, MongoDB, and Neo4j sources into a 5TB+ analytical lake.",
      "Productionized 15+ ML models via Docker, Kubernetes, MLflow, DVC, and Jenkins on AWS SageMaker, GCP Vertex AI, and Azure ML, with automated drift detection and retraining.",
      "Delivered customer-segmentation and recommendation systems (K-Means, Hierarchical Clustering, Collaborative Filtering) that boosted targeted-campaign conversion by 18%; built executive Tableau and Plotly dashboards consumed in C-suite monthly business reviews.",
    ],
    stack: [
      "Python",
      "R",
      "SQL",
      "TensorFlow",
      "PyTorch",
      "Hadoop",
      "Spark",
      "Kafka",
      "Flume",
      "Tableau",
      "Docker",
      "Kubernetes",
      "MLflow",
      "DVC",
      "Jenkins",
      "AWS SageMaker",
      "GCP Vertex AI",
      "Azure ML",
    ],
  },
  {
    company: "ICICI Prudential Life Insurance",
    location: "Mumbai, India",
    period: "Mar 2020 — Apr 2021",
    start: "2020",
    role: "Data Scientist",
    bullets: [
      "Delivered 13+ analytics projects across portfolio modeling, targeted marketing, KPI forecasting, and enterprise data products within a 20-person cross-functional program.",
      "Drove digital strategy that lifted digital transactions by 15% and improved conversion by 10%; re-architected the reporting stack with self-service BI, cutting decision-making turnaround by 70%.",
      "Deployed NLP pipelines (NLTK, spaCy, Transformers, RNN / LSTM) for sentiment analysis, topic modeling, and NER on customer-support and policy data.",
      "Productionized ML models on Azure ML, AWS SageMaker, and GCP Vertex AI using Docker, Kubernetes, Jenkins, and GitHub Actions — enabling automated, scalable AI services.",
    ],
    stack: [
      "R",
      "Python",
      "SQL Server",
      "Tableau",
      "Azure ML",
      "AWS SageMaker",
      "GCP Vertex AI",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GitHub Actions",
    ],
  },
];

export const projects = [
  {
    index: "01",
    title: "Multi-Agent Financial Research Assistant",
    description:
      "An agentic GenAI system with tool-using agents, structured-output parsing, self-reflection loops, and Pinecone-backed long-term memory orchestrating SEC-filings retrieval, statement analysis, and competitor benchmarking.",
    // Verbatim résumé bullet, used only by the downloadable PDF.
    resumeBullet:
      "Built an agentic GenAI system (LangGraph + GPT-4 + Claude) with tool-using agents, structured-output parsing, self-reflection loops, and Pinecone-backed long-term memory orchestrating SEC-filings retrieval, statement analysis, and competitor benchmarking — cutting research time from ~4 hours to ~12 minutes.",
    metric: "~4 hours → ~12 minutes",
    metricLabel: "Research time",
    stack: [
      "LangGraph",
      "OpenAI GPT-4",
      "Anthropic Claude",
      "Pinecone",
      "FastAPI",
      "Streamlit",
      "Docker",
    ],
  },
  {
    index: "02",
    title: "Domain-Tuned Medical QA Chatbot",
    description:
      "Llama 3 8B fine-tuned with QLoRA on a curated PubMed + clinical-guideline corpus, deployed as a RAG-augmented chat UI with hallucination guardrails, PII redaction, and citation grounding.",
    // Verbatim résumé bullet, used only by the downloadable PDF.
    resumeBullet:
      "Fine-tuned Llama 3 8B with QLoRA on a curated PubMed + clinical-guideline corpus and deployed a RAG-augmented chat UI with hallucination guardrails, PII redaction, and citation grounding — improved factuality (Ragas) from 0.71 → 0.89.",
    metric: "0.71 → 0.89",
    metricLabel: "Ragas factuality",
    stack: [
      "Llama 3",
      "Hugging Face PEFT / Transformers",
      "ChromaDB",
      "LangChain",
      "Gradio",
      "AWS EC2",
    ],
  },
];

export const skills = [
  {
    title: "Generative AI & LLMs",
    items: [
      "GPT-4 / 4o",
      "Claude 3",
      "Llama 3",
      "Mistral",
      "BERT",
      "T5",
      "RAG",
      "Agentic Workflows",
      "LoRA / QLoRA / PEFT",
      "RLHF",
      "Prompt Engineering",
      "Few-/Zero-shot",
      "Multimodal AI",
      "Stable Diffusion",
      "DALL·E",
    ],
  },
  {
    title: "LLM Frameworks & Tooling",
    items: [
      "LangChain",
      "LangGraph",
      "LangSmith",
      "LlamaIndex",
      "Hugging Face Transformers",
      "OpenAI API",
      "Anthropic API",
      "Cohere",
      "vLLM",
      "Gradio",
      "Streamlit",
      "FastAPI",
    ],
  },
  {
    title: "Vector Databases & Retrieval",
    items: [
      "Pinecone",
      "FAISS",
      "Weaviate",
      "ChromaDB",
      "Milvus",
      "Hybrid search",
      "Reranking",
      "Semantic chunking",
    ],
  },
  {
    title: "ML / Deep Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "CNNs",
      "RNNs / LSTMs",
      "Transformers",
      "GANs",
      "VAEs",
      "Autoencoders",
      "Diffusion",
      "Regression",
      "SVM",
      "KNN",
      "Random Forest",
      "Gradient Boosting",
      "K-Means",
      "Collaborative Filtering",
    ],
  },
  {
    title: "NLP",
    items: [
      "Transformers",
      "NLTK",
      "spaCy",
      "Gensim",
      "Sentiment analysis",
      "NER",
      "Topic modeling",
      "Text classification",
    ],
  },
  {
    title: "Data Engineering & Big Data",
    items: [
      "Apache Spark (PySpark, Spark SQL, MLlib)",
      "Hadoop (HDFS, Hive, HBase)",
      "Apache Airflow",
      "Kafka",
      "Flume",
    ],
  },
  {
    title: "Cloud & MLOps",
    items: [
      "AWS (SageMaker, Bedrock, Lambda, EC2, S3, EKS)",
      "Azure (OpenAI, ML Studio, Cognitive Services)",
      "GCP (Vertex AI, BigQuery)",
      "Docker",
      "Kubernetes",
      "MLflow",
      "DVC",
      "Weights & Biases",
      "GitHub Actions",
      "Jenkins",
    ],
  },
  {
    title: "Programming & Databases",
    items: [
      "Python",
      "SQL",
      "R",
      "Java",
      "C",
      "Bash",
      "PostgreSQL",
      "MySQL",
      "Oracle",
      "SQL Server",
      "MongoDB",
      "Neo4j",
    ],
  },
  {
    title: "Visualization & BI",
    items: [
      "Tableau",
      "Power BI",
      "Plotly",
      "Matplotlib",
      "Seaborn",
      "ggplot2",
    ],
  },
];

export const education = {
  degree: "Master of Science in Data Science",
  school: "University of Missouri, Kansas City, USA",
  gpa: "3.6 / 4.0",
  date: "May 2025",
};

/**
 * Personal / conversational Q&A that Bandi Bot answers in the first person,
 * beyond what the résumé sections above cover — work authorization, what I'm
 * looking for, how I like to work, interests outside of work, and any answers I
 * refined after testing the live bot.
 *
 * Written as questions I'd actually be asked, with answers in my own voice.
 * Anything here is folded into the assistant's knowledge automatically
 * (`src/lib/chat.js`), so this is the one place to add or correct a personal
 * answer — no code changes needed.
 */
export const faq = [
  // Example shape — replace with your real Q&A:
  // {
  //   q: "Are you authorized to work in the US?",
  //   a: "Yes — I'm based in Kansas and authorized to work in the US.",
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
 * The three practice areas shown on the home page. Each maps to real roles in
 * `experience` above — the companies, periods, and claims are lifted from
 * those entries rather than written fresh, so there is one source of truth.
 */
export const domains = [
  {
    key: "genai",
    title: "Generative AI",
    company: "JP Morgan Chase",
    period: "Mar 2025 — Present",
    blurb:
      "Enterprise GenAI support assistant on GPT-4 with hybrid retrieval over 500K+ documents. Fine-tuned Llama 3 and BERT with LoRA/QLoRA, and built the observability layer keeping 12+ production agents honest.",
    points: [
      "45% faster ticket resolution",
      "Domain QA 68% → 91%",
      "40% lower inference cost",
    ],
  },
  {
    key: "ml",
    title: "Machine Learning",
    company: "GXO Logistics",
    period: "Aug 2024 — Feb 2025",
    blurb:
      "Demand-forecasting and route-optimization models on GCP Vertex AI, plus an NLP shipment classifier over 1M+ daily records and the MLOps backbone behind them.",
    points: [
      "$1.8M saved annually",
      "22% better forecast accuracy",
      "Deploys: 3 weeks → 2 days",
    ],
  },
  {
    key: "ds",
    title: "Data Science",
    company: "Ajanta Pharma · ICICI Prudential",
    period: "Mar 2020 — Jul 2023",
    blurb:
      "Deep learning for pharmaceutical imaging and adverse-event text mining, demand and price-elasticity modelling, and 13+ analytics products across portfolio modelling and forecasting.",
    points: [
      "94% F1 on classification",
      "$50M+ pricing decisions informed",
      "28% faster regulatory review",
    ],
  },
];

/**
 * Headline outcomes for the About page. Every figure here is restated from a
 * bullet in `experience` — nothing is introduced that the résumé doesn't claim.
 */
export const achievements = [
  {
    metric: "45%",
    label: "Lower ticket resolution time",
    context: "GenAI support assistant at JP Morgan Chase",
  },
  {
    metric: "$1.8M",
    label: "Annual logistics savings",
    context: "Demand forecasting and route optimization at GXO",
  },
  {
    metric: "91%",
    label: "Domain QA accuracy, up from 68%",
    context: "LoRA/QLoRA fine-tuning on 2M tokens of financial docs",
  },
  {
    metric: "$50M+",
    label: "Pricing decisions informed",
    context: "Elasticity and demand models at Ajanta Pharma",
  },
  {
    metric: "10TB+",
    label: "Daily pipeline throughput at 99.5% SLA",
    context: "PySpark, BigQuery, and Airflow at GXO",
  },
  {
    metric: "99.9%",
    label: "Uptime at 5K+ requests/min",
    context: "FastAPI microservices on AWS EKS",
  },
  {
    metric: "94%",
    label: "F1 on pharmaceutical classification",
    context: "CNNs, RNNs, and Transformers at Ajanta Pharma",
  },
  {
    metric: "70%",
    label: "Faster decision turnaround",
    context: "Self-service BI rebuild at ICICI Prudential",
  },
];
