import {useNavigate} from 'react-router-dom';

function Home() {
    const data = ['Text-1', 'Text-2', 'Text-3'];
    const navigate = useNavigate();

    return (
        <div>
            {data.map(function (text, index) {
                return (
                    <h1
                        key={index}
                        onClick={function () {
                            return navigate(`/about/${text}`);
                        }}
                    >
                        {text}
                    </h1>
                );
            })}
        </div>
    );
}

export default Home;
