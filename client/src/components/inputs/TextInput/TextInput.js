import React from 'react';

import './TextInput.css';

export const TextInput = ({ input }) => {
    function handleOnFocusOut(e) {
        const item = e.target;
        if (e.target.value.length > 0) {
            e.target.classList.add('has-value');
        } else {
            e.target.classList.remove('has-value');
        }
    }
    return (
        <div className={`input-group ${input.class ? input.class : ''}`}>
            <input
                className='form-control'
                type={input.type}
                id={input.id}
                name={input.name}
                onBlur={handleOnFocusOut}
            />
            <label htmlFor={input.id}>{input.title}</label>
            {input.helper && (
                <span className='form-helper'>{input.helper}</span>
            )}
            {input.suffix && (
                <span className='form-suffix'>{input.suffix}</span>
            )}
        </div>
    );
};

export const TextArea = ({ input }) => {
    function handleOnFocusOut(e) {
        const item = e.target;
        if (e.target.value.length > 0) {
            e.target.classList.add('has-value');
        } else {
            e.target.classList.remove('has-value');
        }
    }
    return (
        <div className='input-group'>
            <textarea
                className='form-control'
                name={input.name}
                id={input.id}
                onBlur={handleOnFocusOut}
            ></textarea>
            <label htmlFor={input.id}>{input.title}</label>
            {input.helper && (
                <span className='form-helper'>{input.helper}</span>
            )}
        </div>
    );
};

export const SubmitInput = ({ input }) => {
    return (
        <div className='input-group'>
            <input className='btn-cta' type='submit' value={input.title} />
            {input.prefix && <i className={`${input.prefix} submit-prefix`} />}
        </div>
    );
};
