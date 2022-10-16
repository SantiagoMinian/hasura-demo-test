import { useQuery, gql, useSubscription } from '@apollo/client';
import React from 'react';


interface User {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface UserVars {
  name: string;
}

const GET_USERS_BY_NAME = gql`
  query GetUser($name: String!) {
    users(where: {name: {_eq: $name}}) {
      name
      id
      created_at
      updated_at
    }
  }
`;


const GET_USERS_BY_NAME_SUB = gql`
  subscription GetUser($name: String!) {
    users(where: {name: {_eq: $name}}) {
      name
      id
      created_at
      updated_at
    }
  }
`;

const GET_USERS_SUB = gql`
  subscription GetUsers {
    users {
      name
      id
      created_at
      updated_at
    }
  }
`;

const Home: React.FC = () => {
    const { loading, data, error } = useSubscription<{users: User[]}, UserVars>(
        GET_USERS_SUB,
          /* { variables: {  } } */
        );
      
        console.log(loading, data, error)

    return (<div>
        {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Users</h1>
          <ul>
            {data?.users.map((user) => (
              <li key={user.id}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>)
}

export { Home };