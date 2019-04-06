$(document).ready(function () {
  console.log('Ready!')
  getData()
})

function getData() {
  $.ajax({
    url: 'http://localhost:3000/user',
    method: 'GET'
  })
    .done(response => {
      $('#data').append(`<h3><a href="${response.html_url}">${response.login}</a></h3>`)
      $('#profile').attr('src', `${response.avatar_url}`)
      $('#img-container').attr('href', `${response.html_url}`)
      $.ajax({
        url: `http://localhost:3000/user/mhmmd-ysf/starred`,
        method: 'GET'
      })
        .done(repos => {
          repos = repos.sort((a,b) => {return a.name - b.name ? -1 : 1})
          for (item of repos) {
            $('#repos').append(`<li><a href="${item.html_url}">${item.name}</a>, ${item.description}</li>`)
          }
        })
        .fail((jqXHR, status) => { console.log('Error: ', status) })
    })
    .fail((jqXHR, status) => { console.log('Error:', status) })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out.')
  })
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}