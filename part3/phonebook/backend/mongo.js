const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@full-stack-open-phonebo.n1mle.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=full-stack-open-phonebook`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number
})

if (name && number) {
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (name && !number) {
  console.log('Number is missing')
  process.exit(1)
}

if (!name && number) {
  console.log('Name is missing')
  process.exit(1)
}

if (!name && !number) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name}-${person.number}`)
    })
    mongoose.connection.close()
  })
}

