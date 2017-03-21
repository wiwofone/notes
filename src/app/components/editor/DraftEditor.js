import React, { PropTypes } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.object,
};

class DraftEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: props.defaultValue ?
        EditorState.createWithContent(convertFromRaw(props.defaultValue))
        :
        EditorState.createEmpty(),
    };
  }

  onChange = (editorState) => {
    const newContent = editorState.getCurrentContent();
    const oldContent = this.state.editorState.getCurrentContent();
    const excerpt = newContent.getPlainText();
    const rawContent = convertToRaw(newContent);

    this.setState({
      editorState,
    }, () => {
      if (newContent !== oldContent) {
        this.props.onChange(rawContent, excerpt);
      }
    });
  };

  focus() {
    this.editor.focus();
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        onChange={this.onChange}
        ref={(editor) => { this.editor = editor; }}
      />
    );
  }
}

DraftEditor.propTypes = propTypes;

export default DraftEditor;
