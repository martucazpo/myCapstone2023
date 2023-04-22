const router = require("express").Router()
const authRoutes = require("./authRoutes")
const userRoutes = require("./userRoutes")
const todoRoutes = require("./todoRoutes")

router.use("/auth", authRoutes)
router.use("/profile", userRoutes)
router.use("/todo", todoRoutes)

module.exports = router