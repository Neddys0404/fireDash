import React from 'react';
import axios from 'axios';

export default axios.create({

    baseURL: import.meta.env.VITE_BASEAPIURL,
    headers: {
        "Content-type": "application/json"
    },
    responseType: "json",

});