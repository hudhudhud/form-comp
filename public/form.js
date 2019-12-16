this.formJs = {
    "js": [
      //"http://10.90.13.61/test/test.js"
    ],
    "elements": [
      {
        "type": "input",
        "label":'姓名',
        "value":'',
        "name":'name',
        "attributes": [
          {
            "name": "class",
            "value": [
              "cls-init"
            ]
          },
          {
            "name": "placeholder",
            "value": "test input"
          },
          {
            "name": "style",
            "value": {
              "background-color": "#fff"
            }
          },
          {
            "name": "name",
            "value": "txt"
          }
        ],
        "events": [
          {
            "name": "click",
            "handler": "test"
          }
        ]
      },
      {
        "type": "input",
        "label":'年龄',
        "value":'',
        "regexp":'^[0-9]*$',
        "name":'age',
        "attributes": [
          {
            "name": "class",
            "value": [
              "cls-init"
            ]
          },
          {
            "name": "placeholder",
            "value": "test input"
          },
          {
            "name": "style",
            "value": {
              "background-color": "#fff"
            }
          },
          {
            "name": "name",
            "value": "txt"
          }
        ],
        "events": [
          {
            "name": "click",
            "handler": "test"
          }
        ]
      },
      {
        "type": "radio",
        "label":'性别',
        "value":1,
        "name":'sex',
        "options":[
          {value:0,'label':'男'},
          {value:1,'label':'女'},
        ],
        "attributes": [
          {
            "name": "class",
            "value": [
           
            ]
          },
          {
            "name": "style",
            "value": {
              "background-color": "#fff",
            }
          },
          {
            "name": "name",
            "value": "chk"
          }
        ],
        "callback":"test",
      },
      {
        "type": "checkboxGroup",
        "label":'异步兴趣爱好',
        "value":[0,1],
        "name":'love',
        "options":()=>this.getData(),
        "labelKey":'name',
        "valueKey":'value',
        "attributes": [
          {
            "name": "class",
            "value": [
           
            ]
          },
          {
            "name": "style",
            "value": {
              "background-color": "#fff",
            }
          },
          {
            "name": "name",
            "value": "chk"
          }
        ],
        "callback":"test",
      },
      {
        "type": "checkboxGroup",
        "label":'同步兴趣爱好',
        "value":[0,1],
        "name":'loveSync',
        "options":()=>this.getDataSync(),
        "labelKey":'name',
        "valueKey":'value',
        "attributes": [
          {
            "name": "class",
            "value": [
           
            ]
          },
          {
            "name": "style",
            "value": {
              "background-color": "#fff",
            }
          },
          {
            "name": "name",
            "value": "chk"
          }
        ],
        "callback":"test",
      },
      {
        "type": "select",
        "label":'省',
        "value":"",
        "name":'province',
        "options":()=>getProvince(),
        "labelKey":'name',
        "valueKey":'val',
        "childrenKey":'children',
        "attributes": [
          {
            "name": "class",
            "value": [
           
            ]
          },
          {
            "name": "style",
            "value": {
              "background-color": "#fff",
            }
          },
          {
            "name": "name",
            "value": "chk"
          }
        ],
        "callback":"test",
      },
      {
        "type": "selectCascader",
        "label":'级联地址',
        "value":["0"],
        "name":'address',
        "options":[()=>getProvince(),[{val:"00",name:'杭州市'}, {val:"01",name:'余杭市'}]],
        "labelKey":'name',
        "valueKey":'val',
        "childrenKey":'children',
        "attributes": [
          {
            "name": "class",
            "value": [
           
            ]
          },
          {
            "name": "style",
            "value": {
              "background-color": "#fff",
            }
          },
          {
            "name": "name",
            "value": "chk"
          }
        ],
        "callback":"test",
      },
      {
        "type": "checkbox",
        "label":'是否参加',
        "value":false,
        "name":'attend',
        "attributes": [
          {
            "name": "class",
            "value": [
           
            ]
          },
          {
            "name": "style",
            "value": {
              "background-color": "#fff",
            }
          },
          {
            "name": "name",
            "value": "chk"
          }
        ],
        "callback":"test",
      }
    ]
  }


this.reSetJs=[
  {"name":'love',show:true}
]