const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users'); 
const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signup')
})

// POST /signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
  const name = req.fields.name
  const gender = req.fields.gender
  const bio = req.fields.bio
  const avatar = req.files.avatar.path.split(path.sep).pop()
  let password = req.fields.password
  const repassword = req.fields.repassword

  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在 1-10 个字符')
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是 m、f 或 x')
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符')
    }
    if (!req.files.avatar.name) {
      throw new Error('缺少头像')
    }
    if (password.length < 5) {
      throw new Error('密码至少 5 个字符')
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致')
    }
  } catch (e) {
    // 注册失败，异步删除上传的头像
    fs.unlink(req.files.avatar.path)
    req.flash('error', e.message)
    return res.redirect('/signup')
  }

  // 明文密码加密
  password = sha1(password)

  // 待写入数据库的用户信息
  let user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  }
  // 用户信息写入数据库
  UserModel.create(user)
    .then(function (result) {  
      // 此 user 是插入 mongodb 后的值，包含 _id
      user = result.ops[0]
      // 删除密码这种敏感信息，将用户信息存入 session
      delete user.password
      req.session.user = user
      // 写入 flash
      req.flash('success', '注册成功')
      // 跳转到首页
      res.redirect('/posts')
    })
    .catch(function (e) {
      // 注册失败，异步删除上传的头像
      fs.unlink(req.files.avatar.path)
      // 用户名被占用则跳回注册页，而不是错误页
      if (e.message.match('duplicate key')) {
        req.flash('error', '用户名已被占用')
        return res.redirect('/signup')
      }
      next(e)
    })
})

module.exports = router

/*
{ result: { ok: 1, n: 1 },
  ops:
   [ { name: 'admin',
       password: 'd033e22ae348aeb5660fc2140aec35850c4da997',
       gender: 'm',
       bio: 'admin',
       avatar: 'upload_639870c78769f283627e22794f823eec.jpg',
       _id: 5a2923738537e6398c2710f1 } 
   ],
  insertedCount: 1,
  insertedIds: [ 5a2923738537e6398c2710f1 ] 
}

Cookie:blog=s%3AjAxD2mqU4B9hTrdS3Y4hdob5vkEVmZft.vjfURE48RbIpu0KDe1vDP6OwPV0GIMq2XI%2Fwou%2BpmVM; 
myblog=s%3Al6x21U4nijd0bh8MW3WhBoiutYD6Zwtl.vZ0JSy0SXUaFG2sKTfjS99qePxe5SQGBuFkHUgjDF%2BM; 
Hm_lvt_9c975eeec1197cd1210a40e18a2b2f54=1512144034,1512457989,1512577413; 
Hm_lpvt_9c975eeec1197cd1210a40e18a2b2f54=1512645975
*/