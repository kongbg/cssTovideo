import Router from 'koa-router'
import controller from '../controllers/common.js'

const router = new Router({ prefix: '/api' })

router.post(`/upload`,      controller.upload) // 上传

export default router.routes()
