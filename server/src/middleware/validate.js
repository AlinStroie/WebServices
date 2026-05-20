// Middleware generic pentru validare cu Zod.
// Primește o schemă și validează req.body.
// Dacă datele sunt corecte, le pune în req.validatedBody.
export function validate(schema) {
  return function validationMiddleware(req, res, next) {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Date invalide.",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    req.validatedBody = parsed.data;
    next();
  };
}