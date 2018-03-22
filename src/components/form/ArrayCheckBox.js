import React, { Component } from 'react';
import _find from 'lodash/find'
import _without from 'lodash/without'

export default class ArrayCheckbox extends Component {


  onChange(event) {
    const { input, itemValue } = this.props;

    var oldValues = input.value || [];

    var newValues = _without(oldValues, itemValue); // remove value

    if (event.target.checked) { // was checked
      newValues = oldValues.concat(itemValue);
    }


    input.onChange(newValues);
  }


  render() {
    const { input, itemValue} = this.props;
    return (
      <label>
      <input
        type="checkbox"
        checked={input.value.indexOf(itemValue) >= 0}
        onChange={this.onChange.bind(this)}
      />
      {itemValue}
      </label>
    );

  }
}
