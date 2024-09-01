<template>
    <div class="page-list">
        <!-- 列表工具 -->
        <div class="toble-tools">
            <div class="left">
                <el-button type="primary" @click="tableBtnFn('create')">新增</el-button>
            </div>
        </div>

        <el-tree style="max-width: 600px" :data="pageList" :props="defaultProps" node-key="id" default-expand-all
            :expand-on-click-node="false">
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <div class="btns">
                        <el-button type="primary" link @click="tableBtnFn('edit', node.data)">编辑</el-button>
                        <el-button type="primary" link @click="tableBtnFn('desgin', node.data)">设计</el-button>
                        <el-button type="primary" link @click="tableBtnFn('create', node.data)">新增</el-button>
                        <el-button type="danger" link @click="tableBtnFn('delete', node.data)">删除</el-button>
                    </div>
                </span>
            </template>
        </el-tree>

        <FormDialog v-model="formVisible" :form="dialogForm" :rules="formRules" :config="formConfig"
            :loading="diaLogLoading" :type="mode" @submit="diaLogSubmit"></FormDialog>
    </div>
</template>
  
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { getData as getPageList, create, update, del } from '@/api/page.js'
import { formConfig, formRules } from './config.js'
import FormDialog from '@/components/FormDialog/index.vue'
const props = defineProps({
    appId: {
        type: String,
        default: ''
    }
})
const formVisible = ref(false)
const dialogForm = ref({})
const diaLogLoading = ref(false)
const delLoading = ref(false)
const mode = ref('create')
const router = useRouter()
const pageList = ref([])
const defaultProps = {
    children: 'children',
    label: 'name',
}

function tableBtnFn(type, row) {
    if (type === 'create') {
        dialogForm.value = { appId: props.appId, parentId: row?.id }
        mode.value = type
        formVisible.value = true
    } else if (type === 'desgin') {
        router.push(
            {
                path: '/desgin/page',
                query: {
                    id: row.id
                }
            }
        )
    } else if (type === 'edit') {
        dialogForm.value = { ...row }
        mode.value = type
        formVisible.value = true
    } else if (type === 'delete') {
        ElMessageBox.confirm(
            '确定删除该数据吗?',
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            handleDelete(row.id)
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消操作',
            })
        })

    }
}

/**
 * 新增。编辑
 * @param {*} param
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
        getPages()
    } else {
        console.log(`${action}失败！`)
    }
}

/**
 * 删除
 */
async function handleDelete(id) {
    delLoading.value = true

    let res = await del({ id });
    delLoading.value = false
    if (res.code == 200) {
        console.log(`删除成功！`)
        getPages()
    } else {
        console.log(`删除失败！`)
    }
}

/**
 * 根据id, parentId 生成树形结构数据
 * @param {} data 包含  id, parentId 的一维数组
 */
function buildTree(data) {
    const tree = [];
    const map = {};

    // 创建一个映射，将每个节点的 id 映射到节点对象
    data.forEach(item => {
        map[item.id] = { ...item };
    });

    // 遍历所有节点，将它们添加到它们的父节点下
    data.forEach(item => {
        const parent = map[item.parentId];
        if (parent) {
            // 如果父节点存在，将当前节点添加到父节点的 children 数组中
            if (!parent.children) {
                parent.children = []; // 确保父节点有 children 属性
            }
            parent.children.push(map[item.id]);
        } else {
            // 如果父节点不存在，将当前节点添加到树数组中
            tree.push(map[item.id]);
        }
    });

    return tree;
}

/**
 * 获取页面数据
 */
async function getPages() {
    let params = { appId: props.appId, pageSize: 999 }
    let res = await getPageList(params);
    if (res.code == 200) {
        let list = res.data.list || []
        pageList.value = buildTree(list)
    } else {
    }
}

/**
 * 页面数据初始化
 */
function init() {
    // 获取页面
    getPages()
}

init()
</script>

<style lang="scss" scoped>
:deep(.custom-tree-node) {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    .btns {}
}
</style>