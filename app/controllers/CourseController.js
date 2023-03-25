let Courses = require("../models/Courses")

class CourseController {
    // [GET] /course/create-course
    create(req, res, next){
        res.render("create-course")
    }
    // [POST] /course/store
    store(req, res, next){
        let formData = req.body
        formData.img = `https://i.ytimg.com/vi/${req.body.videoID}/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD0PUhqlmU4QV_o1uhWHsIDEZIV8A`
        Courses.create(formData)
            .then(res.redirect("/course/all-courses"))
            .catch(err => {
        })
    }
    // [POST] /course/many-actions
    manyActions(req, res, next){
        switch (req.body.method) {
            case "delete":   
                Courses.delete({
                    "_id": {$in: req.body["selected-courses"]}
                })
                    .then() //// Need this to delete many
                res.redirect("back")
                break;
        }
    }
    // [POST] /course/bin/many-actions
    binManyActions(req, res, next){
        switch (req.body.method) {
            case "delete":
                Courses.deleteMany({
                    "_id": {$in: req.body.selectedCourses}
                })
                .then() //// Need this to run the action
                res.redirect("back")
                break;
            case "restore":
                Courses.restore({
                    "_id": {$in: req.body.selectedCourses}
                })
                .then() //// Need this to run the action
                res.redirect("back")
                break
            default:
                break;
        }
    }
    // [GET] course//all-courses
    allCourses(req, res, next){
        let courseQuery = Courses.find({})
        if (req.query.hasOwnProperty("_sort")){
            let sortColumn = req.query.column
            let sortType = req.query.type
            courseQuery = courseQuery.sort({
                [sortColumn]: sortType
            })
        }

        let i = 0
        Courses.findDeleted()
            .then(softDeletedCourses => {
                softDeletedCourses.forEach(softDeletedCourse => {
                    i ++
                });
            })
        courseQuery
            .then((courses) => {
                res.render("all-courses", {
                    courses,
                    numberOfDeleted: i,
                })
            })
            .catch(err => {

            })
    }
    // [GET] /course/:slug/edit
    edit(req, res, next){
        Courses.findOne({slug: req.params.slug})
            .then((course) => {
                res.render("edit", {course})
            })
            .catch(err => {

            })
    }
    // [PUT] /course/:slug/update
    update(req, res, next){
        Courses.updateOne({slug: req.params.slug}, req.body)
            .then((data) => {
                res.redirect("/course/all-courses")
            })
    }
    // [DELETE] /course/:slug/delete
    delete(req, res, next){
        Courses.delete({slug: req.params.slug})
            .then(data => res.redirect("/course/all-courses"))
            .catch(err => {
            })
    }
    // [DELETE] /course/:slug/destroy
    destroy(req, res, next){
        Courses.deleteOne({slug: req.params.slug})
            .then(data => res.redirect("/course/bin"))
            .catch(err => {
            })
    }
    // [PATCH] /course/:slug/restore
    restore(req, res, next){
        Courses.restore({slug: req.params.slug})
            .then(data => res.redirect("/course/all-courses"))
            .catch(err => {
            })
    }
    // [GET] /course/bin
    bin(req, res, next){
        Courses.findDeleted()
            .then(softDeletedCourses => 
                res.render("bin", {courses: softDeletedCourses,}))
    }
    // [GET] /course/:slug
    show(req, res, next){
        Courses.findOne({slug: req.params.slug})
            .then((course) => {
                if (course != null){
                res.render("course", {course})
                }else{
                    res.send("Can not find the course you are looking for")
                }
            })
            .catch(err => res.send("Can not find the course you are looking for"))
    }
}

module.exports = new CourseController