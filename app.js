let express = require("express")
let app = express()
let PORT = process.env.PORT || 3000
let bodyParser = require("body-parser")
let ejs = require("ejs")
let routesManager = require(__dirname + "/routes/routesManager")
let db = require("./config/db/index")
let mongoose = require("mongoose")
let methodOverride = require('method-override')
// View Engine
app.set("view engine", "ejs")
// Static Folder
app.use(express.static(__dirname + "/public"))
// BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(methodOverride('_method'))

mongoose.set('strictQuery', false);
db.connect()
routesManager(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})