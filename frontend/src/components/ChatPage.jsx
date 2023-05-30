import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from '../slices/channelsInfo.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s);
  console.log('state', state);
  console.log('here!');

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchData();
      dispatch(response);
    };
    fetch();
  }, [dispatch]);

  return (
    <h1>ChatPage</h1>
  );
};

export default ChatPage;
