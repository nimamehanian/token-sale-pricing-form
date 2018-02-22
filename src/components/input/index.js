import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { isFocused: false };
    this.onChange = debounce(value => props.onChange(value), 42);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    this.onChange(value);
  }

  render() {
    const inputClasses = classnames({
      dark: this.props.isDark,
      light: !this.props.isDark,
    });

    const labelClasses = classnames({
      label: true,
      show: this.state.isFocused || !!this.props.value.length,
      highlight: this.state.isFocused,
    });

    const {
      type,
      label,
      placeholder,
      value,
      inputFormat,
    } = this.props;

    return (
      <div className="oui-input">
        <div className={labelClasses}>{label}</div>
        <input
          name={label.toLowerCase().replace(/\s/g, '_')}
          className={inputClasses}
          type={type}
          placeholder={placeholder}
          spellCheck={false}
          value={value}
          onChange={(event) => {
            if (inputFormat.test(event.target.value) || !event.target.value) {
              this.handleOnChange(event.target.value);
            }
          }}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
        />
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isDark: PropTypes.bool,
  // Also accepts inputFormat of type regex obj, but
  // PropTypes doesn't have a way of enforcing this.
};

Input.defaultProps = {
  placeholder: '',
  isDark: false,
};

export default Input;
