import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/userActions';
import UserList from './UserList';
import { Link } from 'react-router';

class Users extends React.Component {
  render() {
    return (
      <div className="col-xs-12">
        <h3>Users</h3>
        <p><Link to={'/users/new'} className="btn btn-primary">
          + User
        </Link></p> 
        <div className="col-xs-4">
          <UserList users={this.props.users} />
        </div>
        <div className="col-xs-8">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Users.propTypes ={
  
}


function mapStateToProps(state, ownProps) {
  return {
    users: state.user.users
  }
}

export default connect(mapStateToProps)(Users);