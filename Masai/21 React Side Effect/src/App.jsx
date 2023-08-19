// import {useState} from 'react';
import './App.css';
import UpdateFetch from './Components/UpdateFectch';
import Unmounting from './Components/Unmounting';

function App() {
    // const [count, setCount] = useState(0);

    return (
        <div>
            {/* <h1>Counter:- {count}</h1>
            <button onClick={() => setCount(count + 1)}>+</button> */}
            <UpdateFetch />
            <Unmounting />
        </div>
    );
}

export default App;
