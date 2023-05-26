import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {
// BEGIN (write your solution here)
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      setContent(data);
    };
    fetch();
  }, []);

  return (<p>{content}</p>);
// END
};

export default PrivatePage;
