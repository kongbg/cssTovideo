import { getData } from '@/api/dict'
import { getType } from "@/utils/index";

/**
 * 获取字典数据
 */
export function useDict(...args) {
  const res = ref({});
  return (() => {
    args.forEach((dictType, index) => {
      res.value[dictType] = [];
     
      getData({type: dictType, pageSize: 999}).then(resp => {
        res.value[dictType] = resp.data.list.map(p => {
          return { 
            label: p.dictLabel,
            value: p.dictValue,
            dictLabel: p.dictLabel,
            dictValue: p.dictValue,
            elTagType: p.listClass,
            elTagClass: p.cssClass
          }
        })
      })
      
    })
    return toRefs(res.value);
  })()
}

/**
 * 字典转中文
 */
export function formatDict(val, dict, split=',', props= {label:'label', value:'value'}) {
  if (getType(dict) == 'string') {
    let res = useDict(dict)
    dict = res[dict]
  }
  if (getType(val) == 'array') {
    let info = dict.find(item => item[props.value] == val);
    if (info) {
      return info[props.label]
    } else {
      return '-'
    }
  } else {
    // todo 多选
  }
}