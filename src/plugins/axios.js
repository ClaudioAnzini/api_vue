import axios from 'axios';

const info = {
  apiKey: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzM2ZGZiMTUyNThkZWMxYjNjODJmMTExNWNjZDAwZSIsIm5iZiI6MTczMTM0NjcwOS4xMDA5OTk4LCJzdWIiOiI2NzMyNDExNTBmM2Y1YTRhMDlhNjhmYTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IG23tlHhQvgB9ksmrLW09mqIH0-VPOcJ0FJybrNEl_c',
  url: 'https://www.themoviedb.org/',
  apiURL: 'https://api.themoviedb.org/',
  apiAvatar: 'https://image.tmdb.org/',
};

const api = axios.create({
  baseURL: `${info.apiURL}/3/`,
  headers: {
    Authorization: `Bearer ${info.apiKey}`,
  },
});

export default api;
export { info };
