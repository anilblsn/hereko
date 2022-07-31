const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  kullaniciAdi: {
    type: String,
    require: true
  },
  sifre: {
    type: String,
    require: true
  },
},{timestamps: true})

const Users = mongoose.model('Users',usersSchema)
module.exports = Users