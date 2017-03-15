import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

const propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    background: 'transparent',
    fontSize: '12px',
    lineHeight: '12px',
    height: '30px',
    border: '1px solid',
    borderRadius: '15px',
    outline: 'none',
    cursor: 'hand',
    padding: '0 15px',
    fontFamily: 'PT Sans',
    margin: '0 5px',
  },
});

const Button = ({ onPress, disabled, title, color = 'rgb(0, 0, 0)' }) => {
  const customStyles = StyleSheet.create({
    button: {
      color,
      borderColor: color,

      ':disabled': {
        opacity: '0.35',
      },
    },
  });

  return (
    <button
      className={css(styles.button, customStyles.button)}
      onClick={onPress}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

Button.propTypes = propTypes;

export default Button;
