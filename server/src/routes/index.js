import Router from 'koa-router'
import user from './user.js'
import book from './books.js'
import dictType from './dictType.js'
import dict from './dict.js'
import app from './app.js'
import mode from './mode.js'
import page from './page.js'
import common from './common.js'

const router = new Router()

router.use(user)
        .use(book)
        .use(dictType)
        .use(dict)
        .use(app)
        .use(mode)
        .use(page)
        .use(common)
export default router;