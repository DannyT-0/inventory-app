const Movie = require("../models/movie");
const Director = require("../models/director");
const Genre = require("../models/genre");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
	// Get details of movies, movie instances, authors and genre counts (in parallel)
	const [numMovies, numDirectors, numGenres] = await Promise.all([
		Movie.countDocuments({}).exec(),
		Director.countDocuments({}).exec(),
		Genre.countDocuments({}).exec(),
	]);

	res.render("index", {
		title: "Movie List Home",
		movie_count: numMovies,
		director_count: numDirectors,
		genre_count: numGenres,
	});
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
