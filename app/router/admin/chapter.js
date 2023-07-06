const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");
const router = require("express").Router();

router.put("/add", ChapterController.addChapter);
router.get("/list", ChapterController.getAllChapter);
router.patch("/remove/:chapterID", ChapterController.addChapter);
router.patch("/update/:chapterID", ChapterController.updateChapterById);
router.get("/list/:id", ChapterController.ChapterOfCourse);

module.exports = {
    AdminChapterApiRouter: router
}