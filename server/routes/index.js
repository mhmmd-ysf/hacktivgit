const route = require('express').Router()
const ControllerUser = require('../controllers/user')

route.get('/', (req, res) => {
  res.status(200).json({message: `Home~`})
})
route.get('/user', ControllerUser.profile)
route.get('/user/repos', ControllerUser.getRepos)
route.post('/user', ControllerUser.createRepo)
route.delete('/user/:owner/:repoName', ControllerUser.deleteRepo)
route.get('/user/:username/starred', ControllerUser.getStarred)
// exact repoName
// route.get('/user/:username/starred/:repoName', ControllerUser.getStarredOne)
route.get('/user/:username/starred/search', ControllerUser.getStarredOneSearch)
route.get('/*', (req, res) => {
  res.status(404).json({message: 'Not found :('})
})

module.exports = route