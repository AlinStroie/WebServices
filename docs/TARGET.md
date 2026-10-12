# Clone/Transform Target Configuration

## Mode
TRANSFORM (nu clone-from-scratch)

Acesta NU e un clonaj de la zero. Avem deja un site live cu conținut propriu.
Scopul e să preluăm arhitectura UX + tehnica de motion de la site-ul model
și să le aplicăm peste site-ul existent, păstrând 100% conținutul,
brandul și identitatea A Squared Studio.

## Site-ul nostru (destinație — conținutul rămâne neschimbat)
URL: https://asquaredstudio.ro
Stack: React / Next.js
Acțiune: acesta e codebase-ul de pornire. NU se șterge conținutul.

## Site model (sursă — doar arhitectură/tehnică, nu conținut)
URL: https://dixieraizpacheco.com
Ce se preia: structură de secțiuni, layout, grid-uri, spacing, tip de
animație și motion pe scroll (scroll-triggered reveals, parallax, hover
states, timeline cu progress bar, transition timing/easing).
Ce NU se preia: text, imagini, video, logo-uri de clienți, nume, copy,
identitate vizuală (culori/fonturi rămân ale A Squared Studio).

## Workflow în Claude Code

1. Rulează `/clone-website https://dixieraizpacheco.com` DOAR ca extracție
   de research (nu construiește proiect nou) — output-ul merge în
   `docs/research/components/` ca specificație tehnică (CSS computat,
   breakpoints, animation timing, scroll behaviors)

2. Pornește Claude Code în interiorul codebase-ului EXISTENT al
   asquaredstudio.ro (nu într-un proiect gol)

3. Mapează secțiune cu secțiune: pentru fiecare secțiune a site-ului
   nostru actual, identifică echivalentul structural din specificațiile
   extrase și aplică:
   - layout-ul / grid-ul
   - tipul de animație și trigger-ul (scroll / hover / click)
   - timing-ul și easing curve-urile
   peste conținutul existent (text, imagini, CTA-uri ale A Squared Studio)

4. Fonturile și paleta de culori NU se schimbă — rămân cele din
   design-ul actual al asquaredstudio.ro, doar tehnica de interacțiune
   se aliniază la modelul de referință

## Priority Sections (mapare, ajustează după structura reală a site-ului vostru)
1. Hero — motion de intrare + social proof, dacă există
2. Secțiune problemă/soluție sau despre servicii
3. Grid de proiecte/portofoliu — hover reveal, tranziții
4. Bandă de logo-uri/trust, dacă există
5. Beneficii/servicii — carduri cu iconițe
6. Proiecte featured — grid cu hover
7. Proces de lucru — timeline cu progress pe scroll (dacă aplicabil)
8. Testimoniale
9. FAQ
10. Footer

## Constrângeri obligatorii
- Zero conținut, imagini sau text din site-ul model în rezultatul final
- Codebase-ul existent al asquaredstudio.ro e baza; skill-ul nu construiește
  peste un scaffold gol
- Orice animație complexă (GSAP/Framer Motion) extrasă ca "simplificată"
  de skill trebuie verificată manual față de site-ul model înainte de a fi
  considerată finală
