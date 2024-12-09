import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzM2ZGZiMTUyNThkZWMxYjNjODJmMTExNWNjZDAwZSIsIm5iZiI6MTczMTM0NjcwOS4xMDA5OTk4LCJzdWIiOiI2NzMyNDExNTBmM2Y1YTRhMDlhNjhmYTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IG23tlHhQvgB9ksmrLW09mqIH0-VPOcJ0FJybrNEl_c`,
  },
});

export default api;
