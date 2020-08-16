import axios from 'axios'

const api = axios.create({
    baseURL:'https://anime-jies.herokuapp.com'
});

export default api;




// api.get();
// api.post();
// api.delete();