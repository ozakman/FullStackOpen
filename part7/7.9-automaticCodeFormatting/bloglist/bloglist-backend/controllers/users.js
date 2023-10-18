const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  /*
    Funktion populate kutsu siis ketjutetaan kyselyä vastaavan metodikutsun
    (tässä tapauksessa find_ perään). Populaten parametri määrittelee, että
    user-dokumenttien blogs-kentässä olevat blog-olioihin viittaavat id:t
    korvataan niitä vastaavilla dokumenteilla.
  */
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })

  //Populaten yhteydessä on myös mahdollista rajata mitä kenttiä sisällytettävistä
  //dokumenteista otetaan mukaan. Rajaus tapahtuu Mongon syntaksilla:
  //const users = await User.find({}).populate('blogs', { content: 4, date: 4 })

  response.json(users.map((u) => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.password.length < 3) {
      return response
        .status(400)
        .json({
          error:
            'User validation failed: username: Path password is shorter than the minimum allowed length (3)',
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    console.log('passwordHash is', passwordHash)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
