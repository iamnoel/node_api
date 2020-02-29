require('dotenv').config();

const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.API_PORT || 3000;

app.listen(port, () => console.log(`Application listening on ${port}`));
app.get('/', (req, res) => res.send('Hello World!'));

makeGetRequest = async () => {
  const res = await axios({method: 'get', url: 'http://webcode.me'});
  console.log('Successfully made connection:');
  const data = res.data;
  // console.log(data);
  return data;
};

getUserID = async (name) => {
  const res = await axios({
    method: 'get',
    url: `${process.env.API_SERVER}/fakedata2/${name}`,
  });
  const data = res.data;
  console.log(data);
  return data;
};

deleteUser = async (id) => {
  const res = await axios({
    method: 'get',
    url: `${process.env.API_SERVER}/fakedata1/${id}`,
    params: {
      id: id,
    },
  });
  const data = res.data;
  console.log(data);
  return data;
};

app.get('/fakedata1/:id', async (req, res) => {
  console.log('User deletion requested');
  const data = {};
  if (req.params.id == 1234) {
    data.code = 'deleted';
  } else {
    data.code = 'not deleted';
  }
  res.send(data);
});

app.get('/fakedata2/:name', async (req, res) => {
  console.log('User ID requested');
  const data = {
    name: req.params.name,
  };

  if (data.name.toLowerCase() === 'noel') {
    data.id = 1234;
  } else if (data.name.toLowerCase() == 'ward') {
    data.id = 2234;
  }

  res.send(data);
});

app.get('/route/:name', async (req, res) => {
  const {name} = req.params;
  const results = {};
  console.log(`Attempting to get user ID for ${name}`);
  const query = await getUserID(name);
  results.name = name;
  console.log(`Received ID #${query.id} for ${name}`);
  results.id = query.id;
  console.log('Submitting request to delete');
  const del = await deleteUser(query.id);
  console.log(
      `Delete request of user ${query.id} had response code: ${del.code}`,
  );
  results.code = del.code;
  res.send(results);
});

app.get('/test/', async (req, res) => {
  console.log('Initiating connection');
  const query = await makeGetRequest();
  //   console.log(dat);
  res.send(query);
});
