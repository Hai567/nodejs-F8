let Courses = require("../models/Courses")

class sitesController {
    HomePage(req, res, next) {
        Courses.find()
            .then(courses => res.render("index", {courses: courses}))
            .catch(err => next(err))
    }
}

module.exports = new sitesController