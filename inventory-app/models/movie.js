const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	title: { type: String, required: true },
	director: { type: Schema.Types.ObjectId, ref: "Director", required: true },
	summary: { type: String, required: true },
	genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

// Virtual for book's URL
MovieSchema.virtual("url").get(function () {
	// We don't use an arrow function as we'll need the this object
	return `/catalog/movie/${this._id}`;
});

// Export model
module.exports = mongoose.model("Movie", MovieSchema);
