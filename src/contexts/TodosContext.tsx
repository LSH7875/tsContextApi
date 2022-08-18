/**
 * 2개의 context를 만들어보도록 하겠다.
 * 하나는 상태전용 Context이고, 또 다른 하나는 디스패치 전용 context
 * 두개의 context를 만들면 렌더링 낭비를 방지할 수 있다. 
 * 
 * 만약 상태와 디스패치 함수를 하나의 context를 넣게 되면 
 * todoForm 컴포넌트처럼 상태는 필요하지 않고,
 * 디스패치 함수만 필요한 컴포넌트도 상태가 업데이트 될 때 리렌더링 하게 된다.
 * 두개의 Context를 만들어서 관리한다면 이를 방지할 수 있다.
 */


/**상태전용 Context */

import React, { createContext,Dispatch,useReducer,useContext} from 'react';
import {todos} from '../components/TodoList'
//나중에 다른 컴포넌트에서 타입을 불러와서 쓸 수 있도록 내보내겠다. 

export type Todo = {
    id : number;
    text: string;
    done: boolean;
};

type TodosState = Todo[];

const TodosStateContext = createContext<TodosState | undefined>(undefined);
//context를 만들 땐 위와 같이 createContext 함수의 Generics를 사용하여 Context에서 관리할 값의 상태를 설정해 줄 수 있다. 
// 추후 우리가 provider를 사용하지 않았을 때는 Context의 값이 undefined가 되어야 하므로 
// <TodoState | undefined> 와 같이 TodoState 일수도 있고 undefined일 수도 있다고 선언을 해주자
 



/**
 * 액션 타입 선언하기
 * 액션들을 위한 타입스크립트 타입ㄷ를을 선택해주자. 우리는 총 3가지 액션을 만들 ㅣ것이다.ㅣ 
 * - create: 새로운 항목 생성
 * - Toggle: done 값 반전
 * - Remove: 항목 제거
 */

type Action = 
    | {type: 'CREATE'; text: string}
    | {type: 'TOGGLE'; id: number}
    | {type: 'REMOVE'; id: number};

//이렇게 액션들의 타입을 선언하고 나면, 우리가 디스패치를 위한 Context를 만들 때 디스패치 함수의 타입을 정할 수 있게 된다. 

type TodosDispatch = Dispatch<Action>;
const TodosDispatchContext = createContext<TodosDispatch | undefined>(undefined);

//Dispatch를 리액트 패키지에서 불러와서 Generic으로 액션들의 타입을 넣어주면 
//추후 컴포넌트에서 액션을 디스패치할 때 액션들에 대한 타입을 검사할 수 있다. 
// 예를 들어 액션에 추가적으로 필요한 값(text나 id)이 빠지면 오류가 발생한다. 

/**
 * 리듀서 작성하기
 */
//:뒤에 쓰는 값은 리턴값임
function todoReducer(state: TodosState, action:Action):TodosState{
    switch (action.type){
        case 'CREATE':
            const nextId = Math.max(...state.map(todo =>todo.id)) +1;
            return state.concat({
                id:nextId,
                text:action.text,
                done: false
            });
        case 'TOGGLE': 
            return state.map(todo =>
                todo.id === action.id? {...todo, done:!todo.done} :todo
                )
        
        case 'REMOVE': 
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error('Unhanddled action')
    }
}

/**
 * TodosProvider 만들기
 */

export function TodosContextProvider({children}: {children:React.ReactNode}){
    const [todo,dispatch] = useReducer(todoReducer,todos);
    return (
        <TodosDispatchContext.Provider value = {dispatch}>
            <TodosStateContext.Provider value = {todo}>
                {children}
            </TodosStateContext.Provider>
        </TodosDispatchContext.Provider>
    )
}
//dispatch가 상위에 위치하고 state가 하위에 위치한다. 잘 기억해놔야 겠다.

/**
 * 커스텀 Hook 2개 작성하기
 * 
 * 우리가 추후 TodosStateContext랑 TodosDispatchContext를 사용할 때
 * useContext를 사용해서 Context 안의 값을 사용할 수 있다.
 * 이 때 todos 의 타입은 TodosState일 수도 있고 undefined일 수도 있다.
 * 그래서 해당 배열을 사용하기 전에 꼭 해당값이 유효한지 확인을 해주어야 한다. 
 * ```
 * const todos  = useContext(TodosStateContext);
 * if(!todo) return null
 * ```
 * 더 좋은 방법은 TodoContext 전용 Hooks를 작성해서 조금 더 편리하게 사용하는 것이다.
 * 다음과 같이 코드를 작성하면 추후 상태 또는 디스패치를 더욱 편하게 이용할 수도 있고,
 * 컴포넌트에서 사용할 때 유효성 검사도 생략할 수 있다. 
 */

 //import { useContext} from 'react';

 export function useTodosState(){
     const state = useContext(TodosStateContext);
     if(!state) throw new Error('TodosProvider not found');
     return state;
 }

 export function useTodosDispatch(){
    const dispatch = useContext(TodosDispatchContext);
    if(!dispatch) throw new Error('TodosProvider not found');
    return dispatch;
 }
//이렇게 만약 함수 내부에서 필요한 값이 ㅇ뮤효하지 않다면 에러를 throw하여 
//각 Hook이 반환하는 값의 타입은 언제나 유효하다는 것을 보장ㄹ받을 수 있습니다.
//만약 유효하지 않다면 브라우저의 콘솔에 에러가 바로 나타난다.
//이제 Context 작성이 모두 끝났다. 
//useTodosState와 useTodosDispatch는 다른 컴포넌트에서 불러와서
//사용할 수 있도록 사용할 수 있도록 내보내주셔야 합니다. 


