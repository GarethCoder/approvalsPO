/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['./DvtToolkit'], function(dvt) {
  // Internal use only.  All APIs and functionality are subject to change at any time.

var ga;function ka(a,F){0==a.indexOf("dvt.")&&(a=a.substring(4));var D=a.split("."),E=eval("dvt");D[0]in E||!E.execScript||E.execScript("var "+D[0]);for(var v;D.length&&(v=D.shift());)D.length||void 0===F?E=E[v]?E[v]:E[v]={}:E[v]=F}Math.floor(2147483648*Math.random()).toString(36);
(function(a){function F(a){this.Init(a)}function D(a,c,e,f){this.Init(c,e,f);this.Fa=a}function E(){}function v(){this.Init({alta:v.If})}function x(a,c,e){this.Init(a,c,e)}function f(a,c,e,f,p,n,z,w,v){this.Init(a,c,e,f,p,n,z,w,v)}function c(a){this.JD=a}a.Nh=function(a,c,e){this.Init(a,c,e)};a.f.v(a.Nh,a.ec);a.Nh.newInstance=function(c,e,f){return new a.Nh(c,e,f)};a.Nh.prototype.Init=function(c,e,f){a.Nh.C.Init.call(this,c,e,f);this.a.Gc.ja().setAttributeNS(null,"text-rendering","geometricPrecision");
this.u=new D(this,c,this.Ef,this);this.u.Lf(this);a.m.cb()||this.u.Zr(new F(this.u));this.Ff=new v;this.Pb=[];this.Ev=[];this.ck=null;this.Go=new a.vc(this.a);this.u.gS(this.Go)};a.Nh.prototype.ia=function(c,e,f){isNaN(e)||isNaN(f)||(this.Na=e,this.ab=f);this.CZ();this.ne(c);this.Vq();this.Ji=this.ha;this.aH=this.Pb;this.Pb=[];this.kEa=[];this.ha=new a.ca(this.a);this.B(this.ha);p.ia(this,this.ha,new a.U(0,0,this.Na,this.ab));this.Hb&&this.Hb.Vr(this.J.selection,this.Pv());e=this.J.animationDuration;
f=new a.U(0,0,this.Na,this.ab);this.Ji?"none"!==this.J.animationOnDataChange&&c&&(this.mh=new a.ca(this.a),this.B(this.mh),c=new a.Pl(this.a,this.mh),c.Dn(this.aH,this.Pb),this.Cb=c.vz()):"none"!==this.J.animationOnDisplay&&(this.Cb=a.Ra.YD(this.a,a.Ra.Vz,this.ha,f,e));this.Cb?(this.u.ed(),this.u.kn(this),this.Cb.pg(this.Rya,this),this.Cb.play()):this.Rya();this.ps()};a.Nh.prototype.Dva=function(a){this.Pb=a};a.Nh.prototype.Bi=function(){this.Lc||(this.Lc=new c(this));return this.Lc};a.Nh.prototype.zL=
function(a,c){this.Ev.push(a);this.kEa[c]=a};a.Nh.prototype.Pv=function(){return this.Ev};a.Nh.prototype.gy=function(){return this.kEa};a.Nh.prototype.Zd=function(c){this.J.highlightedCategories=a.bb.clone(c);a.sd.Zd(c,this.Pv(),"any"===this.J.highlightMatch);this.ck&&this.ck.Zd(c)};a.Nh.prototype.select=function(c){this.J.selection=a.bb.clone(c);this.Hb&&this.Hb.Vr(this.J.selection,this.Pv())};a.Nh.prototype.ne=function(c){c?this.J=this.Ff.mo(c):this.J||(this.J=this.dA());c=this.J.selectionMode;
this.Hb="single"===c?new a.Hb(a.Hb.jv):"multiple"===c?new a.Hb(a.Hb.os):null;this.u.Fy(this.Hb);a.m.Hl()||(this.J.animationOnDisplay="none",this.J.animationOnDataChange="none")};a.Nh.prototype.vk=function(){return a.I.Zc(this.A(),"componentName",a.I.pa,"TAG_CLOUD")};a.Nh.prototype.Rya=function(){this.Ji&&(this.removeChild(this.Ji),this.Ji.Ec(),this.Ji=null);this.mh&&(this.removeChild(this.mh),this.mh.Ec(),this.mh=null);this.Cb&&this.u.Lf(this);this.J.highlightedCategories&&0<this.J.highlightedCategories.length&&
this.Zd(this.J.highlightedCategories);this.Bj||this.nl();this.Cb=null;this.Bj=!1};a.Nh.prototype.CZ=function(){this.u.ed();this.Ev.length=0};a.Nh.prototype.Ef=function(c,e){var f=c.type;if("categoryHide"==f||"categoryShow"==f){var p=c.category,v=a.Y.$b(this.J.hiddenCategories,p);"categoryHide"==f&&0>v&&this.J.hiddenCategories.push(p);"categoryShow"==f&&0<=v&&this.J.hiddenCategories.splice(v,1);this.ia(this.J,this.Na,this.ab)}else"categoryHighlight"==f&&(this!=e?this.Zd(c.categories):this.ck&&this.ck!=
e&&this.ck.Ef(c,e));c&&this.dispatchEvent(c)};a.Nh.prototype.e5a=function(a){return this.Hb?a[0]:null};a.Nh.prototype.C2a=function(a){a.gb()||(this.Hb.jn(a,!1),this.u.Du());a=[];for(var c=this.Hb.getSelection(),e=0;e<c.length;e++){var f=c[e];f instanceof x&&a.push(f.getId())}return a};a.Nh.prototype.Rp=function(){for(var a=[],c=this.Hb.getSelection(),e=0;e<c.length;e++)a=a.concat(c[e].Xd());return a};a.Nh.prototype.hn=function(a,c,e){return this.Go.hn(e)};a.Nh.prototype.El=function(a,c){return this.Go.El(a,
c)};a.Nh.prototype.ey=function(a,c){return this.Go.ey(a,c)};a.Nh.prototype.aC=function(a,c){return this.Go.aC(a,c)};a.f.v(c,a.Lc);c.prototype.Ql=function(a){return(a=this.JD.u.Ya(a))&&a instanceof x?"item["+this.JD.gy().indexOf(a)+"]":null};c.prototype.Sh=function(c){if(c==a.Lc.Dw)return this.eA(this.JD);var e=c.indexOf("[");return 0<e&&"item"===c.substring(0,e)&&(c=this.JD.gy()[parseInt(c.substring(e+1,c.length-1))])?c.Xd()[0].ja():null};c.prototype.getItem=function(a){if(a=this.JD.gy()[a]){var c=
{};c.color=a.pi();c.tooltip=a.Eh();c.label=a.ag();c.value=a.getValue();c.selected=a.gb();return c}return null};c.prototype.m4=function(){return this.JD.Pv().length};a.f.v(f,a.Fb);f.wRa=.3;f.xRa=.6;f.kda=0;f.b7=1;f.lda=2;f.prototype.Init=function(a,c,e,p,v,n,z,w,A){f.C.Init.call(this,c,e,p,v,n,A);this.JD=a;this.uz();this.gc.Ma(z);this.gc.sc(w);n&&this.ZBa(n)};f.prototype.hc=function(a){this.wi!=a&&((this.wi=a)?this.xl?this.ub(this.r$):this.ub(this.taa):this.ub(this.qK))};f.prototype.Rc=function(){this.xl||
(this.xl=!0,this.wi?this.ub(this.r$):this.ub(this.Kma))};f.prototype.Cc=function(){this.wi?this.ub(this.taa):this.ub(this.qK);this.xl=!1};f.prototype.Mf=function(c,p){var t=new a.td(this.a,this,e.Lb(this.JD)),v=this.Bd(),y=p.Bd(),n=!1,z=y.N(a.j.od),w=v.N(a.j.od);if(z!=w){var A=this;this.ub(v.Ma(a.j.od,z));t.da.aa(a.L.J8,this,function(){return A.Bd().N(a.j.od)},function(c){A.ub(A.Bd().Ma(a.j.od,c))},w)}y=parseFloat(y.N(a.j.hi));v=parseFloat(v.N(a.j.hi));y!=v&&(n=!0,A=this,this.Ag(y),t.da.aa(a.L.ta,
this,function(){return parseFloat(A.Bd().N(a.j.hi))},this.Ag,v));v=p.rb();y=this.rb();z=p.dl();w=this.dl();if(y!=v||n&&w!=z)w!=z&&(v=f.MTa(p,v,z)),this.na(v),t.da.aa(a.L.ta,this,this.rb,this.na,y);n=p.vb();v=this.vb();v!=n&&(this.Pa(n),t.da.aa(a.L.ta,this,this.vb,this.Pa,v));p.qa(0);c.add(t,f.b7)};f.prototype.ai=function(c){c.add(new a.Wg(this.a,this,e.Lb(this.JD)),f.kda)};f.prototype.nh=function(c){this.qa(0);c.add(new a.dg(this.a,this,e.Lb(this.JD)),f.lda)};f.prototype.Ag=function(a){f.C.Ag.call(this,
a);this.ZBa(this.Bd())};f.prototype.ZBa=function(c){this.qK=c.clone();c=this.qK.N(a.j.od);this.qK.Ma(a.j.ge,null);this.Kma=this.qK.clone();var e=f.qEa(c,f.wRa);this.Kma.Ma(a.j.ge,e);this.Kma.Ma(a.j.od,a.D.Ok(e));this.taa=this.qK.clone();this.taa.Ma(a.j.ge,c);this.taa.Ma(a.j.od,a.D.Ok(c));this.r$=this.qK.clone();c=f.qEa(c,f.xRa);this.r$.Ma(a.j.ge,c);this.r$.Ma(a.j.od,a.D.Ok(c))};f.MTa=function(c,e,f){c=c.kJa();return f==a.M.Fj?e+c.b:f==a.M.ii?e-c.b:e};f.qEa=function(c,e){var f=a.D.mj(c),p=a.D.kj(c),
v=a.D.hj(c);return a.D.sC(Math.floor(255*(1-e)+e*f),Math.floor(255*(1-e)+e*p),Math.floor(255*(1-e)+e*v))};a.f.v(x,a.f);x.prototype.Init=function(c,e,f){this.Fa=c;this.af=e;this.sb=f;this.hD=this.wi=!1;f.url?(e.zg("link"),this.KXa=a.l.Dba("_blank",f.url)):e.zg("img");this.Ro()};x.prototype.getId=function(){return this.sb.id};x.prototype.ag=function(){return this.sb.label};x.prototype.getValue=function(){return this.sb.value};x.prototype.Eh=function(){return this.sb.shortDesc};x.prototype.ph=function(){return this.sb.action};
x.prototype.bf=function(){var a=this.Fa.A().tooltip;return(a=a?a.renderer:null)?this.Fa.a.cf().Rs(a,this.zj()):this.Eh()};x.prototype.zj=function(){return{id:this.getId(),label:this.ag(),color:this.pi(),value:this.getValue()}};x.prototype.Dba=function(){return this.KXa};x.prototype.pi=function(){return this.af.qK.N(a.j.od)};x.prototype.Jn=function(a){this.hD=a};x.prototype.fb=function(){return this.hD};x.prototype.gb=function(){return this.wi};x.prototype.hc=function(a){this.wi=a;this.af.hc(a);this.Ro()};
x.prototype.Rc=function(){this.af.Rc()};x.prototype.Cc=function(){this.af.Cc()};x.prototype.Kd=function(c){var e=this.Fa.u.ya;return c.type==a.MouseEvent.He||e.xo(c)?this:e.Uh(c)?F.Kd(this,c,this.Fa.Pv()):null};x.prototype.md=function(a){return this.af.V(a)};x.prototype.$j=function(){return this.af.ja()};x.prototype.rh=function(){this.Tc=!0;this.Rc()};x.prototype.mf=function(){this.Tc&&(this.Tc=!1,this.Cc())};x.prototype.Ae=function(){return this.Tc};x.prototype.Xd=function(){return[this.af]};x.prototype.te=
function(){var c=[];this.fb()&&c.push(a.I.Ja(a.I.pa,this.gb()?"STATE_SELECTED":"STATE_UNSELECTED"));return a.R.lm(this.Eh(),c)};x.prototype.rd=function(){return this.sb.categories};x.prototype.Ro=function(){a.m.Vj()||this.af.Od("label",this.te())};x.prototype.pk=function(){if(!this.Lp&&(this.Lp=[],this.sb.showPopupBehaviors))for(var c=this.sb.showPopupBehaviors,e=0;e<c.length;e++)this.Lp.push(new a.hb(c[e].popupId,c[e].triggerType,c[e].alignId,c[e].align));return this.Lp};x.prototype.hn=function(a){return this.Fa.e5a(a)};
x.prototype.El=function(){return this.Fa.C2a(this)};x.prototype.Rp=function(){return this.Fa.Rp()};a.f.v(v,a.ka);v.If={animationOnDisplay:"none",animationOnDataChange:"none",emptyText:null,hiddenCategories:[],hideAndShowBehavior:"none",highlightedCategories:[],highlightMatch:"all",hoverBehavior:"none",layout:"rectangular",selectionMode:"none",_statusMessageStyle:new a.j(a.ka.pj+"color: #333333;"),styleDefaults:{animationDuration:500,hoverBehaviorDelay:200,_style:new a.j(a.ka.pj+"color: #333333;")},
touchResponse:"auto"};var p={};a.f.v(p,a.f);p.ia=function(a,c,e){p.Bn(a,c,e);p.Poa(a,c,e);p.cD(e);var f=a.A();f.items&&0<f.items.length?(f=p.o2(a,c,e),0<f.length?(a.Dva(f),a.u.Xr(a.Pv()[0])):p.lu(a,c,e)):p.lu(a,c,e)};p.lu=function(c,e,f){var p=c.A(),v=p.emptyText;v||(v=a.I.Zc(p,"labelNoData",a.I.pa,"NO_DATA",null));a.ga.tm(e,v,new a.U(f.x,f.y,f.b,f.i),c.u,p._statusMessageStyle)};p.Bn=function(c,e,f){c=new a.Rect(c.a,f.x,f.y,f.b,f.i);c.Yb();e.B(c)};p.o2=function(c,e,p){for(var v=c.A(),y=[],n=v.items,
z=Number.MAX_VALUE,w=-Number.MAX_VALUE,A=0;A<n.length;A++)z=Math.min(z,n[A].value),w=Math.max(w,n[A].value);var z=E.R2a(z,w),w=a.Y.VB(v.hiddenCategories),d=a.j.$ba(),g=v.styleDefaults,B=g.svgStyle||g.style;!B||B instanceof Object||(B=a.j.HK(B));for(A=0;A<n.length;A++){var r=n[A];r.categories||(r.categories=[r.label]);if(!w||!a.Y.BI(w,r.categories)){var l=g._style.clone(),C=r.svgStyle||r.style;!C||C instanceof Object||(C=a.j.HK(C));var K=C&&C.color?C.color:r.color?r.color:B&&B.color?B.color:null;if(C=
a.bb.ae(C,B)){for(var D=0;D<d.length;D++){var F=a.j.RD(d[D]);C[F]&&(l.Ma(d[D],C[F]),delete C[F])}delete C.color}K&&l.Ma(a.j.od,K);l.Ma(a.j.hi,z.call(null,r.value).toString());l=new f(c,c.a,r.label,0,0,l,C,r.svgClassName||r.className,r.id);C=new x(c,l,r);c.u.Xb(l,C);c.zL(C,A);"none"!==v.selectionMode&&C.Jn(!0);(C.fb()||r.url||C.ph())&&l.setCursor("pointer");y.push(l);e.B(l)}}0<y.length&&("cloud"===v.layout?E.N0a(p,y):E.D6a(p,y,a.m.ea(c.a)));return y};p.Poa=function(c,e,f){var p=c.A(),v=p.legend;if(v&&
v.sections){v=a.bb.clone(v);v.orientation="horizontal";v.halign="center";v.hoverBehavior=p.hoverBehavior;v.hideAndShowBehavior=p.hideAndShowBehavior;v.hiddenCategories=p.hiddenCategories;p=a.Rf.newInstance(c.a,c.Ef,c);e.B(p);var n=p.ly(v,f.b,f.i/3);p.ia(v,n.b,n.i);a.qj.position(f,"bottom",p,n.b,n.i,0);c.ck&&(c.ck.Ec(),e.removeChild(c.ck));c.ck=p}};p.cD=function(a){a.x=Math.round(a.x);a.y=Math.round(a.y);a.b=Math.round(a.b);a.i=Math.round(a.i)};a.f.v(E,a.f);E.R2a=function(a,c){return function(e){return 12+
Math.ceil(2*(e-a)/(c-a)*12)}};E.N0a=function(c,e){var f=[],p=10/180,v=10/180;c.b>c.i?p*=c.b/c.i:v*=c.i/c.b;for(var n=2*Math.PI/180,z=null,w=0,A=[],d=[],g=0;g<e.length;g++)for(var B=!1,r=0,l=4,C=e[g],x=C.V(),w=Math.max(w,parseFloat(C.Bd().N(a.j.hi))),D=-1;!B;){var E=r%180;void 0===A[E]&&(A[E]=Math.cos(r*n));void 0===d[E]&&(d[E]=Math.sin(r*n));var F=p*r*A[E],ja=v*r*d[E],ea=new a.U(F,ja,x.b,x.i),B=!0;-1!=D&&f[D].ica(ea)&&(B=!1);if(B)for(E=0;E<g;E++)if(f[E].ica(ea)){D=E;B=!1;break}B&&(z=z?z.Gn(ea):ea,
D=-1,f[g]=ea,C.na(F),C.Pa(-x.y+ja));3600===r?l=3:5400===r?l=2:10800===r&&(l=1);r+=l}f=Math.max(z.b/c.b,z.i/c.i);p=z.x+z.b/2;z=z.y+z.i/2;for(E=0;E<e.length;E++)C=e[E],C.na(c.x+C.rb()/f+(c.b/2-p/f)),C.Pa(c.y+C.vb()/f+(c.i/2-z/f)),v=parseFloat(C.Bd().N(a.j.hi)),C.Ag(v/f)};E.D6a=function(c,e,f){for(var p=[],v=0,n=0,z=0,w=0;w<e.length;w++){var A=e[w],d=A.V(),v=Math.max(v,d.b),n=Math.max(n,d.i),z=Math.max(z,parseFloat(A.Bd().N(a.j.hi)));p.push(new a.eg(d.b,d.i))}w=0;for(A=(c.b-10)/v;.001<A-w;)v=(w+A)/2,
z=E.LBa(p,(c.b-10)/v),z.length*(v*n+2)-2>c.i-10?A=v:w=v;v=w;z=E.LBa(p,(c.b-10)/v);z.push(e.length);for(w=0;w<z.length-1;w++){var d=z[w],g=z[w+1],B=0,r=0,l=!0;if(1<g-d){for(var A=0,C=d;C<g;C++)A+=p[C].b*v,r=Math.max(r,p[C].i*v);B=(c.b-10-A)/(g-d-1);w==z.length-2&&(C=.5*r,C<B&&A+(g-d)*C<.9*(c.b-10)&&(B=C,l=!1))}for(var r=5+(w+1)*(n*v+2)-2,x=f?c.b-5:5,C=d;C<g;C++){var A=e[C],D=parseFloat(A.Bd().N(a.j.hi));A.Ag(D*v);A.Pa(c.y+r);l&&C==g-1&&C!=d?f?(A.Ph(),A.na(c.x+5)):(A.dh(),A.na(c.x+c.b-5)):(A.na(c.x+
x),f?(A.dh(),x-=p[C].b*v+B):(A.Ph(),x+=p[C].b*v+B))}}};E.LBa=function(a,c){var e=[0],f=a[0].b+2;if(1<a.length)for(var p=1;p<a.length;p++)f+a[p].b>c&&(e.push(p),f=0),f+=a[p].b+2;return e};var e={};a.f.v(e,a.f);e.Lb=function(a){return a.A().styleDefaults.animationDuration/1E3};a.f.v(D,a.u);D.prototype.iF=function(a){a=this.Ya(a.target);this.uma(a);this.CP(a)};D.prototype.xM=function(a){a=this.Ya(a.target);this.CP(a)};D.prototype.ev=function(a){a=this.Ya(a.target);this.uma(a);this.CP(a)};D.prototype.uma=
function(a){a instanceof x&&(a=a.Dba())&&a.call()};D.prototype.Ul=function(c){var e=!0,f=this.Fe();c.keyCode==a.KeyboardEvent.Mn?this.uma(f):e=D.C.Ul.call(this,c);return e};D.prototype.Ij=function(c,e,f){c=this.Fa.A();"dim"==c.hoverBehavior&&(e=e.rd?e.rd():[],c.highlightedCategories=f?e.slice():null,f=a.la.MI(c.highlightedCategories,f),e=a.Za.Aq(c.styleDefaults.hoverBehaviorDelay),this.pF.Ef(f,this.Fa.Pv(),e,"any"==c.highlightMatch))};D.prototype.CP=function(c){c&&c.ph&&c.ph()&&this.kt(a.la.yy("action",
c.ph(),c.getId()))};D.prototype.Oy=function(){return this.Fa.A().touchResponse};a.f.v(F,a.ya);F.prototype.Init=function(a){F.C.Init.call(this,a)};F.prototype.Iz=function(a){return this.Uh(a)&&!a.ctrlKey};F.prototype.xo=function(c){return c.keyCode==a.KeyboardEvent.Kj&&c.ctrlKey};F.Kd=function(c,e,f){e=e.keyCode==a.KeyboardEvent.Be||e.keyCode==a.KeyboardEvent.kf?!0:!1;c=a.Y.$b(f,c)+(e?1:-1);return c<f.length&&0<=c?f[c]:null};a.f.v(function(){},a.bM);a.K(a,"TagCloud",a.Nh);a.K(a.Nh,"newInstance",a.Nh.newInstance);
a.K(a.Nh.prototype,"render",a.Nh.prototype.ia);a.K(a.Nh.prototype,"getAutomation",a.Nh.prototype.Bi);a.K(a.Nh.prototype,"highlight",a.Nh.prototype.Zd);a.K(a.Nh.prototype,"select",a.Nh.prototype.select);a.K(c.prototype,"getDomElementForSubId",c.prototype.Sh);a.K(c.prototype,"getItem",c.prototype.getItem);a.K(c.prototype,"getItemCount",c.prototype.m4)})(dvt);
  return dvt;
});
