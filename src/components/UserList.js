import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const UserList = ({users}) => {
  return (
    <ul className="list-group">
      {users.map(
        user => 
          <li className="list-group-item" key={user.id}>
            <Link to={'/users/' + user.id}>
                {user.fullName}
            </Link>
            
            <p>{user.description}</p>
          </li>
      )}
    </ul>
  )
}

UserList.propTypes = {  
  users: PropTypes.array.isRequired
};

export default UserList;