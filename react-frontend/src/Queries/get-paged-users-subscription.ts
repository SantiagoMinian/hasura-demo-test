import { gql } from "@apollo/client";

export const GET_PAGED_USERS_SUB = gql`subscription GetPagedUsers($offset: Int!, $limit: Int!) {
    users(order_by: {created_at: asc}, limit: $limit, offset: $offset) {
        id
        name
        created_at
        updated_at
    }
}`;