const router = require("express").Router()
const controllers = require("../controllers")

router.route("/register").post(controllers.register)
router.route("/login").post(controllers.login)
router.route("/logout").post(controllers.ensureAuthenticated,controllers.logout)

module.exports = router