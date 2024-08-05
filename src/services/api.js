import axios from 'axios';

//https://api.themoviedb.org/3/
//movie/now_playing?api_key=e7535a6fdea0543c8db30d8af6cc5576&page=1&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;   