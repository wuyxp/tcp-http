/**
 * Created with comment
 * @author: 武扬/956826374@qq.com
 * @time: 2019-11-17 14:14
 */
const net = require('net');

const {PORT, HOST} = require('./config')

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
const server = net.createServer(function(sock) {

  // 我们获得一个连接 - 该连接自动关联一个socket对象
  console.log('CONNECTED: ' +
    sock.remoteAddress + ':' + sock.remotePort);

  // 为这个socket实例添加一个"data"事件处理函数
  sock.on('data', function(data) {
    console.log('DATA ' + sock.remoteAddress + ': ' + data);
    // 回发该数据，客户端将收到来自服务端的数据
    sock.write('来自服务的的数据："' + data + '"');
  });

  // 为这个socket实例添加一个"close"事件处理函数
  sock.on('close', function(data) {
    console.log('CLOSED: ' +
      sock.remoteAddress + ' ' + sock.remotePort);
  });

});
server.listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
