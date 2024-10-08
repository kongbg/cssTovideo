import { getData as getModesData } from '@/api/mode.js'
window.getModesData = getModesData
export const formConf = {
    formRef: 'formRefObj',
    formModel: 'formData',
    modeId: '',
    size: 'default',
    labelPosition: 'right',
    labelWidth: 100,
    formRules: 'rules',
    gutter: 15,
    disabled: false,
    span: 24,
    formBtns: true
}
export const formConfSchema =ref([
    {
        type: 'input',
        label: '表单名',
        placeholder: "请输入表单名（ref）",
        prop: 'formRef',
        value: '',
        defaultData: 'formRefObj'
    },
    {
        type: 'input',
        label: '表单ID',
        prop: 'formId',
        value: '',
        disabled: true
    },
    {
        type: 'input',
        label: '校验模型',
        placeholder: "请输入校验模型",
        prop: 'formModel',
        value: '',
        defaultData: 'rules'
    },
    {
        type: 'select',
        label: '数据模型',
        placeholder: "请选择数据模型",
        prop: 'modeId',
        value: '',
        api: async (id) =>{
            let res = await getModesData();
            let { code, data, msg } = res;
            if (code == 200) {
                return data.list;
            }
            return [];
        },
        options: [],
        props: {
            label: 'name',
            value: 'id'
        }
    },
    {
        type: 'tab-radio',
        label: '表单尺寸',
        prop: 'size',
        value: '',
        defaultData: 'default',
        options: [
            {
                label: '稍大',
                value: 'large'
            },
            {
                label: '默认',
                value: 'default'
            },
            {
                label: '较小',
                value: 'small'
            },
            {
                label: '自定义',
                value: 'custom'
            }
        ],
    },
    {
        type: 'tab-radio',
        label: '标签对齐',
        prop: 'labelPosition',
        value: '',
        defaultData: 'right',
        options: [
            {
                label: '左对齐',
                value: 'left'
            },
            {
                label: '右对齐',
                value: 'right'
            },
            {
                label: '顶部对齐',
                value: 'top'
            }
        ],
    },
    {
        type: 'input-number',
        label: '标签宽度',
        placeholder: "请输入标签宽度",
        prop: 'labelWidth',
        value: '',
        defaultData: 100
    },
    {
        type: 'switch',
        label: '禁用表单',
        prop: 'disabled',
        value: false,
        defaultData: false
    },
    {
        type: 'switch',
        label: '表单按钮',
        prop: 'formBtns',
        value: false,
        defaultData: false
    },
    {
        type: 'switch',
        label: '显示未选中组件边框',
        prop: 'unFocusedComponentBorder',
        value: false,
        defaultData: false
    },
])


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




export const inputComponents = [
    // {
    //     label: '单行文本',
    //     tag: 'el-input',
    //     tagIcon: 'input',
    //     placeholder: '请输入',
    //     defaultValue: undefined,
    //     span: 24,
    //     labelWidth: null,
    //     style: {width: '100%'},
    //     clearable: true,
    //     prepend: '',
    //     append: '',
    //     'prefix-icon': '',
    //     'suffix-icon': '',
    //     maxlength: null,
    //     'show-word-limit': false,
    //     readonly: false,
    //     disabled: false,
    //     required: true,
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '小数',
    //     tag: 'el-input',
    //     type: "number",
    //     tagIcon: 'decimals',
    //     placeholder: '请输入',
    //     defaultValue: undefined,
    //     span: 24,
    //     labelWidth: null,
    //     style: {width: '100%'},
    //     clearable: true,
    //     prepend: '',
    //     append: '',
    //     'prefix-icon': '',
    //     'suffix-icon': '',
    //     maxlength: null,
    //     'show-word-limit': false,
    //     readonly: false,
    //     disabled: false,
    //     required: true,
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '整数',
    //     tag: 'el-input',
    //     type: "number",
    //     tagIcon: 'number',
    //     placeholder: '请输入',
    //     defaultValue: undefined,
    //     span: 24,
    //     labelWidth: null,
    //     style: {width: '100%'},
    //     clearable: true,
    //     prepend: '',
    //     append: '',
    //     'prefix-icon': '',
    //     'suffix-icon': '',
    //     maxlength: null,
    //     'show-word-limit': false,
    //     readonly: false,
    //     disabled: false,
    //     required: true,
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '多行文本',
    //     tag: 'el-input',
    //     tagIcon: 'textarea',
    //     type: 'textarea',
    //     placeholder: '请输入',
    //     defaultValue: undefined,
    //     span: 24,
    //     labelWidth: null,
    //     autosize: {
    //         minRows: 4,
    //         maxRows: 4
    //     },
    //     style: {width: '100%'},
    //     maxlength: null,
    //     'show-word-limit': false,
    //     readonly: false,
    //     disabled: false,
    //     required: true,
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '密码',
    //     tag: 'el-input',
    //     tagIcon: 'password',
    //     placeholder: '请输入',
    //     defaultValue: undefined,
    //     span: 24,
    //     'show-password': true,
    //     labelWidth: null,
    //     style: {width: '100%'},
    //     clearable: true,
    //     prepend: '',
    //     append: '',
    //     'prefix-icon': '',
    //     'suffix-icon': '',
    //     maxlength: null,
    //     'show-word-limit': false,
    //     readonly: false,
    //     disabled: false,
    //     required: true,
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '计数器',
    //     tag: 'el-input-number',
    //     tagIcon: 'number',
    //     placeholder: '',
    //     defaultValue: undefined,
    //     span: 24,
    //     labelWidth: null,
    //     min: undefined,
    //     max: undefined,
    //     step: undefined,
    //     'step-strictly': false,
    //     precision: undefined,
    //     'controls-position': '',
    //     disabled: false,
    //     required: true,
    //     regList: [],
    //     changeTag: true
    // }
]

export const selectComponents = [
    {
        label: '下拉选择',
        tag: 'el-select',
        tagIcon: 'select',
        placeholder: '请选择',
        defaultValue: '',
        span: 24,
        labelWidth: null,
        style: {width: '100%'},
        clearable: true,
        disabled: false,
        required: true,
        filterable: false,
        multiple: false,
        options: [{
            label: '选项一',
            value: 1
        }, {
            label: '选项二',
            value: 2
        }],
        regList: [],
        changeTag: true
    },
    // {
    //     label: '级联选择',
    //     tag: 'el-cascader',
    //     tagIcon: 'cascader',
    //     placeholder: '请选择',
    //     defaultValue: [],
    //     span: 24,
    //     labelWidth: null,
    //     style: {width: '100%'},
    //     props: {
    //         multiple: false
    //     },
    //     'show-all-levels': true,
    //     disabled: false,
    //     clearable: true,
    //     filterable: false,
    //     required: true,
    //     options: [{
    //         value: 1,
    //         label: '选项1',
    //         children: [{
    //             value: 2,
    //             label: '选项1-1'
    //         }]
    //     }],
    //     'popper-append-to-body': false,
    //     'teleported': false,
    //     dataType: 'dynamic',
    //     labelKey: 'label',
    //     valueKey: 'value',
    //     childrenKey: 'children',
    //     separator: '/',
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '单选框组',
    //     tag: 'el-radio-group',
    //     tagIcon: 'radio',
    //     defaultValue: undefined,
    //     span: 24,
    //     labelWidth: null,
    //     style: {},
    //     optionType: 'default',
    //     border: false,
    //     size: 'default',
    //     disabled: false,
    //     required: true,
    //     options: [{
    //         label: '选项一',
    //         value: 1
    //     }, {
    //         label: '选项二',
    //         value: 2
    //     }],
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '多选框组',
    //     tag: 'el-checkbox-group',
    //     tagIcon: 'checkbox',
    //     defaultValue: [],
    //     span: 24,
    //     labelWidth: null,
    //     style: {},
    //     optionType: 'default',
    //     size: 'default',
    //     disabled: false,
    //     required: true,
    //     options: [{
    //         label: '选项一',
    //         value: 1
    //     }, {
    //         label: '选项二',
    //         value: 2
    //     }],
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '开关',
    //     tag: 'el-switch',
    //     tagIcon: 'switch',
    //     defaultValue: false,
    //     span: 24,
    //     labelWidth: null,
    //     style: {
    //         '--el-switch-on-color': null,
    //         '--el-switch-off-color': null,
    //     },
    //     disabled: false,
    //     required: true,
    //     'active-text': '',
    //     'inactive-text': '',
    //     'active-value': true,
    //     'inactive-value': false,
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '滑块',
    //     tag: 'el-slider',
    //     tagIcon: 'slider',
    //     defaultValue: null,
    //     span: 24,
    //     labelWidth: null,
    //     disabled: false,
    //     required: true,
    //     min: 0,
    //     max: 100,
    //     step: 1,
    //     'show-stops': false,
    //     range: false,
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '时间选择',
    //     tag: 'el-time-picker',
    //     tagIcon: 'time',
    //     placeholder: '请选择',
    //     defaultValue: null,
    //     span: 24,
    //     labelWidth: null,
    //     style: {width: '100%'},
    //     disabled: false,
    //     clearable: true,
    //     required: true,
    //     'picker-options': {
    //         selectableRange: '00:00:00-23:59:59'
    //     },
    //     format: 'HH:mm:ss',
    //     'value-format': 'HH:mm:ss',
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '时间范围',
    //     tag: 'el-time-picker',
    //     tagIcon: 'time-range',
    //     defaultValue: null,
    //     span: 24,
    //     labelWidth: null,
    //     style: {width: '100%'},
    //     disabled: false,
    //     clearable: true,
    //     required: true,
    //     'is-range': true,
    //     'range-separator': '至',
    //     'start-placeholder': '开始时间',
    //     'end-placeholder': '结束时间',
    //     format: 'HH:mm:ss',
    //     'value-format': 'HH:mm:ss',
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '日期选择',
    //     tag: 'el-date-picker',
    //     tagIcon: 'date',
    //     placeholder: '请选择',
    //     defaultValue: null,
    //     type: 'date',
    //     span: 24,
    //     labelWidth: null,
    //     style: {width: '100%'},
    //     disabled: false,
    //     clearable: true,
    //     required: true,
    //     format: 'YYYY-MM-DD',
    //     'value-format': 'YYYY-MM-DD',
    //     readonly: false,
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '日期范围',
    //     tag: 'el-date-picker',
    //     tagIcon: 'date-range',
    //     defaultValue: null,
    //     span: 24,
    //     labelWidth: null,
    //     style: {width: '100%'},
    //     type: 'daterange',
    //     'range-separator': '至',
    //     'start-placeholder': '开始日期',
    //     'end-placeholder': '结束日期',
    //     disabled: false,
    //     clearable: true,
    //     required: true,
    //     format: 'YYYY-MM-DD',
    //     'value-format': 'YYYY-MM-DD',
    //     readonly: false,
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '评分',
    //     tag: 'el-rate',
    //     tagIcon: 'rate',
    //     defaultValue: 0,
    //     span: 24,
    //     labelWidth: null,
    //     style: {},
    //     texts: ['极差', '失望', '一般', '满意', '惊喜'],
    //     max: 5,
    //     'allow-half': false,
    //     'show-text': false,
    //     'show-score': false,
    //     disabled: false,
    //     required: true,
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '颜色选择',
    //     tag: 'el-color-picker',
    //     tagIcon: 'color',
    //     defaultValue: null,
    //     labelWidth: null,
    //     'show-alpha': false,
    //     'color-format': '',
    //     disabled: false,
    //     required: true,
    //     size: 'default',
    //     regList: [],
    //     changeTag: true
    // },
    // {
    //     label: '上传',
    //     tag: 'el-upload',
    //     tagIcon: 'upload',
    //     action: 'https://jsonplaceholder.typicode.com/posts/',
    //     defaultValue: null,
    //     labelWidth: null,
    //     disabled: false,
    //     required: true,
    //     accept: '',
    //     name: 'file',
    //     'auto-upload': true,
    //     showTip: false,
    //     buttonText: '点击上传',
    //     fileSize: 2,
    //     sizeUnit: 'MB',
    //     'list-type': 'text',
    //     multiple: false,
    //     regList: [],
    //     changeTag: true
    // }
]

export const layoutComponents = [
    {
        layout: 'divWrap',// 渲染方式
        tag: 'div', // 渲染标签
        tagType: 'wrap',
        label: '普通容器', // 组件名称
        type: 'flex', // 可以拖入子元素
        justify: 'start', // 横向排列，这个可以提取到可编辑属性中
        align: 'top',// ？，这个可以提取到可编辑属性中
        layoutTree: true,// 布局树
        children: [],// 子元素
        confs: { // 可编辑属性
            span: {
                type: 'slider',
                label: '栅格',
                prop: 'span',
                value: '',
                defaultData: 24,
                max: 24,
                min: 0
            },
            // gutter: {
            //     type: 'input-number',
            //     label: '栅格间隔',
            //     prop: 'gutter',
            //     value: 0,
            //     defaultData: 0,
            //     unit: 'px'
            // },
            // height: {
            //     type: 'input-number',
            //     label: '高度',
            //     prop: 'height',
            //     value: '',
            //     defaultData: 80,
            //     style: true,
            //     unit: 'px'
            // },
            'min-height': {
                type: 'input-number',
                label: '最小高度',
                prop: 'min-height',
                value: '',
                defaultData: 80,
                style: true,
                unit: 'px'
            },
            'padding': {
                type: 'margin-padding',
                label: '内边距',
                prop: 'padding',
                value: '',
                defaultData: '0px 0px 0px 0px',
                style: true,
                unit: 'px'
            },
            'margin': {
                type: 'margin-padding',
                label: '外边距',
                prop: 'margin',
                value: '',
                defaultData: '0px 0px 0px 0px',
                style: true,
                unit: 'px'
            }
        }
    },
    {
        layout: 'rowWrap',
        tagIcon: 'row',
        type: 'flex',
        justify: 'start',
        align: 'top',
        label: '行容器',
        layoutTree: true,
        children: [],
        confs: {
            span: {
                type: 'slider',
                label: '栅格',
                prop: 'span',
                value: '',
                defaultData: 24,
                max: 24,
                min: 0
            },
            // gutter: {
            //     type: 'input-number',
            //     label: '栅格间隔',
            //     prop: 'gutter',
            //     value: 0,
            //     defaultData: 0,
            //     unit: 'px'
            // },
            // height: {
            //     type: 'input-number',
            //     label: '高度',
            //     prop: 'height',
            //     value: '',
            //     defaultData: 80,
            //     style: true,
            //     unit: 'px'
            // },
            'min-height': {
                type: 'input-number',
                label: '最小高度',
                prop: 'min-height',
                value: '',
                defaultData: 80,
                style: true,
                unit: 'px'
            },
            'padding': {
                type: 'margin-padding',
                label: '内边距',
                prop: 'padding',
                value: '',
                defaultData: '0px 0px 0px 0px',
                style: true,
                unit: 'px'
            },
            'margin': {
                type: 'margin-padding',
                label: '外边距',
                prop: 'margin',
                value: '',
                defaultData: '0px 0px 0px 0px',
                style: true,
                unit: 'px'
            }
        }
    },
    {
        layout: 'colWrap',
        tagIcon: 'row',
        type: 'flex',
        justify: 'start',
        align: 'top',
        label: '列容器',
        layoutTree: true,
        children: [],
        confs: {
            span: {
                type: 'slider',
                label: '栅格',
                prop: 'span',
                value: '',
                defaultData: 24,
                max: 24,
                min: 0
            },
            // gutter: {
            //     type: 'input-number',
            //     label: '栅格间隔',
            //     prop: 'gutter',
            //     value: 0,
            //     defaultData: 0,
            //     unit: 'px'
            // },
            // height: {
            //     type: 'input-number',
            //     label: '高度',
            //     prop: 'height',
            //     value: '',
            //     defaultData: 80,
            //     style: true,
            //     unit: 'px'
            // },
            'min-height': {
                type: 'input-number',
                label: '最小高度',
                prop: 'min-height',
                value: '',
                defaultData: 80,
                style: true,
                unit: 'px'
            },
            'padding': {
                type: 'margin-padding',
                label: '内边距',
                prop: 'padding',
                value: '',
                defaultData: '0px 0px 0px 0px',
                style: true,
                unit: 'px'
            },
            'margin': {
                type: 'margin-padding',
                label: '外边距',
                prop: 'margin',
                value: '',
                defaultData: '0px 0px 0px 0px',
                style: true,
                unit: 'px'
            }
        }
    }
]

export const headTitleComponents = [
    // {
    //     label: '一级标题',
    //     tag: 'h1',
    //     tagIcon: 'title-h1',
    //     changeTag: true,
    //     style: {
    //         flex: 1,
    //         color: "#1A93F9",
    //         fontSize: "18px",
    //         height: "25px",
    //         lineHeight: "25px",
    //         textShadow: "#5B96E9AB 2px 2px 3px",
    //         borderLeft: '5px solid #3f92d991',
    //         paddingLeft:  '10px'
    //     },
    //     class : 'head-title-h1'
    // },
    // {
    //     label: '二级标题',
    //     tag: 'h2',
    //     tagIcon: 'title-h2',
    //     changeTag: true,
    //     style: {
    //         flex: 1,
    //         color: "#1A93F9",
    //         fontSize: "15px",
    //         height: "24px",
    //         lineHeight: "24px",
    //         textShadow: "#5B96E9AB 2px 2px 3px",
    //         borderLeft: '5px solid rgb(81 97 237 / 57%)',
    //         paddingLeft:  '10px'
    //     },
    //     class : 'head-title-h2'
    // }
]

export const actionComponents = [
    {
        label: '按钮',
        tag: 'el-button',
        layout: 'divItem',
        // tagIcon: 'button',
        // 'btn-text': '点击我！',
        // 'formItem': false,
        // default: 'ok',
        // disabled: false,
        // changeTag: false,
        // width: 100,
        // labelWidth: '0',
        // eventId: '',
        // events: [
        //     {
        //         label: '提交',
        //         value: 'submit'
        //     },
        //     {
        //         label: '取消',
        //         value: 'cancel'
        //     }
        // ],
        confs: {
            'btn-text': {
                type: 'input',
                label: '按钮文案',
                placeholder: "请输入按钮文案",
                prop: 'btn-text',
                value: '',
                defaultData: '点击我！'
            },
            eventId: {
                type: 'select',
                label: '事件',
                placeholder: "请选择事件",
                prop: 'eventId',
                value: '',
                options: [
                    {
                        label: '提交',
                        value: 'submit'
                    },
                    {
                        label: '取消',
                        value: 'cancel'
                    }
                ],
            },
            width: {
                type: 'input-number',
                label: '宽度',
                prop: 'width',
                value: '',
                defaultData: 100
            },
            span: {
                type: 'slider',
                label: '表单栅格',
                prop: 'span',
                value: '',
                defaultData: 24,
                max: 24,
                min: 0
            },
            disabled: {
                type: 'switch',
                label: '是否禁用',
                prop: 'disabled',
                value: false,
                defaultData: false
            }
        }
    }
]

export const dataComponents = [
    {
        label: '搜索组件',
        tag: 't-search',
        layout: 't-search',
        confs: {
            span: {
                type: 'slider',
                label: '栅格',
                prop: 'span',
                value: '',
                defaultData: 24,
                max: 24,
                min: 0
            },
        }
    },
    {
        label: '表格',
        tag: 't-table',
        layout: 't-table',
        data: [{date: "123"}],
        confs: {
            span: {
                type: 'slider',
                label: '栅格',
                prop: 'span',
                value: '',
                defaultData: 24,
                max: 24,
                min: 0
            },
        }
    }
]

export const componentsTypes = [
    {
        typeName: '布局型组件',
        svgIconName: 'component',
        typeList: layoutComponents
    },
    {
        typeName: '数据展示组件',
        svgIconName: 'component',
        typeList: dataComponents
    },
    // {
    //     typeName: "标注型组件",
    //     svgIconName: 'component',
    //     typeList: headTitleComponents
    // },
    // {
    //     typeName: '输入型组件',
    //     svgIconName: 'component',
    //     typeList: inputComponents
    // },
    {
        typeName: '选择型组件',
        svgIconName: 'component',
        typeList: selectComponents
    },
    {
        typeName: '操作型组件',
        svgIconName: 'component',
        typeList: actionComponents
    }
]

// 组件rule的触发方式，无触发方式的组件不生成rule
export const trigger = {
    'el-input': 'blur',
    'el-input-number': 'blur',
    'el-select': 'change',
    'el-radio-group': 'change',
    'el-checkbox-group': 'change',
    'el-cascader': 'change',
    'el-time-picker': 'change',
    'el-date-picker': 'change',
    'el-rate': 'change'
}
