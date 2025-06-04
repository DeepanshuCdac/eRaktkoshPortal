import React from 'react';
import { Checkbox, Alert } from 'antd';
import PropTypes from 'prop-types';
import { checkboxContents } from './CheckboxContent';

const ConsentCheckboxes = ({ 
  checkboxes, 
  onChange, 
  showAll,
  showValidationError 
}) => {
  if (!showAll) return null;

  return (
    <div className="widget_ABHA p-3">
      
      {checkboxContents.map((item) => (
        <Checkbox
          key={item.key}
          checked={checkboxes[item.key]}
          onChange={() => onChange(item.key)}
          className="consent-checkbox"
        >
          {item.text}
        </Checkbox>
      ))}
    </div>
  );
};

ConsentCheckboxes.propTypes = {
  checkboxes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired,
  showValidationError: PropTypes.bool
};

export default ConsentCheckboxes;