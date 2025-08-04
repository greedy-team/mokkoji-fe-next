import{j as u}from"./jsx-runtime-DoEZbXM1.js";import{c as f}from"./utils-CIsb_jhR.js";import"./jsx-runtime-Bw5QeaCk.js";import"./clsx-B-dksMZM.js";function d({className:l,variant:c="default",...m}){const p={default:"focus-visible:border-[#00E457] text-sm",error:"border-[#FF383C] bg-[#FFF4F4] text-sm",comment:"bg-[#F4F4F4] min-h-[71px] border-none p-4 text-base"};return u.jsx("textarea",{"data-slot":"textarea",className:f("placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-[150px] w-full min-w-0 rounded-md border-2 bg-transparent px-3 py-2 transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",p[c],l),...m})}d.__docgenInfo={description:"",methods:[],displayName:"Textarea",props:{variant:{required:!1,tsType:{name:"union",raw:"'default' | 'error' | 'comment'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'error'"},{name:"literal",value:"'comment'"}]},description:"",defaultValue:{value:"'default'",computed:!1}}}};const h={title:"Components/Textarea",component:d,tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["default","error"]}}},e={args:{placeholder:"기본 텍스트에어리어",variant:"default"}},r={args:{placeholder:"에러 상태",variant:"error"}};var a,t,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    placeholder: '기본 텍스트에어리어',
    variant: 'default'
  }
}`,...(o=(t=e.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var n,s,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    placeholder: '에러 상태',
    variant: 'error'
  }
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const F=["Default","Error"];export{e as Default,r as Error,F as __namedExportsOrder,h as default};
