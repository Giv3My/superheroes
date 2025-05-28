export const ROUTES = {
  home: '/',
  view: '/view/:id',
  edit: '/edit/:id',
};

export const PATHS = {
  root: (url = '') => url,
  home: () => PATHS.root('/'),
  view: (id = '') => PATHS.root(`/view/${id}`),
  edit: (id = '') => PATHS.root(`/edit/${id}`),
};
