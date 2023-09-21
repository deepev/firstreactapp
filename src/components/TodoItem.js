import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync, addTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();

    const handleCheckboxClick = () => {
        dispatch(toggleCompleteAsync({ id, completed: !completed }));
    };

    const handleDeleteClick = () => {
        dispatch(deleteTodoAsync({ id }));
    };

    const handleAddClick = () => {
        dispatch(addTodoAsync({ id, title, completed }));
    };
    const handleViewClick = () => {
        dispatch(toggleCompleteAsync({ id }));
    };

    return (
        <li
            className={`list-group-item ${
                completed && 'list-group-item-success'
            }`}
        >
            <div className="d-flex justify-content-between">
                <span className="d-flex align-items-center">
                    <input
                        type="checkbox"
                        className="mr-3"
                        checked={completed}
                        onClick={handleCheckboxClick}
                    ></input>
                    {title}
                </span>
                <button onClick={handleAddClick} className="btn btn-primary">
                    Add
                </button>
                <button onClick={handleViewClick} className="btn btn-primary">
                    View
                </button>
                <button onClick={handleDeleteClick} className="btn btn-danger">
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
