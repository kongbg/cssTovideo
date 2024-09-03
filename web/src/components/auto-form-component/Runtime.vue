<template>
  <div class="auto-form-view">
    <div class="auto-form-context">
      <UIEngine :formConf="formConf" :formConfigRef="formConfigRef" :drawingList="drawingList" mode="runtime" >
      </UIEngine>
    </div>
  </div>
</template>

<script setup>
import { formConf } from "@/config/generator/config.js"
import { onMounted, reactive } from "vue";
import UIEngine from "./UIEngine.vue";
import { getDetails } from '@/api/page.js'
import { getDataByModeId } from '@/api/common.js'

const route = useRoute()
const { pageId, id } = route.params
const formConfigRef = reactive(formConf)
let drawingList = reactive([])


/**
 * 获取页面配置
 */
async function getDetail() {
  let params = { id: pageId }
  let res = await getDetails(params);
  if (res.code == 200) {
    let config = JSON.parse(res.data.config) || {
      formConf: formConf,
      drawingConf: []
    }

    for (const key in config.formConf) {
      formConfigRef[key] = config.formConf[key]
    }

    config.drawingConf.forEach(item => {
      drawingList.push(item)
    })
  } else {

  }
}

/**
 * 通过页面id获取数据
 */
 async function getPageData() {
  let params = { pageId, modeId: formConfigRef.modeId, id, type: 'form' }
  let res = await getDataByModeId(params);
  if (res.code == 200) {
    console.log('getModeDetail:',res.data)
  } else {

  }
}

async function init() {
  await getDetail()
  getPageData()
}

function drawingItemCopy(item, parent) { }
function drawingItemDelete(index, parent) { }
function activeFormItem(element) { }


onMounted(() => {
  // 初始化页面
  init()
})
</script>