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

    console.log(JSON.stringify(users));
    console.log(index);
  }

  