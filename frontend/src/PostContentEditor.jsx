/* 
 * Simple text editor that can generate Markdown syntax for Posts.
 * Interfaces with backend to upload & add images to Posts.
 */
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class MyEditor extends React.Component {
  static uploadImage(img) {
    const formdata = new FormData();
    formdata.append("img_file", img);
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    return fetch("http://localhost:8000/api/images/add", requestOptions)
      .then(response => response.json())
      .then(response => ({ data: { link: response.img_file } }))
  }

  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

  getMarkdown() {
    const { editorState } = this.state;
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToMarkdown(rawContentState);
    return markup;
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editor"
          onEditorStateChange={this.onChange}
          toolbar={{
            options: ['inline', 'blockType', 'list', 'link', 'emoji', 'image'],
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              uploadCallback: img => this.uploadImage(img),
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            },
          }}
        />
        <div className="editor" />
      </div>

    );
  }
}

export default MyEditor;