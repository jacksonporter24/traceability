const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use(cors());

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
const { setDefaultResultOrder } = require('dns')
var rollbar = new Rollbar({
  accessToken: 'e291979a790641bca6320863a8725949',
    // accessToken: 'a3a56c39a4754509ba04ff574d173e84',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
Rollbar.critical("Crash while processing payment");

const movies = ['Jurassic Park', 'The Truman Show', 'The Princess Bride']

app.get('/', (req, res) => {
    rollbar.info("Someone loaded up your html")
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/movies', (req, res) => {
    rollbar.info("Someone got the list of movies to load.")
    res.status(200).send(students)
})

app.post('/api/movies', (req, res) => {
   let {title} = req.body


   const index = movies.findIndex(movie => {
       return movie === title
   })

   try {
       if (index === -1 && title !== '') {
        rollbar.log("Movie added successfully", {author: "Jackson",
    type: "manual entry"})
           movies.push(title)
           res.status(200).send(movies)
       } else if (title === ''){
        rollbar.error("No name h 0.provided.");
           res.status(400).send('You must enter a name.')
       } else {
        rollbar.error("Movie already exists.")
           res.status(400).send('That movie already exists.')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/api/movies/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    movies.splice(targetIndex, 1)
    rollbar.info("Movie")
    res.status(200).send("Movie was deleted.")
})

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))


