import React from 'react'


const Navigation = () => {

    return (
        <section className="hero is-fullheight is-warning is-bold">
            <div className="block">
                <nav className="navbar has-shadow pb-1" role="navigation" aria-label="main navigation">
                  <div className="navbar-brand">
                    <a href="/"><img src={logo} width="150" height="35" alt={"logo"}></img></a>
                  </div>
                  <div className="navbar-menu">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link className="button is-link" to='/'>Home</Link>
                            <Link className="button is-link" to='/users'>Users</Link>
                        </div>
                    </div>    
                  </div>
                  <div className="navbar-end">
                    <div className="navbar-item">
                      <div className="buttons">
                          {user === null ? <LoginForm store={store} setUser={setUser} setNotification={setNotification} setErrorMessage={setErrorMessage}/> : 
                          [
                            <em key={user.id}>Logged in as {user.name}</em>,
                            <button className="button is-danger" key={`${user.name} + ${user.id}`} onClick={logOut}>log out</button>
                          ] 
                          }  
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
        </section>

    )
}


export default Navigation