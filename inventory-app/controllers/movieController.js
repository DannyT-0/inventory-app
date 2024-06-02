const movie = require("../models/movie");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all movies.
exports.movie_list = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: movie list");
});

// Display detail page for a specific movie.
exports.movie_detail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: movie detail: ${req.params.id}`);
});

// Display movie create form on GET.
exports.movie_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: movie create GET");
});

// Handle movie create on POST.
exports.movie_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: movie create POST");
});

// Display movie delete form on GET.
exports.movie_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: movie delete GET");
});

// Handle movie delete on POST.
exports.movie_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: movie delete POST");
});

// Display movie update form on GET.
exports.movie_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: movie update GET");
});

// Handle movie update on POST.
exports.movie_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: movie update POST");
});
