import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './AddRecipeButton.css';

const AddRecipeButton = () => {
    return (
        <Fragment>
            <Link to='/create' className='btn-cta floating round'>
                <i className='far fa-plus'></i>
            </Link>
        </Fragment>
    );
};

export default AddRecipeButton;
