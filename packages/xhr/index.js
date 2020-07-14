let settings;
const defaults = {
  method: 'GET',
  username: null,
  password: null,
  data: {},
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  responseType: 'text',
  timeout: null,
  withCredentials: false,
};
/**
 * Merge two or more objects together.
 * @param   {Object}   objects  The objects to merge together
 * @returns {Object}            Merged values of defaults and options
 */
const extend = () => {
  const extended = {};
  const merge = function(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };
  for (let i = 0; i < arguments.length; i++) {
    const obj = arguments[i];
    merge(obj);
  }
  return extended;
};
/**
 * Parse text response into JSON
 * @private
 * @param  {String} req The response
 * @return {Array}      A JSON Object of the responseText, plus the orginal response
 */
const parse = req => {
  let result;
  if (settings.responseType !== 'text' && settings.responseType !== '') {
    return { data: req.response, xhr: req };
  }
  try {
    result = JSON.parse(req.responseText);
  } catch (e) {
    result = req.responseText;
  }
  return { data: result, xhr: req };
};
/**
 * Convert an object into a query string
 * @link   https://blog.garstasio.com/you-dont-need-jquery/ajax/
 * @param  {Object|Array|String} obj The object
 * @return {String}                  The query string
 */
const param = obj => {
  // If already a string, or if a FormData object, return it as-is
  if (
    typeof obj === 'string' ||
    Object.prototype.toString.call(obj) === '[object FormData]'
  )
    return obj;
  // If the content-type is set to JSON, stringify the JSON object
  if (
    /application\/json/i.test(settings.headers['Content-type']) ||
    Object.prototype.toString.call(obj) === '[object Array]'
  )
    return JSON.stringify(obj);
  // Otherwise, convert object to a serialized string
  const encoded = [];
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      encoded.push(
        encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop])
      );
    }
  }
  return encoded.join('&');
};
const makeRequest = url => {
  // Create the XHR request
  const request = new XMLHttpRequest();
  // Setup the Promise
  const xhrPromise = new Promise((resolve, reject) => {
    // Setup our listener to process compeleted requests
    request.onreadystatechange = () => {
      // Only run if the request is complete
      if (request.readyState !== 4) return;
      // Process the response
      if (request.status >= 200 && request.status < 300) {
        // If successful
        resolve(parse(request));
      } else {
        // If failed
        reject({
          status: request.status,
          statusText: request.statusText,
        });
      }
    };
    // Setup our HTTP request
    request.open(
      settings.method,
      url,
      true,
      settings.username,
      settings.password
    );
    request.responseType = settings.responseType;
    // Add headers
    for (let header in settings.headers) {
      if (settings.headers.hasOwnProperty(header)) {
        request.setRequestHeader(header, settings.headers[header]);
      }
    }
    // Set timeout
    if (settings.timeout) {
      request.timeout = settings.timeout;
      request.ontimeout = e => {
        reject({
          status: 408,
          statusText: 'Request timeout',
        });
      };
    }
    // Add withCredentials
    if (settings.withCredentials) {
      request.withCredentials = true;
    }
    // Send the request
    request.send(param(settings.data));
  });
  // Cancel the XHR request
  xhrPromise.cancel = () => {
    request.abort();
  };
  // Return the request as a Promise
  return xhrPromise;
};
const http = (url, options) => {
  settings = extend(defaults, options || {});
  return makeRequest(url);
};

export { http, http as default };