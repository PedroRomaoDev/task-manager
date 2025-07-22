import PropTypes from "prop-types";

const InputLabel = (props) => {
  return (
    <label className="text-sm font-semibold text-brand-dark-blue" {...props}>
      {props.children}
    </label>
  );
};

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
  // node: qualquer coisa que pode ser renderizada, como texto, número, elemento React, etc.
  // element: um elemento React específico, como <div />, <span />, etc.
};

export default InputLabel;
