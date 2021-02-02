import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe_card">
      <Link to={recipe.link}>
        <div className="recipe_card_jumbo">
          <img src={recipe.image} alt={recipe.name} />
        </div>
        <div className="recipe_card_content">
          <div className="card_title">{recipe.name}</div>
          <div className="card_description">{recipe.description}</div>
        </div>
      </Link>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};

RecipeCard.defaultProps = {
  recipe: {
    name: 'Yoghurt Oats overnight',
    description:
      'Hele lekkere Oats overnight met de extra toch van citroen Yoghurt',
    image: './img/product_image.jpg',
    link: '/recept/1234',
  },
};

export default RecipeCard;
