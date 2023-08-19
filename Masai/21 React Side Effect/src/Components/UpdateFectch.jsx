import {useEffect, useState} from 'react';

const API = 'https://jsonplaceholder.typicode.com/todos/';

function UpdateFetch() {
    const [currElement, setCurrElement] = useState(1);
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(
        function () {
            fetch(`${API}/${currElement}`)
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    setFetchedData(data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        [currElement]
    );

    return (
        <div>
            <h1>Counter:- {currElement}</h1>
            {/* <button onClick={() => setCurrElement(currElement + 1)}>+</button> */}
            <button onClick={() => setCurrElement(currElement + 1)}>+</button>
            {fetchedData ? <h3>{JSON.stringify(fetchedData)}</h3> : null}
        </div>
    );
}

export default UpdateFetch;
