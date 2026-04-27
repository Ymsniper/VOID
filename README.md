# VOID — +18 Psychological Horror Quiz
---
<img width="1920" height="1080" alt="Screenshot_20260427_032308" src="https://github.com/user-attachments/assets/618cd136-0529-4861-be6e-fe1c00300dc3" />
---
> *How deep does it go?*

A dark, interactive psychological horror experience built with vanilla HTML, CSS, and JavaScript. Featuring atmospheric audio, jumpscares, glitch effects, and 9 unique psychological profiles.

---

## ⚠️ Content Warning

This experience contains:
- Psychological horror and disturbing themes
- Jumpscares (visual and audio)
- Flashing/flickering visuals
- Mature themes (18+)

---

## Features

- **23 questions** with branching reactions and memory injection
- **9 psychological profiles** — each with a unique result and personality analysis
- **Secret easter egg profile** — only unlocked by a specific answer combination
- **Procedural audio** — heartbeat engine built on Web Audio API, evolving throughout the quiz
- **Jumpscare system** — 6 distinct scare scenes, triggered contextually
- **Atmospheric effects** — canvas particle system, vignette, scanlines, screen breathing, glitch animations
- **Fake crash** — simulated BSOD mid-quiz for certain answer patterns
- **Ghost messages** — ambient text that appears based on your answers
- **Tab scare** — triggers when you try to leave

---

## Getting Started

### Play locally

Just open `index.html` in a browser — no build tools or dependencies required.

```bash
git clone https://github.com/yourusername/void.git
cd void
open index.html
```

### Play online

Live demo: [https://yourusername.github.io/void/](https://ymsniper.github.io/VOID/)

---

## Project Structure

```
void/
├── index.html          # Main entry point (self-contained)
├── README.md
├── LICENSE
├── .gitignore
└── .github/
    └── workflows/
        └── deploy.yml  # Auto-deploy to GitHub Pages
```

> The current build is intentionally self-contained in a single HTML file for zero-dependency portability. Future refactoring could split it into the `js/`, `css/`, and `assets/` directories shown in the diagram below.

---

## Psychological Profiles

| Profile | Trigger Condition |
|---|---|
| **The Absence** | Very low overall score |
| **The Predator** | High dark score, very low empathy |
| **The Shadow** | High dark + high honesty |
| **The Saint** | High empathy, low dark |
| **The Fracture** | Maximum honesty score |
| **The Architect** | High control, moderate dark |
| **The Fractured Saint** | Balanced empathy/dark/honesty |
| **The Hollow** | Low overall, not quite absence |
| **The Survivor** | Default — balanced responses |
| **The Mirror** *(secret)* | Q1=B, Q8=D, Q22=C |

---

## Tech Stack

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Web Audio API — procedural heartbeat and audio effects
- Canvas API — particle background
- No frameworks, no build step, no dependencies

---

## Browser Support

Best experienced in **Chrome** or **Firefox** on desktop. Audio requires user interaction to initialize (handled by the age gate click).

---

## License

MIT — see [LICENSE](LICENSE)
