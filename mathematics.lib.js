const math={
    /*コンピューターならではの関数*/
  primeNumbers(a){
      if(!a){
          a=500;
      }
      let found=0;
      let res=[];
      let x=1;
      while(found<a){
          x++;
          let ans=[];
          let k=0;
          while(ans.length<2){
              k++;
      if(x/k==Math.trunc(x/k)){
        ans.push(k);
      }
    }
          if(ans[1]==x){
          res.push(x);
          found++;
          }
      }
      return res;
  },
  prime(a){
      let res=this.primeNumbers(a);
      return res[a-1];
  },
  chance(a){
    if(Math.random()*100<=a){
        return true;
        }else{
        return false;
     }
  },
    hsl2rgb(h,s,l){
        h=this.mod(h,360);
        const H=h/60;
        const C=(1-Math.abs(2*l-1))*s;
        const X=C*(1-Math.abs(math.mod(H,2)-1));
        const m=l-C/2;
        if(h<60){
            return [m+C,m+X,m];
        }else if(h<120){
            return [m+X,m+C,m];
        }else if(h<180){
            return [m,m+C,m+X];
        }else if(h<240){
            return [m,m+X,m+C];
        }else if(h<300){
            return [m+X,m,m+C];
        }else{
            return [m+C,m,m+X];
        }
    },
    rand(min,max){
        return Math.random()*(max-min)+min;
    },
    randInt(min,max){
        return Math.floor(this.rand(min,max+1));
    },
    randSign(){
        return (-1)**this.randInt(0,1);
    },
    triangle(a){
        return Math.abs(Math.round(a)-a);
    },
    /*三角関数*/
  csc(a){
  return 1/Math.sin(a);
  },
  sec(a){
  return 1/Math.cos(a);
  },
  cot(a){
  return 1/Math.tan(a);
  },
    acsc(a){
        return Math.asin(1/a);
    },
    asec(a){
        return Math.acos(1/a);
    },
    acot(a){
        return (Math.PI/2)-Math.atan(a);
    },
    acsch(a){
        return Math.asinh(1/a);
    },
    asech(a){
        return Math.acosh(1/a);
    },
    acoth(a){
        return Math.atanh(1/a);
    },
    /*基本関数*/
    log(n,x){
        return Math.log(x)/Math.log(n);
    },
    ln(n){
        return Math.log1p(n-1);
    },
  sum(n,N,callback){
    let res=0;
    for(let loop=n; loop<=N; ++loop){
        res+=callback(loop);
    }
  return res;
},
prod(n,N,callback){
    let res=1;
    for(let loop=n; loop<=N; ++loop){
        res=res*callback(loop);
    }
  return res;
},
fact(a){
  if(a==Math.round(a) && a>=0){
  return this.prod(1,a,k=>k);
  }else{
  return this.gamma(a+1);
  }
},
gamma(a,b){
  if(!b){
    b=20;
  }
if(a>=1){
  return this.int(0,b,x=>Math.pow(x,a-1)*Math.exp(-x),500);
    }else{
    return this.gamma(a+1)/a;
    }
},
    mean(...args){
  let ans=0;
  for(const a of args){
    ans+=eval(a);
  }
  return ans/args.length;
},
geomean(...args){
  let ans=1;
  for(const a of args){
    ans=ans*eval(a);
  }
  return Math.pow(ans,1/args.length);
},
  median(...args){
    return (args[Math.floor((args.length-1)/2)]+args[Math.ceil((args.length-1)/2)])/2;
  },
    divisor(N){
    if(N!=Math.trunc(N)){
      console.error("小数に対応していません");
    }
    let ans=[];
    for(let k=1; k<=N; ++k){
      if(N/k==Math.trunc(N/k)){
        ans.push(k);
      }
    }
    return ans;
  },
  mod(a,b){
    return a-(b*Math.floor(a/b));
  },
  quartile(a){
    let mid1=(a.length+1)/2;
    let mid2=(a.length+1)/2;
    if(mid1!=Math.trunc(mid1)){
    mid1=mid1+0.5;
    mid2=mid2-0.5;
    }
    return [this.median(a.slice(0,mid1-1)),this.median(a),this.median(a.slice(mid2,a.length))];
  },
  syntax(f,vars,varsnum){
      for(let index=0; index<vars.length; ++index){
      f=f.replaceAll(vars[index],varsnum[index]);
          }
      f=f.replaceAll("--","+");
      return eval(f);
  },
/*場合の数*/
nPr(n,r){
  return this.fact(n)/this.fact(n-r);
},
nCr(n,r){
  return this.fact(n)/(this.fact(r)*this.fact(n-r));
},
nSk1(n,k){
if(k>n){
console.error("invalid input!");
return;
}
if(k==0){
return 0;
}else if(k==1){
return this.fact(n-1);
}else if(n==k){
return 1;
}else{
return this.nSk1(n-1,k-1)+(n-1)*this.nSk1(n-1,k)
}
},
nSk2(n,k){
    let res=0;
    for(let m=1; m<=k; ++m){
        res+=Math.pow(-1,k-m)*this.nCr(k,m)*Math.pow(m,n);
    }
    return res/this.fact(k);
},
    /*微分積分学*/
  euler(term,x,y,h,f){
    let Yarray=[y];
    function F(x,y){
      return eval(f);
    }
    for(let n=1; n<=term; ++n){
      Yarray[n]=Yarray[n-1]+h*F(x,Yarray[n-1]);
      x+=h;
    }
    return Yarray[term];
  },
  trapezoidal(a,b,f,n){
    if(!n){
    n=10001;
    }
    function F(x){
      return eval(f);
    }
    let an=[a];
    for(let i=1; i<=n; ++i){
      an[i]=an[i-1]+((b-a)/n);
    }
    let ans=0;
    for(let k=1; k<=n; ++k){
      ans+=(an[k]-an[k-1])*(F(an[k])+F(an[k-1]))/2;
    }
    return ans;
  },
  int(a,b,callback,mix){
    if(!mix){
    return ((b-a)/6)*(callback(a)+4*callback((a+b)/2)+callback(b));
    }else{
    if(mix/2!=Math.ceil(mix/2)){
      mix=2*Math.ceil(mix/2);
    }
    let an=[0];
    let h=(b-a)/mix;
    for(let i=1; i<mix; ++i){
      an[i]=a+i*h;
    }
    let ans1=0;
    for(let i=1; i<=mix/2-1; ++i){
      ans1+=callback(an[2*i]);
    }
    let ans2=0;
    for(let i=1; i<=mix/2; ++i){
      ans2+=callback(an[2*i-1]);
    }
    return (h/3)*(callback(a)+2*ans1+4*ans2+callback(b));
    }
  },
    /*近似的な微分を計算する*/
    d(X,callback,n,h){
        let res=0;
        if(!n){
        /*何回微分するか*/
        n=1;
            }
        if(!h){
        /*コンピュータに教える極めて0に近い数字は任意に変更可能。デフォで1/100000*/
        h=0.000001;
            }
        /*中心差分近似法を用いる*/
        res=(callback(X+h)-callback(X-h))/(2*h);
        //res=(f(X+h)-f(X))/(h);
        return res;
    },
    newton(Function,init,h){
        let res=init;
        function f(x){
            return eval(Function);
        }
        for(let k=0; k<h; ++k){
            res=res-(f(res)/this.d(res,Function));
        }
        return res;
    },
    Rd(X,Y,which,F,h){
        let res=0;
        if(!h){
        h=0.000001;
            }
        if(which=="x"){
        function f(x){
            var y=Y;
            return eval(F);
        }
        res=(f(X+h)-f(X-h))/(2*h);
        }
        if(which=="y"){
        function f(y){
            var x=X;
            return eval(F);
        }
        res=(f(Y+h)-f(Y-h))/(2*h);
        }
        return res;
    },
    beta(a,b){
        return this.int(0,1,`Math.pow(x,${a-1})*Math.pow(1-x,${b}-1)`);
    },
    zeta(s,n){
        if(s==0){
            return -1/2;
        }else if(s==2){
            return Math.pow(Math.PI,2)/6;
        }else{
        if(!n){
            n=10000;
        }
        return this.sum(1,n,`1/Math.pow(k,${s})`);
        }
    },
    multiZeta(a,precision){
        if(!precision){
            //precision=5000*Math.pow(2/25,a.length-2);
            if(a.length<=1){
                precision=10000;
            }
            if(a.length==2){
                precision=5000;
            }
            if(a.length==3){
                precision=400;
            }
            if(a.length>=4){
                precision=125;
            }
            //console.log(precision)
        }
        if(precision<5000){
            console.log("precisionが5000以下では精度がかなり悪いです。");
        }
        let R=0;
        let totaloop=0;
        let k=[];
        function sumation(n){
            let res=0;
            if(n==a.length){
                    let product=1;
                    for(let i=0; i<a.length; ++i){
                        product=product*(k[i]**a[i]);
                    }
                    res+=1/product;
                R+=res;
                return;
            }
            if(n==0){
                k[n]=1;
            }else{
                k[n]=k[n-1]+1;
            }
            while(k[n]<=precision){
                if(n>a.length){
                    break;
                }
                sumation(n+1);
                k[n]++;
                totaloop++;
            }
        }
        sumation(0);
        //console.log(totaloop);
        return R;
    },
    /*特殊関数*/
  B(N){
      if(N==0){
        return 1;
      }
      let ans=0;
      for(let k=0; k<N; ++k){
        ans+=this.nCr(N+1,k)*this.B(k);
      }
      return (-1/(N+1))*ans;
  },
    W0(x,n){
        if(!n){
        n=7;
        }
        let o=0;
        for(let i=0; i<=n; ++i){
        for(let j=1; j<=n; ++j){
            o+=(Math.pow((-1),i)*this.nSk1(i+j,i+1)*Math.pow(this.ln(x),-i-j)*Math.pow(this.ln(this.ln(x)),j))/this.fact(j);
        }
        }
        return this.ln(x)-this.ln(this.ln(x))+o;
    },
    dfact(x){
        if(Math.round(x)==x){
            if(x-2*Math.floor(x/2)==0){
                return this.prod(1,x/2,"2*k");
            }else{
                return this.prod(1,(x+1)/2,"2*k-1");
            }
        }else{
            console.error("整数のみしか入力できません！");
        }
    },
    factpow(x,n){
        return this.prod(1,n,k=>x+k-1);
    },
    F(a,b,c,z,n){
        if(!n){
            n=50;
        }
        return this.sum(0,n,k=>this.factpow(a,k)*this.factpow(b,k)*Math.pow(z,k)/(this.factpow(c,k)*this.fact(k)));
    },
    /*集合論*/
    union(...sets){
        let res=[];
        for(let n=0; n<sets.length; ++n){
        for(let k=0; k<sets[n].length; ++k){
            if(res.indexOf(sets[n][k])==-1){
            res.push(sets[n][k]);
            }
        }
        }
        return res;
    },
    intersection(...sets){
        let val="";
        if(sets.length>2){
            let A=sets.slice(2);
            for(let n=0; n<A.length; ++n){
            val+="[";
            for(let k=0; k<A[n].length; ++k){
                val+=A[n][k];
                if(k+1<A[n].length){
                    val+=",";
                    }
            }
            val+="]";
                if(n+1<A.length){
                    val+=",";
                }
            }
            sets=sets.slice(0,2);
        }
        let res=[];
        for(let n=0; n<sets.length; ++n){
        for(let k=0; k<sets[n].length; ++k){
        for(let N=0; N<sets.length; ++N){
            if(n!=N){
        for(let K=0; K<sets[N].length; ++K){
            if(sets[N][K]==sets[n][k]){
                if(res.indexOf(sets[n][k])==-1){
                res.push(sets[n][k]);
                    }
            }
        }
                }
        }
        }
        }
        if(val!=""){
            res=eval(`this.intersection(res,${val})`);
        }
        return res;
    },
    difference(U,set){
        let res=[];
        for(let k=0; k<set.length; ++k){
            if(set.indexOf(U[k])==-1){
                res.push(U[k]);
            }
        }
        return res;
    },
    //数学記述言語の操作
    parseTex(string){
        while(string.indexOf(`\left`)!=-1){
            let id=string.indexOf(`\left`);
        if(isFinite(string[id-1])){
            //あきらめ
        }
        }
        return string.replaceAll(`\\cdot`,"*");
    },
    toTex(string){
        let tex=string;
        tex=tex.replaceAll(`m.`,`\\`).replaceAll(`Math.`,`\\`);
        tex=tex.replaceAll("/",`\\frac{${tex[tex.indexOf("/")-1]}}{${tex[tex.indexOf("/")+1]}}`);
        tex=tex.replaceAll(`*`,`\\cdot`).replaceAll(`(`,`\\left(`).replaceAll(`)`,`\\right)`);
        console.log(tex);
        return tex;
    }
}
class complex{
    constructor(real,imag){
        this.real=real;
        this.imag=imag;
    }
    get abs(){
        return Math.hypot(this.real,this.imag);
    }
    get arg(){
        return Math.atan2(this.imag,this.real);
    }
    get angle(){
        return 180*(this.arg/Math.PI+1);
    }
    get conjugation(){
        return new complex(this.real,-this.imag);
    }
}
class complexMath{
    z(real,imag){
        return new complex(real,imag);
    }
    polar(radius,theta){
        return new complex(radius*Math.cos(theta),radius*Math.sin(theta));
    }
    arg(z){
        return z.arg;
    }
    abs(z){
        return z.abs;
    }
    conjugation(z){
        return z.conjugation;
    }
    sum(z,c){
        return this.z(z.real+c.real,z.imag+c.imag);
    }
    dec(z,c){
        return this.z(z.real-c.real,z.imag-c.imag);
    }
    prod(z,c){
        return this.polar(z.abs*c.abs,z.arg+c.arg);
    }
    quot(z,c){
        return this.prod(z,this.pow(c,this.z(-1,0)));
    }
    exp(z){
        return this.polar(Math.exp(z.real),z.imag);
    }
    ln(z){
        return this.z(Math.log(z.abs),z.arg);
    }
    pow(z,c){
        if(z.abs==0){
            return this.z(0,0);
        }
        return this.exp(this.prod(c,this.ln(z)));
    }
    log(z,c){
        return this.quot(this.ln(c),this.ln(z));
    }
    sin(z){
        return this.quot(this.dec(this.exp(this.prod(this.z(0,1),z)),this.exp(this.prod(this.z(0,-1),z))),this.z(0,2));
    }
    sinzmc(z){
        let res=this.z(0,0);
        for(let k=0; k<10; ++k){
            res=this.sum(res,this.prod(this.z(Math.pow(-1,k),0),this.quot(this.pow(z,this.z(2*k+1,0)),this.z(math.fact(2*k+1),0))));
        }
        return res;
    }
    cos(z){
        return this.quot(this.sum(this.exp(this.z(-z.imag,z.real)),this.exp(this.z(z.imag,-z.real))),this.z(2,0));
    }
    tan(z){
        return this.quot(this.sin(z),this.cos(z));
    }
    mandelbrot(z,n){
        let c=this.z(0,0);
        for(let k=0; k<n; ++k){
            c=this.sum(this.pow(c,this.z(2,0)),z);
        }
        return c;
    }
}
class quaternion{
    constructor(real,i,j,k){
        if(!real){
            real=0;
        }
        if(!i){
            i=0;
        }
        if(!j){
            j=0;
        }
        if(!k){
            k=0;
        }
        this.real=real;
        this.i=i;
        this.j=j;
        this.k=k;
    }
    get imag(){
        return new vector(this.i,this.j,this.k);
    }
    get vector(){
        //単位ベクトル
        return new vector(this.i/this.imag.length,this.j/this.imag.length,this.k/this.imag.length);
    }
    get abs(){
        return Math.hypot(this.real,this.imag.length);
    }
    get arg(){
        return Math.atan2(this.imag.length,this.real);
    }
    get arg3(){
        return [Math.atan2(this.i,this.real),Math.atan2(this.j,this.real),Math.atan2(this.k,this.real)];
    }
    get angle(){
        return 180*(this.arg/Math.PI);
    }
    get conjugation(){
        return new quaternion(this.real,-this.i,-this.j,-this.k);
    }
}
var mathtmp=[];
complex.prototype.valueOf = function() {
  mathtmp[mathtmp.length] = this;
  return 3;
};
quaternion.prototype.valueOf = function() {
  mathtmp[mathtmp.length] = this;
  return 3;
};
class quaternionMath{
    real(n){
        return new quaternion(n);
    }
    i(n){
        return new quaternion(0,n);
    }
    j(n){
        return new quaternion(0,0,n);
    }
    k(n){
        return new quaternion(0,0,0,n);
    }
    //演算子
    f(v){
        var res;
    if(v==6){
      res = this.sum(mathtmp[0],mathtmp[1]);
    }
        if(v==0){
      res = this.dec(mathtmp[0],mathtmp[1]);
    }
        if(v==9){
      res = this.prod(mathtmp[0],mathtmp[1]);
    }
        if(v==1){
      res = this.quot(mathtmp[0],mathtmp[1]);
    }
        if(v==27){
      res = this.pow(mathtmp[0],mathtmp[1]);
    }
  mathtmp = [];
  return res;
    }
    //オイラー角->単位四元数
    fromEular(v){
        //xz->xy->yz順
        
    }
    //単位四元数->オイラー角
    toEular(q){
        //XYZ系
        var eular=[];
        eular.push(Math.atan2(2*(q.real*q.i+q.j*q.k),1-2*(Math.pow(q.i,2)+Math.pow(q.j,2))));
        eular.push(Math.asin(2*(q.real*q.j-q.i*q.k)));
        eular.push(Math.atan2(2*(q.real*q.k+q.i*q.j),1-2*(Math.pow(q.j,2)+Math.pow(q.k,2))));
        return eular;
    }
    //4次元
    fromExpandedEular(v){
        //xz->xy->yz->xw->yw->zw順
        
    }
    rotationMatrix3(q){
        const an=this.toEular(q);
        //XYZ系
        const Ryz=mat.rotationMatrix(4,[1,4],an[0]);
        const Rxz=mat.rotationMatrix(4,[2,4],an[1]);
        const Rxy=mat.rotationMatrix(4,[3,4],an[2]);
        return mat.prod(mat.prod(Ryz,Rxz),Rxy);
    }
    LR(Q,qw){
        const a=Q.real;
        const b=Q.i;
        const c=-Q.j;
        const d=Q.k;
        const p=qw.real;
        const q=qw.i;
        const r=-qw.j;
        const s=qw.k;
        const L=[
            [a,-b,-c,-d],
            [b,a,-d,c],
            [c,d,a,-b],
            [d,-c,b,a]
        ];
        const R=[
            [p,-q,-r,-s],
            [q,p,s,-r],
            [r,-s,p,q],
            [s,r,-q,p]
        ];
        return mat.prod(L,R);
    }
    rotationMatrix(Q,qw){
        const w=Q.real;
        const x=Q.i;
        const y=-Q.j;
        const z=Q.k;
        const W=qw.real;
        const X=qw.i;
        const Y=-qw.j;
        const Z=qw.k;
        //エルフリンコフ・ローゼン法
        //左傾斜回転と右傾斜回転に分解する。
        //左手座標系
        const R4=[
            [w*W+x*X+y*Y+z*Z,w*X-x*W-y*Z+z*Y,w*Y-y*W+x*Z-z*X,w*Z-z*W-x*Y+y*X],
            [-w*X+x*W-y*Z+z*Y,w*W+x*X-y*Y-z*Z,-w*Z-z*W+x*Y+y*X,w*Y+y*W+x*Z+z*X],
            [-w*Y+y*W+x*Z-z*X,w*Z+z*W+x*Y+y*X,w*W-x*X+y*Y-z*Z,-w*X-x*W+y*Z+z*Y],
            [-w*Z+z*W-x*Y+y*X,-w*Y-y*W+x*Z+z*X,w*X+x*W+y*Z+z*Y,w*W-x*X-y*Y+z*Z]
        ];
        //return R4;
        const R=[
            [R4[1][1],R4[1][2],R4[1][3],R4[1][0]],
            [R4[2][1],R4[2][2],R4[2][3],R4[2][0]],
            [R4[3][1],R4[3][2],R4[3][3],R4[3][0]],
            [R4[0][1],R4[0][2],R4[0][3],R4[0][0]]
        ];
        return R;
        /*[R[0][0],-R[1][0],R[2][0],R[0][3]],
            [-R[0][1],R[1][1],-R[2][1],R[1][3]],
            [R[0][2],-R[1][2],R[2][2],R[2][3]],
            [R[3][0],R[3][1],R[3][2],R[3][3]]*/
        return [
            [R[0][0],R[0][1],R[0][2],-R[0][3]],
            [R[1][0],R[1][1],R[1][2],R[1][3]],
            [R[2][0],R[2][1],R[2][2],-R[2][3]],
            [-R[3][0],R[3][1],-R[3][2],R[3][3]]
        ];
    }
    //単位四元数の対->6平面オイラー角
    toExpandedEular(Q,q){
        const w=Q.real;
        const x=Q.i;
        const y=Q.j;
        const z=Q.k;
        const W=q.real;
        const X=q.i;
        const Y=q.j;
        const Z=q.k;
        //const m02=w*Y+y*W+x*Z+z*X;
        const m03=-w*X+x*W-y*Z+z*Y;
        const m13=-w*Y+y*W+x*Z-z*X;
        const m23=-w*Z+z*W-x*Y+y*X;
        const m22=w*W-x*X-y*Y+z*Z;
        const m33=w*W+x*X+y*Y+z*Z;
        const m12=-w*X-x*W+y*Z+z*Y;
        const m20=-w*Y-y*W+x*Z+z*X;
        const m21=w*X+x*W+y*Z+z*Y;
        //IOPXYZ系(I->xw O->yw P->zw)
        const P=Math.asin(-m23);
        const sinO=(m13*(Math.tan(P)/m23));
        const O=Math.asin(sinO);
        const cosI=m33/(Math.cos(O)*Math.cos(P));
        const sinI=-m03/(Math.cos(O)*Math.cos(P));
        const I=Math.atan2(sinI,cosI);
        const ax=Math.atan(-(m12*Math.cos(P))/(m22*Math.cos(O))-Math.tan(O)*Math.sin(P));
        const cosY=m22/(Math.cos(P)*Math.cos(ax));
        const sinY=(m12-cosY*(Math.sin(I)*Math.sin(O)*Math.sin(X)-Math.sin(I)*Math.cos(O)*Math.sin(P)*Math.cos(X)))/(Math.cos(I));
        const ay=Math.atan2(sinY,cosY);
        const u=Math.cos(ax)*Math.sin(ay);
        const az=Math.acos((Math.sin(ax)*m21+u*m20)/(Math.cos(P)*(Math.pow(u,2)+Math.pow(Math.sin(ax),2))));
        return [I,O,P,ax,ay,az];
    }
    q(real,i,j,k){
        return new quaternion(real,i,j,k);
    }
    vecq(r,v){
        return new quaternion(r,v.x,v.y,v.z);
    }
    polar(radius,vector,theta){
        const v=vector.length;
        vector.x=vector.x/v;
        vector.y=vector.y/v;
        vector.z=vector.z/v;
        return new quaternion(radius*Math.cos(theta),radius*vector.x*Math.sin(theta),radius*vector.y*Math.sin(theta),radius*vector.z*Math.sin(theta));
    }
    arg(q){
        return q.arg;
    }
    abs(q){
        return q.abs;
    }
    sum(q,p){
        return this.q(q.real+p.real,q.i+p.i,q.j+p.j,q.k+p.k);
    }
    dec(q,p){
        return this.q(q.real-p.real,q.i-p.i,q.j-p.j,q.k-p.k);
    }
    prod(q,p){
        if(Number.isFinite(p)){
            return this.vecq(q.real*p,vec3.prod(q.imag,p));
        }
        return this.vecq(q.real*p.real-vec3.dot(q.imag,p.imag),vec3.sum(vec3.sum(vec3.prod(p.imag,q.real),vec3.prod(q.imag,p.real)),vec3.cross(q.imag,p.imag)));
    }
    exp(q){
        return this.polar(Math.exp(q.real),q.vector,q.imag.length);
    }
    ln(q){
        const l=Math.log(q.abs+0.0000000000001);
        return this.q(l,q.vector.x*q.arg,q.vector.y*q.arg,q.vector.z*q.arg);
    }
    pow(q,p){
    if(q.abs==0){
        return q;
    }else{
        if(Number.isFinite(q) && Number.isFinite(p)){
            return this.q(Math.pow(q,p),0,0,0);
        }
        if(!Number.isFinite(q) && !Number.isFinite(p) && q.imag.length==0 && p.imag.length==0){
            return this.q(Math.pow(q.real,p.real),0,0,0);
        }
        if(!Number.isFinite(q) && q.imag.length==0 && Number.isFinite(p)){
            return this.q(Math.pow(q.real,p),0,0,0);
        }
        if(!Number.isFinite(p) && Number.isFinite(q) && p.imag.length==0){
            return this.q(Math.pow(q,p.real),0,0,0);
        }
        if(Number.isFinite(q)){
            return this.exp(this.prod(p,this.q(Math.log(q),0,0,0)));
        }
        if(Number.isFinite(p)){
            return this.exp(this.prod(this.q(p,0,0,0),this.ln(q)));
        }
        if(q.imag.length==0){
            return this.exp(this.prod(p,this.q(Math.log(q.real),0,0,0)));
        }
        if(p.imag.length==0){
            return this.exp(this.prod(this.q(p.real,0,0,0),this.ln(q)));
        }
        return this.exp(this.prod(p,this.ln(q)));
    }
    }
    quot(q,p){
        if(Number.isFinite(p)){
            return this.prod(q,this.q(1/p,0,0,0));
        }
        if(p.imag.length==0){
            return this.prod(q,this.q(1/p.real,0,0,0));
        }
        return this.prod(q,this.pow(p,-1));
    }
    sin(q){
        let res=this.q(0,0,0,0);
        for(let k=0; k<10; ++k){
            res=this.sum(res,this.prod(this.q(Math.pow(-1,k),0,0,0),this.quot(this.pow(q,2*k+1),this.q(math.fact(2*k+1),0,0,0))));
        }
        return res;
    }
    toText(q){
        let real=q.real;
        let i=q.i+"";
        let j=q.j+"";
        let k=q.k+"";
        if(real==0 && i==0 && j==0 && k==0){
            real=0;
            i="";
            j="";
            k="";
        }else{
            if(parseFloat(i)>0){
                if(real!=0){
                    i="+"+i;
                }
            }
            if(parseFloat(j)>0){
                if(real!=0 || i!=0){
                    j="+"+j;
                }
            }
            if(parseFloat(k)>0){
                if(real!=0 || i!=0 || j!=0){
                    k="+"+k;
                }
            }
            if(real==0){
                real="";
            }
            if(i==0){
                i="";
            }else if(Math.abs(parseFloat(i))!=1){
                i=i+"i";
            }else{
                i=i.replaceAll("1","i");
            }
            if(j==0){
                j="";
            }else if(Math.abs(parseFloat(j))!=1){
                j=j+"j";
            }else{
                j=j.replaceAll("1","j");
            }
            if(k==0){
                k="";
            }else if(Math.abs(parseFloat(k))!=1){
                k=k+"k";
            }else{
                k=k.replaceAll("1","k");
            }
        }
        return `${real}${i}${j}${k}`;
    }
}
class octonion{
    constructor(real,i,j,k,e,f,g,h){
        if(i===undefined){
            i=0;
        }
        if(j===undefined){
            j=0;
        }
        if(k===undefined){
            k=0;
        }
        if(e===undefined){
            e=0;
        }
        if(f===undefined){
            f=0;
        }
        if(g===undefined){
            g=0;
        }
        if(h===undefined){
            h=0;
        }
        this.real=real;
        this.i=i;
        this.j=j;
        this.k=k;
        this.e=e;
        this.f=f;
        this.g=g;
        this.h=h;
    }
    get imag(){
        return [this.i,this.j,this.k,this.e,this.f,this.g,this.h];
    }
    get vector(){
        //単位ベクトル
        let res=[];
        for(let k=0; k<8-1; ++k){
            if(vec.length(this.imag)==0){
                res.push(0);
            }else{
        res.push(this.imag[k]/vec.length(this.imag));
            }
        }
        return res;
    }
    get abs(){
        return Math.sqrt(Math.pow(this.real,2)+Math.pow(this.i,2)+Math.pow(this.j,2)+Math.pow(this.k,2)+Math.pow(this.e,2)+Math.pow(this.f,2)+Math.pow(this.g,2)+Math.pow(this.h,2));
    }
    get arg(){
        return Math.atan2(vec.length(this.imag),this.real);
    }
    get conjugate(){
        return new octonion(this.real,-this.i,-this.j,-this.k,-this.e,-this.f,-this.g,-this.h);
    }
}
class octonionMath{
    o(real,i,j,k,e,f,g,h){
        return new octonion(real,i,j,k,e,f,g,h);
    }
    veco(x,v){
        return new octonion(x,v[0],v[1],v[2],v[3],v[4],v[5],v[6]);
    }
    polar(radius,vector,theta){
        for(var v of vector){
            v=v/vec.length(vector);
        }
        return this.veco(radius*Math.cos(theta),vec.prod(vec.prod(vector,radius),Math.sin(theta)));
    }
    fromQuaternion(q,p){
        return new octonion(q.real,q.i,q.j,q.k,p.real,p.i,p.j,p.k);
    }
    sum(a,b){
        return this.o(a.real+b.real,a.i+b.i,a.j+b.j,a.k+b.k,a.e+b.e,a.f+b.f,a.g+b.g,a.h+b.h);
    }
    dec(a,b){
        return this.o(a.real-b.real,a.i-b.i,a.j-b.j,a.k-b.k,a.e-b.e,a.f-b.f,a.g-b.g,a.h-b.h);
    }
    prod(a,b){
        const q=new quaternionMath();
        let aq=[new quaternion(a.real,a.i,a.j,a.k),new quaternion(a.e,a.f,a.g,a.h)];
        let bq=[new quaternion(b.real,b.i,b.j,b.k),new quaternion(b.e,b.f,b.g,b.h)];
        return this.fromQuaternion(q.dec(q.prod(aq[0],bq[0]),q.prod(bq[1].conjugation,aq[1])),q.sum(q.prod(bq[1],aq[0]),q.prod(aq[1],bq[0].conjugation)));
    }
    exp(o){
        return this.polar(Math.exp(o.real),o.vector,vec.length(o.imag));
    }
    ln(o){
        return this.veco(Math.log(o.abs),vec.prod(o.vector,o.arg));
    }
    pow(a,b){
        return this.exp(this.prod(b,this.ln(a)));
    }
    quot(a,b){
        return this.prod(a,this.pow(b,this.o(-1,0,0,0,0,0,0,0))); 
    }
    log(a,b){
        return this.quot(this.ln(b),this.ln(a));
    }
}
class sedenion{
    constructor(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15){
        if(e1===undefined){
            e1=0;
        }
        if(e2===undefined){
            e2=0;
        }
        if(e3===undefined){
            e3=0;
        }
        if(e4===undefined){
            e4=0;
        }
        if(e5===undefined){
            e5=0;
        }
        if(e6===undefined){
            e6=0;
        }
        if(e7===undefined){
            e7=0;
        }
        if(e8===undefined){
            e8=0;
        }
        if(e9===undefined){
            e9=0;
        }
        if(e10===undefined){
            e10=0;
        }
        if(e11===undefined){
            e11=0;
        }
        if(e12===undefined){
            e12=0;
        }
        if(e13===undefined){
            e13=0;
        }
        if(e14===undefined){
            e14=0;
        }
        if(e15===undefined){
            e15=0;
        }
        this.e0=e0;
        this.e1=e1;
        this.e2=e2;
        this.e3=e3;
        this.e4=e4;
        this.e5=e5;
        this.e6=e6;
        this.e7=e7;
        this.e8=e8;
        this.e9=e9;
        this.e10=e10;
        this.e11=e11;
        this.e12=e12;
        this.e13=e13;
        this.e14=e14;
        this.e15=e15;
    }
    get array(){
        return [this.e0,this.e1,this.e2,this.e3,
            this.e4,this.e5,this.e6,this.e7,
            this.e8,this.e9,this.e10,this.e11,
            this.e12,this.e13,this.e14,this.e15];
    }
    get imag(){
        return this.array.slice(1,16);
    }
    get vector(){
        //単位ベクトル
        let res=[];
        for(let k=0; k<16-1; ++k){
        if(vec.length(this.imag)==0){
            res.push(0);
        }else{
        res.push(this.imag[k]/vec.length(this.imag));
        }
        }
        return res;
    }
    get abs(){
        return vec.length(this.array);
    }
    get arg(){
        return Math.atan2(vec.length(this.imag),this.e0);
    }
    get conjugate(){
        let res=[this.e0];
        let S=vec.prod(this.imag,-1);
        for(const s of S){
            res.push(s);
        }
        return res;
    }
}
class sedenionMath{
    s(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15){
        return new sedenion(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15);
    }
    vecs(x,v){
        return new sedenion(x,v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9],v[10],v[11],v[12],v[13]);
    }
    polar(radius,vector,theta){
        for(var v of vector){
            v=v/vec.length(vector);
        }
        return this.vecs(radius*Math.cos(theta),vec.prod(vec.prod(vector,radius),Math.sin(theta)));
    }
    fromOctonion(a,b){
        return new sedenion(a.real,a.i,a.j,a.k,a.e,a.f,a.g,a.h,b.real,b.i,b.j,b.k,b.e,b.f,b.g,b.h);
    }
    sum(a,b){
        let res=vec.sum(a.array,b.array);
        return this.vecs(res[0],res.slice(1,16));
    }
    dec(a,b){
        let res=vec.dec(a.array,b.array);
        return this.vecs(res[0],res.slice(1,16));
    }
    prod(a,b){
        const o=new octonionMath();
        let ao=[new octonion(a.e0,a.e1,a.e2,a.e3,a.e4,a.e5,a.e6,a.e7),new octonion(a.e8,a.e9,a.e10,a.e11,a.e12,a.e13,a.e14,a.e15)];
        let bo=[new octonion(b.e0,b.e1,b.e2,b.e3,b.e4,b.e5,b.e6,b.e7),new octonion(b.e8,b.e9,b.e10,b.e11,b.e12,b.e13,b.e14,b.e15)];
        return this.fromOctonion(o.dec(o.prod(ao[0],bo[0]),o.prod(bo[1].conjugate,ao[1])),o.sum(o.prod(bo[1],ao[0]),o.prod(ao[1],bo[0].conjugate)));
    }
    exp(s){
        return this.polar(Math.exp(s.e0),s.vector,vec.length(s.imag));
    }
    ln(s){
        return this.vecs(Math.log(s.abs),vec.prod(s.vector,s.arg));
    }
    pow(a,b){
        return this.exp(this.prod(b,this.ln(a)));
    }
    quot(a,b){
        return this.prod(a,this.pow(b,this.s(-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0))); 
    }
    log(a,b){
        return this.quot(this.ln(b),this.ln(a));
    }
}
class vector{
    constructor(x,y,z){
        this.R=2;
        this.x=x;
        this.y=y;
        if(z!==undefined){
        this.z=z;
        this.R++;
        }
    }
    get length(){
        if(this.R==2){
            return Math.hypot(this.x,this.y);
        }else{
            return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2));
        }
    }
}
const vec={
    length(A){
        let res=0;
        for(const a of A){
            res+=Math.pow(a,2);
        }
        return Math.sqrt(res);
    },
    sum(A,B){
        const C=[];
        for(let k=0; k<A.length; ++k){
            C.push(A[k]+B[k]);
        }
        return C;
    },
    dec(A,B){
        const C=[];
        for(let k=0; k<A.length; ++k){
            C.push(A[k]-B[k]);
        }
        return C;
    },
    prod(A,x){
        let res=[];
        for(var a of A){
            res.push(a*x);
        }
        return res;
    },
    matrix(V){
        if(V.length==2){
            return new vector(V[0][0]+V[0][1],V[1][1]+V[1][0]);
        }
        if(V.length==3){
            return new vector(V[0][0]+V[0][1]+V[0][2],V[1][1]+V[1][0]+V[1][2],V[2][2]+V[2][1]+V[2][0]);
        }
        const res=[];
        for(let i=0; i<V.length; ++i){
            var r=0;
            for(let j=0; j<V[i].length; ++j){
                r+=V[i][j];
            }
            res.push(r);
        }
        return res;
    },
    array(v){
        if(v.R==3){
            return [v.x,v.y,v.z];
        }
        if(v.R==2){
            return [v.x,v.y];
        }
        return v;
    },
    extend(vector,value){
        const a=vector.slice();
        a.push(value);
        return a;
    }
}
const vec2={
    sum(a,b){
        return new vector(a.x+b.x,a.y+b.y)
    },
    dot(a,b){
        return a.x*b.x+a.y*b.y;
    },
    prod(a,b){
        return new vector(a.x*b,a.y*b)
    },
    quot(a,b){
        return new vector(a.x/b,a.y/b)
    }
}
const vec3={
    sum(a,b){
        return new vector(a.x+b.x,a.y+b.y,a.z+b.z);
    },
    dec(a,b){
        return new vector(a.x-b.x,a.y-b.y,a.z-b.z);
    },
    prod(a,x){
        return new vector(a.x*x,a.y*x,a.z*x);
    },
    dot(a,b){
        return a.x*b.x+a.y*b.y+a.z*b.z;
    },
    cross(a,b){
        return new vector(a.y*b.z-a.z*b.y,a.z*b.x-b.z*a.x,a.x*b.y-a.y*b.x);
    },
    dist(a,b){
        return this.dec(a,b).length;
    }
}
const mat2={
    rotationMatrix(theta){
        return [[Math.cos(theta),-Math.sin(theta)],[Math.sin(theta),Math.cos(theta)]];
    }
}
const mat3={
    rotationMatrix(theta,axis){
        if(axis=="x"){
            return [
            [1,0,0],
            [0,Math.cos(theta),-Math.sin(theta)],
            [0,Math.sin(theta),Math.cos(theta)]];
        }
        if(axis=="y"){
            return [
            [Math.cos(theta),0,-Math.sin(theta)],
            [0,1,0],
            [Math.sin(theta),0,Math.cos(theta)]]
        }
        if(axis=="z"){
            return [
            [Math.cos(theta),-Math.sin(theta),0],
            [Math.sin(theta),Math.cos(theta),0],
            [0,0,1]];
        }
    }
}
const mat4={
    perspective(v,dist){
        const u=dist/(dist-v.z);
        const M=mat.vector([v.x,v.y,v.z,1]);
        return vec.matrix(mat.prod([
            [u,0,0,0],
            [0,u,0,0],
            [0,0,0,0],
            [0,0,0,1]
        ],M));
    },
    perspective4D(v,dist){
        const u=dist/(dist-v[3]);
        const M=mat.vector(v);
        return vec.matrix(mat.prod([
            [u,0,0,0],
            [0,u,0,0],
            [0,0,u,0]
        ],M).slice(0,3));
    },
    rotationMatrix(theta,axis){
        const s=Math.sin(theta);
        const c=Math.cos(theta);
        if(axis=="xw"){
            return [
            [1,0,0,0],
            [0,Math.cos(theta),-Math.sin(theta),0],
            [0,Math.sin(theta),Math.cos(theta),0],
            [0,0,0,1]];
        }
        if(axis=="yw"){
            return [
            [Math.cos(theta),0,Math.sin(theta),0],
            [0,1,0,0],
            [-Math.sin(theta),0,Math.cos(theta),0],
            [0,0,0,1]];
        }
        if(axis=="zw"){
            return [
            [Math.cos(theta),-Math.sin(theta),0,0],
            [Math.sin(theta),Math.cos(theta),0,0],
            [0,0,1,0],
            [0,0,0,1]];
        }
        //4次元の回転
        if(axis=="xy"){
            return [
                [1,0,0,0],
                [0,1,0,0],
                [0,0,c,-s],
                [0,0,s,c]
            ]
        }
        if(axis=="yz"){
            return [
                [c,0,0,-s],
                [0,1,0,0],
                [0,0,1,0],
                [s,0,0,c]
            ]
        }
        if(axis=="xz"){
            return [
                [1,0,0,0],
                [0,c,0,-s],
                [0,0,1,0],
                [0,s,0,c]
            ]
        }
    },
    //左手座標系
    perspectiveMatrix(theta,aspect,far,near){
        var fn=far-near;
        return [
            [math.cot(theta),0,0,0],
            [0,math.cot(theta)*aspect,0,0],
            [0,0,(far+near)/fn,-1],
            [0,0,2*far*near/fn,0]
        ]
    },
    perspectiveMatrix2(theta,w,h,far,near){
        var fn=far-near;
        return [
            [2*near/w,0,0,0],
            [0,2*near/h,0,0],
            [0,0,-(far+near)/fn,-2*far*near/fn],
            [0,0,-1,0]
        ]
    },
    translate(v){
        return [
            [1,0,0,v.x],
            [0,1,0,v.y],
            [0,0,1,v.z],
            [0,0,0,1]
        ]
    },
    viewport(w,h,far,near,s){
        if(!s){
            s=new vector(0,0);
        }
        return [
            [w/2,0,0,s.x+w/2],
            [0,-h/2,0,s.y+h/2],
            [0,0,(far-near)/2,(far+near)/2],
            [0,0,0,1]
        ]
    }
}
const mat={
    cofactor(matrix, row, col) {
        row-=1;
        col-=1;
  const cofactorMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i !== row) {
      const rowCopy = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (j !== col) {
          rowCopy.push(matrix[i][j]);
        }
      }
      cofactorMatrix.push(rowCopy);
    }
  }
  return cofactorMatrix;
    },
    det(matrix){
        let size=matrix.length;
        if(size!=matrix[0].length){
            console.error("The determinant must be a square matrix!");
            return;
        }
let A=matrix;
        if(size==2){
            ret,urn (A[0][0]*A[1][1]-A[1][0]*A[0][1]);
        }else if(size==3){
            return (A[0][0]*A[1][1]*A[2][2]-A[0][0]*A[1][2]*A[2][1]+A[0][1]*A[1][2]*A[2][0]-A[0][1]*A[1][0]*A[2][2]+A[0][2]*A[1][0]*A[2][1]-A[0][2]*A[1][1]*A[2][0]);
        }else{
            let res=0;
            for(let i=0; i<matrix.length; i++) {
    res+=Math.pow(-1,i)*matrix[0][i]*this.det(this.cofactor(matrix, 1, i+1));
  }
  return res;
        }
    },
    isScalar(input){
        return Number.isFinite(input);
    },
    sum(A,B){
        const C=[];
        for(let i=0; i<A.length; i++){
            C.push([]);
            for(let j=0; j<A[i].length; j++){
                C[i].push(A[i][j]+B[i][j]);
            }
        }
        return C;
    },
    prod(A,B){
        if(this.isScalar(B)){
            const C=[];
            for(let i=0; i<A.length; i++){
                C.push([]);
                for(let j=0; j<A[i].length; j++){
                    C[i].push(A[i][j]*B);
                }
            }
            return C;
        }else{
            var C=[];
            const m=Math.max(A.length,A[0].length)-1;
            for(let i=0; i<A.length; i++){
                C.push([]);
                for(let j=0; j<B[0].length; j++){
                    C[i].push(math.sum(0,m,k=>A[i][k]*B[k][j]));
                }
            }
            return C;
        }
    },
    pow(A,B){
        //正方行列である必要がある。
        if(this.isScalar(B)){
            let C=this.unit(A.length);
            for(let k=0; k<B; ++k){
                C=this.prod(C,A);
            }
            return C;
        }
    },
    exp(A){
        var C=this.prod(A,0);
        for(let k=0; k<100; k++){
            C=this.sum(C,this.prod(this.pow(A,k),1/math.fact(k)));
        }
        return C;
    },
    square(n){
        const A=[];
        for(let i=0; i<n; ++i){
            A.push([]);
            for(let j=0; j<n; ++j){
                A[i].push(0);
            }
        }
        return A;
    },
    vector(v){
        if(v.x===undefined){
        var A=this.square(v.length);
        for(let k=0; k<v.length; ++k){
            A[k][k]=v[k];
        }
        return A;
    }else{
        if(v.R==3){
            return [[v.x,0,0],[0,v.y,0],[0,0,v.z]];
        }
    }
    },
    //大きさx*yの空の行列を作る。
    plane(x,y){
        var A=[];
        for(let i=0; i<x; ++i){
            A.push([]);
            for(let j=0; j<y; ++j){
                A[i].push(0);
            }
        }
        return A;
    },
    unit(n){
        const a=[];
        for(let k=0; k<n; ++k){
            a.push(1);
        }
        return this.vector(a);
    },
    //回転行列
    rotationMatrix(dimension,axis,theta){
        //軸はインデックス
        var res=this.unit(dimension);
        var b=[];
        //xyzwvなど固有の文字列を数値化
        for(let k=0; k<axis.length; ++k){
            if(axis[k]=="x"){
            axis[k]=1;
                }
            if(axis[k]=="y"){
            axis[k]=2;
                }
            if(axis[k]=="z"){
            axis[k]=3;
                }
            if(axis[k]=="w"){
            axis[k]=4;
                }
            if(axis[k]=="v"){
            axis[k]=5;
                }
            if(axis[k]=="u"){
            axis[k]=6;
                }
        }
        for(let k=1; k<=dimension; ++k){
            if(axis.indexOf(k)==-1){
            b.push(k);
            }
        }
        res[b[0]-1][b[0]-1]=Math.cos(theta);
        res[b[1]-1][b[1]-1]=Math.cos(theta);
        res[b[0]-1][b[1]-1]=Math.sign(b[0]-b[1])*Math.sin(theta);
        res[b[1]-1][b[0]-1]=Math.sign(b[1]-b[0])*Math.sin(theta);
        return res;
    },
    //回転
    rotate(vector,axis,theta){
        var R=this.rotationMatrix(vector.length,axis,theta);
        var V=this.vector(vector);
        return vec.matrix(this.prod(R,V));
    },
    //透視投影
    perspective(vector,dist){
    var R=vector.length;
        if(R==3){
            mat4.perspective(vector,dist);
        }
    //変換行列の生成
    var M=this.plane(R-1,R);
    const f=dist/(dist-vector[R-1]);
    for(let i=0; i<R-1; ++i){
        M[i][i]=f;
    }
    //積
    var v=mat.vector(vector);
    return vec.matrix(mat.prod(M,v));
    },
    multiPerspective(vector,dist){
    while(true){
    if(vector.R==2){
        break;
    }
        vector=vec.array(vector);
    vector=this.perspective(vector,dist);
    }
        return vector;
    }
}
//双曲平面
class hyperbolicContext{
    constructor(context,width,height){
        this.ctx=context;
        this.width=width;
        this.height=height;
        this.iteration=20;
    }
    poincareDisk(){
        var hold=this.ctx.strokeStyle;
        this.ctx.beginPath();
        this.ctx.arc(this.width/2,this.height/2,this.width/2,0,2*Math.PI);
        this.ctx.strokeStyle="#000000";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.strokeStyle=hold;
    }
    point(v){
        v=this.projection(v);
        var hold=this.ctx.fillStyle;
        this.ctx.beginPath();
        this.ctx.arc(v.x,v.y,10,0,2*Math.PI);
        this.ctx.fillStyle="#000000";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillStyle=hold;
    }
    pureProjection(v){
        var p=v;
        const z=Math.sqrt(Math.pow(p.x,2)+Math.pow(p.y,2)+1);
        p=vec2.quot(p,z);
        const d=1+Math.sqrt(1-Math.pow(p.x,2)-Math.pow(p.y,2));
        p=vec2.quot(p,d);
        return p;
    }
    viewport(v){
        return vec2.prod(vec2.sum(v,new vector(1,1)),this.width/2);
    }    
    projection(v){
        return this.viewport(this.pureProjection(v));
    }
    polygonh(points){
        for(let k=0; k<points.length; ++k){
            this.lineh(points[k],points[math.mod(k+1,points.length)]);
        }
    }
    polygon(points){
        for(let k=0; k<points.length; ++k){
            line(points[k],points[math.mod(k+1,points.length)]);
        }
    }
    line(s,e){
    for(let k=0; k<this.iteration; ++k){
        var p=this.projection(vec2.quot(vec2.sum(vec2.prod(s,k),vec2.prod(e,this.iteration-1-k)),this.iteration-1));
        this.ctx.lineTo(p.x,p.y);
    }
    }
    reg(p,theta,R){
        if(!R){
            R=1;
        }
        const c=new complexMath();
        const r=c.polar(1,theta);
        var a=new complex(1,0);
        const points=[];
        while(true){
            points.push(vec2.sum(vec2.prod(new vector(a.real,a.imag),R),p));
            a=c.prod(a,r);
            if(Math.abs(a.arg)<=0.01){
                break;
            }
        }
        this.polygonh(points);
    }
    lineh(a,b){
        const c=new complexMath();
        //二頂点を結ぶ双曲線
    a=this.pureProjection(a);
    b=this.pureProjection(b);
    a=new complex(a.x,a.y);
    b=new complex(b.x,b.y);
    var p=c.quot(c.dec(c.prod(a,new complex(1+b.abs**2,0)),c.prod(b,new complex(1+a.abs**2,0))),c.dec(c.prod(a,b.conjugation),c.prod(a.conjugation,b)));
    const r=c.dec(a,p).abs*canvas.width/2;
    var t1=c.dec(a,p).arg;
    var t2=c.dec(b,p).arg;
    t1+=2*Math.PI*(Math.abs(t1-t2)>Math.PI)*(t2>t1);
    t2+=2*Math.PI*(Math.abs(t1-t2)>Math.PI)*(t2<t1);
    //ビューポート変換
    p=new vector(p.real,p.imag);
    p=this.viewport(p);
    this.ctx.beginPath();
    this.ctx.arc(p.x,p.y,r,Math.min(t1,t2),Math.max(t1,t2));
    this.ctx.stroke();
    this.ctx.closePath();
    }
}
//ベクトル空間
class vectorSpace{
    constructor(dim,basis){
        this.dim=dim;
        this.basis=basis;
        this.vector=[];
    }
    join(v){
        if(v.R==2){
            v=[v.x,v.y];
        }
        if(v.R==3){
            v=[v.x,v.y,v.z];
        }
        this.vector.join(v);
        //ベクトル空間が変化すれば、元も変化する。
    }
}
//基底について定める必要がある。
//基底の構造[[1,0,0],[0,1,0],[0,0,1]]のように定義
const vecs={
    //テンソル積
    prod(V,W){
        var res=new vectorSpace(V.dim*W.dim);
        for(let k=0; k<V.length; ++k){
        }
    },
    tensor(v,w){
        var res=[];
        for(let i=0; i<v.length; ++i){
            for(let j=0; j<v.length; ++j){
                res.push(v[i]*w[j]);
            }
        }
        return res;
    }
}
class splitcomplex{
    constructor(real,perplex){
        this.real=real;
        this.perp=perplex;
    }
    mul(z){
        return new splitcomplex(this.real*z.real+this.perp*z.perp,this.real*z.perp+this.perp*z.real);
    }
    sum(z){
        return new splitcomplex(this.real+z.real,this.perp+z.perp);
    }
    dec(z){
        return new splitcomplex(this.real-z.real,this.perp-z.perp);
    }
}
function splitcomplextosplitbiquaternion(real,i,j,k){
    return new splitbiquaternion(real.real,i.real,j.real,k.real,real.perp,i.perp,j.perp,k.perp);
}
class cliffordMath{
    //[{val:1,basis:[1]},{val:1,basis:[1,2]}]
    scalprod(a,v){
        var res=[];
        for(let k=0; k<v.length; ++k){
            res.push({val:v[k].val*a,basis:v[k].basis});
        }
        return res;
    }
    geoprod(u,v){
        var res=[];
        for(let i=0; i<u.length; ++i){
            for(let j=0; j<v.length; ++j){
                res=this.sum(res,[this.basismul(u[i],v[j])]);
            }
        }
        return res;
    }
    sum(u,v){
        var res=u.slice();
        for(let k=0; k<v.length; ++k){
            let id=res.findIndex(e=>e.basis.join()==v[k].basis.join());
            if(id==-1){
                res.push(v[k]);
            }else{
                res[id].val+=v[k].val;
            }
        }
        return res;
    }
    basismul(u,v){
        var res={val:u.val*v.val,basis:[]};
        if(u.basis.length==1 && v.basis.length==1){
            if(u.basis[0]==v.basis[0]){
                //基底が空のときスカラー
                return res;
            }else{
                res.basis.push(u.basis[0]);
                res.basis.push(v.basis[0]);
            }
        }else{
                var B=[];
                for(let k=0; k<u.basis.length; ++k){
                    B.push(u.basis[k]);
                }
                for(let k=0; k<v.basis.length; ++k){
                    B.push(v.basis[k]);
                }
            var k=0;
            var l=B.length;
                //[1,2],[2,3]->[1,2,2,3]
                while(true){
                    var a=deleteIndex(B,k);
                    var id=a.indexOf(B[k]);
                    if(id!=-1){
                        //if(id>=k){
                            id=id+1;
                        //}
                        B=deleteIndex(B,id);
                        B=deleteIndex(B,k);
                        l-=2;
                        //同類項
                        if(id-k>1 && math.mod(id-k,2)==0){
                            //偶置換の場合係数が反転する。
                            res.val=-res.val;
                        }
                    }else{
                        k++;
                    }
                    if(k>=l){
                        break;
                    }
                }
            res.basis=B.slice();
            }
        //基底のソート
        for(let k=0; k<res.basis.length; ++k){
            let id=arrayMin(res.basis.slice(k))+k;//最小値のインデックス
            while(id>k){
            //目的地(k-インデックス)まで移項
            const hold=res.basis[id-1];
            res.basis[id-1]=res.basis[id];
            res.basis[id]=hold;
                //正負反転
            res.val=-res.val;
                id--;
            }
        }
        return res;
    }
    sortBasis(a){
        var res=this.define(1,a);
        //基底のソート
        for(let k=0; k<res.basis.length; ++k){
            let id=arrayMin(res.basis.slice(k))+k;//最小値のインデックス
            while(id>k){
            //目的地(k-インデックス)まで移項
            const hold=res.basis[id-1];
            res.basis[id-1]=res.basis[id];
            res.basis[id]=hold;
                //正負反転
            res.val=-res.val;
                id--;
            }
        }
        return res.basis;
    }
    scalar(x){
        return [{val:x,basis:[]}];
    }
    vector(A){
        var res=[];
        for(let k=0; k<A.length; ++k){
            res.push({val:A[k],basis:[k+1]});
        }
        return res;
    }
    vector3(A){
        //4次元を想定
        var res=[this.define(A[0],[1,2,3]),this.define(A[1],[2,3,4]),this.define(A[2],[1,3,4]),this.define(A[3],[1,2,4])];
        return res;
    }
    wedge(u,v){
    }
    toVector(cl){
        //1-ベクトルを通常のベクトルへ変換
        var min=0;
        var ind=[];
        var v=[];//1-ベクトル
        for(let k=0; k<cl.length; ++k){
            if(cl[k].basis.length==1){
                ind.push(cl[k].basis[0]);
                v.push(cl[k]);
            }
        }
        var res=[];
        for(let k=0; k<arrayMax(ind); ++k){
            res.push(0);
        }
        for(let k=0; k<v.length; ++k){
            var id=arrayMin(ind,min);
            min=ind[id];
            res[min-1]=v[id].val;
        }
        return res;
    }
    toVector3(cl){
        //4次元のみの想定
        //3-ベクトルを通常のベクトルへ変換
        var res=[0,0,0,0];
        let id=cl.findIndex(e=>e.basis.join()=="1,2,3");
        if(id!=-1){
            res[0]=cl[id].val;
        }
        id=cl.findIndex(e=>e.basis.join()=="2,3,4");
        if(id!=-1){
            res[1]=cl[id].val;
        }
        id=cl.findIndex(e=>e.basis.join()=="1,3,4");
        if(id!=-1){
            res[2]=cl[id].val;
        }
        id=cl.findIndex(e=>e.basis.join()=="1,2,4");
        if(id!=-1){
            res[3]=cl[id].val;
        }
        return res;
    }
    define(val,basis){
        return {val:val,basis:basis};
    }
    exp(i,j,theta){
        return [this.define(Math.cos(theta),[]),this.define(Math.sin(theta),[i,j])];
    }
    rotateInPlane(v,i,j,theta){
        return this.toVector(this.geoprod(this.geoprod(this.exp(i,j,theta/2),this.vector(v)),this.exp(i,j,-theta/2)));
    }
    inverse4D(z){
        //共役
        var q=this.scalprod(-1,z);
        var id=q.findIndex(e=>e.basis.length==0);
        if(id!=-1){
            q[id].val=-q[id].val;
        }
        id=q.findIndex(e=>e.basis.length==4);
        if(id!=-1){
            q[id].val=-q[id].val;
        }
        return q;
    }
    //一般化？
    rotate(v,z){
        return this.toVector(this.geoprod(this.geoprod(this.inverse(z),this.vector(v)),z));
    }
    rotate3D(v,z){
        let iz=[z[0],z[1],z[2],z[3],-z[4],-z[5],-z[6],z[7]];
        let Rv=this.product3D(this.product3D(iz,[0,v.x,v.y,v.z,0,0,0,0]),z);
        return new vector(Rv[1],Rv[2],Rv[3]);
    }
    rotate4D(v,z){
        let iz=[
            z[0],
            z[1],z[2],z[3],z[4],
            -z[5],-z[6],-z[7],-z[8],-z[9],-z[10],
            -z[11],-z[12],-z[13],-z[14],
            z[15]
        ];
        let Rv=this.product4D(this.product4D(iz,[0,v[0],v[1],v[2],v[3],0,0,0,0,0,0,0,0,0,0,0]),z);
        return [Rv[1],Rv[2],Rv[3],Rv[4]];
    }
    rotate4Ds(v,z){
        return this.toVector3(this.geo4d(this.geo4d(this.inverse4D(z),this.vector3(v)),z));
    }
    rotateCl4Ds(v,z){
        return (this.geo4d(this.geo4d(this.inverse4D(z),this.vector(v)),z));
    }
    rotateCl(v,z){
        return this.geoprod(this.geoprod(this.inverse4D(z),this.vector(v)),z);
    }
    size(v){
        var res=0;
        for(let k=0; k<v.length; ++k){
            res+=v[k].val**2;
        }
        return Math.sqrt(res);
    }
    basisprod(a,b){
        return this.basismul(this.define(1,a),this.define(1,b));
    }
    //3次元への固定
    //うまくいった
    generate3D(){
        var u=[["r",[]],["x",[1]],["y",[2]],["z",[3]],["xy",[1,2]],["yz",[2,3]],["xz",[1,3]],["xyz",[1,2,3]]];
        var v=[["R",[]],["X",[1]],["Y",[2]],["Z",[3]],["XY",[1,2]],["YZ",[2,3]],["XZ",[1,3]],["XYZ",[1,2,3]]];
        let res=[this.define("",[]),
            this.define("",[1]),this.define("",[2]),this.define("",[3]),
                this.define("",[1,2]),this.define("",[2,3]),this.define("",[1,3]),
                this.define("",[1,2,3])];
        for(let i=0; i<8; ++i){
            for(let j=0; j<8; ++j){
                var z=this.basisprod(u[i][1],v[j][1]);
                function work(a){
                    if(res[a].val==""){
                    if(z.val==-1){
                    res[a].val+="-";
                    }
                    res[a].val+=`(${u[i][0]}*${v[j][0]})`;
                    }else{
                        var hugo="+";
                        if(z.val==-1){
                            hugo="-";
                        }
                    res[a].val+=`${hugo}(${u[i][0]}*${v[j][0]})`;
                    }
                }
                if(z.basis.length==0){
                    //実数
                    work(0);
                }
                if(z.basis.join()=="1"){
                    work(1);
                }
                if(z.basis.join()=="2"){
                    work(2);
                }
                if(z.basis.join()=="3"){
                    work(3);
                }
                //2-ベクトル
                if(z.basis.join()=="1,2"){
                    work(4);
                }
                if(z.basis.join()=="2,3"){
                    work(5);
                }
                if(z.basis.join()=="1,3"){
                    work(6);
                }
                if(z.basis.join()=="1,2,3"){
                    work(7);
                }
            }
        }
        return res;
    }
    //定義を4次元へ固定する(高速化のため)
    generate4D(){
        var u=[["r",[]],["x",[1]],["y",[2]],["z",[3]],["w",[4]],["xy",[1,2]],["yz",[2,3]],["xz",[1,3]],["xw",[1,4]],["yw",[2,4]],["zw",[3,4]],["xyz",[1,2,3]],["yzw",[2,3,4]],["xzw",[1,3,4]],["xyw",[1,2,4]],["xyzw",[1,2,3,4]]];
        var v=[["R",[]],["X",[1]],["Y",[2]],["Z",[3]],["W",[4]],["XY",[1,2]],["YZ",[2,3]],["XZ",[1,3]],["XW",[1,4]],["YW",[2,4]],["ZW",[3,4]],["XYZ",[1,2,3]],["YZW",[2,3,4]],["XZW",[1,3,4]],["XYW",[1,2,4]],["XYZW",[1,2,3,4]]];
        let res=[this.define("",[]),
            this.define("",[1]),this.define("",[2]),this.define("",[3]),this.define("",[4]),
                this.define("",[1,2]),this.define("",[2,3]),this.define("",[1,3]),this.define("",[1,4]),this.define("",[2,4]),this.define("",[3,4]),
                this.define("",[1,2,3]),this.define("",[2,3,4]),this.define("",[1,3,4]),this.define("",[1,2,4]),
                this.define("",[1,2,3,4])];
        for(let i=0; i<16; ++i){
            for(let j=0; j<16; ++j){
                var z=this.basisprod(u[i][1],v[j][1]);
                function work(a){
                    if(res[a].val==""){
                    if(z.val==-1){
                    res[a].val+="-";
                    }
                    res[a].val+=`(${u[i][0]}*${v[j][0]})`;
                    }else{
                        var hugo="+";
                        if(z.val==-1){
                            hugo="-";
                        }
                    res[a].val+=`${hugo}(${u[i][0]}*${v[j][0]})`;
                    }
                }
                if(z.basis.length==0){
                    //実数
                    work(0);
                }
                if(z.basis.join()=="1"){
                    work(1);
                }
                if(z.basis.join()=="2"){
                    work(2);
                }
                if(z.basis.join()=="3"){
                    work(3);
                }
                if(z.basis.join()=="4"){
                    work(4);
                }
                //2-ベクトル
                if(z.basis.join()=="1,2"){
                    work(5);
                }
                if(z.basis.join()=="2,3"){
                    work(6);
                }
                if(z.basis.join()=="1,3"){
                    work(7);
                }
                if(z.basis.join()=="1,4"){
                    work(8);
                }
                if(z.basis.join()=="2,4"){
                    work(9);
                }
                if(z.basis.join()=="3,4"){
                    work(10);
                }
                if(z.basis.join()=="1,2,3"){
                    work(11);
                }
                if(z.basis.join()=="2,3,4"){
                    work(12);
                }
                if(z.basis.join()=="1,3,4"){
                    work(13);
                }
                if(z.basis.join()=="1,2,4"){
                    work(14);
                }
                if(z.basis.join()=="1,2,3,4"){
                    work(15);
                }
            }
        }
        return res;
    }
    product4D(u,v){
        //配列を与える。
        var r=u[0];
        var x=u[1];
        var y=u[2];
        var z=u[3];
        var w=u[4];
        var xy=u[5];
        var yz=u[6];
        var xz=u[7];
        var xw=u[8];
        var yw=u[9];
        var zw=u[10];
        var xyz=u[11];
        var yzw=u[12];
        var xzw=u[13];
        var xyw=u[14];
        var xyzw=u[15];
        var R=v[0];
        var X=v[1];
        var Y=v[2];
        var Z=v[3];
        var W=v[4];
        var XY=v[5];
        var YZ=v[6];
        var XZ=v[7];
        var XW=v[8];
        var YW=v[9];
        var ZW=v[10];
        var XYZ=v[11];
        var YZW=v[12];
        var XZW=v[13];
        var XYW=v[14];
        var XYZW=v[15];
        return [
            (r*R)+(x*X)+(y*Y)+(z*Z)+(w*W)-(xy*XY)-(yz*YZ)-(xz*XZ)-(xw*XW)-(yw*YW)-(zw*ZW)-(xyz*XYZ)-(yzw*YZW)-(xzw*XZW)-(xyw*XYW)+(xyzw*XYZW),
            (r*X)+(x*R)-(y*XY)-(z*XZ)-(w*XW)+(xy*Y)-(yz*XYZ)+(xz*Z)+(xw*W)-(yw*XYW)-(zw*XZW)-(xyz*YZ)+(yzw*XYZW)-(xzw*ZW)-(xyw*YW)-(xyzw*YZW),
            (r*Y)+(x*XY)+(y*R)-(z*YZ)-(w*YW)-(xy*X)+(yz*Z)+(xz*XYZ)+(xw*XYW)+(yw*W)-(zw*YZW)+(xyz*XZ)-(yzw*ZW)-(xzw*XYZW)+(xyw*XW)+(xyzw*XZW),
            (r*Z)+(x*XZ)+(y*YZ)+(z*R)-(w*ZW)-(xy*XYZ)-(yz*Y)-(xz*X)+(xw*XZW)+(yw*YZW)+(zw*W)-(xyz*XY)+(yzw*YW)+(xzw*XW)+(xyw*XYZW)-(xyzw*XYW),
            (r*W)+(x*XW)+(y*YW)+(z*ZW)+(w*R)-(xy*XYW)-(yz*YZW)-(xz*XZW)-(xw*X)-(yw*Y)-(zw*Z)-(xyz*XYZW)-(yzw*YZ)-(xzw*XZ)-(xyw*XY)+(xyzw*XYZ),
            (r*XY)+(x*Y)-(y*X)+(z*XYZ)+(w*XYW)+(xy*R)+(yz*XZ)-(xz*YZ)-(xw*YW)+(yw*XW)-(zw*XYZW)+(xyz*Z)+(yzw*XZW)-(xzw*YZW)+(xyw*W)-(xyzw*ZW),
            (r*YZ)+(x*XYZ)+(y*Z)-(z*Y)+(w*YZW)-(xy*XZ)+(yz*R)+(xz*XY)-(xw*XYZW)-(yw*ZW)+(zw*YW)+(xyz*X)+(yzw*W)+(xzw*XYW)-(xyw*XZW)-(xyzw*XW),
            (r*XZ)+(x*Z)-(y*XYZ)-(z*X)+(w*XZW)+(xy*YZ)-(yz*XY)+(xz*R)-(xw*ZW)+(yw*XYZW)+(zw*XW)-(xyz*Y)-(yzw*XYW)+(xzw*W)+(xyw*YZW)+(xyzw*YW),
            (r*XW)+(x*W)-(y*XYW)-(z*XZW)-(w*X)+(xy*YW)-(yz*XYZW)+(xz*ZW)+(xw*R)-(yw*XY)-(zw*XZ)-(xyz*YZW)+(yzw*XYZ)-(xzw*Z)-(xyw*Y)-(xyzw*YZ),
            (r*YW)+(x*XYW)+(y*W)-(z*YZW)-(w*Y)-(xy*XW)+(yz*ZW)+(xz*XYZW)+(xw*XY)+(yw*R)-(zw*YZ)+(xyz*XZW)-(yzw*Z)-(xzw*XYZ)+(xyw*X)+(xyzw*XZ),
            (r*ZW)+(x*XZW)+(y*YZW)+(z*W)-(w*Z)-(xy*XYZW)-(yz*YW)-(xz*XW)+(xw*XZ)+(yw*YZ)+(zw*R)-(xyz*XYW)+(yzw*Y)+(xzw*X)+(xyw*XYZ)-(xyzw*XY),
            (r*XYZ)+(x*YZ)-(y*XZ)+(z*XY)-(w*XYZW)+(xy*Z)+(yz*X)-(xz*Y)+(xw*YZW)-(yw*XZW)+(zw*XYW)+(xyz*R)-(yzw*XW)+(xzw*YW)-(xyw*ZW)+(xyzw*W),
            (r*YZW)+(x*XYZW)+(y*ZW)-(z*YW)+(w*YZ)-(xy*XZW)+(yz*W)+(xz*XYW)-(xw*XYZ)-(yw*Z)+(zw*Y)+(xyz*XW)+(yzw*R)+(xzw*XY)-(xyw*XZ)-(xyzw*X),
            (r*XZW)+(x*ZW)-(y*XYZW)-(z*XW)+(w*XZ)+(xy*YZW)-(yz*XYW)+(xz*W)-(xw*Z)+(yw*XYZ)+(zw*X)-(xyz*YW)-(yzw*XY)+(xzw*R)+(xyw*YZ)+(xyzw*Y),
            (r*XYW)+(x*YW)-(y*XW)+(z*XYZW)+(w*XY)+(xy*W)+(yz*XZW)-(xz*YZW)-(xw*Y)+(yw*X)-(zw*XYZ)+(xyz*ZW)+(yzw*XZ)-(xzw*YZ)+(xyw*R)-(xyzw*Z),
            (r*XYZW)+(x*YZW)-(y*XZW)+(z*XYW)-(w*XYZ)+(xy*ZW)+(yz*XW)-(xz*YW)+(xw*YZ)-(yw*XZ)+(zw*XY)+(xyz*W)-(yzw*X)+(xzw*Y)-(xyw*Z)+(xyzw*R)
        ];
    }
    //3d積
    product3D(u,v){
        //決められた配列の形式で与える方法を考えてみよう。
        //r,x,y,z,xy,yz,xz,xyz
        var r=u[0];
        var x=u[1];
        var y=u[2];
        var z=u[3];
        var xy=u[4];
        var yz=u[5];
        var xz=u[6];
        var xyz=u[7];
        var R=v[0];
        var X=v[1];
        var Y=v[2];
        var Z=v[3];
        var XY=v[4];
        var YZ=v[5];
        var XZ=v[6];
        var XYZ=v[7];
        return [
            (r*R)+(x*X)+(y*Y)+(z*Z)-(xy*XY)-(yz*YZ)-(xz*XZ)-(xyz*XYZ),
            (r*X)+(x*R)-(y*XY)-(z*XZ)+(xy*Y)-(yz*XYZ)+(xz*Z)-(xyz*YZ),
            (r*Y)+(x*XY)+(y*R)-(z*YZ)-(xy*X)+(yz*Z)+(xz*XYZ)+(xyz*XZ),
            (r*Z)+(x*XZ)+(y*YZ)+(z*R)-(xy*XYZ)-(yz*Y)-(xz*X)-(xyz*XY),
            (r*XY)+(x*Y)-(y*X)+(z*XYZ)+(xy*R)+(yz*XZ)-(xz*YZ)+(xyz*Z),
            (r*YZ)+(x*XYZ)+(y*Z)-(z*Y)-(xy*XZ)+(yz*R)+(xz*XY)+(xyz*X),
            (r*XZ)+(x*Z)-(y*XYZ)-(z*X)+(xy*YZ)-(yz*XY)+(xz*R)-(xyz*Y),
            (r*XYZ)+(x*YZ)-(y*XZ)+(z*XY)+(xy*Z)+(yz*X)-(xz*Y)+(xyz*R)
        ];
    }
    empty(str,n){
        //クリフォード代数は2^n次元になるはず
        //スカラー、1-ベクトル、2-ベクトル、3-ベクトル、4-ベクトル、...、nベクトル。
        //例えばスカラーは[`${str}[0]`,[]]
        //[][1][2][1,2]
        //部分ごとにわけよう
        var h=1;
        var tr="[0]";
        if(str==""){
            tr="";
        }
        var res=[[[`${str}${tr}`,[]]]];
        for(let k=0; k<n; ++k){
            var a=[];
            for(let i=0; i<res[k].length; ++i){
            for(let j=0; j<n; ++j){
                var B=res[k][i][1].slice();
                var b=this.basisprod(B,[j+1]).basis;
                var bool=false;
                for(let I=0; I<res.length; ++I){
                    bool=res[I].findIndex(e=>e[1].join()==b.join())!=-1;
                    if(bool){
                        break;
                    }
                }
                if(a.findIndex(e=>e[1].join()==b.join())==-1 && !bool){
                    tr="["+h+"]";
                    if(str==""){
                        tr="";
                    }
                a.push([`${str}${tr}`,b]);
                h++;
                }
            }
            }
            res.push(a);
        }
        var R=[];
        for(let i=0; i<res.length; ++i){
            for(let j=0; j<res[i].length; ++j){
                R.push(res[i][j]);
            }
        }
        return R;
    }
    unit(n){
        const res=[1];
        for(let k=0; k<Math.pow(2,n)-1; ++k){
            res.push(0);
        }
        return res;
    }
    rot(n,position,theta){
        //postition擬スカラー部分のインデックス
        var res=this.unit(n);
        res[0]=Math.cos(theta/2);
        res[1+n+position]=Math.sin(theta/2);
        return res;
    }
    inverse(u){
        const n=math.log(2,u.length);
        var l=0;
        let res=[];
        //スカラー、1-ベクトル、4-ベクトル、5ベクトル、8ベクトル、9ベクトル...[4k,4k+1]
        for(let k=0; k<=n; ++k){
            var val=l+math.nCr(n,k);
            res.push(u.slice(l,val));
            if(!(k%4==0 || k%4==1)){
                res[k]=vec.prod(res[k],-1)
            }
            l=val;
        }
        let R=[];
        for(let i=0; i<res.length; ++i){
            for(let j=0; j<res[i].length; ++j){
                R.push(res[i][j])
            }
        }
        return R;
    }
    //n次元幾何積の生成関数
    generate(n){
        //arraytype
        var u=this.empty("u",n);
        var v=this.empty("v",n);
        let res=this.empty("",n);
        for(let i=0; i<Math.pow(2,n); ++i){
            for(let j=0; j<Math.pow(2,n); ++j){
                var z=this.basisprod(u[i][1],v[j][1]);
                function work(a){
                    if(res[a][0]==""){
                    if(z.val==-1){
                    res[a][0]+="-";
                    }
                    res[a][0]+=`(${u[i][0]}*${v[j][0]})`;
                    }else{
                        var hugo="+";
                        if(z.val==-1){
                            hugo="-";
                        }
                    res[a][0]+=`${hugo}(${u[i][0]}*${v[j][0]})`;
                    }
                }
                work(res.findIndex(e=>e[1].join()==z.basis.join()));
            }
        }
        //形を整える
        var R=[];
        for(let k=0; k<res.length; ++k){
            R.push(res[k][0]);
        }
        return `[${R.join()}]`;
    }
    product5D(u,v){
        return [(u[0]*v[0])+(u[1]*v[1])+(u[2]*v[2])+(u[3]*v[3])+(u[4]*v[4])+(u[5]*v[5])-(u[6]*v[6])-(u[7]*v[7])-(u[8]*v[8])-(u[9]*v[9])-(u[10]*v[10])-(u[11]*v[11])-(u[12]*v[12])-(u[13]*v[13])-(u[14]*v[14])-(u[15]*v[15])-(u[16]*v[16])-(u[17]*v[17])-(u[18]*v[18])-(u[19]*v[19])-(u[20]*v[20])-(u[21]*v[21])-(u[22]*v[22])-(u[23]*v[23])-(u[24]*v[24])-(u[25]*v[25])+(u[26]*v[26])+(u[27]*v[27])+(u[28]*v[28])+(u[29]*v[29])+(u[30]*v[30])+(u[31]*v[31]),(u[0]*v[1])+(u[1]*v[0])-(u[2]*v[6])-(u[3]*v[7])-(u[4]*v[8])-(u[5]*v[9])+(u[6]*v[2])+(u[7]*v[3])+(u[8]*v[4])+(u[9]*v[5])-(u[10]*v[16])-(u[11]*v[17])-(u[12]*v[18])-(u[13]*v[19])-(u[14]*v[20])-(u[15]*v[21])-(u[16]*v[10])-(u[17]*v[11])-(u[18]*v[12])-(u[19]*v[13])-(u[20]*v[14])-(u[21]*v[15])+(u[22]*v[26])+(u[23]*v[27])+(u[24]*v[28])+(u[25]*v[29])-(u[26]*v[22])-(u[27]*v[23])-(u[28]*v[24])-(u[29]*v[25])+(u[30]*v[31])+(u[31]*v[30]),(u[0]*v[2])+(u[1]*v[6])+(u[2]*v[0])-(u[3]*v[10])-(u[4]*v[11])-(u[5]*v[12])-(u[6]*v[1])+(u[7]*v[16])+(u[8]*v[17])+(u[9]*v[18])+(u[10]*v[3])+(u[11]*v[4])+(u[12]*v[5])-(u[13]*v[22])-(u[14]*v[23])-(u[15]*v[24])+(u[16]*v[7])+(u[17]*v[8])+(u[18]*v[9])-(u[19]*v[26])-(u[20]*v[27])-(u[21]*v[28])-(u[22]*v[13])-(u[23]*v[14])-(u[24]*v[15])+(u[25]*v[30])+(u[26]*v[19])+(u[27]*v[20])+(u[28]*v[21])-(u[29]*v[31])-(u[30]*v[25])-(u[31]*v[29]),(u[0]*v[3])+(u[1]*v[7])+(u[2]*v[10])+(u[3]*v[0])-(u[4]*v[13])-(u[5]*v[14])-(u[6]*v[16])-(u[7]*v[1])+(u[8]*v[19])+(u[9]*v[20])-(u[10]*v[2])+(u[11]*v[22])+(u[12]*v[23])+(u[13]*v[4])+(u[14]*v[5])-(u[15]*v[25])-(u[16]*v[6])+(u[17]*v[26])+(u[18]*v[27])+(u[19]*v[8])+(u[20]*v[9])-(u[21]*v[29])+(u[22]*v[11])+(u[23]*v[12])-(u[24]*v[30])-(u[25]*v[15])-(u[26]*v[17])-(u[27]*v[18])+(u[28]*v[31])+(u[29]*v[21])+(u[30]*v[24])+(u[31]*v[28]),(u[0]*v[4])+(u[1]*v[8])+(u[2]*v[11])+(u[3]*v[13])+(u[4]*v[0])-(u[5]*v[15])-(u[6]*v[17])-(u[7]*v[19])-(u[8]*v[1])+(u[9]*v[21])-(u[10]*v[22])-(u[11]*v[2])+(u[12]*v[24])-(u[13]*v[3])+(u[14]*v[25])+(u[15]*v[5])-(u[16]*v[26])-(u[17]*v[6])+(u[18]*v[28])-(u[19]*v[7])+(u[20]*v[29])+(u[21]*v[9])-(u[22]*v[10])+(u[23]*v[30])+(u[24]*v[12])+(u[25]*v[14])+(u[26]*v[16])-(u[27]*v[31])-(u[28]*v[18])-(u[29]*v[20])-(u[30]*v[23])-(u[31]*v[27]),(u[0]*v[5])+(u[1]*v[9])+(u[2]*v[12])+(u[3]*v[14])+(u[4]*v[15])+(u[5]*v[0])-(u[6]*v[18])-(u[7]*v[20])-(u[8]*v[21])-(u[9]*v[1])-(u[10]*v[23])-(u[11]*v[24])-(u[12]*v[2])-(u[13]*v[25])-(u[14]*v[3])-(u[15]*v[4])-(u[16]*v[27])-(u[17]*v[28])-(u[18]*v[6])-(u[19]*v[29])-(u[20]*v[7])-(u[21]*v[8])-(u[22]*v[30])-(u[23]*v[10])-(u[24]*v[11])-(u[25]*v[13])+(u[26]*v[31])+(u[27]*v[16])+(u[28]*v[17])+(u[29]*v[19])+(u[30]*v[22])+(u[31]*v[26]),(u[0]*v[6])+(u[1]*v[2])-(u[2]*v[1])+(u[3]*v[16])+(u[4]*v[17])+(u[5]*v[18])+(u[6]*v[0])-(u[7]*v[10])-(u[8]*v[11])-(u[9]*v[12])+(u[10]*v[7])+(u[11]*v[8])+(u[12]*v[9])-(u[13]*v[26])-(u[14]*v[27])-(u[15]*v[28])+(u[16]*v[3])+(u[17]*v[4])+(u[18]*v[5])-(u[19]*v[22])-(u[20]*v[23])-(u[21]*v[24])+(u[22]*v[19])+(u[23]*v[20])+(u[24]*v[21])-(u[25]*v[31])-(u[26]*v[13])-(u[27]*v[14])-(u[28]*v[15])+(u[29]*v[30])-(u[30]*v[29])-(u[31]*v[25]),(u[0]*v[7])+(u[1]*v[3])-(u[2]*v[16])-(u[3]*v[1])+(u[4]*v[19])+(u[5]*v[20])+(u[6]*v[10])+(u[7]*v[0])-(u[8]*v[13])-(u[9]*v[14])-(u[10]*v[6])+(u[11]*v[26])+(u[12]*v[27])+(u[13]*v[8])+(u[14]*v[9])-(u[15]*v[29])-(u[16]*v[2])+(u[17]*v[22])+(u[18]*v[23])+(u[19]*v[4])+(u[20]*v[5])-(u[21]*v[25])-(u[22]*v[17])-(u[23]*v[18])+(u[24]*v[31])+(u[25]*v[21])+(u[26]*v[11])+(u[27]*v[12])-(u[28]*v[30])-(u[29]*v[15])+(u[30]*v[28])+(u[31]*v[24]),(u[0]*v[8])+(u[1]*v[4])-(u[2]*v[17])-(u[3]*v[19])-(u[4]*v[1])+(u[5]*v[21])+(u[6]*v[11])+(u[7]*v[13])+(u[8]*v[0])-(u[9]*v[15])-(u[10]*v[26])-(u[11]*v[6])+(u[12]*v[28])-(u[13]*v[7])+(u[14]*v[29])+(u[15]*v[9])-(u[16]*v[22])-(u[17]*v[2])+(u[18]*v[24])-(u[19]*v[3])+(u[20]*v[25])+(u[21]*v[5])+(u[22]*v[16])-(u[23]*v[31])-(u[24]*v[18])-(u[25]*v[20])-(u[26]*v[10])+(u[27]*v[30])+(u[28]*v[12])+(u[29]*v[14])-(u[30]*v[27])-(u[31]*v[23]),(u[0]*v[9])+(u[1]*v[5])-(u[2]*v[18])-(u[3]*v[20])-(u[4]*v[21])-(u[5]*v[1])+(u[6]*v[12])+(u[7]*v[14])+(u[8]*v[15])+(u[9]*v[0])-(u[10]*v[27])-(u[11]*v[28])-(u[12]*v[6])-(u[13]*v[29])-(u[14]*v[7])-(u[15]*v[8])-(u[16]*v[23])-(u[17]*v[24])-(u[18]*v[2])-(u[19]*v[25])-(u[20]*v[3])-(u[21]*v[4])+(u[22]*v[31])+(u[23]*v[16])+(u[24]*v[17])+(u[25]*v[19])-(u[26]*v[30])-(u[27]*v[10])-(u[28]*v[11])-(u[29]*v[13])+(u[30]*v[26])+(u[31]*v[22]),(u[0]*v[10])+(u[1]*v[16])+(u[2]*v[3])-(u[3]*v[2])+(u[4]*v[22])+(u[5]*v[23])-(u[6]*v[7])+(u[7]*v[6])-(u[8]*v[26])-(u[9]*v[27])+(u[10]*v[0])-(u[11]*v[13])-(u[12]*v[14])+(u[13]*v[11])+(u[14]*v[12])-(u[15]*v[30])+(u[16]*v[1])-(u[17]*v[19])-(u[18]*v[20])+(u[19]*v[17])+(u[20]*v[18])-(u[21]*v[31])+(u[22]*v[4])+(u[23]*v[5])-(u[24]*v[25])+(u[25]*v[24])-(u[26]*v[8])-(u[27]*v[9])+(u[28]*v[29])-(u[29]*v[28])-(u[30]*v[15])-(u[31]*v[21]),(u[0]*v[11])+(u[1]*v[17])+(u[2]*v[4])-(u[3]*v[22])-(u[4]*v[2])+(u[5]*v[24])-(u[6]*v[8])+(u[7]*v[26])+(u[8]*v[6])-(u[9]*v[28])+(u[10]*v[13])+(u[11]*v[0])-(u[12]*v[15])-(u[13]*v[10])+(u[14]*v[30])+(u[15]*v[12])+(u[16]*v[19])+(u[17]*v[1])-(u[18]*v[21])-(u[19]*v[16])+(u[20]*v[31])+(u[21]*v[18])-(u[22]*v[3])+(u[23]*v[25])+(u[24]*v[5])-(u[25]*v[23])+(u[26]*v[7])-(u[27]*v[29])-(u[28]*v[9])+(u[29]*v[27])+(u[30]*v[14])+(u[31]*v[20]),(u[0]*v[12])+(u[1]*v[18])+(u[2]*v[5])-(u[3]*v[23])-(u[4]*v[24])-(u[5]*v[2])-(u[6]*v[9])+(u[7]*v[27])+(u[8]*v[28])+(u[9]*v[6])+(u[10]*v[14])+(u[11]*v[15])+(u[12]*v[0])-(u[13]*v[30])-(u[14]*v[10])-(u[15]*v[11])+(u[16]*v[20])+(u[17]*v[21])+(u[18]*v[1])-(u[19]*v[31])-(u[20]*v[16])-(u[21]*v[17])-(u[22]*v[25])-(u[23]*v[3])-(u[24]*v[4])+(u[25]*v[22])+(u[26]*v[29])+(u[27]*v[7])+(u[28]*v[8])-(u[29]*v[26])-(u[30]*v[13])-(u[31]*v[19]),(u[0]*v[13])+(u[1]*v[19])+(u[2]*v[22])+(u[3]*v[4])-(u[4]*v[3])+(u[5]*v[25])-(u[6]*v[26])-(u[7]*v[8])+(u[8]*v[7])-(u[9]*v[29])-(u[10]*v[11])+(u[11]*v[10])-(u[12]*v[30])+(u[13]*v[0])-(u[14]*v[15])+(u[15]*v[14])-(u[16]*v[17])+(u[17]*v[16])-(u[18]*v[31])+(u[19]*v[1])-(u[20]*v[21])+(u[21]*v[20])+(u[22]*v[2])-(u[23]*v[24])+(u[24]*v[23])+(u[25]*v[5])-(u[26]*v[6])+(u[27]*v[28])-(u[28]*v[27])-(u[29]*v[9])-(u[30]*v[12])-(u[31]*v[18]),(u[0]*v[14])+(u[1]*v[20])+(u[2]*v[23])+(u[3]*v[5])-(u[4]*v[25])-(u[5]*v[3])-(u[6]*v[27])-(u[7]*v[9])+(u[8]*v[29])+(u[9]*v[7])-(u[10]*v[12])+(u[11]*v[30])+(u[12]*v[10])+(u[13]*v[15])+(u[14]*v[0])-(u[15]*v[13])-(u[16]*v[18])+(u[17]*v[31])+(u[18]*v[16])+(u[19]*v[21])+(u[20]*v[1])-(u[21]*v[19])+(u[22]*v[24])+(u[23]*v[2])-(u[24]*v[22])-(u[25]*v[4])-(u[26]*v[28])-(u[27]*v[6])+(u[28]*v[26])+(u[29]*v[8])+(u[30]*v[11])+(u[31]*v[17]),(u[0]*v[15])+(u[1]*v[21])+(u[2]*v[24])+(u[3]*v[25])+(u[4]*v[5])-(u[5]*v[4])-(u[6]*v[28])-(u[7]*v[29])-(u[8]*v[9])+(u[9]*v[8])-(u[10]*v[30])-(u[11]*v[12])+(u[12]*v[11])-(u[13]*v[14])+(u[14]*v[13])+(u[15]*v[0])-(u[16]*v[31])-(u[17]*v[18])+(u[18]*v[17])-(u[19]*v[20])+(u[20]*v[19])+(u[21]*v[1])-(u[22]*v[23])+(u[23]*v[22])+(u[24]*v[2])+(u[25]*v[3])+(u[26]*v[27])-(u[27]*v[26])-(u[28]*v[6])-(u[29]*v[7])-(u[30]*v[10])-(u[31]*v[16]),(u[0]*v[16])+(u[1]*v[10])-(u[2]*v[7])+(u[3]*v[6])-(u[4]*v[26])-(u[5]*v[27])+(u[6]*v[3])-(u[7]*v[2])+(u[8]*v[22])+(u[9]*v[23])+(u[10]*v[1])-(u[11]*v[19])-(u[12]*v[20])+(u[13]*v[17])+(u[14]*v[18])-(u[15]*v[31])+(u[16]*v[0])-(u[17]*v[13])-(u[18]*v[14])+(u[19]*v[11])+(u[20]*v[12])-(u[21]*v[30])-(u[22]*v[8])-(u[23]*v[9])+(u[24]*v[29])-(u[25]*v[28])+(u[26]*v[4])+(u[27]*v[5])-(u[28]*v[25])+(u[29]*v[24])-(u[30]*v[21])-(u[31]*v[15]),(u[0]*v[17])+(u[1]*v[11])-(u[2]*v[8])+(u[3]*v[26])+(u[4]*v[6])-(u[5]*v[28])+(u[6]*v[4])-(u[7]*v[22])-(u[8]*v[2])+(u[9]*v[24])+(u[10]*v[19])+(u[11]*v[1])-(u[12]*v[21])-(u[13]*v[16])+(u[14]*v[31])+(u[15]*v[18])+(u[16]*v[13])+(u[17]*v[0])-(u[18]*v[15])-(u[19]*v[10])+(u[20]*v[30])+(u[21]*v[12])+(u[22]*v[7])-(u[23]*v[29])-(u[24]*v[9])+(u[25]*v[27])-(u[26]*v[3])+(u[27]*v[25])+(u[28]*v[5])-(u[29]*v[23])+(u[30]*v[20])+(u[31]*v[14]),(u[0]*v[18])+(u[1]*v[12])-(u[2]*v[9])+(u[3]*v[27])+(u[4]*v[28])+(u[5]*v[6])+(u[6]*v[5])-(u[7]*v[23])-(u[8]*v[24])-(u[9]*v[2])+(u[10]*v[20])+(u[11]*v[21])+(u[12]*v[1])-(u[13]*v[31])-(u[14]*v[16])-(u[15]*v[17])+(u[16]*v[14])+(u[17]*v[15])+(u[18]*v[0])-(u[19]*v[30])-(u[20]*v[10])-(u[21]*v[11])+(u[22]*v[29])+(u[23]*v[7])+(u[24]*v[8])-(u[25]*v[26])-(u[26]*v[25])-(u[27]*v[3])-(u[28]*v[4])+(u[29]*v[22])-(u[30]*v[19])-(u[31]*v[13]),(u[0]*v[19])+(u[1]*v[13])-(u[2]*v[26])-(u[3]*v[8])+(u[4]*v[7])-(u[5]*v[29])+(u[6]*v[22])+(u[7]*v[4])-(u[8]*v[3])+(u[9]*v[25])-(u[10]*v[17])+(u[11]*v[16])-(u[12]*v[31])+(u[13]*v[1])-(u[14]*v[21])+(u[15]*v[20])-(u[16]*v[11])+(u[17]*v[10])-(u[18]*v[30])+(u[19]*v[0])-(u[20]*v[15])+(u[21]*v[14])-(u[22]*v[6])+(u[23]*v[28])-(u[24]*v[27])-(u[25]*v[9])+(u[26]*v[2])-(u[27]*v[24])+(u[28]*v[23])+(u[29]*v[5])-(u[30]*v[18])-(u[31]*v[12]),(u[0]*v[20])+(u[1]*v[14])-(u[2]*v[27])-(u[3]*v[9])+(u[4]*v[29])+(u[5]*v[7])+(u[6]*v[23])+(u[7]*v[5])-(u[8]*v[25])-(u[9]*v[3])-(u[10]*v[18])+(u[11]*v[31])+(u[12]*v[16])+(u[13]*v[21])+(u[14]*v[1])-(u[15]*v[19])-(u[16]*v[12])+(u[17]*v[30])+(u[18]*v[10])+(u[19]*v[15])+(u[20]*v[0])-(u[21]*v[13])-(u[22]*v[28])-(u[23]*v[6])+(u[24]*v[26])+(u[25]*v[8])+(u[26]*v[24])+(u[27]*v[2])-(u[28]*v[22])-(u[29]*v[4])+(u[30]*v[17])+(u[31]*v[11]),(u[0]*v[21])+(u[1]*v[15])-(u[2]*v[28])-(u[3]*v[29])-(u[4]*v[9])+(u[5]*v[8])+(u[6]*v[24])+(u[7]*v[25])+(u[8]*v[5])-(u[9]*v[4])-(u[10]*v[31])-(u[11]*v[18])+(u[12]*v[17])-(u[13]*v[20])+(u[14]*v[19])+(u[15]*v[1])-(u[16]*v[30])-(u[17]*v[12])+(u[18]*v[11])-(u[19]*v[14])+(u[20]*v[13])+(u[21]*v[0])+(u[22]*v[27])-(u[23]*v[26])-(u[24]*v[6])-(u[25]*v[7])-(u[26]*v[23])+(u[27]*v[22])+(u[28]*v[2])+(u[29]*v[3])-(u[30]*v[16])-(u[31]*v[10]),(u[0]*v[22])+(u[1]*v[26])+(u[2]*v[13])-(u[3]*v[11])+(u[4]*v[10])-(u[5]*v[30])-(u[6]*v[19])+(u[7]*v[17])-(u[8]*v[16])+(u[9]*v[31])+(u[10]*v[4])-(u[11]*v[3])+(u[12]*v[25])+(u[13]*v[2])-(u[14]*v[24])+(u[15]*v[23])+(u[16]*v[8])-(u[17]*v[7])+(u[18]*v[29])+(u[19]*v[6])-(u[20]*v[28])+(u[21]*v[27])+(u[22]*v[0])-(u[23]*v[15])+(u[24]*v[14])-(u[25]*v[12])-(u[26]*v[1])+(u[27]*v[21])-(u[28]*v[20])+(u[29]*v[18])+(u[30]*v[5])+(u[31]*v[9]),(u[0]*v[23])+(u[1]*v[27])+(u[2]*v[14])-(u[3]*v[12])+(u[4]*v[30])+(u[5]*v[10])-(u[6]*v[20])+(u[7]*v[18])-(u[8]*v[31])-(u[9]*v[16])+(u[10]*v[5])-(u[11]*v[25])-(u[12]*v[3])+(u[13]*v[24])+(u[14]*v[2])-(u[15]*v[22])+(u[16]*v[9])-(u[17]*v[29])-(u[18]*v[7])+(u[19]*v[28])+(u[20]*v[6])-(u[21]*v[26])+(u[22]*v[15])+(u[23]*v[0])-(u[24]*v[13])+(u[25]*v[11])-(u[26]*v[21])-(u[27]*v[1])+(u[28]*v[19])-(u[29]*v[17])-(u[30]*v[4])-(u[31]*v[8]),(u[0]*v[24])+(u[1]*v[28])+(u[2]*v[15])-(u[3]*v[30])-(u[4]*v[12])+(u[5]*v[11])-(u[6]*v[21])+(u[7]*v[31])+(u[8]*v[18])-(u[9]*v[17])+(u[10]*v[25])+(u[11]*v[5])-(u[12]*v[4])-(u[13]*v[23])+(u[14]*v[22])+(u[15]*v[2])+(u[16]*v[29])+(u[17]*v[9])-(u[18]*v[8])-(u[19]*v[27])+(u[20]*v[26])+(u[21]*v[6])-(u[22]*v[14])+(u[23]*v[13])+(u[24]*v[0])-(u[25]*v[10])+(u[26]*v[20])-(u[27]*v[19])-(u[28]*v[1])+(u[29]*v[16])+(u[30]*v[3])+(u[31]*v[7]),(u[0]*v[25])+(u[1]*v[29])+(u[2]*v[30])+(u[3]*v[15])-(u[4]*v[14])+(u[5]*v[13])-(u[6]*v[31])-(u[7]*v[21])+(u[8]*v[20])-(u[9]*v[19])-(u[10]*v[24])+(u[11]*v[23])-(u[12]*v[22])+(u[13]*v[5])-(u[14]*v[4])+(u[15]*v[3])-(u[16]*v[28])+(u[17]*v[27])-(u[18]*v[26])+(u[19]*v[9])-(u[20]*v[8])+(u[21]*v[7])+(u[22]*v[12])-(u[23]*v[11])+(u[24]*v[10])+(u[25]*v[0])-(u[26]*v[18])+(u[27]*v[17])-(u[28]*v[16])-(u[29]*v[1])-(u[30]*v[2])-(u[31]*v[6]),(u[0]*v[26])+(u[1]*v[22])-(u[2]*v[19])+(u[3]*v[17])-(u[4]*v[16])+(u[5]*v[31])+(u[6]*v[13])-(u[7]*v[11])+(u[8]*v[10])-(u[9]*v[30])+(u[10]*v[8])-(u[11]*v[7])+(u[12]*v[29])+(u[13]*v[6])-(u[14]*v[28])+(u[15]*v[27])+(u[16]*v[4])-(u[17]*v[3])+(u[18]*v[25])+(u[19]*v[2])-(u[20]*v[24])+(u[21]*v[23])-(u[22]*v[1])+(u[23]*v[21])-(u[24]*v[20])+(u[25]*v[18])+(u[26]*v[0])-(u[27]*v[15])+(u[28]*v[14])-(u[29]*v[12])+(u[30]*v[9])+(u[31]*v[5]),(u[0]*v[27])+(u[1]*v[23])-(u[2]*v[20])+(u[3]*v[18])-(u[4]*v[31])-(u[5]*v[16])+(u[6]*v[14])-(u[7]*v[12])+(u[8]*v[30])+(u[9]*v[10])+(u[10]*v[9])-(u[11]*v[29])-(u[12]*v[7])+(u[13]*v[28])+(u[14]*v[6])-(u[15]*v[26])+(u[16]*v[5])-(u[17]*v[25])-(u[18]*v[3])+(u[19]*v[24])+(u[20]*v[2])-(u[21]*v[22])-(u[22]*v[21])-(u[23]*v[1])+(u[24]*v[19])-(u[25]*v[17])+(u[26]*v[15])+(u[27]*v[0])-(u[28]*v[13])+(u[29]*v[11])-(u[30]*v[8])-(u[31]*v[4]),(u[0]*v[28])+(u[1]*v[24])-(u[2]*v[21])+(u[3]*v[31])+(u[4]*v[18])-(u[5]*v[17])+(u[6]*v[15])-(u[7]*v[30])-(u[8]*v[12])+(u[9]*v[11])+(u[10]*v[29])+(u[11]*v[9])-(u[12]*v[8])-(u[13]*v[27])+(u[14]*v[26])+(u[15]*v[6])+(u[16]*v[25])+(u[17]*v[5])-(u[18]*v[4])-(u[19]*v[23])+(u[20]*v[22])+(u[21]*v[2])+(u[22]*v[20])-(u[23]*v[19])-(u[24]*v[1])+(u[25]*v[16])-(u[26]*v[14])+(u[27]*v[13])+(u[28]*v[0])-(u[29]*v[10])+(u[30]*v[7])+(u[31]*v[3]),(u[0]*v[29])+(u[1]*v[25])-(u[2]*v[31])-(u[3]*v[21])+(u[4]*v[20])-(u[5]*v[19])+(u[6]*v[30])+(u[7]*v[15])-(u[8]*v[14])+(u[9]*v[13])-(u[10]*v[28])+(u[11]*v[27])-(u[12]*v[26])+(u[13]*v[9])-(u[14]*v[8])+(u[15]*v[7])-(u[16]*v[24])+(u[17]*v[23])-(u[18]*v[22])+(u[19]*v[5])-(u[20]*v[4])+(u[21]*v[3])-(u[22]*v[18])+(u[23]*v[17])-(u[24]*v[16])-(u[25]*v[1])+(u[26]*v[12])-(u[27]*v[11])+(u[28]*v[10])+(u[29]*v[0])-(u[30]*v[6])-(u[31]*v[2]),(u[0]*v[30])+(u[1]*v[31])+(u[2]*v[25])-(u[3]*v[24])+(u[4]*v[23])-(u[5]*v[22])-(u[6]*v[29])+(u[7]*v[28])-(u[8]*v[27])+(u[9]*v[26])+(u[10]*v[15])-(u[11]*v[14])+(u[12]*v[13])+(u[13]*v[12])-(u[14]*v[11])+(u[15]*v[10])+(u[16]*v[21])-(u[17]*v[20])+(u[18]*v[19])+(u[19]*v[18])-(u[20]*v[17])+(u[21]*v[16])+(u[22]*v[5])-(u[23]*v[4])+(u[24]*v[3])-(u[25]*v[2])-(u[26]*v[9])+(u[27]*v[8])-(u[28]*v[7])+(u[29]*v[6])+(u[30]*v[0])+(u[31]*v[1]),(u[0]*v[31])+(u[1]*v[30])-(u[2]*v[29])+(u[3]*v[28])-(u[4]*v[27])+(u[5]*v[26])+(u[6]*v[25])-(u[7]*v[24])+(u[8]*v[23])-(u[9]*v[22])+(u[10]*v[21])-(u[11]*v[20])+(u[12]*v[19])+(u[13]*v[18])-(u[14]*v[17])+(u[15]*v[16])+(u[16]*v[15])-(u[17]*v[14])+(u[18]*v[13])+(u[19]*v[12])-(u[20]*v[11])+(u[21]*v[10])-(u[22]*v[9])+(u[23]*v[8])-(u[24]*v[7])+(u[25]*v[6])+(u[26]*v[5])-(u[27]*v[4])+(u[28]*v[3])-(u[29]*v[2])+(u[30]*v[1])+(u[31]*v[0])];
    }
    product6D(u,v){
        return [(u[0]*v[0])+(u[1]*v[1])+(u[2]*v[2])+(u[3]*v[3])+(u[4]*v[4])+(u[5]*v[5])+(u[6]*v[6])-(u[7]*v[7])-(u[8]*v[8])-(u[9]*v[9])-(u[10]*v[10])-(u[11]*v[11])-(u[12]*v[12])-(u[13]*v[13])-(u[14]*v[14])-(u[15]*v[15])-(u[16]*v[16])-(u[17]*v[17])-(u[18]*v[18])-(u[19]*v[19])-(u[20]*v[20])-(u[21]*v[21])-(u[22]*v[22])-(u[23]*v[23])-(u[24]*v[24])-(u[25]*v[25])-(u[26]*v[26])-(u[27]*v[27])-(u[28]*v[28])-(u[29]*v[29])-(u[30]*v[30])-(u[31]*v[31])-(u[32]*v[32])-(u[33]*v[33])-(u[34]*v[34])-(u[35]*v[35])-(u[36]*v[36])-(u[37]*v[37])-(u[38]*v[38])-(u[39]*v[39])-(u[40]*v[40])-(u[41]*v[41])+(u[42]*v[42])+(u[43]*v[43])+(u[44]*v[44])+(u[45]*v[45])+(u[46]*v[46])+(u[47]*v[47])+(u[48]*v[48])+(u[49]*v[49])+(u[50]*v[50])+(u[51]*v[51])+(u[52]*v[52])+(u[53]*v[53])+(u[54]*v[54])+(u[55]*v[55])+(u[56]*v[56])+(u[57]*v[57])+(u[58]*v[58])+(u[59]*v[59])+(u[60]*v[60])+(u[61]*v[61])+(u[62]*v[62])-(u[63]*v[63]),(u[0]*v[1])+(u[1]*v[0])-(u[2]*v[7])-(u[3]*v[8])-(u[4]*v[9])-(u[5]*v[10])-(u[6]*v[11])+(u[7]*v[2])+(u[8]*v[3])+(u[9]*v[4])+(u[10]*v[5])+(u[11]*v[6])-(u[12]*v[22])-(u[13]*v[23])-(u[14]*v[24])-(u[15]*v[25])-(u[16]*v[26])-(u[17]*v[27])-(u[18]*v[28])-(u[19]*v[29])-(u[20]*v[30])-(u[21]*v[31])-(u[22]*v[12])-(u[23]*v[13])-(u[24]*v[14])-(u[25]*v[15])-(u[26]*v[16])-(u[27]*v[17])-(u[28]*v[18])-(u[29]*v[19])-(u[30]*v[20])-(u[31]*v[21])+(u[32]*v[42])+(u[33]*v[43])+(u[34]*v[44])+(u[35]*v[45])+(u[36]*v[46])+(u[37]*v[47])+(u[38]*v[48])+(u[39]*v[49])+(u[40]*v[50])+(u[41]*v[51])-(u[42]*v[32])-(u[43]*v[33])-(u[44]*v[34])-(u[45]*v[35])-(u[46]*v[36])-(u[47]*v[37])-(u[48]*v[38])-(u[49]*v[39])-(u[50]*v[40])-(u[51]*v[41])+(u[52]*v[57])+(u[53]*v[58])+(u[54]*v[59])+(u[55]*v[60])+(u[56]*v[61])+(u[57]*v[52])+(u[58]*v[53])+(u[59]*v[54])+(u[60]*v[55])+(u[61]*v[56])-(u[62]*v[63])+(u[63]*v[62]),(u[0]*v[2])+(u[1]*v[7])+(u[2]*v[0])-(u[3]*v[12])-(u[4]*v[13])-(u[5]*v[14])-(u[6]*v[15])-(u[7]*v[1])+(u[8]*v[22])+(u[9]*v[23])+(u[10]*v[24])+(u[11]*v[25])+(u[12]*v[3])+(u[13]*v[4])+(u[14]*v[5])+(u[15]*v[6])-(u[16]*v[32])-(u[17]*v[33])-(u[18]*v[34])-(u[19]*v[35])-(u[20]*v[36])-(u[21]*v[37])+(u[22]*v[8])+(u[23]*v[9])+(u[24]*v[10])+(u[25]*v[11])-(u[26]*v[42])-(u[27]*v[43])-(u[28]*v[44])-(u[29]*v[45])-(u[30]*v[46])-(u[31]*v[47])-(u[32]*v[16])-(u[33]*v[17])-(u[34]*v[18])-(u[35]*v[19])-(u[36]*v[20])-(u[37]*v[21])+(u[38]*v[52])+(u[39]*v[53])+(u[40]*v[54])+(u[41]*v[55])+(u[42]*v[26])+(u[43]*v[27])+(u[44]*v[28])+(u[45]*v[29])+(u[46]*v[30])+(u[47]*v[31])-(u[48]*v[57])-(u[49]*v[58])-(u[50]*v[59])-(u[51]*v[60])-(u[52]*v[38])-(u[53]*v[39])-(u[54]*v[40])-(u[55]*v[41])+(u[56]*v[62])-(u[57]*v[48])-(u[58]*v[49])-(u[59]*v[50])-(u[60]*v[51])+(u[61]*v[63])+(u[62]*v[56])-(u[63]*v[61]),(u[0]*v[3])+(u[1]*v[8])+(u[2]*v[12])+(u[3]*v[0])-(u[4]*v[16])-(u[5]*v[17])-(u[6]*v[18])-(u[7]*v[22])-(u[8]*v[1])+(u[9]*v[26])+(u[10]*v[27])+(u[11]*v[28])-(u[12]*v[2])+(u[13]*v[32])+(u[14]*v[33])+(u[15]*v[34])+(u[16]*v[4])+(u[17]*v[5])+(u[18]*v[6])-(u[19]*v[38])-(u[20]*v[39])-(u[21]*v[40])-(u[22]*v[7])+(u[23]*v[42])+(u[24]*v[43])+(u[25]*v[44])+(u[26]*v[9])+(u[27]*v[10])+(u[28]*v[11])-(u[29]*v[48])-(u[30]*v[49])-(u[31]*v[50])+(u[32]*v[13])+(u[33]*v[14])+(u[34]*v[15])-(u[35]*v[52])-(u[36]*v[53])-(u[37]*v[54])-(u[38]*v[19])-(u[39]*v[20])-(u[40]*v[21])+(u[41]*v[56])-(u[42]*v[23])-(u[43]*v[24])-(u[44]*v[25])+(u[45]*v[57])+(u[46]*v[58])+(u[47]*v[59])+(u[48]*v[29])+(u[49]*v[30])+(u[50]*v[31])-(u[51]*v[61])+(u[52]*v[35])+(u[53]*v[36])+(u[54]*v[37])-(u[55]*v[62])-(u[56]*v[41])+(u[57]*v[45])+(u[58]*v[46])+(u[59]*v[47])-(u[60]*v[63])-(u[61]*v[51])-(u[62]*v[55])+(u[63]*v[60]),(u[0]*v[4])+(u[1]*v[9])+(u[2]*v[13])+(u[3]*v[16])+(u[4]*v[0])-(u[5]*v[19])-(u[6]*v[20])-(u[7]*v[23])-(u[8]*v[26])-(u[9]*v[1])+(u[10]*v[29])+(u[11]*v[30])-(u[12]*v[32])-(u[13]*v[2])+(u[14]*v[35])+(u[15]*v[36])-(u[16]*v[3])+(u[17]*v[38])+(u[18]*v[39])+(u[19]*v[5])+(u[20]*v[6])-(u[21]*v[41])-(u[22]*v[42])-(u[23]*v[7])+(u[24]*v[45])+(u[25]*v[46])-(u[26]*v[8])+(u[27]*v[48])+(u[28]*v[49])+(u[29]*v[10])+(u[30]*v[11])-(u[31]*v[51])-(u[32]*v[12])+(u[33]*v[52])+(u[34]*v[53])+(u[35]*v[14])+(u[36]*v[15])-(u[37]*v[55])+(u[38]*v[17])+(u[39]*v[18])-(u[40]*v[56])-(u[41]*v[21])+(u[42]*v[22])-(u[43]*v[57])-(u[44]*v[58])-(u[45]*v[24])-(u[46]*v[25])+(u[47]*v[60])-(u[48]*v[27])-(u[49]*v[28])+(u[50]*v[61])+(u[51]*v[31])-(u[52]*v[33])-(u[53]*v[34])+(u[54]*v[62])+(u[55]*v[37])+(u[56]*v[40])-(u[57]*v[43])-(u[58]*v[44])+(u[59]*v[63])+(u[60]*v[47])+(u[61]*v[50])+(u[62]*v[54])-(u[63]*v[59]),(u[0]*v[5])+(u[1]*v[10])+(u[2]*v[14])+(u[3]*v[17])+(u[4]*v[19])+(u[5]*v[0])-(u[6]*v[21])-(u[7]*v[24])-(u[8]*v[27])-(u[9]*v[29])-(u[10]*v[1])+(u[11]*v[31])-(u[12]*v[33])-(u[13]*v[35])-(u[14]*v[2])+(u[15]*v[37])-(u[16]*v[38])-(u[17]*v[3])+(u[18]*v[40])-(u[19]*v[4])+(u[20]*v[41])+(u[21]*v[6])-(u[22]*v[43])-(u[23]*v[45])-(u[24]*v[7])+(u[25]*v[47])-(u[26]*v[48])-(u[27]*v[8])+(u[28]*v[50])-(u[29]*v[9])+(u[30]*v[51])+(u[31]*v[11])-(u[32]*v[52])-(u[33]*v[12])+(u[34]*v[54])-(u[35]*v[13])+(u[36]*v[55])+(u[37]*v[15])-(u[38]*v[16])+(u[39]*v[56])+(u[40]*v[18])+(u[41]*v[20])+(u[42]*v[57])+(u[43]*v[22])-(u[44]*v[59])+(u[45]*v[23])-(u[46]*v[60])-(u[47]*v[25])+(u[48]*v[26])-(u[49]*v[61])-(u[50]*v[28])-(u[51]*v[30])+(u[52]*v[32])-(u[53]*v[62])-(u[54]*v[34])-(u[55]*v[36])-(u[56]*v[39])+(u[57]*v[42])-(u[58]*v[63])-(u[59]*v[44])-(u[60]*v[46])-(u[61]*v[49])-(u[62]*v[53])+(u[63]*v[58]),(u[0]*v[6])+(u[1]*v[11])+(u[2]*v[15])+(u[3]*v[18])+(u[4]*v[20])+(u[5]*v[21])+(u[6]*v[0])-(u[7]*v[25])-(u[8]*v[28])-(u[9]*v[30])-(u[10]*v[31])-(u[11]*v[1])-(u[12]*v[34])-(u[13]*v[36])-(u[14]*v[37])-(u[15]*v[2])-(u[16]*v[39])-(u[17]*v[40])-(u[18]*v[3])-(u[19]*v[41])-(u[20]*v[4])-(u[21]*v[5])-(u[22]*v[44])-(u[23]*v[46])-(u[24]*v[47])-(u[25]*v[7])-(u[26]*v[49])-(u[27]*v[50])-(u[28]*v[8])-(u[29]*v[51])-(u[30]*v[9])-(u[31]*v[10])-(u[32]*v[53])-(u[33]*v[54])-(u[34]*v[12])-(u[35]*v[55])-(u[36]*v[13])-(u[37]*v[14])-(u[38]*v[56])-(u[39]*v[16])-(u[40]*v[17])-(u[41]*v[19])+(u[42]*v[58])+(u[43]*v[59])+(u[44]*v[22])+(u[45]*v[60])+(u[46]*v[23])+(u[47]*v[24])+(u[48]*v[61])+(u[49]*v[26])+(u[50]*v[27])+(u[51]*v[29])+(u[52]*v[62])+(u[53]*v[32])+(u[54]*v[33])+(u[55]*v[35])+(u[56]*v[38])+(u[57]*v[63])+(u[58]*v[42])+(u[59]*v[43])+(u[60]*v[45])+(u[61]*v[48])+(u[62]*v[52])-(u[63]*v[57]),(u[0]*v[7])+(u[1]*v[2])-(u[2]*v[1])+(u[3]*v[22])+(u[4]*v[23])+(u[5]*v[24])+(u[6]*v[25])+(u[7]*v[0])-(u[8]*v[12])-(u[9]*v[13])-(u[10]*v[14])-(u[11]*v[15])+(u[12]*v[8])+(u[13]*v[9])+(u[14]*v[10])+(u[15]*v[11])-(u[16]*v[42])-(u[17]*v[43])-(u[18]*v[44])-(u[19]*v[45])-(u[20]*v[46])-(u[21]*v[47])+(u[22]*v[3])+(u[23]*v[4])+(u[24]*v[5])+(u[25]*v[6])-(u[26]*v[32])-(u[27]*v[33])-(u[28]*v[34])-(u[29]*v[35])-(u[30]*v[36])-(u[31]*v[37])+(u[32]*v[26])+(u[33]*v[27])+(u[34]*v[28])+(u[35]*v[29])+(u[36]*v[30])+(u[37]*v[31])-(u[38]*v[57])-(u[39]*v[58])-(u[40]*v[59])-(u[41]*v[60])-(u[42]*v[16])-(u[43]*v[17])-(u[44]*v[18])-(u[45]*v[19])-(u[46]*v[20])-(u[47]*v[21])+(u[48]*v[52])+(u[49]*v[53])+(u[50]*v[54])+(u[51]*v[55])-(u[52]*v[48])-(u[53]*v[49])-(u[54]*v[50])-(u[55]*v[51])+(u[56]*v[63])-(u[57]*v[38])-(u[58]*v[39])-(u[59]*v[40])-(u[60]*v[41])+(u[61]*v[62])-(u[62]*v[61])+(u[63]*v[56]),(u[0]*v[8])+(u[1]*v[3])-(u[2]*v[22])-(u[3]*v[1])+(u[4]*v[26])+(u[5]*v[27])+(u[6]*v[28])+(u[7]*v[12])+(u[8]*v[0])-(u[9]*v[16])-(u[10]*v[17])-(u[11]*v[18])-(u[12]*v[7])+(u[13]*v[42])+(u[14]*v[43])+(u[15]*v[44])+(u[16]*v[9])+(u[17]*v[10])+(u[18]*v[11])-(u[19]*v[48])-(u[20]*v[49])-(u[21]*v[50])-(u[22]*v[2])+(u[23]*v[32])+(u[24]*v[33])+(u[25]*v[34])+(u[26]*v[4])+(u[27]*v[5])+(u[28]*v[6])-(u[29]*v[38])-(u[30]*v[39])-(u[31]*v[40])-(u[32]*v[23])-(u[33]*v[24])-(u[34]*v[25])+(u[35]*v[57])+(u[36]*v[58])+(u[37]*v[59])+(u[38]*v[29])+(u[39]*v[30])+(u[40]*v[31])-(u[41]*v[61])+(u[42]*v[13])+(u[43]*v[14])+(u[44]*v[15])-(u[45]*v[52])-(u[46]*v[53])-(u[47]*v[54])-(u[48]*v[19])-(u[49]*v[20])-(u[50]*v[21])+(u[51]*v[56])+(u[52]*v[45])+(u[53]*v[46])+(u[54]*v[47])-(u[55]*v[63])-(u[56]*v[51])+(u[57]*v[35])+(u[58]*v[36])+(u[59]*v[37])-(u[60]*v[62])-(u[61]*v[41])+(u[62]*v[60])-(u[63]*v[55]),(u[0]*v[9])+(u[1]*v[4])-(u[2]*v[23])-(u[3]*v[26])-(u[4]*v[1])+(u[5]*v[29])+(u[6]*v[30])+(u[7]*v[13])+(u[8]*v[16])+(u[9]*v[0])-(u[10]*v[19])-(u[11]*v[20])-(u[12]*v[42])-(u[13]*v[7])+(u[14]*v[45])+(u[15]*v[46])-(u[16]*v[8])+(u[17]*v[48])+(u[18]*v[49])+(u[19]*v[10])+(u[20]*v[11])-(u[21]*v[51])-(u[22]*v[32])-(u[23]*v[2])+(u[24]*v[35])+(u[25]*v[36])-(u[26]*v[3])+(u[27]*v[38])+(u[28]*v[39])+(u[29]*v[5])+(u[30]*v[6])-(u[31]*v[41])+(u[32]*v[22])-(u[33]*v[57])-(u[34]*v[58])-(u[35]*v[24])-(u[36]*v[25])+(u[37]*v[60])-(u[38]*v[27])-(u[39]*v[28])+(u[40]*v[61])+(u[41]*v[31])-(u[42]*v[12])+(u[43]*v[52])+(u[44]*v[53])+(u[45]*v[14])+(u[46]*v[15])-(u[47]*v[55])+(u[48]*v[17])+(u[49]*v[18])-(u[50]*v[56])-(u[51]*v[21])-(u[52]*v[43])-(u[53]*v[44])+(u[54]*v[63])+(u[55]*v[47])+(u[56]*v[50])-(u[57]*v[33])-(u[58]*v[34])+(u[59]*v[62])+(u[60]*v[37])+(u[61]*v[40])-(u[62]*v[59])+(u[63]*v[54]),(u[0]*v[10])+(u[1]*v[5])-(u[2]*v[24])-(u[3]*v[27])-(u[4]*v[29])-(u[5]*v[1])+(u[6]*v[31])+(u[7]*v[14])+(u[8]*v[17])+(u[9]*v[19])+(u[10]*v[0])-(u[11]*v[21])-(u[12]*v[43])-(u[13]*v[45])-(u[14]*v[7])+(u[15]*v[47])-(u[16]*v[48])-(u[17]*v[8])+(u[18]*v[50])-(u[19]*v[9])+(u[20]*v[51])+(u[21]*v[11])-(u[22]*v[33])-(u[23]*v[35])-(u[24]*v[2])+(u[25]*v[37])-(u[26]*v[38])-(u[27]*v[3])+(u[28]*v[40])-(u[29]*v[4])+(u[30]*v[41])+(u[31]*v[6])+(u[32]*v[57])+(u[33]*v[22])-(u[34]*v[59])+(u[35]*v[23])-(u[36]*v[60])-(u[37]*v[25])+(u[38]*v[26])-(u[39]*v[61])-(u[40]*v[28])-(u[41]*v[30])-(u[42]*v[52])-(u[43]*v[12])+(u[44]*v[54])-(u[45]*v[13])+(u[46]*v[55])+(u[47]*v[15])-(u[48]*v[16])+(u[49]*v[56])+(u[50]*v[18])+(u[51]*v[20])+(u[52]*v[42])-(u[53]*v[63])-(u[54]*v[44])-(u[55]*v[46])-(u[56]*v[49])+(u[57]*v[32])-(u[58]*v[62])-(u[59]*v[34])-(u[60]*v[36])-(u[61]*v[39])+(u[62]*v[58])-(u[63]*v[53]),(u[0]*v[11])+(u[1]*v[6])-(u[2]*v[25])-(u[3]*v[28])-(u[4]*v[30])-(u[5]*v[31])-(u[6]*v[1])+(u[7]*v[15])+(u[8]*v[18])+(u[9]*v[20])+(u[10]*v[21])+(u[11]*v[0])-(u[12]*v[44])-(u[13]*v[46])-(u[14]*v[47])-(u[15]*v[7])-(u[16]*v[49])-(u[17]*v[50])-(u[18]*v[8])-(u[19]*v[51])-(u[20]*v[9])-(u[21]*v[10])-(u[22]*v[34])-(u[23]*v[36])-(u[24]*v[37])-(u[25]*v[2])-(u[26]*v[39])-(u[27]*v[40])-(u[28]*v[3])-(u[29]*v[41])-(u[30]*v[4])-(u[31]*v[5])+(u[32]*v[58])+(u[33]*v[59])+(u[34]*v[22])+(u[35]*v[60])+(u[36]*v[23])+(u[37]*v[24])+(u[38]*v[61])+(u[39]*v[26])+(u[40]*v[27])+(u[41]*v[29])-(u[42]*v[53])-(u[43]*v[54])-(u[44]*v[12])-(u[45]*v[55])-(u[46]*v[13])-(u[47]*v[14])-(u[48]*v[56])-(u[49]*v[16])-(u[50]*v[17])-(u[51]*v[19])+(u[52]*v[63])+(u[53]*v[42])+(u[54]*v[43])+(u[55]*v[45])+(u[56]*v[48])+(u[57]*v[62])+(u[58]*v[32])+(u[59]*v[33])+(u[60]*v[35])+(u[61]*v[38])-(u[62]*v[57])+(u[63]*v[52]),(u[0]*v[12])+(u[1]*v[22])+(u[2]*v[3])-(u[3]*v[2])+(u[4]*v[32])+(u[5]*v[33])+(u[6]*v[34])-(u[7]*v[8])+(u[8]*v[7])-(u[9]*v[42])-(u[10]*v[43])-(u[11]*v[44])+(u[12]*v[0])-(u[13]*v[16])-(u[14]*v[17])-(u[15]*v[18])+(u[16]*v[13])+(u[17]*v[14])+(u[18]*v[15])-(u[19]*v[52])-(u[20]*v[53])-(u[21]*v[54])+(u[22]*v[1])-(u[23]*v[26])-(u[24]*v[27])-(u[25]*v[28])+(u[26]*v[23])+(u[27]*v[24])+(u[28]*v[25])-(u[29]*v[57])-(u[30]*v[58])-(u[31]*v[59])+(u[32]*v[4])+(u[33]*v[5])+(u[34]*v[6])-(u[35]*v[38])-(u[36]*v[39])-(u[37]*v[40])+(u[38]*v[35])+(u[39]*v[36])+(u[40]*v[37])-(u[41]*v[62])-(u[42]*v[9])-(u[43]*v[10])-(u[44]*v[11])+(u[45]*v[48])+(u[46]*v[49])+(u[47]*v[50])-(u[48]*v[45])-(u[49]*v[46])-(u[50]*v[47])+(u[51]*v[63])-(u[52]*v[19])-(u[53]*v[20])-(u[54]*v[21])+(u[55]*v[56])-(u[56]*v[55])-(u[57]*v[29])-(u[58]*v[30])-(u[59]*v[31])+(u[60]*v[61])-(u[61]*v[60])-(u[62]*v[41])+(u[63]*v[51]),(u[0]*v[13])+(u[1]*v[23])+(u[2]*v[4])-(u[3]*v[32])-(u[4]*v[2])+(u[5]*v[35])+(u[6]*v[36])-(u[7]*v[9])+(u[8]*v[42])+(u[9]*v[7])-(u[10]*v[45])-(u[11]*v[46])+(u[12]*v[16])+(u[13]*v[0])-(u[14]*v[19])-(u[15]*v[20])-(u[16]*v[12])+(u[17]*v[52])+(u[18]*v[53])+(u[19]*v[14])+(u[20]*v[15])-(u[21]*v[55])+(u[22]*v[26])+(u[23]*v[1])-(u[24]*v[29])-(u[25]*v[30])-(u[26]*v[22])+(u[27]*v[57])+(u[28]*v[58])+(u[29]*v[24])+(u[30]*v[25])-(u[31]*v[60])-(u[32]*v[3])+(u[33]*v[38])+(u[34]*v[39])+(u[35]*v[5])+(u[36]*v[6])-(u[37]*v[41])-(u[38]*v[33])-(u[39]*v[34])+(u[40]*v[62])+(u[41]*v[37])+(u[42]*v[8])-(u[43]*v[48])-(u[44]*v[49])-(u[45]*v[10])-(u[46]*v[11])+(u[47]*v[51])+(u[48]*v[43])+(u[49]*v[44])-(u[50]*v[63])-(u[51]*v[47])+(u[52]*v[17])+(u[53]*v[18])-(u[54]*v[56])-(u[55]*v[21])+(u[56]*v[54])+(u[57]*v[27])+(u[58]*v[28])-(u[59]*v[61])-(u[60]*v[31])+(u[61]*v[59])+(u[62]*v[40])-(u[63]*v[50]),(u[0]*v[14])+(u[1]*v[24])+(u[2]*v[5])-(u[3]*v[33])-(u[4]*v[35])-(u[5]*v[2])+(u[6]*v[37])-(u[7]*v[10])+(u[8]*v[43])+(u[9]*v[45])+(u[10]*v[7])-(u[11]*v[47])+(u[12]*v[17])+(u[13]*v[19])+(u[14]*v[0])-(u[15]*v[21])-(u[16]*v[52])-(u[17]*v[12])+(u[18]*v[54])-(u[19]*v[13])+(u[20]*v[55])+(u[21]*v[15])+(u[22]*v[27])+(u[23]*v[29])+(u[24]*v[1])-(u[25]*v[31])-(u[26]*v[57])-(u[27]*v[22])+(u[28]*v[59])-(u[29]*v[23])+(u[30]*v[60])+(u[31]*v[25])-(u[32]*v[38])-(u[33]*v[3])+(u[34]*v[40])-(u[35]*v[4])+(u[36]*v[41])+(u[37]*v[6])+(u[38]*v[32])-(u[39]*v[62])-(u[40]*v[34])-(u[41]*v[36])+(u[42]*v[48])+(u[43]*v[8])-(u[44]*v[50])+(u[45]*v[9])-(u[46]*v[51])-(u[47]*v[11])-(u[48]*v[42])+(u[49]*v[63])+(u[50]*v[44])+(u[51]*v[46])-(u[52]*v[16])+(u[53]*v[56])+(u[54]*v[18])+(u[55]*v[20])-(u[56]*v[53])-(u[57]*v[26])+(u[58]*v[61])+(u[59]*v[28])+(u[60]*v[30])-(u[61]*v[58])-(u[62]*v[39])+(u[63]*v[49]),(u[0]*v[15])+(u[1]*v[25])+(u[2]*v[6])-(u[3]*v[34])-(u[4]*v[36])-(u[5]*v[37])-(u[6]*v[2])-(u[7]*v[11])+(u[8]*v[44])+(u[9]*v[46])+(u[10]*v[47])+(u[11]*v[7])+(u[12]*v[18])+(u[13]*v[20])+(u[14]*v[21])+(u[15]*v[0])-(u[16]*v[53])-(u[17]*v[54])-(u[18]*v[12])-(u[19]*v[55])-(u[20]*v[13])-(u[21]*v[14])+(u[22]*v[28])+(u[23]*v[30])+(u[24]*v[31])+(u[25]*v[1])-(u[26]*v[58])-(u[27]*v[59])-(u[28]*v[22])-(u[29]*v[60])-(u[30]*v[23])-(u[31]*v[24])-(u[32]*v[39])-(u[33]*v[40])-(u[34]*v[3])-(u[35]*v[41])-(u[36]*v[4])-(u[37]*v[5])+(u[38]*v[62])+(u[39]*v[32])+(u[40]*v[33])+(u[41]*v[35])+(u[42]*v[49])+(u[43]*v[50])+(u[44]*v[8])+(u[45]*v[51])+(u[46]*v[9])+(u[47]*v[10])-(u[48]*v[63])-(u[49]*v[42])-(u[50]*v[43])-(u[51]*v[45])-(u[52]*v[56])-(u[53]*v[16])-(u[54]*v[17])-(u[55]*v[19])+(u[56]*v[52])-(u[57]*v[61])-(u[58]*v[26])-(u[59]*v[27])-(u[60]*v[29])+(u[61]*v[57])+(u[62]*v[38])-(u[63]*v[48]),(u[0]*v[16])+(u[1]*v[26])+(u[2]*v[32])+(u[3]*v[4])-(u[4]*v[3])+(u[5]*v[38])+(u[6]*v[39])-(u[7]*v[42])-(u[8]*v[9])+(u[9]*v[8])-(u[10]*v[48])-(u[11]*v[49])-(u[12]*v[13])+(u[13]*v[12])-(u[14]*v[52])-(u[15]*v[53])+(u[16]*v[0])-(u[17]*v[19])-(u[18]*v[20])+(u[19]*v[17])+(u[20]*v[18])-(u[21]*v[56])-(u[22]*v[23])+(u[23]*v[22])-(u[24]*v[57])-(u[25]*v[58])+(u[26]*v[1])-(u[27]*v[29])-(u[28]*v[30])+(u[29]*v[27])+(u[30]*v[28])-(u[31]*v[61])+(u[32]*v[2])-(u[33]*v[35])-(u[34]*v[36])+(u[35]*v[33])+(u[36]*v[34])-(u[37]*v[62])+(u[38]*v[5])+(u[39]*v[6])-(u[40]*v[41])+(u[41]*v[40])-(u[42]*v[7])+(u[43]*v[45])+(u[44]*v[46])-(u[45]*v[43])-(u[46]*v[44])+(u[47]*v[63])-(u[48]*v[10])-(u[49]*v[11])+(u[50]*v[51])-(u[51]*v[50])-(u[52]*v[14])-(u[53]*v[15])+(u[54]*v[55])-(u[55]*v[54])-(u[56]*v[21])-(u[57]*v[24])-(u[58]*v[25])+(u[59]*v[60])-(u[60]*v[59])-(u[61]*v[31])-(u[62]*v[37])+(u[63]*v[47]),(u[0]*v[17])+(u[1]*v[27])+(u[2]*v[33])+(u[3]*v[5])-(u[4]*v[38])-(u[5]*v[3])+(u[6]*v[40])-(u[7]*v[43])-(u[8]*v[10])+(u[9]*v[48])+(u[10]*v[8])-(u[11]*v[50])-(u[12]*v[14])+(u[13]*v[52])+(u[14]*v[12])-(u[15]*v[54])+(u[16]*v[19])+(u[17]*v[0])-(u[18]*v[21])-(u[19]*v[16])+(u[20]*v[56])+(u[21]*v[18])-(u[22]*v[24])+(u[23]*v[57])+(u[24]*v[22])-(u[25]*v[59])+(u[26]*v[29])+(u[27]*v[1])-(u[28]*v[31])-(u[29]*v[26])+(u[30]*v[61])+(u[31]*v[28])+(u[32]*v[35])+(u[33]*v[2])-(u[34]*v[37])-(u[35]*v[32])+(u[36]*v[62])+(u[37]*v[34])-(u[38]*v[4])+(u[39]*v[41])+(u[40]*v[6])-(u[41]*v[39])-(u[42]*v[45])-(u[43]*v[7])+(u[44]*v[47])+(u[45]*v[42])-(u[46]*v[63])-(u[47]*v[44])+(u[48]*v[9])-(u[49]*v[51])-(u[50]*v[11])+(u[51]*v[49])+(u[52]*v[13])-(u[53]*v[55])-(u[54]*v[15])+(u[55]*v[53])+(u[56]*v[20])+(u[57]*v[23])-(u[58]*v[60])-(u[59]*v[25])+(u[60]*v[58])+(u[61]*v[30])+(u[62]*v[36])-(u[63]*v[46]),(u[0]*v[18])+(u[1]*v[28])+(u[2]*v[34])+(u[3]*v[6])-(u[4]*v[39])-(u[5]*v[40])-(u[6]*v[3])-(u[7]*v[44])-(u[8]*v[11])+(u[9]*v[49])+(u[10]*v[50])+(u[11]*v[8])-(u[12]*v[15])+(u[13]*v[53])+(u[14]*v[54])+(u[15]*v[12])+(u[16]*v[20])+(u[17]*v[21])+(u[18]*v[0])-(u[19]*v[56])-(u[20]*v[16])-(u[21]*v[17])-(u[22]*v[25])+(u[23]*v[58])+(u[24]*v[59])+(u[25]*v[22])+(u[26]*v[30])+(u[27]*v[31])+(u[28]*v[1])-(u[29]*v[61])-(u[30]*v[26])-(u[31]*v[27])+(u[32]*v[36])+(u[33]*v[37])+(u[34]*v[2])-(u[35]*v[62])-(u[36]*v[32])-(u[37]*v[33])-(u[38]*v[41])-(u[39]*v[4])-(u[40]*v[5])+(u[41]*v[38])-(u[42]*v[46])-(u[43]*v[47])-(u[44]*v[7])+(u[45]*v[63])+(u[46]*v[42])+(u[47]*v[43])+(u[48]*v[51])+(u[49]*v[9])+(u[50]*v[10])-(u[51]*v[48])+(u[52]*v[55])+(u[53]*v[13])+(u[54]*v[14])-(u[55]*v[52])-(u[56]*v[19])+(u[57]*v[60])+(u[58]*v[23])+(u[59]*v[24])-(u[60]*v[57])-(u[61]*v[29])-(u[62]*v[35])+(u[63]*v[45]),(u[0]*v[19])+(u[1]*v[29])+(u[2]*v[35])+(u[3]*v[38])+(u[4]*v[5])-(u[5]*v[4])+(u[6]*v[41])-(u[7]*v[45])-(u[8]*v[48])-(u[9]*v[10])+(u[10]*v[9])-(u[11]*v[51])-(u[12]*v[52])-(u[13]*v[14])+(u[14]*v[13])-(u[15]*v[55])-(u[16]*v[17])+(u[17]*v[16])-(u[18]*v[56])+(u[19]*v[0])-(u[20]*v[21])+(u[21]*v[20])-(u[22]*v[57])-(u[23]*v[24])+(u[24]*v[23])-(u[25]*v[60])-(u[26]*v[27])+(u[27]*v[26])-(u[28]*v[61])+(u[29]*v[1])-(u[30]*v[31])+(u[31]*v[30])-(u[32]*v[33])+(u[33]*v[32])-(u[34]*v[62])+(u[35]*v[2])-(u[36]*v[37])+(u[37]*v[36])+(u[38]*v[3])-(u[39]*v[40])+(u[40]*v[39])+(u[41]*v[6])+(u[42]*v[43])-(u[43]*v[42])+(u[44]*v[63])-(u[45]*v[7])+(u[46]*v[47])-(u[47]*v[46])-(u[48]*v[8])+(u[49]*v[50])-(u[50]*v[49])-(u[51]*v[11])-(u[52]*v[12])+(u[53]*v[54])-(u[54]*v[53])-(u[55]*v[15])-(u[56]*v[18])-(u[57]*v[22])+(u[58]*v[59])-(u[59]*v[58])-(u[60]*v[25])-(u[61]*v[28])-(u[62]*v[34])+(u[63]*v[44]),(u[0]*v[20])+(u[1]*v[30])+(u[2]*v[36])+(u[3]*v[39])+(u[4]*v[6])-(u[5]*v[41])-(u[6]*v[4])-(u[7]*v[46])-(u[8]*v[49])-(u[9]*v[11])+(u[10]*v[51])+(u[11]*v[9])-(u[12]*v[53])-(u[13]*v[15])+(u[14]*v[55])+(u[15]*v[13])-(u[16]*v[18])+(u[17]*v[56])+(u[18]*v[16])+(u[19]*v[21])+(u[20]*v[0])-(u[21]*v[19])-(u[22]*v[58])-(u[23]*v[25])+(u[24]*v[60])+(u[25]*v[23])-(u[26]*v[28])+(u[27]*v[61])+(u[28]*v[26])+(u[29]*v[31])+(u[30]*v[1])-(u[31]*v[29])-(u[32]*v[34])+(u[33]*v[62])+(u[34]*v[32])+(u[35]*v[37])+(u[36]*v[2])-(u[37]*v[35])+(u[38]*v[40])+(u[39]*v[3])-(u[40]*v[38])-(u[41]*v[5])+(u[42]*v[44])-(u[43]*v[63])-(u[44]*v[42])-(u[45]*v[47])-(u[46]*v[7])+(u[47]*v[45])-(u[48]*v[50])-(u[49]*v[8])+(u[50]*v[48])+(u[51]*v[10])-(u[52]*v[54])-(u[53]*v[12])+(u[54]*v[52])+(u[55]*v[14])+(u[56]*v[17])-(u[57]*v[59])-(u[58]*v[22])+(u[59]*v[57])+(u[60]*v[24])+(u[61]*v[27])+(u[62]*v[33])-(u[63]*v[43]),(u[0]*v[21])+(u[1]*v[31])+(u[2]*v[37])+(u[3]*v[40])+(u[4]*v[41])+(u[5]*v[6])-(u[6]*v[5])-(u[7]*v[47])-(u[8]*v[50])-(u[9]*v[51])-(u[10]*v[11])+(u[11]*v[10])-(u[12]*v[54])-(u[13]*v[55])-(u[14]*v[15])+(u[15]*v[14])-(u[16]*v[56])-(u[17]*v[18])+(u[18]*v[17])-(u[19]*v[20])+(u[20]*v[19])+(u[21]*v[0])-(u[22]*v[59])-(u[23]*v[60])-(u[24]*v[25])+(u[25]*v[24])-(u[26]*v[61])-(u[27]*v[28])+(u[28]*v[27])-(u[29]*v[30])+(u[30]*v[29])+(u[31]*v[1])-(u[32]*v[62])-(u[33]*v[34])+(u[34]*v[33])-(u[35]*v[36])+(u[36]*v[35])+(u[37]*v[2])-(u[38]*v[39])+(u[39]*v[38])+(u[40]*v[3])+(u[41]*v[4])+(u[42]*v[63])+(u[43]*v[44])-(u[44]*v[43])+(u[45]*v[46])-(u[46]*v[45])-(u[47]*v[7])+(u[48]*v[49])-(u[49]*v[48])-(u[50]*v[8])-(u[51]*v[9])+(u[52]*v[53])-(u[53]*v[52])-(u[54]*v[12])-(u[55]*v[13])-(u[56]*v[16])+(u[57]*v[58])-(u[58]*v[57])-(u[59]*v[22])-(u[60]*v[23])-(u[61]*v[26])-(u[62]*v[32])+(u[63]*v[42]),(u[0]*v[22])+(u[1]*v[12])-(u[2]*v[8])+(u[3]*v[7])-(u[4]*v[42])-(u[5]*v[43])-(u[6]*v[44])+(u[7]*v[3])-(u[8]*v[2])+(u[9]*v[32])+(u[10]*v[33])+(u[11]*v[34])+(u[12]*v[1])-(u[13]*v[26])-(u[14]*v[27])-(u[15]*v[28])+(u[16]*v[23])+(u[17]*v[24])+(u[18]*v[25])-(u[19]*v[57])-(u[20]*v[58])-(u[21]*v[59])+(u[22]*v[0])-(u[23]*v[16])-(u[24]*v[17])-(u[25]*v[18])+(u[26]*v[13])+(u[27]*v[14])+(u[28]*v[15])-(u[29]*v[52])-(u[30]*v[53])-(u[31]*v[54])-(u[32]*v[9])-(u[33]*v[10])-(u[34]*v[11])+(u[35]*v[48])+(u[36]*v[49])+(u[37]*v[50])-(u[38]*v[45])-(u[39]*v[46])-(u[40]*v[47])+(u[41]*v[63])+(u[42]*v[4])+(u[43]*v[5])+(u[44]*v[6])-(u[45]*v[38])-(u[46]*v[39])-(u[47]*v[40])+(u[48]*v[35])+(u[49]*v[36])+(u[50]*v[37])-(u[51]*v[62])-(u[52]*v[29])-(u[53]*v[30])-(u[54]*v[31])+(u[55]*v[61])-(u[56]*v[60])-(u[57]*v[19])-(u[58]*v[20])-(u[59]*v[21])+(u[60]*v[56])-(u[61]*v[55])+(u[62]*v[51])-(u[63]*v[41]),(u[0]*v[23])+(u[1]*v[13])-(u[2]*v[9])+(u[3]*v[42])+(u[4]*v[7])-(u[5]*v[45])-(u[6]*v[46])+(u[7]*v[4])-(u[8]*v[32])-(u[9]*v[2])+(u[10]*v[35])+(u[11]*v[36])+(u[12]*v[26])+(u[13]*v[1])-(u[14]*v[29])-(u[15]*v[30])-(u[16]*v[22])+(u[17]*v[57])+(u[18]*v[58])+(u[19]*v[24])+(u[20]*v[25])-(u[21]*v[60])+(u[22]*v[16])+(u[23]*v[0])-(u[24]*v[19])-(u[25]*v[20])-(u[26]*v[12])+(u[27]*v[52])+(u[28]*v[53])+(u[29]*v[14])+(u[30]*v[15])-(u[31]*v[55])+(u[32]*v[8])-(u[33]*v[48])-(u[34]*v[49])-(u[35]*v[10])-(u[36]*v[11])+(u[37]*v[51])+(u[38]*v[43])+(u[39]*v[44])-(u[40]*v[63])-(u[41]*v[47])-(u[42]*v[3])+(u[43]*v[38])+(u[44]*v[39])+(u[45]*v[5])+(u[46]*v[6])-(u[47]*v[41])-(u[48]*v[33])-(u[49]*v[34])+(u[50]*v[62])+(u[51]*v[37])+(u[52]*v[27])+(u[53]*v[28])-(u[54]*v[61])-(u[55]*v[31])+(u[56]*v[59])+(u[57]*v[17])+(u[58]*v[18])-(u[59]*v[56])-(u[60]*v[21])+(u[61]*v[54])-(u[62]*v[50])+(u[63]*v[40]),(u[0]*v[24])+(u[1]*v[14])-(u[2]*v[10])+(u[3]*v[43])+(u[4]*v[45])+(u[5]*v[7])-(u[6]*v[47])+(u[7]*v[5])-(u[8]*v[33])-(u[9]*v[35])-(u[10]*v[2])+(u[11]*v[37])+(u[12]*v[27])+(u[13]*v[29])+(u[14]*v[1])-(u[15]*v[31])-(u[16]*v[57])-(u[17]*v[22])+(u[18]*v[59])-(u[19]*v[23])+(u[20]*v[60])+(u[21]*v[25])+(u[22]*v[17])+(u[23]*v[19])+(u[24]*v[0])-(u[25]*v[21])-(u[26]*v[52])-(u[27]*v[12])+(u[28]*v[54])-(u[29]*v[13])+(u[30]*v[55])+(u[31]*v[15])+(u[32]*v[48])+(u[33]*v[8])-(u[34]*v[50])+(u[35]*v[9])-(u[36]*v[51])-(u[37]*v[11])-(u[38]*v[42])+(u[39]*v[63])+(u[40]*v[44])+(u[41]*v[46])-(u[42]*v[38])-(u[43]*v[3])+(u[44]*v[40])-(u[45]*v[4])+(u[46]*v[41])+(u[47]*v[6])+(u[48]*v[32])-(u[49]*v[62])-(u[50]*v[34])-(u[51]*v[36])-(u[52]*v[26])+(u[53]*v[61])+(u[54]*v[28])+(u[55]*v[30])-(u[56]*v[58])-(u[57]*v[16])+(u[58]*v[56])+(u[59]*v[18])+(u[60]*v[20])-(u[61]*v[53])+(u[62]*v[49])-(u[63]*v[39]),(u[0]*v[25])+(u[1]*v[15])-(u[2]*v[11])+(u[3]*v[44])+(u[4]*v[46])+(u[5]*v[47])+(u[6]*v[7])+(u[7]*v[6])-(u[8]*v[34])-(u[9]*v[36])-(u[10]*v[37])-(u[11]*v[2])+(u[12]*v[28])+(u[13]*v[30])+(u[14]*v[31])+(u[15]*v[1])-(u[16]*v[58])-(u[17]*v[59])-(u[18]*v[22])-(u[19]*v[60])-(u[20]*v[23])-(u[21]*v[24])+(u[22]*v[18])+(u[23]*v[20])+(u[24]*v[21])+(u[25]*v[0])-(u[26]*v[53])-(u[27]*v[54])-(u[28]*v[12])-(u[29]*v[55])-(u[30]*v[13])-(u[31]*v[14])+(u[32]*v[49])+(u[33]*v[50])+(u[34]*v[8])+(u[35]*v[51])+(u[36]*v[9])+(u[37]*v[10])-(u[38]*v[63])-(u[39]*v[42])-(u[40]*v[43])-(u[41]*v[45])-(u[42]*v[39])-(u[43]*v[40])-(u[44]*v[3])-(u[45]*v[41])-(u[46]*v[4])-(u[47]*v[5])+(u[48]*v[62])+(u[49]*v[32])+(u[50]*v[33])+(u[51]*v[35])-(u[52]*v[61])-(u[53]*v[26])-(u[54]*v[27])-(u[55]*v[29])+(u[56]*v[57])-(u[57]*v[56])-(u[58]*v[16])-(u[59]*v[17])-(u[60]*v[19])+(u[61]*v[52])-(u[62]*v[48])+(u[63]*v[38]),(u[0]*v[26])+(u[1]*v[16])-(u[2]*v[42])-(u[3]*v[9])+(u[4]*v[8])-(u[5]*v[48])-(u[6]*v[49])+(u[7]*v[32])+(u[8]*v[4])-(u[9]*v[3])+(u[10]*v[38])+(u[11]*v[39])-(u[12]*v[23])+(u[13]*v[22])-(u[14]*v[57])-(u[15]*v[58])+(u[16]*v[1])-(u[17]*v[29])-(u[18]*v[30])+(u[19]*v[27])+(u[20]*v[28])-(u[21]*v[61])-(u[22]*v[13])+(u[23]*v[12])-(u[24]*v[52])-(u[25]*v[53])+(u[26]*v[0])-(u[27]*v[19])-(u[28]*v[20])+(u[29]*v[17])+(u[30]*v[18])-(u[31]*v[56])-(u[32]*v[7])+(u[33]*v[45])+(u[34]*v[46])-(u[35]*v[43])-(u[36]*v[44])+(u[37]*v[63])-(u[38]*v[10])-(u[39]*v[11])+(u[40]*v[51])-(u[41]*v[50])+(u[42]*v[2])-(u[43]*v[35])-(u[44]*v[36])+(u[45]*v[33])+(u[46]*v[34])-(u[47]*v[62])+(u[48]*v[5])+(u[49]*v[6])-(u[50]*v[41])+(u[51]*v[40])-(u[52]*v[24])-(u[53]*v[25])+(u[54]*v[60])-(u[55]*v[59])-(u[56]*v[31])-(u[57]*v[14])-(u[58]*v[15])+(u[59]*v[55])-(u[60]*v[54])-(u[61]*v[21])+(u[62]*v[47])-(u[63]*v[37]),(u[0]*v[27])+(u[1]*v[17])-(u[2]*v[43])-(u[3]*v[10])+(u[4]*v[48])+(u[5]*v[8])-(u[6]*v[50])+(u[7]*v[33])+(u[8]*v[5])-(u[9]*v[38])-(u[10]*v[3])+(u[11]*v[40])-(u[12]*v[24])+(u[13]*v[57])+(u[14]*v[22])-(u[15]*v[59])+(u[16]*v[29])+(u[17]*v[1])-(u[18]*v[31])-(u[19]*v[26])+(u[20]*v[61])+(u[21]*v[28])-(u[22]*v[14])+(u[23]*v[52])+(u[24]*v[12])-(u[25]*v[54])+(u[26]*v[19])+(u[27]*v[0])-(u[28]*v[21])-(u[29]*v[16])+(u[30]*v[56])+(u[31]*v[18])-(u[32]*v[45])-(u[33]*v[7])+(u[34]*v[47])+(u[35]*v[42])-(u[36]*v[63])-(u[37]*v[44])+(u[38]*v[9])-(u[39]*v[51])-(u[40]*v[11])+(u[41]*v[49])+(u[42]*v[35])+(u[43]*v[2])-(u[44]*v[37])-(u[45]*v[32])+(u[46]*v[62])+(u[47]*v[34])-(u[48]*v[4])+(u[49]*v[41])+(u[50]*v[6])-(u[51]*v[39])+(u[52]*v[23])-(u[53]*v[60])-(u[54]*v[25])+(u[55]*v[58])+(u[56]*v[30])+(u[57]*v[13])-(u[58]*v[55])-(u[59]*v[15])+(u[60]*v[53])+(u[61]*v[20])-(u[62]*v[46])+(u[63]*v[36]),(u[0]*v[28])+(u[1]*v[18])-(u[2]*v[44])-(u[3]*v[11])+(u[4]*v[49])+(u[5]*v[50])+(u[6]*v[8])+(u[7]*v[34])+(u[8]*v[6])-(u[9]*v[39])-(u[10]*v[40])-(u[11]*v[3])-(u[12]*v[25])+(u[13]*v[58])+(u[14]*v[59])+(u[15]*v[22])+(u[16]*v[30])+(u[17]*v[31])+(u[18]*v[1])-(u[19]*v[61])-(u[20]*v[26])-(u[21]*v[27])-(u[22]*v[15])+(u[23]*v[53])+(u[24]*v[54])+(u[25]*v[12])+(u[26]*v[20])+(u[27]*v[21])+(u[28]*v[0])-(u[29]*v[56])-(u[30]*v[16])-(u[31]*v[17])-(u[32]*v[46])-(u[33]*v[47])-(u[34]*v[7])+(u[35]*v[63])+(u[36]*v[42])+(u[37]*v[43])+(u[38]*v[51])+(u[39]*v[9])+(u[40]*v[10])-(u[41]*v[48])+(u[42]*v[36])+(u[43]*v[37])+(u[44]*v[2])-(u[45]*v[62])-(u[46]*v[32])-(u[47]*v[33])-(u[48]*v[41])-(u[49]*v[4])-(u[50]*v[5])+(u[51]*v[38])+(u[52]*v[60])+(u[53]*v[23])+(u[54]*v[24])-(u[55]*v[57])-(u[56]*v[29])+(u[57]*v[55])+(u[58]*v[13])+(u[59]*v[14])-(u[60]*v[52])-(u[61]*v[19])+(u[62]*v[45])-(u[63]*v[35]),(u[0]*v[29])+(u[1]*v[19])-(u[2]*v[45])-(u[3]*v[48])-(u[4]*v[10])+(u[5]*v[9])-(u[6]*v[51])+(u[7]*v[35])+(u[8]*v[38])+(u[9]*v[5])-(u[10]*v[4])+(u[11]*v[41])-(u[12]*v[57])-(u[13]*v[24])+(u[14]*v[23])-(u[15]*v[60])-(u[16]*v[27])+(u[17]*v[26])-(u[18]*v[61])+(u[19]*v[1])-(u[20]*v[31])+(u[21]*v[30])-(u[22]*v[52])-(u[23]*v[14])+(u[24]*v[13])-(u[25]*v[55])-(u[26]*v[17])+(u[27]*v[16])-(u[28]*v[56])+(u[29]*v[0])-(u[30]*v[21])+(u[31]*v[20])+(u[32]*v[43])-(u[33]*v[42])+(u[34]*v[63])-(u[35]*v[7])+(u[36]*v[47])-(u[37]*v[46])-(u[38]*v[8])+(u[39]*v[50])-(u[40]*v[49])-(u[41]*v[11])-(u[42]*v[33])+(u[43]*v[32])-(u[44]*v[62])+(u[45]*v[2])-(u[46]*v[37])+(u[47]*v[36])+(u[48]*v[3])-(u[49]*v[40])+(u[50]*v[39])+(u[51]*v[6])-(u[52]*v[22])+(u[53]*v[59])-(u[54]*v[58])-(u[55]*v[25])-(u[56]*v[28])-(u[57]*v[12])+(u[58]*v[54])-(u[59]*v[53])-(u[60]*v[15])-(u[61]*v[18])+(u[62]*v[44])-(u[63]*v[34]),(u[0]*v[30])+(u[1]*v[20])-(u[2]*v[46])-(u[3]*v[49])-(u[4]*v[11])+(u[5]*v[51])+(u[6]*v[9])+(u[7]*v[36])+(u[8]*v[39])+(u[9]*v[6])-(u[10]*v[41])-(u[11]*v[4])-(u[12]*v[58])-(u[13]*v[25])+(u[14]*v[60])+(u[15]*v[23])-(u[16]*v[28])+(u[17]*v[61])+(u[18]*v[26])+(u[19]*v[31])+(u[20]*v[1])-(u[21]*v[29])-(u[22]*v[53])-(u[23]*v[15])+(u[24]*v[55])+(u[25]*v[13])-(u[26]*v[18])+(u[27]*v[56])+(u[28]*v[16])+(u[29]*v[21])+(u[30]*v[0])-(u[31]*v[19])+(u[32]*v[44])-(u[33]*v[63])-(u[34]*v[42])-(u[35]*v[47])-(u[36]*v[7])+(u[37]*v[45])-(u[38]*v[50])-(u[39]*v[8])+(u[40]*v[48])+(u[41]*v[10])-(u[42]*v[34])+(u[43]*v[62])+(u[44]*v[32])+(u[45]*v[37])+(u[46]*v[2])-(u[47]*v[35])+(u[48]*v[40])+(u[49]*v[3])-(u[50]*v[38])-(u[51]*v[5])-(u[52]*v[59])-(u[53]*v[22])+(u[54]*v[57])+(u[55]*v[24])+(u[56]*v[27])-(u[57]*v[54])-(u[58]*v[12])+(u[59]*v[52])+(u[60]*v[14])+(u[61]*v[17])-(u[62]*v[43])+(u[63]*v[33]),(u[0]*v[31])+(u[1]*v[21])-(u[2]*v[47])-(u[3]*v[50])-(u[4]*v[51])-(u[5]*v[11])+(u[6]*v[10])+(u[7]*v[37])+(u[8]*v[40])+(u[9]*v[41])+(u[10]*v[6])-(u[11]*v[5])-(u[12]*v[59])-(u[13]*v[60])-(u[14]*v[25])+(u[15]*v[24])-(u[16]*v[61])-(u[17]*v[28])+(u[18]*v[27])-(u[19]*v[30])+(u[20]*v[29])+(u[21]*v[1])-(u[22]*v[54])-(u[23]*v[55])-(u[24]*v[15])+(u[25]*v[14])-(u[26]*v[56])-(u[27]*v[18])+(u[28]*v[17])-(u[29]*v[20])+(u[30]*v[19])+(u[31]*v[0])+(u[32]*v[63])+(u[33]*v[44])-(u[34]*v[43])+(u[35]*v[46])-(u[36]*v[45])-(u[37]*v[7])+(u[38]*v[49])-(u[39]*v[48])-(u[40]*v[8])-(u[41]*v[9])-(u[42]*v[62])-(u[43]*v[34])+(u[44]*v[33])-(u[45]*v[36])+(u[46]*v[35])+(u[47]*v[2])-(u[48]*v[39])+(u[49]*v[38])+(u[50]*v[3])+(u[51]*v[4])+(u[52]*v[58])-(u[53]*v[57])-(u[54]*v[22])-(u[55]*v[23])-(u[56]*v[26])+(u[57]*v[53])-(u[58]*v[52])-(u[59]*v[12])-(u[60]*v[13])-(u[61]*v[16])+(u[62]*v[42])-(u[63]*v[32]),(u[0]*v[32])+(u[1]*v[42])+(u[2]*v[16])-(u[3]*v[13])+(u[4]*v[12])-(u[5]*v[52])-(u[6]*v[53])-(u[7]*v[26])+(u[8]*v[23])-(u[9]*v[22])+(u[10]*v[57])+(u[11]*v[58])+(u[12]*v[4])-(u[13]*v[3])+(u[14]*v[38])+(u[15]*v[39])+(u[16]*v[2])-(u[17]*v[35])-(u[18]*v[36])+(u[19]*v[33])+(u[20]*v[34])-(u[21]*v[62])+(u[22]*v[9])-(u[23]*v[8])+(u[24]*v[48])+(u[25]*v[49])+(u[26]*v[7])-(u[27]*v[45])-(u[28]*v[46])+(u[29]*v[43])+(u[30]*v[44])-(u[31]*v[63])+(u[32]*v[0])-(u[33]*v[19])-(u[34]*v[20])+(u[35]*v[17])+(u[36]*v[18])-(u[37]*v[56])-(u[38]*v[14])-(u[39]*v[15])+(u[40]*v[55])-(u[41]*v[54])-(u[42]*v[1])+(u[43]*v[29])+(u[44]*v[30])-(u[45]*v[27])-(u[46]*v[28])+(u[47]*v[61])+(u[48]*v[24])+(u[49]*v[25])-(u[50]*v[60])+(u[51]*v[59])+(u[52]*v[5])+(u[53]*v[6])-(u[54]*v[41])+(u[55]*v[40])-(u[56]*v[37])+(u[57]*v[10])+(u[58]*v[11])-(u[59]*v[51])+(u[60]*v[50])-(u[61]*v[47])-(u[62]*v[21])+(u[63]*v[31]),(u[0]*v[33])+(u[1]*v[43])+(u[2]*v[17])-(u[3]*v[14])+(u[4]*v[52])+(u[5]*v[12])-(u[6]*v[54])-(u[7]*v[27])+(u[8]*v[24])-(u[9]*v[57])-(u[10]*v[22])+(u[11]*v[59])+(u[12]*v[5])-(u[13]*v[38])-(u[14]*v[3])+(u[15]*v[40])+(u[16]*v[35])+(u[17]*v[2])-(u[18]*v[37])-(u[19]*v[32])+(u[20]*v[62])+(u[21]*v[34])+(u[22]*v[10])-(u[23]*v[48])-(u[24]*v[8])+(u[25]*v[50])+(u[26]*v[45])+(u[27]*v[7])-(u[28]*v[47])-(u[29]*v[42])+(u[30]*v[63])+(u[31]*v[44])+(u[32]*v[19])+(u[33]*v[0])-(u[34]*v[21])-(u[35]*v[16])+(u[36]*v[56])+(u[37]*v[18])+(u[38]*v[13])-(u[39]*v[55])-(u[40]*v[15])+(u[41]*v[53])-(u[42]*v[29])-(u[43]*v[1])+(u[44]*v[31])+(u[45]*v[26])-(u[46]*v[61])-(u[47]*v[28])-(u[48]*v[23])+(u[49]*v[60])+(u[50]*v[25])-(u[51]*v[58])-(u[52]*v[4])+(u[53]*v[41])+(u[54]*v[6])-(u[55]*v[39])+(u[56]*v[36])-(u[57]*v[9])+(u[58]*v[51])+(u[59]*v[11])-(u[60]*v[49])+(u[61]*v[46])+(u[62]*v[20])-(u[63]*v[30]),(u[0]*v[34])+(u[1]*v[44])+(u[2]*v[18])-(u[3]*v[15])+(u[4]*v[53])+(u[5]*v[54])+(u[6]*v[12])-(u[7]*v[28])+(u[8]*v[25])-(u[9]*v[58])-(u[10]*v[59])-(u[11]*v[22])+(u[12]*v[6])-(u[13]*v[39])-(u[14]*v[40])-(u[15]*v[3])+(u[16]*v[36])+(u[17]*v[37])+(u[18]*v[2])-(u[19]*v[62])-(u[20]*v[32])-(u[21]*v[33])+(u[22]*v[11])-(u[23]*v[49])-(u[24]*v[50])-(u[25]*v[8])+(u[26]*v[46])+(u[27]*v[47])+(u[28]*v[7])-(u[29]*v[63])-(u[30]*v[42])-(u[31]*v[43])+(u[32]*v[20])+(u[33]*v[21])+(u[34]*v[0])-(u[35]*v[56])-(u[36]*v[16])-(u[37]*v[17])+(u[38]*v[55])+(u[39]*v[13])+(u[40]*v[14])-(u[41]*v[52])-(u[42]*v[30])-(u[43]*v[31])-(u[44]*v[1])+(u[45]*v[61])+(u[46]*v[26])+(u[47]*v[27])-(u[48]*v[60])-(u[49]*v[23])-(u[50]*v[24])+(u[51]*v[57])-(u[52]*v[41])-(u[53]*v[4])-(u[54]*v[5])+(u[55]*v[38])-(u[56]*v[35])-(u[57]*v[51])-(u[58]*v[9])-(u[59]*v[10])+(u[60]*v[48])-(u[61]*v[45])-(u[62]*v[19])+(u[63]*v[29]),(u[0]*v[35])+(u[1]*v[45])+(u[2]*v[19])-(u[3]*v[52])-(u[4]*v[14])+(u[5]*v[13])-(u[6]*v[55])-(u[7]*v[29])+(u[8]*v[57])+(u[9]*v[24])-(u[10]*v[23])+(u[11]*v[60])+(u[12]*v[38])+(u[13]*v[5])-(u[14]*v[4])+(u[15]*v[41])-(u[16]*v[33])+(u[17]*v[32])-(u[18]*v[62])+(u[19]*v[2])-(u[20]*v[37])+(u[21]*v[36])+(u[22]*v[48])+(u[23]*v[10])-(u[24]*v[9])+(u[25]*v[51])-(u[26]*v[43])+(u[27]*v[42])-(u[28]*v[63])+(u[29]*v[7])-(u[30]*v[47])+(u[31]*v[46])-(u[32]*v[17])+(u[33]*v[16])-(u[34]*v[56])+(u[35]*v[0])-(u[36]*v[21])+(u[37]*v[20])-(u[38]*v[12])+(u[39]*v[54])-(u[40]*v[53])-(u[41]*v[15])+(u[42]*v[27])-(u[43]*v[26])+(u[44]*v[61])-(u[45]*v[1])+(u[46]*v[31])-(u[47]*v[30])+(u[48]*v[22])-(u[49]*v[59])+(u[50]*v[58])+(u[51]*v[25])+(u[52]*v[3])-(u[53]*v[40])+(u[54]*v[39])+(u[55]*v[6])-(u[56]*v[34])+(u[57]*v[8])-(u[58]*v[50])+(u[59]*v[49])+(u[60]*v[11])-(u[61]*v[44])-(u[62]*v[18])+(u[63]*v[28]),(u[0]*v[36])+(u[1]*v[46])+(u[2]*v[20])-(u[3]*v[53])-(u[4]*v[15])+(u[5]*v[55])+(u[6]*v[13])-(u[7]*v[30])+(u[8]*v[58])+(u[9]*v[25])-(u[10]*v[60])-(u[11]*v[23])+(u[12]*v[39])+(u[13]*v[6])-(u[14]*v[41])-(u[15]*v[4])-(u[16]*v[34])+(u[17]*v[62])+(u[18]*v[32])+(u[19]*v[37])+(u[20]*v[2])-(u[21]*v[35])+(u[22]*v[49])+(u[23]*v[11])-(u[24]*v[51])-(u[25]*v[9])-(u[26]*v[44])+(u[27]*v[63])+(u[28]*v[42])+(u[29]*v[47])+(u[30]*v[7])-(u[31]*v[45])-(u[32]*v[18])+(u[33]*v[56])+(u[34]*v[16])+(u[35]*v[21])+(u[36]*v[0])-(u[37]*v[19])-(u[38]*v[54])-(u[39]*v[12])+(u[40]*v[52])+(u[41]*v[14])+(u[42]*v[28])-(u[43]*v[61])-(u[44]*v[26])-(u[45]*v[31])-(u[46]*v[1])+(u[47]*v[29])+(u[48]*v[59])+(u[49]*v[22])-(u[50]*v[57])-(u[51]*v[24])+(u[52]*v[40])+(u[53]*v[3])-(u[54]*v[38])-(u[55]*v[5])+(u[56]*v[33])+(u[57]*v[50])+(u[58]*v[8])-(u[59]*v[48])-(u[60]*v[10])+(u[61]*v[43])+(u[62]*v[17])-(u[63]*v[27]),(u[0]*v[37])+(u[1]*v[47])+(u[2]*v[21])-(u[3]*v[54])-(u[4]*v[55])-(u[5]*v[15])+(u[6]*v[14])-(u[7]*v[31])+(u[8]*v[59])+(u[9]*v[60])+(u[10]*v[25])-(u[11]*v[24])+(u[12]*v[40])+(u[13]*v[41])+(u[14]*v[6])-(u[15]*v[5])-(u[16]*v[62])-(u[17]*v[34])+(u[18]*v[33])-(u[19]*v[36])+(u[20]*v[35])+(u[21]*v[2])+(u[22]*v[50])+(u[23]*v[51])+(u[24]*v[11])-(u[25]*v[10])-(u[26]*v[63])-(u[27]*v[44])+(u[28]*v[43])-(u[29]*v[46])+(u[30]*v[45])+(u[31]*v[7])-(u[32]*v[56])-(u[33]*v[18])+(u[34]*v[17])-(u[35]*v[20])+(u[36]*v[19])+(u[37]*v[0])+(u[38]*v[53])-(u[39]*v[52])-(u[40]*v[12])-(u[41]*v[13])+(u[42]*v[61])+(u[43]*v[28])-(u[44]*v[27])+(u[45]*v[30])-(u[46]*v[29])-(u[47]*v[1])-(u[48]*v[58])+(u[49]*v[57])+(u[50]*v[22])+(u[51]*v[23])-(u[52]*v[39])+(u[53]*v[38])+(u[54]*v[3])+(u[55]*v[4])-(u[56]*v[32])-(u[57]*v[49])+(u[58]*v[48])+(u[59]*v[8])+(u[60]*v[9])-(u[61]*v[42])-(u[62]*v[16])+(u[63]*v[26]),(u[0]*v[38])+(u[1]*v[48])+(u[2]*v[52])+(u[3]*v[19])-(u[4]*v[17])+(u[5]*v[16])-(u[6]*v[56])-(u[7]*v[57])-(u[8]*v[29])+(u[9]*v[27])-(u[10]*v[26])+(u[11]*v[61])-(u[12]*v[35])+(u[13]*v[33])-(u[14]*v[32])+(u[15]*v[62])+(u[16]*v[5])-(u[17]*v[4])+(u[18]*v[41])+(u[19]*v[3])-(u[20]*v[40])+(u[21]*v[39])-(u[22]*v[45])+(u[23]*v[43])-(u[24]*v[42])+(u[25]*v[63])+(u[26]*v[10])-(u[27]*v[9])+(u[28]*v[51])+(u[29]*v[8])-(u[30]*v[50])+(u[31]*v[49])+(u[32]*v[14])-(u[33]*v[13])+(u[34]*v[55])+(u[35]*v[12])-(u[36]*v[54])+(u[37]*v[53])+(u[38]*v[0])-(u[39]*v[21])+(u[40]*v[20])-(u[41]*v[18])-(u[42]*v[24])+(u[43]*v[23])-(u[44]*v[60])-(u[45]*v[22])+(u[46]*v[59])-(u[47]*v[58])-(u[48]*v[1])+(u[49]*v[31])-(u[50]*v[30])+(u[51]*v[28])-(u[52]*v[2])+(u[53]*v[37])-(u[54]*v[36])+(u[55]*v[34])+(u[56]*v[6])-(u[57]*v[7])+(u[58]*v[47])-(u[59]*v[46])+(u[60]*v[44])+(u[61]*v[11])+(u[62]*v[15])-(u[63]*v[25]),(u[0]*v[39])+(u[1]*v[49])+(u[2]*v[53])+(u[3]*v[20])-(u[4]*v[18])+(u[5]*v[56])+(u[6]*v[16])-(u[7]*v[58])-(u[8]*v[30])+(u[9]*v[28])-(u[10]*v[61])-(u[11]*v[26])-(u[12]*v[36])+(u[13]*v[34])-(u[14]*v[62])-(u[15]*v[32])+(u[16]*v[6])-(u[17]*v[41])-(u[18]*v[4])+(u[19]*v[40])+(u[20]*v[3])-(u[21]*v[38])-(u[22]*v[46])+(u[23]*v[44])-(u[24]*v[63])-(u[25]*v[42])+(u[26]*v[11])-(u[27]*v[51])-(u[28]*v[9])+(u[29]*v[50])+(u[30]*v[8])-(u[31]*v[48])+(u[32]*v[15])-(u[33]*v[55])-(u[34]*v[13])+(u[35]*v[54])+(u[36]*v[12])-(u[37]*v[52])+(u[38]*v[21])+(u[39]*v[0])-(u[40]*v[19])+(u[41]*v[17])-(u[42]*v[25])+(u[43]*v[60])+(u[44]*v[23])-(u[45]*v[59])-(u[46]*v[22])+(u[47]*v[57])-(u[48]*v[31])-(u[49]*v[1])+(u[50]*v[29])-(u[51]*v[27])-(u[52]*v[37])-(u[53]*v[2])+(u[54]*v[35])-(u[55]*v[33])-(u[56]*v[5])-(u[57]*v[47])-(u[58]*v[7])+(u[59]*v[45])-(u[60]*v[43])-(u[61]*v[10])-(u[62]*v[14])+(u[63]*v[24]),(u[0]*v[40])+(u[1]*v[50])+(u[2]*v[54])+(u[3]*v[21])-(u[4]*v[56])-(u[5]*v[18])+(u[6]*v[17])-(u[7]*v[59])-(u[8]*v[31])+(u[9]*v[61])+(u[10]*v[28])-(u[11]*v[27])-(u[12]*v[37])+(u[13]*v[62])+(u[14]*v[34])-(u[15]*v[33])+(u[16]*v[41])+(u[17]*v[6])-(u[18]*v[5])-(u[19]*v[39])+(u[20]*v[38])+(u[21]*v[3])-(u[22]*v[47])+(u[23]*v[63])+(u[24]*v[44])-(u[25]*v[43])+(u[26]*v[51])+(u[27]*v[11])-(u[28]*v[10])-(u[29]*v[49])+(u[30]*v[48])+(u[31]*v[8])+(u[32]*v[55])+(u[33]*v[15])-(u[34]*v[14])-(u[35]*v[53])+(u[36]*v[52])+(u[37]*v[12])-(u[38]*v[20])+(u[39]*v[19])+(u[40]*v[0])-(u[41]*v[16])-(u[42]*v[60])-(u[43]*v[25])+(u[44]*v[24])+(u[45]*v[58])-(u[46]*v[57])-(u[47]*v[22])+(u[48]*v[30])-(u[49]*v[29])-(u[50]*v[1])+(u[51]*v[26])+(u[52]*v[36])-(u[53]*v[35])-(u[54]*v[2])+(u[55]*v[32])+(u[56]*v[4])+(u[57]*v[46])-(u[58]*v[45])-(u[59]*v[7])+(u[60]*v[42])+(u[61]*v[9])+(u[62]*v[13])-(u[63]*v[23]),(u[0]*v[41])+(u[1]*v[51])+(u[2]*v[55])+(u[3]*v[56])+(u[4]*v[21])-(u[5]*v[20])+(u[6]*v[19])-(u[7]*v[60])-(u[8]*v[61])-(u[9]*v[31])+(u[10]*v[30])-(u[11]*v[29])-(u[12]*v[62])-(u[13]*v[37])+(u[14]*v[36])-(u[15]*v[35])-(u[16]*v[40])+(u[17]*v[39])-(u[18]*v[38])+(u[19]*v[6])-(u[20]*v[5])+(u[21]*v[4])-(u[22]*v[63])-(u[23]*v[47])+(u[24]*v[46])-(u[25]*v[45])-(u[26]*v[50])+(u[27]*v[49])-(u[28]*v[48])+(u[29]*v[11])-(u[30]*v[10])+(u[31]*v[9])-(u[32]*v[54])+(u[33]*v[53])-(u[34]*v[52])+(u[35]*v[15])-(u[36]*v[14])+(u[37]*v[13])+(u[38]*v[18])-(u[39]*v[17])+(u[40]*v[16])+(u[41]*v[0])+(u[42]*v[59])-(u[43]*v[58])+(u[44]*v[57])-(u[45]*v[25])+(u[46]*v[24])-(u[47]*v[23])-(u[48]*v[28])+(u[49]*v[27])-(u[50]*v[26])-(u[51]*v[1])-(u[52]*v[34])+(u[53]*v[33])-(u[54]*v[32])-(u[55]*v[2])-(u[56]*v[3])-(u[57]*v[44])+(u[58]*v[43])-(u[59]*v[42])-(u[60]*v[7])-(u[61]*v[8])-(u[62]*v[12])+(u[63]*v[22]),(u[0]*v[42])+(u[1]*v[32])-(u[2]*v[26])+(u[3]*v[23])-(u[4]*v[22])+(u[5]*v[57])+(u[6]*v[58])+(u[7]*v[16])-(u[8]*v[13])+(u[9]*v[12])-(u[10]*v[52])-(u[11]*v[53])+(u[12]*v[9])-(u[13]*v[8])+(u[14]*v[48])+(u[15]*v[49])+(u[16]*v[7])-(u[17]*v[45])-(u[18]*v[46])+(u[19]*v[43])+(u[20]*v[44])-(u[21]*v[63])+(u[22]*v[4])-(u[23]*v[3])+(u[24]*v[38])+(u[25]*v[39])+(u[26]*v[2])-(u[27]*v[35])-(u[28]*v[36])+(u[29]*v[33])+(u[30]*v[34])-(u[31]*v[62])-(u[32]*v[1])+(u[33]*v[29])+(u[34]*v[30])-(u[35]*v[27])-(u[36]*v[28])+(u[37]*v[61])+(u[38]*v[24])+(u[39]*v[25])-(u[40]*v[60])+(u[41]*v[59])+(u[42]*v[0])-(u[43]*v[19])-(u[44]*v[20])+(u[45]*v[17])+(u[46]*v[18])-(u[47]*v[56])-(u[48]*v[14])-(u[49]*v[15])+(u[50]*v[55])-(u[51]*v[54])+(u[52]*v[10])+(u[53]*v[11])-(u[54]*v[51])+(u[55]*v[50])-(u[56]*v[47])+(u[57]*v[5])+(u[58]*v[6])-(u[59]*v[41])+(u[60]*v[40])-(u[61]*v[37])+(u[62]*v[31])-(u[63]*v[21]),(u[0]*v[43])+(u[1]*v[33])-(u[2]*v[27])+(u[3]*v[24])-(u[4]*v[57])-(u[5]*v[22])+(u[6]*v[59])+(u[7]*v[17])-(u[8]*v[14])+(u[9]*v[52])+(u[10]*v[12])-(u[11]*v[54])+(u[12]*v[10])-(u[13]*v[48])-(u[14]*v[8])+(u[15]*v[50])+(u[16]*v[45])+(u[17]*v[7])-(u[18]*v[47])-(u[19]*v[42])+(u[20]*v[63])+(u[21]*v[44])+(u[22]*v[5])-(u[23]*v[38])-(u[24]*v[3])+(u[25]*v[40])+(u[26]*v[35])+(u[27]*v[2])-(u[28]*v[37])-(u[29]*v[32])+(u[30]*v[62])+(u[31]*v[34])-(u[32]*v[29])-(u[33]*v[1])+(u[34]*v[31])+(u[35]*v[26])-(u[36]*v[61])-(u[37]*v[28])-(u[38]*v[23])+(u[39]*v[60])+(u[40]*v[25])-(u[41]*v[58])+(u[42]*v[19])+(u[43]*v[0])-(u[44]*v[21])-(u[45]*v[16])+(u[46]*v[56])+(u[47]*v[18])+(u[48]*v[13])-(u[49]*v[55])-(u[50]*v[15])+(u[51]*v[53])-(u[52]*v[9])+(u[53]*v[51])+(u[54]*v[11])-(u[55]*v[49])+(u[56]*v[46])-(u[57]*v[4])+(u[58]*v[41])+(u[59]*v[6])-(u[60]*v[39])+(u[61]*v[36])-(u[62]*v[30])+(u[63]*v[20]),(u[0]*v[44])+(u[1]*v[34])-(u[2]*v[28])+(u[3]*v[25])-(u[4]*v[58])-(u[5]*v[59])-(u[6]*v[22])+(u[7]*v[18])-(u[8]*v[15])+(u[9]*v[53])+(u[10]*v[54])+(u[11]*v[12])+(u[12]*v[11])-(u[13]*v[49])-(u[14]*v[50])-(u[15]*v[8])+(u[16]*v[46])+(u[17]*v[47])+(u[18]*v[7])-(u[19]*v[63])-(u[20]*v[42])-(u[21]*v[43])+(u[22]*v[6])-(u[23]*v[39])-(u[24]*v[40])-(u[25]*v[3])+(u[26]*v[36])+(u[27]*v[37])+(u[28]*v[2])-(u[29]*v[62])-(u[30]*v[32])-(u[31]*v[33])-(u[32]*v[30])-(u[33]*v[31])-(u[34]*v[1])+(u[35]*v[61])+(u[36]*v[26])+(u[37]*v[27])-(u[38]*v[60])-(u[39]*v[23])-(u[40]*v[24])+(u[41]*v[57])+(u[42]*v[20])+(u[43]*v[21])+(u[44]*v[0])-(u[45]*v[56])-(u[46]*v[16])-(u[47]*v[17])+(u[48]*v[55])+(u[49]*v[13])+(u[50]*v[14])-(u[51]*v[52])-(u[52]*v[51])-(u[53]*v[9])-(u[54]*v[10])+(u[55]*v[48])-(u[56]*v[45])-(u[57]*v[41])-(u[58]*v[4])-(u[59]*v[5])+(u[60]*v[38])-(u[61]*v[35])+(u[62]*v[29])-(u[63]*v[19]),(u[0]*v[45])+(u[1]*v[35])-(u[2]*v[29])+(u[3]*v[57])+(u[4]*v[24])-(u[5]*v[23])+(u[6]*v[60])+(u[7]*v[19])-(u[8]*v[52])-(u[9]*v[14])+(u[10]*v[13])-(u[11]*v[55])+(u[12]*v[48])+(u[13]*v[10])-(u[14]*v[9])+(u[15]*v[51])-(u[16]*v[43])+(u[17]*v[42])-(u[18]*v[63])+(u[19]*v[7])-(u[20]*v[47])+(u[21]*v[46])+(u[22]*v[38])+(u[23]*v[5])-(u[24]*v[4])+(u[25]*v[41])-(u[26]*v[33])+(u[27]*v[32])-(u[28]*v[62])+(u[29]*v[2])-(u[30]*v[37])+(u[31]*v[36])+(u[32]*v[27])-(u[33]*v[26])+(u[34]*v[61])-(u[35]*v[1])+(u[36]*v[31])-(u[37]*v[30])+(u[38]*v[22])-(u[39]*v[59])+(u[40]*v[58])+(u[41]*v[25])-(u[42]*v[17])+(u[43]*v[16])-(u[44]*v[56])+(u[45]*v[0])-(u[46]*v[21])+(u[47]*v[20])-(u[48]*v[12])+(u[49]*v[54])-(u[50]*v[53])-(u[51]*v[15])+(u[52]*v[8])-(u[53]*v[50])+(u[54]*v[49])+(u[55]*v[11])-(u[56]*v[44])+(u[57]*v[3])-(u[58]*v[40])+(u[59]*v[39])+(u[60]*v[6])-(u[61]*v[34])+(u[62]*v[28])-(u[63]*v[18]),(u[0]*v[46])+(u[1]*v[36])-(u[2]*v[30])+(u[3]*v[58])+(u[4]*v[25])-(u[5]*v[60])-(u[6]*v[23])+(u[7]*v[20])-(u[8]*v[53])-(u[9]*v[15])+(u[10]*v[55])+(u[11]*v[13])+(u[12]*v[49])+(u[13]*v[11])-(u[14]*v[51])-(u[15]*v[9])-(u[16]*v[44])+(u[17]*v[63])+(u[18]*v[42])+(u[19]*v[47])+(u[20]*v[7])-(u[21]*v[45])+(u[22]*v[39])+(u[23]*v[6])-(u[24]*v[41])-(u[25]*v[4])-(u[26]*v[34])+(u[27]*v[62])+(u[28]*v[32])+(u[29]*v[37])+(u[30]*v[2])-(u[31]*v[35])+(u[32]*v[28])-(u[33]*v[61])-(u[34]*v[26])-(u[35]*v[31])-(u[36]*v[1])+(u[37]*v[29])+(u[38]*v[59])+(u[39]*v[22])-(u[40]*v[57])-(u[41]*v[24])-(u[42]*v[18])+(u[43]*v[56])+(u[44]*v[16])+(u[45]*v[21])+(u[46]*v[0])-(u[47]*v[19])-(u[48]*v[54])-(u[49]*v[12])+(u[50]*v[52])+(u[51]*v[14])+(u[52]*v[50])+(u[53]*v[8])-(u[54]*v[48])-(u[55]*v[10])+(u[56]*v[43])+(u[57]*v[40])+(u[58]*v[3])-(u[59]*v[38])-(u[60]*v[5])+(u[61]*v[33])-(u[62]*v[27])+(u[63]*v[17]),(u[0]*v[47])+(u[1]*v[37])-(u[2]*v[31])+(u[3]*v[59])+(u[4]*v[60])+(u[5]*v[25])-(u[6]*v[24])+(u[7]*v[21])-(u[8]*v[54])-(u[9]*v[55])-(u[10]*v[15])+(u[11]*v[14])+(u[12]*v[50])+(u[13]*v[51])+(u[14]*v[11])-(u[15]*v[10])-(u[16]*v[63])-(u[17]*v[44])+(u[18]*v[43])-(u[19]*v[46])+(u[20]*v[45])+(u[21]*v[7])+(u[22]*v[40])+(u[23]*v[41])+(u[24]*v[6])-(u[25]*v[5])-(u[26]*v[62])-(u[27]*v[34])+(u[28]*v[33])-(u[29]*v[36])+(u[30]*v[35])+(u[31]*v[2])+(u[32]*v[61])+(u[33]*v[28])-(u[34]*v[27])+(u[35]*v[30])-(u[36]*v[29])-(u[37]*v[1])-(u[38]*v[58])+(u[39]*v[57])+(u[40]*v[22])+(u[41]*v[23])-(u[42]*v[56])-(u[43]*v[18])+(u[44]*v[17])-(u[45]*v[20])+(u[46]*v[19])+(u[47]*v[0])+(u[48]*v[53])-(u[49]*v[52])-(u[50]*v[12])-(u[51]*v[13])-(u[52]*v[49])+(u[53]*v[48])+(u[54]*v[8])+(u[55]*v[9])-(u[56]*v[42])-(u[57]*v[39])+(u[58]*v[38])+(u[59]*v[3])+(u[60]*v[4])-(u[61]*v[32])+(u[62]*v[26])-(u[63]*v[16]),(u[0]*v[48])+(u[1]*v[38])-(u[2]*v[57])-(u[3]*v[29])+(u[4]*v[27])-(u[5]*v[26])+(u[6]*v[61])+(u[7]*v[52])+(u[8]*v[19])-(u[9]*v[17])+(u[10]*v[16])-(u[11]*v[56])-(u[12]*v[45])+(u[13]*v[43])-(u[14]*v[42])+(u[15]*v[63])+(u[16]*v[10])-(u[17]*v[9])+(u[18]*v[51])+(u[19]*v[8])-(u[20]*v[50])+(u[21]*v[49])-(u[22]*v[35])+(u[23]*v[33])-(u[24]*v[32])+(u[25]*v[62])+(u[26]*v[5])-(u[27]*v[4])+(u[28]*v[41])+(u[29]*v[3])-(u[30]*v[40])+(u[31]*v[39])-(u[32]*v[24])+(u[33]*v[23])-(u[34]*v[60])-(u[35]*v[22])+(u[36]*v[59])-(u[37]*v[58])-(u[38]*v[1])+(u[39]*v[31])-(u[40]*v[30])+(u[41]*v[28])+(u[42]*v[14])-(u[43]*v[13])+(u[44]*v[55])+(u[45]*v[12])-(u[46]*v[54])+(u[47]*v[53])+(u[48]*v[0])-(u[49]*v[21])+(u[50]*v[20])-(u[51]*v[18])-(u[52]*v[7])+(u[53]*v[47])-(u[54]*v[46])+(u[55]*v[44])+(u[56]*v[11])-(u[57]*v[2])+(u[58]*v[37])-(u[59]*v[36])+(u[60]*v[34])+(u[61]*v[6])-(u[62]*v[25])+(u[63]*v[15]),(u[0]*v[49])+(u[1]*v[39])-(u[2]*v[58])-(u[3]*v[30])+(u[4]*v[28])-(u[5]*v[61])-(u[6]*v[26])+(u[7]*v[53])+(u[8]*v[20])-(u[9]*v[18])+(u[10]*v[56])+(u[11]*v[16])-(u[12]*v[46])+(u[13]*v[44])-(u[14]*v[63])-(u[15]*v[42])+(u[16]*v[11])-(u[17]*v[51])-(u[18]*v[9])+(u[19]*v[50])+(u[20]*v[8])-(u[21]*v[48])-(u[22]*v[36])+(u[23]*v[34])-(u[24]*v[62])-(u[25]*v[32])+(u[26]*v[6])-(u[27]*v[41])-(u[28]*v[4])+(u[29]*v[40])+(u[30]*v[3])-(u[31]*v[38])-(u[32]*v[25])+(u[33]*v[60])+(u[34]*v[23])-(u[35]*v[59])-(u[36]*v[22])+(u[37]*v[57])-(u[38]*v[31])-(u[39]*v[1])+(u[40]*v[29])-(u[41]*v[27])+(u[42]*v[15])-(u[43]*v[55])-(u[44]*v[13])+(u[45]*v[54])+(u[46]*v[12])-(u[47]*v[52])+(u[48]*v[21])+(u[49]*v[0])-(u[50]*v[19])+(u[51]*v[17])-(u[52]*v[47])-(u[53]*v[7])+(u[54]*v[45])-(u[55]*v[43])-(u[56]*v[10])-(u[57]*v[37])-(u[58]*v[2])+(u[59]*v[35])-(u[60]*v[33])-(u[61]*v[5])+(u[62]*v[24])-(u[63]*v[14]),(u[0]*v[50])+(u[1]*v[40])-(u[2]*v[59])-(u[3]*v[31])+(u[4]*v[61])+(u[5]*v[28])-(u[6]*v[27])+(u[7]*v[54])+(u[8]*v[21])-(u[9]*v[56])-(u[10]*v[18])+(u[11]*v[17])-(u[12]*v[47])+(u[13]*v[63])+(u[14]*v[44])-(u[15]*v[43])+(u[16]*v[51])+(u[17]*v[11])-(u[18]*v[10])-(u[19]*v[49])+(u[20]*v[48])+(u[21]*v[8])-(u[22]*v[37])+(u[23]*v[62])+(u[24]*v[34])-(u[25]*v[33])+(u[26]*v[41])+(u[27]*v[6])-(u[28]*v[5])-(u[29]*v[39])+(u[30]*v[38])+(u[31]*v[3])-(u[32]*v[60])-(u[33]*v[25])+(u[34]*v[24])+(u[35]*v[58])-(u[36]*v[57])-(u[37]*v[22])+(u[38]*v[30])-(u[39]*v[29])-(u[40]*v[1])+(u[41]*v[26])+(u[42]*v[55])+(u[43]*v[15])-(u[44]*v[14])-(u[45]*v[53])+(u[46]*v[52])+(u[47]*v[12])-(u[48]*v[20])+(u[49]*v[19])+(u[50]*v[0])-(u[51]*v[16])+(u[52]*v[46])-(u[53]*v[45])-(u[54]*v[7])+(u[55]*v[42])+(u[56]*v[9])+(u[57]*v[36])-(u[58]*v[35])-(u[59]*v[2])+(u[60]*v[32])+(u[61]*v[4])-(u[62]*v[23])+(u[63]*v[13]),(u[0]*v[51])+(u[1]*v[41])-(u[2]*v[60])-(u[3]*v[61])-(u[4]*v[31])+(u[5]*v[30])-(u[6]*v[29])+(u[7]*v[55])+(u[8]*v[56])+(u[9]*v[21])-(u[10]*v[20])+(u[11]*v[19])-(u[12]*v[63])-(u[13]*v[47])+(u[14]*v[46])-(u[15]*v[45])-(u[16]*v[50])+(u[17]*v[49])-(u[18]*v[48])+(u[19]*v[11])-(u[20]*v[10])+(u[21]*v[9])-(u[22]*v[62])-(u[23]*v[37])+(u[24]*v[36])-(u[25]*v[35])-(u[26]*v[40])+(u[27]*v[39])-(u[28]*v[38])+(u[29]*v[6])-(u[30]*v[5])+(u[31]*v[4])+(u[32]*v[59])-(u[33]*v[58])+(u[34]*v[57])-(u[35]*v[25])+(u[36]*v[24])-(u[37]*v[23])-(u[38]*v[28])+(u[39]*v[27])-(u[40]*v[26])-(u[41]*v[1])-(u[42]*v[54])+(u[43]*v[53])-(u[44]*v[52])+(u[45]*v[15])-(u[46]*v[14])+(u[47]*v[13])+(u[48]*v[18])-(u[49]*v[17])+(u[50]*v[16])+(u[51]*v[0])-(u[52]*v[44])+(u[53]*v[43])-(u[54]*v[42])-(u[55]*v[7])-(u[56]*v[8])-(u[57]*v[34])+(u[58]*v[33])-(u[59]*v[32])-(u[60]*v[2])-(u[61]*v[3])+(u[62]*v[22])-(u[63]*v[12]),(u[0]*v[52])+(u[1]*v[57])+(u[2]*v[38])-(u[3]*v[35])+(u[4]*v[33])-(u[5]*v[32])+(u[6]*v[62])-(u[7]*v[48])+(u[8]*v[45])-(u[9]*v[43])+(u[10]*v[42])-(u[11]*v[63])+(u[12]*v[19])-(u[13]*v[17])+(u[14]*v[16])-(u[15]*v[56])+(u[16]*v[14])-(u[17]*v[13])+(u[18]*v[55])+(u[19]*v[12])-(u[20]*v[54])+(u[21]*v[53])+(u[22]*v[29])-(u[23]*v[27])+(u[24]*v[26])-(u[25]*v[61])+(u[26]*v[24])-(u[27]*v[23])+(u[28]*v[60])+(u[29]*v[22])-(u[30]*v[59])+(u[31]*v[58])+(u[32]*v[5])-(u[33]*v[4])+(u[34]*v[41])+(u[35]*v[3])-(u[36]*v[40])+(u[37]*v[39])-(u[38]*v[2])+(u[39]*v[37])-(u[40]*v[36])+(u[41]*v[34])-(u[42]*v[10])+(u[43]*v[9])-(u[44]*v[51])-(u[45]*v[8])+(u[46]*v[50])-(u[47]*v[49])+(u[48]*v[7])-(u[49]*v[47])+(u[50]*v[46])-(u[51]*v[44])+(u[52]*v[0])-(u[53]*v[21])+(u[54]*v[20])-(u[55]*v[18])+(u[56]*v[15])+(u[57]*v[1])-(u[58]*v[31])+(u[59]*v[30])-(u[60]*v[28])+(u[61]*v[25])+(u[62]*v[6])-(u[63]*v[11]),(u[0]*v[53])+(u[1]*v[58])+(u[2]*v[39])-(u[3]*v[36])+(u[4]*v[34])-(u[5]*v[62])-(u[6]*v[32])-(u[7]*v[49])+(u[8]*v[46])-(u[9]*v[44])+(u[10]*v[63])+(u[11]*v[42])+(u[12]*v[20])-(u[13]*v[18])+(u[14]*v[56])+(u[15]*v[16])+(u[16]*v[15])-(u[17]*v[55])-(u[18]*v[13])+(u[19]*v[54])+(u[20]*v[12])-(u[21]*v[52])+(u[22]*v[30])-(u[23]*v[28])+(u[24]*v[61])+(u[25]*v[26])+(u[26]*v[25])-(u[27]*v[60])-(u[28]*v[23])+(u[29]*v[59])+(u[30]*v[22])-(u[31]*v[57])+(u[32]*v[6])-(u[33]*v[41])-(u[34]*v[4])+(u[35]*v[40])+(u[36]*v[3])-(u[37]*v[38])-(u[38]*v[37])-(u[39]*v[2])+(u[40]*v[35])-(u[41]*v[33])-(u[42]*v[11])+(u[43]*v[51])+(u[44]*v[9])-(u[45]*v[50])-(u[46]*v[8])+(u[47]*v[48])+(u[48]*v[47])+(u[49]*v[7])-(u[50]*v[45])+(u[51]*v[43])+(u[52]*v[21])+(u[53]*v[0])-(u[54]*v[19])+(u[55]*v[17])-(u[56]*v[14])+(u[57]*v[31])+(u[58]*v[1])-(u[59]*v[29])+(u[60]*v[27])-(u[61]*v[24])-(u[62]*v[5])+(u[63]*v[10]),(u[0]*v[54])+(u[1]*v[59])+(u[2]*v[40])-(u[3]*v[37])+(u[4]*v[62])+(u[5]*v[34])-(u[6]*v[33])-(u[7]*v[50])+(u[8]*v[47])-(u[9]*v[63])-(u[10]*v[44])+(u[11]*v[43])+(u[12]*v[21])-(u[13]*v[56])-(u[14]*v[18])+(u[15]*v[17])+(u[16]*v[55])+(u[17]*v[15])-(u[18]*v[14])-(u[19]*v[53])+(u[20]*v[52])+(u[21]*v[12])+(u[22]*v[31])-(u[23]*v[61])-(u[24]*v[28])+(u[25]*v[27])+(u[26]*v[60])+(u[27]*v[25])-(u[28]*v[24])-(u[29]*v[58])+(u[30]*v[57])+(u[31]*v[22])+(u[32]*v[41])+(u[33]*v[6])-(u[34]*v[5])-(u[35]*v[39])+(u[36]*v[38])+(u[37]*v[3])+(u[38]*v[36])-(u[39]*v[35])-(u[40]*v[2])+(u[41]*v[32])-(u[42]*v[51])-(u[43]*v[11])+(u[44]*v[10])+(u[45]*v[49])-(u[46]*v[48])-(u[47]*v[8])-(u[48]*v[46])+(u[49]*v[45])+(u[50]*v[7])-(u[51]*v[42])-(u[52]*v[20])+(u[53]*v[19])+(u[54]*v[0])-(u[55]*v[16])+(u[56]*v[13])-(u[57]*v[30])+(u[58]*v[29])+(u[59]*v[1])-(u[60]*v[26])+(u[61]*v[23])+(u[62]*v[4])-(u[63]*v[9]),(u[0]*v[55])+(u[1]*v[60])+(u[2]*v[41])-(u[3]*v[62])-(u[4]*v[37])+(u[5]*v[36])-(u[6]*v[35])-(u[7]*v[51])+(u[8]*v[63])+(u[9]*v[47])-(u[10]*v[46])+(u[11]*v[45])+(u[12]*v[56])+(u[13]*v[21])-(u[14]*v[20])+(u[15]*v[19])-(u[16]*v[54])+(u[17]*v[53])-(u[18]*v[52])+(u[19]*v[15])-(u[20]*v[14])+(u[21]*v[13])+(u[22]*v[61])+(u[23]*v[31])-(u[24]*v[30])+(u[25]*v[29])-(u[26]*v[59])+(u[27]*v[58])-(u[28]*v[57])+(u[29]*v[25])-(u[30]*v[24])+(u[31]*v[23])-(u[32]*v[40])+(u[33]*v[39])-(u[34]*v[38])+(u[35]*v[6])-(u[36]*v[5])+(u[37]*v[4])-(u[38]*v[34])+(u[39]*v[33])-(u[40]*v[32])-(u[41]*v[2])+(u[42]*v[50])-(u[43]*v[49])+(u[44]*v[48])-(u[45]*v[11])+(u[46]*v[10])-(u[47]*v[9])+(u[48]*v[44])-(u[49]*v[43])+(u[50]*v[42])+(u[51]*v[7])+(u[52]*v[18])-(u[53]*v[17])+(u[54]*v[16])+(u[55]*v[0])-(u[56]*v[12])+(u[57]*v[28])-(u[58]*v[27])+(u[59]*v[26])+(u[60]*v[1])-(u[61]*v[22])-(u[62]*v[3])+(u[63]*v[8]),(u[0]*v[56])+(u[1]*v[61])+(u[2]*v[62])+(u[3]*v[41])-(u[4]*v[40])+(u[5]*v[39])-(u[6]*v[38])-(u[7]*v[63])-(u[8]*v[51])+(u[9]*v[50])-(u[10]*v[49])+(u[11]*v[48])-(u[12]*v[55])+(u[13]*v[54])-(u[14]*v[53])+(u[15]*v[52])+(u[16]*v[21])-(u[17]*v[20])+(u[18]*v[19])+(u[19]*v[18])-(u[20]*v[17])+(u[21]*v[16])-(u[22]*v[60])+(u[23]*v[59])-(u[24]*v[58])+(u[25]*v[57])+(u[26]*v[31])-(u[27]*v[30])+(u[28]*v[29])+(u[29]*v[28])-(u[30]*v[27])+(u[31]*v[26])+(u[32]*v[37])-(u[33]*v[36])+(u[34]*v[35])+(u[35]*v[34])-(u[36]*v[33])+(u[37]*v[32])+(u[38]*v[6])-(u[39]*v[5])+(u[40]*v[4])-(u[41]*v[3])-(u[42]*v[47])+(u[43]*v[46])-(u[44]*v[45])-(u[45]*v[44])+(u[46]*v[43])-(u[47]*v[42])-(u[48]*v[11])+(u[49]*v[10])-(u[50]*v[9])+(u[51]*v[8])-(u[52]*v[15])+(u[53]*v[14])-(u[54]*v[13])+(u[55]*v[12])+(u[56]*v[0])-(u[57]*v[25])+(u[58]*v[24])-(u[59]*v[23])+(u[60]*v[22])+(u[61]*v[1])+(u[62]*v[2])-(u[63]*v[7]),(u[0]*v[57])+(u[1]*v[52])-(u[2]*v[48])+(u[3]*v[45])-(u[4]*v[43])+(u[5]*v[42])-(u[6]*v[63])+(u[7]*v[38])-(u[8]*v[35])+(u[9]*v[33])-(u[10]*v[32])+(u[11]*v[62])+(u[12]*v[29])-(u[13]*v[27])+(u[14]*v[26])-(u[15]*v[61])+(u[16]*v[24])-(u[17]*v[23])+(u[18]*v[60])+(u[19]*v[22])-(u[20]*v[59])+(u[21]*v[58])+(u[22]*v[19])-(u[23]*v[17])+(u[24]*v[16])-(u[25]*v[56])+(u[26]*v[14])-(u[27]*v[13])+(u[28]*v[55])+(u[29]*v[12])-(u[30]*v[54])+(u[31]*v[53])-(u[32]*v[10])+(u[33]*v[9])-(u[34]*v[51])-(u[35]*v[8])+(u[36]*v[50])-(u[37]*v[49])+(u[38]*v[7])-(u[39]*v[47])+(u[40]*v[46])-(u[41]*v[44])+(u[42]*v[5])-(u[43]*v[4])+(u[44]*v[41])+(u[45]*v[3])-(u[46]*v[40])+(u[47]*v[39])-(u[48]*v[2])+(u[49]*v[37])-(u[50]*v[36])+(u[51]*v[34])+(u[52]*v[1])-(u[53]*v[31])+(u[54]*v[30])-(u[55]*v[28])+(u[56]*v[25])+(u[57]*v[0])-(u[58]*v[21])+(u[59]*v[20])-(u[60]*v[18])+(u[61]*v[15])-(u[62]*v[11])+(u[63]*v[6]),(u[0]*v[58])+(u[1]*v[53])-(u[2]*v[49])+(u[3]*v[46])-(u[4]*v[44])+(u[5]*v[63])+(u[6]*v[42])+(u[7]*v[39])-(u[8]*v[36])+(u[9]*v[34])-(u[10]*v[62])-(u[11]*v[32])+(u[12]*v[30])-(u[13]*v[28])+(u[14]*v[61])+(u[15]*v[26])+(u[16]*v[25])-(u[17]*v[60])-(u[18]*v[23])+(u[19]*v[59])+(u[20]*v[22])-(u[21]*v[57])+(u[22]*v[20])-(u[23]*v[18])+(u[24]*v[56])+(u[25]*v[16])+(u[26]*v[15])-(u[27]*v[55])-(u[28]*v[13])+(u[29]*v[54])+(u[30]*v[12])-(u[31]*v[52])-(u[32]*v[11])+(u[33]*v[51])+(u[34]*v[9])-(u[35]*v[50])-(u[36]*v[8])+(u[37]*v[48])+(u[38]*v[47])+(u[39]*v[7])-(u[40]*v[45])+(u[41]*v[43])+(u[42]*v[6])-(u[43]*v[41])-(u[44]*v[4])+(u[45]*v[40])+(u[46]*v[3])-(u[47]*v[38])-(u[48]*v[37])-(u[49]*v[2])+(u[50]*v[35])-(u[51]*v[33])+(u[52]*v[31])+(u[53]*v[1])-(u[54]*v[29])+(u[55]*v[27])-(u[56]*v[24])+(u[57]*v[21])+(u[58]*v[0])-(u[59]*v[19])+(u[60]*v[17])-(u[61]*v[14])+(u[62]*v[10])-(u[63]*v[5]),(u[0]*v[59])+(u[1]*v[54])-(u[2]*v[50])+(u[3]*v[47])-(u[4]*v[63])-(u[5]*v[44])+(u[6]*v[43])+(u[7]*v[40])-(u[8]*v[37])+(u[9]*v[62])+(u[10]*v[34])-(u[11]*v[33])+(u[12]*v[31])-(u[13]*v[61])-(u[14]*v[28])+(u[15]*v[27])+(u[16]*v[60])+(u[17]*v[25])-(u[18]*v[24])-(u[19]*v[58])+(u[20]*v[57])+(u[21]*v[22])+(u[22]*v[21])-(u[23]*v[56])-(u[24]*v[18])+(u[25]*v[17])+(u[26]*v[55])+(u[27]*v[15])-(u[28]*v[14])-(u[29]*v[53])+(u[30]*v[52])+(u[31]*v[12])-(u[32]*v[51])-(u[33]*v[11])+(u[34]*v[10])+(u[35]*v[49])-(u[36]*v[48])-(u[37]*v[8])-(u[38]*v[46])+(u[39]*v[45])+(u[40]*v[7])-(u[41]*v[42])+(u[42]*v[41])+(u[43]*v[6])-(u[44]*v[5])-(u[45]*v[39])+(u[46]*v[38])+(u[47]*v[3])+(u[48]*v[36])-(u[49]*v[35])-(u[50]*v[2])+(u[51]*v[32])-(u[52]*v[30])+(u[53]*v[29])+(u[54]*v[1])-(u[55]*v[26])+(u[56]*v[23])-(u[57]*v[20])+(u[58]*v[19])+(u[59]*v[0])-(u[60]*v[16])+(u[61]*v[13])-(u[62]*v[9])+(u[63]*v[4]),(u[0]*v[60])+(u[1]*v[55])-(u[2]*v[51])+(u[3]*v[63])+(u[4]*v[47])-(u[5]*v[46])+(u[6]*v[45])+(u[7]*v[41])-(u[8]*v[62])-(u[9]*v[37])+(u[10]*v[36])-(u[11]*v[35])+(u[12]*v[61])+(u[13]*v[31])-(u[14]*v[30])+(u[15]*v[29])-(u[16]*v[59])+(u[17]*v[58])-(u[18]*v[57])+(u[19]*v[25])-(u[20]*v[24])+(u[21]*v[23])+(u[22]*v[56])+(u[23]*v[21])-(u[24]*v[20])+(u[25]*v[19])-(u[26]*v[54])+(u[27]*v[53])-(u[28]*v[52])+(u[29]*v[15])-(u[30]*v[14])+(u[31]*v[13])+(u[32]*v[50])-(u[33]*v[49])+(u[34]*v[48])-(u[35]*v[11])+(u[36]*v[10])-(u[37]*v[9])+(u[38]*v[44])-(u[39]*v[43])+(u[40]*v[42])+(u[41]*v[7])-(u[42]*v[40])+(u[43]*v[39])-(u[44]*v[38])+(u[45]*v[6])-(u[46]*v[5])+(u[47]*v[4])-(u[48]*v[34])+(u[49]*v[33])-(u[50]*v[32])-(u[51]*v[2])+(u[52]*v[28])-(u[53]*v[27])+(u[54]*v[26])+(u[55]*v[1])-(u[56]*v[22])+(u[57]*v[18])-(u[58]*v[17])+(u[59]*v[16])+(u[60]*v[0])-(u[61]*v[12])+(u[62]*v[8])-(u[63]*v[3]),(u[0]*v[61])+(u[1]*v[56])-(u[2]*v[63])-(u[3]*v[51])+(u[4]*v[50])-(u[5]*v[49])+(u[6]*v[48])+(u[7]*v[62])+(u[8]*v[41])-(u[9]*v[40])+(u[10]*v[39])-(u[11]*v[38])-(u[12]*v[60])+(u[13]*v[59])-(u[14]*v[58])+(u[15]*v[57])+(u[16]*v[31])-(u[17]*v[30])+(u[18]*v[29])+(u[19]*v[28])-(u[20]*v[27])+(u[21]*v[26])-(u[22]*v[55])+(u[23]*v[54])-(u[24]*v[53])+(u[25]*v[52])+(u[26]*v[21])-(u[27]*v[20])+(u[28]*v[19])+(u[29]*v[18])-(u[30]*v[17])+(u[31]*v[16])-(u[32]*v[47])+(u[33]*v[46])-(u[34]*v[45])-(u[35]*v[44])+(u[36]*v[43])-(u[37]*v[42])-(u[38]*v[11])+(u[39]*v[10])-(u[40]*v[9])+(u[41]*v[8])+(u[42]*v[37])-(u[43]*v[36])+(u[44]*v[35])+(u[45]*v[34])-(u[46]*v[33])+(u[47]*v[32])+(u[48]*v[6])-(u[49]*v[5])+(u[50]*v[4])-(u[51]*v[3])-(u[52]*v[25])+(u[53]*v[24])-(u[54]*v[23])+(u[55]*v[22])+(u[56]*v[1])-(u[57]*v[15])+(u[58]*v[14])-(u[59]*v[13])+(u[60]*v[12])+(u[61]*v[0])-(u[62]*v[7])+(u[63]*v[2]),(u[0]*v[62])+(u[1]*v[63])+(u[2]*v[56])-(u[3]*v[55])+(u[4]*v[54])-(u[5]*v[53])+(u[6]*v[52])-(u[7]*v[61])+(u[8]*v[60])-(u[9]*v[59])+(u[10]*v[58])-(u[11]*v[57])+(u[12]*v[41])-(u[13]*v[40])+(u[14]*v[39])-(u[15]*v[38])+(u[16]*v[37])-(u[17]*v[36])+(u[18]*v[35])+(u[19]*v[34])-(u[20]*v[33])+(u[21]*v[32])+(u[22]*v[51])-(u[23]*v[50])+(u[24]*v[49])-(u[25]*v[48])+(u[26]*v[47])-(u[27]*v[46])+(u[28]*v[45])+(u[29]*v[44])-(u[30]*v[43])+(u[31]*v[42])+(u[32]*v[21])-(u[33]*v[20])+(u[34]*v[19])+(u[35]*v[18])-(u[36]*v[17])+(u[37]*v[16])-(u[38]*v[15])+(u[39]*v[14])-(u[40]*v[13])+(u[41]*v[12])-(u[42]*v[31])+(u[43]*v[30])-(u[44]*v[29])-(u[45]*v[28])+(u[46]*v[27])-(u[47]*v[26])+(u[48]*v[25])-(u[49]*v[24])+(u[50]*v[23])-(u[51]*v[22])+(u[52]*v[6])-(u[53]*v[5])+(u[54]*v[4])-(u[55]*v[3])+(u[56]*v[2])+(u[57]*v[11])-(u[58]*v[10])+(u[59]*v[9])-(u[60]*v[8])+(u[61]*v[7])+(u[62]*v[0])-(u[63]*v[1]),(u[0]*v[63])+(u[1]*v[62])-(u[2]*v[61])+(u[3]*v[60])-(u[4]*v[59])+(u[5]*v[58])-(u[6]*v[57])+(u[7]*v[56])-(u[8]*v[55])+(u[9]*v[54])-(u[10]*v[53])+(u[11]*v[52])+(u[12]*v[51])-(u[13]*v[50])+(u[14]*v[49])-(u[15]*v[48])+(u[16]*v[47])-(u[17]*v[46])+(u[18]*v[45])+(u[19]*v[44])-(u[20]*v[43])+(u[21]*v[42])+(u[22]*v[41])-(u[23]*v[40])+(u[24]*v[39])-(u[25]*v[38])+(u[26]*v[37])-(u[27]*v[36])+(u[28]*v[35])+(u[29]*v[34])-(u[30]*v[33])+(u[31]*v[32])-(u[32]*v[31])+(u[33]*v[30])-(u[34]*v[29])-(u[35]*v[28])+(u[36]*v[27])-(u[37]*v[26])+(u[38]*v[25])-(u[39]*v[24])+(u[40]*v[23])-(u[41]*v[22])+(u[42]*v[21])-(u[43]*v[20])+(u[44]*v[19])+(u[45]*v[18])-(u[46]*v[17])+(u[47]*v[16])-(u[48]*v[15])+(u[49]*v[14])-(u[50]*v[13])+(u[51]*v[12])+(u[52]*v[11])-(u[53]*v[10])+(u[54]*v[9])-(u[55]*v[8])+(u[56]*v[7])+(u[57]*v[6])-(u[58]*v[5])+(u[59]*v[4])-(u[60]*v[3])+(u[61]*v[2])-(u[62]*v[1])+(u[63]*v[0])];
    }
    cliff2vec(n,u){
        var v=[];
        for(let k=1; k<=n; ++k){
            v.push(u[k]);
        }
        return v;
    }
    vec2cliff(n,v){
        var u=this.unit(n);
        u[0]=0;
        for(let k=1; k<=n; ++k){
            u[k]=v[k-1];
        }
        return u;
    }
}
function deleteIndex(A,a){
    var al=A.slice(0,a);
    var ar=A.slice(a+1,A.length);
    for(let k=0; k<ar.length; ++k){
        al.push(ar[k]);
    }
    return al;
}
function arrayMin(A,Min){
    if(!Min){
        Min="none";
    }
    //インデックスを返す
    let id=-1;
    var min="none";
    for(let k=0; k<A.length; ++k){
        if((A[k]<min || min=="none") && (Min<A[k] || Min=="none")){
            min=A[k];
            id=k;
        }
    }
    return id;
}
function arrayMax(A){
    //数値を返す
    var max="none";
    for(let k=0; k<A.length; ++k){
        if(A[k]>max || max=="none"){
            max=A[k];
        }
    }
    return max;
}
const clifford=new cliffordMath();
const cmath=new complexMath();
const qmath=new quaternionMath();