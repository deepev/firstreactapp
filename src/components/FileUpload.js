// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useForm } from 'react-hook-form';

// const FileUpload = () => {
//     const [fileName, setFileName] = useState('');
//     const [selectedFile, setSelectedFile] = useState();
//     const [errorMsg, setErrorMsg] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);

//     const saveFile = (e) => {
//         if (e.target.files.length > 0) {
//             setSelectedFile(e.target.files[0]);
//             setFileName(e.target.files[0].name);
//         }
//     };

//     const { reset } = useForm();

//     const access_token = localStorage.getItem('token');
//     const uploadFile = async () => {
//         const maxFileSize = 2 * 1024 * 1024;
//         if (!selectedFile) {
//             setErrorMsg('Please choose a file');
//             setIsSuccess(false);
//             return;
//         }

//         const fileSizeKiloBytes = selectedFile.size / 1024;

//         if (fileSizeKiloBytes > maxFileSize) {
//             setErrorMsg(`Please upload less than ${maxFileSize} MB`);
//             setIsSuccess(false);
//             return;
//         }

//         setErrorMsg('');
//         setIsSuccess(true);
//         const formData = new FormData();
//         formData.append('file', selectedFile);
//         formData.append('fileName', fileName);
//         try {
//             const response = await axios.post(
//                 'http://localhost:8000/api/file/create',
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `${access_token}`,
//                         Accept: 'application/json',
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 },
//             );
//             if (response.status == 200) {
//                 toast.success('Your file upload successfully');
//             }
//             reset();
//         } catch (error) {
//             console.log('error: ', error);
//         }
//     };

//     return (
//         <div className="App">
//             <input type="file" onChange={saveFile} />
//             <p className="error-message">{errorMsg}</p>
//             <button className='btn btn-primary' onClick={uploadFile}>Upload</button>
//         </div>
//     );
// };

// export default FileUpload;

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { ProgressBar } from 'react-bootstrap';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState();

    const { reset } = useForm();

    const onSubmit = () => {
        if (!files.length) {
            toast.remove();
            toast.error('Please select a file!');
            return false;
        }

        const formData = new FormData();
        files.forEach((file) => formData.append('file', file));

        const access_token = localStorage.getItem('token');
        try {
            axios
                .post('http://localhost:8000/api/file/create', formData, {
                    headers: {
                        Authorization: `${access_token}`,
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: data => {
                        setProgress(Math.round((100 * data.loaded) / data.total))
                    }
                })
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Your file upload successfully');
                        reset();
                    }
                });
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Select File :</label>
                        <input
                            type="file"
                            className="form-control"
                            multiple
                            name="file"
                            onChange={(e) =>
                                setFiles(
                                    e.target.files
                                        ? Array.from(e.target.files)
                                        : [],
                                )
                            }
                        />
                    </div>
                </div>
                <br />
                <div className="form-row">
                    <div className="col-md-6">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => onSubmit()}
                        >
                            Upload File
                        </button>
                    </div>
                </div>
                <br />
                { progress && <ProgressBar now={progress} label={`${progress}%`} />}
                {/* {this.state.responseArray.map((res, i) => (
                    <div key={i}>
                        <div className={'img-alert alert alert-' + res.status}>
                            <div>
                                {res.message} : {res.url}
                            </div>
                            <img src={res.base64} />
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default FileUpload;
