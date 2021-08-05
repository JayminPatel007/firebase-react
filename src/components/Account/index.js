import * as React from 'react';

import {PasswordForgetForm} from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization } from '../Session'

const Account = () => (
    <div>
        <h1>Account Page</h1>
        <PasswordForgetForm/>
        <PasswordChangeForm/>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
