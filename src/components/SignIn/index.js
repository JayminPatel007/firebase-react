import * as React from 'react';
import { Link, useHistory } from "react-router-dom";

import { withFirebase } from "../Firebase";
import { SignUpLink } from "../SignUp";
import * as ROUTES from "../../constants/routes";
import { PasswordForgetLink } from "../PasswordForget";

const SignIn = () => (
    <div>
        <h1>Sign In</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

const SignInformBase = ({ firebase }) => {

    const [formData, setFormData] = React.useState(INITIAL_STATE);
    const history = useHistory();

    const { email, password, error } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isInvalid) {
            return
        }
        firebase.signInWithEmailAndPassword(email, password)
            .then(authUser => {
                setFormData(INITIAL_STATE);
                history.push(ROUTES.HOME);
            })
            .catch(error => {
                setFormData(prevState => ({
                    ...prevState,
                    error
                }))
            })

    };

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    };

    const isInvalid = email === '' || password === '';

    return(
        <form onSubmit={handleSubmit}>
            <input name="email" value={email} type="text" onChange={handleChange} placeholder="Email"/>
            <input name="password" value={password} type="password" onChange={handleChange} placeholder="Password"/>
            <button type="submit">Sign In</button>
            {error && <p>{error.message}</p>}
        </form>
    )
};

const SignInForm = withFirebase(SignInformBase);

const SignInLink = () => (
    <p>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
);

export default SignIn;

export {SignInLink};
