import React, {useState} from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = function () {
        setCount(count + 1);
    };

    const decrement = function () {
        setCount(count - 1);
    };

    return (
        <div>
            <h1>Simple Counter App</h1>
            <p>Count: {count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}

export default Counter;
