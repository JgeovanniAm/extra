async function API(e){const t=await fetch("https://triviaserver.herokuapp.com"+e);return await t.json()}function loadAnimation(){document.querySelector(".loader").className+=" hidden"}const btnSignin=document.querySelector(".sign-in"),btnSignup=document.querySelector(".sign-up"),userInput=document.createElement("input");userInput.type="text",userInput.placeholder="user";const password=document.createElement("input");function modalComponents(e){const t=e.target,n=document.createElement("h1");n.innerHTML=t.innerHTML,n.setAttribute("class","titleForm"),createModal(userInput,password,n)}function createModal(e,t,n){const o=document.createElement("dialog");o.className="dialog-register";const s=document.querySelector("body"),r=document.createElement("button"),a=document.createElement("form"),c=document.createElement("input");c.type="button",c.value="entrar",r.innerHTML="cancel",a.setAttribute("class","formLogin"),o.setAttribute("class","dialogForm"),r.setAttribute("class","cancelBtn btn-ui"),c.setAttribute("class","submitBtn btn-ui"),[n,e,t,c].forEach(e=>a.appendChild(e)),o.appendChild(r),o.appendChild(a),s.insertBefore(o,s.childNodes[0]),o.show(),c.addEventListener("click",()=>requestDataRegister(n.innerHTML,o)),r.addEventListener("click",()=>cancelModalOption(o))}function requestDataRegister(e,t){"sign-up"==e?API("/dataUser").then(RenderData):"sign-in"==e&&API("/dataUser").then(RenderExistData),t.close()}function cancelModalOption(e){e.close(),e.remove()}function RenderData(e){if(console.log(e),""==userInput.value&&""==password.value)alert("porfavor escriba su nombre y contraseña");else{let t={User:userInput.value,Password:password.value,Level:0,id:0};e.User.find(e=>e.User==t.User)?alert("no es valido su nombre de usario"):(PostNewUser(t),OkayUp())}}function OkayUp(){const e=document.createElement("dialog");e.className="dialog-register",e.style.zIndex=2;const t=document.querySelector("body"),n=document.createElement("input"),o=document.createElement("h5");o.innerHTML="se ha creado su usuario! acceda a su nueva cuenta para jugar!",n.type="button",n.value="entrar",e.appendChild(o),e.appendChild(n),t.insertBefore(e,t.childNodes[0]),e.show(),n.addEventListener("click",()=>{window.location.href="index.html",e.remove()})}function PostNewUser(e){return fetch("https://triviaserver.herokuapp.com/register",{method:"POST",body:JSON.stringify(e)}).then(e=>(console.log(e.json),e.json())).then(e=>{console.log(e)}).catch(e=>{console.log(e)})}function RenderExistData(e){console.log(e);let t={User:userInput.value,Password:password.value};const n=e.User.find(e=>e.User==t.User&&e.Password==t.Password);console.log(n),n?(SignInUser(t),Okay()):alert("usario incorrecto")}function Okay(){const e=document.createElement("dialog");e.className="dialog-register",e.style.zIndex=2;const t=document.querySelector("body"),n=document.createElement("input"),o=document.createElement("h5");o.innerHTML="has accedido correctamente! estas listo para jugar!",n.type="button",n.value="entrar",e.appendChild(o),e.appendChild(n),t.insertBefore(e,t.childNodes[0]),e.show(),n.addEventListener("click",()=>{window.location.href="play.html",e.remove()})}function SignInUser(e){return fetch("https://triviaserver.herokuapp.com/myUser",{method:"POST",body:JSON.stringify(e)}).then(e=>(console.log(e.json),e.json())).then(e=>{console.log(e)}).catch(e=>{console.log(e)})}password.type="password",password.placeholder="password",userInput.setAttribute("class","inputForm"),password.setAttribute("class","inputForm"),window.addEventListener("load",loadAnimation),btnSignup.addEventListener("click",modalComponents),btnSignin.addEventListener("click",modalComponents);