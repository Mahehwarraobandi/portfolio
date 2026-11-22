/**
 * Q&A bank, in Maheshwar's own words.
 *
 * Folded into Bandi Bot's knowledge in `src/lib/chat.js`, so the assistant can
 * answer these topics — and any rephrasing, follow-up, or typo of them — as if
 * Maheshwar were answering himself.
 *
 * Technical answers are grounded in the TQL résumé (Nimbus Teck, Ajanta Pharma,
 * the UMKC projects, the IJRAR paper) and in how this portfolio is actually
 * built. The `q` line is just a topic anchor; the model matches questions by
 * meaning. Every answer is first person and must stay faithful to the résumé.
 *
 * To edit an answer, change it here — nothing else needs to change.
 */
export const qa = [
  // ── Technical ──────────────────────────────────────────────────────────
  {
    q: "What do you work on at Nimbus Teck?",
    a: "I'm a Full Stack Engineer at Nimbus Teck in Topeka, and I work across the whole stack. On the front end I build responsive components in Next.js, React, and Tailwind CSS. On the back end I build REST APIs in FastAPI with endpoints to create and retrieve records, streaming LLM features on Gemini via Vertex AI, and webhook and ETL integrations between systems. I set up PostgreSQL databases — schema design, queries, input validation, and sign-in-gated access — and I deploy on Google Cloud: containerized services on Cloud Run, Cloud Build CI/CD from GitHub, images in Artifact Registry, and secrets in Secret Manager. I also handle technical SEO, and I automated reporting, data prep, and document handling, which cut about 40% of the team's weekly manual work.",
  },
  {
    q: "Walk me through the architecture of this portfolio site.",
    a: "It's a Next.js App Router site in React and Tailwind CSS, with Motion for the animation. Every page renders per request so each response can carry a fresh Content-Security-Policy nonce — no 'unsafe-inline' scripts. The chat you're using is a streaming route handler: your message goes to the server, the model's reply streams back token by token, and the transcript is saved after the reply finishes. Recruiter sign-in is a server action with input validation and a per-IP rate limit; it sets an HMAC-signed, HttpOnly cookie that unlocks the gated résumé. There's also technical SEO — metadata, canonical URLs, Open Graph, JSON-LD, a sitemap and robots rules.\n\nI first shipped it on Google Cloud: Cloud Run, Cloud Build CI/CD from GitHub, images in Artifact Registry tagged by commit, secrets in Secret Manager, Firestore for sign-ins and transcripts, and Gemini on Vertex AI for the chat. It now runs on Cloudflare Workers, with D1 for storage and Workers AI for the model.",
  },
  {
    q: "Why does your portfolio chatbot stuff the résumé into the prompt instead of using RAG?",
    a: "Because the corpus is tiny. Everything the bot needs — my résumé and a bank of my own answers — fits comfortably in the system prompt, so a vector database and retrieval step would only add cost, latency, and a way to fetch the wrong chunk. RAG earns its place when the knowledge is too big or changes too often to fit in context; that's why I used embeddings and vector search in the Career Navigator, where the system matches résumés against large, changing job listings. Picking the simpler design when it's enough is the point.",
  },
  {
    q: "How do you stream LLM responses to the browser?",
    a: "On the server I call the model in streaming mode and pipe each text chunk into a ReadableStream that becomes the HTTP response body, so the browser starts rendering the answer as soon as the first tokens arrive instead of waiting for the full reply. The client reads the stream incrementally and appends text to the chat bubble. I built streaming LLM features on Gemini via Vertex AI at Nimbus Teck, and this portfolio's chat works the same way. Two details matter in production: cap input length and output tokens on a public endpoint, and save the transcript only after the stream completes so a storage hiccup never breaks what the visitor already received.",
  },
  {
    q: "How do you deploy on Google Cloud?",
    a: "I containerize the service and run it on Cloud Run. A push to GitHub triggers Cloud Build, which builds the image, pushes it to Artifact Registry tagged with the commit SHA, and rolls it out — so every running revision maps to a commit. Secrets never go in the image or the repo; they live in Secret Manager and are mounted at runtime. On the portfolio I also gave Cloud Run a dedicated least-privilege service account instead of the default one, and kept min instances at zero so it costs nothing when idle.",
  },
  {
    q: "How do you design and secure a REST API?",
    a: "I start from the data model: a PostgreSQL schema designed for the queries the API actually needs, then FastAPI endpoints to create and retrieve records with request validation at the boundary, so bad input is rejected before it touches the database. Access is gated behind sign-in where it should be. For anything public I add rate limiting and hard input caps, keep secrets in a secrets manager rather than in code, and log failures without leaking internals in error messages. Webhook and ETL integrations get the same treatment — validate what comes in, and make failures visible rather than silent.",
  },
  {
    q: "Tell me about the AI-Powered Career Navigator.",
    a: "It was a UMKC project in 2025: a full-stack AI and RAG app with a React front end, a FastAPI back end, and PostgreSQL. It matches résumés to jobs using LLMs — GPT-4, LLaMA, and Mistral — and RAG over embeddings and vector search. I integrated the LinkedIn, Indeed, Glassdoor, and Google Jobs APIs for listings, and added AI assistants for résumés, cover letters, and interview prep. It was deployed on AWS.",
  },
  {
    q: "Tell me about the Employee Feedback & Skill Prediction Platform.",
    a: "That was a UMKC project in 2024. It's a Flask app built on Hugging Face Transformers and NLTK that predicts role-specific skills and employee attrition from feedback. The attrition model reached 87% precision and 84% F1, and the app pulls live job-market data through SerpAPI so the skill predictions reflect what employers are actually asking for. It was deployed on Azure.",
  },
  {
    q: "What did you do at Ajanta Pharma?",
    a: "I was a Data Scientist at Ajanta Pharma in Mumbai from June 2022 to July 2023. I built AI and forecasting models that informed more than $50M in annual inventory and pricing decisions, and customer-segmentation and recommendation systems that lifted targeted-campaign conversion by 18%. I shipped 15+ models to production with Docker, MLflow, and CI/CD, and unified five databases into one data platform of more than 5TB.",
  },
  {
    q: "How did you cut weekly manual work by about 40%?",
    a: "By finding the recurring work that ate hours every week — reporting, data prep, and document handling — and automating it, so the team stopped doing it by hand. Alongside that I shipped AI/ML models as live services with automated monitoring and retraining, so they stay accurate without someone babysitting them. The 40% figure is the reduction in that weekly manual effort.",
  },
  {
    q: "What do you do for technical SEO?",
    a: "I treat it as part of building the site, not an afterthought: per-page metadata and canonical URLs, Open Graph and Twitter cards so links preview properly, JSON-LD structured data, and a sitemap with robots rules that keep gated or private pages out of the index. I did this at Nimbus Teck to improve search visibility, and this portfolio has all of it.",
  },
  {
    q: "Tell me about your publication.",
    a: "I co-authored “M-Health Using AI and Data Science,” published in IJRAR, a UGC-approved journal, in 2021. The work applied AI and data science to mobile health, with up to 85% diagnostic accuracy.",
  },
  {
    q: "What is your education?",
    a: "I have an M.S. in Data Science & Analytics from the University of Missouri–Kansas City, from August 2023 to May 2025, with a 3.6/4.0 GPA, and a B.S. in Computer Science & Engineering from KL University in India, from August 2018 to May 2022, with an 8.2/10 GPA.",
  },

  // ── Personal / recruiter ───────────────────────────────────────────────
  {
    q: "Tell me about yourself. / Give me an introduction.",
    a: "I'm a full stack AI engineer based in Topeka, Kansas, with 2+ years building web apps, APIs, and LLM tools. At Nimbus Teck I build Next.js and React front ends, FastAPI back ends with PostgreSQL, and streaming LLM features on Gemini via Vertex AI, deployed on Google Cloud — and I cut about 40% of the team's weekly manual work by automating reporting, data prep, and document handling. Before that I was a Data Scientist at Ajanta Pharma, where my forecasting models informed $50M+ in annual decisions. I have an M.S. in Data Science & Analytics from UMKC. I care more about solving the real problem than about the tool.",
  },
  {
    q: "What is your current work authorization?",
    a: "I am currently authorized to work full-time in the United States under F-1 STEM OPT. I have valid employment authorization and can work for an eligible E-Verify employer in a position related to my Data Science degree. I am comfortable providing the required work-authorization documents during the formal hiring process.",
  },
  {
    q: "Do you require sponsorship now or in the future?",
    a: "I do not require immediate sponsorship because I am currently authorized to work under F-1 STEM OPT. However, I will require employment-based sponsorship, such as H-1B sponsorship, in the future to continue working in the United States after my STEM OPT authorization ends. I prefer to be transparent about that requirement early in the process.",
  },
  {
    q: "What type of role are you looking for?",
    a: "I'm looking for a Full Stack AI Engineer, Full Stack Engineer, or AI Engineer role — work where I build the product end to end: the front end people use, the APIs and data behind it, and the LLM features that make it smarter. I'm most interested in teams that ship to production and measure whether what they built actually solved the problem.",
  },
  {
    q: "Are you willing to relocate or work onsite?",
    a: "Yes. I am currently based in Topeka, Kansas, and I am open to relocation for the right opportunity. I am comfortable with onsite, hybrid, or remote arrangements depending on the role and the team's needs. For an onsite position, I would coordinate the relocation timeline with the employer and make sure I can begin according to the agreed start date.",
  },
  {
    q: "How do you like to work, and what type of team environment helps you perform best?",
    a: "I work best in an environment where the goals, success metrics, and responsibilities are clear, while engineers still have ownership over implementation. I like collaborative planning, direct communication, documented decisions, code reviews, and short feedback cycles. I am comfortable working independently on design and development, but I communicate early when I see a blocker, risk, or trade-off.",
  },
  {
    q: "Why are you looking for a new opportunity?",
    a: "I'm looking for a long-term role where I can take broader ownership of products end to end — front end, back end, data, and AI — on a team that ships to real users. It's about growth and fit, not about leaving something negative behind.",
  },
  {
    q: "What are your salary expectations, and when can you start?",
    a: "I am open to a market-competitive compensation package based on the position's responsibilities, location, employment type, benefits, and total scope. I would first like to understand the approved range for the role so we can confirm alignment. I am available to interview immediately, and my start date is flexible based on the employer's hiring and onboarding timeline.",
  },
];
