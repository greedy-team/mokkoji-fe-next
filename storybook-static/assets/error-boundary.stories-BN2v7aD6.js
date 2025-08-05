import{j as e}from"./jsx-runtime-DoEZbXM1.js";import{b as x}from"./index-DzmNwqwI.js";import{B as o}from"./button-BTG9F85a.js";import{c as t}from"./createLucideIcon-BKdF3MrB.js";import"./jsx-runtime-Bw5QeaCk.js";import"./index-Cf3xVBfy.js";import"./index-D_y78INj.js";import"./index-C_DQv66u.js";import"./index-Cts3AyFU.js";import"./clsx-B-dksMZM.js";import"./utils-CIsb_jhR.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],f=t("arrow-left",g);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],h=t("circle-alert",y);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],j=t("rotate-ccw",N);function l({message:p}){const u=x();return e.jsxs("div",{className:"flex flex-col items-center justify-center gap-4 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600",children:[e.jsx(h,{className:"h-10 w-10 text-red-500"}),e.jsx("p",{className:"text-lg font-medium",children:p||"문제가 발생했습니다. 다시 시도해주세요."}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(o,{variant:"outline",className:"flex items-center gap-2",onClick:()=>u.back(),children:[e.jsx(f,{className:"h-4 w-4"}),"이전으로"]}),e.jsxs(o,{variant:"outline",className:"flex items-center gap-2",onClick:()=>window.location.reload(),children:[e.jsx(j,{className:"h-4 w-4"}),"새로고침"]})]})]})}l.__docgenInfo={description:"",methods:[],displayName:"ErrorBoundaryUi",props:{message:{required:!1,tsType:{name:"string"},description:""}}};const R={title:"Common/ErrorBoundary",component:l,tags:["autodocs"],args:{message:"데이터를 불러오는 중 오류가 발생했습니다."}},r={},s={args:{message:"토큰이 만료되어 다시 로그인해야 합니다."}};var a,c,n;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(c=r.parameters)==null?void 0:c.docs)==null?void 0:n.source}}};var i,m,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    message: '토큰이 만료되어 다시 로그인해야 합니다.'
  }
}`,...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const A=["Default","CustomMessage"];export{s as CustomMessage,r as Default,A as __namedExportsOrder,R as default};
