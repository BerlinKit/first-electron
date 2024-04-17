const {contextBridge,ipcRenderer}= require('electron')

/**
 * @description  dom内容加载完毕后，通过内置方法NODE.js process.versions查看版本
 */
window.addEventListener('DOMContentLoaded',()=>{
  const replaceText=(selector,text)=>{
    const element=document.getElementById(selector)
    if(element)element.innerText=text
  }
  for(const dependency of ['chrome','node','electron']){
    replaceText(`${dependency}-version`,process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld('versions',{
  node:()=>process.versions.node,
  chrome:()=>process.versions.chrome,
  electron:()=>process.versions.electron,
  ping:()=>ipcRenderer.invoke('ping')
})
