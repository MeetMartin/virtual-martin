"use strict";document.execCommand("defaultParagraphSeparator",!1,"br");var editableMessage="<div class=\"message\">\n     <div class=\"arrow\">></div>\n     <div class=\"text\" contenteditable=\"true\"></div>\n     <div class=\"send\">[ Send ]</div>\n   </div>",newResponse="<div class=\"message ai\"><div class=\"text\"><span class=\"typing\"></span></div></div>",focus=function(a){return setTimeout(function(){return a.focus()},0)},scrollToBottom=function(a){return a.scrollTop=a.scrollHeight},sendMessage=function(a){a&&($("div[contenteditable=true]").attr("contenteditable","false"),$(".send").text("[ Sending... ]"),$.post("/api/query",{message:a}).done(function(a){var b=$(newResponse);if($("#messages").append(b),typing(b,a.response),$(".send").remove(),a.payload){console.log("query:",a.query),console.log("  response:",a.response);var c=a.payload[0].queryResult.intent;console.log("  intent:",c?c.displayName:"unknown")}}).fail(function(a){console.log("error",a),addEditableMessage()}))},sendMenuMessage=function(a){return $("div[contenteditable=true]").text(a),sendMessage(a)},addEditableMessage=function(){var a=$(editableMessage).on("keydown",function(a){return 13===a.keyCode?sendMessage(a.target.innerText):""});$("#messages").append(a),scrollToBottom($("#messages").get(0)),focus(document.querySelector("div[contenteditable=true]")),$(".send").on("click",function(a){return sendMessage($(a.target).parent().find(".text").text())})};addEditableMessage();var stripHTML=function(a){var b=new DOMParser().parseFromString(a,"text/html");return b.body.textContent||""},typing=function(a,b){if(a.length&&b){var c=a.find(".typing"),d=stripHTML(b),e=c.text();e===d?(a.find(".text").html(b),addEditableMessage()):(c.text(d.substr(0,e.length+1)),scrollToBottom($("#messages").get(0)),setTimeout(function(){return typing(a,b)},20))}};
'use strict';var isBrowser={opera:!!window.opr&&!!opr.addons||!!window.opera||0<=navigator.userAgent.indexOf(' OPR/'),firefox:'undefined'!=typeof InstallTrigger,safari:/^((?!chrome|android).)*safari/i.test(navigator.userAgent),ie:!!document.documentMode,chrome:!!window.chrome&&!!window.chrome.webstore};isBrowser.edge=!isBrowser.ie&&!!window.StyleMedia,isBrowser.blink=(isBrowser.chrome||isBrowser.opera)&&!!window.CSS;
"use strict";var pipe=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return b.reduceRight(function(a,b){return function(){return a(b.apply(void 0,arguments))}})},configuration={idealNumNodes:100,maxExtraEdges:20,radiiWeightPower:.5,driftSpeed:1,repulsionForce:.6},getIdealNumNodes=function(){return parseInt(configuration.idealNumNodes,10)},getMaxExtraEdges=function(){return Math.round(parseFloat(configuration.idealNumNodes)/100*configuration.maxExtraEdges)},getRadiiWeightPower=function(){return parseFloat(configuration.radiiWeightPower)},getDriftSpeed=function(){return 1e-4*parseFloat(configuration.driftSpeed)},getRepulsionForce=function(){return 1e-6*parseFloat(configuration.repulsionForce)},BORDER_FADE=-.02,FADE_IN_RATE=.06,FADE_OUT_RATE=.03,FRAME_INTERVAL=40;initialize();function initialize(){function a(){g=updateNodes(e,f,g),h=updateEdges(g,h),redrawOutput(c,g,h)}var b=Math.max,c=document.querySelector("#background"),d=c.getBoundingClientRect(),e=d.width/b(d.width,d.height),f=d.height/b(d.width,d.height);c.setAttribute("viewBox","0 0 "+e+" "+f),c.querySelector("rect").setAttribute("x",(e-1)/2),c.querySelector("rect").setAttribute("y",(f-1)/2),isBrowser.safari||c.querySelector("g").setAttribute("filter","url(#blurMe)"),"hypot"in Math||(Math.hypot=function(a,b){return Math.sqrt(a*a+b*b)});var g=[],h=[];a();for(var j=0;300>j;j++)doForceField(g);h=[],a(),g.concat(h).forEach(function(a){a.opacity=1}),redrawOutput(c,g,h),isBrowser.firefox||setInterval(a,FRAME_INTERVAL)}function updateNodes(a,b,c){var d=[];c.forEach(function(c,e){c.posX+=c.velX*getDriftSpeed(),c.posY+=c.velY*getDriftSpeed(),c.velX=.99*c.velX+.3*(Math.random()-.5),c.velY=.99*c.velY+.3*(Math.random()-.5),c.opacity=e>=getIdealNumNodes()||c.posX<BORDER_FADE||a-c.posX<BORDER_FADE||c.posY<BORDER_FADE||b-c.posY<BORDER_FADE?Math.max(c.opacity-FADE_OUT_RATE,0):Math.min(c.opacity+FADE_IN_RATE,1),0<c.opacity&&d.push(c)});for(var e=d.length;e<getIdealNumNodes();e++)d.push({posX:Math.random()*a,posY:Math.random()*b,radius:.002*Math.random()+.004,velX:0,velY:0,opacity:0});return doForceField(d),d}function doForceField(a){for(var b=[],c=0;c<2*a.length;c++)b.push(0);for(var d,c=0;c<a.length;c++){d=a[c];for(var e=0;e<c;e++){var f=a[e],g=d.posX-f.posX,h=d.posY-f.posY,i=g*g+h*h,j=getRepulsionForce()/(Math.sqrt(i)*(i+1e-5));g*=j,h*=j,b[2*c+0]+=g,b[2*c+1]+=h,b[2*e+0]-=g,b[2*e+1]-=h}}for(var c=0;c<a.length;c++)a[c].posX+=b[2*c+0],a[c].posY+=b[2*c+1]}function updateEdges(a,b){for(var c,d=calcAllEdgeWeights(a),e=calcSpanningTree(d,a),f=0;f<d.length&&e.length<a.length-1+getMaxExtraEdges();f++)c={nodeA:a[d[f][1]],nodeB:a[d[f][2]]},containsEdge(e,c)||e.push(c);d=null;var g=[];b.forEach(function(a){a.opacity=containsEdge(e,a)?Math.min(a.opacity+FADE_IN_RATE,1):Math.max(a.opacity-FADE_OUT_RATE,0),0<a.opacity&&0<a.nodeA.opacity&&0<a.nodeB.opacity&&g.push(a)});for(var c,f=0;f<e.length&&g.length<a.length-1+getMaxExtraEdges();f++)c=e[f],containsEdge(g,c)||(c.opacity=0,g.push(c));return g}function redrawOutput(a,b,c){for(var d=Math.min,e=a.querySelector("g");null!=e.firstChild;)e.removeChild(e.firstChild);b.forEach(function(b){var c=document.createElementNS(a.namespaceURI,"circle");c.setAttribute("cx",b.posX),c.setAttribute("cy",b.posY),c.setAttribute("r",b.radius),c.setAttribute("fill","rgba(255, 222, 189,"+b.opacity.toFixed(3)+")"),e.appendChild(c)}),c.forEach(function(b){var c=b.nodeA,f=b.nodeB,g=c.posX-f.posX,h=c.posY-f.posY,i=Math.hypot(g,h);if(i>c.radius+f.radius){g/=i,h/=i;var j=d(d(c.opacity,f.opacity),b.opacity),k=document.createElementNS(a.namespaceURI,"line");k.setAttribute("x1",c.posX-g*c.radius),k.setAttribute("y1",c.posY-h*c.radius),k.setAttribute("x2",f.posX+g*f.radius),k.setAttribute("y2",f.posY+h*f.radius),k.setAttribute("stroke","rgba(255, 222, 189,"+j.toFixed(3)+")"),e.appendChild(k)}})}function calcAllEdgeWeights(a){for(var b,c=[],d=0;d<a.length;d++){b=a[d];for(var e=0;e<d;e++){var f=a[e],g=Math.hypot(b.posX-f.posX,b.posY-f.posY);g/=Math.pow(b.radius*f.radius,getRadiiWeightPower()),c.push([g,d,e])}}return c.sort(function(c,a){var b=c[0],d=a[0];return b<d?-1:b>d?1:0}),c}function calcSpanningTree(a,b){for(var c=[],d=new DisjointSet(b.length),e=0;e<a.length&&c.length<b.length-1;e++){var f=a[e],g=f[1],h=f[2];d.mergeSets(g,h)&&c.push({nodeA:b[g],nodeB:b[h]})}return c}function containsEdge(a,b){for(var c,d=0;d<a.length;d++)if(c=a[d],c.nodeA==b.nodeA&&c.nodeB==b.nodeB||c.nodeA==b.nodeB&&c.nodeB==b.nodeA)return!0;return!1}function DisjointSet(a){function b(a){return c[a]!=a&&(c[a]=b(c[a])),c[a]}for(var c=[],d=[],e=0;e<a;e++)c.push(e),d.push(0);this.mergeSets=function(a,e){var f=b(a),g=b(e);if(f==g)return!1;var h=d[f]-d[g];return 0<=h?(0==h&&d[f]++,c[g]=f):c[f]=g,!0}}