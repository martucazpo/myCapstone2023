const authControllers = require("./authControllers")
const middlewareController = require("./middlewareController")
const userControllers = require("./userControllers")


module.exports = {
    ensureAuthenticated: middlewareController.ensureAuthenticated,
    register: authControllers.registerAUser,
    login: authControllers.loginAUser,
    logout: authControllers.logoutAUser,
    updateProfile: userControllers.updateAUserProfile
}