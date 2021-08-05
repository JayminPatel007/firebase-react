import * as React from 'react';

import { withFirebase } from "../Firebase";

const SignOutButton = ({firebase}) => (
    <button onClick={firebase.signOut()}>
        Sign Out
    </button>
);

export default withFirebase(SignOutButton);
