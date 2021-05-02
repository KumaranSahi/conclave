import axios from 'axios';

const instance=axios.create({
    baseURL:"https://conclave-api.herokuapp.com/"
})

export default instance