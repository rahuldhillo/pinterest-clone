import axios from 'axios';

export default axios.create({
    baseURL: "https://api.unsplash.com/",
    headers: {
        Authorization: "Client-ID tB0TstJ6WH0_0sk84M0g7JcPbwnuWGHobHJtTam7dzg"
    }
});