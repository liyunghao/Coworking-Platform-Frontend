import React, {useState, useEffect} from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';


export default function TextEditor () {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (e) => {
    setEditorState(e);
    // update db
    console.log(JSON.stringify(convertToRaw(e.getCurrentContent())));
  }
  useEffect(() => {
  }, [])

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
      />
    </div>
  )


}
      //{<div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent()))}} />}
      //<textarea
          //disabled
          //value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ///>
