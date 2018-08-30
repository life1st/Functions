var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8888);

function handler (req, res) {
  // fs.readFile(__dirname + '/index.html',
  // function (err, data) {
  //   if (err) {
  //     res.writeHead(500);
  //     return res.end('Error loading index.html');
  //   }

  //   res.writeHead(200);
  //   res.end(data);
  // });
  res.end(JSON.stringify({
    ok: true
  }))
}

let chatRes = (msg, id) => ({
  msg, id,
  time: new Date().getTime(),
})

io.on('connection', function (socket) {
  console.log('conn.')
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('sendMsg', (data) => {
    let res = chatRes(data.msg, data.id)
    io.emit('newMsg', res)
  })
});
