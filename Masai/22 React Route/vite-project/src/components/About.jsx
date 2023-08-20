import {useParams} from 'react-router-dom';

function About() {
    const params = useParams();
    return <h1>About:- {params.text}</h1>;
}

export default About;
