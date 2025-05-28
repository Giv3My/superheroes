export const API = {
  root: (url = '') => url,
  superhero: (id = '') => API.root(`/superhero/${id}`),
  files: (url = '') => API.root(`/files/${url}`),
};
