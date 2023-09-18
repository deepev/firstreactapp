import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useDebounce from '../hooks/useDebounce';

// const debounce = (func, wait) => {
//     let timeout;

//     return (...args) => {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func(...args), wait);
//     };
// };

const FileList = () => {
    const [fileNames, setFileNames] = useState([]);
    const [suggestions, setSuggestions] = useState('')
    const inputElem = useRef(null)
    const base_url = 'http://localhost:8000/api';
    const BASE_URL = `https://api.nationalize.io/?name=`;
    const access_token = localStorage.getItem('token');

    const { debounce } = useDebounce();


    const fetchNameResults = async (inputVal) => {
        try {
            if (inputVal !== '') {
                const { data } = await axios.get(`${BASE_URL}${inputVal}`);
                setSuggestions(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const fileData = () => {
        axios
            .get(`${base_url}/file/list`, {
                headers: {
                    Authorization: `${access_token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(({ data }) => {
                setFileNames(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {

        // 1 debouncing approach using setTimeout
        // const fileData = setTimeout(() => {
        //     axios
        //         .get(`${base_url}/file/list`, {
        //             headers: {
        //                 Authorization: `${access_token}`,
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //             }
        //         })
        //         .then(({ data }) => {
        //             setFileNames(data);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }, 2000);
        // return () => clearTimeout(fileData);
        fileData();
    }, []);   

    const DeleteFile = async (fileId) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Are you sure that you want to delete this file?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!' 
            }).then(result => {
                if (result.isConfirmed) {
                    axios.delete(
                        `${base_url}/file/get/${fileId}`,
                        {
                            headers: {
                                Authorization: `${access_token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    ).then(() => {
                        Swal.fire('Your file has been deleted successfully!')
                        fileData();
                    });
                } else {
                    fileData();
                }
            }) 
            // const response = await axios.delete(
            //     `${base_url}/file/get/${fileId}`,
            //     {
            //         headers: {
            //             Authorization: `${access_token}`,
            //             'Content-Type': 'application/json'
            //         }
            //     }
            // );
            // if (response.status == 200) {
            //     toast.success('File Deleted Successfully');
            //     // return navigate('/file-list')
            // }
        } catch (error) {
            console.log('error: ', error);
        }
    }; 

    const handleSearch = useCallback(debounce(inputVal => fetchNameResults(inputVal), 500), []);
    const FileTable = () => {
        return fileNames?.data?.map((file, index) => {
            return <tr key={file.id}>
                <td>{index + 1}</td>
                <td>{file.name}</td>
                <td>
                    <Link to={`/file/get/${file._id}`} className='btn btn-sm btn-info'>
                        View
                    </Link>
                    {/* <Link to={`/file/remove/${file._id}`} className='btn btn-sm btn-danger'>
                        Delete
                    </Link> */}
                    <button type="submit" className="btn btn-danger" onClick={ () => DeleteFile(file._id) }>
                        Delete
                    </button>
                </td>
            </tr>;
        });
    };

    return (
        <div className="container mt-5">
            <h1> Your file List</h1>
            <input
                ref={inputElem}
                placeholder='Search your name here....'
                onChange={() => handleSearch(inputElem.current?.value)}
            />
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {FileTable()}
                </tbody>
            </table>
        </div>
    );
}

export default FileList;
