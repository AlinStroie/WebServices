# Setup: Clone-Website Skill pentru Claude Code
## Scenariu: TRANSFORMARE site existent (asquaredstudio.ro), nu clonare de la zero

## 1. Instalare — skill-ul se adaugă în codebase-ul EXISTENT, nu invers

```bash
# Intră în proiectul vostru existent (React/Next.js)
cd path/catre/asquaredstudio

# Adaugă doar folderul de skill din template, NU tot scaffold-ul
mkdir -p .claude/skills
curl -L https://github.com/Mood-Global-Services/How-to-Clone-Website---Claude-Skills/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=2 -C .claude/skills \
  "How-to-Clone-Website---Claude-Skills-main/.claude/skills"

# (dacă structura arhivei diferă, cel mai simplu e să clonezi template-ul
# separat într-un folder temporar și să copiezi manual .claude/skills/
# în rădăcina proiectului vostru)
```

Important: NU rula `npm install` din template-ul cloner-ului peste
proiectul vostru — el vine cu propriul scaffold Next.js/Tailwind, pe care
nu îl vrem. Avem deja stack-ul (React/Next.js) al A Squared Studio.

## 2. Configurează TARGET.md

Editează fișierul `TARGET.md` din rădăcina proiectului (vezi exemplul din acest folder,
`TARGET.md`, pe care ți l-am pregătit deja mai jos) — acolo definești URL-ul,
scope-ul (ce secțiuni), și nivelul de fidelitate.

## 3. Pornește Claude Code cu acces la browser

```bash
claude --chrome
```

Flag-ul `--chrome` e obligatoriu — skill-ul are nevoie de Chrome MCP ca să
navigheze site-ul, să facă screenshot-uri, să extragă CSS computat și să
testeze breakpoint-urile responsive.

## 4. Faza 1 — Extracție de research (doar specificații tehnice)

În Claude Code, cere explicit modul research-only (nu build):

```
Rulează faza de Reconnaissance + Component Specs a skill-ului
clone-website pe https://dixieraizpacheco.com, conform TARGET.md.
NU construi/genera niciun proiect nou — scrie doar specificațiile
tehnice (layout, spacing, tip de animație, timing, easing, breakpoints)
în docs/research/components/. Nu descărca imaginile/video-urile
originale ca assets finale.
```

Asta îți dă:
1. **Reconnaissance** — screenshot-uri (temporare, de referință), extragere
   design tokens, sweep de interacțiuni (scroll, click, hover, resize)
2. **Component Specs** — fișiere în `docs/research/components/` cu valorile
   CSS exacte, stările și comportamentele animațiilor pentru fiecare secțiune

## 5. Faza 2 — Aplicare peste site-ul vostru existent

Acum, tot în Claude Code, în interiorul proiectului asquaredstudio.ro:

```
Am specificațiile tehnice în docs/research/components/. Aplică-le peste
componentele existente din acest proiect (React/Next.js), secțiune cu
secțiune, conform maparii din TARGET.md. Păstrează 100% conținutul,
textele, imaginile, fonturile și culorile actuale ale A Squared Studio.
Preia doar: structura de layout/grid, tipul de animație, trigger-ul
(scroll/hover/click) și timing-ul/easing-ul.
```

Claude va lucra direct pe componentele voastre existente, nu va genera
un site nou de la zero.

## 6. Verificare finală

1. Rulează site-ul local (`npm run dev`) și compară secțiune cu secțiune
   cu site-ul model, verificând că motion-ul se simte similar
2. Confirmă că nu a rămas niciun text, imagine sau asset din site-ul
   sursă (căutare rapidă: `grep -r "dixieraizpacheco" .` sau nume de
   clienți din site-ul model)
3. Ajustează manual orice animație GSAP/Framer Motion complexă — skill-ul
   le simplifică frecvent (vezi Limitări mai jos)

## Limitări reale (documentate din teste independente)

- Animații complexe (GSAP, Framer Motion) sunt adesea simplificate — vei
  rescrie manual multe din ele
- Video-uri de fundal nu se reconstruiesc mereu corect
- Elemente 3D (Three.js) necesită aproape mereu refinement manual
- Funcționează foarte bine pe landing pages/site-uri de marketing statice —
  exact cazul site-ului țintă aici
