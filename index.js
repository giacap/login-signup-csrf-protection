const express = require('express')
const app = express()
app.set('view engine', 'hbs');
const PORT = 5000
const bodyParser = require('body-parser')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var csrfProtection = csrf({ cookie: true })


const users = []






app.get('/signup', csrfProtection, (req, res)=> {
    res.render('signup', { csrfToken: req.csrfToken() })
})

app.post('/signup', csrfProtection, (req, res) => {
    const user = {username: req.body.username, password: req.body.password}

    try {
        users.push(user)
        res.send('user created')
    } catch (err) {
        res.send('error')
    }
    
})



app.get('/login', csrfProtection, (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() })
})


app.post('/login', csrfProtection, (req, res) => {
    const user = users.find( (element) => element.username === req.body.username)

    if(!user){
        res.send('incorrect username')
    } else {
        if (req.body.password === user.password){
            res.send('logged in')
        } else {
            res.send('incorrect password')
        }
    }
})



app.get('/users', (req, res) => {
    res.send(users)
})

app.listen(PORT, () => console.log('server running on port ' + PORT))