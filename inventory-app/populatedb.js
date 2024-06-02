#! /usr/bin/env node

console.log(
	'This script populates some test movies, directors, and genres to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Movie = require("./models/movie");
const Director = require("./models/director");
const Genre = require("./models/genre");

const genres = [];
const directors = [];
const movies = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect(mongoDB);
	console.log("Debug: Should be connected?");
	await createGenres();
	await createDirectors();
	await createMovies();
	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name) {
	const genre = new Genre({ name: name });
	await genre.save();
	genres[index] = genre;
	console.log(`Added genre: ${name}`);
}

async function directorCreate(
	index,
	first_name,
	family_name,
	d_birth,
	d_death
) {
	const directordetail = { first_name: first_name, family_name: family_name };
	if (d_birth != false) directordetail.date_of_birth = d_birth;
	if (d_death != false) directordetail.date_of_death = d_death;

	const director = new Director(directordetail);

	await director.save();
	directors[index] = director;
	console.log(`Added director: ${first_name} ${family_name}`);
}

async function movieCreate(index, title, summary, director, genre) {
	const moviedetail = {
		title: title,
		summary: summary,
		director: director,
	};
	if (genre != false) moviedetail.genre = genre;

	const movie = new Movie(moviedetail);
	await movie.save();
	movies[index] = movie;
	console.log(`Added movie: ${title}`);
}

// async function movieInstanceCreate(index, movie) {
// 	const movieinstancedetail = {
// 		movie: movie,
// 	};
// 	// if (due_back != false) bookinstancedetail.due_back = due_back;
// 	// if (status != false) bookinstancedetail.status = status;

// 	const movieinstance = new MovieInstance(movieinstancedetail);
// 	await movieinstance.save();
// 	movieinstances[index] = movieinstance;
// 	console.log(`Added movieinstance: ${movie}`);
// }

async function createGenres() {
	console.log("Adding genres");
	await Promise.all([
		genreCreate(0, "Comedy"),
		genreCreate(1, "Action"),
		genreCreate(2, "Drama"),
	]);
}

async function createDirectors() {
	console.log("Adding directors");
	await Promise.all([
		directorCreate(0, "Steven", "Spielberg", "1946-12-18", false),
		directorCreate(1, "Martin", "Scorcese", "1942-11-17", false),
		directorCreate(2, "Christopher", "Nolan", "1970-07-30", false),
		directorCreate(3, "Quentin Tarantino", "1963-03-27", false),
		directorCreate(4, "George", "Lucas", "1944-05-14", false),
	]);
}

async function createMovies() {
	console.log("Adding Movies");
	await Promise.all([
		movieCreate(
			0,
			"Ready Player One",
			"In 2045 the planet is on the brink of chaos and collapse, but people find salvation in the OASIS: an expansive virtual reality universe created by eccentric James Halliday. When Halliday dies, he promises his immense fortune to the first person to discover a digital Easter egg that's hidden somewhere in the OASIS. When young Wade Watts joins the contest, he finds himself becoming an unlikely hero in a reality-bending treasure hunt through a fantastical world of mystery, discovery and danger.",
			directors[0],
			[genres[1]]
		),
		movieCreate(
			1,
			"The Wolf of Wall Street",
			"In 1987, Jordan Belfort takes an entry-level job at a Wall Street brokerage firm. By the early 1990s, while still in his 20s, Belfort founds his own firm, Stratton Oakmont. Together with his trusted lieutenant and a merry band of brokers, Belfort makes a huge fortune by defrauding wealthy investors out of millions. However, while Belfort and his cronies partake in a hedonistic brew of sex, drugs and thrills, the SEC and the FBI close in on his empire of excess.",
			directors[1],
			[genres[2]]
		),
		movieCreate(
			2,
			"Inception",
			"Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone's mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.",
			directors[2],
			[genres[1]]
		),
		movieCreate(
			3,
			"Inglorious Bastards",
			"It is the first year of Germany's occupation of France. Allied officer Lt. Aldo Raine (Brad Pitt) assembles a team of Jewish soldiers to commit violent acts of retribution against the Nazis, including the taking of their scalps. He and his men join forces with Bridget von Hammersmark, a German actress and undercover agent, to bring down the leaders of the Third Reich. Their fates converge with theater owner Shosanna Dreyfus, who seeks to avenge the Nazis' execution of her family.",
			directors[3],
			[genres[1]]
		),
		movieCreate(
			4,
			"Pulp Fiction",
			"Vincent Vega (John Travolta) and Jules Winnfield (Samuel L. Jackson) are hitmen with a penchant for philosophical discussions. In this ultra-hip, multi-strand crime movie, their storyline is interwoven with those of their boss, gangster Marsellus Wallace (Ving Rhames) ; his actress wife, Mia (Uma Thurman) ; struggling boxer Butch Coolidge (Bruce Willis) ; master fixer Winston Wolfe (Harvey Keitel) and a nervous pair of armed robbers, Pumpkin and Honey Bunny.",
			directors[3],
			[genres[1], genres[2]]
		),
		movieCreate(
			5,
			"Star Wars Episode IV: A New Hope",
			"The Imperial Forces -- under orders from cruel Darth Vader (David Prowse) -- hold Princess Leia (Carrie Fisher) hostage, in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker (Mark Hamill) and Han Solo (Harrison Ford), captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 (Kenny Baker) and C-3PO (Anthony Daniels) to rescue the beautiful princess, help the Rebel Alliance, and restore freedom and justice to the Galaxy.",
			directors[4],
			[genres[1]]
		),
		movieCreate(
			6,
			"Star Wars Episode III: Revenge of the Sith",
			"It has been three years since the Clone Wars began. Jedi Master Obi-Wan Kenobi (Ewan McGregor) and Jedi Knight Anakin Skywalker (Hayden Christensen) rescue Chancellor Palpatine (Ian McDiarmid) from General Grievous, the commander of the droid armies, but Grievous escapes. Suspicions are raised within the Jedi Council concerning Chancellor Palpatine, with whom Anakin has formed a bond. Asked to spy on the chancellor, and full of bitterness toward the Jedi Council, Anakin embraces the Dark Side.",
			directors[4],
			[genres[1]]
		),
	]);
}

// async function createMovieInstances() {
// 	console.log("Adding directors");
// 	await Promise.all([
// 		movieInstanceCreate(0, books[0]),
// 		movieInstanceCreate(1, books[1]),
// 		movieInstanceCreate(2, books[2]),
// 		movieInstanceCreate(3, books[3]),
// 		movieInstanceCreate(4, books[3]),
// 		movieInstanceCreate(5, books[3]),
// 		movieInstanceCreate(6, books[4]),
// 		movieInstanceCreate(7, books[4]),
// 		movieInstanceCreate(8, books[4]),
// 		movieInstanceCreate(9, books[0]),
// 		movieInstanceCreate(10, books[1]),
// 	]);
// }
