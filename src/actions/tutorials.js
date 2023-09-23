import {
    CREATE_TUTORIAL,
    RETRIEVE_TUTORIALS,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
    DELETE_ALL_TUTORIALS,
} from './type';
import {
    create,
    getAll,
    updateById,
    deleteById,
    deleteAll,
    findByTitle,
} from '../util/tutorial';

export const createTutorial = (title, description) => async (dispatch) => {
    try {
        const response = await create({ title, description });
        dispatch({
            type: CREATE_TUTORIAL,
            payload: response.data,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        console.log('error: ', error);
        return Promise.reject(error);
    }
};

export const retrieveTutorials = () => async (dispatch) => {
    try {
        const { data } = await getAll();

        dispatch({
            type: RETRIEVE_TUTORIALS,
            payload: data,
        });

        return Promise.resolve(data);
    } catch (error) {
        console.log('error: ', error);
        return Promise.reject(error);
    }
};

export const updateTutorial = (id, data) => async (dispatch) => {
    try {
        const response = await updateById(id, data);

        dispatch({
            type: UPDATE_TUTORIAL,
            payload: response.data,
        });

        return Promise.resolve(response.data);
    } catch (error) {
        console.log('error: ', error);
        return Promise.reject(error);
    }
};

export const deleteTutorial = (id) => async (dispatch) => {
    try {
        await deleteById(id);

        dispatch({
            type: DELETE_TUTORIAL,
            payload: { id },
        });
    } catch (error) {
        console.log('error: ', error);
        return Promise.reject(error);
    }
};

export const deleteAllTutorials = () => async (dispatch) => {
    try {
        const { data } = await deleteAll();

        dispatch({
            type: DELETE_ALL_TUTORIALS,
            payload: data,
        });

        return Promise.resolve(data);
    } catch (error) {
        console.log('error: ', error);
        return Promise.reject(error);
    }
};

export const findTutorialsByTitle = (title) => async (dispatch) => {
    try {
        const { data } = await findByTitle(title);

        dispatch({
            type: RETRIEVE_TUTORIALS,
            payload: data,
        });
    } catch (error) {
        console.log('error: ', error);
    }
};
