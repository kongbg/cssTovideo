import { createWebHistory, createRouter } from "vue-router";
import useKeepAliveStore from '@/store/modules/keepAliveStore.js'

export const constantRoutes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "首页"
    }
  },
  {
    path: "/list",
    name: "List",
    component: () => import("@/views/list/index.vue"),
    meta: {
      title: "列表",
      keepAlive: true, // 该路由页面是否需要缓存
      keepAlivePages: ["Action"] // 配置需要缓存的跳回来源（从某页面回到该页面，该页面缓存，其他页面回到该页面，该页面不缓存）
    }
  },
  {
    path: "/action",
    name: "Action",
    component: () => import("@/views/list/action/index.vue"),
    meta: {
      title: "详情"
    }
  },
  // 字典类型
  {
    path: "/dict",
    name: 'Dict',
    redirect: "/dict/type",
    meta: {
      title: "字典",
    },
    children: [
      // 字典类型
      {
        path: "type",
        name: "dictType",
        component: () => import("@/views/dict/type/index.vue"),
        meta: {
          title: "字典",
          keepAlive: true, // 该路由页面是否需要缓存
          keepAlivePages: ["dictAction"] // 配置需要缓存的跳回来源（从某页面回到该页面，该页面缓存，其他页面回到该页面，该页面不缓存）
        }
      },
      // 字典值
      {
        path: "list",
        name: "dictAction",
        component: () => import("@/views/dict/list/index.vue"),
        meta: {
          title: "字典值"
        }
      }
    ]
  },
  // 模型
  {
    path: "/mode",
    redirect: "/mode/index",
    children: [
      {
        path: "index",
        name: "Mode",
        component: () => import("@/views/mode/index.vue"),
        meta: {
          title: "模型",
          keepAlive: true,
          keepAlivePages: ["ModeAction"]
        }
      },
      {
        path: "action",
        name: "ModeAction",
        component: () => import("@/views/mode/action/index.vue"),
        meta: {
          title: "模型详情"
        }
      },
    ]
  },
  // 设计时页面
  {
    path: "/desgin",
    name: "Desgin",
    meta: {
      title: "设计时"
    },
    children: [
      {
        path: "mode",
        name: "DesginMode",
        component: () => import("@/views/desgin/mode/index.vue"),
        meta: {
          title: "模型设计"
        }
      },
      {
        path: "page",
        name: "DesginPage",
        component: () => import("@/views/desgin/page/index.vue"),
        meta: {
          title: "页面设计"
        }
      }
    ]
  },
  // 运行时页面
  {
    path: "/runtime/:pageId",
    name: "Runtime",
    component: () => import("@/views/dynamicPage/runtime/index.vue"),
    meta: {
      title: "运行时"
    }
  },
  // app
  {
    path: "/apps",
    name: "Apps",
    redirect: "/apps/index",
    meta: {
      title: "应用"
    },
    children: [
      {
        path: "index",
        name: "AppsIndex",
        component: () => import("@/views/apps/index.vue"),
        meta: {
          title: "应用",
        }
      },
      {
        path: "action",
        name: "AppsAction",
        component: () => import("@/views/apps/action/index.vue"),
        meta: {
          title: "应用详情",
        }
      },
    ]
  }
];

const baseRoute = import.meta.env.VITE_APP_BASE_URL;

const router = createVueRouter();

router.beforeEach((to, from, next) => {
  const KeepAliveStore = useKeepAliveStore();
  const meta = to.meta || {};

  // 加入缓存队列
  if (meta.keepAlive) {
    KeepAliveStore.setKeepAlive(to.name);
  }
  next()
})
router.afterEach((to, from) => {
  const KeepAliveStore = useKeepAliveStore();
  // 如果配置了目标缓存，即：目标页面不在目标缓存中，移除当前页面缓存
  if (from.meta.keepAlivePages) {
    if (from.meta.keepAlivePages.indexOf(to.name) == -1) {
      KeepAliveStore.removeKeepAlive(from.name);
    }
  }
});

function createVueRouter() {
  return createRouter({
    history: createWebHistory(baseRoute),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0 };
      }
    },
  });
}

export const resetRouter = () => {
  const newRouter = createVueRouter();
  router.matcher = newRouter.matcher; //替换成新的空路由
};

export default router;
