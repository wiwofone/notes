import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.element.isRequired,
};

const App = props => (
  <div>
    { props.children }
  </div>
);

App.propTypes = propTypes;

export default App;
