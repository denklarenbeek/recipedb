import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home/Home';
import Navbar from './components/layout/navbar/Navbar';
import AddRecipeButton from './components/buttons/AddRecipeButton/AddRecipeButton';
import AddRecipeModal from './components/modals/AddRecipeModal/AddRecipeModal';

import './normalize.css';
import './App.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/create'>
                    <AddRecipeModal />
                </Route>
                <Route path='/'>
                    <Home />
                    <Navbar />
                    <AddRecipeButton />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
