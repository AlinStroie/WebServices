// Intrarea pentru Vercel: aplicația Express rulează ca o singură funcție
// serverless. Local se folosește în continuare src/index.js (app.listen +
// node-cron).
import { app } from "../src/app.js";

export default app;
