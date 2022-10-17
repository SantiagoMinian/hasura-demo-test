import { gql, useSubscription } from '@apollo/client';
import { Slider } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { GET_PAGED_USERS_SUB } from '../Queries/get-paged-users-subscription';
import { GetPagedUsers, GetPagedUsersVariables } from '../Queries/types/GetPagedUsers';
import { GetUserCount } from '../Queries/types/GetUserCount';
import { USER_COUNT_SUB } from '../Queries/user-count-subscription';

const itemsPerPage = 10;

function lastPage(count: number): number {
  return Math.floor(count / itemsPerPage) + (count % itemsPerPage === 0 ? 0 : 1);
} 

const Home: React.FC = () => {
    const [offset, setOffset] = useState<number>(0);  

    const { loading: userCountLoading, data: userCountData } = useSubscription<GetUserCount>(USER_COUNT_SUB); 

    const count = userCountLoading ? 0 : userCountData?.users_aggregate?.aggregate?.count ?? 0;
    const pages = lastPage(count);
    const offsetPage = Math.floor(offset / itemsPerPage) + 1
    const currentPage = Math.min(offsetPage, pages);

    if(!userCountLoading && offsetPage !== currentPage) {
      setOffset((currentPage-1)*itemsPerPage);
    }
  
    const { loading: usersLoading, data: usersData } = useSubscription<GetPagedUsers, GetPagedUsersVariables>(
        GET_PAGED_USERS_SUB,
          { variables: { offset, limit: itemsPerPage } }
        );
    
    const loading = userCountLoading || usersLoading || offsetPage !== currentPage;
    
    const handleChange = (event: Event, newValue: number | number[]) => {
      setOffset((newValue as number - 1) * itemsPerPage);
      console.log(newValue);
    };

    return (<div>
      {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h1>Users</h1>
        <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
        <span>Page: {currentPage} of {pages}</span>
        &nbsp;
        <Slider sx={{width: 1/4}}
          aria-label="Page Selection"
          getAriaValueText={(v) => `Page ${currentPage} of ${pages}`}
          disabled={pages === 1}
          value={currentPage}
          valueLabelDisplay="auto"
          onChange={handleChange}
          step={1}
          marks
          min={1}
          max={pages}
        />
        </Stack>
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

export { Home };