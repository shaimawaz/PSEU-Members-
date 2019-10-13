
  function allmembers(){
    var users = [];
    users = JSON.parse(localStorage.getItem("users") || "[]");

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

    console.log(text);
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

    var users = [];
    users = JSON.parse(localStorage.getItem("users") || "[]");
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
