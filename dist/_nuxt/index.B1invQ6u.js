import{d as m,o as i,c as l,e as a,a as n,n as h,q as b,t as K,f as e,h as ot,s as Q,v as at,b as it,r as p,w as rt,u as ut,l as lt,i as g,x as f,F as J,g as ct,k as _t}from"./entry.BRvw9XEy.js";import{t as mt}from"./transform-date.C3ueD1rC.js";import{m as dt,_ as pt}from"./useRemarkable.DlDCngWm.js";import{_ as gt}from"./entry.FpdRc4YK.js";import{_ as ft}from"./Shared.C1Gbj_Ul.js";import{a as ht,_ as bt}from"./BookOpen.DV2q2l_N.js";import{b as vt,_ as xt}from"./Tags.vue.DHg4tTlL.js";const $t={class:"article-author"},Lt=["innerHTML"],kt=m({__name:"Public",props:["imgUrl","name","date","slug"],setup(s){return(o,c)=>{const _=ot,r=Q;return i(),l("div",$t,[a(_,{src:s.imgUrl,alt:s.name,width:"60",height:"60"},null,8,["src","alt"]),n("div",null,[a(r,{to:"/authors/"+s.slug},{default:h(()=>[b(K(s.name),1)]),_:1},8,["to"]),n("span",{class:"article-author-date",innerHTML:("transformDate"in o?o.transformDate:e(mt))(s.date)},null,8,Lt)])])}}}),yt=["innerHTML"],Pt=m({__name:"Index",props:["title","content"],setup(s){return(o,c)=>(i(),l("article",null,[n("h1",null,K(s.title),1),n("div",{innerHTML:("md"in o?o.md:e(dt)).render(s.content)},null,8,yt)]))}}),Tt=at(()=>gt(()=>import("./Heart.BsUv9mKk.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(s=>s.default||s)),St={class:"amei-container"},wt=m({__name:"Like",setup(s){return(o,c)=>{const _=Tt;return i(),l("div",St,[a(_)])}}}),jt=n("hr",null,null,-1),Dt=n("p",null,"Compartilhe:",-1),It={class:"navigator-posts"},Nt={class:"posts-relation"},At={class:"title-icon-flex"},Ct=n("span",null,"Posts Relacionados",-1),qt=m({__name:"index",async setup(s){var x,$,L,k,y,P,T,S;let o,c;const _=it(()=>_t().params.slug),r=p(),t=p(),v=p(),{data:R}=([o,c]=rt(()=>vt.get(_.value.toString())),o=await o,c(),o);t.value=Object.values(R).at(0);const d=`Orar e Labutar | ${(x=t.value)==null?void 0:x.attributes.title}`;return r.value=Object(($=t.value)==null?void 0:$.attributes.profile).data,v.value=Object((L=r.value)==null?void 0:L.attributes.posts).data,ut({title:`${d}`,ogType:"article",ogTitle:`${d}`,description:`${(k=t.value)==null?void 0:k.attributes.description}`,ogDescription:`${(y=t.value)==null?void 0:y.attributes.description}`,ogImage:`${(P=t.value)==null?void 0:P.attributes.imgURL}`,twitterTitle:`${d}`,twitterDescription:`${(T=t.value)==null?void 0:T.attributes.description}`,twitterImage:`${(S=t.value)==null?void 0:S.attributes.imgURL}`},{mode:"server"}),lt({script:[{defer:"true",src:"/js/amei.js"},{defer:"true",src:"/js/slides.js"}]}),(Ht,Ot)=>{var j,D,I,N,A,C,H,O,U,B,M,V,E,z,F,q;const W=kt,X=Pt,Y=wt,Z=ft,w=Q,tt=ht,et=pt,nt=xt,st=bt;return i(),l(J,null,[n("main",null,[a(W,{name:(j=e(r))==null?void 0:j.attributes.name,"img-url":(D=e(r))==null?void 0:D.attributes.imgUrl,date:(I=e(t))==null?void 0:I.attributes.updatedAt,slug:(N=e(r))==null?void 0:N.attributes.slug},null,8,["name","img-url","date","slug"]),a(X,{title:(A=e(t))==null?void 0:A.attributes.title,content:(C=e(t))==null?void 0:C.attributes.content},null,8,["title","content"]),jt,a(Y),Dt,a(Z,{slug:"posts/"+((H=e(t))==null?void 0:H.attributes.slug),description:(O=e(t))==null?void 0:O.attributes.description},null,8,["slug","description"])]),n("section",null,[n("div",It,[(B=(U=e(t))==null?void 0:U.attributes.navigatorSlug)!=null&&B.before?(i(),g(w,{key:0,href:(V=(M=e(t))==null?void 0:M.attributes.navigatorSlug)==null?void 0:V.before},{default:h(()=>[b(" ⟨ Post Anterior ")]),_:1},8,["href"])):f("",!0),(z=(E=e(t))==null?void 0:E.attributes.navigatorSlug)!=null&&z.next?(i(),g(w,{key:1,href:(q=(F=e(t))==null?void 0:F.attributes.navigatorSlug)==null?void 0:q.next},{default:h(()=>[b(" Próximo Post ⟩ ")]),_:1},8,["href"])):f("",!0)])]),n("section",Nt,[n("h2",At,[a(tt),Ct]),(i(!0),l(J,null,ct(e(v),u=>{var G;return i(),l("div",{key:u.id},[(u==null?void 0:u.id)!=((G=e(t))==null?void 0:G.id)?(i(),g(et,{key:0,title:u.attributes.title,"img-url":u.attributes.imgURL,slug:u.attributes.slug},null,8,["title","img-url","slug"])):f("",!0)])}),128))]),n("section",null,[a(nt)]),n("section",null,[a(st)])],64)}}});export{qt as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./Heart.BsUv9mKk.js","./entry.BRvw9XEy.js","./entry.FpdRc4YK.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}