const f="modulepreload",m=function(t,r){return t[0]==="."?new URL(t,r).href:t},h={},v=function(r,o,c){let u=Promise.resolve();if(o&&o.length>0){const s=document.getElementsByTagName("link");u=Promise.all(o.map(e=>{if(e=m(e,c),e in h)return;h[e]=!0;const i=e.endsWith(".css"),d=i?'[rel="stylesheet"]':"";if(!!c)for(let l=s.length-1;l>=0;l--){const a=s[l];if(a.href===e&&(!i||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${d}`))return;const n=document.createElement("link");if(n.rel=i?"stylesheet":f,i||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),i)return new Promise((l,a)=>{n.addEventListener("load",l),n.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${e}`)))})}))}return u.then(()=>r()).catch(s=>{const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=s,window.dispatchEvent(e),!e.defaultPrevented)throw s})},E=(...t)=>v(...t).catch(r=>{const o=new Event("nuxt.preloadError");throw o.payload=r,window.dispatchEvent(o),r}),w=()=>E(()=>import("./entry.BRvw9XEy.js").then(t=>t.O),__vite__mapDeps([]),import.meta.url).then(t=>t.default);w();export{E as _};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
