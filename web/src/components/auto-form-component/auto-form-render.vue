<template>
  <component :is="props.conf.tag" v-bind="cloneConf"  v-model="formData[conf.vModel]" >
      <template #default>
        <template v-for="(item, childKey) in form.componentChild[props.conf?.tag]">
          <Childer  v-if="props.conf[childKey] || childKey == 'default'"  :tag="props.conf.tag" :conf="props.conf" :child-key="childKey" />
        </template>
      </template>
  </component>
</template>

<script setup>
import {computed, defineComponent, defineProps, h, ref, watch, watchEffect} from 'vue';
import MobileLayerAutoForm from './mobileLayerAutoForm';

const props = defineProps({
  conf: {
    type: Object,
    required: true
  },
  formData: {
    type: Object,
    default: ()=>{}
  }
});

const form = new MobileLayerAutoForm();
// const cloneConf = ref(props.conf)
const cloneConf = computed(()=>{
  let obj = {}
  for (const key in props.conf.confs) {
    obj[key] = props.conf.confs[key].value
  }
  return obj
})

if (props.formData) {
  props.formData[props.conf.vModel] = props.conf.defaultValue
}

watch(props.conf,(value) => {
    console.debug("数据变化", value)
    // cloneConf.value = {...props.conf}
    if (props.formData) {
      props.formData[props.conf.vModel] = props.conf.defaultValue
    }
    // checkbox 中tag 不能替换为此处tag的含义
    delete cloneConf.value.tag
    delete cloneConf.value.defaultValue
},{deep: true, immediate:true})

/*
const children = ref([])

const childObjs = form.componentChild[props.conf?.tag];

if (childObjs) {
  Object.keys(childObjs).forEach((key) => {
    const childFunc = childObjs[key];
    if (props.conf[key]) {
      children.value.push(childFunc(h, props.conf, key));
    }
  });
}*/

const Childer = defineComponent({
  props: {
    tag: {
      type: String,
      required: true
    },
    childKey: {
      type: String,
      required: true
    },
    conf: {
      type: Object,
      required: true
    }
  },
  setup(props,{attrs}) {
    console.log('props', props)
    return () => h('div', null , [form.componentChild[props.tag][props.childKey]?.(h, props.conf, props.childKey)]);
  },
});

</script>

<style lang="scss" scoped>
</style>
