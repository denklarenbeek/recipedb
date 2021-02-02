import React, { useReducer } from 'react';
import uuid from 'uuid';

// Import the Recipe Context & the Reducer
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';

// Import the corresponding types from the general types file
import {
    ADD_RECIPE,
    DELETE_RECIPE,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_RECIPE,
    FILTER_RECIPES,
    CLEAR_FILTER,
} from '../types';

// Create the Recipe state
const RecipeState = (props) => {
    // Set the initial state
    const initialState = {
        recipes: [],
    };

    const [state, dispatch] = useReducer(recipeReducer, initialState);

    // Add Recipe

    // Delete Recipe

    // Set Current Recipe

    // Clear Current Recipe

    // Update Recipe

    // Filter Recipes

    // Clear Filter

    return (
        <RecipeContext.Provider
            value={{
                recipes: state.recipes,
            }}
        >
            {props.children}
        </RecipeContext.Provider>
    );
};

export default RecipeState;
