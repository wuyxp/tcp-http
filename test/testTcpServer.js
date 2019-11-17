/**
 * Created with comment
 * @author: 武扬/956826374@qq.com
 * @time: 2019-11-17 15:43
 */
const net = require('net')
const {HOST, PORT} = require('../config')

const logger = require('tracer').colorConsole({level:2})
const TCPServer = require('../server/TCPServer')

class Client {
  constructor(host, port) {
    this.host = host
    this.port = port
    this.clientSocket = new net.Socket()

    this.clientSocket.on('data', (data) => {

      logger.info('来自服务端监听到的: %s' + data)
      // 完全关闭连接
      this.clientSocket.destroy();
    })

    this.clientSocket.on('close', function() {
      console.log('客户端链接');
    })

  }
  start(message) {
    this.clientSocket.connect(this.host, this.port, () => {
      this.clientSocket.write(message)
    })
    return this
  }
  send(message) {
    logger.info('准备发送的消息，%s',message)
    this.start(message)
  }

}
new TCPServer(HOST, PORT).start()

const maxClient = 10
for(let i = 1; i <= maxClient; i++ ){
  setTimeout(() => {
    new Client(HOST, PORT).send(`第${i}台发的消息`)
  }, i * 1000)
}
