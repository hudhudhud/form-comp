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
        "label":'兴趣爱好',
        "value":[0,1],
        "name":'love',
        "options":[
          {value:0,'label':'健身'},
          {value:1,'label':'舞蹈'},
          {value:2,'label':'游泳'},
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