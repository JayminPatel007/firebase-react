import * as React from 'react';
import {withFirebase} from "../Firebase";

const SignIn = () => (
    <div>
        <h1>SignIn works</h1>
        <SignInForm />
    </div>
);

const SignInformBase = ({ firebase }) => {
    console.log('this is called');
    console.log(firebase);
    return(
        <div>
            <h1>SignIn Form Works!</h1>
        </div>
    )
};

const SignInForm = withFirebase(SignInformBase);

export default SignIn;
