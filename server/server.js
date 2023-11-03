// const express = require('express');
// const app = express();
const axios = require('axios');
// const port = 5000;

axios.get('http://api.weatherapi.com/v1/current.json?key=79321e0ff0754028ba8171750232009&q=Astana').then(data => {
    console.log(data.data.current.temp_c)
})