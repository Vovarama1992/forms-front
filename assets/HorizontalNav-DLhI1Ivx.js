import{u as ne,j as e,a as O,b as Y,w as ie,d as f,r as g,f as oe,h as ae}from"./index-DmENW6B2.js";import{L as le}from"./Logo-CO_vnh_G.js";import{u as ce,a as de,b as ue,c as xe,d as he,e as pe,f as me,s as ge,g as ye,h as fe,i as je,j as be,k as ke,l as we,m as Ne,F as Ce,n as Me,o as Ee,p as Ie,q as Le,r as Fe,t as Te,v as Ke,T as N,A as U,D as H,w as Pe}from"./index-CugqLUv5.js";import{a as Ae}from"./floating-ui.dom-CV1Qg3mg.js";import{A as k,n as w,N as L,e as V,b as He,a as Re,c as Se}from"./UserProfileDropdown-CpQqkJYy.js";const Ge=({mode:n})=>{const o=ne(i=>i.mode);return e.jsx(O,{to:Y.authenticatedEntryPath,children:e.jsx(le,{imgClass:"max-h-10",mode:n||o,className:"hidden lg:block"})})},E=({path:n,children:o,isExternalLink:i,className:r,onClick:l})=>e.jsx(O,{className:ie("w-full flex items-center outline-0",r),to:n,target:i?"_blank":"",onClick:l,children:o}),R=n=>{const{className:o,active:i,asElement:r="button",...l}=n,u={className:f("font-semibold inline-flex h-9 w-max items-center justify-center rounded-lg bg-background px-4 py-2 dark:text-gray-300 dark:hover:text-gray-100 text-gray-900 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors",o,i&&"bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20")};if(r==="a"){const{path:d,isExternalLink:a,...h}=l;return e.jsx(E,{path:d,isExternalLink:a,...u,...h})}return r==="button"?e.jsx("button",{ref:l.ref,...u,...l}):e.jsx(e.Fragment,{})},S=g.createContext({getItemProps:()=>({}),activeIndex:null,setActiveIndex:()=>{},setHasFocusInside:()=>{},isOpen:!1}),ze=n=>{const{menuContent:o,triggerContent:i,dropdownLean:r}=n,[l,u]=g.useState(!1),[d,a]=g.useState(!1),[h,t]=g.useState(null),c=g.useRef([]),p=g.useRef([]),s=g.useContext(S),x=ce(),m=de(),j=ue(),C=xe(),y=j!=null,{floatingStyles:$,refs:T,context:b}=he({nodeId:m,open:l,onOpenChange:u,placement:y?"right-start":r?"bottom-start":"bottom",middleware:[Fe({mainAxis:y?0:4,alignmentAxis:y?-4:0}),Te(),Ke()],whileElementsMounted:Ae}),{isMounted:K,styles:B}=pe(b,{common:({side:M})=>({transformOrigin:{top:"bottom",bottom:"top",left:"right",right:"left"}[M]}),initial:{transform:"translateY(-5%)",opacity:0},duration:200,open:{opacity:1,transform:"translateY(0%)"},close:{opacity:0,transform:"translateY(-5%)"}}),G=me(b,{enabled:y,handleClose:ge({blockPointerEvents:!0})}),J=ye(b,{event:"mousedown",toggle:!y,ignoreMouse:y}),Q=fe(b,{role:"menu"}),W=je(b,{bubbles:!0}),X=be(b,{listRef:c,activeIndex:h,nested:y,onNavigate:t}),Z=ke(b,{listRef:p,onMatch:l?t:void 0,activeIndex:h}),{getReferenceProps:v,getFloatingProps:ee,getItemProps:te}=we([G,J,Q,W,X,Z]),I=()=>{u(!1)};g.useEffect(()=>{if(!x)return;function M(){I()}function P(A){A.nodeId!==m&&A.parentId===j&&I()}return x.events.on("click",M),x.events.on("menuopen",P),()=>{x.events.off("click",M),x.events.off("menuopen",P)}},[x,m,j]),g.useEffect(()=>{l&&x&&x.events.emit("menuopen",{parentId:j,nodeId:m})},[x,l,m,j]);const se=Ne([T.setReference,C.ref]),re={...v(s.getItemProps({...n,onFocus(){a(!1),s.setHasFocusInside(!0)}}))};return e.jsx(Ce,{children:e.jsxs(Me,{id:m,children:[i==null?void 0:i({ref:se,props:re,hasFocusInside:d,isOpen:K}),e.jsx(S.Provider,{value:{activeIndex:h,setActiveIndex:t,getItemProps:te,setHasFocusInside:a,isOpen:l},children:e.jsx(Ee,{elementsRef:c,labelsRef:p,children:K&&e.jsx(Ie,{children:e.jsx(Le,{context:b,modal:!1,initialFocus:y?-1:0,returnFocus:!y,children:e.jsx("div",{ref:T.setFloating,style:$,className:"outline-none z-30",...ee(),children:o==null?void 0:o({styles:B,handleDropdownClose:I})})})})})})]})})},F={1:{grid:"grid-cols-1",width:"w-[150px]"},2:{grid:"grid-cols-2",width:"w-[350px]"},3:{grid:"grid-cols-3",width:"w-[750px]"},4:{grid:"grid-cols-4",width:"w-[950px]"},5:{grid:"grid-cols-5",width:"w-[1150px]"}},q=({children:n,className:o,active:i,...r})=>e.jsx("div",{className:f("cursor-pointer font-semibold px-3 rounded-lg flex items-center w-full whitespace-nowrap gap-x-2 transition-colors duration-150 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800",i&&"bg-gray-100 dark:bg-gray-800",o),role:"menuitem",...r,children:n}),z=({icon:n})=>typeof n!="string"&&!n?e.jsx(e.Fragment,{}):e.jsx(e.Fragment,{children:w[n]&&e.jsx("span",{className:"text-xl",children:w[n]||e.jsx(N,{})})}),D=({path:n,isExternalLink:o,onClick:i,icon:r,title:l,description:u,active:d})=>e.jsx(E,{path:n,isExternalLink:o,className:"gap-2",onClick:i,children:e.jsxs(q,{className:"py-2 px-2 gap-3",active:d,children:[e.jsx("div",{children:e.jsx(U,{className:f("bg-white dark:bg-transparent p-2 border-2 border-gray-200 dark:border-gray-600",d?"text-primary":"heading-text"),size:40,icon:r,shape:"round"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"heading-text font-bold",children:l}),e.jsx("div",{className:"text-xs truncate",children:u})]})]})}),De=n=>{var h;const{navigationTree:o,t:i,onDropdownClose:r,columns:l=1,showColumnTitle:u=!0,routeKey:d,userAuthority:a}=n;return e.jsxs("div",{className:"flex max-w-[1400px] w-full",children:[e.jsx("div",{className:f("grid gap-y-6 gap-x-8 p-6 flex-1",(h=F[l])==null?void 0:h.grid),children:o.map(t=>t.subMenu.length>0?e.jsx(k,{userAuthority:a,authority:t.authority,children:e.jsxs("div",{className:"max-w-[250px]",children:[u&&e.jsx("div",{className:"heading-text font-bold mb-2",children:i(t.translateKey,t.title)}),t.subMenu.map(c=>{var p,s,x,m;return e.jsx(k,{userAuthority:a,authority:c.authority,children:e.jsx("div",{children:e.jsx(D,{path:c.path,isExternalLink:c.isExternalLink,icon:w[c.icon]||e.jsx(N,{}),title:i(c.translateKey,c.title),description:i(((s=(p=c.meta)==null?void 0:p.description)==null?void 0:s.translateKey)||"",((m=(x=c.meta)==null?void 0:x.description)==null?void 0:m.label)||""),active:c.key===d,onClick:r})},c.key)},c.key)})]})},t.key):null)}),o.some(t=>t.type===L)&&e.jsx("div",{className:f("ltr:border-l rtl:border-r border-gray-200 dark:border-gray-800 min-w-[280px] p-4 flex flex-col"),children:o.map(t=>{var c,p,s,x;return t.subMenu.length===0&&t.type===L?e.jsx(k,{userAuthority:a,authority:t.authority,children:e.jsx(D,{path:t.path,isExternalLink:t.isExternalLink,icon:w[t.icon]||e.jsx(N,{}),title:i(t.translateKey,t.title),description:i(((p=(c=t.meta)==null?void 0:c.description)==null?void 0:p.translateKey)||"",((x=(s=t.meta)==null?void 0:s.description)==null?void 0:x.label)||""),active:t.key===d,onClick:r},t.key)},t.key):null})})]})},_=({navigationTree:n,t:o,onDropdownClose:i,routeKey:r,userAuthority:l})=>{const u=(d,a)=>{const h=a+1;return e.jsx("div",{className:f(a===0&&"p-3"),children:d.map(t=>e.jsx(k,{userAuthority:l,authority:t.authority,children:e.jsxs("ul",{children:[t.type===L&&e.jsx(H.Item,{active:r===t.key,children:e.jsxs(E,{path:t.path,isExternalLink:t.isExternalLink,className:"gap-2 h-full",onClick:i,children:[e.jsx(z,{icon:t.icon}),e.jsx("span",{children:o(t.translateKey,t.title)})]})}),t.type===V&&e.jsx(H,{renderTitle:e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(z,{icon:t.icon}),e.jsx("span",{children:o(t.translateKey,t.title)})]}),children:t.subMenu&&t.subMenu.length>0&&u(t.subMenu,h)})]})},t.key))})};return e.jsx(e.Fragment,{children:u(n,0)})},_e=({navigationTree:n,t:o,onDropdownClose:i,columns:r,routeKey:l,userAuthority:u,routeParentKey:d})=>{var t,c,p;const[a,h]=g.useState(n.some(s=>s.key===d)?d:n[0].key);return e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"p-4",children:n.map(s=>{var x,m,j,C;return s.subMenu.length>0?e.jsx(k,{userAuthority:u,authority:s.authority,children:e.jsx("div",{className:"min-w-[250px]",children:e.jsx("div",{children:e.jsxs(q,{className:"py-2 px-2 gap-3",active:s.key===a,onClick:()=>h(s.key),children:[e.jsx("div",{children:e.jsx(U,{className:f("bg-white dark:bg-transparent p-2 border-2 border-gray-200 dark:border-gray-600",s.key===l?"text-primary":"heading-text"),size:40,icon:w[s.icon]||e.jsx(N,{}),shape:"round"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"heading-text font-bold",children:o(s.translateKey,s.title)}),e.jsx("div",{className:"text-xs truncate",children:o(((m=(x=s.meta)==null?void 0:x.description)==null?void 0:m.translateKey)||"",((C=(j=s.meta)==null?void 0:j.description)==null?void 0:C.label)||"")})]})]})},s.key)})},s.key):null})}),n.some(s=>s.key===a&&s.type===V)&&e.jsx("div",{className:"ltr:border-l rtl:border-r border-gray-200 dark:border-gray-800 p-6",children:e.jsx("div",{className:f("grid gap-x-8 flex-1",(t=F[r])==null?void 0:t.grid,(c=F[r])==null?void 0:c.width),children:(p=n.find(s=>s.key===a))==null?void 0:p.subMenu.map(s=>e.jsx(k,{userAuthority:u,authority:s.authority,children:e.jsx(E,{path:s.path,isExternalLink:s.isExternalLink,className:"gap-2 group",onClick:()=>i(),children:e.jsxs("div",{className:f("flex items-center gap-2 h-[42px] heading-text group-hover:text-primary",l===s.key&&"text-primary"),children:[e.jsx("span",{className:"text-xl",children:w[s.icon]||e.jsx(N,{})}),e.jsx("span",{children:o(s.translateKey,s.title)})]})})},s.key))})})]})},Oe=n=>{const{style:o,navigationTree:i,layoutMeta:r,...l}=n;return e.jsxs("div",{className:"rounded-2xl bg-white dark:bg-gray-900 ring-0 shadow-[0px_48px_64px_-16px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-gray-800 focus:outline-none min-w-[180px]",style:o,children:[(r==null?void 0:r.layout)==="default"&&e.jsx(_,{navigationTree:i,...l}),(r==null?void 0:r.layout)==="columns"&&e.jsx(De,{navigationTree:i,columns:r.columns,showColumnTitle:r.showColumnTitle,...l}),(r==null?void 0:r.layout)==="tabs"&&e.jsx(_e,{navigationTree:i,columns:r.columns,...l}),!r&&e.jsx(_,{navigationTree:i,...l})]})},Ye=n=>{const{routeKey:o,navigationTree:i=[],translationSetup:r,userAuthority:l}=n,{t:u}=He(!r),{activedRoute:d}=Re(i,o);return e.jsx("div",{className:"flex gap-1",children:i.map(a=>{var h,t;return e.jsx(k,{userAuthority:l,authority:a.authority,children:a.subMenu.length>0?e.jsx(ze,{dropdownLean:((t=(h=a.meta)==null?void 0:h.horizontalMenu)==null?void 0:t.layout)==="default",triggerContent:({ref:c,props:p})=>e.jsx(R,{ref:c,...p,asElement:"button",children:e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("span",{children:u(a.translateKey,a.title)}),e.jsx(Pe,{})]})}),menuContent:({styles:c,handleDropdownClose:p})=>{var s;return e.jsx(Oe,{style:c,navigationTree:a.subMenu,t:u,layoutMeta:(s=a==null?void 0:a.meta)==null?void 0:s.horizontalMenu,routeKey:o,routeParentKey:d==null?void 0:d.parentKey,userAuthority:l,onDropdownClose:p})}}):e.jsx(R,{...n,path:a.path,isExternalLink:a.isExternalLink,active:(d==null?void 0:d.key)===a.key,asElement:"a",children:e.jsx("div",{className:"flex items-center gap-1",children:e.jsx("span",{children:u(a.translateKey,a.title)})})})},a.key)})})},Je=({translationSetup:n=Y.activeNavTranslation})=>{const o=oe(r=>r.currentRouteKey),i=ae(r=>r.user.authority);return e.jsx(Ye,{navigationTree:Se,routeKey:o,userAuthority:i||[],translationSetup:n})};export{Ge as H,Je as a};
