
Cypress.Commands.add('login', ({ username, password }) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/login',
        body: {
          
            username,
            password,
          
        }
      })
      .then(({ body }) => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
      })
  })


  Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: { title, author, url, likes },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
      }
    })
  
    cy.visit('http://localhost:3000')
  })