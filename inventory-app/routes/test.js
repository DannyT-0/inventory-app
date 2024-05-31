var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Test" });
	// res.send("respond with a resource this is a test route");
});

module.exports = router;
