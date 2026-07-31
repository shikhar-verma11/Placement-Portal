# Smart College Placement Management Portal

An automated, robust, and zero-error campus recruitment ecosystem designed to eliminate fragmented spreadsheets, delayed email notices, and manual eligibility verification.

---

## 🌟 Hackathon Scope & Stack (FISAT / UnStop)
This portal is built to handle the end-to-end placement workflow using a robust and production-grade python-based architecture:
- **Django Framework:** Secure enterprise models for student profiles, recruiter dashboards, and admin TPO command center roles.
- **Celery & Redis:** High-concurrency async task queues to manage real-time WhatsApp dispatches, portal alerts, and background operations.
- **Pandas:** Vectorized data-filtering engine processing thousands of student profiles and CPI distributions in under 20 milliseconds.
- **OpenPyXL:** Excel report engine generating pre-formatted NAAC/NIRF accreditation-ready sheets with one click.
- **Bootstrap 5 & Django Templates:** Clean, responsive, and accessible user interface for all stakeholders.

---

## 🚀 Key Features

### 1. Smart Eligibility Filter (0.02s Querying)
No manual excel comparisons. Recruiters define drive rules (e.g., minimum CPI cutoff, department constraints, backlog allowance), and the database filters matching profiles instantaneously.

### 2. Async Notification Queue
Heavy notifications are routed off the main thread to Celery workers. Real-time updates are dispatched via mail, WhatsApp, and in-portal alerts within seconds.

### 3. Automated Offer Lock Policy
Enforces placement coordinator policies (e.g., "One Student, One Dream Offer"). The system automatically locks secondary drive applications once a dream offer letter is accepted.

### 4. Interactive TPO Simulator
Playable live scenario representing the **Infosys Campus Drive (7.5 CGPA Cutoff)**. Select eligibility thresholds, run instant batch matches, and watch real-time notification dispatches.

### 5. Accreditation-Ready Reporting
Generate structured placement reports, company distributions, and department metrics with integrated Pandas pipelines, exporting straight to Excel.

---

## 📊 System Architecture

```
[Student / Company / Admin UI]
            │
            ▼
[Django REST Gateway] ── (Pandas / OpenPyXL Report Engine)
            │
            ├──► [PostgreSQL Relational DB]
            │
            └──► [Celery Task Queue] ──► [Redis Broker] ──► [Instant Mail & Alert Dispatch]
```

---

## 🛠️ Run Showcase App Locally

### Prerequisites
- **Node.js** (v18 or higher)
- **npm**

### Step-by-Step Setup
1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Set your `GEMINI_API_KEY` in the `.env.local` file for multi-modal resume evaluations.

3. **Start Dev Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
