import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:8000'
});

export default api;




// api.get();
// api.post();
// api.delete();