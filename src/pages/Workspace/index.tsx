import axios from 'axios';
import React, { FC, useCallback } from 'react';
import fetcher from '../../utils/fetcher';
import useSWR from 'swr';

const Workspace: FC = ({ children }) => {
  const { data, error } = useSWR('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {});
  }, []);
  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
