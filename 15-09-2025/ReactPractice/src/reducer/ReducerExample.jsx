import { useReducer } from "react"

const initialValue = { name: 'don', count: 1 }

const ReducerExample = () => {
    const [state, dispatch] = useReducer(ReducerFn, initialValue)

    function handleIncrement(e) {
        dispatch({ type: 'increment_age' })
    }

    function handleDecrement(e) {
        dispatch({ type: 'decrement_age' })
    }

    return (<>
        <p>{state.name}</p>
        <p>{state.count}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
    </>)


}

function ReducerFn(state, action) {
    switch (action.type) {
        case 'increment_age': {
            return {
                name: state.name,
                count: state.count + 1
            }
        }
        case 'decrement_age': {
            return {
                name: state.name,
                count: state.count - 1
            }
        }
        case 'reset': {
            return {
                name: state.name,
                count: state.count
            }
        }
    }
    throw Error('Unknown_actionType' + action.type)

}


export default ReducerExample