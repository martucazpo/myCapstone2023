const router = require("express").Router()
const controllers = require("../controllers")

router.route("/update").post(controllers.ensureAuthenticated, controllers.updateProfile)

module.exports = router