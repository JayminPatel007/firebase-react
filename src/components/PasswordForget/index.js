import * as React from 'react';
import {Link} from "react-router-dom";

import * as ROUTE_LINKS from '../../constants/routes'
import {withFirebase} from "../Firebase";

const PasswordForget = () => (
    <div>
        <h1>PasswordForget</h1>
        <PasswordForgetForm/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null
};


const PasswordForgetFormBase = ({ firebase }) => {

    const [formData, setFormData] = React.useState(INITIAL_STATE);

    const { email, error } = formData;

    const isInvalid = email === '';

    const handleChnage = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isInvalid) {
            return
        }
        firebase.sendPasswordResetEmail(email)
            .then(() => {
                setFormData(INITIAL_STATE);
            })
            .catch(error => {
                setFormData(prevState => ({
                    ...prevState,
                    error
                }));
            });
    };

    return(
        <form onSubmit={handleSubmit}>
            <input name="email" value={email} onChange={handleChnage} placeholder="Email"/>
            <button disabled={isInvalid} type="submit">Reset My Password</button>
            {error && <p>{error.message}</p>}
        </form>
    )
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTE_LINKS.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForget;
export { PasswordForgetForm, PasswordForgetLink }
