const axios = require('axios')
let ax = axios.create({
  baseURL: 'https://api.github.com'
})
axios.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
ax.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`

class ControllerUser {
  static getRepos(req, res) {
    ax.get('/user/repos')
    .then(({data}) => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({err})})
  }
  static createRepo(req, res) {
    let input = req.body
    ax.post('/user/repos', {
      name: input.name

    })
    .then(({data}) => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  static deleteRepo(req, res) {
    let input = req.params
    console.log(input)
    ax.delete(`/repos/${input.owner}/${input.repoName}`)
    .then(({data}) => {
      console.log('masuk')
      res.status(204).json(data)
    })
    .catch(err => {
      console.log('error')
      res.status(500).json(err)
    })
  }
  static getStarred(req, res) {
    let input = req.params
    console.log(input)
    ax.get(`/users/${input.username}/starred`)
    .then(({data}) => {
      console.log(data)
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  static getStarredOne(req, res) {
    let input = req.params
    ax.get(`/users/${input.username}/starred`)
    .then(({data}) => {
      console.log(data)
      data = data.filter(item => item.name === input.repoName)
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = ControllerUser