import { validationResult } from "express-validator";

export default (...rules) => {
  return async (req, res, next) => {
    for (let rule of rules) {
      const result = await rule.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
}