import{d as f,r as g,w as v,o as l,c,g as A,e as h,a as o,t as i,f as u,F as y,h as b,_ as w}from"./entry.BJQO4zyR.js";import{u as m,a as _}from"./Tags.vue.BcZCiw2F.js";import{t as D}from"./transform-date.C3ueD1rC.js";class x{async get(t){var s,n;const{findOne:a}=m(),{data:e}=await _("profile",()=>a("profiles",{filters:{slug:{$eq:t}},populate:{posts:{fields:["title","imgURL","slug"]}}}));return{data:(s=e.value)==null?void 0:s.data,meta:(n=e.value)==null?void 0:n.meta}}async getAll(){var e,s;const{findOne:t}=m(),{data:a}=await _("profiles",()=>t("profiles",{fields:["name","imgUrl","slug","createdAt"]}));return{data:(e=a.value)==null?void 0:e.data,meta:(s=a.value)==null?void 0:s.meta}}}const U=new x,k=["href"],B=f({__name:"Preview",async setup(d){let t,a;const e=g(),{data:s}=([t,a]=v(()=>U.getAll()),t=await t,a(),t);return e.value=Object(s),(n,N)=>{const p=b;return l(!0),c(y,null,A(u(e),r=>(l(),c("div",{class:"card-author",key:r.id},[h(p,{src:r.attributes.imgUrl,alt:r.attributes.name},null,8,["src","alt"]),o("div",null,[o("h3",null,i(r.attributes.name),1),o("p",null,"Deste "+i(("transformDate"in n?n.transformDate:u(D))(r.attributes.createdAt)),1),o("a",{href:"/authors/"+r.attributes.slug},"Ver Perfil",8,k)])]))),128)}}}),F=w(B,[["__scopeId","data-v-d8b82c97"]]);export{F as _,U as u};