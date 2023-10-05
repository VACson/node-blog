import express from "express"
import mongoose from "mongoose"
import multer from "multer"

import { checkAuth, handleValidationErrors } from "./utils/index.js"
import { registerValidator, loginValidator, postCreateValidation } from "./validations.js"

import { UserController, PostController } from "./controllers/index.js"

mongoose
  .connect("mongodb+srv://memedealer1337:admin@cluster0.vwt5cac.mongodb.net/blog")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB err", err))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads")
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.post("/auth/login", loginValidator, handleValidationErrors, UserController.login)
app.post("/auth/register", registerValidator, handleValidationErrors, UserController.register)
app.get("/auth/me", checkAuth, UserController.getMe)

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get("/posts/", PostController.getAll)
app.get("/posts/:id", PostController.getOne)
app.post("/posts", checkAuth, postCreateValidation, PostController.create)
app.patch("/posts/:id", checkAuth, PostController.update)
app.delete("/posts/:id", checkAuth, PostController.remove)

app.listen(8000, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log("Server is up")
})
