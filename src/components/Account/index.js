import * as React from 'react';

import {PasswordForgetForm} from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization } from '../Session'
import AuthUserContext from "../Session/context";

const Account = () => {
    const authUser = React.useContext(AuthUserContext);
    return (
    <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm/>
        <PasswordChangeForm/>
    </div>
)};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
