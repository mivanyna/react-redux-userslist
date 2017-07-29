import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import UserForm from './UserForm';

class User extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      isEditing: false,
      user: Object.assign({}, this.props.user)
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.cancel = this.cancel.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  
  cancel() {
    this.toggleEdit();
    this.setState({user: Object.assign({}, this.props.user)})
  }
  
  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user});
  }
  
  saveUser(event) {
    event.preventDefault();
    this.props.actions.updateUser(this.state.user);
  }
  
  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }
  
  deleteUser() {
    this.props.actions.deleteUser(this.state.user);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.user.id != nextProps.user.id) {
      this.setState({user: nextProps.user,  isEditing: false});
    }
  }
  
  render() {
    
    if (this.state.isEditing) {
      return (
        <div className="col-xs-8 col-xs-offset-2">
          <h1>Edit user {this.state.user.fullName}</h1>
          <UserForm
             user={this.state.user}
             onSave={this.saveUser} 
             onCancel={this.cancel}
             onChange={this.updateUserState} /> 
        </div>
      )
    }
    
     return (
          <div className="col-xs-8 col-xs-offset-2"> 
            <h2>{this.props.user.fullName}</h2>
            <p>Description: {this.props.user.description}</p>
            <p>Tags: {this.props.user.tags}</p>
            <p>Contact: {this.props.user.contacts}</p>
            <div className="form-input-group">
              <button onClick={this.toggleEdit} className="btn btn-default">Edit</button>
              <button onClick={this.deleteUser} className="btn btn-warning">Delete</button>
            </div>
          </div>
       )
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
}


function mapStateToProps(state, ownProps) {
  let user = {
    fullName: '',
    description: '',
    tags: '',
    contacts: ''
  };
  const userId = ownProps.params.id;
  const users = state.user.users;
  if (userId && users && users.length){
    user = Object.assign({}, users.find(user => user.id == userId))
  }
  return {
    user: user
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);