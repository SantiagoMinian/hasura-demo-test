/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsersQuery
// ====================================================

export interface GetUsersQuery_users {
  __typename: "users";
  name: string;
  id: number;
  created_at: any;
  updated_at: any;
}

export interface GetUsersQuery {
  /**
   * fetch data from the table: "users"
   */
  users: GetUsersQuery_users[];
}
