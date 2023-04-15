const express = require("express")
const app = express()
const cors = require("cors")
const routes = require("./routes")
const config = require("./config")

app.use(cors(config.cors))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("./auth")(app)
app.use(routes)
require("./db")(app)

module.exports = app