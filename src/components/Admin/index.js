import * as React from 'react';

import { withFirebase } from "../Firebase";

const usersReducer = (state, action) => {
    switch (action.type) {
        case 'START_USER_FETCH':
            return {
                ...state,
                loading: true
            };
        case 'USER_FETCH_SUCCESS':
            return  {
                ...state,
                users: action.payload,
                loading: false,
                error: null,
            };
        case 'USERS_FETCH_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            throw new Error();
    }
};

const INITIAL_STATE = {
    users: null,
    loading: false,
    error: null,
};

const Admin = ({firebase}) => {
    const [state, dispatch] = React.useReducer(usersReducer, INITIAL_STATE);

    const {loading, users, error} = state;

    React.useEffect(() => {
        dispatch({
            type: 'START_USER_FETCH'
        });
        firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            if (!usersObject) {
                dispatch({
                    type: 'USER_FETCH_SUCCESS',
                    payload: [],
                });
                return;
            }

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            dispatch({
                type: 'USER_FETCH_SUCCESS',
                payload: usersList,
            })
        });
        return () => {
            firebase.users().off();
        }
    }, []);
    return (
        <div>
            <h1>Admin</h1>

            {loading && <div>Loading</div>}

            {users && <UsersList users={users} />}
        </div>
    )
};

const UsersList = ({ users }) => (
    <ul>
        {
            users.map(user => (
                <li key={user.uid}>
                    <span>
                        <strong>ID:</strong> {user.uid}
                    </span>
                    <span>
                        <strong>E-Mail:</strong> {user.email}
                    </span>
                    <span>
                        <strong>Username:</strong> {user.username}
                    </span>
                </li>
            ))
        }
    </ul>
);

export default withFirebase(Admin);
