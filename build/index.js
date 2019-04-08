const conf={canvas:{height:150,width:300,style:"border:1px solid green;position:fixed;top:0;left:0"},header:{text:"15px Arial ",x:10,y:20},defaultRefreshTimeMs:1e3},textMarginBottom=40;function MarkChart(e){void 0!==e&&Object.assign(conf,e),this.c=document.createElement("canvas");let t=0;function n(){let e="#";for(let t=0;t<6;t+=1)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}this.c.addEventListener("click",()=>{t+=1,this.measureToViewLabel=void 0,this.update()}),this.select=(e=>{this.measureToViewLabel=e}),this.autorefresh=(e=>{let t=conf.defaultRefreshTimeMs;void 0!==e&&(t=e),window.setInterval(()=>{this.update()},t)}),this.draw=(()=>{this.c.width=conf.canvas.width,this.c.height=conf.canvas.height,this.c.style=conf.canvas.style,document.body.appendChild(this.c)}),this.update=(()=>{const e=this.c.getContext("2d");e.fillStyle="black",e.fillRect(0,0,conf.canvas.width,conf.canvas.height),e.fillStyle="green",e.font=conf.header.text;const a=function(){const e=window.performance.getEntriesByType("measure"),n={};for(const t of e){void 0===n[t.name]&&(n[t.name]={},n[t.name].values=[],n[t.name].min=999999999,n[t.name].max=0),n[t.name].values.push(t.duration);const e=Math.round(t.duration);n[t.name].min=Math.min(e,n[t.name].min),n[t.name].max=Math.max(e,n[t.name].max),n[t.name].name=t.name}let a;if(this.measureToViewLabel)a=n[this.measureToViewLabel];else{console.log(n);const e=Object.keys(n);a=n[e[t%e.length]]}return a}();if(void 0===a)return void e.fillText(`Measure ${this.measureToView} doesn't exist`,conf.header.x,conf.header.y);e.font=conf.header.text;const o=`${a.name} (${a.min} - ${a.max})`;e.fillText(o,conf.header.x,conf.header.y);const i=conf.canvas.width/a.values.length;let s=0;const c=(conf.canvas.height-textMarginBottom)/a.max;for(const t of a.values){e.fillStyle=n();const a=c*t;e.fillRect(s,conf.canvas.height-a,i,a),s+=i}})}