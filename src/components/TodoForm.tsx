/*
새 항목을 등록할 수 있는 컴포넌트
이 컴포넌트에서는 하나의 input과 하나의 button을 렌더링한다. 
input의 value값은 useState를 통해서 관리하도록 하겠다. 
추가적으로 submit 이벤트가 발생했을 때에는 새 항목을 생성하고 value 값을 초기화 할 것이다. */

/**
 * 이제 새 항목을 등록하는 작업을 구현해보자. useTodosDispatch Hook을 통해 dispatch 함수를 받아오고
 * 액션을 dispatch 해보자.
 */
import React, {useState} from 'react';
import { useTodosDispatch } from '../contexts/TodosContext'
function TodoForm() {
    const [value, setValue] = useState('');
    const dispatch = useTodosDispatch();
    const onSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        dispatch({
            type:'CREATE',
            text: value
        })
        setValue('');
    }

    return (
        <form onSubmit = {onSubmit}>
            <input
                value={value}
                placeholder = "무엇을 하실 건가요?"
                onChange={e=>setValue(e.target.value)}
            />
            <button>등록</button>
        </form>
    );
}
export default TodoForm;