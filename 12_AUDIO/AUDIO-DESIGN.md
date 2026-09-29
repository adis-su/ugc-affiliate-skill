# AUDIO DESIGN

## 1. Purpose

Audio Design defines the complete audio layer of the AFFILIX production system.

It translates upstream narrative, dialogue, voice, timeline, scene, and product interaction requirements into an audio production specification.

Audio Design covers:
- voice delivery
- dialogue timing
- breathing
- pauses
- emphasis
- room tone
- ambience
- environmental sound
- product sound
- foley
- music
- audio transitions
- synchronization dependencies

Audio Design is a parallel production layer.

Core model:

SCRIPT / DIALOGUE / VOICE / TIMELINE / STATE → AUDIO DESIGN → AUDIO OUTPUT

Audio Design must preserve:
- Script meaning
- Dialogue wording
- Voice Identity
- Global Timeline
- Scene timing
- Clip timing
- Product interaction state
- Character performance
- Claim safety
- continuity

Audio Design does not overwrite upstream Source of Truth.

---

## 2. Audio Layer Model

AFFILIX separates audio into distinct layers:

1. Voice
2. Dialogue
3. Performance delivery
4. Breathing and pauses
5. Room tone
6. Environment ambience
7. Foley
8. Product sound
9. Music
10. Transition and mix behavior

Each layer has a different role.

### Voice

Defines who the speaker sounds like.

Authority:
VOICE-IDENTITY.md

### Dialogue

Defines what is spoken.

Authority:
DIALOGUE.md

### Performance

Defines how the character delivers the spoken content.

Authority:
PERFORMANCE.md

### Timing

Defines when audio events occur.

Authority:
GLOBAL-TIMELINE.md

### Sound Design

Defines supporting non-dialogue audio.

Authority:
AUDIO-DESIGN.md

---

## 3. Audio Design Record

A project may contain an Audio Design Record with:

| Field | Description |
|---|---|
| Audio ID | Unique audio record |
| Scene ID | Related scene |
| Clip ID | Related clip |
| Timeline Range | Absolute timing |
| Voice Identity Reference | Voice source |
| Dialogue Reference | Spoken content source |
| Delivery Direction | Performance delivery |
| Breathing | Breathing behavior |
| Pause Structure | Pause timing |
| Emphasis | Important spoken emphasis |
| Room Tone | Base acoustic environment |
| Ambience | Environmental background |
| Foley | Human/object interaction sounds |
| Product Sound | Product-specific physical sound |
| Music | Music layer and timing |
| Transition | Audio transition behavior |
| Volume Relationship | Relative layer hierarchy |
| Sync Dependencies | Visual/audio dependencies |
| Continuity Anchors | Elements that must remain stable |
| Prohibited Changes | Changes that must not occur |
| Source References | Upstream sources |
| Status | Current state |

---

## 4. Authority and Source of Truth

Audio Design follows the same Source of Truth hierarchy as the rest of AFFILIX.

Priority:

1. Product Truth
2. Character Identity
3. Voice Identity
4. Script
5. Dialogue
6. Storyboard
7. Global Timeline
8. Character/Product/Environment/Camera State
9. Audio Design
10. Audio implementation details

Audio Design may specify implementation details, but may not contradict upstream truth.

Generated audio never becomes Source of Truth automatically.

---

## 5. Voice Identity

Voice Identity defines the stable vocal identity of the character.

Audio Design must reference, not redefine:
- gender
- perceived age
- pitch
- timbre
- pace
- rhythm
- energy
- emotional baseline
- delivery characteristics
- breathing character
- natural imperfections

For Rositasari, Voice Identity remains stable across scenes unless explicitly changed upstream.

Audio Design may specify scene-level delivery direction such as:
- slightly more energetic
- calmer
- more conversational
- softer emphasis
- shorter pause

It must not redefine the underlying voice identity.

---

## 6. Dialogue Integrity

Dialogue is authoritative for spoken wording.

Audio Design must never:
- rewrite dialogue
- add claims
- remove required meaning
- invent product information
- change product terminology
- introduce unsupported benefits
- alter the intended message

Natural speech behavior may include:
- contractions
- natural pauses
- breath
- emphasis
- minor hesitation

Only when compatible with the defined Dialogue and its intended meaning.

If exact wording is required, the wording must remain exact.

---

## 7. Speech Delivery

Speech delivery defines how dialogue is performed.

Possible delivery dimensions:
- pace
- rhythm
- energy
- emphasis
- warmth
- confidence
- hesitation
- conversationality
- sentence flow
- pause placement
- breath placement

Delivery must remain compatible with:
- Voice Identity
- Character Performance
- Scene purpose
- Content Strategy
- Dialogue meaning

Delivery must not become theatrical unless explicitly required.

UGC speech should generally prioritize believable conversational behavior over polished commercial narration when the selected format requires it.

---

## 8. Breathing

Breathing is a natural component of spoken delivery.

Possible breathing events:
- pre-speech breath
- mid-sentence breath
- phrase-ending breath
- recovery breath
- subtle resting breath

Breathing must respect:
- dialogue timing
- clip duration
- emotional direction
- performance
- continuity

Breathing should not become exaggerated unless explicitly required.

Visual breathing and audio breathing may be synchronized, but neither layer may independently change the required character state.

---

## 9. Pauses

Pauses are timing elements, not empty space.

Pause types may include:
- micro-pause
- phrase pause
- thought pause
- emphasis pause
- reaction pause
- transition pause

Pause duration should be specified only as precisely as necessary.

Avoid false precision when natural speech is intended.

Pauses must not:
- collide with required dialogue
- remove important wording
- create unintended meaning
- exceed clip boundaries
- interfere with the primary visual transition

---

## 10. Emphasis

Emphasis may be applied to important words or phrases.

Emphasis can be created through:
- slight pitch variation
- controlled volume change
- pacing change
- pause before or after the phrase
- natural stress

Emphasis must preserve the original meaning.

It must not turn neutral product information into an unsupported claim or exaggerated promise.

---

## 11. Room Tone

Room tone is the acoustic baseline of the environment.

Room tone may include:
- low-level indoor acoustic presence
- subtle outdoor ambience
- room reflections
- HVAC-like background noise when appropriate
- quiet spatial character

Room tone supports continuity across cuts.

Room tone should remain compatible with Environment Identity and Environment State.

A room tone change may indicate a scene change only when the scene actually changes.

---

## 12. Environmental Ambience

Environmental ambience represents the broader acoustic world.

Examples:
- distant traffic
- subtle household sounds
- air movement
- distant people
- birds
- city ambience
- kitchen ambience
- office ambience

Ambience must be:
- physically plausible
- appropriate to the environment
- subordinate to dialogue
- consistent across connected clips

Do not add distinctive sounds that imply an event not present in the storyboard or environment.

---

## 13. Foley

Foley represents physical interaction sounds.

Examples:
- clothing movement
- footsteps
- hand contact
- object placement
- subtle body movement
- surface contact

Foley should correspond to observable actions.

No action means no invented foley event.

If a sound implies an action that is not visually specified, the audio layer must not invent that action.

---

## 14. Product Sound

Product sounds may be included when supported by the Product State and physical interaction.

Examples:
- cap movement
- lid closure
- container contact
- button press
- zipper movement
- packaging contact
- object placement

Product sounds must be grounded in known physical interactions.

Do not invent:
- mechanisms
- internal components
- material properties
- functionality
- performance
- satisfying sounds intended to imply quality

A sound may describe an interaction but cannot create a product claim.

---

## 15. Music

Music is a supporting layer.

Music decisions may include:
- presence or absence
- entry timing
- exit timing
- intensity
- rhythm
- mood
- relative prominence

Music must not interfere with:
- dialogue intelligibility
- required product sounds
- important foley
- emotional intent
- platform-specific content requirements

Music should support the content strategy rather than compete with it.

---

## 16. Audio Priority

When multiple audio layers overlap, priority should generally follow:

1. Required dialogue
2. Important voice performance
3. Required product interaction sound
4. Important foley
5. Relevant environmental ambience
6. Room tone
7. Music
8. Decorative audio

This is a production priority, not a creative ranking of the content.

A lower-priority layer may still be prominent when the format explicitly requires it.

---

## 17. Audio and Visual Synchronization

Audio must remain synchronized with visual events.

Important synchronization relationships include:

### Speech

DIALOGUE → MOUTH / PERFORMANCE → AUDIO DELIVERY

### Product Interaction

PRODUCT STATE A → PHYSICAL ACTION → PRODUCT STATE B

Audio may occur at the physical action point.

### Camera

Camera movement may have subtle synchronized sound behavior when physically appropriate.

### Environment

Environmental sound should correspond to the environment shown.

Audio must never independently create a visual event.

---

## 18. Audio and State

Audio can reinforce state but cannot redefine it.

Example:

PRODUCT CLOSED → HAND OPENS PRODUCT → PRODUCT OPEN

A closure sound cannot be used if the Product State remains open.

A placement sound cannot be used if the product is still held.

A sound suggesting an action must correspond to an actual specified state transition.

State remains authoritative.

---

## 19. Audio and Naturalization

Naturalization may use audio timing to make visual behavior feel human.

Examples:
- blink around a natural speech pause
- subtle head movement during emphasis
- breathing between phrases
- tiny gesture during spoken emphasis
- minor camera response to handheld movement

Audio Design remains authoritative for audio.

Naturalization remains authoritative for visual micro-motion.

Neither module may silently redefine the other's upstream requirements.

---

## 20. Clip Audio

Each clip may contain:
- Start Audio State
- Dialogue Events
- Foley Events
- Product Sound Events
- Ambience
- Music
- End Audio State

Clip audio must be compatible with:

START STATE → TRANSITION → END STATE

The last audio condition of Clip N should transition naturally into Clip N+1 when continuity requires it.

Audio may continue across a clip boundary when the scene design requires continuity.

---

## 21. Global Timeline Integration

Audio events should use the Global Timeline as the timing authority.

Timeline may contain:
- dialogue start/end
- pause
- breath
- sound effect
- product interaction sound
- music entry
- music exit
- ambience change
- transition

Scene duration remains narrative timing.

Clip duration remains generation timing.

Audio events must fit both without distorting the intended narrative.

---

## 22. Audio Continuity

Continuity may include:
- voice identity
- vocal acoustic character
- room tone
- ambience
- music continuity
- product sound logic
- environmental sound
- perceived distance
- reverberation character

Abrupt audio changes should occur only when justified by:
- scene change
- environment change
- camera/spatial change
- explicit audio transition

Continuity should be especially protected at bridge references and clip boundaries.

---

## 23. Audio State

Audio may have its own state representation when necessary.

An Audio State can describe:
- active voice
- current dialogue position
- room tone
- ambience
- music state
- ongoing sound
- silence condition
- acoustic continuity

Audio State remains subordinate to the visual and narrative state model.

It should not become an independent source of narrative truth.

---

## 24. Missing Audio Data

Do not invent critical audio information.

Use:
- UNKNOWN
- NEEDS INPUT
- BLOCKED

when missing information materially affects:
- dialogue
- voice identity
- timing
- product sound
- required synchronization
- scene continuity

For non-critical decorative audio, conservative omission is preferred over unsupported invention.

Silence is a valid audio decision.

---

## 25. Claim Safety

Audio must not introduce unsupported product claims.

This includes spoken or implied claims about:
- performance
- effectiveness
- durability
- quality
- material
- technical capability
- health outcome
- size
- quantity
- user experience

Music, sound effects, or vocal delivery must not be intentionally designed to create a misleading product impression that contradicts Product Truth.

---

## 26. Platform Considerations

Platform-specific audio requirements belong in:

00_KNOWLEDGE/PLATFORM/

Examples:
- TikTok
- Instagram
- YouTube Shorts
- Marketplace
- Google Flow

Audio Design should consume platform configuration rather than hardcode platform rules into the creative logic.

Platform changes should therefore update configuration, not rewrite the entire audio architecture.

---

## 27. Audio Prompt Relationship

Audio Design may provide structured instructions to downstream generation systems.

It may contribute:
- voice direction
- delivery direction
- timing
- sound events
- ambience
- foley
- product sound
- music behavior

But audio implementation instructions must trace back to Audio Design and its upstream sources.

Generated audio is an output, not a new source of truth.

---

## 28. Dependency and Stale Propagation

Audio Design depends on:
- Content Strategy
- Script
- Dialogue
- Voice Identity
- Performance
- Environment
- Storyboard
- Global Timeline
- Clip
- Character State
- Product State
- Audio configuration

Changes to these modules may make affected Audio Design records stale.

Examples:
- dialogue change → speech timing may become stale
- scene duration change → audio timing may become stale
- product interaction change → product sound may become stale
- environment change → room tone and ambience may become stale
- voice identity change → voice delivery may become stale

Only affected downstream audio records should be revised.

---

## 29. Targeted Regeneration

Audio regeneration should be targeted.

Examples:
- incorrect pause → regenerate delivery timing
- wrong product sound → regenerate product foley
- inconsistent room tone → regenerate ambience
- voice mismatch → regenerate voice layer
- music conflict → regenerate music layer
- synchronization issue → regenerate affected audio timing

Do not regenerate unrelated visual outputs unless an upstream dependency actually changed them.

---

## 30. Status

Audio Design follows the project state model:

NOT_STARTED → IN_PROGRESS → READY_FOR_DECISION → APPROVED → LOCKED

If an upstream dependency changes:

LOCKED → STALE → REVISED → LOCKED

Generated audio does not automatically modify the Audio Design Record.

---

## 31. Boundary Summary

| Module | Owns | Does Not Own |
|---|---|---|
| Script | Message/content | Final audio implementation |
| Dialogue | Spoken wording | Voice identity |
| Voice Identity | Stable vocal identity | Scene-specific audio mix |
| Performance | Delivery behavior | Room/foley/music design |
| Global Timeline | Timing | Sound implementation |
| Environment | Physical environment | Complete audio design |
| Product State | Product condition | Product sound design |
| Audio Design | Audio layer specification | Upstream narrative/state truth |
| Naturalization | Visual micro-motion | Audio authority |
| Output | Generated audio | Source of Truth |

---

## 32. Non-Negotiable Rules

1. Audio Design never overrides Source of Truth.
2. Audio Design never rewrites Dialogue.
3. Audio Design never redefines Voice Identity.
4. Audio timing must respect Global Timeline.
5. Audio events must correspond to real or explicitly specified actions.
6. Product sounds must not invent product properties or mechanisms.
7. Audio must not create unsupported product claims.
8. Audio may reinforce state but never redefine state.
9. Audio continuity must be preserved across connected clips when required.
10. Silence is valid when no sound is required.
11. Generated audio never becomes Source of Truth automatically.
12. Audio Design is a parallel production layer, not a validation stage.
