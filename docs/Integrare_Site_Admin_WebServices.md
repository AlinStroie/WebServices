# Ghid Tehnic de Integrare: Modulul Site Admin (WebServices) în A Squared Studio Hub

**Data elaborării:** 26 septembrie 2026  
**Autor:** Antigravity AI  
**Proiect Central:** A Squared Studio Hub (Monorepo v2.0)  
**Aplicație Sursă:** WebServices (`asquaredstudio.ro` / `AlinStroie/WebServices.git`)  
**Stare:** Gata de implementare (Conform Blueprint v2.0, Faza 5 & Faza 6)  
**Fișier PDF asociat:** `Integrare_Site_Admin_WebServices.pdf` (disponibil și pe Desktop ca `Integrare_Site_Admin_Studio_Hub.pdf`)

---

## 1. Context și Obiective

În cadrul arhitecturii **A Squared Studio Hub**, toate aplicațiile operaționale ale studioului sunt unificate sub o singură umbrelă de acces securizat prin rețea privată (Tailscale), autentificare cu factor dublu (TOTP) și sesiune unică pe dispozitive autorizate:
- **Facturare (Conta):** Încorporată cu succes (Express + SQLite + React).
- **Lead Finder (Scraper):** Încorporat cu succes (FastAPI Runner + PWA Monitor + Streamlit).
- **Cold Calling (Apeluri):** Încorporat cu succes.
- **Analytics (GA4 + GBP):** Construit nativ în Hub.
- **Site Admin (`asquaredstudio.ro`):** Rezervat în Blueprint (Presupunerea A4 și Secțiunea 8.1).

Prin inspectarea depozitului GitHub `AlinStroie/WebServices.git` (clonat local la `C:\Users\aldea\OneDrive\Documente\WebServices`), s-a confirmat că site-ul de prezentare are deja o secțiune completă și matură de administrare securizată (atât frontend React, cât și backend Express + PostgreSQL/Prisma).

**Obiectivul acestui ghid:** Prezentarea pașilor concreți de conectare a acestui panou de admin în interiorul **A Squared Studio Hub**, permițând accesul facil de pe PC și telefoane mobile fără expunere publică pe internet și fără a reintroduce credențialele de fiecare dată.

---

## 2. Auditul Tehnic al Modulului Admin din WebServices

### 2.1 Ecranele Frontend (`WebServices/src/pages/admin/*`)
În folderul `src/pages/admin/` există 9 componente gata construite:
1. **`AdminDashboard.jsx`:** Panou central cu metrici de conversie, total leaduri, contacte noi, studii de caz publicate și ultimele cereri primite.
2. **`AdminContacts.jsx` & `AdminContactDetails.jsx`:** CRM pentru formularele trimise din landing page, cu filtre pe status (`NEW`, `IN_PROGRESS`, `REPLIED`, `ARCHIVED`), bifa „Contract semnat” și ștergere.
3. **`AdminCaseStudies.jsx` & `AdminCaseStudyEditor.jsx`:** CMS complet pentru adăugarea, redactarea și publicarea studiilor de caz din portofoliul A Squared Studio (slug, client, metrici de impact, taguri).
4. **`AdminAnalytics.jsx`:** Grafice temporale (Recharts) pentru traficul anonimizat de pe site, vizitatori, rate de conversie și pagini populare.
5. **`AdminClients.jsx`:** Gestionarea clienților și asocierea cu sistemul de portal Clerk.
6. **`AdminLayout.jsx` & `AdminLogin.jsx`:** Cadrul de navigație cu bară laterală și ecranul de login pe bază de cookie JWT.

### 2.2 Endpoint-urile Backend (`WebServices/server/src/routes/admin/*`)
Backend-ul Express expune rutele securizate sub prefixul `/api/admin/`:
- `GET /api/admin/dashboard` - Statistici agregate pentru panou.
- `GET, PATCH, DELETE /api/admin/contact-submissions` - Gestiunea leadurilor.
- `GET, POST, PATCH, DELETE /api/admin/case-studies` - Gestiunea studiilor de caz.
- `GET /api/admin/analytics/overview`, `/timeseries` - Statistici de trafic.
- `GET, POST /api/admin/clients` - Gestiunea clienților.
- `POST /api/admin/auth/login`, `logout`, `me` - Autentificare sesiune.

---

## 3. Strategii de Integrare în A Squared Studio Hub

Există două modalități prin care modulul poate fi activat în Hub:

| Criteriu | Opțiunea A: Nativă PWA (Recomandată) | Opțiunea B: Iframe prin Gateway Proxy |
| :--- | :--- | :--- |
| **Experiență Utilizator** | Fluidă, 100% integrată pe mobil/PWA. Fără frame-uri imbricate. | Funcțională, dar afișată într-un cadru `<iframe>`. |
| **Design System** | Aliniat perfect la culorile Hub-ului (`#171b27`, `#2c2cf3`, Inter). | Păstrează stilul existent din WebServices. |
| **Autentificare** | **Zero login:** Hub-ul este deja securizat cu TOTP; apelează backend-ul direct. | Necesită bridge pe antetul `X-Hub-Operator` pentru a sări peste login. |
| **Timp implementare** | ~2 ore (componentă dedicată `SiteAdminPage.tsx`). | ~30 minute (configurare YAML + bridge middleware). |

> [!TIP]
> **Recomandare:** Începeți cu **Opțiunea B (Iframe)** pentru a avea acces imediat în Hub la toate ecranele de admin, iar ulterior componentele utilizate cel mai des (Leaduri & Analytics) pot fi extinse ca ecrane native PWA.

---

## 4. Plan de Implementare Pas-cu-Pas

### Pasul 1: Adaptarea Backend-ului WebServices (`requireAdmin.js`)
Pentru a permite autentificarea transparentă atunci când cererea vine prin Gateway-ul securizat al Hub-ului (Regula **R3-c** din Blueprint):

Fișier: `C:\Users\aldea\OneDrive\Documente\WebServices\server\src\middleware\requireAdmin.js`
```javascript
import { prisma } from "../lib/prisma.js";
import { getAdminCookieName, verifyAdminToken } from "../lib/adminAuth.js";

export async function requireAdmin(req, res, next) {
  try {
    // 1. Recunoaștere antet de încredere injectat de Studio Hub Gateway
    const hubOperator = req.headers["x-hub-operator"];
    const hubDevice = req.headers["x-hub-device"];

    if (hubOperator && (hubDevice || process.env.NODE_ENV !== "production")) {
      req.admin = {
        id: "hub-operator-" + hubOperator.toLowerCase(),
        email: `${hubOperator.toLowerCase()}@asquaredstudio.ro`,
        role: "SUPERADMIN",
        isHubSession: true,
      };
      return next();
    }

    // 2. Fallback la autentificarea clasică prin Cookie JWT (pentru acces direct din afara Hub-ului)
    const cookieName = getAdminCookieName();
    const token = req.cookies?.[cookieName];

    if (!token) {
      return res.status(401).json({ success: false, message: "Neautorizat." });
    }

    const decoded = verifyAdminToken(token);
    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, active: true },
    });

    if (!admin || !admin.active) {
      return res.status(401).json({ success: false, message: "Sesiune invalidă." });
    }

    req.admin = { id: admin.id, email: admin.email, role: admin.role };
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Sesiune expirată." });
  }
}
```

### Pasul 2: Suport pentru Rutare Duală în WebServices (`server/src/app.js`)
Montați rutele de admin și pe calea proxată de Hub:

Fișier: `C:\Users\aldea\OneDrive\Documente\WebServices\server\src\app.js`
```javascript
// În jurul liniei 113:
app.use("/api/admin", adminRoutes);
app.use("/apps/site-admin/api/admin", adminRoutes);

// Health check dedicat pentru Hub Gateway
app.use("/apps/site-admin/api/health", (req, res) => {
  res.json({ status: "ok", name: "Site Admin Engine", timestamp: new Date().toISOString() });
});
```

### Pasul 3: Activarea în Registrul Studio Hub (`deploy/apps.config.yaml`)
Fișier: `C:\Users\aldea\Desktop\A Squared Studio Hub\deploy\apps.config.yaml`
```yaml
apps:
  # ... facturare și lead-finder existente ...

  - id: site-admin
    name: Site Admin
    icon: globe
    order: 3
    type: web
    mount: /apps/site-admin/
    upstream: http://localhost:5000     # În dezvoltare locală
    # upstream: http://site-admin:5000  # În producție Docker Compose pe VM Oracle
    mode: iframe
    health: /api/health
    focus_capable: true
    max_body: 10mb
    backup:
      - type: postgres
        database: webservices_db
    verify_hook: integrations/site-admin/verify.sh
    enabled: true
```

### Pasul 4: Pachetul de Containerizare Docker (`integrations/site-admin/`)

1. **`integrations/site-admin/Dockerfile`:**
```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production
COPY server ./server
COPY --from=builder /app/dist ./server/dist
WORKDIR /app/server
EXPOSE 5000
CMD ["npm", "start"]
```

2. **`integrations/site-admin/docker-compose.fragment.yml`:**
```yaml
services:
  site-admin:
    build:
      context: /opt/studio-hub/apps/site-admin
      dockerfile: Dockerfile
    container_name: studio-hub-site-admin
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=5000
      - DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@postgres:5432/webservices_db
      - CLIENT_URL=http://localhost:8080
    networks:
      - internal_net
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
      interval: 30s
      timeout: 5s
      retries: 3
    mem_limit: 512m
```

3. **`integrations/site-admin/verify.sh`:**
```bash
#!/usr/bin/env bash
set -e
echo "Verificare integritate Site Admin..."
curl -sf http://localhost:5000/api/health || { echo "Healthcheck eșuat!"; exit 1; }
echo "Site Admin funcționează optim."
```

---

## 5. Rulare și Testare

### 5.1 Testare în Dezvoltare Locală (Windows)
1. Porniți backend-ul WebServices pe portul 5000:
   ```powershell
   cd "C:\Users\aldea\OneDrive\Documente\WebServices\server"
   npm run dev
   ```
2. Porniți Studio Hub pe portul 8080 / 5173:
   ```powershell
   cd "C:\Users\aldea\Desktop\A Squared Studio Hub"
   .\start.bat
   ```
3. Deschideți Hub-ul în browser (`http://localhost:5173`), selectați aplicația **Site Admin** din meniu și verificați accesul la panou.

### 5.2 Garanția Regresiei Identice (Regula R4)
- Site-ul public `asquaredstudio.ro` nu este afectat: rutele publice, landing page-ul, formularul de contact și calculul de preț continuă să funcționeze 100% identic.
- Baza de date PostgreSQL `webservices_db` păstrează schema Prisma existentă.

---

## 6. Documentația PDF

Versiunea tipăribilă completă (format A4 vector de înaltă rezoluție, 13 pagini) a fost generată și plasată în:
1. `C:\Users\aldea\Desktop\Integrare_Site_Admin_Studio_Hub.pdf` (pentru acces rapid de pe Desktop)
2. `C:\Users\aldea\Desktop\A Squared Studio Hub\docs\Integrare_Site_Admin_WebServices.pdf`
3. `C:\Users\aldea\OneDrive\Documente\WebServices\docs\Integrare_Site_Admin_WebServices.pdf`
