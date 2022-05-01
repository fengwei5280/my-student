const express = require('express')
const bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
const app = express()
const port = 7000
const users = [{
    name: "张三",
    password: "zhangsan",
    icon: "",
    // 1是老师，2是学生
    teacher: 1,
    tel: 18362951234,
    introduction: "大家好，我叫张三",
    sex: 1
}];
const list = {
    18362951234: [
        { date: '2022-05-01', info: "异常", normal: 1 }
    ]
}
// 获取用户列表
app.get('/api/getUsers', (req, res) => {
    console.log('查找所有用户信息成功！')
    console.log(users)
    res.send({
        code: 0,
        data: users
    })
})
// 获取用户信息
app.get('/api/getUserInfo', (req, res) => {
    console.log(req.params)
    const tel = req.params.tel
    let user = users.find(item => item.tel === tel)
    res.send({
        code: 0,
        data: user
    })
})
// 用户登陆
app.post('/api/login', jsonParser, (req, res) => {
    console.log(req.body)
    console.log('----------用户登录--------')
    const tel = req.body.user.tel
    const password = req.body.user.passworad
    let user = users.find(item => item.tel === tel)
    let msg = ''
    if (!user) {
        res.send({
            code: 12001,
            data: {
                msg: '该用户未注册，请先注册'
            }
        })
        return
    }
    if (user && user.password == password) {
        res.send({
            code: 12002,
            data: {
                msg: '密码错误，请重新输入'
            }
        })
        return
    }
    console.log('----------用户: ' + user.name + '登录成功！--------')
    res.send({
        code: 0,
        data: user
    })

})
// 添加用户
app.post('/api/addUser', jsonParser, (req, res) => {
    let user = req.body.user
    console.log('----------新增用户--------')
    console.log(user)
    const tels = users.map(item => item.tel)
    let exsit = 0
    //用户已存在
    if (tels.indexOf(user.tel) !== -1) {
        exsit = 1
    } else {
        users.push(user)
    }
    res.send({
        code: 0,
        data: {
            exsit
        }
    })
})
app.listen(port, () => {
    console.log(list)
    console.log(`proxy listening at http://localhost:${port}`)
})