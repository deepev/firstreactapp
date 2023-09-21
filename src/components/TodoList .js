// import React, { useEffect, useState } from 'react';
// import TodoItem from './TodoItem';
// import { useSelector } from 'react-redux';

// const TodoList = () => {
//     const [name, setName] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         let todo = {
//             name: name,
//         };
//         setName('');
//         // this.props.createToDo(todo);
//     };

//     return (
//         <div>
//             <h1>Simple To-Do Application</h1>
//             <hr />
//             <div>
//                 <h3>Add Task </h3>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         onChange={(e) => setName(e.target.value) }
//                         className="form-control"
//                     />
//                     <br />
//                     <input
//                         type="submit"
//                         className="btn btn-success"
//                         value="ADD"
//                     />
//                 </form>
//                 <hr />
//                 {/* {
//                     <ul className="list-group">
//                         {this.props.todo.map((todo, i) =>
//                             this.listView(todo, i),
//                         )}
//                     </ul>
//                 } */}
//             </div>
//         </div>
//     );
// };

// export default TodoList;

import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodoAsync, getTodosAsync } from '../redux/todoSlice';

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    useEffect(() => {
        dispatch(getTodosAsync());
        dispatch(deleteTodoAsync());
    }, [dispatch]);

    return (
        <ul className="list-group" >
            {todos?.data?.map((todo) => (
                <TodoItem
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                />
            ))}
        </ul>
    );
};

export default TodoList;
