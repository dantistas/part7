import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from "react-router-dom"
import {useField} from './hooks/index'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create-new">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
  )
}

const Anecdote = ({anecdoteById}) => {
  const id = useParams().id
  const anecdote = anecdoteById(id)
  return(
    <div>
      <h1>{anecdote.content} by {anecdote.author}</h1>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

let timeOutId 

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const history = useHistory()



  const handleSubmit = (e) => {
    e.preventDefault()
    history.push('/')
    props.addNew({
      content: content.value ,
      author: author.value ,
      info: info.value ,
      votes: 0
    })
    if(timeOutId){
      clearTimeout(timeOutId)
    }
    props.setNotification(`an anecdote ${content.value} by ${author.value} was succesfully added! `)
    timeOutId = setTimeout(() => {
      props.setNotification(null)
    }, 10000);
  }
  
  const clearInputFields = () => {
    content.reset();
    author.reset();
    info.reset();
  }

  
  
  const noResetValue = (object) => {
    const {reset, ...newObject} = object
    return {
      ...newObject
  }
  }

  

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...noResetValue(content)} />
        </div>
        <div>
          author
          <input {...noResetValue(author)} />
        </div>
        <div>
          url for more info
          <input {...noResetValue(info)} />
        </div>
        <button>create</button>
        <button type="reset" value="reset" onClick={clearInputFields}>reset</button>
      </form>
    </div>
  )

}

const Notification = ({notification}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
 if(notification === null ){
   return null
 } else {
   return (
     <div style={style}>{notification}</div>
   )
 }

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }



  return (
    <Router>
          <Notification notification={notification} />
          <h1>Software anecdotes</h1>
          <Menu />
      <Switch>
        <Route path="/create-new">
          <CreateNew addNew={addNew} setNotification={setNotification}/>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} anecdoteById={anecdoteById}/>
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer></Footer>
  </Router>
  )
}

export default App;
