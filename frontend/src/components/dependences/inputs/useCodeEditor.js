import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {vscodeDark} from '@uiw/codemirror-theme-vscode'
import { javascript } from '@codemirror/lang-javascript';
import {cpp} from '@codemirror/lang-cpp'
import {java} from '@codemirror/lang-java'
import {html} from '@codemirror/lang-html'
import {css} from '@codemirror/lang-css'
import {json} from '@codemirror/lang-json'
import {php} from '@codemirror/lang-php'
import {python} from '@codemirror/lang-python'
import {rust} from '@codemirror/lang-rust'
import {csharp} from '@replit/codemirror-lang-csharp'
import {sql} from '@codemirror/lang-sql'

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';

function useCodeEditor(language=null) {
    const [myLanguage, setMyLanguage] = useState('cpp')
    const [code, setCode] = useState("")

    const languagesDirected = {
        cpp: cpp({cpp}),
        javascript: javascript({javascript, typescript: true, jsx: true}),
        java: java({java}),
        html: html({html}),
        css: css({css}),
        json: json({json}),
        php: php({php}),
        python: python({python}),
        rust: rust({rust}),
        csharp: csharp({csharp}),
        sql: sql({sql})
    }
    const languages = {
        cpp: 'C++',
        javascript: 'JavaScript',
        java: 'Java',
        html: 'HTML',
        css: 'CSS',
        json: 'JSON',
        php: 'PHP',
        python: 'Python',
        rust: 'Rust',
        csharp: 'C#',
        sql: 'SQL'
    }
    const getLanguageItems = () => {
        const arrayItems = []
        for(let k in languages){
            arrayItems.push(
                <MenuItem
                key={k}
                value={k}
              >
                {languages[k]}
              </MenuItem>
            )
        }
        return arrayItems
    }

    const cambiarLanguage = event => {
        setMyLanguage(event.target.value)
    }

    const escribirCodigo = React.useCallback((value, viewUpdate) => {
        setCode(value)
      }, []);

    const getSelector = () => {
        if(language === null){
            return (
                <Select value={myLanguage} onChange={cambiarLanguage}>
            {
                getLanguageItems().map(elem => elem)
            }
        </Select>
            )
        }else{
            setMyLanguage(language)
        }
    }
    const getCodeEditor = () => (
        <div style={{padding: '.5%'}}>
        <div style={{textAlign: 'right', padding: '.5%'}}>
            {
getSelector()
}
  </div>  <CodeMirror
      value="console.log('hello world!');"
      height="200px"
      theme={vscodeDark}
      extensions={[languagesDirected[myLanguage]]}
      onChange={escribirCodigo}
    />
    </div>
    )

    return {
        getCodeEditor, code
    }
}

export default useCodeEditor