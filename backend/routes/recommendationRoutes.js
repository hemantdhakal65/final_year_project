const express = require("express");
const recommendationController = require("../controllers/recommendationController");
const router = express.Router();


router.post("/add", recommendationController.addRecommendation);

router.get("/view", recommendationController.getRecommendations);

module.exports = router;
