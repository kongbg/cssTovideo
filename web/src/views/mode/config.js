export const searchConfig = [
    {
        type: 'input',
        label: '名称',
        prop: 'name'
    },
    {
        type: 'input',
        label: '描述',
        prop: 'desc',
    },
    {
        type: 'input',
        label: '创建人',
        prop: 'createBy',
    },
    {
        type: 'select',
        label: '下拉框',
        prop: 'status',
        options: [
            {
                label: '启用',
                value: '1'
            },
            {
                label: '禁用',
                value: '0'
            }
        ]
    },
    {
        type: "datetimerange",
        label: "创建时间",
        prop: "createTime",
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        clearable: true
    },
    {
        type: "datetimerange",
        label: "更新时间",
        prop: "updateTime",
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        clearable: true
    },
    { type: "reset", label: "重置条件" },
    { type: "submit", label: "查询" }
]
export const columns = [
    {
        type: 'index',
        label: '序号',
        width: 60
    },
    {
        label: '模型名称',
        prop: 'name'
    },
    {
        label: '描述',
        prop: 'desc'
    },
    {
        label: '状态',
        prop: 'status'
    },
    {
        label: '创建人',
        prop: 'createBy'
    },
    {
        label: '创建时间',
        prop: 'createTime'
    },
    {
        label: '更新时间',
        prop: 'updateTime'
    },
    {
        label: '操作',
        slot: 'action'
    }
]

export const formConfig = [
    {
        list: [
            {
                type: 'input',
                label: '所属应用',
                prop: 'appId',
                disabled: true,
            }
        ]
    },
    {
        list: [
            {
                type: 'input',
                label: '模型名称',
                prop: 'name',
                required: true,
                min: 1,
                max: 10
            }
        ]
    },
    {
        list: [
            {
                type: 'select',
                label: '状态',
                prop: 'status',
                defaultData: '1',
                options: [
                    {
                        label: '启用',
                        value: '1'
                    },
                    {
                        label: '禁用',
                        value: '0'
                    }
                ]
            }
        ]
    },
    {
        list: [
            {
                type: 'input',
                label: '模型描述',
                prop: 'desc'
            }
        ]
    }
]

function getFormRules(config=[]) {
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
export const formRules = getFormRules(formConfig)