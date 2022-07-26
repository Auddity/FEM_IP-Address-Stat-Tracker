const PORT = 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

const KEY = process.env.IPIFY_KEY

// Get On Load
app.get('/geoloc', (req, res) => {
  const onLoadOptions = {
    method: 'GET',
    url: `https://geo.ipify.org/api/v2/country,city?apiKey=${KEY}`,
    data: req
  }

  axios.request(onLoadOptions).then(response => {
    res.json(response.data)
  }).catch(err => {
    alert(err)
  })
})

// Get On Search
app.get('/geoloc/:search', (req, res) => {
  const { search } = req.params;
  const modSearch = search.slice(1, search.length);

  const searchOptions = {
    method: 'GET',
    url: `https://geo.ipify.org/api/v2/country,city?`,
    data: { apiKey: KEY, ipAddress: modSearch, domain: modSearch }
  }

  axios.request(searchOptions).then(response => {
    res.json(response.data)
  }).catch(err => {
    alert(err)
  })
})

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))