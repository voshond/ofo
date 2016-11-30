const http   = require('http');
const jade   = require('jade');
const level  = require('level');

const kelp   = require('kelp');
const body   = require('kelp-body');
const send   = require('kelp-send');
const route  = require('kelp-route');
const serve  = require('kelp-static');
const logger = require('kelp-logger');
const config = require('kelp-config');
const render = require('kelp-render');

const app = kelp();

const db = level('ofo.db');

app.use(send);
app.use(body);
app.use(logger);
app.use(serve('public'));
app.use(render({
  templates: 'views',
  extension: 'jade' ,
  compiler : function(content, filename){
    return function(locals){
      return jade.renderFile(filename, locals);
    }
  }
}));

app.use(route('/', function(req, res){
  var query = req.query.q;
  db.get(query, function(err, password){
    res.render('index', { 
      query   : query,
      password: password
    });
  });
}));

app.use(route('/submit', function(req, res){
  if(req.body){
    var key = req.body.number;
    var val = req.body.password;
    db.put(key, val, function(err){
      res.render('submit', { success: !err });
    });
  }else{
    res.render('submit');
  }
}));

app.use(route('/tos', function(req, res){
  res.render('terms');
}));

app.use(function(req, res){
  res.send(404);
});

const server = http.createServer(app);
server.listen(config.port, function(err){
  console.log('server is running at %s', server.address().port);
});