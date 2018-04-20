import QueryString from 'querystring';

function getQueryString(name) {
  const queryUrl = QueryString.parse(decodeURIComponent(window.location.search.split('?')[1]));
  if (name) {
    return queryUrl[name];
  }
  return queryUrl;
}

function getHashString(name) {
  const HashUrl = QueryString.parse(decodeURIComponent(window.location.hash.split('?')[1]));
  if (name) {
    return HashUrl[name];
  }
  return HashUrl;
}

export {
  getQueryString,
  getHashString
}
