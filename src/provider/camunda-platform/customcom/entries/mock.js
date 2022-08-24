let DetTree = [
    {
        "id": "c6d7cb4deeac411cb3384b1b31278596",
        "label": "公司",
        "children": [
            {
                "id": "4f1765520d6346f9bd9c79e2479e5b12",
                "label": "市场部",
                "children": []
            },
            {
                "id": "67fc001af12a4f9b8458005d3f19934a",
                "label": "财务部",
                "children": []
            },
            {
                "id": "57197590443c44f083d42ae24ef26a2c",
                "label": "研发部",
                "children": [
                    {
                        "id": "63775228b7b041a99825f79760590b7d",
                        "label": "研发经理",
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "id": "6d35e179cd814e3299bd588ea7daed3f",
        "label": "单位名称",
        "children": [
            {
                "id": "a7d7e77e06c84325a40932163adcdaa6",
                "label": "财务部",
                "children": []
            },
            {
                "id": "5159cde220114246b045e574adceafe9",
                "label": "研发部",
                "children": []
            }
        ]
    }
]
let postList = [
    {
        "postId": "1256485574212153345",
        "postCode": "总经理",
        "postName": "laozong",
        "flag": false
    },
    {
        "postId": "1532263351567110145",
        "postCode": "devleadera",
        "postName": "岗位",
        "flag": false
    },
    {
        "postId": "1185040064792571906",
        "postCode": "devleader",
        "postName": "研发部经理",
        "flag": false
    }
]
let roleList = [
    {
        "roleId": "1169504891467464705",
        "roleName": "第三方登录角色",
        "roleKey": "third_role",
        "menuCheckStrictly": false,
        "deptCheckStrictly": false,
        "flag": false,
        "remark": "第三方登录角色"
    },
    {
        "roleId": "1538812778164600834",
        "roleName": "t1",
        "roleKey": "1001",
        "menuCheckStrictly": false,
        "deptCheckStrictly": false,
        "flag": false,
        "remark": "1"
    }
]
let userList = [
    {
        "userId": "3d464b4ea0d2491aab8a7bde74c57e95",
        "nickName": "张三",
        "phonenumber": "",
        "roleIds": [
            "ee8626f80f7c2619917b6236f3a7f02b"
        ],
        "tenantIds": [],
        "sex": "2",
        "avatar": "temp/上传_1656325340213.png",
        "dept": {
            "deptId": "a7d7e77e06c84325a40932163adcdaa6",
            "parentId": "6d35e179cd814e3299bd588ea7daed3f",
            "deptName": "财务部",
            "children": []
        },
        "deptCharge": []
    },
    {
        "userId": "a75d45a015c44384a04449ee80dc3503",
        "nickName": "8ui0",
        "phonenumber": "",
        "roleIds": [
            "ee8626f80f7c2619917b6236f3a7f02b"
        ],
        "tenantIds": [],
        "sex": "0",
        "avatar": "temp/上传_1656325225897.png",
        "dept": {
            "deptId": "a7d7e77e06c84325a40932163adcdaa6",
            "parentId": "6d35e179cd814e3299bd588ea7daed3f",
            "deptName": "财务部",
            "children": []
        },
        "deptCharge": []
    },
    {
        "userId": "e9ca23d68d884d4ebb19d07889727dae",
        "nickName": "管理员",
        "email": "",
        "phonenumber": "",
        "roleIds": [
            "1501570619841810433",
            "f6817f48af4fb3af11b9e8bf182f618b"
        ],
        "tenantIds": [],
        "sex": "0",
        "avatar": "temp/上传_1656325326040.png",
        "dept": {
            "deptId": "c6d7cb4deeac411cb3384b1b31278596",
            "deptName": "北京国炬软件",
            "children": []
        },
        "deptCharge": [
            {
                "deptId": "c6d7cb4deeac411cb3384b1b31278596",
                "deptName": "北京国炬软件",
                "children": []
            }
        ]
    },
    {
        "userId": "1538812718676787202",
        "nickName": "t1",
        "phonenumber": "",
        "roleIds": [
            "f6817f48af4fb3af11b9e8bf182f618b"
        ],
        "tenantIds": [
            "1"
        ],
        "sex": "2",
        "avatar": "temp/上传_1656325160150.png",
        "dept": {
            "deptId": "5159cde220114246b045e574adceafe9",
            "parentId": "6d35e179cd814e3299bd588ea7daed3f",
            "deptName": "研发部",
            "children": []
        },
        "deptCharge": []
    },
    {
        "userId": "f0019fdebedb443c98dcb17d88222c38",
        "nickName": "小红",
        "phonenumber": "",
        "roleIds": [
            "ee8626f80f7c2619917b6236f3a7f02b"
        ],
        "tenantIds": [],
        "sex": "2",
        "avatar": "temp/上传_1656325362462.png",
        "dept": {
            "deptId": "57197590443c44f083d42ae24ef26a2c",
            "parentId": "c6d7cb4deeac411cb3384b1b31278596",
            "deptName": "研发部",
            "children": []
        },
        "deptCharge": []
    }
]
let decisionId ={
    records: [
        {
            "id": "Decision_13fhbho:2:04b68a8b-2349-11ed-ac0f-ca1d20814063",
            "name": "a",
            "key": "Decision_13fhbho",
            "category": "http://camunda.org/schema/1.0/dmn",
            "version": 2,
            "deploymentId": "04a832a7-2349-11ed-ac0f-ca1d20814063"
        },
        {
            "id": "Decision_19u1rq0:2:04b4dcda-2349-11ed-ac0f-ca1d20814063",
            "name": "b",
            "key": "Decision_19u1rq0",
            "category": "http://camunda.org/schema/1.0/dmn",
            "version": 2,
            "deploymentId": "04a832a7-2349-11ed-ac0f-ca1d20814063"
        },
        {
            "id": "Decision_400679:2:04b8112c-2349-11ed-ac0f-ca1d20814063",
            "name": "食物决策A",
            "key": "Decision_400679",
            "category": "http://camunda.org/schema/1.0/dmn",
            "version": 2,
            "deploymentId": "04a832a7-2349-11ed-ac0f-ca1d20814063"
        },
        {
            "id": "Decision_28efc0:1:d1d5d7b5-194a-11ed-8bd7-086ac52056d3",
            "name": "gdfgfdgfd",
            "key": "Decision_28efc0",
            "category": "http://camunda.org/schema/1.0/dmn",
            "version": 1,
            "deploymentId": "d1c84322-194a-11ed-8bd7-086ac52056d3"
        }
    ]
} 
export function getDeptTree(){
    return new Promise((reslove)=>{
        reslove(DetTree) 
    })
}
export function getPostList(){
    return new Promise((reslove)=>{reslove(postList) })
}
export function getRoleList(){
    return new Promise((reslove)=>{reslove(roleList) })
}
export function getUserList(){
    return new Promise((reslove)=>{reslove(userList) })
}
export function decisionList(){
    return new Promise((reslove)=>{reslove(decisionId) })
}
//   userList.forEach((element) => {
//     userOptions.push({
//       label: element.nickName,
//       value: `U${element.userId}`,
//     });
//   });
//   setUserOptions([...userOptions]);
// roleList.forEach((element) => {
//   roleOptions.push({
//     label: element.roleName,
//     value: element.roleId,
//   });
// });
// setRoleOptions([...roleOptions]);
// postList.forEach((element) => {
//     postOptions.push({
//       label: element.postName,
//       value: element.postId,
//     });
//     if (getLastPostId(props.value?.split(",")[0]) == element.postId) {
//       setVal({
//         label: element.postName,
//         value: element.postId,
//       });
//     }
//   });
//   setPostOptions([...postOptions]);