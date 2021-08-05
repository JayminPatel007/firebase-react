import * as React from 'react';
import { useHistory } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import {withFirebase} from "../Firebase";
import AuthUserContext from "./context";

const withAuthorization = condition => Component => {
    const authUser = React.useContext(AuthUserContext);
    const WithAuthorization = (props) => {
        const history = useHistory();
        React.useEffect(() => {
            console.log('withAuthorization is called');
            console.log(props.firebase);
            const listener = props.firebase.auth.onAuthStateChanged(
                authUser => {
                    console.log('withAuthorization');
                    if (!condition(authUser)) {
                        history.push(ROUTES.SIGN_IN);
                    }
                }
            );
            return () => {
                listener();
            };
        }, []);
        return (
            <>{condition(authUser) ? <Component {...props}/> : null}</>
        )
    }
    return withFirebase(WithAuthorization);
};

export default withAuthorization;
