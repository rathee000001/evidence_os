# Model Router Policy

EvidenceOS is model-flexible.

## Current active roles

- primary_general_multimodal_model: qwen3.5:9b
- fast_text_fallback: qwen3:4b
- vision_fallback: qwen2.5vl:3b
- reasoning_model: deepseek-r1:8b
- code_schema_json_model: qwen2.5-coder:7b
- embedding_fast: nomic-embed-text
- embedding_quality: bge-m3

## Rule

Every AI workflow calls a role, not a hardcoded model.

## Future upgrades

Future models such as quantized Gemma 4 or larger local models can be added as candidates, tested, approved, switched in, and rolled back.
