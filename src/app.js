const path=require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const port=process.env.PORT || 3000

const app = express()
const PublicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.use(express.static(PublicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index',{
        title: 'weather app',
        name:'priyanka'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me!',
        name:'Priyanka parihar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page!',
        helptext: 'This is some helpful text',
        title: 'Help!',
        name:'Priyanka'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
           return res.send({ error })
        }

        forecast(lattitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forcast: forcastData,
                location,
                address:req.query.address
            })
        })
    })
    //console.log(req.query)
    //res.send([{
    //    forcast:'It is sunny',
    //    location: 'India',
    //    address:req.query.address
    // }])
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Priyanka',
        errorMessage:'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Priyanka',
        errorMessage: 'page not found'
    })
})

app.listen(port, ()=> {
    console.log('server is up on port 3000.'+port)
})