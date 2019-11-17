/**
 * Created with comment
 * @author: 武扬/956826374@qq.com
 * @time: 2019-11-17 14:14
 */
const net = require('net');
const { PORT, HOST } = require('../config');

const client = new net.Socket();
client.connect(PORT, HOST, function() {

  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // 建立连接后立即向服务器发送数据，服务器将收到这些数据
  client.write('发送给服务端的数据: hello world !');

});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {

  console.log('来自服务端监听到的: ' + data);
  // 完全关闭连接
  client.destroy();

});

// 为客户端添加“close”事件处理函数
client.on('close', function() {
  console.log('Connection closed');
});
