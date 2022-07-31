const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')
const Users = require('./models/users')

const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))


const dbURL = 'mongodb+srv://anil:123321@cluster0.jyitj.mongodb.net/deneme?retryWrites=true&w=majority'
mongoose.connect(dbURL)
.then((result) => console.log('bağlantı kuruldu...'))
.catch((err) => console.log(err))

// app.get('/add',(req,res) =>{
//   const blog = new Blog({
//     title : 'yeni yazı2',
//     short : 'kısa açıklama',
//     long  : 'uzun açıklama'
//   })
//   blog.save()
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => console.log('hata'))
// })

// app.get('/all',(req,res) =>{
//   Blog.find()
//   .then((result) =>{
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log('olamaz')
//   })
// })

// app.get('/single',(req,res) =>{
//   Blog.findById('62e3471a44ca122f3dc9f973')
//   .then((result) =>{
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log('olamaz')
//   })
// })



app.listen(process.env.PORT ||4000, (() =>{
  console.log('server çalıştı')
}))

app.get('/',(req,res) =>{
  Blog.find()
  .then((result) =>{
    res.json({blogs: result})
  })
  .catch(() => console.log('hata aldın'))
})

app.get('/users',(req,res) =>{
  Users.find()
  .then((result) =>{
    res.json({users: result})
  })
  .catch(() => console.log('hata aldın'))
})

app.get('/tumVeri',(req,res) =>{
  Blog.find().sort({createdAt: 1})
  .then((result) =>{
    res.send(result)
  })
  .catch(() => console.log('hata aldın'))
})

app.get('/about',(req,res) =>{
  res.render('about')
})

app.get('/about-us',(req,res) =>{
  res.redirect('about')
})

app.get('/login',(req,res) =>{
  res.render('login')
})

app.get('/blog/:id',(req,res) =>{
  const id = req.params.id
  console.log(id)

  // Blog.findById(id)
  // .then((result) =>{
  //   res.render('blog',{blog: result})
  // })
  // .catch(() => {console.log('hata alındı')})
})

app.get('/admin',(req,res) =>{
  Blog.find().sort({createdAt: 1})
  .then(() =>{
    res.render('admin')
  })
  .catch(() => console.log('hata aldın'))
})

app.get('/admin/add',(req,res) =>{
  res.render('add')
})

app.post('/admin/add',(req,res) =>{
  const blog = new Blog(req.body)

  blog.save()
  .then((result) =>{
    res.redirect('/admin')
    console.log(req.body)
  })
  .catch(() => console.log('hatalar zinciri'))
})

app.post('/admin/ekle',(req,res) =>{
  const user = new Users(req.body)

  user.save()
  .then((result) =>{
    res.redirect('/users')
    console.log(req.body)
  })
  .catch(() => console.log('hatalar zinciri'))
})



app.use((req,res) =>{
  res.status(404).render('404')
})