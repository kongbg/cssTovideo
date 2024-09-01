export function deepClone (source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  }

// 获取数据类型
export function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

// 生成表单校验
export function getFormRules(config=[]) {
  let rules = {};
  config.forEach(item=>{
      let list = item.list || [];
      list.forEach(info=>{
          rules[info.prop] = [];
          // 必填
          if (info.required) {
              let rule = { required: true, message: `请输入正确${info.label}`, trigger: ['blur', 'change'] }
              rules[info.prop].push(rule)
          }

          // 限制长度
          if (info.min) {
              let min = info.min, max = info.max || 50;
              let rule = { min, max, message: `请输入${min}到${max}个字符`, trigger: ['blur', 'change'] }
              rules[info.prop].push(rule)
          }

          // 自定义方法
          if (info.validator) {
              rules[info.prop] = [
                  { validator: info.validator, trigger: 'blur' }
              ];
          }
      })
  })

  return rules
}