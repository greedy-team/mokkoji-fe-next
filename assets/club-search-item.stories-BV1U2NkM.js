import{j as U}from"./jsx-runtime-DoEZbXM1.js";import{r as De,g as xe}from"./index-94rxSlfo.js";import{r as we,a as Be}from"./segment-CXO-4Ars.js";import{r as He}from"./jsx-runtime-Bw5QeaCk.js";import{r as Fe,a as Ke,b as Ge,c as Ve,d as We,e as $e,f as ze,g as Je}from"./add-base-path-dGi9jHgF.js";import{r as Qe}from"./use-merged-ref-DZsM9s1K.js";var w={exports:{}},B={exports:{}},de;function Xe(){return de||(de=1,function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"useIntersection",{enumerable:!0,get:function(){return J}});const L=De(),k=Fe(),D=typeof IntersectionObserver=="function",o=new Map,S=[];function I(m){const f={root:m.root||null,margin:m.rootMargin||""},E=S.find(h=>h.root===f.root&&h.margin===f.margin);let u;if(E&&(u=o.get(E),u))return u;const b=new Map,g=new IntersectionObserver(h=>{h.forEach(l=>{const T=b.get(l.target),O=l.isIntersecting||l.intersectionRatio>0;T&&O&&T(O)})},m);return u={id:f,observer:g,elements:b},S.push(f),o.set(f,u),u}function z(m,f,E){const{id:u,observer:b,elements:g}=I(E);return g.set(m,f),b.observe(m),function(){if(g.delete(m),b.unobserve(m),g.size===0){b.disconnect(),o.delete(u);const l=S.findIndex(T=>T.root===u.root&&T.margin===u.margin);l>-1&&S.splice(l,1)}}}function J(m){let{rootRef:f,rootMargin:E,disabled:u}=m;const b=u||!D,[g,h]=(0,L.useState)(!1),l=(0,L.useRef)(null),T=(0,L.useCallback)(C=>{l.current=C},[]);(0,L.useEffect)(()=>{if(D){if(b||g)return;const C=l.current;if(C&&C.tagName)return z(C,q=>q&&h(q),{root:f==null?void 0:f.current,rootMargin:E})}else if(!g){const C=(0,k.requestIdleCallback)(()=>h(!0));return()=>(0,k.cancelIdleCallback)(C)}},[b,E,f,g,l.current]);const O=(0,L.useCallback)(()=>{h(!1)},[]);return[T,g,O]}(typeof e.default=="function"||typeof e.default=="object"&&e.default!==null)&&typeof e.default.__esModule>"u"&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)}(B,B.exports)),B.exports}var H={exports:{}},pe;function Ye(){return pe||(pe=1,function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"getDomainLocale",{enumerable:!0,get:function(){return L}}),Ke();function L(k,D,o,S){return!1}(typeof e.default=="function"||typeof e.default=="object"&&e.default!==null)&&typeof e.default.__esModule>"u"&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)}(H,H.exports)),H.exports}var Y={},me;function Ze(){return me||(me=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"errorOnce",{enumerable:!0,get:function(){return e}});let e=L=>{}}(Y)),Y}var ge;function et(){return ge||(ge=1,function(t,e){"use client";Object.defineProperty(e,"__esModule",{value:!0});function L(n,d){for(var s in d)Object.defineProperty(n,s,{enumerable:!0,get:d[s]})}L(e,{default:function(){return ke},useLinkStatus:function(){return Pe}});const k=we(),D=He(),o=k._(De()),S=Ge(),I=Ve(),z=We(),J=$e(),m=ze(),f=Be(),E=Xe(),u=Ye(),b=Je(),g=Qe();Ze();const h=new Set;function l(n,d,s,c){if(!(typeof window>"u")&&(0,I.isLocalURL)(d)){if(!c.bypassPrefetchedCheck){const _=typeof c.locale<"u"?c.locale:"locale"in n?n.locale:void 0,R=d+"%"+s+"%"+_;if(h.has(R))return;h.add(R)}n.prefetch(d,s,c).catch(_=>{})}}function T(n){const s=n.currentTarget.getAttribute("target");return s&&s!=="_self"||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||n.nativeEvent&&n.nativeEvent.which===2}function O(n,d,s,c,_,R,N,Q,j){const{nodeName:X}=n.currentTarget;if(X.toUpperCase()==="A"&&T(n)||n.currentTarget.hasAttribute("download"))return;if(!(0,I.isLocalURL)(s)){_&&(n.preventDefault(),location.replace(s));return}n.preventDefault(),(()=>{if(j){let M=!1;if(j({preventDefault:()=>{M=!0}}),M)return}const y=N??!0;"beforePopState"in d?d[_?"replace":"push"](s,c,{shallow:R,locale:Q,scroll:y}):d[_?"replace":"push"](c||s,{scroll:y})})()}function C(n){return typeof n=="string"?n:(0,z.formatUrl)(n)}const ee=o.default.forwardRef(function(d,s){let c;const{href:_,as:R,children:N,prefetch:Q=null,passHref:j,replace:X,shallow:te,scroll:re,locale:y,onClick:M,onNavigate:Me,onMouseEnter:ne,onTouchStart:oe,legacyBehavior:v=!1,...Ie}=d;c=N,v&&(typeof c=="string"||typeof c=="number")&&(c=(0,D.jsx)("a",{children:c}));const r=o.default.useContext(f.RouterContext),ie=Q!==!1,{href:A,as:p}=o.default.useMemo(()=>{if(!r){const fe=C(_);return{href:fe,as:R?C(R):fe}}const[a,P]=(0,S.resolveHref)(r,_,!0);return{href:a,as:R?(0,S.resolveHref)(r,R):P||a}},[r,_,R]),ae=o.default.useRef(A),se=o.default.useRef(p);let i;v&&(i=o.default.Children.only(c));const qe=v?i&&typeof i=="object"&&i.ref:s,[ce,ue,le]=(0,E.useIntersection)({rootMargin:"200px"}),Ne=o.default.useCallback(a=>{(se.current!==p||ae.current!==A)&&(le(),se.current=p,ae.current=A),ce(a)},[p,A,le,ce]),je=(0,g.useMergedRef)(Ne,qe);o.default.useEffect(()=>{r&&(!ue||!ie||l(r,A,p,{locale:y}))},[p,A,ue,y,ie,r==null?void 0:r.locale,r]);const x={ref:je,onClick(a){!v&&typeof M=="function"&&M(a),v&&i.props&&typeof i.props.onClick=="function"&&i.props.onClick(a),r&&(a.defaultPrevented||O(a,r,A,p,X,te,re,y,Me))},onMouseEnter(a){!v&&typeof ne=="function"&&ne(a),v&&i.props&&typeof i.props.onMouseEnter=="function"&&i.props.onMouseEnter(a),r&&l(r,A,p,{locale:y,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(P){!v&&typeof oe=="function"&&oe(P),v&&i.props&&typeof i.props.onTouchStart=="function"&&i.props.onTouchStart(P),r&&l(r,A,p,{locale:y,priority:!0,bypassPrefetchedCheck:!0})}};if((0,J.isAbsoluteUrl)(p))x.href=p;else if(!v||j||i.type==="a"&&!("href"in i.props)){const a=typeof y<"u"?y:r==null?void 0:r.locale,P=(r==null?void 0:r.isLocaleDomain)&&(0,u.getDomainLocale)(p,a,r==null?void 0:r.locales,r==null?void 0:r.domainLocales);x.href=P||(0,b.addBasePath)((0,m.addLocale)(p,a,r==null?void 0:r.defaultLocale))}return v?o.default.cloneElement(i,x):(0,D.jsx)("a",{...Ie,...x,children:c})}),q=(0,o.createContext)({pending:!1}),Pe=()=>(0,o.useContext)(q),ke=ee;(typeof e.default=="function"||typeof e.default=="object"&&e.default!==null)&&typeof e.default.__esModule>"u"&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)}(w,w.exports)),w.exports}var Z,he;function tt(){return he||(he=1,Z=et()),Z}var rt=tt();const nt=xe(rt);function Oe({club:t}){return U.jsx(nt,{href:`/club/${t.id}`,children:U.jsxs("article",{className:"mb-3 cursor-pointer rounded-lg border-2 border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50",children:[U.jsx("header",{className:"mb-2",children:U.jsxs("div",{className:"flex items-center gap-2",children:[U.jsx("h3",{className:"text-lg font-semibold",children:t.name}),U.jsx("span",{className:"text-sm text-[#9C9C9C]",children:t.category?`${t.category} 동아리`:"동아리"})]})}),U.jsx("p",{className:"line-clamp-2 overflow-hidden text-sm leading-relaxed break-words text-gray-600",children:t.description})]})})}Oe.__docgenInfo={description:"",methods:[],displayName:"ClubSearchItem",props:{club:{required:!0,tsType:{name:"ClubType"},description:""}}};var W=function(t){return t.CULTURAL_ART="CULTURAL_ART",t.ACADEMIC_CULTURAL="ACADEMIC_CULTURAL",t.VOLUNTEER_SOCIAL="VOLUNTEER_SOCIAL",t.SPORTS="SPORTS",t.RELIGIOUS="RELIGIOUS",t.OTHER="OTHER",t}({}),$=function(t){return t.CENTRAL_CLUB="CENTRAL_CLUB",t.DEPARTMENT_CLUB="DEPARTMENT_CLUB",t.SMALL_GROUP="SMALL_GROUP",t}({});const lt={title:"molecules/ClubSearchItem",component:Oe,parameters:{layout:"centered"}},F={args:{club:{id:184,name:"모꼬지",category:W.OTHER,description:"우리 동아리에서 함께할 신입 멤버를 모집합니다!",affiliation:$.CENTRAL_CLUB,recruitStartDate:"",recruitEndDate:"",logo:"",isFavorite:void 0}}},K={args:{club:{id:201,name:"알고리즘 연구회",category:W.ACADEMIC_CULTURAL,description:"주 2회 스터디와 월 1회 알고리즘 대회 준비를 함께합니다.",affiliation:$.CENTRAL_CLUB,recruitStartDate:"",recruitEndDate:"",logo:"",isFavorite:void 0}}},G={args:{club:{id:202,name:"런앤펀",category:W.SPORTS,description:"매주 토요일 오전 러닝 모임. 초보 환영!",affiliation:$.CENTRAL_CLUB,recruitStartDate:"",recruitEndDate:"",logo:"",isFavorite:void 0}}},V={args:{club:{id:203,name:"창업 동아리 SPARK",category:W.OTHER,description:"아이디어 발굴 → 프로토타입 제작 → 사용자 인터뷰 → 피봇을 반복하며 실제 서비스 출시를 목표로 활동합니다. 외부 네트워킹과 멘토링, 스터디도 함께 진행해요.",affiliation:$.CENTRAL_CLUB,recruitStartDate:"",recruitEndDate:"",logo:"",isFavorite:void 0}}};var be,ve,Le;F.parameters={...F.parameters,docs:{...(be=F.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    club: {
      id: 184,
      name: '모꼬지',
      category: ClubCategory.OTHER,
      description: '우리 동아리에서 함께할 신입 멤버를 모집합니다!',
      affiliation: ClubAffiliation.CENTRAL_CLUB,
      recruitStartDate: '',
      recruitEndDate: '',
      logo: '',
      isFavorite: undefined
    }
  }
}`,...(Le=(ve=F.parameters)==null?void 0:ve.docs)==null?void 0:Le.source}}};var Ce,_e,Re;K.parameters={...K.parameters,docs:{...(Ce=K.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
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
}`,...(Re=(_e=K.parameters)==null?void 0:_e.docs)==null?void 0:Re.source}}};var ye,Ee,Te;G.parameters={...G.parameters,docs:{...(ye=G.parameters)==null?void 0:ye.docs,source:{originalSource:`{
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
}`,...(Te=(Ee=G.parameters)==null?void 0:Ee.docs)==null?void 0:Te.source}}};var Ae,Se,Ue;V.parameters={...V.parameters,docs:{...(Ae=V.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    club: {
      id: 203,
      name: '창업 동아리 SPARK',
      category: ClubCategory.OTHER,
      description: '아이디어 발굴 → 프로토타입 제작 → 사용자 인터뷰 → 피봇을 반복하며 실제 서비스 출시를 목표로 활동합니다. ' + '외부 네트워킹과 멘토링, 스터디도 함께 진행해요.',
      affiliation: ClubAffiliation.CENTRAL_CLUB,
      recruitStartDate: '',
      recruitEndDate: '',
      logo: '',
      isFavorite: undefined
    }
  }
}`,...(Ue=(Se=V.parameters)==null?void 0:Se.docs)==null?void 0:Ue.source}}};const ft=["Default","WithCategory","WithoutCategory","LongDescription"];export{F as Default,V as LongDescription,K as WithCategory,G as WithoutCategory,ft as __namedExportsOrder,lt as default};
