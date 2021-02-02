import React from 'react';
import PropTypes from 'prop-types';

import RecipeCard from '../RecipeCard/RecipeCard';

import './RecipesVertical.css';
import { recipes } from './Recipes';

const RecipesVertical = ({ title }) => {
  return (
    <div className="recipe_container">
      <div className="recipe_container_title">
        <h2>{title}</h2>
      </div>
      <div className="recipes">
        {recipes.map((recipe) => {
          return <RecipeCard recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

RecipesVertical.propTypes = {
  title: PropTypes.string.isRequired,
};

RecipesVertical.defaultProps = {
  title: 'Populaire recepten',
};

export default RecipesVertical;
