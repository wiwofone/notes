import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Color from 'color';
import { palette } from '../../theme';

const propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  color: PropTypes.string,
  invert: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    fontSize: '14px',
    lineHeight: '12px',
    height: '30px',
    border: '0',
    borderRadius: '4px',
    outline: 'none',
    cursor: 'hand',
    padding: '0 15px',
    fontFamily: 'PT Sans',
    margin: '0 5px',
  },
});

const Button = ({ onPress, disabled, title, color = palette.primary, invert }) => {
  const customStyles = StyleSheet.create({
    button: {
      color: invert ? color : '#fff',
      background: invert ? 'transparent' : color,

      ':disabled': {
        opacity: '0.35',
      },

      ':hover': {
        background: new Color(invert ? '#fff' : color).darken(0.1).rgb().string(),
      },

      ':active': {
        background: new Color(invert ? '#fff' : color).darken(0.2).rgb().string(),
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
