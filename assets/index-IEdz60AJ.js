import{r,w as c,j as e,J as w}from"./index-DmENW6B2.js";import{a0 as A,a1 as S,w as b}from"./index-CugqLUv5.js";import{m as g}from"./CloseButton-DKk2w9LK.js";const p=r.createContext({}),H=p.Provider,T=p.Consumer,$=l=>{const{children:s,className:o,defaultActiveKeys:t=[],defaultExpandedKeys:a=[],defaultCollapseActiveKeys:i=[],menuItemHeight:u=48,onSelect:x,ref:C,sideCollapsed:m=!1,...n}=l,f=c("menu",o);return e.jsx("nav",{ref:C,className:f,...n,children:e.jsx(H,{value:{onSelect:x,menuItemHeight:u,sideCollapsed:m,defaultExpandedKeys:a,defaultActiveKeys:t,defaultCollapseActiveKeys:i},children:s})})},M=r.createContext(null),k=M.Provider,F=M.Consumer,N=r.createContext(!1),J=N.Provider,O=N.Consumer,y=l=>{const{eventKey:s,...o}=l;return e.jsx(T,{children:t=>e.jsx(F,{children:()=>e.jsx(O,{children:()=>e.jsx(A,{menuItemHeight:t.menuItemHeight,isActive:t.defaultActiveKeys.includes(s),eventKey:s,onSelect:t.onSelect,...o})})})})};y.displayName="MenuItem";const I=l=>{const{active:s,children:o,className:t,eventKey:a,expanded:i=!1,indent:u=!0,label:x=null,dotIndent:C,onToggle:m}=l,[n,d]=r.useState(i),{sideCollapsed:f,defaultExpandedKeys:h,defaultCollapseActiveKeys:j}=r.useContext(p),{direction:K}=w();r.useEffect(()=>{h.includes(a)&&d(!0),i!==n&&d(!0)},[i,a,h]);const E=D=>{typeof m=="function"&&m(!n,D),d(!n)},P=c("menu-collapse-item",(j&&j.includes(a)||s)&&"menu-collapse-item-active",t);return e.jsxs("div",{className:"menu-collapse",children:[e.jsxs("div",{className:P,role:"presentation",onClick:E,children:[e.jsxs("span",{className:"flex items-center gap-2",children:[C&&e.jsx(S,{className:c("text-3xl w-[24px]",!s&&"opacity-25")}),x]}),e.jsx(g.span,{className:"text-lg mt-1",initial:{transform:"rotate(0deg)"},animate:{transform:n?"rotate(-180deg)":"rotate(0deg)"},transition:{duration:.15},children:f?null:e.jsx(b,{})})]}),e.jsx(J,{value:n,children:e.jsx(g.ul,{className:u?K==="rtl"?"mr-8":"ml-8":"",initial:{opacity:0,height:0,overflow:"hidden"},animate:{opacity:n?1:0,height:n?"auto":0},transition:{duration:.15},children:o})})]})};I.displayName="MenuCollapse";const G=l=>{const{label:s,children:o,className:t}=l,{sideCollapsed:a}=r.useContext(p),u=c("menu-group",t);return e.jsxs("div",{className:u,children:[s&&!a&&e.jsx("div",{className:c("menu-title"),children:s}),e.jsx(k,{value:null,children:e.jsx("ul",{children:o})})]})};G.displayName="MenuGroup";const v=$;v.MenuItem=y;v.MenuCollapse=I;v.MenuGroup=G;export{v as M};
