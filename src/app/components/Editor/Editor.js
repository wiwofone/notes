import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  content: {
    border: 0,
    fontSize: '16px',
    outline: 'none',
    lineHeight: '150%',
    flex: '1',
    color: 'inherit',
    fontFamily: 'inherit',
    padding: '0',
  },
});

const propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

class Editor extends React.Component {
  onChange = () => {
    this.props.onChange(
      this.editor.value,
      this.editor.value
    );
  };

  focus() {
    this.editor.focus();
  }

  render() {
    return (
      <textarea
        className={css(styles.content)}
        defaultValue={this.props.defaultValue}
        onChange={this.onChange}
        ref={(editor) => { this.editor = editor; }}
      />
    );
  }
}

Editor.propTypes = propTypes;

export default Editor;
