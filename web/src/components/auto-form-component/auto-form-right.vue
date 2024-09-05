<template>
  <div class="auto-right">
    <el-tabs v-model="currentTab" class="center-tabs" :style="{ '--el-tabs-header-height': '40px' }">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>

    <div class="field-box">
      <el-scrollbar class="right-scrollbar">
        <!--组件属性-->
        <panel v-show="currentTab === 'field'" :schema="activeData.confs" :activeData="activeData"></panel>
        <!-- 表单属性 -->
        <panel v-show="currentTab === 'form'" :schema="formConfSchema"></panel>
      </el-scrollbar>
    </div>

    <auto-form-tree-node-dialog v-if="dialogVisible" @commit="addNode" @close="() => { dialogVisible = false }" />

  </div>
</template>

<script setup>
import { computed, defineProps, reactive, ref, resolveComponent, watch } from 'vue';
import { componentsTypes, inputComponents, selectComponents } from "@/config/generator/config";
import { CirclePlus, Minus, Operation, Plus, RemoveFilled } from '@element-plus/icons-vue'
import { getData } from '@/api/mode.js'


const currentTab = ref('field')

const props = defineProps({
  showField: {
    type: Boolean,
    required: true
  },
  activeData: {
    type: Object,
    required: true
  },
  formConfSchema: {
    type: Object,
    default: () => { }
  },
  appId: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['tag-change'])

const layoutTreeProps = ref({
  label(data, node) {
    return data.componentName || `${data.label}: ${data.vModel}`
  }
})

const dateOptions = computed(() => {
  if (
    props.activeData.type !== undefined
    && props.activeData.tag === 'el-date-picker'
  ) {
    if (props.activeData['start-placeholder'] === undefined) {
      return dateTypeOptions
    }
    return dateRangeTypeOptions
  }
  return []
})

const modeList = ref([])

const fieldList = ref([])

const idGlobal = ref(120)

const currentNode = ref(null)

const dialogVisible = ref(false)

const iconsVisible = ref(false)

const currentIconModel = ref(null);

const dateTypeOptions = reactive([
  {
    label: '日(date)',
    value: 'date'
  },
  {
    label: '周(week)',
    value: 'week'
  },
  {
    label: '月(month)',
    value: 'month'
  },
  {
    label: '年(year)',
    value: 'year'
  },
  {
    label: '日期时间(datetime)',
    value: 'datetime'
  }
])

const colorFormatOptions = reactive([
  {
    label: 'hex',
    value: 'hex'
  },
  {
    label: 'rgb',
    value: 'rgb'
  },
  {
    label: 'rgba',
    value: 'rgba'
  },
  {
    label: 'hsv',
    value: 'hsv'
  },
  {
    label: 'hsl',
    value: 'hsl'
  }
])

const justifyOptions = reactive([
  {
    label: 'start',
    value: 'start'
  },
  {
    label: 'end',
    value: 'end'
  },
  {
    label: 'center',
    value: 'center'
  },
  {
    label: 'space-around',
    value: 'space-around'
  },
  {
    label: 'space-between',
    value: 'space-between'
  }
])


const dateTimeFormat = {
  date: 'YYYY-MM-DD',
  week: 'YYYY 第 ww 周',
  month: 'YYYY-MM',
  year: 'YYYY',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  daterange: 'YYYY-MM-DD',
  monthrange: 'YYYY-MM',
  datetimerange: 'YYYY-MM-DD HH:mm:ss'
}

const dateRangeTypeOptions = reactive([
  {
    label: '日期范围(daterange)',
    value: 'daterange'
  },
  {
    label: '月范围(monthrange)',
    value: 'monthrange'
  },
  {
    label: '日期时间范围(datetimerange)',
    value: 'datetimerange'
  }
]);


function tagChange(tagIcon) {
  let target = inputComponents.find(item => item.tagIcon === tagIcon)
  if (!target) target = selectComponents.find(item => item.tagIcon === tagIcon)
  emits('tag-change', target)
}

function spanChange(val) {
  // todo formConf -> formConfSchema
  props.formConf.span = val
}


function setTimeValue(val, type) {
  const valueFormat = type === 'week' ? dateTimeFormat.date : val
  props.activeData.defaultValue = null
  props.activeData['value-format'] = valueFormat
  props.activeData.format = val
}

function dateTypeChange(val) {
  setTimeValue(dateTimeFormat[val], val)
}

function onSwitchValueInput(val, name) {
  if (['true', 'false'].indexOf(val) > -1) {
    props.activeData[name] = JSON.parse(val)
  } else {
    props.activeData[name] = isNumberStr(val) ? +val : val
  }
}

function setDefaultValue(val) {
  if (Array.isArray(val)) {
    return val.join(',')
  }
  if (['string', 'number'].indexOf(val) > -1) {
    return val
  }
  if (typeof val === 'boolean') {
    return `${val}`
  }
  return val
}



function addSelectItem() {
  props.activeData.options.push({
    label: '',
    value: ''
  })
}


function addTreeItem() {
  ++idGlobal.value
  dialogVisible.value = true
  currentNode.value = props.activeData.options
}

function renderAppend(data) {
  if (!data.children) {
    data.children = []
  }
  dialogVisible.value = true
  currentNode.value = data.children
}

function renderRemove(node, data) {
  const { parent } = node
  const children = parent.data.children || parent.data
  const index = children.findIndex(d => d.id === data.id)
  children.splice(index, 1)
}

function renderContent(h, { node, data, store }) {
  return h('div', { class: 'custom-tree-node' }, [
    h('span', null, [node.label]),
    h('span', { class: 'node-operation' }, [
      h(resolveComponent('el-icon'), {
        title: '添加',
        class: 'el-icon-plus',
        onClick: () => renderAppend(data)
      }, { default: () => h(Plus) }),
      h(resolveComponent('el-icon'), {
        title: '删除',
        class: 'el-icon-delete',
        onClick: () => renderRemove(node, data)
      }, { default: () => h(Minus) })
    ])
  ]);
}

function addNode(data) {
  currentNode.value.push(data)
}


function rangeChange(val) {
  if (val) {
    props.activeData.defaultValue = [props.activeData.min, props.activeData.max]
  } else {
    props.activeData.min = props.activeData?.defaultValue?.[0] || 0;
    props.activeData.max = props.activeData?.defaultValue?.[1] || 100;
    props.activeData.defaultValue = props.activeData.min
  }
}
function rateTextChange(val) {
  if (val) props.activeData['show-score'] = false
}
function rateScoreChange(val) {
  if (val) props.activeData['show-text'] = false
}
function multipleChange(val) {
  if (val) {
    props.activeData.defaultValue = []
  } else {
    props.activeData.defaultValue = ''
  }
}

function addReg() {
  if (!props.activeData?.regList) {
    props.activeData.regList = []
  }
  props.activeData?.regList.push({
    pattern: '',
    message: ''
  })
}

/**
 * 修改模型
 * @param {*} id 
 * @param {*} activeData 
 */
function modeChange(id) {
  let info = modeList.value.find(item => item.id == id);
  if (info) {
    fieldList.value = info.fieldJson ? JSON.parse(info.fieldJson) : []
  }
}

/**
 * 获取模型
 */
async function getModes() {
  let res = await getData({ appId: props.appId, pageSize: 999 })
  if (res.code == 200) {
    modeList.value = res.data.list || []
    let modeInfo = props.formConfSchema.find(item => item.prop == "modeId")
    if (modeInfo) {
      // console.log('modeInfo:', modeInfo)
      // fieldList.value = info.fieldJson ? JSON.parse(info.fieldJson) : []
    }
  }
}
function init() {
  getModes()
}

// 解决 切换了type draggable的tag后 不能滑动的bug
watch(() => props.activeData.type, (value) => {
  props.activeData.renderKey = +new Date()
  init()
})
watch(() => props.appId, () => {
  init()
})
init()
</script>

<style lang="scss">
.auto-right {
  width: 100%;
  height: 100%;
  margin: 5px 0;

  .field-box {
    box-sizing: border-box;
    height: calc(100% - 40px);

    .right-scrollbar {
      height: calc(100% - 40px);
    }
  }

  .custom-tree-node {
    width: 100%;
    font-size: 14px;

    .node-operation {
      float: right;
    }

    i[class*="el-icon"]+i[class*="el-icon"] {
      margin-left: 6px;
    }

    .el-icon-plus {
      color: #409EFF;
    }

    .el-icon-delete {
      color: #157a0c;
    }
  }

  .right-board {
    width: 350px;
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 3px;

    .field-box {
      position: relative;
      height: calc(100vh - 42px);
      box-sizing: border-box;
      overflow: hidden;
    }

    .el-scrollbar {
      height: 100%;
    }
  }

  .select-item {
    display: flex;
    border: 1px dashed #fff;
    box-sizing: border-box;

    & .close-btn {
      cursor: pointer;
      color: #f56c6c;
    }

    & .el-input+.el-input {
      margin-left: 4px;
    }
  }

  .select-item+.select-item {
    margin-top: 4px;
  }

  .select-item.sortable-chosen {
    border: 1px dashed #409eff;
  }

  .select-line-icon {
    line-height: 32px;
    font-size: 22px;
    padding: 0 4px;
    color: #777;
  }

  .option-drag {
    cursor: move;
  }

  .time-range {
    .el-date-editor {
      width: 227px;
    }

    ::v-deep .el-icon-time {
      display: none;
    }
  }

  .document-link {
    position: absolute;
    display: block;
    width: 26px;
    height: 26px;
    top: 0;
    left: 0;
    cursor: pointer;
    background: #409eff;
    z-index: 1;
    border-radius: 0 0 6px 0;
    text-align: center;
    line-height: 26px;
    color: #fff;
    font-size: 18px;
  }

  .node-label {
    font-size: 14px;
  }

  .node-icon {
    color: #bebfc3;
  }
}
</style>