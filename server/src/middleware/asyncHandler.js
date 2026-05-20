// Wrapper pentru funcții async.
// Fără el, trebuie să punem try/catch în fiecare rută.
// Dacă apare o eroare, o trimite automat către errorHandler.
export function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}