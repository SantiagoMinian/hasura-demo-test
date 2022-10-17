import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsersQuery {
    users {
      name
      id
      created_at
      updated_at
    }
  }
`;