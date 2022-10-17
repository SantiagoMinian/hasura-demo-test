import { gql, useSubscription } from '@apollo/client';
import { Slider } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { GET_PAGED_USERS_SUB } from '../Queries/get-paged-users-subscription';
import { GetPagedUsers, GetPagedUsersVariables } from '../Queries/types/GetPagedUsers';
import { GetUserCount } from '../Queries/types/GetUserCount';
import { USER_COUNT_SUB } from '../Queries/user-count-subscription';
import { calculatePagination, itemsPerPage } from '../util';

const usePagination = (itemsPerPage: number) => {
  const [offset, setOffset] = useState<number>(0);  

  const { loading: userCountLoading, data: userCountData } = useSubscription<GetUserCount>(USER_COUNT_SUB); 

  const count = userCountLoading ? 0 : userCountData?.users_aggregate?.aggregate?.count ?? 0;
  const { pages, offsetPage, currentPage } = calculatePagination(count, itemsPerPage, offset);

  if(!userCountLoading && offsetPage !== currentPage) {
    setOffset((currentPage-1)*itemsPerPage);
  }
  
  return { loading: userCountLoading || offsetPage !== currentPage, offset, currentPage, numPages: pages, setPage: (v: number) => setOffset((v-1) * itemsPerPage) }
}

const Home: React.FC = () => {

    const { loading: paginationLoading, offset, currentPage, numPages, setPage } = usePagination(itemsPerPage);
  
    const { loading: usersLoading, data: usersData } = useSubscription<GetPagedUsers, GetPagedUsersVariables>(
        GET_PAGED_USERS_SUB,
          { variables: { offset, limit: itemsPerPage } }
        );
    
    const loading = paginationLoading || usersLoading;
    
    const handleChange = (event: Event, newValue: number | number[]) => {
      setPage(newValue as number);
    };

    return (<div>
      {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h1>Users</h1>
        <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
        <span>Page: {currentPage} of {numPages}</span>
        &nbsp;
        <Slider sx={{width: 1/4}}
          aria-label="Page Selection"
          getAriaValueText={(v) => `Page ${currentPage} of ${numPages}`}
          disabled={numPages === 1}
          value={currentPage}
          valueLabelDisplay="auto"
          onChange={handleChange}
          step={1}
          marks
          min={1}
          max={numPages}
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