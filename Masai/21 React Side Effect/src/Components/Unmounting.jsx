import {useState} from 'react';
import Hone from './Hone';

function Unmounting() {
    const [isShowing, setIsShowing] = useState(true);
    return (
        <div>
            <input
                type="checkbox"
                checked={isShowing}
                onChange={() => setIsShowing(!isShowing)}
            />

            {isShowing ? <Hone text={'Arpit jana'} /> : null}
        </div>
    );
}

export default Unmounting;
