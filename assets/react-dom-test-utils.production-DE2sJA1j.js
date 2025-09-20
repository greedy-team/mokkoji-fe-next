import{r as u,g as f}from"./index-94rxSlfo.js";function l(t,e){for(var r=0;r<e.length;r++){const o=e[r];if(typeof o!="string"&&!Array.isArray(o)){for(const a in o)if(a!=="default"&&!(a in t)){const c=Object.getOwnPropertyDescriptor(o,a);c&&Object.defineProperty(t,a,c.get?c:{enumerable:!0,get:()=>o[a]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var s={};/**
 * @license React
 * react-dom-test-utils.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i;function d(){if(i)return s;i=1;var t=u(),e=!1;return s.act=function(r){return e===!1&&(e=!0,console.error("`ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info.")),t.act(r)},s}var n=d();const p=f(n),g=l({__proto__:null,default:p},[n]);export{g as r};
