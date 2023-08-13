import React, {useState} from 'react';

function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e) => {
        e.preventDefault();
        console.log(name, email, password);
    };

    const nameChange = function (e) {
        return setName(e.target.value);
    };

    const emailChange = function (e) {
        return setEmail(e.target.value);
    };

    const passwordChange = function (e) {
        return setPassword(e.target.value);
    };

    return (
        <form onSubmit={submit}>
            <div>
                <span>Name </span>
                <input value={name} onChange={nameChange} type="text" />
            </div>
            <div>
                <span>Email </span>
                <input value={email} onChange={emailChange} type="email" />
            </div>
            <div>
                <span>Password </span>
                <input
                    value={password}
                    onChange={passwordChange}
                    type="password"
                />
            </div>

            <input type="submit" />
        </form>
    );
}

export default Form;
