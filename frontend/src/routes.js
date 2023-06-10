const apiPath = '/api/v1';

export const api = {
  loginPath: () => '/login',
  signupPath: () => '/signup',
  dataPath: () => '/data',
};

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
};
