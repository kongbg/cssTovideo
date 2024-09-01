import SQLiteDB from '../sqlite/index.js'
import Mode from '../mode/index.js'
import path from 'path'

const __dirname = path.resolve();
let dbPath = path.join(__dirname + "/config/data.db")
// 字典
const tableName = 'dicts'

// 创建数据库连接
const db = new SQLiteDB(dbPath)
const mode = new Mode(tableName, db)

// 创建表字段
const columns = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'dictLabel', type: 'TEXT' }, // 字典名称
  { name: 'dictValue', type: 'TEXT' }, // 字典值
  { name: 'type', type: 'TEXT' }, // 字典类型
  { name: 'className', type: 'TEXT' }, // 样式属性
  { name: 'indexNum', type: 'TEXT' }, // 显示序号
  { name: 'style', type: 'TEXT' }, // 回显样式
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
    // 更新数据
    let [err, res] = await mode.update(params)
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
