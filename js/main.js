bar=document.querySelector(".fa-bars");
        xmark=document.querySelector(".fa-xmark");
        menu=document.querySelector(".menu");
        menu.addEventListener("click",function(){
            if(bar.style.display==""){
                bar.style.display="none";
                xmark.style.display="";
            }else if(xmark.style.display==""){
                xmark.style.display="none";
                bar.style.display="";
            }else{
                console.log("there is an error")
            }
        })

