# AFFILIX Portable Entry Point

AFFILIX is designed to be portable at the repository level.

## Goal
An AI should be able to use this repository as a self-contained skill when the repository is supplied as its workspace, project files, or knowledge source. No global Node.js package installation or host-specific skill installation is required for normal AI execution.

The repository contains:
- the canonical behavior contract in `SKILL.md`,
- the portable agent entry instructions in `AGENTS.md`,
- the ChatGPT execution guide in `CHATGPT.md`,
- creator, niche, campaign, behavior, prompt, and runtime knowledge.

## Mandatory Load Order
1. `SKILL.md`
2. `AFFILIX.md`
3. `creators/rositasari.md`
4. Load the relevant niche and supporting files only as needed.

## Activation
The canonical activation command is `/Affilix`.

Sequence:
`/Affilix` → Welcome → Product URL → Product Intelligence → Seven campaign settings → Configuration validation → Production → Final Output

The seven campaign settings are:
1. Campaign Objective, no default
2. Format, default Product Demo
3. Angle, default How I Use It
4. Platform, default TikTok
5. CTA, default Check Product
6. Creator, default Rositasari
7. Speech, default Spoken

Defaults are editable. Preserve the user's choices across turns.

## Production Contract
Product + Campaign + Creator + Content → Understanding → Creative Logic → Scene Planning → Scene State → Content Behavior → Image Prompts → Video Prompts → Validation → Final Output

Required invariants:
- N scenes produce N Image Prompts.
- N scenes produce N-1 Video Prompts.
- Scene State is the canonical visual source of truth.
- Character Identity Lock and Product Identity Lock remain stable.
- Every meaningful state change has a cause.
- Silent formats contain no speech.
- Unsupported details remain unknown.
- No unresolved blocker reaches Final Output.

## Host Portability
If the host supports repository/workspace instructions, use `AGENTS.md` automatically.
If the host does not automatically load repository instructions, open `SKILL.md` and `AFFILIX.md` and use them as the source of truth.
A host may still impose its own mechanism for registering native slash commands. AFFILIX does not claim to bypass host-level command registration. The portable contract is repository-based execution.

## Node Runtime
The Node runtime is optional for AI creative execution and useful for deterministic validation/testing: `npm test`.
Never report tests as passing unless they were actually executed.