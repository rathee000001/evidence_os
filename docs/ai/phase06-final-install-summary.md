# Phase 06 Final AI Install Summary

Phase 06 AI installation is complete and verified.

Local report paths:

- /mnt/d/AI/ril-local-ai/logs/install/phase06_10_final_ai_install_report.txt
- /mnt/d/AI/ril-local-ai/logs/install/phase06_10_final_ai_install_report.json

## Final local model role map

| Role | Model |
|---|---|
| embedding_fast | nomic-embed-text |
| embedding_quality | bge-m3 |
| primary_general_multimodal_model | qwen3.5:9b |
| fast_text_fallback | qwen3:4b |
| vision_fallback | qwen2.5vl:3b |
| reasoning_model | deepseek-r1:8b |
| code_schema_json_model | qwen2.5-coder:7b |

## Runtime rule

EvidenceOS runs model combinations by router role. It must not force all models to run together.
