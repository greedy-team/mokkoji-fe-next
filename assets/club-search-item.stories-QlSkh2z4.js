import{j as I}from"./jsx-runtime-DoEZbXM1.js";import{r as te,g as we}from"./index-D_y78INj.js";import{r as Fe,a as He,b as Ke,c as Ge,d as Ve,e as We,f as $e,g as ze,h as Je,i as Qe}from"./add-base-path-8yd7ql7g.js";import{r as Xe}from"./jsx-runtime-Bw5QeaCk.js";var F={exports:{}},H={exports:{}},me;function Ye(){return me||(me=1,function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"useIntersection",{enumerable:!0,get:function(){return O}});const d=te(),P=Fe(),S=typeof IntersectionObserver=="function",r=new Map,u=[];function v(c){const i={root:c.root||null,margin:c.rootMargin||""},A=u.find(C=>C.root===i.root&&C.margin===i.margin);let p;if(A&&(p=r.get(A),p))return p;const _=new Map,h=new IntersectionObserver(C=>{C.forEach(m=>{const U=_.get(m.target),j=m.isIntersecting||m.intersectionRatio>0;U&&j&&U(j)})},c);return p={id:i,observer:h,elements:_},u.push(i),r.set(i,p),p}function M(c,i,A){const{id:p,observer:_,elements:h}=v(A);return h.set(c,i),_.observe(c),function(){if(h.delete(c),_.unobserve(c),h.size===0){_.disconnect(),r.delete(p);const m=u.findIndex(U=>U.root===p.root&&U.margin===p.margin);m>-1&&u.splice(m,1)}}}function O(c){let{rootRef:i,rootMargin:A,disabled:p}=c;const _=p||!S,[h,C]=(0,d.useState)(!1),m=(0,d.useRef)(null),U=(0,d.useCallback)(y=>{m.current=y},[]);(0,d.useEffect)(()=>{if(S){if(_||h)return;const y=m.current;if(y&&y.tagName)return M(y,N=>N&&C(N),{root:i==null?void 0:i.current,rootMargin:A})}else if(!h){const y=(0,P.requestIdleCallback)(()=>C(!0));return()=>(0,P.cancelIdleCallback)(y)}},[_,A,i,h,m.current]);const j=(0,d.useCallback)(()=>{C(!1)},[]);return[U,h,j]}(typeof e.default=="function"||typeof e.default=="object"&&e.default!==null)&&typeof e.default.__esModule>"u"&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)}(H,H.exports)),H.exports}var K={exports:{}},ge;function Ze(){return ge||(ge=1,function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"getDomainLocale",{enumerable:!0,get:function(){return d}}),He();function d(P,S,r,u){return!1}(typeof e.default=="function"||typeof e.default=="object"&&e.default!==null)&&typeof e.default.__esModule>"u"&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)}(K,K.exports)),K.exports}var G={exports:{}},be;function et(){return be||(be=1,function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"useMergedRef",{enumerable:!0,get:function(){return P}});const d=te();function P(r,u){const v=(0,d.useRef)(null),M=(0,d.useRef)(null);return(0,d.useCallback)(O=>{if(O===null){const c=v.current;c&&(v.current=null,c());const i=M.current;i&&(M.current=null,i())}else r&&(v.current=S(r,O)),u&&(M.current=S(u,O))},[r,u])}function S(r,u){if(typeof r=="function"){const v=r(u);return typeof v=="function"?v:()=>r(null)}else return r.current=u,()=>{r.current=null}}(typeof e.default=="function"||typeof e.default=="object"&&e.default!==null)&&typeof e.default.__esModule>"u"&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)}(G,G.exports)),G.exports}var Z={},he;function tt(){return he||(he=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"errorOnce",{enumerable:!0,get:function(){return e}});let e=d=>{}}(Z)),Z}var Ce;function rt(){return Ce||(Ce=1,function(t,e){"use client";Object.defineProperty(e,"__esModule",{value:!0});function d(o,g){for(var l in g)Object.defineProperty(o,l,{enumerable:!0,get:g[l]})}d(e,{default:function(){return je},useLinkStatus:function(){return Ie}});const P=Ke(),S=Xe(),r=P._(te()),u=Ge(),v=Ve(),M=We(),O=$e(),c=ze(),i=Je(),A=Ye(),p=Ze(),_=Qe(),h=et();tt();const C=new Set;function m(o,g,l,f){if(!(typeof window>"u")&&(0,v.isLocalURL)(g)){if(!f.bypassPrefetchedCheck){const R=typeof f.locale<"u"?f.locale:"locale"in o?o.locale:void 0,E=g+"%"+l+"%"+R;if(C.has(E))return;C.add(E)}o.prefetch(g,l,f).catch(R=>{})}}function U(o){const l=o.currentTarget.getAttribute("target");return l&&l!=="_self"||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||o.nativeEvent&&o.nativeEvent.which===2}function j(o,g,l,f,R,E,x,X,B){const{nodeName:Y}=o.currentTarget;if(Y.toUpperCase()==="A"&&U(o)||o.currentTarget.hasAttribute("download"))return;if(!(0,v.isLocalURL)(l)){R&&(o.preventDefault(),location.replace(l));return}o.preventDefault(),(()=>{if(B){let q=!1;if(B({preventDefault:()=>{q=!0}}),q)return}const T=x??!0;"beforePopState"in g?g[R?"replace":"push"](l,f,{shallow:E,locale:X,scroll:T}):g[R?"replace":"push"](f||l,{scroll:T})})()}function y(o){return typeof o=="string"?o:(0,M.formatUrl)(o)}const re=r.default.forwardRef(function(g,l){let f;const{href:R,as:E,children:x,prefetch:X=null,passHref:B,replace:Y,shallow:ne,scroll:oe,locale:T,onClick:q,onNavigate:ke,onMouseEnter:ie,onTouchStart:ae,legacyBehavior:L=!1,...qe}=g;f=x,L&&(typeof f=="string"||typeof f=="number")&&(f=(0,S.jsx)("a",{children:f}));const n=r.default.useContext(i.RouterContext),se=X!==!1,{href:D,as:b}=r.default.useMemo(()=>{if(!n){const pe=y(R);return{href:pe,as:E?y(E):pe}}const[s,k]=(0,u.resolveHref)(n,R,!0);return{href:s,as:E?(0,u.resolveHref)(n,E):k||s}},[n,R,E]),ue=r.default.useRef(D),ce=r.default.useRef(b);let a;L&&(a=r.default.Children.only(f));const Ne=L?a&&typeof a=="object"&&a.ref:l,[le,fe,de]=(0,A.useIntersection)({rootMargin:"200px"}),xe=r.default.useCallback(s=>{(ce.current!==b||ue.current!==D)&&(de(),ce.current=b,ue.current=D),le(s)},[b,D,de,le]),Be=(0,h.useMergedRef)(xe,Ne);r.default.useEffect(()=>{n&&(!fe||!se||m(n,D,b,{locale:T}))},[b,D,fe,T,se,n==null?void 0:n.locale,n]);const w={ref:Be,onClick(s){!L&&typeof q=="function"&&q(s),L&&a.props&&typeof a.props.onClick=="function"&&a.props.onClick(s),n&&(s.defaultPrevented||j(s,n,D,b,Y,ne,oe,T,ke))},onMouseEnter(s){!L&&typeof ie=="function"&&ie(s),L&&a.props&&typeof a.props.onMouseEnter=="function"&&a.props.onMouseEnter(s),n&&m(n,D,b,{locale:T,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(k){!L&&typeof ae=="function"&&ae(k),L&&a.props&&typeof a.props.onTouchStart=="function"&&a.props.onTouchStart(k),n&&m(n,D,b,{locale:T,priority:!0,bypassPrefetchedCheck:!0})}};if((0,O.isAbsoluteUrl)(b))w.href=b;else if(!L||B||a.type==="a"&&!("href"in a.props)){const s=typeof T<"u"?T:n==null?void 0:n.locale,k=(n==null?void 0:n.isLocaleDomain)&&(0,p.getDomainLocale)(b,s,n==null?void 0:n.locales,n==null?void 0:n.domainLocales);w.href=k||(0,_.addBasePath)((0,c.addLocale)(b,s,n==null?void 0:n.defaultLocale))}return L?r.default.cloneElement(a,w):(0,S.jsx)("a",{...qe,...w,children:f})}),N=(0,r.createContext)({pending:!1}),Ie=()=>(0,r.useContext)(N),je=re;(typeof e.default=="function"||typeof e.default=="object"&&e.default!==null)&&typeof e.default.__esModule>"u"&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)}(F,F.exports)),F.exports}var ee,ve;function nt(){return ve||(ve=1,ee=rt()),ee}var ot=nt();const it=we(ot);function Oe({club:t}){return I.jsx(it,{href:`/club/${t.id}`,children:I.jsxs("article",{className:"mb-3 cursor-pointer rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50",children:[I.jsx("header",{className:"mb-2",children:I.jsxs("div",{className:"flex items-center gap-2",children:[I.jsx("h3",{className:"text-lg font-semibold",children:t.name}),I.jsx("span",{className:"text-sm text-[#9C9C9C]",children:t.category?`${t.category} 동아리`:"동아리"})]})}),I.jsx("p",{className:"text-sm leading-relaxed text-gray-600",children:t.description})]})})}Oe.__docgenInfo={description:"",methods:[],displayName:"ClubSearchItem",props:{club:{required:!0,tsType:{name:"ClubType"},description:""}}};var J=function(t){return t.CULTURAL_ART="CULTURAL_ART",t.ACADEMIC_CULTURAL="ACADEMIC_CULTURAL",t.VOLUNTEER_SOCIAL="VOLUNTEER_SOCIAL",t.SOCIAL="SOCIAL",t.SPORTS="SPORTS",t.RELIGIOUS="RELIGIOUS",t.ETC="ETC",t}({}),Q=function(t){return t.CENTRAL_CLUB="CENTRAL_CLUB",t.DEPARTMENT_CLUB="DEPARTMENT_CLUB",t.SMALL_GROUP="SMALL_GROUP",t}({});const lt={title:"molecules/ClubSearchItem",component:Oe,parameters:{layout:"centered"}},V={args:{club:{id:184,name:"모꼬지",category:J.ETC,description:"우리 동아리에서 함께할 신입 멤버를 모집합니다!",affiliation:Q.CENTRAL_CLUB,recruitStartDate:"",recruitEndDate:"",logo:"",isFavorite:void 0}}},W={args:{club:{id:201,name:"알고리즘 연구회",category:J.ACADEMIC_CULTURAL,description:"주 2회 스터디와 월 1회 알고리즘 대회 준비를 함께합니다.",affiliation:Q.CENTRAL_CLUB,recruitStartDate:"",recruitEndDate:"",logo:"",isFavorite:void 0}}},$={args:{club:{id:202,name:"런앤펀",category:J.SPORTS,description:"매주 토요일 오전 러닝 모임. 초보 환영!",affiliation:Q.CENTRAL_CLUB,recruitStartDate:"",recruitEndDate:"",logo:"",isFavorite:void 0}}},z={args:{club:{id:203,name:"창업 동아리 SPARK",category:J.ETC,description:"아이디어 발굴 → 프로토타입 제작 → 사용자 인터뷰 → 피봇을 반복하며 실제 서비스 출시를 목표로 활동합니다. 외부 네트워킹과 멘토링, 스터디도 함께 진행해요.",affiliation:Q.CENTRAL_CLUB,recruitStartDate:"",recruitEndDate:"",logo:"",isFavorite:void 0}}};var _e,Le,ye;V.parameters={...V.parameters,docs:{...(_e=V.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    club: {
      id: 184,
      name: '모꼬지',
      category: ClubCategory.ETC,
      description: '우리 동아리에서 함께할 신입 멤버를 모집합니다!',
      affiliation: ClubAffiliation.CENTRAL_CLUB,
      recruitStartDate: '',
      recruitEndDate: '',
      logo: '',
      isFavorite: undefined
    }
  }
}`,...(ye=(Le=V.parameters)==null?void 0:Le.docs)==null?void 0:ye.source}}};var Re,Ee,Te;W.parameters={...W.parameters,docs:{...(Re=W.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  args: {
    club: {
      id: 201,
      name: '알고리즘 연구회',
      category: ClubCategory.ACADEMIC_CULTURAL,
      description: '주 2회 스터디와 월 1회 알고리즘 대회 준비를 함께합니다.',
      affiliation: ClubAffiliation.CENTRAL_CLUB,
      recruitStartDate: '',
      recruitEndDate: '',
      logo: '',
      isFavorite: undefined
    }
  }
}`,...(Te=(Ee=W.parameters)==null?void 0:Ee.docs)==null?void 0:Te.source}}};var Se,Ae,Ue;$.parameters={...$.parameters,docs:{...(Se=$.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    club: {
      id: 202,
      name: '런앤펀',
      category: ClubCategory.SPORTS,
      description: '매주 토요일 오전 러닝 모임. 초보 환영!',
      affiliation: ClubAffiliation.CENTRAL_CLUB,
      recruitStartDate: '',
      recruitEndDate: '',
      logo: '',
      isFavorite: undefined
    }
  }
}`,...(Ue=(Ae=$.parameters)==null?void 0:Ae.docs)==null?void 0:Ue.source}}};var De,Pe,Me;z.parameters={...z.parameters,docs:{...(De=z.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    club: {
      id: 203,
      name: '창업 동아리 SPARK',
      category: ClubCategory.ETC,
      description: '아이디어 발굴 → 프로토타입 제작 → 사용자 인터뷰 → 피봇을 반복하며 실제 서비스 출시를 목표로 활동합니다. ' + '외부 네트워킹과 멘토링, 스터디도 함께 진행해요.',
      affiliation: ClubAffiliation.CENTRAL_CLUB,
      recruitStartDate: '',
      recruitEndDate: '',
      logo: '',
      isFavorite: undefined
    }
  }
}`,...(Me=(Pe=z.parameters)==null?void 0:Pe.docs)==null?void 0:Me.source}}};const ft=["Default","WithCategory","WithoutCategory","LongDescription"];export{V as Default,z as LongDescription,W as WithCategory,$ as WithoutCategory,ft as __namedExportsOrder,lt as default};
