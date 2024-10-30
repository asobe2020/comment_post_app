const express = require('express')
const app = express()
const path = require('path')

const {v4 : uuid} = require('uuid')

const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuid() ,
        username: 'ito',
        comment: 'ya'
    },    {
        id: uuid() ,
        username: 'atushi',
        comment: 'ha????????????????'
    },    {
        id:uuid() ,
        username: 'mashui',
        comment: 'YAHA'
    },    {
        id: uuid() ,
        username: 'ashugi',
        comment: 'whats up'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new', { comments })
})

app.post('/comments', (req, res) => {
    const {comment, username} = req.body
    comments.push({ comment, username, id: uuid() })
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const newCommentText = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText

    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    comments = comments.filter(c => c.id !== id)

    res.redirect('/comments')
})

app.get('/taco', (req, res) => {
    res.send('GET i like tako /')
})

app.post('/taco', (req, res) => {
    const {meat, qty} = req.body
    res.send(`POST ${meat}, ${qty}`)
})

app.listen('3000', () => {
    console.log('post 3000 listen')
})