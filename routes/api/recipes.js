const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Recipe = require('../../models/Recipe');
// const User = require('../../models/User');

// @route		GET api/recipes/test
// @desc		Tests post route
// @access	Public
router.get('/test', (req, res) => {
  res.json({
    msg: 'Users works'
  });
});

// @route		GET api/recipes
// @desc		Get all recipes sorted on date
// @access	Public
router.get('/', (req, res) => {
  // TODO: Convert to async/await function
  // TODO: Only populate name of the user

  Recipe.find()
    .populate('user')
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipefound: 'No recipes found' }));
});

// @route		GET api/recipes/my
// @desc		Get all recipes by logged in User
// @access	Private
router.get('/my', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });
    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error...😢');
  }
});

// @route		POST api/recipes
// @desc		Create a recipe
// @access	Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('desc', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // TODO: Uploaden header foto
    // TODO: Add category, nutrition info

    const {
      title,
      desc,
      method,
      ingredients,
      tips,
      video_url,
      rating
    } = req.body;

    try {
      const newRecipe = new Recipe({
        title,
        desc,
        method,
        ingredients,
        tips,
        video_url,
        rating,
        user: req.user.id
      });

      const recipe = await newRecipe.save();

      res.json(recipe);
    } catch (err) {
      console.error(error.message);
      res.status(500).send('Server Error...😢');
    }
  }
);

// @route		GET api/recipes/single/:id
// @desc		Get recipe by ID
// @access	Public
router.get('/single/:id', (req, res) => {
  // TODO: Convert to async/await function

  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err =>
      res.status(404).json({ norecipefound: 'No recipe found with that ID' })
    );
});

// @route		PUT api/recipes/single/:id
// @desc		Update a recipe
// @access	Private
router.put('/single/:id', auth, async (req, res) => {
  const {
    title,
    desc,
    method,
    ingredients,
    tips,
    video_url,
    rating
  } = req.body;

  const recipeFields = {};
  if (title) recipeFields.title = title;
  if (desc) recipeFields.desc = desc;
  if (method) recipeFields.method = method;
  if (ingredients) recipeFields.ingredients = ingredients;
  if (tips) recipeFields.tips = tips;
  if (video_url) recipeFields.video_url = video_url;
  if (rating) recipeFields.rating = rating;

  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'No recipe found' });
    }

    // Make sure user owns recipe or it's an admin
    if (recipe.user.toString() === req.user.id || req.user.role === 'admin') {
      recipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        { $set: recipeFields },
        { new: true }
      );
      res.json(recipe);
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Server Error...😢');
  }
});

// @route		PUT api/recipes/single/:id
// @desc		Update a recipe
// @access	Private
router.delete('/single/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'No recipe found' });
    }

    // Make sure user owns recipe or it's an admin
    if (recipe.user.toString() === req.user.id || req.user.role === 'admin') {
      await Recipe.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Contact is removed' });
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Server Error...😢');
  }
});
module.exports = router;
