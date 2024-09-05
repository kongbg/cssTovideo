import Router from 'koa-router'
import controller from '../controllers/common.js'

const urlKey = '/common'
const router = new Router({ prefix: '/api' })

// router.post(`${urlKey}/upload`,      controller.upload) // 上传
router.get(`${urlKey}/getDataByModeId`,      controller.getDataByModeId) // 上传
router.post(`${urlKey}/createByModeId`,      controller.createByModeId) // 通过模型id提交数据
router.post(`${urlKey}/updateByModeId`,      controller.updateByModeId) // 通过模型id更新数据

export default router.routes()
