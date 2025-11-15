var textureCount;
const size=1;
var light=[0,0,3];
var specular=true;
var cval=[0,0,1,0];
var angle=[1,0,0,3];//dammy
var obj=[];
var inst=[];
var recursion=75;
var vertex=[];
const camera={
    position:[0,0,1],
    velocity:0,
    movingVector:[0,0,0]
}
function createBuffer(M){
  var m=[];
for(let i=0; i<M.length; ++i){
  for(let j=0; j<M[i].length; ++j){
    m.push(M[j][i]);
  }
}
return new Float32Array(m);
}
const canvas=document.querySelector(".canvas");
canvas.width=screen.width;
canvas.height=screen.height;
var WGSL=compile();
function expression(u){
    var res={
        f:"",
        df:""
    }
    const n=u.length;
    for(let k=0; k<n; ++k){
        if(u[k]!=0){
            if(u[k]>0){
                if(res.f.length>0){
                res.f+="+";
                }
            }else{
                if(n-k-1==0){
                    res.f+="+";
                }
            }
        if(n-k-1==0){
            res.f+=`vec2<f32>(${u[k]},0)`;
        }else{
            if(n-k-1==1){
                res.f+=`${u[k]}*z`;
            }else{
            res.f+=`${u[k]}*exp(z,${n-k-1})`;
            }
        }
        }
    }
    for(let k=0; k<n-1; ++k){
        if(u[k]!=0){
            //符号
            if(u[k]>0){
                if(res.df.length>0){
                res.df+="+";
                }
            }else{
                if(n-k-2==0){
                    res.df+="+";
                }
            }
        if(n-k-2==0){
            res.df+=`vec2<f32>(${(n-k-1)*u[k]},0)`;
        }else{
            if(n-k-2==1){
                res.df+=`${u[k]*(n-k-1)}*z`;
            }else{
        res.df+=`${(n-k-1)*u[k]}*exp(z,${n-k-2})`;
            }
        }
        }
    }
    return res;
}
async function main(){
// webgpuコンテキストの取得
const context = canvas.getContext('webgpu');

// deviceの取得
const g_adapter = await navigator.gpu.requestAdapter();
const g_device = await g_adapter.requestDevice();
    
//デバイスを割り当て
const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
context.configure({
  device: g_device,
  format: presentationFormat,
  alphaMode: 'opaque'
});
async function render(){
//Uniformバッファ
const uniformBufferSize=4*(4+4+4+4);
  const uniformBuffer=g_device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
});
var bufferPosition=0;
function bind(a){
const p=new Float32Array(a);
g_device.queue.writeBuffer(
  uniformBuffer,
  bufferPosition,
  p.buffer,
  p.byteOffset,
  p.byteLength
);
bufferPosition+=p.byteLength;
}
    bind(camera.position);
    bind([canvas.width/canvas.height]);
    bind(angle);
    bind(light);
    bind([recursion]);
    bind(cval);


const sceneUniformBindGroupLayout = g_device.createBindGroupLayout({
  entries: [
    { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: "uniform"  } },
  ]
});

const bindGroup = g_device.createBindGroup({
  layout: sceneUniformBindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: uniformBuffer,
      },
    },
  ],
});

//レンダーパイプラインの設定
const pipeline = g_device.createRenderPipeline({
  layout: g_device.createPipelineLayout({bindGroupLayouts: [sceneUniformBindGroupLayout]}),
  vertex: {
    module: g_device.createShaderModule({
      code: WGSL,
    }),
    entryPoint: 'main',
  },
  fragment: {
    module: g_device.createShaderModule({
      code: WGSL,
    }),
    entryPoint: 'fragmain',
    //canvasのフォーマットを指定
    targets: [
      {
        format: presentationFormat,
      },
    ],
  },
  primitive: {
    topology: 'triangle-strip',
  }
});
//コマンドバッファの作成
const commandEncoder = g_device.createCommandEncoder();
//レンダーパスの設定
const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor= {
    colorAttachments: [
      {
        view: textureView,
        clearValue:{ r: 0.9, g: 0.9, b: 1, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  };
  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  //レンダーパイプラインを与える
  passEncoder.setPipeline(pipeline);
  passEncoder.setBindGroup(0,bindGroup);
  passEncoder.draw(4,1,0,0);
  passEncoder.end();
  g_device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame(render);
    translate();
}
    render();
}
function compile(){
    const fn=eval(`[${document.getElementById("input").value}]`);
    const fns=expression(fn);
    return `
//vec3はvec4と実質同じというゴミ仕様。
struct Uniforms {
  camera:vec4<f32>,
  angle:vec4<f32>,
  light:vec4<f32>,
  cval:vec4<f32>
}
@binding(0) @group(0) var<uniform> uniforms : Uniforms;

struct VertexOutput {
  @builtin(position) Position:vec4<f32>,
  @location(0) pos:vec2<f32>,
}
fn exp(t:vec2<f32>,n:f32)->vec2<f32>{
    var phi:f32=atan2(t.y,t.x);
    return pow(length(t),n)*vec2<f32>(cos(phi*n),sin(phi*n));
}
fn quot(t:vec2<f32>)->vec2<f32>{
    return vec2<f32>(t.x,-t.y)/(pow(t.x,2)+pow(t.y,2));
}
fn argcolor(v:vec2<f32>,l:f32)->vec3<f32>{
        var phi:f32=atan2(v.y,v.x);
        var h:f32=degrees(phi)%360;
        if(h<0){
        h=360+h;
        }
        var s:f32=0.5;
        let H:f32=h/60;
        let C:f32=(1-abs(2*l-1))*s;
        let X:f32=C*(1-abs(H%2-1));
        let m:f32=l-C/2;
        if(h<60){
            return vec3<f32>(m+C,m+X,m);
        }else if(h<120){
            return vec3<f32>(m+X,m+C,m);
        }else if(h<180){
            return vec3<f32>(m,m+C,m+X);
        }else if(h<240){
            return vec3<f32>(m,m+X,m+C);
        }else if(h<300){
            return vec3<f32>(m+X,m,m+C);
        }else{
            return vec3<f32>(m+C,m,m+X);
        }
}
fn mul(u:vec2<f32>,v:vec2<f32>)->vec2<f32>{
    return vec2<f32>(u.x*v.x-u.y*v.y,u.x*v.y+u.y*v.x);
}
fn newton(v:vec2<f32>)->vec3<f32>{
    var z=v;
    var i:f32=0;
    while(i<uniforms.light.w){
        let hold=z;
        z+=uniforms.cval.xy-mul(mul(uniforms.angle.xy,${fns.f}),quot(${fns.df}));
        i+=1.0;
        if(length(z-hold)<0.01){
        break;
        }
    }
    return vec3<f32>(z,i/uniforms.light.w);
}
fn ez(z:vec2<f32>)->vec2<f32>{
    return pow(2.71828182846,z.x)*vec2<f32>(cos(z.y),sin(z.y));
}
fn logz(z:vec2<f32>)->vec2<f32>{
    return vec2<f32>(log(length(z)),atan2(z.y,z.x));
}
@vertex
fn main(@builtin(vertex_index) VertexIndex : u32)->VertexOutput {
  var output : VertexOutput;
  var pos =  array<vec2<f32>,4>(vec2<f32>(-1,1),vec2<f32>(-1,-1),vec2<f32>(1,1),vec2<f32>(1,-1));
  output.Position=vec4<f32>(pos[VertexIndex],0,1);
  output.pos=pos[VertexIndex];
  return output;
  }
@fragment
fn fragmain(@location(0) fragCoord : vec2<f32>) -> @location(0) vec4<f32>{
    var v=newton(uniforms.camera.xy+uniforms.camera.z*vec2<f32>(fragCoord.x,fragCoord.y/uniforms.camera.w));
    return vec4<f32>(argcolor(v.xy,v.z),1);
}
`;
}
main();