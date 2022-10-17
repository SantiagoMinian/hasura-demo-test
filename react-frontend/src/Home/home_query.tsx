import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USERS } from '../Queries/get-users';
import { GetUsers } from '../Queries/types/GetUsers';

const HomeQuery: React.FC = () => {
    const { loading, data: usersData } = useQuery<GetUsers>(
        GET_USERS);
    
    return (<div>
      {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h1>Users</h1>
        <ul>
          {usersData?.users.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>)
}

export { HomeQuery };