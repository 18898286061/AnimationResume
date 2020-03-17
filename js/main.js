/*把code写到#code和style标签里*/
function writeCode(prefix, code, fn){
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
      n += 1
      domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
      styleTag.innerHTML = prefix +  code.substring(0, n)
      domCode.scrollTop = domCode.scrollHeight
      if (n >= code.length) {
        window.clearInterval(id)
        fn && fn.call()
      }
    }, 10)
  }

function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 10)
}

var result1 = `/* 
* 你好，我是陈开伟
* 只用文字作做我介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/
*{
 transition: all 1s;
}
html{
 background: #eee;
}
#code{
 border: 1px solid #aaa;
 padding: 16px;
}
/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }
/* 加一个呼吸效果 */
#code{
 animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
 width: 50%; left: 0; position: fixed; 
 height: 100%;
}
#paper > .content {
display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`

var result2 = `

/* 
* 接下来把 Markdown 变成HTML  - marked.js 
* 并且把有的文字高亮
*/

.height-light {
  color: green;
  background: yellow;
  border-radius: 4px;
  font-weight: 700;
}

/* 接下来给HTML加样式 */

`
var md = `
## 个人简介
* 姓名：陈开伟
* 邮箱：1035759181@qq.com
* 工作经验：应届生
* 出生日期：1997 年 2 月
* 联系方式：18898286061
* 求职意向：Web前端开发
* Github: https://github.com/18898286061

## 专业技能
HTML5 CSS3 & JavaScript
  * 能够使用原生JavaScript独立制作网页
  * 掌握 HTML 语义化标签 如 <span class="height-light">canvas</span>、nav 以及 WebStorage API等
  * 掌握 CSS3 动画、Flex布局、媒体查询等响应式设计常用技术


React
  * 有 React 的开发经历，理解JSX、组件、props、state
  * 使用过 React 全家桶（Ant、React-Redux）开发

移动端开发
  * 会使用REM、vw / vh、媒体查询的技术制作适配手机设备的页面

Nodejs & MongoDB
  * 有过使用 Expess 框架开发招聘WebApp的后端部分
  * 了解MongoDB，使用 MongDB 数据库作为 招聘WebApp 的数据存储

Webpack
  * 使用过 Webpack 打包项目的经验

## 项目经验
- 简历生成器
  * 关键词：JavaScript、CSS3、Markdown
  * 项目描述：该项目实现了Markdown简历的制作过程。原生JS编写、 CSS3实现过渡、动画、阴影和 Flex 布局等
  * 源码链接：https://github.com/18898286061/AnimationResume
  * 预览链接：https://18898286061.github.io/AnimationResume/

- 涂鸦画板


## 教育经历
* 毕业院校：海南热带海洋学院
* 就读专业：软件工程
* 学历：本科
* 相关课程：PHP、JSP、计算机网络、数据库概论等

## 实习经历
* 拓尔思信息技术股份有限公司
* 实习时间:2018.11-2019.01
* 工作内容:负责公司产品前端部分的维护与开发
`

let result3 = `
/*
 * 这就是我的会动的简历，
 * 
 * 谢谢你的观看！ ^_^ ~
 */
`
  
function createPaper(fn){
  var paper = document.createElement('div') 
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}

function createAvatar() {
  var avatar = document.createElement('div')
  avatar.id = 'avatar'
  document.getElementsByClassName('html markdown-body')[0].appendChild(avatar)
}

writeCode('', result1, ()=>{ // writeCss call the function
  createPaper(() => {
    writeMarkdown(md, ()=> {
      writeCode(result1, result2, ()=>{
        convertMarkdownToHtml(()=>{
          writeCode(result1 + result2, result3, ()=> {
            console.log('完成')
            createAvatar()
          })
        })
      })
    })
  })
})