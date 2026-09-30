# AFFILIX Repository Agent Instructions

This repository is a self-contained, portable AI UGC production skill.

## Automatic Repository Mode
When an AI agent is operating with this repository as its workspace or project context, treat the repository as the source of truth for AFFILIX. Do not require a global skill installation, package installation, or copying files into a host-specific skills directory for normal creative execution.

Before executing AFFILIX:
1. Read `SKILL.md`.
2. Read `AFFILIX.md`.
3. Load only the supporting files required by the request.
4. Treat unknown product or creator information as unknown. Never invent unsupported facts.
5. Use the repository rules for validation, continuity, scene state, image prompts, video prompts, and output counts.

## /Affilix Activation
Treat the exact user command `/Affilix` as the AFFILIX activation command.
On activation:
- welcome the user,
- request only the Product URL,
- resolve Product Intelligence when retrieval is available,
- show the resolved product summary,
- present the seven campaign settings,
- preserve selections across turns,
- validate the configuration,
- execute the production workflow after configuration is complete.

Do not ask the user to install AFFILIX merely because the repository is being used as a workspace.

## Direct Requests
If the user provides a complete generation request without `/Affilix`, execute the same AFFILIX production rules directly. Do not force the interactive activation flow when the required information is already supplied.

## Runtime
The Node runtime under `runtime/` is an executable contract and validation layer. It is not a prerequisite for AI-agent creative execution.
Do not claim that tests passed unless they were actually run.