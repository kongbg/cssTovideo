import SQLiteDB from '../sqlite/index.js'
import Mode from '../mode/index.js'
import path from 'path'
import crypto from 'crypto'

const __dirname = path.resolve();
let dbPath = path.join(__dirname + "/config/data.db")
let tableDBPath = path.join(__dirname + "/config/table.db")
// 模型
const tableName = 'modes'

// 创建数据库连接
const db = new SQLiteDB(dbPath)
const mode = new Mode(tableName, db)

// 创建表字段
const columns = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'appId', type: 'TEXT' }, // appId
  { name: 'name', type: 'TEXT' }, // 名称
  { name: 'tableName', type: 'TEXT' }, // 表名称
  { name: 'fieldJson', type: 'TEXT' }, // 表字段
  { name: 'desc', type: 'TEXT' }, // 描述
  { name: 'status', type: 'TEXT' , default: '1' }, // 1 启用 0 禁用
  { name: 'delstatus', type: 'TEXT', default: '0' }, // 1 已删除 0 未删除
  { name: 'createBy', type: 'TEXT' }, // 创建人
  { name: 'createTime', type: 'TEXT' }, // 创建时间
  { name: 'updateTime', type: 'TEXT' }, // 更新时间
]
// 创建表
db.createTable(tableName, columns)

export default class navTypeController {
  /**
   * 新增
   * @param {Context} ctx
   */
  static async create(ctx) {
    let params = ctx.request.body
    params.tableName = getUUid()
    // 插入数据
    let [err, res] = await mode.create(params)

    ctx.body = {
      code: !err ? 200 : 400,
      data: res,
      msg: !err ? 'ok' : (err.msg || err.code)
    }
  }

  /**
   * 更新
   * @param {Context} ctx
   */
  static async update(ctx) {
    let params = ctx.request.body
    
    let [err1, res1] = await mode.getDeatil({id: params.id})

    let tableName = res1.tableName

    let fieldJson = JSON.parse(params.fieldJson) || []
    fieldJson.forEach(item=>{
      if(!item.field) {
        item.field = getUUid() // field 为表字段
      }
    })

    params.fieldJson = JSON.stringify(fieldJson)
    // 更新数据
    let [err, res] = await mode.update(params)
    // 创建一个表
    await createTable({ tableName, fieldJson })
    // console.log(err2, res2)
    ctx.body = {
      code: !err ? 200 : 400,
      data: res,
      msg: !err ? 'ok' : (err.msg || err.code)
    }
  }
  /**
   * 获取列表
   * @param {*} param
   */
  static async getData(ctx) {
    const query = ctx.request.query
    let [err, res] = await mode.getData(query)
    let { data=[], total=0, totalPages=0 } = res || {};
    let result = {
      code: !err ? 200 : 400,
      data: !err ? {
        list: data,
        total,
        totalPages
      } : null,
      msg: !err ? 'ok' : (err.msg || err.code)
    }
    ctx.body = result
  }
  /**
   * 获取详情
   * @param {*} param
   */
  static async getDetails(ctx) {
    const query = {
      ...ctx.request.query,
      page: 1,
      pageSize: 1
    }

    let [err, res] = await mode.getData(query)
    let { data=[], total=0, totalPages=0 } = res || {};

    let result = {
      code: !err ? 200 : 400,
      data: data.length ? data[0] : null,
      msg: !err ? 'ok' : (err.msg || err.code)
    }
    ctx.body = result
  }
  /**
   * 删除列表数据
   * @param {Context} ctx
   * @memberof rustController
   */
  static async delete(ctx) {
    let params = ctx.request.body
    // 删除数据
    let [err, res] = await mode.delete(params)
    ctx.body = {
      code: !err ? 200 : 400,
      data: null,
      msg: !err ? 'ok' : (err.msg || err.code)
    }
  }
}

// 创建一个表
async function createTable(params) {
  if(!params.fieldJson.length) return
  console.log('创建表:', params)
  // 创建表字段
  const columns1 = [
    { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' }
  ]
  const columns3 = [
    { name: 'status', type: 'TEXT' , default: '1' }, // 1 启用 0 禁用
    { name: 'delstatus', type: 'TEXT', default: '0' }, // 1 已删除 0 未删除
    { name: 'createBy', type: 'TEXT' }, // 创建人
    { name: 'createTime', type: 'TEXT' }, // 创建时间
    { name: 'updateTime', type: 'TEXT' }, // 更新时间
  ]
  const columns2 = []
  params.fieldJson.forEach(item=>{
    let column = {}
    
    column.name = item.field
    column.type = item.type
    if (item.default) {
      column.default = item.default
    }

    columns2.push(column)
  })
  let columns6 = columns1.concat(columns2).concat(columns3)

  // 创建表
  await db.createTable2(params.tableName, columns6)
}

function getUUid(length = 12) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(crypto.randomInt(charactersLength));
  }
  return result;
}
