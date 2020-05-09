"use strict";
const axios = require("axios");
const { get } = require("lodash");
const instance = axios.create({
  baseURL: process.env.FVPN_ACCOUNT_URL,
});

instance.interceptors.request.use(
  function (config) {
    // config.headers["Authorization"] = "Bearer " + store.get("token", "");
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error) {
    const response = get(error, "response", undefined);
    // Do something with response error
    return Promise.reject(response);
  }
);

module.exports = instance;
