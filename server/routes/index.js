const router = require("express").Router()
const authRoutes = require("./authRoutes")
const userRoutes = require("./userRoutes")

router.use("/auth", authRoutes)
router.use("/profile", userRoutes)

module.exports = router