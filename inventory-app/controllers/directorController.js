const director = require("../models/director");
const asyncHandler = require("express-async-handler");

// Display list of all directors.
exports.director_list = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: director list");
});

// Display detail page for a specific director.
exports.director_detail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: director detail: ${req.params.id}`);
});

// Display director create form on GET.
exports.director_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: director create GET");
});

// Handle director create on POST.
exports.director_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: director create POST");
});

// Display director delete form on GET.
exports.director_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: director delete GET");
});

// Handle director delete on POST.
exports.director_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: director delete POST");
});

// Display director update form on GET.
exports.director_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: director update GET");
});

// Handle director update on POST.
exports.director_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: director update POST");
});
