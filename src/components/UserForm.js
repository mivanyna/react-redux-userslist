import React, {PropTypes} from 'react';
import TextInput from './common/TextInput';

class UserForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <TextInput 
            name="fullName"
            label="Full Name"
            value={this.props.user.fullName}
            onChange={this.props.onChange} />
          <TextInput 
            name="description"
            label="Description"
            value={this.props.user.description}
            onChange={this.props.onChange} />
          <TextInput 
            name="tags"
            label="Tags"
            value={this.props.user.tags}
            onChange={this.props.onChange} />
          <TextInput 
            name="contacts"
            label="Contacts"
            value={this.props.user.contacts}
            onChange={this.props.onChange} />      
          
          <input
            type="submit"
            disabled={this.props.saving}      
            value={this.props.saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
            onClick={this.props.onSave}/>
          <input
            type="submit"
            disabled={this.props.saving}      
            value='Cancel'
            className="btn btn-default"
            onClick={this.props.onCancel}/>
        </form>
      </div>
    )    
  }
}

export default UserForm;