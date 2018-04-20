import Axios from 'axios'
Axios.defaults.withCredentials=true;

//get请求
function get(url) {
  let getUrl = new RegExp('http').test(url) ? url : `${BASE_URL}${url}`;
  return Axios({
    url: getUrl
  })
}

//post请求
function post(url, data) {
  let getUrl = new RegExp('http').test(url) ? url : `${BASE_URL}${url}`;
  return Axios({
    method: 'post',
    url: getUrl,
    data: data,
    headers:{
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//上传表单请求
function uploadPost(url, data) {
  let getUrl = new RegExp('http').test(url) ? url : `${BASE_URL}${url}`;
  return Axios({
    method: 'post',
    url: getUrl,
    data: data,
    headers: {
      'enctype': 'multipart/form-data'
    }
  })
}

export {
  get,
  post,
  uploadPost
}
