<template>
    <div @click="goToList">返回首页</div>
    <Search :col="4" :gutter="40" :searchForm="searchForm" :config="searchConfig" label-position="top"
        @reset="handleReset" @search="handleSearch"></Search>
     <!-- 列表工具 -->
     <div class="toble-tools">
        <div class="left">
            <el-button type="primary" @click="tableBtnFn('create')" >新增</el-button>
        </div>
        <div class="right">
            <!-- <el-button type="success" @click="exportData" >导出</el-button> -->
        </div>
    </div>
    <Table border align="center" :tableData="tableInfo.tableData" :columns="columns" :loading="tableInfo.loading"
        :current-page="tableInfo.currentPage" :page-size="tableInfo.pageSize" :page-sizes="tableInfo.pageSizes"
        :size="tableInfo.size" :background="tableInfo.background" :small="tableInfo.small" :layout="tableInfo.layout"
        :total="tableInfo.total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template #action="{ row }">
            <el-button size="small" type="primary" @click="tableBtnFn('edit', row)" text>编辑</el-button>
        </template>
    </Table>

    <FormDialog v-if="formConfig && formConfig.length" v-model="formVisible" :form="dialogForm" :rules="formRules"
        :config="formConfig" :loading="diaLogLoading" :type="mode" @submit="diaLogSubmit"></FormDialog>
</template>

<script setup>
import Search from '@/components/SearchForm/index.vue'
import Table from '@/components/Table/index.vue'
import FormDialog from '@/components/FormDialog/index.vue'

const router = useRouter()
const searchConfig = defineModel('searchConfig')
const columns = defineModel('columns')
const formConfig = defineModel('formConfig')
const formRules = defineModel('formRules')
const api = defineModel('api')

const create = api.value.create
const update = api.value.update
const getList = api.value.getData
const getDetails = api.value.getDetails
const del = api.value.del

const searchForm = ref({})
const tableInfo = ref({
    loading: false, // 列表loading
    tableData: [], // 列表数据

    currentPage: 1, // 当前页码
    pageSize: 10, // 每页条数
    pageSizes: [1, 20, 30, 40], // 可切换页码
    size: 'default',
    background: true, // 分页背景
    // small: true,
    layout: "total, prev, pager, next, sizes, jumper",// 功能布局
    total: 0, // 总条数
})

const formVisible = ref(false)
const dialogForm = ref({})
const diaLogLoading = ref(false)
const mode = ref('create')

function tableBtnFn(type, row) {
    if (type === 'create') {
        dialogForm.value = {}
        mode.value = type
        formVisible.value = true
    } else if (type === 'edit') {
        dialogForm.value = {...row}
        mode.value = type
        formVisible.value = true
    } else if (type === 'createMode') {
        router.push({
            path: '/mode/action',
            query: {
                type: type,
                id: row.id
            }
        })
    } else if (type === 'editMode') {
        router.push({
            path: '/mode/action',
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
    tableInfo.value.pageSize = pageSize
    getData()
}
function handleCurrentChange(currentPage) {
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
    }
}

function handleReset(data) {
    searchForm.value = data
    getData(searchForm.value)
}
function handleSearch() {
    getData(searchForm.value)
}

async function diaLogSubmit({type, data}) {
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

function init() {
    getData()
}

init()
</script>

<style lang="scss" scoped>

</style>