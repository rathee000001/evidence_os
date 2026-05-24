# Combo Model Execution Policy

EvidenceOS can run a combo/router workflow, not all models together.

## Execution order

1. Extract or parse input.
2. Retrieve evidence or source packet.
3. Choose model role.
4. Run selected model.
5. Validate output.
6. Send to another model only if needed.
7. Save as draft or review output.

## Rule

No workflow should hardcode a model name. Workflows call a model role through the Model Router.
