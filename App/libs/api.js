export function debounce(f, ms) {
  let timer = null;

  return function (...args) {
    const onComplete = () => {
      f.apply(this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
}

const serverAddress = 'http://jobboard.appwilio.com/api';

export function workerDemoSearch(query) {
  const requestPath = serverAddress + '/demo/employee';
  const myHeaders = new Headers();
  const raw = JSON.stringify(query);

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function hirerDemoSearch(query) {
  const requestPath = serverAddress + '/demo/employer';
  const myHeaders = new Headers();
  const raw = JSON.stringify(query);

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function register(credentials) {
  const requestPath = serverAddress + '/auth/register';
  const raw = JSON.stringify(credentials);

  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function authorize(credentials) {
  const requestPath = serverAddress + '/auth/login';
  const raw = JSON.stringify({ email: credentials.email, password: credentials.password });

  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function getProfile(access_token) {
  const requestPath = serverAddress + '/my/profile';

  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function createJob(search_query, access_token) {
  const requestPath = serverAddress + '/jobs';
  const raw = JSON.stringify(search_query);

  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function getCandidates(job, access_token) {
  const requestPath = serverAddress + '/jobs/' + job.id + '/candidates';
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  // return fetch(requestPath, requestOptions)
  //   .then(response => response.json())
  //   .catch(error => error);

  return [];
}

export function getJobDescription(job, access_token) {
  const requestPath = serverAddress + '/jobs/' + job.id;
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function getAllMyJobs(access_token) {
  const requestPath = serverAddress + '/jobs';
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function updateProfile(profile, access_token) {
  const requestPath = serverAddress + '/my/profile';

  const raw = JSON.stringify(profile);

  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function loadTaxonomies() {
  const requestPath = serverAddress + '/data/taxonomy';
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function loadPlaces() {
  const requestPath = serverAddress + '/data/locations';
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function uploadPdf(file, access_token) {
  const requestPath = serverAddress + '/my/resume';
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'multipart/form-data');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const formdata = new FormData();

  formdata.append('resume', {
    uri: file.uri,
    name: file.name,
    type: 'application/pdf'
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}

export function acceptOffer(offer_id, accept, access_token) {
  const requestPath = serverAddress + 'my/offers/' + offer_id + '/accept';
  const myHeaders = new Headers();

  const raw = JSON.stringify(accept);

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(requestPath, requestOptions)
    .then(response => response.json())
    .catch(error => error);
}
