import * as React from 'react';

import { withAuthorization } from '../Session';

const Home = () => (
    <div>
        <h1>Home works!</h1>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
