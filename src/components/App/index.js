import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import * as ROUTES from '../../constants/routes'
import Navigation from '../Navigation'
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import SingUpPage from '../SignUp';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

const App = () => {
    return(
        <Router>
            <Navigation/>
            <hr/>
            <Switch>
                <Route path={ROUTES.SIGN_UP} component={SingUpPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
                <Route path={ROUTES.LANDING} component={LandingPage}/>
            </Switch>

        </Router>
    )
};

export default App;
