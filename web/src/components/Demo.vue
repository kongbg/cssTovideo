<template>
  <div @click="goToList">返回首页</div>
  <Search :col="4" :gutter="40" :searchForm="searchForm" :config="searchConfig" label-position="top"
      @reset="handleReset" @search="handleSearch"></Search>
  <Table border align="center" :tableData="tableInfo.tableData" :columns="columns" :loading="tableInfo.loading"
      :current-page="tableInfo.currentPage" :page-size="tableInfo.pageSize" :page-sizes="tableInfo.pageSizes"
      :size="tableInfo.size" :background="tableInfo.background" :small="tableInfo.small" :layout="tableInfo.layout"
      :total="tableInfo.total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          <template #action="{ row }">
              <el-button size="small" type="primary" @click="tableBtnFn('edit', row)" text>去处理</el-button>
              <!-- <el-divider direction="vertical" /> -->
              <!-- <el-button size="small" type="danger" text @click="tableBtnFn('delete', row)">删除</el-button> -->
              <!-- <el-divider direction="vertical" /> -->
              <!-- <el-button size="small" type="primary" text @click="tableBtnFn('changeLog', row)">查看变更记录</el-button> -->
              <!-- <el-button size="small" type="primary" text @click="tableBtnFn('applyChange', row)">申请变更</el-button> -->
          </template>
      </Table>

      <div @click="formVisible = !formVisible">弹窗</div>
      <FormDialog v-model="formVisible" :form="dialogForm" :config="formConfig"></FormDialog>
</template>


<script>
  // 在 3.2.34 或以上的版本中，使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项，即使是在配合 <KeepAlive> 使用时也无需再手动声明。
  // 但在项目中我们是分模版开发，业务组件文件重名的几率还是挺大的，所以我们还是需要显式声明组件的name属性。
  import { defineComponent } from "vue";
  export default defineComponent({ name: "List" });
</script>

<script setup>
import Search from '@/components/SearchForm/index.vue'
import Table from '@/components/Table/index.vue'
import FormDialog from '@/components/FormDialog/index.vue'
import { searchConfig, columns, formConfig } from './config.js'
import { getData as getList } from '@/api/nav.js'
import { onActivated } from 'vue'

const router = useRouter()
const route = useRoute()
const searchForm = ref({})
const tableInfo = ref({
  loading: false, // 列表loading
  tableData: [], // 列表数据

  currentPage: 1, // 当前页码
  pageSize: 1, // 每页条数
  pageSizes: [1, 20, 30, 40], // 可切换页码
  size: 'default',
  background: true, // 分页背景
  // small: true,
  layout: "total, prev, pager, next, sizes, jumper",// 功能布局
  total: 0, // 总条数
})
const formVisible = ref(false)
const dialogForm = ref({})

function tableBtnFn(type, row) {
  if (type === 'edit') {
      router.push({
          path: 'action',
          query: {
              type: type,
              id: row.id
          }
      })
  }
}

function goToList() {
  router.push(
      {
          path: '/home',
      }
  )
}
function handleSizeChange(pageSize) {
  // console.log('handleSizeChange:', pageSize)
  tableInfo.value.pageSize = pageSize
  getData()
}
function handleCurrentChange(currentPage) {
  // console.log('handleCurrentChange:', currentPage)
  tableInfo.value.currentPage = currentPage
  getData()
}

async function getData(playload = {}) {
  let params = {
      page: tableInfo.value.currentPage,
      pageSize: tableInfo.value.pageSize,
  }
  Object.assign(params, playload)
  tableInfo.value.loading = true
  let res = await getList(params, { showMsg: true });
  // let res= await getList({page: 1, pageSize: 999}, {showMsg: false} );
  // let res= await getList({page: 1, pageSizes: 999}, {showMsg: (res)=>{console.log('自定义提示', res)}} );
  tableInfo.value.loading = false
  if (res.code == 200) {
      tableInfo.value.tableData = res.data.list || []
      tableInfo.value.total = res.data.total

  } else {
      console.log('resres：', res)
  }
}

function handleReset(data) {
  searchForm.value = data
  getData(searchForm.value)
}
function handleSearch() {
  getData(searchForm.value)
}

function init() {
  getData()
}

onActivated(()=>{})

init()
</script>

<style scoped></style>