const Movie = require("../models/movie");
const Director = require("../models/director");
const Genre = require("../models/genre");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
	// Get details of movies, movie instances, directors and genre counts (in parallel)
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
	const allMovies = await Movie.find({}, "title director")
		.sort({ title: 1 })
		.populate("director")
		.exec();

	res.render("movie_list", { title: "Movie List", movie_list: allMovies });
});

// Display detail page for a specific movie.
exports.movie_detail = asyncHandler(async (req, res, next) => {
	// Get details of movies for specific movie
	const movie = await Promise.all([
		Movie.findById(req.params.id).populate("director").populate("genre").exec(),
	]);

	if (movie === null) {
		// No results.
		const err = new Error("Movie not found");
		err.status = 404;
		return next(err);
	}

	res.render("movie_detail", {
		title: movie.title,
		movie: movie,
	});
});

// Display movie create form on GET.
exports.movie_create_get = asyncHandler(async (req, res, next) => {
	// Get all directors and genres, which we can use for adding to our movie.
	const [allDirectors, allGenres] = await Promise.all([
		Director.find().sort({ family_name: 1 }).exec(),
		Genre.find().sort({ name: 1 }).exec(),
	]);

	res.render("movie_form", {
		title: "Create Movie",
		directors: allDirectors,
		genres: allGenres,
	});
});

// Handle movie create on POST.
exports.movie_create_post = [
	// Convert the genre to an array.
	(req, res, next) => {
		if (!Array.isArray(req.body.genre)) {
			req.body.genre =
				typeof req.body.genre === "undefined" ? [] : [req.body.genre];
		}
		next();
	},

	// Validate and sanitize fields.
	body("title", "Title must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("director", "Director must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Summary must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("genre.*").escape(),
	// Process request after validation and sanitization.

	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create a Movie object with escaped and trimmed data.
		const movie = new Movie({
			title: req.body.title,
			director: req.body.director,
			summary: req.body.summary,
			genre: req.body.genre,
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.

			// Get all directors and genres for form.
			const [allDirectors, allGenres] = await Promise.all([
				Director.find().sort({ family_name: 1 }).exec(),
				Genre.find().sort({ name: 1 }).exec(),
			]);

			// Mark our selected genres as checked.
			for (const genre of allGenres) {
				if (movie.genre.includes(genre._id)) {
					genre.checked = "true";
				}
			}
			res.render("movie_form", {
				title: "Create Movie",
				directors: allDirectors,
				genres: allGenres,
				movie: movie,
				errors: errors.array(),
			});
		} else {
			// Data from form is valid. Save movie.
			await movie.save();
			res.redirect(movie.url);
		}
	}),
];

// Display movie delete form on GET.
// Display movie delete form on GET.
exports.movie_delete_get = asyncHandler(async (req, res, next) => {
	// Get movie details
	const movie = await Promise.all([
		Movie.findById(req.params.id).populate("director").populate("genre").exec(),
	]);

	if (movie === null) {
		// No results.
		res.redirect("/catalog/movies");
	}

	res.render("movie_delete", {
		title: "Delete Movie",
		movie: movie,
	});
});

// Handle movie delete on POST.
exports.movie_delete_post = asyncHandler(async (req, res, next) => {
	// Get movie details
	const movie = await Promise.all([Movie.findById(req.body.movieid).exec()]);

	// if (movieInstances.length > 0) {
	// 	// movie has movie instances. Render in the same way as for GET route.
	// 	res.render("movie_delete", {
	// 		title: "Delete Movie",
	// 		movie: movie,
	// 		movie_instances: movieInstances,
	// 	});
	// 	return;
	// }

	// movie has no movie instances. Delete object and redirect to the list of movies.
	await Movie.findByIdAndDelete(req.body.movieid);
	res.redirect("/catalog/movies");
});

// Display movie update form on GET.
exports.movie_update_get = asyncHandler(async (req, res, next) => {
	// Get movie, directors and genres for form.
	const [movie, allDirectors, allGenres] = await Promise.all([
		Movie.findById(req.params.id).populate("director").exec(),
		Director.find().sort({ family_name: 1 }).exec(),
		Genre.find().sort({ name: 1 }).exec(),
	]);

	if (movie === null) {
		// No results.
		const err = new Error("Movie not found");
		err.status = 404;
		return next(err);
	}

	// Mark our selected genres as checked.
	allGenres.forEach((genre) => {
		if (movie.genre.includes(genre._id)) genre.checked = "true";
	});

	res.render("movie_form", {
		title: "Update Movie",
		directors: allDirectors,
		genres: allGenres,
		movie: movie,
	});
});

// Handle movie update on POST.
exports.movie_update_post = [
	// Convert the genre to an array.
	(req, res, next) => {
		if (!Array.isArray(req.body.genre)) {
			req.body.genre =
				typeof req.body.genre === "undefined" ? [] : [req.body.genre];
		}
		next();
	},

	// Validate and sanitize fields.
	body("title", "Title must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("director", "Director must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Summary must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
	body("genre.*").escape(),

	// Process request after validation and sanitization.
	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create a movie object with escaped/trimmed data and old id.
		const movie = new Movie({
			title: req.body.title,
			director: req.body.director,
			summary: req.body.summary,
			isbn: req.body.isbn,
			genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
			_id: req.params.id, // This is required, or a new ID will be assigned!
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.

			// Get all directors and genres for form
			const [allDirectors, allGenres] = await Promise.all([
				Director.find().sort({ family_name: 1 }).exec(),
				Genre.find().sort({ name: 1 }).exec(),
			]);

			// Mark our selected genres as checked.
			for (const genre of allGenres) {
				if (movie.genre.indexOf(genre._id) > -1) {
					genre.checked = "true";
				}
			}
			res.render("movie_form", {
				title: "Update Movie",
				directors: allDirectors,
				genres: allGenres,
				movie: movie,
				errors: errors.array(),
			});
			return;
		} else {
			// Data from form is valid. Update the record.
			const updatedMovie = await Movie.findByIdAndUpdate(
				req.params.id,
				movie,
				{}
			);
			// Redirect to movie detail page.
			res.redirect(updatedMovie.url);
		}
	}),
];
