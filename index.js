const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

let ppl = [
    {
      id: 1,
      name: 'asd',
      number: '13783453467',
      
    },
    {
      id: 2,
      name: 'asdasgag',
      number: '12456786542345767',
      
    },
    {
      id: 3,
      name: 'qwewrheqawdaf',
      number: '1316362342354',
    },
  ]



  app.get('/info', (req, res) => {
    const nbr = ppl.length
    const date = new Date().toString().replace(/.\w*/, '')
    res.send(`<p>Listassa on ${nbr} henkilöä <p> <p>${date}<p>`)
  })

  app.get('/api/persons', (req, res) => {
    
    res.json(ppl)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = ppl.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  function random(bottom, top) {
    return Math.floor(Math.random() * (top - bottom) + bottom)
  }

  app.post('/api/persons/', (request, response)=> {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if (ppl.some(person => person.name === body.name)){
      return response.status(400).json({ 
        error: 'existing name' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: random(0,1000),
    }
  
    ppl = ppl.concat(person)
  
    response.json(ppl)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    ppl = ppl.filter(pers => pers.id !== id);

    response.status(204).end();
  });

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })