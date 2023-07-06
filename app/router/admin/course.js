const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../middlewares/ stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourse);
router.get("/list", CourseController.getAllCourse);
router.post("/update/:id", uploadFile.single("image"), CourseController.updateCourse);
router.get("/serach", CourseController.searchCourse);
router.get("/:id", CourseController.getCourseById);

module.exports = {
    AdminCourseApiRouter: router
}