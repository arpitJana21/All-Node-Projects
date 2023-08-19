import {useEffect} from 'react';

function Hone(props) {
    const resizeHandler = function () {
        console.log(props.text);
    };
    useEffect(function () {
        window.addEventListener('resize', resizeHandler);
        return function () {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return <h1>{props.text}</h1>;
}

export default Hone;
