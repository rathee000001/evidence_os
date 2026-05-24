# Admin Internet Research Policy

Local models do not browse the internet directly.

EvidenceOS uses:

FastAPI Local Brain → Tool Router → Search/URL/GitHub/Webpage Adapter → Parser → Source Packet → Model Router → Claim Guard → Admin Output

## Admin-only routes

- /admin/job-search
- /admin/job-copilot
- /admin/company-analyzer
- /admin/resume-lab
- /admin/interview-prep
- /admin/phd-search
- /admin/sop-lab
- /admin/research-writer
- /admin/chatbot-lab

## Public blocked

The public frontend cannot call web search or raw local AI.

## Phase 08 project-study default

Admin internet research is ON by default for project-study workflows.

Rules:
- The public frontend cannot use internet research.
- Models do not browse directly.
- The Tool Router creates a sanitized public research packet.
- Raw evidence, OCR dumps, private resumes, recruiter replies, private recommendations, job tracker records, and private academic/SOP material must not be sent to search.
- If `06_web/internet_research_packet.json` already exists for a project run, do not redo internet research unless the user explicitly requests refresh.
