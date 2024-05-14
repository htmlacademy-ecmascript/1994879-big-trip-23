(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var i=n(537),s=n.n(i),r=n(645),o=n.n(r)()(s());o.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,s,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<t.length;c++){var u=[].concat(t[c]);i&&o[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),s&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=s):u[4]="".concat(s)),e.push(u))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",h="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},$={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:a,d:o,D:d,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",_={};_[y]=v;var E=function(t){return t instanceof S},g=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();_[r]&&(s=r),n&&(_[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;_[a]=e,s=a}return!i&&s&&(y=s),s||!i&&y},w=function(t,e){if(E(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},b=$;b.l=g,b.i=E,b.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function v(t){this.$L=g(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===h)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!b.u(e)||e,h=b.p(t),p=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},f=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,$=this.$D,y="set"+(this.$u?"UTC":"");switch(h){case u:return c?p(1,0):p(31,11);case l:return c?p(1,m):p(0,m+1);case a:var _=this.$locale().weekStart||0,E=(v<_?v+7:v)-_;return p(c?$-E:$+(6-E),m);case o:case d:return f(y+"Hours",0);case r:return f(y+"Minutes",1);case s:return f(y+"Seconds",2);case i:return f(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var a,c=b.p(t),h="set"+(this.$u?"UTC":""),p=(a={},a[o]=h+"Date",a[d]=h+"Date",a[l]=h+"Month",a[u]=h+"FullYear",a[r]=h+"Hours",a[s]=h+"Minutes",a[i]=h+"Seconds",a[n]=h+"Milliseconds",a)[c],f=c===o?this.$D+(e-this.$W):e;if(c===l||c===u){var v=this.clone().set(d,1);v.$d[p](f),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](f);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(n,c){var d,h=this;n=Number(n);var p=b.p(c),f=function(t){var e=w(h);return b.w(e.date(e.date()+Math.round(t*n)),h)};if(p===l)return this.set(l,this.$M+n);if(p===u)return this.set(u,this.$y+n);if(p===o)return f(1);if(p===a)return f(7);var v=(d={},d[s]=t,d[r]=e,d[i]=1e3,d)[p]||1,m=this.$d.getTime()+n*v;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=b.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},d=function(t){return b.s(r%12||12,t,"0")},p=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:b.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:b.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:b.s(r,2,"0"),h:d(1),hh:d(2),a:p(r,o,!0),A:p(r,o,!1),m:String(o),mm:b.s(o,2,"0"),s:String(this.$s),ss:b.s(this.$s,2,"0"),SSS:b.s(this.$ms,3,"0"),Z:s};return i.replace(f,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,h){var p,f=b.p(d),v=w(n),m=(v.utcOffset()-this.utcOffset())*t,$=this-v,y=b.m(this,v);return y=(p={},p[u]=y/12,p[l]=y,p[c]=y/3,p[a]=($-m)/6048e5,p[o]=($-m)/864e5,p[r]=$/e,p[s]=$/t,p[i]=$/1e3,p)[f]||$,h?y:b.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return _[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=g(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),M=S.prototype;return w.prototype=M,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(t){M[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,S,w),t.$i=!0),w},w.locale=g,w.isDayjs=E,w.unix=function(t){return w(1e3*t)},w.en=_[y],w.Ls=_,w.p={},w}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:a,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof y},h=function(t,e,n){return new y(t,n,e.$l)},p=function(t){return e.p(t)+"s"},f=function(t){return t<0},v=function(t){return f(t)?Math.ceil(t):Math.floor(t)},m=function(t){return Math.abs(t)},$=function(t,e){return t?f(t)?{negative:!0,format:""+m(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},y=function(){function f(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*u[p(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[p(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(c);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var m=f.prototype;return m.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*u[n]}),0)},m.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=v(t/a),t%=a,this.$d.months=v(t/l),t%=l,this.$d.days=v(t/r),t%=r,this.$d.hours=v(t/s),t%=s,this.$d.minutes=v(t/i),t%=i,this.$d.seconds=v(t/n),t%=n,this.$d.milliseconds=t},m.toISOString=function(){var t=$(this.$d.years,"Y"),e=$(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=$(n,"D"),s=$(this.$d.hours,"H"),r=$(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=$(o,"S"),l=t.negative||e.negative||i.negative||s.negative||r.negative||a.negative,c=s.format||r.format||a.format?"T":"",u=(l?"-":"")+"P"+t.format+e.format+i.format+c+s.format+r.format+a.format;return"P"===u||"-P"===u?"P0D":u},m.toJSON=function(){return this.toISOString()},m.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,e){return e||String(i[t])}))},m.as=function(t){return this.$ms/u[p(t)]},m.get=function(t){var e=this.$ms,n=p(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?v(e/u[n]):this.$d[n],0===e?0:e},m.add=function(t,e,n){var i;return i=e?t*u[p(e)]:d(t)?t.$ms:h(t,this).$ms,h(this.$ms+i*(n?-1:1),this)},m.subtract=function(t,e){return this.add(t,e,!0)},m.locale=function(t){var e=this.clone();return e.$l=t,e},m.clone=function(){return h(this.$ms,this)},m.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},f}();return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return h(t,{$l:n},e)},s.isDuration=d;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(t,e){return d(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return d(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var r={},o=[],a=0;a<t.length;a++){var l=t[a],c=i.base?l[0]+i.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var h=n(d),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)e[h].references++,e[h].updater(p);else{var f=s(p,i);i.byIndex=a,e.splice(a,0,{identifier:d,updater:f,references:1})}o.push(d)}return o}function s(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,s){var r=i(t=t||[],s=s||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=n(r[o]);e[a].references--}for(var l=i(t,s),c=0;c<r.length;c++){var u=n(r[c]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}r=l}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={id:i,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";var t=n(484),e=n.n(t),i=n(646),s=n.n(i);const r={id:0,type:"Flight",dateFrom:new Date,dateTo:null,destination:null,price:0,offers:[],isFavorite:!1},o=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],a={DAY:"day",EVENT:"event",TIME:"time",PRICE:"price",OFFERS:"offers"},l={EVERYTHING:"everything",FUTURE:"future",PRESENT:"present",PAST:"past"},c={[l.EVERYTHING]:"Click New Event to create your first point",[l.FUTURE]:"There are no future events now",[l.PRESENT]:"There are no present events now",[l.PAST]:"There are no past events now"},u="YY/MM/DD HH:mm";e().extend(s());const d=({dateFrom:t,dateTo:n})=>e()(n).diff(t),h=t=>t?e()(t).format("HH:mm"):"",p=(t,n="YYYY-MM-DDTHH:mm")=>t?e()(t).format(n):"",f=t=>{const[e,...n]=t;return`${e.toUpperCase()}${n.join("")}`},v=t=>0===t.length,m=t=>t?"checked":"",$=t=>t?"disabled":"",y=(t,e)=>e.price-t.price,_=(t,e)=>d(e)-d(t),E=(t,e)=>e.dateFrom-t.dateFrom;function g(t,e,n="beforeend"){if(!(t instanceof I))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function w(t,e){if(!(t instanceof I&&e instanceof I))throw new Error("Can replace only components");const n=t.element,i=e.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}function b(t){if(null!==t){if(!(t instanceof I))throw new Error("Can remove only components");t.element.remove(),t.removeElement()}}var S=n(379),M=n.n(S),C=n(795),T=n.n(C),k=n(569),D=n.n(k),F=n(565),A=n.n(F),H=n(216),x=n.n(H),Y=n(589),V=n.n(Y),O=n(10),B={};B.styleTagTransform=V(),B.setAttributes=A(),B.insert=D().bind(null,"head"),B.domAPI=T(),B.insertStyleElement=x(),M()(O.Z,B),O.Z&&O.Z.locals&&O.Z.locals;const L="shake";class I{#t=null;constructor(){if(new.target===I)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(L),setTimeout((()=>{this.element.classList.remove(L),t?.()}),600)}}class P extends I{#e=[];#n="";#i=null;constructor({sortTypes:t,currentSort:e,container:n,onSortTypeChange:i}){super(),this.#e=t,this.#n=e,this.#i=i,g(this,n),this.element.addEventListener("change",this.#s)}get template(){return t=this.#e,e=this.#n,`\n  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    ${t.map((({type:t,disabled:n})=>((t,e,n)=>`\n  <div class="trip-sort__item  trip-sort__item--${t}">\n    <input id="sort-${t}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"\n      value="sort-${t}" ${m(e)} ${$(n)}>\n    <label class="trip-sort__btn" for="sort-${t}">${f(t)}</label>\n  </div>\n`)(t,t===e,n))).join("")}\n  </form>\n`;var t,e}removeElement(){super.removeElement(),this.element.removeEventListener("change",this.#s)}#s=t=>{t.preventDefault(),this.#i(t.target.value.replace("sort-",""))}}class j extends I{constructor({container:t}){super(),g(this,t)}get template(){return'\n  <ul class="trip-events__list">\n  </ul>'}}class N extends I{#r="";constructor({filter:t,container:e}){super(),this.#r=t,g(this,e)}get template(){return t=this.#r,`<p class="trip-events__msg">${c[t]}</p>`;var t}}class R extends I{#o=null;#a=null;#l=null;#c=null;#u=null;#d=null;#h=null;constructor({tripEvent:t=r,offers:e,destinations:n,onFormSubmit:i,onFormCancel:s}){super(),this.#o=t,this.#a=e,this.#l=n,this.#c=i,this.#u=s,this.element.addEventListener("submit",this.#p),this.#d=this.element.querySelector(".event__rollup-btn"),this.#h=this.element.querySelector(".event__reset-btn"),this.#d.addEventListener("click",this.#f),this.#h.addEventListener("click",this.#f)}get template(){return((t,e,n)=>{const{id:i,type:s,dateFrom:r,dateTo:a,price:l}=t,c=n.find((e=>e.id===t.destination)),{offers:d}=e.find((t=>t.type===s)),h=d.map((e=>({...e,isSelected:t.offers.includes(e.id)})));return`\n  <form class="event event--edit" action="#" method="post">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-${i}">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${s}.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${i}" type="checkbox">\n\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n            ${o.map((t=>((t,e,n)=>`\n  <div class="event__type-item">\n    <input id="event-type-${e}-${t}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}" ${m(n)}>\n    <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-${t}">${f(e)}</label>\n  </div>\n`)(i,t,s===t))).join("")}\n          </fieldset>\n        </div>\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-${i}">\n          ${s}\n        </label>\n        <input class="event__input  event__input--destination" id="event-destination-${i}" type="text" name="event-destination" value="${c.name}" list="destination-list-${i}">\n        <datalist id="destination-list-${i}">\n          ${n.map((t=>`<option value="${t.name}"></option>`)).join("")}\n        </datalist>\n      </div>\n\n      ${((t,e,n)=>`\n  <div class="event__field-group  event__field-group--time">\n    <label class="visually-hidden" for="event-start-time-${t}">From</label>\n    <input class="event__input  event__input--time" id="event-start-time-${t}" type="text" name="event-start-time" value="${p(e,u)}">\n    &mdash;\n    <label class="visually-hidden" for="event-end-time-${t}">From</label>\n    <input class="event__input  event__input--time" id="event-end-time-${t}" type="text" name="event-end-time" value="${p(n,u)}">\n  </div>\n`)(i,r,a)}\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-${i}">\n          <span class="visually-hidden">Price</span>\n          &euro;\n        </label>\n        <input class="event__input  event__input--price" id="event-price-${i}" type="text" name="event-price" value="${l}">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">Delete</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </header>\n    <section class="event__details">\n      ${(t=>t.length?`\n    <section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n      <div class="event__available-offers">\n        ${t.map((t=>(({id:t,type:e,title:n,price:i,isSelected:s})=>`\n  <div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e}-${t}" type="checkbox" name="event-offer-${e}" ${s?"checked":""}>\n    <label class="event__offer-label" for="event-offer-${e}-${t}">\n      <span class="event__offer-title">${n}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${i}</span>\n    </label>\n  </div>\n`)(t))).join("")}\n      </div>\n    </section>`:"")(h)}\n      ${(({description:t,pictures:e})=>`\n  <section class="event__section  event__section--destination">\n    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n    <p class="event__destination-description">${t}</p>\n\n    ${(t=>t.length?`\n    <div class="event__photos-container">\n      <div class="event__photos-tape">\n        ${t.map((({src:t,description:e})=>`<img class="event__photo" src="${t}" alt="${e}">`)).join("")}\n      </div>\n    </div>`:"")(e)}\n  </section>\n`)(c)}\n    </section>\n  </form>`})(this.#o,this.#a,this.#l)}removeElement(){super.removeElement(),this.element.removeEventListener("submit",this.#p),this.#d.removeEventListener("click",this.#f),this.#h.removeEventListener("click",this.#f)}#p=t=>{t.preventDefault(),this.#c(this.#o)};#f=t=>{t.preventDefault(),this.#u()}}const U=(t,n,i)=>{const{type:s,dateFrom:r,dateTo:o,price:a,isFavorite:l}=t,c=l?"event__favorite-btn--active":"",{name:u}=i.find((e=>e.id===t.destination)),{offers:f}=n.find((t=>t.type===s)),m=f.filter((e=>t.offers.includes(e.id)));return`\n  <li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="${$=r,$?e()($).format("YYYY-MM-DD"):""}">${(t=>t?e()(t).format("MMM D"):"")(r)}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${s}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${s} ${u}</h3>\n      ${((t,n)=>`\n  <div class="event__schedule">\n  <p class="event__time">\n    <time class="event__start-time" datetime="${p(t)}">${h(t)}</time>\n    &mdash;\n    <time class="event__end-time" datetime="${p(n)}">${h(n)}</time>\n  </p>\n  <p class="event__duration">${((t,n)=>{const i=e().duration(d({dateFrom:t,dateTo:n}));return i.days()?i.format("DD[d] HH[h] mm[m]"):i.hours()?i.format("HH[h] mm[m]"):i.format("mm[m]")})(t,n)}</p>\n</div>\n`)(r,o)}\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${a}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        ${(t=>v(t)?"":t.map((({title:t,price:e})=>`\n  <li class="event__offer">\n    <span class="event__offer-title">${t}</span>\n    &plus;&euro;&nbsp;\n    <span class="event__offer-price">${e}</span>\n  </li>\n  `)).join(""))(m)}\n      </ul>\n      <button class="event__favorite-btn ${c}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>`;var $};class W extends I{#o=null;#a=null;#l=null;#v=null;#m=null;#d=null;#$=null;constructor({tripEvent:t,offers:e,destinations:n,container:i,onEditClick:s,onFavoriteClick:r}){super(),this.#o=t,this.#a=e,this.#l=n,this.#v=s,this.#m=r,this.#d=this.element.querySelector(".event__rollup-btn"),this.#$=this.element.querySelector(".event__favorite-btn"),this.#d.addEventListener("click",this.#y),this.#$.addEventListener("click",this.#_),g(this,i)}get template(){return U(this.#o,this.#a,this.#l)}removeElement(){super.removeElement(),this.#d.removeEventListener("click",this.#y),this.#$.removeEventListener("click",this.#_)}#y=t=>{t.preventDefault(),this.#v()};#_=t=>{t.preventDefault(),this.#m()}}const q="View",Z="Edit";class z{#o=null;#E=null;#g=null;#w=null;#b=null;#S=null;#M=null;#C=q;constructor({model:t,container:e,onTripEventChange:n,onModeChange:i}){this.#E=t,this.#g=e,this.#S=n,this.#M=i}init(t){this.#o=t,this.#T(t)}destroy(){b(this.#w),b(this.#b)}resetView(){this.#C!==q&&this.#k()}#T(t){const e=this.#E.offers,n=this.#E.destinations,i=this.#w,s=this.#b;this.#w=new W({tripEvent:t,offers:e,destinations:n,container:this.#g,onEditClick:this.#D,onFavoriteClick:this.#_}),this.#b=new R({tripEvent:t,offers:e,destinations:n,onFormSubmit:this.#p,onFormCancel:this.#F}),null!==i&&null!==s&&(this.#C===Z&&w(this.#b,s),this.#C===q&&w(this.#w,i),b(i),b(s))}#A(){w(this.#b,this.#w),document.addEventListener("keydown",this.#H),this.#M(),this.#C=Z}#k(){w(this.#w,this.#b),document.removeEventListener("keydown",this.#H),this.#C=q}#D=()=>this.#A();#F=()=>this.#k();#p=t=>{this.#S(t),this.#k()};#_=()=>this.#S({...this.#o,isFavorite:!this.#o.isFavorite});#H=t=>{"Escape"===t.key&&(t.preventDefault(),this.#k())}}class J{#E=null;#g=null;#x=[];#Y=null;#V=null;#O=null;#B=new Map;constructor({container:t,model:e}){this.#g=t,this.#E=e}init(){this.#x=this.#E.tripEvents,this.#L(),this.#I()}#P(){this.#O=new N({filter:this.#E.currentFilter,container:this.#g})}#j({sortTypes:t,currentSort:e}){this.#V||(this.#V=new P({sortTypes:t,currentSort:e,container:this.#g,onSortTypeChange:this.#s}))}#I(){v(this.#x)?this.#P():(this.#j(this.#E),this.#Y=new j({container:this.#g}),this.#x.forEach((t=>{const e=new z({model:this.#E,container:this.#Y.element,onTripEventChange:this.#N,onModeChange:this.#R});e.init(t),this.#B.set(t.id,e)})))}#L(){this.#B.forEach((t=>t.destroy())),this.#B.clear()}#N=t=>{var e,n;this.#x=(e=this.#x,n=t,e.map((t=>t.id===n.id?n:t))),this.#B.get(t.id).init(t)};#R=()=>this.#B.forEach((t=>t.resetView()));#s=t=>{this.#E.currentSort!==t&&(this.#E.currentSort=t,this.init())}}class X extends I{#U=[];#W="";constructor({filters:t,currentFilter:e,container:n}){super(),this.#U=t,this.#W=e,g(this,n)}get template(){return t=this.#U,e=this.#W,`\n  <form class="trip-filters" action="#" method="get">\n    ${t.map((t=>{return`\n  <div class="trip-filters__filter">\n    <input id="filter-${n=t}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"\n      value="${n}" ${m(t===e)} ${$(!1)}>\n    <label class="trip-filters__filter-label" for="filter-${n}">${f(n)}</label>\n  </div>\n`;var n})).join("")}\n\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>\n`;var t,e}}class G extends I{#x=null;constructor({tripEvents:t,container:e}){super(),this.#x=t,g(this,e,"afterbegin")}get template(){return`\n    <section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">${this.#x.reduce(((t,e)=>t+e.price),0)}</span>\n      </p>\n    </section>`}}class K{#E=null;#q=null;#Z=null;constructor({container:t,model:e}){this.#q=t.filter,this.#Z=t.info,this.#E=e}init(){this.#z(this.#E),this.#J(this.#E)}#z({tripEvents:t}){new G({tripEvents:t,container:this.#Z})}#J({filters:t,currentFilter:e}){new X({filters:t,currentFilter:e,container:this.#q})}}const Q=t=>t[Math.floor(Math.random()*t.length)],tt=t=>Math.round(Math.random()*t),et=()=>`${Date.now().toString(36)}-${Math.random().toString(36).substr(2,5)}`,nt=t=>e()(t).add(tt(500),"minute"),it=t=>({src:`https://loremflickr.com/248/152?random=${tt(5)}`,description:`${t} photo description`}),st=["Amsterdam","Chamonix","Geneva","Paris","Milano"].map((t=>({id:et(),description:`${t} is a beautiful city.`,name:`${t}`,pictures:Array.from({length:tt(3)},it)}))),rt=["Order meal","Infotainment system","Choose seats","Book a taxi at the arrival point","Wake up at a certain time"],ot=()=>({id:et(),title:Q(rt),price:tt(500)}),at=o.map((t=>({type:t,offers:Array.from({length:tt(6)},ot)}))),lt=()=>at,ct=lt(),ut=()=>{const{id:t}=Q(st),e=Q(o),n=nt(),i=nt(n),s=ct.find((t=>t.type===e)),r=s.offers.length>0?Array.from({length:tt(3)},(()=>Q(s.offers))):[],a=r.length>0?r.map((t=>t.id)):[];return{id:et(),type:e,dateFrom:n,dateTo:i,destination:t,price:tt(100),isFavorite:Math.random()<.5,offers:a}};class dt{#l=[];#a=[];#x=[];#U=[];#e=[];#X=l.EVERYTHING;#G=a.DAY;#W=this.#X;#n=this.#G;get tripEvents(){return this.#K(this.#n)}set tripEvents(t){this.#x=t}get offers(){return this.#a}set offers(t){this.#a=t}get destinations(){return this.#l}set destinations(t){this.#l=t}get filters(){return this.#U}get currentFilter(){return this.#W}set currentFilter(t){this.#W=t}get sortTypes(){const t=[a.EVENT,a.OFFERS];return this.#e.map((e=>({type:e,disabled:t.includes(e)})))}get currentSort(){return this.#n}set currentSort(t){this.#n=t}init(){this.destinations=st,this.offers=lt(),this.tripEvents=Array.from({length:5},ut),this.#U=Object.values(l),this.#e=Object.values(a)}#K=t=>{const e=[...this.#x];switch(t){case a.DAY:return e.sort(E);case a.TIME:return e.sort(_);case a.PRICE:return e.sort(y);default:return e}}}(()=>{const t=document.querySelector(".trip-events"),e=document.querySelector(".trip-controls__filters"),n=document.querySelector(".trip-main"),i=new dt;i.init();const s=new K({container:{filter:e,info:n},model:i}),r=new J({container:t,model:i});s.init(),r.init()})()})()})();
//# sourceMappingURL=bundle.8936ea0fb50521c4b674.js.map