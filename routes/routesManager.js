let sitesRouter = require("../routes/sitesRouter")
let courseRouter = require("./courseRouter")

let router = function(app) {
    app.use("/", sitesRouter)
    app.use("/course", courseRouter)
}

module.exports = router