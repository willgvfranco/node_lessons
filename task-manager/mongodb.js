import mongodb from 'mongodb';

const { MongoClient } = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')

    }

    const db = client.db(databaseName)
    console.log('Connected correctly!')


    // InsertOne = one row insert; for multiples = insertMany()
    db.collection('users').insertOne({
        name: 'Test',
        age: 28
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })

    // findOne = Query for some row; for all = find()
    db.collection('users').findOne({ name: 'Test' }, (error, data) => {
        if (error) { return console.log('Unable to find user') }
        console.log(data)
    })

})