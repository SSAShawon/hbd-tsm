# For TSM — a cinematic birthday story

A mobile-first, portrait-only React experience created for Tasneem. It contains 10 chapters, 43 tap-through cinematic scenes, and 136 narration beats, plus a scrapbook-style memory archive and a 10-letter book.

## Run locally

```bash
npm install
npm run dev
```

## Personalization and truthfulness

Story content is data-driven in [`data/story.ts`](./data/story.ts). The supplied brief included 13 factual story anchors but no photographs, exact message transcript, physical character descriptions, or additional memory/letter copy. The film therefore uses original, consistent editorial illustrations rather than claiming to be a portrait likeness; it does not invent a chat transcript or unprovided events. The archive includes 13 story anchors and 37 intentionally blank, locally saved pages that Tasneem can fill in herself.

The 10 letters are newly written, restrained notes based on the supplied story and the requested “open when” prompts. They avoid presenting invented conversations or promises as historical facts.

## Included

- Portrait/mobile layout with safe-area padding and a landscape rotation prompt on touch devices
- Scene-by-scene tap navigation, back navigation, chapter cards, progress persistence, and reload resume
- Optional memory hotspots; story remains completable without opening any
- Reopenable discovered memories, locked chapter-linked pages, and up to 37 personal pages saved in local browser storage
- Letter book with 10 full-screen letter cards
- Original SVG scene illustrations, chapter-specific animated atmospheres, and character micro-movement
- Distinct synthesized tap, page, memory, letter, chapter, and birthday sound cues, with a remembered sound toggle
- Final birthday party sequence with animated cake, candles, balloons, gift boxes, string lights, confetti, and an optional make-a-wish burst
- No remote fonts, images, copyrighted soundtrack, or 3D runtime
