let express = require("express")
let router = express.Router()
let sitesController =  require("../app/controllers/sitesController")

router.get("/", sitesController.HomePage)

module.exports = router