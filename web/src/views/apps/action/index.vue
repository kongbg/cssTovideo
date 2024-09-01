<template>
    <div class="action-container">
        <div class="base-info">
            <div class="info">
                <div class="label">应用名称：</div>
                <div class="value">{{ baseInfo.name }}</div>
            </div>
            <div class="info">
                <div class="label">应用图标：</div>
                <div class="value">{{ baseInfo.face }}</div>
            </div>
            <div class="info">
                <div class="label">访问地址：</div>
                <div class="value">{{ baseInfo.url }}</div>
            </div>
            <div class="info">
                <div class="label">应用描述：</div>
                <div class="value">{{ baseInfo.desc }}</div>
            </div>
            <div class="info">
                <div class="label">创建人：</div>
                <div class="value">{{ baseInfo.createBy }}</div>
            </div>
            <div class="info">
                <div class="label">创建时间：</div>
                <div class="value">{{ baseInfo.createTime }}</div>
            </div>
            <div class="info">
                <div class="label">最后修改时间：</div>
                <div class="value">{{ baseInfo.updateTime }}</div>
            </div>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="模型配置" name="mode">
                <ModeList :appId="appId"></ModeList>
            </el-tab-pane>
            <el-tab-pane label="页面配置" name="page">
                <PageList :appId="appId"></PageList>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({ name: "AppsAction" });
</script>
<script setup>
import { getDetails } from '@/api/apps.js'
import ModeList from './components/ModeList/index.vue'
import PageList from './components/PageList/index.vue'
const route = useRoute()
const { appId } = route.query
const baseInfo = ref({})
const activeName = ref('mode')

/**
 * 获取详情数据
 * @param {*} playload 搜索条件
 */
async function getDetail() {
    let params = { id: appId }
    let res = await getDetails(params);
    if (res.code == 200) {
        baseInfo.value = res.data || {}
    } else {
    }
}

/**
 * 页面数据初始化
 */
function init() {
    // 获取详情数据
    getDetail()
}

init()
</script>

<style lang="scss" scoped>
.action-container {
    .base-info {
        .info {
            display: flex;
        }
    }
}
</style>