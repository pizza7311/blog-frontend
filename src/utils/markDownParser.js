import {unified} from 'unified'
import toHTML from 'remark-rehype'
import parser from 'remark-parse'
import stringify from 'rehype-stringify'
import gfm from 'remark-gfm'
import prism from 'rehype-prism'
import raw from 'rehype-raw'

const parse=(content)=>{
    return new Promise((resolve,reject)=>{
        unified().use(toHTML,{allowDangerousHtml:true}).use(parser).use(stringify).use(gfm).use(prism).use(raw)
        .process(content,(err,res)=>{
            if(err){
                console.log(err)
                reject(err)
                return
            } 
            resolve(res)
        })
    })
}

export default parse