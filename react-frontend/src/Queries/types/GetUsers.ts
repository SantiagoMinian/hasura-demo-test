/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: GetUsers
// ====================================================

export interface GetUsers_users {
  __typename: "users";
  name: string;
  id: number;
  created_at: any;
  updated_at: any;
}

export interface GetUsers {
  /**
   * fetch data from the table: "users"
   */
  users: GetUsers_users[];
}
