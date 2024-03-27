
function addCard(){
    document.getElementById('clear').addEventListener('click',()=>{
        document.getElementById('logins').classList.remove('active');
    })
    
    document.getElementById('login').addEventListener('click',()=>{
    
       document.getElementById('logins').classList.add('active');
    })
    
    document.getElementById('logins').addEventListener('click',()=>{
        document.getElementById('form')
        .style.boxShadow="3px 3px 20px #fff";
    })
}
addCard();

var form=document.getElementById("loginForm");
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    console.log("clicked");
     
    String.prototype.isEmail=()=>{
        return !!this.match( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    }
   

    var name=document.getElementById('name'),
        email=document.getElementById('email'),
        password=document.getElementById('password'),
        cpassword=document.getElementById("cpassword"),
        error=document.getElementById("error"),
        k=false;

    if(password.value.trim()!=cpassword.value.trim()){
      password.style.border="2px solid red";
      cpassword.style.border="2px solid red";
      error.innerHTML="Password is does not match"
      k=true;
      return;
    }
    else{
        password.style.border="none";
        cpassword.style.border="none";
        error.innerHTML="";
        k=false;
    }
    var reRegex=/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    console.log(reRegex.test(email.value));
    var result=reRegex.test(email.value)
    if(!result){
        email.style.border="2px solid red";
        error.innerHTML="Please enter correct email"
        k=true;
        return;    
    }
    else{
       email.style.border="none"; 
        error.innerHTML="";
        k=false;
    }

    if(!k){
        
         let data={
            name:name.value,
            email:email.value,
            password:password.value
        }

      console.log("fetch called")
      fetch("/auth/valid",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data),
        })
        .then(response=>response.json())
        .then(data=>{
             if(data.success){
                window.alert("Data was insert");
               form.submit();
               
             }
             else{
            //   console.log(Object.keys(data.errors[0]));
              data.errors.forEach((valid)=>{
                
                if(Object.keys(valid)=='name'){
                    name.style.border="2px solid red";
                    error.innerHTML="User name is already taken"
                    return
                }

                 if(Object.keys(valid)=='email'){
                    email.style.border="2px solid red";
                    error.innerHTML="Email is already taken"
                    return
                }
                
                if(!data){
                    name.style.border="none";
                    email.style.border="none";
                    error.innerHTML="";
                }
              

              })
             }
        })


    }
    else{
       
    }
    
   

})