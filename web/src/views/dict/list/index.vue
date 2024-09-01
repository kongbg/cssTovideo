<template>
    <!-- 搜索工具 -->
    <Search :col="col" :gutter="gutter" :searchForm="searchForm" :config="searchConfig" label-position="top"
        @reset="handleReset" @search="handleSearch"></Search>

    <!-- 列表工具 -->
    <div class="toble-tools">
        <div class="left">
            <el-button type="primary" @click="handleButton('create')">新增</el-button>
        </div>
        <div class="right">
            <!-- <el-button type="success" @click="exportData" >导出</el-button> -->
        </div>
    </div>

    <!-- 列表 -->
    <Table border align="center" :tableData="tableInfo.tableData" :columns="columns" :loading="tableInfo.loading"
        :current-page="tableInfo.currentPage" :page-size="tableInfo.pageSize" :page-sizes="tableInfo.pageSizes"
        :size="tableInfo.size" :background="tableInfo.background" :small="tableInfo.small" :layout="tableInfo.layout"
        :total="tableInfo.total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template #action="{ row }">
            <el-button size="small" type="primary" @click="handleButton('edit', row)" text>编辑</el-button>
        </template>
    </Table>

    <!-- 新增、编辑弹窗 -->
    <FormDialog v-if="formConfig && formConfig.length" v-model="formVisible" :form="dialogForm" :rules="formRules"
        :config="formConfig" :loading="diaLogLoading" :type="mode" @submit="diaLogSubmit"></FormDialog>
</template>

<script>
// 在 3.2.34 或以上的版本中，使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项，即使是在配合 <KeepAlive> 使用时也无需再手动声明。
// 但在项目中我们是分模版开发，业务组件文件重名的几率还是挺大的，所以我们还是需要显式声明组件的name属性。
import { defineComponent } from "vue";
export default defineComponent({ name: "DictTypeList" });
</script>
<script setup>
import Search from '@/components/SearchForm/index.vue'
import Table from '@/components/Table/index.vue'
import FormDialog from '@/components/FormDialog/index.vue'
import { searchConfig, columns, formConfig, formRules } from './config.js'
import { create, update, getData as getList, getDetails, del } from '@/api/dict.js'

const router = useRouter()
const route = useRoute()
const { id, type, code } = route.query
const searchForm = ref({}) // 搜索组件表单数据
const col = 4 // 搜索组件每行数量
const gutter = 40 // 搜索组件每个条件之间间隔 单位：px
const tableInfo = ref({
    loading: false, // 列表loading
    tableData: [], // 列表数据
    currentPage: 1, // 当前页码
    pageSize: 10, // 每页条数
    pageSizes: [10, 20, 30, 40], // 可切换页码
    size: 'default', // 默认尺寸
    background: true, // 分页背景
    layout: "total, prev, pager, next, sizes, jumper",// 功能布局
    total: 0, // 总条数
})

const formVisible = ref(false) // x新增/编辑弹窗显示控制
const dialogForm = ref({}) // 弹窗表单
const diaLogLoading = ref(false) // 弹窗提交loading
const mode = ref('create') // 模式： create-新增 edit-编辑


function handleButton(type, row) {
    if (type === 'create') {
        dialogForm.value = { type: code }
        mode.value = type
        formVisible.value = true
    } else if (type === 'edit') {
        dialogForm.value = { ...row }
        mode.value = type
        formVisible.value = true
    } else if (type === 'view') {
        router.push({
            path: '/dict/list',
            query: {
                type: type,
                id: row.id
            }
        })
    }
}

/**
 * 每页条数改成
 * @param {*} pageSize 每页条数
 */
function handleSizeChange(pageSize) {
    tableInfo.value.pageSize = pageSize
    getData()
}

/**
 * 当前页码改成
 * @param {*} currentPage 当前页码
 */
function handleCurrentChange(currentPage) {
    tableInfo.value.currentPage = currentPage
    getData()
}

/**
 * 获取列表数据
 * @param {*} playload 搜索条件
 */
async function getData(playload = {}) {
    let params = {
        page: tableInfo.value.currentPage,
        pageSize: tableInfo.value.pageSize,
        type: code
    }
    Object.assign(params, playload)
    tableInfo.value.loading = true
    let res = await getList(params);
    tableInfo.value.loading = false
    if (res.code == 200) {
        tableInfo.value.tableData = res.data.list || []
        tableInfo.value.total = res.data.total

    } else {
    }
}

/**
 * 重置搜索条件
 * @param {*} data 搜索表单数据
 */
function handleReset(data) {
    searchForm.value = data
    getData(searchForm.value)
}
/**
 * 搜索
 */
function handleSearch() {
    getData(searchForm.value)
}

/**
 * 弹窗提交事件
 * @param {*} type  模式： create-新增 edit-编辑
 * @param {*} data  需要提交的数据
 */
async function diaLogSubmit({ type, data }) {
    diaLogLoading.value = true

    let api = type == 'create' ? create : update;
    let action = type == 'create' ? '新增' : '编辑'

    let res = await api(data);
    diaLogLoading.value = false
    if (res.code == 200) {
        console.log(`${action}成功！`)
        formVisible.value = false
        getData()
    } else {
        console.log(`${action}失败！`)
    }
}

/**
 * 页面数据初始化
 */
function init() {
    getData()
}

init()
</script>

<style lang="scss" scoped></style>