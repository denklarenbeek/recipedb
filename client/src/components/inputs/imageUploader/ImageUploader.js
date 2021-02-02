import React, { useState, useEffect, useRef } from 'react';

const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const imageInput = useRef();

    const clickFileInput = (e) => {
        e.preventDefault();
        imageInput.current.click();
    };

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    };

    return (
        <div className='input-group'>
            {selectedFile && <img style={{ width: '50%' }} src={preview} />}
            <input
                style={{ display: 'none' }}
                type='file'
                onChange={onSelectFile}
                ref={imageInput}
            />
            <a
                style={{ margin: '10px 0px 20px 0px' }}
                className='btn-cta'
                onClick={clickFileInput}
            >
                Upload je afbeelding
            </a>
        </div>
    );
};

export default ImageUploader;
