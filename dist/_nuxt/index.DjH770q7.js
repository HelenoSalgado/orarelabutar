import{_ as p,o as i,c as l,a as t,d as N,b as O,r as d,w as R,u as F,e as a,f as s,t as P,F as B,g as V,h as E,i as q,p as z,j as G,k as J}from"./entry.CdUz3Xb5.js";import{_ as K}from"./Shared.BvakCmX9.js";import{m as Q,_ as W}from"./useRemarkable.DmFE0WEM.js";import{u as X,_ as Y}from"./Preview.DuBbfnpx.js";import{_ as Z}from"./Tags.vue.Dq4nOEpE.js";import"./transform-date.C3ueD1rC.js";const tt={},et={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-user"},st=t("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"},null,-1),ot=t("circle",{cx:"12",cy:"7",r:"4"},null,-1),nt=[st,ot];function at(o,n){return i(),l("svg",et,nt)}const rt=p(tt,[["render",at]]),it={},ct={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-users"},lt=t("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"},null,-1),_t=t("circle",{cx:"9",cy:"7",r:"4"},null,-1),ut=t("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"},null,-1),dt=t("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"},null,-1),pt=[lt,_t,ut,dt];function ht(o,n){return i(),l("svg",ct,pt)}const mt=p(it,[["render",ht]]),_=o=>(z("data-v-62ac1775"),o=o(),G(),o),gt={class:"biograpy"},vt={class:"biograpy-box-image"},ft=["innerHTML"],wt=_(()=>t("hr",null,null,-1)),xt=_(()=>t("p",null,"Compartilhe:",-1)),$t={class:"posts-relation"},bt={class:"title-icon-flex"},kt=_(()=>t("span",null,"Deste Autor",-1)),yt={class:"title-icon-flex"},It=_(()=>t("span",null,"Autores",-1)),Mt={class:"container-authors"},St=N({__name:"index",async setup(o){var v,f,w,x,$,b;let n,h;const m=O(()=>J().params.slug),e=d(),g=d(),r=d(""),{data:U}=([n,h]=R(()=>X.get(m.value.toString())),n=await n,h(),n);e.value=Object(U).at(0),g.value=Object((v=e.value)==null?void 0:v.attributes.posts).data;const u=`Orar e Labutar | ${(f=e.value)==null?void 0:f.attributes.name}`;return r.value=(x=(w=e.value)==null?void 0:w.attributes.biograpy)==null?void 0:x.substring(0,270).concat("..."),F({title:u,ogTitle:`${u}`,description:r,ogDescription:`${r.value}`,ogImage:`${($=e.value)==null?void 0:$.attributes.imgUrl}`,twitterTitle:`${u}`,twitterDescription:`${r.value}`,twitterImage:`${(b=e.value)==null?void 0:b.attributes.imgUrl}`},{mode:"server"}),(k,Bt)=>{var y,I,M,S;const j=E,A=K,C=rt,L=W,T=mt,D=Y,H=Z;return i(),l(B,null,[t("main",null,[t("div",gt,[t("article",null,[t("div",vt,[a(j,{src:(y=s(e))==null?void 0:y.attributes.imgUrl,alt:(I=s(e))==null?void 0:I.attributes.name,width:"800px"},null,8,["src","alt"])]),t("h1",null,P((M=s(e))==null?void 0:M.attributes.name),1),t("div",{innerHTML:("md"in k?k.md:s(Q)).render((S=s(e))==null?void 0:S.attributes.biograpy)},null,8,ft)]),wt,xt,a(A,{slug:"author/"+s(m),description:s(r)},null,8,["slug","description"])])]),t("section",$t,[t("h2",bt,[a(C),kt]),t("div",null,[(i(!0),l(B,null,V(s(g),c=>(i(),q(L,{key:c.id,title:c.attributes.title,"img-url":c.attributes.imgURL,slug:c.attributes.slug},null,8,["title","img-url","slug"]))),128))])]),t("section",null,[t("h1",yt,[a(T),It]),t("div",Mt,[a(D)])]),t("section",null,[a(H)])],64)}}}),Dt=p(St,[["__scopeId","data-v-62ac1775"]]);export{Dt as default};