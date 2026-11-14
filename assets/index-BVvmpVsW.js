(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const j of document.querySelectorAll('link[rel="modulepreload"]'))$(j);new MutationObserver(j=>{for(const w of j)if(w.type==="childList")for(const C of w.addedNodes)C.tagName==="LINK"&&C.rel==="modulepreload"&&$(C)}).observe(document,{childList:!0,subtree:!0});function p(j){const w={};return j.integrity&&(w.integrity=j.integrity),j.referrerPolicy&&(w.referrerPolicy=j.referrerPolicy),j.crossOrigin==="use-credentials"?w.credentials="include":j.crossOrigin==="anonymous"?w.credentials="omit":w.credentials="same-origin",w}function $(j){if(j.ep)return;j.ep=!0;const w=p(j);fetch(j.href,w)}})();var pl={exports:{}},ti={},fl={exports:{}},kn={};var cd;function Lm(){if(cd)return kn;cd=1;var l=Symbol.for("react.element"),d=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),$=Symbol.for("react.strict_mode"),j=Symbol.for("react.profiler"),w=Symbol.for("react.provider"),C=Symbol.for("react.context"),b=Symbol.for("react.forward_ref"),x=Symbol.for("react.suspense"),A=Symbol.for("react.memo"),rn=Symbol.for("react.lazy"),J=Symbol.iterator;function V(h){return h===null||typeof h!="object"?null:(h=J&&h[J]||h["@@iterator"],typeof h=="function"?h:null)}var U={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,G={};function tn(h,T,cn){this.props=h,this.context=T,this.refs=G,this.updater=cn||U}tn.prototype.isReactComponent={},tn.prototype.setState=function(h,T){if(typeof h!="object"&&typeof h!="function"&&h!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,h,T,"setState")},tn.prototype.forceUpdate=function(h){this.updater.enqueueForceUpdate(this,h,"forceUpdate")};function q(){}q.prototype=tn.prototype;function sn(h,T,cn){this.props=h,this.context=T,this.refs=G,this.updater=cn||U}var dn=sn.prototype=new q;dn.constructor=sn,R(dn,tn.prototype),dn.isPureReactComponent=!0;var vn=Array.isArray,gn=Object.prototype.hasOwnProperty,wn={current:null},hn={key:!0,ref:!0,__self:!0,__source:!0};function xn(h,T,cn){var pn,y={},H=null,fn=null;if(T!=null)for(pn in T.ref!==void 0&&(fn=T.ref),T.key!==void 0&&(H=""+T.key),T)gn.call(T,pn)&&!hn.hasOwnProperty(pn)&&(y[pn]=T[pn]);var _=arguments.length-2;if(_===1)y.children=cn;else if(1<_){for(var I=Array(_),Cn=0;Cn<_;Cn++)I[Cn]=arguments[Cn+2];y.children=I}if(h&&h.defaultProps)for(pn in _=h.defaultProps,_)y[pn]===void 0&&(y[pn]=_[pn]);return{$$typeof:l,type:h,key:H,ref:fn,props:y,_owner:wn.current}}function nn(h,T){return{$$typeof:l,type:h.type,key:T,ref:h.ref,props:h.props,_owner:h._owner}}function bn(h){return typeof h=="object"&&h!==null&&h.$$typeof===l}function $n(h){var T={"=":"=0",":":"=2"};return"$"+h.replace(/[=:]/g,function(cn){return T[cn]})}var yn=/\/+/g;function Tn(h,T){return typeof h=="object"&&h!==null&&h.key!=null?$n(""+h.key):T.toString(36)}function In(h,T,cn,pn,y){var H=typeof h;(H==="undefined"||H==="boolean")&&(h=null);var fn=!1;if(h===null)fn=!0;else switch(H){case"string":case"number":fn=!0;break;case"object":switch(h.$$typeof){case l:case d:fn=!0}}if(fn)return fn=h,y=y(fn),h=pn===""?"."+Tn(fn,0):pn,vn(y)?(cn="",h!=null&&(cn=h.replace(yn,"$&/")+"/"),In(y,T,cn,"",function(Cn){return Cn})):y!=null&&(bn(y)&&(y=nn(y,cn+(!y.key||fn&&fn.key===y.key?"":(""+y.key).replace(yn,"$&/")+"/")+h)),T.push(y)),1;if(fn=0,pn=pn===""?".":pn+":",vn(h))for(var _=0;_<h.length;_++){H=h[_];var I=pn+Tn(H,_);fn+=In(H,T,cn,I,y)}else if(I=V(h),typeof I=="function")for(h=I.call(h),_=0;!(H=h.next()).done;)H=H.value,I=pn+Tn(H,_++),fn+=In(H,T,cn,I,y);else if(H==="object")throw T=String(h),Error("Objects are not valid as a React child (found: "+(T==="[object Object]"?"object with keys {"+Object.keys(h).join(", ")+"}":T)+"). If you meant to render a collection of children, use an array instead.");return fn}function qn(h,T,cn){if(h==null)return h;var pn=[],y=0;return In(h,pn,"","",function(H){return T.call(cn,H,y++)}),pn}function D(h){if(h._status===-1){var T=h._result;T=T(),T.then(function(cn){(h._status===0||h._status===-1)&&(h._status=1,h._result=cn)},function(cn){(h._status===0||h._status===-1)&&(h._status=2,h._result=cn)}),h._status===-1&&(h._status=0,h._result=T)}if(h._status===1)return h._result.default;throw h._result}var ln={current:null},B={transition:null},Y={ReactCurrentDispatcher:ln,ReactCurrentBatchConfig:B,ReactCurrentOwner:wn};function F(){throw Error("act(...) is not supported in production builds of React.")}return kn.Children={map:qn,forEach:function(h,T,cn){qn(h,function(){T.apply(this,arguments)},cn)},count:function(h){var T=0;return qn(h,function(){T++}),T},toArray:function(h){return qn(h,function(T){return T})||[]},only:function(h){if(!bn(h))throw Error("React.Children.only expected to receive a single React element child.");return h}},kn.Component=tn,kn.Fragment=p,kn.Profiler=j,kn.PureComponent=sn,kn.StrictMode=$,kn.Suspense=x,kn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Y,kn.act=F,kn.cloneElement=function(h,T,cn){if(h==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+h+".");var pn=R({},h.props),y=h.key,H=h.ref,fn=h._owner;if(T!=null){if(T.ref!==void 0&&(H=T.ref,fn=wn.current),T.key!==void 0&&(y=""+T.key),h.type&&h.type.defaultProps)var _=h.type.defaultProps;for(I in T)gn.call(T,I)&&!hn.hasOwnProperty(I)&&(pn[I]=T[I]===void 0&&_!==void 0?_[I]:T[I])}var I=arguments.length-2;if(I===1)pn.children=cn;else if(1<I){_=Array(I);for(var Cn=0;Cn<I;Cn++)_[Cn]=arguments[Cn+2];pn.children=_}return{$$typeof:l,type:h.type,key:y,ref:H,props:pn,_owner:fn}},kn.createContext=function(h){return h={$$typeof:C,_currentValue:h,_currentValue2:h,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},h.Provider={$$typeof:w,_context:h},h.Consumer=h},kn.createElement=xn,kn.createFactory=function(h){var T=xn.bind(null,h);return T.type=h,T},kn.createRef=function(){return{current:null}},kn.forwardRef=function(h){return{$$typeof:b,render:h}},kn.isValidElement=bn,kn.lazy=function(h){return{$$typeof:rn,_payload:{_status:-1,_result:h},_init:D}},kn.memo=function(h,T){return{$$typeof:A,type:h,compare:T===void 0?null:T}},kn.startTransition=function(h){var T=B.transition;B.transition={};try{h()}finally{B.transition=T}},kn.unstable_act=F,kn.useCallback=function(h,T){return ln.current.useCallback(h,T)},kn.useContext=function(h){return ln.current.useContext(h)},kn.useDebugValue=function(){},kn.useDeferredValue=function(h){return ln.current.useDeferredValue(h)},kn.useEffect=function(h,T){return ln.current.useEffect(h,T)},kn.useId=function(){return ln.current.useId()},kn.useImperativeHandle=function(h,T,cn){return ln.current.useImperativeHandle(h,T,cn)},kn.useInsertionEffect=function(h,T){return ln.current.useInsertionEffect(h,T)},kn.useLayoutEffect=function(h,T){return ln.current.useLayoutEffect(h,T)},kn.useMemo=function(h,T){return ln.current.useMemo(h,T)},kn.useReducer=function(h,T,cn){return ln.current.useReducer(h,T,cn)},kn.useRef=function(h){return ln.current.useRef(h)},kn.useState=function(h){return ln.current.useState(h)},kn.useSyncExternalStore=function(h,T,cn){return ln.current.useSyncExternalStore(h,T,cn)},kn.useTransition=function(){return ln.current.useTransition()},kn.version="18.3.1",kn}var md;function _l(){return md||(md=1,fl.exports=Lm()),fl.exports}var pd;function Nm(){if(pd)return ti;pd=1;var l=_l(),d=Symbol.for("react.element"),p=Symbol.for("react.fragment"),$=Object.prototype.hasOwnProperty,j=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,w={key:!0,ref:!0,__self:!0,__source:!0};function C(b,x,A){var rn,J={},V=null,U=null;A!==void 0&&(V=""+A),x.key!==void 0&&(V=""+x.key),x.ref!==void 0&&(U=x.ref);for(rn in x)$.call(x,rn)&&!w.hasOwnProperty(rn)&&(J[rn]=x[rn]);if(b&&b.defaultProps)for(rn in x=b.defaultProps,x)J[rn]===void 0&&(J[rn]=x[rn]);return{$$typeof:d,type:b,key:V,ref:U,props:J,_owner:j.current}}return ti.Fragment=p,ti.jsx=C,ti.jsxs=C,ti}var fd;function Rm(){return fd||(fd=1,pl.exports=Nm()),pl.exports}var o=Rm(),bs={},gl={exports:{}},me={},hl={exports:{}},kl={};var gd;function Em(){return gd||(gd=1,(function(l){function d(B,Y){var F=B.length;B.push(Y);n:for(;0<F;){var h=F-1>>>1,T=B[h];if(0<j(T,Y))B[h]=Y,B[F]=T,F=h;else break n}}function p(B){return B.length===0?null:B[0]}function $(B){if(B.length===0)return null;var Y=B[0],F=B.pop();if(F!==Y){B[0]=F;n:for(var h=0,T=B.length,cn=T>>>1;h<cn;){var pn=2*(h+1)-1,y=B[pn],H=pn+1,fn=B[H];if(0>j(y,F))H<T&&0>j(fn,y)?(B[h]=fn,B[H]=F,h=H):(B[h]=y,B[pn]=F,h=pn);else if(H<T&&0>j(fn,F))B[h]=fn,B[H]=F,h=H;else break n}}return Y}function j(B,Y){var F=B.sortIndex-Y.sortIndex;return F!==0?F:B.id-Y.id}if(typeof performance=="object"&&typeof performance.now=="function"){var w=performance;l.unstable_now=function(){return w.now()}}else{var C=Date,b=C.now();l.unstable_now=function(){return C.now()-b}}var x=[],A=[],rn=1,J=null,V=3,U=!1,R=!1,G=!1,tn=typeof setTimeout=="function"?setTimeout:null,q=typeof clearTimeout=="function"?clearTimeout:null,sn=typeof setImmediate!="undefined"?setImmediate:null;typeof navigator!="undefined"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function dn(B){for(var Y=p(A);Y!==null;){if(Y.callback===null)$(A);else if(Y.startTime<=B)$(A),Y.sortIndex=Y.expirationTime,d(x,Y);else break;Y=p(A)}}function vn(B){if(G=!1,dn(B),!R)if(p(x)!==null)R=!0,D(gn);else{var Y=p(A);Y!==null&&ln(vn,Y.startTime-B)}}function gn(B,Y){R=!1,G&&(G=!1,q(xn),xn=-1),U=!0;var F=V;try{for(dn(Y),J=p(x);J!==null&&(!(J.expirationTime>Y)||B&&!$n());){var h=J.callback;if(typeof h=="function"){J.callback=null,V=J.priorityLevel;var T=h(J.expirationTime<=Y);Y=l.unstable_now(),typeof T=="function"?J.callback=T:J===p(x)&&$(x),dn(Y)}else $(x);J=p(x)}if(J!==null)var cn=!0;else{var pn=p(A);pn!==null&&ln(vn,pn.startTime-Y),cn=!1}return cn}finally{J=null,V=F,U=!1}}var wn=!1,hn=null,xn=-1,nn=5,bn=-1;function $n(){return!(l.unstable_now()-bn<nn)}function yn(){if(hn!==null){var B=l.unstable_now();bn=B;var Y=!0;try{Y=hn(!0,B)}finally{Y?Tn():(wn=!1,hn=null)}}else wn=!1}var Tn;if(typeof sn=="function")Tn=function(){sn(yn)};else if(typeof MessageChannel!="undefined"){var In=new MessageChannel,qn=In.port2;In.port1.onmessage=yn,Tn=function(){qn.postMessage(null)}}else Tn=function(){tn(yn,0)};function D(B){hn=B,wn||(wn=!0,Tn())}function ln(B,Y){xn=tn(function(){B(l.unstable_now())},Y)}l.unstable_IdlePriority=5,l.unstable_ImmediatePriority=1,l.unstable_LowPriority=4,l.unstable_NormalPriority=3,l.unstable_Profiling=null,l.unstable_UserBlockingPriority=2,l.unstable_cancelCallback=function(B){B.callback=null},l.unstable_continueExecution=function(){R||U||(R=!0,D(gn))},l.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):nn=0<B?Math.floor(1e3/B):5},l.unstable_getCurrentPriorityLevel=function(){return V},l.unstable_getFirstCallbackNode=function(){return p(x)},l.unstable_next=function(B){switch(V){case 1:case 2:case 3:var Y=3;break;default:Y=V}var F=V;V=Y;try{return B()}finally{V=F}},l.unstable_pauseExecution=function(){},l.unstable_requestPaint=function(){},l.unstable_runWithPriority=function(B,Y){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var F=V;V=B;try{return Y()}finally{V=F}},l.unstable_scheduleCallback=function(B,Y,F){var h=l.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?h+F:h):F=h,B){case 1:var T=-1;break;case 2:T=250;break;case 5:T=1073741823;break;case 4:T=1e4;break;default:T=5e3}return T=F+T,B={id:rn++,callback:Y,priorityLevel:B,startTime:F,expirationTime:T,sortIndex:-1},F>h?(B.sortIndex=F,d(A,B),p(x)===null&&B===p(A)&&(G?(q(xn),xn=-1):G=!0,ln(vn,F-h))):(B.sortIndex=T,d(x,B),R||U||(R=!0,D(gn))),B},l.unstable_shouldYield=$n,l.unstable_wrapCallback=function(B){var Y=V;return function(){var F=V;V=Y;try{return B.apply(this,arguments)}finally{V=F}}}})(kl)),kl}var hd;function Pm(){return hd||(hd=1,hl.exports=Em()),hl.exports}var kd;function Bm(){if(kd)return me;kd=1;var l=_l(),d=Pm();function p(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var $=new Set,j={};function w(n,e){C(n,e),C(n+"Capture",e)}function C(n,e){for(j[n]=e,n=0;n<e.length;n++)$.add(e[n])}var b=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),x=Object.prototype.hasOwnProperty,A=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,rn={},J={};function V(n){return x.call(J,n)?!0:x.call(rn,n)?!1:A.test(n)?J[n]=!0:(rn[n]=!0,!1)}function U(n,e,t,a){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return a?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function R(n,e,t,a){if(e===null||typeof e=="undefined"||U(n,e,t,a))return!0;if(a)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function G(n,e,t,a,i,s,r){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=a,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=r}var tn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){tn[n]=new G(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];tn[e]=new G(e,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){tn[n]=new G(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){tn[n]=new G(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){tn[n]=new G(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){tn[n]=new G(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){tn[n]=new G(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){tn[n]=new G(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){tn[n]=new G(n,5,!1,n.toLowerCase(),null,!1,!1)});var q=/[\-:]([a-z])/g;function sn(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(q,sn);tn[e]=new G(e,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(q,sn);tn[e]=new G(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(q,sn);tn[e]=new G(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){tn[n]=new G(n,1,!1,n.toLowerCase(),null,!1,!1)}),tn.xlinkHref=new G("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){tn[n]=new G(n,1,!1,n.toLowerCase(),null,!0,!0)});function dn(n,e,t,a){var i=tn.hasOwnProperty(e)?tn[e]:null;(i!==null?i.type!==0:a||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(R(e,t,i,a)&&(t=null),a||i===null?V(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):i.mustUseProperty?n[i.propertyName]=t===null?i.type===3?!1:"":t:(e=i.attributeName,a=i.attributeNamespace,t===null?n.removeAttribute(e):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,a?n.setAttributeNS(a,e,t):n.setAttribute(e,t))))}var vn=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,gn=Symbol.for("react.element"),wn=Symbol.for("react.portal"),hn=Symbol.for("react.fragment"),xn=Symbol.for("react.strict_mode"),nn=Symbol.for("react.profiler"),bn=Symbol.for("react.provider"),$n=Symbol.for("react.context"),yn=Symbol.for("react.forward_ref"),Tn=Symbol.for("react.suspense"),In=Symbol.for("react.suspense_list"),qn=Symbol.for("react.memo"),D=Symbol.for("react.lazy"),ln=Symbol.for("react.offscreen"),B=Symbol.iterator;function Y(n){return n===null||typeof n!="object"?null:(n=B&&n[B]||n["@@iterator"],typeof n=="function"?n:null)}var F=Object.assign,h;function T(n){if(h===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);h=e&&e[1]||""}return`
`+h+n}var cn=!1;function pn(n,e){if(!n||cn)return"";cn=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(S){var a=S}Reflect.construct(n,[],e)}else{try{e.call()}catch(S){a=S}n.call(e.prototype)}else{try{throw Error()}catch(S){a=S}n()}}catch(S){if(S&&a&&typeof S.stack=="string"){for(var i=S.stack.split(`
`),s=a.stack.split(`
`),r=i.length-1,c=s.length-1;1<=r&&0<=c&&i[r]!==s[c];)c--;for(;1<=r&&0<=c;r--,c--)if(i[r]!==s[c]){if(r!==1||c!==1)do if(r--,c--,0>c||i[r]!==s[c]){var f=`
`+i[r].replace(" at new "," at ");return n.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",n.displayName)),f}while(1<=r&&0<=c);break}}}finally{cn=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?T(n):""}function y(n){switch(n.tag){case 5:return T(n.type);case 16:return T("Lazy");case 13:return T("Suspense");case 19:return T("SuspenseList");case 0:case 2:case 15:return n=pn(n.type,!1),n;case 11:return n=pn(n.type.render,!1),n;case 1:return n=pn(n.type,!0),n;default:return""}}function H(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case hn:return"Fragment";case wn:return"Portal";case nn:return"Profiler";case xn:return"StrictMode";case Tn:return"Suspense";case In:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case $n:return(n.displayName||"Context")+".Consumer";case bn:return(n._context.displayName||"Context")+".Provider";case yn:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case qn:return e=n.displayName||null,e!==null?e:H(n.type)||"Memo";case D:e=n._payload,n=n._init;try{return H(n(e))}catch{}}return null}function fn(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return H(e);case 8:return e===xn?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function _(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function I(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Cn(n){var e=I(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),a=""+n[e];if(!n.hasOwnProperty(e)&&typeof t!="undefined"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return i.call(this)},set:function(r){a=""+r,s.call(this,r)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return a},setValue:function(r){a=""+r},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function Ln(n){n._valueTracker||(n._valueTracker=Cn(n))}function fe(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),a="";return n&&(a=I(n)?n.checked?"true":"false":n.value),n=a,n!==t?(e.setValue(n),!0):!1}function Gn(n){if(n=n||(typeof document!="undefined"?document:void 0),typeof n=="undefined")return null;try{return n.activeElement||n.body}catch{return n.body}}function tt(n,e){var t=e.checked;return F({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t!=null?t:n._wrapperState.initialChecked})}function M(n,e){var t=e.defaultValue==null?"":e.defaultValue,a=e.checked!=null?e.checked:e.defaultChecked;t=_(e.value!=null?e.value:t),n._wrapperState={initialChecked:a,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function an(n,e){e=e.checked,e!=null&&dn(n,"checked",e,!1)}function qe(n,e){an(n,e);var t=_(e.value),a=e.type;if(t!=null)a==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(a==="submit"||a==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?Ve(n,e.type,t):e.hasOwnProperty("defaultValue")&&Ve(n,e.type,_(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function Pe(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var a=e.type;if(!(a!=="submit"&&a!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function Ve(n,e,t){(e!=="number"||Gn(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var _t=Array.isArray;function On(n,e,t,a){if(n=n.options,e){e={};for(var i=0;i<t.length;i++)e["$"+t[i]]=!0;for(t=0;t<n.length;t++)i=e.hasOwnProperty("$"+n[t].value),n[t].selected!==i&&(n[t].selected=i),i&&a&&(n[t].defaultSelected=!0)}else{for(t=""+_(t),e=null,i=0;i<n.length;i++){if(n[i].value===t){n[i].selected=!0,a&&(n[i].defaultSelected=!0);return}e!==null||n[i].disabled||(e=n[i])}e!==null&&(e.selected=!0)}}function Wt(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(p(91));return F({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function ka(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(p(92));if(_t(t)){if(1<t.length)throw Error(p(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:_(t)}}function li(n,e){var t=_(e.value),a=_(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),a!=null&&(n.defaultValue=""+a)}function at(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function oi(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Te(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?oi(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var it,va=(function(n){return typeof MSApp!="undefined"&&MSApp.execUnsafeLocalFunction?function(e,t,a,i){MSApp.execUnsafeLocalFunction(function(){return n(e,t,a,i)})}:n})(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(it=it||document.createElement("div"),it.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=it.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function st(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var Mt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},_s=["Webkit","ms","Moz","O"];Object.keys(Mt).forEach(function(n){_s.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),Mt[e]=Mt[n]})});function ui(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||Mt.hasOwnProperty(n)&&Mt[n]?(""+e).trim():e+"px"}function di(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var a=t.indexOf("--")===0,i=ui(t,e[t],a);t==="float"&&(t="cssFloat"),a?n.setProperty(t,i):n[t]=i}}var Ms=F({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function u(n,e){if(e){if(Ms[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(p(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(p(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(p(61))}if(e.style!=null&&typeof e.style!="object")throw Error(p(62))}}function m(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var en=null;function P(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Vn=null,_n=null,ge=null;function ci(n){if(n=Ua(n)){if(typeof Vn!="function")throw Error(p(280));var e=n.stateNode;e&&(e=Ri(e),Vn(n.stateNode,n.type,e))}}function ba(n){_n?ge?ge.push(n):ge=[n]:_n=n}function zt(){if(_n){var n=_n,e=ge;if(ge=_n=null,ci(n),e)for(n=0;n<e.length;n++)ci(e[n])}}function jl(n,e){return n(e)}function Dl(){}var js=!1;function Ll(n,e,t){if(js)return n(e,t);js=!0;try{return jl(n,e,t)}finally{js=!1,(_n!==null||ge!==null)&&(Dl(),zt())}}function ya(n,e){var t=n.stateNode;if(t===null)return null;var a=Ri(t);if(a===null)return null;t=a[e];n:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(n=n.type,a=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!a;break n;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(p(231,e,typeof t));return t}var Ds=!1;if(b)try{var Sa={};Object.defineProperty(Sa,"passive",{get:function(){Ds=!0}}),window.addEventListener("test",Sa,Sa),window.removeEventListener("test",Sa,Sa)}catch{Ds=!1}function Od(n,e,t,a,i,s,r,c,f){var S=Array.prototype.slice.call(arguments,3);try{e.apply(t,S)}catch(N){this.onError(N)}}var wa=!1,mi=null,pi=!1,Ls=null,Kd={onError:function(n){wa=!0,mi=n}};function Id(n,e,t,a,i,s,r,c,f){wa=!1,mi=null,Od.apply(Kd,arguments)}function Ud(n,e,t,a,i,s,r,c,f){if(Id.apply(this,arguments),wa){if(wa){var S=mi;wa=!1,mi=null}else throw Error(p(198));pi||(pi=!0,Ls=S)}}function jt(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,(e.flags&4098)!==0&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function Nl(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function Rl(n){if(jt(n)!==n)throw Error(p(188))}function Hd(n){var e=n.alternate;if(!e){if(e=jt(n),e===null)throw Error(p(188));return e!==n?null:n}for(var t=n,a=e;;){var i=t.return;if(i===null)break;var s=i.alternate;if(s===null){if(a=i.return,a!==null){t=a;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===t)return Rl(i),n;if(s===a)return Rl(i),e;s=s.sibling}throw Error(p(188))}if(t.return!==a.return)t=i,a=s;else{for(var r=!1,c=i.child;c;){if(c===t){r=!0,t=i,a=s;break}if(c===a){r=!0,a=i,t=s;break}c=c.sibling}if(!r){for(c=s.child;c;){if(c===t){r=!0,t=s,a=i;break}if(c===a){r=!0,a=s,t=i;break}c=c.sibling}if(!r)throw Error(p(189))}}if(t.alternate!==a)throw Error(p(190))}if(t.tag!==3)throw Error(p(188));return t.stateNode.current===t?n:e}function El(n){return n=Hd(n),n!==null?Pl(n):null}function Pl(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=Pl(n);if(e!==null)return e;n=n.sibling}return null}var Bl=d.unstable_scheduleCallback,Ol=d.unstable_cancelCallback,Fd=d.unstable_shouldYield,qd=d.unstable_requestPaint,Un=d.unstable_now,Vd=d.unstable_getCurrentPriorityLevel,Ns=d.unstable_ImmediatePriority,Kl=d.unstable_UserBlockingPriority,fi=d.unstable_NormalPriority,Wd=d.unstable_LowPriority,Il=d.unstable_IdlePriority,gi=null,Be=null;function zd(n){if(Be&&typeof Be.onCommitFiberRoot=="function")try{Be.onCommitFiberRoot(gi,n,void 0,(n.current.flags&128)===128)}catch{}}var _e=Math.clz32?Math.clz32:Qd,Gd=Math.log,Yd=Math.LN2;function Qd(n){return n>>>=0,n===0?32:31-(Gd(n)/Yd|0)|0}var hi=64,ki=4194304;function xa(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function vi(n,e){var t=n.pendingLanes;if(t===0)return 0;var a=0,i=n.suspendedLanes,s=n.pingedLanes,r=t&268435455;if(r!==0){var c=r&~i;c!==0?a=xa(c):(s&=r,s!==0&&(a=xa(s)))}else r=t&~i,r!==0?a=xa(r):s!==0&&(a=xa(s));if(a===0)return 0;if(e!==0&&e!==a&&(e&i)===0&&(i=a&-a,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if((a&4)!==0&&(a|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=a;0<e;)t=31-_e(e),i=1<<t,a|=n[t],e&=~i;return a}function Jd(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xd(n,e){for(var t=n.suspendedLanes,a=n.pingedLanes,i=n.expirationTimes,s=n.pendingLanes;0<s;){var r=31-_e(s),c=1<<r,f=i[r];f===-1?((c&t)===0||(c&a)!==0)&&(i[r]=Jd(c,e)):f<=e&&(n.expiredLanes|=c),s&=~c}}function Rs(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Ul(){var n=hi;return hi<<=1,(hi&4194240)===0&&(hi=64),n}function Es(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function $a(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-_e(e),n[e]=t}function Zd(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var a=n.eventTimes;for(n=n.expirationTimes;0<t;){var i=31-_e(t),s=1<<i;e[i]=0,a[i]=-1,n[i]=-1,t&=~s}}function Ps(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var a=31-_e(t),i=1<<a;i&e|n[a]&e&&(n[a]|=e),t&=~i}}var Mn=0;function Hl(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Fl,Bs,ql,Vl,Wl,Os=!1,bi=[],rt=null,lt=null,ot=null,Ca=new Map,Aa=new Map,ut=[],nc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function zl(n,e){switch(n){case"focusin":case"focusout":rt=null;break;case"dragenter":case"dragleave":lt=null;break;case"mouseover":case"mouseout":ot=null;break;case"pointerover":case"pointerout":Ca.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Aa.delete(e.pointerId)}}function Ta(n,e,t,a,i,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:a,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Ua(e),e!==null&&Bs(e)),n):(n.eventSystemFlags|=a,e=n.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),n)}function ec(n,e,t,a,i){switch(e){case"focusin":return rt=Ta(rt,n,e,t,a,i),!0;case"dragenter":return lt=Ta(lt,n,e,t,a,i),!0;case"mouseover":return ot=Ta(ot,n,e,t,a,i),!0;case"pointerover":var s=i.pointerId;return Ca.set(s,Ta(Ca.get(s)||null,n,e,t,a,i)),!0;case"gotpointercapture":return s=i.pointerId,Aa.set(s,Ta(Aa.get(s)||null,n,e,t,a,i)),!0}return!1}function Gl(n){var e=Dt(n.target);if(e!==null){var t=jt(e);if(t!==null){if(e=t.tag,e===13){if(e=Nl(t),e!==null){n.blockedOn=e,Wl(n.priority,function(){ql(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function yi(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=Is(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var a=new t.constructor(t.type,t);en=a,t.target.dispatchEvent(a),en=null}else return e=Ua(t),e!==null&&Bs(e),n.blockedOn=t,!1;e.shift()}return!0}function Yl(n,e,t){yi(n)&&t.delete(e)}function tc(){Os=!1,rt!==null&&yi(rt)&&(rt=null),lt!==null&&yi(lt)&&(lt=null),ot!==null&&yi(ot)&&(ot=null),Ca.forEach(Yl),Aa.forEach(Yl)}function _a(n,e){n.blockedOn===e&&(n.blockedOn=null,Os||(Os=!0,d.unstable_scheduleCallback(d.unstable_NormalPriority,tc)))}function Ma(n){function e(i){return _a(i,n)}if(0<bi.length){_a(bi[0],n);for(var t=1;t<bi.length;t++){var a=bi[t];a.blockedOn===n&&(a.blockedOn=null)}}for(rt!==null&&_a(rt,n),lt!==null&&_a(lt,n),ot!==null&&_a(ot,n),Ca.forEach(e),Aa.forEach(e),t=0;t<ut.length;t++)a=ut[t],a.blockedOn===n&&(a.blockedOn=null);for(;0<ut.length&&(t=ut[0],t.blockedOn===null);)Gl(t),t.blockedOn===null&&ut.shift()}var Gt=vn.ReactCurrentBatchConfig,Si=!0;function ac(n,e,t,a){var i=Mn,s=Gt.transition;Gt.transition=null;try{Mn=1,Ks(n,e,t,a)}finally{Mn=i,Gt.transition=s}}function ic(n,e,t,a){var i=Mn,s=Gt.transition;Gt.transition=null;try{Mn=4,Ks(n,e,t,a)}finally{Mn=i,Gt.transition=s}}function Ks(n,e,t,a){if(Si){var i=Is(n,e,t,a);if(i===null)ar(n,e,a,wi,t),zl(n,a);else if(ec(i,n,e,t,a))a.stopPropagation();else if(zl(n,a),e&4&&-1<nc.indexOf(n)){for(;i!==null;){var s=Ua(i);if(s!==null&&Fl(s),s=Is(n,e,t,a),s===null&&ar(n,e,a,wi,t),s===i)break;i=s}i!==null&&a.stopPropagation()}else ar(n,e,a,null,t)}}var wi=null;function Is(n,e,t,a){if(wi=null,n=P(a),n=Dt(n),n!==null)if(e=jt(n),e===null)n=null;else if(t=e.tag,t===13){if(n=Nl(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return wi=n,null}function Ql(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Vd()){case Ns:return 1;case Kl:return 4;case fi:case Wd:return 16;case Il:return 536870912;default:return 16}default:return 16}}var dt=null,Us=null,xi=null;function Jl(){if(xi)return xi;var n,e=Us,t=e.length,a,i="value"in dt?dt.value:dt.textContent,s=i.length;for(n=0;n<t&&e[n]===i[n];n++);var r=t-n;for(a=1;a<=r&&e[t-a]===i[s-a];a++);return xi=i.slice(n,1<a?1-a:void 0)}function $i(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function Ci(){return!0}function Xl(){return!1}function he(n){function e(t,a,i,s,r){this._reactName=t,this._targetInst=i,this.type=a,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var c in n)n.hasOwnProperty(c)&&(t=n[c],this[c]=t?t(s):s[c]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ci:Xl,this.isPropagationStopped=Xl,this}return F(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Ci)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Ci)},persist:function(){},isPersistent:Ci}),e}var Yt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hs=he(Yt),ja=F({},Yt,{view:0,detail:0}),sc=he(ja),Fs,qs,Da,Ai=F({},ja,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ws,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Da&&(Da&&n.type==="mousemove"?(Fs=n.screenX-Da.screenX,qs=n.screenY-Da.screenY):qs=Fs=0,Da=n),Fs)},movementY:function(n){return"movementY"in n?n.movementY:qs}}),Zl=he(Ai),rc=F({},Ai,{dataTransfer:0}),lc=he(rc),oc=F({},ja,{relatedTarget:0}),Vs=he(oc),uc=F({},Yt,{animationName:0,elapsedTime:0,pseudoElement:0}),dc=he(uc),cc=F({},Yt,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),mc=he(cc),pc=F({},Yt,{data:0}),no=he(pc),fc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kc(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=hc[n])?!!e[n]:!1}function Ws(){return kc}var vc=F({},ja,{key:function(n){if(n.key){var e=fc[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=$i(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?gc[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ws,charCode:function(n){return n.type==="keypress"?$i(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?$i(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),bc=he(vc),yc=F({},Ai,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),eo=he(yc),Sc=F({},ja,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ws}),wc=he(Sc),xc=F({},Yt,{propertyName:0,elapsedTime:0,pseudoElement:0}),$c=he(xc),Cc=F({},Ai,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Ac=he(Cc),Tc=[9,13,27,32],zs=b&&"CompositionEvent"in window,La=null;b&&"documentMode"in document&&(La=document.documentMode);var _c=b&&"TextEvent"in window&&!La,to=b&&(!zs||La&&8<La&&11>=La),ao=" ",io=!1;function so(n,e){switch(n){case"keyup":return Tc.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ro(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Qt=!1;function Mc(n,e){switch(n){case"compositionend":return ro(e);case"keypress":return e.which!==32?null:(io=!0,ao);case"textInput":return n=e.data,n===ao&&io?null:n;default:return null}}function jc(n,e){if(Qt)return n==="compositionend"||!zs&&so(n,e)?(n=Jl(),xi=Us=dt=null,Qt=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return to&&e.locale!=="ko"?null:e.data;default:return null}}var Dc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function lo(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!Dc[n.type]:e==="textarea"}function oo(n,e,t,a){ba(a),e=Di(e,"onChange"),0<e.length&&(t=new Hs("onChange","change",null,t,a),n.push({event:t,listeners:e}))}var Na=null,Ra=null;function Lc(n){To(n,0)}function Ti(n){var e=ea(n);if(fe(e))return n}function Nc(n,e){if(n==="change")return e}var uo=!1;if(b){var Gs;if(b){var Ys="oninput"in document;if(!Ys){var co=document.createElement("div");co.setAttribute("oninput","return;"),Ys=typeof co.oninput=="function"}Gs=Ys}else Gs=!1;uo=Gs&&(!document.documentMode||9<document.documentMode)}function mo(){Na&&(Na.detachEvent("onpropertychange",po),Ra=Na=null)}function po(n){if(n.propertyName==="value"&&Ti(Ra)){var e=[];oo(e,Ra,n,P(n)),Ll(Lc,e)}}function Rc(n,e,t){n==="focusin"?(mo(),Na=e,Ra=t,Na.attachEvent("onpropertychange",po)):n==="focusout"&&mo()}function Ec(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Ti(Ra)}function Pc(n,e){if(n==="click")return Ti(e)}function Bc(n,e){if(n==="input"||n==="change")return Ti(e)}function Oc(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var Me=typeof Object.is=="function"?Object.is:Oc;function Ea(n,e){if(Me(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),a=Object.keys(e);if(t.length!==a.length)return!1;for(a=0;a<t.length;a++){var i=t[a];if(!x.call(e,i)||!Me(n[i],e[i]))return!1}return!0}function fo(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function go(n,e){var t=fo(n);n=0;for(var a;t;){if(t.nodeType===3){if(a=n+t.textContent.length,n<=e&&a>=e)return{node:t,offset:e-n};n=a}n:{for(;t;){if(t.nextSibling){t=t.nextSibling;break n}t=t.parentNode}t=void 0}t=fo(t)}}function ho(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?ho(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function ko(){for(var n=window,e=Gn();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=Gn(n.document)}return e}function Qs(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function Kc(n){var e=ko(),t=n.focusedElem,a=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&ho(t.ownerDocument.documentElement,t)){if(a!==null&&Qs(t)){if(e=a.start,n=a.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var i=t.textContent.length,s=Math.min(a.start,i);a=a.end===void 0?s:Math.min(a.end,i),!n.extend&&s>a&&(i=a,a=s,s=i),i=go(t,s);var r=go(t,a);i&&r&&(n.rangeCount!==1||n.anchorNode!==i.node||n.anchorOffset!==i.offset||n.focusNode!==r.node||n.focusOffset!==r.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),n.removeAllRanges(),s>a?(n.addRange(e),n.extend(r.node,r.offset)):(e.setEnd(r.node,r.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Ic=b&&"documentMode"in document&&11>=document.documentMode,Jt=null,Js=null,Pa=null,Xs=!1;function vo(n,e,t){var a=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Xs||Jt==null||Jt!==Gn(a)||(a=Jt,"selectionStart"in a&&Qs(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Pa&&Ea(Pa,a)||(Pa=a,a=Di(Js,"onSelect"),0<a.length&&(e=new Hs("onSelect","select",null,e,t),n.push({event:e,listeners:a}),e.target=Jt)))}function _i(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var Xt={animationend:_i("Animation","AnimationEnd"),animationiteration:_i("Animation","AnimationIteration"),animationstart:_i("Animation","AnimationStart"),transitionend:_i("Transition","TransitionEnd")},Zs={},bo={};b&&(bo=document.createElement("div").style,"AnimationEvent"in window||(delete Xt.animationend.animation,delete Xt.animationiteration.animation,delete Xt.animationstart.animation),"TransitionEvent"in window||delete Xt.transitionend.transition);function Mi(n){if(Zs[n])return Zs[n];if(!Xt[n])return n;var e=Xt[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in bo)return Zs[n]=e[t];return n}var yo=Mi("animationend"),So=Mi("animationiteration"),wo=Mi("animationstart"),xo=Mi("transitionend"),$o=new Map,Co="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ct(n,e){$o.set(n,e),w(e,[n])}for(var nr=0;nr<Co.length;nr++){var er=Co[nr],Uc=er.toLowerCase(),Hc=er[0].toUpperCase()+er.slice(1);ct(Uc,"on"+Hc)}ct(yo,"onAnimationEnd"),ct(So,"onAnimationIteration"),ct(wo,"onAnimationStart"),ct("dblclick","onDoubleClick"),ct("focusin","onFocus"),ct("focusout","onBlur"),ct(xo,"onTransitionEnd"),C("onMouseEnter",["mouseout","mouseover"]),C("onMouseLeave",["mouseout","mouseover"]),C("onPointerEnter",["pointerout","pointerover"]),C("onPointerLeave",["pointerout","pointerover"]),w("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),w("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),w("onBeforeInput",["compositionend","keypress","textInput","paste"]),w("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),w("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),w("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ba="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fc=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ba));function Ao(n,e,t){var a=n.type||"unknown-event";n.currentTarget=t,Ud(a,e,void 0,n),n.currentTarget=null}function To(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var a=n[t],i=a.event;a=a.listeners;n:{var s=void 0;if(e)for(var r=a.length-1;0<=r;r--){var c=a[r],f=c.instance,S=c.currentTarget;if(c=c.listener,f!==s&&i.isPropagationStopped())break n;Ao(i,c,S),s=f}else for(r=0;r<a.length;r++){if(c=a[r],f=c.instance,S=c.currentTarget,c=c.listener,f!==s&&i.isPropagationStopped())break n;Ao(i,c,S),s=f}}}if(pi)throw n=Ls,pi=!1,Ls=null,n}function Nn(n,e){var t=e[ur];t===void 0&&(t=e[ur]=new Set);var a=n+"__bubble";t.has(a)||(_o(e,n,2,!1),t.add(a))}function tr(n,e,t){var a=0;e&&(a|=4),_o(t,n,a,e)}var ji="_reactListening"+Math.random().toString(36).slice(2);function Oa(n){if(!n[ji]){n[ji]=!0,$.forEach(function(t){t!=="selectionchange"&&(Fc.has(t)||tr(t,!1,n),tr(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[ji]||(e[ji]=!0,tr("selectionchange",!1,e))}}function _o(n,e,t,a){switch(Ql(e)){case 1:var i=ac;break;case 4:i=ic;break;default:i=Ks}t=i.bind(null,e,t,n),i=void 0,!Ds||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),a?i!==void 0?n.addEventListener(e,t,{capture:!0,passive:i}):n.addEventListener(e,t,!0):i!==void 0?n.addEventListener(e,t,{passive:i}):n.addEventListener(e,t,!1)}function ar(n,e,t,a,i){var s=a;if((e&1)===0&&(e&2)===0&&a!==null)n:for(;;){if(a===null)return;var r=a.tag;if(r===3||r===4){var c=a.stateNode.containerInfo;if(c===i||c.nodeType===8&&c.parentNode===i)break;if(r===4)for(r=a.return;r!==null;){var f=r.tag;if((f===3||f===4)&&(f=r.stateNode.containerInfo,f===i||f.nodeType===8&&f.parentNode===i))return;r=r.return}for(;c!==null;){if(r=Dt(c),r===null)return;if(f=r.tag,f===5||f===6){a=s=r;continue n}c=c.parentNode}}a=a.return}Ll(function(){var S=s,N=P(t),E=[];n:{var L=$o.get(n);if(L!==void 0){var W=Hs,Q=n;switch(n){case"keypress":if($i(t)===0)break n;case"keydown":case"keyup":W=bc;break;case"focusin":Q="focus",W=Vs;break;case"focusout":Q="blur",W=Vs;break;case"beforeblur":case"afterblur":W=Vs;break;case"click":if(t.button===2)break n;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":W=Zl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":W=lc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":W=wc;break;case yo:case So:case wo:W=dc;break;case xo:W=$c;break;case"scroll":W=sc;break;case"wheel":W=Ac;break;case"copy":case"cut":case"paste":W=mc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":W=eo}var X=(e&4)!==0,Hn=!X&&n==="scroll",k=X?L!==null?L+"Capture":null:L;X=[];for(var g=S,v;g!==null;){v=g;var K=v.stateNode;if(v.tag===5&&K!==null&&(v=K,k!==null&&(K=ya(g,k),K!=null&&X.push(Ka(g,K,v)))),Hn)break;g=g.return}0<X.length&&(L=new W(L,Q,null,t,N),E.push({event:L,listeners:X}))}}if((e&7)===0){n:{if(L=n==="mouseover"||n==="pointerover",W=n==="mouseout"||n==="pointerout",L&&t!==en&&(Q=t.relatedTarget||t.fromElement)&&(Dt(Q)||Q[We]))break n;if((W||L)&&(L=N.window===N?N:(L=N.ownerDocument)?L.defaultView||L.parentWindow:window,W?(Q=t.relatedTarget||t.toElement,W=S,Q=Q?Dt(Q):null,Q!==null&&(Hn=jt(Q),Q!==Hn||Q.tag!==5&&Q.tag!==6)&&(Q=null)):(W=null,Q=S),W!==Q)){if(X=Zl,K="onMouseLeave",k="onMouseEnter",g="mouse",(n==="pointerout"||n==="pointerover")&&(X=eo,K="onPointerLeave",k="onPointerEnter",g="pointer"),Hn=W==null?L:ea(W),v=Q==null?L:ea(Q),L=new X(K,g+"leave",W,t,N),L.target=Hn,L.relatedTarget=v,K=null,Dt(N)===S&&(X=new X(k,g+"enter",Q,t,N),X.target=v,X.relatedTarget=Hn,K=X),Hn=K,W&&Q)e:{for(X=W,k=Q,g=0,v=X;v;v=Zt(v))g++;for(v=0,K=k;K;K=Zt(K))v++;for(;0<g-v;)X=Zt(X),g--;for(;0<v-g;)k=Zt(k),v--;for(;g--;){if(X===k||k!==null&&X===k.alternate)break e;X=Zt(X),k=Zt(k)}X=null}else X=null;W!==null&&Mo(E,L,W,X,!1),Q!==null&&Hn!==null&&Mo(E,Hn,Q,X,!0)}}n:{if(L=S?ea(S):window,W=L.nodeName&&L.nodeName.toLowerCase(),W==="select"||W==="input"&&L.type==="file")var Z=Nc;else if(lo(L))if(uo)Z=Bc;else{Z=Ec;var on=Rc}else(W=L.nodeName)&&W.toLowerCase()==="input"&&(L.type==="checkbox"||L.type==="radio")&&(Z=Pc);if(Z&&(Z=Z(n,S))){oo(E,Z,t,N);break n}on&&on(n,L,S),n==="focusout"&&(on=L._wrapperState)&&on.controlled&&L.type==="number"&&Ve(L,"number",L.value)}switch(on=S?ea(S):window,n){case"focusin":(lo(on)||on.contentEditable==="true")&&(Jt=on,Js=S,Pa=null);break;case"focusout":Pa=Js=Jt=null;break;case"mousedown":Xs=!0;break;case"contextmenu":case"mouseup":case"dragend":Xs=!1,vo(E,t,N);break;case"selectionchange":if(Ic)break;case"keydown":case"keyup":vo(E,t,N)}var un;if(zs)n:{switch(n){case"compositionstart":var mn="onCompositionStart";break n;case"compositionend":mn="onCompositionEnd";break n;case"compositionupdate":mn="onCompositionUpdate";break n}mn=void 0}else Qt?so(n,t)&&(mn="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(mn="onCompositionStart");mn&&(to&&t.locale!=="ko"&&(Qt||mn!=="onCompositionStart"?mn==="onCompositionEnd"&&Qt&&(un=Jl()):(dt=N,Us="value"in dt?dt.value:dt.textContent,Qt=!0)),on=Di(S,mn),0<on.length&&(mn=new no(mn,n,null,t,N),E.push({event:mn,listeners:on}),un?mn.data=un:(un=ro(t),un!==null&&(mn.data=un)))),(un=_c?Mc(n,t):jc(n,t))&&(S=Di(S,"onBeforeInput"),0<S.length&&(N=new no("onBeforeInput","beforeinput",null,t,N),E.push({event:N,listeners:S}),N.data=un))}To(E,e)})}function Ka(n,e,t){return{instance:n,listener:e,currentTarget:t}}function Di(n,e){for(var t=e+"Capture",a=[];n!==null;){var i=n,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=ya(n,t),s!=null&&a.unshift(Ka(n,s,i)),s=ya(n,e),s!=null&&a.push(Ka(n,s,i))),n=n.return}return a}function Zt(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Mo(n,e,t,a,i){for(var s=e._reactName,r=[];t!==null&&t!==a;){var c=t,f=c.alternate,S=c.stateNode;if(f!==null&&f===a)break;c.tag===5&&S!==null&&(c=S,i?(f=ya(t,s),f!=null&&r.unshift(Ka(t,f,c))):i||(f=ya(t,s),f!=null&&r.push(Ka(t,f,c)))),t=t.return}r.length!==0&&n.push({event:e,listeners:r})}var qc=/\r\n?/g,Vc=/\u0000|\uFFFD/g;function jo(n){return(typeof n=="string"?n:""+n).replace(qc,`
`).replace(Vc,"")}function Li(n,e,t){if(e=jo(e),jo(n)!==e&&t)throw Error(p(425))}function Ni(){}var ir=null,sr=null;function rr(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var lr=typeof setTimeout=="function"?setTimeout:void 0,Wc=typeof clearTimeout=="function"?clearTimeout:void 0,Do=typeof Promise=="function"?Promise:void 0,zc=typeof queueMicrotask=="function"?queueMicrotask:typeof Do!="undefined"?function(n){return Do.resolve(null).then(n).catch(Gc)}:lr;function Gc(n){setTimeout(function(){throw n})}function or(n,e){var t=e,a=0;do{var i=t.nextSibling;if(n.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(a===0){n.removeChild(i),Ma(e);return}a--}else t!=="$"&&t!=="$?"&&t!=="$!"||a++;t=i}while(t);Ma(e)}function mt(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function Lo(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var na=Math.random().toString(36).slice(2),Oe="__reactFiber$"+na,Ia="__reactProps$"+na,We="__reactContainer$"+na,ur="__reactEvents$"+na,Yc="__reactListeners$"+na,Qc="__reactHandles$"+na;function Dt(n){var e=n[Oe];if(e)return e;for(var t=n.parentNode;t;){if(e=t[We]||t[Oe]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=Lo(n);n!==null;){if(t=n[Oe])return t;n=Lo(n)}return e}n=t,t=n.parentNode}return null}function Ua(n){return n=n[Oe]||n[We],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function ea(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(p(33))}function Ri(n){return n[Ia]||null}var dr=[],ta=-1;function pt(n){return{current:n}}function Rn(n){0>ta||(n.current=dr[ta],dr[ta]=null,ta--)}function Dn(n,e){ta++,dr[ta]=n.current,n.current=e}var ft={},ne=pt(ft),le=pt(!1),Lt=ft;function aa(n,e){var t=n.type.contextTypes;if(!t)return ft;var a=n.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===e)return a.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in t)i[s]=e[s];return a&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=i),i}function oe(n){return n=n.childContextTypes,n!=null}function Ei(){Rn(le),Rn(ne)}function No(n,e,t){if(ne.current!==ft)throw Error(p(168));Dn(ne,e),Dn(le,t)}function Ro(n,e,t){var a=n.stateNode;if(e=e.childContextTypes,typeof a.getChildContext!="function")return t;a=a.getChildContext();for(var i in a)if(!(i in e))throw Error(p(108,fn(n)||"Unknown",i));return F({},t,a)}function Pi(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||ft,Lt=ne.current,Dn(ne,n),Dn(le,le.current),!0}function Eo(n,e,t){var a=n.stateNode;if(!a)throw Error(p(169));t?(n=Ro(n,e,Lt),a.__reactInternalMemoizedMergedChildContext=n,Rn(le),Rn(ne),Dn(ne,n)):Rn(le),Dn(le,t)}var ze=null,Bi=!1,cr=!1;function Po(n){ze===null?ze=[n]:ze.push(n)}function Jc(n){Bi=!0,Po(n)}function gt(){if(!cr&&ze!==null){cr=!0;var n=0,e=Mn;try{var t=ze;for(Mn=1;n<t.length;n++){var a=t[n];do a=a(!0);while(a!==null)}ze=null,Bi=!1}catch(i){throw ze!==null&&(ze=ze.slice(n+1)),Bl(Ns,gt),i}finally{Mn=e,cr=!1}}return null}var ia=[],sa=0,Oi=null,Ki=0,Se=[],we=0,Nt=null,Ge=1,Ye="";function Rt(n,e){ia[sa++]=Ki,ia[sa++]=Oi,Oi=n,Ki=e}function Bo(n,e,t){Se[we++]=Ge,Se[we++]=Ye,Se[we++]=Nt,Nt=n;var a=Ge;n=Ye;var i=32-_e(a)-1;a&=~(1<<i),t+=1;var s=32-_e(e)+i;if(30<s){var r=i-i%5;s=(a&(1<<r)-1).toString(32),a>>=r,i-=r,Ge=1<<32-_e(e)+i|t<<i|a,Ye=s+n}else Ge=1<<s|t<<i|a,Ye=n}function mr(n){n.return!==null&&(Rt(n,1),Bo(n,1,0))}function pr(n){for(;n===Oi;)Oi=ia[--sa],ia[sa]=null,Ki=ia[--sa],ia[sa]=null;for(;n===Nt;)Nt=Se[--we],Se[we]=null,Ye=Se[--we],Se[we]=null,Ge=Se[--we],Se[we]=null}var ke=null,ve=null,En=!1,je=null;function Oo(n,e){var t=Ae(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function Ko(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,ke=n,ve=mt(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,ke=n,ve=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Nt!==null?{id:Ge,overflow:Ye}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=Ae(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,ke=n,ve=null,!0):!1;default:return!1}}function fr(n){return(n.mode&1)!==0&&(n.flags&128)===0}function gr(n){if(En){var e=ve;if(e){var t=e;if(!Ko(n,e)){if(fr(n))throw Error(p(418));e=mt(t.nextSibling);var a=ke;e&&Ko(n,e)?Oo(a,t):(n.flags=n.flags&-4097|2,En=!1,ke=n)}}else{if(fr(n))throw Error(p(418));n.flags=n.flags&-4097|2,En=!1,ke=n}}}function Io(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;ke=n}function Ii(n){if(n!==ke)return!1;if(!En)return Io(n),En=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!rr(n.type,n.memoizedProps)),e&&(e=ve)){if(fr(n))throw Uo(),Error(p(418));for(;e;)Oo(n,e),e=mt(e.nextSibling)}if(Io(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(p(317));n:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){ve=mt(n.nextSibling);break n}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}ve=null}}else ve=ke?mt(n.stateNode.nextSibling):null;return!0}function Uo(){for(var n=ve;n;)n=mt(n.nextSibling)}function ra(){ve=ke=null,En=!1}function hr(n){je===null?je=[n]:je.push(n)}var Xc=vn.ReactCurrentBatchConfig;function Ha(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(p(309));var a=t.stateNode}if(!a)throw Error(p(147,n));var i=a,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(r){var c=i.refs;r===null?delete c[s]:c[s]=r},e._stringRef=s,e)}if(typeof n!="string")throw Error(p(284));if(!t._owner)throw Error(p(290,n))}return n}function Ui(n,e){throw n=Object.prototype.toString.call(e),Error(p(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function Ho(n){var e=n._init;return e(n._payload)}function Fo(n){function e(k,g){if(n){var v=k.deletions;v===null?(k.deletions=[g],k.flags|=16):v.push(g)}}function t(k,g){if(!n)return null;for(;g!==null;)e(k,g),g=g.sibling;return null}function a(k,g){for(k=new Map;g!==null;)g.key!==null?k.set(g.key,g):k.set(g.index,g),g=g.sibling;return k}function i(k,g){return k=xt(k,g),k.index=0,k.sibling=null,k}function s(k,g,v){return k.index=v,n?(v=k.alternate,v!==null?(v=v.index,v<g?(k.flags|=2,g):v):(k.flags|=2,g)):(k.flags|=1048576,g)}function r(k){return n&&k.alternate===null&&(k.flags|=2),k}function c(k,g,v,K){return g===null||g.tag!==6?(g=ll(v,k.mode,K),g.return=k,g):(g=i(g,v),g.return=k,g)}function f(k,g,v,K){var Z=v.type;return Z===hn?N(k,g,v.props.children,K,v.key):g!==null&&(g.elementType===Z||typeof Z=="object"&&Z!==null&&Z.$$typeof===D&&Ho(Z)===g.type)?(K=i(g,v.props),K.ref=Ha(k,g,v),K.return=k,K):(K=cs(v.type,v.key,v.props,null,k.mode,K),K.ref=Ha(k,g,v),K.return=k,K)}function S(k,g,v,K){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=ol(v,k.mode,K),g.return=k,g):(g=i(g,v.children||[]),g.return=k,g)}function N(k,g,v,K,Z){return g===null||g.tag!==7?(g=Ht(v,k.mode,K,Z),g.return=k,g):(g=i(g,v),g.return=k,g)}function E(k,g,v){if(typeof g=="string"&&g!==""||typeof g=="number")return g=ll(""+g,k.mode,v),g.return=k,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case gn:return v=cs(g.type,g.key,g.props,null,k.mode,v),v.ref=Ha(k,null,g),v.return=k,v;case wn:return g=ol(g,k.mode,v),g.return=k,g;case D:var K=g._init;return E(k,K(g._payload),v)}if(_t(g)||Y(g))return g=Ht(g,k.mode,v,null),g.return=k,g;Ui(k,g)}return null}function L(k,g,v,K){var Z=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return Z!==null?null:c(k,g,""+v,K);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case gn:return v.key===Z?f(k,g,v,K):null;case wn:return v.key===Z?S(k,g,v,K):null;case D:return Z=v._init,L(k,g,Z(v._payload),K)}if(_t(v)||Y(v))return Z!==null?null:N(k,g,v,K,null);Ui(k,v)}return null}function W(k,g,v,K,Z){if(typeof K=="string"&&K!==""||typeof K=="number")return k=k.get(v)||null,c(g,k,""+K,Z);if(typeof K=="object"&&K!==null){switch(K.$$typeof){case gn:return k=k.get(K.key===null?v:K.key)||null,f(g,k,K,Z);case wn:return k=k.get(K.key===null?v:K.key)||null,S(g,k,K,Z);case D:var on=K._init;return W(k,g,v,on(K._payload),Z)}if(_t(K)||Y(K))return k=k.get(v)||null,N(g,k,K,Z,null);Ui(g,K)}return null}function Q(k,g,v,K){for(var Z=null,on=null,un=g,mn=g=0,Jn=null;un!==null&&mn<v.length;mn++){un.index>mn?(Jn=un,un=null):Jn=un.sibling;var An=L(k,un,v[mn],K);if(An===null){un===null&&(un=Jn);break}n&&un&&An.alternate===null&&e(k,un),g=s(An,g,mn),on===null?Z=An:on.sibling=An,on=An,un=Jn}if(mn===v.length)return t(k,un),En&&Rt(k,mn),Z;if(un===null){for(;mn<v.length;mn++)un=E(k,v[mn],K),un!==null&&(g=s(un,g,mn),on===null?Z=un:on.sibling=un,on=un);return En&&Rt(k,mn),Z}for(un=a(k,un);mn<v.length;mn++)Jn=W(un,k,mn,v[mn],K),Jn!==null&&(n&&Jn.alternate!==null&&un.delete(Jn.key===null?mn:Jn.key),g=s(Jn,g,mn),on===null?Z=Jn:on.sibling=Jn,on=Jn);return n&&un.forEach(function($t){return e(k,$t)}),En&&Rt(k,mn),Z}function X(k,g,v,K){var Z=Y(v);if(typeof Z!="function")throw Error(p(150));if(v=Z.call(v),v==null)throw Error(p(151));for(var on=Z=null,un=g,mn=g=0,Jn=null,An=v.next();un!==null&&!An.done;mn++,An=v.next()){un.index>mn?(Jn=un,un=null):Jn=un.sibling;var $t=L(k,un,An.value,K);if($t===null){un===null&&(un=Jn);break}n&&un&&$t.alternate===null&&e(k,un),g=s($t,g,mn),on===null?Z=$t:on.sibling=$t,on=$t,un=Jn}if(An.done)return t(k,un),En&&Rt(k,mn),Z;if(un===null){for(;!An.done;mn++,An=v.next())An=E(k,An.value,K),An!==null&&(g=s(An,g,mn),on===null?Z=An:on.sibling=An,on=An);return En&&Rt(k,mn),Z}for(un=a(k,un);!An.done;mn++,An=v.next())An=W(un,k,mn,An.value,K),An!==null&&(n&&An.alternate!==null&&un.delete(An.key===null?mn:An.key),g=s(An,g,mn),on===null?Z=An:on.sibling=An,on=An);return n&&un.forEach(function(Dm){return e(k,Dm)}),En&&Rt(k,mn),Z}function Hn(k,g,v,K){if(typeof v=="object"&&v!==null&&v.type===hn&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case gn:n:{for(var Z=v.key,on=g;on!==null;){if(on.key===Z){if(Z=v.type,Z===hn){if(on.tag===7){t(k,on.sibling),g=i(on,v.props.children),g.return=k,k=g;break n}}else if(on.elementType===Z||typeof Z=="object"&&Z!==null&&Z.$$typeof===D&&Ho(Z)===on.type){t(k,on.sibling),g=i(on,v.props),g.ref=Ha(k,on,v),g.return=k,k=g;break n}t(k,on);break}else e(k,on);on=on.sibling}v.type===hn?(g=Ht(v.props.children,k.mode,K,v.key),g.return=k,k=g):(K=cs(v.type,v.key,v.props,null,k.mode,K),K.ref=Ha(k,g,v),K.return=k,k=K)}return r(k);case wn:n:{for(on=v.key;g!==null;){if(g.key===on)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){t(k,g.sibling),g=i(g,v.children||[]),g.return=k,k=g;break n}else{t(k,g);break}else e(k,g);g=g.sibling}g=ol(v,k.mode,K),g.return=k,k=g}return r(k);case D:return on=v._init,Hn(k,g,on(v._payload),K)}if(_t(v))return Q(k,g,v,K);if(Y(v))return X(k,g,v,K);Ui(k,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,g!==null&&g.tag===6?(t(k,g.sibling),g=i(g,v),g.return=k,k=g):(t(k,g),g=ll(v,k.mode,K),g.return=k,k=g),r(k)):t(k,g)}return Hn}var la=Fo(!0),qo=Fo(!1),Hi=pt(null),Fi=null,oa=null,kr=null;function vr(){kr=oa=Fi=null}function br(n){var e=Hi.current;Rn(Hi),n._currentValue=e}function yr(n,e,t){for(;n!==null;){var a=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),n===t)break;n=n.return}}function ua(n,e){Fi=n,kr=oa=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&e)!==0&&(ue=!0),n.firstContext=null)}function xe(n){var e=n._currentValue;if(kr!==n)if(n={context:n,memoizedValue:e,next:null},oa===null){if(Fi===null)throw Error(p(308));oa=n,Fi.dependencies={lanes:0,firstContext:n}}else oa=oa.next=n;return e}var Et=null;function Sr(n){Et===null?Et=[n]:Et.push(n)}function Vo(n,e,t,a){var i=e.interleaved;return i===null?(t.next=t,Sr(e)):(t.next=i.next,i.next=t),e.interleaved=t,Qe(n,a)}function Qe(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var ht=!1;function wr(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Wo(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Je(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function kt(n,e,t){var a=n.updateQueue;if(a===null)return null;if(a=a.shared,(Sn&2)!==0){var i=a.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),a.pending=e,Qe(n,t)}return i=a.interleaved,i===null?(e.next=e,Sr(a)):(e.next=i.next,i.next=e),a.interleaved=e,Qe(n,t)}function qi(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var a=e.lanes;a&=n.pendingLanes,t|=a,e.lanes=t,Ps(n,t)}}function zo(n,e){var t=n.updateQueue,a=n.alternate;if(a!==null&&(a=a.updateQueue,t===a)){var i=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var r={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?i=s=r:s=s.next=r,t=t.next}while(t!==null);s===null?i=s=e:s=s.next=e}else i=s=e;t={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:a.shared,effects:a.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function Vi(n,e,t,a){var i=n.updateQueue;ht=!1;var s=i.firstBaseUpdate,r=i.lastBaseUpdate,c=i.shared.pending;if(c!==null){i.shared.pending=null;var f=c,S=f.next;f.next=null,r===null?s=S:r.next=S,r=f;var N=n.alternate;N!==null&&(N=N.updateQueue,c=N.lastBaseUpdate,c!==r&&(c===null?N.firstBaseUpdate=S:c.next=S,N.lastBaseUpdate=f))}if(s!==null){var E=i.baseState;r=0,N=S=f=null,c=s;do{var L=c.lane,W=c.eventTime;if((a&L)===L){N!==null&&(N=N.next={eventTime:W,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});n:{var Q=n,X=c;switch(L=e,W=t,X.tag){case 1:if(Q=X.payload,typeof Q=="function"){E=Q.call(W,E,L);break n}E=Q;break n;case 3:Q.flags=Q.flags&-65537|128;case 0:if(Q=X.payload,L=typeof Q=="function"?Q.call(W,E,L):Q,L==null)break n;E=F({},E,L);break n;case 2:ht=!0}}c.callback!==null&&c.lane!==0&&(n.flags|=64,L=i.effects,L===null?i.effects=[c]:L.push(c))}else W={eventTime:W,lane:L,tag:c.tag,payload:c.payload,callback:c.callback,next:null},N===null?(S=N=W,f=E):N=N.next=W,r|=L;if(c=c.next,c===null){if(c=i.shared.pending,c===null)break;L=c,c=L.next,L.next=null,i.lastBaseUpdate=L,i.shared.pending=null}}while(!0);if(N===null&&(f=E),i.baseState=f,i.firstBaseUpdate=S,i.lastBaseUpdate=N,e=i.shared.interleaved,e!==null){i=e;do r|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Ot|=r,n.lanes=r,n.memoizedState=E}}function Go(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var a=n[e],i=a.callback;if(i!==null){if(a.callback=null,a=t,typeof i!="function")throw Error(p(191,i));i.call(a)}}}var Fa={},Ke=pt(Fa),qa=pt(Fa),Va=pt(Fa);function Pt(n){if(n===Fa)throw Error(p(174));return n}function xr(n,e){switch(Dn(Va,e),Dn(qa,n),Dn(Ke,Fa),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Te(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=Te(e,n)}Rn(Ke),Dn(Ke,e)}function da(){Rn(Ke),Rn(qa),Rn(Va)}function Yo(n){Pt(Va.current);var e=Pt(Ke.current),t=Te(e,n.type);e!==t&&(Dn(qa,n),Dn(Ke,t))}function $r(n){qa.current===n&&(Rn(Ke),Rn(qa))}var Pn=pt(0);function Wi(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Cr=[];function Ar(){for(var n=0;n<Cr.length;n++)Cr[n]._workInProgressVersionPrimary=null;Cr.length=0}var zi=vn.ReactCurrentDispatcher,Tr=vn.ReactCurrentBatchConfig,Bt=0,Bn=null,Wn=null,Yn=null,Gi=!1,Wa=!1,za=0,Zc=0;function ee(){throw Error(p(321))}function _r(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!Me(n[t],e[t]))return!1;return!0}function Mr(n,e,t,a,i,s){if(Bt=s,Bn=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,zi.current=n===null||n.memoizedState===null?am:im,n=t(a,i),Wa){s=0;do{if(Wa=!1,za=0,25<=s)throw Error(p(301));s+=1,Yn=Wn=null,e.updateQueue=null,zi.current=sm,n=t(a,i)}while(Wa)}if(zi.current=Ji,e=Wn!==null&&Wn.next!==null,Bt=0,Yn=Wn=Bn=null,Gi=!1,e)throw Error(p(300));return n}function jr(){var n=za!==0;return za=0,n}function Ie(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Yn===null?Bn.memoizedState=Yn=n:Yn=Yn.next=n,Yn}function $e(){if(Wn===null){var n=Bn.alternate;n=n!==null?n.memoizedState:null}else n=Wn.next;var e=Yn===null?Bn.memoizedState:Yn.next;if(e!==null)Yn=e,Wn=n;else{if(n===null)throw Error(p(310));Wn=n,n={memoizedState:Wn.memoizedState,baseState:Wn.baseState,baseQueue:Wn.baseQueue,queue:Wn.queue,next:null},Yn===null?Bn.memoizedState=Yn=n:Yn=Yn.next=n}return Yn}function Ga(n,e){return typeof e=="function"?e(n):e}function Dr(n){var e=$e(),t=e.queue;if(t===null)throw Error(p(311));t.lastRenderedReducer=n;var a=Wn,i=a.baseQueue,s=t.pending;if(s!==null){if(i!==null){var r=i.next;i.next=s.next,s.next=r}a.baseQueue=i=s,t.pending=null}if(i!==null){s=i.next,a=a.baseState;var c=r=null,f=null,S=s;do{var N=S.lane;if((Bt&N)===N)f!==null&&(f=f.next={lane:0,action:S.action,hasEagerState:S.hasEagerState,eagerState:S.eagerState,next:null}),a=S.hasEagerState?S.eagerState:n(a,S.action);else{var E={lane:N,action:S.action,hasEagerState:S.hasEagerState,eagerState:S.eagerState,next:null};f===null?(c=f=E,r=a):f=f.next=E,Bn.lanes|=N,Ot|=N}S=S.next}while(S!==null&&S!==s);f===null?r=a:f.next=c,Me(a,e.memoizedState)||(ue=!0),e.memoizedState=a,e.baseState=r,e.baseQueue=f,t.lastRenderedState=a}if(n=t.interleaved,n!==null){i=n;do s=i.lane,Bn.lanes|=s,Ot|=s,i=i.next;while(i!==n)}else i===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Lr(n){var e=$e(),t=e.queue;if(t===null)throw Error(p(311));t.lastRenderedReducer=n;var a=t.dispatch,i=t.pending,s=e.memoizedState;if(i!==null){t.pending=null;var r=i=i.next;do s=n(s,r.action),r=r.next;while(r!==i);Me(s,e.memoizedState)||(ue=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,a]}function Qo(){}function Jo(n,e){var t=Bn,a=$e(),i=e(),s=!Me(a.memoizedState,i);if(s&&(a.memoizedState=i,ue=!0),a=a.queue,Nr(nu.bind(null,t,a,n),[n]),a.getSnapshot!==e||s||Yn!==null&&Yn.memoizedState.tag&1){if(t.flags|=2048,Ya(9,Zo.bind(null,t,a,i,e),void 0,null),Qn===null)throw Error(p(349));(Bt&30)!==0||Xo(t,e,i)}return i}function Xo(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=Bn.updateQueue,e===null?(e={lastEffect:null,stores:null},Bn.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function Zo(n,e,t,a){e.value=t,e.getSnapshot=a,eu(e)&&tu(n)}function nu(n,e,t){return t(function(){eu(e)&&tu(n)})}function eu(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!Me(n,t)}catch{return!0}}function tu(n){var e=Qe(n,1);e!==null&&Re(e,n,1,-1)}function au(n){var e=Ie();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ga,lastRenderedState:n},e.queue=n,n=n.dispatch=tm.bind(null,Bn,n),[e.memoizedState,n]}function Ya(n,e,t,a){return n={tag:n,create:e,destroy:t,deps:a,next:null},e=Bn.updateQueue,e===null?(e={lastEffect:null,stores:null},Bn.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(a=t.next,t.next=n,n.next=a,e.lastEffect=n)),n}function iu(){return $e().memoizedState}function Yi(n,e,t,a){var i=Ie();Bn.flags|=n,i.memoizedState=Ya(1|e,t,void 0,a===void 0?null:a)}function Qi(n,e,t,a){var i=$e();a=a===void 0?null:a;var s=void 0;if(Wn!==null){var r=Wn.memoizedState;if(s=r.destroy,a!==null&&_r(a,r.deps)){i.memoizedState=Ya(e,t,s,a);return}}Bn.flags|=n,i.memoizedState=Ya(1|e,t,s,a)}function su(n,e){return Yi(8390656,8,n,e)}function Nr(n,e){return Qi(2048,8,n,e)}function ru(n,e){return Qi(4,2,n,e)}function lu(n,e){return Qi(4,4,n,e)}function ou(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function uu(n,e,t){return t=t!=null?t.concat([n]):null,Qi(4,4,ou.bind(null,e,n),t)}function Rr(){}function du(n,e){var t=$e();e=e===void 0?null:e;var a=t.memoizedState;return a!==null&&e!==null&&_r(e,a[1])?a[0]:(t.memoizedState=[n,e],n)}function cu(n,e){var t=$e();e=e===void 0?null:e;var a=t.memoizedState;return a!==null&&e!==null&&_r(e,a[1])?a[0]:(n=n(),t.memoizedState=[n,e],n)}function mu(n,e,t){return(Bt&21)===0?(n.baseState&&(n.baseState=!1,ue=!0),n.memoizedState=t):(Me(t,e)||(t=Ul(),Bn.lanes|=t,Ot|=t,n.baseState=!0),e)}function nm(n,e){var t=Mn;Mn=t!==0&&4>t?t:4,n(!0);var a=Tr.transition;Tr.transition={};try{n(!1),e()}finally{Mn=t,Tr.transition=a}}function pu(){return $e().memoizedState}function em(n,e,t){var a=St(n);if(t={lane:a,action:t,hasEagerState:!1,eagerState:null,next:null},fu(n))gu(e,t);else if(t=Vo(n,e,t,a),t!==null){var i=re();Re(t,n,a,i),hu(t,e,a)}}function tm(n,e,t){var a=St(n),i={lane:a,action:t,hasEagerState:!1,eagerState:null,next:null};if(fu(n))gu(e,i);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var r=e.lastRenderedState,c=s(r,t);if(i.hasEagerState=!0,i.eagerState=c,Me(c,r)){var f=e.interleaved;f===null?(i.next=i,Sr(e)):(i.next=f.next,f.next=i),e.interleaved=i;return}}catch{}t=Vo(n,e,i,a),t!==null&&(i=re(),Re(t,n,a,i),hu(t,e,a))}}function fu(n){var e=n.alternate;return n===Bn||e!==null&&e===Bn}function gu(n,e){Wa=Gi=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function hu(n,e,t){if((t&4194240)!==0){var a=e.lanes;a&=n.pendingLanes,t|=a,e.lanes=t,Ps(n,t)}}var Ji={readContext:xe,useCallback:ee,useContext:ee,useEffect:ee,useImperativeHandle:ee,useInsertionEffect:ee,useLayoutEffect:ee,useMemo:ee,useReducer:ee,useRef:ee,useState:ee,useDebugValue:ee,useDeferredValue:ee,useTransition:ee,useMutableSource:ee,useSyncExternalStore:ee,useId:ee,unstable_isNewReconciler:!1},am={readContext:xe,useCallback:function(n,e){return Ie().memoizedState=[n,e===void 0?null:e],n},useContext:xe,useEffect:su,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,Yi(4194308,4,ou.bind(null,e,n),t)},useLayoutEffect:function(n,e){return Yi(4194308,4,n,e)},useInsertionEffect:function(n,e){return Yi(4,2,n,e)},useMemo:function(n,e){var t=Ie();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var a=Ie();return e=t!==void 0?t(e):e,a.memoizedState=a.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},a.queue=n,n=n.dispatch=em.bind(null,Bn,n),[a.memoizedState,n]},useRef:function(n){var e=Ie();return n={current:n},e.memoizedState=n},useState:au,useDebugValue:Rr,useDeferredValue:function(n){return Ie().memoizedState=n},useTransition:function(){var n=au(!1),e=n[0];return n=nm.bind(null,n[1]),Ie().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var a=Bn,i=Ie();if(En){if(t===void 0)throw Error(p(407));t=t()}else{if(t=e(),Qn===null)throw Error(p(349));(Bt&30)!==0||Xo(a,e,t)}i.memoizedState=t;var s={value:t,getSnapshot:e};return i.queue=s,su(nu.bind(null,a,s,n),[n]),a.flags|=2048,Ya(9,Zo.bind(null,a,s,t,e),void 0,null),t},useId:function(){var n=Ie(),e=Qn.identifierPrefix;if(En){var t=Ye,a=Ge;t=(a&~(1<<32-_e(a)-1)).toString(32)+t,e=":"+e+"R"+t,t=za++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=Zc++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},im={readContext:xe,useCallback:du,useContext:xe,useEffect:Nr,useImperativeHandle:uu,useInsertionEffect:ru,useLayoutEffect:lu,useMemo:cu,useReducer:Dr,useRef:iu,useState:function(){return Dr(Ga)},useDebugValue:Rr,useDeferredValue:function(n){var e=$e();return mu(e,Wn.memoizedState,n)},useTransition:function(){var n=Dr(Ga)[0],e=$e().memoizedState;return[n,e]},useMutableSource:Qo,useSyncExternalStore:Jo,useId:pu,unstable_isNewReconciler:!1},sm={readContext:xe,useCallback:du,useContext:xe,useEffect:Nr,useImperativeHandle:uu,useInsertionEffect:ru,useLayoutEffect:lu,useMemo:cu,useReducer:Lr,useRef:iu,useState:function(){return Lr(Ga)},useDebugValue:Rr,useDeferredValue:function(n){var e=$e();return Wn===null?e.memoizedState=n:mu(e,Wn.memoizedState,n)},useTransition:function(){var n=Lr(Ga)[0],e=$e().memoizedState;return[n,e]},useMutableSource:Qo,useSyncExternalStore:Jo,useId:pu,unstable_isNewReconciler:!1};function De(n,e){if(n&&n.defaultProps){e=F({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function Er(n,e,t,a){e=n.memoizedState,t=t(a,e),t=t==null?e:F({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var Xi={isMounted:function(n){return(n=n._reactInternals)?jt(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var a=re(),i=St(n),s=Je(a,i);s.payload=e,t!=null&&(s.callback=t),e=kt(n,s,i),e!==null&&(Re(e,n,i,a),qi(e,n,i))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var a=re(),i=St(n),s=Je(a,i);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=kt(n,s,i),e!==null&&(Re(e,n,i,a),qi(e,n,i))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=re(),a=St(n),i=Je(t,a);i.tag=2,e!=null&&(i.callback=e),e=kt(n,i,a),e!==null&&(Re(e,n,a,t),qi(e,n,a))}};function ku(n,e,t,a,i,s,r){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(a,s,r):e.prototype&&e.prototype.isPureReactComponent?!Ea(t,a)||!Ea(i,s):!0}function vu(n,e,t){var a=!1,i=ft,s=e.contextType;return typeof s=="object"&&s!==null?s=xe(s):(i=oe(e)?Lt:ne.current,a=e.contextTypes,s=(a=a!=null)?aa(n,i):ft),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Xi,n.stateNode=e,e._reactInternals=n,a&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=s),e}function bu(n,e,t,a){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,a),e.state!==n&&Xi.enqueueReplaceState(e,e.state,null)}function Pr(n,e,t,a){var i=n.stateNode;i.props=t,i.state=n.memoizedState,i.refs={},wr(n);var s=e.contextType;typeof s=="object"&&s!==null?i.context=xe(s):(s=oe(e)?Lt:ne.current,i.context=aa(n,s)),i.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Er(n,e,s,t),i.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Xi.enqueueReplaceState(i,i.state,null),Vi(n,t,i,a),i.state=n.memoizedState),typeof i.componentDidMount=="function"&&(n.flags|=4194308)}function ca(n,e){try{var t="",a=e;do t+=y(a),a=a.return;while(a);var i=t}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:i,digest:null}}function Br(n,e,t){return{value:n,source:null,stack:t!=null?t:null,digest:e!=null?e:null}}function Or(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var rm=typeof WeakMap=="function"?WeakMap:Map;function yu(n,e,t){t=Je(-1,t),t.tag=3,t.payload={element:null};var a=e.value;return t.callback=function(){ss||(ss=!0,Zr=a),Or(n,e)},t}function Su(n,e,t){t=Je(-1,t),t.tag=3;var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var i=e.value;t.payload=function(){return a(i)},t.callback=function(){Or(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Or(n,e),typeof a!="function"&&(bt===null?bt=new Set([this]):bt.add(this));var r=e.stack;this.componentDidCatch(e.value,{componentStack:r!==null?r:""})}),t}function wu(n,e,t){var a=n.pingCache;if(a===null){a=n.pingCache=new rm;var i=new Set;a.set(e,i)}else i=a.get(e),i===void 0&&(i=new Set,a.set(e,i));i.has(t)||(i.add(t),n=ym.bind(null,n,e,t),e.then(n,n))}function xu(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function $u(n,e,t,a,i){return(n.mode&1)===0?(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=Je(-1,1),e.tag=2,kt(t,e,1))),t.lanes|=1),n):(n.flags|=65536,n.lanes=i,n)}var lm=vn.ReactCurrentOwner,ue=!1;function se(n,e,t,a){e.child=n===null?qo(e,null,t,a):la(e,n.child,t,a)}function Cu(n,e,t,a,i){t=t.render;var s=e.ref;return ua(e,i),a=Mr(n,e,t,a,s,i),t=jr(),n!==null&&!ue?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~i,Xe(n,e,i)):(En&&t&&mr(e),e.flags|=1,se(n,e,a,i),e.child)}function Au(n,e,t,a,i){if(n===null){var s=t.type;return typeof s=="function"&&!rl(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,Tu(n,e,s,a,i)):(n=cs(t.type,null,a,e,e.mode,i),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,(n.lanes&i)===0){var r=s.memoizedProps;if(t=t.compare,t=t!==null?t:Ea,t(r,a)&&n.ref===e.ref)return Xe(n,e,i)}return e.flags|=1,n=xt(s,a),n.ref=e.ref,n.return=e,e.child=n}function Tu(n,e,t,a,i){if(n!==null){var s=n.memoizedProps;if(Ea(s,a)&&n.ref===e.ref)if(ue=!1,e.pendingProps=a=s,(n.lanes&i)!==0)(n.flags&131072)!==0&&(ue=!0);else return e.lanes=n.lanes,Xe(n,e,i)}return Kr(n,e,t,a,i)}function _u(n,e,t){var a=e.pendingProps,i=a.children,s=n!==null?n.memoizedState:null;if(a.mode==="hidden")if((e.mode&1)===0)e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Dn(pa,be),be|=t;else{if((t&1073741824)===0)return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,Dn(pa,be),be|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=s!==null?s.baseLanes:t,Dn(pa,be),be|=a}else s!==null?(a=s.baseLanes|t,e.memoizedState=null):a=t,Dn(pa,be),be|=a;return se(n,e,i,t),e.child}function Mu(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Kr(n,e,t,a,i){var s=oe(t)?Lt:ne.current;return s=aa(e,s),ua(e,i),t=Mr(n,e,t,a,s,i),a=jr(),n!==null&&!ue?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~i,Xe(n,e,i)):(En&&a&&mr(e),e.flags|=1,se(n,e,t,i),e.child)}function ju(n,e,t,a,i){if(oe(t)){var s=!0;Pi(e)}else s=!1;if(ua(e,i),e.stateNode===null)ns(n,e),vu(e,t,a),Pr(e,t,a,i),a=!0;else if(n===null){var r=e.stateNode,c=e.memoizedProps;r.props=c;var f=r.context,S=t.contextType;typeof S=="object"&&S!==null?S=xe(S):(S=oe(t)?Lt:ne.current,S=aa(e,S));var N=t.getDerivedStateFromProps,E=typeof N=="function"||typeof r.getSnapshotBeforeUpdate=="function";E||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(c!==a||f!==S)&&bu(e,r,a,S),ht=!1;var L=e.memoizedState;r.state=L,Vi(e,a,r,i),f=e.memoizedState,c!==a||L!==f||le.current||ht?(typeof N=="function"&&(Er(e,t,N,a),f=e.memoizedState),(c=ht||ku(e,t,c,a,L,f,S))?(E||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(e.flags|=4194308)):(typeof r.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=f),r.props=a,r.state=f,r.context=S,a=c):(typeof r.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{r=e.stateNode,Wo(n,e),c=e.memoizedProps,S=e.type===e.elementType?c:De(e.type,c),r.props=S,E=e.pendingProps,L=r.context,f=t.contextType,typeof f=="object"&&f!==null?f=xe(f):(f=oe(t)?Lt:ne.current,f=aa(e,f));var W=t.getDerivedStateFromProps;(N=typeof W=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(c!==E||L!==f)&&bu(e,r,a,f),ht=!1,L=e.memoizedState,r.state=L,Vi(e,a,r,i);var Q=e.memoizedState;c!==E||L!==Q||le.current||ht?(typeof W=="function"&&(Er(e,t,W,a),Q=e.memoizedState),(S=ht||ku(e,t,S,a,L,Q,f)||!1)?(N||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(a,Q,f),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(a,Q,f)),typeof r.componentDidUpdate=="function"&&(e.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof r.componentDidUpdate!="function"||c===n.memoizedProps&&L===n.memoizedState||(e.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||c===n.memoizedProps&&L===n.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=Q),r.props=a,r.state=Q,r.context=f,a=S):(typeof r.componentDidUpdate!="function"||c===n.memoizedProps&&L===n.memoizedState||(e.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||c===n.memoizedProps&&L===n.memoizedState||(e.flags|=1024),a=!1)}return Ir(n,e,t,a,s,i)}function Ir(n,e,t,a,i,s){Mu(n,e);var r=(e.flags&128)!==0;if(!a&&!r)return i&&Eo(e,t,!1),Xe(n,e,s);a=e.stateNode,lm.current=e;var c=r&&typeof t.getDerivedStateFromError!="function"?null:a.render();return e.flags|=1,n!==null&&r?(e.child=la(e,n.child,null,s),e.child=la(e,null,c,s)):se(n,e,c,s),e.memoizedState=a.state,i&&Eo(e,t,!0),e.child}function Du(n){var e=n.stateNode;e.pendingContext?No(n,e.pendingContext,e.pendingContext!==e.context):e.context&&No(n,e.context,!1),xr(n,e.containerInfo)}function Lu(n,e,t,a,i){return ra(),hr(i),e.flags|=256,se(n,e,t,a),e.child}var Ur={dehydrated:null,treeContext:null,retryLane:0};function Hr(n){return{baseLanes:n,cachePool:null,transitions:null}}function Nu(n,e,t){var a=e.pendingProps,i=Pn.current,s=!1,r=(e.flags&128)!==0,c;if((c=r)||(c=n!==null&&n.memoizedState===null?!1:(i&2)!==0),c?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(i|=1),Dn(Pn,i&1),n===null)return gr(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((e.mode&1)===0?e.lanes=1:n.data==="$!"?e.lanes=8:e.lanes=1073741824,null):(r=a.children,n=a.fallback,s?(a=e.mode,s=e.child,r={mode:"hidden",children:r},(a&1)===0&&s!==null?(s.childLanes=0,s.pendingProps=r):s=ms(r,a,0,null),n=Ht(n,a,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=Hr(t),e.memoizedState=Ur,n):Fr(e,r));if(i=n.memoizedState,i!==null&&(c=i.dehydrated,c!==null))return om(n,e,r,a,c,i,t);if(s){s=a.fallback,r=e.mode,i=n.child,c=i.sibling;var f={mode:"hidden",children:a.children};return(r&1)===0&&e.child!==i?(a=e.child,a.childLanes=0,a.pendingProps=f,e.deletions=null):(a=xt(i,f),a.subtreeFlags=i.subtreeFlags&14680064),c!==null?s=xt(c,s):(s=Ht(s,r,t,null),s.flags|=2),s.return=e,a.return=e,a.sibling=s,e.child=a,a=s,s=e.child,r=n.child.memoizedState,r=r===null?Hr(t):{baseLanes:r.baseLanes|t,cachePool:null,transitions:r.transitions},s.memoizedState=r,s.childLanes=n.childLanes&~t,e.memoizedState=Ur,a}return s=n.child,n=s.sibling,a=xt(s,{mode:"visible",children:a.children}),(e.mode&1)===0&&(a.lanes=t),a.return=e,a.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=a,e.memoizedState=null,a}function Fr(n,e){return e=ms({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function Zi(n,e,t,a){return a!==null&&hr(a),la(e,n.child,null,t),n=Fr(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function om(n,e,t,a,i,s,r){if(t)return e.flags&256?(e.flags&=-257,a=Br(Error(p(422))),Zi(n,e,r,a)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=a.fallback,i=e.mode,a=ms({mode:"visible",children:a.children},i,0,null),s=Ht(s,i,r,null),s.flags|=2,a.return=e,s.return=e,a.sibling=s,e.child=a,(e.mode&1)!==0&&la(e,n.child,null,r),e.child.memoizedState=Hr(r),e.memoizedState=Ur,s);if((e.mode&1)===0)return Zi(n,e,r,null);if(i.data==="$!"){if(a=i.nextSibling&&i.nextSibling.dataset,a)var c=a.dgst;return a=c,s=Error(p(419)),a=Br(s,a,void 0),Zi(n,e,r,a)}if(c=(r&n.childLanes)!==0,ue||c){if(a=Qn,a!==null){switch(r&-r){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=(i&(a.suspendedLanes|r))!==0?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Qe(n,i),Re(a,n,i,-1))}return sl(),a=Br(Error(p(421))),Zi(n,e,r,a)}return i.data==="$?"?(e.flags|=128,e.child=n.child,e=Sm.bind(null,n),i._reactRetry=e,null):(n=s.treeContext,ve=mt(i.nextSibling),ke=e,En=!0,je=null,n!==null&&(Se[we++]=Ge,Se[we++]=Ye,Se[we++]=Nt,Ge=n.id,Ye=n.overflow,Nt=e),e=Fr(e,a.children),e.flags|=4096,e)}function Ru(n,e,t){n.lanes|=e;var a=n.alternate;a!==null&&(a.lanes|=e),yr(n.return,e,t)}function qr(n,e,t,a,i){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:t,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=a,s.tail=t,s.tailMode=i)}function Eu(n,e,t){var a=e.pendingProps,i=a.revealOrder,s=a.tail;if(se(n,e,a.children,t),a=Pn.current,(a&2)!==0)a=a&1|2,e.flags|=128;else{if(n!==null&&(n.flags&128)!==0)n:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Ru(n,t,e);else if(n.tag===19)Ru(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break n;for(;n.sibling===null;){if(n.return===null||n.return===e)break n;n=n.return}n.sibling.return=n.return,n=n.sibling}a&=1}if(Dn(Pn,a),(e.mode&1)===0)e.memoizedState=null;else switch(i){case"forwards":for(t=e.child,i=null;t!==null;)n=t.alternate,n!==null&&Wi(n)===null&&(i=t),t=t.sibling;t=i,t===null?(i=e.child,e.child=null):(i=t.sibling,t.sibling=null),qr(e,!1,i,t,s);break;case"backwards":for(t=null,i=e.child,e.child=null;i!==null;){if(n=i.alternate,n!==null&&Wi(n)===null){e.child=i;break}n=i.sibling,i.sibling=t,t=i,i=n}qr(e,!0,t,null,s);break;case"together":qr(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function ns(n,e){(e.mode&1)===0&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Xe(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),Ot|=e.lanes,(t&e.childLanes)===0)return null;if(n!==null&&e.child!==n.child)throw Error(p(153));if(e.child!==null){for(n=e.child,t=xt(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=xt(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function um(n,e,t){switch(e.tag){case 3:Du(e),ra();break;case 5:Yo(e);break;case 1:oe(e.type)&&Pi(e);break;case 4:xr(e,e.stateNode.containerInfo);break;case 10:var a=e.type._context,i=e.memoizedProps.value;Dn(Hi,a._currentValue),a._currentValue=i;break;case 13:if(a=e.memoizedState,a!==null)return a.dehydrated!==null?(Dn(Pn,Pn.current&1),e.flags|=128,null):(t&e.child.childLanes)!==0?Nu(n,e,t):(Dn(Pn,Pn.current&1),n=Xe(n,e,t),n!==null?n.sibling:null);Dn(Pn,Pn.current&1);break;case 19:if(a=(t&e.childLanes)!==0,(n.flags&128)!==0){if(a)return Eu(n,e,t);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Dn(Pn,Pn.current),a)break;return null;case 22:case 23:return e.lanes=0,_u(n,e,t)}return Xe(n,e,t)}var Pu,Vr,Bu,Ou;Pu=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}},Vr=function(){},Bu=function(n,e,t,a){var i=n.memoizedProps;if(i!==a){n=e.stateNode,Pt(Ke.current);var s=null;switch(t){case"input":i=tt(n,i),a=tt(n,a),s=[];break;case"select":i=F({},i,{value:void 0}),a=F({},a,{value:void 0}),s=[];break;case"textarea":i=Wt(n,i),a=Wt(n,a),s=[];break;default:typeof i.onClick!="function"&&typeof a.onClick=="function"&&(n.onclick=Ni)}u(t,a);var r;t=null;for(S in i)if(!a.hasOwnProperty(S)&&i.hasOwnProperty(S)&&i[S]!=null)if(S==="style"){var c=i[S];for(r in c)c.hasOwnProperty(r)&&(t||(t={}),t[r]="")}else S!=="dangerouslySetInnerHTML"&&S!=="children"&&S!=="suppressContentEditableWarning"&&S!=="suppressHydrationWarning"&&S!=="autoFocus"&&(j.hasOwnProperty(S)?s||(s=[]):(s=s||[]).push(S,null));for(S in a){var f=a[S];if(c=i!=null?i[S]:void 0,a.hasOwnProperty(S)&&f!==c&&(f!=null||c!=null))if(S==="style")if(c){for(r in c)!c.hasOwnProperty(r)||f&&f.hasOwnProperty(r)||(t||(t={}),t[r]="");for(r in f)f.hasOwnProperty(r)&&c[r]!==f[r]&&(t||(t={}),t[r]=f[r])}else t||(s||(s=[]),s.push(S,t)),t=f;else S==="dangerouslySetInnerHTML"?(f=f?f.__html:void 0,c=c?c.__html:void 0,f!=null&&c!==f&&(s=s||[]).push(S,f)):S==="children"?typeof f!="string"&&typeof f!="number"||(s=s||[]).push(S,""+f):S!=="suppressContentEditableWarning"&&S!=="suppressHydrationWarning"&&(j.hasOwnProperty(S)?(f!=null&&S==="onScroll"&&Nn("scroll",n),s||c===f||(s=[])):(s=s||[]).push(S,f))}t&&(s=s||[]).push("style",t);var S=s;(e.updateQueue=S)&&(e.flags|=4)}},Ou=function(n,e,t,a){t!==a&&(e.flags|=4)};function Qa(n,e){if(!En)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:a.sibling=null}}function te(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,a=0;if(e)for(var i=n.child;i!==null;)t|=i.lanes|i.childLanes,a|=i.subtreeFlags&14680064,a|=i.flags&14680064,i.return=n,i=i.sibling;else for(i=n.child;i!==null;)t|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=n,i=i.sibling;return n.subtreeFlags|=a,n.childLanes=t,e}function dm(n,e,t){var a=e.pendingProps;switch(pr(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return te(e),null;case 1:return oe(e.type)&&Ei(),te(e),null;case 3:return a=e.stateNode,da(),Rn(le),Rn(ne),Ar(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(n===null||n.child===null)&&(Ii(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,je!==null&&(tl(je),je=null))),Vr(n,e),te(e),null;case 5:$r(e);var i=Pt(Va.current);if(t=e.type,n!==null&&e.stateNode!=null)Bu(n,e,t,a,i),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!a){if(e.stateNode===null)throw Error(p(166));return te(e),null}if(n=Pt(Ke.current),Ii(e)){a=e.stateNode,t=e.type;var s=e.memoizedProps;switch(a[Oe]=e,a[Ia]=s,n=(e.mode&1)!==0,t){case"dialog":Nn("cancel",a),Nn("close",a);break;case"iframe":case"object":case"embed":Nn("load",a);break;case"video":case"audio":for(i=0;i<Ba.length;i++)Nn(Ba[i],a);break;case"source":Nn("error",a);break;case"img":case"image":case"link":Nn("error",a),Nn("load",a);break;case"details":Nn("toggle",a);break;case"input":M(a,s),Nn("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!s.multiple},Nn("invalid",a);break;case"textarea":ka(a,s),Nn("invalid",a)}u(t,s),i=null;for(var r in s)if(s.hasOwnProperty(r)){var c=s[r];r==="children"?typeof c=="string"?a.textContent!==c&&(s.suppressHydrationWarning!==!0&&Li(a.textContent,c,n),i=["children",c]):typeof c=="number"&&a.textContent!==""+c&&(s.suppressHydrationWarning!==!0&&Li(a.textContent,c,n),i=["children",""+c]):j.hasOwnProperty(r)&&c!=null&&r==="onScroll"&&Nn("scroll",a)}switch(t){case"input":Ln(a),Pe(a,s,!0);break;case"textarea":Ln(a),at(a);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(a.onclick=Ni)}a=i,e.updateQueue=a,a!==null&&(e.flags|=4)}else{r=i.nodeType===9?i:i.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=oi(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=r.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof a.is=="string"?n=r.createElement(t,{is:a.is}):(n=r.createElement(t),t==="select"&&(r=n,a.multiple?r.multiple=!0:a.size&&(r.size=a.size))):n=r.createElementNS(n,t),n[Oe]=e,n[Ia]=a,Pu(n,e,!1,!1),e.stateNode=n;n:{switch(r=m(t,a),t){case"dialog":Nn("cancel",n),Nn("close",n),i=a;break;case"iframe":case"object":case"embed":Nn("load",n),i=a;break;case"video":case"audio":for(i=0;i<Ba.length;i++)Nn(Ba[i],n);i=a;break;case"source":Nn("error",n),i=a;break;case"img":case"image":case"link":Nn("error",n),Nn("load",n),i=a;break;case"details":Nn("toggle",n),i=a;break;case"input":M(n,a),i=tt(n,a),Nn("invalid",n);break;case"option":i=a;break;case"select":n._wrapperState={wasMultiple:!!a.multiple},i=F({},a,{value:void 0}),Nn("invalid",n);break;case"textarea":ka(n,a),i=Wt(n,a),Nn("invalid",n);break;default:i=a}u(t,i),c=i;for(s in c)if(c.hasOwnProperty(s)){var f=c[s];s==="style"?di(n,f):s==="dangerouslySetInnerHTML"?(f=f?f.__html:void 0,f!=null&&va(n,f)):s==="children"?typeof f=="string"?(t!=="textarea"||f!=="")&&st(n,f):typeof f=="number"&&st(n,""+f):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(j.hasOwnProperty(s)?f!=null&&s==="onScroll"&&Nn("scroll",n):f!=null&&dn(n,s,f,r))}switch(t){case"input":Ln(n),Pe(n,a,!1);break;case"textarea":Ln(n),at(n);break;case"option":a.value!=null&&n.setAttribute("value",""+_(a.value));break;case"select":n.multiple=!!a.multiple,s=a.value,s!=null?On(n,!!a.multiple,s,!1):a.defaultValue!=null&&On(n,!!a.multiple,a.defaultValue,!0);break;default:typeof i.onClick=="function"&&(n.onclick=Ni)}switch(t){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break n;case"img":a=!0;break n;default:a=!1}}a&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return te(e),null;case 6:if(n&&e.stateNode!=null)Ou(n,e,n.memoizedProps,a);else{if(typeof a!="string"&&e.stateNode===null)throw Error(p(166));if(t=Pt(Va.current),Pt(Ke.current),Ii(e)){if(a=e.stateNode,t=e.memoizedProps,a[Oe]=e,(s=a.nodeValue!==t)&&(n=ke,n!==null))switch(n.tag){case 3:Li(a.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Li(a.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else a=(t.nodeType===9?t:t.ownerDocument).createTextNode(a),a[Oe]=e,e.stateNode=a}return te(e),null;case 13:if(Rn(Pn),a=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(En&&ve!==null&&(e.mode&1)!==0&&(e.flags&128)===0)Uo(),ra(),e.flags|=98560,s=!1;else if(s=Ii(e),a!==null&&a.dehydrated!==null){if(n===null){if(!s)throw Error(p(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(p(317));s[Oe]=e}else ra(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;te(e),s=!1}else je!==null&&(tl(je),je=null),s=!0;if(!s)return e.flags&65536?e:null}return(e.flags&128)!==0?(e.lanes=t,e):(a=a!==null,a!==(n!==null&&n.memoizedState!==null)&&a&&(e.child.flags|=8192,(e.mode&1)!==0&&(n===null||(Pn.current&1)!==0?zn===0&&(zn=3):sl())),e.updateQueue!==null&&(e.flags|=4),te(e),null);case 4:return da(),Vr(n,e),n===null&&Oa(e.stateNode.containerInfo),te(e),null;case 10:return br(e.type._context),te(e),null;case 17:return oe(e.type)&&Ei(),te(e),null;case 19:if(Rn(Pn),s=e.memoizedState,s===null)return te(e),null;if(a=(e.flags&128)!==0,r=s.rendering,r===null)if(a)Qa(s,!1);else{if(zn!==0||n!==null&&(n.flags&128)!==0)for(n=e.child;n!==null;){if(r=Wi(n),r!==null){for(e.flags|=128,Qa(s,!1),a=r.updateQueue,a!==null&&(e.updateQueue=a,e.flags|=4),e.subtreeFlags=0,a=t,t=e.child;t!==null;)s=t,n=a,s.flags&=14680066,r=s.alternate,r===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=r.childLanes,s.lanes=r.lanes,s.child=r.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=r.memoizedProps,s.memoizedState=r.memoizedState,s.updateQueue=r.updateQueue,s.type=r.type,n=r.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return Dn(Pn,Pn.current&1|2),e.child}n=n.sibling}s.tail!==null&&Un()>fa&&(e.flags|=128,a=!0,Qa(s,!1),e.lanes=4194304)}else{if(!a)if(n=Wi(r),n!==null){if(e.flags|=128,a=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Qa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!r.alternate&&!En)return te(e),null}else 2*Un()-s.renderingStartTime>fa&&t!==1073741824&&(e.flags|=128,a=!0,Qa(s,!1),e.lanes=4194304);s.isBackwards?(r.sibling=e.child,e.child=r):(t=s.last,t!==null?t.sibling=r:e.child=r,s.last=r)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Un(),e.sibling=null,t=Pn.current,Dn(Pn,a?t&1|2:t&1),e):(te(e),null);case 22:case 23:return il(),a=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==a&&(e.flags|=8192),a&&(e.mode&1)!==0?(be&1073741824)!==0&&(te(e),e.subtreeFlags&6&&(e.flags|=8192)):te(e),null;case 24:return null;case 25:return null}throw Error(p(156,e.tag))}function cm(n,e){switch(pr(e),e.tag){case 1:return oe(e.type)&&Ei(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return da(),Rn(le),Rn(ne),Ar(),n=e.flags,(n&65536)!==0&&(n&128)===0?(e.flags=n&-65537|128,e):null;case 5:return $r(e),null;case 13:if(Rn(Pn),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(p(340));ra()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return Rn(Pn),null;case 4:return da(),null;case 10:return br(e.type._context),null;case 22:case 23:return il(),null;case 24:return null;default:return null}}var es=!1,ae=!1,mm=typeof WeakSet=="function"?WeakSet:Set,z=null;function ma(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(a){Kn(n,e,a)}else t.current=null}function Wr(n,e,t){try{t()}catch(a){Kn(n,e,a)}}var Ku=!1;function pm(n,e){if(ir=Si,n=ko(),Qs(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else n:{t=(t=n.ownerDocument)&&t.defaultView||window;var a=t.getSelection&&t.getSelection();if(a&&a.rangeCount!==0){t=a.anchorNode;var i=a.anchorOffset,s=a.focusNode;a=a.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break n}var r=0,c=-1,f=-1,S=0,N=0,E=n,L=null;e:for(;;){for(var W;E!==t||i!==0&&E.nodeType!==3||(c=r+i),E!==s||a!==0&&E.nodeType!==3||(f=r+a),E.nodeType===3&&(r+=E.nodeValue.length),(W=E.firstChild)!==null;)L=E,E=W;for(;;){if(E===n)break e;if(L===t&&++S===i&&(c=r),L===s&&++N===a&&(f=r),(W=E.nextSibling)!==null)break;E=L,L=E.parentNode}E=W}t=c===-1||f===-1?null:{start:c,end:f}}else t=null}t=t||{start:0,end:0}}else t=null;for(sr={focusedElem:n,selectionRange:t},Si=!1,z=e;z!==null;)if(e=z,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,z=n;else for(;z!==null;){e=z;try{var Q=e.alternate;if((e.flags&1024)!==0)switch(e.tag){case 0:case 11:case 15:break;case 1:if(Q!==null){var X=Q.memoizedProps,Hn=Q.memoizedState,k=e.stateNode,g=k.getSnapshotBeforeUpdate(e.elementType===e.type?X:De(e.type,X),Hn);k.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163))}}catch(K){Kn(e,e.return,K)}if(n=e.sibling,n!==null){n.return=e.return,z=n;break}z=e.return}return Q=Ku,Ku=!1,Q}function Ja(n,e,t){var a=e.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var i=a=a.next;do{if((i.tag&n)===n){var s=i.destroy;i.destroy=void 0,s!==void 0&&Wr(e,t,s)}i=i.next}while(i!==a)}}function ts(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var a=t.create;t.destroy=a()}t=t.next}while(t!==e)}}function zr(n){var e=n.ref;if(e!==null){var t=n.stateNode;n.tag,n=t,typeof e=="function"?e(n):e.current=n}}function Iu(n){var e=n.alternate;e!==null&&(n.alternate=null,Iu(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[Oe],delete e[Ia],delete e[ur],delete e[Yc],delete e[Qc])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Uu(n){return n.tag===5||n.tag===3||n.tag===4}function Hu(n){n:for(;;){for(;n.sibling===null;){if(n.return===null||Uu(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue n;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Gr(n,e,t){var a=n.tag;if(a===5||a===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Ni));else if(a!==4&&(n=n.child,n!==null))for(Gr(n,e,t),n=n.sibling;n!==null;)Gr(n,e,t),n=n.sibling}function Yr(n,e,t){var a=n.tag;if(a===5||a===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(a!==4&&(n=n.child,n!==null))for(Yr(n,e,t),n=n.sibling;n!==null;)Yr(n,e,t),n=n.sibling}var Xn=null,Le=!1;function vt(n,e,t){for(t=t.child;t!==null;)Fu(n,e,t),t=t.sibling}function Fu(n,e,t){if(Be&&typeof Be.onCommitFiberUnmount=="function")try{Be.onCommitFiberUnmount(gi,t)}catch{}switch(t.tag){case 5:ae||ma(t,e);case 6:var a=Xn,i=Le;Xn=null,vt(n,e,t),Xn=a,Le=i,Xn!==null&&(Le?(n=Xn,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):Xn.removeChild(t.stateNode));break;case 18:Xn!==null&&(Le?(n=Xn,t=t.stateNode,n.nodeType===8?or(n.parentNode,t):n.nodeType===1&&or(n,t),Ma(n)):or(Xn,t.stateNode));break;case 4:a=Xn,i=Le,Xn=t.stateNode.containerInfo,Le=!0,vt(n,e,t),Xn=a,Le=i;break;case 0:case 11:case 14:case 15:if(!ae&&(a=t.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){i=a=a.next;do{var s=i,r=s.destroy;s=s.tag,r!==void 0&&((s&2)!==0||(s&4)!==0)&&Wr(t,e,r),i=i.next}while(i!==a)}vt(n,e,t);break;case 1:if(!ae&&(ma(t,e),a=t.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=t.memoizedProps,a.state=t.memoizedState,a.componentWillUnmount()}catch(c){Kn(t,e,c)}vt(n,e,t);break;case 21:vt(n,e,t);break;case 22:t.mode&1?(ae=(a=ae)||t.memoizedState!==null,vt(n,e,t),ae=a):vt(n,e,t);break;default:vt(n,e,t)}}function qu(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new mm),e.forEach(function(a){var i=wm.bind(null,n,a);t.has(a)||(t.add(a),a.then(i,i))})}}function Ne(n,e){var t=e.deletions;if(t!==null)for(var a=0;a<t.length;a++){var i=t[a];try{var s=n,r=e,c=r;n:for(;c!==null;){switch(c.tag){case 5:Xn=c.stateNode,Le=!1;break n;case 3:Xn=c.stateNode.containerInfo,Le=!0;break n;case 4:Xn=c.stateNode.containerInfo,Le=!0;break n}c=c.return}if(Xn===null)throw Error(p(160));Fu(s,r,i),Xn=null,Le=!1;var f=i.alternate;f!==null&&(f.return=null),i.return=null}catch(S){Kn(i,e,S)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Vu(e,n),e=e.sibling}function Vu(n,e){var t=n.alternate,a=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Ne(e,n),Ue(n),a&4){try{Ja(3,n,n.return),ts(3,n)}catch(X){Kn(n,n.return,X)}try{Ja(5,n,n.return)}catch(X){Kn(n,n.return,X)}}break;case 1:Ne(e,n),Ue(n),a&512&&t!==null&&ma(t,t.return);break;case 5:if(Ne(e,n),Ue(n),a&512&&t!==null&&ma(t,t.return),n.flags&32){var i=n.stateNode;try{st(i,"")}catch(X){Kn(n,n.return,X)}}if(a&4&&(i=n.stateNode,i!=null)){var s=n.memoizedProps,r=t!==null?t.memoizedProps:s,c=n.type,f=n.updateQueue;if(n.updateQueue=null,f!==null)try{c==="input"&&s.type==="radio"&&s.name!=null&&an(i,s),m(c,r);var S=m(c,s);for(r=0;r<f.length;r+=2){var N=f[r],E=f[r+1];N==="style"?di(i,E):N==="dangerouslySetInnerHTML"?va(i,E):N==="children"?st(i,E):dn(i,N,E,S)}switch(c){case"input":qe(i,s);break;case"textarea":li(i,s);break;case"select":var L=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var W=s.value;W!=null?On(i,!!s.multiple,W,!1):L!==!!s.multiple&&(s.defaultValue!=null?On(i,!!s.multiple,s.defaultValue,!0):On(i,!!s.multiple,s.multiple?[]:"",!1))}i[Ia]=s}catch(X){Kn(n,n.return,X)}}break;case 6:if(Ne(e,n),Ue(n),a&4){if(n.stateNode===null)throw Error(p(162));i=n.stateNode,s=n.memoizedProps;try{i.nodeValue=s}catch(X){Kn(n,n.return,X)}}break;case 3:if(Ne(e,n),Ue(n),a&4&&t!==null&&t.memoizedState.isDehydrated)try{Ma(e.containerInfo)}catch(X){Kn(n,n.return,X)}break;case 4:Ne(e,n),Ue(n);break;case 13:Ne(e,n),Ue(n),i=n.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Xr=Un())),a&4&&qu(n);break;case 22:if(N=t!==null&&t.memoizedState!==null,n.mode&1?(ae=(S=ae)||N,Ne(e,n),ae=S):Ne(e,n),Ue(n),a&8192){if(S=n.memoizedState!==null,(n.stateNode.isHidden=S)&&!N&&(n.mode&1)!==0)for(z=n,N=n.child;N!==null;){for(E=z=N;z!==null;){switch(L=z,W=L.child,L.tag){case 0:case 11:case 14:case 15:Ja(4,L,L.return);break;case 1:ma(L,L.return);var Q=L.stateNode;if(typeof Q.componentWillUnmount=="function"){a=L,t=L.return;try{e=a,Q.props=e.memoizedProps,Q.state=e.memoizedState,Q.componentWillUnmount()}catch(X){Kn(a,t,X)}}break;case 5:ma(L,L.return);break;case 22:if(L.memoizedState!==null){Gu(E);continue}}W!==null?(W.return=L,z=W):Gu(E)}N=N.sibling}n:for(N=null,E=n;;){if(E.tag===5){if(N===null){N=E;try{i=E.stateNode,S?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(c=E.stateNode,f=E.memoizedProps.style,r=f!=null&&f.hasOwnProperty("display")?f.display:null,c.style.display=ui("display",r))}catch(X){Kn(n,n.return,X)}}}else if(E.tag===6){if(N===null)try{E.stateNode.nodeValue=S?"":E.memoizedProps}catch(X){Kn(n,n.return,X)}}else if((E.tag!==22&&E.tag!==23||E.memoizedState===null||E===n)&&E.child!==null){E.child.return=E,E=E.child;continue}if(E===n)break n;for(;E.sibling===null;){if(E.return===null||E.return===n)break n;N===E&&(N=null),E=E.return}N===E&&(N=null),E.sibling.return=E.return,E=E.sibling}}break;case 19:Ne(e,n),Ue(n),a&4&&qu(n);break;case 21:break;default:Ne(e,n),Ue(n)}}function Ue(n){var e=n.flags;if(e&2){try{n:{for(var t=n.return;t!==null;){if(Uu(t)){var a=t;break n}t=t.return}throw Error(p(160))}switch(a.tag){case 5:var i=a.stateNode;a.flags&32&&(st(i,""),a.flags&=-33);var s=Hu(n);Yr(n,s,i);break;case 3:case 4:var r=a.stateNode.containerInfo,c=Hu(n);Gr(n,c,r);break;default:throw Error(p(161))}}catch(f){Kn(n,n.return,f)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function fm(n,e,t){z=n,Wu(n)}function Wu(n,e,t){for(var a=(n.mode&1)!==0;z!==null;){var i=z,s=i.child;if(i.tag===22&&a){var r=i.memoizedState!==null||es;if(!r){var c=i.alternate,f=c!==null&&c.memoizedState!==null||ae;c=es;var S=ae;if(es=r,(ae=f)&&!S)for(z=i;z!==null;)r=z,f=r.child,r.tag===22&&r.memoizedState!==null?Yu(i):f!==null?(f.return=r,z=f):Yu(i);for(;s!==null;)z=s,Wu(s),s=s.sibling;z=i,es=c,ae=S}zu(n)}else(i.subtreeFlags&8772)!==0&&s!==null?(s.return=i,z=s):zu(n)}}function zu(n){for(;z!==null;){var e=z;if((e.flags&8772)!==0){var t=e.alternate;try{if((e.flags&8772)!==0)switch(e.tag){case 0:case 11:case 15:ae||ts(5,e);break;case 1:var a=e.stateNode;if(e.flags&4&&!ae)if(t===null)a.componentDidMount();else{var i=e.elementType===e.type?t.memoizedProps:De(e.type,t.memoizedProps);a.componentDidUpdate(i,t.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Go(e,s,a);break;case 3:var r=e.updateQueue;if(r!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}Go(e,r,t)}break;case 5:var c=e.stateNode;if(t===null&&e.flags&4){t=c;var f=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":f.autoFocus&&t.focus();break;case"img":f.src&&(t.src=f.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var S=e.alternate;if(S!==null){var N=S.memoizedState;if(N!==null){var E=N.dehydrated;E!==null&&Ma(E)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(p(163))}ae||e.flags&512&&zr(e)}catch(L){Kn(e,e.return,L)}}if(e===n){z=null;break}if(t=e.sibling,t!==null){t.return=e.return,z=t;break}z=e.return}}function Gu(n){for(;z!==null;){var e=z;if(e===n){z=null;break}var t=e.sibling;if(t!==null){t.return=e.return,z=t;break}z=e.return}}function Yu(n){for(;z!==null;){var e=z;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{ts(4,e)}catch(f){Kn(e,t,f)}break;case 1:var a=e.stateNode;if(typeof a.componentDidMount=="function"){var i=e.return;try{a.componentDidMount()}catch(f){Kn(e,i,f)}}var s=e.return;try{zr(e)}catch(f){Kn(e,s,f)}break;case 5:var r=e.return;try{zr(e)}catch(f){Kn(e,r,f)}}}catch(f){Kn(e,e.return,f)}if(e===n){z=null;break}var c=e.sibling;if(c!==null){c.return=e.return,z=c;break}z=e.return}}var gm=Math.ceil,as=vn.ReactCurrentDispatcher,Qr=vn.ReactCurrentOwner,Ce=vn.ReactCurrentBatchConfig,Sn=0,Qn=null,Fn=null,Zn=0,be=0,pa=pt(0),zn=0,Xa=null,Ot=0,is=0,Jr=0,Za=null,de=null,Xr=0,fa=1/0,Ze=null,ss=!1,Zr=null,bt=null,rs=!1,yt=null,ls=0,ni=0,nl=null,os=-1,us=0;function re(){return(Sn&6)!==0?Un():os!==-1?os:os=Un()}function St(n){return(n.mode&1)===0?1:(Sn&2)!==0&&Zn!==0?Zn&-Zn:Xc.transition!==null?(us===0&&(us=Ul()),us):(n=Mn,n!==0||(n=window.event,n=n===void 0?16:Ql(n.type)),n)}function Re(n,e,t,a){if(50<ni)throw ni=0,nl=null,Error(p(185));$a(n,t,a),((Sn&2)===0||n!==Qn)&&(n===Qn&&((Sn&2)===0&&(is|=t),zn===4&&wt(n,Zn)),ce(n,a),t===1&&Sn===0&&(e.mode&1)===0&&(fa=Un()+500,Bi&&gt()))}function ce(n,e){var t=n.callbackNode;Xd(n,e);var a=vi(n,n===Qn?Zn:0);if(a===0)t!==null&&Ol(t),n.callbackNode=null,n.callbackPriority=0;else if(e=a&-a,n.callbackPriority!==e){if(t!=null&&Ol(t),e===1)n.tag===0?Jc(Ju.bind(null,n)):Po(Ju.bind(null,n)),zc(function(){(Sn&6)===0&&gt()}),t=null;else{switch(Hl(a)){case 1:t=Ns;break;case 4:t=Kl;break;case 16:t=fi;break;case 536870912:t=Il;break;default:t=fi}t=sd(t,Qu.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function Qu(n,e){if(os=-1,us=0,(Sn&6)!==0)throw Error(p(327));var t=n.callbackNode;if(ga()&&n.callbackNode!==t)return null;var a=vi(n,n===Qn?Zn:0);if(a===0)return null;if((a&30)!==0||(a&n.expiredLanes)!==0||e)e=ds(n,a);else{e=a;var i=Sn;Sn|=2;var s=Zu();(Qn!==n||Zn!==e)&&(Ze=null,fa=Un()+500,It(n,e));do try{vm();break}catch(c){Xu(n,c)}while(!0);vr(),as.current=s,Sn=i,Fn!==null?e=0:(Qn=null,Zn=0,e=zn)}if(e!==0){if(e===2&&(i=Rs(n),i!==0&&(a=i,e=el(n,i))),e===1)throw t=Xa,It(n,0),wt(n,a),ce(n,Un()),t;if(e===6)wt(n,a);else{if(i=n.current.alternate,(a&30)===0&&!hm(i)&&(e=ds(n,a),e===2&&(s=Rs(n),s!==0&&(a=s,e=el(n,s))),e===1))throw t=Xa,It(n,0),wt(n,a),ce(n,Un()),t;switch(n.finishedWork=i,n.finishedLanes=a,e){case 0:case 1:throw Error(p(345));case 2:Ut(n,de,Ze);break;case 3:if(wt(n,a),(a&130023424)===a&&(e=Xr+500-Un(),10<e)){if(vi(n,0)!==0)break;if(i=n.suspendedLanes,(i&a)!==a){re(),n.pingedLanes|=n.suspendedLanes&i;break}n.timeoutHandle=lr(Ut.bind(null,n,de,Ze),e);break}Ut(n,de,Ze);break;case 4:if(wt(n,a),(a&4194240)===a)break;for(e=n.eventTimes,i=-1;0<a;){var r=31-_e(a);s=1<<r,r=e[r],r>i&&(i=r),a&=~s}if(a=i,a=Un()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*gm(a/1960))-a,10<a){n.timeoutHandle=lr(Ut.bind(null,n,de,Ze),a);break}Ut(n,de,Ze);break;case 5:Ut(n,de,Ze);break;default:throw Error(p(329))}}}return ce(n,Un()),n.callbackNode===t?Qu.bind(null,n):null}function el(n,e){var t=Za;return n.current.memoizedState.isDehydrated&&(It(n,e).flags|=256),n=ds(n,e),n!==2&&(e=de,de=t,e!==null&&tl(e)),n}function tl(n){de===null?de=n:de.push.apply(de,n)}function hm(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var a=0;a<t.length;a++){var i=t[a],s=i.getSnapshot;i=i.value;try{if(!Me(s(),i))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function wt(n,e){for(e&=~Jr,e&=~is,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-_e(e),a=1<<t;n[t]=-1,e&=~a}}function Ju(n){if((Sn&6)!==0)throw Error(p(327));ga();var e=vi(n,0);if((e&1)===0)return ce(n,Un()),null;var t=ds(n,e);if(n.tag!==0&&t===2){var a=Rs(n);a!==0&&(e=a,t=el(n,a))}if(t===1)throw t=Xa,It(n,0),wt(n,e),ce(n,Un()),t;if(t===6)throw Error(p(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,Ut(n,de,Ze),ce(n,Un()),null}function al(n,e){var t=Sn;Sn|=1;try{return n(e)}finally{Sn=t,Sn===0&&(fa=Un()+500,Bi&&gt())}}function Kt(n){yt!==null&&yt.tag===0&&(Sn&6)===0&&ga();var e=Sn;Sn|=1;var t=Ce.transition,a=Mn;try{if(Ce.transition=null,Mn=1,n)return n()}finally{Mn=a,Ce.transition=t,Sn=e,(Sn&6)===0&&gt()}}function il(){be=pa.current,Rn(pa)}function It(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,Wc(t)),Fn!==null)for(t=Fn.return;t!==null;){var a=t;switch(pr(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&Ei();break;case 3:da(),Rn(le),Rn(ne),Ar();break;case 5:$r(a);break;case 4:da();break;case 13:Rn(Pn);break;case 19:Rn(Pn);break;case 10:br(a.type._context);break;case 22:case 23:il()}t=t.return}if(Qn=n,Fn=n=xt(n.current,null),Zn=be=e,zn=0,Xa=null,Jr=is=Ot=0,de=Za=null,Et!==null){for(e=0;e<Et.length;e++)if(t=Et[e],a=t.interleaved,a!==null){t.interleaved=null;var i=a.next,s=t.pending;if(s!==null){var r=s.next;s.next=i,a.next=r}t.pending=a}Et=null}return n}function Xu(n,e){do{var t=Fn;try{if(vr(),zi.current=Ji,Gi){for(var a=Bn.memoizedState;a!==null;){var i=a.queue;i!==null&&(i.pending=null),a=a.next}Gi=!1}if(Bt=0,Yn=Wn=Bn=null,Wa=!1,za=0,Qr.current=null,t===null||t.return===null){zn=1,Xa=e,Fn=null;break}n:{var s=n,r=t.return,c=t,f=e;if(e=Zn,c.flags|=32768,f!==null&&typeof f=="object"&&typeof f.then=="function"){var S=f,N=c,E=N.tag;if((N.mode&1)===0&&(E===0||E===11||E===15)){var L=N.alternate;L?(N.updateQueue=L.updateQueue,N.memoizedState=L.memoizedState,N.lanes=L.lanes):(N.updateQueue=null,N.memoizedState=null)}var W=xu(r);if(W!==null){W.flags&=-257,$u(W,r,c,s,e),W.mode&1&&wu(s,S,e),e=W,f=S;var Q=e.updateQueue;if(Q===null){var X=new Set;X.add(f),e.updateQueue=X}else Q.add(f);break n}else{if((e&1)===0){wu(s,S,e),sl();break n}f=Error(p(426))}}else if(En&&c.mode&1){var Hn=xu(r);if(Hn!==null){(Hn.flags&65536)===0&&(Hn.flags|=256),$u(Hn,r,c,s,e),hr(ca(f,c));break n}}s=f=ca(f,c),zn!==4&&(zn=2),Za===null?Za=[s]:Za.push(s),s=r;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var k=yu(s,f,e);zo(s,k);break n;case 1:c=f;var g=s.type,v=s.stateNode;if((s.flags&128)===0&&(typeof g.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(bt===null||!bt.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var K=Su(s,c,e);zo(s,K);break n}}s=s.return}while(s!==null)}ed(t)}catch(Z){e=Z,Fn===t&&t!==null&&(Fn=t=t.return);continue}break}while(!0)}function Zu(){var n=as.current;return as.current=Ji,n===null?Ji:n}function sl(){(zn===0||zn===3||zn===2)&&(zn=4),Qn===null||(Ot&268435455)===0&&(is&268435455)===0||wt(Qn,Zn)}function ds(n,e){var t=Sn;Sn|=2;var a=Zu();(Qn!==n||Zn!==e)&&(Ze=null,It(n,e));do try{km();break}catch(i){Xu(n,i)}while(!0);if(vr(),Sn=t,as.current=a,Fn!==null)throw Error(p(261));return Qn=null,Zn=0,zn}function km(){for(;Fn!==null;)nd(Fn)}function vm(){for(;Fn!==null&&!Fd();)nd(Fn)}function nd(n){var e=id(n.alternate,n,be);n.memoizedProps=n.pendingProps,e===null?ed(n):Fn=e,Qr.current=null}function ed(n){var e=n;do{var t=e.alternate;if(n=e.return,(e.flags&32768)===0){if(t=dm(t,e,be),t!==null){Fn=t;return}}else{if(t=cm(t,e),t!==null){t.flags&=32767,Fn=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{zn=6,Fn=null;return}}if(e=e.sibling,e!==null){Fn=e;return}Fn=e=n}while(e!==null);zn===0&&(zn=5)}function Ut(n,e,t){var a=Mn,i=Ce.transition;try{Ce.transition=null,Mn=1,bm(n,e,t,a)}finally{Ce.transition=i,Mn=a}return null}function bm(n,e,t,a){do ga();while(yt!==null);if((Sn&6)!==0)throw Error(p(327));t=n.finishedWork;var i=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(p(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(Zd(n,s),n===Qn&&(Fn=Qn=null,Zn=0),(t.subtreeFlags&2064)===0&&(t.flags&2064)===0||rs||(rs=!0,sd(fi,function(){return ga(),null})),s=(t.flags&15990)!==0,(t.subtreeFlags&15990)!==0||s){s=Ce.transition,Ce.transition=null;var r=Mn;Mn=1;var c=Sn;Sn|=4,Qr.current=null,pm(n,t),Vu(t,n),Kc(sr),Si=!!ir,sr=ir=null,n.current=t,fm(t),qd(),Sn=c,Mn=r,Ce.transition=s}else n.current=t;if(rs&&(rs=!1,yt=n,ls=i),s=n.pendingLanes,s===0&&(bt=null),zd(t.stateNode),ce(n,Un()),e!==null)for(a=n.onRecoverableError,t=0;t<e.length;t++)i=e[t],a(i.value,{componentStack:i.stack,digest:i.digest});if(ss)throw ss=!1,n=Zr,Zr=null,n;return(ls&1)!==0&&n.tag!==0&&ga(),s=n.pendingLanes,(s&1)!==0?n===nl?ni++:(ni=0,nl=n):ni=0,gt(),null}function ga(){if(yt!==null){var n=Hl(ls),e=Ce.transition,t=Mn;try{if(Ce.transition=null,Mn=16>n?16:n,yt===null)var a=!1;else{if(n=yt,yt=null,ls=0,(Sn&6)!==0)throw Error(p(331));var i=Sn;for(Sn|=4,z=n.current;z!==null;){var s=z,r=s.child;if((z.flags&16)!==0){var c=s.deletions;if(c!==null){for(var f=0;f<c.length;f++){var S=c[f];for(z=S;z!==null;){var N=z;switch(N.tag){case 0:case 11:case 15:Ja(8,N,s)}var E=N.child;if(E!==null)E.return=N,z=E;else for(;z!==null;){N=z;var L=N.sibling,W=N.return;if(Iu(N),N===S){z=null;break}if(L!==null){L.return=W,z=L;break}z=W}}}var Q=s.alternate;if(Q!==null){var X=Q.child;if(X!==null){Q.child=null;do{var Hn=X.sibling;X.sibling=null,X=Hn}while(X!==null)}}z=s}}if((s.subtreeFlags&2064)!==0&&r!==null)r.return=s,z=r;else n:for(;z!==null;){if(s=z,(s.flags&2048)!==0)switch(s.tag){case 0:case 11:case 15:Ja(9,s,s.return)}var k=s.sibling;if(k!==null){k.return=s.return,z=k;break n}z=s.return}}var g=n.current;for(z=g;z!==null;){r=z;var v=r.child;if((r.subtreeFlags&2064)!==0&&v!==null)v.return=r,z=v;else n:for(r=g;z!==null;){if(c=z,(c.flags&2048)!==0)try{switch(c.tag){case 0:case 11:case 15:ts(9,c)}}catch(Z){Kn(c,c.return,Z)}if(c===r){z=null;break n}var K=c.sibling;if(K!==null){K.return=c.return,z=K;break n}z=c.return}}if(Sn=i,gt(),Be&&typeof Be.onPostCommitFiberRoot=="function")try{Be.onPostCommitFiberRoot(gi,n)}catch{}a=!0}return a}finally{Mn=t,Ce.transition=e}}return!1}function td(n,e,t){e=ca(t,e),e=yu(n,e,1),n=kt(n,e,1),e=re(),n!==null&&($a(n,1,e),ce(n,e))}function Kn(n,e,t){if(n.tag===3)td(n,n,t);else for(;e!==null;){if(e.tag===3){td(e,n,t);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(bt===null||!bt.has(a))){n=ca(t,n),n=Su(e,n,1),e=kt(e,n,1),n=re(),e!==null&&($a(e,1,n),ce(e,n));break}}e=e.return}}function ym(n,e,t){var a=n.pingCache;a!==null&&a.delete(e),e=re(),n.pingedLanes|=n.suspendedLanes&t,Qn===n&&(Zn&t)===t&&(zn===4||zn===3&&(Zn&130023424)===Zn&&500>Un()-Xr?It(n,0):Jr|=t),ce(n,e)}function ad(n,e){e===0&&((n.mode&1)===0?e=1:(e=ki,ki<<=1,(ki&130023424)===0&&(ki=4194304)));var t=re();n=Qe(n,e),n!==null&&($a(n,e,t),ce(n,t))}function Sm(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),ad(n,t)}function wm(n,e){var t=0;switch(n.tag){case 13:var a=n.stateNode,i=n.memoizedState;i!==null&&(t=i.retryLane);break;case 19:a=n.stateNode;break;default:throw Error(p(314))}a!==null&&a.delete(e),ad(n,t)}var id;id=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||le.current)ue=!0;else{if((n.lanes&t)===0&&(e.flags&128)===0)return ue=!1,um(n,e,t);ue=(n.flags&131072)!==0}else ue=!1,En&&(e.flags&1048576)!==0&&Bo(e,Ki,e.index);switch(e.lanes=0,e.tag){case 2:var a=e.type;ns(n,e),n=e.pendingProps;var i=aa(e,ne.current);ua(e,t),i=Mr(null,e,a,n,i,t);var s=jr();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,oe(a)?(s=!0,Pi(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,wr(e),i.updater=Xi,e.stateNode=i,i._reactInternals=e,Pr(e,a,n,t),e=Ir(null,e,a,!0,s,t)):(e.tag=0,En&&s&&mr(e),se(null,e,i,t),e=e.child),e;case 16:a=e.elementType;n:{switch(ns(n,e),n=e.pendingProps,i=a._init,a=i(a._payload),e.type=a,i=e.tag=$m(a),n=De(a,n),i){case 0:e=Kr(null,e,a,n,t);break n;case 1:e=ju(null,e,a,n,t);break n;case 11:e=Cu(null,e,a,n,t);break n;case 14:e=Au(null,e,a,De(a.type,n),t);break n}throw Error(p(306,a,""))}return e;case 0:return a=e.type,i=e.pendingProps,i=e.elementType===a?i:De(a,i),Kr(n,e,a,i,t);case 1:return a=e.type,i=e.pendingProps,i=e.elementType===a?i:De(a,i),ju(n,e,a,i,t);case 3:n:{if(Du(e),n===null)throw Error(p(387));a=e.pendingProps,s=e.memoizedState,i=s.element,Wo(n,e),Vi(e,a,null,t);var r=e.memoizedState;if(a=r.element,s.isDehydrated)if(s={element:a,isDehydrated:!1,cache:r.cache,pendingSuspenseBoundaries:r.pendingSuspenseBoundaries,transitions:r.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=ca(Error(p(423)),e),e=Lu(n,e,a,t,i);break n}else if(a!==i){i=ca(Error(p(424)),e),e=Lu(n,e,a,t,i);break n}else for(ve=mt(e.stateNode.containerInfo.firstChild),ke=e,En=!0,je=null,t=qo(e,null,a,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ra(),a===i){e=Xe(n,e,t);break n}se(n,e,a,t)}e=e.child}return e;case 5:return Yo(e),n===null&&gr(e),a=e.type,i=e.pendingProps,s=n!==null?n.memoizedProps:null,r=i.children,rr(a,i)?r=null:s!==null&&rr(a,s)&&(e.flags|=32),Mu(n,e),se(n,e,r,t),e.child;case 6:return n===null&&gr(e),null;case 13:return Nu(n,e,t);case 4:return xr(e,e.stateNode.containerInfo),a=e.pendingProps,n===null?e.child=la(e,null,a,t):se(n,e,a,t),e.child;case 11:return a=e.type,i=e.pendingProps,i=e.elementType===a?i:De(a,i),Cu(n,e,a,i,t);case 7:return se(n,e,e.pendingProps,t),e.child;case 8:return se(n,e,e.pendingProps.children,t),e.child;case 12:return se(n,e,e.pendingProps.children,t),e.child;case 10:n:{if(a=e.type._context,i=e.pendingProps,s=e.memoizedProps,r=i.value,Dn(Hi,a._currentValue),a._currentValue=r,s!==null)if(Me(s.value,r)){if(s.children===i.children&&!le.current){e=Xe(n,e,t);break n}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var c=s.dependencies;if(c!==null){r=s.child;for(var f=c.firstContext;f!==null;){if(f.context===a){if(s.tag===1){f=Je(-1,t&-t),f.tag=2;var S=s.updateQueue;if(S!==null){S=S.shared;var N=S.pending;N===null?f.next=f:(f.next=N.next,N.next=f),S.pending=f}}s.lanes|=t,f=s.alternate,f!==null&&(f.lanes|=t),yr(s.return,t,e),c.lanes|=t;break}f=f.next}}else if(s.tag===10)r=s.type===e.type?null:s.child;else if(s.tag===18){if(r=s.return,r===null)throw Error(p(341));r.lanes|=t,c=r.alternate,c!==null&&(c.lanes|=t),yr(r,t,e),r=s.sibling}else r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}se(n,e,i.children,t),e=e.child}return e;case 9:return i=e.type,a=e.pendingProps.children,ua(e,t),i=xe(i),a=a(i),e.flags|=1,se(n,e,a,t),e.child;case 14:return a=e.type,i=De(a,e.pendingProps),i=De(a.type,i),Au(n,e,a,i,t);case 15:return Tu(n,e,e.type,e.pendingProps,t);case 17:return a=e.type,i=e.pendingProps,i=e.elementType===a?i:De(a,i),ns(n,e),e.tag=1,oe(a)?(n=!0,Pi(e)):n=!1,ua(e,t),vu(e,a,i),Pr(e,a,i,t),Ir(null,e,a,!0,n,t);case 19:return Eu(n,e,t);case 22:return _u(n,e,t)}throw Error(p(156,e.tag))};function sd(n,e){return Bl(n,e)}function xm(n,e,t,a){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ae(n,e,t,a){return new xm(n,e,t,a)}function rl(n){return n=n.prototype,!(!n||!n.isReactComponent)}function $m(n){if(typeof n=="function")return rl(n)?1:0;if(n!=null){if(n=n.$$typeof,n===yn)return 11;if(n===qn)return 14}return 2}function xt(n,e){var t=n.alternate;return t===null?(t=Ae(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function cs(n,e,t,a,i,s){var r=2;if(a=n,typeof n=="function")rl(n)&&(r=1);else if(typeof n=="string")r=5;else n:switch(n){case hn:return Ht(t.children,i,s,e);case xn:r=8,i|=8;break;case nn:return n=Ae(12,t,e,i|2),n.elementType=nn,n.lanes=s,n;case Tn:return n=Ae(13,t,e,i),n.elementType=Tn,n.lanes=s,n;case In:return n=Ae(19,t,e,i),n.elementType=In,n.lanes=s,n;case ln:return ms(t,i,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case bn:r=10;break n;case $n:r=9;break n;case yn:r=11;break n;case qn:r=14;break n;case D:r=16,a=null;break n}throw Error(p(130,n==null?n:typeof n,""))}return e=Ae(r,t,e,i),e.elementType=n,e.type=a,e.lanes=s,e}function Ht(n,e,t,a){return n=Ae(7,n,a,e),n.lanes=t,n}function ms(n,e,t,a){return n=Ae(22,n,a,e),n.elementType=ln,n.lanes=t,n.stateNode={isHidden:!1},n}function ll(n,e,t){return n=Ae(6,n,null,e),n.lanes=t,n}function ol(n,e,t){return e=Ae(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function Cm(n,e,t,a,i){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Es(0),this.expirationTimes=Es(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Es(0),this.identifierPrefix=a,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function ul(n,e,t,a,i,s,r,c,f){return n=new Cm(n,e,t,c,f),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Ae(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:a,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},wr(s),n}function Am(n,e,t){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:wn,key:a==null?null:""+a,children:n,containerInfo:e,implementation:t}}function rd(n){if(!n)return ft;n=n._reactInternals;n:{if(jt(n)!==n||n.tag!==1)throw Error(p(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break n;case 1:if(oe(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break n}}e=e.return}while(e!==null);throw Error(p(171))}if(n.tag===1){var t=n.type;if(oe(t))return Ro(n,t,e)}return e}function ld(n,e,t,a,i,s,r,c,f){return n=ul(t,a,!0,n,i,s,r,c,f),n.context=rd(null),t=n.current,a=re(),i=St(t),s=Je(a,i),s.callback=e!=null?e:null,kt(t,s,i),n.current.lanes=i,$a(n,i,a),ce(n,a),n}function ps(n,e,t,a){var i=e.current,s=re(),r=St(i);return t=rd(t),e.context===null?e.context=t:e.pendingContext=t,e=Je(s,r),e.payload={element:n},a=a===void 0?null:a,a!==null&&(e.callback=a),n=kt(i,e,r),n!==null&&(Re(n,i,r,s),qi(n,i,r)),r}function fs(n){return n=n.current,n.child?(n.child.tag===5,n.child.stateNode):null}function od(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function dl(n,e){od(n,e),(n=n.alternate)&&od(n,e)}function Tm(){return null}var ud=typeof reportError=="function"?reportError:function(n){console.error(n)};function cl(n){this._internalRoot=n}gs.prototype.render=cl.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(p(409));ps(n,e,null,null)},gs.prototype.unmount=cl.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;Kt(function(){ps(null,n,null,null)}),e[We]=null}};function gs(n){this._internalRoot=n}gs.prototype.unstable_scheduleHydration=function(n){if(n){var e=Vl();n={blockedOn:null,target:n,priority:e};for(var t=0;t<ut.length&&e!==0&&e<ut[t].priority;t++);ut.splice(t,0,n),t===0&&Gl(n)}};function ml(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function hs(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function dd(){}function _m(n,e,t,a,i){if(i){if(typeof a=="function"){var s=a;a=function(){var S=fs(r);s.call(S)}}var r=ld(e,a,n,0,null,!1,!1,"",dd);return n._reactRootContainer=r,n[We]=r.current,Oa(n.nodeType===8?n.parentNode:n),Kt(),r}for(;i=n.lastChild;)n.removeChild(i);if(typeof a=="function"){var c=a;a=function(){var S=fs(f);c.call(S)}}var f=ul(n,0,!1,null,null,!1,!1,"",dd);return n._reactRootContainer=f,n[We]=f.current,Oa(n.nodeType===8?n.parentNode:n),Kt(function(){ps(e,f,t,a)}),f}function ks(n,e,t,a,i){var s=t._reactRootContainer;if(s){var r=s;if(typeof i=="function"){var c=i;i=function(){var f=fs(r);c.call(f)}}ps(e,r,n,i)}else r=_m(t,e,n,i,a);return fs(r)}Fl=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=xa(e.pendingLanes);t!==0&&(Ps(e,t|1),ce(e,Un()),(Sn&6)===0&&(fa=Un()+500,gt()))}break;case 13:Kt(function(){var a=Qe(n,1);if(a!==null){var i=re();Re(a,n,1,i)}}),dl(n,1)}},Bs=function(n){if(n.tag===13){var e=Qe(n,134217728);if(e!==null){var t=re();Re(e,n,134217728,t)}dl(n,134217728)}},ql=function(n){if(n.tag===13){var e=St(n),t=Qe(n,e);if(t!==null){var a=re();Re(t,n,e,a)}dl(n,e)}},Vl=function(){return Mn},Wl=function(n,e){var t=Mn;try{return Mn=n,e()}finally{Mn=t}},Vn=function(n,e,t){switch(e){case"input":if(qe(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var a=t[e];if(a!==n&&a.form===n.form){var i=Ri(a);if(!i)throw Error(p(90));fe(a),qe(a,i)}}}break;case"textarea":li(n,t);break;case"select":e=t.value,e!=null&&On(n,!!t.multiple,e,!1)}},jl=al,Dl=Kt;var Mm={usingClientEntryPoint:!1,Events:[Ua,ea,Ri,ba,zt,al]},ei={findFiberByHostInstance:Dt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jm={bundleType:ei.bundleType,version:ei.version,rendererPackageName:ei.rendererPackageName,rendererConfig:ei.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:vn.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=El(n),n===null?null:n.stateNode},findFiberByHostInstance:ei.findFiberByHostInstance||Tm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!="undefined"){var vs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vs.isDisabled&&vs.supportsFiber)try{gi=vs.inject(jm),Be=vs}catch{}}return me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Mm,me.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ml(e))throw Error(p(200));return Am(n,e,null,t)},me.createRoot=function(n,e){if(!ml(n))throw Error(p(299));var t=!1,a="",i=ud;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=ul(n,1,!1,null,null,t,!1,a,i),n[We]=e.current,Oa(n.nodeType===8?n.parentNode:n),new cl(e)},me.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(p(188)):(n=Object.keys(n).join(","),Error(p(268,n)));return n=El(e),n=n===null?null:n.stateNode,n},me.flushSync=function(n){return Kt(n)},me.hydrate=function(n,e,t){if(!hs(e))throw Error(p(200));return ks(null,n,e,!0,t)},me.hydrateRoot=function(n,e,t){if(!ml(n))throw Error(p(405));var a=t!=null&&t.hydratedSources||null,i=!1,s="",r=ud;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),e=ld(e,null,n,1,t!=null?t:null,i,!1,s,r),n[We]=e.current,Oa(n),a)for(n=0;n<a.length;n++)t=a[n],i=t._getVersion,i=i(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,i]:e.mutableSourceEagerHydrationData.push(t,i);return new gs(e)},me.render=function(n,e,t){if(!hs(e))throw Error(p(200));return ks(null,n,e,!1,t)},me.unmountComponentAtNode=function(n){if(!hs(n))throw Error(p(40));return n._reactRootContainer?(Kt(function(){ks(null,null,n,!1,function(){n._reactRootContainer=null,n[We]=null})}),!0):!1},me.unstable_batchedUpdates=al,me.unstable_renderSubtreeIntoContainer=function(n,e,t,a){if(!hs(t))throw Error(p(200));if(n==null||n._reactInternals===void 0)throw Error(p(38));return ks(n,e,t,!1,a)},me.version="18.3.1-next-f1338f8080-20240426",me}var vd;function Om(){if(vd)return gl.exports;vd=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(d){console.error(d)}}return l(),gl.exports=Bm(),gl.exports}var bd;function Km(){if(bd)return bs;bd=1;var l=Om();return bs.createRoot=l.createRoot,bs.hydrateRoot=l.hydrateRoot,bs}var Im=Km();const Um={syncUrl:"",syncToken:"",clearingUrl:"",monUrl:"",supabaseUrl:"",supabaseKey:"",deliveryUrl:""};var jn=_l();const O=l=>Number(l||0).toLocaleString("id-ID"),si=l=>(l>0?"+":"")+O(l),At=(l,d)=>d?Math.round(l/d*100)+"%":"–",xl=l=>{if(!(l>0))return"–";const d=Math.round(l/6e4);return d>=60?Math.floor(d/60)+"j "+d%60+"m":d+"m"},Hm=Object.freeze(Object.defineProperty({__proto__:null,fmt:O,fmtDur:xl,pc:At,signed:si},Symbol.toStringTag,{value:"Module"}));function ha(l,d,p){const $=l.filter(A=>d[A.bin]),j=$.filter(A=>p(A)==="ok");let w=0,C=0;$.forEach(A=>{const rn=d[A.bin].actualQty-A.onhand;rn>0?w+=rn:C+=rn});const b=$.map(A=>Date.parse(d[A.bin].savedAt)).filter(Boolean),x=b.length>1?Math.max(...b)-Math.min(...b):0;return{total:l.length,done:$.length,ok:j.length,bad:$.length-j.length,pos:w,neg:C,span:x,speed:x>0?($.length/(x/36e5)).toFixed(1).replace(".",","):"–"}}function Fm({areas:l,data:d,counts:p,stat:$,isClosed:j}){const w=ha(d,p,$),C="```",b=l.map(x=>{const A=ha(d.filter(rn=>rn.area===x),p,$);return x.slice(0,6).padEnd(7)+(A.done+"/"+A.total).padStart(8)+At(A.ok,A.done).padStart(9)+(j(x)?"  TUTUP":"  JALAN")});return`*KPI STOCK OPNAME PER AREA*
${new Date().toLocaleString("id-ID")}
━━━━━━━━━━━━━━━━━━━━
${C}
AREA      BIN  AKURASI  STATUS
${b.join(`
`)}
${C}
Progres total : ${At(w.done,w.total)}
Akurasi total : ${At(w.ok,w.done)}
Selisih qty   : ${si(w.pos)} / ${O(w.neg)}
_Akurasi = bin sesuai / bin diperiksa_`}const He=["Hijau 1","Hijau 2","Kuning 1","Kuning 2","Kuning 3","Kuning 4","Merah"],Tt=["A","B","C","PTM"],ie="-",$l={"Hijau 1":"#a9d99a","Hijau 2":"#4caf50","Kuning 1":"#fbd3b5","Kuning 2":"#f2a96e","Kuning 3":"#c0561b","Kuning 4":"#f4b400",Merah:"#d32f2f"},qm={A:"Pak Kelik",B:"Pak Syaipul",C:"Pak Encup",PTM:""};function ye(l){const d=String(l||"").trim().toLowerCase().replace(/\s+/g," ");if(d==="merah")return"Merah";const p=d.match(/^(hijau|kuning)\s*(\d)$/);if(!p)return"";const $=p[1][0].toUpperCase()+p[1].slice(1)+" "+p[2];return He.includes($)?$:""}const Rd=l=>l.startsWith("Kuning"),Cl=l=>Rd(l)||l==="Merah",Cs=l=>Number(l.onhand)>0,yd=()=>Object.fromEntries(He.map(l=>[l,0]));function Vm(l,d={}){const p=yd(),$=Object.fromEntries([...Tt,ie].map(b=>[b,yd()]));let j=0;l.forEach(b=>{if(!Cs(b))return;j++;const x=ye(b.sinyal);if(!x)return;p[x]++;const A=Tt.includes(d[b.kode])?d[b.kode]:ie;$[A][x]++});const w={};Object.keys($).forEach(b=>w[b]=He.filter(Rd).reduce((x,A)=>x+$[b][A],0));const C=Object.values(w).reduce((b,x)=>b+x,0);return{filled:j,bySignal:p,byClass:$,kuning:w,kuningTotal:C}}const As=l=>{const d=Tt.indexOf(l);return d<0?Tt.length:d};function Al(l,d="watch",p="parah",$={}){const j=C=>He.indexOf(C),w=l.filter(C=>Cs(C)&&(d==="all"||Cl(ye(C.sinyal))));return p==="prioritas"?w.sort((C,b)=>As($[C.kode])-As($[b.kode])||j(ye(b.sinyal))-j(ye(C.sinyal))||Number(b.aging)-Number(C.aging)||String(C.bin).localeCompare(String(b.bin),"id",{numeric:!0})):w.sort((C,b)=>j(ye(b.sinyal))-j(ye(C.sinyal))||Number(b.aging)-Number(C.aging)||String(C.bin).localeCompare(String(b.bin),"id",{numeric:!0}))}function Wm(l,d={}){const p=new Map;return l.forEach($=>{const j=Tt.includes(d[$.kode])?d[$.kode]:ie;p.has(j)||p.set(j,{c:j,items:[],merah:0});const w=p.get(j);w.items.push($),ye($.sinyal)==="Merah"&&w.merah++}),[...p.values()].sort(($,j)=>As($.c)-As(j.c))}function zm({area:l,agg:d,pic:p,done:$,total:j,date:w}){const C=[`MONITORING AGING STOCK${l?" – "+l:""}`,w||"",`Rak isi: ${d.filled}`];return C.push("Sinyal: "+He.map(b=>`${b} ${d.bySignal[b]}`).join(", ")),C.push("","Total Kuning per kelas:"),[...Tt,ie].forEach(b=>{b===ie&&!d.kuning[b]||C.push(`${b===ie?"Belum diatur":b}${p[b]?" ("+p[b]+")":""}: ${d.kuning[b]}`)}),C.push(`Total: ${d.kuningTotal}`,"",`Sudah dicek fisik: ${$} dari ${j}`),C.join(`
`)}function Sd(l){const d=new Map;return l.forEach(({v:p,area:$})=>{const j=String(p==null?"":p).trim();if(!j||j==="Sesuai")return;const w=d.get(j)||{v:j,n:0,areas:new Set};w.n++,$&&w.areas.add($),d.set(j,w)}),[...d.values()]}function wd(l,d,{pin:p="",area:$="",limit:j=10}={}){const w=String(d||"").trim().toLowerCase(),C=b=>w&&b.v.toLowerCase().startsWith(w)?1:0;return l.filter(b=>(!w||b.v.toLowerCase().includes(w))&&b.v.toLowerCase()!==w).sort((b,x)=>(x.v===p)-(b.v===p)||C(x)-C(b)||x.areas.has($)-b.areas.has($)||x.n-b.n||b.v.localeCompare(x.v,"id",{numeric:!0})).slice(0,j).map(b=>b.v)}const ys=l=>String(l==null?"":l).toUpperCase().replace(/\s+/g,"");function Ed(l,d){if(!d)return null;const p=!!d.sesuai,$=p?String(l.tumpak||""):String(d.tumpak||"").trim(),j=p?String(l.item||""):String(d.pipa||"").trim(),w=d.qty===""||d.qty==null?null:Number(d.qty),C=Number(l.onhand)||0,b=w==null?0:w-C,x=w!=null&&b===0,A=p||!$||!l.tumpak||ys($)===ys(l.tumpak),rn=p||!j||ys(j)===ys(l.item),J=[];return w==null?J.push("qty belum diisi"):b&&J.push("qty "+(b>0?"+":"")+b),A||J.push("tumpak beda"),rn||J.push("item beda"),{sesuai:p,tumpak:$,item:j,qty:w,sys:C,diff:b,qtyOk:x,tumpakOk:A,itemOk:rn,ok:x&&A&&rn,reasons:J}}const Gm=12,Ym=600*1e3,Qm=900*1e3,ai=l=>l===""||l==null?NaN:Number(l),Ss=l=>{const d=l?Date.parse(l):NaN;return isNaN(d)?NaN:d};function Jm({data:l=[],counts:d={},users:p=[],tasks:$={},closed:j={},sync:w=null,now:C=Date.now()}={}){const b=[],x=(D,ln,B,Y,F,h)=>{const T=[...new Set(F||[])];b.push({id:D,level:ln,title:B,detail:Y,bins:T.slice(0,Gm),n:T.length,act:h||"bin"})},A=new Map,rn=[],J=[];l.forEach(D=>{if(!D||!D.bin||!D.area)return J.push(D&&D.bin||"(tanpa bin)");const ln=ai(D.onhand);(isNaN(ln)||ln<0)&&J.push(D.bin);const B=D.bin+"\0"+String(D.kode||"")+"\0"+String(D.item||"");A.has(B)?rn.push(D.bin):A.set(B,1)}),rn.length&&x("dup-master","bad","Baris data WMS ganda","Bin + kode + item yang sama muncul lebih dari sekali. Impor ulang file WMS yang sudah dibersihkan.",rn,"data"),J.length&&x("bad-master","bad","Baris data WMS tidak valid","Bin/area kosong atau Onhand kosong, bukan angka, atau negatif.",J,"data");const V=new Set(l.map(D=>D&&D.bin).filter(Boolean)),U={},R={};l.forEach(D=>{D&&D.bin&&(U[D.bin]=(U[D.bin]||0)+(ai(D.onhand)||0),R[D.bin]=(R[D.bin]||0)+1)});const G=[],tn=[],q=[],sn=[],dn=[],vn=[],gn=[],wn=[],hn={};l.forEach(D=>D&&D.bin&&(hn[D.bin]=D.area)),Object.keys(d).forEach(D=>{const ln=d[D];if(!ln||typeof ln!="object")return tn.push(D);V.has(D)||G.push(D);const B=ai(ln.actualQty);(isNaN(B)||B<0)&&tn.push(D),String(ln.by||"").trim()||q.push(D);const Y=Ss(ln.savedAt);isNaN(Y)?sn.push(D):Y>C+Ym&&dn.push(D),V.has(D)&&ln.systemQty!=null&&ai(ln.systemQty)!==U[D]&&R[D]===1&&vn.push(D);const F=j[hn[D]];F&&!isNaN(Y)&&Y>Ss(F.at)&&gn.push(D);const h=ai(ln.systemQty);!isNaN(B)&&!isNaN(h)&&h>0&&Math.abs(B-h)/h>=.5&&Math.abs(B-h)>=10&&!String(ln.note||"").trim()&&wn.push(D)}),tn.length&&x("bad-qty","bad","Hasil periksa dengan qty tidak valid","Qty aktual kosong, bukan angka, atau negatif. Periksa ulang bin ini.",tn),dn.length&&x("future","bad","Cap waktu di masa depan","Jam HP petugas salah (lebih dari 10 menit lebih maju). Urutan 'yang terbaru menang' bisa keliru; periksa ulang bin ini.",dn),G.length&&x("orphan","warn","Hasil periksa untuk bin yang tidak ada di data WMS","Bin sudah tidak ada setelah impor ulang. Cek apakah salah rak.",G),vn.length&&x("stale","warn","Stok sistem berubah sesudah bin diperiksa","Selisih dihitung dari Onhand lama. Periksa ulang jika perlu.",vn),gn.length&&x("after-close","warn","Diperiksa sesudah area ditutup","Hasil tercatat setelah supervisor menutup areanya.",gn),wn.length&&x("big-nonote","warn","Selisih besar tanpa catatan","Selisih 50% atau lebih tanpa keterangan. Minta petugas menambah catatan atau hitung ulang.",wn),q.length&&x("no-by","warn","Hasil periksa tanpa nama petugas","Tidak jelas siapa yang memeriksa.",q),sn.length&&x("bad-time","warn","Hasil periksa tanpa waktu yang valid","Cap waktu kosong atau rusak; urutan sinkron bisa keliru.",sn);const xn=Object.keys($).filter(D=>!D.includes("|")&&!V.has(D));xn.length&&x("task-orphan","warn","Tugas untuk bin yang tidak ada","Tugas menunjuk bin yang tidak ada di data WMS.",xn);const nn={},bn=[];p.forEach(D=>{const ln=String(D&&D.name||"").trim().toLowerCase();ln&&(nn[ln]&&bn.push(D.name),nn[ln]=1)}),bn.length&&x("dup-user","bad","Nama pengguna ganda","Dua pengguna bernama sama membuat login dan laporan membingungkan: "+bn.join(", "),[],"usr");const $n=p.some(D=>D&&D.role==="admin"&&D.active!==!1);p.length&&!$n&&x("no-admin","bad","Tidak ada admin aktif","Aktifkan minimal satu admin.",[],"usr");const yn=new Set(l.map(D=>D&&D.area).filter(Boolean)),Tn=p.filter(D=>D&&D.active!==!1&&(D.role==="petugas"||D.role==="penerimaan")&&!(D.areas||[]).length).map(D=>D.name);Tn.length&&x("user-no-area","warn","Petugas tanpa area","Belum diberi area: "+Tn.join(", "),[],"usr");const In=[...new Set(p.flatMap(D=>D&&D.areas||[]).filter(D=>yn.size&&!yn.has(D)))];In.length&&x("user-ghost-area","warn","Area petugas tidak ada di data WMS","Area: "+In.join(", "),[],"usr"),w&&(w.ready?(w.err&&x("sync-err","bad","Sinkron gagal",w.err,[],"sync"),w.dirty&&w.lastAt&&C-Ss(w.lastAt)>Qm&&!w.err&&x("sync-stale","bad","Perubahan belum terkirim terlalu lama","Terakhir tersinkron "+Math.round((C-Ss(w.lastAt))/6e4)+" menit lalu.",[],"sync"),w.warn&&x("server-warn","bad","Server melaporkan masalah",String(w.warn),[],"sync"),Math.abs(Number(w.clk)||0)>6e4&&x("clock","warn","Jam perangkat ini berbeda dari server","Selisih "+Math.round(Math.abs(w.clk)/1e3)+" detik. Cap waktu otomatis dikoreksi, tetapi perbaiki jam HP.",[],"sync")):x("sync-off","warn","Belum tersambung ke server","Data hanya ada di perangkat ini. Isi URL dan token di menu Data > Sinkron.",[],"sync"));const qn={bad:0,warn:1};return b.sort((D,ln)=>qn[D.level]-qn[ln.level]),{issues:b,bad:b.filter(D=>D.level==="bad").length,warn:b.filter(D=>D.level==="warn").length,ok:b.length===0}}const Xm={"Dobel hitung":"dup","Selisih qty":"qty","Qty kosong":"nq","Belum dihitung":"belum","Tidak ada di laporan":"extra",Cocok:"ok"},vl=l=>l===""||l==null||isNaN(Number(l))?null:Number(l);function Zm(l){return(Array.isArray(l)?l:[]).filter(Array.isArray).map(d=>({v:d[0],shift:d[1]||"",lori:d[2]||"",qR:vl(d[5]),qC:vl(d[6]),diff:vl(d[7]),st:Xm[d[8]]||"belum",done:!!d[11]}))}const xd={dup:0,qty:1,nq:2,belum:3,extra:4,ok:5};function np(l,d=5){const p=(l||[]).filter(U=>U&&U.st!=="extra"),$=(l||[]).filter(U=>U&&U.st==="extra").length,j={ok:0,qty:0,dup:0,nq:0,belum:0};p.forEach(U=>{j[U.st]!=null&&j[U.st]++});const w=p.filter(U=>U.st!=="ok"&&!U.done),C=p.filter(U=>U.st!=="ok"&&U.done).length,b=p.reduce((U,R)=>U+(R.qR||0),0),x=p.reduce((U,R)=>U+(R.qC||0),0),rn=[...new Set(p.map(U=>U.shift).filter(Boolean))].sort().map(U=>{const R=p.filter(G=>G.shift===U);return{shift:U,total:R.length,ok:R.filter(G=>G.st==="ok").length,open:R.filter(G=>G.st!=="ok"&&!G.done).length}}),J=w.slice().sort((U,R)=>xd[U.st]-xd[R.st]||Math.abs(R.diff||0)-Math.abs(U.diff||0)||String(U.v).localeCompare(String(R.v),"id",{numeric:!0})).slice(0,d),V=p.length;return{total:V,ok:j.ok,qty:j.qty,dup:j.dup,nq:j.nq,belum:j.belum,extra:$,done:C,open:w.length,wms:b,cnt:x,sel:Math.round((x-b)*1e3)/1e3,pct:V?Math.round(j.ok/V*100):0,byShift:rn,top:J,status:V?w.length===0?"ok":"cek":"kosong"}}function ep(l,d=7){return(Array.isArray(l)?l:[]).filter(p=>p&&p.tgl&&p.n>0).slice().sort((p,$)=>p.tgl.localeCompare($.tgl)).slice(-d).map(p=>({tgl:p.tgl,n:p.n,ok:p.ok,bad:p.bad,pct:Math.round(p.ok/p.n*100)}))}const bl=new Set;let $d=0;const yl=window.WMS={emit(){$d++,bl.forEach(l=>l())},subscribe(l){return bl.add(l),()=>bl.delete(l)},getVersion:()=>$d};window.WMSLib={...Hm,kpiOf:ha,agingChecklist:Al,normSignal:ye,healthCheck:Jm,clrSummarize:np,clrFromHist:Zm,clrTrend:ep};function Ml(){return jn.useSyncExternalStore(yl.subscribe,yl.getVersion),yl}const Ee=jn.memo(function({as:d="div",html:p,...$}){return o.jsx(d,{...$,dangerouslySetInnerHTML:{__html:p}})}),Sl=(l,d)=>l?d/l>=.9?"ok":d/l>=.75?"warn":"bad":"";function Cd({items:l}){return o.jsx("div",{className:"kp-grid",children:l.map(([d,p,$])=>o.jsxs("div",{className:$?"t-"+$:void 0,children:[o.jsx("small",{children:d}),o.jsx("strong",{children:p})]},d))})}function tp(){const l=Ml();if(l.view!=="kpi"||!l.DATA)return o.jsx("section",{id:"v-kpi",hidden:!0});const{DATA:d,counts:p,stat:$,isClosed:j,owners:w,staff:C}=l,b=l.areas(),x=ha(d,p,$),A=[["Progres",At(x.done,x.total),`${O(x.done)} / ${O(x.total)} bin`,""],["Akurasi",At(x.ok,x.done),`${O(x.ok)} dari ${O(x.done)} bin sesuai`,Sl(x.done,x.ok)],["Area ditutup",b.filter(j).length+"/"+b.length,"area selesai",""],["Selisih qty",si(x.pos)+" / "+O(x.neg),"lebih / kurang",""]],rn={};C().forEach(U=>rn[U.name]=[]),d.forEach(U=>{const R=p[U.bin];R&&(rn[R.by||"Tanpa petugas"]=rn[R.by||"Tanpa petugas"]||[]).push(U)});const J=Object.entries(rn).map(([U,R])=>[U,ha(R,p,$)]).sort((U,R)=>(U[0]==="Tanpa petugas")-(R[0]==="Tanpa petugas")||R[1].done-U[1].done||U[0].localeCompare(R[0],"id")),V=()=>l.outText(Fm({areas:b,data:d,counts:p,stat:$,isClosed:j})).then(()=>l.toast("Tersalin. Tempel di WhatsApp."),()=>l.toast("Gagal menyalin. Izinkan akses clipboard di browser atau salin manual."));return o.jsxs("section",{id:"v-kpi",hidden:!0,children:[o.jsx("h2",{children:"KPI Area"}),o.jsx("p",{className:"hint",children:"Capaian tiap area dan petugas. Akurasi = bin sesuai dibagi bin diperiksa."}),o.jsx("div",{className:"kp-tiles",id:"kpiStats","aria-live":"polite","aria-atomic":"true",children:A.map(([U,R,G,tn])=>o.jsxs("div",{className:"kp-tile"+(tn?" t-"+tn:""),children:[o.jsx("small",{children:U}),o.jsx("strong",{children:R}),o.jsx("span",{children:G})]},U))}),o.jsxs("h3",{className:"sec",children:["Per area ",o.jsx("span",{className:"kp-n",children:b.length})]}),o.jsxs("div",{id:"kpiAreas",children:[b.length===0&&o.jsx("div",{className:"empty",children:"Belum ada data area."}),b.map(U=>{const R=ha(d.filter(dn=>dn.area===U),p,$),G=j(U),tn=R.total&&R.done===R.total,q=w(U),sn=R.total?Math.round(R.done/R.total*100):0;return o.jsxs("div",{className:"kp-card",children:[o.jsxs("div",{className:"kp-h",children:[o.jsxs("div",{className:"kp-id",children:[o.jsxs("b",{children:["Area ",U]}),o.jsxs("small",{children:["Petugas: ",q.length?q.join(", "):"belum ada"]})]}),o.jsx("span",{className:"pill "+(G?"green":tn?"amber":""),children:G?"Ditutup":tn?"Siap ditutup":"Berjalan"})]}),o.jsxs("div",{className:"kp-prog",children:[o.jsx("div",{className:"kp-bar"+(G?" t-ok":""),role:"progressbar","aria-valuenow":sn,"aria-valuemin":0,"aria-valuemax":100,"aria-label":"Progres area "+U,children:o.jsx("i",{style:{width:sn+"%"}})}),o.jsxs("b",{children:[sn,"%"]})]}),o.jsx(Cd,{items:[["Diperiksa",`${R.done}/${R.total}`],["Akurasi bin",At(R.ok,R.done),Sl(R.done,R.ok)],["Perlu review",R.bad,R.bad?"warn":""],["Selisih qty",si(R.pos)+" / "+O(R.neg)],["Durasi",xl(R.span)],["Bin per jam",R.speed]]})]},U)})]}),o.jsxs("h3",{className:"sec",children:["Per petugas ",o.jsx("span",{className:"kp-n",children:J.length})]}),o.jsxs("div",{id:"kpiUsers",children:[J.length===0&&o.jsx("div",{className:"empty",children:"Belum ada petugas."}),J.map(([U,R])=>{const G=Sl(R.done,R.ok),tn=R.done?Math.round(R.ok/R.done*100):0;return o.jsxs("div",{className:"kp-card"+(R.done?"":" idle"),children:[o.jsxs("div",{className:"kp-h",children:[o.jsx("span",{className:"kp-av","aria-hidden":"true",children:(U.trim()[0]||"?").toUpperCase()}),o.jsxs("div",{className:"kp-id",children:[o.jsx("b",{children:U}),o.jsx("small",{children:R.done?`${O(R.done)} bin diperiksa`:"Belum ada bin diperiksa"})]}),o.jsx("span",{className:"kp-acc"+(G?" t-"+G:""),children:At(R.ok,R.done)})]}),R.done>0&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"kp-bar"+(G?" t-"+G:""),role:"progressbar","aria-valuenow":tn,"aria-valuemin":0,"aria-valuemax":100,"aria-label":"Akurasi "+U,children:o.jsx("i",{style:{width:tn+"%"}})}),o.jsx(Cd,{items:[["Sesuai",O(R.ok),"ok"],["Perlu review",R.bad,R.bad?"warn":""],["Bin per jam",R.speed],["Selisih qty",si(R.pos)+" / "+O(R.neg)],["Durasi",xl(R.span)]]})]})]},U)})]}),o.jsxs("div",{className:"kp-actions",children:[o.jsx("button",{className:"btn pri",id:"kpiCopy",onClick:V,children:"Salin untuk WhatsApp"}),o.jsx("button",{className:"btn sec","data-tg":"kpiCopy",children:"Kirim ke Telegram"})]})]})}const Ad="warehouse_so_aging_area_v1",ws={},ap=(l,d)=>{var p;try{return(p=JSON.parse(localStorage.getItem(l)))!=null?p:d}catch{return d}},ip=(l,d)=>{try{return localStorage.setItem(l,JSON.stringify(d)),!0}catch{return!1}},sp=l=>l.replace("Hijau ","H").replace("Kuning ","K").replace("Merah","M");function rp(){const l=Ml(),[d,p]=jn.useState(()=>ap(Ad,"")),[$,j]=jn.useState("watch"),[w,C]=jn.useState("all"),[b,x]=jn.useState(!1),A=l.aging||ws,rn=l.agingCls||ws,J=l.agingCfg||ws,V=jn.useMemo(()=>Object.fromEntries(Object.entries(rn).map(([y,H])=>[y,H&&H.c])),[rn]),U={...qm,...J.pic||{}},R=l.view==="agi"&&!!l.DATA,G=l.tasks||ws,tn=l.curU||"",q=new Set(Object.keys(G).filter(y=>y.startsWith("AG|")&&(!tn||G[y].u===tn)).map(y=>y.slice(3)));jn.useEffect(()=>{if(!R||!l.agiTarget)return;const y=setTimeout(()=>{const H=[...document.querySelectorAll("[data-rak]")].find(fn=>fn.dataset.rak===l.agiTarget);H&&(H.open=!0,H.scrollIntoView({block:"center"}),l.agiTarget="")},120);return()=>clearTimeout(y)}),R&&l.agiFocus&&(l.agiFocus=!1,setTimeout(()=>{p(""),C("task")},0));const sn=R?l.areas():[],dn=sn.includes(d)?d:"",vn=jn.useMemo(()=>R?l.DATA.filter(y=>!dn||y.area===dn):[],[R,l.DATA,dn]),gn=jn.useMemo(()=>Vm(vn,V),[vn,V]),wn=jn.useMemo(()=>{const y=R?l.DATA:[],H=Object.fromEntries(y.map(_=>[_.bin,_.area])),fn=Object.entries(A).map(([_,I])=>({bin:_,r:I,area:H[_]}));return{tumpak:Sd([...y.map(_=>({v:_.tumpak,area:_.area})),...fn.map(_=>({v:_.r&&_.r.tumpak,area:_.area}))]),item:Sd([...y.map(_=>({v:_.item,area:_.area})),...fn.map(_=>({v:_.r&&_.r.pipa,area:_.area}))])}},[R,l.DATA,A]),hn=jn.useMemo(()=>Al(vn,w==="task"?"all":$,"prioritas",V),[vn,$,V,w]);if(!R)return o.jsx("section",{id:"v-agi",hidden:!0});const xn=hn.filter(y=>A[y.bin]).length,nn=y=>{var H;return!!A[y]&&String(A[y].at||"")>=String(((H=G["AG|"+y])==null?void 0:H.at)||"")},bn=Al(vn,"all").filter(y=>q.has(y.bin)&&!nn(y.bin)).length,$n=y=>ye(y.sinyal)==="Merah",yn=hn.filter(y=>$n(y)&&!A[y.bin]).length,Tn=hn.filter(y=>(w==="task"?q.has(y.bin):w==="todo"?!A[y.bin]:w==="done"?!!A[y.bin]:!0)&&(!b||$n(y))),In=Wm(Tn.slice(0,200),V).map(y=>({...y,items:[...y.items.filter(H=>!A[H.bin]),...y.items.filter(H=>A[H.bin])]})),qn=y=>{p(y),ip(Ad,y)},D=()=>window.nowIso?window.nowIso():new Date().toISOString(),ln=(y,H)=>l.setAgingCls({...rn,[y]:{c:H,at:D()}}),B=(y,H)=>l.setAgingCfg({...J,pic:{...U,[y]:H}}),Y=(y,H)=>{var fn;l.setAging({...A,[y]:{...H,by:((fn=l.curName)==null?void 0:fn.call(l))||"",at:D()}}),l.toast("Cek rak "+y+" tersimpan")},F=y=>{const H={...A};delete H[y],l.setAging(H)},h=()=>l.outText(zm({area:dn,agg:gn,pic:U,done:xn,total:hn.length,date:new Date().toLocaleDateString("id-ID")})).then(()=>l.toast("Tersalin. Tempel di WhatsApp."),()=>l.toast("Gagal menyalin. Izinkan akses clipboard di browser.")),T=()=>{const y=Cn=>'"'+String(Cn!=null?Cn:"").replace(/"/g,'""')+'"',H=["Area","Rak","Sinyal","Aging","Nama Item","Kelas Pipa","Tumpak Sistem","Stok Sistem","Actual Tumpak","Actual Pipa","Actual Qty","Selisih","Status"],fn=hn.map(Cn=>{const Ln=Ed(Cn,A[Cn.bin]);return[Cn.area,Cn.bin,ye(Cn.sinyal),Cn.aging,Cn.item,V[Cn.kode]||"",Cn.tumpak||"",Cn.onhand,Ln?Ln.tumpak:"",Ln?Ln.item:"",Ln&&Ln.qty!=null?Ln.qty:"",Ln&&Ln.qty!=null?Ln.diff:"",Ln?Ln.ok?"Sesuai":"Selisih: "+Ln.reasons.join(", "):"Belum dicek"].map(y).join(",")}),_=URL.createObjectURL(new Blob(["\uFEFF"+[H.map(y).join(","),...fn].join(`\r
`)],{type:"text/csv"})),I=Object.assign(document.createElement("a"),{href:_,download:`aging-stock-${dn||"semua"}-${new Date().toISOString().slice(0,10)}.csv`});document.body.append(I),I.click(),I.remove(),setTimeout(()=>URL.revokeObjectURL(_),1e3)},cn=Math.max(1,...He.map(y=>gn.bySignal[y])),pn=[...Tt,...gn.kuning[ie]||He.some(y=>gn.byClass[ie][y])?[ie]:[]];return o.jsxs("section",{id:"v-agi",hidden:!0,children:[o.jsx("h2",{children:"Aging Stock"}),o.jsx("p",{className:"hint",children:'Cek rak Merah dan Kuning, mulai dari kelas A. Cukup tap "Semua sama" atau perbarui no. tumpak, item, dan qty.'}),o.jsxs("div",{className:"agi-bar",children:[o.jsx("label",{htmlFor:"agiArea",children:"Area"}),o.jsxs("select",{id:"agiArea",value:dn,onChange:y=>qn(y.target.value),children:[o.jsx("option",{value:"",children:"Semua area"}),sn.map(y=>o.jsx("option",{value:y,children:y},y))]})]}),gn.filled===0?o.jsxs("div",{className:"empty",children:["Belum ada rak berisi di ",dn?"area "+dn:"data WMS",". Impor data di menu Data WMS."]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"stats agi-stats","aria-live":"polite",children:[o.jsxs("div",{className:"stat",children:[o.jsx("small",{children:"Kuning"}),o.jsx("strong",{style:{color:"var(--amber)"},children:O(gn.kuningTotal)})]}),o.jsxs("div",{className:"stat",children:[o.jsx("small",{children:"Merah"}),o.jsx("strong",{style:{color:gn.bySignal.Merah?"#d32f2f":void 0},children:O(gn.bySignal.Merah)})]}),o.jsxs("div",{className:"stat",children:[o.jsx("small",{children:"Dicek"}),o.jsxs("strong",{children:[xn,"/",hn.length]})]})]}),yn>0&&o.jsxs("button",{type:"button",className:"agi-alert"+(b?" on":""),"aria-pressed":b,onClick:()=>x(!b),children:[o.jsxs("b",{children:[yn," rak MERAH"]})," belum dicek ",o.jsx("span",{children:b?"Tampilkan semua":"Lihat saja yang merah"})]}),o.jsxs("h3",{className:"agi-h agi-list-h",children:["Prioritas cek ",o.jsxs("span",{className:"agi-cnt",children:[xn,"/",hn.length," dicek"]})]}),o.jsx("div",{className:"agi-prog",role:"progressbar","aria-label":"Kemajuan cek rak","aria-valuemin":0,"aria-valuemax":hn.length,"aria-valuenow":xn,children:o.jsx("i",{style:{width:(hn.length?xn/hn.length*100:0)+"%"}})}),o.jsxs("details",{className:"agi-filter",children:[o.jsxs("summary",{children:["Filter: ",$==="watch"?"Kuning & Merah":"Semua rak isi"," · ",w==="todo"?"Belum dicek":w==="done"?"Sudah dicek":"Semua status"]}),o.jsx("p",{className:"agi-fl",children:"Tampilkan rak"}),o.jsx("div",{className:"chips agi-chips",role:"group","aria-label":"Rak yang ditampilkan",children:[["watch","Kuning & Merah"],["all","Semua rak isi"]].map(([y,H])=>o.jsx("button",{className:"chip"+($===y?" on":""),"aria-pressed":$===y,onClick:()=>j(y),children:H},y))}),o.jsx("p",{className:"agi-fl",children:"Status cek"}),o.jsx("div",{className:"chips agi-chips agi-chips3",role:"group","aria-label":"Status cek rak",children:[...q.size?[["task",tn?"Tugas saya":"Tugas",bn]]:[],["all","Semua",hn.length],["todo","Belum",hn.length-xn],["done","Sudah",xn]].map(([y,H,fn])=>o.jsxs("button",{className:"chip"+(w===y?" on":""),"aria-pressed":w===y,onClick:()=>C(y),children:[H," ",o.jsx("b",{children:fn})]},y))})]}),Tn.length===0&&o.jsx("div",{className:"empty",children:"Tidak ada rak pada filter ini."}),In.map(y=>o.jsxs("div",{className:"agi-grp",children:[o.jsxs("div",{className:"agi-gh agi-k"+(y.c===ie?"x":y.c),children:[o.jsxs("b",{children:[y.c===ie?"Kelas belum diatur":"Kelas "+y.c,y.c!==ie&&U[y.c]?" · "+U[y.c]:""]}),o.jsxs("span",{children:[y.items.length," rak",y.merah?" · "+y.merah+" merah":""]})]}),y.items.map(H=>o.jsx(up,{x:H,a:A[H.bin],tugas:q.has(H.bin),blind:!!tn&&!!l.blindFor&&l.blindFor(H.bin),pools:wn,kelas:V[H.kode]||"",onClass:ln,onSave:Y,onClear:F},H.bin))]},y.c)),Tn.length>200&&o.jsxs("p",{className:"hint",children:["Menampilkan 200 rak teratas dari ",Tn.length,". Pilih area untuk mempersempit."]}),o.jsxs("div",{className:"row-act",children:[o.jsx("button",{className:"btn pri",onClick:h,children:"Salin ringkasan"}),o.jsx("button",{className:"btn sec inl",onClick:T,children:"CSV"})]}),o.jsxs("details",{className:"agi-sumd",children:[o.jsx("summary",{children:"Ringkasan, grafik & petugas per kelas"}),o.jsxs("div",{className:"card",children:[o.jsx("h3",{className:"agi-h",children:"Total sinyal aging"}),He.map(y=>o.jsxs("div",{className:"agi-row",children:[o.jsx("span",{className:"agi-lb",children:y}),o.jsx("span",{className:"agi-tr",children:o.jsx("i",{style:{width:gn.bySignal[y]/cn*100+"%",background:$l[y]}})}),o.jsx("b",{children:O(gn.bySignal[y])})]},y))]}),o.jsxs("div",{className:"card",children:[o.jsx("h3",{className:"agi-h",children:"Aging dalam kelas pipa"}),o.jsx("div",{className:"agi-scroll",children:o.jsxs("table",{className:"agi-tb",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Kelas"}),He.map(y=>o.jsxs("th",{title:y,children:[o.jsx("i",{style:{background:$l[y]}}),sp(y)]},y))]})}),o.jsx("tbody",{children:pn.map(y=>o.jsxs("tr",{children:[o.jsx("th",{children:y===ie?"Belum":y}),He.map(H=>o.jsx("td",{className:gn.byClass[y][H]?"":"z",children:gn.byClass[y][H]},H))]},y))})]})}),gn.kuning[ie]>0&&o.jsx("p",{className:"hint",children:"Ada rak Kuning tanpa kelas. Atur kelas pipa di daftar cek di bawah."})]}),o.jsxs("div",{className:"card",children:[o.jsx("h3",{className:"agi-h",children:"Total Kuning per kelas"}),pn.map(y=>o.jsxs("div",{className:"agi-pic",children:[o.jsx("span",{className:"agi-cl",children:y===ie?"?":y}),y===ie?o.jsx("span",{className:"agi-pn",children:"Belum diatur"}):o.jsx("input",{"aria-label":"Penanggung jawab kelas "+y,value:U[y]||"",placeholder:"Nama petugas",onChange:H=>B(y,H.target.value)}),o.jsx("b",{children:O(gn.kuning[y])})]},y)),o.jsxs("div",{className:"agi-pic tot",children:[o.jsx("span",{className:"agi-cl"}),o.jsx("span",{className:"agi-pn",children:"Total"}),o.jsx("b",{children:O(gn.kuningTotal)})]})]})]})]})]})}const lp=l=>l?"agi-kb agi-k"+l:"agi-kb agi-kx";function op(l){const d=[...document.querySelectorAll("#v-agi .agi-rak")],p=d.slice(d.indexOf(l)+1).find($=>!$.classList.contains("done"));l&&(l.open=!1),p&&(p.open=!0,setTimeout(()=>p.scrollIntoView({block:"start",behavior:"smooth"}),60))}function up({x:l,a:d,pools:p,kelas:$,onClass:j,onSave:w,onClear:C,tugas:b,blind:x}){var hn,xn;const[A,rn]=jn.useState({tumpak:d!=null&&d.sesuai?"":(d==null?void 0:d.tumpak)||"",pipa:d!=null&&d.sesuai?"":(d==null?void 0:d.pipa)||"",qty:(hn=d==null?void 0:d.qty)!=null?hn:""}),J=ye(l.sinyal),V=jn.useRef(null),U=!!(A.tumpak||A.pipa||A.qty!==""),R=()=>[...V.current?V.current.querySelectorAll("input"):[]],G=nn=>{if(nn.key!=="Enter")return;nn.preventDefault();const bn=R(),$n=bn[bn.indexOf(nn.currentTarget)+1];$n?$n.focus():U&&V.current&&V.current.querySelector(".agi-savebtn").click()},tn=nn=>{const bn=nn.target;setTimeout(()=>bn.scrollIntoView({block:"center",behavior:"smooth"}),280)},q=(nn,bn)=>{rn({...A,[nn]:bn});const $n=R(),yn=$n[nn==="tumpak"?1:2];yn&&requestAnimationFrame(()=>yn.focus())},sn=nn=>bn=>rn({...A,[nn]:bn.target.value}),dn=wd(p.tumpak,A.tumpak,{pin:l.tumpak,area:l.area}),vn=wd(p.item,A.pipa,{pin:l.item,area:l.area}),gn=(nn,bn,$n)=>bn.length>0&&o.jsx("div",{className:"agi-opts",role:"group","aria-label":nn,children:bn.map(yn=>o.jsx("button",{type:"button",className:"agi-opt",onClick:()=>q($n,yn),children:yn},yn))}),wn=(nn,bn)=>{const $n=nn.currentTarget.closest("details");try{navigator.vibrate&&navigator.vibrate(18)}catch{}w(l.bin,bn),op($n)};return o.jsxs("details",{"data-rak":l.bin,className:"card agi-rak"+(d?" done":"")+(J==="Merah"?" red":""),children:[o.jsxs("summary",{children:[o.jsx("span",{className:"agi-sg",style:{background:$l[J]||"#ccc",color:J==="Kuning 3"||J==="Merah"?"#fff":"#222"},children:J||"?"}),o.jsxs("span",{className:"agi-bn",children:[o.jsxs("b",{children:[l.bin,o.jsx("i",{className:lp($),children:$||"?"})]}),o.jsx("span",{className:"agi-it",children:l.item}),o.jsxs("small",{children:[b?"TUGAS · ":"","Tumpak ",o.jsx("strong",{children:l.tumpak||"–"})," · ",l.aging," hari",x?"":" · stok "+O(l.onhand),d?" · cek "+O((xn=d.qty)!=null?xn:0)+(d.sesuai?" (sesuai)":""):""]})]}),o.jsx("span",{className:"agi-ck"+(d?" on":""),"aria-label":d?"Sudah dicek":"Belum dicek",children:d?"✓":""})]}),o.jsxs("div",{className:"agi-form",ref:V,children:[o.jsxs("div",{className:"agi-sys",children:["Data sistem: tumpak ",o.jsx("b",{children:l.tumpak||"–"})," · item ",o.jsx("b",{children:l.item}),x?null:o.jsxs(o.Fragment,{children:[" · qty ",o.jsx("b",{children:O(l.onhand)})]})]}),!x&&o.jsx("button",{type:"button",className:"btn pri agi-all",onClick:nn=>wn(nn,{tumpak:"Sesuai",pipa:"Sesuai",qty:String(l.onhand),sesuai:!0}),children:"✓ Semua sama dengan sistem"}),o.jsx("p",{className:"agi-or",children:"Kalau ada yang beda, isi di sini:"}),o.jsxs("label",{children:["No. tumpak aktual",o.jsx("input",{value:A.tumpak,onChange:sn("tumpak"),onKeyDown:G,onFocus:tn,placeholder:l.tumpak||"AK140",autoCapitalize:"characters",autoComplete:"off",autoCorrect:"off",spellCheck:!1,enterKeyHint:"next"})]}),gn("Pilihan tumpak",dn,"tumpak"),o.jsxs("label",{children:["Item aktual",o.jsx("input",{value:A.pipa,onChange:sn("pipa"),onKeyDown:G,onFocus:tn,placeholder:"Ketik atau pilih item",autoComplete:"off",autoCorrect:"off",spellCheck:!1,enterKeyHint:"next"})]}),gn("Pilihan item",vn,"pipa"),o.jsxs("label",{children:["Qty aktual",o.jsx("input",{inputMode:"numeric",enterKeyHint:"done",autoComplete:"off",onKeyDown:G,onFocus:tn,value:A.qty,onChange:nn=>rn({...A,qty:nn.target.value.replace(/[^\d]/g,"")}),placeholder:x?"0":String(l.onhand)})]}),o.jsxs("div",{className:"row-act",children:[o.jsx("button",{className:"btn pri agi-savebtn",disabled:!U,onClick:nn=>wn(nn,{tumpak:A.tumpak,pipa:A.pipa,qty:A.qty}),children:"Simpan cek"}),d&&o.jsx("button",{className:"btn sec inl",onClick:()=>{C(l.bin),rn({tumpak:"",pipa:"",qty:""})},children:"Hapus"})]}),o.jsxs("details",{className:"agi-kls",children:[o.jsxs("summary",{children:["Kelas pipa: ",$||"belum diatur"," (ubah)"]}),o.jsxs("select",{value:$,onChange:nn=>j(l.kode,nn.target.value),"aria-label":"Kelas pipa untuk item ini",children:[o.jsx("option",{value:"",children:"Belum diatur"}),Tt.map(nn=>o.jsx("option",{value:nn,children:nn},nn))]})]})]})]})}const dp=[{id:"week",name:"Mingguan"},{id:"month",name:"Bulanan"},{id:"year",name:"Tahunan"}],et=[{id:"bin",name:"Per Bin"},{id:"dc",name:"DC Harian"},{id:"aging",name:"Aging"},{id:"muat",name:"Muat"},{id:"clr",name:"Clearing"}],ri=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],cp=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],mp=["S","S","R","K","J","S","M"],Tl=l=>String(l).padStart(2,"0"),Fe=l=>l.getFullYear()+"-"+Tl(l.getMonth()+1)+"-"+Tl(l.getDate()),Vt=(l,d)=>new Date(l.getFullYear(),l.getMonth(),l.getDate()+d);function pp(l){const d=new Date(l.getFullYear(),l.getMonth(),l.getDate());return Vt(d,-((d.getDay()+6)%7))}const Ct=l=>{if(!l)return"";if(/^\d{4}-\d{2}-\d{2}$/.test(l))return l;const d=new Date(l);return isNaN(d)?"":Fe(d)};function fp(l,d){return l==="month"?new Date(d.getFullYear(),d.getMonth(),1):l==="year"?new Date(d.getFullYear(),0,1):pp(d)}function Pd(l,d,p){return l==="month"?new Date(d.getFullYear(),d.getMonth()+p,1):l==="year"?new Date(d.getFullYear()+p,0,1):Vt(d,7*p)}function Td(l,d){if(l==="year")return String(d.getFullYear());if(l==="month")return cp[d.getMonth()]+" "+d.getFullYear();const p=Vt(d,6);return d.getDate()+(d.getMonth()===p.getMonth()?"":" "+ri[d.getMonth()])+"–"+p.getDate()+" "+ri[p.getMonth()]+" "+p.getFullYear()}function gp(l,d,p){const $=Fe(p);if(l==="year"){const w=d.getFullYear();return Array.from({length:12},(C,b)=>{const x=w+"-"+Tl(b+1);return{key:x,label:ri[b][0],name:ri[b],isToday:x===$.slice(0,7),isFuture:x>$.slice(0,7)}})}const j=l==="month"?new Date(d.getFullYear(),d.getMonth()+1,0).getDate():7;return Array.from({length:j},(w,C)=>{const b=Vt(d,C),x=Fe(b);return{key:x,label:l==="month"?String(C+1):mp[C],name:String(b.getDate()),isToday:x===$,isFuture:x>$}})}const wl=(l,d)=>l==="year"?d.slice(0,7):d,$s=l=>l.reduce((d,p)=>d+p,0),_d=(l,d)=>$s(d),xs=(l,d)=>d?l/d:null;function Ts(l){const d=l.itemOk==null?!0:l.itemOk!==!1,p=l.qtyOk==null?Number(l.diff)===0:l.qtyOk!==!1;return{itemOk:d,qtyOk:p,label:d&&p?"Sesuai":!d&&!p?"Item beda + selisih qty":d?"Selisih qty":"Item beda"}}function Md(l,d,p,{events:$,muat:j,clr:w}){const C=gp(l,d,p),b=new Map(C.map((q,sn)=>[q.key,sn])),x=()=>({n:0,ok:0,bad:0,acc:null,perB:C.map(()=>0),pos:0,neg:0}),A={bin:x(),dc:x(),aging:x(),muat:x(),clr:x()};Object.assign(A.bin,{qtyOk:0,qtyBad:0,itemOk:0,itemBad:0,perItemBad:C.map(()=>0)});const rn={},J=(q,sn)=>{const dn=q||"Tanpa petugas";(rn[dn]=rn[dn]||{bin:0,dc:0,aging:0,muat:0,clr:0})[sn]++},V=[];for(const q of $){const sn=b.get(wl(l,Ct(q.at)));if(sn==null||!A[q.mod])continue;const dn=A[q.mod];dn.n++,dn.perB[sn]++,q.ok?dn.ok++:dn.bad++;const vn=Number(q.diff)||0;if(vn>0?dn.pos+=vn:dn.neg+=vn,q.mod==="bin"){const{qtyOk:gn,itemOk:wn}=Ts(q);gn?dn.qtyOk++:dn.qtyBad++,wn?dn.itemOk++:(dn.itemBad++,dn.perItemBad[sn]++)}J(q.by,q.mod),V.push(q)}const U=[],R=[],G=new Set,tn=new Set;Object.assign(A.muat,{spm:0,mobil:0,cp:0,days:0});for(const q of j){const sn=b.get(wl(l,Ct(q.tgl)));sn!=null&&(A.muat.perB[sn]++,A.muat.n++,G.add(Ct(q.tgl)),A.muat.spm+=Number(q.dp)||0,A.muat.mobil+=Number(q.total)||0,A.muat.cp+=Number(q.cpS)||0,J(q.by,"muat"),U.push(q))}Object.assign(A.clr,{vouchers:0,days:0});for(const q of w){const sn=b.get(wl(l,Ct(q.tgl)));if(sn==null)continue;const dn=Number(q.n)||0;A.clr.perB[sn]+=dn,A.clr.n++,tn.add(Ct(q.tgl)),A.clr.vouchers+=dn,A.clr.ok+=Number(q.ok)||0,A.clr.bad+=Number(q.bad)||0,J(q.by,"clr"),R.push(q)}A.muat.days=G.size,A.clr.days=tn.size;for(const q of["bin","dc","aging"])A[q].acc=xs(A[q].ok,A[q].n);return A.clr.acc=xs(A.clr.ok,A.clr.vouchers),A.bin.accQty=xs(A.bin.qtyOk,A.bin.n),A.bin.accItem=xs(A.bin.itemOk,A.bin.n),{m:A,who:rn,bk:C,inRange:V,muatIn:U,clrIn:R}}const hp=(l,d)=>l==="year"?new Date(d.getFullYear(),11,31):l==="month"?new Date(d.getFullYear(),d.getMonth()+1,0):Vt(d,6),jd=(l,d)=>Math.round((new Date(d.getFullYear(),d.getMonth(),d.getDate())-new Date(l.getFullYear(),l.getMonth(),l.getDate()))/864e5)+1;function kp({period:l="week",start:d,today:p=new Date,events:$=[],muat:j=[],clr:w=[],staff:C=[],agingTodo:b=0,areaTotals:x={},binTodo:A=0,filters:rn={}}){const J=rn.area||"",V=rn.by||"",U=M=>(!V||(M.by||"Tanpa petugas")===V)&&(!J||M.area==null||M.area===J),R=$.filter(U),G=j.filter(M=>!V||(M.by||"Tanpa petugas")===V),tn=w.filter(M=>!V||(M.by||"Tanpa petugas")===V),q={events:R,muat:G,clr:tn},sn=Md(l,d,p,q),dn=Pd(l,d,-1),vn=Md(l,dn,p,q),gn=Math.max(1,sn.bk.filter(M=>!M.isFuture).length),wn=hp(l,d),hn=jd(d,wn),xn=Math.max(1,Math.min(hn,jd(d,p))),nn=sn.m,bn=vn.m,$n={},yn={};for(const M of et)$n[M.id]=_d(M.id,nn[M.id].perB),yn[M.id]=_d(M.id,bn[M.id].perB.slice(0,gn));const Tn=$s(et.map(M=>$n[M.id])),In=$s(et.map(M=>yn[M.id])),qn=Object.entries(sn.who).map(([M,an])=>({name:M,...an,total:an.bin+an.dc+an.aging+an.muat+an.clr})).sort((M,an)=>an.total-M.total||M.name.localeCompare(an.name)),D=C.filter(M=>!sn.who[M]&&(!V||M===V)),ln=sn.inRange.filter(M=>M.mod==="bin"),B={};Object.keys(x).forEach(M=>B[M]={area:M,total:x[M],n:0,ok:0,bad:0,pos:0,neg:0}),ln.forEach(M=>{const an=B[M.area||"–"]=B[M.area||"–"]||{area:M.area||"–",total:0,n:0,ok:0,bad:0,pos:0,neg:0};an.n++,M.ok?an.ok++:an.bad++;{const Pe=Ts(M);an.qtyBad=(an.qtyBad||0)+(Pe.qtyOk?0:1),an.itemBad=(an.itemBad||0)+(Pe.itemOk?0:1)}const qe=Number(M.diff)||0;qe>0?an.pos+=qe:an.neg+=qe});const Y=Object.values(B).filter(M=>!J||M.area===J).sort((M,an)=>an.bad-M.bad||M.area.localeCompare(an.area)),F=[...ln].sort((M,an)=>an.at>M.at?1:-1),h=(M,an)=>an.at>M.at?1:-1,T=(M,an)=>M.ok===an.ok?h(M,an):M.ok?1:-1,cn=(M,an)=>String(an.tgl)>String(M.tgl)?1:-1,pn={dc:sn.inRange.filter(M=>M.mod==="dc").sort(T),aging:sn.inRange.filter(M=>M.mod==="aging").sort(T),muat:[...sn.muatIn].sort(cn),clr:[...sn.clrIn].sort(cn)},y=sn.inRange.filter(M=>M.mod==="aging"&&!M.ok).sort((M,an)=>Math.abs(Number(an.diff)||0)-Math.abs(Number(M.diff)||0)||(an.at>M.at?1:-1)).slice(0,8),H=ln.filter(M=>!M.ok).sort((M,an)=>Math.abs(Number(an.diff)||0)-Math.abs(Number(M.diff)||0)).slice(0,8),fn=M=>M.map(an=>Ct(an.tgl)).filter(Boolean).sort()[0]||"",_=fn(j),I=fn(w),Cn=Fe(p),Ln=new Set(G.map(M=>Ct(M.tgl))),fe=[];for(let M=0;M<hn;M++){const an=Fe(Vt(d,M));an>=Cn||_&&an<_||!_||Ln.has(an)||fe.push(Vt(d,M))}const Gn=[];if(nn.bin.qtyBad&&Gn.push({lvl:"r",mod:"bin",t:nn.bin.qtyBad+" bin selisih qty (stok per bin)"}),nn.bin.itemBad&&Gn.push({lvl:"r",mod:"bin",t:nn.bin.itemBad+" rak item tidak sama (kesesuaian rak)"}),nn.dc.bad&&Gn.push({lvl:"r",mod:"dc",t:nn.dc.bad+" item DC selisih dengan stok sistem"}),nn.aging.bad&&Gn.push({lvl:"r",mod:"aging",t:nn.aging.bad+" rak Aging selisih (qty, tumpak, atau item)"}),nn.clr.bad&&Gn.push({lvl:"r",mod:"clr",t:nn.clr.bad+" voucher Clearing belum sesuai"}),b&&Gn.push({lvl:"a",mod:"aging",t:b+" rak Kuning/Merah belum dicek fisik"}),A&&Gn.push({lvl:"a",mod:"bin",t:A+" bin belum pernah diperiksa"}),fe.length){const M=l==="week"?fe.map(an=>["Min","Sen","Sel","Rab","Kam","Jum","Sab"][an.getDay()]):fe.slice(0,6).map(an=>String(an.getDate())+(l==="year"?" "+ri[an.getMonth()]:""));Gn.push({lvl:"a",mod:"muat",t:"Laporan Muat kosong "+fe.length+" hari"+(l==="year"?"":": "+M.join(", ")+(fe.length>M.length?" +"+(fe.length-M.length):""))})}D.length&&Gn.push({lvl:"i",mod:"usr",t:"Belum ada aktivitas: "+D.slice(0,4).join(", ")+(D.length>4?" +"+(D.length-4):"")});const tt={r:0,a:1,i:2};return Gn.sort((M,an)=>tt[M.lvl]-tt[an.lvl]),{period:l,start:d,end:wn,label:Td(l,d),prevLabel:Td(l,dn),buckets:sn.bk,elapsed:gn,totalDays:hn,elapsedDays:xn,mods:nn,mains:$n,prevMains:yn,delta:{...Object.fromEntries(et.map(M=>[M.id,$n[M.id]-yn[M.id]])),kes:nn.bin.itemBad-$s(bn.bin.perItemBad.slice(0,gn))},total:Tn,prevTotal:In,people:qn,flags:Gn,areas:Y,bins:F,topBad:H,agingBad:y,lists:pn,missing:fe.length,coverage:{muatSince:_,clrSince:I,muatCut:!!_&&_>Fe(d),clrCut:!!I&&I>Fe(d)}}}const qt=l=>l==null?"n":l>=.95?"g":l>=.85?"a":"r",pe=l=>l==null?"–":Math.round(l*100)+"%",vp=(l,d)=>qt(d?Math.min(1,l/d):null),bp={week:"MINGGUAN",month:"BULANAN",year:"TAHUNAN"};function yp(l,{area:d="",by:p=""}={}){const $=l.mods,j=C=>l.delta[C]>0?" (+"+l.delta[C]+")":l.delta[C]<0?" ("+l.delta[C]+")":"",w=["*LAPORAN "+bp[l.period]+" GUDANG*",l.label+(d?" · Area "+d:"")+(p?" · "+p:""),""];return w.push("Stok per Bin: "+$.bin.n+" diperiksa, qty sesuai "+pe($.bin.accQty)+", selisih qty "+$.bin.qtyBad+j("bin")),w.push("Kesesuaian Rak: item sama "+pe($.bin.accItem)+", item tidak sama "+$.bin.itemBad),w.push("DC Harian: "+$.dc.n+" item selesai, sesuai "+pe($.dc.acc)+", selisih "+$.dc.bad+j("dc")),w.push("Aging: "+$.aging.n+" rak dicek, sesuai "+pe($.aging.acc)+", selisih "+$.aging.bad+j("aging")),w.push("Muat: "+$.muat.days+"/"+l.elapsedDays+" hari lapor, "+$.muat.spm+" SPM, "+$.muat.mobil+" mobil"+j("muat")),w.push("Clearing: "+$.clr.vouchers+" voucher, sesuai "+pe($.clr.acc)+", belum sesuai "+$.clr.bad+j("clr")),l.areas.some(C=>C.n)&&(w.push("","*Per area (bin)*"),l.areas.filter(C=>C.n).slice(0,8).forEach(C=>w.push("- "+C.area+": "+C.n+"/"+C.total+" diperiksa, selisih "+C.bad))),l.agingBad.length&&(w.push("","*Rak Aging selisih*"),l.agingBad.slice(0,5).forEach(C=>w.push("- "+C.key+": "+(C.why||"selisih")+(C.tumpakSys?" (tumpak "+C.tumpakSys+(C.tumpak&&C.tumpak!==C.tumpakSys?" → "+C.tumpak:"")+")":"")+(C.by?" ("+C.by+")":"")))),l.topBad.length&&(w.push("","*Selisih terbesar*"),l.topBad.slice(0,5).forEach(C=>w.push("- "+C.key+": "+(Number(C.diff)>0?"+":"")+(Number(C.diff)||0)+(C.by?" ("+C.by+")":"")))),l.people.length&&(w.push("","*Petugas teraktif*"),l.people.slice(0,5).forEach((C,b)=>w.push(b+1+". "+C.name+" – "+C.total+" aktivitas"))),w.push("","*Perlu perhatian*"),l.flags.length?l.flags.forEach(C=>w.push("- "+C.t)):w.push("- Tidak ada"),w.join(`
`)}function Sp(l,d){const p=b=>'"'+String(b==null?"":b).replace(/"/g,'""')+'"',$=[["Modul","Waktu","Petugas","Bin/Item","Area","Item","Sistem","Fisik","Selisih","Status","Tumpak Sistem","Tumpak Aktual","Item Aktual","Keterangan"]],j={bin:"Per Bin",dc:"DC Harian",aging:"Aging"},w=Fe(l.start),C=Fe(l.end);return d.filter(b=>{const x=Ct(b.at);return x>=w&&x<=C}).sort((b,x)=>(b.at>x.at)-(b.at<x.at)).forEach(b=>{var x,A;return $.push([j[b.mod]||b.mod,b.at,b.by||"",b.key||"",b.area||"",b.item||"",(x=b.sys)!=null?x:"",(A=b.fis)!=null?A:"",Number(b.diff)||0,b.mod==="bin"?Ts(b).label:b.ok?"Sesuai":"Selisih",b.tumpakSys||"",b.tumpak||"",b.itemAct||"",b.why||""])}),"\uFEFF"+$.map(b=>b.map(p).join(",")).join(`\r
`)}const ii={kes:"#b91c1c",bin:"#1d4ed8",dc:"#0f766e",aging:"#c2410c",muat:"#7c3aed",clr:"#be185d"},Dd="warehouse_so_rptp_v1",Bd=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],Ft=l=>{const d=new Date(l);return isNaN(d)?"":d.getDate()+" "+Bd[d.getMonth()]+" "+String(d.getHours()).padStart(2,"0")+"."+String(d.getMinutes()).padStart(2,"0")},nt=l=>(l>0?"+":l<0?"−":"")+O(Math.abs(l));function wp({vals:l,bk:d,color:p}){const $=Math.max(1,...l);return o.jsx("span",{className:"rpt-spark"+(d.length>12?" dense":""),style:{gridTemplateColumns:"repeat("+d.length+",1fr)"},"aria-hidden":"true",children:l.map((j,w)=>o.jsx("i",{className:(d[w].isToday?"now ":"")+(d[w].isFuture?"fut":""),children:o.jsx("b",{style:{height:Math.max(j?14:3,j/$*100)+"%",background:j?p:void 0}})},w))})}function xp(){const l=Ml(),[d,p]=jn.useState(()=>{try{const u=localStorage.getItem(Dd);return["week","month","year"].includes(u)?u:"week"}catch{return"week"}}),[$,j]=jn.useState(0),[w,C]=jn.useState(""),[b,x]=jn.useState(""),[A,rn]=jn.useState("bad"),[J,V]=jn.useState(10),[U,R]=jn.useState(""),[G,tn]=jn.useState(15),[q,sn]=jn.useState(null),[dn,vn]=jn.useState(""),[gn,wn]=jn.useState(""),[hn,xn]=jn.useState(""),[nn,bn]=jn.useState(15),[$n,yn]=jn.useState("");if(l.view!=="rpt"||!l.DATA)return o.jsx("section",{id:"v-rpt",hidden:!0});const{DATA:Tn,counts:In,stat:qn,aging:D}=l,ln=new Date;let B=fp(d,ln);for(let u=0;u<-$;u++)B=Pd(d,B,-1);const Y=$===0,F=new Map(Tn.map(u=>[u.bin,u])),h=[];Tn.forEach(u=>{var en;const m=In[u.bin];if(m&&m.savedAt){const P=Number((en=m.systemQty)!=null?en:u.onhand)||0;h.push({mod:"bin",at:m.savedAt,by:m.by,ok:qn(u)==="ok",itemOk:m.itemMatch===!0,qtyOk:Number(m.actualQty)===P,diff:Number(m.actualQty)-P,key:u.bin,area:u.area,item:u.item,sys:P,fis:Number(m.actualQty),itemAct:m.itemMatch===!1&&m.actualItem||""})}}),(l.dcRows?l.dcRows():[]).forEach(u=>{(u.st==="ok"||u.st==="bad")&&u.at&&h.push({mod:"dc",at:u.at,by:u.by,ok:u.st==="ok",diff:u.diff,key:u.item,item:u.item,sys:u.sys,fis:u.fis})}),Object.entries(D||{}).forEach(([u,m])=>{const en=F.get(u);if(!m||!m.at||!en)return;const P=Ed(en,m);h.push({mod:"aging",at:m.at,by:m.by,ok:P.ok,diff:P.diff,key:u,area:en.area,item:en.item,sys:P.sys,fis:P.qty,tumpakSys:en.tumpak||"",tumpak:P.tumpak,itemAct:P.item,why:P.reasons.join(", ")})});const T=u=>!w||u.area===w,cn=Tn.filter(u=>T(u)&&Cs(u)&&Cl(ye(u.sinyal))&&!(D||{})[u.bin]).length,pn=Tn.filter(u=>T(u)&&!In[u.bin]).length,y={};Tn.forEach(u=>{y[u.area]=(y[u.area]||0)+1});const H=l.staff().filter(u=>u.active!==!1).map(u=>u.name),fn=[...new Set([...H,...h.map(u=>u.by).filter(Boolean)])].sort(),_=kp({period:d,start:B,today:ln,events:h,muat:l.muatHist||[],clr:l.clrHist||[],staff:H,agingTodo:cn,binTodo:pn,areaTotals:y,filters:{area:w,by:b}}),I=_.mods,Cn=Math.max(1,..._.people.map(u=>u.total)),Ln={week:"minggu",month:"bulan",year:"tahun"}[d],fe=Y?"Berjalan · hari ke-"+_.elapsedDays+" dari "+_.totalDays:$===-1?Ln[0].toUpperCase()+Ln.slice(1)+" lalu":Math.abs($)+" "+Ln+" lalu",Gn=[{id:"bin",name:"Stok per Bin",main:I.bin.n,sub:"bin diperiksa · selisih qty "+O(I.bin.qtyBad),tag:pe(I.bin.accQty),tn:qt(I.bin.accQty)},{id:"kes",name:"Kesesuaian Rak",main:I.bin.itemBad,sub:"item tidak sama dari "+O(I.bin.n)+" rak",tag:pe(I.bin.accItem),tn:qt(I.bin.accItem),perB:I.bin.perItemBad,inv:!0},{id:"dc",main:I.dc.n,sub:"item DC selesai",tag:pe(I.dc.acc),tn:qt(I.dc.acc)},{id:"aging",main:I.aging.n,sub:"rak Aging dicek",tag:pe(I.aging.acc),tn:qt(I.aging.acc)},{id:"muat",main:I.muat.days,sub:O(I.muat.spm)+" SPM · "+O(I.muat.mobil)+" mobil",tag:I.muat.days+"/"+_.elapsedDays+" hr",tn:vp(I.muat.days,_.elapsedDays)},{id:"clr",main:O(I.clr.vouchers),sub:"voucher Clearing",tag:pe(I.clr.acc),tn:qt(I.clr.acc)}],tt=[["bin",[["Diperiksa",O(I.bin.n)+" / "+O(Tn.filter(T).length)],["Qty sesuai",O(I.bin.qtyOk)],["Selisih qty",O(I.bin.qtyBad)],["Qty lebih / kurang",nt(I.bin.pos)+" / "+nt(I.bin.neg)]],"Stok per Bin"],["kes",[["Diperiksa",O(I.bin.n)],["Item sama",O(I.bin.itemOk)],["Item tidak sama",O(I.bin.itemBad)],["Sesuai penuh",O(I.bin.ok)+" ("+pe(I.bin.acc)+")"]],"Kesesuaian Rak"],["dc",[["Item selesai",O(I.dc.n)],["Sesuai",O(I.dc.ok)],["Selisih",O(I.dc.bad)],["Qty lebih / kurang",nt(I.dc.pos)+" / "+nt(I.dc.neg)]]],["aging",[["Rak dicek",O(I.aging.n)],["Sesuai",O(I.aging.ok)],["Selisih",O(I.aging.bad)],["Kuning/Merah belum dicek",O(cn)]]],["muat",[["Hari lapor",I.muat.days+" / "+_.elapsedDays],["SPM",O(I.muat.spm)],["Mobil",O(I.muat.mobil)],["SPM copy rekom.",O(I.muat.cp)]]],["clr",[["Hari clearing",O(I.clr.days)],["Voucher",O(I.clr.vouchers)],["Sesuai",O(I.clr.ok)],["Belum sesuai",O(I.clr.bad)]]]],M=u=>Ts(u),an=_.bins.filter(u=>A==="all"||(A==="bad"?!M(u).qtyOk:A==="item"?!M(u).itemOk:u.ok)),qe={bad:_.bins.filter(u=>!M(u).qtyOk).length,item:_.bins.filter(u=>!M(u).itemOk).length,ok:_.bins.filter(u=>u.ok).length,all:_.bins.length},Pe=u=>{const m=new Date(String(u).slice(0,10)+"T00:00:00");return isNaN(m)?String(u||""):m.getDate()+" "+Bd[m.getMonth()]+" "+m.getFullYear()},Ve=u=>u.filter(([,m])=>m!==""&&m!=null&&m!=="–"),_t=u=>({t:u.diff===0?"Sesuai":"Qty "+nt(u.diff),c:u.diff===0?"ok":u.diff>0?"pos":"neg"}),On=(u,m)=>{if(u==="bin"){const en=M(m);return{k:m.key,b:en.qtyOk?"Qty sesuai":"Qty "+nt(m.diff),c:en.qtyOk?"ok":m.diff>0?"pos":"neg",s:m.item+(m.itemAct?" → ditemukan: "+m.itemAct:"")+" · "+O(m.sys)+" → "+O(m.fis)+(m.by?" · "+m.by:"")+" · "+Ft(m.at),t:(en.qtyOk?"Jumlah sesuai: sistem "+O(m.sys)+", fisik "+O(m.fis)+".":"Fisik "+(m.diff>0?"LEBIH ":"KURANG ")+O(Math.abs(m.diff))+" dari sistem (sistem "+O(m.sys)+", fisik "+O(m.fis)+").")+(en.itemOk?"":" Item di rak BERBEDA dari sistem"+(m.itemAct?", ditemukan: "+m.itemAct:"")+"."),d:Ve([["Bin",m.key],["Area",m.area],["Item sistem",m.item],["Stok sistem",O(m.sys)],["Qty fisik",O(m.fis)],["Selisih qty",m.diff===0?"Sesuai":nt(m.diff)],["Kesesuaian item",en.itemOk?"Sama":"Tidak sama"],["Item ditemukan",m.itemAct],["Petugas",m.by],["Waktu",Ft(m.at)]])}}if(u==="kes")return{k:m.key,b:"Item beda",c:"neg",s:m.item+(m.itemAct?" → ditemukan: "+m.itemAct:"")+(m.by?" · "+m.by:"")+" · "+Ft(m.at),d:On("bin",m).d};if(u==="dc"){const en=_t(m);return{k:m.key,b:en.t,c:en.c,s:"sistem "+O(m.sys)+" → fisik "+O(m.fis)+(m.by?" · "+m.by:"")+" · "+Ft(m.at),t:m.diff===0?"Jumlah sesuai: sistem "+O(m.sys)+", fisik "+O(m.fis)+".":"Fisik "+(m.diff>0?"LEBIH ":"KURANG ")+O(Math.abs(m.diff))+" dari sistem (sistem "+O(m.sys)+", fisik "+O(m.fis)+").",d:Ve([["Item DC",m.key],["Stok sistem",O(m.sys)],["Qty fisik",O(m.fis)],["Selisih",m.diff===0?"Sesuai":nt(m.diff)],["Petugas",m.by],["Waktu",Ft(m.at)]])}}return u==="aging"?{k:m.key,b:m.ok?"Sesuai":m.why||"Selisih",c:m.ok?"ok":"neg",s:m.item+" · tumpak "+(m.tumpakSys||"–")+(m.tumpak&&m.tumpak!==m.tumpakSys?" → "+m.tumpak:"")+" · qty "+O(m.sys)+" → "+(m.fis==null?"–":O(m.fis))+(m.by?" · "+m.by:"")+" · "+Ft(m.at),t:m.ok?"Rak ini sudah dicek dan sesuai.":"Rak ini ada selisih: "+(m.why||"perlu dicek ulang")+".",d:Ve([["Rak",m.key],["Area",m.area],["Item",m.item],["Tumpak sistem",m.tumpakSys],["Tumpak fisik",m.tumpak],["Qty sistem",O(m.sys)],["Qty fisik",m.fis==null?"":O(m.fis)],["Hasil",m.ok?"Sesuai":m.why||"Selisih"],["Petugas",m.by],["Waktu",Ft(m.at)]])}:u==="muat"?{k:Pe(m.tgl),b:O(m.dp||0)+" SPM",c:"ok",s:O(m.total||0)+" mobil"+(m.cpS?" · SPM copy "+O(m.cpS):"")+(m.by?" · "+m.by:""),d:Ve([["Tanggal",Pe(m.tgl)],["SPM",O(m.dp||0)],["Mobil",O(m.total||0)],["SPM copy rekomendasi",m.cpS?O(m.cpS):""],["Petugas",m.by]])}:u==="clr"?{k:Pe(m.tgl),b:O(m.n||0)+" voucher",c:Number(m.bad)?"neg":"ok",s:"sesuai "+O(m.ok||0)+" · belum sesuai "+O(m.bad||0)+(m.by?" · "+m.by:""),d:Ve([["Tanggal",Pe(m.tgl)],["Voucher",O(m.n||0)],["Sesuai",O(m.ok||0)],["Belum sesuai",O(m.bad||0)],["Petugas",m.by]])}:null},Wt=u=>u==="bin"?[..._.bins].sort((m,en)=>M(m).qtyOk===M(en).qtyOk?0:M(m).qtyOk?1:-1).map(m=>On("bin",m)):u==="kes"?_.bins.filter(m=>!M(m).itemOk).map(m=>On("kes",m)):["dc","aging","muat","clr"].includes(u)?_.lists[u].map(m=>On(u,m)):[],ka=(u,m)=>{if(["Diperiksa","Item selesai","Rak dicek","Hari lapor","SPM","Mobil","SPM copy rekom.","Hari clearing","Voucher","Kuning/Merah belum dicek"].includes(m))return null;if(u==="bin")return{"Qty sesuai":P=>M(P).qtyOk,"Selisih qty":P=>!M(P).qtyOk,"Qty lebih / kurang":P=>!M(P).qtyOk}[m];if(u==="kes")return{"Item sama":P=>M(P).itemOk,"Item tidak sama":P=>!M(P).itemOk,"Sesuai penuh":P=>!!P.ok}[m];if(u==="dc")return{Sesuai:P=>P.diff===0,Selisih:P=>P.diff!==0,"Qty lebih / kurang":P=>P.diff!==0}[m];if(u==="aging")return{Sesuai:P=>!!P.ok,Selisih:P=>!P.ok}[m];if(u==="clr")return{Sesuai:P=>Number(P.ok)>0,"Belum sesuai":P=>Number(P.bad)>0}[m]},li=(u,m)=>{if(u==="aging"&&m==="Kuning/Merah belum dicek")return Tn.filter(P=>T(P)&&Cs(P)&&Cl(ye(P.sinyal))&&!(D||{})[P.bin]).map(P=>({k:P.bin,b:"Belum dicek",c:"pos",s:P.item+(P.sinyal?" · sinyal "+P.sinyal:""),t:"Rak ini berstatus Kuning/Merah dan belum dicek fisik.",d:[["Rak",P.bin],["Area",P.area],["Item",P.item],["Sinyal aging",P.sinyal],["Status","Belum dicek"]].filter(([,Vn])=>Vn)}));const en=ka(u,m);return en?u==="bin"||u==="kes"?_.bins.filter(en).map(P=>On(u,P)):_.lists[u].filter(en).map(P=>On(u,P)):Wt(u)},at=u=>u.by||"Tanpa petugas",oi=u=>[].concat(_.bins.filter(m=>at(m)===u).map(m=>({...On("bin",m),m:"Bin"})),_.lists.dc.filter(m=>at(m)===u).map(m=>({...On("dc",m),m:"DC"})),_.lists.aging.filter(m=>at(m)===u).map(m=>({...On("aging",m),m:"Aging"})),_.lists.muat.filter(m=>at(m)===u).map(m=>({...On("muat",m),m:"Muat"})),_.lists.clr.filter(m=>at(m)===u).map(m=>({...On("clr",m),m:"Clearing"}))),Te=(u,m,en)=>o.jsxs("div",{className:"rpt-b click",role:"button",tabIndex:0,onClick:()=>sn(u),onKeyDown:P=>{(P.key==="Enter"||P.key===" ")&&(P.preventDefault(),sn(u))},children:[o.jsxs("div",{className:"rpt-bt",children:[o.jsxs("b",{children:[u.m?u.m+" · ":"",u.k]}),o.jsx("span",{className:"rpt-df "+u.c,children:u.b})]}),o.jsx("small",{children:u.s})]},en+u.k+m),it=u=>m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),u())},va=u=>{R(U===u?"":u),tn(15)},st=u=>{xn(hn===u&&!$n?"":u),yn(""),bn(15)},Mt=(u,m)=>{hn===u&&$n===m?(xn(""),yn("")):(xn(u),yn(m)),bn(15)},_s=u=>{p(u),j(0),V(10);try{localStorage.setItem(Dd,u)}catch{}},ui=()=>l.outText(yp(_,{area:w,by:b})).then(()=>l.toast("Tersalin. Tempel di WhatsApp."),()=>l.toast("Gagal menyalin. Izinkan akses clipboard di browser.")),di=()=>{const u=document.createElement("a");u.href=URL.createObjectURL(new Blob([Sp(_,h.filter(m=>(!b||(m.by||"Tanpa petugas")===b)&&(!w||m.area==null||m.area===w)))],{type:"text/csv;charset=utf-8"})),u.download="laporan-"+d+"-"+Fe(_.start)+".csv",document.body.appendChild(u),u.click(),u.remove(),setTimeout(()=>URL.revokeObjectURL(u.href),1500)},Ms=(u,m)=>d==="month"?m===0||(m+1)%10===0&&m<_.buckets.length-2?u.label:"":u.label;return o.jsxs("section",{id:"v-rpt",hidden:!0,className:"rpt",children:[o.jsxs("p",{className:"rpt-tip",role:"note",children:[o.jsx("b",{"aria-hidden":"true",children:"👆"})," Ketuk baris mana pun untuk melihat detailnya. Ketuk lagi untuk menutup."]}),o.jsx("div",{className:"chips rpt-per",role:"group","aria-label":"Periode laporan",children:dp.map(u=>o.jsx("button",{className:"chip"+(d===u.id?" on":""),"aria-pressed":d===u.id,onClick:()=>_s(u.id),children:u.name},u.id))}),o.jsxs("div",{className:"rpt-nav",children:[o.jsx("button",{className:"btn sm","aria-label":"Sebelumnya",onClick:()=>{j($-1),V(10)},children:"‹"}),o.jsxs("div",{className:"rpt-wk","aria-live":"polite",children:[o.jsx("b",{children:_.label}),o.jsx("small",{children:fe})]}),o.jsx("button",{className:"btn sm","aria-label":"Berikutnya",disabled:Y,onClick:()=>{j(Math.min(0,$+1)),V(10)},children:"›"})]}),!Y&&o.jsxs("button",{className:"chip rpt-now",onClick:()=>{j(0),V(10)},children:["Kembali ke ",Ln," ini"]}),o.jsxs("div",{className:"rpt-flt",children:[o.jsxs("label",{children:["Area",o.jsxs("select",{value:w,onChange:u=>{C(u.target.value),V(10)},children:[o.jsx("option",{value:"",children:"Semua area"}),l.areas().map(u=>o.jsx("option",{value:u,children:u},u))]})]}),o.jsxs("label",{children:["Petugas",o.jsxs("select",{value:b,onChange:u=>{x(u.target.value),V(10)},children:[o.jsx("option",{value:"",children:"Semua petugas"}),fn.map(u=>o.jsx("option",{value:u,children:u},u))]})]})]}),w&&o.jsx("p",{className:"rpt-fn",children:"Filter area berlaku untuk Per Bin dan Aging. DC, Muat, dan Clearing tidak dibagi per area."}),o.jsxs("div",{className:"card rpt-sum",role:"group","aria-label":"Ringkasan aktivitas",children:[o.jsxs("div",{className:"rpt-hd","aria-hidden":"true",children:[o.jsx("span",{children:"Aktivitas"}),o.jsx("span",{children:o.jsx("span",{className:"rpt-days"+(_.buckets.length>7?" dense":""),style:{gridTemplateColumns:"repeat("+_.buckets.length+",1fr)"},"aria-hidden":"true",children:_.buckets.map((u,m)=>o.jsx("i",{className:u.isToday?"now":"",children:Ms(u,m)},u.key))})}),o.jsx("span",{children:"vs lalu"})]}),Gn.map(u=>{const m=u.name?{name:u.name}:et.find(_n=>_n.id===u.id),en=_.delta[u.id],P=U===u.id,Vn=P?Wt(u.id):[];return o.jsxs("div",{className:"rpt-grp"+(P?" open":""),children:[o.jsxs("div",{className:"rpt-row",role:"button",style:{"--mc":ii[u.id]},tabIndex:0,"aria-expanded":P,"aria-controls":P?"rptd-"+u.id:void 0,onClick:()=>va(u.id),onKeyDown:_n=>{(_n.key==="Enter"||_n.key===" ")&&(_n.preventDefault(),va(u.id))},children:[o.jsxs("div",{className:"rpt-nm",children:[o.jsx("b",{children:m.name}),o.jsx("small",{children:u.sub})]}),o.jsxs("div",{className:"rpt-mid",children:[o.jsx("span",{className:"rpt-big",children:u.main}),o.jsx(wp,{vals:u.perB||I[u.id].perB,bk:_.buckets,color:ii[u.id]})]}),o.jsxs("div",{className:"rpt-rt",children:[o.jsx("span",{className:"rpt-dl "+(u.inv?"inv ":"")+(en>0?"up":en<0?"dn":""),"aria-label":en>0?"naik "+en:en<0?"turun "+-en:"sama",children:en>0?"▲"+O(en):en<0?"▼"+O(-en):"＝"}),o.jsx("span",{className:"rpt-tag t-"+u.tn,children:u.tag})]})]}),P&&o.jsxs("div",{className:"rpt-dtl",id:"rptd-"+u.id,style:{"--mc":ii[u.id]},children:[Vn.length?Vn.slice(0,G).map((_n,ge)=>Te(_n,ge,"s")):o.jsx("p",{className:"hint",children:"Belum ada catatan pada periode ini."}),Vn.length>G&&o.jsxs("button",{className:"btn sm",onClick:()=>tn(G+20),children:["Tampilkan lebih (",Vn.length-G," lagi)"]})]})]},u.id)}),o.jsxs("p",{className:"rpt-foot",children:["Ketuk baris untuk melihat rincian. ",d==="week"?"Batang = Sen–Min":d==="month"?"Batang = tiap tanggal":"Batang = Jan–Des",", garis = ",d==="year"?"bulan":"hari"," ini. “vs lalu” dibanding ",_.prevLabel,Y?" pada titik waktu yang sama":"",". Label: hijau ≥95%, kuning ≥85%, merah di bawahnya."]})]}),o.jsx("h2",{className:"rpt-h",children:"Perlu perhatian"}),o.jsx("div",{className:"card rpt-fl",children:_.flags.length?_.flags.map((u,m)=>o.jsxs("div",{className:"rpt-f f-"+u.lvl,children:[o.jsx("i",{"aria-hidden":"true",children:u.lvl==="r"?"!":u.lvl==="a"?"•":"i"}),o.jsx("span",{children:u.t})]},m)):o.jsxs("div",{className:"rpt-f f-g",children:[o.jsx("i",{"aria-hidden":"true",children:"✓"}),o.jsx("span",{children:"Tidak ada yang perlu ditindaklanjuti."})]})}),o.jsx("h2",{className:"rpt-h",children:"Rincian per modul"}),o.jsx("div",{className:"rpt-dt",children:tt.map(([u,m,en])=>{const P=hn===u,Vn=P?li(u,$n):[];return o.jsxs("div",{className:"card rpt-dc"+(P?" open":""),style:{"--mc":ii[u]},children:[o.jsxs("div",{className:"rpt-dh",onClick:()=>st(u),children:[o.jsx("b",{role:"button",tabIndex:0,"aria-expanded":P&&!$n,"aria-controls":P?"rptr-"+u:void 0,onKeyDown:it(()=>st(u)),children:en||et.find(_n=>_n.id===u).name}),o.jsx("div",{className:"rpt-kl",role:"group","aria-label":"Rincian "+(en||et.find(_n=>_n.id===u).name),children:m.map(([_n])=>{const ge=m.find(([zt])=>zt===_n)[1],ci=ka(u,_n)!==void 0,ba=P&&$n===_n;return ci?o.jsxs("button",{type:"button",className:"rpt-kr click"+(ba?" on":""),"aria-pressed":ba,"aria-controls":P?"rptr-"+u:void 0,onClick:zt=>{zt.stopPropagation(),Mt(u,_n)},children:[o.jsx("span",{className:"rpt-k",children:_n}),o.jsx("span",{className:"rpt-v",children:ge})]},_n):o.jsxs("div",{className:"rpt-kr",children:[o.jsx("span",{className:"rpt-k",children:_n}),o.jsx("span",{className:"rpt-v",children:ge})]},_n)})})]}),P&&o.jsxs("div",{className:"rpt-dtl",id:"rptr-"+u,children:[Vn.length?Vn.slice(0,nn).map((_n,ge)=>Te(_n,ge,"r")):o.jsx("p",{className:"hint",children:"Belum ada catatan pada periode ini."}),Vn.length>nn&&o.jsxs("button",{className:"btn sm",onClick:()=>bn(nn+20),children:["Tampilkan lebih (",Vn.length-nn," lagi)"]})]})]},u)})}),o.jsxs("h2",{className:"rpt-h",children:["Per Bin: stok & kesesuaian rak ",o.jsxs("small",{children:[O(I.bin.n)," diperiksa · qty ",pe(I.bin.accQty)," · item ",pe(I.bin.accItem)]})]}),o.jsxs("div",{className:"card rpt-ar",children:[o.jsxs("div",{className:"rpt-art rpt-arh",children:[o.jsx("span",{children:"Area"}),o.jsx("span",{children:"Periksa"}),o.jsx("span",{children:"Selisih qty"}),o.jsx("span",{children:"Item beda"}),o.jsx("span",{children:"Qty OK"})]}),_.areas.length?_.areas.map(u=>{const m=dn===u.area,en=m?_.bins.filter(P=>P.area===u.area).map(P=>On("bin",P)):[];return o.jsxs("div",{className:"rpt-ag"+(m?" open":""),children:[o.jsxs("div",{className:"rpt-art click",role:"button",tabIndex:0,"aria-expanded":m,onClick:()=>vn(m?"":u.area),onKeyDown:it(()=>vn(m?"":u.area)),children:[o.jsx("b",{children:u.area}),o.jsxs("span",{children:[O(u.n),o.jsxs("small",{children:[" / ",O(u.total)]})]}),o.jsx("span",{className:u.qtyBad?"bad":"",children:O(u.qtyBad||0)}),o.jsx("span",{className:u.itemBad?"bad":"",children:O(u.itemBad||0)}),o.jsx("span",{className:"rpt-tag t-"+qt(u.n?(u.n-(u.qtyBad||0))/u.n:null),children:u.n?pe((u.n-(u.qtyBad||0))/u.n):"–"})]}),m&&o.jsxs("div",{className:"rpt-dtl",children:[en.length?en.slice(0,30).map((P,Vn)=>Te(P,Vn,"a")):o.jsx("p",{className:"hint",children:"Belum ada bin diperiksa di area ini."}),en.length>30&&o.jsxs("p",{className:"hint",children:["Menampilkan 30 dari ",en.length,". Gunakan filter Area di atas untuk daftar lengkap."]})]})]},u.area)}):o.jsx("p",{className:"hint",children:"Tidak ada data area."})]}),_.topBad.length>0&&o.jsxs(o.Fragment,{children:[o.jsx("h2",{className:"rpt-h",children:"Selisih terbesar"}),o.jsx("div",{className:"card rpt-tb",children:_.topBad.map((u,m)=>{const en=On("bin",u);return Te({...en,b:nt(u.diff),c:u.diff>0?"pos":"neg"},m,"t")})})]}),_.agingBad.length>0&&o.jsxs(o.Fragment,{children:[o.jsxs("h2",{className:"rpt-h",children:["Rak Aging selisih ",o.jsxs("small",{children:[_.mods.aging.bad," rak"]})]}),o.jsx("div",{className:"card rpt-tb",children:_.agingBad.map((u,m)=>Te(On("aging",u),m,"g"))})]}),o.jsx("h2",{className:"rpt-h",children:"Daftar bin diperiksa"}),o.jsx("div",{className:"chips rpt-bf",role:"group","aria-label":"Filter daftar bin",children:[["bad","Selisih qty"],["item","Item beda"],["ok","Sesuai"],["all","Semua"]].map(([u,m])=>o.jsxs("button",{className:"chip"+(A===u?" on":""),"aria-pressed":A===u,onClick:()=>{rn(u),V(10)},children:[m," ",o.jsx("b",{children:qe[u]})]},u))}),o.jsxs("div",{className:"card rpt-tb",children:[an.length?an.slice(0,J).map((u,m)=>{const en=On("bin",u);return Te({...en,b:en.b+(M(u).itemOk?"":" · Item beda")},m,"l")}):o.jsx("p",{className:"hint",children:"Tidak ada bin pada filter ini."}),an.length>J&&o.jsxs("button",{className:"btn",onClick:()=>V(J+20),children:["Tampilkan lebih (",an.length-J," lagi)"]})]}),o.jsxs("h2",{className:"rpt-h",children:["Aktivitas per petugas ",o.jsxs("small",{children:[O(_.total)," aktivitas",_.prevTotal?" (sebelumnya "+O(_.prevTotal)+")":""]})]}),o.jsx("div",{className:"card rpt-pp",children:_.people.length?_.people.slice(0,10).map(u=>{const m=gn===u.name,en=m?oi(u.name):[];return o.jsxs("div",{className:"rpt-pg"+(m?" open":""),children:[o.jsxs("div",{className:"rpt-p click",role:"button",tabIndex:0,"aria-expanded":m,onClick:()=>wn(m?"":u.name),onKeyDown:it(()=>wn(m?"":u.name)),children:[o.jsxs("div",{className:"rpt-pt",children:[o.jsx("b",{children:u.name}),o.jsx("span",{children:u.total})]}),o.jsx("div",{className:"rpt-pb","aria-hidden":"true",style:{width:Math.max(6,u.total/Cn*100)+"%"},children:et.map(P=>u[P.id]?o.jsx("i",{style:{flex:u[P.id],background:ii[P.id]}},P.id):null)}),o.jsx("small",{children:et.filter(P=>u[P.id]).map(P=>P.name+" "+u[P.id]).join(" · ")})]}),m&&o.jsxs("div",{className:"rpt-dtl",children:[en.length?en.slice(0,30).map((P,Vn)=>Te(P,Vn,"p")):o.jsx("p",{className:"hint",children:"Tidak ada catatan."}),en.length>30&&o.jsxs("p",{className:"hint",children:["Menampilkan 30 dari ",en.length,"."]})]})]},u.name)}):o.jsx("p",{className:"hint",children:"Belum ada aktivitas pada periode ini."})}),o.jsxs("div",{className:"rpt-act",children:[o.jsx("button",{className:"btn pri",onClick:ui,children:"Salin ringkasan WhatsApp"}),o.jsx("button",{className:"btn",onClick:di,children:"Unduh CSV (Excel)"}),o.jsx("button",{className:"btn",onClick:()=>window.print(),children:"Cetak / PDF"})]}),o.jsxs("p",{className:"hint rpt-note",children:["Dihitung dari catatan di perangkat ini (tersinkron bila sinkron aktif). Bin/rak yang diperiksa ulang dihitung pada waktu pemeriksaan terakhir.",_.coverage.muatCut&&" Riwayat Muat tersedia sejak "+_.coverage.muatSince+".",_.coverage.clrCut&&" Riwayat Clearing tersedia sejak "+_.coverage.clrSince+"."," ","Riwayat Muat dan Clearing hanya menyimpan 60 hari terakhir, jadi laporan tahunan untuk dua modul itu terbatas pada rentang tersebut."]}),q&&o.jsx("div",{className:"rpt-ov",onClick:()=>sn(null),onKeyDown:u=>{u.key==="Escape"&&sn(null)},children:o.jsxs("div",{className:"rpt-md card",role:"dialog","aria-modal":"true","aria-label":"Detail "+q.k,onClick:u=>u.stopPropagation(),children:[o.jsxs("div",{className:"rpt-bt",children:[o.jsxs("b",{children:[q.m?q.m+" · ":"",q.k]}),o.jsx("span",{className:"rpt-df "+q.c,children:q.b})]}),q.t&&o.jsx("p",{className:"rpt-sm "+q.c,children:q.t}),o.jsx("dl",{children:(q.d||[]).map(([u,m])=>o.jsxs("div",{children:[o.jsx("dt",{children:u}),o.jsx("dd",{children:m})]},u))}),o.jsx("button",{className:"btn pri",autoFocus:!0,onClick:()=>sn(null),children:"Tutup"})]})})]})}const $p=`/* Tidak ada data contoh: aplikasi mulai kosong, data WMS diimpor dari menu Data WMS atau disinkronkan dari server. */
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
        ["so", "dc", "check", "task", "dist", "kes", "adj", "clr", "muat", "usr", "kpi", "tg", "mon", "data", "agi", "rpt"].forEach((k) => ($("v-" + k).hidden = k !== v));
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
          dist: "Distribusi Tugas",
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
            dist: "Buat dan bagikan tugas ke petugas",
          }[v];
        if (v === "check") renderCheck();
        if (v === "kes") renderKes();
        if (v === "adj") renderAdj();
        if (v === "clr") { renderClr(); if (clr.url && (!clrCnt || Date.now() - clrCnt.at > 120000)) clrFetch(false); clrEnter(); }
        else clrLeave();
        if (v === "usr") { renderUsr(); cfgUi(); }
        if (v === "task" || v === "dist") renderTask();
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

`,Lp=`/* Cek Kesesuaian
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
`,Np=`/* Laporan Muat
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
      const K_SES = "warehouse_so_session_v2", K_LU = "warehouse_so_lastuser_v1", SES_TTL = 12 * 3600 * 1000;
      /* sesi login: tetap ada setelah reload/tutup tab (12 jam, diperpanjang saat dipakai); tidak ikut sinkron/cadangan */
      function meLoad() {
        try { const r = JSON.parse(localStorage.getItem(K_SES) || "null"); if (r && r.id && r.exp > Date.now()) return r.id; } catch (e) {}
        try { return sessionStorage.getItem(K_ME) || ""; } catch (e) {}
        return "";
      }
      function meSave(id) {
        try { localStorage.setItem(K_SES, JSON.stringify({ id, exp: Date.now() + SES_TTL })); } catch (e) {}
        try { sessionStorage.setItem(K_ME, id); localStorage.setItem(K_LU, id); } catch (e) {}
      }
      function meClear() {
        try { localStorage.removeItem(K_SES); } catch (e) {}
        try { sessionStorage.removeItem(K_ME); } catch (e) {}
      }
      let meId = meLoad(), lgSig = "";
      /* ---- v13: hak akses menu per user ---- */
      const MENU_DEF = { so: "Periksa Bin", dc: "DC Harian", task: "Task", dist: "Distribusi Tugas", check: "Review Supervisor", kes: "Cek Kesesuaian", adj: "File Adjust", clr: "Clearing", mon: "Beranda", muat: "Laporan Muat", kpi: "KPI Area", agi: "Aging Stock", rpt: "Laporan", tg: "Telegram", data: "Data WMS" };
      const ALL_VIEWS = [...Object.keys(MENU_DEF), "usr"];
      /* Peran: admin (semua menu), spv (review + laporan semua area), petugas dan penerimaan (menu standar, hanya area yang diberikan).
         staff = true berarti terikat area: muncul di daftar petugas, dapat tugas, dan hanya melihat area miliknya. */
      const ROLES = {
        admin: { label: "Admin", staff: false, menus: null },
        spv: { label: "SPV", staff: false, menus: ["so", "dc", "dist", "check", "kes", "adj", "clr", "mon", "muat", "kpi", "agi", "rpt"] },
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
      const NAV_ORDER = ["mon", "so", "dc", "check", "task", "dist", "kes", "adj", "clr", "muat", "kpi", "agi", "rpt", "usr", "tg", "data"];
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
      const allowedView0 = (v) => !authOn() || isAdmin() || (!!meUser() && menusOf(meUser()).includes(v));
      /* menu tidak dicampur: Task = kerja petugas, Distribusi = admin/SPV (buat, bagi, pantau) */
      const allowedView = (v) => (v === "task" ? !!curUser() : v === "dist" ? !curUser() : true) && allowedView0(v);
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
        const curV = ["so", "dc", "check", "task", "dist", "kes", "adj", "clr", "muat", "usr", "kpi", "agi", "rpt", "tg", "mon", "data"].find((k) => $("v-" + k) && !$("v-" + k).hidden);
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
        const wasShown = !$("login").hidden;
        $("login").hidden = !need;
        document.body.style.overflow = need ? "hidden" : $("lgSetup").hidden ? "" : "hidden";
        if (!need) { setupUi(false); return; }
        const act = users.filter((u) => u.active !== false).sort((a, b) => a.name.localeCompare(b.name, "id"));
        const sig = act.map((u) => u.id + ":" + u.name + ":" + roleOf(u)).join("|");
        if (wasShown && sig === lgSig) return; // sinkron latar belakang: pilihan nama & password yang sedang diketik dibiarkan
        const keep = $("lgUser").value;
                $("lgUser").innerHTML = act.map((u) => \`<option value="\${esc(u.id)}">\${esc(u.name)}\${u.name.trim().toLowerCase() === ROLES[roleOf(u)].label.toLowerCase() ? "" : " (" + ROLES[roleOf(u)].label + ")"}</option>\`).join("");
        lgSig = sig;
        let last = ""; try { last = localStorage.getItem(K_LU) || ""; } catch (e) {}
        const want = [keep, last].find((id) => id && act.some((u) => u.id === id));
        if (want) $("lgUser").value = want;
        if (wasShown && want === keep) return;
        lgSel();
        setTimeout(() => { try { $("lgPin").focus(); } catch (e) {} }, 60);
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
        if ($("lgOk").disabled) return;
        $("lgOk").disabled = true; $("lgOk").textContent = "Memeriksa...";
        let okPin = false;
        try { okPin = await pinCheck(pw, u.pin); } finally { $("lgOk").disabled = false; $("lgOk").textContent = "Masuk"; }
        if (!okPin) {
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
        meSave(meId);
        applySession();
        applyRole();
        loginUi();
        initAll();
        go(curUser() ? "task" : "so");
        toast("Masuk sebagai " + u.name);
      }
      function logout() {
        meId = "";
        meClear();
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
      // realtime antar tab: masuk/keluar di satu tab langsung diikuti tab lain
      window.addEventListener("storage", (e) => {
        if (e.key !== K_SES) return;
        const id = meLoad();
        if (id === meId) return;
        meId = id; applySession(); applyRole(); loginUi();
        if (id) { initAll(); go(curUser() ? "task" : "so"); }
      });
      document.addEventListener("visibilitychange", () => { if (!document.hidden && meId && authOn() && meUser()) meSave(meId); });
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
        meSave(meId);
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
        meClear();
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
          return \`<div class="acard"><div class="r"><b class="big">Area \${esc(a)}</b><span class="pill \${c ? "green" : full ? "amber" : ""}">\${c ? "Ditutup" : mand ? "Belum ada data" : full ? "Siap ditutup" : "Berjalan"}</span></div>\${mand ? '<div class="m">Belum ada bin di data WMS. Impor Informasi Rak WMS di menu Data WMS.</div>' : \`<div class="pbar" role="progressbar" aria-label="Progres area \${esc(a)}" aria-valuenow="\${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:\${pct}%"></i></div><div class="m">\${s.done} dari \${s.total} bin diperiksa · \${pct}%</div>\`}<div class="m">Petugas: \${ow.length ? esc(ow.join(", ")) : "belum ada"}</div>\${c ? \`<div class="m">Ditutup oleh \${esc(closed[a].by)}</div>\${isSup() ? \`<button class="btn sec sm" data-reopen="\${esc(a)}">Buka kembali</button>\` : ""}\` : full && isSup() ? \`<button class="btn pri sm" data-close="\${esc(a)}">Tutup area \${esc(a)}</button>\` : ""}</div>\`;
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
          meSave(meId);
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
`,Op=`/* Menu samping bertingkat: judul grup bisa dibuka/ditutup, submenu rapi (satu grup terbuka sekaligus) */
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
`,Kp=`/* Clearing (Voucher vs counting)
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
        el.innerHTML = \`<details class="clr-diag"><summary>Diagnosa pencocokan · aturan \${CLR_MATCH_V} · \${fmt(bel.length)} belum cocok</summary><p class="fine">\${esc(head)}.</p><p class="fine">Nama counting pertama: \${first.map(esc).join(" · ") || "-"}<br>Nama counting terakhir: \${last.map(esc).join(" · ") || "-"}</p>\` +
          items.map((i) => \`<div class="fine"><b>\${esc(i.x.v)}</b> (kunci \${esc(i.k)}) \${i.why}\${i.h.length ? ": " + i.h.map(row).join(" · ") : ""}</div>\`).join("") +
          (bel.length > 10 ? \`<p class="fine">… dan \${fmt(bel.length - 10)} lainnya.</p>\` : "") +
          \`<button class="btn sec" id="clrDiagCopy" type="button">Salin diagnosa</button></details>\`;
        $("clrDiagCopy").onclick = () => (navigator.clipboard ? navigator.clipboard.writeText(txt).then(() => toast("Diagnosa tersalin. Tempel ke chat."), () => toast("Gagal menyalin diagnosa")) : toast("Browser tidak mengizinkan salin"));
      }
      let clrAutoF = false;
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
        { // panel sumber data: ringkas & terlipat bila laporan + counting sudah termuat
          const d = $("clrSrc"), ready = !!(clrRep && clrCnt);
          $("clrSrcSum").innerHTML = ready ? \`<span class="cs-t"><b>Sumber data</b><em>\${fmt(clrRep.rows.length)} voucher · \${fmt(clrCnt.rows.length)} baris counting</em></span>\` : clrRep ? '<span class="cs-t"><b>Langkah 2</b><em>Muat hasil counting</em></span>' : '<span class="cs-t"><b>Mulai di sini</b><em>Muat laporan voucher, lalu counting</em></span>';
          const st = ready ? "1" : "0";
          if (d.dataset.st !== st) { d.dataset.st = st; d.open = !ready; }
        }
        if (typeof monClrRender === "function") monClrRender();
        $("clrLoad").disabled = clrBusy;
        $("clrRefresh").disabled = clrBusy;
        $("clrRefresh").textContent = clrBusy ? "Memuat…" : "↻ Refresh";
        $("clrLoad").textContent = clrBusy ? "Memuat…" : "Muat counting dari spreadsheet";
        const all = clrBuild(), n = (s) => all.filter((x) => x.st === s).length;
        const nTot = all.length, nOk = n("ok"), nBad = n("qty") + n("dup"), nBel = n("belum") + n("nq");
        clrDiag(all);
        { // pertama kali data termuat: langsung tampilkan yang perlu dicek (bila ada); pilihan manual setelahnya tidak ditimpa
          if (!all.length) clrAutoF = false;
          else if (!clrAutoF) { clrAutoF = true; if (all.some((x) => x.st !== "ok" && !clrIsDone(x))) clrF = "bad"; }
        }
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
          return \`<div class="card vc s-\${x.st}"><div class="r"><b class="id">\${esc(x.v)}</b><span class="pill \${cl}">\${lb}</span>\${clrIsDone(x) ? ' <span class="pill green">Selesai</span>' : ""}</div>\${x.n ? \`<div class="nm">\${esc(x.n)}\${x.r ? ", rak " + esc(x.r) : ""}</div>\` : ""}<div class="vq"><div class="vq-n"><span>WMS <b>\${x.qR == null ? "-" : fmt(x.qR)}</b></span><i aria-hidden="true">→</i><span>Hitung <b>\${x.qC == null ? "-" : fmt(x.qC)}</b>\${x.ik ? \` <small>(\${fmt(x.ik)}×\${CLR_IKAT})</small>\` : ""}</span></div><div class="vq-d \${x.st === "ok" ? "ok" : x.diff ? "neg" : "wip"}">\${x.st === "ok" ? "✓ Cocok" : d ? "Selisih " + d : "Belum"}</div></div><div class="vm">\${[esc(x.shift || ""), x.tm ? esc((String(x.tm).match(/\\d{1,2}:\\d{2}/) || [""])[0]) : "", x.lori ? "Lori " + esc(x.lori) : ""].filter(Boolean).join(" · ") || "&nbsp;"}</div>\${x.st !== "ok" && x.ik ? \`<div class="m">Counting \${fmt(x.ik)} ikat × \${CLR_IKAT} = \${fmt(x.qC)}.</div>\` : ""}\${x.cv ? \`<div class="m">Dicocokkan lewat awalan angka dengan nama foto \${esc(x.cv)}.</div>\` : ""}\${x.st !== "ok" && x.rc > 1 ? \`<div class="m">\${x.rc} foto counting untuk voucher ini, dipakai yang terbaru.</div>\` : ""}\${clrAct(x)}</div>\`;
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
        clrF = "all"; clrAutoF = false; clrShF = "all"; $("clrQ").value = ""; clrErr = "";
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

`,Up=`/* Cadangan & peringatan penyimpanan
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
      // data sudah/akan otomatis masuk ke server (Google Sheets tersambung, sinkron otomatis, tanpa galat): peringatan cadangan tidak perlu
      function bkOnServer() {
        try { return !!(syReady() && SY.auto && !syErr && (bk.sy || SY.lastAt)); } catch (_) { return false; }
      }
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
        else if (bk.n >= 20 && bk.n >= gdSnooze && !bkOnServer())
          h.push(\`<div class="gd info"><b>\${bk.n} perubahan belum dicadangkan</b>\${bk.at ? "Cadangan terakhir: " + dtF(bk.at) + "." : bk.sy ? "Tersinkron ke server: " + dtF(bk.sy) + "." : "Belum pernah dicadangkan."} Cadangan melindungi data jika browser dibersihkan atau HP bermasalah.<div class="ga">\${bkBtn.replace("Unduh cadangan sekarang", "Cadangkan")}<button class="s" data-g="later">Nanti</button></div></div>\`);
        if (isDemoData())
          h.push(\`<div class="gd warn"><b>Ini DATA CONTOH, bukan data gudang Anda</b>Hasil periksa, rekap, dan pesan Telegram dari data ini tidak berlaku. Impor data WMS asli dulu.<div class="ga"><button class="p" data-g="imp">Impor data WMS</button></div></div>\`);
        if (corrupt.length)
          h.push(\`<div class="gd warn"><b>Sebagian data tersimpan tidak terbaca</b>Dilewati: \${corrupt.map(esc).join(", ")}. Salinan mentahnya disimpan di perangkat dengan akhiran __rusak.</div>\`);
        $("guard").innerHTML = h.join("");
        // panel di menu Data WMS
        $("bkInfo").textContent = (bk.at ? "Cadangan terakhir: " + dtF(bk.at) + "." : bk.sy ? "Data tersinkron ke server: " + dtF(bk.sy) + "." : "Belum pernah dicadangkan.") + (bk.n ? \` \${bk.n} perubahan sejak itu.\` : "");
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

`,Hp=`/* Telegram
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
`,Wp='/* Dashboard Delivery layar 4K / TV: desain "Dashboard Supply Chain Management" satu layar 16:9.\n   Angka dibaca dari sel spreadsheet yang sama dengan kartu Beranda (dlvC / dlvV di 93-dash-delivery.js).\n   Panggung 2400x1350 diskalakan ke layar (transform), jadi tampilan identik di TV 4K, Full HD, atau jendela kecil. */\n      const TV_W = 2400, TV_H = 1350;\n      // desain 4K dipakai: mode Layar TV di layar >= 1000px, atau otomatis di layar sangat lebar (>= 2400px)\n      const dlvTvUse = () => (document.body.classList.contains("tv") ? innerWidth >= 1000 : innerWidth >= TV_W);\n      function dlvTvHtml() {\n        const V = dlvV, D = (x) => x || "–", e = esc;\n        const tot = dlvN("B28"), kel = dlvN("N43"), prs = dlvN("J43"), msk = dlvN("F43");\n        const num = (n) => (n == null ? "–" : String(n));\n        const fp = (n) => n.toFixed(1).replace(".", ",") + "%";\n        const tgl = dlvC("AJ2") || new Date().toLocaleDateString("id-ID"), ttl = dlvC("F2");\n        const title = ttl && !/^dashboard\\s+delivery$/i.test(ttl) ? ttl : "Dashboard Supply Chain Management LA 2026";\n        const mon = dlvMonth();\n        const age = (Date.now() - dlvCache.at) / 60000, stale = dlv.auto && age > dlv.auto * 2 + 1;\n        const sync = (stale ? "Data lama" : "Tersinkron") + " · " + new Date(dlvCache.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });\n        // tonase hari ini\n        const gapN = dlvNum(dlvC("AA14")), gapPct = dlvPctStr(dlvC("AD14"));\n        const gapTxt = dlvC("AA14") ? (gapN != null && gapN < 0 ? "▼ " : gapN > 0 ? "▲ " : "") + dlvC("AA14") : "";\n        const lt14 = dlvRng("J", 13, 16);\n        const kpi = (cls, ico, lb, val, sub, subCls) => `<div class="tv-card tv-kpi ${cls}">${ico ? `<div class="tv-kicon">${ico}</div>` : ""}<div class="tv-kpi-content"><div class="tv-klabel">${e(lb)}</div><div class="tv-kvalue">${e(val)}</div>${sub ? `<div class="tv-ksub ${subCls || ""}">${e(sub)}</div>` : ""}</div></div>`;\n        const kpis =\n          kpi("tv-primary", "🚚", "Total Finish Delivery", V("J10"), "◷  " + tgl) +\n          kpi("", "🏁", "Finish Loading", V("B13"), dlvC("F8") ? "Update " + dlvC("F8") : "") +\n          kpi("", "🚛", "Selesai SJ Dalam Kota", V("E20"), lt14 ? "Mobil masuk > 14:00 : " + lt14 : "") +\n          kpi("", "", "♧ Plan Delivery", V("S12"), "Plan tonase") +\n          kpi("", "", "♧ Act Delivery", V("W12"), gapTxt, gapPct != null && gapPct < 95 ? "tv-amber" : "tv-green") +\n          kpi("tv-success", "🎯", "Gap", V("AD14"), "");\n        // progress delivery\n        const jenis = [["F28", "J28"], ["F30", "J30"], ["F32", "J32"], ["F34", "J34"]].filter(([n]) => dlvC(n))\n          .map(([n, j]) => { const c = dlvN(j); return `<div class="tv-tr"><div class="tv-td tv-l">${e(dlvC(n))}</div><div class="tv-td">${e(V(j))}</div><div class="tv-td">${c != null && tot ? fp((c / tot) * 100) : "–"}</div></div>`; }).join("");\n        const pKel = dlvRng(["P", "Q"], 57, 58) || dlvC("P34"), pKelN = Math.max(0, Math.min(100, dlvPctStr(pKel) || 0));\n        const donutP = tot ? Math.round(((kel || 0) / tot) * 100) : 0;\n        // belum / tidak masuk\n        const gagal = [];\n        for (let r = 35; r <= 47; r += 2) { const n = dlvFirst(r, "AA", "AD"); if (n) gagal.push(n); }\n        const belum = dlvC("S33");\n        const jb = [["BOX", "S39"], ["FUSO", "V39"], ["CONTAINER", "S46"], ["TRONTON", "V46"]].filter(([, c]) => dlvC(c)).map(([l, c]) => l + " " + dlvC(c)).join(" · ");\n        // bulan berjalan\n        const pTon = (() => { const a = dlvNum(dlvC("AL19")), q = dlvNum(dlvC("AL17")); return a != null && q ? fp((a / q) * 100) : "–"; })();\n        const m3 = (a, b, c) => `<div class="tv-metric-grid">${[a, b, c].map(([l, v, g]) => `<div class="tv-metric"><span>${e(l)}</span><strong class="${g ? "tv-green" : ""}">${e(v)}</strong></div>`).join("")}</div>`;\n        const th = (l) => `<div class="tv-th">${e(l)}</div>`, td = (v, g) => `<div class="tv-td ${g ? "tv-green" : ""}">${e(v)}</div>`;\n        const rank = [["Mobil Terbanyak", "AL41", "AO41"], ["Tonase Terbesar", "AL43", "AO43"], ["Loading Terlama", "AL45", "AO45"], ["Delivery Terlama", "AL47", "AO47"]]\n          .map(([l, v, d]) => `<div class="tv-rank-row"><span>${l}</span><b>${e(V(v))}</b><span>${e(D(dlvC(d)))}</span></div>`).join("");\n        const jam = [["M26", "P26"], ["M28", "P28"], ["M30", "P30"], ["M32", "P32"]].filter(([h]) => dlvC(h))\n          .map(([h, p]) => `<span>${e(dlvC(h))} → <b>${e(V(p))}</b></span>`).join("");\n        const ab = [dlvNum(dlvC("AL33")), dlvNum(dlvC("AL35")), dlvNum(dlvC("AL37"))];\n        const abTot = ab.some((x) => x != null) ? ab.reduce((s, x) => s + (x || 0), 0) : null;\n        const row = (l, v, g) => `<div class="tv-summary-row"><span>${e(l)}</span><b class="${g ? "tv-green" : ""}">${e(v)}</b></div>`;\n        return `<div class="tv-wrap tv-root"><div class="tv-stage">\n<div class="tv-header"><div class="tv-brand">RUCIKA<small>Sambungan Berkualitas</small></div>\n<div class="tv-heading"><div class="tv-h1">${e(title)}</div><div class="tv-sub">Plan • Deliver • Perform</div></div>\n<div class="tv-right-head"><div class="tv-date">▦ &nbsp;${e(tgl)}<small class="tv-sync ${stale ? "tv-old" : ""}">${e(sync)}</small></div><div class="tv-logo-mark"><b>★ R</b>Rucika<br><small>Inspiring Innovation</small></div></div></div>\n<div class="tv-kpis">${kpis}</div>\n<div class="tv-main">\n<div class="tv-stack">\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">▥</span>Progress Delivery</div><div class="tv-panel-body">\n  <div class="tv-progress-layout"><div class="tv-donut" style="--p:${donutP}"><div><strong>${num(tot)}</strong><span>Total Mobil</span></div></div>\n  <div class="tv-dt tv-c3"><div class="tv-tr">${th("Jenis Mobil")}${th("Jumlah")}${th("%")}</div>${jenis || `<div class="tv-tr"><div class="tv-td tv-l">–</div><div class="tv-td">–</div><div class="tv-td">–</div></div>`}</div></div>\n  <div class="tv-bar-wrap"><div class="tv-bar-head"><span>Progress Delivery</span><b>${e(D(pKel))}</b></div><div class="tv-bar"><span style="width:${pKelN}%"></span></div></div></div></div>\n <div class="tv-card tv-warn"><div class="tv-panel-title"><span class="tv-ico">⚠</span>Belum / Tidak Masuk</div><div class="tv-panel-body tv-alert-grid"><div class="tv-alert-count"><strong>${e(D(belum))}</strong><span>Mobil</span></div>\n  <div class="tv-alert-list">${gagal.length ? "📍 Lokasi Agen Gagal Masuk<br><b>" + gagal.map(e).join(", ") + "</b>" : "Tidak ada agen gagal masuk"}${jb ? "<br>Jenis: " + e(jb) : ""}</div></div></div>\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🚚</span>Mobil Masuk - Proses - Keluar</div><div class="tv-panel-body tv-flow">\n  <div class="tv-flow-item"><div class="tv-ico">🚛</div><b>Mobil Masuk</b><strong>${num(msk)}</strong></div><div class="tv-arrow">➜</div>\n  <div class="tv-flow-item"><div class="tv-ico">⚙️</div><b>Mobil Proses</b><strong>${num(prs)}</strong></div><div class="tv-arrow">➜</div>\n  <div class="tv-flow-item"><div class="tv-ico">🟢</div><b>Mobil Keluar</b><strong>${num(kel)}</strong></div>${jam ? `<div class="tv-hours"><small>Jam keluar mobil</small>${jam}</div>` : ""}</div></div>\n</div>\n<div class="tv-stack">\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🚚</span>Planning vs Actual${mon ? " · " + e(mon) : ""}</div><div class="tv-panel-body">\n  ${m3(["Plan Mobil", V("AL13")], ["Act Mobil", V("AL15")], ["Realisasi", V("AR13"), 1])}\n  <div class="tv-dt tv-c3 tv-gap"><div class="tv-tr">${th("Plan Tonase")}${th("Act Tonase")}${th("Act Omzet")}</div><div class="tv-tr">${td(V("AL17"))}${td(V("AL19"))}${td(V("AR17"))}</div></div></div></div>\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">⚖</span>Tonase &amp; Selisih Hari Ini</div><div class="tv-panel-body">\n  ${m3(["Plan Omzet", V("S19")], ["Act Omzet", V("W19")], ["Selisih", V("AA14"), 1])}\n  <div class="tv-mini-stats tv-gap"><div class="tv-mini-stat"><span>Plan Non Omzet</span><b>${e(V("S25"))}</b></div><div class="tv-mini-stat"><span>Act Non Omzet</span><b>${e(V("W25"))}</b></div><div class="tv-mini-stat"><span>% Non Omzet</span><b>${e(V("AA25"))}</b></div></div></div></div>\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">📊</span>Summary Bulan ${e(mon || "Ini")}</div><div class="tv-panel-body tv-summary-list">\n  ${row("Act Tonase %", pTon)}${row("Omzet %", V("AR19"), 1)}${row("Rata Mobil / Hari", V("AL23"))}${row("Ton Plan / Hari", V("AR23"))}\n  ${row("Ton Actual / Hari", V("AR25"))}${row("Ton Omzet / Hari", V("AR27"))}${row("Finish Kota rata-rata", V("AL25"))}${row("Finish Loading rata-rata", V("AL27"))}${row("Finish Delivery rata-rata", V("AL29"))}${row("Gap Tonase", V("AD14"))}</div></div>\n</div>\n<div class="tv-stack">\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🏆</span>Rank (Dalam 1 Hari)</div><div class="tv-panel-body">${rank}</div></div>\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">🚨</span>Total Abnormal Bulan Ini</div><div class="tv-panel-body tv-mini-stats">\n  <div class="tv-mini-stat"><span>Total</span><b class="tv-big">${abTot == null ? "–" : abTot}</b></div><div class="tv-mini-stat"><span>Gagal Masuk</span><b>${e(V("AL33"))}</b></div><div class="tv-mini-stat"><span>Under Tonage</span><b>${e(V("AL35"))}</b></div><div class="tv-mini-stat"><span>Mobil &gt; 14:00</span><b>${e(V("AL37"))}</b></div></div></div>\n <div class="tv-card"><div class="tv-panel-title"><span class="tv-ico">📍</span>Destinasi Delivery</div><div class="tv-panel-body tv-destination"><div class="tv-city">${e(D(dlvC("AG53")))}</div><div class="tv-ton">Total Mobil<strong>${e(V("AL55"))}</strong>${e(V("AL57"))} Ton</div><div class="tv-city-art">🌆</div></div></div>\n</div>\n</div><div class="tv-footer"></div></div></div>`;\n      }\n      // skala panggung ke lebar (Beranda) atau seluruh layar (mode TV); hanya transform, jadi mulus\n      function dlvTvScale() {\n        const w = document.querySelector("#dlvBody .tv-wrap");\n        if (!w) return;\n        const tv = document.body.classList.contains("tv");\n        const aw = tv ? innerWidth : w.parentElement.clientWidth || innerWidth;\n        const s = Math.min(aw / TV_W, tv ? innerHeight / TV_H : Infinity);\n        w.style.setProperty("--tv-s", s.toFixed(4));\n        w.style.width = Math.floor(TV_W * s) + "px";\n        w.style.height = Math.floor(TV_H * s) + "px";\n      }\n      let dlvTvRaf = 0;\n      const dlvTvSoon = () => { cancelAnimationFrame(dlvTvRaf); dlvTvRaf = requestAnimationFrame(dlvTvScale); };\n      window.addEventListener("resize", () => { dlvTvSoon(); if (dlvCache && dlvTvUse() !== document.body.classList.contains("tvd")) dlvRender(); });\n      document.addEventListener("fullscreenchange", dlvTvSoon);\n',zp=`/* Aging Stock: state milik legacy supaya ikut sinkron Sheets + cadangan. Tampilan: src/views/AgingView.jsx, logika: src/lib/aging.js */
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
          un = me ? [] : Object.keys(tasks).filter((k) => !tkOwned(tasks[k]));
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
        if (!Object.keys(tasks).length) $("tkRes").innerHTML = '<div class="empty">Belum ada tugas. Ketuk Buat tugas otomatis di atas, atau upload file daftar bin (kolom Bin atau Rak) di sini.</div>';
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
        Object.keys(tasks).forEach((k) => {
          const t = tasks[k];
          if (!t || tkOwned(t)) return;
          const id = k.replace(/^(AG|DC)\\|/, ""), x = DATA.find((d) => (k.startsWith("DC|") ? d.item === id : d.bin === id));
          const u = x ? tkPick(x.area, rr) : "";
          if (u) {
            t.u = u;
            n++;
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
      const dgBusy = (key) => { const t = tasks[key]; if (!t) return false; if (key.startsWith("AG|")) return !tkAgDone(key.slice(3)); if (key.startsWith("DC|")) return !tkDcDone(key.slice(3)); return isTaskPend({ bin: key }); };
      let dgSkip = 0;
      function dgPlan() {
        const g = dgState(), rr = {}, out = [];
        dgSkip = 0;
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
        const fresh = out.filter((p) => !dgBusy(p.key));
        dgSkip = out.length - fresh.length;
        return fresh;
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
          ? \`<b>\${fmt(plan.length)}</b> tugas baru akan dibuat\${dgSkip ? \`, <b>\${fmt(dgSkip)}</b> yang masih berjalan dilewati\` : ""}\${no ? \`, <b>\${fmt(no)}</b> belum punya petugas (nanti dibagikan sesuai area lewat tombol Bagikan)\` : ""}.\`
          : dgSkip ? \`Semua sudah punya tugas berjalan (\${fmt(dgSkip)}). Tidak ada yang perlu ditambah.\` : "Tidak ada yang perlu ditugaskan dengan pilihan ini.";
        $("dgGo").disabled = !plan.length;
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
        const plan = dgPlan();
        if (!plan.length) return;
        const per = {};
        plan.forEach((p) => { const u = users.find((z) => z.id === p.u); const nm = u ? u.name : "(belum ada petugas)"; per[nm] = (per[nm] || 0) + 1; });
        const lbl = { bin: "tugas bin", AG: "tugas aging", DC: "tugas DC" }[$("dgKind").value];
        if (!(await ask("Buat " + plan.length + " " + lbl + "?", Object.entries(per).map(([n, c]) => n + ": " + c).join(", ") + ". Tugas yang masih berjalan tidak diubah.", "Buat tugas"))) return;
        const at = nowIso();
        plan.forEach((p) => {
          const rec = { u: p.u || "", by: curName() || "Admin", at };
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
        const host = admin ? $("dstMon") : $("tskHome");
        if ($("tskBox").parentNode !== host) host.appendChild($("tskBox"));
        $("tskAdminNote").hidden = !admin;
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
             <p class="fine">\${done} dari \${all.length} selesai\${pend.length ? " · bin " + nk("bin") + " · aging " + nk("AG") + " · DC " + nk("DC") : ""}</p></div>\`
          : admin ? '<p class="fine">Belum ada tugas. Buat dan bagikan di menu Distribusi Tugas.</p>' : "";
        const flt = { todo: pend, all, done: all.filter((x) => x.done), bin: all.filter((x) => x.kind === "bin"), AG: all.filter((x) => x.kind === "AG"), DC: all.filter((x) => x.kind === "DC") };
        if (!all.length) tskF = "todo";
        $("tskChips").innerHTML = all.length
          ? chipsHtml(tskF, [["todo", "Belum", pend.length], ["bin", "Bin", flt.bin.length], ["AG", "Aging", flt.AG.length], ["DC", "DC", flt.DC.length], ["done", "Selesai", flt.done.length], ["all", "Semua", all.length]])
          : "";
        const list = flt[tskF] || pend, uname = (id) => (users.find((u) => u.id === id) || {}).name || "Belum ada petugas";
        $("tskList").innerHTML = !all.length
          ? \`<div class="empty">\${admin ? "Belum ada tugas. Ketuk Buat tugas otomatis di atas." : "Belum ada tugas untuk Anda. Tugas dari admin akan muncul di sini."}</div>\`
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
      $("v-dist").onclick = (e) => {
        if (!e.target.closest("#tskJump")) return;
        $("dgKind").value = "bin"; $("dgArea").value = ""; $("dgUser").value = "auto"; $("dgShow").value = "";
        renderDg();
        if ($("dgGo").disabled) { toast($("dgInfo").textContent); { $("dgMore").open = true; return $("tkDlg").scrollIntoView({ behavior: "smooth", block: "start" }); } }
        $("dgGo").click();
      };
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
`,Xp=`/* Lapisan 2: Supabase sebagai cache cepat. Alur: HP (lapisan 1) -> Supabase (lapisan 2) -> Google Sheets (lapisan 3).
   Hanya data operasional per-record (counts, dc, tasks, closed, aging, agcls, clrdone) yang lewat sini; master & user
   tetap lewat Google Sheets. Cap waktu terbaru menang (sama seperti sinkron Sheets), jadi kedua jalur aman berjalan bersamaan.
   Opsional: tanpa URL & kunci Supabase, aplikasi bekerja seperti biasa. Skema: docs/supabase-schema.sql */
      const K_SBL = "warehouse_so_sbl_v1";
      let SBL = Object.assign({ url: "", key: "", on: true, cursor: 0, known: {}, last: "", err: "" }, ld(K_SBL, {}));
      if (WMS_CONFIG.supabaseUrl && WMS_CONFIG.supabaseKey && (SBL.url !== WMS_CONFIG.supabaseUrl || SBL.key !== WMS_CONFIG.supabaseKey)) {
        SBL = Object.assign(SBL, { url: WMS_CONFIG.supabaseUrl, key: WMS_CONFIG.supabaseKey, cursor: 0, known: {} });
      }
      if (typeof SBL.known !== "object" || !SBL.known) SBL.known = {};
      let sblBusy = false, sblAgain = false, sblT = 0, sblFails = 0;
      const sblReady = () => !!(SBL.url && SBL.key && SBL.on !== false);
      const sblSave = () => { try { localStorage.setItem(K_SBL, JSON.stringify(SBL)); } catch (e) {} };
      async function sblFetch(path, opt) {
        const ac = new AbortController(), tm = setTimeout(() => ac.abort(), 15000);
        try {
          const r = await fetch(SBL.url.replace(/\\/+$/, "") + path, {
            ...opt,
            headers: { apikey: SBL.key, Authorization: "Bearer " + SBL.key, "Content-Type": "application/json", ...((opt && opt.headers) || {}) },
            signal: ac.signal,
          });
          if (!r.ok) throw new Error("Supabase " + r.status);
          return r.status === 204 ? null : await r.json();
        } finally {
          clearTimeout(tm);
        }
      }
      // kirim perubahan lokal (record baru/berubah + penghapusan) dalam satu-dua permintaan
      async function sblPush() {
        const items = [];
        Object.keys(SY_STAMP).forEach((n) => {
          const cur = syGetV[n](), kn = SBL.known[n] || {}, f = SY_STAMP[n];
          Object.keys(cur).forEach((id) => {
            const v = cur[id];
            if (!v) return;
            const st = v[f] || "";
            if (kn[id] !== st) items.push({ coll: n, id, value: v, at: st || nowIso(), deleted: false, _st: st });
          });
          Object.keys(kn).forEach((id) => { if (!(id in cur)) items.push({ coll: n, id, value: null, at: nowIso(), deleted: true }); });
        });
        for (let i = 0; i < items.length; i += 300) {
          const part = items.slice(i, i + 300);
          await sblFetch("/rest/v1/rpc/wms_put_many", { method: "POST", body: JSON.stringify({ items: part.map(({ _st, ...r }) => r) }) });
          part.forEach((it) => {
            const kn = SBL.known[it.coll] || (SBL.known[it.coll] = {});
            if (it.deleted) delete kn[it.id];
            else kn[it.id] = it._st;
          });
          sblSave();
        }
      }
      // ambil perubahan baru sejak kursor terakhir (delta), gabungkan: cap waktu terbaru menang
      async function sblPull() {
        let changed = false;
        for (let guard = 0; guard < 30; guard++) {
          const rows = await sblFetch("/rest/v1/wms_records?select=coll,id,value,at,deleted,srv&srv=gt." + (Number(SBL.cursor) || 0) + "&order=srv.asc&limit=1000");
          if (!Array.isArray(rows) || !rows.length) break;
          const next = {};
          rows.forEach((r) => {
            const n = r.coll;
            if (!syGetV[n]) return;
            const f = SY_STAMP[n], kn = SBL.known[n] || (SBL.known[n] = {}), cur = next[n] || syGetV[n](), loc = cur[r.id];
            if (r.deleted) {
              if (loc && syTs(loc[f]) <= syTs(r.at)) { if (!next[n]) next[n] = { ...cur }; delete next[n][r.id]; delete kn[r.id]; }
              return;
            }
            if (!r.value) return;
            if (!loc && kn[r.id] !== undefined) return; // dihapus di sini, batu nisan menunggu terkirim: jangan dihidupkan lagi
            const rs = syTs(r.value[f]);
            if (!loc || rs > syTs(loc[f])) { if (!next[n]) next[n] = { ...cur }; next[n][r.id] = r.value; kn[r.id] = r.value[f] || ""; }
            else if (rs === syTs(loc[f])) kn[r.id] = r.value[f] || "";
          });
          const prev = syApplying;
          syApplying = true;
          try {
            Object.keys(next).forEach((n) => {
              sySetV[n](next[n]);
              try { localStorage.setItem(syKey[n], JSON.stringify(next[n])); failed.delete(syKey[n]); } catch (e) { failed.add(syKey[n]); }
              changed = true;
            });
          } finally { syApplying = prev; }
          SBL.cursor = rows[rows.length - 1].srv;
          sblSave();
          if (rows.length < 1000) break;
        }
        if (changed) { syRefresh(); if (typeof hlRun === "function") hlRun(); }
      }
      async function sblRun() {
        if (!sblReady()) return;
        if (sblBusy) { sblAgain = true; return; }
        if (!navigator.onLine) return;
        sblBusy = true;
        try {
          await sblPush(); // dorong dulu: penghapusan lokal tidak hidup lagi oleh data lama dari server
          await sblPull();
          SBL.err = ""; SBL.last = new Date().toISOString(); sblFails = 0;
        } catch (e) {
          SBL.err = e && e.name === "AbortError" ? "Supabase terlalu lama menjawab." : String((e && e.message) || e);
          sblFails = Math.min(sblFails + 1, 6);
        } finally {
          sblBusy = false;
          sblSave();
          sblUi();
          if (sblAgain) { sblAgain = false; sblSoon(300); }
        }
      }
      function sblSoon(ms) {
        if (!sblReady()) return;
        clearTimeout(sblT);
        sblT = setTimeout(sblRun, ms == null ? 400 : ms);
      }
      function sblUi() {
        if (!$("sblInfo")) return;
        const t = SBL.last ? new Date(SBL.last).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "";
        $("sblInfo").textContent = !SBL.url || !SBL.key ? "Belum tersambung. Opsional: mempercepat sinkron antar HP (dalam hitungan detik)." : SBL.on === false ? "Dimatikan di perangkat ini." : SBL.err ? "Gagal: " + SBL.err + " (data aman di HP & Google Sheets, dicoba lagi otomatis)" : "Tersambung" + (sblWsOk ? " (realtime aktif)" : "") + (t ? ", terakhir " + t : "") + ".";
        if ($("sblOff")) $("sblOff").hidden = !SBL.url;
      }
      /* Realtime: WebSocket Supabase hanya sebagai pemicu "ada perubahan" -> langsung tarik delta (data tetap lewat jalur yang sama).
         Bila putus/ditolak, poll 4 dtk tetap menjaga data tetap terbarui. */
      let sblWs = null, sblWsOk = false, sblWsFails = 0, sblWsT = 0, sblHb = 0;
      function sblWsStop() {
        const w = sblWs; sblWs = null; sblWsOk = false;
        clearInterval(sblHb); clearTimeout(sblWsT);
        if (w) { try { w.close(); } catch (e) {} }
      }
      function sblWsRetry() {
        clearTimeout(sblWsT);
        sblWsFails = Math.min(sblWsFails + 1, 6);
        sblWsT = setTimeout(sblWsOpen, Math.min(2000 * 2 ** sblWsFails, 60000) * (0.75 + Math.random() * 0.5));
      }
      function sblWsOpen() {
        if (!sblReady() || sblWs || document.hidden || !navigator.onLine || typeof WebSocket === "undefined") return;
        let ws, ref = 0;
        try { ws = new WebSocket(SBL.url.replace(/^http/i, "ws").replace(/\\/+$/, "") + "/realtime/v1/websocket?apikey=" + encodeURIComponent(SBL.key) + "&vsn=1.0.0"); } catch (e) { return sblWsRetry(); }
        sblWs = ws;
        const send = (topic, event, payload) => { try { ws.send(JSON.stringify({ topic, event, payload, ref: String(++ref) })); } catch (e) {} };
        ws.onopen = () => {
          send("realtime:wms", "phx_join", { config: { broadcast: { self: false }, presence: { key: "" }, postgres_changes: [{ event: "*", schema: "public", table: "wms_records" }] }, access_token: SBL.key });
          clearInterval(sblHb);
          sblHb = setInterval(() => send("phoenix", "heartbeat", {}), 25000);
        };
        ws.onmessage = (e) => {
          let m; try { m = JSON.parse(e.data); } catch (x) { return; }
          if (m.event === "phx_reply" && m.topic === "realtime:wms") {
            sblWsOk = !!(m.payload && m.payload.status === "ok");
            if (sblWsOk) { sblWsFails = 0; sblSoon(100); } // kejar yang terlewat selama terputus
            sblUi();
          } else if (m.event === "postgres_changes") sblSoon(60);
        };
        const gone = () => { if (sblWs !== ws) return; sblWs = null; sblWsOk = false; clearInterval(sblHb); sblUi(); sblWsRetry(); };
        ws.onclose = gone; ws.onerror = gone;
      }
      function sblStart() {
        if ($("sblUrl")) {
          $("sblUrl").value = SBL.url; $("sblKey").value = SBL.key; $("sblOn").checked = SBL.on !== false;
          $("sblGo").onclick = () => {
            const u = $("sblUrl").value.trim().replace(/\\/+$/, ""), k = $("sblKey").value.trim();
            if (!/^https:\\/\\/[^\\s/]+/i.test(u)) return toast("URL harus diawali https:// (contoh: https://xxxx.supabase.co)");
            if (!k) return toast("Isi kunci anon (anon public key).");
            if (u !== SBL.url || k !== SBL.key) { SBL.cursor = 0; SBL.known = {}; }
            SBL.url = u; SBL.key = k; SBL.on = $("sblOn").checked; SBL.err = "";
            sblWsStop(); sblSave(); sblUi(); sblRun(); sblWsOpen(); toast("Supabase disimpan");
          };
          $("sblOn").onchange = () => { SBL.on = $("sblOn").checked; sblSave(); sblWsStop(); sblUi(); if (sblReady()) { sblSoon(100); sblWsOpen(); } };
          $("sblOff").onclick = async () => {
            if (!(await ask("Putuskan Supabase?", "Data di HP dan Google Sheets tetap ada. Sinkron kembali hanya lewat Google Sheets.", "Putuskan", true))) return;
            SBL = { url: "", key: "", on: true, cursor: 0, known: {}, last: "", err: "" };
            sblWsStop(); sblSave(); $("sblUrl").value = ""; $("sblKey").value = ""; sblUi();
          };
        }
        sblUi();
        // poll ringan (delta kecil) tiap ±4 dtk saat layar aktif; mundur bertahap bila gagal
        (function loop() {
          setTimeout(() => { if (!document.hidden) sblRun(); loop(); }, (sblFails ? Math.min(4000 * 2 ** sblFails, 60000) : sblWsOk ? 20000 : 4000) + Math.random() * 1000);
        })();
        document.addEventListener("visibilitychange", () => { if (document.hidden) sblWsStop(); else { sblSoon(200); sblWsOpen(); } });
        window.addEventListener("online", () => { sblSoon(500); sblWsOpen(); });
        window.addEventListener("offline", sblWsStop);
        if (sblReady()) { sblSoon(600); sblWsOpen(); }
      }
`,Zp=`/* Sinkron Google Sheets (Apps Script) + start-up aplikasi
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
        if (Object.values(syKey).includes(k)) sblSoon(); // lapisan 2 (Supabase): kirim cepat, Sheets menyusul di latar
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
        // data sudah aman di server (tidak ada perubahan baru selama sinkron): peringatan "belum dicadangkan" dihapus
        if (!SY.dirty && bk.n) { bk = { ...bk, n: 0, sy: SY.lastAt }; saveBk(); gdSnooze = 0; guardUi(); }
        else if (!SY.dirty && !bk.sy) { bk = { ...bk, sy: SY.lastAt }; saveBk(); guardUi(); }
        else guardUi();
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
        else if (v === "task" || v === "dist") renderTask();
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
      sblStart();
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
`,nf=`/* Kartu hasil Clearing di menu Monitoring. Logika: src/lib/clearing-summary.js. Data langsung (HP ini) bila laporan + counting
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
          el.innerHTML = '<section class="cm" aria-label="Hasil Clearing"><div class="cm-h"><div><h2>Clearing</h2><p class="cm-sub">' + esc(sub) + '</p></div><span class="pill ' + stat[1] + '">' + esc(stat[0]) + "</span></div>" +
            '<div class="cm-grid"><div class="cm-t"><b>' + fmt(s.total) + "</b><span>Voucher</span></div>" +
            '<div class="cm-t cm-g"><b>' + fmt(s.ok) + "</b><span>Cocok (" + s.pct + "%)</span></div>" +
            '<div class="cm-t' + (s.open ? " cm-r" : " cm-g") + '"><b>' + fmt(s.open) + "</b><span>Perlu tindak</span></div>" +
            '<div class="cm-t' + (s.sel ? " cm-r" : "") + '"><b>' + (s.wms == null ? "-" : (s.sel > 0 ? "+" : "") + fmt(s.sel)) + "</b><span>Selisih qty</span></div></div>" +
            '<div class="cm-bar" role="progressbar" aria-label="Progres Clearing" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + s.pct + '"><i style="width:' + s.pct + '%"></i></div>' +
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
`,ef=`/* Kesehatan data: panel di menu Data WMS + lencana header (hanya admin). Logika murni: src/lib/health.js.
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
`,tf=`/* Tampilan lapangan + scan label rak (patch IIFE, dijalankan setelah chunk utama)
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
`,af=`/* Bip + pita status jaringan (patch IIFE, dijalankan setelah chunk utama)
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
`,sf=`/* Papan angka cari bin (patch IIFE, dijalankan setelah chunk utama)
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
`,rf=`/* Layar petugas lebih sepi (patch IIFE, dijalankan setelah chunk utama)
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
`,lf=`/* Tandai selesai per voucher (Clearing) (patch IIFE, dijalankan setelah chunk utama)
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
`,of=Object.assign({"./chunks/00-demo-data.js":$p,"./chunks/10-core.js":Cp,"./chunks/20-bins-sheet.js":Ap,"./chunks/25-check-draft-undo.js":Tp,"./chunks/30-review.js":_p,"./chunks/35-adjust.js":Mp,"./chunks/40-import.js":jp,"./chunks/45-nav.js":Dp,"./chunks/50-kesesuaian.js":Lp,"./chunks/55-muat.js":Np,"./chunks/60-users.js":Rp,"./chunks/65-kpi.js":Ep,"./chunks/70-dc.js":Pp,"./chunks/75-nav-dialog.js":Bp,"./chunks/76-menu-groups.js":Op,"./chunks/80-clearing.js":Kp,"./chunks/85-a11y-bin-nav.js":Ip,"./chunks/88-backup.js":Up,"./chunks/90-telegram.js":Hp,"./chunks/91-linkcfg.js":Fp,"./chunks/92-monitoring.js":qp,"./chunks/93-dash-delivery.js":Vp,"./chunks/93-dash-tv.js":Wp,"./chunks/94-aging.js":zp,"./chunks/95-tasks.js":Gp,"./chunks/96-task-kinds.js":Yp,"./chunks/96-task-menu.js":Qp,"./chunks/97-bridge-links.js":Jp,"./chunks/97-supabase.js":Xp,"./chunks/98-sync.js":Zp,"./chunks/99-clr-monitoring.js":nf,"./chunks/99-health.js":ef}),uf=Object.assign({"./chunks/patch-v18-display.js":tf,"./chunks/patch-v19-beep-net.js":af,"./chunks/patch-v20-numpad.js":sf,"./chunks/patch-v21-calm.js":rf,"./chunks/patch-v22-clr-done.js":lf}),Ld=(l,d)=>{const p=document.createElement("script");p.dataset.chunk=d,p.text=l,document.body.appendChild(p)},Nd=l=>Object.keys(l).sort().map(d=>[d,l[d]]);function df(){window.__legacyBooted||(window.__legacyBooted=!0,Ld(Nd(of).map(([l,d])=>`
/* ===== ${l} ===== */
${d}`).join(`
`),"core"),Nd(uf).forEach(([l,d])=>Ld(d,l)),window.WMS.emit())}const cf=`        <div class="top">
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
`,mf=`        <div class="sd-h">
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
          <button class="mi" data-v="dist">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h10M4 12h16M4 18h10"/><circle cx="18" cy="6" r="2"/><circle cx="8" cy="18" r="2" transform="translate(8 0)"/></svg>Distribusi Tugas
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
`,pf=`        <button data-v="mon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z"/></svg>Beranda</button>
        <button data-v="so"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/></svg>Periksa<span class="bd" id="tTask" hidden></span></button>
        <button data-v="dc"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 11 3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/></svg>DC</button>
        <button data-v="check"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>Review<span class="bd" id="tRev" hidden></span></button>
        <button data-v="adj"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/></svg>Adjust<span class="bd" id="tAdj" hidden></span></button>
        <button data-v="task" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>Tugas</button>
        <button data-v="dist" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h10M4 12h16M4 18h10"/><circle cx="18" cy="6" r="2"/><circle cx="8" cy="18" r="2" transform="translate(8 0)"/></svg>Distribusi</button>
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
`,ff=`            <div class="panel">
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
`,gf=`          <h2>DC Harian</h2>
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
`,hf=`            <h2>Review Supervisor</h2>
            <p class="hint">Bin yang item atau qty-nya tidak sesuai.</p>
            <div class="stats" id="stats" aria-live="polite" aria-atomic="true"></div>
            <div class="chips" id="chipsC"></div>
            <div id="checkList"></div>
            <button class="btn sec mt ximp" id="btnCsv">Unduh rekap CSV</button>
`,kf=`            <h2>File Adjust</h2>
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
`,vf=`            <h2>Task</h2>
            <p class="hint">Ketuk tugas untuk mengerjakannya. Selesai otomatis saat disimpan.</p>
            <p class="note info" id="tskAdminNote" hidden>Menu ini untuk petugas. Admin dan SPV memantau dan mengelola tugas di menu Distribusi Tugas.</p>
            <div id="tskHome"><div id="tskBox">
            <div id="tskSum" class="tsk-sum"></div>
            <div class="panel" id="tskWhoW" hidden><label for="tskUser">Lihat tugas milik</label><select id="tskUser"></select></div>
            <div class="chips" id="tskChips" role="group" aria-label="Filter task"></div>
            <div id="tskList"></div>
            </div></div>
            <button class="btn pri" id="tkGo" hidden>Kerjakan tugas saya</button>
`,bf=`            <h2>Distribusi Tugas</h2>
            <p class="hint">Buat tugas dari data master, bagikan, dan pantau. Petugas mengerjakannya di menu Task.</p>
            <button class="btn pri tsk-new dst-main" id="tskJump" type="button">Buat tugas otomatis</button>
            <div id="tkUn"></div>
            <h3 class="sec" id="tskAdminH">Progres</h3>
            <div class="stats" id="tkStats"></div>
            <h3 class="sec">Per petugas</h3>
            <div id="tkUsers"></div>
            <h3 class="sec">Pantau &amp; kelola tugas</h3>
            <div id="dstMon"></div>
            <h3 class="sec">Tugas Aging &amp; DC</h3>
            <div id="tkKinds"></div>
            <details class="panel dst-more" id="dgMore">
              <summary>Atur manual &amp; upload file</summary>
            <div class="dst-box" id="tkDlg" hidden>
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
            <div class="dst-box ximp">
              <h3 id="tkWho">Upload tugas</h3>
              <label class="btn pri fl" for="tkFile" id="tkLbl">Pilih file daftar bin</label
              ><input type="file" id="tkFile" accept=".xls,.xlsx,.csv,text/csv" hidden />
              <p class="fine" id="tkHelp"></p>
              <button class="btn sec sm mt ximp" id="tkTpl" type="button">Unduh contoh file (CSV)</button>
            </div>
              <div id="tkRes"></div>
            </details>
            <button class="btn dng sm mt-lg" id="tkClear">Hapus semua tugas</button>
`,yf=`            <h2>Cek Kesesuaian</h2>
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
`,Sf=`            <h2>Laporan Muat</h2>
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
`,wf=`          <h2>User &amp; Area</h2>
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
`,xf=`          <div class="dh">
            <div><h2 class="dup">Clearing</h2><p class="hint">Cocokkan voucher dan qty laporan dengan hasil counting.</p></div>
            <span class="sync" id="clrAt" role="status"></span>
          </div>
          <details class="hint-more"><summary>Cara kerja</summary><p class="fine">Hanya voucher dari laporan yang Anda impor yang dicocokkan; baris counting lain diabaikan. Jika satu voucher punya beberapa foto, dipakai counting terbaru. Counting dalam ikatan dibaca otomatis (qty × 25 sama dengan qty laporan dianggap cocok).</p></details>
          <details class="panel clr-src" id="clrSrc" open>
            <summary id="clrSrcSum"><span class="cs-t"><b>Mulai di sini</b><em>Muat laporan voucher, lalu counting</em></span></summary>
            <label for="clrRepFile"><span class="stepno">1</span>Laporan Voucher (.xlsx / .csv)</label>
            <input id="clrRepFile" type="file" accept=".csv,.xls,.xlsx,text/csv" />
            <p class="fine" id="clrRepInfo"></p>
            <label><span class="stepno">2</span>Hasil counting</label>
            <p class="fine" id="clrCntInfo" role="status"></p>
            <div id="clrDiag"></div>
            <div class="row-act"><button class="btn pri" id="clrLoad" type="button">Muat counting dari spreadsheet</button><button class="btn sec" id="clrRefresh" type="button" title="Ambil ulang counting terbaru dan bersihkan hasil lama">↻ Refresh</button></div>
            <div class="ximp"><label for="clrCntFile">Atau muat counting dari file</label>
            <input id="clrCntFile" type="file" accept=".csv,.xls,.xlsx,text/csv" /></div>
          </details>
          <div class="kcs mt" id="clrStats"></div>
          <div id="clrRekap"></div>
          <div class="panel mt">
            <input id="clrQ" type="search" placeholder="Cari voucher / item, contoh: 4043814" aria-label="Cari voucher atau item" autocomplete="off" />
            <div class="chips clr-chips" id="clrChips"></div>
            <div class="chips clr-chips" id="clrShChips"></div>
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
`,$f=`          <h2>Telegram</h2>
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
`,Cf=`          <div class="dh">
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
`,Af=`            <h2>Data acuan WMS</h2>
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
              <h2 style="font-size: 18px">Supabase (cepat, opsional)</h2>
              <p class="hint">Lapisan 2 supaya antar HP tersinkron dalam hitungan detik: HP → Supabase → Google Sheets (arsip &amp; laporan, jalan di latar). Tanpa ini aplikasi tetap jalan lewat Google Sheets.</p>
              <label for="sblUrl">URL project Supabase</label>
              <input id="sblUrl" placeholder="https://xxxx.supabase.co" autocomplete="off" spellcheck="false" />
              <label for="sblKey">Kunci anon (public)</label>
              <input id="sblKey" type="password" autocomplete="off" spellcheck="false" />
              <label class="sw"><input type="checkbox" id="sblOn" checked /><span>Aktif di perangkat ini<small>Matikan untuk sementara kembali ke Google Sheets saja.</small></span></label>
              <p class="fine" id="sblInfo"></p>
              <div class="row-act"><button class="btn pri" id="sblGo" type="button">Simpan dan sambungkan</button></div>
              <button class="btn dng sm mt" id="sblOff" type="button" hidden>Putuskan</button>
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
`,Tf=`      <div class="sh-head">
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
`,_f=`      <div class="sh-head">
        <button class="x" id="pkX" aria-label="Tutup"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <div><b>Pilih item DC</b><small id="pkCount"></small></div>
      </div>
      <div class="sh-body">
        <input id="pkQ" type="search" placeholder="Cari item atau kode" autocomplete="off" aria-label="Cari item" />
        <div class="row2 mt"><button class="btn sec sm" id="pkAll">Pilih semua hasil</button><button class="btn sec sm" id="pkNone">Kosongkan hasil</button></div>
        <div id="pkList" class="mt-lg"></div>
      </div>
      <div class="sh-foot"><button class="btn pri" id="pkOk">Selesai</button></div>
`,Mf=`      <div class="sh-head">
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
`,jf=`      <div role="dialog" aria-labelledby="navT">
        <h3 id="navT">Menu di navigasi bawah</h3>
        <p class="fine" id="navH"></p>
        <div class="chips wrap" id="navChips" role="group" aria-labelledby="navT"></div>
        <button class="btn pri mt" id="navSave" type="button">Simpan</button>
        <button class="btn sec mt" id="navReset" type="button">Kembalikan standar</button>
        <button class="btn sec mt" id="navCancel" type="button">Batal</button>
      </div>
`,Df=`      <div role="dialog" aria-labelledby="lgT">
        <h3 id="lgT">Masuk ke Stock Control</h3>
        <p>Pilih nama, lalu masukkan password.</p>
        <select id="lgUser" aria-label="Nama"></select>
        <div id="lgPinWrap"><input id="lgPin" type="password" maxlength="64" placeholder="Password" autocomplete="current-password" aria-label="Password" /><button class="btn sec sm mt" id="lgShow" type="button" aria-pressed="false">Tampilkan password</button></div>
        <div class="err" id="lgErr" role="alert"></div>
        <button class="btn pri" id="lgOk">Masuk</button>
        <details><summary>Lupa password admin? (darurat)</summary><div><p class="fine">Minta admin lain mengatur ulang password Anda lewat menu User &amp; Area. Hanya jika tidak ada admin lain, tombol di bawah menghapus SEMUA password di perangkat ini (data pemeriksaan tetap). Anda harus mengetik RESET dan menunggu 3 detik. Setelah itu atur password admin lagi di menu User &amp; Area.</p><button class="btn dng sm" id="lgReset" type="button">Hapus semua password</button></div></details>
      </div>
`,Lf=`      <div role="dialog" aria-labelledby="lsT">
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
`,Nf=`      <div class="sh-head">
        <button class="x" id="padX" aria-label="Tutup"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <div><b>Cari bin</b><small>Ketuk kode yang tertulis di rak</small></div>
      </div>
      <div class="sh-body">
        <div class="pad-disp" id="padDisp" aria-live="polite"></div>
        <div id="padRes"></div>
      </div>
      <div class="sh-foot"><div class="padkeys" id="padKeys"></div></div>
`,Rf=[["so",ff],["dc",gf],["check",hf],["adj",kf],["task",vf],["dist",bf],["kes",yf],["muat",Sf],["usr",wf],["clr",xf]],Ef=[["tg",$f],["mon",Cf],["data",Af]];function Pf(){jn.useEffect(()=>df(),[]);const l=([d,p])=>o.jsx(Ee,{as:"section",id:"v-"+d,hidden:d!=="so",html:p},d);return o.jsxs(o.Fragment,{children:[o.jsx("a",{href:"#main",className:"skip",children:"Lewati ke konten utama"}),o.jsxs("div",{className:"app",children:[o.jsx(Ee,{as:"header",html:cf}),o.jsx("div",{className:"content",children:o.jsxs("main",{id:"main",tabIndex:-1,children:[o.jsx("div",{className:"guard",id:"guard","aria-live":"polite"}),Rf.map(l),o.jsx(tp,{}),o.jsx(rp,{}),o.jsx(xp,{}),Ef.map(l)]})}),o.jsx("div",{className:"scrim",id:"scrim"}),o.jsx(Ee,{as:"aside",className:"side",id:"side","aria-label":"Menu",html:mf}),o.jsx(Ee,{as:"nav",className:"tabs",id:"tabs","aria-label":"Navigasi utama",html:pf})]}),o.jsx(Ee,{className:"sheet",id:"sheet",role:"dialog","aria-modal":"true","aria-label":"Periksa bin",hidden:!0,html:Tf}),o.jsx(Ee,{className:"sheet",id:"dcPickSheet",role:"dialog","aria-modal":"true","aria-label":"Pilih item DC",hidden:!0,html:_f}),o.jsx(Ee,{className:"sheet",id:"dcSheet",role:"dialog","aria-modal":"true","aria-label":"Hitung item DC",hidden:!0,html:Mf}),o.jsx("div",{id:"dlg",className:"dlg",role:"dialog","aria-modal":"true","aria-labelledby":"dlgT",hidden:!0}),o.jsx(Ee,{className:"dlg",id:"navSet",style:{zIndex:95},hidden:!0,html:jf}),o.jsx(Ee,{className:"dlg",id:"login",style:{zIndex:100},hidden:!0,html:Df}),o.jsx(Ee,{className:"dlg",id:"lgSetup",style:{zIndex:100},hidden:!0,html:Lf}),o.jsx(Ee,{className:"sheet",id:"padSheet",role:"dialog","aria-modal":"true","aria-label":"Cari bin",hidden:!0,html:Nf}),o.jsx("div",{id:"toast",className:"off",role:"status","aria-live":"polite","aria-atomic":"true"})]})}window.WMS_CONFIG=Um;try{const l=JSON.parse(localStorage.getItem("warehouse_so_disp_v1")||"{}");l.out&&document.documentElement.classList.add("outdoor"),document.documentElement.style.setProperty("--ts",[1,1.15,1.3][l.ts]||1)}catch{}Im.createRoot(document.getElementById("root")).render(o.jsx(Pf,{}));"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});
