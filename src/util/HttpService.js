import axios from 'axios';
import toast from 'react-hot-toast';

axios.interceptors.response.use(null, (error) => {
    console.log('Interceptor Error: ', error);
    toast.remove()
    const expectedError =
        error.response && error.response.status >= 400 && error.response.status < 500;
        
        console.log(' error.response >= 400: ',  error.response >= 400);
        console.log(' error.response : ',  error.response );

    if (expectedError) {
        console.log('Logging the error', error);
        toast.error(error.response.data.message ?? error.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
};
