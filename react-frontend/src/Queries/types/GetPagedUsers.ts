/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: GetPagedUsers
// ====================================================

export interface GetPagedUsers_users {
  __typename: "users";
  id: number;
  name: string;
  created_at: any;
  updated_at: any;
}

export interface GetPagedUsers {
  /**
   * fetch data from the table: "users"
   */
  users: GetPagedUsers_users[];
}

export interface GetPagedUsersVariables {
  offset: number;
  limit: number;
}
