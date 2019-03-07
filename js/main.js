// 把 code 写到 #code 和 style 标签里
function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n  = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if(n >= code.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    }, 0)
}

function writeMarkdown(markdown,fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if(n >= markdown.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    }, 0)
}


var result = `
/*
    您好， 我是开开
    我将以动画的形式来介绍我自己
    只用文字介绍太单调了
    我就用代码来介绍吧
    首先准备一些样式
*/

* {
    transition: all 1s;
}

html {
    background: rgb(222, 222, 222);
    font-size: 16px;
}

#code {
    border: 1px solid red;
    padding: 16px;
}

/* 我需要一点代码高亮 */

.token.selector {
    color: #690;
}

.token.property {
    color: #905;
}

.token.function {
    color: #DD4A68;
}

/* 加点3D效果 */
#code {
    transform: rotate(360deg);
}

/* 我现在开始介绍一下我自己叭 ~ */

/* 现在， 我需要一张白纸 */

#code {
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}

#paper {
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

#paper > .content {
    background: #fff;
    height: 100%;
    width: 100%;
}


`

var result2 = `
#paper { }


/* 接下来把 Markdown 变成HTML  - marked.js */

/* 接下来给HTML加样式 */

/* 感谢观看 ~ */
`
var  md = `
# 自我介绍

我叫开开

2019毕业

97er

自学前端一年

应聘前端开发岗

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍
`

writeCode('', result, ()=>{ //call the function
    createPaper(() => {
        // console.log('Paper产生了哦~')
        writeCode(result, result2, () => {
            writeMarkdown(md)
        })
    })
})



function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}