import { body } from "express-validator"
import validate from "../middlewares/validate"

export default validate(
    body("title").isString().isLength({ min: 7, max: 255 }),
    body("content").isString().isLength({ min: 7, max: 65535 })
)

