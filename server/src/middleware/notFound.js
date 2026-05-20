// Middleware pentru rute inexistente.
// Exemplu: /api/ceva-care-nu-exista
export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "Ruta nu a fost găsită.",
  });
}