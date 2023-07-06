const { EpisodeController } = require("../../http/controllers/admin/course/episode.controller");
const { uploadVideoFile } = require("../../utils/multer");
const router = require("express").Router();

router.post("/add", uploadVideoFile.single('video'), EpisodeController.addEpisode);
router.get("/list", EpisodeController.getAllEpisodes)
router.delete("/remove/:episodeID", EpisodeController.removeEpisodes);
router.patch("/update/:episodeID", uploadVideoFile.single('video'), EpisodeController.updateEpisode);

module.exports = {
    AdminEpisodeApiRouter: router
}

