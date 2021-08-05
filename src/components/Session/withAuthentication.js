import * as React from 'react';

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
    const WithAuthentication = props => {
        console.log('WithAuthentication is called');
        const [authUser, setAuthUser] = React.useState(null);

        React.useEffect(() => {
            const listener = props.firebase.auth.onAuthStateChanged((authUser) => {
                console.log('this is called');
                console.log(authUser);
                authUser ? setAuthUser(authUser) : setAuthUser(null);
            });
            return () => {
                listener();
            }
        }, []);

        return (
            <AuthUserContext.Provider value={authUser}>
                <Component {...props} authUser={authUser}/>
            </AuthUserContext.Provider>
        );
    };
    return withFirebase(WithAuthentication);

};

export default withAuthentication;
