import React, { useEffect, useState } from 'react'
import Cropper from "cropperjs"
import 'cropperjs/dist/cropper.min.css'
import './style.css'

const noop = () =>{}

export const ImageEditor = ({ file, setResult = noop }) => {
    const [preview, setPreview] = useState("");
    const [aspectRatio, setAspectRatio] = useState(16/9);

    let crop = React.useRef(null);

    useEffect(() => {
        const cropper = new Cropper(crop.current, {
            zoomable: true,
            scaleable: false,
            aspectRatio,
            crop: (event) => {
                const canvas = cropper.getCroppedCanvas();
                setPreview(canvas.toDataURL())
                setResult(canvas.toDataURL())
            }
        })

    }, [crop, setResult], aspectRatio)
    return (
        <>
            <div
                className="image-cropper"
            >
                <div className="image-edit">
                    <img className="raw-img" ref={crop} src={file} alt="pure" />
                </div>
                <div className="image-preview">
                    <img className="image-preview-self" src={preview} alt="cropped" />
                </div>
            </div>
            <div style={{ marginTop: '2rem' }}></div>
        </>
    );
}