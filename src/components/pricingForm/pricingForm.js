import React, { Component } from 'react';
import camelCase from 'lodash/camelCase';

import Input from '../input';

class PricingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="pricing-form">
        <form>
          {
            [
              { name: 'Public Price', inputFormat: /^\d{1,6}$/ },
              { name: 'Group Price', inputFormat: /^\d{1,6}$/ },
              { name: 'Bonus', inputFormat: /^(([0-9]|[1-9][0-9])(\.\d{0,2})?|100)$/ },
              { name: 'Discount', inputFormat: /^([0-9]|[1-9][0-9])(\.\d{0,2})?$/ },
            ].map((field, idx) => (
              <Input
                type="text"
                label={field.name}
                placeholder={field.name}
                inputFormat={field.inputFormat}
                value={this.props[camelCase(field.name)]}
                onChange={this.props[`update${field.name.replace(/\s/g, '')}`]}
                isDark={false}
                key={`input_${idx + 1}`}
              />
            ))
          }
        </form>
      </div>
    );
  }
}

export default PricingForm;
