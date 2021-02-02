const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('slugify');

// Create Schema
const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
    },
    header_image: {
        type: String,
    },
    nutrition: {
        calories: {
            type: String,
        },
    },
    method: {
        type: [
            {
                hierachy: {
                    type: Number,
                },
                desc: {
                    type: String,
                },
            },
        ],
    },
    ingredients: {
        type: [
            {
                unit: {
                    type: String,
                    required: true,
                },
                ingredient: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
    },
    tips: {
        type: String,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    video_url: {
        type: String,
    },
    rating: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

RecipeSchema.pre('save', async function (next) {
    // Check if the title of the recipe has changed
    if (!this.isModified('title')) {
        next();
        return;
    }

    // Create a slug out of the title of the recipe
    this.slug = slug(this.title, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
    });
    // Find other recipe that have a slug of wes, wes-1, wes-2
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
    if (storesWithSlug.length) {
        this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
    }
    next();
});

module.exports = Recipe = mongoose.model('recipes', RecipeSchema);
