import logo from './logo.svg';
import './App.css';

import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

import axios from 'axios';

// Step 1: Define the user plugin function
function latexPlugin() {
  const toHTMLRenderers = {
    latex(node) {
      if (node.literal.trim('\n') === 'LOADING') {
        return [
          { type: 'openTag', tagName: 'div', outerNewLine: true },
          { type: 'html', content: '<p>Carregando...</p>' },
          { type: 'closeTag', tagName: 'div', outerNewLine: true }
        ];
      }
      else {
        return [
          { type: 'openTag', tagName: 'div', outerNewLine: true },
          { type: 'html', content: '<p>Bloco de pagamento: 13423</p>' },
          { type: 'closeTag', tagName: 'div', outerNewLine: true }
        ];
      }
    },
  }

  return { toHTMLRenderers }
}


const MyComponent = () => {

  const editorRef = useRef(null);

  const [content, setContent] = useState([
    '$$latex',
    'LOADING',
    '$$'
  ].join('\n'));
  
  useEffect(()=>{

    async function fetchData() {
      const newData = await axios.get('https://raw.githubusercontent.com/nhn/tui.editor/master/plugins/chart/src/index.ts');
      editorRef.current.getInstance().setMarkdown(newData.data, false);
    }

    setTimeout(() => {
      console.log('UPDATE DATA');
      fetchData();
    }, 3000);

  },[]);
  
  return (
    <Editor
      initialValue={content}
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      plugins={[latexPlugin]}
      ref={editorRef}
    />
  )
};



function App() {
  return (
    <div>
     <MyComponent />
    </div>
  );
}

export default App;
