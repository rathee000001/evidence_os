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
