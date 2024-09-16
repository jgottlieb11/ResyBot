import axios from 'axios';
import http from 'http';
import https from 'https';
import zlib from 'zlib';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const http2Adapter = require('axios-http2-adapter').default;
const dnsCache = require('dns-cache');

dnsCache({
  ttl: 600,
  cachesize: 1000 
});

const axiosInstance = axios.create({
  baseURL: 'https://api.resy.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'User-Agent': 'axios/1.7.2',
  },
  timeout: 5000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  transformRequest: [(data, headers) => {
    if (data && data.constructor && data.constructor.name === 'FormData') {
      delete headers['Content-Encoding'];
      return data;
    }

    if (data) {
      headers['Content-Encoding'] = 'gzip';
      return zlib.gzipSync(data);
    }
    return data; // If data is undefined, return it as is.
  }],
});

axiosInstance.defaults.adapter = http2Adapter;

export default axiosInstance;
