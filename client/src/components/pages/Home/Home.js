import React, { useEffect } from 'react';

import SearchEngine from '../../searchengine/SearchEngine';
import RecipesVertical from '../../layout/recipes/RecipesVertical/RecipesVertical';

import './Home.css';

const Home = () => {
    return (
        <div>
            <header>
                <div className='header_content'>
                    <h1>My Food Buddy</h1>
                    <p className='underline'>
                        Bewaar, deel en bestel je recepten
                    </p>
                </div>
            </header>
            <SearchEngine />
            <RecipesVertical />
        </div>
    );
};

export default Home;
