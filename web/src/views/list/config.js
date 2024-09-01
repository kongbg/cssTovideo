function getOptions() {
    return new Promise(resolve => {
        setTimeout(()=>{
            let options = [
                {
                    name: 'label',
                    id: '1'
                },
                {
                    name: 'label2',
                    id: '2'
                },
                {
                    name: 'labe3',
                    id: '3'
                },
            ]
            resolve(
                {
                    code: 200,
                    data: options,
                    msg: 'ok'
                }
            )
        })
    })
}

export const searchConfig = [
    {
        type: 'input',
        label: '输入框',
        prop: 'value1',
        defaultData: '默认值'
    },
    {
        type: 'select',
        label: '下拉框(多选)',
        prop: 'value2',
        multiple: true,
        options: [
            {
                label: 'label',
                value: '1'
            },
            {
                label: 'label2',
                value: '2'
            },
            {
                label: 'labe3',
                value: '3'
            },
        ]
    },
    {
        type: 'select',
        label: '下拉框(带option)',
        prop: 'value2',
        options: [
            {
                label: 'label',
                value: '1'
            },
            {
                label: 'label2',
                value: '2'
            },
            {
                label: 'labe3',
                value: '3'
            },
        ]
    },
    {
        type: 'select',
        label: '下拉框(带option,porps)',
        prop: 'value3',
        options: [
            {
                name: 'label',
                id: '1'
            }
        ],
        props: {
            label: 'name',
            value: 'id'
        }
    },
    {
        type: 'select',
        label: '下拉框(带api)',
        prop: 'value4',
        api: async () =>{
            let res = await getOptions();
            let { code, data, msg } = res;
            if (code == 200) {
                return data;
            }
            return [];
        },
        options: [],
        props: {
            label: 'name',
            value: 'id'
        },
    },
    {
        type: 'select',
        label: '下拉框(联动1级)',
        prop: 'value5',
        api: async () =>{
            let res = await getOptions();
            let { code, data, msg } = res;
            if (code == 200) {
                return data;
            }
            return [];
        },
        options: [],
        props: {
            label: 'name',
            value: 'id'
        },
        like: {
            key: 'value6'
        }
    },
    {
        type: 'select',
        label: '下拉框(联动2级)',
        prop: 'value6',
        api: async () =>{
            let res = await getOptions();
            let { code, data, msg } = res;
            if (code == 200) {
                return data;
            }
            return [];
        },
        options: [],
        props: {
            label: 'name',
            value: 'id'
        },
        like: {
            key: 'value7',
            parent: 'value5'
        }
    },
    {
        type: 'select',
        label: '下拉框(联动3级)',
        prop: 'value7',
        api: async () =>{
            let res = await getOptions();
            let { code, data, msg } = res;
            if (code == 200) {
                return data;
            }
            return [];
        },
        options: [],
        props: {
            label: 'name',
            value: 'id'
        },
        like: {
            parent: 'value6'
        }
    },
    {
        type: 'areacascader',
        label: '级联区域',
        prop: 'value8',
        options: [
            {
                areaName: '深圳',
                areaCode: '1',
                childList: [
                    {
                        areaName: '南山区',
                        areaCode: '11'
                    }
                ]
            },
            {
                areaName: '广州',
                areaCode: '2',
                childList: [
                    {
                        areaName: '南区',
                        areaCode: '21'
                    }
                ]
            }
        ],
        transData: (data) => {
            // 后端约定省市区，只取最后一级id
            return data[data.length - 1]
        }
    },
    {
        type: "datetimerange",
        label: "日期范围(时分秒)",
        prop: "value9",
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        clearable: true
    },
    {
        type: "daterange",
        label: "日期范围",
        prop: "value10",
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        clearable: true
    },
    {
        type: "date",
        label: "日期",
        prop: "value11",
        placeholder: '日期',
        defaultTime: [],
        clearable: true
    },
    {
        type: "radio",
        label: "单选",
        prop: "value12",
        options: [
            {
                name: '是',
                id: '1'
            },
            {
                name: '否',
                id: '0'
            }
        ],
        props: {
            label: 'name',
            value: 'id'
        }
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
        label: '姓名',
        prop: 'name'
    },
    {
        label: '地址',
        prop: 'address'
    },
    {
        label: '时间',
        prop: 'date'
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
                label: '输入框',
                prop: 'value1',
                defaultData: '默认值'
            }
        ]
    },
    {
        list: [
            {
                type: 'select',
                label: '下拉框(多选)',
                prop: 'value2',
                multiple: true,
                options: [
                    {
                        label: 'label',
                        value: '1'
                    },
                    {
                        label: 'label2',
                        value: '2'
                    },
                    {
                        label: 'labe3',
                        value: '3'
                    },
                ]
            }
        ]
    }
]