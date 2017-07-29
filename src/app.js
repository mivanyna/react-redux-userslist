import React, {PropTypes} from 'react';  
import Header from './components/Header';

class App extends React.Component {  
  render() {
    return (
      <div className="container container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {  
  children: PropTypes.object.isRequired
};

export default App;