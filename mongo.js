const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://Kayttaja:${password}@cluster0-e0baf.mongodb.net/persons?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length < 5) {

  Person.find({}).then(result => {
    result.forEach(pers => {
      console.log(pers)
    })
    mongoose.connection.close()
  })

} else {



  const pers = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  pers.save().then(response => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}
