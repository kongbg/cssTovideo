<template>
    <div class="panel-warp">
        <el-form size="small" label-width="90px">
            <!-- 组件名称 -->
            <el-form-item v-if="activeData && activeData.componentName" label="组件名称">
                    <el-input v-model="activeData.componentName" disabled />
            </el-form-item>
            <template v-for="info in schema">
                <!-- 输入框 -->
                <el-form-item v-if="info.type == 'input'" :label="info.label">
                    <el-input v-model="info.value" :placeholder="info.placeholder" />
                </el-form-item>
                <!-- 下拉框 -->
                <el-form-item v-if="info.type == 'select'" :label="info.label">
                    <el-select v-if="info.type == 'select'" v-model="info.value" :multiple="info.multiple"
                        :placeholder="info?.placeholder" :clearable="info.clearable || true"
                        @change="val => selectChange(val, info)">
                        <el-option v-for="op in info.options" :label="op[(info.props && info.props.label) || 'label']"
                            :value="op[(info.props && info.props.value) || 'value']"
                            :key="op[(info.props && info.props.value) || 'value']">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- tab-radio -->
                <el-form-item v-if="info.type == 'tab-radio'" :label="info.label">
                    <el-radio-group v-model="info.value">
                        <el-radio-button v-for="item in info.options" :label="item.value">  {{ item.label }} </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <!-- 数字输入 -->
                <el-form-item v-if="info.type == 'input-number'" :label="info.label">
                    <el-input-number v-model="info.value" :min="0" :placeholder="info.placeholder" />
                </el-form-item>
                <!-- 开关 -->
                <el-form-item v-if="info.type == 'switch'" :label="info.label">
                    <el-switch v-model="info.value" />
                </el-form-item>
                <!-- 滑块 -->
                <el-form-item v-if="info.type == 'slider'" :label="info.label">
                    <el-slider v-model="info.value" :max="info.max" :min="info.min" :marks="{12:''}"/>
                </el-form-item>
                <!-- margin-padding -->
                <el-form-item v-if="info.type == 'margin-padding'" :label="info.label">
                    <panel-padding v-model="info.value" :unit="info.unit"></panel-padding>
                </el-form-item>
            </template>
            <div class="btns">
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-form>
    </div>
</template>
<script setup>
import { watch } from "vue"

const props = defineProps({
    schema: {
        type: Array,
        default: () => []
    },
    activeData: {
        type: Object,
        default: () => {}
    }
})

watch(()=> props.schema, () =>{
    initPanel()
})

// 定义时间组件的默认值
let valueMap = {
  'datetimerange': () => { return [] },
  'daterange': () => { return [] },
}

// 联动的父级变动
async function selectChange(value, data) {
    //   // 找到相关联的下级prop
    //   let key = data.like && data.like.key;
    //   if (key) {
    //     let likeData = null
    //     // 找到下级配置
    //     configs.value.forEach(info => {
    //       !likeData ? likeData = info.find(item => item.prop == key) : '';
    //     })
    //     // 使用下级配置api请求数据填充options
    //     if (likeData && likeData.api) {
    //       delete searchForm.value[key];

    //       if (likeData.like) {
    //         delete searchForm.value[likeData.like.key];
    //       }

    //       let option = await likeData.api({ data: value });
    //       likeData.options = likeData.transformPropData ? likeData.transformPropData(option) : option
    //     }
    //   }
}

function submit(params) {
    console.log(props.schema)
}

// 初始化表单数据
async function initPanel() {
    
    debugger
    const configs = props.schema;
    console.log('initPanel:', configs)
    if(Array.isArray(configs)) {
        configs.forEach(async item => {
           await initConf(item)
        })
    } else {
        for (const key in configs) {
            let item = configs[key]
            await initConf(item)
        }
    }
    async function initConf (item) {
        // 配置了api 并且 是联动一级才自动请求数据
        if (item.api) {
            // 联动节点的 parent 才需要自动获取数据
            let autoGet = item.like && !item.like.parent;
            if (item.api && autoGet || (item.api && !item.like)) {
                let option = await item.api();
                item.options = item.transformPropData ? item.transformPropData(option) : option
            }

        }
        // 设置默认值
        if ((item.value === '' || item.value === undefined) && item.defaultData) {
            item.value = item.defaultData
        }

        // 设置部分值默认值类型
        if (valueMap[item.type]) {
            item.value = valueMap[item.type]()
        }
    }
}


function init() {
    // 初始化表单数据
    initPanel()
}

init()

</script>