import * as React from 'react';
import {withFirebase} from "../Firebase";

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null
};

const PasswordChangeForm = ({ firebase }) => {

    const [formData, setFormData] = React.useState(INITIAL_STATE);

    const { passwordOne, passwordTwo, error } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isInvalid) {
            return
        }
        firebase.doPasswordUpdate(passwordOne)
            .then(() => {
                setFormData(INITIAL_STATE);
            })

    };

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    };

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || passwordTwo === '';

    return(
        <form onSubmit={handleSubmit}>
            <input name="passwordOne" value={passwordOne} type="password" onChange={handleChange} placeholder="Password"/>
            <input name="passwordTwo" value={passwordTwo} type="password" onChange={handleChange} placeholder="Confirm Password"/>
            <button type="submit">Change Password</button>
            {error && <p>{error.message}</p>}
        </form>
    )
};

export default withFirebase(PasswordChangeForm);
