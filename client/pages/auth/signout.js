import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const signout = () => {
  const { doRequest, errors } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/auth/signin')
  })

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className="container">
      Signing you out
    </div>
  )
}

export default signout;