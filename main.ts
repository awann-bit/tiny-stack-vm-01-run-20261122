import{readdirSync as R,readFileSync as r,writeFileSync as w,mkdirSync as m}from'node:fs';
import{join as j}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',T=`!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%"%`,F=[(a,b)=>a+b|0,(a,b)=>a-b|0,(a,b)=>Math.imul(a,b),(a,b)=>(a/b)|0,(a,b)=>a%b|0,(a,b)=>Math.floor((a>>>0)/(b>>>0))|0,(a,b)=>(a>>>0)%(b>>>0)|0,0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31)|0,0,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>a>>>0<b>>>0?1:0];
for(const d of R(I).sort()){
const P=r(j(I,d,'program.bin')),Q=r(j(I,d,'input.bin')),n=P.length,S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),U=new Uint8Array(65536);
let s=0,c=0,l=0,q=0,p=0,t=0,e=0;
for(;;){
if(t==1e6){e=10;break}
if(p<0||p>=n){e=9;break}
const b=P[p],v=b<84?T.charCodeAt(b)-33:-1;
if(v<0){e=5;break}
const im=v>>4,po=(v>>2)&3,pu=v&3;
if(p+im>=n){e=9;break}
t++;const nx=p+1+im;
if(s<po|s-po+pu>256){e=s<po?2:3;break}
p=nx;
if(b==0)break;
else if(b==1)S[s++]=(P[nx-1]<<24)>>24;
else if(b==2)S[s++]=P[nx-4]|P[nx-3]<<8|P[nx-2]<<16|P[nx-1]<<24;
else if(b==3)s--;
else if(b==4){S[s]=S[s-1];s++}
else if(b==5){const x=S[s-1];S[s-1]=S[s-2];S[s-2]=x}
else if(b==6){S[s]=S[s-2];s++}
else if(b==7){const a=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=a}
else if(b==23)S[s-1]=-S[s-1]|0;
else if(b==27)S[s-1]=~S[s-1];
else if(b>=16&&b<=34){const y=S[s-1],a=S[s-2];if(!y&&b>=19&&b<=22){e=4;break}s-=2;S[s++]=F[b-16](a,y)}
else if(b==48)p=nx+((P[nx-2]|P[nx-1]<<8)<<16>>16);
else if(b==49||b==50){const z=S[--s];if((b==49)==(z==0))p=nx+((P[nx-2]|P[nx-1]<<8)<<16>>16)}
else if(b==51){if(c==64){e=7;break}C[c++]=nx;p=P[nx-2]|P[nx-1]<<8}
else if(b==52){if(!c){e=8;break}p=C[--c]}
else if(b==64){const a=S[s-1];if(a<0||a>255){e=6;break}S[s-1]=M[a]}
else if(b==65){const a=S[s-1];if(a<0||a>255){e=6;break}s-=2;M[a]=S[s]}
else if(b==80){const y=String(S[s-1]);if(l+y.length>65536){e=11;break}s--;for(let k=0;k<y.length;k++)U[l++]=y.charCodeAt(k)}
else if(b==81){if(l>=65536){e=11;break}U[l++]=S[--s]&255}
else if(b==82)S[s++]=q<Q.length?Q[q++]:-1;
else if(b==83){e=S[--s]&255;break}
}
m(j(O,d),{recursive:true});w(j(O,d,'stdout.bin'),U.slice(0,l));w(j(O,d,'exit.txt'),e+'\n');
}
