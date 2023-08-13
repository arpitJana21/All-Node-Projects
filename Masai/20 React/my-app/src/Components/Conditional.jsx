import React, {useState} from 'react';
import Counter from './Counter';

function Conditional() {
    const [visible, SetVisible] = useState(true);

    const visibility = function () {
        return SetVisible(!visible);
    };

    return (
        <div>
            <input onChange={visibility} type="checkbox" />
            {visible ? <Counter /> : null}
        </div>
    );
}

export default Conditional;
