function setParams(config) {
  // console.log(config);
  const params = config.params || {};
  // eslint-disable-next-line no-param-reassign
  config.params = Object.assign(params, {
    plot: 'full',
    apikey: process.env.VUE_APP_MOVIE_API_KEY,
  });
  return config;
}
function returnData(res) {
  return res.data;
}
export default function (axios) {
  axios.interceptors.request.use(setParams);
  axios.interceptors.response.use(returnData);
}
