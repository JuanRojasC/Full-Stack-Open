const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://mydb:${password}@cluster0.z5c6a.mongodb.net/mydb?retryWrites=true&w=majority`

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Phone = mongoose.model('Phone', phoneSchema)


// Add and List from MongoDB Atlas (3.12)
const name = process.argv[3] || null
const number = process.argv[4] || null

if(name && number){
    const newPhone = new Phone({
        name: name,
        number: number
    })
    newPhone.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}else{
    Phone.find({}).then(result => {
        result.forEach(p => console.log(`${p.name} ${p.number}`))
        mongoose.connection.close()
    })
}

// OWN MODULE (3.13)
module.exports = mongoose.model('Phone', phoneSchema)