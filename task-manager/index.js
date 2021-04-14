import express from 'express';

import userRouter from './db/routers/user.js'
import taskRouter from './db/routers/task.js'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcryptjs'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword =  await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)
// }

// myFunction()

const myFunction = async () => {
    const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse')
    console.log(token)
}