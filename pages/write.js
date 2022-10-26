import dynamic from 'next/dynamic';

const Write=()=>{
    const Editor=dynamic(import('../src/components/Editor/Editor'),{ssr:false})
    return(
        <Editor></Editor>
    )
}

export default Write
