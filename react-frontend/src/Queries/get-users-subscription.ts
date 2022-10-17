import { gql } from "@apollo/client";

export const GET_USERS_SUB = gql`
  subscription GetUsers {
    users {
      name
      id
      created_at
      updated_at
    }
  }
`;