import React,{useCallback}  from 'react'
import UploadIcon from '../assets/icon/upload.icon'
import {useDropzone} from 'react-dropzone'

const Uploader =({ onChange, imageURL , text })=>{
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf',
    multiple: false,

    onDrop: useCallback(
      (acceptedFiles) => {  
        onChange(acceptedFiles);
      },
      [onChange]
    ),
  });
    return (
        <div className="bg-white p-4">
            <p>
            {text}
            </p>
            <div className="uploader-wrapper br-4 p-4" {...getRootProps()}>
            <input   {...getInputProps()} />
                <UploadIcon></UploadIcon>
            <div className="mt-2">
                <span className="text-primary font-weight-bold">Drag/Upload  </span>your image here.
            </div>
            </div>
        </div>
    ) ; 
}
export default Uploader;