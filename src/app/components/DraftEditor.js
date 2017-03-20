import React, { PropTypes } from 'react';
import { Editor, createEditorState } from 'medium-draft';
import 'medium-draft/lib/index.css';
import { convertToRaw } from 'draft-js';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.object,
};

class DraftEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(props.defaultValue),
    };

    this.onChange = (editorState) => {
      const content = editorState.getCurrentContent();
      const excerpt = content.getPlainText();
      const rawContent = convertToRaw(content);

      this.setState({ editorState }, () => {
        props.onChange(rawContent, excerpt);
      });
    };
  }

  focus() {
    this.editor.focus();
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        onChange={this.onChange}
        sideButtons={[]}
        placeholder={''}
        ref={(editor) => { this.editor = editor; }}
      />
    );
  }
}

DraftEditor.propTypes = propTypes;

export default DraftEditor;
