import * as React from 'react';
import { Link } from "react-router-dom";

import * as ROUTES from '../../constants/routes';
import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";

const Navigation = () => {
    const authUser = React.useContext(AuthUserContext);

    return (
        <div>
            {authUser ? <NavigationAuth /> : <NavigationNonAuth/>}
        </div>
    )
};

const NavigationAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li>
            <SignOutButton />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
    </ul>
);

export default Navigation;
