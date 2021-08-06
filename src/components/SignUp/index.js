import * as React from 'react';
import { Link, useHistory } from "react-router-dom";

import * as ROUTES from '../../constants/routes';
import FirebaseContext, { withFirebase } from "../Firebase";
import {SignInLink} from '../SignIn'

const SignUp = () => {
    return (
        <div>
            <h1>SignUp</h1>
            <SignUpForm/>
            <SignInLink />
        </div>
    )
};

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUpFormBase = ({firebase}) => {
    const [formData, setFormData] = React.useState(INITIAL_STATE);
    const history = useHistory();

    const {username, email, passwordOne, passwordTwo, error} = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isInvalid) {
            return;
        }
        firebase.createUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return firebase.user(authUser.user.uid)
                    .set({
                        username,
                        email
                    });
            })
            .then(() => {
                console.log('success');
                setFormData(INITIAL_STATE);
                history.push(ROUTES.HOME);
            })
            .catch(
                error => {
                    console.log(error);
                    setFormData(prevState => ({
                        ...prevState,
                        error
                    }))
                }
            );
    };

    const handleChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };

    const isInvalid = passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

    return(
        <form onSubmit={handleSubmit}>
            <input name="username" value={username} onChange={handleChange} type="text" placeholder="Full Name"/>
            <input name="email" value={email} onChange={handleChange} type="text" placeholder="Email"/>
            <input name="passwordOne" value={passwordOne} onChange={handleChange} type="password" placeholder="Password"/>
            <input name="passwordTwo" value={passwordTwo} onChange={handleChange} type="password" placeholder="Confirm Password"/>
            <button type="submit">Sign Up</button>
            {error && <p>{error.message}</p>}
        </form>
    )
};

const SignUpForm = withFirebase(SignUpFormBase);

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

export default SignUp;

export {SignUpForm, SignUpLink};
