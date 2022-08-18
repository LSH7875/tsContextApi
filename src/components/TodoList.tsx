/**
 * 이 컴포넌트에서는 todo라는 배열을 사용하여 여러개의 TodoItems 컴포넌트를 렌더링해주는작업을 진행할 것이다.
 * 아직은 이 배열에 대한 상태가 존재하지 않으므로 이 배열을 임시적으로 TodoList 컴포넌트 내부에서 선언하도록 할 것이다.
 */

import React from 'react';
import TodoItem from './TodoItem';
import { useTodosState} from '../contexts/TodosContext'

export const todos = [
    {
        id:1,
        text: 'Context API 배우기',
        done: true
    },
    {
        id:2,
        text: 'TypeScript 배우기',
        done: true
    },
    {
        id:3,
        text: 'TypeScript 와 Context API 함께 사용하기',
        done: false
    }
];
/**
 * 컴포넌트에서 Context 사용하기
 * -TodoList에서 상태 조회하기
 * --TodoList 컴포넌트에서 Context 안의 상탤르 조회하여 내용을 렌더링할 것이다.
 * --커스텀 Hoook을 만들었기 때문에 간단하게 처리할 수 있다. 
 */
function TodoList() {
    const todo = useTodosState();

    return(
        <ul>
            {todo.map(todo=>(
                <TodoItem todo = {todo} key= {todo.id}/>
            ))}
        </ul>
    )
}

export default TodoList;