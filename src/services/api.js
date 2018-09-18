import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL.js';

export async function fakeAccountLogin(params) {
  // eslint-disable-next-line
  params = {"userName":"admin",
    "password":"123456",
    "storeId":"1",
    "verifyCode":"ab1255",
  }
  return request(`${prefix}MeiYe/login?${stringify(params)}`, {
    method: 'POST',
    body: params,
  });
  // return request(prefix + 'MeiYe/login', {
  //   method: 'POST',
  //   body: params,
  // });
  // const httpRequest = new XMLHttpRequest();
  // if ("withCredentials" in httpRequest){
  //     // XHR has 'withCredentials' property only if it supports CORS
  //     httpRequest.open('POST', `${prefix}MeiYe/login`, true);
  // } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
  //   httpRequest = new XDomainRequest();
  //   httpRequest.open('POST', `${prefix}MeiYe/login`);
  // } else {
  //   httpRequest = null;
  // }

  // if (!httpRequest) {
  //   alert('Giving up :( Cannot create an XMLHTTP instance');
  //   return false;
  // }
  // httpRequest.onreadystatechange = (d) => {
  //   if (httpRequest.readyState === XMLHttpRequest.DONE) {
  //     debugger
  //     if (httpRequest.status === 200) {
  //       alert(httpRequest.responseText);
  //     } else {
  //       alert('There was a problem with the request.');
  //     }
  //   }
  // };
  // // httpRequest.open('post', prefix + 'MeiYe/login');
  // httpRequest.setRequestHeader('Content-Type', 'application/json');
  // httpRequest.send(JSON.stringify(params));
}

export async function fakeRegister(params) {
  
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
