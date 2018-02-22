import React, { Component } from 'react';

import PricingForm from '../pricingForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <PricingForm />
      </div>
    );
  }
}

export default App;
