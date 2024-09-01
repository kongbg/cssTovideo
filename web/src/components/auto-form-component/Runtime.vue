<template>
  <div class="auto-form-view">
    <div class="auto-form-context">
      <UIEngine :formConf="formConf" :formConfigRef="formConfigRef" :drawingList="drawingList" mode="runtime">
      </UIEngine>
    </div>
  </div>
</template>

<script setup>
import { formConf } from "@/config/generator/config.js"
import { onMounted, reactive } from "vue";
import UIEngine from "./UIEngine.vue";
import { getDetails } from '@/api/page.js'

const route = useRoute()
const { id } = route.query
const formConfigRef = reactive(formConf)
let drawingList = reactive([])


/**
 * 获取页面配置
 */
async function getDetail() {
  let params = { id }
  let res = await getDetails(params);
  if (res.code == 200) {
    let configs = JSON.parse(res.data.config) || []
    configs.forEach(item => {
      drawingList.push(item)
    })
  } else {

  }
}

function init() {
  getDetail()
}

function drawingItemCopy(item, parent) { }
function drawingItemDelete(index, parent) { }
function activeFormItem(element) { }


onMounted(() => {
  // 初始化页面
  init()
})
</script>