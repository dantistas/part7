import React from 'react'



const Users = ({users, Link}) => {

    if (users === null ){
        return (
            <div>
                <p className="title">there is no users</p>
            </div>
        )
    } else {
        return (
            <div>
                <h1 className="title">Users</h1>
                <table>
                    <thead>
                        <tr>
                            <th>name </th>
                            <th>blogs created</th>
                        </tr>
                    </thead>
                    {users.map(user => 
                        <tbody key={user.id}>
                            <tr>
                                <th><Link to={`users/${user.id}`}>{user.name}</Link></th>
                                <th>{user.blogs.length}</th>
                            </tr>
                        </tbody> )}  
                </table>
    
            </div>
        )
    }
    
}


export default Users