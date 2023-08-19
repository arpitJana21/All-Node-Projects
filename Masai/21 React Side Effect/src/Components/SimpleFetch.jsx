import {useEffect} from 'react';
const API = 'https://jsonplaceholder.typicode.com/todos/';

function SimpleFetch() {
    useEffect(() => {
        fetch(API)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                console.log(data);
            });
    }, []);
}

export default SimpleFetch;
