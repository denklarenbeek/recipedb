import React, { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import ImageUploader from '../../inputs/imageUploader/ImageUploader';
import {
    TextInput,
    TextArea,
    SubmitInput,
} from '../../inputs/TextInput/TextInput';
import PreviousPageButton from '../../buttons/PreviousPageButton/PreviousPageButton';

import './AddRecipeModal.css';

const AddRecipeModal = () => {
    return (
        <Fragment>
            <div className='modal'>
                <PreviousPageButton />
                <div className='title-section'>
                    <h2>Nieuw recept</h2>
                </div>
                <div className='form-section'>
                    <form action='/'>
                        <ImageUploader />
                        <TextInput
                            input={{
                                id: 'tite',
                                name: 'title',
                                title: 'titel',
                                type: 'text',
                            }}
                        />
                        <TextArea
                            input={{
                                id: 'description',
                                name: 'description',
                                title: 'beschrijving',
                                helper:
                                    'Geef je recept extra glans met een goede beschrijving',
                            }}
                        />
                        <TextInput
                            input={{
                                id: 'video_url',
                                type: 'text',
                                name: 'video_url',
                                title: 'Video Link',
                                helper:
                                    'Heb je een video van het recept, vul dan hier de link in',
                            }}
                        />
                        <div className='divider'></div>
                        <TextInput
                            input={{
                                id: 'time',
                                name: 'time',
                                type: 'number',
                                title: 'Bereidingstijd',
                                class: 'col-2 mg-r',
                                suffix: 'min',
                            }}
                        />
                        <TextInput
                            input={{
                                id: 'servings',
                                name: 'servings',
                                type: 'number',
                                title: 'Aantal personen',
                                class: 'col-2',
                                suffix: 'pers.',
                            }}
                        />
                        <TextArea
                            input={{
                                id: 'ingredienst',
                                name: 'ingredients',
                                title: 'Ingredienten',
                                helper:
                                    'Vul je ingrediënten in en spreid ze met een , (100 gram bloem, 20 gram boter, etc.)',
                            }}
                        />
                        <TextArea
                            input={{
                                id: 'method',
                                name: 'method',
                                title: 'Bereidingswijze',
                                helper:
                                    'Beschrijf hier de stappen gespreid met een , (1. Kook het gezouten water, schil de komkommer)',
                            }}
                        />
                        <SubmitInput
                            input={{
                                title: 'Save',
                                prefix: 'far fa-save',
                            }}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default AddRecipeModal;
