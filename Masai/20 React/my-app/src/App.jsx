import React, {useState} from 'react';
import Lists from './Components/Lists';
import Form2 from './Components/Form2';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    return (
        <div>
            <Form2 formData={formData} setFormData={setFormData} />
            <Lists formData={formData} setFormData={setFormData} />
        </div>
    );
}

export default App;
