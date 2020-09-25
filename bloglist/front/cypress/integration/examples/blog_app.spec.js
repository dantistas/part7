describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Test user',
        username: 'test',
        password: 'test'
      }
      const user2 = {
        name: 'Test user2',
        username: 'test2',
        password: 'test2'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.request('POST', 'http://localhost:3001/api/users/', user2)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.get('#login-form').contains('login')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#login-button').click()
        
            cy.contains('Logged in as Test user')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            
            cy.get('.error').should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
      })

     describe.only('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#login-button').click()
        })
        it('A blog can be created', function() {
          cy.get('#reveal-blog-form').click()
          cy.get('#title').type('test title')
          cy.get('#author').type('test author')
          cy.get('#url').type('test url')
          cy.get('#create-blog-button').click()
          cy.get('#blog').contains('test title')

      })
      it('user can like a blog', function(){
          cy.get('#reveal-blog-form').click()
          cy.get('#title').type('test title')
          cy.get('#author').type('test author')
          cy.get('#url').type('test url')
          cy.get('#create-blog-button').click()
          cy.get('#blog').contains('test title')
          cy.get('#view-button').click()
          cy.get('#like-button').click()
          cy.get('#likes-div').contains('1')
      })
      it('user can delete a blog', function(){
          cy.get('#reveal-blog-form').click()
          cy.get('#title').type('test title')
          cy.get('#author').type('test author')
          cy.get('#url').type('test url')
          cy.get('#create-blog-button').click()
          cy.get('#blog').contains('test title')
          cy.get('#view-button').click()
          cy.get('#delete-button').click()
          cy.get('#notification').contains('a blog: test title by: test author was deleted!')
          
    })
      it('user cant delete other users blog posts', function(){
          cy.get('#reveal-blog-form').click()
          cy.get('#title').type('test title')
          cy.get('#author').type('test author')
          cy.get('#url').type('test url')
          cy.get('#create-blog-button').click()
          cy.get('#blog').contains('test title')
          cy.get('#logout-button').click()
          cy.get('#username').type('test2')
          cy.get('#password').type('test2')
          cy.get('#login-button').click() 
          cy.get('#view-button').click()
          cy.get('#delete-button').click()
          cy.get('#error-notification').contains('a blog: test title by: test author was NOT deleted! because you are not creator')
      })
 
        it('sorted by like number', function(){
          cy.login({ username: 'test', password: 'test' }) 
          cy.createBlog({ title: 'test title1', author: 'test author1', url: 'testurl', likes: 1 })
          cy.createBlog({ title: 'test title2', author: 'test author2', url: 'testurl', likes: 2 })
          cy.createBlog({ title: 'test title3', author: 'test author3', url: 'testurl', likes: 3 })
          cy.get('#all-blogs').then(()=>{
            cy.get('.title-class:first').contains('test title3')
          })

          
        })

  })


}) 