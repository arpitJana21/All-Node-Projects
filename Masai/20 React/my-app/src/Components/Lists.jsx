import data from '../data.json';

function Lists({formData, setFormData}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody>
                {data.map((data, index) => {
                    return (
                        <tr key={data.id}>
                            <td>{data.first_name}</td>
                            <td>{data.last_name}</td>
                            <td>{data.email}</td>
                            <td>{data.gender}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Lists;
