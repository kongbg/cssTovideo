import https from 'https'
export default class commonController {
  /**
   * 上传
   * @param {Context} ctx
   */
  static async upload(ctx) {
    let file = ctx.request.files;
    // console.log(file)

    // 创建FormData对象
    const formData = new FormData();
    // formData.append('image', file);

    const options = {
      hostname: 'aapi.helioho.st/upload.php',
      // path:'/upload.php',
      method: 'POST',
    };

     // 发送请求
     const req = https.request(options, (res) => {
      let data = '';

      // 监听数据事件来收集响应数据
      res.on('data', (chunk) => {
        console.log('监听数据事件来收集响应数据:', chunk)
        data += chunk;
      });

      // 监听结束事件来处理响应完成
      res.on('end', () => {
        console.log('监听结束事件来处理响应完成:', data)
        ctx.body = data;
      });
    });

    // 监听错误事件
    req.on('error', (e) => {
      console.log('监听错误事件:', e)
      ctx.status = 500;
      ctx.body = 'Error: ' + e.message;
    });

    // 写入数据到请求体
    for (const key in file) {
      req.write(`${key}=${file[key]}\r\n`);
    }
    // file.append('', ''); // 添加一个空行来结束请求体
    req.write('\r\n');

    // 结束请求
    req.end();
    
    

    // ctx.body = {
    //   code: 200,
    //   data: {},
    //   msg: 'ok'
    // }

    // ctx.body = {
    //   code: !err ? 200 : 400,
    //   data: res,
    //   msg: !err ? 'ok' : (err.msg || err.code)
    // }
  }
}
