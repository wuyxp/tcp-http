/**
 * Created with comment
 * @author: 武扬/956826374@qq.com
 * @time: 2019-11-17 14:49
 */
const net = require('net')
const logger = require('tracer').colorConsole({level:2});
/**
 * 1. 服务器启动函数
 * 2. 接受请求
 * 3. 处理请求
 * 4. 关闭请求
 * 5. 关闭服务器
 */
class TCPServer {

  constructor(host, port) {
    this.host = host
    this.port = port
    this.serverSocker = net.createServer()
    this.connection()
  }
  start() {
    logger.info('服务器已监听 %s : %d ',  this.host, this.port );
    this.serverSocker.listen(this.host, this.port)
    return this
  }
  connection() {
    this.serverSocker.on('connection', sock => {
      logger.info('监听到了来自客户端的链接')
      this.getData(sock)
      this.error(sock)
    })
  }
  getData(sock) {
    sock.on('data', data => {
      logger.info('来自客户端的数据 %s: %d', sock.remoteAddress, sock.remotePort);
      sock.write('发给客户端的数据的数据："' + data + '"');
    })
  }
  error(sock) {
    sock.on('error', error => {
      logger.warn('错误信息：', error)
    })
    sock.on('close', sock => {
      logger.warn('关闭链接')
    })
  }

}
module.exports = TCPServer
