import React from 'react'



const Users = ({users}) => {

    if (users === null ){
        return (
            <div>
                <p>there is no users</p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Users</h1>
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
                                <th>{user.name}</th>
                                <th>{user.blogs.length}</th>
                            </tr>
                        </tbody> )}  
                </table>
    
            </div>
        )
    }
    
}


export default Users