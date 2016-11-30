const http   = require('http');
const level  = require('level');

const kelp   = require('kelp');
const body   = require('kelp-body');
const send   = require('kelp-send');
const route  = require('kelp-route');
const serve  = require('kelp-static');
const logger = require('kelp-logger');
const config = require('kelp-config');


const app = kelp();

const db = level('ofo.db');

app.use(logger);
app.use(send);
app.use(body);
app.use(serve('public'));

app.use(route('post', '/create', function(req, res){
  db.put(req.body.number, req.body.password, function(err){
    console.log(err);
    res.send(err);
  });
}));

app.use(route('get', '/query', function(req, res){
  db.get(req.query.q, function(err, password){
    if(err) res.send(err);
    else res.send(password);
  });
}));

app.use(function(req, res){
  res.send(404);
});

const server = http.createServer(app);
server.listen(config.port, function(err){
  console.log('server is running at %s', server.address().port);
});