const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.0tka2.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
    console.log('phonebook: ')
    Contact
        .find({})
        .then(contacts => {
            contacts.forEach(contact => {
                console.log(`${contact.name} ${contact.number}`)
            })
            mongoose.connection.close()
        })
}

if (process.argv.length === 5) {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4]
    })

    contact.save().then(result => {
        console.log(`added ${contact.name} number ${contact.number} to phonebook
        `)
        mongoose.connection.close()
    })
}


if (process.argv[3] === 'save') {
    persons.forEach(p =>  {
        p = new Contact({
            name: p.name,
            number: p.number
        })

        p.save().then(result => {
            console.log(`added ${p.name} number ${p.number} to phonebook
        `)
        mongoose.connection.close()
        })
    })
}