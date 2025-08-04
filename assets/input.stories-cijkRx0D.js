import{j as f}from"./jsx-runtime-DoEZbXM1.js";import{c as g}from"./utils-CIsb_jhR.js";import"./jsx-runtime-Bw5QeaCk.js";import"./clsx-B-dksMZM.js";function l({className:d,type:u="text",variant:p="default",...c}){const m={default:"focus-visible:border-[#00E457]",error:"border-[#FF383C] bg-[#FFF4F4]"};return f.jsx("input",{type:u,"data-slot":"input",className:g("rounded-md border-2 px-3 py-1","file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",m[p],d),...c})}l.__docgenInfo={description:"",methods:[],displayName:"Input",props:{variant:{required:!1,tsType:{name:"union",raw:"'default' | 'error'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'error'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},type:{defaultValue:{value:"'text'",computed:!1},required:!1}}};const y={title:"Components/Input",component:l,tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["default","error"]}}},e={args:{placeholder:"기본 입력",variant:"default"}},r={args:{placeholder:"에러 상태 입력",variant:"error"}};var a,t,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    placeholder: '기본 입력',
    variant: 'default'
  }
}`,...(o=(t=e.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var n,s,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    placeholder: '에러 상태 입력',
    variant: 'error'
  }
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const w=["Default","Error"];export{e as Default,r as Error,w as __namedExportsOrder,y as default};
