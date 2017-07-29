import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import UserForm from './UserForm';

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        fullName: '',
        description: '',
        tags: '',
        contacts: ''
      },
      saving: false
    };
    
    //this.redirect = this.redirect.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.cancel = this.cancel.bind(this);
  };
  
  cancel() {
    
  }
  
  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user});
  }
  
  saveUser(event) {
    event.preventDefault();
    this.props.actions.createUser(this.state.user);
  }
  
  render() {
    return (
      <div>
        <h3>New User</h3>
         <UserForm
             user={this.state.user}
             onSave={this.saveUser} 
             onCancel={this.cancel}
             onChange={this.updateUserState} />
      </div>
    )
  }  
}

function mapStateToProps(state, ownProps) {
  return {
    key: '1'
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);