import https from 'https'
import SQLiteDB from '../sqlite/index.js'
import Mode from '../mode/index.js'
import path from 'path'

const __dirname = path.resolve();
let dbPath = path.join(__dirname + "/config/data.db")
// 模型
const tableName = 'modes'

// 创建数据库连接
const db = new SQLiteDB(dbPath)
const mode = new Mode(tableName, db)

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
  /**
   * 通过pageId modeId 获取数据
   */
  static async getDataByModeId(ctx) {
    let { pageId, modeId, id, type, page, pageSize } = ctx.request.query;
    // 获取表名
    let tableName = await getTableName(modeId)
    if (tableName) {
      const newMode = new Mode(tableName, db)
      if(type == 'form') {
        const query = {
          id,
          page: 1,
          pageSize: 1
        }

        let [err, res] = await newMode.getData(query)
        let { data=[], total=0, totalPages=0 } = res || {};

        let result = {
          code: !err ? 200 : 400,
          data: data.length ? data[0] : null,
          msg: !err ? 'ok' : (err.msg || err.code)
        }
        ctx.body = result
      } else {
        const query = {
          id,
          page,
          pageSize,
        }

        let [err, res] = await newMode.getData(query)
        let { data=[], total=0, totalPages=0 } = res || {};

        let result = {
          code: !err ? 200 : 400,
          data: data.length ? data : [],
          msg: !err ? 'ok' : (err.msg || err.code)
        }
        ctx.body = result
      }

    } else {
      ctx.body = {
        code: 400,
        data: null,
        msg: '获取表名失败'
      }
    }
  }
  /**
   * 通过pageId modeId 提交数据
   */
  static async createByModeId(ctx) {
    let { pageId, modeId, id, formData } = ctx.request.body;

    // 获取表名
    let tableName = await getTableName(modeId)
    if (tableName) {
      // 通过表名创建数据库实例
      const newMode = new Mode(tableName, db)
      let [err, res] = await newMode.create(formData)

      ctx.body = {
        code: !err ? 200 : 400,
        data: res,
        msg: !err ? 'ok' : (err.msg || err.code)
      }
    } else {
      ctx.body = {
        code: 400,
        data: null,
        msg: '获取表名失败'
      }
    }
  }
  /**
   * 通过pageId modeId 更新数据
   */
  static async updateByModeId(ctx) {
    let { pageId, modeId, id, formData } = ctx.request.body;

    // 获取表名
    let tableName = await getTableName(modeId)
    if (tableName) {
      // 通过表名创建数据库实例
      const newMode = new Mode(tableName, db)
      let [err, res] = await newMode.update(formData)

      ctx.body = {
        code: !err ? 200 : 400,
        data: res,
        msg: !err ? 'ok' : (err.msg || err.code)
      }
    } else {
      ctx.body = {
        code: 400,
        data: null,
        msg: '获取表名失败'
      }
    }
  }
}

// 获取表名
async function getTableName(modeId) {
  let tableName = ''
  const query = {
    id: modeId,
    page: 1,
    pageSize: 1
  }
  let [err, res] = await mode.getData(query)
  if (!err && res.data.length) {
    tableName = res.data[0].tableName;
  }
  return tableName;
}
