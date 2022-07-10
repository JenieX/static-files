// "start": "node --inspect=192.168.1.39:3906 static-files.js"
// "start": "node static-files.js"
// npm install --save-dev eslint
// eslint --init
// pm2 start "D:\GitHub\static-files"

const axios = require('axios');
const fs = require('fs-extra');
const express = require('express');

const app = express();
app.set('port', 3905);
app.use(require('cors')());

app.get('/node-proxy/', async ({ query: { url } }, response) => {
  if (!url) {
    response.status(400).send('No url provided');
    return;
  }
  const responseText = (await axios.get(url)).data;
  response.type('.js').send(responseText);
});

// http://192.168.1.39:3905/user-script?folder=pretending.tab.media.viewer&_=.js
app.get('/user-script/', async ({ query: { folder } }, response) => {
  if (!folder) {
    response.status(400).send('No folder provided');
    return;
  }
  const userscript = fs.readFileSync(`D:\\GitHub\\${folder}\\${folder}.user.js`).toString();
  response.type('.js').send(userscript);
});

// http://192.168.1.39:3905/user-script-grunt?folder=userscript-modules-template&_=.js
app.get('/user-script-grunt/', async ({ query: { folder } }, response) => {
  if (!folder) {
    response.status(400).send('No folder provided');
    return;
  }
  const userscript = fs.readFileSync(`D:\\GitHub\\${folder}\\dist\\${folder}.user.js`).toString();
  response.type('.js').send(userscript);
});

app.listen(app.get('port'), () => {
  console.log(`Node app is running at http://192.168.1.39:${app.get('port')}`);
});
