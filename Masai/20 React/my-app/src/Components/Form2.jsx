function From2({formData, setFormData}) {
    const submit = (e) => {
        e.preventDefault();
        console.log(formData.name, formData.email, formData.password);
    };

    const handleInputChange = function (e) {
        const {name, value} = e.target;
        return setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form onSubmit={submit}>
            <div>
                <span>Name</span>
                <input
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    name="name"
                />
            </div>
            <div>
                <span>Email </span>
                <input
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                />
            </div>
            <div>
                <span>Password </span>
                <input
                    value={formData.password}
                    onChange={handleInputChange}
                    type="password"
                    name="password"
                />
            </div>

            <input type="submit" />
        </form>
    );
}

export default From2;
