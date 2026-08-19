#!/usr/bin/env node
// usage: validate.js <data.js>   — catches the mistakes that waste screenshot rounds
const fs=require('fs');
const src=fs.readFileSync(process.argv[2],'utf8');
let d;try{d=new Function(src+';return{G,N,COPY,E,STEPS,META}')();}
catch(e){console.error('FAIL parse: '+e.message);process.exit(1);}
const {G,N,COPY,E,STEPS,META}=d,err=[],warn=[];
const ids=new Set(N.map(n=>n.id));
if(N.length<12||N.length>45)warn.push(`${N.length} blocks — aim for 25-40`);
N.forEach(n=>{
  if(!G[n.g])err.push(`${n.id}: unknown lane "${n.g}"`);
  ['w1','h1','f','s'].forEach(k=>{if(!n[k]||!n[k].length)err.push(`${n.id}: missing ${k}`);});
  const c=COPY[n.id];
  if(!c)return err.push(`${n.id}: no COPY entry`);
  if(c.length!==4)err.push(`${n.id}: COPY needs [label, one-liner, why it matters, if it breaks]`);
  if(c[0]&&c[0].length>12)err.push(`${n.id}: block label "${c[0]}" too long (max 12)`);
  if(c[1]&&c[1].length>62)warn.push(`${n.id}: hover line ${c[1].length} chars (max 62)`);
});
Object.keys(COPY).forEach(k=>{if(!ids.has(k))err.push(`COPY has "${k}" but no such block`);});
// footprint overlap — the bug that ruins the drawing and is invisible in code
for(let i=0;i<N.length;i++)for(let j=i+1;j<N.length;j++){const a=N[i],b=N[j];
  if(a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h)err.push(`overlap: ${a.id} and ${b.id}`);}
E.forEach((e,i)=>{['0','1'].forEach(k=>{if(!ids.has(e[k]))err.push(`edge ${i}: unknown block "${e[k]}"`);});});
const has=(a,b)=>E.some(e=>e[0]===a&&e[1]===b);
STEPS.forEach((s,i)=>{
  if(!ids.has(s[0]))err.push(`step ${i+1}: unknown block "${s[0]}"`);
  if(s[2]&&!has(s[2][0],s[2][1]))err.push(`step ${i+1}: edge ${s[2][0]}->${s[2][1]} is not in E`);
  if(!s[1]||s[1].length<20)warn.push(`step ${i+1}: caption is thin`);});
['title','name','tag','run','stats','intro','key','movements','cta','done'].forEach(k=>{
  if(META[k]===undefined)err.push(`META.${k} missing`);});
META.movements.forEach(m=>{if(!ids.has(m[2]))err.push(`movement "${m[0]}" points at unknown block "${m[2]}"`);});
warn.forEach(w=>console.log('warn  '+w));
err.forEach(e=>console.log('ERROR '+e));
console.log(err.length?`\nFAIL — ${err.length} errors, ${warn.length} warnings`
  :`PASS — ${N.length} blocks, ${E.length} edges, ${STEPS.length} steps, ${warn.length} warnings`);
process.exit(err.length?1:0);
