import { body } from "express-validator"

export const loginValidator = [body("email").isEmail(), body("password").isLength({ min: 5 })]

export const registerValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL()
]

export const postCreateValidation = [
  body("title", "Enter title").isLength({ min: 3 }).isString(),
  body("text", "Enter text").isLength({ min: 10 }).isString(),
  body("tags", "Invalid tags format").optional().isArray(),
  body("imageUrl", "Invalid image url").optional().isString()
]
