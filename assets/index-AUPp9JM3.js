(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const M of document.querySelectorAll('link[rel="modulepreload"]'))C(M);new MutationObserver(M=>{for(const w of M)if(w.type==="childList")for(const A of w.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&C(A)}).observe(document,{childList:!0,subtree:!0});function m(M){const w={};return M.integrity&&(w.integrity=M.integrity),M.referrerPolicy&&(w.referrerPolicy=M.referrerPolicy),M.crossOrigin==="use-credentials"?w.credentials="include":M.crossOrigin==="anonymous"?w.credentials="omit":w.credentials="same-origin",w}function C(M){if(M.ep)return;M.ep=!0;const w=m(M);fetch(M.href,w)}})();var ol={exports:{}},ni={},ul={exports:{}},gn={};var dd;function Nm(){if(dd)return gn;dd=1;var l=Symbol.for("react.element"),u=Symbol.for("react.portal"),m=Symbol.for("react.fragment"),C=Symbol.for("react.strict_mode"),M=Symbol.for("react.profiler"),w=Symbol.for("react.provider"),A=Symbol.for("react.context"),y=Symbol.for("react.forward_ref"),$=Symbol.for("react.suspense"),T=Symbol.for("react.memo"),en=Symbol.for("react.lazy"),W=Symbol.iterator;function U(k){return k===null||typeof k!="object"?null:(k=W&&k[W]||k["@@iterator"],typeof k=="function"?k:null)}var I={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},L=Object.assign,P={};function q(k,_,ln){this.props=k,this.context=_,this.refs=P,this.updater=ln||I}q.prototype.isReactComponent={},q.prototype.setState=function(k,_){if(typeof k!="object"&&typeof k!="function"&&k!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,k,_,"setState")},q.prototype.forceUpdate=function(k){this.updater.enqueueForceUpdate(this,k,"forceUpdate")};function nn(){}nn.prototype=q.prototype;function un(k,_,ln){this.props=k,this.context=_,this.refs=P,this.updater=ln||I}var vn=un.prototype=new nn;vn.constructor=un,L(vn,q.prototype),vn.isPureReactComponent=!0;var hn=Array.isArray,fn=Object.prototype.hasOwnProperty,Cn={current:null},pn={key:!0,ref:!0,__self:!0,__source:!0};function An(k,_,ln){var cn,g={},x=null,mn=null;if(_!=null)for(cn in _.ref!==void 0&&(mn=_.ref),_.key!==void 0&&(x=""+_.key),_)fn.call(_,cn)&&!pn.hasOwnProperty(cn)&&(g[cn]=_[cn]);var G=arguments.length-2;if(G===1)g.children=ln;else if(1<G){for(var kn=Array(G),xn=0;xn<G;xn++)kn[xn]=arguments[xn+2];g.children=kn}if(k&&k.defaultProps)for(cn in G=k.defaultProps,G)g[cn]===void 0&&(g[cn]=G[cn]);return{$$typeof:l,type:k,key:x,ref:mn,props:g,_owner:Cn.current}}function X(k,_){return{$$typeof:l,type:k.type,key:_,ref:k.ref,props:k.props,_owner:k._owner}}function bn(k){return typeof k=="object"&&k!==null&&k.$$typeof===l}function yn(k){var _={"=":"=0",":":"=2"};return"$"+k.replace(/[=:]/g,function(ln){return _[ln]})}var wn=/\/+/g;function jn(k,_){return typeof k=="object"&&k!==null&&k.key!=null?yn(""+k.key):_.toString(36)}function On(k,_,ln,cn,g){var x=typeof k;(x==="undefined"||x==="boolean")&&(k=null);var mn=!1;if(k===null)mn=!0;else switch(x){case"string":case"number":mn=!0;break;case"object":switch(k.$$typeof){case l:case u:mn=!0}}if(mn)return mn=k,g=g(mn),k=cn===""?"."+jn(mn,0):cn,hn(g)?(ln="",k!=null&&(ln=k.replace(wn,"$&/")+"/"),On(g,_,ln,"",function(xn){return xn})):g!=null&&(bn(g)&&(g=X(g,ln+(!g.key||mn&&mn.key===g.key?"":(""+g.key).replace(wn,"$&/")+"/")+k)),_.push(g)),1;if(mn=0,cn=cn===""?".":cn+":",hn(k))for(var G=0;G<k.length;G++){x=k[G];var kn=cn+jn(x,G);mn+=On(x,_,ln,kn,g)}else if(kn=U(k),typeof kn=="function")for(k=kn.call(k),G=0;!(x=k.next()).done;)x=x.value,kn=cn+jn(x,G++),mn+=On(x,_,ln,kn,g);else if(x==="object")throw _=String(k),Error("Objects are not valid as a React child (found: "+(_==="[object Object]"?"object with keys {"+Object.keys(k).join(", ")+"}":_)+"). If you meant to render a collection of children, use an array instead.");return mn}function Fn(k,_,ln){if(k==null)return k;var cn=[],g=0;return On(k,cn,"","",function(x){return _.call(ln,x,g++)}),cn}function j(k){if(k._status===-1){var _=k._result;_=_(),_.then(function(ln){(k._status===0||k._status===-1)&&(k._status=1,k._result=ln)},function(ln){(k._status===0||k._status===-1)&&(k._status=2,k._result=ln)}),k._status===-1&&(k._status=0,k._result=_)}if(k._status===1)return k._result.default;throw k._result}var tn={current:null},B={transition:null},V={ReactCurrentDispatcher:tn,ReactCurrentBatchConfig:B,ReactCurrentOwner:Cn};function H(){throw Error("act(...) is not supported in production builds of React.")}return gn.Children={map:Fn,forEach:function(k,_,ln){Fn(k,function(){_.apply(this,arguments)},ln)},count:function(k){var _=0;return Fn(k,function(){_++}),_},toArray:function(k){return Fn(k,function(_){return _})||[]},only:function(k){if(!bn(k))throw Error("React.Children.only expected to receive a single React element child.");return k}},gn.Component=q,gn.Fragment=m,gn.Profiler=M,gn.PureComponent=un,gn.StrictMode=C,gn.Suspense=$,gn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=V,gn.act=H,gn.cloneElement=function(k,_,ln){if(k==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+k+".");var cn=L({},k.props),g=k.key,x=k.ref,mn=k._owner;if(_!=null){if(_.ref!==void 0&&(x=_.ref,mn=Cn.current),_.key!==void 0&&(g=""+_.key),k.type&&k.type.defaultProps)var G=k.type.defaultProps;for(kn in _)fn.call(_,kn)&&!pn.hasOwnProperty(kn)&&(cn[kn]=_[kn]===void 0&&G!==void 0?G[kn]:_[kn])}var kn=arguments.length-2;if(kn===1)cn.children=ln;else if(1<kn){G=Array(kn);for(var xn=0;xn<kn;xn++)G[xn]=arguments[xn+2];cn.children=G}return{$$typeof:l,type:k.type,key:g,ref:x,props:cn,_owner:mn}},gn.createContext=function(k){return k={$$typeof:A,_currentValue:k,_currentValue2:k,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},k.Provider={$$typeof:w,_context:k},k.Consumer=k},gn.createElement=An,gn.createFactory=function(k){var _=An.bind(null,k);return _.type=k,_},gn.createRef=function(){return{current:null}},gn.forwardRef=function(k){return{$$typeof:y,render:k}},gn.isValidElement=bn,gn.lazy=function(k){return{$$typeof:en,_payload:{_status:-1,_result:k},_init:j}},gn.memo=function(k,_){return{$$typeof:T,type:k,compare:_===void 0?null:_}},gn.startTransition=function(k){var _=B.transition;B.transition={};try{k()}finally{B.transition=_}},gn.unstable_act=H,gn.useCallback=function(k,_){return tn.current.useCallback(k,_)},gn.useContext=function(k){return tn.current.useContext(k)},gn.useDebugValue=function(){},gn.useDeferredValue=function(k){return tn.current.useDeferredValue(k)},gn.useEffect=function(k,_){return tn.current.useEffect(k,_)},gn.useId=function(){return tn.current.useId()},gn.useImperativeHandle=function(k,_,ln){return tn.current.useImperativeHandle(k,_,ln)},gn.useInsertionEffect=function(k,_){return tn.current.useInsertionEffect(k,_)},gn.useLayoutEffect=function(k,_){return tn.current.useLayoutEffect(k,_)},gn.useMemo=function(k,_){return tn.current.useMemo(k,_)},gn.useReducer=function(k,_,ln){return tn.current.useReducer(k,_,ln)},gn.useRef=function(k){return tn.current.useRef(k)},gn.useState=function(k){return tn.current.useState(k)},gn.useSyncExternalStore=function(k,_,ln){return tn.current.useSyncExternalStore(k,_,ln)},gn.useTransition=function(){return tn.current.useTransition()},gn.version="18.3.1",gn}var cd;function xl(){return cd||(cd=1,ul.exports=Nm()),ul.exports}var md;function Lm(){if(md)return ni;md=1;var l=xl(),u=Symbol.for("react.element"),m=Symbol.for("react.fragment"),C=Object.prototype.hasOwnProperty,M=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,w={key:!0,ref:!0,__self:!0,__source:!0};function A(y,$,T){var en,W={},U=null,I=null;T!==void 0&&(U=""+T),$.key!==void 0&&(U=""+$.key),$.ref!==void 0&&(I=$.ref);for(en in $)C.call($,en)&&!w.hasOwnProperty(en)&&(W[en]=$[en]);if(y&&y.defaultProps)for(en in $=y.defaultProps,$)W[en]===void 0&&(W[en]=$[en]);return{$$typeof:u,type:y,key:U,ref:I,props:W,_owner:M.current}}return ni.Fragment=m,ni.jsx=A,ni.jsxs=A,ni}var pd;function Rm(){return pd||(pd=1,ol.exports=Lm()),ol.exports}var o=Rm(),fs={},dl={exports:{}},pe={},cl={exports:{}},ml={};var fd;function Em(){return fd||(fd=1,(function(l){function u(B,V){var H=B.length;B.push(V);n:for(;0<H;){var k=H-1>>>1,_=B[k];if(0<M(_,V))B[k]=V,B[H]=_,H=k;else break n}}function m(B){return B.length===0?null:B[0]}function C(B){if(B.length===0)return null;var V=B[0],H=B.pop();if(H!==V){B[0]=H;n:for(var k=0,_=B.length,ln=_>>>1;k<ln;){var cn=2*(k+1)-1,g=B[cn],x=cn+1,mn=B[x];if(0>M(g,H))x<_&&0>M(mn,g)?(B[k]=mn,B[x]=H,k=x):(B[k]=g,B[cn]=H,k=cn);else if(x<_&&0>M(mn,H))B[k]=mn,B[x]=H,k=x;else break n}}return V}function M(B,V){var H=B.sortIndex-V.sortIndex;return H!==0?H:B.id-V.id}if(typeof performance=="object"&&typeof performance.now=="function"){var w=performance;l.unstable_now=function(){return w.now()}}else{var A=Date,y=A.now();l.unstable_now=function(){return A.now()-y}}var $=[],T=[],en=1,W=null,U=3,I=!1,L=!1,P=!1,q=typeof setTimeout=="function"?setTimeout:null,nn=typeof clearTimeout=="function"?clearTimeout:null,un=typeof setImmediate!="undefined"?setImmediate:null;typeof navigator!="undefined"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function vn(B){for(var V=m(T);V!==null;){if(V.callback===null)C(T);else if(V.startTime<=B)C(T),V.sortIndex=V.expirationTime,u($,V);else break;V=m(T)}}function hn(B){if(P=!1,vn(B),!L)if(m($)!==null)L=!0,j(fn);else{var V=m(T);V!==null&&tn(hn,V.startTime-B)}}function fn(B,V){L=!1,P&&(P=!1,nn(An),An=-1),I=!0;var H=U;try{for(vn(V),W=m($);W!==null&&(!(W.expirationTime>V)||B&&!yn());){var k=W.callback;if(typeof k=="function"){W.callback=null,U=W.priorityLevel;var _=k(W.expirationTime<=V);V=l.unstable_now(),typeof _=="function"?W.callback=_:W===m($)&&C($),vn(V)}else C($);W=m($)}if(W!==null)var ln=!0;else{var cn=m(T);cn!==null&&tn(hn,cn.startTime-V),ln=!1}return ln}finally{W=null,U=H,I=!1}}var Cn=!1,pn=null,An=-1,X=5,bn=-1;function yn(){return!(l.unstable_now()-bn<X)}function wn(){if(pn!==null){var B=l.unstable_now();bn=B;var V=!0;try{V=pn(!0,B)}finally{V?jn():(Cn=!1,pn=null)}}else Cn=!1}var jn;if(typeof un=="function")jn=function(){un(wn)};else if(typeof MessageChannel!="undefined"){var On=new MessageChannel,Fn=On.port2;On.port1.onmessage=wn,jn=function(){Fn.postMessage(null)}}else jn=function(){q(wn,0)};function j(B){pn=B,Cn||(Cn=!0,jn())}function tn(B,V){An=q(function(){B(l.unstable_now())},V)}l.unstable_IdlePriority=5,l.unstable_ImmediatePriority=1,l.unstable_LowPriority=4,l.unstable_NormalPriority=3,l.unstable_Profiling=null,l.unstable_UserBlockingPriority=2,l.unstable_cancelCallback=function(B){B.callback=null},l.unstable_continueExecution=function(){L||I||(L=!0,j(fn))},l.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):X=0<B?Math.floor(1e3/B):5},l.unstable_getCurrentPriorityLevel=function(){return U},l.unstable_getFirstCallbackNode=function(){return m($)},l.unstable_next=function(B){switch(U){case 1:case 2:case 3:var V=3;break;default:V=U}var H=U;U=V;try{return B()}finally{U=H}},l.unstable_pauseExecution=function(){},l.unstable_requestPaint=function(){},l.unstable_runWithPriority=function(B,V){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var H=U;U=B;try{return V()}finally{U=H}},l.unstable_scheduleCallback=function(B,V,H){var k=l.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?k+H:k):H=k,B){case 1:var _=-1;break;case 2:_=250;break;case 5:_=1073741823;break;case 4:_=1e4;break;default:_=5e3}return _=H+_,B={id:en++,callback:V,priorityLevel:B,startTime:H,expirationTime:_,sortIndex:-1},H>k?(B.sortIndex=H,u(T,B),m($)===null&&B===m(T)&&(P?(nn(An),An=-1):P=!0,tn(hn,H-k))):(B.sortIndex=_,u($,B),L||I||(L=!0,j(fn))),B},l.unstable_shouldYield=yn,l.unstable_wrapCallback=function(B){var V=U;return function(){var H=U;U=V;try{return B.apply(this,arguments)}finally{U=H}}}})(ml)),ml}var gd;function Pm(){return gd||(gd=1,cl.exports=Em()),cl.exports}var hd;function Bm(){if(hd)return pe;hd=1;var l=xl(),u=Pm();function m(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var C=new Set,M={};function w(n,e){A(n,e),A(n+"Capture",e)}function A(n,e){for(M[n]=e,n=0;n<e.length;n++)C.add(e[n])}var y=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),$=Object.prototype.hasOwnProperty,T=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,en={},W={};function U(n){return $.call(W,n)?!0:$.call(en,n)?!1:T.test(n)?W[n]=!0:(en[n]=!0,!1)}function I(n,e,t,a){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return a?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function L(n,e,t,a){if(e===null||typeof e=="undefined"||I(n,e,t,a))return!0;if(a)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function P(n,e,t,a,i,s,r){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=a,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=r}var q={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){q[n]=new P(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];q[e]=new P(e,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){q[n]=new P(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){q[n]=new P(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){q[n]=new P(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){q[n]=new P(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){q[n]=new P(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){q[n]=new P(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){q[n]=new P(n,5,!1,n.toLowerCase(),null,!1,!1)});var nn=/[\-:]([a-z])/g;function un(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(nn,un);q[e]=new P(e,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(nn,un);q[e]=new P(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(nn,un);q[e]=new P(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){q[n]=new P(n,1,!1,n.toLowerCase(),null,!1,!1)}),q.xlinkHref=new P("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){q[n]=new P(n,1,!1,n.toLowerCase(),null,!0,!0)});function vn(n,e,t,a){var i=q.hasOwnProperty(e)?q[e]:null;(i!==null?i.type!==0:a||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(L(e,t,i,a)&&(t=null),a||i===null?U(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):i.mustUseProperty?n[i.propertyName]=t===null?i.type===3?!1:"":t:(e=i.attributeName,a=i.attributeNamespace,t===null?n.removeAttribute(e):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,a?n.setAttributeNS(a,e,t):n.setAttribute(e,t))))}var hn=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,fn=Symbol.for("react.element"),Cn=Symbol.for("react.portal"),pn=Symbol.for("react.fragment"),An=Symbol.for("react.strict_mode"),X=Symbol.for("react.profiler"),bn=Symbol.for("react.provider"),yn=Symbol.for("react.context"),wn=Symbol.for("react.forward_ref"),jn=Symbol.for("react.suspense"),On=Symbol.for("react.suspense_list"),Fn=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),tn=Symbol.for("react.offscreen"),B=Symbol.iterator;function V(n){return n===null||typeof n!="object"?null:(n=B&&n[B]||n["@@iterator"],typeof n=="function"?n:null)}var H=Object.assign,k;function _(n){if(k===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);k=e&&e[1]||""}return`
`+k+n}var ln=!1;function cn(n,e){if(!n||ln)return"";ln=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(S){var a=S}Reflect.construct(n,[],e)}else{try{e.call()}catch(S){a=S}n.call(e.prototype)}else{try{throw Error()}catch(S){a=S}n()}}catch(S){if(S&&a&&typeof S.stack=="string"){for(var i=S.stack.split(`
`),s=a.stack.split(`
`),r=i.length-1,d=s.length-1;1<=r&&0<=d&&i[r]!==s[d];)d--;for(;1<=r&&0<=d;r--,d--)if(i[r]!==s[d]){if(r!==1||d!==1)do if(r--,d--,0>d||i[r]!==s[d]){var f=`
`+i[r].replace(" at new "," at ");return n.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",n.displayName)),f}while(1<=r&&0<=d);break}}}finally{ln=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?_(n):""}function g(n){switch(n.tag){case 5:return _(n.type);case 16:return _("Lazy");case 13:return _("Suspense");case 19:return _("SuspenseList");case 0:case 2:case 15:return n=cn(n.type,!1),n;case 11:return n=cn(n.type.render,!1),n;case 1:return n=cn(n.type,!0),n;default:return""}}function x(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case pn:return"Fragment";case Cn:return"Portal";case X:return"Profiler";case An:return"StrictMode";case jn:return"Suspense";case On:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case yn:return(n.displayName||"Context")+".Consumer";case bn:return(n._context.displayName||"Context")+".Provider";case wn:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Fn:return e=n.displayName||null,e!==null?e:x(n.type)||"Memo";case j:e=n._payload,n=n._init;try{return x(n(e))}catch{}}return null}function mn(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return x(e);case 8:return e===An?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function G(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function kn(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function xn(n){var e=kn(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),a=""+n[e];if(!n.hasOwnProperty(e)&&typeof t!="undefined"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return i.call(this)},set:function(r){a=""+r,s.call(this,r)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return a},setValue:function(r){a=""+r},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function Pn(n){n._valueTracker||(n._valueTracker=xn(n))}function Bn(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),a="";return n&&(a=kn(n)?n.checked?"true":"false":n.value),n=a,n!==t?(e.setValue(n),!0):!1}function In(n){if(n=n||(typeof document!="undefined"?document:void 0),typeof n=="undefined")return null;try{return n.activeElement||n.body}catch{return n.body}}function nt(n,e){var t=e.checked;return H({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t!=null?t:n._wrapperState.initialChecked})}function R(n,e){var t=e.defaultValue==null?"":e.defaultValue,a=e.checked!=null?e.checked:e.defaultChecked;t=G(e.value!=null?e.value:t),n._wrapperState={initialChecked:a,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Z(n,e){e=e.checked,e!=null&&vn(n,"checked",e,!1)}function Fe(n,e){Z(n,e);var t=G(e.value),a=e.type;if(t!=null)a==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(a==="submit"||a==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?It(n,e.type,t):e.hasOwnProperty("defaultValue")&&It(n,e.type,G(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function zn(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var a=e.type;if(!(a!=="submit"&&a!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function It(n,e,t){(e!=="number"||In(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var Ae=Array.isArray;function et(n,e,t,a){if(n=n.options,e){e={};for(var i=0;i<t.length;i++)e["$"+t[i]]=!0;for(t=0;t<n.length;t++)i=e.hasOwnProperty("$"+n[t].value),n[t].selected!==i&&(n[t].selected=i),i&&a&&(n[t].defaultSelected=!0)}else{for(t=""+G(t),e=null,i=0;i<n.length;i++){if(n[i].value===t){n[i].selected=!0,a&&(n[i].defaultSelected=!0);return}e!==null||n[i].disabled||(e=n[i])}e!==null&&(e.selected=!0)}}function Te(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(m(91));return H({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function fa(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(m(92));if(Ae(t)){if(1<t.length)throw Error(m(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:G(t)}}function ga(n,e){var t=G(e.value),a=G(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),a!=null&&(n.defaultValue=""+a)}function ha(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function si(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ka(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?si(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ht,ri=(function(n){return typeof MSApp!="undefined"&&MSApp.execUnsafeLocalFunction?function(e,t,a,i){MSApp.execUnsafeLocalFunction(function(){return n(e,t,a,i)})}:n})(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(Ht=Ht||document.createElement("div"),Ht.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ht.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function c(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var p={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rn=["Webkit","ms","Moz","O"];Object.keys(p).forEach(function(n){rn.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),p[e]=p[n]})});function dn(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||p.hasOwnProperty(n)&&p[n]?(""+e).trim():e+"px"}function ne(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var a=t.indexOf("--")===0,i=dn(t,e[t],a);t==="float"&&(t="cssFloat"),a?n.setProperty(t,i):n[t]=i}}var qn=H({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function qe(n,e){if(e){if(qn[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(m(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(m(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(m(61))}if(e.style!=null&&typeof e.style!="object")throw Error(m(62))}}function Ss(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ws=null;function xs(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var $s=null,Ut=null,Ft=null;function Al(n){if(n=Oa(n)){if(typeof $s!="function")throw Error(m(280));var e=n.stateNode;e&&(e=Mi(e),$s(n.stateNode,n.type,e))}}function Tl(n){Ut?Ft?Ft.push(n):Ft=[n]:Ut=n}function _l(){if(Ut){var n=Ut,e=Ft;if(Ft=Ut=null,Al(n),e)for(n=0;n<e.length;n++)Al(e[n])}}function Ml(n,e){return n(e)}function jl(){}var Cs=!1;function Dl(n,e,t){if(Cs)return n(e,t);Cs=!0;try{return Ml(n,e,t)}finally{Cs=!1,(Ut!==null||Ft!==null)&&(jl(),_l())}}function va(n,e){var t=n.stateNode;if(t===null)return null;var a=Mi(t);if(a===null)return null;t=a[e];n:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(n=n.type,a=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!a;break n;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(m(231,e,typeof t));return t}var As=!1;if(y)try{var ba={};Object.defineProperty(ba,"passive",{get:function(){As=!0}}),window.addEventListener("test",ba,ba),window.removeEventListener("test",ba,ba)}catch{As=!1}function Kd(n,e,t,a,i,s,r,d,f){var S=Array.prototype.slice.call(arguments,3);try{e.apply(t,S)}catch(N){this.onError(N)}}var ya=!1,li=null,oi=!1,Ts=null,Od={onError:function(n){ya=!0,li=n}};function Id(n,e,t,a,i,s,r,d,f){ya=!1,li=null,Kd.apply(Od,arguments)}function Hd(n,e,t,a,i,s,r,d,f){if(Id.apply(this,arguments),ya){if(ya){var S=li;ya=!1,li=null}else throw Error(m(198));oi||(oi=!0,Ts=S)}}function $t(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,(e.flags&4098)!==0&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function Nl(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function Ll(n){if($t(n)!==n)throw Error(m(188))}function Ud(n){var e=n.alternate;if(!e){if(e=$t(n),e===null)throw Error(m(188));return e!==n?null:n}for(var t=n,a=e;;){var i=t.return;if(i===null)break;var s=i.alternate;if(s===null){if(a=i.return,a!==null){t=a;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===t)return Ll(i),n;if(s===a)return Ll(i),e;s=s.sibling}throw Error(m(188))}if(t.return!==a.return)t=i,a=s;else{for(var r=!1,d=i.child;d;){if(d===t){r=!0,t=i,a=s;break}if(d===a){r=!0,a=i,t=s;break}d=d.sibling}if(!r){for(d=s.child;d;){if(d===t){r=!0,t=s,a=i;break}if(d===a){r=!0,a=s,t=i;break}d=d.sibling}if(!r)throw Error(m(189))}}if(t.alternate!==a)throw Error(m(190))}if(t.tag!==3)throw Error(m(188));return t.stateNode.current===t?n:e}function Rl(n){return n=Ud(n),n!==null?El(n):null}function El(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=El(n);if(e!==null)return e;n=n.sibling}return null}var Pl=u.unstable_scheduleCallback,Bl=u.unstable_cancelCallback,Fd=u.unstable_shouldYield,qd=u.unstable_requestPaint,Hn=u.unstable_now,Vd=u.unstable_getCurrentPriorityLevel,_s=u.unstable_ImmediatePriority,Kl=u.unstable_UserBlockingPriority,ui=u.unstable_NormalPriority,zd=u.unstable_LowPriority,Ol=u.unstable_IdlePriority,di=null,Pe=null;function Wd(n){if(Pe&&typeof Pe.onCommitFiberRoot=="function")try{Pe.onCommitFiberRoot(di,n,void 0,(n.current.flags&128)===128)}catch{}}var _e=Math.clz32?Math.clz32:Qd,Gd=Math.log,Yd=Math.LN2;function Qd(n){return n>>>=0,n===0?32:31-(Gd(n)/Yd|0)|0}var ci=64,mi=4194304;function Sa(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function pi(n,e){var t=n.pendingLanes;if(t===0)return 0;var a=0,i=n.suspendedLanes,s=n.pingedLanes,r=t&268435455;if(r!==0){var d=r&~i;d!==0?a=Sa(d):(s&=r,s!==0&&(a=Sa(s)))}else r=t&~i,r!==0?a=Sa(r):s!==0&&(a=Sa(s));if(a===0)return 0;if(e!==0&&e!==a&&(e&i)===0&&(i=a&-a,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if((a&4)!==0&&(a|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=a;0<e;)t=31-_e(e),i=1<<t,a|=n[t],e&=~i;return a}function Jd(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xd(n,e){for(var t=n.suspendedLanes,a=n.pingedLanes,i=n.expirationTimes,s=n.pendingLanes;0<s;){var r=31-_e(s),d=1<<r,f=i[r];f===-1?((d&t)===0||(d&a)!==0)&&(i[r]=Jd(d,e)):f<=e&&(n.expiredLanes|=d),s&=~d}}function Ms(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Il(){var n=ci;return ci<<=1,(ci&4194240)===0&&(ci=64),n}function js(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function wa(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-_e(e),n[e]=t}function Zd(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var a=n.eventTimes;for(n=n.expirationTimes;0<t;){var i=31-_e(t),s=1<<i;e[i]=0,a[i]=-1,n[i]=-1,t&=~s}}function Ds(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var a=31-_e(t),i=1<<a;i&e|n[a]&e&&(n[a]|=e),t&=~i}}var Tn=0;function Hl(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Ul,Ns,Fl,ql,Vl,Ls=!1,fi=[],tt=null,at=null,it=null,xa=new Map,$a=new Map,st=[],nc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function zl(n,e){switch(n){case"focusin":case"focusout":tt=null;break;case"dragenter":case"dragleave":at=null;break;case"mouseover":case"mouseout":it=null;break;case"pointerover":case"pointerout":xa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":$a.delete(e.pointerId)}}function Ca(n,e,t,a,i,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:a,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Oa(e),e!==null&&Ns(e)),n):(n.eventSystemFlags|=a,e=n.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),n)}function ec(n,e,t,a,i){switch(e){case"focusin":return tt=Ca(tt,n,e,t,a,i),!0;case"dragenter":return at=Ca(at,n,e,t,a,i),!0;case"mouseover":return it=Ca(it,n,e,t,a,i),!0;case"pointerover":var s=i.pointerId;return xa.set(s,Ca(xa.get(s)||null,n,e,t,a,i)),!0;case"gotpointercapture":return s=i.pointerId,$a.set(s,Ca($a.get(s)||null,n,e,t,a,i)),!0}return!1}function Wl(n){var e=Ct(n.target);if(e!==null){var t=$t(e);if(t!==null){if(e=t.tag,e===13){if(e=Nl(t),e!==null){n.blockedOn=e,Vl(n.priority,function(){Fl(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function gi(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=Es(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var a=new t.constructor(t.type,t);ws=a,t.target.dispatchEvent(a),ws=null}else return e=Oa(t),e!==null&&Ns(e),n.blockedOn=t,!1;e.shift()}return!0}function Gl(n,e,t){gi(n)&&t.delete(e)}function tc(){Ls=!1,tt!==null&&gi(tt)&&(tt=null),at!==null&&gi(at)&&(at=null),it!==null&&gi(it)&&(it=null),xa.forEach(Gl),$a.forEach(Gl)}function Aa(n,e){n.blockedOn===e&&(n.blockedOn=null,Ls||(Ls=!0,u.unstable_scheduleCallback(u.unstable_NormalPriority,tc)))}function Ta(n){function e(i){return Aa(i,n)}if(0<fi.length){Aa(fi[0],n);for(var t=1;t<fi.length;t++){var a=fi[t];a.blockedOn===n&&(a.blockedOn=null)}}for(tt!==null&&Aa(tt,n),at!==null&&Aa(at,n),it!==null&&Aa(it,n),xa.forEach(e),$a.forEach(e),t=0;t<st.length;t++)a=st[t],a.blockedOn===n&&(a.blockedOn=null);for(;0<st.length&&(t=st[0],t.blockedOn===null);)Wl(t),t.blockedOn===null&&st.shift()}var qt=hn.ReactCurrentBatchConfig,hi=!0;function ac(n,e,t,a){var i=Tn,s=qt.transition;qt.transition=null;try{Tn=1,Rs(n,e,t,a)}finally{Tn=i,qt.transition=s}}function ic(n,e,t,a){var i=Tn,s=qt.transition;qt.transition=null;try{Tn=4,Rs(n,e,t,a)}finally{Tn=i,qt.transition=s}}function Rs(n,e,t,a){if(hi){var i=Es(n,e,t,a);if(i===null)Xs(n,e,a,ki,t),zl(n,a);else if(ec(i,n,e,t,a))a.stopPropagation();else if(zl(n,a),e&4&&-1<nc.indexOf(n)){for(;i!==null;){var s=Oa(i);if(s!==null&&Ul(s),s=Es(n,e,t,a),s===null&&Xs(n,e,a,ki,t),s===i)break;i=s}i!==null&&a.stopPropagation()}else Xs(n,e,a,null,t)}}var ki=null;function Es(n,e,t,a){if(ki=null,n=xs(a),n=Ct(n),n!==null)if(e=$t(n),e===null)n=null;else if(t=e.tag,t===13){if(n=Nl(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return ki=n,null}function Yl(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Vd()){case _s:return 1;case Kl:return 4;case ui:case zd:return 16;case Ol:return 536870912;default:return 16}default:return 16}}var rt=null,Ps=null,vi=null;function Ql(){if(vi)return vi;var n,e=Ps,t=e.length,a,i="value"in rt?rt.value:rt.textContent,s=i.length;for(n=0;n<t&&e[n]===i[n];n++);var r=t-n;for(a=1;a<=r&&e[t-a]===i[s-a];a++);return vi=i.slice(n,1<a?1-a:void 0)}function bi(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function yi(){return!0}function Jl(){return!1}function ge(n){function e(t,a,i,s,r){this._reactName=t,this._targetInst=i,this.type=a,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var d in n)n.hasOwnProperty(d)&&(t=n[d],this[d]=t?t(s):s[d]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?yi:Jl,this.isPropagationStopped=Jl,this}return H(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=yi)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=yi)},persist:function(){},isPersistent:yi}),e}var Vt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bs=ge(Vt),_a=H({},Vt,{view:0,detail:0}),sc=ge(_a),Ks,Os,Ma,Si=H({},_a,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hs,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Ma&&(Ma&&n.type==="mousemove"?(Ks=n.screenX-Ma.screenX,Os=n.screenY-Ma.screenY):Os=Ks=0,Ma=n),Ks)},movementY:function(n){return"movementY"in n?n.movementY:Os}}),Xl=ge(Si),rc=H({},Si,{dataTransfer:0}),lc=ge(rc),oc=H({},_a,{relatedTarget:0}),Is=ge(oc),uc=H({},Vt,{animationName:0,elapsedTime:0,pseudoElement:0}),dc=ge(uc),cc=H({},Vt,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),mc=ge(cc),pc=H({},Vt,{data:0}),Zl=ge(pc),fc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kc(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=hc[n])?!!e[n]:!1}function Hs(){return kc}var vc=H({},_a,{key:function(n){if(n.key){var e=fc[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=bi(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?gc[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hs,charCode:function(n){return n.type==="keypress"?bi(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?bi(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),bc=ge(vc),yc=H({},Si,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),no=ge(yc),Sc=H({},_a,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hs}),wc=ge(Sc),xc=H({},Vt,{propertyName:0,elapsedTime:0,pseudoElement:0}),$c=ge(xc),Cc=H({},Si,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Ac=ge(Cc),Tc=[9,13,27,32],Us=y&&"CompositionEvent"in window,ja=null;y&&"documentMode"in document&&(ja=document.documentMode);var _c=y&&"TextEvent"in window&&!ja,eo=y&&(!Us||ja&&8<ja&&11>=ja),to=" ",ao=!1;function io(n,e){switch(n){case"keyup":return Tc.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function so(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var zt=!1;function Mc(n,e){switch(n){case"compositionend":return so(e);case"keypress":return e.which!==32?null:(ao=!0,to);case"textInput":return n=e.data,n===to&&ao?null:n;default:return null}}function jc(n,e){if(zt)return n==="compositionend"||!Us&&io(n,e)?(n=Ql(),vi=Ps=rt=null,zt=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return eo&&e.locale!=="ko"?null:e.data;default:return null}}var Dc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ro(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!Dc[n.type]:e==="textarea"}function lo(n,e,t,a){Tl(a),e=Ai(e,"onChange"),0<e.length&&(t=new Bs("onChange","change",null,t,a),n.push({event:t,listeners:e}))}var Da=null,Na=null;function Nc(n){Ao(n,0)}function wi(n){var e=Jt(n);if(Bn(e))return n}function Lc(n,e){if(n==="change")return e}var oo=!1;if(y){var Fs;if(y){var qs="oninput"in document;if(!qs){var uo=document.createElement("div");uo.setAttribute("oninput","return;"),qs=typeof uo.oninput=="function"}Fs=qs}else Fs=!1;oo=Fs&&(!document.documentMode||9<document.documentMode)}function co(){Da&&(Da.detachEvent("onpropertychange",mo),Na=Da=null)}function mo(n){if(n.propertyName==="value"&&wi(Na)){var e=[];lo(e,Na,n,xs(n)),Dl(Nc,e)}}function Rc(n,e,t){n==="focusin"?(co(),Da=e,Na=t,Da.attachEvent("onpropertychange",mo)):n==="focusout"&&co()}function Ec(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return wi(Na)}function Pc(n,e){if(n==="click")return wi(e)}function Bc(n,e){if(n==="input"||n==="change")return wi(e)}function Kc(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var Me=typeof Object.is=="function"?Object.is:Kc;function La(n,e){if(Me(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),a=Object.keys(e);if(t.length!==a.length)return!1;for(a=0;a<t.length;a++){var i=t[a];if(!$.call(e,i)||!Me(n[i],e[i]))return!1}return!0}function po(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function fo(n,e){var t=po(n);n=0;for(var a;t;){if(t.nodeType===3){if(a=n+t.textContent.length,n<=e&&a>=e)return{node:t,offset:e-n};n=a}n:{for(;t;){if(t.nextSibling){t=t.nextSibling;break n}t=t.parentNode}t=void 0}t=po(t)}}function go(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?go(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function ho(){for(var n=window,e=In();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=In(n.document)}return e}function Vs(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function Oc(n){var e=ho(),t=n.focusedElem,a=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&go(t.ownerDocument.documentElement,t)){if(a!==null&&Vs(t)){if(e=a.start,n=a.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var i=t.textContent.length,s=Math.min(a.start,i);a=a.end===void 0?s:Math.min(a.end,i),!n.extend&&s>a&&(i=a,a=s,s=i),i=fo(t,s);var r=fo(t,a);i&&r&&(n.rangeCount!==1||n.anchorNode!==i.node||n.anchorOffset!==i.offset||n.focusNode!==r.node||n.focusOffset!==r.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),n.removeAllRanges(),s>a?(n.addRange(e),n.extend(r.node,r.offset)):(e.setEnd(r.node,r.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Ic=y&&"documentMode"in document&&11>=document.documentMode,Wt=null,zs=null,Ra=null,Ws=!1;function ko(n,e,t){var a=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Ws||Wt==null||Wt!==In(a)||(a=Wt,"selectionStart"in a&&Vs(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Ra&&La(Ra,a)||(Ra=a,a=Ai(zs,"onSelect"),0<a.length&&(e=new Bs("onSelect","select",null,e,t),n.push({event:e,listeners:a}),e.target=Wt)))}function xi(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var Gt={animationend:xi("Animation","AnimationEnd"),animationiteration:xi("Animation","AnimationIteration"),animationstart:xi("Animation","AnimationStart"),transitionend:xi("Transition","TransitionEnd")},Gs={},vo={};y&&(vo=document.createElement("div").style,"AnimationEvent"in window||(delete Gt.animationend.animation,delete Gt.animationiteration.animation,delete Gt.animationstart.animation),"TransitionEvent"in window||delete Gt.transitionend.transition);function $i(n){if(Gs[n])return Gs[n];if(!Gt[n])return n;var e=Gt[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in vo)return Gs[n]=e[t];return n}var bo=$i("animationend"),yo=$i("animationiteration"),So=$i("animationstart"),wo=$i("transitionend"),xo=new Map,$o="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function lt(n,e){xo.set(n,e),w(e,[n])}for(var Ys=0;Ys<$o.length;Ys++){var Qs=$o[Ys],Hc=Qs.toLowerCase(),Uc=Qs[0].toUpperCase()+Qs.slice(1);lt(Hc,"on"+Uc)}lt(bo,"onAnimationEnd"),lt(yo,"onAnimationIteration"),lt(So,"onAnimationStart"),lt("dblclick","onDoubleClick"),lt("focusin","onFocus"),lt("focusout","onBlur"),lt(wo,"onTransitionEnd"),A("onMouseEnter",["mouseout","mouseover"]),A("onMouseLeave",["mouseout","mouseover"]),A("onPointerEnter",["pointerout","pointerover"]),A("onPointerLeave",["pointerout","pointerover"]),w("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),w("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),w("onBeforeInput",["compositionend","keypress","textInput","paste"]),w("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),w("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),w("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ea="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fc=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ea));function Co(n,e,t){var a=n.type||"unknown-event";n.currentTarget=t,Hd(a,e,void 0,n),n.currentTarget=null}function Ao(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var a=n[t],i=a.event;a=a.listeners;n:{var s=void 0;if(e)for(var r=a.length-1;0<=r;r--){var d=a[r],f=d.instance,S=d.currentTarget;if(d=d.listener,f!==s&&i.isPropagationStopped())break n;Co(i,d,S),s=f}else for(r=0;r<a.length;r++){if(d=a[r],f=d.instance,S=d.currentTarget,d=d.listener,f!==s&&i.isPropagationStopped())break n;Co(i,d,S),s=f}}}if(oi)throw n=Ts,oi=!1,Ts=null,n}function Dn(n,e){var t=e[ir];t===void 0&&(t=e[ir]=new Set);var a=n+"__bubble";t.has(a)||(To(e,n,2,!1),t.add(a))}function Js(n,e,t){var a=0;e&&(a|=4),To(t,n,a,e)}var Ci="_reactListening"+Math.random().toString(36).slice(2);function Pa(n){if(!n[Ci]){n[Ci]=!0,C.forEach(function(t){t!=="selectionchange"&&(Fc.has(t)||Js(t,!1,n),Js(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Ci]||(e[Ci]=!0,Js("selectionchange",!1,e))}}function To(n,e,t,a){switch(Yl(e)){case 1:var i=ac;break;case 4:i=ic;break;default:i=Rs}t=i.bind(null,e,t,n),i=void 0,!As||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),a?i!==void 0?n.addEventListener(e,t,{capture:!0,passive:i}):n.addEventListener(e,t,!0):i!==void 0?n.addEventListener(e,t,{passive:i}):n.addEventListener(e,t,!1)}function Xs(n,e,t,a,i){var s=a;if((e&1)===0&&(e&2)===0&&a!==null)n:for(;;){if(a===null)return;var r=a.tag;if(r===3||r===4){var d=a.stateNode.containerInfo;if(d===i||d.nodeType===8&&d.parentNode===i)break;if(r===4)for(r=a.return;r!==null;){var f=r.tag;if((f===3||f===4)&&(f=r.stateNode.containerInfo,f===i||f.nodeType===8&&f.parentNode===i))return;r=r.return}for(;d!==null;){if(r=Ct(d),r===null)return;if(f=r.tag,f===5||f===6){a=s=r;continue n}d=d.parentNode}}a=a.return}Dl(function(){var S=s,N=xs(t),E=[];n:{var D=xo.get(n);if(D!==void 0){var F=Bs,Y=n;switch(n){case"keypress":if(bi(t)===0)break n;case"keydown":case"keyup":F=bc;break;case"focusin":Y="focus",F=Is;break;case"focusout":Y="blur",F=Is;break;case"beforeblur":case"afterblur":F=Is;break;case"click":if(t.button===2)break n;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":F=Xl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":F=lc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":F=wc;break;case bo:case yo:case So:F=dc;break;case wo:F=$c;break;case"scroll":F=sc;break;case"wheel":F=Ac;break;case"copy":case"cut":case"paste":F=mc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":F=no}var Q=(e&4)!==0,Un=!Q&&n==="scroll",v=Q?D!==null?D+"Capture":null:D;Q=[];for(var h=S,b;h!==null;){b=h;var O=b.stateNode;if(b.tag===5&&O!==null&&(b=O,v!==null&&(O=va(h,v),O!=null&&Q.push(Ba(h,O,b)))),Un)break;h=h.return}0<Q.length&&(D=new F(D,Y,null,t,N),E.push({event:D,listeners:Q}))}}if((e&7)===0){n:{if(D=n==="mouseover"||n==="pointerover",F=n==="mouseout"||n==="pointerout",D&&t!==ws&&(Y=t.relatedTarget||t.fromElement)&&(Ct(Y)||Y[Ve]))break n;if((F||D)&&(D=N.window===N?N:(D=N.ownerDocument)?D.defaultView||D.parentWindow:window,F?(Y=t.relatedTarget||t.toElement,F=S,Y=Y?Ct(Y):null,Y!==null&&(Un=$t(Y),Y!==Un||Y.tag!==5&&Y.tag!==6)&&(Y=null)):(F=null,Y=S),F!==Y)){if(Q=Xl,O="onMouseLeave",v="onMouseEnter",h="mouse",(n==="pointerout"||n==="pointerover")&&(Q=no,O="onPointerLeave",v="onPointerEnter",h="pointer"),Un=F==null?D:Jt(F),b=Y==null?D:Jt(Y),D=new Q(O,h+"leave",F,t,N),D.target=Un,D.relatedTarget=b,O=null,Ct(N)===S&&(Q=new Q(v,h+"enter",Y,t,N),Q.target=b,Q.relatedTarget=Un,O=Q),Un=O,F&&Y)e:{for(Q=F,v=Y,h=0,b=Q;b;b=Yt(b))h++;for(b=0,O=v;O;O=Yt(O))b++;for(;0<h-b;)Q=Yt(Q),h--;for(;0<b-h;)v=Yt(v),b--;for(;h--;){if(Q===v||v!==null&&Q===v.alternate)break e;Q=Yt(Q),v=Yt(v)}Q=null}else Q=null;F!==null&&_o(E,D,F,Q,!1),Y!==null&&Un!==null&&_o(E,Un,Y,Q,!0)}}n:{if(D=S?Jt(S):window,F=D.nodeName&&D.nodeName.toLowerCase(),F==="select"||F==="input"&&D.type==="file")var J=Lc;else if(ro(D))if(oo)J=Bc;else{J=Ec;var an=Rc}else(F=D.nodeName)&&F.toLowerCase()==="input"&&(D.type==="checkbox"||D.type==="radio")&&(J=Pc);if(J&&(J=J(n,S))){lo(E,J,t,N);break n}an&&an(n,D,S),n==="focusout"&&(an=D._wrapperState)&&an.controlled&&D.type==="number"&&It(D,"number",D.value)}switch(an=S?Jt(S):window,n){case"focusin":(ro(an)||an.contentEditable==="true")&&(Wt=an,zs=S,Ra=null);break;case"focusout":Ra=zs=Wt=null;break;case"mousedown":Ws=!0;break;case"contextmenu":case"mouseup":case"dragend":Ws=!1,ko(E,t,N);break;case"selectionchange":if(Ic)break;case"keydown":case"keyup":ko(E,t,N)}var sn;if(Us)n:{switch(n){case"compositionstart":var on="onCompositionStart";break n;case"compositionend":on="onCompositionEnd";break n;case"compositionupdate":on="onCompositionUpdate";break n}on=void 0}else zt?io(n,t)&&(on="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(on="onCompositionStart");on&&(eo&&t.locale!=="ko"&&(zt||on!=="onCompositionStart"?on==="onCompositionEnd"&&zt&&(sn=Ql()):(rt=N,Ps="value"in rt?rt.value:rt.textContent,zt=!0)),an=Ai(S,on),0<an.length&&(on=new Zl(on,n,null,t,N),E.push({event:on,listeners:an}),sn?on.data=sn:(sn=so(t),sn!==null&&(on.data=sn)))),(sn=_c?Mc(n,t):jc(n,t))&&(S=Ai(S,"onBeforeInput"),0<S.length&&(N=new Zl("onBeforeInput","beforeinput",null,t,N),E.push({event:N,listeners:S}),N.data=sn))}Ao(E,e)})}function Ba(n,e,t){return{instance:n,listener:e,currentTarget:t}}function Ai(n,e){for(var t=e+"Capture",a=[];n!==null;){var i=n,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=va(n,t),s!=null&&a.unshift(Ba(n,s,i)),s=va(n,e),s!=null&&a.push(Ba(n,s,i))),n=n.return}return a}function Yt(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function _o(n,e,t,a,i){for(var s=e._reactName,r=[];t!==null&&t!==a;){var d=t,f=d.alternate,S=d.stateNode;if(f!==null&&f===a)break;d.tag===5&&S!==null&&(d=S,i?(f=va(t,s),f!=null&&r.unshift(Ba(t,f,d))):i||(f=va(t,s),f!=null&&r.push(Ba(t,f,d)))),t=t.return}r.length!==0&&n.push({event:e,listeners:r})}var qc=/\r\n?/g,Vc=/\u0000|\uFFFD/g;function Mo(n){return(typeof n=="string"?n:""+n).replace(qc,`
`).replace(Vc,"")}function Ti(n,e,t){if(e=Mo(e),Mo(n)!==e&&t)throw Error(m(425))}function _i(){}var Zs=null,nr=null;function er(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var tr=typeof setTimeout=="function"?setTimeout:void 0,zc=typeof clearTimeout=="function"?clearTimeout:void 0,jo=typeof Promise=="function"?Promise:void 0,Wc=typeof queueMicrotask=="function"?queueMicrotask:typeof jo!="undefined"?function(n){return jo.resolve(null).then(n).catch(Gc)}:tr;function Gc(n){setTimeout(function(){throw n})}function ar(n,e){var t=e,a=0;do{var i=t.nextSibling;if(n.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(a===0){n.removeChild(i),Ta(e);return}a--}else t!=="$"&&t!=="$?"&&t!=="$!"||a++;t=i}while(t);Ta(e)}function ot(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function Do(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var Qt=Math.random().toString(36).slice(2),Be="__reactFiber$"+Qt,Ka="__reactProps$"+Qt,Ve="__reactContainer$"+Qt,ir="__reactEvents$"+Qt,Yc="__reactListeners$"+Qt,Qc="__reactHandles$"+Qt;function Ct(n){var e=n[Be];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Ve]||t[Be]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=Do(n);n!==null;){if(t=n[Be])return t;n=Do(n)}return e}n=t,t=n.parentNode}return null}function Oa(n){return n=n[Be]||n[Ve],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Jt(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(m(33))}function Mi(n){return n[Ka]||null}var sr=[],Xt=-1;function ut(n){return{current:n}}function Nn(n){0>Xt||(n.current=sr[Xt],sr[Xt]=null,Xt--)}function Mn(n,e){Xt++,sr[Xt]=n.current,n.current=e}var dt={},ee=ut(dt),oe=ut(!1),At=dt;function Zt(n,e){var t=n.type.contextTypes;if(!t)return dt;var a=n.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===e)return a.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in t)i[s]=e[s];return a&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=i),i}function ue(n){return n=n.childContextTypes,n!=null}function ji(){Nn(oe),Nn(ee)}function No(n,e,t){if(ee.current!==dt)throw Error(m(168));Mn(ee,e),Mn(oe,t)}function Lo(n,e,t){var a=n.stateNode;if(e=e.childContextTypes,typeof a.getChildContext!="function")return t;a=a.getChildContext();for(var i in a)if(!(i in e))throw Error(m(108,mn(n)||"Unknown",i));return H({},t,a)}function Di(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||dt,At=ee.current,Mn(ee,n),Mn(oe,oe.current),!0}function Ro(n,e,t){var a=n.stateNode;if(!a)throw Error(m(169));t?(n=Lo(n,e,At),a.__reactInternalMemoizedMergedChildContext=n,Nn(oe),Nn(ee),Mn(ee,n)):Nn(oe),Mn(oe,t)}var ze=null,Ni=!1,rr=!1;function Eo(n){ze===null?ze=[n]:ze.push(n)}function Jc(n){Ni=!0,Eo(n)}function ct(){if(!rr&&ze!==null){rr=!0;var n=0,e=Tn;try{var t=ze;for(Tn=1;n<t.length;n++){var a=t[n];do a=a(!0);while(a!==null)}ze=null,Ni=!1}catch(i){throw ze!==null&&(ze=ze.slice(n+1)),Pl(_s,ct),i}finally{Tn=e,rr=!1}}return null}var na=[],ea=0,Li=null,Ri=0,be=[],ye=0,Tt=null,We=1,Ge="";function _t(n,e){na[ea++]=Ri,na[ea++]=Li,Li=n,Ri=e}function Po(n,e,t){be[ye++]=We,be[ye++]=Ge,be[ye++]=Tt,Tt=n;var a=We;n=Ge;var i=32-_e(a)-1;a&=~(1<<i),t+=1;var s=32-_e(e)+i;if(30<s){var r=i-i%5;s=(a&(1<<r)-1).toString(32),a>>=r,i-=r,We=1<<32-_e(e)+i|t<<i|a,Ge=s+n}else We=1<<s|t<<i|a,Ge=n}function lr(n){n.return!==null&&(_t(n,1),Po(n,1,0))}function or(n){for(;n===Li;)Li=na[--ea],na[ea]=null,Ri=na[--ea],na[ea]=null;for(;n===Tt;)Tt=be[--ye],be[ye]=null,Ge=be[--ye],be[ye]=null,We=be[--ye],be[ye]=null}var he=null,ke=null,Ln=!1,je=null;function Bo(n,e){var t=$e(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function Ko(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,he=n,ke=ot(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,he=n,ke=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Tt!==null?{id:We,overflow:Ge}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=$e(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,he=n,ke=null,!0):!1;default:return!1}}function ur(n){return(n.mode&1)!==0&&(n.flags&128)===0}function dr(n){if(Ln){var e=ke;if(e){var t=e;if(!Ko(n,e)){if(ur(n))throw Error(m(418));e=ot(t.nextSibling);var a=he;e&&Ko(n,e)?Bo(a,t):(n.flags=n.flags&-4097|2,Ln=!1,he=n)}}else{if(ur(n))throw Error(m(418));n.flags=n.flags&-4097|2,Ln=!1,he=n}}}function Oo(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;he=n}function Ei(n){if(n!==he)return!1;if(!Ln)return Oo(n),Ln=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!er(n.type,n.memoizedProps)),e&&(e=ke)){if(ur(n))throw Io(),Error(m(418));for(;e;)Bo(n,e),e=ot(e.nextSibling)}if(Oo(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(m(317));n:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){ke=ot(n.nextSibling);break n}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}ke=null}}else ke=he?ot(n.stateNode.nextSibling):null;return!0}function Io(){for(var n=ke;n;)n=ot(n.nextSibling)}function ta(){ke=he=null,Ln=!1}function cr(n){je===null?je=[n]:je.push(n)}var Xc=hn.ReactCurrentBatchConfig;function Ia(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(m(309));var a=t.stateNode}if(!a)throw Error(m(147,n));var i=a,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(r){var d=i.refs;r===null?delete d[s]:d[s]=r},e._stringRef=s,e)}if(typeof n!="string")throw Error(m(284));if(!t._owner)throw Error(m(290,n))}return n}function Pi(n,e){throw n=Object.prototype.toString.call(e),Error(m(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function Ho(n){var e=n._init;return e(n._payload)}function Uo(n){function e(v,h){if(n){var b=v.deletions;b===null?(v.deletions=[h],v.flags|=16):b.push(h)}}function t(v,h){if(!n)return null;for(;h!==null;)e(v,h),h=h.sibling;return null}function a(v,h){for(v=new Map;h!==null;)h.key!==null?v.set(h.key,h):v.set(h.index,h),h=h.sibling;return v}function i(v,h){return v=bt(v,h),v.index=0,v.sibling=null,v}function s(v,h,b){return v.index=b,n?(b=v.alternate,b!==null?(b=b.index,b<h?(v.flags|=2,h):b):(v.flags|=2,h)):(v.flags|=1048576,h)}function r(v){return n&&v.alternate===null&&(v.flags|=2),v}function d(v,h,b,O){return h===null||h.tag!==6?(h=tl(b,v.mode,O),h.return=v,h):(h=i(h,b),h.return=v,h)}function f(v,h,b,O){var J=b.type;return J===pn?N(v,h,b.props.children,O,b.key):h!==null&&(h.elementType===J||typeof J=="object"&&J!==null&&J.$$typeof===j&&Ho(J)===h.type)?(O=i(h,b.props),O.ref=Ia(v,h,b),O.return=v,O):(O=rs(b.type,b.key,b.props,null,v.mode,O),O.ref=Ia(v,h,b),O.return=v,O)}function S(v,h,b,O){return h===null||h.tag!==4||h.stateNode.containerInfo!==b.containerInfo||h.stateNode.implementation!==b.implementation?(h=al(b,v.mode,O),h.return=v,h):(h=i(h,b.children||[]),h.return=v,h)}function N(v,h,b,O,J){return h===null||h.tag!==7?(h=Pt(b,v.mode,O,J),h.return=v,h):(h=i(h,b),h.return=v,h)}function E(v,h,b){if(typeof h=="string"&&h!==""||typeof h=="number")return h=tl(""+h,v.mode,b),h.return=v,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case fn:return b=rs(h.type,h.key,h.props,null,v.mode,b),b.ref=Ia(v,null,h),b.return=v,b;case Cn:return h=al(h,v.mode,b),h.return=v,h;case j:var O=h._init;return E(v,O(h._payload),b)}if(Ae(h)||V(h))return h=Pt(h,v.mode,b,null),h.return=v,h;Pi(v,h)}return null}function D(v,h,b,O){var J=h!==null?h.key:null;if(typeof b=="string"&&b!==""||typeof b=="number")return J!==null?null:d(v,h,""+b,O);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case fn:return b.key===J?f(v,h,b,O):null;case Cn:return b.key===J?S(v,h,b,O):null;case j:return J=b._init,D(v,h,J(b._payload),O)}if(Ae(b)||V(b))return J!==null?null:N(v,h,b,O,null);Pi(v,b)}return null}function F(v,h,b,O,J){if(typeof O=="string"&&O!==""||typeof O=="number")return v=v.get(b)||null,d(h,v,""+O,J);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case fn:return v=v.get(O.key===null?b:O.key)||null,f(h,v,O,J);case Cn:return v=v.get(O.key===null?b:O.key)||null,S(h,v,O,J);case j:var an=O._init;return F(v,h,b,an(O._payload),J)}if(Ae(O)||V(O))return v=v.get(b)||null,N(h,v,O,J,null);Pi(h,O)}return null}function Y(v,h,b,O){for(var J=null,an=null,sn=h,on=h=0,Jn=null;sn!==null&&on<b.length;on++){sn.index>on?(Jn=sn,sn=null):Jn=sn.sibling;var $n=D(v,sn,b[on],O);if($n===null){sn===null&&(sn=Jn);break}n&&sn&&$n.alternate===null&&e(v,sn),h=s($n,h,on),an===null?J=$n:an.sibling=$n,an=$n,sn=Jn}if(on===b.length)return t(v,sn),Ln&&_t(v,on),J;if(sn===null){for(;on<b.length;on++)sn=E(v,b[on],O),sn!==null&&(h=s(sn,h,on),an===null?J=sn:an.sibling=sn,an=sn);return Ln&&_t(v,on),J}for(sn=a(v,sn);on<b.length;on++)Jn=F(sn,v,on,b[on],O),Jn!==null&&(n&&Jn.alternate!==null&&sn.delete(Jn.key===null?on:Jn.key),h=s(Jn,h,on),an===null?J=Jn:an.sibling=Jn,an=Jn);return n&&sn.forEach(function(yt){return e(v,yt)}),Ln&&_t(v,on),J}function Q(v,h,b,O){var J=V(b);if(typeof J!="function")throw Error(m(150));if(b=J.call(b),b==null)throw Error(m(151));for(var an=J=null,sn=h,on=h=0,Jn=null,$n=b.next();sn!==null&&!$n.done;on++,$n=b.next()){sn.index>on?(Jn=sn,sn=null):Jn=sn.sibling;var yt=D(v,sn,$n.value,O);if(yt===null){sn===null&&(sn=Jn);break}n&&sn&&yt.alternate===null&&e(v,sn),h=s(yt,h,on),an===null?J=yt:an.sibling=yt,an=yt,sn=Jn}if($n.done)return t(v,sn),Ln&&_t(v,on),J;if(sn===null){for(;!$n.done;on++,$n=b.next())$n=E(v,$n.value,O),$n!==null&&(h=s($n,h,on),an===null?J=$n:an.sibling=$n,an=$n);return Ln&&_t(v,on),J}for(sn=a(v,sn);!$n.done;on++,$n=b.next())$n=F(sn,v,on,$n.value,O),$n!==null&&(n&&$n.alternate!==null&&sn.delete($n.key===null?on:$n.key),h=s($n,h,on),an===null?J=$n:an.sibling=$n,an=$n);return n&&sn.forEach(function(Dm){return e(v,Dm)}),Ln&&_t(v,on),J}function Un(v,h,b,O){if(typeof b=="object"&&b!==null&&b.type===pn&&b.key===null&&(b=b.props.children),typeof b=="object"&&b!==null){switch(b.$$typeof){case fn:n:{for(var J=b.key,an=h;an!==null;){if(an.key===J){if(J=b.type,J===pn){if(an.tag===7){t(v,an.sibling),h=i(an,b.props.children),h.return=v,v=h;break n}}else if(an.elementType===J||typeof J=="object"&&J!==null&&J.$$typeof===j&&Ho(J)===an.type){t(v,an.sibling),h=i(an,b.props),h.ref=Ia(v,an,b),h.return=v,v=h;break n}t(v,an);break}else e(v,an);an=an.sibling}b.type===pn?(h=Pt(b.props.children,v.mode,O,b.key),h.return=v,v=h):(O=rs(b.type,b.key,b.props,null,v.mode,O),O.ref=Ia(v,h,b),O.return=v,v=O)}return r(v);case Cn:n:{for(an=b.key;h!==null;){if(h.key===an)if(h.tag===4&&h.stateNode.containerInfo===b.containerInfo&&h.stateNode.implementation===b.implementation){t(v,h.sibling),h=i(h,b.children||[]),h.return=v,v=h;break n}else{t(v,h);break}else e(v,h);h=h.sibling}h=al(b,v.mode,O),h.return=v,v=h}return r(v);case j:return an=b._init,Un(v,h,an(b._payload),O)}if(Ae(b))return Y(v,h,b,O);if(V(b))return Q(v,h,b,O);Pi(v,b)}return typeof b=="string"&&b!==""||typeof b=="number"?(b=""+b,h!==null&&h.tag===6?(t(v,h.sibling),h=i(h,b),h.return=v,v=h):(t(v,h),h=tl(b,v.mode,O),h.return=v,v=h),r(v)):t(v,h)}return Un}var aa=Uo(!0),Fo=Uo(!1),Bi=ut(null),Ki=null,ia=null,mr=null;function pr(){mr=ia=Ki=null}function fr(n){var e=Bi.current;Nn(Bi),n._currentValue=e}function gr(n,e,t){for(;n!==null;){var a=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),n===t)break;n=n.return}}function sa(n,e){Ki=n,mr=ia=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&e)!==0&&(de=!0),n.firstContext=null)}function Se(n){var e=n._currentValue;if(mr!==n)if(n={context:n,memoizedValue:e,next:null},ia===null){if(Ki===null)throw Error(m(308));ia=n,Ki.dependencies={lanes:0,firstContext:n}}else ia=ia.next=n;return e}var Mt=null;function hr(n){Mt===null?Mt=[n]:Mt.push(n)}function qo(n,e,t,a){var i=e.interleaved;return i===null?(t.next=t,hr(e)):(t.next=i.next,i.next=t),e.interleaved=t,Ye(n,a)}function Ye(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var mt=!1;function kr(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Vo(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Qe(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function pt(n,e,t){var a=n.updateQueue;if(a===null)return null;if(a=a.shared,(Sn&2)!==0){var i=a.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),a.pending=e,Ye(n,t)}return i=a.interleaved,i===null?(e.next=e,hr(a)):(e.next=i.next,i.next=e),a.interleaved=e,Ye(n,t)}function Oi(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var a=e.lanes;a&=n.pendingLanes,t|=a,e.lanes=t,Ds(n,t)}}function zo(n,e){var t=n.updateQueue,a=n.alternate;if(a!==null&&(a=a.updateQueue,t===a)){var i=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var r={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?i=s=r:s=s.next=r,t=t.next}while(t!==null);s===null?i=s=e:s=s.next=e}else i=s=e;t={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:a.shared,effects:a.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function Ii(n,e,t,a){var i=n.updateQueue;mt=!1;var s=i.firstBaseUpdate,r=i.lastBaseUpdate,d=i.shared.pending;if(d!==null){i.shared.pending=null;var f=d,S=f.next;f.next=null,r===null?s=S:r.next=S,r=f;var N=n.alternate;N!==null&&(N=N.updateQueue,d=N.lastBaseUpdate,d!==r&&(d===null?N.firstBaseUpdate=S:d.next=S,N.lastBaseUpdate=f))}if(s!==null){var E=i.baseState;r=0,N=S=f=null,d=s;do{var D=d.lane,F=d.eventTime;if((a&D)===D){N!==null&&(N=N.next={eventTime:F,lane:0,tag:d.tag,payload:d.payload,callback:d.callback,next:null});n:{var Y=n,Q=d;switch(D=e,F=t,Q.tag){case 1:if(Y=Q.payload,typeof Y=="function"){E=Y.call(F,E,D);break n}E=Y;break n;case 3:Y.flags=Y.flags&-65537|128;case 0:if(Y=Q.payload,D=typeof Y=="function"?Y.call(F,E,D):Y,D==null)break n;E=H({},E,D);break n;case 2:mt=!0}}d.callback!==null&&d.lane!==0&&(n.flags|=64,D=i.effects,D===null?i.effects=[d]:D.push(d))}else F={eventTime:F,lane:D,tag:d.tag,payload:d.payload,callback:d.callback,next:null},N===null?(S=N=F,f=E):N=N.next=F,r|=D;if(d=d.next,d===null){if(d=i.shared.pending,d===null)break;D=d,d=D.next,D.next=null,i.lastBaseUpdate=D,i.shared.pending=null}}while(!0);if(N===null&&(f=E),i.baseState=f,i.firstBaseUpdate=S,i.lastBaseUpdate=N,e=i.shared.interleaved,e!==null){i=e;do r|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Nt|=r,n.lanes=r,n.memoizedState=E}}function Wo(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var a=n[e],i=a.callback;if(i!==null){if(a.callback=null,a=t,typeof i!="function")throw Error(m(191,i));i.call(a)}}}var Ha={},Ke=ut(Ha),Ua=ut(Ha),Fa=ut(Ha);function jt(n){if(n===Ha)throw Error(m(174));return n}function vr(n,e){switch(Mn(Fa,e),Mn(Ua,n),Mn(Ke,Ha),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ka(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=ka(e,n)}Nn(Ke),Mn(Ke,e)}function ra(){Nn(Ke),Nn(Ua),Nn(Fa)}function Go(n){jt(Fa.current);var e=jt(Ke.current),t=ka(e,n.type);e!==t&&(Mn(Ua,n),Mn(Ke,t))}function br(n){Ua.current===n&&(Nn(Ke),Nn(Ua))}var Rn=ut(0);function Hi(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var yr=[];function Sr(){for(var n=0;n<yr.length;n++)yr[n]._workInProgressVersionPrimary=null;yr.length=0}var Ui=hn.ReactCurrentDispatcher,wr=hn.ReactCurrentBatchConfig,Dt=0,En=null,Wn=null,Yn=null,Fi=!1,qa=!1,Va=0,Zc=0;function te(){throw Error(m(321))}function xr(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!Me(n[t],e[t]))return!1;return!0}function $r(n,e,t,a,i,s){if(Dt=s,En=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ui.current=n===null||n.memoizedState===null?am:im,n=t(a,i),qa){s=0;do{if(qa=!1,Va=0,25<=s)throw Error(m(301));s+=1,Yn=Wn=null,e.updateQueue=null,Ui.current=sm,n=t(a,i)}while(qa)}if(Ui.current=zi,e=Wn!==null&&Wn.next!==null,Dt=0,Yn=Wn=En=null,Fi=!1,e)throw Error(m(300));return n}function Cr(){var n=Va!==0;return Va=0,n}function Oe(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Yn===null?En.memoizedState=Yn=n:Yn=Yn.next=n,Yn}function we(){if(Wn===null){var n=En.alternate;n=n!==null?n.memoizedState:null}else n=Wn.next;var e=Yn===null?En.memoizedState:Yn.next;if(e!==null)Yn=e,Wn=n;else{if(n===null)throw Error(m(310));Wn=n,n={memoizedState:Wn.memoizedState,baseState:Wn.baseState,baseQueue:Wn.baseQueue,queue:Wn.queue,next:null},Yn===null?En.memoizedState=Yn=n:Yn=Yn.next=n}return Yn}function za(n,e){return typeof e=="function"?e(n):e}function Ar(n){var e=we(),t=e.queue;if(t===null)throw Error(m(311));t.lastRenderedReducer=n;var a=Wn,i=a.baseQueue,s=t.pending;if(s!==null){if(i!==null){var r=i.next;i.next=s.next,s.next=r}a.baseQueue=i=s,t.pending=null}if(i!==null){s=i.next,a=a.baseState;var d=r=null,f=null,S=s;do{var N=S.lane;if((Dt&N)===N)f!==null&&(f=f.next={lane:0,action:S.action,hasEagerState:S.hasEagerState,eagerState:S.eagerState,next:null}),a=S.hasEagerState?S.eagerState:n(a,S.action);else{var E={lane:N,action:S.action,hasEagerState:S.hasEagerState,eagerState:S.eagerState,next:null};f===null?(d=f=E,r=a):f=f.next=E,En.lanes|=N,Nt|=N}S=S.next}while(S!==null&&S!==s);f===null?r=a:f.next=d,Me(a,e.memoizedState)||(de=!0),e.memoizedState=a,e.baseState=r,e.baseQueue=f,t.lastRenderedState=a}if(n=t.interleaved,n!==null){i=n;do s=i.lane,En.lanes|=s,Nt|=s,i=i.next;while(i!==n)}else i===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Tr(n){var e=we(),t=e.queue;if(t===null)throw Error(m(311));t.lastRenderedReducer=n;var a=t.dispatch,i=t.pending,s=e.memoizedState;if(i!==null){t.pending=null;var r=i=i.next;do s=n(s,r.action),r=r.next;while(r!==i);Me(s,e.memoizedState)||(de=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,a]}function Yo(){}function Qo(n,e){var t=En,a=we(),i=e(),s=!Me(a.memoizedState,i);if(s&&(a.memoizedState=i,de=!0),a=a.queue,_r(Zo.bind(null,t,a,n),[n]),a.getSnapshot!==e||s||Yn!==null&&Yn.memoizedState.tag&1){if(t.flags|=2048,Wa(9,Xo.bind(null,t,a,i,e),void 0,null),Qn===null)throw Error(m(349));(Dt&30)!==0||Jo(t,e,i)}return i}function Jo(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=En.updateQueue,e===null?(e={lastEffect:null,stores:null},En.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function Xo(n,e,t,a){e.value=t,e.getSnapshot=a,nu(e)&&eu(n)}function Zo(n,e,t){return t(function(){nu(e)&&eu(n)})}function nu(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!Me(n,t)}catch{return!0}}function eu(n){var e=Ye(n,1);e!==null&&Re(e,n,1,-1)}function tu(n){var e=Oe();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:za,lastRenderedState:n},e.queue=n,n=n.dispatch=tm.bind(null,En,n),[e.memoizedState,n]}function Wa(n,e,t,a){return n={tag:n,create:e,destroy:t,deps:a,next:null},e=En.updateQueue,e===null?(e={lastEffect:null,stores:null},En.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(a=t.next,t.next=n,n.next=a,e.lastEffect=n)),n}function au(){return we().memoizedState}function qi(n,e,t,a){var i=Oe();En.flags|=n,i.memoizedState=Wa(1|e,t,void 0,a===void 0?null:a)}function Vi(n,e,t,a){var i=we();a=a===void 0?null:a;var s=void 0;if(Wn!==null){var r=Wn.memoizedState;if(s=r.destroy,a!==null&&xr(a,r.deps)){i.memoizedState=Wa(e,t,s,a);return}}En.flags|=n,i.memoizedState=Wa(1|e,t,s,a)}function iu(n,e){return qi(8390656,8,n,e)}function _r(n,e){return Vi(2048,8,n,e)}function su(n,e){return Vi(4,2,n,e)}function ru(n,e){return Vi(4,4,n,e)}function lu(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function ou(n,e,t){return t=t!=null?t.concat([n]):null,Vi(4,4,lu.bind(null,e,n),t)}function Mr(){}function uu(n,e){var t=we();e=e===void 0?null:e;var a=t.memoizedState;return a!==null&&e!==null&&xr(e,a[1])?a[0]:(t.memoizedState=[n,e],n)}function du(n,e){var t=we();e=e===void 0?null:e;var a=t.memoizedState;return a!==null&&e!==null&&xr(e,a[1])?a[0]:(n=n(),t.memoizedState=[n,e],n)}function cu(n,e,t){return(Dt&21)===0?(n.baseState&&(n.baseState=!1,de=!0),n.memoizedState=t):(Me(t,e)||(t=Il(),En.lanes|=t,Nt|=t,n.baseState=!0),e)}function nm(n,e){var t=Tn;Tn=t!==0&&4>t?t:4,n(!0);var a=wr.transition;wr.transition={};try{n(!1),e()}finally{Tn=t,wr.transition=a}}function mu(){return we().memoizedState}function em(n,e,t){var a=kt(n);if(t={lane:a,action:t,hasEagerState:!1,eagerState:null,next:null},pu(n))fu(e,t);else if(t=qo(n,e,t,a),t!==null){var i=le();Re(t,n,a,i),gu(t,e,a)}}function tm(n,e,t){var a=kt(n),i={lane:a,action:t,hasEagerState:!1,eagerState:null,next:null};if(pu(n))fu(e,i);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var r=e.lastRenderedState,d=s(r,t);if(i.hasEagerState=!0,i.eagerState=d,Me(d,r)){var f=e.interleaved;f===null?(i.next=i,hr(e)):(i.next=f.next,f.next=i),e.interleaved=i;return}}catch{}t=qo(n,e,i,a),t!==null&&(i=le(),Re(t,n,a,i),gu(t,e,a))}}function pu(n){var e=n.alternate;return n===En||e!==null&&e===En}function fu(n,e){qa=Fi=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function gu(n,e,t){if((t&4194240)!==0){var a=e.lanes;a&=n.pendingLanes,t|=a,e.lanes=t,Ds(n,t)}}var zi={readContext:Se,useCallback:te,useContext:te,useEffect:te,useImperativeHandle:te,useInsertionEffect:te,useLayoutEffect:te,useMemo:te,useReducer:te,useRef:te,useState:te,useDebugValue:te,useDeferredValue:te,useTransition:te,useMutableSource:te,useSyncExternalStore:te,useId:te,unstable_isNewReconciler:!1},am={readContext:Se,useCallback:function(n,e){return Oe().memoizedState=[n,e===void 0?null:e],n},useContext:Se,useEffect:iu,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,qi(4194308,4,lu.bind(null,e,n),t)},useLayoutEffect:function(n,e){return qi(4194308,4,n,e)},useInsertionEffect:function(n,e){return qi(4,2,n,e)},useMemo:function(n,e){var t=Oe();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var a=Oe();return e=t!==void 0?t(e):e,a.memoizedState=a.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},a.queue=n,n=n.dispatch=em.bind(null,En,n),[a.memoizedState,n]},useRef:function(n){var e=Oe();return n={current:n},e.memoizedState=n},useState:tu,useDebugValue:Mr,useDeferredValue:function(n){return Oe().memoizedState=n},useTransition:function(){var n=tu(!1),e=n[0];return n=nm.bind(null,n[1]),Oe().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var a=En,i=Oe();if(Ln){if(t===void 0)throw Error(m(407));t=t()}else{if(t=e(),Qn===null)throw Error(m(349));(Dt&30)!==0||Jo(a,e,t)}i.memoizedState=t;var s={value:t,getSnapshot:e};return i.queue=s,iu(Zo.bind(null,a,s,n),[n]),a.flags|=2048,Wa(9,Xo.bind(null,a,s,t,e),void 0,null),t},useId:function(){var n=Oe(),e=Qn.identifierPrefix;if(Ln){var t=Ge,a=We;t=(a&~(1<<32-_e(a)-1)).toString(32)+t,e=":"+e+"R"+t,t=Va++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=Zc++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},im={readContext:Se,useCallback:uu,useContext:Se,useEffect:_r,useImperativeHandle:ou,useInsertionEffect:su,useLayoutEffect:ru,useMemo:du,useReducer:Ar,useRef:au,useState:function(){return Ar(za)},useDebugValue:Mr,useDeferredValue:function(n){var e=we();return cu(e,Wn.memoizedState,n)},useTransition:function(){var n=Ar(za)[0],e=we().memoizedState;return[n,e]},useMutableSource:Yo,useSyncExternalStore:Qo,useId:mu,unstable_isNewReconciler:!1},sm={readContext:Se,useCallback:uu,useContext:Se,useEffect:_r,useImperativeHandle:ou,useInsertionEffect:su,useLayoutEffect:ru,useMemo:du,useReducer:Tr,useRef:au,useState:function(){return Tr(za)},useDebugValue:Mr,useDeferredValue:function(n){var e=we();return Wn===null?e.memoizedState=n:cu(e,Wn.memoizedState,n)},useTransition:function(){var n=Tr(za)[0],e=we().memoizedState;return[n,e]},useMutableSource:Yo,useSyncExternalStore:Qo,useId:mu,unstable_isNewReconciler:!1};function De(n,e){if(n&&n.defaultProps){e=H({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function jr(n,e,t,a){e=n.memoizedState,t=t(a,e),t=t==null?e:H({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var Wi={isMounted:function(n){return(n=n._reactInternals)?$t(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var a=le(),i=kt(n),s=Qe(a,i);s.payload=e,t!=null&&(s.callback=t),e=pt(n,s,i),e!==null&&(Re(e,n,i,a),Oi(e,n,i))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var a=le(),i=kt(n),s=Qe(a,i);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=pt(n,s,i),e!==null&&(Re(e,n,i,a),Oi(e,n,i))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=le(),a=kt(n),i=Qe(t,a);i.tag=2,e!=null&&(i.callback=e),e=pt(n,i,a),e!==null&&(Re(e,n,a,t),Oi(e,n,a))}};function hu(n,e,t,a,i,s,r){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(a,s,r):e.prototype&&e.prototype.isPureReactComponent?!La(t,a)||!La(i,s):!0}function ku(n,e,t){var a=!1,i=dt,s=e.contextType;return typeof s=="object"&&s!==null?s=Se(s):(i=ue(e)?At:ee.current,a=e.contextTypes,s=(a=a!=null)?Zt(n,i):dt),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Wi,n.stateNode=e,e._reactInternals=n,a&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=s),e}function vu(n,e,t,a){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,a),e.state!==n&&Wi.enqueueReplaceState(e,e.state,null)}function Dr(n,e,t,a){var i=n.stateNode;i.props=t,i.state=n.memoizedState,i.refs={},kr(n);var s=e.contextType;typeof s=="object"&&s!==null?i.context=Se(s):(s=ue(e)?At:ee.current,i.context=Zt(n,s)),i.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(jr(n,e,s,t),i.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Wi.enqueueReplaceState(i,i.state,null),Ii(n,t,i,a),i.state=n.memoizedState),typeof i.componentDidMount=="function"&&(n.flags|=4194308)}function la(n,e){try{var t="",a=e;do t+=g(a),a=a.return;while(a);var i=t}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:i,digest:null}}function Nr(n,e,t){return{value:n,source:null,stack:t!=null?t:null,digest:e!=null?e:null}}function Lr(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var rm=typeof WeakMap=="function"?WeakMap:Map;function bu(n,e,t){t=Qe(-1,t),t.tag=3,t.payload={element:null};var a=e.value;return t.callback=function(){ns||(ns=!0,Gr=a),Lr(n,e)},t}function yu(n,e,t){t=Qe(-1,t),t.tag=3;var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var i=e.value;t.payload=function(){return a(i)},t.callback=function(){Lr(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Lr(n,e),typeof a!="function"&&(gt===null?gt=new Set([this]):gt.add(this));var r=e.stack;this.componentDidCatch(e.value,{componentStack:r!==null?r:""})}),t}function Su(n,e,t){var a=n.pingCache;if(a===null){a=n.pingCache=new rm;var i=new Set;a.set(e,i)}else i=a.get(e),i===void 0&&(i=new Set,a.set(e,i));i.has(t)||(i.add(t),n=ym.bind(null,n,e,t),e.then(n,n))}function wu(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function xu(n,e,t,a,i){return(n.mode&1)===0?(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=Qe(-1,1),e.tag=2,pt(t,e,1))),t.lanes|=1),n):(n.flags|=65536,n.lanes=i,n)}var lm=hn.ReactCurrentOwner,de=!1;function re(n,e,t,a){e.child=n===null?Fo(e,null,t,a):aa(e,n.child,t,a)}function $u(n,e,t,a,i){t=t.render;var s=e.ref;return sa(e,i),a=$r(n,e,t,a,s,i),t=Cr(),n!==null&&!de?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~i,Je(n,e,i)):(Ln&&t&&lr(e),e.flags|=1,re(n,e,a,i),e.child)}function Cu(n,e,t,a,i){if(n===null){var s=t.type;return typeof s=="function"&&!el(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,Au(n,e,s,a,i)):(n=rs(t.type,null,a,e,e.mode,i),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,(n.lanes&i)===0){var r=s.memoizedProps;if(t=t.compare,t=t!==null?t:La,t(r,a)&&n.ref===e.ref)return Je(n,e,i)}return e.flags|=1,n=bt(s,a),n.ref=e.ref,n.return=e,e.child=n}function Au(n,e,t,a,i){if(n!==null){var s=n.memoizedProps;if(La(s,a)&&n.ref===e.ref)if(de=!1,e.pendingProps=a=s,(n.lanes&i)!==0)(n.flags&131072)!==0&&(de=!0);else return e.lanes=n.lanes,Je(n,e,i)}return Rr(n,e,t,a,i)}function Tu(n,e,t){var a=e.pendingProps,i=a.children,s=n!==null?n.memoizedState:null;if(a.mode==="hidden")if((e.mode&1)===0)e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Mn(ua,ve),ve|=t;else{if((t&1073741824)===0)return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,Mn(ua,ve),ve|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=s!==null?s.baseLanes:t,Mn(ua,ve),ve|=a}else s!==null?(a=s.baseLanes|t,e.memoizedState=null):a=t,Mn(ua,ve),ve|=a;return re(n,e,i,t),e.child}function _u(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Rr(n,e,t,a,i){var s=ue(t)?At:ee.current;return s=Zt(e,s),sa(e,i),t=$r(n,e,t,a,s,i),a=Cr(),n!==null&&!de?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~i,Je(n,e,i)):(Ln&&a&&lr(e),e.flags|=1,re(n,e,t,i),e.child)}function Mu(n,e,t,a,i){if(ue(t)){var s=!0;Di(e)}else s=!1;if(sa(e,i),e.stateNode===null)Yi(n,e),ku(e,t,a),Dr(e,t,a,i),a=!0;else if(n===null){var r=e.stateNode,d=e.memoizedProps;r.props=d;var f=r.context,S=t.contextType;typeof S=="object"&&S!==null?S=Se(S):(S=ue(t)?At:ee.current,S=Zt(e,S));var N=t.getDerivedStateFromProps,E=typeof N=="function"||typeof r.getSnapshotBeforeUpdate=="function";E||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(d!==a||f!==S)&&vu(e,r,a,S),mt=!1;var D=e.memoizedState;r.state=D,Ii(e,a,r,i),f=e.memoizedState,d!==a||D!==f||oe.current||mt?(typeof N=="function"&&(jr(e,t,N,a),f=e.memoizedState),(d=mt||hu(e,t,d,a,D,f,S))?(E||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(e.flags|=4194308)):(typeof r.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=f),r.props=a,r.state=f,r.context=S,a=d):(typeof r.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{r=e.stateNode,Vo(n,e),d=e.memoizedProps,S=e.type===e.elementType?d:De(e.type,d),r.props=S,E=e.pendingProps,D=r.context,f=t.contextType,typeof f=="object"&&f!==null?f=Se(f):(f=ue(t)?At:ee.current,f=Zt(e,f));var F=t.getDerivedStateFromProps;(N=typeof F=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(d!==E||D!==f)&&vu(e,r,a,f),mt=!1,D=e.memoizedState,r.state=D,Ii(e,a,r,i);var Y=e.memoizedState;d!==E||D!==Y||oe.current||mt?(typeof F=="function"&&(jr(e,t,F,a),Y=e.memoizedState),(S=mt||hu(e,t,S,a,D,Y,f)||!1)?(N||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(a,Y,f),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(a,Y,f)),typeof r.componentDidUpdate=="function"&&(e.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof r.componentDidUpdate!="function"||d===n.memoizedProps&&D===n.memoizedState||(e.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||d===n.memoizedProps&&D===n.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=Y),r.props=a,r.state=Y,r.context=f,a=S):(typeof r.componentDidUpdate!="function"||d===n.memoizedProps&&D===n.memoizedState||(e.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||d===n.memoizedProps&&D===n.memoizedState||(e.flags|=1024),a=!1)}return Er(n,e,t,a,s,i)}function Er(n,e,t,a,i,s){_u(n,e);var r=(e.flags&128)!==0;if(!a&&!r)return i&&Ro(e,t,!1),Je(n,e,s);a=e.stateNode,lm.current=e;var d=r&&typeof t.getDerivedStateFromError!="function"?null:a.render();return e.flags|=1,n!==null&&r?(e.child=aa(e,n.child,null,s),e.child=aa(e,null,d,s)):re(n,e,d,s),e.memoizedState=a.state,i&&Ro(e,t,!0),e.child}function ju(n){var e=n.stateNode;e.pendingContext?No(n,e.pendingContext,e.pendingContext!==e.context):e.context&&No(n,e.context,!1),vr(n,e.containerInfo)}function Du(n,e,t,a,i){return ta(),cr(i),e.flags|=256,re(n,e,t,a),e.child}var Pr={dehydrated:null,treeContext:null,retryLane:0};function Br(n){return{baseLanes:n,cachePool:null,transitions:null}}function Nu(n,e,t){var a=e.pendingProps,i=Rn.current,s=!1,r=(e.flags&128)!==0,d;if((d=r)||(d=n!==null&&n.memoizedState===null?!1:(i&2)!==0),d?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(i|=1),Mn(Rn,i&1),n===null)return dr(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((e.mode&1)===0?e.lanes=1:n.data==="$!"?e.lanes=8:e.lanes=1073741824,null):(r=a.children,n=a.fallback,s?(a=e.mode,s=e.child,r={mode:"hidden",children:r},(a&1)===0&&s!==null?(s.childLanes=0,s.pendingProps=r):s=ls(r,a,0,null),n=Pt(n,a,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=Br(t),e.memoizedState=Pr,n):Kr(e,r));if(i=n.memoizedState,i!==null&&(d=i.dehydrated,d!==null))return om(n,e,r,a,d,i,t);if(s){s=a.fallback,r=e.mode,i=n.child,d=i.sibling;var f={mode:"hidden",children:a.children};return(r&1)===0&&e.child!==i?(a=e.child,a.childLanes=0,a.pendingProps=f,e.deletions=null):(a=bt(i,f),a.subtreeFlags=i.subtreeFlags&14680064),d!==null?s=bt(d,s):(s=Pt(s,r,t,null),s.flags|=2),s.return=e,a.return=e,a.sibling=s,e.child=a,a=s,s=e.child,r=n.child.memoizedState,r=r===null?Br(t):{baseLanes:r.baseLanes|t,cachePool:null,transitions:r.transitions},s.memoizedState=r,s.childLanes=n.childLanes&~t,e.memoizedState=Pr,a}return s=n.child,n=s.sibling,a=bt(s,{mode:"visible",children:a.children}),(e.mode&1)===0&&(a.lanes=t),a.return=e,a.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=a,e.memoizedState=null,a}function Kr(n,e){return e=ls({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function Gi(n,e,t,a){return a!==null&&cr(a),aa(e,n.child,null,t),n=Kr(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function om(n,e,t,a,i,s,r){if(t)return e.flags&256?(e.flags&=-257,a=Nr(Error(m(422))),Gi(n,e,r,a)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=a.fallback,i=e.mode,a=ls({mode:"visible",children:a.children},i,0,null),s=Pt(s,i,r,null),s.flags|=2,a.return=e,s.return=e,a.sibling=s,e.child=a,(e.mode&1)!==0&&aa(e,n.child,null,r),e.child.memoizedState=Br(r),e.memoizedState=Pr,s);if((e.mode&1)===0)return Gi(n,e,r,null);if(i.data==="$!"){if(a=i.nextSibling&&i.nextSibling.dataset,a)var d=a.dgst;return a=d,s=Error(m(419)),a=Nr(s,a,void 0),Gi(n,e,r,a)}if(d=(r&n.childLanes)!==0,de||d){if(a=Qn,a!==null){switch(r&-r){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=(i&(a.suspendedLanes|r))!==0?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Ye(n,i),Re(a,n,i,-1))}return nl(),a=Nr(Error(m(421))),Gi(n,e,r,a)}return i.data==="$?"?(e.flags|=128,e.child=n.child,e=Sm.bind(null,n),i._reactRetry=e,null):(n=s.treeContext,ke=ot(i.nextSibling),he=e,Ln=!0,je=null,n!==null&&(be[ye++]=We,be[ye++]=Ge,be[ye++]=Tt,We=n.id,Ge=n.overflow,Tt=e),e=Kr(e,a.children),e.flags|=4096,e)}function Lu(n,e,t){n.lanes|=e;var a=n.alternate;a!==null&&(a.lanes|=e),gr(n.return,e,t)}function Or(n,e,t,a,i){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:t,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=a,s.tail=t,s.tailMode=i)}function Ru(n,e,t){var a=e.pendingProps,i=a.revealOrder,s=a.tail;if(re(n,e,a.children,t),a=Rn.current,(a&2)!==0)a=a&1|2,e.flags|=128;else{if(n!==null&&(n.flags&128)!==0)n:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Lu(n,t,e);else if(n.tag===19)Lu(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break n;for(;n.sibling===null;){if(n.return===null||n.return===e)break n;n=n.return}n.sibling.return=n.return,n=n.sibling}a&=1}if(Mn(Rn,a),(e.mode&1)===0)e.memoizedState=null;else switch(i){case"forwards":for(t=e.child,i=null;t!==null;)n=t.alternate,n!==null&&Hi(n)===null&&(i=t),t=t.sibling;t=i,t===null?(i=e.child,e.child=null):(i=t.sibling,t.sibling=null),Or(e,!1,i,t,s);break;case"backwards":for(t=null,i=e.child,e.child=null;i!==null;){if(n=i.alternate,n!==null&&Hi(n)===null){e.child=i;break}n=i.sibling,i.sibling=t,t=i,i=n}Or(e,!0,t,null,s);break;case"together":Or(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Yi(n,e){(e.mode&1)===0&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Je(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),Nt|=e.lanes,(t&e.childLanes)===0)return null;if(n!==null&&e.child!==n.child)throw Error(m(153));if(e.child!==null){for(n=e.child,t=bt(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=bt(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function um(n,e,t){switch(e.tag){case 3:ju(e),ta();break;case 5:Go(e);break;case 1:ue(e.type)&&Di(e);break;case 4:vr(e,e.stateNode.containerInfo);break;case 10:var a=e.type._context,i=e.memoizedProps.value;Mn(Bi,a._currentValue),a._currentValue=i;break;case 13:if(a=e.memoizedState,a!==null)return a.dehydrated!==null?(Mn(Rn,Rn.current&1),e.flags|=128,null):(t&e.child.childLanes)!==0?Nu(n,e,t):(Mn(Rn,Rn.current&1),n=Je(n,e,t),n!==null?n.sibling:null);Mn(Rn,Rn.current&1);break;case 19:if(a=(t&e.childLanes)!==0,(n.flags&128)!==0){if(a)return Ru(n,e,t);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Mn(Rn,Rn.current),a)break;return null;case 22:case 23:return e.lanes=0,Tu(n,e,t)}return Je(n,e,t)}var Eu,Ir,Pu,Bu;Eu=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}},Ir=function(){},Pu=function(n,e,t,a){var i=n.memoizedProps;if(i!==a){n=e.stateNode,jt(Ke.current);var s=null;switch(t){case"input":i=nt(n,i),a=nt(n,a),s=[];break;case"select":i=H({},i,{value:void 0}),a=H({},a,{value:void 0}),s=[];break;case"textarea":i=Te(n,i),a=Te(n,a),s=[];break;default:typeof i.onClick!="function"&&typeof a.onClick=="function"&&(n.onclick=_i)}qe(t,a);var r;t=null;for(S in i)if(!a.hasOwnProperty(S)&&i.hasOwnProperty(S)&&i[S]!=null)if(S==="style"){var d=i[S];for(r in d)d.hasOwnProperty(r)&&(t||(t={}),t[r]="")}else S!=="dangerouslySetInnerHTML"&&S!=="children"&&S!=="suppressContentEditableWarning"&&S!=="suppressHydrationWarning"&&S!=="autoFocus"&&(M.hasOwnProperty(S)?s||(s=[]):(s=s||[]).push(S,null));for(S in a){var f=a[S];if(d=i!=null?i[S]:void 0,a.hasOwnProperty(S)&&f!==d&&(f!=null||d!=null))if(S==="style")if(d){for(r in d)!d.hasOwnProperty(r)||f&&f.hasOwnProperty(r)||(t||(t={}),t[r]="");for(r in f)f.hasOwnProperty(r)&&d[r]!==f[r]&&(t||(t={}),t[r]=f[r])}else t||(s||(s=[]),s.push(S,t)),t=f;else S==="dangerouslySetInnerHTML"?(f=f?f.__html:void 0,d=d?d.__html:void 0,f!=null&&d!==f&&(s=s||[]).push(S,f)):S==="children"?typeof f!="string"&&typeof f!="number"||(s=s||[]).push(S,""+f):S!=="suppressContentEditableWarning"&&S!=="suppressHydrationWarning"&&(M.hasOwnProperty(S)?(f!=null&&S==="onScroll"&&Dn("scroll",n),s||d===f||(s=[])):(s=s||[]).push(S,f))}t&&(s=s||[]).push("style",t);var S=s;(e.updateQueue=S)&&(e.flags|=4)}},Bu=function(n,e,t,a){t!==a&&(e.flags|=4)};function Ga(n,e){if(!Ln)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:a.sibling=null}}function ae(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,a=0;if(e)for(var i=n.child;i!==null;)t|=i.lanes|i.childLanes,a|=i.subtreeFlags&14680064,a|=i.flags&14680064,i.return=n,i=i.sibling;else for(i=n.child;i!==null;)t|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=n,i=i.sibling;return n.subtreeFlags|=a,n.childLanes=t,e}function dm(n,e,t){var a=e.pendingProps;switch(or(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ae(e),null;case 1:return ue(e.type)&&ji(),ae(e),null;case 3:return a=e.stateNode,ra(),Nn(oe),Nn(ee),Sr(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(n===null||n.child===null)&&(Ei(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,je!==null&&(Jr(je),je=null))),Ir(n,e),ae(e),null;case 5:br(e);var i=jt(Fa.current);if(t=e.type,n!==null&&e.stateNode!=null)Pu(n,e,t,a,i),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!a){if(e.stateNode===null)throw Error(m(166));return ae(e),null}if(n=jt(Ke.current),Ei(e)){a=e.stateNode,t=e.type;var s=e.memoizedProps;switch(a[Be]=e,a[Ka]=s,n=(e.mode&1)!==0,t){case"dialog":Dn("cancel",a),Dn("close",a);break;case"iframe":case"object":case"embed":Dn("load",a);break;case"video":case"audio":for(i=0;i<Ea.length;i++)Dn(Ea[i],a);break;case"source":Dn("error",a);break;case"img":case"image":case"link":Dn("error",a),Dn("load",a);break;case"details":Dn("toggle",a);break;case"input":R(a,s),Dn("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!s.multiple},Dn("invalid",a);break;case"textarea":fa(a,s),Dn("invalid",a)}qe(t,s),i=null;for(var r in s)if(s.hasOwnProperty(r)){var d=s[r];r==="children"?typeof d=="string"?a.textContent!==d&&(s.suppressHydrationWarning!==!0&&Ti(a.textContent,d,n),i=["children",d]):typeof d=="number"&&a.textContent!==""+d&&(s.suppressHydrationWarning!==!0&&Ti(a.textContent,d,n),i=["children",""+d]):M.hasOwnProperty(r)&&d!=null&&r==="onScroll"&&Dn("scroll",a)}switch(t){case"input":Pn(a),zn(a,s,!0);break;case"textarea":Pn(a),ha(a);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(a.onclick=_i)}a=i,e.updateQueue=a,a!==null&&(e.flags|=4)}else{r=i.nodeType===9?i:i.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=si(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=r.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof a.is=="string"?n=r.createElement(t,{is:a.is}):(n=r.createElement(t),t==="select"&&(r=n,a.multiple?r.multiple=!0:a.size&&(r.size=a.size))):n=r.createElementNS(n,t),n[Be]=e,n[Ka]=a,Eu(n,e,!1,!1),e.stateNode=n;n:{switch(r=Ss(t,a),t){case"dialog":Dn("cancel",n),Dn("close",n),i=a;break;case"iframe":case"object":case"embed":Dn("load",n),i=a;break;case"video":case"audio":for(i=0;i<Ea.length;i++)Dn(Ea[i],n);i=a;break;case"source":Dn("error",n),i=a;break;case"img":case"image":case"link":Dn("error",n),Dn("load",n),i=a;break;case"details":Dn("toggle",n),i=a;break;case"input":R(n,a),i=nt(n,a),Dn("invalid",n);break;case"option":i=a;break;case"select":n._wrapperState={wasMultiple:!!a.multiple},i=H({},a,{value:void 0}),Dn("invalid",n);break;case"textarea":fa(n,a),i=Te(n,a),Dn("invalid",n);break;default:i=a}qe(t,i),d=i;for(s in d)if(d.hasOwnProperty(s)){var f=d[s];s==="style"?ne(n,f):s==="dangerouslySetInnerHTML"?(f=f?f.__html:void 0,f!=null&&ri(n,f)):s==="children"?typeof f=="string"?(t!=="textarea"||f!=="")&&c(n,f):typeof f=="number"&&c(n,""+f):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(M.hasOwnProperty(s)?f!=null&&s==="onScroll"&&Dn("scroll",n):f!=null&&vn(n,s,f,r))}switch(t){case"input":Pn(n),zn(n,a,!1);break;case"textarea":Pn(n),ha(n);break;case"option":a.value!=null&&n.setAttribute("value",""+G(a.value));break;case"select":n.multiple=!!a.multiple,s=a.value,s!=null?et(n,!!a.multiple,s,!1):a.defaultValue!=null&&et(n,!!a.multiple,a.defaultValue,!0);break;default:typeof i.onClick=="function"&&(n.onclick=_i)}switch(t){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break n;case"img":a=!0;break n;default:a=!1}}a&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return ae(e),null;case 6:if(n&&e.stateNode!=null)Bu(n,e,n.memoizedProps,a);else{if(typeof a!="string"&&e.stateNode===null)throw Error(m(166));if(t=jt(Fa.current),jt(Ke.current),Ei(e)){if(a=e.stateNode,t=e.memoizedProps,a[Be]=e,(s=a.nodeValue!==t)&&(n=he,n!==null))switch(n.tag){case 3:Ti(a.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ti(a.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else a=(t.nodeType===9?t:t.ownerDocument).createTextNode(a),a[Be]=e,e.stateNode=a}return ae(e),null;case 13:if(Nn(Rn),a=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Ln&&ke!==null&&(e.mode&1)!==0&&(e.flags&128)===0)Io(),ta(),e.flags|=98560,s=!1;else if(s=Ei(e),a!==null&&a.dehydrated!==null){if(n===null){if(!s)throw Error(m(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(m(317));s[Be]=e}else ta(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;ae(e),s=!1}else je!==null&&(Jr(je),je=null),s=!0;if(!s)return e.flags&65536?e:null}return(e.flags&128)!==0?(e.lanes=t,e):(a=a!==null,a!==(n!==null&&n.memoizedState!==null)&&a&&(e.child.flags|=8192,(e.mode&1)!==0&&(n===null||(Rn.current&1)!==0?Gn===0&&(Gn=3):nl())),e.updateQueue!==null&&(e.flags|=4),ae(e),null);case 4:return ra(),Ir(n,e),n===null&&Pa(e.stateNode.containerInfo),ae(e),null;case 10:return fr(e.type._context),ae(e),null;case 17:return ue(e.type)&&ji(),ae(e),null;case 19:if(Nn(Rn),s=e.memoizedState,s===null)return ae(e),null;if(a=(e.flags&128)!==0,r=s.rendering,r===null)if(a)Ga(s,!1);else{if(Gn!==0||n!==null&&(n.flags&128)!==0)for(n=e.child;n!==null;){if(r=Hi(n),r!==null){for(e.flags|=128,Ga(s,!1),a=r.updateQueue,a!==null&&(e.updateQueue=a,e.flags|=4),e.subtreeFlags=0,a=t,t=e.child;t!==null;)s=t,n=a,s.flags&=14680066,r=s.alternate,r===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=r.childLanes,s.lanes=r.lanes,s.child=r.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=r.memoizedProps,s.memoizedState=r.memoizedState,s.updateQueue=r.updateQueue,s.type=r.type,n=r.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return Mn(Rn,Rn.current&1|2),e.child}n=n.sibling}s.tail!==null&&Hn()>da&&(e.flags|=128,a=!0,Ga(s,!1),e.lanes=4194304)}else{if(!a)if(n=Hi(r),n!==null){if(e.flags|=128,a=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Ga(s,!0),s.tail===null&&s.tailMode==="hidden"&&!r.alternate&&!Ln)return ae(e),null}else 2*Hn()-s.renderingStartTime>da&&t!==1073741824&&(e.flags|=128,a=!0,Ga(s,!1),e.lanes=4194304);s.isBackwards?(r.sibling=e.child,e.child=r):(t=s.last,t!==null?t.sibling=r:e.child=r,s.last=r)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Hn(),e.sibling=null,t=Rn.current,Mn(Rn,a?t&1|2:t&1),e):(ae(e),null);case 22:case 23:return Zr(),a=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==a&&(e.flags|=8192),a&&(e.mode&1)!==0?(ve&1073741824)!==0&&(ae(e),e.subtreeFlags&6&&(e.flags|=8192)):ae(e),null;case 24:return null;case 25:return null}throw Error(m(156,e.tag))}function cm(n,e){switch(or(e),e.tag){case 1:return ue(e.type)&&ji(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return ra(),Nn(oe),Nn(ee),Sr(),n=e.flags,(n&65536)!==0&&(n&128)===0?(e.flags=n&-65537|128,e):null;case 5:return br(e),null;case 13:if(Nn(Rn),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(m(340));ta()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return Nn(Rn),null;case 4:return ra(),null;case 10:return fr(e.type._context),null;case 22:case 23:return Zr(),null;case 24:return null;default:return null}}var Qi=!1,ie=!1,mm=typeof WeakSet=="function"?WeakSet:Set,z=null;function oa(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(a){Kn(n,e,a)}else t.current=null}function Hr(n,e,t){try{t()}catch(a){Kn(n,e,a)}}var Ku=!1;function pm(n,e){if(Zs=hi,n=ho(),Vs(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else n:{t=(t=n.ownerDocument)&&t.defaultView||window;var a=t.getSelection&&t.getSelection();if(a&&a.rangeCount!==0){t=a.anchorNode;var i=a.anchorOffset,s=a.focusNode;a=a.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break n}var r=0,d=-1,f=-1,S=0,N=0,E=n,D=null;e:for(;;){for(var F;E!==t||i!==0&&E.nodeType!==3||(d=r+i),E!==s||a!==0&&E.nodeType!==3||(f=r+a),E.nodeType===3&&(r+=E.nodeValue.length),(F=E.firstChild)!==null;)D=E,E=F;for(;;){if(E===n)break e;if(D===t&&++S===i&&(d=r),D===s&&++N===a&&(f=r),(F=E.nextSibling)!==null)break;E=D,D=E.parentNode}E=F}t=d===-1||f===-1?null:{start:d,end:f}}else t=null}t=t||{start:0,end:0}}else t=null;for(nr={focusedElem:n,selectionRange:t},hi=!1,z=e;z!==null;)if(e=z,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,z=n;else for(;z!==null;){e=z;try{var Y=e.alternate;if((e.flags&1024)!==0)switch(e.tag){case 0:case 11:case 15:break;case 1:if(Y!==null){var Q=Y.memoizedProps,Un=Y.memoizedState,v=e.stateNode,h=v.getSnapshotBeforeUpdate(e.elementType===e.type?Q:De(e.type,Q),Un);v.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var b=e.stateNode.containerInfo;b.nodeType===1?b.textContent="":b.nodeType===9&&b.documentElement&&b.removeChild(b.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(m(163))}}catch(O){Kn(e,e.return,O)}if(n=e.sibling,n!==null){n.return=e.return,z=n;break}z=e.return}return Y=Ku,Ku=!1,Y}function Ya(n,e,t){var a=e.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var i=a=a.next;do{if((i.tag&n)===n){var s=i.destroy;i.destroy=void 0,s!==void 0&&Hr(e,t,s)}i=i.next}while(i!==a)}}function Ji(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var a=t.create;t.destroy=a()}t=t.next}while(t!==e)}}function Ur(n){var e=n.ref;if(e!==null){var t=n.stateNode;n.tag,n=t,typeof e=="function"?e(n):e.current=n}}function Ou(n){var e=n.alternate;e!==null&&(n.alternate=null,Ou(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[Be],delete e[Ka],delete e[ir],delete e[Yc],delete e[Qc])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Iu(n){return n.tag===5||n.tag===3||n.tag===4}function Hu(n){n:for(;;){for(;n.sibling===null;){if(n.return===null||Iu(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue n;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Fr(n,e,t){var a=n.tag;if(a===5||a===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=_i));else if(a!==4&&(n=n.child,n!==null))for(Fr(n,e,t),n=n.sibling;n!==null;)Fr(n,e,t),n=n.sibling}function qr(n,e,t){var a=n.tag;if(a===5||a===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(a!==4&&(n=n.child,n!==null))for(qr(n,e,t),n=n.sibling;n!==null;)qr(n,e,t),n=n.sibling}var Xn=null,Ne=!1;function ft(n,e,t){for(t=t.child;t!==null;)Uu(n,e,t),t=t.sibling}function Uu(n,e,t){if(Pe&&typeof Pe.onCommitFiberUnmount=="function")try{Pe.onCommitFiberUnmount(di,t)}catch{}switch(t.tag){case 5:ie||oa(t,e);case 6:var a=Xn,i=Ne;Xn=null,ft(n,e,t),Xn=a,Ne=i,Xn!==null&&(Ne?(n=Xn,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):Xn.removeChild(t.stateNode));break;case 18:Xn!==null&&(Ne?(n=Xn,t=t.stateNode,n.nodeType===8?ar(n.parentNode,t):n.nodeType===1&&ar(n,t),Ta(n)):ar(Xn,t.stateNode));break;case 4:a=Xn,i=Ne,Xn=t.stateNode.containerInfo,Ne=!0,ft(n,e,t),Xn=a,Ne=i;break;case 0:case 11:case 14:case 15:if(!ie&&(a=t.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){i=a=a.next;do{var s=i,r=s.destroy;s=s.tag,r!==void 0&&((s&2)!==0||(s&4)!==0)&&Hr(t,e,r),i=i.next}while(i!==a)}ft(n,e,t);break;case 1:if(!ie&&(oa(t,e),a=t.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=t.memoizedProps,a.state=t.memoizedState,a.componentWillUnmount()}catch(d){Kn(t,e,d)}ft(n,e,t);break;case 21:ft(n,e,t);break;case 22:t.mode&1?(ie=(a=ie)||t.memoizedState!==null,ft(n,e,t),ie=a):ft(n,e,t);break;default:ft(n,e,t)}}function Fu(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new mm),e.forEach(function(a){var i=wm.bind(null,n,a);t.has(a)||(t.add(a),a.then(i,i))})}}function Le(n,e){var t=e.deletions;if(t!==null)for(var a=0;a<t.length;a++){var i=t[a];try{var s=n,r=e,d=r;n:for(;d!==null;){switch(d.tag){case 5:Xn=d.stateNode,Ne=!1;break n;case 3:Xn=d.stateNode.containerInfo,Ne=!0;break n;case 4:Xn=d.stateNode.containerInfo,Ne=!0;break n}d=d.return}if(Xn===null)throw Error(m(160));Uu(s,r,i),Xn=null,Ne=!1;var f=i.alternate;f!==null&&(f.return=null),i.return=null}catch(S){Kn(i,e,S)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)qu(e,n),e=e.sibling}function qu(n,e){var t=n.alternate,a=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Le(e,n),Ie(n),a&4){try{Ya(3,n,n.return),Ji(3,n)}catch(Q){Kn(n,n.return,Q)}try{Ya(5,n,n.return)}catch(Q){Kn(n,n.return,Q)}}break;case 1:Le(e,n),Ie(n),a&512&&t!==null&&oa(t,t.return);break;case 5:if(Le(e,n),Ie(n),a&512&&t!==null&&oa(t,t.return),n.flags&32){var i=n.stateNode;try{c(i,"")}catch(Q){Kn(n,n.return,Q)}}if(a&4&&(i=n.stateNode,i!=null)){var s=n.memoizedProps,r=t!==null?t.memoizedProps:s,d=n.type,f=n.updateQueue;if(n.updateQueue=null,f!==null)try{d==="input"&&s.type==="radio"&&s.name!=null&&Z(i,s),Ss(d,r);var S=Ss(d,s);for(r=0;r<f.length;r+=2){var N=f[r],E=f[r+1];N==="style"?ne(i,E):N==="dangerouslySetInnerHTML"?ri(i,E):N==="children"?c(i,E):vn(i,N,E,S)}switch(d){case"input":Fe(i,s);break;case"textarea":ga(i,s);break;case"select":var D=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var F=s.value;F!=null?et(i,!!s.multiple,F,!1):D!==!!s.multiple&&(s.defaultValue!=null?et(i,!!s.multiple,s.defaultValue,!0):et(i,!!s.multiple,s.multiple?[]:"",!1))}i[Ka]=s}catch(Q){Kn(n,n.return,Q)}}break;case 6:if(Le(e,n),Ie(n),a&4){if(n.stateNode===null)throw Error(m(162));i=n.stateNode,s=n.memoizedProps;try{i.nodeValue=s}catch(Q){Kn(n,n.return,Q)}}break;case 3:if(Le(e,n),Ie(n),a&4&&t!==null&&t.memoizedState.isDehydrated)try{Ta(e.containerInfo)}catch(Q){Kn(n,n.return,Q)}break;case 4:Le(e,n),Ie(n);break;case 13:Le(e,n),Ie(n),i=n.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Wr=Hn())),a&4&&Fu(n);break;case 22:if(N=t!==null&&t.memoizedState!==null,n.mode&1?(ie=(S=ie)||N,Le(e,n),ie=S):Le(e,n),Ie(n),a&8192){if(S=n.memoizedState!==null,(n.stateNode.isHidden=S)&&!N&&(n.mode&1)!==0)for(z=n,N=n.child;N!==null;){for(E=z=N;z!==null;){switch(D=z,F=D.child,D.tag){case 0:case 11:case 14:case 15:Ya(4,D,D.return);break;case 1:oa(D,D.return);var Y=D.stateNode;if(typeof Y.componentWillUnmount=="function"){a=D,t=D.return;try{e=a,Y.props=e.memoizedProps,Y.state=e.memoizedState,Y.componentWillUnmount()}catch(Q){Kn(a,t,Q)}}break;case 5:oa(D,D.return);break;case 22:if(D.memoizedState!==null){Wu(E);continue}}F!==null?(F.return=D,z=F):Wu(E)}N=N.sibling}n:for(N=null,E=n;;){if(E.tag===5){if(N===null){N=E;try{i=E.stateNode,S?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(d=E.stateNode,f=E.memoizedProps.style,r=f!=null&&f.hasOwnProperty("display")?f.display:null,d.style.display=dn("display",r))}catch(Q){Kn(n,n.return,Q)}}}else if(E.tag===6){if(N===null)try{E.stateNode.nodeValue=S?"":E.memoizedProps}catch(Q){Kn(n,n.return,Q)}}else if((E.tag!==22&&E.tag!==23||E.memoizedState===null||E===n)&&E.child!==null){E.child.return=E,E=E.child;continue}if(E===n)break n;for(;E.sibling===null;){if(E.return===null||E.return===n)break n;N===E&&(N=null),E=E.return}N===E&&(N=null),E.sibling.return=E.return,E=E.sibling}}break;case 19:Le(e,n),Ie(n),a&4&&Fu(n);break;case 21:break;default:Le(e,n),Ie(n)}}function Ie(n){var e=n.flags;if(e&2){try{n:{for(var t=n.return;t!==null;){if(Iu(t)){var a=t;break n}t=t.return}throw Error(m(160))}switch(a.tag){case 5:var i=a.stateNode;a.flags&32&&(c(i,""),a.flags&=-33);var s=Hu(n);qr(n,s,i);break;case 3:case 4:var r=a.stateNode.containerInfo,d=Hu(n);Fr(n,d,r);break;default:throw Error(m(161))}}catch(f){Kn(n,n.return,f)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function fm(n,e,t){z=n,Vu(n)}function Vu(n,e,t){for(var a=(n.mode&1)!==0;z!==null;){var i=z,s=i.child;if(i.tag===22&&a){var r=i.memoizedState!==null||Qi;if(!r){var d=i.alternate,f=d!==null&&d.memoizedState!==null||ie;d=Qi;var S=ie;if(Qi=r,(ie=f)&&!S)for(z=i;z!==null;)r=z,f=r.child,r.tag===22&&r.memoizedState!==null?Gu(i):f!==null?(f.return=r,z=f):Gu(i);for(;s!==null;)z=s,Vu(s),s=s.sibling;z=i,Qi=d,ie=S}zu(n)}else(i.subtreeFlags&8772)!==0&&s!==null?(s.return=i,z=s):zu(n)}}function zu(n){for(;z!==null;){var e=z;if((e.flags&8772)!==0){var t=e.alternate;try{if((e.flags&8772)!==0)switch(e.tag){case 0:case 11:case 15:ie||Ji(5,e);break;case 1:var a=e.stateNode;if(e.flags&4&&!ie)if(t===null)a.componentDidMount();else{var i=e.elementType===e.type?t.memoizedProps:De(e.type,t.memoizedProps);a.componentDidUpdate(i,t.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Wo(e,s,a);break;case 3:var r=e.updateQueue;if(r!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}Wo(e,r,t)}break;case 5:var d=e.stateNode;if(t===null&&e.flags&4){t=d;var f=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":f.autoFocus&&t.focus();break;case"img":f.src&&(t.src=f.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var S=e.alternate;if(S!==null){var N=S.memoizedState;if(N!==null){var E=N.dehydrated;E!==null&&Ta(E)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(m(163))}ie||e.flags&512&&Ur(e)}catch(D){Kn(e,e.return,D)}}if(e===n){z=null;break}if(t=e.sibling,t!==null){t.return=e.return,z=t;break}z=e.return}}function Wu(n){for(;z!==null;){var e=z;if(e===n){z=null;break}var t=e.sibling;if(t!==null){t.return=e.return,z=t;break}z=e.return}}function Gu(n){for(;z!==null;){var e=z;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{Ji(4,e)}catch(f){Kn(e,t,f)}break;case 1:var a=e.stateNode;if(typeof a.componentDidMount=="function"){var i=e.return;try{a.componentDidMount()}catch(f){Kn(e,i,f)}}var s=e.return;try{Ur(e)}catch(f){Kn(e,s,f)}break;case 5:var r=e.return;try{Ur(e)}catch(f){Kn(e,r,f)}}}catch(f){Kn(e,e.return,f)}if(e===n){z=null;break}var d=e.sibling;if(d!==null){d.return=e.return,z=d;break}z=e.return}}var gm=Math.ceil,Xi=hn.ReactCurrentDispatcher,Vr=hn.ReactCurrentOwner,xe=hn.ReactCurrentBatchConfig,Sn=0,Qn=null,Vn=null,Zn=0,ve=0,ua=ut(0),Gn=0,Qa=null,Nt=0,Zi=0,zr=0,Ja=null,ce=null,Wr=0,da=1/0,Xe=null,ns=!1,Gr=null,gt=null,es=!1,ht=null,ts=0,Xa=0,Yr=null,as=-1,is=0;function le(){return(Sn&6)!==0?Hn():as!==-1?as:as=Hn()}function kt(n){return(n.mode&1)===0?1:(Sn&2)!==0&&Zn!==0?Zn&-Zn:Xc.transition!==null?(is===0&&(is=Il()),is):(n=Tn,n!==0||(n=window.event,n=n===void 0?16:Yl(n.type)),n)}function Re(n,e,t,a){if(50<Xa)throw Xa=0,Yr=null,Error(m(185));wa(n,t,a),((Sn&2)===0||n!==Qn)&&(n===Qn&&((Sn&2)===0&&(Zi|=t),Gn===4&&vt(n,Zn)),me(n,a),t===1&&Sn===0&&(e.mode&1)===0&&(da=Hn()+500,Ni&&ct()))}function me(n,e){var t=n.callbackNode;Xd(n,e);var a=pi(n,n===Qn?Zn:0);if(a===0)t!==null&&Bl(t),n.callbackNode=null,n.callbackPriority=0;else if(e=a&-a,n.callbackPriority!==e){if(t!=null&&Bl(t),e===1)n.tag===0?Jc(Qu.bind(null,n)):Eo(Qu.bind(null,n)),Wc(function(){(Sn&6)===0&&ct()}),t=null;else{switch(Hl(a)){case 1:t=_s;break;case 4:t=Kl;break;case 16:t=ui;break;case 536870912:t=Ol;break;default:t=ui}t=id(t,Yu.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function Yu(n,e){if(as=-1,is=0,(Sn&6)!==0)throw Error(m(327));var t=n.callbackNode;if(ca()&&n.callbackNode!==t)return null;var a=pi(n,n===Qn?Zn:0);if(a===0)return null;if((a&30)!==0||(a&n.expiredLanes)!==0||e)e=ss(n,a);else{e=a;var i=Sn;Sn|=2;var s=Xu();(Qn!==n||Zn!==e)&&(Xe=null,da=Hn()+500,Rt(n,e));do try{vm();break}catch(d){Ju(n,d)}while(!0);pr(),Xi.current=s,Sn=i,Vn!==null?e=0:(Qn=null,Zn=0,e=Gn)}if(e!==0){if(e===2&&(i=Ms(n),i!==0&&(a=i,e=Qr(n,i))),e===1)throw t=Qa,Rt(n,0),vt(n,a),me(n,Hn()),t;if(e===6)vt(n,a);else{if(i=n.current.alternate,(a&30)===0&&!hm(i)&&(e=ss(n,a),e===2&&(s=Ms(n),s!==0&&(a=s,e=Qr(n,s))),e===1))throw t=Qa,Rt(n,0),vt(n,a),me(n,Hn()),t;switch(n.finishedWork=i,n.finishedLanes=a,e){case 0:case 1:throw Error(m(345));case 2:Et(n,ce,Xe);break;case 3:if(vt(n,a),(a&130023424)===a&&(e=Wr+500-Hn(),10<e)){if(pi(n,0)!==0)break;if(i=n.suspendedLanes,(i&a)!==a){le(),n.pingedLanes|=n.suspendedLanes&i;break}n.timeoutHandle=tr(Et.bind(null,n,ce,Xe),e);break}Et(n,ce,Xe);break;case 4:if(vt(n,a),(a&4194240)===a)break;for(e=n.eventTimes,i=-1;0<a;){var r=31-_e(a);s=1<<r,r=e[r],r>i&&(i=r),a&=~s}if(a=i,a=Hn()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*gm(a/1960))-a,10<a){n.timeoutHandle=tr(Et.bind(null,n,ce,Xe),a);break}Et(n,ce,Xe);break;case 5:Et(n,ce,Xe);break;default:throw Error(m(329))}}}return me(n,Hn()),n.callbackNode===t?Yu.bind(null,n):null}function Qr(n,e){var t=Ja;return n.current.memoizedState.isDehydrated&&(Rt(n,e).flags|=256),n=ss(n,e),n!==2&&(e=ce,ce=t,e!==null&&Jr(e)),n}function Jr(n){ce===null?ce=n:ce.push.apply(ce,n)}function hm(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var a=0;a<t.length;a++){var i=t[a],s=i.getSnapshot;i=i.value;try{if(!Me(s(),i))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function vt(n,e){for(e&=~zr,e&=~Zi,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-_e(e),a=1<<t;n[t]=-1,e&=~a}}function Qu(n){if((Sn&6)!==0)throw Error(m(327));ca();var e=pi(n,0);if((e&1)===0)return me(n,Hn()),null;var t=ss(n,e);if(n.tag!==0&&t===2){var a=Ms(n);a!==0&&(e=a,t=Qr(n,a))}if(t===1)throw t=Qa,Rt(n,0),vt(n,e),me(n,Hn()),t;if(t===6)throw Error(m(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,Et(n,ce,Xe),me(n,Hn()),null}function Xr(n,e){var t=Sn;Sn|=1;try{return n(e)}finally{Sn=t,Sn===0&&(da=Hn()+500,Ni&&ct())}}function Lt(n){ht!==null&&ht.tag===0&&(Sn&6)===0&&ca();var e=Sn;Sn|=1;var t=xe.transition,a=Tn;try{if(xe.transition=null,Tn=1,n)return n()}finally{Tn=a,xe.transition=t,Sn=e,(Sn&6)===0&&ct()}}function Zr(){ve=ua.current,Nn(ua)}function Rt(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,zc(t)),Vn!==null)for(t=Vn.return;t!==null;){var a=t;switch(or(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&ji();break;case 3:ra(),Nn(oe),Nn(ee),Sr();break;case 5:br(a);break;case 4:ra();break;case 13:Nn(Rn);break;case 19:Nn(Rn);break;case 10:fr(a.type._context);break;case 22:case 23:Zr()}t=t.return}if(Qn=n,Vn=n=bt(n.current,null),Zn=ve=e,Gn=0,Qa=null,zr=Zi=Nt=0,ce=Ja=null,Mt!==null){for(e=0;e<Mt.length;e++)if(t=Mt[e],a=t.interleaved,a!==null){t.interleaved=null;var i=a.next,s=t.pending;if(s!==null){var r=s.next;s.next=i,a.next=r}t.pending=a}Mt=null}return n}function Ju(n,e){do{var t=Vn;try{if(pr(),Ui.current=zi,Fi){for(var a=En.memoizedState;a!==null;){var i=a.queue;i!==null&&(i.pending=null),a=a.next}Fi=!1}if(Dt=0,Yn=Wn=En=null,qa=!1,Va=0,Vr.current=null,t===null||t.return===null){Gn=1,Qa=e,Vn=null;break}n:{var s=n,r=t.return,d=t,f=e;if(e=Zn,d.flags|=32768,f!==null&&typeof f=="object"&&typeof f.then=="function"){var S=f,N=d,E=N.tag;if((N.mode&1)===0&&(E===0||E===11||E===15)){var D=N.alternate;D?(N.updateQueue=D.updateQueue,N.memoizedState=D.memoizedState,N.lanes=D.lanes):(N.updateQueue=null,N.memoizedState=null)}var F=wu(r);if(F!==null){F.flags&=-257,xu(F,r,d,s,e),F.mode&1&&Su(s,S,e),e=F,f=S;var Y=e.updateQueue;if(Y===null){var Q=new Set;Q.add(f),e.updateQueue=Q}else Y.add(f);break n}else{if((e&1)===0){Su(s,S,e),nl();break n}f=Error(m(426))}}else if(Ln&&d.mode&1){var Un=wu(r);if(Un!==null){(Un.flags&65536)===0&&(Un.flags|=256),xu(Un,r,d,s,e),cr(la(f,d));break n}}s=f=la(f,d),Gn!==4&&(Gn=2),Ja===null?Ja=[s]:Ja.push(s),s=r;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var v=bu(s,f,e);zo(s,v);break n;case 1:d=f;var h=s.type,b=s.stateNode;if((s.flags&128)===0&&(typeof h.getDerivedStateFromError=="function"||b!==null&&typeof b.componentDidCatch=="function"&&(gt===null||!gt.has(b)))){s.flags|=65536,e&=-e,s.lanes|=e;var O=yu(s,d,e);zo(s,O);break n}}s=s.return}while(s!==null)}nd(t)}catch(J){e=J,Vn===t&&t!==null&&(Vn=t=t.return);continue}break}while(!0)}function Xu(){var n=Xi.current;return Xi.current=zi,n===null?zi:n}function nl(){(Gn===0||Gn===3||Gn===2)&&(Gn=4),Qn===null||(Nt&268435455)===0&&(Zi&268435455)===0||vt(Qn,Zn)}function ss(n,e){var t=Sn;Sn|=2;var a=Xu();(Qn!==n||Zn!==e)&&(Xe=null,Rt(n,e));do try{km();break}catch(i){Ju(n,i)}while(!0);if(pr(),Sn=t,Xi.current=a,Vn!==null)throw Error(m(261));return Qn=null,Zn=0,Gn}function km(){for(;Vn!==null;)Zu(Vn)}function vm(){for(;Vn!==null&&!Fd();)Zu(Vn)}function Zu(n){var e=ad(n.alternate,n,ve);n.memoizedProps=n.pendingProps,e===null?nd(n):Vn=e,Vr.current=null}function nd(n){var e=n;do{var t=e.alternate;if(n=e.return,(e.flags&32768)===0){if(t=dm(t,e,ve),t!==null){Vn=t;return}}else{if(t=cm(t,e),t!==null){t.flags&=32767,Vn=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Gn=6,Vn=null;return}}if(e=e.sibling,e!==null){Vn=e;return}Vn=e=n}while(e!==null);Gn===0&&(Gn=5)}function Et(n,e,t){var a=Tn,i=xe.transition;try{xe.transition=null,Tn=1,bm(n,e,t,a)}finally{xe.transition=i,Tn=a}return null}function bm(n,e,t,a){do ca();while(ht!==null);if((Sn&6)!==0)throw Error(m(327));t=n.finishedWork;var i=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(m(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(Zd(n,s),n===Qn&&(Vn=Qn=null,Zn=0),(t.subtreeFlags&2064)===0&&(t.flags&2064)===0||es||(es=!0,id(ui,function(){return ca(),null})),s=(t.flags&15990)!==0,(t.subtreeFlags&15990)!==0||s){s=xe.transition,xe.transition=null;var r=Tn;Tn=1;var d=Sn;Sn|=4,Vr.current=null,pm(n,t),qu(t,n),Oc(nr),hi=!!Zs,nr=Zs=null,n.current=t,fm(t),qd(),Sn=d,Tn=r,xe.transition=s}else n.current=t;if(es&&(es=!1,ht=n,ts=i),s=n.pendingLanes,s===0&&(gt=null),Wd(t.stateNode),me(n,Hn()),e!==null)for(a=n.onRecoverableError,t=0;t<e.length;t++)i=e[t],a(i.value,{componentStack:i.stack,digest:i.digest});if(ns)throw ns=!1,n=Gr,Gr=null,n;return(ts&1)!==0&&n.tag!==0&&ca(),s=n.pendingLanes,(s&1)!==0?n===Yr?Xa++:(Xa=0,Yr=n):Xa=0,ct(),null}function ca(){if(ht!==null){var n=Hl(ts),e=xe.transition,t=Tn;try{if(xe.transition=null,Tn=16>n?16:n,ht===null)var a=!1;else{if(n=ht,ht=null,ts=0,(Sn&6)!==0)throw Error(m(331));var i=Sn;for(Sn|=4,z=n.current;z!==null;){var s=z,r=s.child;if((z.flags&16)!==0){var d=s.deletions;if(d!==null){for(var f=0;f<d.length;f++){var S=d[f];for(z=S;z!==null;){var N=z;switch(N.tag){case 0:case 11:case 15:Ya(8,N,s)}var E=N.child;if(E!==null)E.return=N,z=E;else for(;z!==null;){N=z;var D=N.sibling,F=N.return;if(Ou(N),N===S){z=null;break}if(D!==null){D.return=F,z=D;break}z=F}}}var Y=s.alternate;if(Y!==null){var Q=Y.child;if(Q!==null){Y.child=null;do{var Un=Q.sibling;Q.sibling=null,Q=Un}while(Q!==null)}}z=s}}if((s.subtreeFlags&2064)!==0&&r!==null)r.return=s,z=r;else n:for(;z!==null;){if(s=z,(s.flags&2048)!==0)switch(s.tag){case 0:case 11:case 15:Ya(9,s,s.return)}var v=s.sibling;if(v!==null){v.return=s.return,z=v;break n}z=s.return}}var h=n.current;for(z=h;z!==null;){r=z;var b=r.child;if((r.subtreeFlags&2064)!==0&&b!==null)b.return=r,z=b;else n:for(r=h;z!==null;){if(d=z,(d.flags&2048)!==0)try{switch(d.tag){case 0:case 11:case 15:Ji(9,d)}}catch(J){Kn(d,d.return,J)}if(d===r){z=null;break n}var O=d.sibling;if(O!==null){O.return=d.return,z=O;break n}z=d.return}}if(Sn=i,ct(),Pe&&typeof Pe.onPostCommitFiberRoot=="function")try{Pe.onPostCommitFiberRoot(di,n)}catch{}a=!0}return a}finally{Tn=t,xe.transition=e}}return!1}function ed(n,e,t){e=la(t,e),e=bu(n,e,1),n=pt(n,e,1),e=le(),n!==null&&(wa(n,1,e),me(n,e))}function Kn(n,e,t){if(n.tag===3)ed(n,n,t);else for(;e!==null;){if(e.tag===3){ed(e,n,t);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(gt===null||!gt.has(a))){n=la(t,n),n=yu(e,n,1),e=pt(e,n,1),n=le(),e!==null&&(wa(e,1,n),me(e,n));break}}e=e.return}}function ym(n,e,t){var a=n.pingCache;a!==null&&a.delete(e),e=le(),n.pingedLanes|=n.suspendedLanes&t,Qn===n&&(Zn&t)===t&&(Gn===4||Gn===3&&(Zn&130023424)===Zn&&500>Hn()-Wr?Rt(n,0):zr|=t),me(n,e)}function td(n,e){e===0&&((n.mode&1)===0?e=1:(e=mi,mi<<=1,(mi&130023424)===0&&(mi=4194304)));var t=le();n=Ye(n,e),n!==null&&(wa(n,e,t),me(n,t))}function Sm(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),td(n,t)}function wm(n,e){var t=0;switch(n.tag){case 13:var a=n.stateNode,i=n.memoizedState;i!==null&&(t=i.retryLane);break;case 19:a=n.stateNode;break;default:throw Error(m(314))}a!==null&&a.delete(e),td(n,t)}var ad;ad=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||oe.current)de=!0;else{if((n.lanes&t)===0&&(e.flags&128)===0)return de=!1,um(n,e,t);de=(n.flags&131072)!==0}else de=!1,Ln&&(e.flags&1048576)!==0&&Po(e,Ri,e.index);switch(e.lanes=0,e.tag){case 2:var a=e.type;Yi(n,e),n=e.pendingProps;var i=Zt(e,ee.current);sa(e,t),i=$r(null,e,a,n,i,t);var s=Cr();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,ue(a)?(s=!0,Di(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,kr(e),i.updater=Wi,e.stateNode=i,i._reactInternals=e,Dr(e,a,n,t),e=Er(null,e,a,!0,s,t)):(e.tag=0,Ln&&s&&lr(e),re(null,e,i,t),e=e.child),e;case 16:a=e.elementType;n:{switch(Yi(n,e),n=e.pendingProps,i=a._init,a=i(a._payload),e.type=a,i=e.tag=$m(a),n=De(a,n),i){case 0:e=Rr(null,e,a,n,t);break n;case 1:e=Mu(null,e,a,n,t);break n;case 11:e=$u(null,e,a,n,t);break n;case 14:e=Cu(null,e,a,De(a.type,n),t);break n}throw Error(m(306,a,""))}return e;case 0:return a=e.type,i=e.pendingProps,i=e.elementType===a?i:De(a,i),Rr(n,e,a,i,t);case 1:return a=e.type,i=e.pendingProps,i=e.elementType===a?i:De(a,i),Mu(n,e,a,i,t);case 3:n:{if(ju(e),n===null)throw Error(m(387));a=e.pendingProps,s=e.memoizedState,i=s.element,Vo(n,e),Ii(e,a,null,t);var r=e.memoizedState;if(a=r.element,s.isDehydrated)if(s={element:a,isDehydrated:!1,cache:r.cache,pendingSuspenseBoundaries:r.pendingSuspenseBoundaries,transitions:r.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=la(Error(m(423)),e),e=Du(n,e,a,t,i);break n}else if(a!==i){i=la(Error(m(424)),e),e=Du(n,e,a,t,i);break n}else for(ke=ot(e.stateNode.containerInfo.firstChild),he=e,Ln=!0,je=null,t=Fo(e,null,a,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ta(),a===i){e=Je(n,e,t);break n}re(n,e,a,t)}e=e.child}return e;case 5:return Go(e),n===null&&dr(e),a=e.type,i=e.pendingProps,s=n!==null?n.memoizedProps:null,r=i.children,er(a,i)?r=null:s!==null&&er(a,s)&&(e.flags|=32),_u(n,e),re(n,e,r,t),e.child;case 6:return n===null&&dr(e),null;case 13:return Nu(n,e,t);case 4:return vr(e,e.stateNode.containerInfo),a=e.pendingProps,n===null?e.child=aa(e,null,a,t):re(n,e,a,t),e.child;case 11:return a=e.type,i=e.pendingProps,i=e.elementType===a?i:De(a,i),$u(n,e,a,i,t);case 7:return re(n,e,e.pendingProps,t),e.child;case 8:return re(n,e,e.pendingProps.children,t),e.child;case 12:return re(n,e,e.pendingProps.children,t),e.child;case 10:n:{if(a=e.type._context,i=e.pendingProps,s=e.memoizedProps,r=i.value,Mn(Bi,a._currentValue),a._currentValue=r,s!==null)if(Me(s.value,r)){if(s.children===i.children&&!oe.current){e=Je(n,e,t);break n}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var d=s.dependencies;if(d!==null){r=s.child;for(var f=d.firstContext;f!==null;){if(f.context===a){if(s.tag===1){f=Qe(-1,t&-t),f.tag=2;var S=s.updateQueue;if(S!==null){S=S.shared;var N=S.pending;N===null?f.next=f:(f.next=N.next,N.next=f),S.pending=f}}s.lanes|=t,f=s.alternate,f!==null&&(f.lanes|=t),gr(s.return,t,e),d.lanes|=t;break}f=f.next}}else if(s.tag===10)r=s.type===e.type?null:s.child;else if(s.tag===18){if(r=s.return,r===null)throw Error(m(341));r.lanes|=t,d=r.alternate,d!==null&&(d.lanes|=t),gr(r,t,e),r=s.sibling}else r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}re(n,e,i.children,t),e=e.child}return e;case 9:return i=e.type,a=e.pendingProps.children,sa(e,t),i=Se(i),a=a(i),e.flags|=1,re(n,e,a,t),e.child;case 14:return a=e.type,i=De(a,e.pendingProps),i=De(a.type,i),Cu(n,e,a,i,t);case 15:return Au(n,e,e.type,e.pendingProps,t);case 17:return a=e.type,i=e.pendingProps,i=e.elementType===a?i:De(a,i),Yi(n,e),e.tag=1,ue(a)?(n=!0,Di(e)):n=!1,sa(e,t),ku(e,a,i),Dr(e,a,i,t),Er(null,e,a,!0,n,t);case 19:return Ru(n,e,t);case 22:return Tu(n,e,t)}throw Error(m(156,e.tag))};function id(n,e){return Pl(n,e)}function xm(n,e,t,a){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $e(n,e,t,a){return new xm(n,e,t,a)}function el(n){return n=n.prototype,!(!n||!n.isReactComponent)}function $m(n){if(typeof n=="function")return el(n)?1:0;if(n!=null){if(n=n.$$typeof,n===wn)return 11;if(n===Fn)return 14}return 2}function bt(n,e){var t=n.alternate;return t===null?(t=$e(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function rs(n,e,t,a,i,s){var r=2;if(a=n,typeof n=="function")el(n)&&(r=1);else if(typeof n=="string")r=5;else n:switch(n){case pn:return Pt(t.children,i,s,e);case An:r=8,i|=8;break;case X:return n=$e(12,t,e,i|2),n.elementType=X,n.lanes=s,n;case jn:return n=$e(13,t,e,i),n.elementType=jn,n.lanes=s,n;case On:return n=$e(19,t,e,i),n.elementType=On,n.lanes=s,n;case tn:return ls(t,i,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case bn:r=10;break n;case yn:r=9;break n;case wn:r=11;break n;case Fn:r=14;break n;case j:r=16,a=null;break n}throw Error(m(130,n==null?n:typeof n,""))}return e=$e(r,t,e,i),e.elementType=n,e.type=a,e.lanes=s,e}function Pt(n,e,t,a){return n=$e(7,n,a,e),n.lanes=t,n}function ls(n,e,t,a){return n=$e(22,n,a,e),n.elementType=tn,n.lanes=t,n.stateNode={isHidden:!1},n}function tl(n,e,t){return n=$e(6,n,null,e),n.lanes=t,n}function al(n,e,t){return e=$e(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function Cm(n,e,t,a,i){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=js(0),this.expirationTimes=js(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=js(0),this.identifierPrefix=a,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function il(n,e,t,a,i,s,r,d,f){return n=new Cm(n,e,t,d,f),e===1?(e=1,s===!0&&(e|=8)):e=0,s=$e(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:a,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},kr(s),n}function Am(n,e,t){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Cn,key:a==null?null:""+a,children:n,containerInfo:e,implementation:t}}function sd(n){if(!n)return dt;n=n._reactInternals;n:{if($t(n)!==n||n.tag!==1)throw Error(m(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break n;case 1:if(ue(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break n}}e=e.return}while(e!==null);throw Error(m(171))}if(n.tag===1){var t=n.type;if(ue(t))return Lo(n,t,e)}return e}function rd(n,e,t,a,i,s,r,d,f){return n=il(t,a,!0,n,i,s,r,d,f),n.context=sd(null),t=n.current,a=le(),i=kt(t),s=Qe(a,i),s.callback=e!=null?e:null,pt(t,s,i),n.current.lanes=i,wa(n,i,a),me(n,a),n}function os(n,e,t,a){var i=e.current,s=le(),r=kt(i);return t=sd(t),e.context===null?e.context=t:e.pendingContext=t,e=Qe(s,r),e.payload={element:n},a=a===void 0?null:a,a!==null&&(e.callback=a),n=pt(i,e,r),n!==null&&(Re(n,i,r,s),Oi(n,i,r)),r}function us(n){return n=n.current,n.child?(n.child.tag===5,n.child.stateNode):null}function ld(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function sl(n,e){ld(n,e),(n=n.alternate)&&ld(n,e)}function Tm(){return null}var od=typeof reportError=="function"?reportError:function(n){console.error(n)};function rl(n){this._internalRoot=n}ds.prototype.render=rl.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(m(409));os(n,e,null,null)},ds.prototype.unmount=rl.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;Lt(function(){os(null,n,null,null)}),e[Ve]=null}};function ds(n){this._internalRoot=n}ds.prototype.unstable_scheduleHydration=function(n){if(n){var e=ql();n={blockedOn:null,target:n,priority:e};for(var t=0;t<st.length&&e!==0&&e<st[t].priority;t++);st.splice(t,0,n),t===0&&Wl(n)}};function ll(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function cs(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function ud(){}function _m(n,e,t,a,i){if(i){if(typeof a=="function"){var s=a;a=function(){var S=us(r);s.call(S)}}var r=rd(e,a,n,0,null,!1,!1,"",ud);return n._reactRootContainer=r,n[Ve]=r.current,Pa(n.nodeType===8?n.parentNode:n),Lt(),r}for(;i=n.lastChild;)n.removeChild(i);if(typeof a=="function"){var d=a;a=function(){var S=us(f);d.call(S)}}var f=il(n,0,!1,null,null,!1,!1,"",ud);return n._reactRootContainer=f,n[Ve]=f.current,Pa(n.nodeType===8?n.parentNode:n),Lt(function(){os(e,f,t,a)}),f}function ms(n,e,t,a,i){var s=t._reactRootContainer;if(s){var r=s;if(typeof i=="function"){var d=i;i=function(){var f=us(r);d.call(f)}}os(e,r,n,i)}else r=_m(t,e,n,i,a);return us(r)}Ul=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=Sa(e.pendingLanes);t!==0&&(Ds(e,t|1),me(e,Hn()),(Sn&6)===0&&(da=Hn()+500,ct()))}break;case 13:Lt(function(){var a=Ye(n,1);if(a!==null){var i=le();Re(a,n,1,i)}}),sl(n,1)}},Ns=function(n){if(n.tag===13){var e=Ye(n,134217728);if(e!==null){var t=le();Re(e,n,134217728,t)}sl(n,134217728)}},Fl=function(n){if(n.tag===13){var e=kt(n),t=Ye(n,e);if(t!==null){var a=le();Re(t,n,e,a)}sl(n,e)}},ql=function(){return Tn},Vl=function(n,e){var t=Tn;try{return Tn=n,e()}finally{Tn=t}},$s=function(n,e,t){switch(e){case"input":if(Fe(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var a=t[e];if(a!==n&&a.form===n.form){var i=Mi(a);if(!i)throw Error(m(90));Bn(a),Fe(a,i)}}}break;case"textarea":ga(n,t);break;case"select":e=t.value,e!=null&&et(n,!!t.multiple,e,!1)}},Ml=Xr,jl=Lt;var Mm={usingClientEntryPoint:!1,Events:[Oa,Jt,Mi,Tl,_l,Xr]},Za={findFiberByHostInstance:Ct,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jm={bundleType:Za.bundleType,version:Za.version,rendererPackageName:Za.rendererPackageName,rendererConfig:Za.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:hn.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Rl(n),n===null?null:n.stateNode},findFiberByHostInstance:Za.findFiberByHostInstance||Tm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"){var ps=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ps.isDisabled&&ps.supportsFiber)try{di=ps.inject(jm),Pe=ps}catch{}}return pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Mm,pe.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ll(e))throw Error(m(200));return Am(n,e,null,t)},pe.createRoot=function(n,e){if(!ll(n))throw Error(m(299));var t=!1,a="",i=od;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=il(n,1,!1,null,null,t,!1,a,i),n[Ve]=e.current,Pa(n.nodeType===8?n.parentNode:n),new rl(e)},pe.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(m(188)):(n=Object.keys(n).join(","),Error(m(268,n)));return n=Rl(e),n=n===null?null:n.stateNode,n},pe.flushSync=function(n){return Lt(n)},pe.hydrate=function(n,e,t){if(!cs(e))throw Error(m(200));return ms(null,n,e,!0,t)},pe.hydrateRoot=function(n,e,t){if(!ll(n))throw Error(m(405));var a=t!=null&&t.hydratedSources||null,i=!1,s="",r=od;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),e=rd(e,null,n,1,t!=null?t:null,i,!1,s,r),n[Ve]=e.current,Pa(n),a)for(n=0;n<a.length;n++)t=a[n],i=t._getVersion,i=i(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,i]:e.mutableSourceEagerHydrationData.push(t,i);return new ds(e)},pe.render=function(n,e,t){if(!cs(e))throw Error(m(200));return ms(null,n,e,!1,t)},pe.unmountComponentAtNode=function(n){if(!cs(n))throw Error(m(40));return n._reactRootContainer?(Lt(function(){ms(null,null,n,!1,function(){n._reactRootContainer=null,n[Ve]=null})}),!0):!1},pe.unstable_batchedUpdates=Xr,pe.unstable_renderSubtreeIntoContainer=function(n,e,t,a){if(!cs(t))throw Error(m(200));if(n==null||n._reactInternals===void 0)throw Error(m(38));return ms(n,e,t,!1,a)},pe.version="18.3.1-next-f1338f8080-20240426",pe}var kd;function Km(){if(kd)return dl.exports;kd=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(u){console.error(u)}}return l(),dl.exports=Bm(),dl.exports}var vd;function Om(){if(vd)return fs;vd=1;var l=Km();return fs.createRoot=l.createRoot,fs.hydrateRoot=l.hydrateRoot,fs}var Im=Om();const Hm={syncUrl:"",syncToken:"",clearingUrl:"",monUrl:"",deliveryUrl:""};var _n=xl();const K=l=>Number(l||0).toLocaleString("id-ID"),ai=l=>(l>0?"+":"")+K(l),St=(l,u)=>u?Math.round(l/u*100)+"%":"–",vl=l=>{if(!(l>0))return"–";const u=Math.round(l/6e4);return u>=60?Math.floor(u/60)+"j "+u%60+"m":u+"m"},Um=Object.freeze(Object.defineProperty({__proto__:null,fmt:K,fmtDur:vl,pc:St,signed:ai},Symbol.toStringTag,{value:"Module"}));function ma(l,u,m){const C=l.filter(T=>u[T.bin]),M=C.filter(T=>m(T)==="ok");let w=0,A=0;C.forEach(T=>{const en=u[T.bin].actualQty-T.onhand;en>0?w+=en:A+=en});const y=C.map(T=>Date.parse(u[T.bin].savedAt)).filter(Boolean),$=y.length>1?Math.max(...y)-Math.min(...y):0;return{total:l.length,done:C.length,ok:M.length,bad:C.length-M.length,pos:w,neg:A,span:$,speed:$>0?(C.length/($/36e5)).toFixed(1).replace(".",","):"–"}}function Fm({areas:l,data:u,counts:m,stat:C,isClosed:M}){const w=ma(u,m,C),A="```",y=l.map($=>{const T=ma(u.filter(en=>en.area===$),m,C);return $.slice(0,6).padEnd(7)+(T.done+"/"+T.total).padStart(8)+St(T.ok,T.done).padStart(9)+(M($)?"  TUTUP":"  JALAN")});return`*KPI STOCK OPNAME PER AREA*
${new Date().toLocaleString("id-ID")}
━━━━━━━━━━━━━━━━━━━━
${A}
AREA      BIN  AKURASI  STATUS
${y.join(`
`)}
${A}
Progres total : ${St(w.done,w.total)}
Akurasi total : ${St(w.ok,w.done)}
Selisih qty   : ${ai(w.pos)} / ${K(w.neg)}
_Akurasi = bin sesuai / bin diperiksa_`}const He=["Hijau 1","Hijau 2","Kuning 1","Kuning 2","Kuning 3","Kuning 4","Merah"],xt=["A","B","C","PTM"],se="-",bl={"Hijau 1":"#a9d99a","Hijau 2":"#4caf50","Kuning 1":"#fbd3b5","Kuning 2":"#f2a96e","Kuning 3":"#c0561b","Kuning 4":"#f4b400",Merah:"#d32f2f"},qm={A:"Pak Kelik",B:"Pak Syaipul",C:"Pak Encup",PTM:""};function Ce(l){const u=String(l||"").trim().toLowerCase().replace(/\s+/g," ");if(u==="merah")return"Merah";const m=u.match(/^(hijau|kuning)\s*(\d)$/);if(!m)return"";const C=m[1][0].toUpperCase()+m[1].slice(1)+" "+m[2];return He.includes(C)?C:""}const Ld=l=>l.startsWith("Kuning"),Rd=l=>Ld(l)||l==="Merah",$l=l=>Number(l.onhand)>0,bd=()=>Object.fromEntries(He.map(l=>[l,0]));function Vm(l,u={}){const m=bd(),C=Object.fromEntries([...xt,se].map(y=>[y,bd()]));let M=0;l.forEach(y=>{if(!$l(y))return;M++;const $=Ce(y.sinyal);if(!$)return;m[$]++;const T=xt.includes(u[y.kode])?u[y.kode]:se;C[T][$]++});const w={};Object.keys(C).forEach(y=>w[y]=He.filter(Ld).reduce(($,T)=>$+C[y][T],0));const A=Object.values(w).reduce((y,$)=>y+$,0);return{filled:M,bySignal:m,byClass:C,kuning:w,kuningTotal:A}}const bs=l=>{const u=xt.indexOf(l);return u<0?xt.length:u};function yl(l,u="watch",m="parah",C={}){const M=A=>He.indexOf(A),w=l.filter(A=>$l(A)&&(u==="all"||Rd(Ce(A.sinyal))));return m==="prioritas"?w.sort((A,y)=>bs(C[A.kode])-bs(C[y.kode])||M(Ce(y.sinyal))-M(Ce(A.sinyal))||Number(y.aging)-Number(A.aging)||String(A.bin).localeCompare(String(y.bin),"id",{numeric:!0})):w.sort((A,y)=>M(Ce(y.sinyal))-M(Ce(A.sinyal))||Number(y.aging)-Number(A.aging)||String(A.bin).localeCompare(String(y.bin),"id",{numeric:!0}))}function zm(l,u={}){const m=new Map;return l.forEach(C=>{const M=xt.includes(u[C.kode])?u[C.kode]:se;m.has(M)||m.set(M,{c:M,items:[],merah:0});const w=m.get(M);w.items.push(C),Ce(C.sinyal)==="Merah"&&w.merah++}),[...m.values()].sort((C,M)=>bs(C.c)-bs(M.c))}function Wm({area:l,agg:u,pic:m,done:C,total:M,date:w}){const A=[`MONITORING AGING STOCK${l?" – "+l:""}`,w||"",`Rak isi: ${u.filled}`];return A.push("Sinyal: "+He.map(y=>`${y} ${u.bySignal[y]}`).join(", ")),A.push("","Total Kuning per kelas:"),[...xt,se].forEach(y=>{y===se&&!u.kuning[y]||A.push(`${y===se?"Belum diatur":y}${m[y]?" ("+m[y]+")":""}: ${u.kuning[y]}`)}),A.push(`Total: ${u.kuningTotal}`,"",`Sudah dicek fisik: ${C} dari ${M}`),A.join(`
`)}function yd(l){const u=new Map;return l.forEach(({v:m,area:C})=>{const M=String(m==null?"":m).trim();if(!M||M==="Sesuai")return;const w=u.get(M)||{v:M,n:0,areas:new Set};w.n++,C&&w.areas.add(C),u.set(M,w)}),[...u.values()]}function Sd(l,u,{pin:m="",area:C="",limit:M=10}={}){const w=String(u||"").trim().toLowerCase(),A=y=>w&&y.v.toLowerCase().startsWith(w)?1:0;return l.filter(y=>(!w||y.v.toLowerCase().includes(w))&&y.v.toLowerCase()!==w).sort((y,$)=>($.v===m)-(y.v===m)||A($)-A(y)||$.areas.has(C)-y.areas.has(C)||$.n-y.n||y.v.localeCompare($.v,"id",{numeric:!0})).slice(0,M).map(y=>y.v)}const gs=l=>String(l==null?"":l).toUpperCase().replace(/\s+/g,"");function Ed(l,u){if(!u)return null;const m=!!u.sesuai,C=m?String(l.tumpak||""):String(u.tumpak||"").trim(),M=m?String(l.item||""):String(u.pipa||"").trim(),w=u.qty===""||u.qty==null?null:Number(u.qty),A=Number(l.onhand)||0,y=w==null?0:w-A,$=w!=null&&y===0,T=m||!C||!l.tumpak||gs(C)===gs(l.tumpak),en=m||!M||gs(M)===gs(l.item),W=[];return w==null?W.push("qty belum diisi"):y&&W.push("qty "+(y>0?"+":"")+y),T||W.push("tumpak beda"),en||W.push("item beda"),{sesuai:m,tumpak:C,item:M,qty:w,sys:A,diff:y,qtyOk:$,tumpakOk:T,itemOk:en,ok:$&&T&&en,reasons:W}}const Gm=12,Ym=600*1e3,Qm=900*1e3,ei=l=>l===""||l==null?NaN:Number(l),hs=l=>{const u=l?Date.parse(l):NaN;return isNaN(u)?NaN:u};function Jm({data:l=[],counts:u={},users:m=[],tasks:C={},closed:M={},sync:w=null,now:A=Date.now()}={}){const y=[],$=(j,tn,B,V,H,k)=>{const _=[...new Set(H||[])];y.push({id:j,level:tn,title:B,detail:V,bins:_.slice(0,Gm),n:_.length,act:k||"bin"})},T=new Map,en=[],W=[];l.forEach(j=>{if(!j||!j.bin||!j.area)return W.push(j&&j.bin||"(tanpa bin)");const tn=ei(j.onhand);(isNaN(tn)||tn<0)&&W.push(j.bin);const B=j.bin+"\0"+String(j.kode||"")+"\0"+String(j.item||"");T.has(B)?en.push(j.bin):T.set(B,1)}),en.length&&$("dup-master","bad","Baris data WMS ganda","Bin + kode + item yang sama muncul lebih dari sekali. Impor ulang file WMS yang sudah dibersihkan.",en,"data"),W.length&&$("bad-master","bad","Baris data WMS tidak valid","Bin/area kosong atau Onhand kosong, bukan angka, atau negatif.",W,"data");const U=new Set(l.map(j=>j&&j.bin).filter(Boolean)),I={},L={};l.forEach(j=>{j&&j.bin&&(I[j.bin]=(I[j.bin]||0)+(ei(j.onhand)||0),L[j.bin]=(L[j.bin]||0)+1)});const P=[],q=[],nn=[],un=[],vn=[],hn=[],fn=[],Cn=[],pn={};l.forEach(j=>j&&j.bin&&(pn[j.bin]=j.area)),Object.keys(u).forEach(j=>{const tn=u[j];if(!tn||typeof tn!="object")return q.push(j);U.has(j)||P.push(j);const B=ei(tn.actualQty);(isNaN(B)||B<0)&&q.push(j),String(tn.by||"").trim()||nn.push(j);const V=hs(tn.savedAt);isNaN(V)?un.push(j):V>A+Ym&&vn.push(j),U.has(j)&&tn.systemQty!=null&&ei(tn.systemQty)!==I[j]&&L[j]===1&&hn.push(j);const H=M[pn[j]];H&&!isNaN(V)&&V>hs(H.at)&&fn.push(j);const k=ei(tn.systemQty);!isNaN(B)&&!isNaN(k)&&k>0&&Math.abs(B-k)/k>=.5&&Math.abs(B-k)>=10&&!String(tn.note||"").trim()&&Cn.push(j)}),q.length&&$("bad-qty","bad","Hasil periksa dengan qty tidak valid","Qty aktual kosong, bukan angka, atau negatif. Periksa ulang bin ini.",q),vn.length&&$("future","bad","Cap waktu di masa depan","Jam HP petugas salah (lebih dari 10 menit lebih maju). Urutan 'yang terbaru menang' bisa keliru; periksa ulang bin ini.",vn),P.length&&$("orphan","warn","Hasil periksa untuk bin yang tidak ada di data WMS","Bin sudah tidak ada setelah impor ulang. Cek apakah salah rak.",P),hn.length&&$("stale","warn","Stok sistem berubah sesudah bin diperiksa","Selisih dihitung dari Onhand lama. Periksa ulang jika perlu.",hn),fn.length&&$("after-close","warn","Diperiksa sesudah area ditutup","Hasil tercatat setelah supervisor menutup areanya.",fn),Cn.length&&$("big-nonote","warn","Selisih besar tanpa catatan","Selisih 50% atau lebih tanpa keterangan. Minta petugas menambah catatan atau hitung ulang.",Cn),nn.length&&$("no-by","warn","Hasil periksa tanpa nama petugas","Tidak jelas siapa yang memeriksa.",nn),un.length&&$("bad-time","warn","Hasil periksa tanpa waktu yang valid","Cap waktu kosong atau rusak; urutan sinkron bisa keliru.",un);const An=Object.keys(C).filter(j=>!j.includes("|")&&!U.has(j));An.length&&$("task-orphan","warn","Tugas untuk bin yang tidak ada","Tugas menunjuk bin yang tidak ada di data WMS.",An);const X={},bn=[];m.forEach(j=>{const tn=String(j&&j.name||"").trim().toLowerCase();tn&&(X[tn]&&bn.push(j.name),X[tn]=1)}),bn.length&&$("dup-user","bad","Nama pengguna ganda","Dua pengguna bernama sama membuat login dan laporan membingungkan: "+bn.join(", "),[],"usr");const yn=m.some(j=>j&&j.role==="admin"&&j.active!==!1);m.length&&!yn&&$("no-admin","bad","Tidak ada admin aktif","Aktifkan minimal satu admin.",[],"usr");const wn=new Set(l.map(j=>j&&j.area).filter(Boolean)),jn=m.filter(j=>j&&j.active!==!1&&(j.role==="petugas"||j.role==="penerimaan")&&!(j.areas||[]).length).map(j=>j.name);jn.length&&$("user-no-area","warn","Petugas tanpa area","Belum diberi area: "+jn.join(", "),[],"usr");const On=[...new Set(m.flatMap(j=>j&&j.areas||[]).filter(j=>wn.size&&!wn.has(j)))];On.length&&$("user-ghost-area","warn","Area petugas tidak ada di data WMS","Area: "+On.join(", "),[],"usr"),w&&(w.ready?(w.err&&$("sync-err","bad","Sinkron gagal",w.err,[],"sync"),w.dirty&&w.lastAt&&A-hs(w.lastAt)>Qm&&!w.err&&$("sync-stale","bad","Perubahan belum terkirim terlalu lama","Terakhir tersinkron "+Math.round((A-hs(w.lastAt))/6e4)+" menit lalu.",[],"sync"),w.warn&&$("server-warn","bad","Server melaporkan masalah",String(w.warn),[],"sync"),Math.abs(Number(w.clk)||0)>6e4&&$("clock","warn","Jam perangkat ini berbeda dari server","Selisih "+Math.round(Math.abs(w.clk)/1e3)+" detik. Cap waktu otomatis dikoreksi, tetapi perbaiki jam HP.",[],"sync")):$("sync-off","warn","Belum tersambung ke server","Data hanya ada di perangkat ini. Isi URL dan token di menu Data > Sinkron.",[],"sync"));const Fn={bad:0,warn:1};return y.sort((j,tn)=>Fn[j.level]-Fn[tn.level]),{issues:y,bad:y.filter(j=>j.level==="bad").length,warn:y.filter(j=>j.level==="warn").length,ok:y.length===0}}const Xm={"Dobel hitung":"dup","Selisih qty":"qty","Qty kosong":"nq","Belum dihitung":"belum","Tidak ada di laporan":"extra",Cocok:"ok"},pl=l=>l===""||l==null||isNaN(Number(l))?null:Number(l);function Zm(l){return(Array.isArray(l)?l:[]).filter(Array.isArray).map(u=>({v:u[0],shift:u[1]||"",lori:u[2]||"",qR:pl(u[5]),qC:pl(u[6]),diff:pl(u[7]),st:Xm[u[8]]||"belum",done:!!u[11]}))}const wd={dup:0,qty:1,nq:2,belum:3,extra:4,ok:5};function np(l,u=5){const m=(l||[]).filter(I=>I&&I.st!=="extra"),C=(l||[]).filter(I=>I&&I.st==="extra").length,M={ok:0,qty:0,dup:0,nq:0,belum:0};m.forEach(I=>{M[I.st]!=null&&M[I.st]++});const w=m.filter(I=>I.st!=="ok"&&!I.done),A=m.filter(I=>I.st!=="ok"&&I.done).length,y=m.reduce((I,L)=>I+(L.qR||0),0),$=m.reduce((I,L)=>I+(L.qC||0),0),en=[...new Set(m.map(I=>I.shift).filter(Boolean))].sort().map(I=>{const L=m.filter(P=>P.shift===I);return{shift:I,total:L.length,ok:L.filter(P=>P.st==="ok").length,open:L.filter(P=>P.st!=="ok"&&!P.done).length}}),W=w.slice().sort((I,L)=>wd[I.st]-wd[L.st]||Math.abs(L.diff||0)-Math.abs(I.diff||0)||String(I.v).localeCompare(String(L.v),"id",{numeric:!0})).slice(0,u),U=m.length;return{total:U,ok:M.ok,qty:M.qty,dup:M.dup,nq:M.nq,belum:M.belum,extra:C,done:A,open:w.length,wms:y,cnt:$,sel:Math.round(($-y)*1e3)/1e3,pct:U?Math.round(M.ok/U*100):0,byShift:en,top:W,status:U?w.length===0?"ok":"cek":"kosong"}}function ep(l,u=7){return(Array.isArray(l)?l:[]).filter(m=>m&&m.tgl&&m.n>0).slice().sort((m,C)=>m.tgl.localeCompare(C.tgl)).slice(-u).map(m=>({tgl:m.tgl,n:m.n,ok:m.ok,bad:m.bad,pct:Math.round(m.ok/m.n*100)}))}const fl=new Set;let xd=0;const gl=window.WMS={emit(){xd++,fl.forEach(l=>l())},subscribe(l){return fl.add(l),()=>fl.delete(l)},getVersion:()=>xd};window.WMSLib={...Um,kpiOf:ma,agingChecklist:yl,normSignal:Ce,healthCheck:Jm,clrSummarize:np,clrFromHist:Zm,clrTrend:ep};function Cl(){return _n.useSyncExternalStore(gl.subscribe,gl.getVersion),gl}const Ee=_n.memo(function({as:u="div",html:m,...C}){return o.jsx(u,{...C,dangerouslySetInnerHTML:{__html:m}})}),hl=(l,u)=>l?u/l>=.9?"ok":u/l>=.75?"warn":"bad":"";function $d({items:l}){return o.jsx("div",{className:"kp-grid",children:l.map(([u,m,C])=>o.jsxs("div",{className:C?"t-"+C:void 0,children:[o.jsx("small",{children:u}),o.jsx("strong",{children:m})]},u))})}function tp(){const l=Cl();if(l.view!=="kpi"||!l.DATA)return o.jsx("section",{id:"v-kpi",hidden:!0});const{DATA:u,counts:m,stat:C,isClosed:M,owners:w,staff:A}=l,y=l.areas(),$=ma(u,m,C),T=[["Progres",St($.done,$.total),`${K($.done)} / ${K($.total)} bin`,""],["Akurasi",St($.ok,$.done),`${K($.ok)} dari ${K($.done)} bin sesuai`,hl($.done,$.ok)],["Area ditutup",y.filter(M).length+"/"+y.length,"area selesai",""],["Selisih qty",ai($.pos)+" / "+K($.neg),"lebih / kurang",""]],en={};A().forEach(I=>en[I.name]=[]),u.forEach(I=>{const L=m[I.bin];L&&(en[L.by||"Tanpa petugas"]=en[L.by||"Tanpa petugas"]||[]).push(I)});const W=Object.entries(en).map(([I,L])=>[I,ma(L,m,C)]).sort((I,L)=>(I[0]==="Tanpa petugas")-(L[0]==="Tanpa petugas")||L[1].done-I[1].done||I[0].localeCompare(L[0],"id")),U=()=>l.outText(Fm({areas:y,data:u,counts:m,stat:C,isClosed:M})).then(()=>l.toast("Tersalin. Tempel di WhatsApp."),()=>l.toast("Gagal menyalin. Izinkan akses clipboard di browser atau salin manual."));return o.jsxs("section",{id:"v-kpi",hidden:!0,children:[o.jsx("h2",{children:"KPI Area"}),o.jsx("p",{className:"hint",children:"Capaian tiap area dan petugas. Akurasi = bin sesuai dibagi bin diperiksa."}),o.jsx("div",{className:"kp-tiles",id:"kpiStats","aria-live":"polite","aria-atomic":"true",children:T.map(([I,L,P,q])=>o.jsxs("div",{className:"kp-tile"+(q?" t-"+q:""),children:[o.jsx("small",{children:I}),o.jsx("strong",{children:L}),o.jsx("span",{children:P})]},I))}),o.jsxs("h3",{className:"sec",children:["Per area ",o.jsx("span",{className:"kp-n",children:y.length})]}),o.jsxs("div",{id:"kpiAreas",children:[y.length===0&&o.jsx("div",{className:"empty",children:"Belum ada data area."}),y.map(I=>{const L=ma(u.filter(vn=>vn.area===I),m,C),P=M(I),q=L.total&&L.done===L.total,nn=w(I),un=L.total?Math.round(L.done/L.total*100):0;return o.jsxs("div",{className:"kp-card",children:[o.jsxs("div",{className:"kp-h",children:[o.jsxs("div",{className:"kp-id",children:[o.jsxs("b",{children:["Area ",I]}),o.jsxs("small",{children:["Petugas: ",nn.length?nn.join(", "):"belum ada"]})]}),o.jsx("span",{className:"pill "+(P?"green":q?"amber":""),children:P?"Ditutup":q?"Siap ditutup":"Berjalan"})]}),o.jsxs("div",{className:"kp-prog",children:[o.jsx("div",{className:"kp-bar"+(P?" t-ok":""),role:"progressbar","aria-valuenow":un,"aria-valuemin":0,"aria-valuemax":100,"aria-label":"Progres area "+I,children:o.jsx("i",{style:{width:un+"%"}})}),o.jsxs("b",{children:[un,"%"]})]}),o.jsx($d,{items:[["Diperiksa",`${L.done}/${L.total}`],["Akurasi bin",St(L.ok,L.done),hl(L.done,L.ok)],["Perlu review",L.bad,L.bad?"warn":""],["Selisih qty",ai(L.pos)+" / "+K(L.neg)],["Durasi",vl(L.span)],["Bin per jam",L.speed]]})]},I)})]}),o.jsxs("h3",{className:"sec",children:["Per petugas ",o.jsx("span",{className:"kp-n",children:W.length})]}),o.jsxs("div",{id:"kpiUsers",children:[W.length===0&&o.jsx("div",{className:"empty",children:"Belum ada petugas."}),W.map(([I,L])=>{const P=hl(L.done,L.ok),q=L.done?Math.round(L.ok/L.done*100):0;return o.jsxs("div",{className:"kp-card"+(L.done?"":" idle"),children:[o.jsxs("div",{className:"kp-h",children:[o.jsx("span",{className:"kp-av","aria-hidden":"true",children:(I.trim()[0]||"?").toUpperCase()}),o.jsxs("div",{className:"kp-id",children:[o.jsx("b",{children:I}),o.jsx("small",{children:L.done?`${K(L.done)} bin diperiksa`:"Belum ada bin diperiksa"})]}),o.jsx("span",{className:"kp-acc"+(P?" t-"+P:""),children:St(L.ok,L.done)})]}),L.done>0&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"kp-bar"+(P?" t-"+P:""),role:"progressbar","aria-valuenow":q,"aria-valuemin":0,"aria-valuemax":100,"aria-label":"Akurasi "+I,children:o.jsx("i",{style:{width:q+"%"}})}),o.jsx($d,{items:[["Sesuai",K(L.ok),"ok"],["Perlu review",L.bad,L.bad?"warn":""],["Bin per jam",L.speed],["Selisih qty",ai(L.pos)+" / "+K(L.neg)],["Durasi",vl(L.span)]]})]})]},I)})]}),o.jsxs("div",{className:"kp-actions",children:[o.jsx("button",{className:"btn pri",id:"kpiCopy",onClick:U,children:"Salin untuk WhatsApp"}),o.jsx("button",{className:"btn sec","data-tg":"kpiCopy",children:"Kirim ke Telegram"})]})]})}const Cd="warehouse_so_aging_area_v1",ks={},ap=(l,u)=>{var m;try{return(m=JSON.parse(localStorage.getItem(l)))!=null?m:u}catch{return u}},ip=(l,u)=>{try{return localStorage.setItem(l,JSON.stringify(u)),!0}catch{return!1}},sp=l=>l.replace("Hijau ","H").replace("Kuning ","K").replace("Merah","M");function rp(){const l=Cl(),[u,m]=_n.useState(()=>ap(Cd,"")),[C,M]=_n.useState("watch"),[w,A]=_n.useState("all"),[y,$]=_n.useState(!1),T=l.aging||ks,en=l.agingCls||ks,W=l.agingCfg||ks,U=_n.useMemo(()=>Object.fromEntries(Object.entries(en).map(([g,x])=>[g,x&&x.c])),[en]),I={...qm,...W.pic||{}},L=l.view==="agi"&&!!l.DATA,P=l.tasks||ks,q=l.curU||"",nn=new Set(Object.keys(P).filter(g=>g.startsWith("AG|")&&(!q||P[g].u===q)).map(g=>g.slice(3)));_n.useEffect(()=>{if(!L||!l.agiTarget)return;const g=setTimeout(()=>{const x=[...document.querySelectorAll("[data-rak]")].find(mn=>mn.dataset.rak===l.agiTarget);x&&(x.open=!0,x.scrollIntoView({block:"center"}),l.agiTarget="")},120);return()=>clearTimeout(g)}),L&&l.agiFocus&&(l.agiFocus=!1,setTimeout(()=>{m(""),A("task")},0));const un=L?l.areas():[],vn=un.includes(u)?u:"",hn=_n.useMemo(()=>L?l.DATA.filter(g=>!vn||g.area===vn):[],[L,l.DATA,vn]),fn=_n.useMemo(()=>Vm(hn,U),[hn,U]),Cn=_n.useMemo(()=>{const g=L?l.DATA:[],x=Object.fromEntries(g.map(G=>[G.bin,G.area])),mn=Object.entries(T).map(([G,kn])=>({bin:G,r:kn,area:x[G]}));return{tumpak:yd([...g.map(G=>({v:G.tumpak,area:G.area})),...mn.map(G=>({v:G.r&&G.r.tumpak,area:G.area}))]),item:yd([...g.map(G=>({v:G.item,area:G.area})),...mn.map(G=>({v:G.r&&G.r.pipa,area:G.area}))])}},[L,l.DATA,T]),pn=_n.useMemo(()=>yl(hn,w==="task"?"all":C,"prioritas",U),[hn,C,U,w]);if(!L)return o.jsx("section",{id:"v-agi",hidden:!0});const An=pn.filter(g=>T[g.bin]).length,X=g=>{var x;return!!T[g]&&String(T[g].at||"")>=String(((x=P["AG|"+g])==null?void 0:x.at)||"")},bn=yl(hn,"all").filter(g=>nn.has(g.bin)&&!X(g.bin)).length,yn=g=>Ce(g.sinyal)==="Merah",wn=pn.filter(g=>yn(g)&&!T[g.bin]).length,jn=pn.filter(g=>(w==="task"?nn.has(g.bin):w==="todo"?!T[g.bin]:w==="done"?!!T[g.bin]:!0)&&(!y||yn(g))),On=zm(jn.slice(0,200),U).map(g=>({...g,items:[...g.items.filter(x=>!T[x.bin]),...g.items.filter(x=>T[x.bin])]})),Fn=g=>{m(g),ip(Cd,g)},j=()=>window.nowIso?window.nowIso():new Date().toISOString(),tn=(g,x)=>l.setAgingCls({...en,[g]:{c:x,at:j()}}),B=(g,x)=>l.setAgingCfg({...W,pic:{...I,[g]:x}}),V=(g,x)=>{var mn;l.setAging({...T,[g]:{...x,by:((mn=l.curName)==null?void 0:mn.call(l))||"",at:j()}}),l.toast("Cek rak "+g+" tersimpan")},H=g=>{const x={...T};delete x[g],l.setAging(x)},k=()=>l.outText(Wm({area:vn,agg:fn,pic:I,done:An,total:pn.length,date:new Date().toLocaleDateString("id-ID")})).then(()=>l.toast("Tersalin. Tempel di WhatsApp."),()=>l.toast("Gagal menyalin. Izinkan akses clipboard di browser.")),_=()=>{const g=xn=>'"'+String(xn!=null?xn:"").replace(/"/g,'""')+'"',x=["Area","Rak","Sinyal","Aging","Nama Item","Kelas Pipa","Tumpak Sistem","Stok Sistem","Actual Tumpak","Actual Pipa","Actual Qty","Selisih","Status"],mn=pn.map(xn=>{const Pn=Ed(xn,T[xn.bin]);return[xn.area,xn.bin,Ce(xn.sinyal),xn.aging,xn.item,U[xn.kode]||"",xn.tumpak||"",xn.onhand,Pn?Pn.tumpak:"",Pn?Pn.item:"",Pn&&Pn.qty!=null?Pn.qty:"",Pn&&Pn.qty!=null?Pn.diff:"",Pn?Pn.ok?"Sesuai":"Selisih: "+Pn.reasons.join(", "):"Belum dicek"].map(g).join(",")}),G=URL.createObjectURL(new Blob(["\uFEFF"+[x.map(g).join(","),...mn].join(`\r
`)],{type:"text/csv"})),kn=Object.assign(document.createElement("a"),{href:G,download:`aging-stock-${vn||"semua"}-${new Date().toISOString().slice(0,10)}.csv`});document.body.append(kn),kn.click(),kn.remove(),setTimeout(()=>URL.revokeObjectURL(G),1e3)},ln=Math.max(1,...He.map(g=>fn.bySignal[g])),cn=[...xt,...fn.kuning[se]||He.some(g=>fn.byClass[se][g])?[se]:[]];return o.jsxs("section",{id:"v-agi",hidden:!0,children:[o.jsx("h2",{children:"Aging Stock"}),o.jsx("p",{className:"hint",children:'Cek rak Merah dan Kuning, mulai dari kelas A. Cukup tap "Semua sama" atau perbarui no. tumpak, item, dan qty.'}),o.jsxs("div",{className:"agi-bar",children:[o.jsx("label",{htmlFor:"agiArea",children:"Area"}),o.jsxs("select",{id:"agiArea",value:vn,onChange:g=>Fn(g.target.value),children:[o.jsx("option",{value:"",children:"Semua area"}),un.map(g=>o.jsx("option",{value:g,children:g},g))]})]}),fn.filled===0?o.jsxs("div",{className:"empty",children:["Belum ada rak berisi di ",vn?"area "+vn:"data WMS",". Impor data di menu Data WMS."]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"stats agi-stats","aria-live":"polite",children:[o.jsxs("div",{className:"stat",children:[o.jsx("small",{children:"Kuning"}),o.jsx("strong",{style:{color:"var(--amber)"},children:K(fn.kuningTotal)})]}),o.jsxs("div",{className:"stat",children:[o.jsx("small",{children:"Merah"}),o.jsx("strong",{style:{color:fn.bySignal.Merah?"#d32f2f":void 0},children:K(fn.bySignal.Merah)})]}),o.jsxs("div",{className:"stat",children:[o.jsx("small",{children:"Dicek"}),o.jsxs("strong",{children:[An,"/",pn.length]})]})]}),wn>0&&o.jsxs("button",{type:"button",className:"agi-alert"+(y?" on":""),"aria-pressed":y,onClick:()=>$(!y),children:[o.jsxs("b",{children:[wn," rak MERAH"]})," belum dicek ",o.jsx("span",{children:y?"Tampilkan semua":"Lihat saja yang merah"})]}),o.jsxs("h3",{className:"agi-h agi-list-h",children:["Prioritas cek ",o.jsxs("span",{className:"agi-cnt",children:[An,"/",pn.length," dicek"]})]}),o.jsx("div",{className:"agi-prog",role:"progressbar","aria-label":"Kemajuan cek rak","aria-valuemin":0,"aria-valuemax":pn.length,"aria-valuenow":An,children:o.jsx("i",{style:{width:(pn.length?An/pn.length*100:0)+"%"}})}),o.jsxs("details",{className:"agi-filter",children:[o.jsxs("summary",{children:["Filter: ",C==="watch"?"Kuning & Merah":"Semua rak isi"," · ",w==="todo"?"Belum dicek":w==="done"?"Sudah dicek":"Semua status"]}),o.jsx("p",{className:"agi-fl",children:"Tampilkan rak"}),o.jsx("div",{className:"chips agi-chips",role:"group","aria-label":"Rak yang ditampilkan",children:[["watch","Kuning & Merah"],["all","Semua rak isi"]].map(([g,x])=>o.jsx("button",{className:"chip"+(C===g?" on":""),"aria-pressed":C===g,onClick:()=>M(g),children:x},g))}),o.jsx("p",{className:"agi-fl",children:"Status cek"}),o.jsx("div",{className:"chips agi-chips agi-chips3",role:"group","aria-label":"Status cek rak",children:[...nn.size?[["task",q?"Tugas saya":"Tugas",bn]]:[],["all","Semua",pn.length],["todo","Belum",pn.length-An],["done","Sudah",An]].map(([g,x,mn])=>o.jsxs("button",{className:"chip"+(w===g?" on":""),"aria-pressed":w===g,onClick:()=>A(g),children:[x," ",o.jsx("b",{children:mn})]},g))})]}),jn.length===0&&o.jsx("div",{className:"empty",children:"Tidak ada rak pada filter ini."}),On.map(g=>o.jsxs("div",{className:"agi-grp",children:[o.jsxs("div",{className:"agi-gh agi-k"+(g.c===se?"x":g.c),children:[o.jsxs("b",{children:[g.c===se?"Kelas belum diatur":"Kelas "+g.c,g.c!==se&&I[g.c]?" · "+I[g.c]:""]}),o.jsxs("span",{children:[g.items.length," rak",g.merah?" · "+g.merah+" merah":""]})]}),g.items.map(x=>o.jsx(up,{x,a:T[x.bin],tugas:nn.has(x.bin),blind:!!q&&!!l.blindFor&&l.blindFor(x.bin),pools:Cn,kelas:U[x.kode]||"",onClass:tn,onSave:V,onClear:H},x.bin))]},g.c)),jn.length>200&&o.jsxs("p",{className:"hint",children:["Menampilkan 200 rak teratas dari ",jn.length,". Pilih area untuk mempersempit."]}),o.jsxs("div",{className:"row-act",children:[o.jsx("button",{className:"btn pri",onClick:k,children:"Salin ringkasan"}),o.jsx("button",{className:"btn sec inl",onClick:_,children:"CSV"})]}),o.jsxs("details",{className:"agi-sumd",children:[o.jsx("summary",{children:"Ringkasan, grafik & petugas per kelas"}),o.jsxs("div",{className:"card",children:[o.jsx("h3",{className:"agi-h",children:"Total sinyal aging"}),He.map(g=>o.jsxs("div",{className:"agi-row",children:[o.jsx("span",{className:"agi-lb",children:g}),o.jsx("span",{className:"agi-tr",children:o.jsx("i",{style:{width:fn.bySignal[g]/ln*100+"%",background:bl[g]}})}),o.jsx("b",{children:K(fn.bySignal[g])})]},g))]}),o.jsxs("div",{className:"card",children:[o.jsx("h3",{className:"agi-h",children:"Aging dalam kelas pipa"}),o.jsx("div",{className:"agi-scroll",children:o.jsxs("table",{className:"agi-tb",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Kelas"}),He.map(g=>o.jsxs("th",{title:g,children:[o.jsx("i",{style:{background:bl[g]}}),sp(g)]},g))]})}),o.jsx("tbody",{children:cn.map(g=>o.jsxs("tr",{children:[o.jsx("th",{children:g===se?"Belum":g}),He.map(x=>o.jsx("td",{className:fn.byClass[g][x]?"":"z",children:fn.byClass[g][x]},x))]},g))})]})}),fn.kuning[se]>0&&o.jsx("p",{className:"hint",children:"Ada rak Kuning tanpa kelas. Atur kelas pipa di daftar cek di bawah."})]}),o.jsxs("div",{className:"card",children:[o.jsx("h3",{className:"agi-h",children:"Total Kuning per kelas"}),cn.map(g=>o.jsxs("div",{className:"agi-pic",children:[o.jsx("span",{className:"agi-cl",children:g===se?"?":g}),g===se?o.jsx("span",{className:"agi-pn",children:"Belum diatur"}):o.jsx("input",{"aria-label":"Penanggung jawab kelas "+g,value:I[g]||"",placeholder:"Nama petugas",onChange:x=>B(g,x.target.value)}),o.jsx("b",{children:K(fn.kuning[g])})]},g)),o.jsxs("div",{className:"agi-pic tot",children:[o.jsx("span",{className:"agi-cl"}),o.jsx("span",{className:"agi-pn",children:"Total"}),o.jsx("b",{children:K(fn.kuningTotal)})]})]})]})]})]})}const lp=l=>l?"agi-kb agi-k"+l:"agi-kb agi-kx";function op(l){const u=[...document.querySelectorAll("#v-agi .agi-rak")],m=u.slice(u.indexOf(l)+1).find(C=>!C.classList.contains("done"));l&&(l.open=!1),m&&(m.open=!0,setTimeout(()=>m.scrollIntoView({block:"start",behavior:"smooth"}),60))}function up({x:l,a:u,pools:m,kelas:C,onClass:M,onSave:w,onClear:A,tugas:y,blind:$}){var pn,An;const[T,en]=_n.useState({tumpak:u!=null&&u.sesuai?"":(u==null?void 0:u.tumpak)||"",pipa:u!=null&&u.sesuai?"":(u==null?void 0:u.pipa)||"",qty:(pn=u==null?void 0:u.qty)!=null?pn:""}),W=Ce(l.sinyal),U=_n.useRef(null),I=!!(T.tumpak||T.pipa||T.qty!==""),L=()=>[...U.current?U.current.querySelectorAll("input"):[]],P=X=>{if(X.key!=="Enter")return;X.preventDefault();const bn=L(),yn=bn[bn.indexOf(X.currentTarget)+1];yn?yn.focus():I&&U.current&&U.current.querySelector(".agi-savebtn").click()},q=X=>{const bn=X.target;setTimeout(()=>bn.scrollIntoView({block:"center",behavior:"smooth"}),280)},nn=(X,bn)=>{en({...T,[X]:bn});const yn=L(),wn=yn[X==="tumpak"?1:2];wn&&requestAnimationFrame(()=>wn.focus())},un=X=>bn=>en({...T,[X]:bn.target.value}),vn=Sd(m.tumpak,T.tumpak,{pin:l.tumpak,area:l.area}),hn=Sd(m.item,T.pipa,{pin:l.item,area:l.area}),fn=(X,bn,yn)=>bn.length>0&&o.jsx("div",{className:"agi-opts",role:"group","aria-label":X,children:bn.map(wn=>o.jsx("button",{type:"button",className:"agi-opt",onClick:()=>nn(yn,wn),children:wn},wn))}),Cn=(X,bn)=>{const yn=X.currentTarget.closest("details");try{navigator.vibrate&&navigator.vibrate(18)}catch{}w(l.bin,bn),op(yn)};return o.jsxs("details",{"data-rak":l.bin,className:"card agi-rak"+(u?" done":"")+(W==="Merah"?" red":""),children:[o.jsxs("summary",{children:[o.jsx("span",{className:"agi-sg",style:{background:bl[W]||"#ccc",color:W==="Kuning 3"||W==="Hijau 2"||W==="Merah"?"#fff":"#222"},children:W||"?"}),o.jsxs("span",{className:"agi-bn",children:[o.jsxs("b",{children:[l.bin,o.jsx("i",{className:lp(C),children:C||"?"})]}),o.jsx("span",{className:"agi-it",children:l.item}),o.jsxs("small",{children:[y?"TUGAS · ":"","Tumpak ",o.jsx("strong",{children:l.tumpak||"–"})," · ",l.aging," hari",$?"":" · stok "+K(l.onhand),u?" · cek "+K((An=u.qty)!=null?An:0)+(u.sesuai?" (sesuai)":""):""]})]}),o.jsx("span",{className:"agi-ck"+(u?" on":""),"aria-label":u?"Sudah dicek":"Belum dicek",children:u?"✓":""})]}),o.jsxs("div",{className:"agi-form",ref:U,children:[o.jsxs("div",{className:"agi-sys",children:["Data sistem: tumpak ",o.jsx("b",{children:l.tumpak||"–"})," · item ",o.jsx("b",{children:l.item}),$?null:o.jsxs(o.Fragment,{children:[" · qty ",o.jsx("b",{children:K(l.onhand)})]})]}),!$&&o.jsx("button",{type:"button",className:"btn pri agi-all",onClick:X=>Cn(X,{tumpak:"Sesuai",pipa:"Sesuai",qty:String(l.onhand),sesuai:!0}),children:"✓ Semua sama dengan sistem"}),o.jsx("p",{className:"agi-or",children:"Kalau ada yang beda, isi di sini:"}),o.jsxs("label",{children:["No. tumpak aktual",o.jsx("input",{value:T.tumpak,onChange:un("tumpak"),onKeyDown:P,onFocus:q,placeholder:l.tumpak||"AK140",autoCapitalize:"characters",autoComplete:"off",autoCorrect:"off",spellCheck:!1,enterKeyHint:"next"})]}),fn("Pilihan tumpak",vn,"tumpak"),o.jsxs("label",{children:["Item aktual",o.jsx("input",{value:T.pipa,onChange:un("pipa"),onKeyDown:P,onFocus:q,placeholder:"Ketik atau pilih item",autoComplete:"off",autoCorrect:"off",spellCheck:!1,enterKeyHint:"next"})]}),fn("Pilihan item",hn,"pipa"),o.jsxs("label",{children:["Qty aktual",o.jsx("input",{inputMode:"numeric",enterKeyHint:"done",autoComplete:"off",onKeyDown:P,onFocus:q,value:T.qty,onChange:X=>en({...T,qty:X.target.value.replace(/[^\d]/g,"")}),placeholder:$?"0":String(l.onhand)})]}),o.jsxs("div",{className:"row-act",children:[o.jsx("button",{className:"btn pri agi-savebtn",disabled:!I,onClick:X=>Cn(X,{tumpak:T.tumpak,pipa:T.pipa,qty:T.qty}),children:"Simpan cek"}),u&&o.jsx("button",{className:"btn sec inl",onClick:()=>{A(l.bin),en({tumpak:"",pipa:"",qty:""})},children:"Hapus"})]}),o.jsxs("details",{className:"agi-kls",children:[o.jsxs("summary",{children:["Kelas pipa: ",C||"belum diatur"," (ubah)"]}),o.jsxs("select",{value:C,onChange:X=>M(l.kode,X.target.value),"aria-label":"Kelas pipa untuk item ini",children:[o.jsx("option",{value:"",children:"Belum diatur"}),xt.map(X=>o.jsx("option",{value:X,children:X},X))]})]})]})]})}const dp=[{id:"week",name:"Mingguan"},{id:"month",name:"Bulanan"},{id:"year",name:"Tahunan"}],wt=[{id:"bin",name:"Per Bin"},{id:"dc",name:"DC Harian"},{id:"aging",name:"Aging"},{id:"muat",name:"Muat"},{id:"clr",name:"Clearing"}],ii=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],cp=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],mp=["S","S","R","K","J","S","M"],Sl=l=>String(l).padStart(2,"0"),Ue=l=>l.getFullYear()+"-"+Sl(l.getMonth()+1)+"-"+Sl(l.getDate()),Ot=(l,u)=>new Date(l.getFullYear(),l.getMonth(),l.getDate()+u);function pp(l){const u=new Date(l.getFullYear(),l.getMonth(),l.getDate());return Ot(u,-((u.getDay()+6)%7))}const pa=l=>{if(!l)return"";if(/^\d{4}-\d{2}-\d{2}$/.test(l))return l;const u=new Date(l);return isNaN(u)?"":Ue(u)};function fp(l,u){return l==="month"?new Date(u.getFullYear(),u.getMonth(),1):l==="year"?new Date(u.getFullYear(),0,1):pp(u)}function Pd(l,u,m){return l==="month"?new Date(u.getFullYear(),u.getMonth()+m,1):l==="year"?new Date(u.getFullYear()+m,0,1):Ot(u,7*m)}function Ad(l,u){if(l==="year")return String(u.getFullYear());if(l==="month")return cp[u.getMonth()]+" "+u.getFullYear();const m=Ot(u,6);return u.getDate()+(u.getMonth()===m.getMonth()?"":" "+ii[u.getMonth()])+"–"+m.getDate()+" "+ii[m.getMonth()]+" "+m.getFullYear()}function gp(l,u,m){const C=Ue(m);if(l==="year"){const w=u.getFullYear();return Array.from({length:12},(A,y)=>{const $=w+"-"+Sl(y+1);return{key:$,label:ii[y][0],name:ii[y],isToday:$===C.slice(0,7),isFuture:$>C.slice(0,7)}})}const M=l==="month"?new Date(u.getFullYear(),u.getMonth()+1,0).getDate():7;return Array.from({length:M},(w,A)=>{const y=Ot(u,A),$=Ue(y);return{key:$,label:l==="month"?String(A+1):mp[A],name:String(y.getDate()),isToday:$===C,isFuture:$>C}})}const kl=(l,u)=>l==="year"?u.slice(0,7):u,wl=l=>l.reduce((u,m)=>u+m,0),Td=(l,u)=>wl(u),vs=(l,u)=>u?l/u:null;function ys(l){const u=l.itemOk==null?!0:l.itemOk!==!1,m=l.qtyOk==null?Number(l.diff)===0:l.qtyOk!==!1;return{itemOk:u,qtyOk:m,label:u&&m?"Sesuai":!u&&!m?"Item beda + selisih qty":u?"Selisih qty":"Item beda"}}function _d(l,u,m,{events:C,muat:M,clr:w}){const A=gp(l,u,m),y=new Map(A.map((P,q)=>[P.key,q])),$=()=>({n:0,ok:0,bad:0,acc:null,perB:A.map(()=>0),pos:0,neg:0}),T={bin:$(),dc:$(),aging:$(),muat:$(),clr:$()};Object.assign(T.bin,{qtyOk:0,qtyBad:0,itemOk:0,itemBad:0,perItemBad:A.map(()=>0)});const en={},W=(P,q)=>{const nn=P||"Tanpa petugas";(en[nn]=en[nn]||{bin:0,dc:0,aging:0,muat:0,clr:0})[q]++},U=[];for(const P of C){const q=y.get(kl(l,pa(P.at)));if(q==null||!T[P.mod])continue;const nn=T[P.mod];nn.n++,nn.perB[q]++,P.ok?nn.ok++:nn.bad++;const un=Number(P.diff)||0;if(un>0?nn.pos+=un:nn.neg+=un,P.mod==="bin"){const{qtyOk:vn,itemOk:hn}=ys(P);vn?nn.qtyOk++:nn.qtyBad++,hn?nn.itemOk++:(nn.itemBad++,nn.perItemBad[q]++)}W(P.by,P.mod),U.push(P)}const I=[],L=[];Object.assign(T.muat,{spm:0,mobil:0,cp:0,days:0});for(const P of M){const q=y.get(kl(l,pa(P.tgl)));q!=null&&(T.muat.perB[q]++,T.muat.n++,T.muat.days++,T.muat.spm+=Number(P.dp)||0,T.muat.mobil+=Number(P.total)||0,T.muat.cp+=Number(P.cpS)||0,W(P.by,"muat"),I.push(P))}Object.assign(T.clr,{vouchers:0,days:0});for(const P of w){const q=y.get(kl(l,pa(P.tgl)));if(q==null)continue;const nn=Number(P.n)||0;T.clr.perB[q]+=nn,T.clr.n++,T.clr.days++,T.clr.vouchers+=nn,T.clr.ok+=Number(P.ok)||0,T.clr.bad+=Number(P.bad)||0,W(P.by,"clr"),L.push(P)}for(const P of["bin","dc","aging"])T[P].acc=vs(T[P].ok,T[P].n);return T.clr.acc=vs(T.clr.ok,T.clr.vouchers),T.bin.accQty=vs(T.bin.qtyOk,T.bin.n),T.bin.accItem=vs(T.bin.itemOk,T.bin.n),{m:T,who:en,bk:A,inRange:U,muatIn:I,clrIn:L}}const hp=(l,u)=>l==="year"?new Date(u.getFullYear(),11,31):l==="month"?new Date(u.getFullYear(),u.getMonth()+1,0):Ot(u,6),Md=(l,u)=>Math.round((new Date(u.getFullYear(),u.getMonth(),u.getDate())-new Date(l.getFullYear(),l.getMonth(),l.getDate()))/864e5)+1;function kp({period:l="week",start:u,today:m=new Date,events:C=[],muat:M=[],clr:w=[],staff:A=[],agingTodo:y=0,areaTotals:$={},binTodo:T=0,filters:en={}}){const W=en.area||"",U=en.by||"",I=R=>(!U||(R.by||"Tanpa petugas")===U)&&(!W||R.area==null||R.area===W),L=C.filter(I),P=M.filter(R=>!U||(R.by||"Tanpa petugas")===U),q=w.filter(R=>!U||(R.by||"Tanpa petugas")===U),nn={events:L,muat:P,clr:q},un=_d(l,u,m,nn),vn=Pd(l,u,-1),hn=_d(l,vn,m,nn),fn=Math.max(1,un.bk.filter(R=>!R.isFuture).length),Cn=hp(l,u),pn=Md(u,Cn),An=Math.max(1,Math.min(pn,Md(u,m))),X=un.m,bn=hn.m,yn={},wn={};for(const R of wt)yn[R.id]=Td(R.id,X[R.id].perB),wn[R.id]=Td(R.id,bn[R.id].perB.slice(0,fn));const jn=wl(wt.map(R=>yn[R.id])),On=wl(wt.map(R=>wn[R.id])),Fn=Object.entries(un.who).map(([R,Z])=>({name:R,...Z,total:Z.bin+Z.dc+Z.aging+Z.muat+Z.clr})).sort((R,Z)=>Z.total-R.total||R.name.localeCompare(Z.name)),j=A.filter(R=>!un.who[R]&&(!U||R===U)),tn=un.inRange.filter(R=>R.mod==="bin"),B={};Object.keys($).forEach(R=>B[R]={area:R,total:$[R],n:0,ok:0,bad:0,pos:0,neg:0}),tn.forEach(R=>{const Z=B[R.area||"–"]=B[R.area||"–"]||{area:R.area||"–",total:0,n:0,ok:0,bad:0,pos:0,neg:0};Z.n++,R.ok?Z.ok++:Z.bad++;{const zn=ys(R);Z.qtyBad=(Z.qtyBad||0)+(zn.qtyOk?0:1),Z.itemBad=(Z.itemBad||0)+(zn.itemOk?0:1)}const Fe=Number(R.diff)||0;Fe>0?Z.pos+=Fe:Z.neg+=Fe});const V=Object.values(B).filter(R=>!W||R.area===W).sort((R,Z)=>Z.bad-R.bad||R.area.localeCompare(Z.area)),H=[...tn].sort((R,Z)=>Z.at>R.at?1:-1),k=(R,Z)=>Z.at>R.at?1:-1,_=(R,Z)=>R.ok===Z.ok?k(R,Z):R.ok?1:-1,ln=(R,Z)=>String(Z.tgl)>String(R.tgl)?1:-1,cn={dc:un.inRange.filter(R=>R.mod==="dc").sort(_),aging:un.inRange.filter(R=>R.mod==="aging").sort(_),muat:[...un.muatIn].sort(ln),clr:[...un.clrIn].sort(ln)},g=un.inRange.filter(R=>R.mod==="aging"&&!R.ok).sort((R,Z)=>Math.abs(Number(Z.diff)||0)-Math.abs(Number(R.diff)||0)||(Z.at>R.at?1:-1)).slice(0,8),x=tn.filter(R=>!R.ok).sort((R,Z)=>Math.abs(Number(Z.diff)||0)-Math.abs(Number(R.diff)||0)).slice(0,8),mn=R=>R.map(Z=>pa(Z.tgl)).filter(Boolean).sort()[0]||"",G=mn(M),kn=mn(w),xn=Ue(m),Pn=new Set(P.map(R=>pa(R.tgl))),Bn=[];for(let R=0;R<pn;R++){const Z=Ue(Ot(u,R));Z>=xn||G&&Z<G||!G||Pn.has(Z)||Bn.push(Ot(u,R))}const In=[];if(X.bin.qtyBad&&In.push({lvl:"r",mod:"bin",t:X.bin.qtyBad+" bin selisih qty (stok per bin)"}),X.bin.itemBad&&In.push({lvl:"r",mod:"bin",t:X.bin.itemBad+" rak item tidak sama (kesesuaian rak)"}),X.dc.bad&&In.push({lvl:"r",mod:"dc",t:X.dc.bad+" item DC selisih dengan stok sistem"}),X.aging.bad&&In.push({lvl:"r",mod:"aging",t:X.aging.bad+" rak Aging selisih (qty, tumpak, atau item)"}),X.clr.bad&&In.push({lvl:"r",mod:"clr",t:X.clr.bad+" voucher Clearing belum sesuai"}),y&&In.push({lvl:"a",mod:"aging",t:y+" rak Kuning/Merah belum dicek fisik"}),T&&In.push({lvl:"a",mod:"bin",t:T+" bin belum pernah diperiksa"}),Bn.length){const R=l==="week"?Bn.map(Z=>["Min","Sen","Sel","Rab","Kam","Jum","Sab"][Z.getDay()]):Bn.slice(0,6).map(Z=>String(Z.getDate())+(l==="year"?" "+ii[Z.getMonth()]:""));In.push({lvl:"a",mod:"muat",t:"Laporan Muat kosong "+Bn.length+" hari"+(l==="year"?"":": "+R.join(", ")+(Bn.length>R.length?" +"+(Bn.length-R.length):""))})}j.length&&In.push({lvl:"i",mod:"usr",t:"Belum ada aktivitas: "+j.slice(0,4).join(", ")+(j.length>4?" +"+(j.length-4):"")});const nt={r:0,a:1,i:2};return In.sort((R,Z)=>nt[R.lvl]-nt[Z.lvl]),{period:l,start:u,end:Cn,label:Ad(l,u),prevLabel:Ad(l,vn),buckets:un.bk,elapsed:fn,totalDays:pn,elapsedDays:An,mods:X,mains:yn,prevMains:wn,delta:{...Object.fromEntries(wt.map(R=>[R.id,yn[R.id]-wn[R.id]])),kes:X.bin.itemBad-hn.m.bin.itemBad},total:jn,prevTotal:On,people:Fn,flags:In,areas:V,bins:H,topBad:x,agingBad:g,lists:cn,missing:Bn.length,coverage:{muatSince:G,clrSince:kn,muatCut:!!G&&G>Ue(u),clrCut:!!kn&&kn>Ue(u)}}}const Kt=l=>l==null?"n":l>=.95?"g":l>=.85?"a":"r",fe=l=>l==null?"–":Math.round(l*100)+"%",vp=(l,u)=>Kt(u?Math.min(1,l/u):null),bp={week:"MINGGUAN",month:"BULANAN",year:"TAHUNAN"};function yp(l,{area:u="",by:m=""}={}){const C=l.mods,M=A=>l.delta[A]>0?" (+"+l.delta[A]+")":l.delta[A]<0?" ("+l.delta[A]+")":"",w=["*LAPORAN "+bp[l.period]+" GUDANG*",l.label+(u?" · Area "+u:"")+(m?" · "+m:""),""];return w.push("Stok per Bin: "+C.bin.n+" diperiksa, qty sesuai "+fe(C.bin.accQty)+", selisih qty "+C.bin.qtyBad+M("bin")),w.push("Kesesuaian Rak: item sama "+fe(C.bin.accItem)+", item tidak sama "+C.bin.itemBad),w.push("DC Harian: "+C.dc.n+" item selesai, sesuai "+fe(C.dc.acc)+", selisih "+C.dc.bad+M("dc")),w.push("Aging: "+C.aging.n+" rak dicek, sesuai "+fe(C.aging.acc)+", selisih "+C.aging.bad+M("aging")),w.push("Muat: "+C.muat.days+"/"+l.elapsedDays+" hari lapor, "+C.muat.spm+" SPM, "+C.muat.mobil+" mobil"+M("muat")),w.push("Clearing: "+C.clr.vouchers+" voucher, sesuai "+fe(C.clr.acc)+", belum sesuai "+C.clr.bad+M("clr")),l.areas.some(A=>A.n)&&(w.push("","*Per area (bin)*"),l.areas.filter(A=>A.n).slice(0,8).forEach(A=>w.push("- "+A.area+": "+A.n+"/"+A.total+" diperiksa, selisih "+A.bad))),l.agingBad.length&&(w.push("","*Rak Aging selisih*"),l.agingBad.slice(0,5).forEach(A=>w.push("- "+A.key+": "+(A.why||"selisih")+(A.tumpakSys?" (tumpak "+A.tumpakSys+(A.tumpak&&A.tumpak!==A.tumpakSys?" → "+A.tumpak:"")+")":"")+(A.by?" ("+A.by+")":"")))),l.topBad.length&&(w.push("","*Selisih terbesar*"),l.topBad.slice(0,5).forEach(A=>w.push("- "+A.key+": "+(Number(A.diff)>0?"+":"")+(Number(A.diff)||0)+(A.by?" ("+A.by+")":"")))),l.people.length&&(w.push("","*Petugas teraktif*"),l.people.slice(0,5).forEach((A,y)=>w.push(y+1+". "+A.name+" – "+A.total+" aktivitas"))),w.push("","*Perlu perhatian*"),l.flags.length?l.flags.forEach(A=>w.push("- "+A.t)):w.push("- Tidak ada"),w.join(`
`)}function Sp(l,u){const m=y=>'"'+String(y==null?"":y).replace(/"/g,'""')+'"',C=[["Modul","Waktu","Petugas","Bin/Item","Area","Item","Sistem","Fisik","Selisih","Status","Tumpak Sistem","Tumpak Aktual","Item Aktual","Keterangan"]],M={bin:"Per Bin",dc:"DC Harian",aging:"Aging"},w=Ue(l.start),A=Ue(l.end);return u.filter(y=>{const $=pa(y.at);return $>=w&&$<=A}).sort((y,$)=>(y.at>$.at)-(y.at<$.at)).forEach(y=>{var $,T;return C.push([M[y.mod]||y.mod,y.at,y.by||"",y.key||"",y.area||"",y.item||"",($=y.sys)!=null?$:"",(T=y.fis)!=null?T:"",Number(y.diff)||0,y.mod==="bin"?ys(y).label:y.ok?"Sesuai":"Selisih",y.tumpakSys||"",y.tumpak||"",y.itemAct||"",y.why||""])}),"\uFEFF"+C.map(y=>y.map(m).join(",")).join(`\r
`)}const ti={kes:"#b91c1c",bin:"#1d4ed8",dc:"#0f766e",aging:"#c2410c",muat:"#7c3aed",clr:"#be185d"},jd="warehouse_so_rptp_v1",Bd=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],Bt=l=>{const u=new Date(l);return isNaN(u)?"":u.getDate()+" "+Bd[u.getMonth()]+" "+String(u.getHours()).padStart(2,"0")+"."+String(u.getMinutes()).padStart(2,"0")},Ze=l=>(l>0?"+":l<0?"−":"")+K(Math.abs(l));function wp({vals:l,bk:u,color:m}){const C=Math.max(1,...l);return o.jsx("span",{className:"rpt-spark"+(u.length>12?" dense":""),style:{gridTemplateColumns:"repeat("+u.length+",1fr)"},"aria-hidden":"true",children:l.map((M,w)=>o.jsx("i",{className:(u[w].isToday?"now ":"")+(u[w].isFuture?"fut":""),children:o.jsx("b",{style:{height:Math.max(M?14:3,M/C*100)+"%",background:M?m:void 0}})},w))})}function xp(){const l=Cl(),[u,m]=_n.useState(()=>{try{const c=localStorage.getItem(jd);return["week","month","year"].includes(c)?c:"week"}catch{return"week"}}),[C,M]=_n.useState(0),[w,A]=_n.useState(""),[y,$]=_n.useState(""),[T,en]=_n.useState("bad"),[W,U]=_n.useState(10),[I,L]=_n.useState(""),[P,q]=_n.useState(15),[nn,un]=_n.useState(null),[vn,hn]=_n.useState(""),[fn,Cn]=_n.useState(""),[pn,An]=_n.useState(""),[X,bn]=_n.useState(15);if(l.view!=="rpt"||!l.DATA)return o.jsx("section",{id:"v-rpt",hidden:!0});const{DATA:yn,counts:wn,stat:jn,aging:On}=l,Fn=new Date;let j=fp(u,Fn);for(let c=0;c<-C;c++)j=Pd(u,j,-1);const tn=C===0,B=new Map(yn.map(c=>[c.bin,c])),V=[];yn.forEach(c=>{var rn;const p=wn[c.bin];if(p&&p.savedAt){const dn=Number((rn=p.systemQty)!=null?rn:c.onhand)||0;V.push({mod:"bin",at:p.savedAt,by:p.by,ok:jn(c)==="ok",itemOk:p.itemMatch===!0,qtyOk:Number(p.actualQty)===dn,diff:Number(p.actualQty)-dn,key:c.bin,area:c.area,item:c.item,sys:dn,fis:Number(p.actualQty),itemAct:p.itemMatch===!1&&p.actualItem||""})}}),(l.dcRows?l.dcRows():[]).forEach(c=>{(c.st==="ok"||c.st==="bad")&&c.at&&V.push({mod:"dc",at:c.at,by:c.by,ok:c.st==="ok",diff:c.diff,key:c.item,item:c.item,sys:c.sys,fis:c.fis})}),Object.entries(On||{}).forEach(([c,p])=>{const rn=B.get(c);if(!p||!p.at||!rn)return;const dn=Ed(rn,p);V.push({mod:"aging",at:p.at,by:p.by,ok:dn.ok,diff:dn.diff,key:c,area:rn.area,item:rn.item,sys:dn.sys,fis:dn.qty,tumpakSys:rn.tumpak||"",tumpak:dn.tumpak,itemAct:dn.item,why:dn.reasons.join(", ")})});const H=c=>!w||c.area===w,k=yn.filter(c=>H(c)&&$l(c)&&Rd(Ce(c.sinyal))&&!(On||{})[c.bin]).length,_=yn.filter(c=>H(c)&&!wn[c.bin]).length,ln={};yn.forEach(c=>{ln[c.area]=(ln[c.area]||0)+1});const cn=[...new Set([...l.staff().map(c=>c.name),...V.map(c=>c.by).filter(Boolean)])].sort(),g=kp({period:u,start:j,today:Fn,events:V,muat:l.muatHist||[],clr:l.clrHist||[],staff:l.staff().map(c=>c.name),agingTodo:k,binTodo:_,areaTotals:ln,filters:{area:w,by:y}}),x=g.mods,mn=Math.max(1,...g.people.map(c=>c.total)),G={week:"minggu",month:"bulan",year:"tahun"}[u],kn=tn?"Berjalan · hari ke-"+g.elapsedDays+" dari "+g.totalDays:C===-1?G[0].toUpperCase()+G.slice(1)+" lalu":Math.abs(C)+" "+G+" lalu",xn=[{id:"bin",name:"Stok per Bin",main:x.bin.n,sub:"bin diperiksa · selisih qty "+K(x.bin.qtyBad),tag:fe(x.bin.accQty),tn:Kt(x.bin.accQty)},{id:"kes",name:"Kesesuaian Rak",main:x.bin.itemBad,sub:"item tidak sama dari "+K(x.bin.n)+" rak",tag:fe(x.bin.accItem),tn:Kt(x.bin.accItem),perB:x.bin.perItemBad,inv:!0},{id:"dc",main:x.dc.n,sub:"item DC selesai",tag:fe(x.dc.acc),tn:Kt(x.dc.acc)},{id:"aging",main:x.aging.n,sub:"rak Aging dicek",tag:fe(x.aging.acc),tn:Kt(x.aging.acc)},{id:"muat",main:x.muat.days,sub:K(x.muat.spm)+" SPM · "+K(x.muat.mobil)+" mobil",tag:x.muat.days+"/"+g.elapsedDays+" hr",tn:vp(x.muat.days,g.elapsedDays)},{id:"clr",main:K(x.clr.vouchers),sub:"voucher Clearing",tag:fe(x.clr.acc),tn:Kt(x.clr.acc)}],Pn=[["bin",[["Diperiksa",K(x.bin.n)+" / "+K(yn.filter(H).length)],["Qty sesuai",K(x.bin.qtyOk)],["Selisih qty",K(x.bin.qtyBad)],["Qty lebih / kurang",Ze(x.bin.pos)+" / "+Ze(x.bin.neg)]],"Stok per Bin"],["kes",[["Diperiksa",K(x.bin.n)],["Item sama",K(x.bin.itemOk)],["Item tidak sama",K(x.bin.itemBad)],["Sesuai penuh",K(x.bin.ok)+" ("+fe(x.bin.acc)+")"]],"Kesesuaian Rak"],["dc",[["Item selesai",K(x.dc.n)],["Sesuai",K(x.dc.ok)],["Selisih",K(x.dc.bad)],["Qty lebih / kurang",Ze(x.dc.pos)+" / "+Ze(x.dc.neg)]]],["aging",[["Rak dicek",K(x.aging.n)],["Sesuai",K(x.aging.ok)],["Selisih",K(x.aging.bad)],["Kuning/Merah belum dicek",K(k)]]],["muat",[["Hari lapor",x.muat.days+" / "+g.elapsedDays],["SPM",K(x.muat.spm)],["Mobil",K(x.muat.mobil)],["SPM copy rekom.",K(x.muat.cp)]]],["clr",[["Hari clearing",K(x.clr.days)],["Voucher",K(x.clr.vouchers)],["Sesuai",K(x.clr.ok)],["Belum sesuai",K(x.clr.bad)]]]],Bn=c=>ys(c),In=g.bins.filter(c=>T==="all"||(T==="bad"?!Bn(c).qtyOk:T==="item"?!Bn(c).itemOk:c.ok)),nt={bad:g.bins.filter(c=>!Bn(c).qtyOk).length,item:g.bins.filter(c=>!Bn(c).itemOk).length,ok:g.bins.filter(c=>c.ok).length,all:g.bins.length},R=c=>{const p=new Date(String(c).slice(0,10)+"T00:00:00");return isNaN(p)?String(c||""):p.getDate()+" "+Bd[p.getMonth()]+" "+p.getFullYear()},Z=c=>c.filter(([,p])=>p!==""&&p!=null&&p!=="–"),Fe=c=>({t:c.diff===0?"Sesuai":"Qty "+Ze(c.diff),c:c.diff===0?"ok":c.diff>0?"pos":"neg"}),zn=(c,p)=>{if(c==="bin"){const rn=Bn(p);return{k:p.key,b:rn.qtyOk?"Qty sesuai":"Qty "+Ze(p.diff),c:rn.qtyOk?"ok":p.diff>0?"pos":"neg",s:p.item+(p.itemAct?" → ditemukan: "+p.itemAct:"")+" · "+K(p.sys)+" → "+K(p.fis)+(p.by?" · "+p.by:"")+" · "+Bt(p.at),t:(rn.qtyOk?"Jumlah sesuai: sistem "+K(p.sys)+", fisik "+K(p.fis)+".":"Fisik "+(p.diff>0?"LEBIH ":"KURANG ")+K(Math.abs(p.diff))+" dari sistem (sistem "+K(p.sys)+", fisik "+K(p.fis)+").")+(rn.itemOk?"":" Item di rak BERBEDA dari sistem"+(p.itemAct?", ditemukan: "+p.itemAct:"")+"."),d:Z([["Bin",p.key],["Area",p.area],["Item sistem",p.item],["Stok sistem",K(p.sys)],["Qty fisik",K(p.fis)],["Selisih qty",p.diff===0?"Sesuai":Ze(p.diff)],["Kesesuaian item",rn.itemOk?"Sama":"Tidak sama"],["Item ditemukan",p.itemAct],["Petugas",p.by],["Waktu",Bt(p.at)]])}}if(c==="kes")return{k:p.key,b:"Item beda",c:"neg",s:p.item+(p.itemAct?" → ditemukan: "+p.itemAct:"")+(p.by?" · "+p.by:"")+" · "+Bt(p.at),d:zn("bin",p).d};if(c==="dc"){const rn=Fe(p);return{k:p.key,b:rn.t,c:rn.c,s:"sistem "+K(p.sys)+" → fisik "+K(p.fis)+(p.by?" · "+p.by:"")+" · "+Bt(p.at),t:p.diff===0?"Jumlah sesuai: sistem "+K(p.sys)+", fisik "+K(p.fis)+".":"Fisik "+(p.diff>0?"LEBIH ":"KURANG ")+K(Math.abs(p.diff))+" dari sistem (sistem "+K(p.sys)+", fisik "+K(p.fis)+").",d:Z([["Item DC",p.key],["Stok sistem",K(p.sys)],["Qty fisik",K(p.fis)],["Selisih",p.diff===0?"Sesuai":Ze(p.diff)],["Petugas",p.by],["Waktu",Bt(p.at)]])}}return c==="aging"?{k:p.key,b:p.ok?"Sesuai":p.why||"Selisih",c:p.ok?"ok":"neg",s:p.item+" · tumpak "+(p.tumpakSys||"–")+(p.tumpak&&p.tumpak!==p.tumpakSys?" → "+p.tumpak:"")+" · qty "+K(p.sys)+" → "+(p.fis==null?"–":K(p.fis))+(p.by?" · "+p.by:"")+" · "+Bt(p.at),t:p.ok?"Rak ini sudah dicek dan sesuai.":"Rak ini ada selisih: "+(p.why||"perlu dicek ulang")+".",d:Z([["Rak",p.key],["Area",p.area],["Item",p.item],["Tumpak sistem",p.tumpakSys],["Tumpak fisik",p.tumpak],["Qty sistem",K(p.sys)],["Qty fisik",p.fis==null?"":K(p.fis)],["Hasil",p.ok?"Sesuai":p.why||"Selisih"],["Petugas",p.by],["Waktu",Bt(p.at)]])}:c==="muat"?{k:R(p.tgl),b:K(p.dp||0)+" SPM",c:"ok",s:K(p.total||0)+" mobil"+(p.cpS?" · SPM copy "+K(p.cpS):"")+(p.by?" · "+p.by:""),d:Z([["Tanggal",R(p.tgl)],["SPM",K(p.dp||0)],["Mobil",K(p.total||0)],["SPM copy rekomendasi",p.cpS?K(p.cpS):""],["Petugas",p.by]])}:c==="clr"?{k:R(p.tgl),b:K(p.n||0)+" voucher",c:Number(p.bad)?"neg":"ok",s:"sesuai "+K(p.ok||0)+" · belum sesuai "+K(p.bad||0)+(p.by?" · "+p.by:""),d:Z([["Tanggal",R(p.tgl)],["Voucher",K(p.n||0)],["Sesuai",K(p.ok||0)],["Belum sesuai",K(p.bad||0)],["Petugas",p.by]])}:null},It=c=>c==="bin"?[...g.bins].sort((p,rn)=>Bn(p).qtyOk===Bn(rn).qtyOk?0:Bn(p).qtyOk?1:-1).map(p=>zn("bin",p)):c==="kes"?g.bins.filter(p=>!Bn(p).itemOk).map(p=>zn("kes",p)):["dc","aging","muat","clr"].includes(c)?g.lists[c].map(p=>zn(c,p)):[],Ae=c=>c.by||"Tanpa petugas",et=c=>[].concat(g.bins.filter(p=>Ae(p)===c).map(p=>({...zn("bin",p),m:"Bin"})),g.lists.dc.filter(p=>Ae(p)===c).map(p=>({...zn("dc",p),m:"DC"})),g.lists.aging.filter(p=>Ae(p)===c).map(p=>({...zn("aging",p),m:"Aging"})),g.lists.muat.filter(p=>Ae(p)===c).map(p=>({...zn("muat",p),m:"Muat"})),g.lists.clr.filter(p=>Ae(p)===c).map(p=>({...zn("clr",p),m:"Clearing"}))),Te=(c,p,rn)=>o.jsxs("div",{className:"rpt-b click",role:"button",tabIndex:0,onClick:()=>un(c),onKeyDown:dn=>{(dn.key==="Enter"||dn.key===" ")&&(dn.preventDefault(),un(c))},children:[o.jsxs("div",{className:"rpt-bt",children:[o.jsxs("b",{children:[c.m?c.m+" · ":"",c.k]}),o.jsx("span",{className:"rpt-df "+c.c,children:c.b})]}),o.jsx("small",{children:c.s})]},rn+c.k+p),fa=c=>p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),c())},ga=c=>{L(I===c?"":c),q(15)},ha=c=>{An(pn===c?"":c),bn(15)},si=c=>{m(c),M(0),U(10);try{localStorage.setItem(jd,c)}catch{}},ka=()=>l.outText(yp(g,{area:w,by:y})).then(()=>l.toast("Tersalin. Tempel di WhatsApp."),()=>l.toast("Gagal menyalin. Izinkan akses clipboard di browser.")),Ht=()=>{const c=document.createElement("a");c.href=URL.createObjectURL(new Blob([Sp(g,V.filter(p=>(!y||(p.by||"Tanpa petugas")===y)&&(!w||p.area==null||p.area===w)))],{type:"text/csv;charset=utf-8"})),c.download="laporan-"+u+"-"+Ue(g.start)+".csv",document.body.appendChild(c),c.click(),c.remove(),setTimeout(()=>URL.revokeObjectURL(c.href),1500)},ri=(c,p)=>u==="month"?p===0||(p+1)%10===0&&p<g.buckets.length-2?c.label:"":c.label;return o.jsxs("section",{id:"v-rpt",hidden:!0,className:"rpt",children:[o.jsxs("p",{className:"rpt-tip",role:"note",children:[o.jsx("b",{"aria-hidden":"true",children:"👆"})," Ketuk baris mana pun untuk melihat detailnya. Ketuk lagi untuk menutup."]}),o.jsx("div",{className:"chips rpt-per",role:"group","aria-label":"Periode laporan",children:dp.map(c=>o.jsx("button",{className:"chip"+(u===c.id?" on":""),"aria-pressed":u===c.id,onClick:()=>si(c.id),children:c.name},c.id))}),o.jsxs("div",{className:"rpt-nav",children:[o.jsx("button",{className:"btn sm","aria-label":"Sebelumnya",onClick:()=>{M(C-1),U(10)},children:"‹"}),o.jsxs("div",{className:"rpt-wk","aria-live":"polite",children:[o.jsx("b",{children:g.label}),o.jsx("small",{children:kn})]}),o.jsx("button",{className:"btn sm","aria-label":"Berikutnya",disabled:tn,onClick:()=>{M(Math.min(0,C+1)),U(10)},children:"›"})]}),!tn&&o.jsxs("button",{className:"chip rpt-now",onClick:()=>{M(0),U(10)},children:["Kembali ke ",G," ini"]}),o.jsxs("div",{className:"rpt-flt",children:[o.jsxs("label",{children:["Area",o.jsxs("select",{value:w,onChange:c=>{A(c.target.value),U(10)},children:[o.jsx("option",{value:"",children:"Semua area"}),l.areas().map(c=>o.jsx("option",{value:c,children:c},c))]})]}),o.jsxs("label",{children:["Petugas",o.jsxs("select",{value:y,onChange:c=>{$(c.target.value),U(10)},children:[o.jsx("option",{value:"",children:"Semua petugas"}),cn.map(c=>o.jsx("option",{value:c,children:c},c))]})]})]}),w&&o.jsx("p",{className:"rpt-fn",children:"Filter area berlaku untuk Per Bin dan Aging. DC, Muat, dan Clearing tidak dibagi per area."}),o.jsxs("div",{className:"card rpt-sum",role:"table","aria-label":"Ringkasan aktivitas",children:[o.jsxs("div",{className:"rpt-hd",role:"row",children:[o.jsx("span",{children:"Aktivitas"}),o.jsx("span",{children:o.jsx("span",{className:"rpt-days"+(g.buckets.length>7?" dense":""),style:{gridTemplateColumns:"repeat("+g.buckets.length+",1fr)"},"aria-hidden":"true",children:g.buckets.map((c,p)=>o.jsx("i",{className:c.isToday?"now":"",children:ri(c,p)},c.key))})}),o.jsx("span",{children:"vs lalu"})]}),xn.map(c=>{const p=c.name?{name:c.name}:wt.find(qn=>qn.id===c.id),rn=g.delta[c.id],dn=I===c.id,ne=dn?It(c.id):[];return o.jsxs("div",{className:"rpt-grp"+(dn?" open":""),children:[o.jsxs("div",{className:"rpt-row",role:"row",style:{"--mc":ti[c.id]},tabIndex:0,"aria-expanded":dn,"aria-controls":"rptd-"+c.id,onClick:()=>ga(c.id),onKeyDown:qn=>{(qn.key==="Enter"||qn.key===" ")&&(qn.preventDefault(),ga(c.id))},children:[o.jsxs("div",{className:"rpt-nm",role:"cell",children:[o.jsx("b",{children:p.name}),o.jsx("small",{children:c.sub})]}),o.jsxs("div",{className:"rpt-mid",role:"cell",children:[o.jsx("span",{className:"rpt-big",children:c.main}),o.jsx(wp,{vals:c.perB||x[c.id].perB,bk:g.buckets,color:ti[c.id]})]}),o.jsxs("div",{className:"rpt-rt",role:"cell",children:[o.jsx("span",{className:"rpt-dl "+(c.inv?"inv ":"")+(rn>0?"up":rn<0?"dn":""),"aria-label":rn>0?"naik "+rn:rn<0?"turun "+-rn:"sama",children:rn>0?"▲"+K(rn):rn<0?"▼"+K(-rn):"＝"}),o.jsx("span",{className:"rpt-tag t-"+c.tn,children:c.tag})]})]}),dn&&o.jsxs("div",{className:"rpt-dtl",id:"rptd-"+c.id,style:{"--mc":ti[c.id]},children:[ne.length?ne.slice(0,P).map((qn,qe)=>Te(qn,qe,"s")):o.jsx("p",{className:"hint",children:"Belum ada catatan pada periode ini."}),ne.length>P&&o.jsxs("button",{className:"btn sm",onClick:()=>q(P+20),children:["Tampilkan lebih (",ne.length-P," lagi)"]})]})]},c.id)}),o.jsxs("p",{className:"rpt-foot",children:["Ketuk baris untuk melihat rincian. ",u==="week"?"Batang = Sen–Min":u==="month"?"Batang = tiap tanggal":"Batang = Jan–Des",", garis = ",u==="year"?"bulan":"hari"," ini. “vs lalu” dibanding ",g.prevLabel,tn?" pada titik waktu yang sama":"",". Label: hijau ≥95%, kuning ≥85%, merah di bawahnya."]})]}),o.jsx("h3",{className:"rpt-h",children:"Perlu perhatian"}),o.jsx("div",{className:"card rpt-fl",children:g.flags.length?g.flags.map((c,p)=>o.jsxs("div",{className:"rpt-f f-"+c.lvl,children:[o.jsx("i",{"aria-hidden":"true",children:c.lvl==="r"?"!":c.lvl==="a"?"•":"i"}),o.jsx("span",{children:c.t})]},p)):o.jsxs("div",{className:"rpt-f f-g",children:[o.jsx("i",{"aria-hidden":"true",children:"✓"}),o.jsx("span",{children:"Tidak ada yang perlu ditindaklanjuti."})]})}),o.jsx("h3",{className:"rpt-h",children:"Rincian per modul"}),o.jsx("div",{className:"rpt-dt",children:Pn.map(([c,p,rn])=>{const dn=pn===c,ne=dn?It(c):[];return o.jsxs("div",{className:"card rpt-dc"+(dn?" open":""),style:{"--mc":ti[c]},children:[o.jsxs("div",{className:"rpt-dh",role:"button",tabIndex:0,"aria-expanded":dn,"aria-controls":"rptr-"+c,onClick:()=>ha(c),onKeyDown:qn=>{(qn.key==="Enter"||qn.key===" ")&&(qn.preventDefault(),ha(c))},children:[o.jsx("b",{children:rn||wt.find(qn=>qn.id===c).name}),o.jsx("dl",{children:p.map(([qn,qe])=>o.jsxs("div",{children:[o.jsx("dt",{children:qn}),o.jsx("dd",{children:qe})]},qn))})]}),dn&&o.jsxs("div",{className:"rpt-dtl",id:"rptr-"+c,children:[ne.length?ne.slice(0,X).map((qn,qe)=>Te(qn,qe,"r")):o.jsx("p",{className:"hint",children:"Belum ada catatan pada periode ini."}),ne.length>X&&o.jsxs("button",{className:"btn sm",onClick:()=>bn(X+20),children:["Tampilkan lebih (",ne.length-X," lagi)"]})]})]},c)})}),o.jsxs("h3",{className:"rpt-h",children:["Per Bin: stok & kesesuaian rak ",o.jsxs("small",{children:[K(x.bin.n)," diperiksa · qty ",fe(x.bin.accQty)," · item ",fe(x.bin.accItem)]})]}),o.jsxs("div",{className:"card rpt-ar",children:[o.jsxs("div",{className:"rpt-art rpt-arh",children:[o.jsx("span",{children:"Area"}),o.jsx("span",{children:"Periksa"}),o.jsx("span",{children:"Selisih qty"}),o.jsx("span",{children:"Item beda"}),o.jsx("span",{children:"Qty OK"})]}),g.areas.length?g.areas.map(c=>{const p=vn===c.area,rn=p?g.bins.filter(dn=>dn.area===c.area).map(dn=>zn("bin",dn)):[];return o.jsxs("div",{className:"rpt-ag"+(p?" open":""),children:[o.jsxs("div",{className:"rpt-art click",role:"button",tabIndex:0,"aria-expanded":p,onClick:()=>hn(p?"":c.area),onKeyDown:fa(()=>hn(p?"":c.area)),children:[o.jsx("b",{children:c.area}),o.jsxs("span",{children:[K(c.n),o.jsxs("small",{children:[" / ",K(c.total)]})]}),o.jsx("span",{className:c.qtyBad?"bad":"",children:K(c.qtyBad||0)}),o.jsx("span",{className:c.itemBad?"bad":"",children:K(c.itemBad||0)}),o.jsx("span",{className:"rpt-tag t-"+Kt(c.n?(c.n-(c.qtyBad||0))/c.n:null),children:c.n?fe((c.n-(c.qtyBad||0))/c.n):"–"})]}),p&&o.jsxs("div",{className:"rpt-dtl",children:[rn.length?rn.slice(0,30).map((dn,ne)=>Te(dn,ne,"a")):o.jsx("p",{className:"hint",children:"Belum ada bin diperiksa di area ini."}),rn.length>30&&o.jsxs("p",{className:"hint",children:["Menampilkan 30 dari ",rn.length,". Gunakan filter Area di atas untuk daftar lengkap."]})]})]},c.area)}):o.jsx("p",{className:"hint",children:"Tidak ada data area."})]}),g.topBad.length>0&&o.jsxs(o.Fragment,{children:[o.jsx("h3",{className:"rpt-h",children:"Selisih terbesar"}),o.jsx("div",{className:"card rpt-tb",children:g.topBad.map((c,p)=>{const rn=zn("bin",c);return Te({...rn,b:Ze(c.diff),c:c.diff>0?"pos":"neg"},p,"t")})})]}),g.agingBad.length>0&&o.jsxs(o.Fragment,{children:[o.jsxs("h3",{className:"rpt-h",children:["Rak Aging selisih ",o.jsxs("small",{children:[g.mods.aging.bad," rak"]})]}),o.jsx("div",{className:"card rpt-tb",children:g.agingBad.map((c,p)=>Te(zn("aging",c),p,"g"))})]}),o.jsx("h3",{className:"rpt-h",children:"Daftar bin diperiksa"}),o.jsx("div",{className:"chips rpt-bf",role:"group","aria-label":"Filter daftar bin",children:[["bad","Selisih qty"],["item","Item beda"],["ok","Sesuai"],["all","Semua"]].map(([c,p])=>o.jsxs("button",{className:"chip"+(T===c?" on":""),"aria-pressed":T===c,onClick:()=>{en(c),U(10)},children:[p," ",o.jsx("b",{children:nt[c]})]},c))}),o.jsxs("div",{className:"card rpt-tb",children:[In.length?In.slice(0,W).map((c,p)=>{const rn=zn("bin",c);return Te({...rn,b:rn.b+(Bn(c).itemOk?"":" · Item beda")},p,"l")}):o.jsx("p",{className:"hint",children:"Tidak ada bin pada filter ini."}),In.length>W&&o.jsxs("button",{className:"btn",onClick:()=>U(W+20),children:["Tampilkan lebih (",In.length-W," lagi)"]})]}),o.jsxs("h3",{className:"rpt-h",children:["Aktivitas per petugas ",o.jsxs("small",{children:[K(g.total)," aktivitas",g.prevTotal?" (sebelumnya "+K(g.prevTotal)+")":""]})]}),o.jsx("div",{className:"card rpt-pp",children:g.people.length?g.people.slice(0,10).map(c=>{const p=fn===c.name,rn=p?et(c.name):[];return o.jsxs("div",{className:"rpt-pg"+(p?" open":""),children:[o.jsxs("div",{className:"rpt-p click",role:"button",tabIndex:0,"aria-expanded":p,onClick:()=>Cn(p?"":c.name),onKeyDown:fa(()=>Cn(p?"":c.name)),children:[o.jsxs("div",{className:"rpt-pt",children:[o.jsx("b",{children:c.name}),o.jsx("span",{children:c.total})]}),o.jsx("div",{className:"rpt-pb","aria-hidden":"true",style:{width:Math.max(6,c.total/mn*100)+"%"},children:wt.map(dn=>c[dn.id]?o.jsx("i",{style:{flex:c[dn.id],background:ti[dn.id]}},dn.id):null)}),o.jsx("small",{children:wt.filter(dn=>c[dn.id]).map(dn=>dn.name+" "+c[dn.id]).join(" · ")})]}),p&&o.jsxs("div",{className:"rpt-dtl",children:[rn.length?rn.slice(0,30).map((dn,ne)=>Te(dn,ne,"p")):o.jsx("p",{className:"hint",children:"Tidak ada catatan."}),rn.length>30&&o.jsxs("p",{className:"hint",children:["Menampilkan 30 dari ",rn.length,"."]})]})]},c.name)}):o.jsx("p",{className:"hint",children:"Belum ada aktivitas pada periode ini."})}),o.jsxs("div",{className:"rpt-act",children:[o.jsx("button",{className:"btn pri",onClick:ka,children:"Salin ringkasan WhatsApp"}),o.jsx("button",{className:"btn",onClick:Ht,children:"Unduh CSV (Excel)"}),o.jsx("button",{className:"btn",onClick:()=>window.print(),children:"Cetak / PDF"})]}),o.jsxs("p",{className:"hint rpt-note",children:["Dihitung dari catatan di perangkat ini (tersinkron bila sinkron aktif). Bin/rak yang diperiksa ulang dihitung pada waktu pemeriksaan terakhir.",g.coverage.muatCut&&" Riwayat Muat tersedia sejak "+g.coverage.muatSince+".",g.coverage.clrCut&&" Riwayat Clearing tersedia sejak "+g.coverage.clrSince+"."," ","Riwayat Muat dan Clearing hanya menyimpan 60 hari terakhir, jadi laporan tahunan untuk dua modul itu terbatas pada rentang tersebut."]}),nn&&o.jsx("div",{className:"rpt-ov",onClick:()=>un(null),onKeyDown:c=>{c.key==="Escape"&&un(null)},children:o.jsxs("div",{className:"rpt-md card",role:"dialog","aria-modal":"true","aria-label":"Detail "+nn.k,onClick:c=>c.stopPropagation(),children:[o.jsxs("div",{className:"rpt-bt",children:[o.jsxs("b",{children:[nn.m?nn.m+" · ":"",nn.k]}),o.jsx("span",{className:"rpt-df "+nn.c,children:nn.b})]}),nn.t&&o.jsx("p",{className:"rpt-sm "+nn.c,children:nn.t}),o.jsx("dl",{children:(nn.d||[]).map(([c,p])=>o.jsxs("div",{children:[o.jsx("dt",{children:c}),o.jsx("dd",{children:p})]},c))}),o.jsx("button",{className:"btn pri",autoFocus:!0,onClick:()=>un(null),children:"Tutup"})]})})]})}const $p=`/* Tidak ada data contoh: aplikasi mulai kosong, data WMS diimpor dari menu Data WMS atau disinkronkan dari server. */
      const DEMO_DATA = [];
`,Cp=`/* Inti: penyimpanan (ld/sv), state global, util (fmt/esc/stat), toast, dialog ask
   asal: index-fixd.html baris 2410-2622 */
      const K_M = "warehouse_so_master_v2",
        K_C = "warehouse_so_counts_v2",
        K_F = "warehouse_so_codefix_v1",
        K_B = "warehouse_so_backup_v1";
      const $ = (id) => document.getElementById(id);
      // jam terkoreksi waktu server (selisih diisi saat sinkron): cap waktu antar-HP tetap adil walau jam HP meleset
      window.__clkOff = 0;
      const nowIso = () => new Date(Date.now() + (window.__clkOff || 0)).toISOString();
      window.nowIso = nowIso;
      const corrupt = [];
      const ld = (k, d) => {
        let raw = null;
        try {
          raw = localStorage.getItem(k);
          return JSON.parse(raw) || d;
        } catch (e) {
          // data rusak: simpan salinan mentah supaya tidak tertimpa diam-diam
          if (raw) {
            corrupt.push(k);
            try {
              if (raw.length < 1e6) localStorage.setItem(k + "__rusak", raw);
            } catch (_) {}
          }
          return d;
        }
      };
      const failed = new Set(); // kunci yang gagal ditulis ke penyimpanan
      let bk = ld(K_B, { at: null, n: 0 }); // cadangan terakhir + jumlah perubahan sejak itu
      const saveBk = () => {
        try {
          localStorage.setItem(K_B, JSON.stringify(bk));
        } catch (e) {}
      };
      let gdT = 0;
      const gdSoon = () => {
        clearTimeout(gdT);
        gdT = setTimeout(() => guardUi(), 300);
      };
      const sv = (k, v) => {
        try {
          localStorage.setItem(k, JSON.stringify(v));
          failed.delete(k);
          // string literal (bukan K_U/K_T): konstanta itu dideklarasikan lebih bawah dan belum siap saat sv() dipanggil awal
          if (k === K_C || k === "warehouse_dc_v1" || k === "warehouse_so_users_v1" || k === "warehouse_so_tasks_v1") {
            bk.n++;
            saveBk();
          }
          gdSoon();
          if (window.__syncHook) window.__syncHook(k);
          return true;
        } catch (e) {
          failed.add(k);
          gdSoon();
          return false;
        }
      };
      const undoStack = [];
      let navList = [];
      let DATA = ld(K_M, null) || DEMO_DATA,
        counts = ld(K_C, {}),
        codeFix = ld(K_F, {}),
        sel = null,
        match = null,
        lf = "all",
        cf = "problem",
        list = [];
      const K_CFG = "warehouse_so_cfg_v1";
      let cfg = ld(K_CFG, {});
      if (typeof cfg !== "object" || Array.isArray(cfg)) cfg = {};
      const CFG_IDS = ["kfa", "kfb", "klow", "aSite", "aKat", "aLoc", "mgudang", "mpelapor", "mdefcp"];
      const applyCfg = () => CFG_IDS.forEach((i) => { if (cfg[i] != null && $(i)) $(i).value = cfg[i]; });
      document.addEventListener("input", (e) => {
        const id = e.target && e.target.id;
        if (CFG_IDS.includes(id)) {
          cfg[id] = e.target.value;
          sv(K_CFG, cfg);
        }
      });
      const isDemoData = () => false;
      let saveBusy = false;
      const K_T = "warehouse_so_tasks_v1";
      let tasks = ld(K_T, {});
      if (typeof tasks !== "object" || Array.isArray(tasks)) tasks = {};
      const isTaskPend = (x) => {
        const t = tasks[x.bin];
        if (!t) return false;
        const c = counts[x.bin];
        if (c && c.savedAt >= t.at) return false;
        return !curU || t.u === curU;
      };
      const tkMine = () => DATA.filter((x) => tasks[x.bin] && (!curU || tasks[x.bin].u === curU));
      /* Tampilan qty sistem untuk petugas: ditentukan admin, bersyarat. Urutan: aturan per tugas > aturan per user > pengaturan umum (cfg.blind) */
      const isBlindFor = (bin) => {
        const t = bin ? tasks[bin] : null;
        if (t && typeof t.show === "boolean") return !t.show;
        const u = typeof curUser === "function" ? curUser() : null;
        if (u && (u.view === "buta" || u.view === "tampil")) return u.view === "buta";
        return !!cfg.blind;
      };
      /* Hash password (field user.pin) dan kunci percobaan masuk */
      let supUntil = 0, pinFails = 0, pinLock = 0;
      /* Format baru "p1$iterasi$salt$hash" (PBKDF2-SHA256, salt acak per user). Hash ini ikut sinkron antar perangkat,
         jadi harus lambat dan bergaram. Hash lama (SHA-256 polos "sc-wms|", atau "w…") masih bisa dicek lalu
         otomatis ditingkatkan saat user berhasil masuk. Butuh HTTPS (crypto.subtle). */
      const PW_ITER = 100000;
      const pwHex = (u8) => [...u8].map((x) => x.toString(16).padStart(2, "0")).join("");
      async function pwDerive(p, salt, iter) {
        const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(p), "PBKDF2", false, ["deriveBits"]);
        return pwHex(new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: iter }, k, 256)));
      }
      async function pinMake(p) {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        return "p1$" + PW_ITER + "$" + pwHex(salt) + "$" + (await pwDerive(p, salt, PW_ITER));
      }
      async function pinLegacy(p) {
        const s0 = "sc-wms|" + p;
        try {
          const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s0));
          return pwHex(new Uint8Array(b));
        } catch (e) {
          let h = 5381;
          for (let i = 0; i < s0.length; i++) h = ((h << 5) + h + s0.charCodeAt(i)) | 0;
          return "w" + h;
        }
      }
      /* Riwayat laporan ringkas: satu baris per laporan (ketuk untuk buka isi + tombol), 7 terbaru saja, sisanya lewat "Tampilkan semua" */
      const HIST_SHOW = 7, histAll = {};
      const histRow = (title, meta, body) => \`<details class="hrow"><summary><span class="hdt"><b>\${title}</b><small>\${meta}</small></span></summary><div class="hbody">\${body}</div></details>\`;
      function histRows(arr, key, rowFn) {
        const all = !!histAll[key], list = all ? arr : arr.slice(0, HIST_SHOW);
        return list.map(rowFn).join("") + (arr.length > HIST_SHOW ? \`<button class="btn sec sm hmore" data-more type="button">\${all ? "Ringkas (7 terbaru)" : "Tampilkan semua (" + arr.length + ")"}</button>\` : "");
      }
      const histMore = (e, key, render) => { if (!e.target.closest("[data-more]")) return false; histAll[key] = !histAll[key]; render(); return true; };
      /* Cegah kedip saat muat ulang otomatis: isi elemen hanya diganti kalau HTML-nya benar-benar berbeda
         (posisi scroll dan bagian yang sedang dibuka ikut terjaga). */
      function keepDom(...ids) {
        if (typeof Element === "undefined") return;
        const d = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
        ids.forEach((id) => {
          const el = document.getElementById(id);
          if (!el) return;
          Object.defineProperty(el, "innerHTML", {
            configurable: true,
            get() { return d.get.call(this); },
            set(v) {
              if (this.__h === v && d.get.call(this)) return;
              d.set.call(this, v);
              this.__h = v;
            },
          });
        });
      }
      const pinIsLegacy = (s) => typeof s === "string" && !s.startsWith("p1$");
      async function pinCheck(p, stored) {
        if (typeof stored !== "string" || !stored) return false;
        if (pinIsLegacy(stored)) return (await pinLegacy(p)) === stored;
        const [, it, sh, hh] = stored.split("$");
        const iter = Number(it);
        if (!(iter >= 1000 && iter <= 1000000) || !/^[0-9a-f]{32}$/.test(sh || "") || !/^[0-9a-f]{64}$/.test(hh || "")) return false;
        try {
          const got = await pwDerive(p, new Uint8Array(sh.match(/../g).map((h) => parseInt(h, 16))), iter);
          let d = 0;
          for (let i = 0; i < 64; i++) d |= got.charCodeAt(i) ^ hh.charCodeAt(i);
          return d === 0;
        } catch (e) {
          return false;
        }
      }
      async function supAuth() {
        if (isAdmin()) return true;
        toast("Hanya admin yang bisa melakukan ini.");
        return false;
      }
      // pekerjaan tingkat supervisor (tugas bin, mulai DC baru): admin atau SPV
      async function leadAuth() {
        if (isSup()) return true;
        toast("Hanya admin atau SPV yang bisa melakukan ini.");
        return false;
      }
            async function nav(v) {
        if (!allowedView(v)) return toast("Anda tidak punya akses ke menu ini.");
        go(v);
        document.title = $("pgT").textContent + " | Stock Control";
        $("pgT").focus({ preventScroll: true });
      }
      const fmt = (n) => Number(n || 0).toLocaleString("id-ID");
      const esc = (s) =>
        String(s ?? "").replace(
          /[&<>"']/g,
          (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
        );
      // ukuran (3", 2 1/2", 1/2") ditandai kuning supaya tidak tertukar
      const szHtml = (n) => esc(n).replace(/(\\d+ \\d+\\/\\d+|\\d+\\/\\d+|\\d+)&quot;/g, '<mark class="sz">$1&quot;</mark>');
      const rakFmt = (r) =>
        String(r)
          .trim()
          .toUpperCase()
          .replace(/-([A-Z])$/, "$1");
      const isProb = (c) => c && (c.itemMatch !== true || Number(c.actualQty) !== Number(c.systemQty));
      const stat = (x) => {
        const c = counts[x.bin];
        return !c ? "todo" : isProb(c) ? "bad" : "ok";
      };
      // tandai input yang salah supaya pembaca layar tahu input mana dan pesannya di mana
      function markInvalid(el, errId) {
        if (!el) return;
        el.setAttribute("aria-invalid", "true");
        el.setAttribute("aria-describedby", errId);
      }
      function clearInvalid(root) {
        root.querySelectorAll("[aria-invalid]").forEach((e) => {
          e.removeAttribute("aria-invalid");
          e.removeAttribute("aria-describedby");
        });
      }
      function toast(m, act) {
        const t = $("toast");
        t.textContent = m;
        if (act) {
          const b = document.createElement("button");
          b.textContent = act.label;
          b.onclick = () => {
            hideToast();
            act.fn();
          };
          t.appendChild(b);
        }
        // di atas tombol Simpan jika ada lembar yang terbuka
        t.classList.toggle("up", !!document.querySelector(".sheet:not([hidden])"));
        t.classList.remove("off");
        clearTimeout(toast.h);
        toast.h = setTimeout(hideToast, act ? 6500 : /gagal|tidak|belum|salah|ditolak|penuh|ditutup|selisih/i.test(m) ? 5500 : 3200);
      }
      function hideToast() {
        const t = $("toast");
        t.classList.add("off");
        setTimeout(() => { if (t.classList.contains("off")) t.textContent = ""; }, 200);
      }
      function ask(title, msg, ok, danger) {
        return new Promise((res) => {
          const d = $("dlg");
          d.innerHTML = \`<div><h3 id="dlgT">\${esc(title)}</h3><p>\${esc(msg)}</p><button class="btn \${danger ? "dng" : "pri"}" id="dOk">\${esc(ok)}</button><button class="btn sec" id="dNo">Batal</button></div>\`;
          d.hidden = false;
          const f = (v) => {
            d.hidden = true;
            res(v);
          };
          $("dOk").onclick = () => f(true);
          $("dNo").onclick = () => f(false);
          $("dNo").focus();
        });
      }
      // konfirmasi berbahaya: harus mengetik kata tertentu (huruf besar-kecil dibedakan) dan menunggu hitung mundur
      function askType(title, msg, word, ok, wait) {
        return new Promise((res) => {
          const d = $("dlg");
          d.innerHTML = \`<div><h3 id="dlgT">\${esc(title)}</h3><p>\${esc(msg)}</p><label for="dTy" style="margin:0">Ketik <b>\${esc(word)}</b> (huruf besar semua) untuk melanjutkan</label><input id="dTy" autocomplete="off" autocapitalize="characters" spellcheck="false" /><button class="btn dng" id="dOk" disabled></button><button class="btn sec" id="dNo">Batal</button></div>\`;
          d.hidden = false;
          let left = wait == null ? 3 : wait;
          const inp = $("dTy"), okb = $("dOk");
          const upd = () => {
            okb.disabled = left > 0 || inp.value !== word;
            okb.textContent = left > 0 ? ok + " (" + left + " dtk)" : ok;
          };
          const tm = setInterval(() => {
            left--;
            if (left <= 0) clearInterval(tm);
            upd();
          }, 1000);
          const f = (v) => {
            clearInterval(tm);
            d.hidden = true;
            res(v);
          };
          inp.oninput = upd;
          okb.onclick = () => {
            if (!okb.disabled) f(true);
          };
          $("dNo").onclick = () => f(false);
          upd();
          inp.focus();
        });
      }
`,Ap=`/* Daftar bin + lembar periksa
   asal: index-fixd.html baris 2623-2738 */
      /* ---------- daftar bin ---------- */
      const areas = () => [...new Set(DATA.map((x) => x.area))].sort();
      /* Daftar area dinamis (diatur admin di menu User & Area, ikut tersinkron). Awalnya sesuai papan area gudang.
         Dipakai untuk pemeriksaan per bin dan cek kesesuaian; bin-nya datang dari kolom Area di Informasi Rak WMS. */
      const AREA_DEFAULT = ["MC", "L", "D1", "D2", "C2", "C1", "B2", "B1", "A2", "E", "F", "M", "A1", "G", "O", "P", "N", "H"];
      const K_AC = "warehouse_so_areacfg_v1";
      let areaCfg = ld(K_AC, null);
      const areaBase = () => (areaCfg && Array.isArray(areaCfg.list) ? areaCfg.list : AREA_DEFAULT);
      const allAreas = () => [...new Set([...areaBase(), ...DATA.map((x) => x.area)])];
      function chipsHtml(cur, opts) {
        return opts
          .map(
            ([k, l, n]) => \`<button class="chip \${cur === k ? "on" : ""}" data-k="\${k}" aria-pressed="\${cur === k}">\${l} \${n}</button>\`,
          )
          .join("");
      }
      const BIN_MAX = 120; // batas bin yang digambar sekaligus, supaya HP low-end tidak macet
      /* Posisi rak dari huruf akhir nama bin: B = bawah, A = atas. Rak tanpa huruf (mis. G-02) tidak ikut filter, hanya tampil di "Semua rak".
         Dikenali "B1-09B" maupun "B1-09-B"; huruf harus didahului angka supaya nama area/rak lain tidak ikut terhitung. */
      const rakLv = (bin) => {
        const m = /\\d-?([AB])$/i.exec(String(bin).trim());
        return m ? m[1].toUpperCase() : "-";
      };
      const K_RF = "warehouse_so_rakfilter_v1";
      let rf = ld(K_RF, "all");
      if (!["all", "A", "B"].includes(rf)) rf = "all";
      function renderBins() {
        const area = $("area").value,
          q = $("search").value.toLowerCase().trim();
        const baseAll = DATA.filter(
          (x) =>
            (inScope(x.area) || (curU && tasks[x.bin] && tasks[x.bin].u === curU)) &&
            (area === "*" || x.area === area) &&
            (!q || [x.bin, x.kode, x.item].join(" ").toLowerCase().includes(q)),
        );
        // filter posisi rak hanya tampil jika data punya rak berhuruf A/B; selain itu diabaikan (tanpa mengubah pilihan tersimpan)
        const hasAB = DATA.some((x) => rakLv(x.bin) !== "-"),
          rfx = hasAB ? rf : "all",
          rn = (k) => baseAll.filter((x) => rakLv(x.bin) === k).length;
        $("chipsR").hidden = !hasAB;
        $("chipsR").innerHTML = hasAB
          ? chipsHtml(rfx, [
              ["all", "Semua rak", baseAll.length],
              ...[["B", "Bawah (B)"], ["A", "Atas (A)"]]
                .filter(([k]) => rn(k) || rfx === k)
                .map(([k, l]) => [k, l, rn(k)]),
            ])
          : "";
        const base = rfx === "all" ? baseAll : baseAll.filter((x) => rakLv(x.bin) === rfx);
        const n = (s) => base.filter((x) => stat(x) === s).length;
        renderAreaBar(area);
        renderTaskBar();
        taskBadges();
        if (lf === "task" && !base.some(isTaskPend)) lf = "all";
        $("chips").innerHTML = chipsHtml(lf, [
          ["all", "Semua", base.length],
          ...(base.some(isTaskPend) ? [["task", "Tugas", base.filter(isTaskPend).length]] : []),
          ["todo", "Belum", n("todo")],
          ["bad", "Perlu review", n("bad")],
          ["ok", "Sesuai", n("ok")],
        ]);
        list = base.filter((x) => lf === "all" || (lf === "task" ? isTaskPend(x) : stat(x) === lf));
        {
          const todo = (x) => (isTaskPend(x) || !counts[x.bin]) && !isClosed(x.area),
            nxt = list.find((x) => isTaskPend(x) && !isClosed(x.area)) || list.find(todo),
            nb = $("nextBin");
          nb.hidden = !list.length;
          nb.disabled = !nxt;
          nb.dataset.b = nxt ? nxt.bin : "";
          nb.textContent = nxt ? \`Lanjut: \${nxt.bin} · \${fmt(list.filter(todo).length)} belum\` : "Semua bin di daftar ini sudah diperiksa";
        }
        $("binList").innerHTML = list.length
          ? list
              .slice(0, BIN_MAX)
              .map((x) => {
                const s = stat(x),
                  c = counts[x.bin];
                const pill =
                  s === "todo" && isTaskPend(x)
                    ? '<span class="pill amber">Tugas</span>'
                    : s === "todo"
                    ? '<span class="pill">Belum</span>'
                    : s === "ok"
                      ? '<span class="pill green">Sesuai</span>'
                      : \`<span class="pill amber">\${c.itemMatch === false ? "Item beda" : "Selisih qty"}</span>\`;
                return \`<button class="bin \${s === "ok" ? "done-ok" : s === "bad" ? "done-bad" : ""}" data-b="\${esc(x.bin)}"><b>\${esc(x.bin)}</b><span class="it">\${szHtml(x.item)}</span><span class="q">\${cfg.blind && !counts[x.bin] ? "–" : fmt(x.onhand)}<small>qty WMS</small></span><span>\${pill}</span></button>\`;
              })
              .join("") +
            (list.length > BIN_MAX ? \`<p class="fine bin-more">Menampilkan \${fmt(BIN_MAX)} dari \${fmt(list.length)} bin. Pakai filter atau pencarian untuk mempersempit.</p>\` : "")
          : \`<div class="empty">\${base.length ? "Tidak ada bin di filter ini." : curUser() && !visAreas().length ? "Petugas ini belum punya area. Atur di menu User &amp; Area." : "Bin tidak ditemukan."}</div>\`;
      }
      function metrics() {
        const done = DATA.filter((x) => counts[x.bin]).length,
          prob = DATA.filter((x) => stat(x) === "bad").length,
          p = DATA.length ? Math.round((done / DATA.length) * 100) : 0;
        $("pTxt").textContent = \`\${done} dari \${DATA.length} bin diperiksa\`;
        $("pPct").textContent = p + "%";
        $("pBar").style.width = p + "%";
        $("pBarW").setAttribute("aria-valuenow", String(p));
        $("pBarW").setAttribute("aria-valuetext", \`\${done} dari \${DATA.length} bin diperiksa (\${p}%)\`);
        if (!$("v-so").hidden || !$("v-check").hidden)
          $("hSub").textContent = prob ? prob + " bin perlu review" : "Stock Opname per bin";
        $("sBar").style.width = p + "%";
        $("sTxt").textContent = done + " dari " + DATA.length + " bin (" + p + "%)";
        $("dRev").hidden = !prob;
        $("dRev").textContent = prob;
        const kc = kesIssues().filter((i) => i.lv === "bad").length;
        $("dKes").hidden = !kc;
        $("dKes").textContent = kc;
        const a = adjustRows();
        $("dAdj").hidden = !a.rows.length;
        $("dAdj").textContent = a.rows.length;
        $("tRev").hidden = !prob;
        $("tRev").textContent = prob;
        $("tAdj").hidden = !a.rows.length;
        $("tAdj").textContent = a.rows.length;
        taskBadges();
        updUndo();
        dcUpdUndo();
      }
      /* ---------- lembar periksa ---------- */
      function addLine(item = "", qty = "") {
        const d = document.createElement("div");
        d.className = "al";
        const names = [...new Set(DATA.map((x) => x.item))].sort();
        d.innerHTML = \`<div><label>Nama barang</label><select class="li" aria-label="Nama barang"><option value="">Pilih barang</option>\${names.map((n) => \`<option \${n === item ? "selected" : ""}>\${esc(n)}</option>\`).join("")}</select></div><div class="r"><div><label>Qty fisik barang ini</label><input class="lq" aria-label="Qty fisik barang ini" type="number" inputmode="numeric" enterkeyhint="next" autocomplete="off" min="0" step="1" value="\${esc(qty)}" placeholder="0"></div><button class="rm" aria-label="Hapus">×</button></div>\`;
        d.querySelector(".rm").onclick = () => {
          d.remove();
          prev();
        };
        d.querySelectorAll("select,input").forEach((e) => (e.oninput = prev));
        $("lines").appendChild(d);
      }
      const lines = () =>
        [...document.querySelectorAll("#lines .al")]
          .map((r) => ({ item: r.querySelector(".li").value, qty: r.querySelector(".lq").value }))
          .filter((x) => x.item || x.qty !== "");
      function navTarget(dir) {
        const k = sel ? navList.indexOf(sel.bin) : -1;
        if (k < 0) return null;
        for (let j = k + dir; j >= 0 && j < navList.length; j += dir) {
          const x = DATA.find((d) => d.bin === navList[j]);
          if (x && !isClosed(x.area)) return x.bin;
        }
        return null;
      }
`,Tp=`/* Draft isian, buka/simpan sheet periksa, urungkan
   asal: index-fixd.html baris 2739-2999 */
      /* ---------- draft isian bin (4 helper: draft, getar, layar menyala) ---------- */
      const K_DR = "warehouse_so_draft_v1"; // isian yang belum disimpan; hanya di perangkat ini, tidak ikut sinkron/cadangan
      let drafts = ld(K_DR, {}),
        drT = 0;
      if (typeof drafts !== "object" || !drafts || Array.isArray(drafts)) drafts = {};
      function draftNow() {
        clearTimeout(drT);
        if (!sel || $("sheet").hidden) return;
        const al = lines(),
          empty = match === null && $("qty").value === "" && !$("note").value && !al.length;
        if (empty) {
          if (drafts[sel.bin]) {
            delete drafts[sel.bin];
            sv(K_DR, drafts);
          }
          return;
        }
        drafts[sel.bin] = { match, qty: $("qty").value, note: $("note").value, lines: al, at: new Date().toISOString() };
        sv(K_DR, drafts);
      }
      const draftSoon = () => {
        clearTimeout(drT);
        drT = setTimeout(draftNow, 500);
      };
      function draftDrop(bin) {
        clearTimeout(drT);
        if (drafts[bin]) {
          delete drafts[bin];
          sv(K_DR, drafts);
        }
      }
      function clearDrafts() {
        clearTimeout(drT);
        drafts = {};
        sv(K_DR, drafts);
      }
      // getar singkat saat simpan: di lapangan terang dan bising, toast sering tidak terlihat
      const buzz = (pat) => {
        try { if (navigator.vibrate) navigator.vibrate(pat); } catch (e) {}
        try { if (window.__beep) window.__beep(pat); } catch (e) {}
      };
      // layar tidak mati saat lembar hitung terbuka
      let wl = null;
      async function wakeOn() {
        try {
          if (!navigator.wakeLock || wl) return;
          wl = await navigator.wakeLock.request("screen");
          wl.addEventListener("release", () => { wl = null; });
        } catch (e) {
          wl = null;
        }
      }
      function wakeOff() {
        try { if (wl) wl.release(); } catch (e) {}
        wl = null;
      }
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) draftNow();
        else if (!$("sheet").hidden || !$("dcSheet").hidden) wakeOn();
      });
      window.addEventListener("pagehide", draftNow);
      function open(bin, keep) {
        sel = DATA.find((x) => x.bin === bin);
        if (!sel) return;
        if (isClosed(sel.area)) {
          toast("Area " + sel.area + " sudah ditutup. Buka kembali di menu Petugas & Area untuk mengubah.");
          return;
        }
        const c = counts[bin];
        match = c ? c.itemMatch : null;
        // urutan navigasi dibekukan saat lembar dibuka, supaya tidak berubah ketika bin disimpan
        if (!keep || !navList.includes(bin)) navList = list.map((x) => x.bin);
        if (!navList.includes(bin)) navList = [bin];
        $("shBin").textContent = sel.bin;
        const i = navList.indexOf(bin);
        $("shPos").textContent = \`Bin \${i + 1} dari \${navList.length}\` + (c ? " · sudah diisi" : "");
        $("shPrev").disabled = !navTarget(-1);
        $("shNext").disabled = !navTarget(1);
        $("errBk").hidden = true;
        updUndo();
        $("shItem").innerHTML =
          \`<div class="code">Area \${esc(sel.area)} · Kode WMS \${esc(sel.kode)}</div><div class="itemname">\${szHtml(sel.item)}</div>\${isBlindFor(sel.bin) ? \`<div class="kv"><div style="grid-column:1/-1"><small>Mode hitung buta</small><strong>Qty WMS disembunyikan</strong></div></div>\` : \`<div class="kv"><div><small>Qty WMS</small><strong>\${fmt(sel.onhand)}</strong></div><div><small>Free stock</small><strong>\${fmt(sel.freeStock)}</strong></div></div>\`}\`;
        $("qty").value = c ? c.actualQty : "";
        $("note").value = c?.note || "";
        $("lines").innerHTML = "";
        $("err").textContent = "";
        clearInvalid($("sheet"));
        (c?.actualItems || []).forEach((x) => addLine(x.item, x.qty));
        const dr = drafts[bin],
          restored = !!(dr && (!c || String(dr.at) > String(c.savedAt)));
        if (restored) {
          match = dr.match === true || dr.match === false ? dr.match : null;
          $("qty").value = dr.qty == null ? "" : dr.qty;
          $("note").value = dr.note || "";
          $("lines").innerHTML = "";
          (Array.isArray(dr.lines) ? dr.lines : []).forEach((x) => addLine(x.item, x.qty));
          if (match === false && !document.querySelector("#lines .al")) addLine();
        }
        if (!isBlindFor(sel.bin)) {
          $("qSame").textContent = "Sama dengan WMS (" + fmt(sel.onhand) + ")";
          $("qSame").hidden = false;
        } else {
          $("qSame").hidden = true;
          $("qSame").textContent = "Sama dengan WMS"; // jangan simpan angka WMS di DOM saat mode buta
        }
        choice();
        $("sheet").hidden = false;
        document.body.style.overflow = "hidden";
        prev();
        $("sheet").querySelector(".sh-body").scrollTop = 0;
        shDirty = restored;
        if (restored) toast("Draft isian bin ini dipulihkan");
        wakeOn();
      }
      function close() {
        shDirty = false;
        $("sheet").hidden = true;
        if ($("dcSheet").hidden) wakeOff();
        document.body.style.overflow = "";
        renderBins();
        metrics();
      }
      function choice() {
        $("yes").classList.toggle("on", match === true);
        $("no").classList.toggle("on", match === false);
        $("yes").setAttribute("aria-pressed", String(match === true));
        $("no").setAttribute("aria-pressed", String(match === false));
        $("diffWrap").hidden = match !== false;
        $("qLbl").textContent =
          match === false ? "2. Qty barang WMS yang masih ada di bin (isi 0 jika tidak ada)" : "2. Qty fisik";
      }
      function prev() {
        const v = $("qty").value;
        const el = $("prev");
        if (isBlindFor(sel.bin) || match === null || v === "") {
          el.innerHTML = "";
          return;
        }
        const d = Number(v) - sel.onhand,
          good = match === true && d === 0;
        const big = sel.onhand > 0 && Math.abs(d) / sel.onhand >= 0.5 && Math.abs(d) >= 10;
        el.innerHTML = \`<div class="prev \${good ? "good" : "bad"}"><b>\${good ? "Sesuai dengan WMS" : "Perlu review supervisor"}</b><br>\${d ? \`Selisih qty: <b>\${d > 0 ? "+" : ""}\${fmt(d)}</b>\` : "Qty sama"}\${match === false ? " · Item berbeda" : ""}\${big ? '<div class="bigdiff">Selisih besar. Pastikan angka yang diketik sudah benar sebelum menyimpan.</div>' : ""}</div>\`;
      }
      async function save() {
        const v = $("qty").value,
          err = (m, f) => {
            clearInvalid($("sheet"));
            $("err").textContent = m;
            $("errBk").hidden = true;
            if (f) {
              markInvalid(f, "err");
              f.focus();
            }
            return false;
          };
        if (match === null) return err("Pilih YA atau TIDAK dulu.");
        if (v === "" || !Number.isInteger(Number(v)) || Number(v) < 0)
          return err("Isi qty fisik dengan angka bulat 0 atau lebih.", $("qty"));
        const al = lines();
        if (match === false) {
          if (!al.length) return err("Tambahkan barang lain yang ditemukan, atau pilih YA.", $("addL"));
          if (
            al.some((x) => !x.item || x.qty === "" || !Number.isInteger(Number(x.qty)) || Number(x.qty) < 0)
          ) {
            const bad = [...document.querySelectorAll("#lines .li, #lines .lq")].find((e) => e.value === "");
            return err("Lengkapi nama dan qty setiap barang lain.", bad);
          }
        }
        {
          const dd = Number(v) - sel.onhand,
            big = (sel.onhand > 0 && Math.abs(dd) / sel.onhand >= 0.5 && Math.abs(dd) >= 10) || (sel.onhand === 0 && Number(v) >= 50);
          if (big) {
            if (saveBusy) return false;
            saveBusy = true;
            const okk = await ask(
              "Selisih besar, sudah benar?",
              isBlindFor(sel.bin)
                ? "Hasil hitung jauh berbeda dari data WMS. Hitung ulang dulu jika ragu."
                : "WMS " + fmt(sel.onhand) + ", Anda isi " + fmt(Number(v)) + " (selisih " + (dd > 0 ? "+" : "") + fmt(dd) + "). Salah ketik satu digit sering terjadi.",
              "Ya, simpan",
            );
            saveBusy = false;
            if (!okk) {
              $("qty").focus();
              return false;
            }
          }
        }
        const prevRec = counts[sel.bin];
        counts[sel.bin] = {
          itemMatch: match,
          actualItems: match === false ? al.map((x) => ({ item: x.item, qty: Number(x.qty) })) : [],
          actualItem: match ? sel.item : al.map((x) => x.item + " (" + x.qty + ")").join("; "),
          actualQty: Number(v),
          note: $("note").value,
          savedAt: nowIso(),
          by: curName(),
          systemQty: Number(sel.onhand),
          systemItem: sel.item,
        };
        undoStack.push({ bin: sel.bin, prev: prevRec, saved: counts[sel.bin] });
        if (undoStack.length > 30) undoStack.shift();
        if (!sv(K_C, counts)) {
          // jangan lanjut diam-diam: hasil ini hanya ada di layar
          $("err").textContent =
            "Gagal menyimpan ke perangkat (penyimpanan penuh atau diblokir). Data BELUM aman. Unduh cadangan dulu, lalu ketuk Simpan lagi.";
          $("errBk").hidden = false;
          updUndo();
          return false;
        }
        $("errBk").hidden = true;
        draftDrop(sel.bin);
        buzz(isProb(counts[sel.bin]) ? [70, 50, 70] : 40);
        tgBin(sel, counts[sel.bin]);
        const i = list.findIndex((x) => x.bin === sel.bin);
        const nextOk = (x) => !counts[x.bin] && !isClosed(x.area);
        const nx = list.slice(i + 1).find(nextOk) || list.find(nextOk);
        toast("Tersimpan: " + sel.bin);
        if (nx && nx.bin !== sel.bin) {
          renderBins();
          open(nx.bin, true);
        } else {
          close();
          toast("Semua bin di daftar ini sudah diperiksa");
        }
      }
      /* ---------- urungkan simpan terakhir ---------- */
      function undoTop() {
        // buang entri yang sudah tidak berlaku (data direset / diubah dari tempat lain)
        while (undoStack.length) {
          const e = undoStack[undoStack.length - 1];
          if (counts[e.bin] === e.saved) return e;
          undoStack.pop();
        }
        return null;
      }
      function updUndo() {
        const e = undoTop();
        $("undoBar").hidden = !e;
        $("shUndo").hidden = !e;
        if (e) {
          $("undoTxt").textContent = "Terakhir disimpan: " + e.bin;
          $("shUndo").title = "Urungkan simpan " + e.bin;
        }
      }
      async function undo() {
        const e = undoTop();
        if (!e) return;
        const x = DATA.find((d) => d.bin === e.bin);
        if (x && isClosed(x.area)) return toast("Area " + x.area + " sudah ditutup. Buka kembali dulu untuk mengurungkan.");
        const sheetOpen = !$("sheet").hidden;
        if (sheetOpen && shDirty && !(await ask("Urungkan simpan " + e.bin + "?", "Isian yang sedang diketik di bin ini akan hilang.", "Urungkan", true))) return;
        undoStack.pop();
        if (e.prev) counts[e.bin] = e.prev;
        else delete counts[e.bin];
        sv(K_C, counts);
        renderBins();
        metrics();
        if (sheetOpen) open(e.bin, true); // buka lagi bin itu supaya bisa dihitung ulang
        toast("Dibatalkan: " + e.bin + (e.prev ? " (kembali ke isian sebelumnya)" : " (kembali ke Belum)"));
      }
`,_p=`/* Review Supervisor
   asal: index-fixd.html baris 3000-3089 */
      /* ---------- review ---------- */
      function renderCheck() {
        const done = DATA.filter((x) => counts[x.bin]),
          prob = done.filter((x) => stat(x) === "bad"),
          ok = done.filter((x) => stat(x) === "ok");
        $("stats").innerHTML = [
          ["Diperiksa", done.length + "/" + DATA.length, ""],
          ["Sesuai", ok.length, "var(--green)"],
          ["Perlu review", prob.length, "var(--amber)"],
          ["Belum", DATA.length - done.length, ""],
        ]
          .map(
            ([l, v, c]) =>
              \`<div class="stat"><small>\${l}</small><strong style="\${c ? "color:" + c : ""}">\${v}</strong></div>\`,
          )
          .join("");
        $("chipsC").innerHTML = chipsHtml(cf, [
          ["problem", "Perlu review", prob.length],
          ["ok", "Sesuai", ok.length],
          ["todo", "Belum", DATA.length - done.length],
          ["all", "Semua", DATA.length],
        ]);
        const rows = DATA.filter(
          (x) => cf === "all" || (cf === "problem" && stat(x) === "bad") || stat(x) === cf,
        );
        $("checkList").innerHTML = rows.length
          ? rows
              .map((x) => {
                const c = counts[x.bin],
                  s = stat(x),
                  d = c ? c.actualQty - x.onhand : 0;
                return \`<div class="card"><div class="r"><b class="big">\${esc(x.bin)}</b>\${s === "todo" ? '<span class="pill">Belum</span>' : s === "ok" ? '<span class="pill green">Sesuai</span>' : \`<span class="pill \${c.itemMatch === false ? "red" : "amber"}">\${c.itemMatch === false ? "Item beda" : "Selisih qty"}</span>\`}</div><div class="m">\${szHtml(x.item)}</div>\${c ? \`<div class="r"><span class="m">WMS \${fmt(x.onhand)} · Fisik \${fmt(c.actualQty)}</span><b class="\${d < 0 ? "neg" : d > 0 ? "pos" : ""}">\${d > 0 ? "+" : ""}\${fmt(d)}</b></div>\${c.itemMatch === false ? \`<div class="m">Ditemukan: \${esc(c.actualItem)}</div>\` : ""}\${c.note ? \`<div class="m">Catatan: \${esc(c.note)}</div>\` : ""}<button class="btn sec sm" data-b="\${esc(x.bin)}">Periksa ulang</button>\` : \`<button class="btn sec sm" data-b="\${esc(x.bin)}">Periksa sekarang</button>\`}</div>\`;
              })
              .join("")
          : '<div class="empty">Tidak ada data untuk filter ini.</div>';
      }
      function csvOut(rows, name) {
        const csv = rows
          .map((r) => r.map((v) => '"' + String(v ?? "").replace(/"/g, '""') + '"').join(","))
          .join("\\r\\n");
        const b = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }),
          u = URL.createObjectURL(b),
          a = document.createElement("a");
        a.href = u;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(u), 1000);
      }
      $("btnCsv").onclick = () => {
        csvOut(
          [
            [
              "Lokasi",
              "Area",
              "Bin",
              "Kode WMS",
              "Barang WMS",
              "Barang Sesuai",
              "Barang Aktual",
              "Qty WMS",
              "Qty Fisik",
              "Selisih Qty",
              "Status",
              "Catatan",
              "Waktu",
            ],
            ...DATA.map((x) => {
              const c = counts[x.bin];
              return [
                x.lokasi,
                x.area,
                x.bin,
                x.kode,
                x.item,
                c ? (c.itemMatch ? "Ya" : "Tidak") : "",
                c?.actualItem || "",
                x.onhand,
                c ? c.actualQty : "",
                c ? c.actualQty - x.onhand : "",
                c ? (isProb(c) ? "Perlu Review" : "Sesuai") : "Belum Diperiksa",
                c?.note || "",
                c?.savedAt || "",
              ];
            }),
          ],
          "Rekap_Pemeriksaan_SO_Per_Bin.csv",
        );
      };
`,Mp=`/* File Adjust
   asal: index-fixd.html baris 3090-3225 */
      /* ---------- adjust ---------- */
      function adjustRows() {
        const code = {};
        DATA.forEach((x) => (code[x.item] = x.kode));
        Object.assign(code, codeFix);
        const rows = [],
          miss = new Set();
        DATA.forEach((x) => {
          const c = counts[x.bin];
          if (!c) return;
          const d = c.actualQty - x.onhand;
          if (d)
            rows.push({
              rak: x.bin,
              kode: x.kode,
              nama: x.item,
              qty: d,
              ket: c.itemMatch === false ? "SO selisih item WMS" : "SO selisih qty",
            });
          if (c.itemMatch === false)
            (c.actualItems || []).forEach((a) => {
              if (!a.qty) return;
              const k = code[a.item];
              if (!k) miss.add(a.item);
              rows.push({
                rak: x.bin,
                kode: k || "",
                nama: a.item,
                qty: a.qty,
                ket: "SO item lain ditemukan di bin",
              });
            });
        });
        kesAdj().forEach((x) => rows.push(x));
        dcAdj().forEach((x) => rows.push(x));
        return { rows, miss: [...miss] };
      }
      function renderAdj() {
        const { rows, miss } = adjustRows();
        const ready = rows.filter((r) => r.kode);
        const pl = rows.filter((r) => r.qty > 0).reduce((a, r) => a + r.qty, 0),
          mi = rows.filter((r) => r.qty < 0).reduce((a, r) => a + r.qty, 0);
        $("adjStats").innerHTML = [
          ["Baris adjust", ready.length, ""],
          ["Total tambah", "+" + fmt(pl), "var(--green)"],
          ["Total kurang", fmt(mi), "var(--red)"],
          ["Bin diperiksa", Object.keys(counts).length, ""],
        ]
          .map(
            ([l, v, c]) =>
              \`<div class="stat"><small>\${l}</small><strong style="\${c ? "color:" + c : ""}">\${v}</strong></div>\`,
          )
          .join("");
        $("adjWarn").innerHTML = miss.length
          ? \`<div class="warn" style="margin:0 0 10px">\${miss.length} barang belum punya kode item. Isi kodenya agar masuk file.</div>\` +
            miss
              .map(
                (m) =>
                  \`<div class="card"><div class="m">\${esc(m)}</div><input class="cfx" aria-label="Kode item untuk \${esc(m)}" data-n="\${esc(m)}" inputmode="numeric" placeholder="Kode item (14 digit)"></div>\`,
              )
              .join("")
          : "";
        document.querySelectorAll(".cfx").forEach(
          (e) =>
            (e.onchange = () => {
              const v = e.value.replace(/\\D/g, "");
              if (v) {
                codeFix[e.dataset.n] = v;
                sv(K_F, codeFix);
                renderAdj();
                metrics();
              }
            }),
        );
        $("adjList").innerHTML = rows.length
          ? rows
              .map(
                (r) =>
                  \`<div class="card"><div class="r"><b class="big">\${esc(rakFmt(r.rak))}</b><b class="big \${r.qty < 0 ? "neg" : "pos"}">\${r.qty > 0 ? "+" : ""}\${fmt(r.qty)}</b></div><div class="m">\${esc(r.nama)}</div><div class="m">\${esc(r.kode || "kode belum ada")} · \${esc(r.ket)}</div></div>\`,
              )
              .join("")
          : '<div class="empty">Belum ada selisih. Periksa bin dulu, atau semua bin sudah sesuai.</div>';
        $("btnAdj").disabled = $("btnAdjCopy").disabled = !ready.length;
      }
      const HDR = ["Tanggal", "Site", "Location", "Rak", "Kode Item", "Keterangan", "Qty", "Kode Kategori"];
      function outRows() {
        return adjustRows()
          .rows.filter((r) => r.kode)
          .map((r) => [
            new Date($("aTgl").value || Date.now()),
            Number($("aSite").value) || $("aSite").value,
            $("aLoc").value,
            rakFmt(r.rak),
            Number(r.kode),
            r.ket,
            r.qty,
            Number($("aKat").value) || $("aKat").value,
          ]);
      }
      $("btnAdj").onclick = () => {
        const R = outRows();
        if (!window.XLSX) {
          csvOut([HDR, ...R.map((r) => [r[0].toISOString().slice(0, 10), ...r.slice(1)])], "adjust_item.csv");
          toast("Excel tidak tersedia, diunduh sebagai CSV");
          return;
        }
        const ws = XLSX.utils.aoa_to_sheet([HDR, ...R], { cellDates: true });
        R.forEach((_, i) => {
          ws["A" + (i + 2)].z = "yyyy-mm-dd";
          ws["E" + (i + 2)].z = "0";
        });
        ws["!cols"] = [
          { wch: 12 },
          { wch: 8 },
          { wch: 10 },
          { wch: 10 },
          { wch: 16 },
          { wch: 32 },
          { wch: 8 },
          { wch: 14 },
        ];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Area Rak");
        XLSX.writeFile(wb, "adjust_item.xlsx");
        toast("File adjust_item.xlsx diunduh");
      };
      $("btnAdjCopy").onclick = () => {
        const tx = [HDR, ...outRows().map((r) => [r[0].toISOString().slice(0, 10), ...r.slice(1)])]
          .map((r) => r.join("\\t"))
          .join("\\n");
        navigator.clipboard.writeText(tx).then(
          () => toast("Tersalin. Tempel di Excel."),
          () => toast("Gagal menyalin. Izinkan akses clipboard di browser atau salin manual."),
        );
      };
      ["aTgl", "aSite", "aKat", "aLoc"].forEach((i) => ($(i).onchange = () => {}));
`,jp=`/* Impor data WMS (CSV/XLSX)
   asal: index-fixd.html baris 3226-3392 */
      /* ---------- impor ---------- */
      function parseCSV(t) {
        const rows = [];
        let row = [],
          f = "",
          q = false;
        for (let i = 0; i < t.length; i++) {
          const ch = t[i],
            n = t[i + 1];
          if (ch === '"' && q && n === '"') {
            f += '"';
            i++;
          } else if (ch === '"') q = !q;
          else if (ch === "," && !q) {
            row.push(f);
            f = "";
          } else if ((ch === "\\n" || ch === "\\r") && !q) {
            if (ch === "\\r" && n === "\\n") i++;
            row.push(f);
            if (row.some((v) => v.trim())) rows.push(row);
            row = [];
            f = "";
          } else f += ch;
        }
        row.push(f);
        if (row.some((v) => v.trim())) rows.push(row);
        return rows;
      }
      const nrm = (h) =>
        String(h)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
      const toNum = (v) =>
        typeof v === "number" ? v : Number(String(v).replace(/\\./g, "").replace(",", ".")) || 0;
      async function ingest(rows) {
        const hi = rows.findIndex((r) => {
          const h = r.map(nrm);
          return (h.includes("bin") || h.includes("rak")) && (h.includes("kode") || h.includes("kodeitem") || h.includes("noitem"));
        });
        if (hi < 0) throw new Error("Header tidak ditemukan. Perlu kolom Rak/Bin dan Kode Item.");
        const H = rows[hi].map(nrm),
          ix = (...n) => H.findIndex((h) => n.includes(h)),
          g = (r, ...n) => {
            const i = ix(...n);
            return i < 0 ? "" : r[i];
          };
        const need = {
          bin: ix("bin", "rak"),
          kode: ix("kode", "kodeitem", "itemcode", "noitem", "nomoritem"),
          item: ix("item", "namaitem", "namabarang"),
          onhand: ix("onhand", "qtywms", "stokwms", "qty"),
        };
        if (Object.values(need).some((v) => v < 0))
          throw new Error("Kolom wajib: Rak/Bin, Kode Item, Nama Item, Onhand.");
        const p = rows
          .slice(hi + 1)
          .map((r) => {
            const bin = String(r[need.bin]).trim();
            return {
              lokasi: g(r, "lokasi", "warehouse") || "WMS",
              area: String(g(r, "area") || bin.split("-")[0]).trim(),
              bin,
              kode: String(r[need.kode]).trim(),
              item: String(r[need.item]).trim(),
              onhand: toNum(r[need.onhand]),
              freeStock: toNum(g(r, "freestock")),
              bookingSusun: toNum(g(r, "bookingsusun")),
              bookingMuat: toNum(g(r, "bookingmuat")),
              aging: toNum(g(r, "aging")),
              sinyal: g(r, "sinyal") || "",
              tumpak: String(g(r, "notumpak", "tumpak", "nomortumpak") || "").trim(),
              kelas: String(g(r, "kelaspipa", "kelas") || "").trim().toUpperCase(),
              status: g(r, "status") || "Active",
            };
          })
          .filter((x) => x.bin && x.item);
        if (!p.length) throw new Error("Tidak ada baris data valid.");
        if (
          !(await ask(
            "Ganti data WMS?",
            \`\${p.length} bin akan dimuat. Hasil pemeriksaan lama dihapus.\`,
            "Ganti data",
            true,
          ))
        )
          return;
        DATA = p;
        // Kelas Pipa dari Excel -> kelas per kode item (dipakai urutan prioritas A, B, C di menu Aging Stock)
        (() => {
          const nc = { ...agingCls },
            at = new Date().toISOString();
          let n = 0;
          p.forEach((x) => {
            if (x.kode && ["A", "B", "C", "PTM"].includes(x.kelas) && !(nc[x.kode] && nc[x.kode].c === x.kelas)) {
              nc[x.kode] = { c: x.kelas, at };
              n++;
            }
          });
          if (n) {
            agingCls = nc;
            sv(K_AGK, agingCls);
          }
        })();
        counts = {};
        closed = {};
        sv(K_X, closed);
        tasks = {};
        sv(K_T, tasks);
        dc = {};
        sv(K_D, dc);
        dcPick = {};
        sv(K_DP, dcPick);
        codeFix = {};
        sv(K_M, DATA);
        sv(K_C, counts);
        clearDrafts();
        sv(K_F, codeFix);
        initAll();
        toast(failed.has(K_M) ? "Data dimuat tetapi TIDAK tersimpan di perangkat (penyimpanan penuh). Unduh cadangan." : p.length + " bin dimuat");
        go("so");
      }
      $("btnImp").onclick = () => {
        const f = $("file").files[0];
        if (!f) {
          toast("Pilih file Excel atau CSV terlebih dahulu.");
          return;
        }
        const r = new FileReader(),
          x = /\\.xlsx?$/i.test(f.name);
        r.onload = async () => {
          try {
            let rows;
            if (x) {
              if (!window.XLSX) throw new Error("Pustaka Excel gagal dimuat. Muat ulang aplikasi, atau simpan sebagai CSV lalu impor.");
              const wb = XLSX.read(r.result, { type: "array" });
              rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "" });
            } else rows = parseCSV(String(r.result).replace(/^\uFEFF/, ""));
            await ingest(rows);
          } catch (e) {
            toast("Gagal impor: " + e.message);
          }
        };
        x ? r.readAsArrayBuffer(f) : r.readAsText(f);
      };
      $("btnClear").onclick = async () => {
        if (
          await ask(
            "Hapus semua hasil?",
            "Semua hasil pemeriksaan di perangkat ini dihapus. Data WMS tetap.",
            "Hapus",
            true,
          )
        ) {
          counts = {};
        closed = {};
        sv(K_X, closed);
        codeFix = {};
          sv(K_C, counts);
          clearDrafts();
          sv(K_F, codeFix);
          initAll();
          toast("Hasil dihapus");
        }
      };
`,Dp=`/* Navigasi go(), menu samping, initAll
   asal: index-fixd.html baris 3393-3569 */
      /* ---------- navigasi ---------- */
      function go(v) {
        ["so", "dc", "check", "task", "kes", "adj", "clr", "muat", "usr", "kpi", "tg", "mon", "data", "agi", "rpt"].forEach((k) => ($("v-" + k).hidden = k !== v));
        document.querySelectorAll(".mi").forEach((b) => b.classList.toggle("on", b.dataset.v === v));
        document.querySelectorAll("#tabs [data-v]").forEach((b) => {
          b.classList.toggle("on", b.dataset.v === v);
          if (b.dataset.v === v) b.setAttribute("aria-current", "page");
          else b.removeAttribute("aria-current");
        });
        document.querySelectorAll(".mi[data-v]").forEach((b) => {
          if (b.dataset.v === v) b.setAttribute("aria-current", "page");
          else b.removeAttribute("aria-current");
        });
        curViewId = v;
        if (v === "data" && typeof hlRun === "function") hlRun();
        if (v === "data" && typeof renderLinks === "function") renderLinks();
        if (typeof menuSync === "function") menuSync();
        // judul halaman sama dengan judul di bilah atas: sembunyikan secara visual (tetap terbaca pembaca layar); dijalankan setelah judul bilah atas diperbarui
        setTimeout(() => {
          const h = document.querySelector("#v-" + v + " > h2"), t = document.getElementById("pgT");
          if (h && t) h.classList.toggle("dup", h.textContent.trim() === t.textContent.trim());
        }, 0);
        $("tMenu").classList.toggle("on", ![...document.querySelectorAll("#tabs [data-v]")].some((b) => !b.hidden && b.dataset.v === v));
        try { localStorage.setItem("warehouse_so_view_v1", v); } catch (e) {}
        side(false);
        $("pgT").textContent = {
          so: "Periksa Bin",
          check: "Review Supervisor",
          kes: "Cek Kesesuaian",
          adj: "File Adjust",
          clr: "Clearing",
          muat: "Laporan Muat",
          usr: "User & Area",
          kpi: "KPI Area",
          agi: "Aging Stock",
          rpt: "Laporan SPV",
          dc: "DC Harian",
          tg: "Telegram",
          mon: "Beranda",
          data: "Data WMS",
          task: "Task",
        }[v];
        const soView = v === "so" || v === "check";
        document.querySelector("header .prog").hidden = !soView;
        if (soView) metrics();
        else
          $("hSub").textContent = {
            dc: "Cek harian per item",
            kes: "Bandingkan WMS dan fisik",
            adj: "Selisih siap diunggah",
            clr: "Voucher vs counting",
            muat: "Laporan muat",
            usr: "Atur user, peran, dan area",
            kpi: "Capaian per area dan petugas",
            agi: "Sinyal aging per area",
            rpt: "Per minggu, bulan, dan tahun",
            tg: "Kirim info ke Telegram",
            mon: "Posisi mobil per wilayah",
            data: "Impor data WMS",
            task: "Tugas dari admin",
          }[v];
        if (v === "check") renderCheck();
        if (v === "kes") renderKes();
        if (v === "adj") renderAdj();
        if (v === "clr") { renderClr(); if (clr.url && (!clrCnt || Date.now() - clrCnt.at > 120000)) clrFetch(false); clrEnter(); }
        else clrLeave();
        if (v === "usr") { renderUsr(); cfgUi(); }
        if (v === "task") renderTask();
        if (v === "tg") tgUi();
        if (v === "mon") monEnter();
        else monLeave();
        if (v === "dc") renderDc();
        if (v === "data") {
          $("dataInfo").textContent = DATA.length + " bin dimuat dari " + areas().length + " area.";
          guardUi(true);
        }
        WMS.emit(); // beri tahu view React bahwa tampilan aktif berganti
        window.scrollTo(0, 0);
      }
      document.querySelectorAll(".mi").forEach((b) => (b.onclick = () => nav(b.dataset.v)));
      const side = (o) => {
        $("side").classList.toggle("on", o);
        $("scrim").classList.toggle("on", o);
      };
      $("burger").onclick = () => side(true);
      $("scrim").onclick = () => side(false);
      $("chips").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) {
          lf = b.dataset.k;
          renderBins();
        }
      };
      $("chipsR").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) {
          rf = b.dataset.k;
          sv(K_RF, rf);
          renderBins();
        }
      };
      $("chipsC").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) {
          cf = b.dataset.k;
          renderCheck();
        }
      };
      $("nextBin").onclick = () => {
        const b = $("nextBin").dataset.b;
        if (b) open(b);
      };
      $("binList").onclick = (e) => {
        const b = e.target.closest("[data-b]");
        if (b) open(b.dataset.b);
      };
      $("checkList").onclick = (e) => {
        const b = e.target.closest("[data-b]");
        if (b) {
          go("so");
          const x = DATA.find((d) => d.bin === b.dataset.b);
          if (x) {
            if (!inScope(x.area)) {
              curU = "";
              sv(K_CU, curU);
              initAll();
            }
            $("area").value = x.area;
            lf = "all";
            rf = "all"; // bin tujuan harus tampil, apa pun filter posisi rak sebelumnya
            $("search").value = "";
            renderBins();
            open(x.bin);
          }
        }
      };
      $("area").onchange = renderBins;
      { let _t = 0; $("search").oninput = () => { clearTimeout(_t); _t = setTimeout(renderBins, 150); }; }
      let shDirty = false;
      async function shTryClose() {
        if (shDirty && !(await ask("Tutup tanpa menyimpan?", "Isian di bin ini belum disimpan dan akan hilang.", "Tutup", true))) return;
        if (sel) draftDrop(sel.bin);
        close();
      }
      $("shX").onclick = shTryClose;
      $("sheet").addEventListener("input", () => {
        shDirty = true;
        draftSoon();
        clearInvalid($("sheet"));
        if ($("errBk").hidden) $("err").textContent = "";
      });
      $("sheet").addEventListener("click", (e) => {
        if (e.target.closest("button") && e.target.closest(".sh-body")) {
          shDirty = true;
          draftSoon();
        }
      });
      $("yes").onclick = () => {
        match = true;
        $("lines").innerHTML = "";
        if (!isBlindFor(sel.bin) && $("qty").value === "") $("qty").value = sel.onhand;
        choice();
        prev();
      };
      $("no").onclick = () => {
        match = false;
        if (!document.querySelector("#lines .al")) addLine();
        choice();
        prev();
      };
      $("addL").onclick = () => addLine();
      $("qty").oninput = prev;
      $("qSame").onclick = () => {
        if (isBlindFor(sel.bin)) return;
        $("qty").value = sel.onhand;
        prev();
      };
      $("qm").onclick = () => {
        $("qty").value = Math.max(0, (Number($("qty").value) || 0) - 1);
        prev();
      };
      $("qp").onclick = () => {
        $("qty").value = (Number($("qty").value) || 0) + 1;
        prev();
      };
      $("save").onclick = save;
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !$("sheet").hidden) shTryClose();
      });
      function initAll() {
        renderUserSel();
        const a = visAreas();
        $("area").innerHTML =
          \`<option value="*">\${curUser() ? "Semua area saya" : "Semua area"}</option>\` + a.map((x) => \`<option>\${esc(x)}</option>\`).join("");
        if (a.length === 1) $("area").value = a[0];
        renderBins();
        metrics();
      }

`,Np=`/* Cek Kesesuaian
   asal: index-fixd.html baris 3570-3792 */
      /* ---------- cek kesesuaian ---------- */
      let dest = ld("warehouse_so_dest_v1", {});
      const KN = {
        "Salah rak": "Barang di rak yang salah",
        "Master salah": "Rak diisi item yang salah (stok 0)",
        "Stok minus": "Stok minus",
        "Free stock salah": "Stok bebas tidak cocok",
        "Booking > onhand": "Booking melebihi stok",
        "Stok kecil": "Stok tinggal sedikit",
        "Bin kosong": "Rak kosong",
      };
      function kesIssues() {
        const fa = $("kfa").value.trim().toUpperCase(),
          fb = $("kfb").value.trim().toUpperCase(),
          low = Number($("klow").value) || 0,
          out = [];
        DATA.forEach((s) => {
          const suf = s.bin.trim().slice(-1).toUpperCase(),
            fam = suf === "A" ? fa : suf === "B" ? fb : "",
            P = (lv, t, m) => out.push({ s, lv, t, m });
          if (fam && !s.item.toUpperCase().includes(fam)) {
            s.onhand > 0
              ? P("bad", "Salah rak", "Rak berakhiran " + suf + " khusus " + fam + ". Isinya " + s.item + ".")
              : P(
                  "warn",
                  "Master salah",
                  "Rak berakhiran " + suf + " khusus " + fam + ", terpasang " + s.item + ".",
                );
          }
          if (s.onhand < 0) P("bad", "Stok minus", "Stok tercatat " + s.onhand + ".");
          const calc = s.onhand - (s.bookingSusun || 0) - (s.bookingMuat || 0);
          if (calc !== s.freeStock)
            P("bad", "Free stock salah", "Seharusnya " + calc + ", tercatat " + s.freeStock + ".");
          if ((s.bookingSusun || 0) + (s.bookingMuat || 0) > s.onhand)
            P("bad", "Booking > onhand", "Booking melebihi stok " + s.onhand + ".");
          if (s.onhand > 0 && s.onhand <= low)
            P("warn", "Stok kecil", "Sisa " + s.onhand + ". Cek langsung di rak.");
          if (s.onhand === 0) P("info", "Bin kosong", "Belum ada stok.");
        });
        const seen = {};
        DATA.forEach((s) => (seen[s.bin] = (seen[s.bin] || 0) + 1));
        Object.entries(seen).forEach(([b, c]) => {
          if (c > 1)
            out.push({
              s: { bin: b, item: "", onhand: 0 },
              lv: "bad",
              t: "Rak ganda",
              m: c + " baris untuk rak yang sama.",
            });
        });
        return out;
      }
      function kesAdj() {
        const rows = [];
        kesIssues()
          .filter((i) => i.t === "Salah rak" && !counts[i.s.bin])
          .forEach((i) => {
            const s = i.s;
            rows.push({
              rak: s.bin,
              kode: s.kode,
              nama: s.item,
              qty: -s.onhand,
              ket: "Salah rak, keluarkan dari " + rakFmt(s.bin),
            });
            const d = (dest[s.bin] || "").trim();
            if (d)
              rows.push({
                rak: d,
                kode: s.kode,
                nama: s.item,
                qty: s.onhand,
                ket: "Pindah dari " + rakFmt(s.bin),
              });
          });
        return rows;
      }
      function kCard(i) {
        const s = i.s,
          t = i.lv === "bad" ? "red" : i.lv === "warn" ? "amber" : "";
        let h = \`<div class="card"><div class="r"><b class="big">\${esc(s.bin)}</b><span class="pill \${t}">\${KN[i.t] || i.t}</span></div>\`;
        if (s.item)
          h += \`<div class="m">\${esc(s.item)}</div><div class="m">\${esc(s.kode || "")} · stok \${fmt(s.onhand)}</div>\`;
        h += \`<div class="m">\${esc(i.m)}</div>\`;
        if (i.t === "Salah rak") {
          const sk = !!counts[s.bin];
          h += sk
            ? '<div class="m">Sudah diperiksa di SO, adjust memakai hasil SO.</div>'
            : \`<div class="r"><span class="m">Adjust</span><b class="big neg">-\${fmt(s.onhand)}</b></div><label>Dipindah ke rak mana? (boleh dikosongkan)</label><input class="kd" aria-label="Dipindah ke rak mana" data-b="\${esc(s.bin)}" value="\${esc(dest[s.bin] || "")}" placeholder="contoh: A1-05A" autocapitalize="characters">\`;
        }
        return h + "</div>";
      }
      const binCmp = (a, b) => String(a).localeCompare(String(b), "id", { numeric: true });
      let kF = "all";
      const K_KESH = "warehouse_so_kes_hist_v1";
      let kesHist = ld(K_KESH, []), kesT = 0;
      if (!Array.isArray(kesHist)) kesHist = [];
      const kesTgl = (t) => new Date(t + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      function renderKesHist() {
        const el = $("kHist");
        if (!el) return;
        el.innerHTML = kesHist.length
          ? histRows(kesHist, "kes", (h, i) =>
              histRow(
                esc(kesTgl(h.tgl)),
                \`\${fmt(h.n)} rak · adjust \${fmt(h.a)} · cek \${fmt(h.b)} · kosong \${fmt(h.c)}\`,
                \`<div class="m">Disimpan \${esc(new Date(h.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }))}\${h.by ? " oleh " + esc(h.by) : ""}</div><pre class="rep">\${esc(h.text)}</pre><div class="acts"><button class="btn sec sm inl" data-kc="\${i}" type="button">Salin</button><button class="btn dng sm inl" data-kd="\${i}" type="button">Hapus</button></div>\`,
              ),
            )
          : '<div class="empty">Belum ada laporan tersimpan.</div>';
      }
      // per area: [total rak, rak sesuai]; "sesuai" = definisi yang sama dengan kartu "Sesuai" di menu Cek Kesesuaian
      function kesAreas(I) {
        const bad = new Set(I.filter((i) => i.lv !== "info").map((i) => i.s.bin)), ar = {};
        DATA.forEach((s) => {
          const a = String(s.area || "?"), o = ar[a] || (ar[a] = [0, 0]);
          o[0]++;
          if (!bad.has(s.bin)) o[1]++;
        });
        return ar;
      }
      function kesAuto() {
        if (!DATA.length) return;
        const { I, A, B, C } = kesGroups(), text = kText(false), tgl = new Date().toISOString().slice(0, 10), i = kesHist.findIndex((x) => x.tgl === tgl);
        if (i >= 0 && kesHist[i].text === text && kesHist[i].ar) return;
        const ent = { tgl, at: new Date().toISOString(), by: curName(), n: DATA.length, a: A.length, b: B.length, c: C.length, ar: kesAreas(I), text };
        if (i >= 0) kesHist[i] = ent; else kesHist.push(ent);
        kesHist.sort((x, y) => y.tgl.localeCompare(x.tgl));
        kesHist = kesHist.slice(0, 60);
        sv(K_KESH, kesHist);
        renderKesHist();
      }
      $("kHist").onclick = async (e) => {
        if (histMore(e, "kes", renderKesHist)) return;
        const c = e.target.closest("[data-kc]"), d = e.target.closest("[data-kd]");
        if (c) {
          const h = kesHist[Number(c.dataset.kc)];
          if (!h) return;
          try { await navigator.clipboard.writeText(h.text); toast("Tersalin. Tempel di WhatsApp."); } catch (x) { toast("Gagal menyalin. Buka Lihat teks laporan lalu salin manual."); }
        } else if (d) {
          const h = kesHist[Number(d.dataset.kd)];
          if (!h || !(await ask("Hapus laporan " + h.tgl + "?", "Laporan tersimpan ini dihapus dari riwayat.", "Hapus", true))) return;
          kesHist.splice(Number(d.dataset.kd), 1);
          sv(K_KESH, kesHist);
          renderKesHist();
        }
      };
      const KS_LBL = { bad: "Perlu adjust / salah", warn: "Perlu dicek", info: "Rak kosong" };
      function kesGroups() {
        const I = kesIssues().sort((x, y) => binCmp(x.s.bin, y.s.bin) || binCmp(x.t, y.t));
        const A = I.filter((i) => i.t === "Salah rak"),
          B = I.filter((i) => i.lv !== "info" && i.t !== "Salah rak" && !A.some((a) => a.s.bin === i.s.bin)),
          C = I.filter((i) => i.lv === "info");
        return { I, A, B, C };
      }
      function kTable(rows) {
        return \`<div class="mtw"><table class="mtb kt"><thead><tr><th>Bin</th><th>Stok</th><th>Masalah</th><th>Item / keterangan</th></tr></thead><tbody>\${rows
          .map((i) => \`<tr><td class="id">\${esc(i.s.bin)}</td><td>\${fmt(i.s.onhand)}</td><td class="tx"><span class="pill \${i.lv === "bad" ? "red" : i.lv === "warn" ? "amber" : ""}">\${esc(KN[i.t] || i.t)}</span></td><td class="tx">\${i.s.item ? szHtml(i.s.item) + "<br>" : ""}<span class="fine">\${esc(i.m)}</span></td></tr>\`)
          .join("")}</tbody></table></div>\`;
      }
      function renderKes() {
        const { I, A, B, C } = kesGroups();
        const bad = new Set(I.filter((i) => i.lv !== "info").map((i) => i.s.bin)).size,
          ok = Math.max(0, DATA.length - bad);
        $("kVerdict").innerHTML = !DATA.length
          ? '<div class="empty">Belum ada data WMS.</div>'
          : \`<div class="stats"><div class="stat"><small>Rak dicek</small><strong>\${fmt(DATA.length)}</strong></div><div class="stat"><small>Sesuai</small><strong style="color:var(--green)">\${fmt(ok)}</strong></div><div class="stat"><small>Perlu adjust</small><strong style="color:\${A.length ? "var(--red)" : "inherit"}">\${A.length}</strong></div><div class="stat"><small>Perlu dicek</small><strong style="color:\${B.length ? "var(--amber)" : "inherit"}">\${B.length}</strong></div></div>\` +
            (!A.length && !B.length ? \`<div class="note ok">Semua rak sesuai. \${C.length ? C.length + " rak kosong (info)." : ""}</div>\` : "");
        $("kChips").innerHTML = DATA.length ? chipsHtml(kF, [["all", "Semua", A.length + B.length + C.length], ["adj", "Perlu adjust", A.length], ["cek", "Perlu dicek", B.length], ["kosong", "Kosong", C.length]]) : "";
        const show = (k) => kF === "all" || kF === k;
        let l = "";
        if (A.length && show("adj")) {
          l += \`<h3 class="sec" style="color:var(--red)">Perlu adjust (\${A.length})</h3>\` + kTable(A);
          const open = A.filter((i) => !counts[i.s.bin]);
          if (open.length)
            l += '<h3 class="sec">Rak tujuan (boleh dikosongkan)</h3>' + open.map((i) => \`<div class="card"><div class="r"><b class="id">\${esc(i.s.bin)}</b><span class="m">adjust <b class="neg">-\${fmt(i.s.onhand)}</b></span></div><input class="kd" aria-label="Dipindah ke rak mana untuk \${esc(i.s.bin)}" data-b="\${esc(i.s.bin)}" value="\${esc(dest[i.s.bin] || "")}" placeholder="contoh: A1-05A" autocapitalize="characters"></div>\`).join("");
          else l += '<p class="fine">Semua bin salah rak sudah diperiksa di SO, adjust memakai hasil SO.</p>';
        }
        if (B.length && show("cek")) l += \`<h3 class="sec" style="color:var(--amber)">Perlu dicek di lapangan (\${B.length})</h3>\` + kTable(B);
        if (C.length && show("kosong")) l += \`<h3 class="sec">Rak kosong (\${C.length})</h3><p class="fine">\${C.map((i) => esc(i.s.bin)).join(" · ")}</p>\`;
        if (DATA.length && !l) l = '<div class="empty">Tidak ada temuan di filter ini.</div>';
        $("kList").innerHTML = l;
        $("kCopy").disabled = !DATA.length;
        renderKesHist();
        clearTimeout(kesT);
        kesT = setTimeout(kesAuto, 1200);
        document.querySelectorAll(".kd").forEach(
          (e) =>
            (e.onchange = () => {
              dest[e.dataset.b] = e.value.trim();
              sv("warehouse_so_dest_v1", dest);
              metrics();
              toast("Rak tujuan disimpan");
            }),
        );
      }
      function kText(forTg) {
        const E = (x) => (forTg ? md(x) : String(x ?? "")),
          { I, A, B, C } = kesGroups(),
          bad = new Set(I.filter((i) => i.lv !== "info").map((i) => i.s.bin)).size,
          F = "\`\`\`",
          row = (i) => String(i.s.bin).slice(0, 9).padEnd(9) + String(fmt(i.s.onhand)).padStart(7) + "  " + (KN[i.t] || i.t),
          blk = (t, arr) => (arr.length ? \`\\n*\${t} (\${arr.length})*\\n\${F}\\nBIN          STOK  MASALAH\\n\${arr.map(row).join("\\n")}\\n\${F}\\n\` + arr.map((i) => (i.s.item ? \`• \${E(i.s.bin)}: \${E(i.s.item)}\` : "")).filter(Boolean).join("\\n") + "\\n" : "");
        return \`*LAPORAN KESESUAIAN RAK*\\n\${new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}\\n━━━━━━━━━━━━━━━━━━━━\\nRak dicek \${DATA.length} | Sesuai \${Math.max(0, DATA.length - bad)}\\nPerlu adjust \${A.length} | Perlu dicek \${B.length} | Kosong \${C.length}\\n\` +
          (A.length || B.length ? blk("PERLU ADJUST", A) + blk("PERLU DICEK DI LAPANGAN", B) : "\\nSemua rak sesuai ✅\\n") +
          (C.length ? \`\\n*Rak kosong:* \${C.map((i) => i.s.bin).join(", ")}\\n\` : "") +
          (curName() ? \`\\nDilaporkan oleh: \${E(curName())}\` : "");
      }
      $("kChips").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) { kF = b.dataset.k; renderKes(); }
      };
      $("kCopy").onclick = () => {
        if (!DATA.length) return toast("Belum ada data WMS.");
        outText(kText(tgMode)).then(
          () => toast("Tersalin. Tempel di WhatsApp."),
          () => toast("Gagal menyalin. Izinkan akses clipboard di browser."),
        );
      };
      $("kCsv").onclick = () => {
        const { I } = kesGroups();
        csvOut([["Bin", "Area", "Kode", "Item", "Stok", "Masalah", "Keterangan", "Rak Tujuan"], ...I.map((i) => [i.s.bin, i.s.area || "", i.s.kode || "", i.s.item || "", i.s.onhand, KN[i.t] || i.t, i.m, dest[i.s.bin] || ""])], "laporan_kesesuaian_" + new Date().toISOString().slice(0, 10) + ".csv");
      };
      ["kfa", "kfb", "klow"].forEach(
        (i) =>
          ($(i).oninput = () => {
            renderKes();
            metrics();
          }),
      );
`,Lp=`/* Laporan Muat
   asal: index-fixd.html baris 3793-4145 */
      /* ---------- laporan muat ---------- */
            const K_MUATS = "warehouse_so_muat_sum_v1";
      /* v22: laporan muat tersimpan otomatis + riwayat per tanggal */
      const K_MUATD = "warehouse_so_muat_data_v1", K_MUATH = "warehouse_so_muat_hist_v1";
      let muatHist = ld(K_MUATH, []), muT = 0;
      if (!Array.isArray(muatHist)) muatHist = [];
      const muSoon = () => {
        clearTimeout(muT);
        muT = setTimeout(muPersist, 600);
      };
      function muPersist() {
        if (!mRecs.length) return;
        const o = { name: $("mfn").textContent, tgl: $("mtgl").value, total: $("mtotal").value, tdk: $("mtdk").value, recs: mRecs.map((r) => [r.spm, r.nop ? 1 : 0, r.tgl, r.pic, r.cp ? 1 : 0]) };
        const prev = ld(K_MUATD, null);
        if (prev && JSON.stringify({ ...prev, at: 0 }) === JSON.stringify({ ...o, at: 0 })) return; // isi sama (mis. baru diterima dari perangkat lain): jangan perbarui cap waktu, supaya tidak saling menimpa
        o.at = Date.now();
        if (!sv(K_MUATD, o)) toast("Penyimpanan penuh: laporan muat tidak tersimpan permanen.");
      }
      function muRestore() {
        const o = ld(K_MUATD, null);
        if (!o || !Array.isArray(o.recs) || !o.recs.length) return;
        mRecs = o.recs.map((a) => ({ spm: String(a[0]), nop: !!a[1], tgl: a[2] || "", pic: a[3] || "(tanpa PIC)", cp: !!a[4] }));
        mDates = {};
        mRecs.forEach((x) => { if (x.tgl) mDates[x.tgl] = (mDates[x.tgl] || 0) + 1; });
        if (o.tgl) $("mtgl").value = o.tgl;
        $("mtotal").value = o.total || "";
        $("mtdk").value = o.tdk || "";
        $("mfn").textContent = o.name && o.name !== "belum ada file" ? o.name : "laporan tersimpan";
      }
      const muTgl = (t) => new Date(t + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      const muNorm = (t) => String(t || "").replace(/_Update:.*_/, "").trim();
      let muAT = 0;
      function muAuto() {
        if (!mRecs.length) return;
        const tgl = $("mtgl").value || mISO(new Date()), text = $("mout").textContent, i = muatHist.findIndex((x) => x.tgl === tgl);
        if (i >= 0 && muNorm(muatHist[i].text) === muNorm(text) && muatHist[i].rows) return;
        const m = ld(K_MUATS, null) || {};
        const ent = { tgl, at: new Date().toISOString(), by: curName(), dp: m.dp || 0, ni: m.ni || 0, total: m.total || 0, tdkN: m.tdkN || 0, masuk: m.masuk || 0, cpS: m.cpS || 0, ci: m.ci || 0, rows: muRows(), text };
        if (i >= 0) muatHist[i] = ent; else muatHist.push(ent);
        muatHist.sort((a, b) => b.tgl.localeCompare(a.tgl));
        muatHist = muatHist.slice(0, 60);
        sv(K_MUATH, muatHist);
        renderMuHist();
      }
      function renderMuHist() {
        const el = $("muHist");
        if (!el) return;
        el.innerHTML = muatHist.length
          ? histRows(muatHist, "mu", (h, i) =>
              histRow(
                esc(muTgl(h.tgl)),
                \`\${fmt(h.dp)} SPM · \${fmt(h.ni)} item · \${fmt(h.total)} mobil\`,
                \`<div class="m">Disimpan \${esc(new Date(h.at).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }))}\${h.by ? " oleh " + esc(h.by) : ""}</div><pre class="rep">\${esc(h.text)}</pre><div class="acts"><button class="btn sec sm inl" data-mc="\${i}" type="button">Salin</button><button class="btn dng sm inl" data-md="\${i}" type="button">Hapus</button></div>\`,
              ),
            )
          : '<div class="empty">Belum ada laporan yang disimpan.</div>';
      }
      async function muSaveHist() {
        if (!mRecs.length) return toast("Belum ada laporan untuk disimpan."), false;
        const tgl = $("mtgl").value || mISO(new Date()),
          m = ld(K_MUATS, null) || {},
          i = muatHist.findIndex((x) => x.tgl === tgl);
        if (i >= 0 && muNorm(muatHist[i].text) !== muNorm($("mout").textContent) && !(await ask("Ganti laporan tanggal ini?", "Sudah ada laporan tersimpan untuk " + muTgl(tgl) + ". Yang lama diganti dengan yang sekarang.", "Ganti"))) return false;
        const ent = { tgl, at: new Date().toISOString(), by: curName(), dp: m.dp || 0, ni: m.ni || 0, total: m.total || 0, tdkN: m.tdkN || 0, masuk: m.masuk || 0, cpS: m.cpS || 0, ci: m.ci || 0, rows: muRows(), text: $("mout").textContent };
        if (i >= 0) muatHist[i] = ent;
        else muatHist.push(ent);
        muatHist.sort((a, b) => b.tgl.localeCompare(a.tgl));
        muatHist = muatHist.slice(0, 60);
        if (!sv(K_MUATH, muatHist)) return toast("Gagal menyimpan: penyimpanan penuh."), false;
        buzz(40);
        renderMuHist();
        return true;
      }
      let mRecs = [],
        mDates = {};
      const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
        BLN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
      const pad = (n, l = 2) => String(n).padStart(l, "0");
      const mpct = (a, b) => (b ? (a / b) * 100 : 0).toFixed(1).replace(".", ",") + "%";
      function mISO(v) {
        if (v instanceof Date && !isNaN(v))
          return v.getFullYear() + "-" + pad(v.getMonth() + 1) + "-" + pad(v.getDate());
        if (typeof v === "number") {
          const d = new Date(Math.round((v - 25569) * 864e5));
          return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate());
        }
        const s = String(v).trim(),
          m = s.match(/^(\\d{1,2})[-\\/](\\d{1,2})[-\\/](\\d{4})/);
        if (m) return m[3] + "-" + pad(m[2]) + "-" + pad(m[1]);
        const n = s.match(/^(\\d{4})-(\\d{2})-(\\d{2})/);
        return n ? n[0] : "";
      }
      const mNum = (v) => {
        if (v === "" || v == null) return null;
        const n = typeof v === "number" ? v : Number(String(v).replace(/\\./g, "").replace(",", "."));
        return isNaN(n) ? null : n;
      };
      const mTm = (v) => {
        if (v === "" || v == null) return "";
        if (v instanceof Date && !isNaN(v)) { const d = new Date(v.getTime() + 30000); return d.getHours() + ":" + pad(d.getMinutes()); }
        if (typeof v === "number" && v >= 0 && v < 1) { const m = Math.round(v * 1440); return Math.floor(m / 60) + ":" + pad(m % 60); }
        const m = String(v).match(/(\\d{1,2}):(\\d{2})/);
        return m ? Number(m[1]) + ":" + m[2] : String(v).trim();
      };
      // satu baris per SPM, untuk sheet 04.Proses Muat di Google Sheets
      function muRows() {
        const m = new Map();
        mRecs.forEach((r) => {
          let s = m.get(r.spm);
          if (!s) m.set(r.spm, (s = { spm: r.spm, np: "", pic: r.pic, n: 0, cp: 0, ship: "", qs: null, qm: null, mu: "", se: "", ck: "" }));
          s.n++;
          if (r.cp) s.cp++;
          if (!s.np && r.npl) s.np = r.npl;
          if (!s.ship && r.ship) s.ship = r.ship;
          if (!s.mu && r.mu) s.mu = r.mu;
          if (!s.se && r.se) s.se = r.se;
          if (!s.ck && r.ck) s.ck = r.ck;
          if (r.qs != null) s.qs = (s.qs || 0) + r.qs;
          if (r.qm != null) s.qm = (s.qm || 0) + r.qm;
        });
        return [...m.values()].map((s) => [s.spm, s.np, s.pic, s.n, s.cp, s.ship, s.qs, s.qm, s.mu, s.se, s.ck]);
      }
      function mParse(rows) {
        const h = rows.findIndex((r) => r.some((c) => String(c).trim().toLowerCase() === "no spm"));
        if (h < 0) throw new Error('Kolom "No SPM" tidak ditemukan.');
        const H = rows[h].map((c) => String(c).trim().toLowerCase()),
          ix = (n) => H.indexOf(n);
        const c = {
          spm: ix("no spm"),
          nop: ix("nopol"),
          tgl: ix("tgl muat"),
          pic: ix("pic muat"),
          rem: ix("remark muat"),
          ship: ix("ship to"),
          qs: ix("qty spm"),
          qm: ix("qty muat"),
          mu: ix("mulai muat"),
          se: ix("selesai muat"),
          ck: ix("pic check"),
        };
        if (c.pic < 0 || c.rem < 0) throw new Error("Kolom PIC Muat dan Remark Muat dibutuhkan.");
        const o = rows
          .slice(h + 1)
          .filter((r) => String(r[c.spm]).trim())
          .map((r) => ({
            spm: String(r[c.spm]).trim(),
            nop: c.nop >= 0 && String(r[c.nop]).trim() !== "",
            tgl: c.tgl >= 0 ? mISO(r[c.tgl]) : "",
            pic: String(r[c.pic]).trim() || "(tanpa PIC)",
            cp: /copy/i.test(String(r[c.rem])),
            npl: c.nop >= 0 ? String(r[c.nop]).trim() : "",
            ship: c.ship >= 0 ? String(r[c.ship]).trim() : "",
            qs: c.qs >= 0 ? mNum(r[c.qs]) : null,
            qm: c.qm >= 0 ? mNum(r[c.qm]) : null,
            mu: c.mu >= 0 ? mTm(r[c.mu]) : "",
            se: c.se >= 0 ? mTm(r[c.se]) : "",
            ck: c.ck >= 0 ? String(r[c.ck]).trim() : "",
          }));
        if (!o.length) throw new Error("Tidak ada baris data.");
        return o;
      }
      function mSet(rows) {
        mRecs = mParse(rows);
        mDates = {};
        mRecs.forEach((x) => {
          if (x.tgl) mDates[x.tgl] = (mDates[x.tgl] || 0) + 1;
        });
        const top = Object.entries(mDates).sort((a, b) => b[1] - a[1])[0];
        if (top) $("mtgl").value = top[0];
        mBuild();
      }
      function mBuild() {
        muSoon();
        const has = mRecs.length > 0,
          tb = document.querySelector('[data-tg="mcopy"]');
        $("mcopy").disabled = !has;
        $("muSave").disabled = !has;
        if (tb) tb.disabled = !has;
        if (!has) {
          $("mout").textContent = "Belum ada laporan. Pilih file laporan muat (Excel) di atas.";
          $("mkpi").innerHTML = "";
          $("mnotes").innerHTML = ld(K_MUATS, null)
            ? '<div class="note">Ringkasan laporan terakhir masih ada, tapi detail hilang karena halaman dimuat ulang. Upload ulang file laporan muat untuk melihat rincian per PIC.</div>'
            : "";
          return;
        }
        const spm = {};
        mRecs.forEach((r) => {
          const s = spm[r.spm] || (spm[r.spm] = { n: 0, cp: 0, nop: false });
          s.n++;
          if (r.cp) s.cp++;
          if (r.nop) s.nop = true;
        });
        const S = Object.values(spm),
          dp = S.length,
          tv = $("mtotal").value.trim(),
          total = tv !== "" ? Math.max(Number(tv) || 0, dp) : dp,
          tdkN = total - dp,
          masuk = S.filter((s) => s.nop).length;
        const all = $("mdefcp").value === "all",
          cpS = S.filter((s) => (all ? s.cp === s.n : s.cp > 0)).length,
          ni = mRecs.length,
          ci = mRecs.filter((r) => r.cp).length;
        const pic = {};
        mRecs.forEach((r) => {
          const p = pic[r.pic] || (pic[r.pic] = { spm: new Set(), ok: 0, cp: 0 });
          p.spm.add(r.spm);
          r.cp ? p.cp++ : p.ok++;
        });
        const P = Object.entries(pic)
          .map(([n, p]) => ({ n, spm: p.spm.size, ok: p.ok, cp: p.cp }))
          .sort((a, b) => b.spm - a.spm || b.ok - a.ok || a.n.localeCompare(b.n));
        const w = (l, v) => l.padEnd(27 - String(v).length) + v;
        const iso = $("mtgl").value,
          d = iso ? new Date(iso + "T00:00:00") : new Date(),
          tg = \`\${HARI[d.getDay()]}, \${d.getDate()} \${BLN[d.getMonth()]} \${d.getFullYear()}\`;
        const n = new Date(),
          upd = \`\${pad(n.getDate())}-\${pad(n.getMonth() + 1)}-\${n.getFullYear()} \${pad(n.getHours())}:\${pad(n.getMinutes())}\`;
        {
          const isoD = $("mtgl").value || mISO(new Date()), sig = dp + "|" + ni + "|" + isoD + "|" + total, prevS = ld(K_MUATS, null);
          sv(K_MUATS, { sig, at: prevS && prevS.sig === sig ? prevS.at : Date.now(), tgl: isoD, dp, ni, total, tdkN, masuk, cpS, ci });
        }
        const tdk = $("mtdk")
          .value.split("\\n")
          .map((s) => s.trim())
          .filter(Boolean);
        const D =
          tdkN > 0
            ? tdk.length
              ? tdk.map((x) => "• " + x).join("\\n")
              : \`\${tdkN} mobil belum diproses (isi daftar di Pengaturan)\`
            : "Semua mobil diproses WMS ✅";
        const B = "\`\`\`";
        $("mout").textContent = \`*LAPORAN HARIAN KONTROL MUAT WMS*
\${$("mgudang").value}
Tanggal : \${tg}
━━━━━━━━━━━━━━━━━━━━
*A. PROSES WMS* (1 SPM = 1 mobil)
\${B}
\${w("Total mobil / SPM", total)}
\${w("Diproses WMS", dp)}
\${w("Tidak diproses WMS", tdkN)}
\${w("Mobil masuk", masuk)}
\${w("Masuk blm diproses", 0)}
---------------------------
\${w("% Diproses WMS", mpct(dp, total))}
\${w("% Tidak diproses", mpct(tdkN, total))}
\${B}

*B. HASIL MUAT DI WMS*
\${B}
SPM full OK           : \${dp - cpS}
SPM copy rekomendasi  : \${cpS}
% SPM copy rekom.     : \${mpct(cpS, dp)}
% SPM input aktual    : \${mpct(dp - cpS, dp)}
Item OK               : \${ni - ci}
Item copy rekomendasi : \${ci} (\${mpct(ci, ni)})
\${B}

*C. PER PIC MUAT*
\${B}
PIC         SPM   OK  COPY
                     REKOM
--------------------------
\${P.map((p) => p.n.slice(0, 10).padEnd(10) + String(p.spm).padStart(5) + String(p.ok).padStart(5) + String(p.cp).padStart(6)).join("\\n")}
--------------------------
\${"TOTAL".padEnd(10) + String(dp).padStart(5) + String(ni - ci).padStart(5) + String(ci).padStart(6)}
\${B}
_OK & Copy Rekomendasi = jumlah item_

*D. TIDAK DIPROSES WMS (\${tdkN} mobil)*
\${D}
━━━━━━━━━━━━━━━━━━━━
Dilaporkan oleh: \${$("mpelapor").value}
_Update: \${upd}_\`;
        $("mkpi").innerHTML = [
          ["SPM", dp, ""],
          ["Item muat", ni, ""],
          ["SPM copy rekom.", cpS + " (" + mpct(cpS, dp) + ")", cpS ? "var(--amber)" : ""],
          ["Item copy rekom.", ci + " (" + mpct(ci, ni) + ")", ci ? "var(--amber)" : ""],
        ]
          .map(
            ([l, v, c]) =>
              \`<div class="stat"><small>\${l}</small><strong style="\${c ? "color:" + c : ""}">\${v}</strong></div>\`,
          )
          .join("");
        const nd = Object.keys(mDates).length,
          nt = [];
        if (nd > 1) nt.push(\`File berisi \${nd} tanggal muat. Tanggal laporan memakai yang paling banyak.\`);
        const top = P.slice().sort((a, b) => b.cp - a.cp)[0];
        if (top && ci && top.cp / ci >= 0.5)
          nt.push(\`\${top.n} menyumbang \${top.cp} dari \${ci} item copy rekomendasi.\`);
        $("mnotes").innerHTML = nt.map((x) => \`<div class="note">\${esc(x)}</div>\`).join("");
        clearTimeout(muAT);
        muAT = setTimeout(muAuto, 1200);
      }
      $("mcopy").onclick = () => {
        const t = $("mout").textContent;
        const fb = () => {
          const r = document.createRange();
          r.selectNodeContents($("mout"));
          const s = getSelection();
          s.removeAllRanges();
          s.addRange(r);
          toast("Teks dipilih. Salin manual.");
        };
        outText(t).then(
          () => toast("Tersalin. Tempel di WhatsApp."),
          fb,
        );
      };
      $("mf").onchange = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const rd = new FileReader();
        rd.onload = () => {
          try {
            if (!window.XLSX) throw new Error("Butuh internet untuk membaca Excel.");
            const wb = XLSX.read(rd.result, { type: "array", cellDates: true });
            mSet(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "" }));
            $("mfn").textContent = f.name;
            $("mtotal").value = "";
            $("mtdk").value = "";
            toast("Laporan dibuat");
          } catch (x) {
            toast(x.message || "File tidak bisa dibaca");
          }
        };
        rd.readAsArrayBuffer(f);
      };
      ["mgudang", "mtgl", "mpelapor", "mtotal", "mdefcp", "mtdk"].forEach((i) => ($(i).oninput = mBuild));
      applyCfg();
      muRestore();
      renderMuHist();
      $("muSave").onclick = async () => {
        if (!mRecs.length) return toast("Belum ada file laporan muat.");
        if ((await muSaveHist()) !== true) return;
        const t = $("mout").textContent;
        await sendAll(t, t, true);
      };
      $("muHist").onclick = async (e) => {
        if (histMore(e, "mu", renderMuHist)) return;
        const c = e.target.closest("[data-mc]"), d = e.target.closest("[data-md]");
        if (c) {
          const h = muatHist[Number(c.dataset.mc)];
          if (!h) return;
          try { await navigator.clipboard.writeText(h.text); toast("Tersalin. Tempel di WhatsApp."); } catch (x) { toast("Gagal menyalin. Buka Lihat teks laporan lalu salin manual."); }
        } else if (d) {
          const h = muatHist[Number(d.dataset.md)];
          if (!h || !(await ask("Hapus laporan " + h.tgl + "?", "Laporan tersimpan ini dihapus dari riwayat.", "Hapus", true))) return;
          muatHist.splice(Number(d.dataset.md), 1);
          sv(K_MUATH, muatHist);
          renderMuHist();
        }
      };
      mBuild();

      $("aTgl").value = new Date().toISOString().slice(0, 10);
`,Rp=`/* Petugas, area, hak akses menu, navigasi bawah
   asal: index-fixd.html baris 4146-4575 */
      /* ---------- petugas & area ---------- */
      const K_U = "warehouse_so_users_v1",
        K_X = "warehouse_so_closed_v1",
        K_CU = "warehouse_so_curuser_v1";
      /* Bawaan: hanya satu akun Admin tanpa password (mode terbuka). Tambah user dan password dari menu User & Area.
         Login = pilih nama + password. Password disimpan sebagai hash di field \`pin\` (nama lama dipertahankan supaya
         sinkron, cadangan, dan backend tetap cocok; field ini tidak pernah ikut sinkron). */
      const DEFAULT_USERS = () => [{ id: "ua0admin", name: "Admin", role: "admin", active: true, areas: [] }];
      let users = ld(K_U, null) || DEFAULT_USERS(),
        closed = ld(K_X, {}),
        curU = ld(K_CU, ""),
        uEdit = null,
        uSel = [];
      const K_ME = "warehouse_so_me_v1", K_LS = "warehouse_so_lgsetup_v1";
      let meId = "";
      try { meId = sessionStorage.getItem(K_ME) || ""; } catch (e) {}
      /* ---- v13: hak akses menu per user ---- */
      const MENU_DEF = { so: "Periksa Bin", dc: "DC Harian", task: "Task", check: "Review Supervisor", kes: "Cek Kesesuaian", adj: "File Adjust", clr: "Clearing", mon: "Beranda", muat: "Laporan Muat", kpi: "KPI Area", agi: "Aging Stock", rpt: "Laporan", tg: "Telegram", data: "Data WMS" };
      const ALL_VIEWS = [...Object.keys(MENU_DEF), "usr"];
      /* Peran: admin (semua menu), spv (review + laporan semua area), petugas dan penerimaan (menu standar, hanya area yang diberikan).
         staff = true berarti terikat area: muncul di daftar petugas, dapat tugas, dan hanya melihat area miliknya. */
      const ROLES = {
        admin: { label: "Admin", staff: false, menus: null },
        spv: { label: "SPV", staff: false, menus: ["so", "dc", "task", "check", "kes", "adj", "clr", "mon", "muat", "kpi", "agi", "rpt"] },
        petugas: { label: "Petugas", staff: true, menus: ["mon", "so", "dc", "task"] },
        penerimaan: { label: "Penerimaan", staff: true, menus: ["mon", "so", "clr"] },
      };
      const PRESETS = { petugas: ROLES.petugas.menus, spv: ROLES.spv.menus, penerimaan: ROLES.penerimaan.menus };
      const roleOf = (u) => (ROLES[u.role] ? u.role : "petugas");
      const isStaff = (u) => ROLES[roleOf(u)].staff;
      const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
      const menusOf = (u) => (u.role === "admin" ? ALL_VIEWS : Array.isArray(u.menus) ? u.menus : PRESETS[roleOf(u)]);
      const menuLabel = (u) => {
        const m = menusOf(u);
        if (sameSet(m, PRESETS[roleOf(u)])) return "standar";
        const k = Object.keys(PRESETS).find((p) => sameSet(m, PRESETS[p]));
        return k ? "setara " + ROLES[k].label : "kustom, " + m.length + " menu";
      };
      let uMenus = [...PRESETS.petugas];
      /* ---- v17: menu yang tampil di navigasi bawah (per perangkat) ---- */
      const K_NAV = "warehouse_so_nav_v1";
      const NAV_ORDER = ["mon", "so", "dc", "check", "task", "kes", "adj", "clr", "muat", "kpi", "agi", "rpt", "usr", "tg", "data"];
      const NAV_DEFAULT = ["mon", "so", "dc", "check", "adj"];
      const NAV_MAX = 5;
      const NAV_NAME = Object.assign({}, MENU_DEF, { usr: "User & Area" });
      let navCfg = ld(K_NAV, null);
      var curViewId = "so";
      function navPicks() {
        const allowed = NAV_ORDER.filter(allowedView);
        let pick = (Array.isArray(navCfg) ? navCfg : NAV_DEFAULT).filter((v) => allowed.includes(v));
        if (!pick.length) pick = allowed.filter((v) => NAV_DEFAULT.includes(v));
        if (!pick.length) pick = allowed.slice(0, 4);
        return NAV_ORDER.filter((v) => pick.includes(v)).slice(0, NAV_MAX);
      }
      function migrateUsers() {
        users.forEach((u) => {
          u.role = ROLES[u.role] ? u.role : "petugas";
          if (u.role === "admin") delete u.menus;
          else if (Array.isArray(u.menus)) u.menus = u.menus.filter((k) => MENU_DEF[k]);
          else delete u.menus;
          if (u.active == null) u.active = true;
          if (!Array.isArray(u.areas)) u.areas = [];
        });
      }
      migrateUsers();
      const staff = () => users.filter(isStaff);
      const meUser = () => users.find((u) => u.id === meId && u.active !== false) || null;
      // login wajib begitu ada admin aktif yang punya password; sebelum itu semua menu terbuka (mode awal)
      const authOn = () => users.some((u) => u.role === "admin" && u.pin && u.active !== false);
      const isAdmin = () => !authOn() || !!(meUser() && meUser().role === "admin");
      // admin dan SPV boleh melihat semua area dan semua petugas; petugas/penerimaan hanya area miliknya
      const isSup = () => isAdmin() || !!(meUser() && meUser().role === "spv");
      const allowedView = (v) => !authOn() || isAdmin() || (!!meUser() && menusOf(meUser()).includes(v));
      const curUser = () => users.find((u) => u.id === curU && isStaff(u)) || null;
      const curName = () => (curUser() ? curUser().name : meUser() ? meUser().name : "");
      function applySession() {
        const m = meUser();
        if (authOn() && m && isStaff(m)) curU = m.id;
        else if (!users.some((u) => u.id === curU && isStaff(u) && u.active !== false)) curU = "";
        sv(K_CU, curU);
      }
      function applyRole() {
        document.querySelectorAll(".mi[data-v]").forEach((b) => (b.hidden = !allowedView(b.dataset.v)));
        // grup menu (judul + submenu) disembunyikan jika semua isinya tersembunyi: lihat 76-menu-groups.js
        if (typeof menuSync === "function") menuSync();
        let vis = 0;
        const navSel = navPicks();
        document.querySelectorAll("#tabs [data-v]").forEach((b) => {
          const h = !navSel.includes(b.dataset.v);
          b.hidden = h;
          if (!h) vis++;
        });
        $("tabs").style.gridTemplateColumns = "repeat(" + (vis + 1) + ", 1fr)";
        const m = meUser();
        $("whoAmI").textContent = authOn() ? (m ? m.name + " (" + ROLES[roleOf(m)].label + ")" : "") : "Login belum aktif";
        $("logoutBtn").hidden = !(authOn() && m);
        $("lgSetupBtn").hidden = authOn();
        // sinkronkan penanda tab aktif setelah daftar tab berubah
        document.querySelectorAll("#tabs [data-v]").forEach((b) => {
          const on = b.dataset.v === curViewId;
          b.classList.toggle("on", on);
          if (on) b.setAttribute("aria-current", "page");
          else b.removeAttribute("aria-current");
        });
        $("tMenu").classList.toggle("on", ![...document.querySelectorAll("#tabs [data-v]")].some((b) => !b.hidden && b.dataset.v === curViewId));
        // jika layar yang sedang terbuka tidak diizinkan, pindah ke menu pertama yang boleh
        const curV = ["so", "dc", "check", "task", "kes", "adj", "clr", "muat", "usr", "kpi", "agi", "rpt", "tg", "mon", "data"].find((k) => $("v-" + k) && !$("v-" + k).hidden);
        if (curV && !allowedView(curV)) {
          const first = ["so", "dc", "task", "check", "kes", "adj", "mon", "muat", "kpi"].find(allowedView);
          if (first) go(first);
        }
        renderUserSel();
      }
      /* Aktifkan login: buat password admin pertama. Muncul otomatis sekali per perangkat selama belum ada admin berpassword. */
      let lsSeen = false;
      try { lsSeen = localStorage.getItem(K_LS) === "1"; } catch (e) {}
      function setupUi(force) {
        const box = $("lgSetup");
        if (authOn()) { box.hidden = true; return; }
        if (!force && (lsSeen || !box.hidden)) return;
        const a = users.find((u) => u.role === "admin");
        $("lsName").value = a ? a.name : "Admin";
        $("lsPin").value = $("lsPin2").value = "";
        $("lsErr").textContent = "";
        box.hidden = false;
        document.body.style.overflow = "hidden";
        setTimeout(() => $("lsPin").focus(), 50);
      }
      function setupClose() {
        $("lgSetup").hidden = true;
        document.body.style.overflow = "";
        lsSeen = true;
        try { localStorage.setItem(K_LS, "1"); } catch (e) {}
      }
      function loginUi() {
        if (authOn() && !$("lgSetup").hidden) { $("lgSetup").hidden = true; document.body.style.overflow = ""; }
        const need = authOn() && !meUser();
        $("login").hidden = !need;
        document.body.style.overflow = need ? "hidden" : $("lgSetup").hidden ? "" : "hidden";
        if (!need) { setupUi(false); return; }
        const act = users.filter((u) => u.active !== false).sort((a, b) => a.name.localeCompare(b.name, "id"));
        $("lgUser").innerHTML = act.map((u) => \`<option value="\${esc(u.id)}">\${esc(u.name)}\${u.name.trim().toLowerCase() === ROLES[roleOf(u)].label.toLowerCase() ? "" : " (" + ROLES[roleOf(u)].label + ")"}</option>\`).join("");
        lgSel();
      }
      function lgSel() {
        $("lgPin").value = "";
        $("lgPin").type = "password";
        $("lgShow").textContent = "Tampilkan password";
        $("lgShow").setAttribute("aria-pressed", "false");
        $("lgErr").textContent = "";
        clearInvalid($("login"));
      }
      async function lgGo() {
        const u = users.find((x) => x.id === $("lgUser").value);
        if (!u) return;
        if (!u.pin) {
          markInvalid($("lgPin"), "lgErr");
          return ($("lgErr").textContent = "Akun ini belum punya password. Minta admin mengaturnya di menu User & Area.");
        }
        if (Date.now() < pinLock) {
          markInvalid($("lgPin"), "lgErr");
          return ($("lgErr").textContent = "Terlalu banyak salah. Tunggu beberapa detik.");
        }
        const pw = $("lgPin").value.trim();
        if (!(await pinCheck(pw, u.pin))) {
          if (++pinFails >= 5) {
            pinLock = Date.now() + 30000;
            pinFails = 0;
          }
          $("lgErr").textContent = "Password salah.";
          markInvalid($("lgPin"), "lgErr");
          $("lgPin").select();
          return;
        }
        pinFails = 0;
        if (pinIsLegacy(u.pin)) {
          // hash lama (belum bergaram): tingkatkan diam-diam ke format baru
          try { u.pin = await pinMake(pw); sv(K_U, users); } catch (e) {}
        }
        meId = u.id;
        try { sessionStorage.setItem(K_ME, meId); } catch (e) {}
        applySession();
        applyRole();
        loginUi();
        initAll();
        go("so");
        toast("Masuk sebagai " + u.name);
      }
      function logout() {
        meId = "";
        try { sessionStorage.removeItem(K_ME); } catch (e) {}
        curU = "";
        applyRole();
        loginUi();
        side(false);
      }
      $("lgUser").onchange = lgSel;
      $("lgOk").onclick = lgGo;
      $("lgPin").addEventListener("input", () => clearInvalid($("login")));
      $("lgPin").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); lgGo(); } };
      $("lgShow").onclick = () => {
        const show = $("lgPin").type === "password";
        $("lgPin").type = show ? "text" : "password";
        $("lgShow").textContent = show ? "Sembunyikan password" : "Tampilkan password";
        $("lgShow").setAttribute("aria-pressed", String(show));
        $("lgPin").focus();
      };
      $("logoutBtn").onclick = logout;
      $("lgSetupBtn").onclick = () => { side(false); setupUi(true); };
      $("lsLater").onclick = setupClose;
      $("lsOk").onclick = async () => {
        const name = $("lsName").value.trim().replace(/\\s+/g, " "), pw = $("lsPin").value.trim(), pw2 = $("lsPin2").value.trim();
        const err = (m, el) => { $("lsErr").textContent = m; if (el) { markInvalid(el, "lsErr"); el.focus(); } };
        clearInvalid($("lgSetup"));
        if (!name) return err("Isi nama admin.", $("lsName"));
        if (pw.length < 6 || pw.length > 64) return err("Password minimal 6 dan maksimal 64 karakter.", $("lsPin"));
        if (pw !== pw2) return err("Ulangi password dengan sama persis.", $("lsPin2"));
        const adm = users.find((u) => u.role === "admin");
        if (users.some((u) => u !== adm && u.name.trim().toLowerCase() === name.toLowerCase())) return err("Nama itu sudah dipakai user lain.", $("lsName"));
        let hash;
        try { hash = await pinMake(pw); } catch (e) { return err("Perangkat ini tidak bisa menyimpan password dengan aman. Buka aplikasi lewat alamat HTTPS."); }
        const rec = adm || { id: "u" + Date.now().toString(36), role: "admin", areas: [] };
        rec.name = name; rec.pin = hash; rec.active = true;
        if (!adm) users.push(rec);
        sv(K_U, users);
        meId = rec.id;
        try { sessionStorage.setItem(K_ME, meId); } catch (e) {}
        setupClose();
        applySession(); applyRole(); loginUi(); initAll();
        toast("Login aktif. Masuk sebagai " + name);
      };
      [$("lsName"), $("lsPin"), $("lsPin2")].forEach((el) => el.addEventListener("input", () => { $("lsErr").textContent = ""; clearInvalid($("lgSetup")); }));
      $("lsPin2").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); $("lsOk").onclick(); } };
      // satu jalur untuk dua pintu: menu User & Area (utama) dan layar masuk (darurat)
      async function resetAllPins() {
        const ok = await askType(
          "Hapus semua password?",
          "Semua user bisa masuk tanpa password sampai admin mengatur password lagi. Data pemeriksaan tidak terhapus.",
          "RESET",
          "Hapus semua password",
          3,
        );
        if (!ok) return false;
        users.forEach((u) => delete u.pin);
        sv(K_U, users);
        meId = "";
        try { sessionStorage.removeItem(K_ME); } catch (e) {}
        applyRole();
        loginUi();
        initAll();
        renderUsr();
        toast("Semua password dihapus. Atur password admin di menu User & Area.");
        return true;
      }
      $("lgReset").onclick = async () => {
        $("login").hidden = true;
        if (!(await resetAllPins())) loginUi();
      };
      $("uResetPin").onclick = async () => {
        if (!(await supAuth())) return;
        if (!users.some((u) => u.pin)) return toast("Belum ada password yang diatur.");
        await resetAllPins();
      };
      const inScope = (a) => !curUser() || curUser().areas.includes(a);
      const visAreas = () => areas().filter(inScope);
      const isClosed = (a) => !!closed[a];
      const owners = (a) => users.filter((u) => u.active !== false && isStaff(u) && u.areas.includes(a)).map((u) => u.name);
      function areaStat(a) {
        const b = DATA.filter((x) => x.area === a);
        return { total: b.length, done: b.filter((x) => counts[x.bin]).length };
      }
      function renderUserSel() {
        if (curU && !curUser()) curU = "";
        const lim = authOn() && !isSup();
        $("user").innerHTML =
          (lim ? "" : '<option value="">Semua petugas</option>') +
          staff()
            .filter((u) => u.active !== false && (!lim || u.id === curU))
            .map((u) => \`<option value="\${esc(u.id)}" \${u.id === curU ? "selected" : ""}>\${esc(u.name)}</option>\`)
            .join("");
        $("user").value = curU;
        $("user").disabled = lim;
      }
      function renderAreaBar(area) {
        const el = $("areaBar");
        if (area === "*") {
          el.innerHTML = "";
          return;
        }
        const s = areaStat(area),
          a = esc(area);
        if (isClosed(area))
          el.innerHTML = \`<div class="note ok">Area \${a} sudah ditutup oleh \${esc(closed[area].by)}. Bin tidak bisa diubah.</div>\`;
        else if (s.total && s.done === s.total)
          el.innerHTML = \`<div class="note ok">Semua \${s.total} bin area \${a} sudah diperiksa.\${isSup() ? \`<button class="btn pri sm" data-close="\${a}">Tutup area \${a}</button>\` : " Menunggu admin atau SPV menutup area."}</div>\`;
        else el.innerHTML = \`<div class="note info">Area \${a}: \${s.done} dari \${s.total} bin diperiksa.</div>\`;
      }
      async function closeArea(a) {
        if (!(await leadAuth())) return;
        const s = areaStat(a);
        if (!s.total || s.done < s.total) return toast("Area belum bisa ditutup: masih ada bin yang belum diperiksa.");
        if (!(await ask("Tutup area " + a + "?", "Bin di area ini tidak bisa diubah sampai dibuka kembali.", "Tutup area"))) return;
        closed[a] = { by: curName() || "Supervisor", at: nowIso() };
        sv(K_X, closed);
        toast("Area " + a + " ditutup");
        tgArea(a, true);
        renderBins();
        renderUsr();
      }
      async function reopenArea(a) {
        if (!(await leadAuth())) return;
        if (!(await ask("Buka kembali area " + a + "?", "Bin di area ini bisa diperiksa ulang.", "Buka kembali"))) return;
        delete closed[a];
        sv(K_X, closed);
        toast("Area " + a + " dibuka kembali");
        tgArea(a, false);
        renderBins();
        renderUsr();
      }
      const saveAreaCfg = (list) => {
        areaCfg = { list, at: Date.now() };
        sv(K_AC, areaCfg);
        if (typeof renderBins === "function") renderBins();
        renderUsr();
      };
      function renderAreaCfg() {
        const base = areaBase();
        $("aCfgList").innerHTML = base.length
          ? base.map((a) => \`<button type="button" class="chip" data-ad="\${esc(a)}" aria-label="Hapus area \${esc(a)}">\${esc(a)} ✕</button>\`).join("")
          : '<div class="hint">Belum ada area. Tambahkan di bawah.</div>';
      }
      const areaClean = (v) => String(v || "").toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 12);
      $("aCfgAdd").onclick = () => {
        const a = areaClean($("aCfgIn").value);
        if (!a) return toast("Isi nama area (huruf/angka).");
        if (allAreas().includes(a)) return toast("Area " + a + " sudah ada.");
        saveAreaCfg([...areaBase(), a]);
        $("aCfgIn").value = "";
        toast("Area " + a + " ditambahkan");
      };
      $("aCfgIn").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); $("aCfgAdd").onclick(); } };
      $("aCfgList").onclick = async (e) => {
        const b = e.target.closest("[data-ad]");
        if (!b) return;
        const a = b.dataset.ad;
        if (DATA.some((x) => x.area === a)) return toast("Area " + a + " masih punya bin di data WMS, tidak bisa dihapus.");
        if (!(await ask("Hapus area " + a + "?", "Area dilepas dari semua petugas.", "Hapus", true))) return;
        users.forEach((u) => { if (Array.isArray(u.areas)) u.areas = u.areas.filter((x) => x !== a); });
        sv(K_U, users);
        uSel = uSel.filter((x) => x !== a);
        saveAreaCfg(areaBase().filter((x) => x !== a));
      };
      $("aCfgReset").onclick = async () => {
        if (await ask("Kembalikan daftar area awal?", "Daftar area kembali ke 18 area bawaan.", "Kembalikan")) saveAreaCfg([...AREA_DEFAULT]);
      };
      function renderUsr() {
        const A = allAreas();
        renderAreaCfg();
        const eu = uEdit && users.find((x) => x.id === uEdit),
          adminRole = $("uRole").value === "admin",
          scoped = !!(ROLES[$("uRole").value] && ROLES[$("uRole").value].staff);
        $("uTitle").textContent = uEdit ? "Ubah user" : "Tambah user";
        $("uAdd").textContent = uEdit ? "Simpan perubahan" : "Simpan user";
        $("uCancel").hidden = !uEdit;
        $("uAreasWrap").hidden = !scoped; // admin dan SPV melihat semua area
        $("uViewWrap").hidden = !scoped;
        $("uMenusWrap").hidden = adminRole;
        $("uMenus").innerHTML = Object.keys(MENU_DEF).map((k) => \`<button type="button" class="chip \${uMenus.includes(k) ? "on" : ""}" data-m="\${k}" aria-pressed="\${uMenus.includes(k)}">\${MENU_DEF[k]}</button>\`).join("");
        document.querySelectorAll("#uPreset [data-p]").forEach((b) => {
          const on = sameSet(uMenus, PRESETS[b.dataset.p]);
          b.classList.toggle("on", on);
          b.setAttribute("aria-pressed", String(on));
        });
        $("uPinL").textContent = "Password (minimal 6 karakter)";
        $("uPinH").textContent = eu && eu.pin ? "Password sudah diatur. Kosongkan jika tidak ingin mengubah." : "Wajib diisi. Dipakai user untuk masuk bersama namanya.";
        $("uBoot").innerHTML = users.some((u) => u.role === "admin" && u.pin && u.active !== false)
          ? ""
          : '<div class="note">Belum ada admin dengan password, jadi semua orang masih bisa membuka semua menu. Ubah akun Admin di bawah dan isi password. Setelah itu semua user harus masuk dengan nama dan password.</div>';
        $("uAreas").innerHTML = A.length
          ? A.map((a) => \`<button class="chip \${uSel.includes(a) ? "on" : ""}" data-a="\${esc(a)}">\${esc(a)}</button>\`).join("")
          : '<div class="hint">Belum ada area. Impor data WMS dulu.</div>';
        { // ringkasan jumlah user
          const act = users.filter((u) => u.active !== false), noPin = act.filter((u) => !u.pin).length;
          const tile = (v, l, c) => \`<div class="ut \${c || ""}"><b>\${v}</b><span>\${l}</span></div>\`;
          $("uSum").innerHTML = tile(users.length, "Total user") + tile(act.length, "Aktif", "ok") + tile(noPin, "Tanpa password", noPin ? "warn" : "");
        }
        const RANK = { admin: 0, spv: 1, petugas: 2, penerimaan: 3 };
        $("usrList").innerHTML = users.length
          ? [...users]
              .sort((x, y) => (RANK[roleOf(x)] ?? 9) - (RANK[roleOf(y)] ?? 9) || (x.active === false) - (y.active === false) || String(x.name).localeCompare(String(y.name), "id"))
              .map((u) => {
                const self = meUser() && meUser().id === u.id,
                  off = u.active === false,
                  areaPills =
                    u.role === "admin"
                      ? '<span class="m">Semua area</span>'
                      : !isStaff(u)
                      ? '<span class="m">Semua area</span>'
                      : u.areas.map((a) => {
                          const s = areaStat(a);
                          return \`<span class="pill \${isClosed(a) ? "green" : s.done ? "amber" : ""}">\${esc(a)} · \${isClosed(a) ? "ditutup" : s.done + "/" + s.total}</span>\`;
                        }).join("") || '<span class="m">Belum ada area</span>';
                return \`<div class="ucard\${off ? " off" : ""}"><div class="uh"><span class="uav r-\${roleOf(u)}" aria-hidden="true">\${esc((String(u.name).trim()[0] || "?").toUpperCase())}</span><div class="uid"><b>\${esc(u.name)}\${self ? ' <em>Anda</em>' : ""}</b><small>\${ROLES[roleOf(u)].label}</small></div><span class="pill \${off ? "amber" : "green"}">\${off ? "Nonaktif" : "Aktif"}</span></div><div class="ub"><div class="ur"><span>Password</span><div><span class="pill \${u.pin ? "green" : "amber"}">\${u.pin ? "Sudah diatur" : "Belum ada"}</span></div></div><div class="ur"><span>Area</span><div class="ucp">\${areaPills}</div></div><div class="ur"><span>Menu</span><div>\${u.role === "admin" ? "Semua menu" : menuLabel(u)}</div></div></div><div class="acts"><button class="btn sec sm inl" data-edit="\${esc(u.id)}">Ubah</button><button class="btn sec sm inl" data-act="\${esc(u.id)}">\${off ? "Aktifkan" : "Nonaktifkan"}</button><button class="btn dng sm inl" data-del="\${esc(u.id)}">Hapus</button></div></div>\`;
              })
              .join("")
          : '<div class="empty">Belum ada user. Tambahkan di bawah.</div>';
        $("aStat").innerHTML = A.map((a) => {
          const s = areaStat(a),
            c = isClosed(a),
            full = s.total && s.done === s.total,
            mand = !s.total,
            ow = owners(a);
          const pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
          return \`<div class="acard"><div class="r"><b class="big">Area \${esc(a)}</b><span class="pill \${c ? "green" : full ? "amber" : ""}">\${c ? "Ditutup" : mand ? "Belum ada data" : full ? "Siap ditutup" : "Berjalan"}</span></div>\${mand ? '<div class="m">Belum ada bin di data WMS. Impor Informasi Rak WMS di menu Data WMS.</div>' : \`<div class="pbar" role="progressbar" aria-valuenow="\${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:\${pct}%"></i></div><div class="m">\${s.done} dari \${s.total} bin diperiksa · \${pct}%</div>\`}<div class="m">Petugas: \${ow.length ? esc(ow.join(", ")) : "belum ada"}</div>\${c ? \`<div class="m">Ditutup oleh \${esc(closed[a].by)}</div>\${isSup() ? \`<button class="btn sec sm" data-reopen="\${esc(a)}">Buka kembali</button>\` : ""}\` : full && isSup() ? \`<button class="btn pri sm" data-close="\${esc(a)}">Tutup area \${esc(a)}</button>\` : ""}</div>\`;
        }).join("");
      }
      function resetUForm() {
        uEdit = null;
        uSel = [];
        uMenus = [...PRESETS.petugas];
        $("uName").value = "";
        $("uRole").value = "petugas";
        $("uView").value = "";
        $("uPin").value = "";
        $("uActive").checked = true;
        renderUsr();
      }
      // ganti peran = menu ikut standar peran itu (bisa disesuaikan lagi lewat chip menu)
      $("uRole").onchange = () => {
        if (PRESETS[$("uRole").value]) uMenus = [...PRESETS[$("uRole").value]];
        renderUsr();
      };
      $("user").onchange = async () => {
        const nv = $("user").value;
        if (nv === "" && curU !== "" && !isSup()) {
          toast("Hanya admin atau SPV yang bisa melihat semua petugas.");
          $("user").value = curU;
          return;
        }
        curU = nv;
        if (curU && DATA.some(isTaskPend)) lf = "task";
        sv(K_CU, curU);
        initAll();
      };
      $("uAreas").onclick = (e) => {
        const b = e.target.closest("[data-a]");
        if (!b) return;
        const a = b.dataset.a;
        uSel = uSel.includes(a) ? uSel.filter((x) => x !== a) : [...uSel, a];
        renderUsr();
      };
      $("uCancel").onclick = resetUForm;
      $("uMenus").onclick = (e) => {
        const b = e.target.closest("[data-m]");
        if (!b) return;
        const k = b.dataset.m;
        uMenus = uMenus.includes(k) ? uMenus.filter((x) => x !== k) : [...uMenus, k];
        renderUsr();
      };
      $("uPreset").onclick = (e) => {
        const b = e.target.closest("[data-p]");
        if (!b) return;
        uMenus = [...PRESETS[b.dataset.p]];
        renderUsr();
      };
      $("uAdd").onclick = async () => {
        const name = $("uName").value.trim(),
          role = $("uRole").value,
          pin = $("uPin").value.trim(),
          active = $("uActive").checked,
          old = uEdit ? users.find((x) => x.id === uEdit) : null;
        if (!(await supAuth())) return;
        if (!name) return toast("Nama wajib diisi.");
        if (!ROLES[role]) return toast("Pilih peran user.");
        if (users.some((u) => u.id !== uEdit && u.name.toLowerCase() === name.toLowerCase()))
          return toast("Nama sudah dipakai. Gunakan nama lain.");
        if (ROLES[role].staff && !uSel.length) return toast("Pilih minimal satu area untuk " + ROLES[role].label + " ini.");
        if (role !== "admin" && !uMenus.length) return toast("Pilih minimal satu menu untuk user ini.");
        if (!pin && !(old && old.pin)) return toast("Password wajib diisi (minimal 6 karakter).");
        if (pin && (pin.length < 6 || pin.length > 64)) return toast("Password minimal 6 dan maksimal 64 karakter.");

        let newHash = "";
        if (pin) {
          try { newHash = await pinMake(pin); } catch (e) { return toast("Perangkat ini tidak bisa menyimpan password dengan aman. Buka aplikasi lewat alamat HTTPS."); }
        }
        const wasAuth = authOn();
        // jangan sampai tidak ada admin aktif ber-password setelah perubahan ini
        const rest = users.filter((u) => u.id !== uEdit && u.role === "admin" && u.pin && u.active !== false).length;
        const stays = role === "admin" && active;
        if (wasAuth && !rest && !stays) return toast("Harus tersisa minimal satu admin aktif.");
        if (old && meUser() && meUser().id === old.id && (!active || role !== "admin") && wasAuth)
          return toast("Anda tidak bisa menonaktifkan atau menurunkan peran akun sendiri.");
        const rec = old || { id: "u" + Date.now().toString(36) };
        rec.name = name;
        rec.role = role;
        rec.active = active;
        rec.areas = ROLES[role].staff ? [...uSel].sort() : [];
        if (ROLES[role].staff && $("uView").value) rec.view = $("uView").value;
        else delete rec.view;
        if (role === "admin") delete rec.menus;
        else rec.menus = [...uMenus];
        if (newHash) rec.pin = newHash;
        if (!old) users.push(rec);
        sv(K_U, users);
        if (!wasAuth && authOn()) {
          meId = rec.id;
          try { sessionStorage.setItem(K_ME, meId); } catch (e) {}
          toast("Password admin diatur. Anda masuk sebagai " + name + ". Mulai sekarang semua user harus masuk dengan nama dan password.");
        } else toast("User tersimpan: " + name);
        resetUForm();
        applySession();
        applyRole();
        initAll();
      };
      $("usrList").onclick = async (e) => {
        const ed = e.target.closest("[data-edit]"),
          dl = e.target.closest("[data-del]"),
          ac = e.target.closest("[data-act]");
        if (!ed && !dl && !ac) return;
        if (!(await supAuth())) return;
        const id = (ed || dl || ac).dataset.edit || (dl || ac || {}).dataset?.del || (ac || {}).dataset?.act;
        const u = users.find((x) => x.id === id);
        if (!u) return;
        const adminsLeft = (excl) => users.filter((x) => x.id !== excl && x.role === "admin" && x.pin && x.active !== false).length;
        const isSelf = meUser() && meUser().id === u.id;
        if (ed) {
          uEdit = u.id;
          uSel = [...u.areas];
          uMenus = u.role === "admin" ? [...PRESETS.petugas] : [...menusOf(u)];
          $("uName").value = u.name;
          $("uRole").value = u.role;
          $("uView").value = u.view || "";
          $("uPin").value = "";
          $("uActive").checked = u.active !== false;
          renderUsr();
          $("uName").scrollIntoView({ block: "center" });
        } else if (ac) {
          const to = u.active === false;
          if (!to && authOn() && isSelf) return toast("Anda tidak bisa menonaktifkan akun sendiri.");
          if (!to && authOn() && u.role === "admin" && !adminsLeft(u.id)) return toast("Harus tersisa minimal satu admin aktif.");
          u.active = to;
          sv(K_U, users);
          toast(u.name + (to ? " diaktifkan" : " dinonaktifkan"));
          renderUsr();
          initAll();
        } else {
          if (authOn() && isSelf) return toast("Anda tidak bisa menghapus akun sendiri.");
          if (authOn() && u.role === "admin" && !adminsLeft(u.id)) return toast("Harus tersisa minimal satu admin aktif.");
          if (!(await ask("Hapus user " + u.name + "?", "Hasil pemeriksaan dan area yang sudah ditutup tidak ikut terhapus. Tugasnya menjadi tanpa petugas.", "Hapus", true))) return;
          users = users.filter((x) => x.id !== u.id);
          sv(K_U, users);
          renderUsr();
          initAll();
        }
      };
      const areaAct = (e) => {
        const c = e.target.closest("[data-close]"),
          r = e.target.closest("[data-reopen]");
        if (c) closeArea(c.dataset.close);
        if (r) reopenArea(r.dataset.reopen);
      };
      $("areaBar").onclick = $("aStat").onclick = areaAct;

`,Ep=`/* KPI Area
   asal: index-fixd.html baris 4576-4655 */
      /* ---------- KPI area ----------
         Tampilan KPI sudah React: src/views/KpiView.jsx. Logika murni: src/lib/kpi.js.
         Di bawah hanya "shim" supaya kode lama (Telegram, DC) tetap memakai nama yang sama. */
      const pc = WMSLib.pc;
      const fmtDur = WMSLib.fmtDur;
      const signed = WMSLib.signed;
      const kpiOf = (rows) => WMSLib.kpiOf(rows, counts, stat);

`,Pp=`/* DC Harian + pilih item DC
   asal: index-fixd.html baris 4656-5118 */
      /* ---------- DC harian ---------- */
      const K_D = "warehouse_dc_v1";
      let dc = ld(K_D, {}),
        dcF = "todo",
        dcList = [],
        dcCur = null,
        dcDirty = false,
        dcAdjSel = "",
        dcAdjAuto = true,
        dcUnlocked = false;
      function dcItems() {
        const m = new Map();
        DATA.forEach((x) => {
          const e = m.get(x.item) || { item: x.item, kode: x.kode, sys: 0, bins: [] };
          e.sys += Number(x.onhand) || 0;
          e.bins.push({ bin: x.bin, onhand: Number(x.onhand) || 0 });
          m.set(x.item, e);
        });
        return [...m.values()].sort((a, b) => a.item.localeCompare(b.item, "id", { numeric: true }));
      }
      const dcSysOf = (e) => (dc[e.item] && dc[e.item].sys != null ? dc[e.item].sys : e.sys);
      const dcFis = (rows) => rows.reduce((a, r) => a + (Number(r.qty) || 0), 0);
      function dcSt(e) {
        const r = dc[e.item];
        if (!r) return "todo";
        if (!r.done) return "draft";
        return dcFis(r.rows) === dcSysOf(e) ? "ok" : "bad";
      }
      const dcLocked = (e) => dcSt(e) === "ok"; // sudah DC dan sesuai = terkunci
      const dcWhen = (iso) => (iso ? new Date(iso).toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "");
      const dcLockSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
      const dcRedoSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5"/></svg>';
      const dcInF = (e, f) => f === "all" || (f === "task" ? tkDcOpen(e.item) : f === "todo" ? ["todo", "draft"].includes(dcSt(e)) : dcSt(e) === f);
      function renderDc() {
        taskBadges();
        dcRoll();
        const all = dcScope(),
          q = $("dcQ").value.toLowerCase().trim().split(/\\s+/).filter(Boolean),
          n = (f) => all.filter((e) => dcInF(e, f)).length,
          checked = n("ok") + n("bad");
    $("dcPickBtn").textContent = "Pilih item DC (" + all.length + ")";
        $("dcStats").innerHTML = [
          ["Item dicek", checked + "/" + all.length, ""],
          ["Belum dicek", n("todo"), n("todo") ? "var(--amber)" : "var(--green)"],
          ["Sesuai", n("ok"), "var(--green)"],
          ["Selisih", n("bad"), n("bad") ? "var(--red)" : ""],
        ]
          .map(([l, v, c]) => \`<div class="stat"><small>\${l}</small><strong style="\${c ? "color:" + c : ""}">\${v}</strong></div>\`)
          .join("");
        $("dcChips").innerHTML = chipsHtml(dcF, [
          ...(all.some((e) => tasks["DC|" + e.item]) ? [["task", "Tugas", n("task")]] : []),
          ["todo", "Belum", n("todo")],
          ["bad", "Selisih", n("bad")],
          ["ok", "Terkunci", n("ok")],
          ["all", "Semua", all.length],
        ]);
        dcList = all.filter((e) => dcInF(e, dcF) && q.every((t) => (e.item + " " + e.kode).toLowerCase().includes(t)));
        $("dcList").innerHTML = dcList.length
          ? dcList
              .map((e, i) => {
                const s = dcSt(e),
                  r = dc[e.item],
                  f = r ? dcFis(r.rows) : 0,
                  ke = r && r.hist && r.hist.length ? " · DC ke-" + (r.hist.length + 1) : "",
                  pill =
                    s === "ok"
                      ? \`<span class="dcb ok">\${dcLockSvg}Sesuai · Terkunci</span>\`
                      : s === "bad"
                        ? \`<span class="dcb bad">\${dcRedoSvg}Selisih \${signed(f - dcSysOf(e))} · DC ulang</span>\`
                        : s === "draft"
                          ? \`<span class="dcb dr">Draft\${ke}</span>\`
                          : '<span class="dcb td">Belum DC</span>';
                return \`<button class="bin \${s === "ok" ? "done-ok locked" : s === "bad" ? "done-bad" : ""}" data-i="\${i}"><b>\${szHtml(e.item)}</b><span class="it">\${esc(e.kode)} · Sistem \${fmt(dcSysOf(e))}\${s === "bad" ? esc(ke) : ""}</span><span class="q">\${r ? fmt(f) : "–"}<small>Fisik</small></span><span>\${pill}</span></button>\`;
              })
              .join("")
          : \`<div class="empty">\${all.length ? (dcF === "todo" && !q.length ? "Semua item sudah dicek." : "Tidak ada item di filter ini.") : DATA.length ? "Belum ada item yang dipilih. Ketuk Pilih item DC di atas." : "Belum ada data WMS."}</div>\`;
        renderDcRep();
      }
      const dcRead = () =>
        [...document.querySelectorAll("#dcRows .dr")]
          .map((r) => ({ rak: r.querySelector(".dr-rak").value.trim().toUpperCase(), qty: r.querySelector(".dr-qty").value.trim() }))
          .filter((r) => r.rak || r.qty !== "");
      function dcAddRow(rak = "", qty = "", focus = "") {
        const d = document.createElement("div");
        d.className = "dr";
        d.innerHTML = \`<input class="dr-rak" list="dcRakList" placeholder="Rak, mis. G-41" autocapitalize="characters" autocomplete="off" aria-label="Rak" value="\${esc(rak)}"><input class="dr-qty" type="number" inputmode="numeric" min="0" step="1" placeholder="Qty" aria-label="Qty" value="\${esc(qty)}"><button class="rm" aria-label="Hapus baris">×</button><div class="dr-h"></div>\`;
        d.querySelector(".rm").onclick = () => {
          d.remove();
          dcDirty = true;
          dcUpd();
        };
        d.querySelector(".dr-rak").onkeydown = (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            d.querySelector(".dr-qty").focus();
          }
        };
        d.querySelector(".dr-qty").onkeydown = (e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          if (d.querySelector(".dr-qty").value === "") return;
          if (d.nextElementSibling) d.nextElementSibling.querySelector(".dr-rak").focus();
          else dcAddRow("", "", "rak");
        };
        $("dcRows").appendChild(d);
        if (focus) d.querySelector(focus === "qty" ? ".dr-qty" : ".dr-rak").focus();
        dcUpd();
      }
      function dcUpd() {
        const rows = dcRead(),
          fis = dcFis(rows),
          sv0 = $("dcSys").value.trim(),
          sys = sv0 === "" ? null : Number(sv0),
          d = sys == null ? null : fis - sys,
          mine = new Set(rows.map((r) => rakFmt(r.rak)));
        $("dcTot").innerHTML = \`<div><small>Fisik</small><strong>\${fmt(fis)}</strong></div><div><small>Sistem</small><strong>\${sys == null ? "–" : fmt(sys)}</strong></div><div class="\${d == null ? "" : d === 0 ? "pos" : "neg"}"><small>Selisih</small><strong>\${d == null ? "–" : d === 0 ? "Sesuai" : signed(d)}</strong></div>\`;
        document.querySelectorAll("#dcRows .dr").forEach((r) => {
          const rak = r.querySelector(".dr-rak").value.trim(),
            q = r.querySelector(".dr-qty").value.trim(),
            h = r.querySelector(".dr-h"),
            b = rak && dcCur.bins.find((x) => rakFmt(x.bin) === rakFmt(rak));
          h.className = "dr-h" + (rak && !b ? " warn" : "");
          h.textContent = !rak ? "" : b ? \`Di WMS: \${fmt(b.onhand)}\${q !== "" ? " · selisih " + signed(Number(q) - b.onhand) : ""}\` : "Rak ini belum tercatat di WMS untuk item ini. Cek penulisannya.";
        });
        $("dcSug").innerHTML = dcCur.bins.length
          ? dcCur.bins.map((b) => \`<button class="chip \${mine.has(rakFmt(b.bin)) ? "on" : ""}" data-r="\${esc(b.bin)}">\${esc(b.bin)} · \${fmt(b.onhand)}</button>\`).join("")
          : '<div class="fine">Item ini belum punya rak di WMS.</div>';
        const miss = dcCur.bins.filter((b) => b.onhand > 0 && !mine.has(rakFmt(b.bin)));
        $("dcMiss").textContent = rows.length && miss.length ? "Belum diisi (stok WMS ada): " + miss.slice(0, 6).map((b) => b.bin + " (" + fmt(b.onhand) + ")").join(", ") + (miss.length > 6 ? " dan " + (miss.length - 6) + " lagi" : "") : "";
        const list = [...new Set(rows.filter((r) => r.rak).map((r) => r.rak))];
        $("dcAdjWrap").hidden = !(d && list.length);
        $("dcAdjRak").innerHTML = list.map((r) => \`<option>\${esc(r)}</option>\`).join("");
        let pick = list[0] || "",
          best = -1;
        list.forEach((rk) => {
          const row = rows.find((x) => x.rak === rk),
            b = dcCur.bins.find((x) => rakFmt(x.bin) === rakFmt(rk)),
            gap = Math.abs((Number(row.qty) || 0) - (b ? b.onhand : 0));
          if (gap > best) {
            best = gap;
            pick = rk;
          }
        });
        $("dcAdjRak").value = !dcAdjAuto && list.includes(dcAdjSel) ? dcAdjSel : pick;
      }
      /* mode lembar DC: "lock" = baca saja (sudah sesuai), "edit" = boleh diisi (belum DC, draft, atau selisih = DC ulang) */
      function dcMode(mode, e, r) {
        const lock = mode === "lock", box = $("dcInfo");
        $("dcSheet").classList.toggle("dc-lock", lock);
        document.querySelectorAll("#dcRows input, #dcSys").forEach((i) => (i.readOnly = lock));
        $("dcUnlock").hidden = !isSup();
        if (lock) {
          box.className = "dcinfo ok";
          box.innerHTML = \`\${dcLockSvg}<div><b>Sudah DC dan sesuai. Terkunci.</b><br>Dicek \${esc((r && r.by) || "-")} · \${esc(dcWhen(r && r.at))}. Hanya bisa dilihat.</div>\`;
          box.hidden = false;
        } else if (r && r.done) {
          box.className = "dcinfo bad";
          const f = dcFis(r.rows), s0 = dcSysOf(e);
          box.innerHTML = \`\${dcRedoSvg}<div><b>DC ulang ke-\${(r.hist ? r.hist.length : 0) + 2}.</b><br>DC terakhir: Fisik \${fmt(f)} · Sistem \${fmt(s0)} · selisih \${signed(f - s0)} (\${esc(r.by || "-")}, \${esc(dcWhen(r.at))}). Hitung ulang semua rak, lalu tekan Selesai.</div>\`;
          box.hidden = false;
        } else if (r && r.hist && r.hist.length) {
          box.className = "dcinfo bad";
          box.innerHTML = \`\${dcRedoSvg}<div><b>DC ulang ke-\${r.hist.length + 1} (draft).</b><br>Lanjutkan, lalu tekan Selesai.</div>\`;
          box.hidden = false;
        } else box.hidden = true;
      }
      function dcOpen(e) {
        dcCur = e;
        const r = dc[e.item];
        $("dcName").textContent = e.item;
        $("dcKode").textContent = "Kode " + e.kode;
        $("dcSys").value = dcSysOf(e);
        $("dcSysHint").textContent = "Diambil dari total stok di data WMS (" + fmt(e.sys) + "). Ubah jika angka QAD berbeda.";
        $("dcRakList").innerHTML = [...new Set(DATA.map((x) => x.bin))].map((b) => \`<option value="\${esc(b)}">\`).join("");
        $("dcRows").innerHTML = "";
        dcAdjSel = (r && r.adj) || "";
        dcAdjAuto = !dcAdjSel;
        $("dcErr").textContent = "";
        clearInvalid($("dcSheet"));
        (r && r.rows.length ? r.rows : [{ rak: "", qty: "" }]).forEach((x) => dcAddRow(x.rak, x.qty));
        dcDirty = false;
        wakeOn();
        dcUnlocked = false;
        dcMode(r && r.done && dcFis(r.rows) === dcSysOf(e) ? "lock" : "edit", e, r);
        $("dcSheet").hidden = false;
        document.body.style.overflow = "hidden";
        dcUpd();
        $("dcSheet").querySelector(".sh-body").scrollTop = 0;
      }
      function dcHide() {
        $("dcSheet").hidden = true;
        if ($("sheet").hidden) wakeOff();
        document.body.style.overflow = "";
        renderDc();
      }
      async function dcClose() {
        if (dcDirty && !(await ask("Buang catatan ini?", "Hasil hitung yang belum disimpan akan hilang.", "Buang", true))) return;
        dcHide();
      }
      async function dcSave(done) {
        const rows = dcRead(),
          sysT = $("dcSys").value.trim(),
          err = (m, el) => {
            clearInvalid($("dcSheet"));
            $("dcErr").textContent = m;
            if (el) {
              markInvalid(el, "dcErr");
              el.focus();
            }
            return false;
          },
          dr = () => [...document.querySelectorAll("#dcRows .dr")].map((r) => ({ rk: r.querySelector(".dr-rak"), q: r.querySelector(".dr-qty") }));
        { // terkunci: item yang sudah DC dan sesuai tidak boleh diubah (kecuali SPV membuka kunci)
          const cur = dc[dcCur.item];
          if (cur && cur.done && dcFis(cur.rows) === dcSysOf(dcCur) && !dcUnlocked) return err("Item ini sudah DC dan sesuai, jadi terkunci.");
        }
        if (!rows.length) return err("Belum ada rak yang dicatat.");
        if (done) {
          if (rows.some((r) => !r.rak)) {
            const x = dr().find((y) => !y.rk.value.trim() && y.q.value.trim() !== "");
            return err("Ada qty yang belum ada nama raknya.", x && x.rk);
          }
          if (rows.some((r) => r.qty === "" || !Number.isInteger(Number(r.qty)) || Number(r.qty) < 0)) {
            const x = dr().find((y) => (y.rk.value.trim() || y.q.value.trim() !== "") && (y.q.value.trim() === "" || !Number.isInteger(Number(y.q.value.trim())) || Number(y.q.value.trim()) < 0));
            return err("Isi qty setiap rak dengan angka bulat 0 atau lebih.", x && x.q);
          }
          const seen = new Set();
          for (const r of rows) {
            const k = rakFmt(r.rak);
            if (seen.has(k)) {
              const x = dr().filter((y) => rakFmt(y.rk.value) === k)[1];
              return err("Rak " + r.rak + " terisi dua kali. Gabungkan jadi satu baris.", x && x.rk);
            }
            seen.add(k);
          }
          if (sysT === "" || !(Number(sysT) >= 0)) return err("Isi stok sistem (QAD) dulu.", $("dcSys"));
        }
        const sys = sysT !== "" && Number(sysT) >= 0 && Number(sysT) !== dcCur.sys ? Number(sysT) : null,
          fis = dcFis(rows),
          d = fis - (sys != null ? sys : dcCur.sys);
        if (done && d !== 0) {
          const have = new Set(rows.map((r) => rakFmt(r.rak))),
            miss = dcCur.bins.filter((b) => b.onhand > 0 && !have.has(rakFmt(b.bin)));
          if (miss.length && !(await ask("Ada rak yang belum diisi", miss.length + " rak di WMS masih punya stok tapi belum Anda catat. Selisih " + signed(d) + " bisa muncul karena itu. Tetap simpan sebagai selesai?", "Tetap simpan"))) return false;
        }
        const prevDc = dc[dcCur.item], hist = prevDc && prevDc.hist ? [...prevDc.hist] : [];
        if (prevDc && prevDc.done) hist.push({ fis: dcFis(prevDc.rows), sys: prevDc.sys != null ? prevDc.sys : dcCur.sys, by: prevDc.by, at: prevDc.at }); // jejak DC sebelumnya
        dc[dcCur.item] = {
          rows: rows.map((r) => ({ rak: r.rak, qty: r.qty === "" ? "" : Number(r.qty) })),
          sys,
          done,
          by: curName(),
          at: nowIso(),
          adj: $("dcAdjRak").value || "",
          hist: hist.slice(-10),
          sy: sys != null ? sys : dcCur.sys,
          kd: dcCur.kode,
        };
        dcUndoStack.push({ item: dcCur.item, prev: prevDc, saved: dc[dcCur.item] });
        if (dcUndoStack.length > 30) dcUndoStack.shift();
        if (!sv(K_D, dc)) {
          $("dcErr").textContent = "Gagal menyimpan ke perangkat (penyimpanan penuh atau diblokir). Data BELUM aman. Unduh cadangan di menu Data WMS, lalu coba lagi.";
          return false;
        }
        if (done) {
          buzz(d === 0 ? 40 : [70, 50, 70]);
          tgDc(dcCur.item, fis, sys != null ? sys : dcCur.sys, d, $("dcAdjRak").value, hist.length + 1);
        }
        dcHide();
        metrics();
        toast(done ? (hist.length ? "DC ulang ke-" + (hist.length + 1) + ": " : "Tersimpan: ") + (d === 0 ? "sesuai, item terkunci" : "selisih " + signed(d)) : "Draft tersimpan");
        return true;
      }
      function dcAdj() {
        const out = [];
        dcItems().forEach((e) => {
          const r = dc[e.item];
          if (!r || !r.done) return;
          const d = dcFis(r.rows) - dcSysOf(e);
          if (d) out.push({ rak: r.adj || (r.rows[0] && r.rows[0].rak) || "", kode: e.kode, nama: e.item, qty: d, ket: "DC selisih total item" });
        });
        return out;
      }
      { let _t = 0; $("dcQ").oninput = () => { clearTimeout(_t); _t = setTimeout(renderDc, 150); }; }
      $("dcChips").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) {
          dcF = b.dataset.k;
          renderDc();
        }
      };
      $("dcList").onclick = (e) => {
        const b = e.target.closest("[data-i]");
        if (b) dcOpen(dcList[Number(b.dataset.i)]);
      };
      $("dcX").onclick = dcClose;
      const dcUndoStack = [];
      function dcUndoTop() {
        while (dcUndoStack.length) {
          const e = dcUndoStack[dcUndoStack.length - 1];
          if (dc[e.item] === e.saved) return e;
          dcUndoStack.pop();
        }
        return null;
      }
      function dcUpdUndo() {
        const e = dcUndoTop();
        $("dcUndoBar").hidden = !e;
        if (e) $("dcUndoTxt").textContent = "Terakhir disimpan: " + e.item;
      }
      function dcUndo() {
        const e = dcUndoTop();
        if (!e) return;
        dcUndoStack.pop();
        if (e.prev) dc[e.item] = e.prev;
        else delete dc[e.item];
        sv(K_D, dc);
        renderDc();
        metrics();
        toast("Dibatalkan: " + e.item + (e.prev ? " (kembali ke isian sebelumnya)" : " (kembali ke Belum)"));
      }
      $("dcUndoBtn").onclick = dcUndo;
      $("dcAdd").onclick = () => {
        dcDirty = true;
        dcAddRow("", "", "rak");
      };
      $("dcRows").addEventListener("input", () => {
        dcDirty = true;
        dcUpd();
      });
      $("dcSheet").addEventListener("input", () => clearInvalid($("dcSheet")));
      $("dcSys").addEventListener("input", () => {
        dcDirty = true;
        dcUpd();
      });
      $("dcAdjRak").onchange = () => {
        dcAdjSel = $("dcAdjRak").value;
        dcAdjAuto = false;
        dcDirty = true;
      };
      $("dcSug").onclick = (e) => {
        const b = e.target.closest("[data-r]");
        if (!b) return;
        dcDirty = true;
        const hit = [...document.querySelectorAll("#dcRows .dr")].find((r) => rakFmt(r.querySelector(".dr-rak").value) === rakFmt(b.dataset.r));
        if (hit) return hit.querySelector(".dr-qty").focus();
        const empty = [...document.querySelectorAll("#dcRows .dr")].find((r) => !r.querySelector(".dr-rak").value.trim() && !r.querySelector(".dr-qty").value.trim());
        if (empty) {
          empty.querySelector(".dr-rak").value = b.dataset.r;
          empty.querySelector(".dr-qty").focus();
          dcUpd();
        } else dcAddRow(b.dataset.r, "", "qty");
      };
      $("dcLockClose").onclick = dcHide;
      $("dcUnlock").onclick = async () => {
        if (!isSup() || !(await ask("Buka kunci item ini?", "Item ini sudah DC dan sesuai. Buka kunci hanya jika ada salah catat. Hasil lama tetap tersimpan sebagai riwayat.", "Buka kunci", true))) return;
        dcUnlocked = true;
        dcMode("edit", dcCur, null);
        const b = $("dcInfo");
        b.className = "dcinfo bad";
        b.innerHTML = \`\${dcRedoSvg}<div><b>Kunci dibuka oleh \${esc(curName())}.</b><br>Ubah hasil hitung, lalu tekan Selesai.</div>\`;
        b.hidden = false;
        dcUpd();
      };
      $("dcDraft").onclick = () => dcSave(false);
      $("dcDone").onclick = () => dcSave(true);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !$("dcSheet").hidden) dcClose();
      });
      $("dcCsv").onclick = () => {
        const label = { todo: "Belum dicek", draft: "Draft", ok: "Sesuai", bad: "Selisih" };
        csvOut(
          [
            ["Item", "Kode Item", "Stok Sistem", "Fisik", "Selisih", "Status", "Rak Adjust", "Petugas", "Waktu", "Detail Rak"],
            ...dcScope().map((e) => {
              const r = dc[e.item],
                s = dcSt(e),
                f = r ? dcFis(r.rows) : "";
              return [e.item, e.kode, dcSysOf(e), f, r ? f - dcSysOf(e) : "", label[s], r && s === "bad" ? r.adj || "" : "", r ? r.by || "" : "", r ? r.at : "", r ? r.rows.map((x) => x.rak + "=" + x.qty).join("; ") : ""];
            }),
          ],
          "rekap_dc.csv",
        );
        toast("Rekap DC diunduh");
      };
      async function sendAll(copyText, tgText, saved) {
        const parts = [];
        if (saved) parts.push("Tersimpan");
        let ok = false;
        try { await navigator.clipboard.writeText(copyText); ok = true; } catch (e) {
          try {
            const a = document.createElement("textarea");
            a.value = copyText;
            document.body.appendChild(a);
            a.select();
            ok = document.execCommand("copy");
            a.remove();
          } catch (_) {}
        }
        parts.push(ok ? "Tersalin" : "Gagal menyalin");
        if (tgReady()) { tgSend(tgText); parts.push("masuk antrean Telegram"); } else parts.push("Telegram belum diatur");
        toast(parts.join(" · "));
      }
      function dcText(forTg) {
        const E = (x) => (forTg ? md(x) : x),
          all = dcScope(),
          g = (s) => all.filter((e) => dcSt(e) === s),
          todo = g("todo").concat(g("draft")),
          line = (e) => {
            const f = dcFis(dc[e.item].rows),
              s = dcSysOf(e);
            const rk = dc[e.item].rows.filter((x) => String(x.rak || "").trim() || Number(x.qty)),
              adj = dc[e.item].adj ? \`\\n   ↳ Rak adjust: \${E(rakFmt(dc[e.item].adj))}\` : "";
            return \`• \${E(e.item)}: \${signed(f - s)} (fisik \${fmt(f)}, sistem \${fmt(s)})\` + (rk.length ? "\\n" + rk.map((x) => \`   - \${E(rakFmt(x.rak)) || "(tanpa rak)"}: \${fmt(Number(x.qty) || 0)}\`).join("\\n") : "") + adj;
          },
          okLine = (e) => {
            const rk = dc[e.item].rows.filter((x) => String(x.rak || "").trim() || Number(x.qty));
            return \`• \${E(e.item)}: \${fmt(dcFis(dc[e.item].rows))}\` + (rk.length ? " (" + rk.map((x) => \`\${E(rakFmt(x.rak)) || "?"}=\${fmt(Number(x.qty) || 0)}\`).join(", ") + ")" : "");
          },
          t =
            \`*DC HARIAN*\\n\${new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}\\n━━━━━━━━━━━━━━━━━━━━\\nDicek \${all.length - todo.length} dari \${all.length} item\\nSesuai \${g("ok").length} | Selisih \${g("bad").length} | Belum \${todo.length}\\n\` +
            (g("bad").length ? \`\\n*Selisih*\\n\${g("bad").map(line).join("\\n")}\\n\` : "") +
            (g("ok").length ? \`\\n*Sesuai (per bin)*\\n\${g("ok").map(okLine).join("\\n")}\\n\` : "") +
            (todo.length ? \`\\n*Belum dicek*\\n\${todo.map((e) => "• " + e.item).join("\\n")}\\n\` : "") +
            (curName() ? \`\\nDilaporkan oleh: \${curName()}\` : "");
        return t;
      }
      $("dcSend").onclick = () => {
        if (!dcScope().length) return toast("Belum ada item DC.");
        sendAll(dcText(false), dcText(true), false);
      };
      $("dcCopy").onclick = () => {
        const t = dcText(tgMode);
        outText(t).then(
          () => toast("Tersalin. Tempel di WhatsApp."),
          () => toast("Gagal menyalin. Izinkan akses clipboard di browser atau salin manual."),
        );
      };
      $("dcReset").onclick = async () => {
        if (!(await leadAuth())) return;
        if (await ask("Mulai DC baru?", "Hasil DC bulan ini dan daftar item yang dipilih dihapus. Arsip bulan-bulan lalu dan laporan deviasi tetap tersimpan. Unduh rekap dulu jika masih perlu.", "Hapus dan mulai baru", true)) {
          dc = Object.fromEntries(Object.entries(dc).filter(([k]) => k[0] === "@")); // arsip bulanan tidak ikut dihapus
          dcPick = {};
          sv(K_D, dc);
          sv(K_DP, dcPick);
          renderDc();
          metrics();
          toast("DC baru dimulai");
        }
      };

      /* ---------- pilih item DC ---------- */
      const K_DP = "warehouse_dc_pick_v1";
      let dcPick = ld(K_DP, {}),
        pkRows = [];
      const dcScope = () => dcItems().filter((e) => dcPick[e.item] || dc[e.item]);
      function renderPick() {
        const all = dcItems(),
          q = $("pkQ").value.toLowerCase().trim().split(/\\s+/).filter(Boolean);
        pkRows = all.filter((e) => q.every((t) => (e.item + " " + e.kode).toLowerCase().includes(t)));
        const on = all.filter((e) => dcPick[e.item] || dc[e.item]).length;
        $("pkCount").textContent = on + " dipilih dari " + all.length + " item";
        $("pkList").innerHTML = pkRows.length
          ? pkRows
              .map((e, i) => {
                const lock = !!dc[e.item],
                  sel = dcPick[e.item] || lock;
                return \`<button class="pk \${sel ? "on" : ""}" data-n="\${i}"><span class="ck">\${sel ? "✓" : ""}</span><span><b>\${esc(e.item)}</b><small>\${esc(e.kode)} · Sistem \${fmt(e.sys)}\${lock ? " · sudah dicek" : ""}</small></span></button>\`;
              })
              .join("")
          : '<div class="empty">Item tidak ditemukan.</div>';
      }
      const pkSave = () => {
        sv(K_DP, dcPick);
        renderPick();
      };
      $("dcPickBtn").onclick = () => {
        $("pkQ").value = "";
        renderPick();
        $("dcPickSheet").hidden = false;
        document.body.style.overflow = "hidden";
      };
      function pkClose() {
        $("dcPickSheet").hidden = true;
        document.body.style.overflow = "";
        renderDc();
      }
      $("pkX").onclick = $("pkOk").onclick = pkClose;
      { let _t = 0; $("pkQ").oninput = () => { clearTimeout(_t); _t = setTimeout(renderPick, 120); }; }
      $("pkList").onclick = (e) => {
        const b = e.target.closest("[data-n]");
        if (!b) return;
        const it = pkRows[Number(b.dataset.n)];
        if (dc[it.item]) return toast("Item ini sudah dicek, tidak bisa dilepas");
        if (dcPick[it.item]) delete dcPick[it.item];
        else dcPick[it.item] = true;
        pkSave();
      };
      $("pkAll").onclick = () => {
        pkRows.forEach((e) => (dcPick[e.item] = true));
        pkSave();
      };
      $("pkNone").onclick = () => {
        pkRows.forEach((e) => {
          if (!dc[e.item]) delete dcPick[e.item];
        });
        pkSave();
      };
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !$("dcPickSheet").hidden) pkClose();
      });

      $("qty").addEventListener("focus", (e) => e.target.select());
      /* ---- v4: perilaku tambahan ---- */
      document.querySelectorAll("#tabs [data-v]").forEach((b) => (b.onclick = () => nav(b.dataset.v)));
      $("tMenu").onclick = () => side(true);
      /* ---------- arsip bulanan + laporan deviasi ----------
         Awal bulan: hasil DC bulan lalu dipindah ke arsip (kunci "@YYYY-MM|ITEM" di data DC, ikut tersinkron),
         lalu daftar DC bulan baru mulai kosong. Item yang selisih bulan lalu otomatis masuk daftar lagi. */
      const DC_BLN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      const DC_BLS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
      const dcYM = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
      const dcML = (m, short) => (short ? DC_BLS : DC_BLN)[Number(m.slice(5)) - 1] + (short ? "" : " " + m.slice(0, 4));
      const dcMPrev = (m, k) => {
        let y = Number(m.slice(0, 4)), mo = Number(m.slice(5)) - k;
        while (mo < 1) { mo += 12; y--; }
        return y + "-" + String(mo).padStart(2, "0");
      };
      function dcRoll() {
        if (!DATA.length) return 0; // tunggu data WMS agar qty sistem bisa dipastikan
        const cur = dcYM(new Date());
        let moved = 0, picked = 0, im = null;
        Object.keys(dc).forEach((k) => {
          const r = dc[k];
          if (k[0] === "@" || !r || !r.at) return;
          const m = dcYM(new Date(r.at));
          if (!(m < cur)) return;
          if (r.done) {
            im = im || new Map(dcItems().map((e) => [e.item, e]));
            const e = im.get(k), fis = dcFis(r.rows || []), sys = r.sy != null ? r.sy : r.sys != null ? r.sys : e ? e.sys : null;
            if (sys != null) {
              const h0 = r.hist && r.hist[0], key = "@" + m + "|" + k,
                rec = { m, item: k, kode: r.kd || (e && e.kode) || "", sys, fis, d: fis - sys, d0: h0 ? h0.fis - (h0.sys != null ? h0.sys : sys) : fis - sys, n: (r.hist ? r.hist.length : 0) + 1, by: r.by || "", at: r.at, adj: r.adj || "" };
              if (!dc[key] || String(dc[key].at) < String(rec.at)) dc[key] = rec;
              if (rec.d && !dcPick[k]) { dcPick[k] = true; picked++; } // selisih bulan lalu: wajib DC lagi bulan ini
            }
          }
          delete dc[k];
          moved++;
        });
        if (moved) {
          dcUndoStack.length = 0;
          sv(K_D, dc);
          if (picked) sv(K_DP, dcPick);
        }
        return moved;
      }
      function dcMonthRecs(m, im) {
        const out = new Map(), cur = dcYM(new Date());
        Object.keys(dc).forEach((k) => {
          const r = dc[k];
          if (!r) return;
          if (k[0] === "@") { if (r.m === m) out.set(r.item, r); return; }
          if (m === cur && r.done && r.at && dcYM(new Date(r.at)) === cur) {
            const e = im.get(k), fis = dcFis(r.rows || []), sys = r.sy != null ? r.sy : r.sys != null ? r.sys : e ? e.sys : null;
            if (sys != null) out.set(k, { m, item: k, kode: r.kd || (e && e.kode) || "", sys, fis, d: fis - sys, n: (r.hist ? r.hist.length : 0) + 1, by: r.by || "", at: r.at, adj: r.adj || "" });
          }
        });
        return out;
      }
      function dcMonths() {
        const s = new Set(), cur = dcYM(new Date());
        Object.keys(dc).forEach((k) => {
          const r = dc[k];
          if (!r) return;
          if (k[0] === "@") s.add(r.m);
          else if (r.done && r.at && dcYM(new Date(r.at)) === cur) s.add(cur);
        });
        return [...s].sort().reverse();
      }
      /* item yang selisih di bulan M, dihitung mundur: berapa bulan kalender berturut-turut ia selisih */
      function dcReport(M) {
        const im = new Map(dcItems().map((e) => [e.item, e])), cache = {},
          mr = (m) => cache[m] || (cache[m] = dcMonthRecs(m, im)),
          rows = [];
        mr(M).forEach((r, item) => {
          if (!r.d) return;
          const trail = [r];
          for (let k = 1; k < 12; k++) {
            const p = mr(dcMPrev(M, k)).get(item);
            if (!p || !p.d) break;
            trail.unshift(p);
          }
          rows.push({ item, kode: r.kode, streak: trail.length, trail, total: trail.reduce((a, x) => a + x.d, 0), last: r });
        });
        rows.sort((a, b) => b.streak - a.streak || Math.abs(b.total) - Math.abs(a.total) || a.item.localeCompare(b.item, "id"));
        return { M, rows, act: rows.filter((x) => x.streak >= 3), mon: rows.filter((x) => x.streak === 2), checked: mr(M).size };
      }
      let dcRepM = "", dcRepF = "3";
      const dcRepRows = (rep) => (dcRepF === "3" ? rep.act : dcRepF === "2" ? rep.mon : rep.rows);
      function renderDcRep() {
        const ms = dcMonths(), cur = dcYM(new Date());
        if (!ms.includes(dcRepM)) dcRepM = ms.find((m) => m < cur) || ms[0] || ""; // bawaan: bulan terakhir yang sudah ditutup
        const rep = dcRepM ? dcReport(dcRepM) : null;
        $("dcRepSum").innerHTML = "Laporan deviasi " + (rep ? dcML(rep.M) : "bulanan") + (rep ? \` <span class="dcb \${rep.act.length ? "bad" : "ok"}">\${rep.act.length ? rep.act.length + " item perlu tindakan" : "Tidak ada yang 3 bulan berturut"}</span>\` : ' <span class="fine">belum ada data</span>');
        if (!$("dcRepBox").open) return;
        $("dcRepM").innerHTML = ms.map((m) => \`<option value="\${m}">\${dcML(m)}\${m === cur ? " (berjalan)" : ""}</option>\`).join("");
        $("dcRepM").value = dcRepM;
        if (!rep) {
          $("dcRepTiles").innerHTML = "";
          $("dcRepChips").innerHTML = "";
          $("dcRepList").innerHTML = '<div class="empty">Belum ada hasil DC yang selesai. Laporan terisi otomatis dari hasil DC tiap bulan; awal bulan hasilnya diarsipkan.</div>';
          return;
        }
        const tile = (v, l, c) => \`<div class="ut \${c || ""}"><b>\${v}</b><span>\${l}</span></div>\`;
        $("dcRepTiles").innerHTML = tile(rep.checked, "Item di-DC") + tile(rep.act.length, "Selisih 3+ bulan", rep.act.length ? "bad" : "ok") + tile(rep.mon.length, "Selisih 2 bulan", rep.mon.length ? "warn" : "ok");
        $("dcRepChips").innerHTML = chipsHtml(dcRepF, [["3", "3+ bulan", rep.act.length], ["2", "2 bulan", rep.mon.length], ["all", "Semua selisih", rep.rows.length]]);
        const L = dcRepRows(rep);
        $("dcRepList").innerHTML = L.length
          ? L.map((x) => \`<div class="rcard \${x.streak >= 3 ? "act" : "mon"}"><div class="rh"><b>\${esc(x.item)}</b><span class="dcb \${x.streak >= 3 ? "bad" : "dr"}">\${x.streak} bulan berturut</span></div><small>\${esc(x.kode)}</small><div class="rmo">\${x.trail.map((t) => \`<span class="mchip">\${dcML(t.m, true)}<b>\${signed(t.d)}</b></span>\`).join("")}</div><div class="rt">Total \${signed(x.total)} · DC bulan ini \${x.last.n}×\${x.last.by ? " · " + esc(x.last.by) : ""}</div>\${x.streak >= 3 ? '<div class="ra">Perlu tindakan: telusuri transaksi dan lokasi rak, cocokkan dengan QAD, lalu koreksi stok.</div>' : ""}</div>\`).join("")
          : \`<div class="empty">\${dcRepF === "3" ? "Tidak ada item dengan selisih 3 bulan berturut-turut." : "Tidak ada item di kategori ini."}\${ms.length < 3 ? " Data tersimpan baru " + ms.length + " bulan, laporan 3 bulan terisi setelah ada 3 bulan data." : ""}</div>\`;
      }
      function dcRepText(rep, forTg) {
        const E = (x) => (forTg ? md(x) : x),
          one = (x, i) => \`\${i + 1}. \${E(x.item)}\${x.kode ? " (" + E(x.kode) + ")" : ""}\\n   \${x.trail.map((t) => dcML(t.m, true) + " " + signed(t.d)).join(" · ")} (total \${signed(x.total)})\`;
        const out = [\`\${forTg ? "*" : ""}LAPORAN DEVIASI DC - \${dcML(rep.M).toUpperCase()}\${forTg ? "*" : ""}\`, \`Item di-DC: \${rep.checked} · Selisih: \${rep.rows.length}\`, ""];
        out.push(\`\${forTg ? "*" : ""}PERLU TINDAKAN: selisih 3+ bulan berturut-turut (\${rep.act.length})\${forTg ? "*" : ""}\`);
        out.push(...(rep.act.length ? rep.act.map(one) : ["Tidak ada."]), "");
        out.push(\`\${forTg ? "*" : ""}PANTAU: selisih 2 bulan berturut-turut (\${rep.mon.length})\${forTg ? "*" : ""}\`);
        out.push(...(rep.mon.length ? rep.mon.map(one) : ["Tidak ada."]));
        return out.join("\\n");
      }
      $("dcRepBox").addEventListener("toggle", renderDcRep);
      $("dcRepM").onchange = () => { dcRepM = $("dcRepM").value; renderDcRep(); };
      $("dcRepChips").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (b) { dcRepF = b.dataset.k; renderDcRep(); }
      };
      $("dcRepSend").onclick = () => {
        if (!dcRepM) return toast("Belum ada data untuk laporan.");
        const rep = dcReport(dcRepM);
        sendAll(dcRepText(rep, false), dcRepText(rep, true), false);
      };
      $("dcRepCsv").onclick = () => {
        if (!dcRepM) return toast("Belum ada data untuk laporan.");
        const rep = dcReport(dcRepM);
        csvOut(
          [
            ["Bulan laporan", "Item", "Kode Item", "Bulan berturut-turut", "Kategori", "Selisih 2 bulan lalu", "Selisih bulan lalu", "Selisih bulan ini", "Total selisih", "DC bulan ini (kali)", "Petugas terakhir", "Rak adjust"],
            ...rep.rows.map((x) => {
              const t = x.trail.map((y) => y.d), pad = Array(Math.max(0, 3 - t.length)).fill(""), last3 = [...pad, ...t.slice(-3)];
              return [dcML(rep.M), x.item, x.kode, x.streak, x.streak >= 3 ? "Perlu tindakan" : x.streak === 2 ? "Pantau" : "Selisih baru", ...last3, x.total, x.last.n, x.last.by, x.last.adj];
            }),
          ],
          "laporan_deviasi_dc_" + rep.M + ".csv",
        );
        toast("Laporan diunduh");
      };
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && dcRoll()) { renderDc(); metrics(); }
      });
      dcRoll();
`,Bp=`/* Dialog atur navigasi bawah
   asal: index-fixd.html baris 5119-5163 */
      /* ---- v17: dialog atur navigasi bawah ---- */
      let navDraft = [];
      function navRender() {
        const allowed = NAV_ORDER.filter(allowedView);
        $("navChips").innerHTML = allowed.map((v) => \`<button type="button" class="chip \${navDraft.includes(v) ? "on" : ""}" data-n="\${v}" aria-pressed="\${navDraft.includes(v)}">\${esc(NAV_NAME[v])}</button>\`).join("");
        $("navH").textContent = \`Pilih sampai \${NAV_MAX} menu. Terpilih \${navDraft.length} dari \${NAV_MAX}. Tombol Menu selalu ada. Pengaturan ini hanya berlaku di perangkat ini.\`;
      }
      function navOpen() {
        side(false);
        navDraft = navPicks();
        navRender();
        $("navSet").hidden = false;
      }
      const navClose = () => ($("navSet").hidden = true);
      $("navBtn").onclick = navOpen;
      $("navCancel").onclick = navClose;
      $("navChips").onclick = (e) => {
        const b = e.target.closest("[data-n]");
        if (!b) return;
        const v = b.dataset.n;
        if (navDraft.includes(v)) navDraft = navDraft.filter((x) => x !== v);
        else if (navDraft.length >= NAV_MAX) return toast("Maksimal " + NAV_MAX + " menu. Lepas satu dulu.");
        else navDraft = [...navDraft, v];
        navRender();
      };
      $("navSave").onclick = () => {
        if (!navDraft.length) return toast("Pilih minimal satu menu.");
        navCfg = NAV_ORDER.filter((v) => navDraft.includes(v));
        sv(K_NAV, navCfg);
        navClose();
        applyRole();
        toast("Navigasi bawah tersimpan");
      };
      $("navReset").onclick = () => {
        navCfg = null;
        sv(K_NAV, null);
        navDraft = navPicks();
        navRender();
        applyRole();
        navClose();
        toast("Navigasi bawah dikembalikan ke standar");
      };
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !$("navSet").hidden) navClose();
      });
`,Kp=`/* Menu samping bertingkat: judul grup bisa dibuka/ditutup, submenu rapi (satu grup terbuka sekaligus) */
      (function () {
        const box = document.querySelector("#side .sd-m");
        if (!box) return;
        let n = 0;
        const build = (h, items, stat) => {
          const id = "mgs" + ++n, grp = document.createElement("div"), sub = document.createElement("div"), inn = document.createElement("div");
          grp.className = "mg-grp";
          if (stat) grp.dataset.stat = "1";
          sub.className = "mg-sub";
          sub.id = id;
          inn.className = "mg-in";
          h.parentNode.insertBefore(grp, h);
          grp.append(h, sub);
          sub.append(inn);
          items.forEach((i) => inn.append(i));
          h.classList.add("mg");
          h.removeAttribute("role");
          h.removeAttribute("aria-level");
          h.setAttribute("aria-controls", id);
          if (stat) { h.tabIndex = 0; h.setAttribute("role", "button"); h.setAttribute("aria-expanded", "false"); grp.dataset.open = "0"; }
          const tgl = () => {
            if (grp.dataset.single) return;
            const open = grp.dataset.open !== "1";
            box.querySelectorAll(".mg-grp:not([data-single=\\"1\\"])").forEach((g) => { g.dataset.open = "0"; const x = g.querySelector(".mg"); if (x) x.setAttribute("aria-expanded", "false"); });
            grp.dataset.open = open ? "1" : "0";
            h.setAttribute("aria-expanded", open ? "true" : "false");
          };
          h.onclick = tgl;
          h.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tgl(); } };
        };
        [...box.querySelectorAll(".mg")].forEach((h) => {
          const items = [];
          for (let e = h.nextElementSibling; e && e.classList.contains("mi"); e = e.nextElementSibling) items.push(e);
          if (items.length) build(h, items, false);
        });
        /* Tampilan lapangan (ukuran teks, outdoor, bunyi) = grup yang sama, tertutup bawaan */
        const dh = document.getElementById("dspH");
        if (dh) {
          const items = [];
          for (let e = dh.nextElementSibling; e; e = e.nextElementSibling) items.push(e);
          build(dh, items, true);
        }
        window.menuSync = function () {
          const grps = [...box.querySelectorAll(".mg-grp")];
          let act = null;
          grps.forEach((g) => {
            if (g.dataset.stat) return;
            const vis = [...g.querySelectorAll(".mi")].filter((b) => !b.hidden && b.style.display !== "none");
            g.hidden = !vis.length;
            const single = vis.length <= 1, h = g.querySelector(".mg");
            g.dataset.single = single ? "1" : "";
            h.tabIndex = single ? -1 : 0;
            h.setAttribute("role", single ? "heading" : "button");
            if (single) { h.removeAttribute("aria-expanded"); g.dataset.open = "1"; }
            if (g.querySelector(".mi.on")) act = g;
          });
          if (act) {
            grps.forEach((g) => { if (!g.dataset.single) { const o = g === act; g.dataset.open = o ? "1" : "0"; g.querySelector(".mg").setAttribute("aria-expanded", o ? "true" : "false"); } });
          }
        };
        const bg = document.getElementById("burger");
        if (bg) bg.addEventListener("click", () => window.menuSync());
        window.menuSync();
      })();
`,Op=`/* Clearing (Voucher vs counting)
   asal: index-fixd.html baris 5164-5575 */
      /* ---- v14: Clearing (Laporan Voucher vs hasil counting) ---- */
      const K_CLR = "warehouse_so_clr_v1", K_CLRR = "warehouse_so_clr_rep_v1", K_CLRC = "warehouse_so_clr_cnt_v1";
      let clr = Object.assign({ url: WMS_CONFIG.clearingUrl, start: 2, cv: "Nama Foto", cq: "Total Count", ck: "Kode Item", auto: 5 }, ld(K_CLR, {}));
      let clrRep = ld(K_CLRR, null), clrCnt = ld(K_CLRC, null), clrF = "all", clrBusy = false, clrErr = "";
      const K_CLRD = "warehouse_so_clr_done_v1", K_CLRH = "warehouse_so_clr_hist_v1";
      let clrHist = ld(K_CLRH, []);
      if (!Array.isArray(clrHist)) clrHist = [];
      let clrDone = ld(K_CLRD, {});
      if (typeof clrDone !== "object" || !clrDone || Array.isArray(clrDone)) clrDone = {};
      const clrIsDone = (x) => !!clrDone[clrKey(x.v)];
      function clrAct(x) {
        const k = clrKey(x.v), d = clrDone[k];
        if (d)
          return \`<div class="m"><b>Ditandai selesai</b>\${d.by ? " oleh " + esc(d.by) : ""}, \${esc(new Date(d.at).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }))}\${d.note ? "<br>Catatan: " + esc(d.note) : ""}</div><button class="btn sec sm" data-cu="\${esc(k)}">Buka lagi</button>\`;
        return x.st === "ok" ? "" : \`<button class="btn sec sm" data-cd="\${esc(k)}">Tandai selesai</button>\`;
      }
      const CLR_ST = { dup: ["Dobel hitung", "red"], qty: ["Selisih qty", "red"], nq: ["Qty kosong", "amber"], belum: ["Belum dihitung", "amber"], extra: ["Tidak ada di laporan", "amber"], ok: ["Cocok", "green"] };
      // huruf O/o yang terselip di antara angka dibaca nol, I/l dibaca satu (salah ketik nama foto: 4O43734 -> 4043734)
      const clrFixDigits = (v) => { let s = String(v ?? "").normalize("NFKC"); for (let i = 0; i < 4; i++) s = s.replace(/(\\d)[Oo](?=[\\dOo])/g, "$10").replace(/(\\d)[Il](?=\\d)/g, "$11").replace(/^[Oo](?=\\d{6})/, "0"); return s; };
      const clrKey = (v) => {
        let s = clrFixDigits(v).trim(); // angka lebar-penuh dan O/I yang salah ketik dibaca sebagai angka biasa
        if (/^\\d+\\.0+$/.test(s)) s = s.replace(/\\.0+$/, ""); // "4043814.0" hasil Excel/CSV
        // nama foto "4043742_2026-11-06-100438": nomor voucher = deretan angka paling depan (>= 5 digit) sebelum tanda lain
        const lead = s.match(/^\\s*(\\d{5,})(?=\\D|$)/),
          d = lead ? lead[1] : s.replace(/\\D/g, "");
        return d ? d.replace(/^0+/, "") || "0" : s.toUpperCase();
      };
      const sms8 = (k) => {
        const s = String(k ?? "");
        if (/e\\+/i.test(s)) return "";
        const d = s.replace(/\\D/g, "");
        return d.length >= 8 ? d.slice(0, 8) : "";
      };
      function clrIdx(spec, hdr) {
        spec = String(spec || "").trim();
        if (!spec) return -1;
        if (/^[A-Za-z]{1,2}$/.test(spec)) {
          let n = 0;
          for (const ch of spec.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
          return n - 1;
        }
        const s = spec.toLowerCase();
        return hdr.findIndex((h) => String(h ?? "").toLowerCase().includes(s));
      }
      let clrShF = "all";
      function clrShiftOf(t) {
        const m = String(t || "").match(/(\\d{1,2}):(\\d{2})/);
        if (!m) return "";
        const h = Number(m[1]), a = 7, b = 15, c = 23; // Shift 1 mulai 07.00, Shift 2 15.00, Shift 3 23.00
        return "Shift " + (h >= c || h < a ? 3 : h >= b ? 2 : 1);
      }
      const clrShiftNorm = (v) => {
        v = String(v ?? "").trim();
        if (!v) return "";
        const d = v.match(/\\b([1-9])\\b/);
        return /^shift/i.test(v) || !d ? (d ? "Shift " + d[1] : v) : "Shift " + d[1];
      };
      function clrParseRep(rows) {
        const hi = rows.slice(0, 15).findIndex((r) => r.some((c) => String(c ?? "").trim().toLowerCase() === "no voucher"));
        if (hi < 0) throw new Error("Kolom \\"No Voucher\\" tidak ditemukan di laporan.");
        const hdr = rows[hi].map((h) => String(h ?? "").trim().toLowerCase());
        const f = (n) => hdr.indexOf(n);
        const iv = f("no voucher"), iq = f("qty"), ik = f("kode item"), inm = f("nama item"), ir = f("rak");
        const fx = (re) => hdr.findIndex((h) => re.test(h)), il = fx(/lori|nopol|no\\.? ?kendaraan|plat/), ish = fx(/shift/), itm = fx(/jam|waktu|tgl|tanggal|time/), ip = fx(/pic|timbang/), ig = fx(/^group|^grup/);
        if (iq < 0) throw new Error("Kolom \\"Qty\\" tidak ditemukan di laporan.");
        const out = [];
        rows.slice(hi + 1).forEach((r) => {
          const v = String(r[iv] ?? "").trim();
          if (!v) return;
          out.push({ v, q: monNum(String(r[iq] ?? "")), k: ik >= 0 ? String(r[ik] ?? "").trim() : "", n: inm >= 0 ? String(r[inm] ?? "").trim() : "", r: ir >= 0 ? String(r[ir] ?? "").trim() : "", lr: il >= 0 ? String(r[il] ?? "").trim() : "", pic: ip >= 0 ? String(r[ip] ?? "").trim() : "", grp: ig >= 0 ? String(r[ig] ?? "").trim() : "", sh: ish >= 0 ? clrShiftNorm(r[ish]) : itm >= 0 ? clrShiftOf(r[itm]) : "" });
        });
        return out;
      }
      function clrParseCnt(rows, cfg) {
        const st = Math.max(1, Number(cfg.start) || 2), hdr = st >= 2 ? (rows[st - 2] || []) : [];
        // fallback otomatis ke format sheet "REKAP COUNT" (Nama Foto / Total Count)
        let iv = clrIdx(cfg.cv, hdr), iq = clrIdx(cfg.cq, hdr);
        if (iv < 0) iv = clrIdx("Nama Foto", hdr);
        if (iv < 0) iv = clrIdx("No Voucher", hdr);
        if (iq < 0) iq = clrIdx("Total Count", hdr);
        if (iq < 0) iq = clrIdx("Qty", hdr);
        const ik = clrIdx(cfg.ck, hdr), it = clrIdx("Tanggal Foto", hdr), il = hdr.findIndex((h) => /lori|nopol|plat/i.test(String(h ?? "")));
        if (iv < 0) throw new Error("Kolom No Voucher / Nama Foto counting tidak ketemu. Cek pengaturan kolom.");
        if (iq < 0) throw new Error("Kolom Qty / Total Count counting tidak ketemu. Cek pengaturan kolom.");
        const out = [];
        rows.slice(st - 1).forEach((r) => {
          let v = String(r[iv] ?? "").trim();
          if (!v) return;
          // nama foto: buang ekstensi dan akhiran duplikat "(1)", contoh 4033996(1).jpg -> 4033996
          const sfx = /\\(\\d+\\)\\s*(\\.\\w{2,4})?$/.test(v);
          v = v.replace(/\\.(jpe?g|png|heic|webp)$/i, "").replace(/\\s*\\(\\d+\\)\\s*$/, "").trim();
          if (!v) return;
          out.push({ v, q: monNum(String(r[iq] ?? "")), k: ik >= 0 ? String(r[ik] ?? "").trim() : "", sfx, t: it >= 0 ? String(r[it] ?? "").trim() : "", lr: il >= 0 ? String(r[il] ?? "").trim() : "" });
        });
        // foto dobel (akhiran "(1)") dengan qty sama = satu hitungan; qty beda tetap ditandai Dobel hitung
        const grp = new Map();
        out.forEach((o) => { const k = clrKey(o.v); if (!grp.has(k)) grp.set(k, []); grp.get(k).push(o); });
        const res = [];
        grp.forEach((g) => {
          if (!g.some((x) => x.sfx)) return res.push(...g);
          const seen = new Set();
          g.forEach((x) => { const q = String(x.q); if (!seen.has(q)) { seen.add(q); res.push(x); } });
        });
        return res.map(({ v, q, k, t, lr }) => ({ v, q, k, t, lr }));
      }
      /* waktu foto counting -> ms (NaN bila tidak terbaca): ISO, dd/mm/yyyy hh:mm, atau serial Excel */
      function clrTs(t) {
        const x = String(t || "").trim();
        if (!x) return NaN;
        if (/^\\d+(\\.\\d+)?$/.test(x)) { const n = Number(x); return n > 20000 && n < 80000 ? Math.round((n - 25569) * 864e5) : NaN; }
        const m = x.match(/^(\\d{1,2})[\\/.-](\\d{1,2})[\\/.-](\\d{4})(?:[ T,]+(\\d{1,2}):(\\d{2})(?::(\\d{2}))?)?/);
        if (m) return new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)).getTime();
        return Date.parse(x);
      }
      /* beberapa baris counting untuk satu voucher: pakai yang TERBARU (waktu foto bila terbaca semua, kalau tidak baris paling bawah) */
      function clrLatest(rows) {
        const ts = rows.map((r) => clrTs(r.t));
        if (ts.every((v) => !isNaN(v))) {
          let bi = 0;
          ts.forEach((v, i) => { if (v >= ts[bi]) bi = i; });
          return rows[bi];
        }
        return rows[rows.length - 1];
      }
      const CLR_IKAT = 25; // isi satu ikatan
      const clrRnd = (x) => Math.round(x * 1000) / 1000; // hindari galat desimal (0,1 + 0,2 ≠ 0,3)
      function clrBuild() {
        const rep = clrRep ? clrRep.rows : [], cnt = clrCnt ? clrCnt.rows : [];
        const cm = new Map();
        cnt.forEach((c) => {
          const k = clrKey(c.v);
          if (!cm.has(k)) cm.set(k, { v: c.v, rows: [] });
          cm.get(k).rows.push(c);
        });
        /* cadangan bila nomor lengkap tidak ketemu: cocokkan 7 digit pertama dari depan.
           Tiap nomor counting hanya dipakai SATU voucher (yang awalannya paling mirip). Nomor counting yang sudah cocok persis dengan voucher lain tidak ikut. */
        const repKeys = new Set(rep.map((r) => clrKey(r.v))),
          r7 = new Map(),
          asg = new Map(); // kunci voucher laporan -> kunci counting yang ditugaskan
        repKeys.forEach((k) => {
          if (!/^\\d{7,}$/.test(k) || cm.has(k)) return;
          const p = k.slice(0, 7);
          if (!r7.has(p)) r7.set(p, []);
          r7.get(p).push(k);
        });
        const cpl = (x, y) => { let i = 0; while (i < x.length && i < y.length && x[i] === y[i]) i++; return i; };
        cm.forEach((g, ck) => {
          if (!/^\\d{7,}$/.test(ck) || repKeys.has(ck)) return;
          const cands = r7.get(ck.slice(0, 7));
          if (!cands) return;
          const best = cands.slice().sort((x, y) => cpl(y, ck) - cpl(x, ck) || x.localeCompare(y))[0];
          if (!asg.has(best)) asg.set(best, []);
          asg.get(best).push(ck);
        });
        /* lapisan 3: nomor voucher terselip di nama foto, mis. "2026-11-06_4043733" atau "WhatsApp Image ... (4043733).jpeg".
           Dipakai hanya bila nomor lengkap dan 7 digit depan tidak ketemu. Deretan angka >= 7 di nama harus berawalan sama (7 digit) dengan voucher.
           Foto yang sudah dipakai voucher lain (cocok persis / lapisan 2) tidak diambil. */
        const used = new Set([...asg.values()].flat()),
          runsOf = (g) => g.rows.flatMap((c) => clrFixDigits(c.v).match(/\\d{7,}/g) || []).map((d) => d.replace(/^0+/, "")),
          open = [...repKeys].filter((k) => /^\\d{7,}$/.test(k) && !cm.has(k) && !asg.has(k));
        cm.forEach((g, ck) => {
          if (repKeys.has(ck) || used.has(ck)) return;
          let best = "", bl = 6;
          runsOf(g).forEach((d) => open.forEach((k) => {
            if (k.slice(0, 7) !== d.slice(0, 7)) return;
            const l = cpl(k, d);
            if (l > bl || (l === bl && best && k < best)) { bl = l; best = k; }
          }));
          if (!best) return;
          if (!asg.has(best)) asg.set(best, []);
          asg.get(best).push(ck);
          used.add(ck);
        });
        const byPrefix = (rk) => {
          const ks = asg.get(rk);
          return ks && ks.length ? { v: cm.get(ks[0]).v, rows: ks.flatMap((ck) => cm.get(ck).rows) } : null;
        };
        // satu voucher bisa muncul di beberapa baris laporan (beberapa item): qty dijumlah; baris yang persis sama (dobel input) dihitung sekali
        const ra = new Map();
        rep.forEach((r) => {
          const k = clrKey(r.v);
          if (!ra.has(k)) return ra.set(k, { ...r, _sig: new Set([[r.q, r.k, r.r, r.n].join("|")]) });
          const a = ra.get(k), sg = [r.q, r.k, r.r, r.n].join("|");
          if (a._sig.has(sg)) return;
          a._sig.add(sg);
          a.q = a.q == null && r.q == null ? null : (a.q || 0) + (r.q || 0);
          if (r.n && !String(a.n).includes(r.n)) a.n = a.n ? a.n + ", " + r.n : r.n;
        });
        const seen = new Set(), list = [];
        [...ra.values()].forEach((r) => {
          const k = clrKey(r.v);
          seen.add(k);
          let g = cm.get(k), viaP = false;
          if (!g) { g = byPrefix(k); viaP = !!g; } // nomor lengkap tidak ketemu: coba 7 digit pertama dari depan
          if (!g) return list.push({ v: r.v, sms: "", kc: "", qR: r.q, qC: null, diff: null, st: "belum", n: r.n, r: r.r, rc: 0, lori: r.lr || "", shift: r.sh || "", tm: "", pic: r.pic || "", grp: r.grp || "" });
          const lt = clrLatest(g.rows);
          let qC = lt.q == null ? null : clrRnd(lt.q), ik = 0;
          const kc = lt.k || (g.rows.find((x) => sms8(x.k)) || {}).k || "";
          const nq = qC == null || r.q == null; // salah satu qty kosong / tidak terbaca: tidak bisa dibandingkan
          let diff = nq ? null : clrRnd(qC - r.q);
          // counting dalam ikatan: qty counting x CLR_IKAT = qty laporan (mis. 42 x 25 = 1050) dianggap cocok.
          // Selisih ratusan/ribuan yang jauh mengecil bila dikali ikatan juga dibaca sebagai ikatan (selisihnya dihitung setelah dikali).
          if (diff != null && diff !== 0 && qC > 0) {
            const e = clrRnd(qC * CLR_IKAT), nd = clrRnd(e - r.q);
            if (nd === 0 || (Math.abs(diff) >= 100 && Math.abs(nd) < Math.abs(diff))) { ik = qC; qC = e; diff = nd; }
          }
          const sms = sms8(kc);
          const st = nq ? "nq" : diff === 0 ? "ok" : "qty"; // cocok = voucher + qty sama persis
          const tm = lt.t || (g.rows.find((x) => x.t) || {}).t || "", lori = r.lr || lt.lr || (g.rows.find((x) => x.lr) || {}).lr || "";
          list.push({ v: r.v, cv: viaP ? lt.v : "", sms, kc, qR: r.q, qC, diff, st, ik, n: r.n, r: r.r, rc: g.rows.length, lori, shift: r.sh || clrShiftOf(tm), tm, pic: r.pic || "", grp: r.grp || "" });
        });
        // hanya voucher yang ada di Laporan Voucher yang diimpor; baris counting lain diabaikan
        const ord = { dup: 0, qty: 1, nq: 2, belum: 3, ok: 4 };
        list.sort((a, b) => ord[a.st] - ord[b.st] || String(a.v).localeCompare(String(b.v), "id", { numeric: true }));
        return list;
      }
      /* Diagnosa: versi aturan pencocokan + alasan tiap voucher "belum dihitung" (nama counting terdekat dan kuncinya), agar mudah dilihat langsung di perangkat */
      const CLR_MATCH_V = "7-digit-depan-v4";
      function clrDiag(all) {
        const el = $("clrDiag");
        if (!el) return;
        const bel = all.filter((x) => x.st === "belum" || x.st === "nq");
        if (!clrCnt || !clrRep || !bel.length) { el.innerHTML = ""; return; }
        const cnt = clrCnt.rows, dg = (v) => String(v ?? "").normalize("NFKC").replace(/\\D/g, "");
        const row = (c) => \`\${esc(c.v)} <span class="fine">→ kunci \${esc(clrKey(c.v))}</span>\`;
        /* tiga kemungkinan untuk tiap voucher yang belum cocok:
           full = ada nama counting yang memuat 7 digit depan voucher tetapi tidak terpakai (mis. diambil voucher lain),
           typo = ada yang beda <= 2 digit (salah ketik, atau huruf O/I/l tertulis sebagai angka), kosong = fotonya tidak ada di sheet */
        const ham = (x, y) => { let d = 0; for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) d++; return d; };
        const runs = (v) => (String(v ?? "").normalize("NFKC").replace(/[Oo]/g, "0").replace(/[Il]/g, "1").match(/\\d{7,}/g) || []).map((d) => d.replace(/^0+/, ""));
        const mine = new Set(clrRep.rows.map((r) => clrKey(r.v))), swap = (x, y) => { const d = []; for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) d.push(i); return d.length === 2 && d[1] === d[0] + 1 && x[d[0]] === y[d[1]] && x[d[1]] === y[d[0]]; };
        const near = (k) => {
          const full = [], typo = [];
          // typo = beda satu digit atau dua digit bertukar, dan nomornya BUKAN milik voucher lain di laporan (nomor berurutan memang selalu mirip)
          if (k.length >= 7) cnt.forEach((c) => { const rs = runs(c.v); if (rs.some((r) => r.slice(0, 7) === k.slice(0, 7))) full.push(c); else if (rs.some((r) => r.length >= 7 && !mine.has(r.slice(0, 7)) && (ham(r.slice(0, 7), k.slice(0, 7)) === 1 || swap(r.slice(0, 7), k.slice(0, 7))))) typo.push(c); });
          return { full: full.slice(0, 3), typo: typo.slice(0, 3) };
        };
        const names = cnt.map((c) => String(c.v)), longRun = names.filter((n) => /\\d{7,}/.test(n.normalize("NFKC"))).length;
        const head = \`Laporan \${fmt(clrRep.rows.length)} voucher · counting \${fmt(cnt.length)} baris (\${fmt(new Set(names).size)} nama berbeda, \${fmt(longRun)} memuat angka ≥ 7 digit)\`;
        const first = names.slice(0, 3), last = names.slice(-3);
        const items = bel.slice(0, 10).map((x) => {
          const k = clrKey(x.v), n = near(k), h = n.full.length ? n.full : n.typo;
          const why = x.st === "nq" ? "ketemu, tapi qty kosong"
            : n.full.length ? "ada nama counting yang memuat angkanya tetapi tidak terpakai (sudah dipakai voucher lain?)"
            : n.typo.length ? "tidak ada yang sama. Mirip, mungkin salah ketik"
            : "tidak ada nama counting yang memuat atau mirip " + k.slice(0, 7) + " (fotonya kemungkinan belum ada di sheet counting)";
          return { x, k, h, why };
        });
        const txt = [\`Diagnosa Clearing · aturan \${CLR_MATCH_V}\`, head, "Nama counting pertama: " + first.join(" | "), "Nama counting terakhir: " + last.join(" | "), ...items.map((i) => \`\${i.x.v} (kunci \${i.k}, qty laporan \${i.x.qR ?? "-"}) \${i.why}\${i.h.length ? ": " + i.h.map((c) => \`\${c.v} [qty \${c.q}]\`).join(" | ") : ""}\`), bel.length > 10 ? \`… dan \${bel.length - 10} lainnya\` : ""].filter(Boolean).join("\\n");
        el.innerHTML = \`<details class="clr-diag" open><summary>Diagnosa pencocokan · aturan \${CLR_MATCH_V} · \${fmt(bel.length)} belum cocok</summary><p class="fine">\${esc(head)}.</p><p class="fine">Nama counting pertama: \${first.map(esc).join(" · ") || "-"}<br>Nama counting terakhir: \${last.map(esc).join(" · ") || "-"}</p>\` +
          items.map((i) => \`<div class="fine"><b>\${esc(i.x.v)}</b> (kunci \${esc(i.k)}) \${i.why}\${i.h.length ? ": " + i.h.map(row).join(" · ") : ""}</div>\`).join("") +
          (bel.length > 10 ? \`<p class="fine">… dan \${fmt(bel.length - 10)} lainnya.</p>\` : "") +
          \`<button class="btn sec" id="clrDiagCopy" type="button">Salin diagnosa</button></details>\`;
        $("clrDiagCopy").onclick = () => (navigator.clipboard ? navigator.clipboard.writeText(txt).then(() => toast("Diagnosa tersalin. Tempel ke chat."), () => toast("Gagal menyalin diagnosa")) : toast("Browser tidak mengizinkan salin"));
      }
      function renderClr() {
        setTimeout(() => typeof renderClrHist === "function" && $("clrHist") && renderClrHist(), 0);
        clearTimeout(clrAT);
        clrAT = setTimeout(clrAuto, 1500);
        $("clrCfg").hidden = !isAdmin();
        $("clrUrl").value = clr.url;
        $("clrStart").value = clr.start;
        $("clrCV").value = clr.cv;
        $("clrCQ").value = clr.cq;
        $("clrCK").value = clr.ck;
        $("clrAutoSel").value = String(clr.auto == null ? 5 : clr.auto);
        $("clrRepInfo").textContent = clrRep ? \`\${clrRep.name || "Laporan"}: \${fmt(clrRep.rows.length)} voucher, dimuat \${new Date(clrRep.at).toLocaleString("id-ID")}.\` : "Belum ada laporan. Pilih file Laporan Voucher.";
        $("clrCntInfo").textContent = clrErr ? clrErr : clrCnt ? \`Counting dari \${clrCnt.src === "url" ? "spreadsheet" : "file"}: \${fmt(clrCnt.rows.length)} baris, dimuat \${new Date(clrCnt.at).toLocaleString("id-ID")}.\` : clr.url ? "Counting belum dimuat." : "Link spreadsheet counting belum diatur (Pengaturan di bawah), atau muat dari file.";
        $("clrCntInfo").style.color = clrErr ? "var(--red)" : "";
        if (typeof monClrRender === "function") monClrRender();
        $("clrLoad").disabled = clrBusy;
        $("clrRefresh").disabled = clrBusy;
        $("clrRefresh").textContent = clrBusy ? "Memuat…" : "↻ Refresh";
        $("clrLoad").textContent = clrBusy ? "Memuat…" : "Muat counting dari spreadsheet";
        const all = clrBuild(), n = (s) => all.filter((x) => x.st === s).length;
        const nTot = all.length, nOk = n("ok"), nBad = n("qty") + n("dup"), nBel = n("belum") + n("nq");
        clrDiag(all);
        const kc = (cls, ico, v, lb) => \`<div class="kc \${cls}"><div class="kh"><span class="ki">\${ico}</span><b>\${fmt(v)}</b></div><div class="kl">\${lb}</div><span class="dchip eq">\${nTot ? Math.round((v / nTot) * 100) : 0}%</span></div>\`;
        $("clrStats").innerHTML = kc("ok", monIco.ok, nOk, "Cocok") + kc("bad", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M7 7l10 10M17 7L7 17"/></svg>', nBad, "Selisih / dobel") + kc("wip", monIco.wip, nBel, "Belum dihitung");
        { // pil sinkron: waktu counting terakhir dimuat
          const el = $("clrAt");
          if (!clrCnt) { el.className = "sync"; el.textContent = ""; }
          else {
            const stale = clr.auto && clrCnt.src !== "file" && (Date.now() - clrCnt.at) / 60000 > clr.auto * 2 + 1;
            el.className = "sync " + (stale ? "old" : clrCnt.src === "file" ? "file" : "ok");
            el.textContent = (clrCnt.src === "file" ? "Dari file" : stale ? "Data lama" : "Tersinkron") + " · " + new Date(clrCnt.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
          }
        }
        $("clrChips").innerHTML = chipsHtml(clrF, [["all", "Semua", all.length], ["bad", "Perlu dicek", all.filter((x) => x.st !== "ok" && !clrIsDone(x)).length], ["done", "Ditandai selesai", all.filter(clrIsDone).length], ["ok", "Cocok", n("ok")], ["belum", "Belum dihitung", n("belum")]]);
        { // ringkasan: donat status + progres per shift
          const segs = [["Cocok", nOk, "#1f7a4d"], ["Selisih / dobel", nBad, "#b3261e"], ["Belum dihitung", nBel, "#b26a00"]], C = 2 * Math.PI * 40;
          let off = 0;
          const arcs = segs.map(([, v, c]) => {
            if (!v || !nTot) return "";
            const len = (v / nTot) * C, r = \`<circle cx="50" cy="50" r="40" fill="none" stroke="\${c}" stroke-width="14" stroke-dasharray="\${len} \${C - len}" stroke-dashoffset="\${-off}" transform="rotate(-90 50 50)"/>\`;
            off += len;
            return r;
          }).join("");
          const pct = nTot ? Math.round((nOk / nTot) * 100) : 0, shl = [...new Set(all.map((x) => x.shift).filter(Boolean))].sort();
          $("clrRekap").innerHTML = nTot
            ? \`<section class="dcard"><div class="dtop"><h3>Status Clearing</h3><span class="fine">\${fmt(nTot)} voucher</span></div><div class="dnut"><svg viewBox="0 0 100 100" role="img" aria-label="\${pct}% cocok">\${arcs || '<circle cx="50" cy="50" r="40" fill="none" stroke="#e6edf3" stroke-width="14"/>'}<text x="50" y="52" text-anchor="middle" class="dv">\${pct}%</text><text x="50" y="64" text-anchor="middle" class="ds">Cocok</text></svg><div class="dnl">\${segs.map(([lb, v, c]) => \`<div><i style="background:\${c}"></i><span>\${lb}</span><b>\${fmt(v)}</b><span class="p">\${Math.round((v / nTot) * 100)}%</span></div>\`).join("")}</div></div>\${shl.length ? '<div class="shl">' + shl.map((h) => { const t = all.filter((x) => x.shift === h), k = t.filter((x) => x.st === "ok").length, pp = Math.round((k / t.length) * 100); return \`<div class="shr"><span>\${esc(h)}</span><div class="pbar"><i style="width:\${pp}%"></i></div><b>\${k}/\${t.length}</b></div>\`; }).join("") + "</div>" : ""}</section>\`
            : "";
        }
        const shs = [...new Set(all.map((x) => x.shift).filter(Boolean))].sort();
        $("clrShChips").innerHTML = shs.length ? chipsHtml(clrShF, [["all", "Semua shift", all.length], ...shs.map((h) => [h, h, all.filter((x) => x.shift === h).length])]).replace(/data-k=/g, "data-sh=") : "";
        const q = $("clrQ").value.toLowerCase().trim();
        const vis = all.filter((x) => (clrShF === "all" || x.shift === clrShF) && (clrF === "all" || (clrF === "bad" ? x.st !== "ok" && !clrIsDone(x) : clrF === "done" ? clrIsDone(x) : x.st === clrF)) && (!q || (x.v + " " + x.n + " " + x.r + " " + x.lori + " " + x.shift).toLowerCase().includes(q)));
        $("clrList").innerHTML = (vis.length ? vis.slice(0, 300).map((x) => {
          const [lb, cl] = CLR_ST[x.st];
          const d = x.diff == null ? "" : x.diff === 0 ? "0" : (x.diff > 0 ? "+" : "") + fmt(x.diff);
          return \`<div class="card vc s-\${x.st}"><div class="r"><b class="id">\${esc(x.v)}</b><span class="pill \${cl}">\${lb}</span>\${clrIsDone(x) ? ' <span class="pill green">Selesai</span>' : ""}</div>\${x.n ? \`<div class="nm">\${esc(x.n)}\${x.r ? ", rak " + esc(x.r) : ""}</div>\` : ""}<dl class="kv k3"><div><dt>Shift</dt><dd>\${esc(x.shift || "-")}\${x.tm ? "<small>" + esc((String(x.tm).match(/\\d{1,2}:\\d{2}/) || [""])[0]) + "</small>" : ""}</dd></div><div><dt>No Lori</dt><dd class="id">\${esc(x.lori || "-")}</dd></div><div><dt>Selisih</dt><dd class="\${x.diff ? "neg" : ""}">\${d || "-"}</dd></div><div><dt>Qty WMS</dt><dd>\${x.qR == null ? "-" : fmt(x.qR)}</dd></div><div><dt>Qty count</dt><dd>\${x.qC == null ? "-" : fmt(x.qC)}\${x.ik ? \` <small>(\${fmt(x.ik)}×\${CLR_IKAT})</small>\` : ""}</dd></div></dl>\${x.st !== "ok" && x.ik ? \`<div class="m">Counting \${fmt(x.ik)} ikat × \${CLR_IKAT} = \${fmt(x.qC)}.</div>\` : ""}\${x.cv ? \`<div class="m">Dicocokkan lewat awalan angka dengan nama foto \${esc(x.cv)}.</div>\` : ""}\${x.st !== "ok" && x.rc > 1 ? \`<div class="m">\${x.rc} foto counting untuk voucher ini, dipakai yang terbaru.</div>\` : ""}\${clrAct(x)}</div>\`;
        }).join("") + (vis.length > 300 ? \`<p class="fine">Menampilkan 300 dari \${fmt(vis.length)}. Pakai pencarian atau filter.</p>\` : "") : \`<div class="empty">\${all.length ? "Tidak ada voucher di filter ini." : "Muat Laporan Voucher dan counting dulu."}</div>\`);
      }
      async function clrFetch(manual) {
        if (clrBusy) return;
        const cands = monUrls(clr.url);
        if (!cands.length) return manual ? (toast("Isi link spreadsheet counting dulu."), renderClr()) : undefined;
        clrBusy = true;
        renderClr();
        let rows = null, last = "";
        for (const u of cands) {
          try {
            const r = await fetch(u + (u.includes("?") ? "&" : "?") + "_=" + Date.now(), { cache: "no-store" }); // _= : lewati cache Google/CDN
            if (!r.ok) throw new Error("HTTP " + r.status);
            const t = await r.text();
            if (/^\\s*<(!doctype|html)/i.test(t)) throw new Error("minta login");
            rows = monCSV(t.replace(/^\uFEFF/, ""));
            break;
          } catch (e) {
            last = e.message;
          }
        }
        clrBusy = false;
        try {
          if (!rows) throw new Error("Gagal mengambil spreadsheet (" + last + "). Pastikan dibagikan ke \\"Siapa saja yang memiliki link\\".");
          clrCnt = { at: Date.now(), src: "url", rows: clrParseCnt(rows, clr) };
          clrErr = "";
          sv(K_CLRC, clrCnt);
          if (manual) toast("Counting dimuat: " + fmt(clrCnt.rows.length) + " baris");
        } catch (e) {
          clrErr = e.message;
          if (manual) toast("Gagal memuat counting");
        }
        renderClr();
      }
      function clrReadFile(file, cb) {
        const rd = new FileReader();
        rd.onload = () => {
          try {
            let rows;
            if (/\\.csv$/i.test(file.name)) rows = monCSV(String(rd.result).replace(/^\uFEFF/, ""));
            else {
              const wb = XLSX.read(rd.result, { type: "array" });
              rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", raw: true });
            }
            cb(rows);
          } catch (e) {
            toast(e.message || "File tidak bisa dibaca");
          }
        };
        if (/\\.csv$/i.test(file.name)) rd.readAsText(file);
        else rd.readAsArrayBuffer(file);
      }
      $("clrRepFile").onchange = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        clrReadFile(f, (rows) => {
          try {
            clrRep = { at: Date.now(), name: f.name, rows: clrParseRep(rows).slice(0, 20000) };
            if (!sv(K_CLRR, clrRep)) toast("Penyimpanan penuh, laporan tidak tersimpan permanen.");
            toast("Laporan dimuat: " + fmt(clrRep.rows.length) + " voucher");
            renderClr();
          } catch (er) {
            toast(er.message);
          }
        });
        e.target.value = "";
      };
      $("clrCntFile").onchange = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        clrReadFile(f, (rows) => {
          try {
            clrCnt = { at: Date.now(), src: "file", rows: clrParseCnt(rows, clr) };
            clrErr = "";
            sv(K_CLRC, clrCnt);
            toast("Counting dimuat: " + fmt(clrCnt.rows.length) + " baris");
          } catch (er) {
            clrErr = er.message;
            toast("Gagal memuat counting");
          }
          renderClr();
        });
        e.target.value = "";
      };
      $("clrSave").onclick = () => {
        clr = { url: $("clrUrl").value.trim(), start: Math.max(1, Number($("clrStart").value) || 2), cv: $("clrCV").value.trim(), cq: $("clrCQ").value.trim(), ck: $("clrCK").value.trim(), auto: Number($("clrAutoSel").value) || 0 };
        sv(K_CLR, clr);
        linkSnap(); // tautan baru dibagikan ke HP lain lewat sinkron
        toast("Pengaturan clearing tersimpan");
        clrFetch(true);
      };
      $("clrLoad").onclick = () => clrFetch(true);
      /* Refresh: buang hasil counting lama dari memori, reset filter, lalu ambil ulang dari spreadsheet (tanpa cache) */
      $("clrRefresh").onclick = async () => {
        if (clrBusy) return;
        clrF = "all"; clrShF = "all"; $("clrQ").value = ""; clrErr = "";
        $("clrCntFile").value = ""; $("clrRepFile").value = "";
        if (clr.url) {
          clrCnt = null; sv(K_CLRC, null);
          await clrFetch(true);
        } else {
          renderClr();
          toast("Tidak ada link spreadsheet. Pilih ulang file counting untuk memperbarui.");
        }
      };
      { let _t = 0; $("clrQ").oninput = () => { clearTimeout(_t); _t = setTimeout(renderClr, 200); }; }
      $("clrShChips").onclick = (e) => {
        const sb = e.target.closest("[data-sh]");
        if (!sb) return;
        clrShF = sb.dataset.sh;
        renderClr();
      };
      $("clrChips").onclick = (e) => {
        const b = e.target.closest("[data-k]");
        if (!b) return;
        clrF = b.dataset.k;
        renderClr();
      };
      $("clrCsv").onclick = () => {
        const all = clrBuild();
        if (!all.length) return toast("Belum ada data untuk diunduh.");
        const rows = clrShF === "all" ? all : all.filter((x) => x.shift === clrShF), R = clrRekap(rows);
        csvOut([
          ["REKAP PENERIMAAN F-WLA-17"],
          ["Tanggal", clrTglS(), "Shift", clrShF === "all" ? "Semua" : clrShF.replace("Shift ", "")],
          ["Qty WMS", R.wms, "Qty Counthings", R.cnt, "Selisih", R.sel],
          [],
          ["No", "No Voucher", "PIC Timbang", "Group", "Shift", "No Lori", "Nama Item", "Qty WMS", "Qty Counthings", "Selisih", "Keterangan", "SMS", "Ditandai Selesai", "Catatan Selesai"],
          ...R.sorted.map((x, i) => [i + 1, x.v, x.pic || "", x.grp || "", (x.shift || "").replace("Shift ", ""), x.lori || "", x.n || "", x.qR ?? "", x.qC ?? "", x.diff ?? "", clrKet(x), x.sms || "", clrIsDone(x) ? "Ya" : "", (clrDone[clrKey(x.v)] || {}).note || ""]),
        ], "rekap_penerimaan_" + new Date().toISOString().slice(0, 10) + ".csv");
      };
      const clrKet = (x) => x.st === "belum" ? "TDK ADA FOTO" : x.st === "extra" ? "TIDAK ADA DI LAPORAN" : x.st === "dup" ? "FOTO DOBEL, QTY BEDA" : x.st === "nq" ? "QTY KOSONG" : x.st === "qty" ? (x.diff > 0 ? "QTY COUNTHINGS LEBIH" : "QTY COUNTHINGS KURANG") : "";
      const clrVNum = (v) => Number(String(v).replace(/\\D/g, "")) || 0;
      const clrTglS = () => new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short", year: "2-digit" });
      function clrRekap(rows) {
        const rep = rows.filter((x) => x.qR != null), wms = rep.reduce((a, x) => a + (x.qR || 0), 0), cnt = rep.reduce((a, x) => a + (x.qC || 0), 0);
        const sorted = rows.slice().sort((a, b) => clrVNum(b.v) - clrVNum(a.v) || String(b.v).localeCompare(String(a.v)));
        const ket = sorted.filter((x) => x.st !== "ok" && !clrIsDone(x));
        return { wms, cnt, sel: cnt - wms, sorted, ket, n: rows.length, ok: rows.filter((x) => x.st === "ok").length, done: rows.filter((x) => x.st !== "ok" && clrIsDone(x)).length };
      }
      const sg = (n) => (n > 0 ? "+" : "") + fmt(n);
      function clrRekapUi(all) {
        const el = $("clrRekap");
        if (!all.length) { el.innerHTML = ""; return; }
        const rows = clrShF === "all" ? all : all.filter((x) => x.shift === clrShF), R = clrRekap(rows);
        const shL = clrShF === "all" ? [...new Set(rows.map((x) => x.shift).filter(Boolean))].map((h) => h.replace("Shift ", "")).sort().join(", ") || "-" : clrShF.replace("Shift ", "");
        const st = R.sel === 0 && !R.ket.length ? ["OK", "green"] : ["SELISIH", "red"];
        const tbl = R.sorted.slice(0, 200).map((x, i) => \`<tr><td>\${i + 1}</td><td class="id">\${esc(x.v)}</td><td class="tx">\${esc(x.pic || "-")}</td><td class="tx">\${esc(x.grp || "-")}</td><td>\${esc((x.shift || "-").replace("Shift ", ""))}</td><td class="tx">\${esc(x.lori || "-")}</td><td class="tx">\${szHtml(x.n || "")}</td><td>\${x.qR == null ? "-" : fmt(x.qR)}</td><td>\${x.qC == null ? "-" : fmt(x.qC)}</td><td class="\${x.diff ? "neg" : ""}">\${x.diff == null ? "-" : x.diff === 0 ? "0" : sg(x.diff)}</td></tr>\`).join("");
        const ketT = R.ket.slice(0, 200).map((x, i) => \`<tr><td>\${i + 1}</td><td class="id">\${esc(x.v)}</td><td class="tx">\${esc(x.lori || "-")}</td><td class="tx"><span class="pill \${x.st === "belum" || x.st === "extra" || x.st === "nq" ? "amber" : "red"}">\${esc(clrKet(x))}</span></td><td class="\${x.diff ? "neg" : ""}">\${x.diff ? sg(x.diff) : "-"}</td></tr>\`).join("");
        el.innerHTML = \`<div class="panel"><h3>Rekap Penerimaan F-WLA-17</h3><dl class="kv k3"><div><dt>Tanggal</dt><dd>\${esc(clrTglS())}</dd></div><div><dt>Shift</dt><dd>\${esc(shL)}</dd></div><div><dt>Status</dt><dd><span class="pill \${st[1]}">\${st[0]}</span></dd></div></dl><dl class="kv k3 mt"><div><dt>Qty WMS</dt><dd>\${fmt(R.wms)}</dd></div><div><dt>Qty Counthings</dt><dd>\${fmt(R.cnt)}</dd></div><div><dt>Selisih</dt><dd class="\${R.sel ? "neg" : ""}">\${R.sel ? sg(R.sel) : "OK"}</dd></div></dl><p class="fine">\${fmt(R.n)} voucher · cocok \${fmt(R.ok)} · perlu dicek \${fmt(R.ket.length)}\${R.done ? " · selesai ditandai " + fmt(R.done) : ""}</p>\` +
          (R.ket.length ? \`<h3 class="sec">Keterangan selisih (\${fmt(R.ket.length)})</h3><div class="mtw"><table class="mtb"><thead><tr><th>No</th><th>No Voucher</th><th>No Lori</th><th>Keterangan</th><th>Qty Selisih</th></tr></thead><tbody>\${ketT}</tbody></table></div>\${R.ket.length > 200 ? \`<p class="fine">Menampilkan 200 dari \${fmt(R.ket.length)}. Unduh CSV untuk semua.</p>\` : ""}\` : '<div class="note ok">Tidak ada selisih. Semua voucher cocok.</div>') +
          \`<details class="mt"><summary>Tabel rekap lengkap (\${fmt(R.n)} voucher)</summary><div class="mtw"><table class="mtb"><thead><tr><th>No</th><th>No Voucher</th><th>PIC Timbang</th><th>Group</th><th>Shift</th><th>No Lori</th><th>Nama Item</th><th>Qty WMS</th><th>Qty Counthings</th><th>Selisih</th></tr></thead><tbody>\${tbl}</tbody></table></div>\${R.n > 200 ? \`<p class="fine">Menampilkan 200 dari \${fmt(R.n)}. Unduh CSV untuk semua.</p>\` : ""}</details></div>\`;
      }
      function clrShiftTxt(all) {
        const sh = [...new Set(all.map((x) => x.shift).filter(Boolean))].sort();
        if (!sh.length) return "";
        const r = sh.map((h) => {
          const g = all.filter((x) => x.shift === h), ok = g.filter((x) => x.st === "ok").length;
          return h.padEnd(8) + String(g.length).padStart(6) + String(ok).padStart(7) + String(g.length - ok).padStart(6);
        });
        return "\\n*Per shift*\\n\`\`\`\\nSHIFT    TOTAL  COCOK  CEK\\n" + r.join("\\n") + "\\n\`\`\`\\n";
      }
      keepDom("clrStats", "clrRekap");
      let clrAT = 0, clrTimer = 0;
      function clrEnter() {
        clearInterval(clrTimer);
        clrTimer = 0;
        if (clr.auto && clr.url)
          clrTimer = setInterval(() => {
            if (!document.hidden && clrCnt && clrCnt.src !== "file") clrFetch(false);
          }, clr.auto * 60000);
      }
      function clrLeave() {
        clearInterval(clrTimer);
        clrTimer = 0;
      }
      function clrAuto() {
        if (!clrRep || !clrCnt) return;
        const all = clrBuild();
        if (!all.length) return;
        const sig = clrSig(all);
        if (clrHist.some((h) => h.sig === sig)) return;
        const tgl = new Date().toISOString().slice(0, 10), i = clrHist.findIndex((x) => x.tgl === tgl);
        const ent = { tgl, at: new Date().toISOString(), by: curName(), sig, n: all.length, ok: all.filter((x) => x.st === "ok").length, bad: all.filter((x) => x.st !== "ok" && !clrIsDone(x)).length, text: clrText(), rows: clrRows(all) };
        if (i >= 0) clrHist[i] = ent; else clrHist.push(ent);
        clrHist.sort((a, b) => b.tgl.localeCompare(a.tgl));
        clrHist = clrHist.slice(0, 60);
        sv(K_CLRH, clrHist);
        renderClrHist();
      }
      function clrText() {
        const all = clrBuild();
        if (!all.length) return "";
        const R = clrRekap(all), F = "\`\`\`", shs = [...new Set(all.map((x) => x.shift).filter(Boolean))].sort();
        const shL = shs.map((h) => h.replace("Shift ", "")).join(", ") || "-";
        const w = (l, v) => l.padEnd(16) + String(v).padStart(10);
        const perShift = shs.length ? \`\\n*Per shift*\\n\${F}\\nSHIFT  VCR   WMS    CNT   SEL\\n\${shs.map((h) => { const r = clrRekap(all.filter((x) => x.shift === h)); return h.replace("Shift ", "").padEnd(6) + String(r.n).padStart(4) + String(r.wms).padStart(7) + String(r.cnt).padStart(7) + String(r.sel).padStart(6); }).join("\\n")}\\n\${F}\\n\` : "";
        const ketRows = R.ket.slice(0, 80).map((x, i) => String(i + 1).padStart(2) + " " + String(x.v).padEnd(8) + " " + (x.diff ? sg(x.diff) : "-").padStart(7) + "  " + clrKet(x));
        const ket = R.ket.length ? \`\\n*Keterangan selisih (\${R.ket.length})*\\n\${F}\\nNO VOUCHER    SEL  KETERANGAN\\n\${ketRows.join("\\n")}\${R.ket.length > 80 ? "\\n… +" + (R.ket.length - 80) + " lagi" : ""}\\n\${F}\\n\` + R.ket.slice(0, 80).map((x) => \`• \${md(x.v)}\${x.lori ? " · " + md(x.lori) : ""}\${x.shift ? " · S" + x.shift.replace("Shift ", "") : ""}\${x.n ? " · " + md(x.n) : ""}\`).join("\\n") + "\\n" : "\\nTidak ada selisih ✅\\n";
        return \`*REKAP PENERIMAAN F-WLA-17*\\nTanggal : \${clrTglS()}\\nShift   : \${shL}\\n━━━━━━━━━━━━━━━━━━━━\\n\${F}\\n\${w("Qty WMS", fmt(R.wms))}\\n\${w("Qty Counthings", fmt(R.cnt))}\\n\${w("Selisih", R.sel ? sg(R.sel) : "OK")}\\n\${F}\\nVoucher \${R.n} | Cocok \${R.ok} | Perlu dicek \${R.ket.length}\${R.done ? " | Selesai " + R.done : ""}\\n\` + perShift + ket + (curName() ? \`\\nDilaporkan oleh: \${md(curName())}\` : "");
      }
      $("clrTg").onclick = () => {
        const t = clrText();
        if (!t) return toast("Belum ada data clearing.");
        tgSend(t);
        toast("Masuk antrean Telegram");
      };
      /* ---- simpan hasil clearing (riwayat per tanggal) ---- */
      const clrRows = (all) => all.map((x) => [x.v, x.shift, x.lori, x.tm, x.sms, x.qR, x.qC, x.diff, CLR_ST[x.st][0], x.n, x.r, clrIsDone(x) ? 1 : 0, x.pic || "", x.grp || ""]);
      const clrSig = (all) => all.map((x) => [x.v, x.st, x.qC, x.qR, x.shift, x.lori, clrIsDone(x) ? 1 : 0].join("|")).join(";");
      const clrTglF = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      function renderClrHist() {
        const el = $("clrHist");
        if (!el) return;
        const all = clrBuild(), last = clrHist[0] || null, cur = clrSig(all);
        const same = clrHist.find((h) => h.sig === cur);
        $("clrSaveHist").disabled = !all.length;
        $("clrSaveInfo").textContent = !all.length ? "Belum ada data untuk disimpan." : same ? "✅ Hasil ini sudah tersimpan (" + clrTglF(same.tgl) + ")." : last ? "⚠️ Ada perubahan yang belum disimpan. Terakhir disimpan: " + new Date(last.at).toLocaleString("id-ID") + "." : "⚠️ Belum pernah disimpan.";
        el.innerHTML = clrHist.length
          ? histRows(clrHist, "clr", (h, i) =>
              histRow(
                esc(clrTglF(h.tgl)),
                \`\${fmt(h.n)} voucher · cocok \${fmt(h.ok)} · cek \${fmt(h.bad)}\`,
                \`<div class="m">Disimpan \${esc(new Date(h.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }))}\${h.by ? " oleh " + esc(h.by) : ""}</div><div class="acts"><button class="btn sec sm inl" data-ch="\${i}" type="button">Kirim ke Telegram</button><button class="btn dng sm inl" data-cd="\${i}" type="button">Hapus</button></div>\`,
              ),
            )
          : '<div class="empty">Belum ada hasil clearing yang disimpan.</div>';
      }
      $("clrSaveHist").onclick = async () => {
        const all = clrBuild();
        if (!all.length) return toast("Belum ada data untuk disimpan.");
        const tgl = new Date().toISOString().slice(0, 10), i = clrHist.findIndex((x) => x.tgl === tgl);
        if (i >= 0 && clrHist[i].sig !== clrSig(all) && !(await ask("Ganti hasil clearing hari ini?", "Sudah ada hasil tersimpan untuk " + clrTglF(tgl) + ". Yang lama diganti dengan yang sekarang.", "Ganti"))) return;
        const ent = { tgl, at: new Date().toISOString(), by: curName(), sig: clrSig(all), n: all.length, ok: all.filter((x) => x.st === "ok").length, bad: all.filter((x) => x.st !== "ok" && !clrIsDone(x)).length, text: clrText(), rows: clrRows(all) };
        if (i >= 0) clrHist[i] = ent; else clrHist.push(ent);
        clrHist.sort((a, b) => b.tgl.localeCompare(a.tgl));
        clrHist = clrHist.slice(0, 60);
        if (!sv(K_CLRH, clrHist)) return toast("Gagal menyimpan: penyimpanan penuh.");
        buzz(40);
        renderClrHist();
        await sendAll(ent.text, ent.text, true);
      };
      $("clrHist").onclick = async (e) => {
        if (histMore(e, "clr", renderClrHist)) return;
        const c = e.target.closest("[data-ch]"), d = e.target.closest("[data-cd]");
        if (c) {
          const h = clrHist[Number(c.dataset.ch)];
          if (!h) return;
          if (!tgReady()) { toast("Atur token bot dan Chat ID dulu."); return go("tg"); }
          tgSend(h.text);
          toast("Masuk antrean Telegram");
        } else if (d) {
          const h = clrHist[Number(d.dataset.cd)];
          if (!h || !(await ask("Hapus hasil clearing " + h.tgl + "?", "Hasil tersimpan ini dihapus dari riwayat.", "Hapus", true))) return;
          clrHist.splice(Number(d.dataset.cd), 1);
          sv(K_CLRH, clrHist);
          renderClrHist();
        }
      };
      $("clrCopy").onclick = async () => {
        const all = clrBuild().filter((x) => x.qC != null);
        if (!all.length) return toast("Belum ada hasil counting.");
        const t = all.map((x) => [x.v, x.qC].join("\\t")).join("\\n");
        try {
          await navigator.clipboard.writeText(t);
          toast("Disalin: " + all.length + " voucher (No Voucher, Qty)");
        } catch (e) {
          const a = document.createElement("textarea");
          a.value = t;
          document.body.appendChild(a);
          a.select();
          document.execCommand("copy");
          a.remove();
          toast("Disalin: " + all.length + " voucher");
        }
      };

`,Ip=`/* Aksesibilitas + navigasi bin + input
   asal: index-fixd.html baris 5576-5746 */
      /* ---- v12: aksesibilitas tambahan ---- */
      (function () {
        // Badge angka -> nama tombol yang bisa dibaca pembaca layar
        const syncBadge = (bd) => {
          const host = bd.closest("button, .mi");
          if (!host) return;
          if (!host.dataset.baseLabel) host.dataset.baseLabel = host.textContent.replace(bd.textContent, "").trim();
          const cnt = bd.textContent.trim();
          if (bd.hidden || !cnt) host.removeAttribute("aria-label");
          else host.setAttribute("aria-label", host.dataset.baseLabel + ", " + cnt + " perlu perhatian");
        };
        document.querySelectorAll("#tabs .bd, .mi .bd").forEach((bd) => {
          syncBadge(bd);
          new MutationObserver(() => syncBadge(bd)).observe(bd, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
        });
        // Dialog modal: fokus masuk, terjebak di dalam, kembali ke pemicu, latar inert
        const MODALS = ["sheet", "dcSheet", "dcPickSheet", "dlg", "navSet", "padSheet", "login"];
        const FOCUSABLE = 'button:not([disabled]):not([hidden]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const opener = {};
        const topOpen = () => MODALS.map((id) => $(id)).filter((e) => e && !e.hidden).pop();
        const visible = (el) => {
          if (el.closest("[hidden]")) return false;
          const cs = getComputedStyle(el);
          return cs.display !== "none" && cs.visibility !== "hidden";
        };
        const refresh = () => {
          const top = topOpen();
          const app = document.querySelector(".app");
          if (app) top ? app.setAttribute("inert", "") : app.removeAttribute("inert");
          MODALS.forEach((id) => {
            const e = $(id);
            if (!e) return;
            if (e !== top && !e.hidden) e.setAttribute("inert", ""); else e.removeAttribute("inert");
          });
        };
        MODALS.forEach((id) => {
          const el = $(id);
          if (!el) return;
          new MutationObserver(() => {
            if (!el.hidden) {
              opener[id] = document.activeElement;
              refresh();
              requestAnimationFrame(() => {
                if (el.contains(document.activeElement)) return;
                const f = [...el.querySelectorAll(FOCUSABLE)].filter(visible)[0];
                if (f) f.focus({ preventScroll: true });
              });
            } else {
              refresh();
              const o = opener[id];
              opener[id] = null;
              if (o && document.contains(o) && !topOpen()) o.focus({ preventScroll: true });
            }
          }).observe(el, { attributes: true, attributeFilter: ["hidden"] });
        });
        document.addEventListener("keydown", (e) => {
          if (e.key !== "Tab") return;
          const top = topOpen();
          if (!top) return;
          const f = [...top.querySelectorAll(FOCUSABLE)].filter(visible);
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (!top.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
          else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
      })();

      // Escape menutup dialog konfirmasi lebih dulu, lalu menu samping
      document.addEventListener(
        "keydown",
        (e) => {
          if (e.key !== "Escape") return;
          if (!$("dlg").hidden) {
            e.stopImmediatePropagation();
            e.preventDefault();
            $("dNo") && $("dNo").click();
          } else if ($("side").classList.contains("on")) {
            e.stopImmediatePropagation();
            side(false);
          }
        },
        true,
      );
      // Cegah angka berubah karena scroll mouse/trackpad
      document.addEventListener("wheel", () => {
        const a = document.activeElement;
        if (a && a.type === "number") a.blur();
      }, { passive: true });
      // Semua kolom angka terpilih saat difokus, jadi langsung bisa diketik ulang
      document.addEventListener("focusin", (e) => {
        if (e.target.matches && e.target.matches('input[type="number"]')) setTimeout(() => e.target.select(), 0);
      });

      /* ---- v5: navigasi bin, input, cadangan ---- */
      async function navTo(dir) {
        const b = navTarget(dir);
        if (!b) return toast(dir < 0 ? "Ini bin pertama di daftar" : "Ini bin terakhir di daftar");
        if (shDirty && !(await ask("Pindah tanpa menyimpan?", "Isian di bin ini belum disimpan dan akan hilang.", "Pindah", true))) return;
        if (shDirty && sel) draftDrop(sel.bin);
        open(b, true);
      }
      $("shPrev").onclick = () => navTo(-1);
      $("shNext").onclick = () => navTo(1);
      $("shUndo").onclick = undo;
      $("undoBtn").onclick = undo;
      $("errBk").onclick = () => doBackup();
      document.addEventListener("keydown", (e) => {
        if ($("sheet").hidden || !$("dlg").hidden || !e.altKey) return;
        if (e.key === "ArrowLeft") { e.preventDefault(); navTo(-1); }
        if (e.key === "ArrowRight") { e.preventDefault(); navTo(1); }
      });

      // Enter di qty / catatan = Simpan & lanjut
      [$("qty"), $("note")].forEach((el) =>
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            save();
          }
        }),
      );

      // Kolom angka: hanya bilangan bulat, dengan batas wajar
      const MAXQ = 9999999;
      document.addEventListener("keydown", (e) => {
        const t = e.target;
        if (t.matches && t.matches('input[type="number"]') && ["e", "E", "+", "-", ".", ","].includes(e.key)) e.preventDefault();
      });
      document.addEventListener(
        "input",
        (e) => {
          const t = e.target;
          if (!t.matches || !t.matches('input[type="number"]') || t.value === "") return;
          const n = Math.min(MAXQ, Math.trunc(Math.abs(Number(t.value))));
          if (String(n) !== t.value) t.value = Number.isFinite(n) ? n : "";
        },
        true,
      );

      // Tombol − / + : tahan untuk mengulang, makin lama makin cepat
      function holdStep(btn, d) {
        let t, iv, n;
        const step = () => {
          n++;
          const k = n > 25 ? 10 : 1;
          $("qty").value = Math.min(MAXQ, Math.max(0, (Number($("qty").value) || 0) + d * k));
          shDirty = true;
          draftSoon();
          prev();
        };
        const stop = () => {
          clearTimeout(t);
          clearInterval(iv);
        };
        btn.onpointerdown = (e) => {
          e.preventDefault();
          stop();
          n = 0;
          step();
          t = setTimeout(() => (iv = setInterval(step, 70)), 450);
        };
        ["onpointerup", "onpointerleave", "onpointercancel"].forEach((ev) => (btn[ev] = stop));
        btn.oncontextmenu = (e) => e.preventDefault();
        btn.onclick = (e) => {
          if (e.detail === 0) { n = 0; step(); } // papan ketik / pembaca layar
        };
      }
      holdStep($("qm"), -1);
      holdStep($("qp"), 1);

`,Hp=`/* Cadangan & peringatan penyimpanan
   asal: index-fixd.html baris 5747-5918 */
      /* ---------- cadangan & peringatan penyimpanan ---------- */
      const ST_CAP = 5000000; // perkiraan batas localStorage (karakter)
      let stC = { t: 0, ok: true, used: 0 };
      function stCheck(force) {
        const now = Date.now();
        if (!force && now - stC.t < 60000) return stC;
        let used = 0, ok = true;
        try {
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            used += k.length + (localStorage.getItem(k) || "").length;
          }
        } catch (e) {}
        try {
          // uji ruang kosong nyata: tulis 150 ribu karakter lalu hapus
          localStorage.setItem("__probe__", "x".repeat(150000));
        } catch (e) {
          ok = false;
        } finally {
          try { localStorage.removeItem("__probe__"); } catch (_) {}
        }
        return (stC = { t: now, ok, used });
      }
      const mb = (n) => (n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 1 });
      const dtF = (iso) => (iso ? new Date(iso).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "");
      let gdSnooze = 0;
      function guardUi(force) {
        const s = stCheck(force),
          pct = Math.min(100, Math.round((s.used / ST_CAP) * 100)),
          full = !s.ok || pct >= 80,
          h = [];
        const bkBtn = '<button class="p ximp" data-g="bk">Unduh cadangan sekarang</button>';
        if (failed.size)
          h.push(\`<div class="gd err" role="alert"><b>Perubahan belum tersimpan di perangkat</b>Penyimpanan penuh atau diblokir browser. Hasil terbaru hanya ada di layar dan akan hilang jika halaman ditutup.<div class="ga">\${bkBtn}</div></div>\`);
        else if (full)
          h.push(\`<div class="gd warn"><b>Penyimpanan hampir penuh\${s.ok ? " (" + pct + "%)" : ""}</b>Sisa ruang di perangkat ini tinggal sedikit. Unduh cadangan, lalu hapus hasil lama atau data yang tidak dipakai.<div class="ga">\${bkBtn}</div></div>\`);
        else if (bk.n >= 20 && bk.n >= gdSnooze)
          h.push(\`<div class="gd info"><b>\${bk.n} perubahan belum dicadangkan</b>\${bk.at ? "Cadangan terakhir: " + dtF(bk.at) + "." : "Belum pernah dicadangkan."} Cadangan melindungi data jika browser dibersihkan atau HP bermasalah.<div class="ga">\${bkBtn.replace("Unduh cadangan sekarang", "Cadangkan")}<button class="s" data-g="later">Nanti</button></div></div>\`);
        if (isDemoData())
          h.push(\`<div class="gd warn"><b>Ini DATA CONTOH, bukan data gudang Anda</b>Hasil periksa, rekap, dan pesan Telegram dari data ini tidak berlaku. Impor data WMS asli dulu.<div class="ga"><button class="p" data-g="imp">Impor data WMS</button></div></div>\`);
        if (corrupt.length)
          h.push(\`<div class="gd warn"><b>Sebagian data tersimpan tidak terbaca</b>Dilewati: \${corrupt.map(esc).join(", ")}. Salinan mentahnya disimpan di perangkat dengan akhiran __rusak.</div>\`);
        $("guard").innerHTML = h.join("");
        // panel di menu Data WMS
        $("bkInfo").textContent = (bk.at ? "Cadangan terakhir: " + dtF(bk.at) + "." : "Belum pernah dicadangkan.") + (bk.n ? \` \${bk.n} perubahan sejak itu.\` : "");
        $("bkMeter").className = "meter" + (!s.ok || pct >= 95 ? " full" : pct >= 80 ? " hi" : "");
        $("bkMeter").firstElementChild.style.width = Math.max(2, pct) + "%";
        $("bkSt").textContent = \`Penyimpanan terpakai ± \${mb(s.used)} MB dari ± \${mb(ST_CAP)} MB (perkiraan).\` + (s.ok ? "" : " Ruang kosong hampir habis.");
      }
      $("guard").onclick = (e) => {
        const b = e.target.closest("[data-g]");
        if (!b) return;
        if (b.dataset.g === "bk") doBackup();
        else if (b.dataset.g === "imp") nav("data");
        else {
          gdSnooze = bk.n + 20;
          guardUi();
        }
      };
      const BK_KEYS = () => ({
        [K_M]: DATA, [K_C]: counts, [K_F]: codeFix, [K_U]: users, [K_X]: closed,
        [K_CU]: curU, [K_D]: dc, [K_DP]: dcPick, warehouse_so_dest_v1: dest, [K_MON]: mon, [K_T]: tasks, [K_CFG]: cfg, [K_CLRD]: clrDone, [K_CLRH]: clrHist, [K_MUATH]: muatHist, [K_KESH]: kesHist, [K_AG]: aging, [K_AGK]: agingCls, [K_AGC]: agingCfg,
      });
      function doBackup() {
        const at = new Date().toISOString(),
          d = new Date(),
          p2 = (n) => String(n).padStart(2, "0"),
          name = \`cadangan_stock_control_\${d.getFullYear()}-\${p2(d.getMonth() + 1)}-\${p2(d.getDate())}_\${p2(d.getHours())}\${p2(d.getMinutes())}.json\`,
          blob = new Blob([JSON.stringify({ app: "stock-control-wms", ver: 5, at, data: BK_KEYS() })], { type: "application/json" }),
          u = URL.createObjectURL(blob),
          a = document.createElement("a");
        a.href = u;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(u), 2000);
        bk = { at, n: 0 };
        saveBk();
        gdSnooze = 0;
        guardUi();
        toast("Cadangan diunduh: " + name);
      }
      $("bkNow").onclick = doBackup;
      const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
      function bkCheck(p) {
        if (!isObj(p) || p.app !== "stock-control-wms" || !isObj(p.data)) return "File ini bukan cadangan Stock Control.";
        const d = p.data;
        if (!Array.isArray(d[K_M]) || !d[K_M].length || d[K_M].some((x) => !isObj(x) || !x.bin || !x.item || !x.area))
          return "Cadangan rusak: data WMS tidak lengkap.";
        if (d[K_C] != null && !isObj(d[K_C])) return "Cadangan rusak: hasil pemeriksaan tidak valid.";
        if (d[K_U] != null && !Array.isArray(d[K_U])) return "Cadangan rusak: daftar petugas tidak valid.";
        for (const k of [K_F, K_X, K_D, K_DP, K_CFG, "warehouse_so_dest_v1"]) if (d[k] != null && !isObj(d[k])) return "Cadangan rusak: salah satu bagian data tidak valid.";
        return "";
      }
      function applyRestore(d, at) {
        const next = {
          [K_M]: d[K_M], [K_C]: d[K_C] || {}, [K_F]: d[K_F] || {}, [K_U]: d[K_U] || [], [K_X]: d[K_X] || {},
          [K_CU]: typeof d[K_CU] === "string" ? d[K_CU] : "", [K_D]: d[K_D] || {}, [K_DP]: d[K_DP] || {}, warehouse_so_dest_v1: d.warehouse_so_dest_v1 || {},
        };
        if (isObj(d[K_MON])) next[K_MON] = d[K_MON];
        next[K_T] = isObj(d[K_T]) ? d[K_T] : {};
        if (isObj(d[K_CLRD])) next[K_CLRD] = d[K_CLRD];
        if (Array.isArray(d[K_MUATH])) next[K_MUATH] = d[K_MUATH];
        if (Array.isArray(d[K_CLRH])) next[K_CLRH] = d[K_CLRH];
        if (Array.isArray(d[K_KESH])) next[K_KESH] = d[K_KESH];
        if (isObj(d[K_AG])) next[K_AG] = d[K_AG];
        if (isObj(d[K_AGK])) next[K_AGK] = d[K_AGK];
        if (isObj(d[K_AGC])) next[K_AGC] = d[K_AGC];
        if (isObj(d[K_CFG])) next[K_CFG] = d[K_CFG]; // cadangan lama tanpa pengaturan: pengaturan sekarang dipertahankan
        const old = Object.keys(next).map((k) => {
          try { return [k, localStorage.getItem(k)]; } catch (e) { return [k, null]; }
        });
        try {
          Object.entries(next).forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)));
        } catch (e) {
          // gagal di tengah jalan: kembalikan data lama
          old.forEach(([k, v]) => {
            try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (_) {}
          });
          return toast("Gagal memulihkan: penyimpanan penuh. Data lama tetap dipertahankan.");
        }
        DATA = next[K_M]; counts = next[K_C]; codeFix = next[K_F]; users = next[K_U]; closed = next[K_X];
        tasks = next[K_T] || {}; curU = next[K_CU]; migrateUsers(); dc = next[K_D]; dcPick = next[K_DP]; dest = next.warehouse_so_dest_v1;
        if (next[K_AG]) aging = next[K_AG];
        if (next[K_AGK]) agingCls = next[K_AGK];
        if (next[K_AGC]) agingCfg = next[K_AGC];
        if (next[K_CLRD]) clrDone = next[K_CLRD];
        if (next[K_MUATH]) { muatHist = next[K_MUATH]; renderMuHist(); }
        if (next[K_CLRH]) { clrHist = next[K_CLRH]; renderClrHist(); }
        if (next[K_KESH]) { kesHist = next[K_KESH]; renderKesHist(); }
        if (next[K_MON]) mon = { ...mon, ...next[K_MON] };
        if (next[K_CFG]) {
          cfg = next[K_CFG];
          delete cfg.pin;
          applyCfg();
          cfgUi();
        }
        applySession();
        applyRole();
        undoStack.length = 0;
        dcUndoStack.length = 0;
        failed.clear();
        bk = { at: at || new Date().toISOString(), n: 0 };
        saveBk();
        if (window.__syncRestore) window.__syncRestore();
        initAll();
        go("so");
        guardUi(true);
        toast("Data dipulihkan dari cadangan");
      }
      $("bkRestore").onclick = () => {
        const f = $("bkFile").files[0];
        if (!f) return toast("Pilih file cadangan (.json) terlebih dahulu.");
        const r = new FileReader();
        r.onload = async () => {
          let p;
          try {
            p = JSON.parse(String(r.result).replace(/^\uFEFF/, ""));
          } catch (e) {
            return toast("File ini bukan cadangan yang valid.");
          }
          const bad = bkCheck(p);
          if (bad) return toast(bad);
          const d = p.data;
          const msg = \`Cadangan \${dtF(p.at) || "tanpa tanggal"}: \${d[K_M].length} bin WMS, \${Object.keys(d[K_C] || {}).length} bin sudah diperiksa, \${Object.keys(d[K_D] || {}).length} item DC. Semua data di perangkat ini akan diganti. Unduh cadangan data saat ini dulu jika masih perlu.\`;
          if (await ask("Pulihkan dari cadangan?", msg, "Pulihkan", true)) applyRestore(d, p.at);
        };
        r.readAsText(f);
      };
      window.addEventListener("beforeunload", (e) => {
        if (failed.size) {
          e.preventDefault();
          e.returnValue = "";
        }
      });
      try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) {}

`,Up=`/* Telegram
   asal: index-fixd.html baris 5919-6167 */
      /* ---------- Telegram ---------- */
      const K_TG = "warehouse_so_tg_v1",
        K_TQ = "warehouse_so_tgq_v1";
      const tgSaved = ld(K_TG, {});
      let tg = {
        token: tgSaved.token || "",
        chat: tgSaved.chat || "",
        thread: tgSaved.thread || "",
        on: Object.assign({ prob: true, all: false, area: true, dc: true }, tgSaved.on || {}),
      };
      let tgQ = ld(K_TQ, []),
        tgBusy = false,
        tgErr = "",
        tgT = 0,
        tgLastToast = 0,
        tgMode = false;
      const tgReady = () => !!(tg.token && tg.chat);
      const tgSaveQ = () => sv(K_TQ, tgQ);
      const md = (x) => String(x ?? "").replace(/([_*\`\\[])/g, "\\\\$1");
      function outText(t) {
        // dipakai semua tombol "Salin": saat mode Telegram aktif, teks dikirim, bukan disalin
        if (tgMode) {
          tgSend(t);
          toast("Masuk antrean Telegram");
          return new Promise(() => {});
        }
        return navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject();
      }
      function tgRun(src) {
        if (src === "mcopy" && !mRecs.length) return toast("Belum ada file laporan muat.");
        if (!tgReady()) {
          toast("Atur token bot dan Chat ID dulu.");
          go("tg");
          return;
        }
        if (src === "adj") {
          const r = adjustRows().rows;
          if (!r.length) return toast("Belum ada selisih untuk dikirim.");
          const L = r.map((x) => \`• \${rakFmt(x.rak)} · \${x.nama}: \${signed(x.qty)} (\${x.ket})\`);
          tgSend(\`*SELISIH SIAP ADJUST*\\n\${new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}\\n\${r.length} baris\${curName() ? " · " + md(curName()) : ""}\\n━━━━━━━━━━━━━━━━━━━━\\n\${L.map((l) => md(l).replace(/\\\\_/g, "_")).join("\\n")}\`);
          return toast("Masuk antrean Telegram");
        }
        tgMode = true;
        try {
          $(src).click();
        } finally {
          tgMode = false;
        }
      }
      document.querySelectorAll("[data-tg]").forEach((b) => (b.onclick = () => tgRun(b.dataset.tg)));
      function tgChunks(t) {
        const out = [];
        let cur = "";
        String(t).split("\\n").forEach((l) => {
          while (l.length > 3800) {
            if (cur) { out.push(cur); cur = ""; }
            out.push(l.slice(0, 3800));
            l = l.slice(3800);
          }
          if ((cur + "\\n" + l).length > 3800) { out.push(cur); cur = l; }
          else cur = cur ? cur + "\\n" + l : l;
        });
        if (cur) out.push(cur);
        return out;
      }
      function tgSend(text) {
        if (!tgReady()) return;
        if (isDemoData()) text = "🧪 DATA CONTOH (bukan data asli)\\n" + text;
        tgChunks(text).forEach((c) => tgQ.push({ text: c, at: Date.now() }));
        if (tgQ.length > 200) tgQ.splice(0, tgQ.length - 200);
        tgSaveQ();
        tgFlush();
      }
      async function tgApi(method, body) {
        const r = await fetch(\`https://api.telegram.org/bot\${tg.token}/\${method}\`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        let j = {};
        try { j = await r.json(); } catch (e) {}
        return { ok: !!j.ok, status: r.status, j };
      }
      async function tgPost(text) {
        const body = { chat_id: tg.chat, text, disable_web_page_preview: true, parse_mode: "Markdown" };
        if (tg.thread) body.message_thread_id = Number(tg.thread);
        let res = await tgApi("sendMessage", body);
        if (!res.ok && res.status === 400 && /parse entities/i.test(res.j.description || "")) {
          delete body.parse_mode; // format gagal terbaca: kirim polos daripada hilang
          res = await tgApi("sendMessage", body);
        }
        return res;
      }
      function tgNote(m) {
        tgErr = m;
        if (Date.now() - tgLastToast > 60000) {
          tgLastToast = Date.now();
          toast("Telegram: " + m);
        }
      }
      async function tgFlush() {
        if (tgBusy || !tgQ.length || !tgReady()) return tgUi();
        tgBusy = true;
        clearTimeout(tgT);
        while (tgQ.length) {
          let res;
          try {
            res = await tgPost(tgQ[0].text);
          } catch (e) {
            tgNote(tgQ.length + " pesan menunggu, tidak ada koneksi.");
            tgT = setTimeout(tgFlush, 30000);
            break;
          }
          if (res.ok) {
            tgQ.shift();
            tgErr = "";
            tgSaveQ();
          } else if (res.status === 429) {
            const w = ((res.j.parameters && res.j.parameters.retry_after) || 5) + 1;
            tgNote("Terlalu banyak pesan, mencoba lagi " + w + " detik.");
            tgT = setTimeout(tgFlush, w * 1000);
            break;
          } else if (res.status >= 500) {
            tgNote("Server Telegram bermasalah, akan dicoba lagi.");
            tgT = setTimeout(tgFlush, 30000);
            break;
          } else {
            tgQ.shift(); // ditolak (token/chat salah dsb): buang agar antrean tidak macet
            tgSaveQ();
            tgNote("Ditolak Telegram: " + (res.j.description || "HTTP " + res.status));
          }
        }
        tgBusy = false;
        tgUi();
      }
      window.addEventListener("online", tgFlush);
      /* pesan otomatis */
      const tgTime = () => new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      function tgBin(x, c) {
        if (!tgReady() || !c) return;
        const bad = isProb(c);
        if (!(bad ? tg.on.prob || tg.on.all : tg.on.all)) return;
        const d = c.actualQty - x.onhand;
        tgSend(
          \`\${bad ? "⚠️ *Bin perlu review*" : "✅ *Bin sesuai*"}\\n*\${md(x.bin)}* · Area \${md(x.area)}\\n\${md(x.item)}\\nWMS \${fmt(x.onhand)} · Fisik \${fmt(c.actualQty)}\${d ? " (" + signed(d) + ")" : ""}\` +
            (c.itemMatch === false ? \`\\nItem beda, ditemukan: \${md(c.actualItem)}\` : "") +
            (c.note ? \`\\nCatatan: \${md(c.note)}\` : "") +
            \`\\n\${c.by ? md(c.by) + " · " : ""}\${tgTime()}\`,
        );
      }
      function tgArea(a, shut) {
        if (!tgReady() || !tg.on.area) return;
        const k = kpiOf(DATA.filter((x) => x.area === a));
        tgSend(
          \`\${shut ? "🔒 *Area " + md(a) + " ditutup*" : "🔓 *Area " + md(a) + " dibuka kembali*"}\\n\${k.done}/\${k.total} bin diperiksa · akurasi \${pc(k.ok, k.done)}\\n\${curName() ? md(curName()) + " · " : ""}\${tgTime()}\`,
        );
      }
      function tgDc(item, fis, sys, d, adj, ke) {
        if (!tgReady() || !tg.on.dc) return;
        tgSend(
          \`\${d ? "⚠️ *DC selisih*" : "✅ *DC sesuai*"}\${ke > 1 ? " (DC ulang ke-" + ke + ")" : ""}\\n\${md(item)}\\nSistem \${fmt(sys)} · Fisik \${fmt(fis)}\${d ? " (" + signed(d) + ")" : ""}\${d && adj ? "\\nAdjust di rak " + md(adj) : ""}\\n\${curName() ? md(curName()) + " · " : ""}\${tgTime()}\`,
        );
      }
      /* layar pengaturan */
      function tgUi() {
        if ($("v-tg").hidden) return;
        const ae = document.activeElement;
        if (!ae || !["tgToken", "tgChat", "tgThread"].includes(ae.id)) {
          $("tgToken").value = tg.token;
          $("tgChat").value = tg.chat;
          $("tgThread").value = tg.thread;
        }
        $("swProb").checked = tg.on.prob;
        $("swAll").checked = tg.on.all;
        $("swArea").checked = tg.on.area;
        $("swDc").checked = tg.on.dc;
        $("tgStat").textContent = !tgReady()
          ? "Belum terhubung. Isi token dan Chat ID."
          : tgQ.length
            ? tgQ.length + " pesan menunggu terkirim." + (tgErr ? " " + tgErr : "")
            : "Terhubung. Tidak ada antrean." + (tgErr ? " " + tgErr : "");
        $("tgRetry").disabled = $("tgClear").disabled = !tgQ.length;
      }
      function tgRead() {
        tg.token = $("tgToken").value.trim();
        tg.chat = $("tgChat").value.trim();
        tg.thread = $("tgThread").value.replace(/\\D/g, "");
        tg.on = { prob: $("swProb").checked, all: $("swAll").checked, area: $("swArea").checked, dc: $("swDc").checked };
      }
      const tgRes = (m, ok) => {
        $("tgRes").className = "note " + (ok ? "ok" : "info");
        $("tgRes").textContent = m;
      };
      $("tgShow").onclick = () => {
        const t = $("tgToken");
        t.type = t.type === "password" ? "text" : "password";
        $("tgShow").textContent = t.type === "password" ? "Tampilkan token" : "Sembunyikan token";
      };
      $("tgSave").onclick = () => {
        tgRead();
        if (tg.token && !/^\\d+:[\\w-]{20,}$/.test(tg.token)) return tgRes("Format token tidak dikenali. Salin ulang dari @BotFather.", false);
        if (!sv(K_TG, tg)) return tgRes("Gagal menyimpan ke perangkat (penyimpanan penuh).", false);
        tgRes(tgReady() ? "Tersimpan. Coba kirim pesan tes." : "Tersimpan. Token dan Chat ID belum lengkap.", true);
        tgFlush();
        tgUi();
      };
      $("tgTest").onclick = async () => {
        tgRead();
        if (!tgReady()) return tgRes("Isi token dan Chat ID dulu.", false);
        tgRes("Mengirim…", true);
        try {
          const r = await tgPost("✅ *Tes Stock Control*\\nPengaturan Telegram berhasil. " + tgTime());
          if (r.ok) {
            sv(K_TG, tg);
            tgRes("Terkirim. Pengaturan disimpan.", true);
          } else tgRes("Gagal: " + (r.j.description || "HTTP " + r.status), false);
        } catch (e) {
          tgRes("Tidak bisa terhubung ke Telegram. Cek koneksi internet.", false);
        }
      };
      $("tgFind").onclick = async () => {
        tgRead();
        if (!tg.token) return tgRes("Isi token bot dulu.", false);
        tgRes("Mencari…", true);
        try {
          const r = await tgApi("getUpdates", { timeout: 0, allowed_updates: ["message", "channel_post", "my_chat_member"] });
          if (!r.ok) return tgRes("Gagal: " + (r.j.description || "HTTP " + r.status), false);
          const u = [...(r.j.result || [])].reverse().map((x) => (x.message || x.channel_post || x.my_chat_member || {}).chat).find((c) => c && c.id);
          if (!u) return tgRes("Belum ada pesan masuk. Kirim pesan apa saja ke bot (atau tambahkan bot ke grup dan kirim pesan), lalu coba lagi.", false);
          $("tgChat").value = String(u.id);
          tgRes("Ditemukan: " + (u.title || [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || u.id) + " (" + u.id + "). Ketuk Simpan pengaturan.", true);
        } catch (e) {
          tgRes("Tidak bisa terhubung ke Telegram. Cek koneksi internet.", false);
        }
      };
      $("tgRetry").onclick = () => {
        tgErr = "";
        tgFlush();
      };
      $("tgClear").onclick = async () => {
        if (await ask("Kosongkan antrean?", tgQ.length + " pesan yang belum terkirim akan dibuang.", "Kosongkan", true)) {
          tgQ = [];
          tgErr = "";
          tgSaveQ();
          tgUi();
        }
      };
      setTimeout(tgFlush, 1500); // kirim sisa antrean dari sesi sebelumnya

`,Fp=`/* Tautan sumber data yang dipakai bersama: Dashboard Delivery dan Clearing.
   Diatur sekali di satu HP, tersimpan di server (kunci linkcfg, ikut sinkron), lalu HP lain otomatis memakainya.
   Tautan Monitoring Kiriman (mon) sudah ikut tersinkron lewat kunci mon. Token Telegram sengaja TIDAK dibagikan. */
      const K_LK = "warehouse_so_linkcfg_v1";
      let linkCfg = ld(K_LK, null); // { data: { dlv, clr }, at } terakhir yang dikenal perangkat ini
      const linkLocal = () => ({
        dlv: { url: dlv.url || "", auto: dlv.auto },
        clr: { url: clr.url || "", start: clr.start, cv: clr.cv, cq: clr.cq, ck: clr.ck, auto: clr.auto },
      });
      const lkPut = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }; // tulis tanpa menandai "perlu kirim"
      const linkHas = (d) => !!((d && d.dlv && d.dlv.url) || (d && d.clr && d.clr.url));
      /* Dipanggil saat menyusun kiriman sinkron: bila tautan di perangkat ini berubah, jadikan versi terbaru. Perangkat baru tanpa tautan tidak menimpa server. */
      function linkSnap() {
        const cur = linkLocal();
        if (!linkHas(cur)) return linkCfg;
        if (!linkCfg || JSON.stringify(linkCfg.data) !== JSON.stringify(cur)) {
          linkCfg = { data: cur, at: new Date().toISOString() };
          sv(K_LK, linkCfg);
        }
        return linkCfg;
      }
      /* Dipanggil saat menerima dari server: pakai bila lebih baru dari yang dikenal perangkat ini. */
      function linkApply(rc) {
        if (!rc || !rc.data || !linkHas(rc.data)) return false;
        if (linkCfg && String(linkCfg.at) >= String(rc.at)) return false;
        const d = rc.data;
        if (d.dlv) { dlv = { ...dlv, url: d.dlv.url || "", auto: d.dlv.auto == null ? dlv.auto : d.dlv.auto }; lkPut(K_DLV, dlv); }
        if (d.clr) { clr = { ...clr, ...d.clr }; lkPut(K_CLR, clr); }
        linkCfg = rc;
        lkPut(K_LK, linkCfg);
        if (curViewId === "mon" && typeof dlvEnter === "function") dlvEnter();
        else if (curViewId === "clr" && typeof renderClr === "function") renderClr();
        return true;
      }

      /* Ringkasan tautan laporan: dari mana tiap sumber data berasal, dan mana yang belum diisi. */
      function linkStatus() {
        const C = WMS_CONFIG || {}, sh = (u, b) => (!u ? ["bad", "Belum diisi"] : b && u === b ? ["ok", "Bawaan aplikasi"] : linkCfg && linkCfg.data && ((linkCfg.data.dlv && linkCfg.data.dlv.url === u) || (linkCfg.data.clr && linkCfg.data.clr.url === u)) ? ["ok", "Tersimpan di server"] : ["wip", "Hanya di HP ini"]);
        const sync = (() => { try { const S = JSON.parse(localStorage.getItem("warehouse_so_sync_v1") || "{}"); return S.url || C.syncUrl || ""; } catch (e) { return C.syncUrl || ""; } })();
        return [
          { n: "Sinkron server (GAS)", u: sync, st: sync ? (sync === C.syncUrl ? ["ok", "Bawaan aplikasi"] : ["wip", "Hanya di HP ini"]) : ["bad", "Belum diisi"] },
          { n: "Dashboard Delivery", u: dlv.url, st: sh(dlv.url, C.deliveryUrl) },
          { n: "Clearing (counting)", u: clr.url, st: sh(clr.url, C.clearingUrl) },
          { n: "Monitoring Kiriman", u: mon.url, st: !mon.url ? ["bad", "Belum diisi"] : mon.url === C.monUrl ? ["ok", "Bawaan aplikasi"] : ["ok", "Tersimpan di server"] },
        ];
      }
      function renderLinks() {
        const el = document.getElementById("lkList");
        if (!el) return;
        el.innerHTML = linkStatus().map((r) => \`<div class="lk-row"><div><b>\${esc(r.n)}</b><small>\${r.u ? esc(r.u.replace(/^https?:\\/\\//, "").slice(0, 46)) + (r.u.length > 52 ? "…" : "") : "Isi sekali di menu terkait; HP lain mengikuti otomatis"}</small></div><span class="lk-st \${r.st[0]}">\${r.st[1]}</span></div>\`).join("");
      }
`,qp=`/* Monitoring kiriman / Beranda
   asal: index-fixd.html baris 6168-6604 */
      /* ---------- monitoring kiriman ---------- */
      const K_MON = "warehouse_so_mon_v1",
        K_MONC = "warehouse_so_monc_v1",
        K_MONG = "warehouse_so_mong_v1",
        K_MONH = "warehouse_so_monh_v1";
      const MON_DEF = [
        { role: "nama", label: "Wilayah / nama baris", col: "A", type: "teks" },
        { role: "total", label: "Total mobil", col: "B", type: "angka" },
        { role: "belum", label: "Belum masuk", col: "C", type: "angka" },
        { role: "masuk", label: "Mobil masuk", col: "D", type: "angka" },
        { role: "proses", label: "Mobil proses", col: "E", type: "angka" },
        { role: "keluar", label: "Mobil keluar", col: "F", type: "angka" },
        { role: "gagal", label: "List gagal masuk", col: "G", type: "daftar" },
        { role: "progress", label: "Progress delivery", col: "H", type: "persen" },
      ];
      const monS = ld(K_MON, {});
      let mon = {
        url: monS.url || WMS_CONFIG.monUrl || "",
        start: monS.start || 2,
        auto: monS.auto == null ? 5 : monS.auto,
        alert: !!monS.alert,
        fields: Array.isArray(monS.fields) && monS.fields.length ? monS.fields : MON_DEF.map((f) => ({ ...f })),
      };
      let monCache = ld(K_MONC, null), // { at, rows, src }
        monView = "ringkas",
        monQ = "",
        monTimer = 0,
        monBusy = false,
        monErr = "";
      let monUnit = "", monPer = 1, monTr = 7;
      const monH = ld(K_MONH, {}), // riwayat harian { "YYYY-MM-DD": {total,keluar,masuk,proses,belum,gagal,u:{wilayah:{...}}} }
        monOpen = new Set();
      const monLetter = (i) => {
        let s2 = "";
        for (i++; i > 0; i = Math.floor((i - 1) / 26)) s2 = String.fromCharCode(65 + ((i - 1) % 26)) + s2;
        return s2;
      };
      function monCSV(t) {
        // seperti parseCSV, tetapi baris kosong tetap dihitung agar nomor baris sama dengan di spreadsheet
        const rows = [];
        let row = [], f = "", q = false;
        for (let i = 0; i < t.length; i++) {
          const ch = t[i], n = t[i + 1];
          if (ch === '"' && q && n === '"') { f += '"'; i++; }
          else if (ch === '"') q = !q;
          else if (ch === "," && !q) { row.push(f); f = ""; }
          else if ((ch === "\\n" || ch === "\\r") && !q) {
            if (ch === "\\r" && n === "\\n") i++;
            row.push(f); rows.push(row); row = []; f = "";
          } else f += ch;
        }
        row.push(f);
        if (row.some((v) => v.trim())) rows.push(row);
        return rows;
      }
      function monUrls(u) {
        u = u.trim();
        if (!u) return [];
        const gid = (u.match(/[#&?]gid=(\\d+)/) || [])[1];
        const pub = u.match(/spreadsheets\\/d\\/e\\/([\\w-]+)/);
        if (pub) return [\`https://docs.google.com/spreadsheets/d/e/\${pub[1]}/pub?output=csv\${gid ? "&gid=" + gid : ""}\`];
        const m = u.match(/spreadsheets\\/d\\/([\\w-]+)/);
        if (m) {
          const g = gid || "0";
          return [
            \`https://docs.google.com/spreadsheets/d/\${m[1]}/export?format=csv&gid=\${g}\`,
            \`https://docs.google.com/spreadsheets/d/\${m[1]}/gviz/tq?tqx=out:csv&gid=\${g}\`,
          ];
        }
        return [u];
      }
      function monNum(v) {
        let t = String(v ?? "").trim().replace(/%/g, "").replace(/\\s/g, "");
        if (!t) return null;
        if (/^\\d{1,3}(\\.\\d{3})+(,\\d+)?$/.test(t)) t = t.replace(/\\./g, "").replace(",", ".");
        else t = t.replace(",", ".");
        const n = Number(t);
        return Number.isFinite(n) ? n : null;
      }
      function monCol(spec, hdr) {
        spec = String(spec || "").trim();
        if (!spec) return -1;
        if (/^[A-Za-z]{1,3}$/.test(spec)) {
          let n = 0;
          for (const ch of spec.toUpperCase()) n = n * 26 + ch.charCodeAt(0) - 64;
          return n - 1;
        }
        const k = nrm(spec);
        return k ? hdr.findIndex((h) => nrm(h).includes(k)) : -1;
      }
      function monSumOf(groups) {
        const sum = {};
        ["total", "belum", "masuk", "proses", "keluar"].forEach((k) => {
          const v = groups.map((g) => g.n[k]).filter((x) => x != null);
          sum[k] = v.length ? v.reduce((a, b) => a + b, 0) : null;
        });
        sum.gagal = groups.reduce((a, g) => a + g.gagalN, 0);
        const pv = groups.map((g) => g.n.progress).filter((x) => x != null);
        sum.progress = sum.total && sum.keluar != null ? (sum.keluar / sum.total) * 100 : pv.length ? pv.reduce((a, b) => a + b, 0) / pv.length : null;
        return sum;
      }
      function monBuild(rows) {
        const hdr = rows[Math.max(0, mon.start - 2)] || [];
        const F = mon.fields.map((f) => ({ ...f, i: monCol(f.col, hdr) }));
        const by = (r) => F.find((f) => f.role === r);
        const nf = by("nama");
        const missing = F.filter((f) => String(f.col || "").trim() && f.i < 0).map((f) => f.label);
        const groups = [];
        if (nf && nf.i >= 0)
          rows.slice(Math.max(0, mon.start - 1)).forEach((r) => {
            const name = String(r[nf.i] ?? "").trim();
            if (!name || /^(total|jumlah|grand\\s*total)\\b/i.test(name)) return;
            const g = { name, n: {}, extra: [], gagal: [], gagalN: 0, raw: {} };
            F.forEach((f) => {
              if (f.role === "nama" || f.i < 0) return;
              const raw = String(r[f.i] ?? "").trim();
              if (f.role === "gagal" || (!f.role && f.type === "daftar")) {
                const list = raw.split(/[\\n;|,]+/).map((x) => x.trim()).filter(Boolean);
                if (f.role === "gagal") {
                  if (/^\\d+$/.test(raw)) g.gagalN = Number(raw);
                  else { g.gagal = list; g.gagalN = list.length; }
                } else g.extra.push({ label: f.label, text: list.join(", ") });
              } else if (f.role) g.n[f.role] = f.role === "progress" ? monPct(raw) : monNum(raw);
              else g.extra.push({ label: f.label, text: f.type === "angka" ? (monNum(raw) == null ? raw : fmt(monNum(raw))) : raw });
            });
            const n = g.n;
            if (n.total == null) {
              const sm = ["belum", "masuk", "proses", "keluar"].map((k) => n[k]).filter((v) => v != null);
              if (sm.length) n.total = sm.reduce((a, b) => a + b, 0);
            }
            if (n.progress == null && n.total && n.keluar != null) n.progress = (n.keluar / n.total) * 100;
            groups.push(g);
          });
        const sum = monSumOf(groups);
        return { F, groups, sum, missing, hasName: !!(nf && nf.i >= 0) };
      }

      /* ---- v16: Beranda, mobil keluar vs SPM dikerjakan ---- */
      function monCmp() {
        const el = $("monCmp");
        if (!el) return;
        const mu = ld(K_MUATS, null);
        const b = monCache ? monBuild(monCache.rows) : null, keluar = b ? b.sum.keluar : null;
        const go2 = allowedView("muat") ? '<button class="btn sec sm mt" type="button" data-go="muat">Buka Laporan Muat</button>' : "";
        if (!mu) {
          el.innerHTML = \`<div class="panel cmp"><div class="r"><b>Mobil keluar dan SPM dikerjakan</b></div><p class="fine">Laporan Muat belum diimpor. Impor file laporan muat supaya jumlah mobil keluar bisa dibandingkan dengan SPM yang dikerjakan.</p>\${go2}</div>\`;
        } else {
          const tgl = mu.tgl ? new Date(mu.tgl + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "tanpa tanggal";
          const today = mISO(new Date()), old = mu.tgl && mu.tgl !== today;
          let head = "", body = "";
          if (keluar == null) {
            body = \`<dl class="kv k2"><div><dt>SPM dikerjakan</dt><dd>\${fmt(mu.dp)}</dd></div><div><dt>Tidak diproses WMS</dt><dd>\${fmt(mu.tdkN)}</dd></div></dl><p class="fine">Jumlah mobil keluar belum terbaca dari monitoring. \${monCache ? 'Cek kolom "Mobil keluar" di pengaturan sumber.' : "Isi alamat spreadsheet di pengaturan sumber."}</p>\`;
          } else {
            const diff = keluar - mu.dp, pct = keluar ? Math.round((mu.dp / keluar) * 100) + "%" : "-";
            const [lb, cl, tx] = diff === 0
              ? ["Sama", "green", "Jumlah mobil keluar sama dengan SPM yang dikerjakan."]
              : diff > 0
                ? ["Keluar lebih banyak", "red", \`\${fmt(diff)} mobil sudah keluar tetapi SPM-nya tidak tercatat dikerjakan di WMS.\`]
                : ["SPM lebih banyak", "amber", \`\${fmt(-diff)} SPM dikerjakan di WMS tetapi mobilnya belum tercatat keluar.\`];
            head = \`<span class="pill \${cl}">\${lb}</span>\`;
            body = \`<dl class="kv"><div><dt>Mobil keluar</dt><dd>\${fmt(keluar)}</dd></div><div><dt>SPM dikerjakan</dt><dd>\${fmt(mu.dp)}</dd></div><div><dt>Selisih</dt><dd class="\${diff ? "neg" : ""}">\${diff > 0 ? "+" : ""}\${fmt(diff)}</dd></div><div><dt>Dikerjakan</dt><dd>\${pct}</dd></div></dl><p class="cmp-tx">\${tx}</p>\`;
          }
          el.innerHTML = \`<div class="panel cmp"><div class="r"><b>Mobil keluar dan SPM dikerjakan</b>\${head}</div>\${body}<p class="fine">Laporan muat tanggal \${tgl}, diimpor \${new Date(mu.at).toLocaleString("id-ID")}.\${old ? " Tanggal ini bukan hari ini, impor laporan terbaru." : ""}</p>\${go2}</div>\`;
        }
        const g = el.querySelector("[data-go]");
        if (g) g.onclick = () => nav(g.dataset.go);
      }
      function monPct(raw) {
        const v = monNum(raw);
        if (v == null) return null;
        return !/%/.test(raw) && v > 0 && v <= 1 && /[.,]/.test(raw) ? v * 100 : v;
      }
      const pr = (v) => (v == null ? "–" : Math.round(v) + "%");
      const monClock = (t) => new Date(t).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      function monSeg(g) {
        const n = g.n || g,
          parts = ["belum", "masuk", "proses", "keluar"].map((k) => [k, n[k] || 0]),
          tot = parts.reduce((a, [, v]) => a + v, 0) || 1;
        return parts.map(([k, v]) => (v ? \`<i class="c-\${k}" style="width:\${(v / tot) * 100}%"></i>\` : "")).join("");
      }
      const MON_LBL = (b, r) => (b.F.find((f) => f.role === r) || {}).label || r;
      /* ---- dashboard: riwayat harian, KPI, tren, status ---- */
      function monSnap(b) {
        if (!b.groups.length) return;
        const pick = (S) => ({ total: S.total, keluar: S.keluar, masuk: S.masuk, proses: S.proses, belum: S.belum, gagal: S.gagal }),
          u = {};
        b.groups.forEach((g) => (u[g.name] = pick({ ...g.n, gagal: g.gagalN })));
        monH[mISO(new Date())] = { ...pick(b.sum), u };
        Object.keys(monH).sort().slice(0, -60).forEach((k) => delete monH[k]);
        sv(K_MONH, monH);
      }
      const monSnapOf = (sn, unit) => (sn ? (unit ? (sn.u || {})[unit] : sn) || null : null);
      function monPrevSnap(per) {
        const lim = new Date();
        lim.setHours(0, 0, 0, 0);
        lim.setDate(lim.getDate() - per);
        const lk = mISO(lim), today = mISO(new Date()), k = Object.keys(monH).filter((x) => x <= lk && x < today).sort().pop();
        return k ? { k, s: monH[k] } : null;
      }
      function monTrend(days, unit) {
        const pts = [];
        for (let i = days - 1; i >= 0; i--) {
          const d = new Date();
          d.setHours(0, 0, 0, 0);
          d.setDate(d.getDate() - i);
          const s2 = monSnapOf(monH[mISO(d)], unit);
          pts.push({ d, t: s2 ? s2.total : null, k: s2 ? s2.keluar : null });
        }
        return pts;
      }
      function monTrendSvg(pts) {
        const vals = pts.flatMap((p) => [p.t, p.k]).filter((v) => v != null);
        if (!vals.length) return '<div class="empty">Belum ada riwayat. Tren terbentuk dari data yang dimuat setiap hari.</div>';
        const W = 340, H = 190, L0 = 30, R = 10, T = 12, B = 28,
          mx = Math.max(...vals, 1),
          step = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2000, 5000].find((q) => mx / q <= 4) || Math.ceil(mx / 4),
          top = Math.ceil(mx / step) * step,
          x = (i) => L0 + (pts.length === 1 ? (W - L0 - R) / 2 : (i * (W - L0 - R)) / (pts.length - 1)),
          y = (v) => T + (H - T - B) * (1 - v / top),
          DAY = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
          long = pts.length > 10;
        let grid = "";
        for (let v = 0; v <= top; v += step) grid += \`<line class="g" x1="\${L0}" x2="\${W - R}" y1="\${y(v)}" y2="\${y(v)}"/><text x="\${L0 - 6}" y="\${y(v) + 4}" text-anchor="end">\${v}</text>\`;
        const lab = pts.map((p, i) => ((pts.length - 1 - i) % (long ? 5 : 1) === 0 ? \`<text x="\${x(i)}" y="\${H - 8}" text-anchor="middle">\${long ? p.d.getDate() + "/" + (p.d.getMonth() + 1) : DAY[p.d.getDay()]}</text>\` : "")).join("");
        const series = (key, col) => {
          const segs = [];
          let cur = [];
          pts.forEach((p, i) => {
            if (p[key] == null) { if (cur.length) segs.push(cur); cur = []; } else cur.push([x(i), y(p[key])]);
          });
          if (cur.length) segs.push(cur);
          const line = segs.filter((g) => g.length > 1).map((g) => \`<path d="M\${g.map((q) => q.join(",")).join(" L")}" fill="none" stroke="\${col}" stroke-width="2.5" stroke-linejoin="round"/>\`).join("");
          const area = segs.filter((g) => g.length > 1).map((g) => \`<path d="M\${g.map((q) => q.join(",")).join(" L")} L\${g[g.length - 1][0]},\${y(0)} L\${g[0][0]},\${y(0)}Z" fill="\${col}" opacity=".08"/>\`).join("");
          const dots = segs.flat().map((q) => \`<circle cx="\${q[0]}" cy="\${q[1]}" r="4" fill="\${col}"/>\`).join("");
          return area + line + dots;
        };
        return \`<svg class="dch" viewBox="0 0 \${W} \${H}" role="img" aria-label="Grafik tren total dan terkirim \${pts.length} hari terakhir">\${grid}\${lab}\${series("t", "#0a5bd3")}\${series("k", "#1f7a4d")}</svg>\`;
      }
      const monIco = {
        tot: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 6h11v9H2zM14 9h4l3 3.5V15h-7z"/><circle cx="7" cy="17.5" r="2" style="stroke:#0a5bd3" stroke-width="1.5"/><circle cx="17" cy="17.5" r="2" style="stroke:#0a5bd3" stroke-width="1.5"/></svg>',
        ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
        wip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>',
      };
      const monStat = (g) => {
        const n = g.n;
        return g.gagalN ? ["Gagal masuk", "red"] : (n.total && n.keluar >= n.total) || n.progress >= 100 ? ["Terkirim", "ok"] : n.proses || n.masuk ? ["Dalam Proses", "wip"] : ["Pending", "pd"];
      };
      function monDash(S) {
        const sum2 = (o) => (o && (o.masuk != null || o.proses != null) ? (o.masuk || 0) + (o.proses || 0) : null),
          prs = sum2(S),
          bel = S.belum || 0,
          kel = S.keluar,
          ps = monPrevSnap(monPer),
          pv = ps && monSnapOf(ps.s, monUnit),
          ttl = ps ? "Dibanding " + ps.k.split("-").reverse().join("/") : "Belum ada riwayat pembanding";
        const chip = (c, p) => {
          if (c == null || !p) return \`<span class="dchip eq" title="\${ttl}">–</span>\`;
          const d = Math.round(((c - p) / p) * 100);
          return \`<span class="dchip\${d ? "" : " eq"}" title="\${ttl}">\${d > 0 ? "↑ +" : d < 0 ? "↓ " : ""}\${d}%</span>\`;
        };
        const card = (cls, v, lb, p) => \`<div class="kc \${cls}"><div class="kh"><span class="ki">\${monIco[cls]}</span><b>\${v == null ? "–" : fmt(v)}</b></div><div class="kl">\${lb}</div>\${chip(v, p)}</div>\`;
        const segs = [["Terkirim", kel || 0, "#0a5bd3"], ["Dalam Proses", prs || 0, "#b26a00"], ["Pending", bel, "#6b7785"]],
          tot = segs.reduce((a, q) => a + q[1], 0),
          C = 2 * Math.PI * 40;
        let off = 0;
        const arcs = tot
          ? segs.map(([, v, c]) => {
              if (!v) return "";
              const len = (v / tot) * C,
                r = \`<circle cx="50" cy="50" r="40" fill="none" stroke="\${c}" stroke-width="14" stroke-dasharray="\${len} \${C - len}" stroke-dashoffset="\${-off}" transform="rotate(-90 50 50)"/>\`;
              off += len;
              return r;
            }).join("")
          : '<circle cx="50" cy="50" r="40" fill="none" stroke="#e6edf3" stroke-width="14"/>';
        const pct = tot ? Math.round(((kel || 0) / tot) * 100) : 0;
        return (
          \`<div class="kcs">\${card("tot", S.total, "Total Kiriman", pv && pv.total)}\${card("ok", kel, "Terkirim", pv && pv.keluar)}\${card("wip", prs, "Dalam Proses", sum2(pv))}</div>\` +
          \`<section class="dcard"><div class="dtop"><h3>Tren Kiriman</h3><div class="seg2" role="group" aria-label="Rentang tren"><button type="button" data-tr="7" class="\${monTr === 7 ? "on" : ""}">7 Hari</button><button type="button" data-tr="30" class="\${monTr === 30 ? "on" : ""}">30 Hari</button></div></div>\${monTrendSvg(monTrend(monTr, monUnit))}<div class="dlg"><span class="a">Total</span><span class="b">Terkirim</span></div></section>\` +
          \`<section class="dcard"><div class="dtop"><h3>Status Kiriman</h3></div><div class="dnut"><svg viewBox="0 0 100 100" role="img" aria-label="\${pct}% terkirim">\${arcs}<text x="50" y="52" text-anchor="middle" class="dv">\${pct}%</text><text x="50" y="64" text-anchor="middle" class="ds">Terkirim</text></svg><div class="dnl">\${segs.map(([lb, v, c]) => \`<div><i style="background:\${c}"></i><span>\${lb}</span><b>\${fmt(v)}</b><span class="p">\${tot ? Math.round((v / tot) * 100) : 0}%</span></div>\`).join("")}</div></div></section>\`
        );
      }
      function monDetail(b, g, L, has) {
        const n = g.n,
          mini = ["total", "belum", "masuk", "proses", "keluar"].filter((k) => has(k)).map((k) => \`<div class="c-\${k}"><small>\${L(k)}</small><strong>\${n[k] == null ? "–" : fmt(n[k])}</strong></div>\`).join("");
        return \`<div class="dd"><div class="mg5">\${mini}</div>\${g.gagalN ? \`<div class="gg"><b>\${L("gagal")} (\${g.gagalN}):</b>\${g.gagal.map((x) => \`<span>\${esc(x)}</span>\`).join("")}</div>\` : ""}\${g.extra.filter((e) => e.text).map((e) => \`<div class="xk">\${esc(e.label)}: <b>\${esc(e.text)}</b></div>\`).join("")}</div>\`;
      }
      function monRender() {
        monCmp();
        const msg = [];
        if (monErr) msg.push(\`<div class="note">\${esc(monErr)}</div>\`);
        if (!monCache) {
          $("monMsg").innerHTML = msg.join(""); // belum terhubung: cukup satu petunjuk dari Dashboard Delivery, tidak ganda
          $("monCmp").innerHTML = "";
          $("monOver").innerHTML = $("monList").innerHTML = $("monTools").innerHTML = "";
          $("monAt").className = "sync";
          $("monAt").textContent = "";
          $("monTg").disabled = true;
          return;
        }
        const b = monBuild(monCache.rows);
        $("monTg").disabled = !b.groups.length;
        const age = (Date.now() - monCache.at) / 60000,
          stale = mon.auto && monCache.src !== "file" && age > mon.auto * 2 + 1;
        $("monAt").className = "sync " + (stale ? "old" : monCache.src === "file" ? "file" : "ok");
        $("monAt").textContent = (monCache.src === "file" ? "Dari file" : stale ? "Data lama" : "Tersinkron") + " · " + new Date(monCache.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        if (!b.hasName) msg.push('<div class="note">Kolom nama wilayah belum diatur atau tidak ditemukan. Cek pengaturan kolom.</div>');
        else if (!b.groups.length) msg.push(\`<div class="note">Tidak ada baris data mulai baris ke-\${mon.start}. Cek "Data mulai baris ke".</div>\`);
        if (b.missing.length) msg.push(\`<div class="note">Kolom tidak ditemukan: \${esc(b.missing.join(", "))}.</div>\`);
        const gg = b.groups.filter((g) => g.gagalN);
        if (gg.length) msg.unshift(\`<div class="note" role="alert">⚠️ <b>\${fmt(gg.reduce((a, g) => a + g.gagalN, 0))} mobil gagal masuk</b> di \${gg.map((g) => esc(g.name)).join(", ")}.</div>\`);
        $("monMsg").innerHTML = msg.join("");
        const names = b.groups.map((g) => g.name);
        if (monUnit && !names.includes(monUnit)) monUnit = "";
        $("monUnit").innerHTML = '<option value="">Semua Unit</option>' + names.map((n) => \`<option value="\${esc(n)}">\${esc(n)}</option>\`).join("");
        $("monUnit").value = monUnit;
        $("monPer").value = String(monPer);
        const UG = monUnit ? b.groups.filter((g) => g.name === monUnit) : b.groups,
          S = monUnit ? monSumOf(UG) : b.sum,
          L = (r) => esc(MON_LBL(b, r));
        $("monOver").innerHTML = UG.length ? monDash(S) : "";
        $("monTools").innerHTML =
          chipsHtml(monView, [["ringkas", "Ringkas", ""], ["kartu", "Kartu", ""], ["tabel", "Tabel", ""]]) +
          \`<input id="monQ" type="search" placeholder="Cari wilayah" value="\${esc(monQ)}" style="flex:1;min-width:140px;min-height:40px;border-radius:99px;padding:6px 14px" autocomplete="off" aria-label="Cari wilayah" />\`;
        const q = monQ.toLowerCase().trim(),
          G = b.groups.filter((g) => (!monUnit || g.name === monUnit) && (!q || g.name.toLowerCase().includes(q)));
        if (!G.length) {
          $("monList").innerHTML = b.groups.length ? '<div class="empty">Tidak ada wilayah yang cocok.</div>' : "";
          return;
        }
        if (monView === "tabel") {
          const cols = b.F.filter((f) => f.role !== "nama" && f.i >= 0);
          const head = \`<tr><th>\${esc(MON_LBL(b, "nama"))}</th>\${cols.map((f) => \`<th>\${esc(f.label)}</th>\`).join("")}</tr>\`;
          const val = (g, f) => {
            if (f.role === "gagal") return \`<td class="tx">\${g.gagalN ? \`<b style="color:var(--red)">\${g.gagalN}</b>\${g.gagal.length ? " · " + esc(g.gagal.join(", ")) : ""}\` : "0"}</td>\`;
            if (f.role === "progress") return \`<td>\${pr(g.n.progress)}</td>\`;
            if (f.role) return \`<td>\${g.n[f.role] == null ? "–" : fmt(g.n[f.role])}</td>\`;
            const x = g.extra.find((e) => e.label === f.label);
            return \`<td class="tx">\${esc(x ? x.text : "")}</td>\`;
          };
          const foot = \`<tr><td>Total</td>\${cols.map((f) => (f.role === "gagal" ? \`<td>\${fmt(S.gagal)}</td>\` : f.role === "progress" ? \`<td>\${pr(S.progress)}</td>\` : f.role && S[f.role] != null ? \`<td>\${fmt(S[f.role])}</td>\` : "<td></td>")).join("")}</tr>\`;
          $("monList").innerHTML = \`<div class="mtw"><table class="mtb"><thead>\${head}</thead><tbody>\${G.map((g) => \`<tr><td>\${esc(g.name)}</td>\${cols.map((f) => val(g, f)).join("")}</tr>\`).join("")}</tbody><tfoot>\${foot}</tfoot></table></div>\`;
          return;
        }
        const has = (r) => b.F.some((f) => f.role === r && f.i >= 0);
        if (monView === "ringkas") {
          $("monList").innerHTML =
            \`<div class="dcard"><div class="dtop"><h3>Per Wilayah</h3><span class="fine">\${G.length} wilayah · ketuk untuk detail</span></div>\` +
            G.map((g) => {
              const n = g.n, st = monStat(g);
              return \`<details class="drow" data-n="\${esc(g.name)}"\${monOpen.has(g.name) ? " open" : ""}><summary><span class="pill2 \${st[1]}">\${st[0]}</span><span class="dnm"><b>\${esc(g.name)}</b><small>\${n.keluar == null ? "–" : fmt(n.keluar)}\${n.total != null ? " / " + fmt(n.total) : ""} mobil keluar</small></span><span class="dpc">\${pr(n.progress)}</span></summary>\${monDetail(b, g, L, has)}</details>\`;
            }).join("") +
            "</div>";
          return;
        }
        $("monList").innerHTML =
          '<div class="mgrid">' +
          G.map((g) => {
            const n = g.n,
              mini = ["total", "belum", "masuk", "proses", "keluar"].filter((k) => has(k)).map((k) => \`<div class="c-\${k}"><small>\${L(k)}</small><strong>\${n[k] == null ? "–" : fmt(n[k])}</strong></div>\`).join("");
            return \`<div class="card mcard"><div class="r"><b class="big">\${esc(g.name)}</b>\${has("progress") || n.progress != null ? \`<span class="pill \${n.progress >= 100 ? "green" : ""}">\${pr(n.progress)}</span>\` : ""}</div>\${n.progress != null ? \`<div class="pbar"><i style="width:\${Math.max(0, Math.min(100, n.progress))}%"></i></div>\` : ""}<div class="seg">\${monSeg(g)}</div><div class="mg5">\${mini}</div>\${g.gagalN ? \`<div class="gg"><b>\${L("gagal")} (\${g.gagalN}):</b>\${g.gagal.map((x) => \`<span>\${esc(x)}</span>\`).join("")}</div>\` : ""}\${g.extra.filter((e) => e.text).map((e) => \`<div class="xk">\${esc(e.label)}: <b>\${esc(e.text)}</b></div>\`).join("")}</div>\`;
          }).join("") +
          "</div>";
      }
      $("monMsg").onclick = (e) => {
        if (e.target.id === "monOpenSet") { $("monSet").open = true; $("monUrl").focus(); }
      };
      $("monTools").onclick = (e) => {
        const c = e.target.closest("[data-k]");
        if (c) {
          monView = c.dataset.k;
          monRender();
        }
      };
      let monQT = 0;
      $("monTools").oninput = (e) => {
        if (e.target.id === "monQ") {
          monQ = e.target.value;
          const p = e.target.selectionStart;
          clearTimeout(monQT); // tunggu jeda ketik 150 ms agar tidak render ulang tiap huruf
          monQT = setTimeout(() => {
            monRender();
            const i = $("monQ");
            if (i) { i.focus(); try { i.setSelectionRange(p, p); } catch (x) {} }
          }, 150);
        }
      };
      keepDom("monOver", "monTools", "monList");
      $("monOver").onclick = (e) => {
        const t = e.target.closest("[data-tr]");
        if (t) { monTr = Number(t.dataset.tr); monRender(); }
      };
      $("monPer").onchange = () => { monPer = Number($("monPer").value) || 1; monRender(); };
      $("monUnit").onchange = () => { monUnit = $("monUnit").value; monRender(); };
      $("monList").addEventListener("toggle", (e) => {
        const d = e.target;
        if (d.classList && d.classList.contains("drow")) d.open ? monOpen.add(d.dataset.n) : monOpen.delete(d.dataset.n);
      }, true);
      async function monLoad(manual) {
        if (monBusy) return;
        const cands = monUrls(mon.url);
        if (!cands.length) {
          monErr = "";
          monRender();
          return;
        }
        monBusy = true;
        $("monRef").disabled = true;
        $("monRef").textContent = "Memuat…";
        let rows = null, last = "";
        for (const u of cands) {
          try {
            const r = await fetch(u, { cache: "no-store" });
            if (!r.ok) throw new Error("HTTP " + r.status);
            const t = await r.text();
            if (/^\\s*<(!doctype|html)/i.test(t)) throw new Error("minta login");
            rows = monCSV(t.replace(/^\uFEFF/, ""));
            break;
          } catch (e) {
            last = e.message;
          }
        }
        monBusy = false;
        $("monRef").disabled = false;
        $("monRef").textContent = "Muat ulang";
        if (!rows) {
          monErr = "Gagal mengambil spreadsheet (" + last + "). Pastikan dibagikan ke \\"Siapa saja yang memiliki link\\" dan alamatnya benar." + (monCache ? " Menampilkan data terakhir." : "");
          if (manual) toast("Gagal memuat spreadsheet");
          return monRender();
        }
        monErr = "";
        monCache = { at: Date.now(), rows: rows.slice(0, 600).map((r) => r.slice(0, 40)), src: "url" };
        sv(K_MONC, monCache);
        monSnap(monBuild(monCache.rows));
        monRender();
        monAlertCheck();
        if (manual) toast("Data dimuat: " + monBuild(monCache.rows).groups.length + " baris");
      }
      function monAlertCheck() {
        if (!monCache) return;
        const b = monBuild(monCache.rows),
          now = b.groups.flatMap((g) => g.gagal.map((x) => g.name + "|" + x)),
          old = ld(K_MONG, null);
        sv(K_MONG, now);
        if (!mon.alert || !old || !tgReady()) return; // pemuatan pertama hanya menyimpan acuan
        const fresh = b.groups.map((g) => [g.name, g.gagal.filter((x) => !old.includes(g.name + "|" + x))]).filter(([, l]) => l.length);
        if (fresh.length) tgSend(\`🚫 *Gagal masuk baru*\\n\${fresh.map(([n, l]) => \`*\${md(n)}*: \${l.map(md).join(", ")}\`).join("\\n")}\\n\${tgTime()}\`);
      }
      function monEnter() {
        monMapUi();
        $("monUrl").value = mon.url;
        $("monStart").value = mon.start;
        $("monAuto").value = String(mon.auto);
        $("monAlert").checked = mon.alert;
        monRender();
        if (typeof monClrEnter === "function") monClrEnter();
        if (mon.url && (!monCache || monCache.src !== "file") && (!monCache || Date.now() - monCache.at > 20000)) monLoad(false);
        monLeave();
        if (typeof dlvEnter === "function") dlvEnter();
        if (mon.auto && mon.url)
          monTimer = setInterval(() => {
            if (!document.hidden) monLoad(false);
          }, mon.auto * 60000);
      }
      function monLeave() {
        if (typeof dlvLeave === "function") dlvLeave();
        clearInterval(monTimer);
        monTimer = 0;
      }
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && !$("v-mon").hidden && mon.url && monCache && monCache.src !== "file" && Date.now() - monCache.at > 30000) monLoad(false);
      });
      $("monRef").onclick = () => (mon.url ? monLoad(true) : (toast("Isi alamat spreadsheet dulu."), ($("monSet").open = true)));
      /* pengaturan kolom */
      function monMapUi() {
        $("monMap").innerHTML = mon.fields
          .map((f, i) => {
            const cx = !f.role;
            return \`<div class="mrow \${cx ? "cx" : ""}" data-i="\${i}"><input class="mlab" value="\${esc(f.label)}" aria-label="Nama tampilan" /><input class="mcol" value="\${esc(f.col)}" placeholder="Kolom" aria-label="Kolom untuk \${esc(f.label)}" autocomplete="off" spellcheck="false" />\${cx ? \`<button class="rmx" aria-label="Hapus kolom">×</button><select class="ty" aria-label="Jenis isi">\${[["teks", "Teks"], ["angka", "Angka"], ["daftar", "Daftar (pisah koma)"]].map(([v, l]) => \`<option value="\${v}" \${f.type === v ? "selected" : ""}>\${l}</option>\`).join("")}</select>\` : ""}</div>\`;
          })
          .join("");
      }
      function monRead() {
        document.querySelectorAll("#monMap .mrow").forEach((r) => {
          const f = mon.fields[Number(r.dataset.i)];
          if (!f) return;
          f.label = r.querySelector(".mlab").value.trim() || f.label;
          f.col = r.querySelector(".mcol").value.trim();
          const t = r.querySelector(".ty");
          if (t) f.type = t.value;
        });
        mon.url = $("monUrl").value.trim();
        mon.start = Math.max(1, Number($("monStart").value) || 2);
        mon.auto = Number($("monAuto").value) || 0;
        mon.alert = $("monAlert").checked;
      }
      $("monAdd").onclick = () => {
        monRead();
        mon.fields.push({ role: "", label: "Kolom tambahan", col: "", type: "teks" });
        monMapUi();
        const l = document.querySelectorAll("#monMap .mlab");
        l[l.length - 1].focus();
      };
      $("monMap").onclick = (e) => {
        const b = e.target.closest(".rmx");
        if (!b) return;
        monRead();
        mon.fields.splice(Number(b.closest(".mrow").dataset.i), 1);
        monMapUi();
      };
      $("monSave").onclick = () => {
        monRead();
        if (mon.url && !monUrls(mon.url).length) return toast("Alamat tidak valid.");
        if (mon.url && !/^https?:\\/\\//i.test(mon.url)) return toast("Alamat harus diawali https://");
        if (!sv(K_MON, mon)) toast("Gagal menyimpan pengaturan (penyimpanan penuh).");
        else toast("Pengaturan disimpan");
        monEnter();
        if (mon.url) monLoad(true);
      };
      $("monPrevBtn").onclick = async () => {
        monRead();
        let rows = monCache && (!mon.url || monCache.src === "file") ? monCache.rows : null;
        if (!rows) {
          const c = monUrls(mon.url);
          if (!c.length) return toast("Isi alamat spreadsheet dulu.");
          $("monPrev").innerHTML = '<p class="fine">Memuat…</p>';
          for (const u of c) {
            try {
              const r = await fetch(u, { cache: "no-store" }),
                t = await r.text();
              if (!r.ok || /^\\s*<(!doctype|html)/i.test(t)) continue;
              rows = monCSV(t.replace(/^\uFEFF/, ""));
              break;
            } catch (e) {}
          }
        }
        if (!rows) return ($("monPrev").innerHTML = '<div class="note">Tidak bisa membaca spreadsheet. Cek alamat dan pengaturan berbagi.</div>');
        const show = rows.slice(0, 8), w = Math.min(14, Math.max(...show.map((r) => r.length), 1));
        $("monPrev").innerHTML = \`<div class="pv"><table><tr><th></th>\${Array.from({ length: w }, (_, i) => \`<th>\${monLetter(i)}</th>\`).join("")}</tr>\${show.map((r, ri) => \`<tr><td>\${ri + 1}</td>\${Array.from({ length: w }, (_, i) => \`<td>\${esc(r[i] ?? "")}</td>\`).join("")}</tr>\`).join("")}</table></div><p class="fine">Huruf di atas adalah nama kolom yang diisi di pengaturan. Angka di kiri adalah nomor baris.</p>\`;
      };
      $("monFile").onchange = () => {
        const f = $("monFile").files[0];
        if (!f) return;
        const r = new FileReader(), x = /\\.xlsx?$/i.test(f.name);
        r.onload = () => {
          try {
            let rows;
            if (x) {
              if (!window.XLSX) throw new Error("Pustaka Excel gagal dimuat. Muat ulang aplikasi, atau simpan sebagai CSV.");
              const wb = XLSX.read(r.result, { type: "array" });
              rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", raw: false });
            } else rows = monCSV(String(r.result).replace(/^\uFEFF/, ""));
            monRead();
            monCache = { at: Date.now(), rows: rows.slice(0, 600).map((q) => q.slice(0, 40).map(String)), src: "file" };
            sv(K_MONC, monCache);
        monSnap(monBuild(monCache.rows));
            monErr = "";
            monRender();
            toast("Data dimuat dari file");
          } catch (e) {
            toast("Gagal membaca file: " + e.message);
          }
        };
        x ? r.readAsArrayBuffer(f) : r.readAsText(f);
      };
      $("monTg").onclick = () => {
        if (!tgReady()) {
          toast("Atur token bot dan Chat ID dulu.");
          return go("tg");
        }
        if (!monCache) return;
        const b = monBuild(monCache.rows), S = b.sum;
        if (!b.groups.length) return;
        const L = (r) => MON_LBL(b, r),
          line = (g) => {
            const n = g.n;
            return \`*\${md(g.name)}* \${n.progress != null ? pr(n.progress) : ""}\\n\` + ["total", "belum", "masuk", "proses", "keluar"].filter((k) => n[k] != null).map((k) => \`\${md(L(k))} \${fmt(n[k])}\`).join(" · ") + (g.gagalN ? \`\\n🚫 \${md(L("gagal"))} (\${g.gagalN})\${g.gagal.length ? ": " + g.gagal.map(md).join(", ") : ""}\` : "");
          };
        tgSend(\`*MONITORING KIRIMAN*\\n\${new Date().toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}\\n━━━━━━━━━━━━━━━━━━━━\\n\${["total", "belum", "masuk", "proses", "keluar"].filter((k) => S[k] != null).map((k) => \`\${md(L(k))} \${fmt(S[k])}\`).join(" · ")}\\n\${md(L("progress"))}: \${pr(S.progress)}\${S.gagal ? \`\\n🚫 \${md(L("gagal"))}: \${S.gagal}\` : ""}\\n━━━━━━━━━━━━━━━━━━━━\\n\${b.groups.map(line).join("\\n\\n")}\`);
        toast("Masuk antrean Telegram");
      };
      function cfgUi() {
        if (cfg.blind == null) cfg.blind = true;
        $("swBlind").checked = !!cfg.blind;
      }
      $("swBlind").onchange = () => {
        cfg.blind = $("swBlind").checked;
        sv(K_CFG, cfg);
        renderBins();
        toast(cfg.blind ? "Mode hitung buta aktif" : "Mode hitung buta mati");
      };

`,Vp=`/* Dashboard Delivery (Beranda)
   Panel realtime dari tab dashboard spreadsheet delivery (sel dibaca dari posisi tetap, sama dengan tata letak "DASHBOARD NEW").
   Memakai monCSV / monUrls dari 92-monitoring.js. Alamat sheet diisi per perangkat (tidak ditulis di kode). */
      const K_DLV = "warehouse_so_dlv_v1",
        K_DLVC = "warehouse_so_dlvc_v1";
      const dlvS = ld(K_DLV, {});
      let dlv = { url: dlvS.url || WMS_CONFIG.deliveryUrl || "", auto: dlvS.auto == null ? 1 : dlvS.auto };
      let dlvCache = ld(K_DLVC, null), // { at, rows }
        dlvBusy = false,
        dlvErr = "",
        dlvTimer = 0;
      const dlvCI = (c) => {
        let n = 0;
        for (const ch of c) n = n * 26 + ch.charCodeAt(0) - 64;
        return n - 1;
      };
      function dlvC(a) {
        const m = /^([A-Z]+)(\\d+)$/.exec(a);
        if (!m || !dlvCache) return "";
        const r = dlvCache.rows[+m[2] - 1];
        return r ? String(r[dlvCI(m[1])] ?? "").trim() : "";
      }
      const dlvV = (a) => dlvC(a) || "–";
      const dlvFirst = (row, from, to) => {
        for (let i = dlvCI(from); i <= dlvCI(to); i++) {
          const v = dlvCache.rows[row - 1] && String(dlvCache.rows[row - 1][i] ?? "").trim();
          if (v && v !== "-") return v;
        }
        return "";
      };
      function dlvPct(a) {
        const raw = dlvC(a),
          n = parseFloat(raw.replace("%", "").replace(",", "."));
        if (!isFinite(n)) return null;
        return /%/.test(raw) ? n : n <= 1.5 ? n * 100 : n;
      }
      const dlvBar = (p) => (p == null ? "" : \`<div class="pbar"><i style="width:\${Math.max(0, Math.min(100, p))}%"></i></div>\`);
      const dlvKv = (l, v, cls) => \`<div class="\${cls || ""}"><small>\${esc(l)}</small><strong>\${esc(v)}</strong></div>\`;
      const dlvN = (a) => monNum(dlvC(a));
      const dlvCard = (t, body, right) => \`<section class="dcard"><div class="dtop"><h3>\${esc(t)}</h3>\${right || ""}</div>\${body}</section>\`;
      const dlvRow = (title, sub, val, cls) => \`<div class="lrow"><div class="lt"><b>\${esc(title)}</b>\${sub ? \`<small>\${esc(sub)}</small>\` : ""}</div>\${val ? \`<span class="pill2 \${cls || "pd"}">\${esc(val)}</span>\` : ""}</div>\`;
      function dlvKpi(cls, v, lb, sub) {
        return \`<div class="kc \${cls}"><div class="kh"><span class="ki">\${monIco[cls]}</span><b>\${v == null ? "–" : esc(fmt(v))}</b></div><div class="kl">\${esc(lb)}</div><span class="dchip\${sub ? "" : " eq"}">\${sub ? esc(sub) : "–"}</span></div>\`;
      }
      const dlvOpen = {}; // key -> true/false (pilihan pengguna, bertahan antar muat ulang)
      const dlvFold = (key, t, sum, def, body) => \`<details class="dcard dfold" data-k="\${key}"\${(dlvOpen[key] == null ? def || innerWidth >= 900 : dlvOpen[key]) ? " open" : ""}><summary><h3>\${esc(t)}</h3>\${sum ? \`<span class="dsum">\${esc(sum)}</span>\` : ""}</summary>\${body}</details>\`;
      const dlvAny = (...cells) => cells.some((c) => dlvC(c));
      // "1.228,97" / "1228,97" / "97,6%" -> angka
      const dlvNum = (s) => {
        let t = String(s || "").replace(/[%\\s]/g, "");
        if (!t) return null;
        if (/,/.test(t)) t = t.replace(/\\./g, "").replace(",", ".");
        const n = parseFloat(t);
        return isFinite(n) ? n : null;
      };
      const dlvPctStr = (raw) => {
        const n = dlvNum(raw);
        return n == null ? null : /%/.test(raw) ? n : n <= 1.5 ? n * 100 : n;
      };
      // nilai pertama berbentuk angka/jam/persen di kolom (atau beberapa kolom) pada rentang baris. Tahan terhadap sel gabungan yang pojok kirinya bergeser 1 baris.
      function dlvRng(cols, r1, r2) {
        for (const col of [].concat(cols)) for (let r = r1; r <= r2; r++) {
          const v = dlvC(col + r);
          if (v && /^[-+]?\\d[\\d.,:]*%?$/.test(v)) return v;
        }
        return "";
      }
      // nama bulan ringkasan ("NOVEMBER 2026") di sekitar pojok kanan atas dashboard
      function dlvMonth() {
        for (let r = 7; r <= 10; r++) for (let c = dlvCI("AL"); c <= dlvCI("AU"); c++) {
          const v = String(((dlvCache.rows[r - 1] || [])[c]) ?? "").trim();
          if (/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\\s+\\d{4}/i.test(v)) return v;
        }
        return "";
      }
      function dlvHtml() {
        const V = dlvV,
          tot = dlvN("B28"),
          kel = dlvN("N43"),
          prs = dlvN("J43"),
          msk = dlvN("F43"),
          bel = dlvN("B43"),
          share = (n) => (n != null && tot ? Math.round((n / tot) * 100) + "% dari total" : "");
        const kpi = \`<div class="kcs">\${dlvKpi("tot", tot, "Total Mobil", tot != null && kel != null ? (tot <= 0 ? "Belum ada mobil" : tot - kel > 0 ? tot - kel + " belum keluar" : "Semua keluar") : "")}\${dlvKpi("ok", kel, "Mobil Keluar", share(kel))}\${dlvKpi("wip", prs, "Mobil Proses", share(prs))}</div>\`;
        const segs = [["Keluar", kel || 0, "#0a5bd3"], ["Proses", prs || 0, "#f5a623"], ["Masuk", Math.max(0, (msk || 0) - (kel || 0) - (prs || 0)), "#2e9e68"], ["Belum masuk", bel || 0, "#9aa5b8"], ["Tidak masuk", Math.max(0, (dlvN("S33") || 0) - (bel || 0)), "#d32f2f"]],
          sum = segs.reduce((a, q) => a + q[1], 0),
          C = 2 * Math.PI * 40;
        let off = 0;
        const arcs = sum
          ? segs.map(([, v, c]) => {
              if (!v) return "";
              const len = (v / sum) * C,
                r = \`<circle cx="50" cy="50" r="40" fill="none" stroke="\${c}" stroke-width="14" stroke-dasharray="\${len} \${C - len}" stroke-dashoffset="\${-off}" transform="rotate(-90 50 50)"/>\`;
              off += len;
              return r;
            }).join("")
          : '<circle cx="50" cy="50" r="40" fill="none" stroke="#e6edf3" stroke-width="14"/>';
        const pct = tot || sum ? Math.round(((kel || 0) / (tot || sum)) * 100) : 0,
          pm = dlvPct("P34");
        const jenis = [["F28", "J28"], ["F30", "J30"], ["F32", "J32"], ["F34", "J34"]]
          .filter(([n]) => dlvC(n))
          .map(([n, j]) => \`<span>\${esc(dlvC(n))}: <b>\${esc(V(j))}</b></span>\`)
          .join("");
        const jam = [["M26", "P26"], ["M28", "P28"], ["M30", "P30"], ["M32", "P32"]]
          .filter(([h]) => dlvC(h))
          .map(([h, p]) => \`<span>\${esc(dlvC(h))} → <b>\${esc(V(p))}</b></span>\`)
          .join("");
        const D = (x) => x || "–";
        // blok yang pojok sel gabungannya bisa bergeser 1 baris: ambil nilai (angka/jam/persen) pertama pada rentang baris
        const pMsk = dlvRng(["P", "Q"], 53, 54),
          pPrs = dlvRng(["P", "Q"], 55, 56),
          pKel = dlvRng(["P", "Q"], 57, 58),
          prog = [["Mobil masuk", pMsk, "#2e9e68"], ["Mobil proses", pPrs, "#f5a623"], ["Mobil keluar", pKel, "#0a5bd3"]].filter(([, v]) => v),
          progHtml = prog.length
            ? \`<div class="lh">Progress delivery</div>\` + prog.map(([l, v, c]) => \`<div class="prow"><span>\${esc(l)}</span><div class="pbar"><i style="width:\${Math.max(0, Math.min(100, dlvPctStr(v) || 0))}%;background:\${c}"></i></div><b>\${esc(v)}</b></div>\`).join("")
            : pm != null ? \`<div class="fine mt">Progres keluar dari mobil masuk \${esc(V("P34"))}</div>\${dlvBar(pm)}\` : "";
        const status = dlvCard(
          "Status Mobil",
          \`<div class="dnut"><svg viewBox="0 0 100 100" role="img" aria-label="\${pct}% keluar">\${arcs}<text x="50" y="52" text-anchor="middle" class="dv">\${pct}%</text><text x="50" y="64" text-anchor="middle" class="ds">Keluar</text></svg><div class="dnl">\${segs.map(([lb, v, c]) => \`<div><i style="background:\${c}"></i><span>\${lb}</span><b>\${esc(fmt(v))}</b><span class="p">\${sum ? Math.round((v / sum) * 100) : 0}%</span></div>\`).join("")}</div></div>\` +
            progHtml +
            (jenis ? \`<div class="dchips"><small>Jenis mobil</small>\${jenis}</div>\` : "") +
            (jam ? \`<div class="dchips"><small>Jam keluar mobil</small>\${jam}</div>\` : ""),
        );
        const waktu = !dlvAny("F8", "B13", "E20", "J10") ? "" : dlvCard(
          "Waktu Penting",
          \`<div class="mg5 m4">\${dlvKv("Jam update", V("F8"))}\${dlvKv("Finish loading", V("B13"))}\${dlvKv("Selesai SJ deliv (dalam kota)", V("E20"))}\${dlvKv("Total finish delivery", V("J10"))}</div>\`,
          dlvC("AJ2") ? \`<span class="dsum">\${esc(dlvC("AJ2"))}</span>\` : "",
        );
        const kota = { tot: dlvRng("B", 19, 21), gap: dlvRng("J", 20, 22), plan: dlvRng("M", 20, 22), dlv: dlvRng("P", 20, 22) },
          lt14 = dlvRng("J", 13, 16),
          tRows =
            (dlvAny("S12", "W12") ? dlvRow("Tonase delivery", "Plan " + V("S12") + " · Aktual " + V("W12") + " · Selisih " + V("AA14"), V("AD14"), "wip") : "") +
            (dlvAny("S19", "W19") ? dlvRow("Omzet", "Plan " + V("S19") + " · Aktual " + V("W19"), V("AA19"), "ok") : "") +
            (dlvAny("S25", "W25") ? dlvRow("Non omzet", "Plan " + V("S25") + " · Aktual " + V("W25"), V("AA25"), "pd") : "") +
            (kota.tot || kota.plan || kota.dlv ? dlvRow("Dalam kota", "Total " + D(kota.tot) + " · Plan " + D(kota.plan) + " · Deliv " + D(kota.dlv), "Gap " + D(kota.gap), "pd") : "") +
            (lt14 ? dlvRow("Mobil masuk > 14:00", "Hari ini", lt14 + " mobil", "wip") : "");
        const tonase = tRows ? dlvCard("Tonase Delivery Hari Ini", tRows) : "";
        const gagal = [];
        for (let r = 35; r <= 47; r += 2) {
          const n = dlvFirst(r, "AA", "AD"),
            c = dlvC("AE" + r);
          if (n) gagal.push(dlvRow(n, "", /^\\d+$/.test(c) ? c + " mobil" : c || "Gagal", "red"));
        }
        const under = [];
        for (let r = 54; r <= 70; r += 2) {
          const n = dlvFirst(r, "Y", "AA"),
            al = dlvFirst(r, "AB", "AF");
          if (n) under.push(dlvRow(n, "", al || "Under", "wip"));
        }
        const underNow = dlvRng("S", 53, 58),
          belum = dlvC("S33"),
          nAb = (dlvNum(belum) || 0) + (dlvNum(underNow) || 0) + (dlvNum(lt14) || 0);
        const abn = !belum && !underNow && !lt14 && !gagal.length && !under.length ? "" : dlvFold(
          "abn",
          "Abnormal Hari Ini",
          "Belum masuk " + D(belum) + " · Under tonage " + D(underNow) + " · >14:00 " + D(lt14),
          nAb > 0 || gagal.length > 0 || under.length > 0,
          \`<div class="mg5">\${dlvKv("Belum / tidak masuk", D(belum), "c-gagal")}\${dlvKv("Under tonage", D(underNow), "c-proses")}\${dlvKv("Mobil masuk > 14:00", D(lt14), "c-masuk")}</div>\` +
            (dlvAny("S39", "V39", "S46", "V46") ? \`<div class="dchips"><small>Belum / tidak masuk per jenis</small><span>BOX: <b>\${esc(V("S39"))}</b></span><span>FUSO: <b>\${esc(V("V39"))}</b></span><span>CONTAINER: <b>\${esc(V("S46"))}</b></span><span>TRONTON: <b>\${esc(V("V46"))}</b></span></div>\` : "") +
            (gagal.length ? \`<div class="lh">Agen gagal masuk</div>\${gagal.join("")}\` : "") +
            (under.length ? \`<div class="lh">Under tonage</div>\${under.join("")}\` : ""),
        );
        const mon = dlvMonth(),
          pTon = (() => { const a = dlvNum(dlvC("AL19")), q = dlvNum(dlvC("AL17")); return a != null && q ? (a / q) * 100 : null; })(),
          pMob = dlvPct("AR13");
        const bulan = !dlvAny("AL13", "AL15", "AL17", "AL19", "AR13", "AR19", "AL23") ? "" : dlvFold(
          "bln",
          "Ringkasan Bulan Ini" + (mon ? " · " + mon : ""),
          "Mobil " + V("AR13") + " · Tonase " + (pTon != null ? pTon.toFixed(1).replace(".", ",") + "%" : "–"),
          false,
          \`<div class="fine">Planning vs actual mobil · \${esc(V("AL15"))} dari \${esc(V("AL13"))}</div>\${dlvBar(pMob)}<div class="bn">\${esc(V("AR13"))}</div>\` +
            \`<div class="fine mt">Planning vs actual tonase · \${esc(V("AL19"))} dari \${esc(V("AL17"))}</div>\${dlvBar(pTon)}<div class="bn">\${pTon != null ? esc(pTon.toFixed(1).replace(".", ",") + "%") : "–"}</div>\` +
            \`<div class="fine mt">Omzet · actual \${esc(V("AR17"))}</div>\${dlvBar(dlvPct("AR19"))}<div class="bn">\${esc(V("AR19"))}</div>\` +
            \`<div class="lh">Rata-rata per hari</div><div class="mg5 m4">\${dlvKv("Mobil", V("AL23"))}\${dlvKv("Ton plan", V("AR23"))}\${dlvKv("Ton actual", V("AR25"))}\${dlvKv("Ton omzet", V("AR27"))}</div>\` +
            \`<div class="mg5">\${dlvKv("Finish kota", V("AL25"))}\${dlvKv("Finish loading", V("AL27"))}\${dlvKv("Finish delivery", V("AL29"))}</div>\` +
            \`<div class="lh">Total abnormal bulan ini</div><div class="mg5">\${dlvKv("Gagal masuk", V("AL33"), "c-gagal")}\${dlvKv("Under tonage", V("AL35"), "c-proses")}\${dlvKv("Mobil > 14:00", V("AL37"), "c-masuk")}</div>\`,
        );
        const rank = [["Mobil terbanyak", "AL41", "AO41"], ["Tonase terberat", "AL43", "AO43"], ["Loading terlama", "AL45", "AO45"], ["Delivery terlama", "AL47", "AO47"]]
          .filter(([, v]) => dlvC(v))
          .map(([l, v, d]) => dlvRow(l, dlvC(d), dlvC(v), "ok"))
          .join("");
        const dest = dlvC("AG53") ? dlvRow("Tujuan terbanyak", V("AL55") + " mobil · " + V("AL57") + " ton", dlvC("AG53"), "pd") : "";
        const rec = rank + dest ? dlvFold("rek", "Rekor Harian & Destinasi", "", false, rank + dest) : "";
        return kpi + status + waktu + tonase + abn + bulan + rec;
      }
      let dlvLast = ""; // HTML terakhir yang dipasang: tidak dipasang ulang bila sama (tanpa kedip, scroll dan kartu terbuka tetap)
      /* Pembaruan per-elemen untuk layar TV: hanya simpul yang berubah disentuh, sisanya tetap.
         Layar tidak berkedip, donat & bar bergeser halus (transisi CSS), angka yang berubah menyala sebentar. */
      const TV_ROOT = 'class="tv-wrap tv-root"';
      function dlvMorph(root, html) {
        const t = document.createElement("template");
        t.innerHTML = html;
        const calm = matchMedia("(prefers-reduced-motion: reduce)").matches, chg = [];
        const walk = (a, b) => {
          for (let i = 0; i < b.childNodes.length; i++) {
            const nb = b.childNodes[i], na = a.childNodes[i];
            if (!na) { a.appendChild(nb.cloneNode(true)); continue; }
            if (na.nodeType !== nb.nodeType || na.nodeName !== nb.nodeName) { a.replaceChild(nb.cloneNode(true), na); continue; }
            if (nb.nodeType !== 1) { if (na.nodeValue !== nb.nodeValue) { na.nodeValue = nb.nodeValue; if (a.nodeType === 1) chg.push(a); } continue; }
            for (const at of nb.attributes) if (na.getAttribute(at.name) !== at.value && !(at.name === "style" && na.classList.contains("tv-wrap"))) na.setAttribute(at.name, at.value);
            for (const at of [...na.attributes]) if (!nb.hasAttribute(at.name) && at.name !== "style" && !(at.name === "open" && na.nodeName === "DETAILS")) na.removeAttribute(at.name);
            if (!nb.hasAttribute("style") && na.hasAttribute("style") && !na.classList.contains("tv-wrap")) na.removeAttribute("style");
            walk(na, nb);
          }
          while (a.childNodes.length > b.childNodes.length) a.removeChild(a.lastChild);
        };
        walk(root, t.content);
        if (!calm) new Set(chg).forEach((el) => { if (el.isConnected && el.animate) el.animate([{ backgroundColor: "rgba(255,208,0,.55)" }, { backgroundColor: "rgba(255,208,0,0)" }], { duration: 1800, easing: "ease-out" }); });
      }
      const dlvPut = (body, html) => {
        if (html !== dlvLast) {
          if (dlvLast.includes(TV_ROOT) && html.includes(TV_ROOT) && body.firstElementChild && body.firstElementChild.classList.contains("tv-root")) dlvMorph(body, html);
          else body.innerHTML = html;
          requestAnimationFrame(() => { dlvTvScale(); if (document.body.classList.contains("tv")) dlvTvFit(); });
          dlvLast = html;
        }
      };
      const dlvSkel = '<div class="skl-kpi" aria-hidden="true"><div class="skl"></div><div class="skl"></div><div class="skl"></div></div><div class="skl skl-card" aria-hidden="true"></div><div class="visually-hidden" role="status">Memuat dashboard delivery…</div>';
      function dlvRender() {
        const body = $("dlvBody");
        if (!body) return;
        const useTv = !!dlvCache && dlvTvUse(); // desain 4K/TV (93-dash-tv.js)
        document.body.classList.toggle("tvd", useTv);
        $("v-mon").classList.toggle("tvd-on", useTv);
        const msg = dlvErr ? \`<div class="note">\${esc(dlvErr)}</div>\` : "";
        $("dlvRef").disabled = dlvBusy;
        $("dlvRef").textContent = dlvBusy ? "Memuat…" : "Muat ulang dashboard";
        if (!dlvCache) {
          $("dlvAt").className = "sync";
          $("dlvAt").textContent = "";
          $("dlvTitle").textContent = "Hubungkan spreadsheet dashboard delivery";
          dlvPut(body, msg || (dlvBusy ? dlvSkel : '<div class="note info"><b>Dashboard delivery belum terhubung.</b> Isi alamat spreadsheet di "Sumber dashboard delivery" di bawah.<br><button class="btn pri sm mt" id="dlvOpenSet" type="button">Atur sumber data</button></div>'));
          return;
        }
        const age = (Date.now() - dlvCache.at) / 60000,
          stale = dlv.auto && age > dlv.auto * 2 + 1;
        // Beranda hanya berisi dashboard delivery: lencana sinkron panel ini selalu tampil
        const showAt = true;
        $("dlvAt").className = "sync " + (stale ? "old" : "ok");
        $("dlvAt").textContent = showAt ? (stale ? "Data lama" : "Tersinkron") + " · " + new Date(dlvCache.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "";
        const ttl = dlvC("F2"),
          tgl = dlvC("AJ2"),
          jam = dlvC("F8");
        $("dlvTitle").textContent = [ttl && !/^dashboard\\s+delivery$/i.test(ttl) ? ttl : "", tgl, jam ? "update " + jam : ""].filter(Boolean).join(" · ");
        dlvPut(body, useTv ? msg + dlvTvHtml() : msg + dlvHtml());
      }
      async function dlvLoad(manual) {
        if (dlvBusy) return;
        const cands = monUrls(dlv.url);
        if (!cands.length) {
          dlvErr = "";
          return dlvRender();
        }
        dlvBusy = true;
        dlvRender();
        let rows = null,
          last = "";
        for (const u of cands) {
          try {
            const r = await fetch(u, { cache: "no-store" });
            if (!r.ok) throw new Error("HTTP " + r.status);
            const t = await r.text();
            if (/^\\s*<(!doctype|html)/i.test(t)) throw new Error("minta login");
            rows = monCSV(t.replace(/^\uFEFF/, ""));
            break;
          } catch (e) {
            last = e.message;
          }
        }
        dlvBusy = false;
        if (!rows) {
          dlvErr = "Gagal mengambil dashboard delivery (" + last + "). Pastikan dibagikan ke \\"Siapa saja yang memiliki link\\" dan alamatnya memuat tab dashboard (ada gid=…)." + (dlvCache ? " Menampilkan data terakhir." : "");
          if (manual) toast("Gagal memuat dashboard delivery");
          return dlvRender();
        }
        dlvErr = "";
        dlvCache = { at: Date.now(), rows: rows.slice(0, 80).map((r) => r.slice(0, 50)) };
        sv(K_DLVC, dlvCache);
        dlvRender();
        if (manual) toast("Dashboard delivery dimuat");
      }
      function dlvEnter() {
        $("dlvUrl").value = dlv.url;
        $("dlvAuto").value = String(dlv.auto);
        dlvRender();
        if (dlv.url && (!dlvCache || Date.now() - dlvCache.at > 20000)) dlvLoad(false);
        dlvLeave();
        dlvTvSoon();
        if (dlv.auto && dlv.url)
          dlvTimer = setInterval(() => {
            if (!document.hidden) dlvLoad(false);
          }, dlv.auto * 60000);
      }
      function dlvLeave() {
        clearInterval(dlvTimer);
        dlvTimer = 0;
      }
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && !$("v-mon").hidden && dlv.url && dlvCache && Date.now() - dlvCache.at > 30000) dlvLoad(false);
      });
      $("dlvRef").onclick = () => (dlv.url ? dlvLoad(true) : (toast("Isi alamat spreadsheet dulu."), ($("dlvSet").open = true)));
      $("dlvBody").addEventListener("click", (e) => {
        const sm = e.target.closest && e.target.closest("summary"),
          d = sm && sm.parentElement;
        if (d && d.dataset && d.dataset.k) dlvOpen[d.dataset.k] = !d.open; // klik terjadi sebelum browser membuka/menutup
      });
      $("dlvPanel").onclick = (e) => {
        if (e.target.id === "dlvOpenSet") {
          $("dlvSet").open = true;
          $("dlvUrl").focus();
        }
      };
      $("dlvSave").onclick = () => {
        const u = $("dlvUrl").value.trim();
        if (u && !monUrls(u).length) return toast("Alamat tidak valid.");
        if (u !== dlv.url) dlvCache = null;
        dlv = { url: u, auto: +$("dlvAuto").value || 0 };
        sv(K_DLV, dlv);
        linkSnap(); // tautan baru dibagikan ke HP lain lewat sinkron
        if (!u) sv(K_DLVC, null);
        dlvEnter();
        if (u) dlvLoad(true);
      };

      /* Layar TV: sembunyikan menu, tampilkan dashboard penuh (Esc untuk keluar) */
      function dlvTvSet(on) {
        document.body.classList.toggle("tv", on);
        const b = $("dlvTv");
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.textContent = on ? "Keluar layar TV" : "Layar TV";
        dlvRender();
        requestAnimationFrame(() => { dlvTvScale(); dlvTvFit(); });
        if (on && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
        if (!on && document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
      }
      $("dlvTv").onclick = () => dlvTvSet(!document.body.classList.contains("tv"));
      document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && document.body.classList.contains("tv")) dlvTvSet(false); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("tv")) dlvTvSet(false); });
      /* Tautan TV: buka alamat aplikasi dengan ?tv=1 (atau #tv) → langsung Beranda dalam mode Layar TV (desain 4K).
         Untuk bookmark/kiosk di TV; layar penuh tetap butuh satu ketukan "Layar TV" (aturan browser). Esc keluar. */
      if (/[?&]tv=1(&|$)/.test(location.search) || location.hash === "#tv") {
        setTimeout(() => { if (typeof go === "function") go("mon"); if (!document.body.classList.contains("tv")) dlvTvSet(true); }, 400);
      }

      /* Mode TV: perkecil otomatis sampai seluruh dashboard muat satu layar, tanpa scroll */
      function dlvTvFit() {
        const el = $("v-mon");
        if (!el) return;
        el.style.zoom = "";
        if (!document.body.classList.contains("tv") || el.classList.contains("tvd-on")) return; // desain 4K sudah diskalakan sendiri
        let z = parseFloat(getComputedStyle(el).zoom) || 1;
        for (let i = 0; i < 6; i++) {
          const h = document.documentElement.scrollHeight, vh = innerHeight;
          if (h <= vh + 1) break;
          const nz = Math.max(0.5, z * (vh / h) * 0.97);
          if (Math.abs(nz - z) < 0.01) break;
          z = nz;
          el.style.zoom = String(z);
        }
      }
      let dlvRz = 0;
      window.addEventListener("resize", () => { clearTimeout(dlvRz); dlvRz = setTimeout(dlvTvFit, 150); });
`,zp='/* Dashboard Delivery layar 4K / TV: desain "Dashboard Supply Chain Management" satu layar 16:9.\n   Angka dibaca dari sel spreadsheet yang sama dengan kartu Beranda (dlvC / dlvV di 93-dash-delivery.js).\n   Panggung 2400x1350 diskalakan ke layar (transform), jadi tampilan identik di TV 4K, Full HD, atau jendela kecil. */\n      const TV_W = 2400, TV_H = 1350;\n      // desain 4K dipakai: mode Layar TV di layar >= 1000px, atau otomatis di layar sangat lebar (>= 2400px)\n      const dlvTvUse = () => (document.body.classList.contains("tv") ? innerWidth >= 1000 : innerWidth >= TV_W);\n      function dlvTvHtml() {\n        const V = dlvV, D = (x) => x || "–", e = esc;\n        const tot = dlvN("B28"), kel = dlvN("N43"), prs = dlvN("J43"), msk = dlvN("F43");\n        const num = (n) => (n == null ? "–" : String(n));\n        const fp = (n) => n.toFixed(1).replace(".", ",") + "%";\n        const tgl = dlvC("AJ2") || new Date().toLocaleDateString("id-ID"), ttl = dlvC("F2");\n        const title = ttl && !/^dashboard\\s+delivery$/i.test(ttl) ? ttl : "Dashboard Supply Chain Management LA 2026";\n        const mon = dlvMonth();\n        const age = (Date.now() - dlvCache.at) / 60000, stale = dlv.auto && age > dlv.auto * 2 + 1;\n        const sync = (stale ? "Data lama" : "Tersinkron") + " · " + new Date(dlvCache.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });\n        // tonase hari ini\n        const gapN = dlvNum(dlvC("AA14")), gapPct = dlvPctStr(dlvC("AD14"));\n        const gapTxt = dlvC("AA14") ? (gapN != null && gapN < 0 ? "▼ " : gapN > 0 ? "▲ " : "") + dlvC("AA14") : "";\n        const lt14 = dlvRng("J", 13, 16);\n        const kpi = (cls, ico, lb, val, sub, subCls) => `<div class="tv-card tv-kpi ${cls}">${ico ? `<div class="tv-kicon">${ico}</div>` : ""}<div class="tv-kpi-content"><div class="tv-klabel">${e(lb)}</div><div class="tv-kvalue">${e(val)}</div>${sub ? `<div class="tv-ksub ${subCls || ""}">${e(sub)}</div>` : ""}</div></div>`;\n        const kpis =\n          kpi("tv-primary", "🚚", "Total Finish Delivery", V("J10"), "◷  " + tgl) +\n          kpi("", "🏁", "Finish Loading", V("B13"), dlvC("F8") ? "Update " + dlvC("F8") : "") +\n          kpi("", "🚛", "Selesai SJ Dalam Kota", V("E20"), lt14 ? "Mobil masuk > 14:00 : " + lt14 : "") +\n          kpi("", "", "♧ Plan Delivery", V("S12"), "Plan tonase") +\n          kpi("", "", "♧ Act Delivery", V("W12"), gapTxt, gapPct != null && gapPct < 95 ? "tv-amber" : "tv-green") +\n          kpi("tv-success", "🎯", "Gap", V("AD14"), "");\n        // progress delivery\n        const jenis = [["F28", "J28"], ["F30", "J30"], ["F32", "J32"], ["F34", "J34"]].filter(([n]) => dlvC(n))\n          .map(([n, j]) => { const c = dlvN(j); return `<div class="tv-tr"><div class="tv-td tv-l">${e(dlvC(n))}</div><div class="tv-td">${e(V(j))}</div><div class="tv-td">${c != null && tot ? fp((c / tot) * 100) : "–"}</div></div>`; }).join("");\n        const pKel = dlvRng(["P", "Q"], 57, 58) || dlvC("P34"), pKelN = Math.max(0, Math.min(100, dlvPctStr(pKel) || 0));\n        const donutP = tot ? Math.round(((kel || 0) / tot) * 100) : 0;\n        // belum / tidak masuk\n        const gagal = [];\n        for (let r = 35; r <= 47; r += 2) { const n = dlvFirst(r, "AA", "AD"); if (n) gagal.push(n); }\n        const belum = dlvC("S33");\n        const jb = [["BOX", "S39"], ["FUSO", "V39"], ["CONTAINER", "S46"], ["TRONTON", "V46"]].filter(([, c]) => dlvC(c)).map(([l, c]) => l + " " + dlvC(c)).join(" · ");\n        // bulan berjalan\n        const pTon = (() => { const a = dlvNum(dlvC("AL19")), q = dlvNum(dlvC("AL17")); return a != null && q ? fp((a / q) * 100) : "–"; })();\n        const m3 = (a, b, c) => `<div class="tv-metric-grid">${[a, b, c].map(([l, v, g]) => `<div class="tv-metric"><span>${e(l)}</span><strong class="${g ? "tv-green" : ""}">${e(v)}</strong></div>`).join("")}</div>`;\n        const th = (l) => `<div class="tv-th">${e(l)}</div>`, td = (v, g) => `<div class="tv-td ${g ? "tv-green" : ""}">${e(v)}</div>`;\n        const rank = [["Mobil Terbanyak", "AL41", "AO41"], ["Tonase Terbesar", "AL43", "AO43"], ["Loading Terlama", "AL45", "AO45"], ["Delivery Terlama", "AL47", "AO47"]]\n          .map(([l, v, d]) => `<div class="tv-rank-row"><span>${l}</span><b>${e(V(v))}</b><span>${e(D(dlvC(d)))}</span></div>`).join("");\n        const jam = [["M26", "P26"], ["M28", "P28"], ["M30", "P30"], ["M32", "P32"]].filter(([h]) => dlvC(h))\n          .map(([h, p]) => `<span>${e(dlvC(h))} → <b>${e(V(p))}</b></span>`).join("");\n        const ab = [dlvNum(dlvC("AL33")), dlvNum(dlvC("AL35")), dlvNum(dlvC("AL37"))];\n        const abTot = ab.some((x) => x != null) ? ab.reduce((s, x) => s + (x || 0), 0) : null;\n        const row = (l, v, g) => `<div class="tv-summary-row"><span>${e(l)}</span><b class="${g ? "tv-green" : ""}">${e(v)}</b></div>`;\n        return `<div class="tv-wrap tv-root"><div class="tv-stage">\n<div class="tv-header"><div class="tv-brand">RUCIKA<small>Sambungan Berkualitas</small></div>\n<div class="tv-heading"><div class="tv-h1">${e(title)}</div><div class="tv-sub">Plan • Deliver • Perform</div></div>\n<div class="tv-right-head"><div class="tv-date">▦ &nbsp;${e(tgl)}<small class="tv-sync ${stale ? "tv-old" : ""}">${e(sync)}</small></div><div class="tv-logo-mark"><b>★ R</b>Rucika<br><small>Inspiring Innovation</small></div></div></div>\n<div class="tv-kpis">${kpis}</div>\n<div class="tv-main">\n<div class="tv-stack">\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">▥</span>Progress Delivery</div><div class="tv-panel-body">\n  <div class="tv-progress-layout"><div class="tv-donut" style="--p:${donutP}"><div><strong>${num(tot)}</strong><span>Total Mobil</span></div></div>\n  <div class="tv-dt tv-c3"><div class="tv-tr">${th("Jenis Mobil")}${th("Jumlah")}${th("%")}</div>${jenis || `<div class="tv-tr"><div class="tv-td tv-l">–</div><div class="tv-td">–</div><div class="tv-td">–</div></div>`}</div></div>\n  <div class="tv-bar-wrap"><div class="tv-bar-head"><span>Progress Delivery</span><b>${e(D(pKel))}</b></div><div class="tv-bar"><span style="width:${pKelN}%"></span></div></div></div></div>\n <div class="tv-card tv-warn"><div class="tv-panel-title"><span class="tv-ico">⚠</span>Belum / Tidak Masuk</div><div class="tv-panel-body tv-alert-grid"><div class="tv-alert-count"><strong>${e(D(belum))}</strong><span>Mobil</span></div>\n  <div class="tv-alert-list">${gagal.length ? "📍 Lokasi Agen Gagal Masuk<br><b>" + gagal.map(e).join(", ") + "</b>" : "Tidak ada agen gagal masuk"}${jb ? "<br>Jenis: " + e(jb) : ""}</div></div></div>\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🚚</span>Mobil Masuk - Proses - Keluar</div><div class="tv-panel-body tv-flow">\n  <div class="tv-flow-item"><div class="tv-ico">🚛</div><b>Mobil Masuk</b><strong>${num(msk)}</strong></div><div class="tv-arrow">➜</div>\n  <div class="tv-flow-item"><div class="tv-ico">⚙️</div><b>Mobil Proses</b><strong>${num(prs)}</strong></div><div class="tv-arrow">➜</div>\n  <div class="tv-flow-item"><div class="tv-ico">🟢</div><b>Mobil Keluar</b><strong>${num(kel)}</strong></div>${jam ? `<div class="tv-hours"><small>Jam keluar mobil</small>${jam}</div>` : ""}</div></div>\n</div>\n<div class="tv-stack">\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🚚</span>Planning vs Actual${mon ? " · " + e(mon) : ""}</div><div class="tv-panel-body">\n  ${m3(["Plan Mobil", V("AL13")], ["Act Mobil", V("AL15")], ["Realisasi", V("AR13"), 1])}\n  <div class="tv-dt tv-c3 tv-gap"><div class="tv-tr">${th("Plan Tonase")}${th("Act Tonase")}${th("Act Omzet")}</div><div class="tv-tr">${td(V("AL17"))}${td(V("AL19"))}${td(V("AR17"))}</div></div></div></div>\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">⚖</span>Tonase &amp; Selisih Hari Ini</div><div class="tv-panel-body">\n  ${m3(["Plan Omzet", V("S19")], ["Act Omzet", V("W19")], ["Selisih", V("AA14"), 1])}\n  <div class="tv-mini-stats tv-gap"><div class="tv-mini-stat"><span>Plan Non Omzet</span><b>${e(V("S25"))}</b></div><div class="tv-mini-stat"><span>Act Non Omzet</span><b>${e(V("W25"))}</b></div><div class="tv-mini-stat"><span>% Non Omzet</span><b>${e(V("AA25"))}</b></div></div></div></div>\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">📊</span>Summary Bulan ${e(mon || "Ini")}</div><div class="tv-panel-body tv-summary-list">\n  ${row("Act Tonase %", pTon)}${row("Omzet %", V("AR19"), 1)}${row("Rata Mobil / Hari", V("AL23"))}${row("Ton Plan / Hari", V("AR23"))}\n  ${row("Ton Actual / Hari", V("AR25"))}${row("Ton Omzet / Hari", V("AR27"))}${row("Finish Kota rata-rata", V("AL25"))}${row("Finish Loading rata-rata", V("AL27"))}${row("Finish Delivery rata-rata", V("AL29"))}${row("Gap Tonase", V("AD14"))}</div></div>\n</div>\n<div class="tv-stack">\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🏆</span>Rank (Dalam 1 Hari)</div><div class="tv-panel-body">${rank}</div></div>\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🚨</span>Total Abnormal Bulan Ini</div><div class="tv-panel-body tv-mini-stats">\n  <div class="tv-mini-stat"><span>Total</span><b class="tv-big">${abTot == null ? "–" : abTot}</b></div><div class="tv-mini-stat"><span>Gagal Masuk</span><b>${e(V("AL33"))}</b></div><div class="tv-mini-stat"><span>Under Tonage</span><b>${e(V("AL35"))}</b></div><div class="tv-mini-stat"><span>Mobil &gt; 14:00</span><b>${e(V("AL37"))}</b></div></div></div>\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">📍</span>Destinasi Delivery</div><div class="tv-panel-body tv-destination"><div class="tv-city">${e(D(dlvC("AG53")))}</div><div class="tv-ton">Total Mobil<strong>${e(V("AL55"))}</strong>${e(V("AL57"))} Ton</div><div class="tv-city-art">🌆</div></div></div>\n</div>\n</div><div class="tv-footer"></div></div></div>`;\n      }\n      // skala panggung ke lebar (Beranda) atau seluruh layar (mode TV); hanya transform, jadi mulus\n      function dlvTvScale() {\n        const w = document.querySelector("#dlvBody .tv-wrap");\n        if (!w) return;\n        const tv = document.body.classList.contains("tv");\n        const aw = tv ? innerWidth : w.parentElement.clientWidth || innerWidth;\n        const s = Math.min(aw / TV_W, tv ? innerHeight / TV_H : Infinity);\n        w.style.setProperty("--tv-s", s.toFixed(4));\n        w.style.width = Math.floor(TV_W * s) + "px";\n        w.style.height = Math.floor(TV_H * s) + "px";\n      }\n      let dlvTvRaf = 0;\n      const dlvTvSoon = () => { cancelAnimationFrame(dlvTvRaf); dlvTvRaf = requestAnimationFrame(dlvTvScale); };\n      window.addEventListener("resize", () => { dlvTvSoon(); if (dlvCache && dlvTvUse() !== document.body.classList.contains("tvd")) dlvRender(); });\n      document.addEventListener("fullscreenchange", dlvTvSoon);\n',Wp=`/* Aging Stock: state milik legacy supaya ikut sinkron Sheets + cadangan. Tampilan: src/views/AgingView.jsx, logika: src/lib/aging.js */
      /* ---------- aging stock ---------- */
      const K_AG = "warehouse_so_aging_v1";        // cek fisik per rak: { bin: { tumpak, pipa, qty, by, at } }
      const K_AGK = "warehouse_so_agcls_v1";       // kelas pipa per kode item: { kode: { c: "A", at } }
      const K_AGC = "warehouse_so_agingcfg_v1";    // pengaturan: { pic: { A: "nama", ... } }
      let aging = ld(K_AG, {}), agingCls = ld(K_AGK, {}), agingCfg = ld(K_AGC, {});
      (function () {
        const raw = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
        const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
        // cap waktu harus teks ISO (dipakai penggabungan antar perangkat)
        Object.keys(aging).forEach((b) => { const r = aging[b]; if (r && typeof r.at === "number") r.at = new Date(r.at).toISOString(); });
        // pindahan dari kunci versi awal (kelas & nama petugas disimpan terpisah)
        const oc = raw("warehouse_so_aging_cls_v1"), op = raw("warehouse_so_aging_pic_v1");
        if (oc && typeof oc === "object") {
          Object.keys(oc).forEach((k) => { if (!agingCls[k] && typeof oc[k] === "string") agingCls[k] = { c: oc[k], at: nowIso() }; });
          put(K_AGK, agingCls); localStorage.removeItem("warehouse_so_aging_cls_v1");
        }
        if (op && typeof op === "object") { if (!agingCfg.pic) agingCfg.pic = op; put(K_AGC, agingCfg); localStorage.removeItem("warehouse_so_aging_pic_v1"); }
        put(K_AG, aging);
      })();
      if (typeof agingCfg !== "object" || !agingCfg) agingCfg = {};
`,Gp=`/* Tugas Bin
   asal: index-fixd.html baris 6605-6811 */
      /* ---------- tugas bin ---------- */
      function taskBadges() {
        const n = DATA.filter(isTaskPend).length + (typeof tkPendOther === "function" ? tkPendOther() : 0);
        ["dTask", "tTask"].forEach((i) => {
          $(i).hidden = !n;
          $(i).textContent = n;
        });
      }
      function renderTaskBar() {
        const el = $("taskBar"),
          mine = tkMine();
        if (!mine.length) {
          el.innerHTML = "";
          return;
        }
        const pend = mine.filter(isTaskPend).length;
        el.innerHTML = pend
          ? \`<div class="note info">Tugas \${curU ? "Anda" : "semua petugas"}: \${mine.length - pend} dari \${mine.length} selesai.\${lf === "task" ? "" : '<button class="btn pri sm" data-tk="go">Kerjakan tugas</button>'}</div>\`
          : \`<div class="note ok">Semua \${mine.length} tugas selesai.</div>\`;
      }
      $("taskBar").onclick = (e) => {
        if (e.target.closest("[data-tk=go]")) {
          lf = "task";
          renderBins();
        }
      };
      const tkOwned = (t) => users.some((u) => u.id === t.u);
      function tkPick(area, rr) {
        const o = users.filter((u) => u.active !== false && isStaff(u) && u.areas.includes(area));
        if (!o.length) return "";
        const i = (rr[area] = rr[area] || 0);
        rr[area]++;
        return o[i % o.length].id;
      }
      function renderTask() {
        const me = curUser(),
          mine = tkMine(),
          pend = mine.filter(isTaskPend).length,
          un = me ? [] : mine.filter((x) => !tkOwned(tasks[x.bin]));
        $("tkStats").innerHTML = [
          ["Total tugas", mine.length, ""],
          ["Selesai", mine.length - pend, "var(--green)"],
          ["Belum", pend, pend ? "var(--amber)" : ""],
          ["Tanpa petugas", me ? "–" : un.length, un.length ? "var(--red)" : ""],
        ]
          .map(([l, v, c]) => \`<div class="stat"><small>\${l}</small><strong style="\${c ? "color:" + c : ""}">\${v}</strong></div>\`)
          .join("");
        $("tkWho").textContent = me ? "Upload daftar bin saya (" + me.name + ")" : "Upload tugas (admin atau SPV)";
        $("tkLbl").textContent = me ? "Pilih file daftar bin saya" : "Pilih file tugas untuk petugas";
        $("tkHelp").textContent = me
          ? "Kolom wajib: Bin (atau Rak). Semua bin di file menjadi tugas Anda, hanya untuk area yang Anda pegang."
          : 'Kolom wajib: Bin (atau Rak). Kolom Petugas opsional: diisi nama petugas yang sudah terdaftar. Jika kosong, bin dibagi ke petugas pemilik area bin itu. Bin yang sudah pernah diperiksa menjadi tugas hitung ulang.';
        $("tkGo").hidden = !pend || !me;
        const list = me ? users.filter((u) => u.id === me.id) : staff();
        $("tkUsers").innerHTML = list.length
          ? list
              .map((u) => {
                const t = DATA.filter((x) => tasks[x.bin] && tasks[x.bin].u === u.id),
                  d = t.filter((x) => !isTaskPend({ bin: x.bin })).length,
                  pc2 = t.length ? Math.round((d / t.length) * 100) : 0;
                return \`<div class="card"><div class="r"><b class="big">\${esc(u.name)}</b><span class="pill \${t.length && d === t.length ? "green" : ""}">\${t.length ? d + "/" + t.length : "Tidak ada tugas"}</span></div><div class="kb \${t.length && d === t.length ? "ok" : ""}"><i style="width:\${pc2}%"></i></div></div>\`;
              })
              .join("")
          : '<div class="empty">Belum ada petugas. Tambahkan di menu User &amp; Area.</div>';
        $("tkUn").innerHTML = un.length
          ? \`<div class="note">\${un.length} tugas belum punya petugas (area belum ada pemiliknya).<button class="btn pri sm" data-tk="auto">Bagikan sesuai area</button></div>\`
          : "";
        if (!Object.keys(tasks).length) $("tkRes").innerHTML = '<div class="empty">Belum ada tugas. Pilih file daftar bin di atas (kolom Bin atau Rak). Belum punya file? Unduh contoh file dulu.</div>';
        else if ($("tkRes").querySelector(".empty")) $("tkRes").innerHTML = "";
        $("tkClear").textContent = me ? "Hapus tugas saya" : "Hapus semua tugas";
        $("tkClear").disabled = !mine.length && !(typeof tkPendOther === "function" && Object.keys(tasks).length);
        if (typeof renderTkKinds === "function") renderTkKinds();
        if (typeof renderTsk === "function") renderTsk();
      }
      async function tkIngest(rows) {
        const hi = rows.findIndex((r) => r.some((c) => ["bin", "rak"].includes(nrm(c))));
        if (hi < 0) return toast('Kolom "Bin" atau "Rak" tidak ditemukan di file.');
        const H = rows[hi].map(nrm),
          bi = H.findIndex((h) => h === "bin" || h === "rak"),
          ui = H.findIndex((h) => ["petugas", "user", "pic", "nama"].includes(h)),
          byBin = new Map();
        DATA.forEach((x) => {
          byBin.set(String(x.bin).trim().toUpperCase(), x);
          byBin.set(rakFmt(x.bin), x);
        });
        const me = curUser(),
          add = [],
          nf = [],
          cl = [],
          out = [],
          dup = new Set(),
          unk = new Set(),
          seen = new Set(),
          rr = {};
        rows.slice(hi + 1).forEach((r) => {
          const raw = String(r[bi] ?? "").trim();
          if (!raw) return;
          const x = byBin.get(raw.toUpperCase()) || byBin.get(rakFmt(raw));
          if (!x) return nf.push(raw);
          if (seen.has(x.bin)) return dup.add(x.bin);
          seen.add(x.bin);
          if (isClosed(x.area)) return cl.push(x.bin);
          let uid = "";
          if (me) {
            if (!me.areas.includes(x.area)) return out.push(x.bin);
            uid = me.id;
          } else {
            const nm = ui >= 0 ? String(r[ui] ?? "").trim() : "";
            if (nm) {
              const u = staff().find((z) => z.active !== false && z.name.toLowerCase() === nm.toLowerCase());
              if (!u) return unk.add(nm);
              uid = u.id;
            } else uid = tkPick(x.area, rr);
          }
          add.push({ bin: x.bin, u: uid });
        });
        const cut = (a) => a.slice(0, 6).join(", ") + (a.length > 6 ? " dan " + (a.length - 6) + " lagi" : "");
        const warn = [
          nf.length && \`\${nf.length} bin tidak ada di data WMS: \${cut(nf)}\`,
          unk.size && \`Nama petugas tidak dikenal: \${cut([...unk])}. Daftarkan dulu di Petugas & Area.\`,
          cl.length && \`\${cl.length} bin di area yang sudah ditutup dilewati: \${cut(cl)}\`,
          out.length && \`\${out.length} bin di luar area Anda dilewati: \${cut(out)}\`,
          dup.size && \`\${dup.size} bin ganda di file, dipakai satu kali\`,
        ].filter(Boolean);
        $("tkRes").innerHTML = warn.length ? \`<div class="note">\${warn.map(esc).join("<br>")}</div>\` : "";
        if (!add.length) return toast("Tidak ada tugas yang bisa ditambahkan.");
        const noOwner = add.filter((a) => !a.u).length,
          per = {};
        add.forEach((a) => {
          const u = users.find((z) => z.id === a.u);
          per[u ? u.name : "(belum ada petugas)"] = (per[u ? u.name : "(belum ada petugas)"] || 0) + 1;
        });
        const ov = add.filter((a) => tasks[a.bin]).length;
        const msg = Object.entries(per).map(([n, c]) => n + ": " + c + " bin").join(", ") + "." + (ov ? " " + ov + " bin sudah punya tugas dan akan diperbarui." : "") + (noOwner ? " " + noOwner + " bin belum ada pemilik area." : "");
        if (!(await ask("Tambah " + add.length + " tugas?", msg, "Tambah tugas"))) return;
        const at = nowIso();
        add.forEach((a) => (tasks[a.bin] = { u: a.u, by: curName() || "Admin", at }));
        sv(K_T, tasks);
        renderTask();
        renderBins();
        metrics();
        toast(add.length + " tugas ditambahkan");
      }
      $("tkFile").onchange = async () => {
        const f = $("tkFile").files[0];
        if (!f) return;
        if (!curU && !(await leadAuth())) {
          $("tkFile").value = "";
          return;
        }
        const rd = new FileReader(),
          x = /\\.xlsx?$/i.test(f.name);
        rd.onload = async () => {
          try {
            let rows;
            if (x) {
              if (!window.XLSX) throw new Error("Pustaka Excel gagal dimuat. Muat ulang aplikasi, atau simpan sebagai CSV lalu upload.");
              const wb = XLSX.read(rd.result, { type: "array" });
              rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "" });
            } else rows = parseCSV(String(rd.result).replace(/^\uFEFF/, ""));
            await tkIngest(rows);
          } catch (e) {
            toast("Gagal membaca file: " + e.message);
          }
          $("tkFile").value = "";
        };
        x ? rd.readAsArrayBuffer(f) : rd.readAsText(f);
      };
      $("tkTpl").onclick = () => {
        const nm = users[0] ? users[0].name : "Nama petugas";
        csvOut([["Bin", "Petugas"], ...DATA.slice(0, 3).map((x, i) => [x.bin, i < 2 ? nm : ""])], "contoh_tugas_bin.csv");
      };
      $("tkGo").onclick = () => {
        lf = "task";
        go("so");
        renderBins();
      };
      $("tkUn").onclick = async (e) => {
        if (!e.target.closest("[data-tk=auto]")) return;
        if (!(await leadAuth())) return;
        const rr = {};
        let n = 0;
        DATA.forEach((x) => {
          const t = tasks[x.bin];
          if (t && !tkOwned(t)) {
            const u = tkPick(x.area, rr);
            if (u) {
              t.u = u;
              n++;
            }
          }
        });
        sv(K_T, tasks);
        renderTask();
        renderBins();
        metrics();
        toast(n ? n + " tugas dibagikan" : "Belum ada petugas yang memegang area itu");
      };
      $("tkClear").onclick = async () => {
        const me = curUser();
        if (!me && !(await leadAuth())) return;
        const mine = tkMine(), oth = Object.keys(tasks).filter((k) => /^(AG|DC)\\|/.test(k) && (!me || tasks[k].u === me.id));
        if (!mine.length && !oth.length) return;
        if (!(await ask(me ? "Hapus tugas saya?" : "Hapus semua tugas?", mine.length + oth.length + " tugas dihapus (bin, aging, DC). Hasil pemeriksaan tidak ikut terhapus.", "Hapus", true))) return;
        mine.forEach((x) => delete tasks[x.bin]);
        oth.forEach((k) => delete tasks[k]);
        sv(K_T, tasks);
        renderTask();
        renderBins();
        metrics();
        toast("Tugas dihapus");
      };
`,Yp=`/* Tugas Aging (per rak) dan DC (per item) + delegasi admin.
   Disimpan di objek \`tasks\` dengan kunci berawalan "AG|<rak>" dan "DC|<item>", jadi ikut sinkron seperti tugas bin.
   Selesai otomatis: Aging = cek rak tersimpan setelah tugas dibuat; DC = item DC selesai dicek setelah tugas dibuat. */
      const tkIso = (v) => String(v || "");
      const tkAgDone = (bin) => { const t = tasks["AG|" + bin], a = aging[bin]; return !!(t && a && tkIso(a.at) >= tkIso(t.at)); };
      const tkDcDone = (item) => { const t = tasks["DC|" + item], r = dc[item]; return !!(t && r && r.done && tkIso(r.at) >= tkIso(t.at)); };
      const tkAgOpen = (bin) => { const t = tasks["AG|" + bin]; return !!t && !tkAgDone(bin) && (!curU || t.u === curU); };
      const tkDcOpen = (item) => { const t = tasks["DC|" + item]; return !!t && !tkDcDone(item) && (!curU || t.u === curU); };
      const tkOf = (kind) => Object.keys(tasks).filter((k) => k.startsWith(kind + "|")).map((k) => ({ id: k.slice(kind.length + 1), t: tasks[k] }));
      const tkKindStat = (kind, uid) => {
        const L = tkOf(kind).filter((e) => !uid || e.t.u === uid), done = L.filter((e) => (kind === "AG" ? tkAgDone(e.id) : tkDcDone(e.id))).length;
        return { total: L.length, done, pend: L.length - done };
      };
      const tkPendOther = () => tkOf("AG").filter((e) => tkAgOpen(e.id)).length + tkOf("DC").filter((e) => tkDcOpen(e.id)).length;

      /* ---- delegasi admin ---- */
      const dgState = () => ({ kind: $("dgKind").value, area: $("dgArea").value, sig: $("dgSig").value, user: $("dgUser").value, scope: $("dgScope").value, show: $("dgShow").value });
      function dgPlan() {
        const g = dgState(), rr = {}, out = [];
        const pickU = (area) => (g.user === "auto" ? tkPick(area, rr) : g.user);
        if (g.kind === "bin") {
          DATA.forEach((x) => { if ((!g.area || x.area === g.area) && !counts[x.bin] && !isClosed(x.area)) out.push({ key: x.bin, u: pickU(x.area), show: g.show === "" ? undefined : g.show === "tampil" }); });
        } else if (g.kind === "AG") {
          const rows = DATA.filter((x) => !g.area || x.area === g.area);
          const L = WMSLib.agingChecklist(rows, g.sig === "all" ? "all" : "watch").filter((x) => g.sig !== "merah" || WMSLib.normSignal(x.sinyal) === "Merah");
          L.forEach((x) => { if (g.scope === "all" || !aging[x.bin]) out.push({ key: "AG|" + x.bin, u: pickU(x.area) }); });
        } else {
          dcItems().filter((e) => dcPick[e.item]).forEach((e) => {
            const r = dc[e.item];
            if (g.scope === "all" || !r || !r.done) { const b = DATA.find((x) => x.item === e.item); out.push({ key: "DC|" + e.item, u: pickU(b ? b.area : "") }); }
          });
        }
        return out;
      }
      function renderDg() {
        if (!$("tkDlg")) return;
        const admin = !curUser();
        $("tkDlg").hidden = !admin;
        if (!admin) return;
        const g = dgState();
        $("dgAreaW").hidden = g.kind === "DC";
        $("dgSigW").hidden = g.kind !== "AG";
        $("dgScopeW").hidden = g.kind === "bin";
        $("dgShowW").hidden = g.kind !== "bin";
        const plan = dgPlan(), no = plan.filter((p) => !p.u).length;
        $("dgInfo").innerHTML = g.kind === "DC" && !Object.keys(dcPick).length
          ? "Belum ada item DC terpilih. Pilih dulu lewat DC Harian, tombol Pilih item DC."
          : plan.length
          ? \`<b>\${fmt(plan.length)}</b> tugas akan dibuat\${no ? \`, <b>\${fmt(no)}</b> belum punya petugas (area belum ada pemiliknya)\` : ""}.\`
          : "Tidak ada yang perlu ditugaskan dengan pilihan ini.";
        $("dgGo").disabled = !plan.length || no === plan.length;
      }
      function dgFill() {
        const ca = $("dgArea").value;
        $("dgArea").innerHTML = '<option value="">Semua area</option>' + allAreas().map((a) => \`<option value="\${esc(a)}">\${esc(a)}</option>\`).join("");
        $("dgArea").value = [...$("dgArea").options].some((o) => o.value === ca) ? ca : "";
        const cur = $("dgUser").value || "auto";
        $("dgUser").innerHTML = '<option value="auto">Otomatis (pemilik area)</option>' + staff().filter((u) => u.active !== false).map((u) => \`<option value="\${esc(u.id)}">\${esc(u.name)}</option>\`).join("");
        $("dgUser").value = [...$("dgUser").options].some((o) => o.value === cur) ? cur : "auto";
      }
      ["dgKind", "dgArea", "dgSig", "dgUser", "dgScope", "dgShow"].forEach((i) => ($(i).onchange = renderDg));
      $("dgGo").onclick = async () => {
        if (!(await leadAuth())) return;
        const plan = dgPlan().filter((p) => p.u);
        if (!plan.length) return;
        const per = {};
        plan.forEach((p) => { const u = users.find((z) => z.id === p.u); per[u ? u.name : "?"] = (per[u ? u.name : "?"] || 0) + 1; });
        const lbl = { bin: "tugas bin", AG: "tugas aging", DC: "tugas DC" }[$("dgKind").value];
        if (!(await ask("Buat " + plan.length + " " + lbl + "?", Object.entries(per).map(([n, c]) => n + ": " + c).join(", ") + ". Tugas yang sudah ada untuk item yang sama diperbarui.", "Buat tugas"))) return;
        const at = nowIso();
        plan.forEach((p) => {
          const rec = { u: p.u, by: curName() || "Admin", at };
          if (p.show !== undefined) rec.show = p.show;
          tasks[p.key] = rec;
        });
        sv(K_T, tasks);
        taskBadges(); renderTask(); renderBins(); metrics();
        if (typeof WMS !== "undefined" && WMS.emit) WMS.emit();
        toast(plan.length + " " + lbl + " dibuat");
      };

      /* ---- ringkasan Aging & DC per petugas (halaman Tugas) ---- */
      function renderTkKinds() {
        const el = $("tkKinds");
        if (!el) return;
        dgFill();
        renderDg();
        const me = curUser(), list = me ? users.filter((u) => u.id === me.id) : staff();
        const rows = list.map((u) => ({ u, ag: tkKindStat("AG", u.id), dcs: tkKindStat("DC", u.id) })).filter((r) => r.ag.total || r.dcs.total);
        const bar = (s) => \`<div class="bar"><i style="width:\${s.total ? Math.round((s.done / s.total) * 100) : 0}%"></i></div>\`;
        el.innerHTML = rows.length
          ? rows.map((r) => \`<div class="card"><div class="r"><b class="big">\${esc(r.u.name)}</b></div>
              \${r.ag.total ? \`<div class="r"><span>Aging per rak</span><span class="pill \${r.ag.pend ? "" : "green"}">\${r.ag.done}/\${r.ag.total}</span></div>\${bar(r.ag)}\` : ""}
              \${r.dcs.total ? \`<div class="r"><span>DC per item</span><span class="pill \${r.dcs.pend ? "" : "green"}">\${r.dcs.done}/\${r.dcs.total}</span></div>\${bar(r.dcs)}\` : ""}</div>\`).join("") +
            (me ? \`<div class="row-act">\${tkKindStat("AG", me.id).pend ? '<button class="btn pri" data-tkk="AG">Kerjakan Aging</button>' : ""}\${tkKindStat("DC", me.id).pend ? '<button class="btn pri" data-tkk="DC">Kerjakan DC</button>' : ""}</div>\` : "")
          : '<div class="empty">Belum ada tugas aging atau DC.</div>';
      }
      $("tkKinds").onclick = (e) => {
        const b = e.target.closest("[data-tkk]");
        if (!b) return;
        if (b.dataset.tkk === "DC") { dcF = "task"; go("dc"); }
        else { WMS.agiFocus = true; go("agi"); }
      };
`,Qp=`/* Menu Task: daftar tugas dari admin (bin, aging per rak, DC per item) untuk dikerjakan petugas.
   Admin/SPV melihat semua tugas atau tugas satu petugas, bisa ganti petugas dan hapus per tugas. */
      let tskF = "todo", tskU = "";
      const TSK_KIND = { bin: "Periksa bin", AG: "Aging rak", DC: "DC item" };
      const tskRel = (iso) => {
        const t = Date.parse(iso);
        if (!t) return "";
        const m = Math.max(0, Math.round((Date.now() - t) / 60000));
        return m < 1 ? "baru saja" : m < 60 ? m + " menit lalu" : m < 1440 ? Math.round(m / 60) + " jam lalu" : Math.round(m / 1440) + " hari lalu";
      };
      function tskItems(uid) {
        const out = [], dcl = typeof dcItems === "function" ? dcItems() : [];
        Object.keys(tasks).forEach((key) => {
          const t = tasks[key];
          if (!t || (uid && t.u !== uid)) return;
          let kind = "bin", id = key;
          if (key.startsWith("AG|")) { kind = "AG"; id = key.slice(3); }
          else if (key.startsWith("DC|")) { kind = "DC"; id = key.slice(3); }
          const it = { key, kind, id, u: t.u, by: t.by, at: t.at };
          if (kind === "bin") {
            const x = DATA.find((d) => d.bin === id);
            if (!x) return;
            it.done = !isTaskPend({ bin: id });
            it.title = id;
            it.sub = (x.item || "") + " · Area " + x.area;
            it.prio = 2;
          } else if (kind === "AG") {
            const x = DATA.find((d) => d.bin === id);
            if (!x) return;
            it.done = tkAgDone(id);
            it.title = id;
            it.sub = (x.item || "") + " · " + (x.aging != null ? x.aging + " hari" : "") + (x.sinyal ? " · " + x.sinyal : "");
            it.prio = /merah/i.test(x.sinyal || "") ? 0 : /kuning/i.test(x.sinyal || "") ? 1 : 2;
          } else {
            const e = dcl.find((d) => d.item === id);
            it.done = tkDcDone(id);
            it.title = id;
            it.sub = e ? "Kode " + e.kode : "";
            it.prio = 2;
          }
          out.push(it);
        });
        return out.sort((a, b) => a.done - b.done || a.prio - b.prio || String(a.at).localeCompare(String(b.at)));
      }
      function renderTsk() {
        if (!$("tskList")) return;
        const me = curUser(), admin = !me;
        $("tskWhoW").hidden = !admin;
        $("tskAdminH").hidden = !admin && !!me && false;
        if (admin) {
          const cur = tskU;
          $("tskUser").innerHTML = '<option value="">Semua petugas</option>' + staff().map((u) => \`<option value="\${esc(u.id)}">\${esc(u.name)}</option>\`).join("");
          $("tskUser").value = [...$("tskUser").options].some((o) => o.value === cur) ? cur : "";
          tskU = $("tskUser").value;
        }
        const all = tskItems(me ? me.id : tskU), pend = all.filter((x) => !x.done), done = all.length - pend.length;
        const pct = all.length ? Math.round((done / all.length) * 100) : 0;
        const nk = (k) => pend.filter((x) => x.kind === k).length;
        $("tskSum").innerHTML = all.length
          ? \`<div class="tsk-ring \${pend.length ? "" : "ok"}" style="--p:\${pct}"><b>\${pct}%</b></div>
             <div><h3>\${pend.length ? fmt(pend.length) + " tugas menunggu" : "Semua tugas selesai"}</h3>
             <p class="fine">\${done} dari \${all.length} selesai\${pend.length ? " · bin " + nk("bin") + " · aging " + nk("AG") + " · DC " + nk("DC") : ""}</p></div>\${admin ? '<button class="btn sec sm tsk-new" id="tskJump" type="button">+ Buat tugas</button>' : ""}\`
          : admin ? '<button class="btn pri tsk-new" id="tskJump" type="button">+ Buat tugas</button>' : "";
        const flt = { todo: pend, all, done: all.filter((x) => x.done), bin: all.filter((x) => x.kind === "bin"), AG: all.filter((x) => x.kind === "AG"), DC: all.filter((x) => x.kind === "DC") };
        if (!all.length) tskF = "todo";
        $("tskChips").innerHTML = all.length
          ? chipsHtml(tskF, [["todo", "Belum", pend.length], ["bin", "Bin", flt.bin.length], ["AG", "Aging", flt.AG.length], ["DC", "DC", flt.DC.length], ["done", "Selesai", flt.done.length], ["all", "Semua", all.length]])
          : "";
        const list = flt[tskF] || pend, uname = (id) => (users.find((u) => u.id === id) || {}).name || "?";
        $("tskList").innerHTML = !all.length
          ? \`<div class="empty">\${admin ? "Belum ada tugas. Buat di bagian Kelola tugas di bawah." : "Belum ada tugas untuk Anda. Tugas dari admin akan muncul di sini."}</div>\`
          : list.length
          ? list.map((x) => {
              const sg = x.kind === "AG" ? ((/merah/i.test(x.sub) && "merah") || (/kuning/i.test(x.sub) && "kuning") || "") : "";
              return \`<div class="card tsk k-\${x.kind}\${x.done ? " done" : ""}" data-key="\${esc(x.key)}" role="button" tabindex="0" aria-label="\${x.done ? "Lihat" : "Kerjakan"} \${TSK_KIND[x.kind]} \${esc(x.title)}">
              <div class="tk-top"><span class="tk-kind">\${TSK_KIND[x.kind]}</span><b class="tk-title">\${esc(x.title)}</b><span class="tk-st \${x.done ? "ok" : "wait"}">\${x.done ? "Selesai" : "Menunggu"}</span></div>
              <div class="tk-sub">\${esc(x.sub)}</div>
              <div class="tk-meta"><span>\${esc(x.by || "Admin")} · \${tskRel(x.at)}\${admin ? " · " + esc(uname(x.u)) : ""}</span>\${sg ? \`<i class="tk-sig \${sg}">\${sg}</i>\` : ""}<span class="tk-go" data-tsk="go">\${x.done ? "Lihat" : "Kerjakan"} ›</span></div>
              \${admin ? \`<details class="tk-more"><summary>Kelola</summary><div class="tk-mgr"><select class="sm" data-tsk="re" aria-label="Ganti petugas">\${staff().map((u) => \`<option value="\${esc(u.id)}"\${u.id === x.u ? " selected" : ""}>\${esc(u.name)}</option>\`).join("")}</select><button class="btn dng sm" data-tsk="del" type="button">Hapus</button></div></details>\` : ""}</div>\`;
            }).join("")
          : \`<div class="empty">Tidak ada tugas di filter ini.</div>\`;
      }
      function tskOpen(it) {
        if (it.kind === "bin") { go("so"); open(it.id); }
        else if (it.kind === "AG") { WMS.agiFocus = true; WMS.agiTarget = it.id; go("agi"); }
        else {
          dcF = "task";
          go("dc");
          const e = dcItems().find((d) => d.item === it.id);
          if (e) dcOpen(e);
        }
      }
      $("tskChips").onclick = (e) => { const b = e.target.closest("[data-k]"); if (b) { tskF = b.dataset.k; renderTsk(); } };
      $("tskUser").onchange = () => { tskU = $("tskUser").value; renderTsk(); };
      $("tskSum").onclick = (e) => { if (e.target.closest("#tskJump")) $("tskAdminH").scrollIntoView({ behavior: "smooth", block: "start" }); };
      $("tskList").onkeydown = (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.matches(".card.tsk")) { e.preventDefault(); e.target.click(); } };
      $("tskList").onclick = async (e) => {
        const b = e.target.closest("[data-tsk]"), card = e.target.closest("[data-key]");
        if (!card || e.target.closest(".tk-more")  && !b) return;
        if (e.target.closest("select, summary")) return;
        const it = tskItems("").find((x) => x.key === card.dataset.key);
        if (!it) return;
        if (!b || b.dataset.tsk === "go") return tskOpen(it);
        if (b.dataset.tsk === "del") {
          if (!(await leadAuth())) return;
          if (!(await ask("Hapus tugas ini?", TSK_KIND[it.kind] + " " + it.title + ". Hasil pemeriksaan tidak ikut terhapus.", "Hapus", true))) return;
          delete tasks[it.key];
          sv(K_T, tasks);
          taskBadges(); renderTask(); renderBins(); WMS.emit();
          toast("Tugas dihapus");
        }
      };
      $("tskList").onchange = async (e) => {
        const sel = e.target.closest('[data-tsk="re"]'), card = e.target.closest("[data-key]");
        if (!sel || !card) return;
        const t = tasks[card.dataset.key];
        if (!t) return;
        if (!(await leadAuth())) return renderTsk();
        tasks[card.dataset.key] = { ...t, u: sel.value };
        sv(K_T, tasks);
        taskBadges(); renderTask(); WMS.emit();
        toast("Tugas dipindahkan ke " + ((users.find((u) => u.id === sel.value) || {}).name || "petugas"));
      };
`,Jp=`/* Jembatan: membuka state & helper legacy ke React lewat window.WMS (lihat src/legacy/bridge.js).
   Tambahkan di sini HANYA yang dibutuhkan view React; hapus saat view legacy terakhir selesai dimigrasi. */
      Object.defineProperties(WMS, {
        DATA: { get: () => DATA },
        counts: { get: () => counts },
        view: { get: () => curViewId },
        aging: { get: () => aging },
        agingCls: { get: () => agingCls },
        agingCfg: { get: () => agingCfg },
        dcRec: { get: () => dc },
        muatHist: { get: () => muatHist },
        clrHist: { get: () => clrHist },
        tasks: { get: () => tasks },
        curU: { get: () => curU },
      });
      // Status DC per item (todo/draft/ok/bad) dari fungsi legacy yang sama dengan menu DC Harian, agar angka laporan identik.
      WMS.dcRows = () => dcItems().map((e) => ({ item: e.item, st: dcSt(e), sys: dcSysOf(e), fis: dc[e.item] ? dcFis(dc[e.item].rows) : 0, diff: dc[e.item] ? dcFis(dc[e.item].rows) - dcSysOf(e) : 0, at: dc[e.item] && dc[e.item].at, by: dc[e.item] && dc[e.item].by }));
      Object.assign(WMS, { areas, isClosed, owners, staff, stat, toast, outText, esc, curName, blindFor: isBlindFor, taskBadges: () => taskBadges(), linkSnap, linkApply });
      Object.assign(WMS, {
        setAging(v) { aging = v; sv(K_AG, v); taskBadges(); WMS.emit(); },
        setAgingCls(v) { agingCls = v; sv(K_AGK, v); WMS.emit(); },
        setAgingCfg(v) { agingCfg = v; sv(K_AGC, v); WMS.emit(); },
      });
`,Xp=`/* Sinkron Google Sheets (Apps Script) + start-up aplikasi
   asal: index-fixd.html baris 6812-7147 */
      /* ---------- sinkron Google Sheets (Apps Script) ---------- */
      /* SYNC-BEGIN */
      // Isi dua baris ini jika ingin semua perangkat langsung tersambung tanpa mengetik.
      const SYNC_DEFAULT = { url: WMS_CONFIG.syncUrl, token: WMS_CONFIG.syncToken }; // dari .env (VITE_SYNC_URL / VITE_SYNC_TOKEN), BUKAN ditulis di kode // tempel URL Web app (…/exec) di url sekali saja, semua HP otomatis tersambung
      const K_SYNC = "warehouse_so_sync_v1";
      const SY_STAMP = { counts: "savedAt", dc: "at", tasks: "at", closed: "at", aging: "at", agcls: "at", clrdone: "at" };
      const syKey = { counts: K_C, dc: K_D, tasks: K_T, closed: K_X, aging: K_AG, agcls: K_AGK, clrdone: K_CLRD };
      const syGetV = { counts: () => counts, dc: () => dc, tasks: () => tasks, closed: () => closed, aging: () => aging, agcls: () => agingCls, clrdone: () => clrDone };
      const sySetV = { counts: (v) => (counts = v), dc: (v) => (dc = v), tasks: (v) => (tasks = v), closed: (v) => (closed = v), aging: (v) => (aging = v), agcls: (v) => (agingCls = v), clrdone: (v) => (clrDone = v) };
      const syPlain = { master: K_M, users: K_U, mon: K_MON, codefix: K_F, dcPick: K_DP, dest: "warehouse_so_dest_v1", areacfg: "warehouse_so_areacfg_v1", linkcfg: K_LK, agingcfg: K_AGC, clrrep: K_CLRR, muatdata: K_MUATD, muatsum: K_MUATS };
      // riwayat laporan (Kesesuaian, Muat, Clearing): dikirim ke server per tanggal untuk dibuat sheet laporan
      const syRpt = { kesH: K_KESH, muatH: K_MUATH, clrH: K_CLRH };
      const syRptMap = {
        kesH: () => Object.fromEntries(kesHist.map((h) => [h.tgl, { tgl: h.tgl, at: h.at, by: h.by || "", n: h.n, a: h.a, b: h.b, c: h.c, ar: h.ar || {} }])),
        muatH: () => Object.fromEntries(muatHist.map((h) => [h.tgl, { tgl: h.tgl, at: h.at, by: h.by || "", dp: h.dp, ni: h.ni, total: h.total, tdkN: h.tdkN, masuk: h.masuk, cpS: h.cpS || 0, ci: h.ci || 0, rows: h.rows || [] }])),
        clrH: () => Object.fromEntries(clrHist.map((h) => [h.tgl, { tgl: h.tgl, at: h.at, by: h.by || "", n: h.n, ok: h.ok, bad: h.bad, rows: h.rows || [] }])),
      };
      let syRkPend = {};
      const syAllKeys = [...Object.values(syKey), ...Object.values(syPlain), ...Object.values(syRpt)];
      let SY = Object.assign({ url: "", token: "", auto: true, rev: 0, mrev: null, lastAt: "", rep: [], known: {}, hj: {}, dirty: false }, ld(K_SYNC, {}));
      // bila URL & token bawaan diisi, selalu dipakai (token lama yang salah di perangkat otomatis tergantikan)
      if (SYNC_DEFAULT.url && SYNC_DEFAULT.token) {
        if (SY.url !== SYNC_DEFAULT.url || SY.token !== SYNC_DEFAULT.token) { SY.rev = 0; SY.mrev = null; SY.known = {}; SY.hj = {}; }
        SY.url = SYNC_DEFAULT.url; SY.token = SYNC_DEFAULT.token;
      }
      if (!SY.url && SYNC_DEFAULT.url) SY.url = SYNC_DEFAULT.url;
      if (!SY.token && SYNC_DEFAULT.token) SY.token = SYNC_DEFAULT.token;
      if (!Array.isArray(SY.rep)) SY.rep = [];
      if (typeof SY.rk !== "object" || !SY.rk) SY.rk = {};
      if (!SY.rptInit) { SY.rptInit = true; Object.keys(syRpt).forEach((n) => { if (!SY.rep.includes(n)) SY.rep.push(n); }); SY.dirty = true; } // sekali: kirim riwayat yang sudah ada
      if (typeof SY.known !== "object" || !SY.known) SY.known = {};
      if (typeof SY.hj !== "object" || !SY.hj) SY.hj = {};
      window.__clkOff = Number(SY.clk) || 0;
      let syFails = 0;
      let syBusy = false, syAgain = false, syT = 0, syErr = "", syApplying = false, syRefreshPending = false;
      const sySave = () => {
        try { localStorage.setItem(K_SYNC, JSON.stringify(SY)); } catch (e) {}
      };
      const syReady = () => !!(SY.url && SY.token);
      const syTs = (v) => {
        const t = v ? Date.parse(v) : 0;
        return isNaN(t) ? 0 : t;
      };
      const syIds = (n) => {
        const o = syGetV[n](), m = {};
        Object.keys(o).forEach((id) => (m[id] = (o[id] && o[id][SY_STAMP[n]]) || ""));
        return m;
      };
      function sySoon(ms) {
        if (!syReady() || !SY.auto) return;
        clearTimeout(syT);
        syT = setTimeout(() => syRun(false), ms == null ? 4000 : ms);
      }
      // dipanggil dari sv(): tandai data yang berubah
      window.__syncHook = (k) => {
        if (syApplying || !syAllKeys.includes(k)) return;
        const name = Object.keys(syPlain).find((n) => syPlain[n] === k) || Object.keys(syRpt).find((n) => syRpt[n] === k);
        if (name && !SY.rep.includes(name)) SY.rep.push(name);
        SY.dirty = true;
        sySave();
        sySoon();
      };
      // dipanggil setelah pulihkan cadangan: semua data dianggap sumber terbaru
      window.__syncRestore = () => {
        SY.rep = [...Object.keys(syPlain), ...Object.keys(syRpt)];
        SY.dirty = true;
        sySave();
        sySoon(1500);
      };
      /* Data laporan terakhir yang diunggah (satu berkas utuh): yang cap waktunya (at, ms) paling baru menang di server dan di HP.
         Dengan ini Laporan Voucher Clearing dan Laporan Muat cukup diunggah sekali, HP lain langsung memakainya. */
      const syNW = {
        clrrep: { get: () => clrRep, set: (v) => (clrRep = v), after: () => { if (curViewId === "clr") renderClr(); } },
        muatdata: { get: () => ld(K_MUATD, null), set: () => {}, after: () => { if (typeof muRestore === "function") { muRestore(); if (typeof mBuild === "function") mBuild(); } } },
        muatsum: { get: () => ld(K_MUATS, null), set: () => {}, after: () => {} },
      };
      function syBuild() {
        const first = SY.mrev == null;
        const data = {}, del = {};
        Object.keys(SY_STAMP).forEach((n) => {
          const cur = syGetV[n](), known = SY.known[n] || {};
          data[syKey[n]] = cur;
          del[n] = Object.keys(known).filter((id) => !(id in cur));
        });
        const has = (n) => first || SY.rep.includes(n);
        if (has("master")) data[K_M] = DATA;
        // hash password ikut dikirim (PBKDF2 + salt) supaya login berlaku di semua perangkat; hash lama tanpa garam tidak pernah dikirim
        if (has("users")) data[K_U] = users.map((u) => { const c = { ...u }; if (pinIsLegacy(c.pin)) delete c.pin; return c; });
        if (has("mon")) data[K_MON] = mon;
        if (has("codefix")) data[K_F] = codeFix;
        if (has("dcPick")) data[K_DP] = dcPick;
        if (has("dest")) data[syPlain.dest] = dest;
        if (has("areacfg") && areaCfg) data[syPlain.areacfg] = areaCfg;
        if (has("linkcfg")) { const lc = linkSnap(); if (lc) data[syPlain.linkcfg] = lc; }
        if (has("agingcfg")) data[syPlain.agingcfg] = agingCfg;
        Object.keys(syNW).forEach((n) => { if (!has(n)) return; const v = syNW[n].get(); if (v && typeof v === "object") data[syPlain[n]] = v; });
        syRkPend = {};
        Object.keys(syRpt).forEach((n) => {
          if (!has(n)) return;
          const m = syRptMap[n]();
          data[syRpt[n]] = m;
          del[n] = (SY.rk[n] || []).filter((t) => !(t in m)); // entri riwayat yang dihapus di aplikasi
          syRkPend[n] = Object.keys(m);
        });
        return { data, del, replace: [...SY.rep] };
      }
      function syMerge(local, remote, field) {
        const out = Object.assign({}, local);
        Object.keys(remote || {}).forEach((id) => {
          const r = remote[id];
          if (!r) return;
          const c = out[id];
          if (!c || syTs(r[field]) >= syTs(c[field])) out[id] = r;
        });
        return out;
      }
      function syApply(resp, sentRep, sentIds) {
        const rd = resp.data || {};
        let changed = false;
        const clash = [];
        syApplying = true;
        const put = (k, v) => {
          try { localStorage.setItem(k, JSON.stringify(v)); failed.delete(k); } catch (e) { failed.add(k); }
        };
        try {
          Object.keys(SY_STAMP).forEach((n) => {
            const remote = rd[syKey[n]] || {}, cur = syGetV[n](), known = SY.known[n] || {};
            const merged = syMerge(cur, remote, SY_STAMP[n]);
            // dihapus di sini (termasuk saat sync berjalan): jangan dihidupkan lagi
            Object.keys(known).forEach((id) => { if (!(id in cur)) delete merged[id]; });
            // dikirim tapi tidak kembali dan belum berubah: sudah dihapus di perangkat lain
            Object.keys(sentIds[n]).forEach((id) => {
              if (id in cur && !(id in remote) && syTs(cur[id][SY_STAMP[n]]) === syTs(sentIds[n][id])) delete merged[id];
            });
            if (n === "counts") {
              // dua petugas memeriksa bin yang sama: data lokal tertimpa hasil orang lain yang berbeda -> beri tahu
              Object.keys(merged).forEach((id) => {
                const m = merged[id], c = cur[id];
                if (c && m !== c && m && m.by && c.by && m.by !== c.by && Number(m.actualQty) !== Number(c.actualQty)) clash.push(id + " (" + m.by + ": " + m.actualQty + ")");
              });
            }
            if (JSON.stringify(merged) !== JSON.stringify(cur)) {
              changed = true;
              sySetV[n](merged);
              put(syKey[n], merged);
            }
            const kn = {};
            Object.keys(remote).forEach((id) => (kn[id] = (remote[id] && remote[id][SY_STAMP[n]]) || ""));
            SY.known[n] = kn;
          });
          SY.rep = SY.rep.filter((n) => !sentRep.includes(n)); // yang berubah saat sync tetap tertunda
          Object.keys(syRkPend).forEach((n) => (SY.rk[n] = syRkPend[n]));

          // data WMS: hanya jika ada revisi baru dan tidak sedang diubah di sini
          if (rd[K_M] && Array.isArray(rd[K_M]) && rd[K_M].length && !SY.rep.includes("master") && resp.mrev !== SY.mrev) {
            DATA = rd[K_M];
            put(K_M, DATA);
            changed = true;
          }
          const same = (n, v) => {
            const j = JSON.stringify(v);
            const eq = SY.hj[n] === j;
            SY.hj[n] = j;
            return eq;
          };
          if (rd[K_U] && !SY.rep.includes("users") && !same("users", rd[K_U])) {
            // pertahankan password lokal (cocokkan lewat id) bila server tidak menyimpannya: server lama (tanpa resp.pins)
            // atau hash lama yang memang tidak pernah dikirim. Server baru yang tidak punya password berarti sudah dihapus.
            const lpin = {};
            users.forEach((u) => { if (u.pin) lpin[u.id] = u.pin; });
            users = rd[K_U].map((u) => (lpin[u.id] && !u.pin && (!resp.pins || pinIsLegacy(lpin[u.id])) ? { ...u, pin: lpin[u.id] } : u));
            migrateUsers();
            put(K_U, users);
            applySession();
            applyRole();
            loginUi();
            changed = true;
          }
          if (rd[K_MON] && !SY.rep.includes("mon") && !same("mon", rd[K_MON])) {
            mon = { ...mon, ...rd[K_MON] };
            put(K_MON, mon);
            if (curViewId === "mon") monEnter();
          }
          if (rd[K_F] && !SY.rep.includes("codefix") && !same("codefix", rd[K_F])) {
            codeFix = rd[K_F];
            put(K_F, codeFix);
            changed = true;
          }
          if (rd[K_DP] && !SY.rep.includes("dcPick") && !same("dcPick", rd[K_DP])) {
            dcPick = rd[K_DP];
            put(K_DP, dcPick);
            changed = true;
          }
          if (rd[syPlain.areacfg] && Array.isArray(rd[syPlain.areacfg].list) && !SY.rep.includes("areacfg") && !same("areacfg", rd[syPlain.areacfg])) {
            areaCfg = rd[syPlain.areacfg];
            put(syPlain.areacfg, areaCfg);
            changed = true;
          }
          if (rd[syPlain.linkcfg] && rd[syPlain.linkcfg].data && !SY.rep.includes("linkcfg") && !same("linkcfg", rd[syPlain.linkcfg])) {
            if (linkApply(rd[syPlain.linkcfg])) changed = true;
          }
          if (rd[syPlain.agingcfg] && typeof rd[syPlain.agingcfg] === "object" && !SY.rep.includes("agingcfg") && !same("agingcfg", rd[syPlain.agingcfg])) {
            agingCfg = rd[syPlain.agingcfg];
            put(syPlain.agingcfg, agingCfg);
            changed = true;
          }
          Object.keys(syNW).forEach((n) => {
            const rv = rd[syPlain[n]];
            if (!rv || typeof rv !== "object" || SY.rep.includes(n)) return;
            const cur = syNW[n].get();
            if (cur && Number(cur.at || 0) >= Number(rv.at || 0)) return; // milik perangkat ini sama baru atau lebih baru: tidak ditimpa
            put(syPlain[n], rv);
            syNW[n].set(rv);
            syNW[n].after();
            changed = true;
          });
          if (rd[syPlain.dest] && !SY.rep.includes("dest") && !same("dest", rd[syPlain.dest])) {
            dest = rd[syPlain.dest];
            put(syPlain.dest, dest);
            changed = true;
          }
        } finally {
          syApplying = false;
        }
        if (clash.length) toast("Bin sudah diperiksa petugas lain: " + clash.slice(0, 3).join(", ") + (clash.length > 3 ? " +" + (clash.length - 3) : "") + ". Hasil terbaru dipakai.");
        SY.rev = resp.rev;
        SY.mrev = resp.mrev;
        SY.lastAt = new Date().toISOString();
        sySave();
        if (changed) syRefresh();
        if (typeof hlRun === "function") hlRun();
      }
      function syRefresh() {
        const open = ["sheet", "dcSheet", "dcPickSheet"].some((id) => $(id) && !$(id).hidden);
        if (open) { syRefreshPending = true; return; } // jangan ganggu petugas yang sedang mengisi
        syRefreshPending = false;
        const ar = $("area").value, q = $("search").value;
        initAll();
        if ([...$("area").options].some((o) => o.value === ar)) $("area").value = ar;
        $("search").value = q;
        renderBins();
        metrics();
        const v = curViewId;
        if (v === "dc") renderDc();
        else if (v === "check") renderCheck();
        else if (v === "task") renderTask();
        else if (v === "kpi" || v === "agi" || v === "rpt") WMS.emit(); // KpiView (React) menggambar ulang
        else if (v === "clr" && typeof renderClr === "function") renderClr();
        else if (v === "usr") renderUsr();
        else if (v === "kes") renderKes();
        else if (v === "adj") renderAdj();
        else if (v === "data") $("dataInfo").textContent = DATA.length + " bin dimuat dari " + areas().length + " area.";
      }
      async function syCall(method, obj) {
        const ac = new AbortController(), tm = setTimeout(() => ac.abort(), 90000);
        try {
          let r;
          if (method === "GET") r = await fetch(SY.url + (SY.url.includes("?") ? "&" : "?") + "action=" + obj.action + "&token=" + encodeURIComponent(SY.token), { signal: ac.signal });
          else r = await fetch(SY.url, { method: "POST", body: JSON.stringify({ token: SY.token, ...obj }), signal: ac.signal }); // tanpa header: menghindari preflight CORS
          const t = await r.text();
          try { return JSON.parse(t); } catch (e) { throw new Error("Jawaban server tidak valid. Pastikan Web app di-deploy dengan akses \\"Anyone\\"."); }
        } finally {
          clearTimeout(tm);
        }
      }
      async function syRun(manual) {
        if (!syReady()) { if (manual) toast("Isi URL dan token dulu."); return; }
        if (syBusy) { syAgain = true; return; }
        if (!navigator.onLine) {
          syErr = "Tidak ada koneksi. Data aman di perangkat, akan dikirim saat online.";
          syUi();
          if (manual) toast(syErr);
          return;
        }
        syBusy = true;
        syUi();
        const sentRep = [...SY.rep], sentIds = {};
        Object.keys(SY_STAMP).forEach((n) => (sentIds[n] = syIds(n)));
        const body = syBuild();
        SY.dirty = false;
        try {
          const t0 = Date.now();
          const resp = await syCall("POST", { action: "sync", ...body, mrev: SY.mrev });
          const t1 = Date.now();
          if (!resp.ok) throw new Error(resp.error || "Server menolak.");
          SY.warn = resp.warn || "";
          // koreksi jam: selisih server - HP (dipotong separuh latensi). Abaikan bila latensi besar (tidak akurat).
          if (resp.srv && t1 - t0 < 15000) {
            const off = Date.parse(resp.srv) - (t0 + t1) / 2;
            if (!isNaN(off)) { SY.clk = Math.abs(off) < 2000 ? 0 : Math.round(off); window.__clkOff = SY.clk; }
          }
          syApply(resp, sentRep, sentIds);
          syFails = 0;
          syErr = "";
          if (manual) toast("Sinkron selesai");
        } catch (e) {
          SY.dirty = true;
          sySave();
          syErr = e && e.name === "AbortError" ? "Server terlalu lama menjawab." : String((e && e.message) || e);
          if (manual) toast("Sinkron gagal: " + syErr);
          // coba lagi otomatis dengan jeda bertahap + acak (30 HP tidak menyerbu server bersamaan)
          syFails = Math.min(syFails + 1, 6);
          if (!manual) syAgain = false, sySoon(Math.min(4000 * 2 ** syFails, 120000) * (0.75 + Math.random() * 0.5));
        } finally {
          syBusy = false;
          syUi();
          if (syAgain) { syAgain = false; sySoon(1500); }
        }
      }
      async function syPoll() {
        if (!syReady() || !SY.auto || syBusy || document.hidden || !navigator.onLine) return;
        if (SY.dirty) return syRun(false);
        try {
          const r = await syCall("GET", { action: "ping" });
          if (r && r.ok && (r.rev !== SY.rev || r.mrev !== SY.mrev)) syRun(false);
        } catch (e) {}
      }
      function netUi() {
        const el = $("netB");
        if (!el) return;
        let t = "", c = "", tip = "";
        if (!navigator.onLine) {
          t = "Offline";
          c = "warn";
          tip = "Tidak ada internet. Data tetap tersimpan di HP dan dikirim saat online.";
        } else if (syReady()) {
          if (syBusy) [t, c] = ["Menyinkronkan…", "info"];
          else if (syErr) [t, c, tip] = ["Sinkron gagal", "bad", syErr];
          else if (SY.dirty) [t, c] = ["Menunggu kirim", "warn"];
          else [t, c] = ["Tersinkron", "ok"];
        }
        el.hidden = !t;
        el.textContent = t;
        el.className = "netb " + c;
        if (tip) el.title = tip;
        else el.removeAttribute("title");
      }
      function syUi() {
        const t = SY.lastAt ? new Date(SY.lastAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "";
        const msg = !syReady() ? "Belum tersambung ke Google Sheets." : syBusy ? "Menyinkronkan…" : syErr ? "Gagal: " + syErr : "Tersambung" + (t ? ", terakhir " + t : "") + (SY.dirty ? " (ada perubahan belum terkirim)" : "");
        if ($("syInfo")) $("syInfo").textContent = msg;
        if ($("syBadge")) $("syBadge").textContent = !syReady() ? "" : syBusy ? " · menyinkronkan…" : syErr ? " · sinkron gagal" : SY.dirty ? " · menunggu kirim" : " · tersinkron" + (t ? " " + t : "");
        if ($("syNow")) $("syNow").disabled = syBusy;
        if ($("syOff")) $("syOff").hidden = !syReady();
        netUi();
      }
      if ($("syUrl")) {
        $("syUrl").value = SY.url;
        $("syTok").value = SY.token;
        $("syAuto").checked = !!SY.auto;
        $("syGo").onclick = () => {
          const u = $("syUrl").value.trim(), t = $("syTok").value.trim();
          if (!/^https:\\/\\/script\\.google\\.com\\//i.test(u)) return toast("URL harus dari Apps Script: https://script.google.com/…/exec");
          if (!t) return toast("Isi token.");
          if (u !== SY.url || t !== SY.token) { SY.rev = 0; SY.mrev = null; SY.known = {}; SY.hj = {}; }
          SY.url = u; SY.token = t; SY.auto = $("syAuto").checked;
          sySave();
          syRun(true);
        };
        $("syNow").onclick = () => syRun(true);
        $("syAuto").onchange = () => { SY.auto = $("syAuto").checked; sySave(); };
        $("syOff").onclick = async () => {
          if (!(await ask("Putuskan sinkron?", "Data di perangkat ini tetap ada. Sinkron berhenti sampai disambungkan lagi.", "Putuskan", true))) return;
          SY.url = ""; SY.token = ""; SY.rev = 0; SY.mrev = null; SY.known = {}; SY.hj = {}; SY.rep = []; SY.dirty = false;
          sySave();
          $("syUrl").value = ""; $("syTok").value = "";
          syUi();
        };
      }
      setInterval(() => { if (syRefreshPending) syRefresh(); }, 3000);
      setTimeout(function loop() { syPoll(); setTimeout(loop, 40000 + Math.random() * 20000); }, 20000 + Math.random() * 20000); // acak: poll 30 HP tidak serempak
      document.addEventListener("visibilitychange", () => { if (!document.hidden) sySoon(500); });
      window.addEventListener("online", () => {
        sySoon(1000);
        netUi();
      });
      window.addEventListener("offline", netUi);
      syUi();
      if (syReady()) setTimeout(() => syRun(false), 1200);
      /* SYNC-END */
      if (curU && DATA.some(isTaskPend)) lf = "task";
      delete cfg.pin;
      if (cfg.blind == null) cfg.blind = true; // default: hitung buta, supervisor boleh mematikan
      applySession();
      applyRole();
      loginUi();
      initAll();
      guardUi(true);
      try {
        const lv = localStorage.getItem("warehouse_so_view_v1");
        if (allowedView("mon")) go("mon"); // halaman utama = monitor kiriman
        else if (lv && allowedView(lv) && document.getElementById("v-" + lv)) go(lv);
        else if (allowedView("mon")) go("mon");
        else {
          const first = ["so", "dc", "task", "check", "kes", "adj", "clr", "muat", "kpi", "agi", "rpt", "tg", "data", "usr"].find(allowedView);
          if (first) go(first);
        }
      } catch (e) {}
`,Zp=`/* Kartu hasil Clearing di menu Monitoring. Logika: src/lib/clearing-summary.js. Data langsung (HP ini) bila laporan + counting
   sudah dimuat, kalau tidak memakai riwayat clearing terakhir yang tersinkron. Hanya untuk yang boleh membuka menu Clearing. */
      var cmKey = "", cmSum = null, cmTimer = 0; // var: monEnter berjalan saat boot, sebelum baris ini dieksekusi (let = TDZ)
      function cmSource() {
        if (clrRep && clrCnt) {
          const key = [clrRep.at, clrCnt.at, clrRep.rows.length, clrCnt.rows.length, Object.keys(clrDone).length, clr.cv, clr.cq, clr.ck].join("|");
          if (key !== cmKey) { cmKey = key; cmSum = WMSLib.clrSummarize(clrBuild().map((x) => ({ ...x, done: clrIsDone(x) }))); }
          if (cmSum && cmSum.total) return { s: cmSum, live: true, at: clrCnt.at, src: clrCnt.src };
        }
        const h = clrHist[0];
        if (!h) return null;
        const rows = WMSLib.clrFromHist(h.rows);
        if (rows.length) return { s: WMSLib.clrSummarize(rows), live: false, at: Date.parse(h.at) || 0, tgl: h.tgl };
        const open = h.bad || 0;
        return { s: { total: h.n, ok: h.ok, open, qty: 0, dup: 0, nq: 0, belum: 0, done: 0, wms: null, cnt: null, sel: 0, pct: h.n ? Math.round((h.ok / h.n) * 100) : 0, byShift: [], top: [], status: open ? "cek" : "ok" }, live: false, at: Date.parse(h.at) || 0, tgl: h.tgl };
      }
      function monClrRender() {
        const el = $("monClr");
        if (!el) return;
        try {
          if (!(allowedView("clr") || isSup())) { el.innerHTML = ""; return; }
          const src = cmSource();
          if (!src || !src.s.total) { el.innerHTML = ""; return; }
          const s = src.s, hm = (t) => new Date(t).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
          const sub = src.live
            ? (src.src === "file" ? "Dari file" : "Counting") + " dimuat " + hm(src.at) + " · " + fmt(s.total) + " voucher"
            : "Dari riwayat tersimpan " + clrTglF(src.tgl) + (src.at ? ", " + hm(src.at) : "") + " · " + fmt(s.total) + " voucher";
          const det = [s.qty && "selisih qty " + fmt(s.qty), s.dup && "dobel " + fmt(s.dup), s.nq && "qty kosong " + fmt(s.nq), s.belum && "belum dihitung " + fmt(s.belum), s.done && "ditandai selesai " + fmt(s.done)].filter(Boolean).join(" · ");
          const stat = s.status === "ok" ? ["Semua cocok", "green"] : ["Perlu tindak " + fmt(s.open), "red"];
          const tr = WMSLib.clrTrend(clrHist, 7);
          el.innerHTML = '<section class="cm" aria-label="Hasil Clearing"><div class="cm-h"><div><h3>Clearing</h3><p class="cm-sub">' + esc(sub) + '</p></div><span class="pill ' + stat[1] + '">' + esc(stat[0]) + "</span></div>" +
            '<div class="cm-grid"><div class="cm-t"><b>' + fmt(s.total) + "</b><span>Voucher</span></div>" +
            '<div class="cm-t cm-g"><b>' + fmt(s.ok) + "</b><span>Cocok (" + s.pct + "%)</span></div>" +
            '<div class="cm-t' + (s.open ? " cm-r" : " cm-g") + '"><b>' + fmt(s.open) + "</b><span>Perlu tindak</span></div>" +
            '<div class="cm-t' + (s.sel ? " cm-r" : "") + '"><b>' + (s.wms == null ? "-" : (s.sel > 0 ? "+" : "") + fmt(s.sel)) + "</b><span>Selisih qty</span></div></div>" +
            '<div class="cm-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + s.pct + '"><i style="width:' + s.pct + '%"></i></div>' +
            (s.wms == null ? "" : '<p class="cm-qty">Qty WMS <b>' + fmt(s.wms) + "</b> · Counting <b>" + fmt(s.cnt) + "</b> · Selisih <b" + (s.sel ? ' class="cm-neg"' : "") + ">" + (s.sel > 0 ? "+" : "") + fmt(s.sel) + "</b></p>") +
            (det ? '<p class="cm-det">' + esc(det) + "</p>" : "") +
            (s.byShift.length ? '<div class="cm-sec">Per shift</div><div class="cm-sh"><span class="fine">Shift</span><span class="fine">Cocok</span><span class="fine">Cek</span>' + s.byShift.map((g) => "<span>" + esc(g.shift) + "</span><span>" + fmt(g.ok) + "/" + fmt(g.total) + "</span><span>" + (g.open ? "<b>" + fmt(g.open) + "</b>" : "0") + "</span>").join("") + "</div>" : "") +
            (s.top.length ? '<div class="cm-sec">Perlu ditindaklanjuti' + (s.open > s.top.length ? " (" + s.top.length + " dari " + fmt(s.open) + ")" : "") + '</div><ul class="cm-todo">' + s.top.map((x) => '<li class="' + (x.st === "belum" || x.st === "nq" ? "cm-w" : "") + '"><b>' + esc(x.v) + "</b><span>" + esc(clrKet(x)) + (x.lori ? "<small>Lori " + esc(x.lori) + "</small>" : "") + "</span><b>" + (x.diff ? (x.diff > 0 ? "+" : "") + fmt(x.diff) : "") + "</b></li>").join("") + "</ul>" : "") +
            (tr.length > 1 ? '<div class="cm-sec">Cocok per hari (' + tr.length + ' hari)</div><div class="cm-tr">' + tr.map((d) => '<div title="' + esc(d.tgl) + ": " + d.pct + '% cocok"><i class="' + (d.pct < 60 ? "cm-low" : d.pct < 90 ? "cm-mid" : "") + '" style="height:' + Math.max(d.pct, 3) + '%"></i>' + esc(d.tgl.slice(8)) + "</div>").join("") + "</div>" : "") +
            '<div class="cm-act">' + (allowedView("clr") ? '<button class="btn pri sm inl" id="cmOpen" type="button">Buka Clearing</button>' : "") +
            (clr.url && clrRep ? '<button class="btn sec sm inl" id="cmRef" type="button"' + (clrBusy ? " disabled" : "") + ">" + (clrBusy ? "Memuat…" : "Muat ulang counting") + "</button>" : "") + "</div></section>";
          const o = $("cmOpen"), r = $("cmRef");
          if (o) o.onclick = () => go("clr");
          if (r) r.onclick = () => clrFetch(true);
        } catch (e) { el.innerHTML = ""; }
      }
      function monClrEnter() {
        monClrRender();
        clearInterval(cmTimer);
        const stale = () => clr.url && clrRep && clrCnt && clrCnt.src !== "file" && !clrBusy && Date.now() - clrCnt.at > Math.max(2, clr.auto || 5) * 60000;
        if (stale()) clrFetch(false);
        cmTimer = setInterval(() => {
          if (document.hidden || $("v-mon").hidden) { if ($("v-mon").hidden) clearInterval(cmTimer); return; }
          monClrRender();
          if (stale()) clrFetch(false);
        }, 60000);
      }
`,nf=`/* Kesehatan data: panel di menu Data WMS + lencana header (hanya admin). Logika murni: src/lib/health.js.
   Dipanggil: tiap 15 dtk, setelah sinkron (98-sync) dan saat membuka menu Data (go di 45-nav). */
      var hlLast = null; // var: hindari TDZ bila dipanggil saat boot
      function hlInput() {
        return {
          data: DATA, counts, users, tasks, closed,
          sync: { ready: syReady(), dirty: SY.dirty, err: syErr, lastAt: SY.lastAt, warn: SY.warn || "", clk: SY.clk || 0 },
        };
      }
      function hlText(h) {
        if (h.ok) return "Kesehatan data: semua presisi, tidak ada temuan.";
        return ["Kesehatan data: " + h.bad + " perlu ditindaklanjuti, " + h.warn + " perlu dicek.",
          ...h.issues.map((i) => (i.level === "bad" ? "[PERLU TINDAK] " : "[CEK] ") + i.title + (i.n ? " (" + i.n + " bin" + (i.bins.length ? ": " + i.bins.join(", ") + (i.n > i.bins.length ? " …" : "") : "") + ")" : "") + " - " + i.detail)].join("\\n");
      }
      function hlRender(h) {
        const v = $("v-data");
        if (!v) return;
        let p = $("hlPanel");
        if (!p) {
          p = document.createElement("div");
          p.className = "panel";
          p.id = "hlPanel";
          p.setAttribute("aria-live", "polite");
          const first = v.querySelector(".panel");
          if (first) v.insertBefore(p, first);
          else v.appendChild(p);
          p.addEventListener("click", (e) => {
            const b = e.target.closest("button");
            if (!b) return;
            if (b.dataset.bin) {
              try { go("so"); open(b.dataset.bin); } catch (er) {}
            } else if (b.dataset.act === "usr") go("usr");
            else if (b.dataset.act === "sync") { const t = $("syUrl"); if (t) t.scrollIntoView({ block: "center" }); }
            else if (b.dataset.act === "data") { const t = $("file"); if (t) t.scrollIntoView({ block: "center" }); }
            else if (b.id === "hlCopy") {
              const t = hlText(hlLast || h);
              (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast("Ringkasan disalin"), () => toast("Tidak bisa menyalin di perangkat ini"));
            }
          });
        }
        const lab = { usr: "Buka User & Area", sync: "Ke pengaturan sinkron", data: "Ke impor data" };
        const sum = h.ok ? '<div class="hl-sum hl-ok">Semua presisi. Tidak ada temuan.</div>'
          : '<div class="hl-sum ' + (h.bad ? "hl-bad" : "hl-warn") + '">' + (h.bad ? h.bad + " perlu ditindaklanjuti" : "") + (h.bad && h.warn ? ", " : "") + (h.warn ? h.warn + " perlu dicek" : "") + "</div>";
        p.innerHTML = '<h2 style="font-size: 18px">Kesehatan data</h2>' + sum +
          (h.ok ? "" : '<ul class="hl-list">' + h.issues.map((i) =>
            '<li class="hl-item hl-' + i.level + '"><b>' + esc(i.title) + (i.n ? " (" + i.n + ")" : "") + "</b><p>" + esc(i.detail) + "</p>" +
            (i.bins.length ? '<div class="hl-bins">' + i.bins.map((b) => '<button type="button" data-bin="' + esc(b) + '">' + esc(b) + "</button>").join("") + (i.n > i.bins.length ? "<span class=fine>+" + (i.n - i.bins.length) + " lagi</span>" : "") + "</div>" : "") +
            (i.act !== "bin" ? '<button class="btn sec sm hl-act" type="button" data-act="' + i.act + '">' + lab[i.act] + "</button>" : "") + "</li>").join("") + "</ul>" +
            '<button class="btn sec mt" id="hlCopy" type="button">Salin ringkasan</button>') +
          '<p class="fine">Diperiksa otomatis tiap 15 detik dan setelah sinkron.</p>';
      }
      function hlRun() {
        try {
          const h = WMSLib.healthCheck(hlInput());
          hlLast = h;
          const b = $("hlB");
          const show = isAdmin() && !h.ok;
          if (b) {
            b.hidden = !show;
            if (show) {
              b.className = "netb " + (h.bad ? "bad" : "warn");
              b.textContent = String(h.bad + h.warn);
              b.title = h.bad + " perlu ditindaklanjuti, " + h.warn + " perlu dicek";
            }
          }
          if (isAdmin()) hlRender(h);
          else if ($("hlPanel")) $("hlPanel").remove();
        } catch (e) {}
      }
      const hlBtn = $("hlB");
      if (hlBtn) hlBtn.onclick = () => { if (allowedView("data")) { go("data"); setTimeout(() => { const p = $("hlPanel"); if (p) p.scrollIntoView({ block: "start" }); }, 50); } };
      setInterval(() => { if (!document.hidden) hlRun(); }, 15000);
      setTimeout(hlRun, 2500);
`,ef=`/* Tampilan lapangan + scan label rak (patch IIFE, dijalankan setelah chunk utama)
   asal: index-fixd.html baris 7150-7180 */
      /* ---- v18: tampilan lapangan (ukuran teks, Outdoor) + scan label rak ---- */
      (function () {
        const K = "warehouse_so_disp_v1", TSV = [1, 1.15, 1.3];
        let d = ld(K, {});
        if (!d || typeof d !== "object" || Array.isArray(d)) d = {};
        function apply() {
          const r = document.documentElement;
          r.classList.toggle("outdoor", !!d.out);
          r.style.setProperty("--ts", String(TSV[d.ts] || 1));
          document.querySelectorAll(".dsp [data-ts]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.ts) === (d.ts || 0))));
          $("swOut").checked = !!d.out;
        }
        document.querySelector(".dsp").onclick = (e) => {
          const b = e.target.closest("[data-ts]");
          if (!b) return;
          d.ts = Number(b.dataset.ts);
          sv(K, d);
          apply();
          toast("Ukuran teks: " + b.getAttribute("aria-label"));
        };
        $("swOut").onchange = () => {
          d.out = $("swOut").checked;
          sv(K, d);
          apply();
          toast(d.out ? "Mode Outdoor aktif" : "Mode Outdoor mati");
        };
        apply();

      })();
`,tf=`/* Bip + pita status jaringan (patch IIFE, dijalankan setelah chunk utama)
   asal: index-fixd.html baris 7182-7241 */
      /* ---- v19: bip + pita status jaringan ---- */
      (function () {
        const K = "warehouse_so_disp_v1";
        const snd = () => { try { const d = JSON.parse(localStorage.getItem(K) || "{}"); return d.snd !== false; } catch (e) { return true; } };
        let ac = null;
        window.__beep = (pat) => {
          if (!snd()) return;
          ac = ac || new (window.AudioContext || window.webkitAudioContext)();
          if (ac.state === "suspended") ac.resume();
          const now = ac.currentTime;
          const seq = Array.isArray(pat) ? [[330, 0, 0.2], [220, 0.26, 0.32]] : pat === 60 ? [[1400, 0, 0.09]] : [[988, 0, 0.16]];
          seq.forEach(([f, t, du]) => {
            const o = ac.createOscillator(), g = ac.createGain();
            o.type = f < 400 ? "square" : "sine";
            o.frequency.value = f;
            g.gain.setValueAtTime(0.0001, now + t);
            g.gain.exponentialRampToValueAtTime(0.5, now + t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, now + t + du);
            o.connect(g);
            g.connect(ac.destination);
            o.start(now + t);
            o.stop(now + t + du + 0.02);
          });
        };
        const sw = $("swSnd");
        sw.checked = snd();
        sw.onchange = () => {
          let d = {};
          try { d = JSON.parse(localStorage.getItem(K) || "{}") || {}; } catch (e) {}
          d.snd = sw.checked;
          sv(K, d);
          if (d.snd) window.__beep(40);
          toast(d.snd ? "Bunyi bip aktif" : "Bunyi bip mati");
        };
        const hdr = document.querySelector("header"), nb = $("netB");
        const rb = document.createElement("div");
        rb.id = "netRibbon";
        rb.className = "ribbon";
        rb.setAttribute("role", "status");
        rb.hidden = true;
        hdr.appendChild(rb);
        function upd() {
          const t = nb.textContent.trim();
          if (!navigator.onLine) {
            rb.className = "ribbon off";
            rb.textContent = "OFFLINE: data aman di HP, dikirim otomatis saat sinyal kembali.";
            rb.hidden = false;
          } else if (!nb.hidden && /gagal/i.test(t)) {
            rb.className = "ribbon bad";
            rb.textContent = "SINKRON GAGAL: data tetap aman di HP. " + (nb.title || "");
            rb.hidden = false;
          } else rb.hidden = true;
        }
        new MutationObserver(upd).observe(nb, { childList: true, characterData: true, subtree: true, attributes: true });
        window.addEventListener("online", upd);
        window.addEventListener("offline", upd);
        upd();
      })();
`,af=`/* Papan angka cari bin (patch IIFE, dijalankan setelah chunk utama)
   asal: index-fixd.html baris 7243-7328 */
      /* ---- v20: papan angka cari bin (tanpa QR) ---- */
      (function () {
        let v = "";
        const sheet = $("padSheet"), disp = $("padDisp"), res = $("padRes"), keys = $("padKeys");
        const norm = (t) => String(t).toUpperCase().replace(/[^A-Z0-9]/g, "");
        function buildKeys() {
          const set = new Set();
          DATA.forEach((x) => String(x.bin).toUpperCase().split("").forEach((c) => { if (/[A-Z]/.test(c)) set.add(c); }));
          const L = [...set].sort().slice(0, 20);
          keys.innerHTML =
            ["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((k) => \`<button type="button" data-k="\${k}">\${k}</button>\`).join("") +
            '<button type="button" class="fn" data-k="back" aria-label="Hapus satu karakter">⌫</button><button type="button" data-k="0">0</button><button type="button" class="fn" data-k="clr" aria-label="Hapus semua">C</button>' +
            (L.length ? \`<div class="lt">\${L.map((c) => \`<button type="button" data-k="\${c}">\${c}</button>\`).join("")}</div>\` : "");
        }
        function render() {
          disp.innerHTML = v ? \`<span>\${esc(v)}</span>\` : '<span class="ph">Ketuk angka atau huruf kode bin</span>';
          const q = norm(v), pool = DATA.filter((x) => inScope(x.area));
          let rows, title;
          if (!q) {
            rows = pool.filter((x) => !counts[x.bin] && !isClosed(x.area));
            title = rows.length ? "Bin berikutnya yang belum diperiksa" : "Semua bin sudah diperiksa";
          } else {
            const pre = [], inc = [];
            pool.forEach((x) => { const n = norm(x.bin); if (n.startsWith(q)) pre.push(x); else if (n.includes(q)) inc.push(x); });
            rows = pre.concat(inc);
            title = rows.length ? "Ketuk bin untuk mulai" : "Tidak ada bin dengan kode itu";
          }
          const total = rows.length;
          rows = rows.slice(0, 8);
          res.innerHTML =
            \`<div class="pad-t">\${title}</div>\` +
            rows.map((x) => {
              const s2 = stat(x), c = counts[x.bin];
              const pill = isClosed(x.area) ? '<span class="pill amber">Ditutup</span>' : s2 === "todo" ? '<span class="pill">Belum</span>' : s2 === "ok" ? '<span class="pill green">Sesuai</span>' : \`<span class="pill amber">\${c.itemMatch === false ? "Item beda" : "Selisih qty"}</span>\`;
              return \`<button class="bin \${s2 === "ok" ? "done-ok" : s2 === "bad" ? "done-bad" : ""}" data-b="\${esc(x.bin)}"><b>\${esc(x.bin)}</b><span class="it">\${szHtml(x.item)}</span><span class="q">\${cfg.blind && !c ? "–" : fmt(x.onhand)}<small>qty WMS</small></span><span>\${pill}</span></button>\`;
            }).join("") +
            (total > rows.length ? \`<p class="fine">Menampilkan \${rows.length} dari \${fmt(total)}. Tambah angka atau huruf untuk mempersempit.</p>\` : "");
        }
        function press(k) {
          try { if (navigator.vibrate) navigator.vibrate(12); } catch (e) {}
          if (k === "back") v = v.slice(0, -1);
          else if (k === "clr") v = "";
          else if (v.length < 14) v += k;
          render();
        }
        keys.onclick = (e) => { const b = e.target.closest("[data-k]"); if (b) press(b.dataset.k); };
        function closePad() {
          sheet.hidden = true;
          document.body.style.overflow = "";
        }
        res.onclick = (e) => {
          const b = e.target.closest("[data-b]");
          if (!b) return;
          const hit = DATA.find((x) => x.bin === b.dataset.b);
          if (!hit) return;
          closePad();
          lf = "all";
          $("area").value = [...$("area").options].some((o) => o.value === hit.area) ? hit.area : "*";
          $("search").value = "";
          renderBins();
          open(hit.bin);
        };
        $("padBtn").onclick = () => {
          v = "";
          buildKeys();
          render();
          sheet.hidden = false;
          document.body.style.overflow = "hidden";
        };
        $("padX").onclick = closePad;
        document.addEventListener("keydown", (e) => {
          if (sheet.hidden || !$("dlg").hidden) return;
          if (e.key === "Escape") return closePad();
          if (e.ctrlKey || e.metaKey || e.altKey) return;
          if (e.key === "Backspace") { e.preventDefault(); press("back"); }
          else if (/^[a-zA-Z0-9]$/.test(e.key)) { e.preventDefault(); press(e.key.toUpperCase()); }
        });
        // filter dilipat untuk petugas, terbuka untuk admin
        const flt = $("flt");
        const fltState = () => { flt.open = !curUser(); };
        fltState();
        new MutationObserver(fltState).observe($("login"), { attributes: true, attributeFilter: ["hidden"] });
        $("user").addEventListener("change", fltState);
      })();
`,sf=`/* Layar petugas lebih sepi (patch IIFE, dijalankan setelah chunk utama)
   asal: index-fixd.html baris 7330-7359 */
      /* ---- v21: layar petugas lebih sepi ---- */
      (function () {
        const g = $("guard"), ch = $("chips");
        const petugas = () => !!curUser() && !isAdmin();
        function tidyGuard() {
          g.querySelectorAll(".gd").forEach((el) => {
            // banner untuk admin (impor data, cadangan) disembunyikan dari petugas; peringatan penyimpanan tetap tampil
            el.hidden = !isAdmin() && (el.classList.contains("info") || !!el.querySelector('[data-g="imp"]'));
          });
        }
        function tidyChips() {
          if (!petugas()) return;
          ch.querySelectorAll('[data-k="bad"],[data-k="ok"]').forEach((b) => (b.hidden = true));
        }
        function start() {
          tidyGuard();
          if (petugas() && lf === "all") {
            lf = "todo";
            renderBins();
          }
        }
        new MutationObserver(tidyGuard).observe(g, { childList: true });
        new MutationObserver(tidyChips).observe(ch, { childList: true });
        new MutationObserver(start).observe($("login"), { attributes: true, attributeFilter: ["hidden"] });
        tidyGuard();
        tidyChips();
        start();
      })();
`,rf=`/* Tandai selesai per voucher (Clearing) (patch IIFE, dijalankan setelah chunk utama)
   asal: index-fixd.html baris 7361-7394 */
      /* ---- v22: tandai selesai per voucher (Clearing) ---- */
      (function () {
        function askNote(title, msg) {
          return new Promise((res) => {
            const d = $("dlg");
            d.innerHTML = \`<div><h3 id="dlgT">\${esc(title)}</h3><p>\${esc(msg)}</p><label for="dNote" style="margin:0">Catatan (opsional)</label><input id="dNote" maxlength="200" autocomplete="off" enterkeyhint="done" placeholder="Contoh: sudah dikoreksi di QAD" /><button class="btn pri" id="dOk">Simpan</button><button class="btn sec" id="dNo">Batal</button></div>\`;
            d.hidden = false;
            const f = (v) => { d.hidden = true; res(v); };
            $("dOk").onclick = () => f($("dNote").value.trim());
            $("dNo").onclick = () => f(null);
            $("dNote").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); $("dOk").click(); } };
            $("dNote").focus();
          });
        }
        $("clrList").onclick = async (e) => {
          const cd = e.target.closest("[data-cd]"), cu = e.target.closest("[data-cu]");
          if (cd) {
            const note = await askNote("Tandai voucher selesai?", "Voucher ini sudah dicek dan ditindaklanjuti.");
            if (note === null) return;
            clrDone[cd.dataset.cd] = { at: nowIso(), by: curName(), note };
            if (!sv(K_CLRD, clrDone)) return toast("Gagal menyimpan: penyimpanan penuh.");
            buzz(40);
            renderClr();
            toast("Voucher ditandai selesai");
          } else if (cu) {
            if (!(await ask("Buka lagi voucher ini?", "Tanda selesai dan catatannya dihapus.", "Buka lagi", true))) return;
            delete clrDone[cu.dataset.cu];
            sv(K_CLRD, clrDone);
            renderClr();
          }
        };
      })();
`,lf=Object.assign({"./chunks/00-demo-data.js":$p,"./chunks/10-core.js":Cp,"./chunks/20-bins-sheet.js":Ap,"./chunks/25-check-draft-undo.js":Tp,"./chunks/30-review.js":_p,"./chunks/35-adjust.js":Mp,"./chunks/40-import.js":jp,"./chunks/45-nav.js":Dp,"./chunks/50-kesesuaian.js":Np,"./chunks/55-muat.js":Lp,"./chunks/60-users.js":Rp,"./chunks/65-kpi.js":Ep,"./chunks/70-dc.js":Pp,"./chunks/75-nav-dialog.js":Bp,"./chunks/76-menu-groups.js":Kp,"./chunks/80-clearing.js":Op,"./chunks/85-a11y-bin-nav.js":Ip,"./chunks/88-backup.js":Hp,"./chunks/90-telegram.js":Up,"./chunks/91-linkcfg.js":Fp,"./chunks/92-monitoring.js":qp,"./chunks/93-dash-delivery.js":Vp,"./chunks/93-dash-tv.js":zp,"./chunks/94-aging.js":Wp,"./chunks/95-tasks.js":Gp,"./chunks/96-task-kinds.js":Yp,"./chunks/96-task-menu.js":Qp,"./chunks/97-bridge-links.js":Jp,"./chunks/98-sync.js":Xp,"./chunks/99-clr-monitoring.js":Zp,"./chunks/99-health.js":nf}),of=Object.assign({"./chunks/patch-v18-display.js":ef,"./chunks/patch-v19-beep-net.js":tf,"./chunks/patch-v20-numpad.js":af,"./chunks/patch-v21-calm.js":sf,"./chunks/patch-v22-clr-done.js":rf}),Dd=(l,u)=>{const m=document.createElement("script");m.dataset.chunk=u,m.text=l,document.body.appendChild(m)},Nd=l=>Object.keys(l).sort().map(u=>[u,l[u]]);function uf(){window.__legacyBooted||(window.__legacyBooted=!0,Dd(Nd(lf).map(([l,u])=>`
/* ===== ${l} ===== */
${u}`).join(`
`),"core"),Nd(of).forEach(([l,u])=>Dd(u,l)),window.WMS.emit())}const df=`        <div class="top">
          <button class="burger" id="burger" aria-label="Buka menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
          <div class="ttl">
            <h1 class="brand" id="pgT" tabindex="-1">Periksa Bin</h1>
            <div class="sub" id="hSub">Stock Opname per bin</div>
          </div>
          <span class="netb" id="netB" role="status" hidden></span>
          <button class="netb" id="hlB" type="button" hidden aria-label="Ada masalah data, buka Kesehatan data"></button>
        </div>
        <div class="prog">
          <div class="prog-row"><span id="pTxt">0 dari 0 bin</span><span id="pPct">0%</span></div>
          <div class="bar" id="pBarW" role="progressbar" aria-label="Progres pemeriksaan bin" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="pBar" style="width: 0"></i></div>
        </div>
`,cf=`        <div class="sd-h">
          <b>Stock Control</b><small>Stock Opname gudang</small><small id="whoAmI" style="display:block;margin-top:4px;font-weight:700"></small>
          <button class="btn sec sm mt" id="logoutBtn" type="button" hidden>Keluar</button><button class="btn pri sm mt" id="lgSetupBtn" type="button" hidden>Aktifkan login</button>
          <div class="bar"><i id="sBar" style="width: 0"></i></div>
          <div class="pt" id="sTxt"></div>
        </div>
        <div class="sd-m">
          <div class="mg" role="heading" aria-level="2">Ringkasan</div>
          <button class="mi" data-v="mon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z"/></svg>Beranda</button>
          <div class="mg" role="heading" aria-level="2">Pemeriksaan</div>
          <button class="mi on" data-v="so"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/></svg>Periksa Bin</button>
          <button class="mi" data-v="dc"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 11 3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/></svg>DC Harian</button>
          <button class="mi" data-v="check">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>Review Supervisor<span class="bd" id="dRev" hidden></span>
          </button>
          <button class="mi" data-v="task">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>Task<span class="bd" id="dTask" hidden></span>
          </button>
          <button class="mi" data-v="kes">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>Cek Kesesuaian<span class="bd" id="dKes" hidden></span>
          </button>
          <div class="mg" role="heading" aria-level="2">Hasil &amp; laporan</div>
          <button class="mi" data-v="adj">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/></svg>File Adjust<span class="bd" id="dAdj" hidden></span>
          </button>
          <button class="mi" data-v="clr"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11l3 3 8-8"/><path d="M4 12a8 8 0 0 0 14 5M20 12A8 8 0 0 0 6 7"/></svg>Clearing</button>
          <button class="mi" data-v="muat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></svg>Laporan Muat</button>
          <button class="mi" data-v="kpi"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>KPI Area</button>
          <button class="mi" data-v="rpt"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>Laporan</button>
          <button class="mi" data-v="agi"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Aging Stock</button>
          <div class="mg" role="heading" aria-level="2">Pengaturan</div>
          <button class="mi" data-v="usr"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.4c2.2.6 3.5 2.4 3.5 5.6"/></svg>User &amp; Area</button>
          <button class="mi" data-v="tg"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-11 11M22 2l-7 20-4-9-9-4z"/></svg>Telegram</button>
          <button class="mi" data-v="data"><svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>Data WMS</button>
          <div class="dsp-h" id="dspH">Tampilan lapangan</div>
          <div class="dsp" role="group" aria-labelledby="dspH">
            <button type="button" data-ts="0" aria-label="Teks standar" aria-pressed="true">A</button>
            <button type="button" data-ts="1" aria-label="Teks besar" aria-pressed="false">A+</button>
            <button type="button" data-ts="2" aria-label="Teks sangat besar" aria-pressed="false">A++</button>
          </div>
          <label class="sw"><input type="checkbox" id="swOut" /><span>Mode Outdoor<small>Kontras tertinggi untuk terik matahari. Berlaku di perangkat ini saja.</small></span></label>
          <label class="sw"><input type="checkbox" id="swSnd" checked /><span>Bunyi bip<small>Satu nada = tersimpan sesuai. Dua nada rendah = ada selisih, cek lagi.</small></span></label>
        </div>
        <div class="sd-f">Data tersimpan di perangkat ini<span id="syBadge"></span>.<button class="btn sec sm mt" id="navBtn" type="button">Atur navigasi bawah</button></div>
`,mf=`        <button data-v="mon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z"/></svg>Beranda</button>
        <button data-v="so"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/></svg>Periksa<span class="bd" id="tTask" hidden></span></button>
        <button data-v="dc"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 11 3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/></svg>DC</button>
        <button data-v="check"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>Review<span class="bd" id="tRev" hidden></span></button>
        <button data-v="adj"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/></svg>Adjust<span class="bd" id="tAdj" hidden></span></button>
        <button data-v="task" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>Tugas</button>
        <button data-v="kes" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>Cek</button>
        <button data-v="clr" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11l3 3 8-8"/><path d="M4 12a8 8 0 0 0 14 5M20 12A8 8 0 0 0 6 7"/></svg>Clearing</button>
        <button data-v="muat" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></svg>Muat</button>
        <button data-v="kpi" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>KPI</button>
        <button data-v="rpt" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>Laporan</button>
        <button data-v="agi" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Aging</button>
        <button data-v="usr" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.4c2.2.6 3.5 2.4 3.5 5.6"/></svg>User</button>
        <button data-v="tg" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-11 11M22 2l-7 20-4-9-9-4z"/></svg>Telegram</button>
        <button data-v="data" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>Data</button>
        <button id="tMenu" aria-label="Buka menu lengkap"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>Menu</button>
`,pf=`            <div class="panel">
              <h2>Pilih bin yang diperiksa</h2>
              <p class="hint">Ketuk bin untuk mulai menghitung.</p>
              <button class="btn pri" id="nextBin" type="button" hidden></button>
              <button class="btn sec mt" id="padBtn" type="button">Cari bin (papan angka)</button>
              <div class="chips" id="chipsR" role="group" aria-label="Posisi rak" hidden></div>
              <details id="flt" class="mt">
                <summary>Filter petugas, area, cari teks</summary>
                <div>
                  <label for="user">Petugas</label><select id="user"></select>
              <div class="row2">
                <div>
                  <label for="area">Area</label
                  ><select id="area"></select>
                </div>
                <div>
                  <label for="search">Cari</label
                  ><input id="search" type="search" placeholder="B1-01 atau nama" autocomplete="off" />
                </div>
              </div>
                </div>
              </details>
              <div id="areaBar"></div>
              <div id="taskBar"></div>
                            <div class="undobar" id="undoBar" hidden>
                <span id="undoTxt"></span><button id="undoBtn">Urungkan</button>
              </div>
              <div class="chips" id="chips"></div>
              <div id="binList" class="bin-list"></div>
            </div>
`,ff=`          <h2>DC Harian</h2>
          <p class="hint">Pilih item bebas, catat qty per rak, lalu cocokkan dengan stok sistem.</p>
          <div class="stats" id="dcStats" aria-live="polite" aria-atomic="true"></div>
          <div class="undobar" id="dcUndoBar" hidden><span id="dcUndoTxt"></span><button id="dcUndoBtn">Urungkan</button></div>
          <button class="btn pri" id="dcPickBtn">Pilih item DC</button>
          <div class="panel mt">
            <label for="dcQ">Cari item</label>
            <input id="dcQ" type="search" placeholder="Contoh: AW 6" autocomplete="off" />
            <div class="chips" id="dcChips"></div>
            <div id="dcList" class="bin-list"></div>
          </div>
          <details class="panel dcrep" id="dcRepBox">
            <summary id="dcRepSum">Laporan bulanan deviasi</summary>
            <div class="dcrep-body">
              <label for="dcRepM">Bulan laporan</label>
              <select id="dcRepM"></select>
              <div class="dcrep-tiles" id="dcRepTiles"></div>
              <div class="chips" id="dcRepChips"></div>
              <div id="dcRepList"></div>
              <button class="btn pri" id="dcRepSend" type="button">Salin &amp; kirim laporan ke Telegram</button>
              <button class="btn sec mt" id="dcRepCsv" type="button">Unduh laporan (CSV)</button>
            </div>
          </details>
          <button class="btn pri ximp" id="dcCsv">Unduh rekap DC (CSV)</button>
          <button class="btn pri mt" id="dcSend" type="button">Salin &amp; kirim rekap ke Telegram</button>
          <button class="ximp" id="dcCopy" type="button" tabindex="-1" aria-hidden="true">x</button>
          <button class="ximp" data-tg="dcCopy" type="button" tabindex="-1" aria-hidden="true">x</button>
          <button class="btn dng sm mt-lg" id="dcReset">Mulai DC baru</button>
`,gf=`            <h2>Review Supervisor</h2>
            <p class="hint">Bin yang item atau qty-nya tidak sesuai.</p>
            <div class="stats" id="stats" aria-live="polite" aria-atomic="true"></div>
            <div class="chips" id="chipsC"></div>
            <div id="checkList"></div>
            <button class="btn sec mt ximp" id="btnCsv">Unduh rekap CSV</button>
`,hf=`            <h2>File Adjust</h2>
            <p class="hint">Dibuat otomatis dari hasil pemeriksaan. Hanya selisih yang masuk.</p>
            <div class="stats" id="adjStats" aria-live="polite" aria-atomic="true"></div>
            <div id="adjWarn"></div>
            <div id="adjList"></div>
            <details>
              <summary>Pengaturan file Adjust</summary>
              <div class="set">
                <label for="aTgl">Tanggal</label><input id="aTgl" type="date" />
                <div class="row2">
                  <div>
                    <label for="aSite">Site</label><input id="aSite" value="10021" inputmode="numeric" />
                  </div>
                  <div>
                    <label for="aKat">Kode Kategori</label><input id="aKat" value="1" inputmode="numeric" />
                  </div>
                </div>
                <label for="aLoc">Location</label><input id="aLoc" value="L-PIPA" />
                <p class="fine">Format rak diubah otomatis, misalnya B1-16-B menjadi B1-16B.</p>
              </div>
            </details>
            <button class="btn pri" id="btnAdj">Unduh file Adjust (.xlsx)</button>
            <button class="btn sec mt" id="btnAdjCopy">
              Salin untuk ditempel ke Excel
            </button>
            <button class="btn sec mt" data-tg="adj">Kirim daftar selisih ke Telegram</button>
`,kf=`            <h2>Task</h2>
            <p class="hint">Ketuk tugas untuk mengerjakannya. Selesai otomatis saat disimpan.</p>
            <div id="tskSum" class="tsk-sum"></div>
            <div class="panel" id="tskWhoW" hidden><label for="tskUser">Lihat tugas milik</label><select id="tskUser"></select></div>
            <div class="chips" id="tskChips" role="group" aria-label="Filter task"></div>
            <div id="tskList"></div>
            <h3 class="sec" id="tskAdminH">Kelola tugas</h3>
            <div class="stats" id="tkStats"></div>
            <div class="panel" id="tkDlg" hidden>
              <h3>Delegasikan tugas</h3>
              <label for="dgKind">Jenis tugas</label>
              <select id="dgKind"><option value="bin">Periksa bin (stock opname)</option><option value="AG">Aging per rak</option><option value="DC">DC per item</option></select>
              <div id="dgAreaW"><label for="dgArea">Area</label><select id="dgArea"></select></div>
              <div id="dgSigW"><label for="dgSig">Rak yang ditugaskan</label><select id="dgSig"><option value="watch">Kuning &amp; Merah</option><option value="merah">Merah saja</option><option value="all">Semua rak isi</option></select></div>
              <div id="dgScopeW"><label for="dgScope">Cakupan</label><select id="dgScope"><option value="todo">Hanya yang belum dicek</option><option value="all">Semua (cek ulang)</option></select></div>
              <label for="dgUser">Petugas</label><select id="dgUser"></select>
              <div id="dgShowW"><label for="dgShow">Qty sistem untuk petugas</label><select id="dgShow"><option value="">Ikut pengaturan petugas / umum</option><option value="buta">Sembunyikan (hitung buta)</option><option value="tampil">Tampilkan</option></select></div>
              <p class="fine" id="dgInfo" role="status"></p>
              <button class="btn pri" id="dgGo" type="button">Buat tugas</button>
            </div>
            <div class="panel ximp">
              <h3 id="tkWho">Upload tugas</h3>
              <label class="btn pri fl" for="tkFile" id="tkLbl">Pilih file daftar bin</label
              ><input type="file" id="tkFile" accept=".xls,.xlsx,.csv,text/csv" hidden />
              <p class="fine" id="tkHelp"></p>
              <button class="btn sec sm mt ximp" id="tkTpl" type="button">Unduh contoh file (CSV)</button>
            </div>
            <div id="tkRes"></div>
            <button class="btn pri" id="tkGo" hidden>Kerjakan tugas saya</button>
            <h3 class="sec">Per petugas</h3>
            <div id="tkUsers"></div>
            <h3 class="sec">Tugas Aging &amp; DC</h3>
            <div id="tkKinds"></div>
            <div id="tkUn"></div>
            <button class="btn dng sm mt-lg" id="tkClear">Hapus tugas</button>
`,vf=`            <h2>Cek Kesesuaian</h2>
            <p class="hint">Cek rak dan stok per bin dari data WMS yang dimuat.</p>
            <div id="kVerdict"></div>
            <div class="chips" id="kChips"></div>
            <div id="kList"></div>
            <button class="btn pri mt" id="kCopy" type="button">Salin laporan kesesuaian</button>
            <button class="btn sec mt" data-tg="kCopy" type="button">Kirim laporan ke Telegram</button>
            <button class="btn sec mt ximp" id="kCsv" type="button">Unduh laporan (CSV)</button>
            <h3 class="sec">Riwayat laporan tersimpan</h3>
            <p class="fine">Laporan tersimpan otomatis tiap hari, tidak perlu menekan tombol simpan.</p>
            <div id="kHist"></div>
            <details>
              <summary>Aturan pengecekan</summary>
              <div class="set">
                <label for="kfa">Rak berakhiran A untuk produk</label><input id="kfa" value="STANDARD D" />
                <label for="kfb">Rak berakhiran B untuk produk</label><input id="kfb" value="JIS AW" />
                <label for="klow">Dianggap stok sedikit jika ≤</label
                ><input id="klow" type="number" inputmode="numeric" value="5" />
                <p class="fine">Aturan ini khusus gudang pipa. Kosongkan kolom produk jika gudang Anda tidak memakai aturan rak A/B. Pengaturan tersimpan di perangkat.</p>
              </div>
            </details>
`,bf=`            <h2>Laporan Muat</h2>
            <p class="hint">Unggah laporan muat (Excel), teks WhatsApp langsung jadi.</p>
            <div class="panel">
              <label class="btn pri fl" for="mf">Pilih file laporan muat</label
              ><input type="file" id="mf" accept=".xls,.xlsx,.csv" hidden />
              <p class="hint flush">
                File: <b id="mfn">belum ada file</b>
              </p>
            </div>
            <div class="stats" id="mkpi"></div>
            <div id="mnotes"></div>
            <button class="ximp" id="mcopy" type="button" tabindex="-1" aria-hidden="true">x</button>
            <button class="ximp" data-tg="mcopy" type="button" tabindex="-1" aria-hidden="true">x</button>
            <button class="btn pri" id="muSave" type="button">Simpan, salin &amp; kirim ke Telegram</button>
            <pre class="rep" id="mout"></pre>
            <h3 class="sec">Riwayat laporan tersimpan</h3>
            <div id="muHist"></div>
            <details class="mt-lg">
              <summary>Pengaturan laporan</summary>
              <div class="set">
                <label for="mgudang">Nama gudang</label><input id="mgudang" value="Warehouse Pipa LA" />
                <label for="mtgl">Tanggal laporan</label><input id="mtgl" type="date" />
                <label for="mpelapor">Dilaporkan oleh</label><input id="mpelapor" value="Saepulloh" placeholder="Nama pelapor" />
                <label for="mtotal">Total mobil/SPM (kosong = jumlah SPM di file)</label
                ><input id="mtotal" type="number" inputmode="numeric" min="0" placeholder="otomatis" />
                <label for="mdefcp">SPM dihitung "copy rekomendasi" jika</label
                ><select id="mdefcp">
                  <option value="any">ada minimal 1 item copy</option>
                  <option value="all">semua itemnya copy</option>
                </select>
                <label for="mtdk">Mobil tidak diproses WMS (satu per baris)</label
                ><textarea id="mtdk" placeholder="B 1234 XYZ - SPM 26092799"></textarea>
              </div>
            </details>
`,yf=`          <h2>User &amp; Area</h2>
          <p class="hint">Kelola user: peran (Admin, SPV, Petugas, Penerimaan), password, area, dan status aktif.</p>
          <div id="uBoot"></div>
          <div class="usum" id="uSum"></div>
          <h3 class="sec">Daftar user</h3>
          <div id="usrList"></div>
          <div class="panel upanel">
            <h3 id="uTitle"></h3>
            <div class="fgrid">
              <div><label for="uName">Nama</label><input id="uName" placeholder="Contoh: Kelik" autocomplete="off" /></div>
              <div><label for="uRole">Peran</label>
              <select id="uRole"><option value="petugas">Petugas (area sendiri)</option><option value="penerimaan">Penerimaan (area sendiri)</option><option value="spv">SPV (semua area, review dan laporan)</option><option value="admin">Admin (semua menu)</option></select></div>
              <div class="full"><label for="uPin" id="uPinL">Password (minimal 6 karakter)</label>
              <input id="uPin" type="password" maxlength="64" autocomplete="new-password" />
              <p class="fine" id="uPinH"></p></div>
              <div class="full" id="uViewWrap"><label for="uView">Tampilan hitung</label>
              <select id="uView"><option value="">Ikut pengaturan umum</option><option value="buta">Buta: qty sistem disembunyikan</option><option value="tampil">Tampil: qty sistem terlihat</option></select>
              <p class="fine">Admin juga bisa mengatur per tugas saat membuat tugas.</p></div>
            </div>
            <div id="uAreasWrap"><label id="uAreasL">Area yang dikerjakan</label>
            <div class="chips wrap" id="uAreas" role="group" aria-labelledby="uAreasL"></div></div>
            <div id="uMenusWrap"><label id="uMenusL">Akses menu</label>
            <div class="chips wrap" id="uPreset"><button type="button" class="chip" data-p="petugas" aria-pressed="false">Menu Petugas</button><button type="button" class="chip" data-p="penerimaan" aria-pressed="false">Menu Penerimaan</button><button type="button" class="chip" data-p="spv" aria-pressed="false">Menu SPV</button></div>
            <div class="chips wrap" id="uMenus" role="group" aria-labelledby="uMenusL"></div>
            <p class="fine">Menu yang tidak dicentang disembunyikan dari user ini. Menu User &amp; Area selalu khusus admin.</p></div>
            <label class="sw"><input type="checkbox" id="uActive" checked /><span>Aktif<small>User nonaktif tidak bisa masuk dan tidak dapat tugas baru.</small></span></label>
            <div class="btnrow"><button class="btn pri" id="uAdd">Simpan user</button><button class="btn sec" id="uCancel" hidden>Batal</button></div>
          </div>
          <h3 class="sec">Daftar area</h3>
          <div class="panel">
            <details class="hint-more"><summary>Tentang area</summary><p class="fine">Area dipakai untuk pemeriksaan per bin dan cek kesesuaian. Bin-nya datang dari kolom Area di Informasi Rak WMS, jadi nama area harus sama persis.</p></details>
            <div class="chips wrap" id="aCfgList" role="group" aria-label="Daftar area"></div>
            <div class="row2 mt"><div><label for="aCfgIn">Tambah area</label><input id="aCfgIn" placeholder="mis. A3" maxlength="12" autocomplete="off" autocapitalize="characters" /></div><div><label>&nbsp;</label><button class="btn pri sm" id="aCfgAdd" type="button">Tambah</button></div></div>
            <button class="btn sec sm mt" id="aCfgReset" type="button">Kembalikan daftar awal</button>
          </div>
          <h3 class="sec">Status area</h3>
          <div id="aStat"></div>
          <div class="panel mt-lg">
            <h3>Keamanan &amp; mode periksa</h3>
            <label class="sw"><input type="checkbox" id="swBlind" /><span>Mode hitung buta (disarankan untuk Stock Opname)<small>Qty WMS disembunyikan saat menghitung dan tombol "YA" tidak mengisi qty otomatis. Hasil hitung jadi independen.</small></span></label>
            <p class="fine">Password dan peran adalah pencegah salah pakai di perangkat bersama, bukan keamanan tingkat tinggi: data tetap ada di browser perangkat ini.</p>
            <h3 class="sec">Atur ulang password</h3>
            <p class="fine">Untuk satu user, pilih Ubah di daftar user lalu isi password baru. Tombol di bawah menghapus password SEMUA user, termasuk password Anda, dan akses jadi terbuka sampai admin membuat password lagi.</p>
            <button class="btn dng sm mt" id="uResetPin" type="button">Hapus semua password</button>
          </div>
`,Sf=`          <div class="dh">
            <div><h2 class="dup">Clearing</h2><p class="hint">Cocokkan voucher dan qty laporan dengan hasil counting.</p></div>
            <span class="sync" id="clrAt" role="status"></span>
          </div>
          <details class="hint-more"><summary>Cara kerja</summary><p class="fine">Hanya voucher dari laporan yang Anda impor yang dicocokkan; baris counting lain diabaikan. Jika satu voucher punya beberapa foto, dipakai counting terbaru. Counting dalam ikatan dibaca otomatis (qty × 25 sama dengan qty laporan dianggap cocok).</p></details>
          <div class="panel">
            <label for="clrRepFile"><span class="stepno">1</span>Laporan Voucher (.xlsx / .csv)</label>
            <input id="clrRepFile" type="file" accept=".csv,.xls,.xlsx,text/csv" />
            <p class="fine" id="clrRepInfo"></p>
            <label><span class="stepno">2</span>Hasil counting</label>
            <p class="fine" id="clrCntInfo" role="status"></p>
            <div id="clrDiag"></div>
            <div class="row-act"><button class="btn pri" id="clrLoad" type="button">Muat counting dari spreadsheet</button><button class="btn sec" id="clrRefresh" type="button" title="Ambil ulang counting terbaru dan bersihkan hasil lama">↻ Refresh</button></div>
            <div class="ximp"><label for="clrCntFile">Atau muat counting dari file</label>
            <input id="clrCntFile" type="file" accept=".csv,.xls,.xlsx,text/csv" /></div>
          </div>
          <div class="kcs mt" id="clrStats"></div>
          <div id="clrRekap"></div>
          <div class="panel mt">
            <div class="chips" id="clrChips"></div>
            <div class="chips" id="clrShChips"></div>
            <label for="clrQ">Cari voucher / item</label>
            <input id="clrQ" type="search" placeholder="Contoh: 4043814" autocomplete="off" />
            <div id="clrList" class="bin-list"></div>
          </div>
          <button class="btn pri mt ximp" id="clrCsv" type="button">Unduh hasil clearing (CSV)</button>
          <details class="mt"><summary>Salin data untuk input WMS</summary><button class="btn sec mt" id="clrCopy" type="button">Salin No Voucher + Qty</button></details>
          <div class="panel mt" id="clrSavePanel">
            <p class="fine" id="clrSaveInfo" role="status" style="margin:0 0 10px"></p>
            <button class="btn pri" id="clrSaveHist" type="button">Simpan, salin &amp; kirim ke Telegram</button>
          </div>
          <button class="ximp" data-tg="clrTg" type="button" tabindex="-1" aria-hidden="true">x</button>
          <button class="btn sec mt" id="clrTg" type="button" hidden>tg</button>
          <h3 class="sec">Riwayat clearing tersimpan</h3>
          <div id="clrHist"></div>
          <details class="panel mt" id="clrCfg">
            <summary>Pengaturan spreadsheet counting</summary>
            <div class="set">
              <label for="clrUrl">Link spreadsheet hasil counting (Google Sheets atau CSV)</label>
              <input id="clrUrl" placeholder="https://docs.google.com/spreadsheets/d/…" autocomplete="off" spellcheck="false" />
              <p class="fine">Bagikan sebagai "Siapa saja yang memiliki link (Pelihat)". Jika bukan sheet pertama, salin link saat tab sheet itu terbuka (ada gid=…).</p>
              <label for="clrStart">Data mulai baris ke</label>
              <input id="clrStart" type="number" inputmode="numeric" min="1" value="2" />
              <label for="clrCV">Kolom No Voucher</label>
              <input id="clrCV" placeholder="Huruf kolom (A, B…) atau judul, contoh: No Voucher" autocomplete="off" />
              <label for="clrCQ">Kolom Qty counting</label>
              <input id="clrCQ" placeholder="Contoh: Qty" autocomplete="off" />
              <label for="clrCK">Kolom Kode Item</label>
              <input id="clrCK" placeholder="Contoh: Kode Item" autocomplete="off" />
              <p class="fine">Shift dibaca dari kolom Shift di laporan voucher; kalau tidak ada, dihitung dari jam foto counting (Shift 1 mulai 07.00, Shift 2 15.00, Shift 3 23.00). Kolom No Lori dibaca dari kolom berjudul lori / nopol / plat.</p>
              <label for="clrAutoSel">Muat ulang counting otomatis</label>
              <select id="clrAutoSel"><option value="0">Mati</option><option value="1">tiap 1 menit</option><option value="2">tiap 2 menit</option><option value="5">tiap 5 menit</option><option value="10">tiap 10 menit</option></select>
              <button class="btn pri mt-lg" id="clrSave" type="button">Simpan &amp; muat counting</button>
            </div>
          </details>
`,wf=`          <h2>Telegram</h2>
          <p class="hint">Kirim informasi pemeriksaan ke grup atau chat Telegram lewat bot Anda.</p>
          <div class="panel">
            <label for="tgToken">Token bot</label>
            <input id="tgToken" type="password" placeholder="123456789:AA…" autocomplete="off" spellcheck="false" />
            <button class="btn sec sm mt" id="tgShow" type="button">Tampilkan token</button>
            <label for="tgChat">Chat ID</label>
            <input id="tgChat" placeholder="Contoh: -1001234567890" autocomplete="off" spellcheck="false" />
            <button class="btn sec sm mt" id="tgFind" type="button">Ambil Chat ID otomatis</button>
            <label for="tgThread">ID topik (opsional, untuk grup bertopik)</label>
            <input id="tgThread" inputmode="numeric" placeholder="kosongkan jika tidak dipakai" autocomplete="off" />
            <details class="hint-more"><summary>Cara membuat bot</summary><p class="fine">Buat bot lewat @BotFather, lalu masukkan bot ke grup (atau kirim satu pesan ke bot). Tombol "Ambil Chat ID" membaca pesan terakhir yang diterima bot.</p></details>
          </div>
          <div class="panel">
            <h2 style="font-size: 18px">Kirim otomatis</h2>
            <label class="sw"><input type="checkbox" id="swProb" /><span>Bin yang perlu review<small>Item beda atau selisih qty, saat disimpan.</small></span></label>
            <label class="sw"><input type="checkbox" id="swAll" /><span>Setiap bin yang disimpan<small>Termasuk yang sesuai. Bisa ramai.</small></span></label>
            <label class="sw"><input type="checkbox" id="swArea" /><span>Area ditutup atau dibuka kembali<small>Beserta capaian dan akurasi area.</small></span></label>
            <label class="sw"><input type="checkbox" id="swDc" /><span>DC Harian selesai<small>Stok sistem, fisik, dan selisih per item.</small></span></label>
            <details class="hint-more"><summary>Laporan lain</summary><p class="fine">Laporan lain (rekap DC, KPI, laporan muat, file Adjust) dikirim lewat tombol "Kirim ke Telegram" di halamannya masing-masing.</p></details>
          </div>
          <div class="row-act"><button class="btn pri" id="tgSave">Simpan pengaturan</button><button class="btn sec" id="tgTest">Kirim pesan tes</button></div>
          <div id="tgRes" class="note" role="status"></div>
          <div class="panel mt-lg">
            <div class="tgq" id="tgStat"></div>
            <button class="btn sec sm" id="tgRetry">Kirim ulang antrean</button>
            <button class="btn dng sm mt" id="tgClear">Kosongkan antrean</button>
            <p class="fine">Pesan yang gagal karena tidak ada sinyal ditahan di perangkat dan dikirim otomatis saat koneksi kembali. Token hanya disimpan di perangkat ini dan tidak ikut file cadangan. Siapa pun yang memegang perangkat ini bisa membacanya, jadi pakai bot khusus gudang.</p>
          </div>
`,xf=`          <div class="dh">
            <div><h2>Monitoring Kiriman</h2><p class="hint">Pantau status kiriman Anda</p></div>
            <span class="sync" id="monAt" role="status"></span>
          </div>
          <div id="dlvPanel" class="dlv">
            <div class="dh">
              <div><h3>Dashboard Delivery</h3><p class="hint" id="dlvTitle"></p></div>
              <span class="sync" id="dlvAt" role="status"></span>
            </div>
            <div id="dlvBody"></div>
            <div class="mon-bar"><button class="btn sec sm inl" id="dlvRef" type="button">Muat ulang dashboard</button><button class="btn sec sm inl" id="dlvTv" type="button" aria-pressed="false" title="Tampilkan dashboard layar penuh untuk TV">Layar TV</button></div>
            <details id="dlvSet">
              <summary>Sumber dashboard delivery</summary>
              <div class="set">
                <label for="dlvUrl">Alamat spreadsheet dashboard (tab dengan gid=…)</label>
                <input id="dlvUrl" placeholder="https://docs.google.com/spreadsheets/d/…" autocomplete="off" spellcheck="false" />
                <p class="fine">Spreadsheet harus dibagikan "Siapa saja yang memiliki link (Pelihat)" atau di-publish ke web. Salin link saat tab dashboard terbuka agar ada gid=….</p>
                <label for="dlvAuto">Muat ulang otomatis</label>
                <select id="dlvAuto"><option value="0">Mati</option><option value="0.5">tiap 30 detik</option><option value="1">tiap 1 menit</option><option value="2">tiap 2 menit</option><option value="5">tiap 5 menit</option><option value="10">tiap 10 menit</option></select>
                <button class="btn pri mt" id="dlvSave" type="button">Simpan &amp; muat</button>
              </div>
            </details>
          </div>
          <div id="monClr"></div>
          <div class="dflt">
            <label class="dsel"><small>Periode</small><select id="monPer"><option value="1">Hari ini</option><option value="7">7 Hari</option><option value="30">30 Hari</option></select></label>
            <label class="dsel"><small>Unit / Area</small><select id="monUnit"><option value="">Semua Unit</option></select></label>
          </div>
          <div class="mon-bar"><button class="btn sec sm inl" id="monRef">Muat ulang</button></div>
          <div id="monMsg"></div>
          <div id="monOver"></div>
          <div id="monCmp"></div>
          <div class="chips" id="monTools"></div>
          <div id="monList"></div>
          <button class="btn pri mt" id="monTg">Kirim ringkasan ke Telegram</button>
          <details class="mt-lg" id="monSet">
            <summary>Pengaturan sumber &amp; kolom</summary>
            <div class="set">
              <label for="monUrl">Alamat spreadsheet (Google Sheets atau link CSV)</label>
              <input id="monUrl" placeholder="https://docs.google.com/spreadsheets/d/…" autocomplete="off" spellcheck="false" />
              <p class="fine">Spreadsheet harus dibagikan "Siapa saja yang memiliki link (Pelihat)" atau di-publish ke web. Jika sheet bukan yang pertama, salin link saat tab sheet itu terbuka (ada gid=…).</p>
              <div class="row2">
                <div><label for="monStart">Data mulai baris ke</label><input id="monStart" type="number" inputmode="numeric" min="1" value="2" /></div>
                <div><label for="monAuto">Muat ulang otomatis</label>
                  <select id="monAuto"><option value="0">Mati</option><option value="1">tiap 1 menit</option><option value="2">tiap 2 menit</option><option value="5">tiap 5 menit</option><option value="10">tiap 10 menit</option></select></div>
              </div>
              <label id="monMapL">Kolom yang diambil</label>
              <p class="fine">Isi huruf kolom (A, B, C …) atau sebagian judul kolom. Kosongkan jika tidak dipakai. Baris yang namanya "Total" atau "Jumlah" dilewati, total dihitung otomatis.</p>
              <div id="monMap" role="group" aria-labelledby="monMapL"></div>
              <button class="btn sec sm mt" id="monAdd" type="button">Tambah kolom lain</button>
              <label class="sw"><input type="checkbox" id="monAlert" /><span>Kabari Telegram jika ada mobil gagal masuk baru<small>Dicek setiap data dimuat ulang. Perlu pengaturan Telegram.</small></span></label>
              <button class="btn pri mt-lg" id="monSave">Simpan &amp; muat data</button>
              <button class="btn sec mt" id="monPrevBtn">Lihat isi spreadsheet (pratinjau kolom)</button>
              <div id="monPrev"></div>
              <div class="ximp"><label for="monFile">Atau muat dari file (.csv / .xlsx)</label>
              <input id="monFile" type="file" accept=".csv,.xls,.xlsx,text/csv" />
              <p class="fine">Data dari file tidak diperbarui otomatis.</p></div>
            </div>
          </details>
`,$f=`            <h2>Data acuan WMS</h2>
            <p class="hint">
              Impor Informasi Rak dari WMS (Excel atau CSV). Hasil pemeriksaan lama dikosongkan.
            </p>
            <div class="panel">
              <label for="file">Pilih file</label
              ><input id="file" type="file" accept=".xlsx,.xls,.csv,text/csv" />
              <button class="btn pri mt-lg" id="btnImp">Impor data WMS</button>
              <details class="hint-more"><summary>Format file</summary><p class="fine">
                Kolom wajib: Area, Rak (atau Bin), Kode Item, Nama Item, Onhand. Baris judul di atas header
                diabaikan.
              </p></details>
            </div>
            <div class="panel" id="lkPanel">
              <h2 style="font-size: 18px">Tautan laporan</h2>
              <p class="fine">Semua sumber spreadsheet. Yang <b>Bawaan</b> atau <b>Tersimpan di server</b> otomatis terbuka di HP lain tanpa mengisi ulang.</p>
              <div id="lkList" class="lk-list"></div>
            </div>
            <div class="panel">
              <h2 style="font-size: 18px">Sinkron Google Sheets</h2>
              <p class="hint">Hasil periksa, DC, tugas, dan petugas disinkronkan antar perangkat dan tersalin ke Google Sheets Anda. </p>
              <label for="syUrl">URL Web app (Apps Script)</label>
              <input id="syUrl" placeholder="https://script.google.com/macros/s/…/exec" autocomplete="off" spellcheck="false" />
              <label for="syTok">Token</label>
              <input id="syTok" type="password" autocomplete="off" spellcheck="false" />
              <label class="sw"><input type="checkbox" id="syAuto" checked /><span>Sinkron otomatis<small>Kirim beberapa detik setelah ada perubahan dan cek pembaruan tiap 45 detik. Tanpa internet, data tetap aman di perangkat dan dikirim saat online.</small></span></label>
              <p class="fine" id="syInfo"></p>
              <div class="row-act"><button class="btn pri" id="syGo" type="button">Simpan dan sinkron</button><button class="btn sec" id="syNow" type="button">Sinkron sekarang</button></div>
              <button class="btn dng sm mt" id="syOff" type="button" hidden>Putuskan</button>
            </div>
            <div class="panel">
              <h2 style="font-size: 18px">Cadangan data</h2>
              <p class="hint" id="bkInfo"></p>
              <div class="meter" id="bkMeter"><i style="width: 0"></i></div>
              <p class="fine" id="bkSt"></p>
              <button class="btn pri ximp" id="bkNow">Unduh cadangan (.json)</button>
              <label for="bkFile">Pulihkan dari file cadangan</label>
              <input id="bkFile" type="file" accept=".json,application/json" />
              <button class="btn sec mt" id="bkRestore">Pulihkan data</button>
              <details class="hint-more"><summary>Isi cadangan</summary><p class="fine">Cadangan memuat data WMS, hasil periksa, DC, petugas, dan status area. Simpan filenya di tempat aman (misalnya kirim ke WhatsApp sendiri).</p></details>
            </div>
            <div class="panel">
              <div id="dataInfo" class="hint"></div>
              <button class="btn dng sm mt" id="btnClear">
                Hapus semua hasil pemeriksaan
              </button>
            </div>
`,Cf=`      <div class="sh-head">
        <button class="x" id="shX" aria-label="Tutup"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <div><b id="shBin"></b><small id="shPos"></small></div>
      </div>
      <div class="sh-body">
        <div class="itembox"><div id="shItem"></div></div>
        <label id="mLbl">1. Barang di bin sama dengan data WMS?</label>
        <div class="choice" role="group" aria-labelledby="mLbl">
          <button class="yes" id="yes" aria-pressed="false">YA, SAMA</button><button class="no" id="no" aria-pressed="false">TIDAK</button>
        </div>
        <div id="diffWrap" hidden>
          <div class="warn">Barang berbeda. Catat barang lain yang ada di bin ini beserta qty-nya.</div>
          <div id="lines"></div>
          <button class="btn sec sm mt" id="addL">Tambah barang lain</button>
        </div>
        <label for="qty" id="qLbl">2. Qty fisik</label>
        <div class="qtyrow">
          <button id="qm" aria-label="Kurangi">−</button
          ><input id="qty" type="number" inputmode="numeric" enterkeyhint="done" min="0" step="1" placeholder="0" autocomplete="off" /><button
            id="qp"
            aria-label="Tambah"
          >
            +
          </button>
        </div>
        <button class="btn sec sm mt" id="qSame"></button>
        <div id="prev"></div>
        <label for="note">Catatan (opsional)</label
        ><input id="note" placeholder="Contoh: label tidak terbaca" maxlength="200" enterkeyhint="done" autocomplete="off" />
      </div>
      <div class="sh-foot">
        <div class="err" id="err" role="alert"></div>
        <button class="btn sec sm ximp" id="errBk" hidden>Unduh cadangan sekarang</button>
        <button class="btn sec sm" id="shUndo" type="button" hidden>Urungkan simpan terakhir</button>
        <div class="sh-step">
          <button class="nv" id="shPrev" type="button" aria-label="Bin sebelumnya" title="Bin sebelumnya"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
          <button class="btn pri" id="save">Simpan &amp; lanjut</button>
          <button class="nv" id="shNext" type="button" aria-label="Bin berikutnya" title="Bin berikutnya"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
        </div>
      </div>
`,Af=`      <div class="sh-head">
        <button class="x" id="pkX" aria-label="Tutup"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <div><b>Pilih item DC</b><small id="pkCount"></small></div>
      </div>
      <div class="sh-body">
        <input id="pkQ" type="search" placeholder="Cari item atau kode" autocomplete="off" aria-label="Cari item" />
        <div class="row2 mt"><button class="btn sec sm" id="pkAll">Pilih semua hasil</button><button class="btn sec sm" id="pkNone">Kosongkan hasil</button></div>
        <div id="pkList" class="mt-lg"></div>
      </div>
      <div class="sh-foot"><button class="btn pri" id="pkOk">Selesai</button></div>
`,Tf=`      <div class="sh-head">
        <button class="x" id="dcX" aria-label="Tutup"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <div><b id="dcName"></b><small id="dcKode"></small></div>
      </div>
      <div class="sh-body">
        <div class="dcinfo" id="dcInfo" hidden></div>
        <div class="itembox">
          <label for="dcSys" style="margin-top: 0">Stok sistem (QAD)</label>
          <input id="dcSys" type="number" inputmode="numeric" min="0" step="1" />
          <p class="fine" id="dcSysHint"></p>
        </div>
        <label id="dcSugL">Rak di WMS untuk item ini (ketuk untuk menambah)</label>
        <div class="chips wrap" id="dcSug" role="group" aria-labelledby="dcSugL"></div>
        <label id="dcRowsL">Hasil hitung per rak</label>
        <div id="dcRows" role="group" aria-labelledby="dcRowsL"></div>
        <button class="btn sec sm mt" id="dcAdd">Tambah rak</button>
        <p class="fine" id="dcMiss"></p>
        <div id="dcAdjWrap" hidden>
          <label for="dcAdjRak">Catat selisih di rak</label>
          <select id="dcAdjRak"></select>
          <p class="fine">Selisih total dicatat pada satu rak untuk file Adjust.</p>
        </div>
        <datalist id="dcRakList"></datalist>
      </div>
      <div class="sh-foot">
        <div class="err" id="dcErr" role="alert"></div>
        <div class="tot" id="dcTot"></div>
        <div class="row2"><button class="btn sec" id="dcDraft">Simpan draft</button><button class="btn pri" id="dcDone">Selesai</button></div>
        <div class="row2" id="dcLockBar"><button class="btn pri" id="dcLockClose" type="button">Tutup</button><button class="btn dng" id="dcUnlock" type="button" hidden>Buka kunci (SPV)</button></div>
      </div>
`,_f=`      <div role="dialog" aria-labelledby="navT">
        <h3 id="navT">Menu di navigasi bawah</h3>
        <p class="fine" id="navH"></p>
        <div class="chips wrap" id="navChips" role="group" aria-labelledby="navT"></div>
        <button class="btn pri mt" id="navSave" type="button">Simpan</button>
        <button class="btn sec mt" id="navReset" type="button">Kembalikan standar</button>
        <button class="btn sec mt" id="navCancel" type="button">Batal</button>
      </div>
`,Mf=`      <div role="dialog" aria-labelledby="lgT">
        <h3 id="lgT">Masuk ke Stock Control</h3>
        <p>Pilih nama, lalu masukkan password.</p>
        <select id="lgUser" aria-label="Nama"></select>
        <div id="lgPinWrap"><input id="lgPin" type="password" maxlength="64" placeholder="Password" autocomplete="current-password" aria-label="Password" /><button class="btn sec sm mt" id="lgShow" type="button" aria-pressed="false">Tampilkan password</button></div>
        <div class="err" id="lgErr" role="alert"></div>
        <button class="btn pri" id="lgOk">Masuk</button>
        <details><summary>Lupa password admin? (darurat)</summary><div><p class="fine">Minta admin lain mengatur ulang password Anda lewat menu User &amp; Area. Hanya jika tidak ada admin lain, tombol di bawah menghapus SEMUA password di perangkat ini (data pemeriksaan tetap). Anda harus mengetik RESET dan menunggu 3 detik. Setelah itu atur password admin lagi di menu User &amp; Area.</p><button class="btn dng sm" id="lgReset" type="button">Hapus semua password</button></div></details>
      </div>
`,jf=`      <div role="dialog" aria-labelledby="lsT">
        <h3 id="lsT">Aktifkan login</h3>
        <p>Buat password admin supaya aplikasi meminta nama dan password setiap dibuka. Setelah disimpan, Anda langsung masuk sebagai admin dan tombol Keluar muncul di menu samping.</p>
        <label for="lsName">Nama admin</label>
        <input id="lsName" maxlength="40" autocomplete="username" />
        <label for="lsPin">Password (minimal 6 karakter)</label>
        <input id="lsPin" type="password" maxlength="64" autocomplete="new-password" />
        <label for="lsPin2">Ulangi password</label>
        <input id="lsPin2" type="password" maxlength="64" autocomplete="new-password" />
        <div class="err" id="lsErr" role="alert"></div>
        <button class="btn pri" id="lsOk">Aktifkan login</button>
        <button class="btn sec mt" id="lsLater" type="button">Nanti saja</button>
      </div>
`,Df=`      <div class="sh-head">
        <button class="x" id="padX" aria-label="Tutup"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <div><b>Cari bin</b><small>Ketuk kode yang tertulis di rak</small></div>
      </div>
      <div class="sh-body">
        <div class="pad-disp" id="padDisp" aria-live="polite"></div>
        <div id="padRes"></div>
      </div>
      <div class="sh-foot"><div class="padkeys" id="padKeys"></div></div>
`,Nf=[["so",pf],["dc",ff],["check",gf],["adj",hf],["task",kf],["kes",vf],["muat",bf],["usr",yf],["clr",Sf]],Lf=[["tg",wf],["mon",xf],["data",$f]];function Rf(){_n.useEffect(()=>uf(),[]);const l=([u,m])=>o.jsx(Ee,{as:"section",id:"v-"+u,hidden:u!=="so",html:m},u);return o.jsxs(o.Fragment,{children:[o.jsx("a",{href:"#main",className:"skip",children:"Lewati ke konten utama"}),o.jsxs("div",{className:"app",children:[o.jsx(Ee,{as:"header",html:df}),o.jsx("div",{className:"content",children:o.jsxs("main",{id:"main",tabIndex:-1,children:[o.jsx("div",{className:"guard",id:"guard","aria-live":"polite"}),Nf.map(l),o.jsx(tp,{}),o.jsx(rp,{}),o.jsx(xp,{}),Lf.map(l)]})}),o.jsx("div",{className:"scrim",id:"scrim"}),o.jsx(Ee,{as:"aside",className:"side",id:"side","aria-label":"Menu",html:cf}),o.jsx(Ee,{as:"nav",className:"tabs",id:"tabs","aria-label":"Navigasi utama",html:mf})]}),o.jsx(Ee,{className:"sheet",id:"sheet",role:"dialog","aria-modal":"true","aria-label":"Periksa bin",hidden:!0,html:Cf}),o.jsx(Ee,{className:"sheet",id:"dcPickSheet",role:"dialog","aria-modal":"true","aria-label":"Pilih item DC",hidden:!0,html:Af}),o.jsx(Ee,{className:"sheet",id:"dcSheet",role:"dialog","aria-modal":"true","aria-label":"Hitung item DC",hidden:!0,html:Tf}),o.jsx("div",{id:"dlg",className:"dlg",role:"dialog","aria-modal":"true","aria-labelledby":"dlgT",hidden:!0}),o.jsx(Ee,{className:"dlg",id:"navSet",style:{zIndex:95},hidden:!0,html:_f}),o.jsx(Ee,{className:"dlg",id:"login",style:{zIndex:100},hidden:!0,html:Mf}),o.jsx(Ee,{className:"dlg",id:"lgSetup",style:{zIndex:100},hidden:!0,html:jf}),o.jsx(Ee,{className:"sheet",id:"padSheet",role:"dialog","aria-modal":"true","aria-label":"Cari bin",hidden:!0,html:Df}),o.jsx("div",{id:"toast",className:"off",role:"status","aria-live":"polite","aria-atomic":"true"})]})}window.WMS_CONFIG=Hm;try{const l=JSON.parse(localStorage.getItem("warehouse_so_disp_v1")||"{}");l.out&&document.documentElement.classList.add("outdoor"),document.documentElement.style.setProperty("--ts",[1,1.15,1.3][l.ts]||1)}catch{}Im.createRoot(document.getElementById("root")).render(o.jsx(Rf,{}));"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});
