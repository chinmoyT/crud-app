require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const User = require('./DB/User')

app.use(cors())
app.use(express.json())

const MONGO_URI = process.env.MONGODB_URI
mongoose.connect(MONGO_URI).then(() => console.log('Connected to DB')).catch((err) => console.log('DB connection error', err))


app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/users', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

app.post('/users', async (req, res) => {
    try {
        const { name, age, dob, address } = req.body
        const user = new User({ name, age, dob, address })
        const newUser = await user.save()
        res.status(200).json(newUser)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, dob, age, address } = req.body
        const user = await User.findById(id)
        if (name) user.name = name;
        if (dob) user.dob = dob;
        if (age) user.age = age;
        if (address) user.address = address;
        await user.save()
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(200).send('Deleted successfully')
    }
    catch (err) {
        res.status(500).send(err)
    }
})

const port = 5000
app.listen(port, () => {
    console.log('Server is running at port ', port)
})