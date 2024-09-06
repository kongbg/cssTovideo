<template>
  <div class="auto-form-view">
    <div class="auto-form-context">
      <UIEngine :formConf="formConf" :formData="formData" :formConfSchema="formConfSchemas" :drawingList="drawingList" mode="runtime" @handleEvent="handleEvent" >
      </UIEngine>
    </div>
  </div>
</template>

<script setup>
import { formConfSchema } from "@/config/generator/config.js"
import { onMounted, reactive } from "vue";
import UIEngine from "./UIEngine.vue";
import { getDetails } from '@/api/page.js'
import { getDataByModeId, createByModeId, updateByModeId } from '@/api/common.js'

const route = useRoute()
const { pageId } = route.params
const { id, action='create' } = route.query
let formConfSchemas = reactive(formConfSchema)
let drawingList = reactive([])
const formData = ref({})

// 对象序列化，undefined和函数丢失问题
const JSONStringify = (option) => {
  return JSON.stringify(option,
    (key, val) => {
      // 处理函数丢失问题
      if (typeof val === 'function') {
        return `${val}`;
      }
      // 处理undefined丢失问题
      if (typeof val === 'undefined') {
        return 'undefined';
      }
      return val;
    },
    2
  )
}
// 对象序列化解析
const JSONParse = (objStr) => {
  return JSON.parse(objStr, (k, v) => {
    if (typeof v === 'string' && v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
      // eval 可能在eslint中报错，需要加入下行注释
      // eslint-disable-next-line
      return eval(`(function(){return ${v}})()`);
    }
    return v;
  });
}


/**
 * 获取页面配置
 */
async function getDetail() {
  let params = { id: pageId }
  let res = await getDetails(params);
  if (res.code == 200) {
    let config = JSON.parse(res.data.config) || {
      formConfSchema: formConfSchema,
      drawingConf: []
    }

    formConfSchemas = reactive([])
    config.formConfSchema.forEach(item => {
      formConfSchemas.push(item)
    })

    config.drawingConf.forEach(item => {
      if (['view'].includes(action)) {
        if(item.tag == 'el-button' && item.eventId == 'submit') {

        } else {
          drawingList.push(item)
        }
      } else {
        drawingList.push(item)
      }
    })
  } else {

  }
}

/**
 * 通过页面id获取数据
 */
 async function getPageData() {
  if (!id) return
  let params = { pageId, modeId: formConfigRef.modeId, id, type: 'form' }
  let res = await getDataByModeId(params);
  if (res.code == 200) {
    setTimeout(()=>{
      formData.value = {...res.data}
    }, 100)
  } else {

  }
}

/**
 * 所有事件触发这个方法
 */
async function handleEvent(data) {
  // console.log('handleEvent:', data)
  let { action, element, formData } = data
  delete formData['undefined']
  switch(action) {
    case 'submit':
      submit(element, formData)
      break;
  }
}

async function submit(element, formData) {
  console.log('submit执行了:', action, element, formConfigRef, formData)
  let api = action == 'create' ? createByModeId : updateByModeId
  let actionStr = action == 'create' ? '创建' : '编辑'
  action == 'create' ? formData.id = id : ''
  let params = { pageId, modeId: formConfigRef.modeId, formData }
  let res = await api(params);
  if (res.code == 200) {
    console.log(`${actionStr}成功`)
    console.log('createByModeId:',res)
  } else {
    console.log(`${actionStr}失败`)
  }
}

async function init() {
  await getDetail()
  if (['edit', 'view'].includes(action)) {
    getPageData()
  }
}

function drawingItemCopy(item, parent) { }
function drawingItemDelete(index, parent) { }
function activeFormItem(element) { }


onMounted(() => {
  // 初始化页面
  init()
})
</script>