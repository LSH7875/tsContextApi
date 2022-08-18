//할 일 항목에 대한 정보를 보여주는 컴포넌트
//props는 todo 객체를 받아온다. 만약 todo.done 값이 참값이라면 done CSS 클래스를 적용한다. 
/**
 * TodoItem에서 항목 토글 및 제거하기
 * 이번에는 TodoItem에서 항목을 클릭했을 때 done 값을 토글하고, 우측의 (x) 버튼을 눌렀을 때 제거하는 기능을 구현해볼 것이다. 
 * 아마 일반적으로 Context를 사용하지 않는 환경에서는 TodoItem 컴포넌트에서 
 * onToggle, onRemove props를 가져와서 이를 호출하는 형태로 구현할 것이다. 
 * 하지만 지금과 같이 Context를 사용하고 있다면 이 함수들을 props를 통해서 가져오지 않고
 * 이 컴포넌트 내부에서 바로 액션을 디스패치하는 것도 꽤나 괜찮은 방법
 */
import React from 'react';
import './TodoItem.css';
import { useTodosDispatch,Todo } from '../contexts/TodosContext';

//TodoContext에서 선언했던 타입을 불러왔다.
type TodoItemProps = {
    todo:Todo;
}

// export type TodoItemProps = {
//     todo: {
//         id: number;
//         text: string;
//         done: boolean;
//     };
// }


function TodoItem({todo}:TodoItemProps) {

    const dispatch = useTodosDispatch();
    const onToggle = () =>{
        dispatch({
            type:'TOGGLE',
            id:todo.id
        });
    };

    const onRemove = () =>{
        dispatch({
            type: 'REMOVE',
            id: todo.id
        })
    }
    return (
        <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
            <span className = "text">{todo.text}</span>
            <span className = "remove" onClick = {onRemove}>(X)</span>
        </li>
    )
}

export default TodoItem;