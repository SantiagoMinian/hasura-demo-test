/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: GetUserCount
// ====================================================

export interface GetUserCount_users_aggregate_aggregate {
  __typename: "users_aggregate_fields";
  count: number;
}

export interface GetUserCount_users_aggregate {
  __typename: "users_aggregate";
  aggregate: GetUserCount_users_aggregate_aggregate | null;
}

export interface GetUserCount {
  /**
   * fetch aggregated fields from the table: "users"
   */
  users_aggregate: GetUserCount_users_aggregate;
}
