var r=class{constructor(t,e){this.target=t,this.url=e,this.dom,this.fetchDom()}fetchDom(){fetch(this.url).then(t=>t.text()).then(t=>this.dom=new DOMParser().parseFromString(t,"text/html").querySelector("body")).then(()=>this.refreshDom())}walkDom(t,e){for(e(t),t=t.firstElementChild;t;)this.walkDom(t,e),t=t.nextElementSibling}rebuildDom(t){let e=t.dataset.reactive;if(e){let i=document.querySelector(this.target).querySelector(`[data-reactive=${e}]`);i.outerHTML=t.outerHTML}}refreshDom(){this.walkDom(this.dom,t=>this.rebuildDom(t))}};var m=r;export{m as default};