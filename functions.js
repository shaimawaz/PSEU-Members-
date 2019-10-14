
  function allmembers(){
    var users = [];
    users = JSON.parse(localStorage.getItem("users") || "[]");
    PrintMemebers(users);
  }

  function PrintMemebers(users){
    var i;
    var text="";

    for (i = 0; i < users.length; i++) {
    text += "<div class='person'>"+
                "<div class='minusIcon' onclick='deletemember("+users[i].id+")'>-</div>"+
                "<div class='personInfo'>"+
                    "<h2>"+users[i].name+"</h2>"+
                    "<p class='mail_major_role'>"+users[i].email+"/"+users[i].major+"/"+users[i].role+"</p>"+
                    "<p class='biography'>"+users[i].biography.substring(0,102)+"</p>"+
                "</div>"+
            "</div>";  
    }
    document.getElementById("result").innerHTML = text;
    document.getElementById("numofallmembers").innerHTML = users.length+" items";
  }

function store(){
   
   let name = document.getElementById("name").value;
   let email = document.getElementById("email").value;
   let role = document.getElementById("role").value;
   let major = document.getElementById("major").value;
   let bio = document.getElementById("biography").value;
   let index = document.getElementById("index").value;

   var users = [];
   users = JSON.parse(localStorage.getItem("users") || "[]");

    if(index==null || index<0){
        index=0;
    }
    if(name==null || name==false){
        alert('You have to enter a name');
        return ;
    }
    if(email==null || email==false){
        alert('You have to enter a email');
        return ;
    }else
    {
        for (i = 0; i < users.length; i++) {
            if(users[i].email === email){
                alert('Email already exist !! try another');
                return ;
            }
        }
    }
    if(major==null || major==false){
        alert('You have to enter a major');
        return ;
    }
    if(role==null || role==false){
        alert('You have to enter a role');
        return ;
    }
    if(bio==null || bio==false){
        alert('You have to enter a biography');
        return ;
    }

    let id = Math.floor(Math.random() * 1000000);
    if(index>0)
         users.splice(index, 0, {id: id, name: name ,email:email, major:major, role:role, biography:bio});
    else
        users.push({id: id, name: name ,email:email, major:major, role:role, biography:bio});

    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("role").value="";
    document.getElementById("major").value="";
    document.getElementById("biography").value="";
    document.getElementById("index").value="";

    allmembers();
    console.log(JSON.stringify(users));
    console.log(index);
  }

function deletemember(id){
    var users = [];
    users = JSON.parse(localStorage.getItem("users") || "[]");
    for (var i = 0; i < users.length; i++) {
        var objToDElete = users[i];
    
        if (id==objToDElete.id) {
            users.splice(i, 1);
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
    allmembers();
}

function search(){
    name=document.getElementById("live_search").value;
    if(name != null){
        var users = [];
        users = JSON.parse(localStorage.getItem("users") || "[]");
        var getusers = [];
        for (i = 0; i < users.length; i++) {
            if(users[i].name.includes(name))
                getusers.push(users[i])
        }
        if(getusers.length>0)
            PrintMemebers(getusers);
        else
        document.getElementById("result").innerHTML = "<h2 style='color= #ff4a4a;'>No Member Found</h2>";
    }else
    allmembers();
}
