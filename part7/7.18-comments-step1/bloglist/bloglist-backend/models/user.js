const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//Määritellään käyttäjää edustava model:
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    minlength: 3
    //"passwordHash": salasanasta yksisuuntaisen funktion perusteella laskettu tunniste.
    //Salasanojahan ei ole koskaan viisasta tallentaa tietokantaan selväsanaisena!

  /*
    Päätetään tallettaa käyttäjän yhteyteen myös tieto käyttäjän luomista blogeista,
    eli käytännössä bloggien id:t. Käyttäjä sisältää nyt taulukollisen viitteitä sen
    luomiin bloggeihin.
  */
  },

  blogs: [
    {
      //Bloggien id:t on talletettu käyttäjien sisälle taulukkona mongo-id:itä.
      type: mongoose.Schema.Types.ObjectId,
      /*
        kentän tyyppi on ObjectId joka viittaa blog-tyyppisiin dokumentteihin.
        Mongo ei itsessään tiedä mitään siitä, että kyse on kentästä, joka viittaa
        nimenomaan bloggeihin, kyseessä onkin puhtaasti mongoosen syntaksi.
      */
      ref: 'Blog'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User