import React from 'react';
import { useHistory } from 'react-router-dom';

import './PreviousPageButton.css';

const PreviousPageButton = () => {
    const history = useHistory();

    const goBackHandler = () => {
        history.goBack();
    };

    return (
        <div className='previous-page-button' onClick={goBackHandler}>
            <i className='fal fa-times'></i>
        </div>
    );
};

export default PreviousPageButton;
