export type RouteType = {
  method: 'get' | 'post' | 'patch' | 'delete';
  path: string;
  function: Function;
};
