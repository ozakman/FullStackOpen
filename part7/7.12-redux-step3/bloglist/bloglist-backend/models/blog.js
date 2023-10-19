const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    minlength: 3,
    required: true,
  },
  likes: {
    type: Number,
  },
  comments: [
    {
      type: String,
    },
  ],
  /*
    Laajennetaan tiedostossa models/blog.js olevaa blog skeemaa siten,
    että myös blogissa on tieto sen luoneesta käyttäjästä.
    Blog viittaa nyt sen luoneeseen käyttäjään.
  */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)
