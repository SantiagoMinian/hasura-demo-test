import { gql } from "@apollo/client";

export const USER_COUNT_SUB = gql`subscription GetUserCount {
    users_aggregate {
        aggregate {
            count
        }
    }
}`;