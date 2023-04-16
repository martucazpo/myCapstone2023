const authControllers = require("./authControllers")
const middlewareController = require("./middlewareController")


module.exports = {
    ensureAuthenticated: middlewareController.ensureAuthenticated,
    register: authControllers.registerAUser,
    login: authControllers.loginAUser,
    logout: authControllers.logoutAUser
}