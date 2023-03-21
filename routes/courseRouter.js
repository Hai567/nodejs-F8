let express = require("express")
let router = express.Router()
let CourseController = require("../app/controllers/CourseController")

router.get("/create-course", CourseController.create)
router.get("/all-courses", CourseController.allCourses)
router.get("/bin", CourseController.bin)
router.post("/bin/many-actions", CourseController.binManyActions)
router.post("/store", CourseController.store)
router.post("/many-actions", CourseController.manyActions)
router.get("/:slug/edit", CourseController.edit)
router.put("/:slug/update", CourseController.update)
router.patch("/:slug/restore", CourseController.restore)
router.delete("/:slug/delete", CourseController.delete)
router.delete("/:slug/destroy", CourseController.destroy)
router.get("/:slug", CourseController.show)


module.exports = router