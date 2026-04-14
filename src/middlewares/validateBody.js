import createHttpError from "http-errors";
export const validateBody = (schema) => async(req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const err = createHttpError(400, "Bad Request body", {
      error: error.details,
    });
    next(err);
  }
};
