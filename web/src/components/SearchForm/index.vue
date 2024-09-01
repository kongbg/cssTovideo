<template>
  <div class="search-container">
    <el-form class="search-form" v-model="searchForm" v-bind="formProps">
      <template v-for="(rows, index) in configs">
        <el-row :gutter="gutter">
          <el-col :span="6" v-for="info in rows">
            <el-form-item v-if="info.type && info.type != 'action'" :label="info.label">
              <!-- 输入框 -->
              <el-input v-if="info.type == 'input'" v-model="searchForm[info.prop]" :placeholder="info?.placeholder"
                :clearable="info.clearable || false" />
              <!-- 下拉框 -->
              <el-select v-if="info.type == 'select'" v-model="searchForm[info.prop]" :multiple="info.multiple"
                :placeholder="info?.placeholder" :clearable="info.clearable || true"
                @change="val => selectChange(val, info)">
                <el-option v-for="op in info.options" :label="op[(info.props && info.props.label) || 'label']"
                  :value="op[(info.props && info.props.value) || 'value']"
                  :key="op[(info.props && info.props.value) || 'value']">
                </el-option>
              </el-select>
              <!-- 级联区域 -->
              <el-cascader v-if="info.type == 'areacascader'" v-model="searchForm[info.prop]"
                :clearable="info.clearable || false" :options="info.options" :props="{
                  value: 'areaCode',
                  label: 'areaName',
                  children: 'childList',
                  checkStrictly: true,
                }" />
              <!-- 日期时间范围（时分秒） -->
              <el-date-picker v-if="info.type == 'datetimerange'" v-model="searchForm[info.prop]" type="datetimerange"
                format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                :defaultTime="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
                :range-separator="info.rangeSeparator" :start-placeholder=info.startPlaceholder
                :end-placeholder=info.endPlaceholder :clearable="info.clearable || true" :disabled="info.disabled" />
              <!-- 日期时间范围 (日期) -->
              <el-date-picker v-if="info.type == 'daterange'" v-model="searchForm[info.prop]" type="daterange"
                format="YYYY-MM-DD" value-format="YYYY-MM-DD" :range-separator="info.rangeSeparator"
                :start-placeholder=info.startPlaceholder :end-placeholder=info.endPlaceholder
                :clearable="info.clearable || true" :disabled="info.disabled" />
              <!-- 日期时间 -->
              <el-date-picker v-if="info.type == 'date'" v-model="searchForm[info.prop]" type="date" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" :placeholder="info.placeholder" :clearable="info.clearable || true"
                :disabled="info.disabled">
              </el-date-picker>

              <!-- radio -->
              <div v-if="info.type == 'radio'">
                <el-radio-group v-model="searchForm[info.prop]">
                  <el-radio v-for="op in info.options" :label="op[(info.props && info.props.label) || 'label']"
                    :value="op[(info.props && info.props.value) || 'value']"
                    :key="op[(info.props && info.props.value) || 'value']">
                  </el-radio>
                </el-radio-group>
              </div>
            </el-form-item>

            <div class="search-btn" :class="{ 'otherRow': otherRow }" v-if="info.type && info.type == 'action'">
              <el-button type="default" v-for="btn in info.list" @click="handle(btn)">{{ btn.label }}</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>
</template>
<script setup>
import { ref, defineProps, useAttrs, getCurrentInstance, defineModel } from "vue";
import { deepClone } from '../../utils/index.js'
const config = defineModel('config')
const props = defineProps({
  gutter: {
    type: Number,
    default: 20
  },
  col: {
    type: Number,
    default: 4
  }
})
const attrs = useAttrs()
const { proxy } = getCurrentInstance()
const searchForm = defineModel('searchForm')
const formProps = ref({})
const configs = ref([])
const otherRow = ref(false)

// 定义时间组件的默认值
let valueMap = {
  'datetimerange': () => { return [] },
  'daterange': () => { return [] },
}


function handle(params) {
  if (params.type == 'reset') {
    reset()
  }
  if (params.type == 'submit') {
    submit()
  }
}

function reset() {
  configs.value.forEach(async info => {
    info.forEach(async item => {
      // 设置默认值
      if (item.defaultData) {
        searchForm.value[item.prop] = item.defaultData
      } else if (valueMap[item.type]) { // 设置部分值默认值类型
        searchForm.value[item.prop] = valueMap[item.type]()
      } else {
        delete searchForm.value[item.prop]
      }
    })
  })
  proxy.$emit("reset", searchForm.value);
}

function submit(params) {
  proxy.$emit("search", searchForm.value);
}

// 将透传属性分组绑定到对应组件
function initProps() {
  // 表单属性
  let formPropsKeys = ['label-position', 'label-width']
  for (const key in attrs) {
    if (formPropsKeys.includes(key)) {
      formProps.value[key] = attrs[key]
    }
  }
}

// 通过col 获取每行个数
function getRows(index, temps) {
  // 每行col个
  let rows = []
  let col = props.col
  if (index % col == 0) {
    rows = temps.slice(index, index + col);
  }
  return rows;
}

// 将配置的config按每行col个从新分组
function initConfig() {
  let temps = (config.value).filter(item => !['reset', 'submit'].includes(item.type));
  let actions = (config.value).filter(item => ['reset', 'submit'].includes(item.type));
  let row = [];
  // 每行col个分组
  for (let i = 0; i < temps.length; i++) {
    row = getRows(i, temps)
    if (row.length) configs.value.push(row)
  }

  // 判断最后一行是否能放下搜索按钮，放不下另起一行
  let lastRow = configs.value[configs.value.length - 1]
  let num = 0
  if (lastRow.length <= props.col - 1) {
    num = props.col - 1 - lastRow.length
  } else {
    num = props.col - 1
    otherRow.value = true
  }
  // 搜索按钮跟搜索条件直接的用用<el-col></el-col>撑开
  for (let k = 0; k < num; k++) {
    lastRow.push({})
  }
  lastRow.push({
    type: 'action',
    list: actions
  })
}

// 初始化表单数据
function initsearchForm() {
  configs.value.forEach(async info => {
    info.forEach(async item => {
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
      if (item.defaultData) {
        searchForm.value[item.prop] = item.defaultData
      }

      // 设置部分值默认值类型
      if (valueMap[item.type]) {
        searchForm.value[item.prop] = valueMap[item.type]()
      }
    })
  })
}

// 联动的父级变动
async function selectChange(value, data) {
  // 找到相关联的下级prop
  let key = data.like && data.like.key;
  if (key) {
    let likeData = null
    // 找到下级配置
    configs.value.forEach(info => {
      !likeData ? likeData = info.find(item => item.prop == key) : '';
    })
    // 使用下级配置api请求数据填充options
    if (likeData && likeData.api) {
      delete searchForm.value[key];

      if (likeData.like) {
        delete searchForm.value[likeData.like.key];
      }

      let option = await likeData.api({ data: value });
      likeData.options = likeData.transformPropData ? likeData.transformPropData(option) : option
    }
  }
}

function init() {
  // 将透传属性分组绑定到对应组件
  initProps()
  // 将配置的config按每行col个从新分组
  initConfig()
  // 初始化表单数据
  initsearchForm()
}

init()



</script>
<style lang="scss" scoped>
@import './index.scss'
</style>
