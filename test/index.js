const ertuapi = require('../index')
const ErtuAPI = new ertuapi('ertuapitest')
ErtuAPI.meme().then(r => console.log(r))