
  //Function that brings all members and send them to a print fn
  function allmembers(){
    var users = [];
    users = JSON.parse(localStorage.getItem("users") || "[]");
    PrintMemebers(users);
  }
//function that prints the array of useres that is sent to it
  function PrintMemebers(users){
    var i;
    var text="";
//for loop that لف on all membrs in the array and store them in text variable
    for (i = 0; i < users.length; i++) {
    text += "<div class='person'>"+
                "<div class='minusIcon' onclick='deletemember("+users[i].id+")'>-</div>"+
                "<div class='personInfo'>"+
                    "<h2>"+users[i].name+"</h2>"+
                    "<p class='mail_major_role'>"+users[i].email+"/"+users[i].major+"/"+users[i].role+"</p>"+
                    "<p class='biography'>"+users[i].biography.substring(0,100)+"-<br>"+users[i].biography.substring(100,200)+
                    "-...</p>"+
                "</div>"+
            "</div>";  
    }
//printing the text variable into the ineer html of the result div so the appear in the propper way
    document.getElementById("result").innerHTML = text;
//printing the number of members or items in its place
    document.getElementById("numofallmembers").innerHTML = users.length+" ITEMS";
  }

//function that stored the information of a member into local storage after validating and verifying its info
function store(){
   //bringing the info
   let name = document.getElementById("name").value;
   let email = document.getElementById("email").value;
   let role = document.getElementById("role").value;
   let major = document.getElementById("major").value;
   let bio = document.getElementById("biography").value;
   let index = document.getElementById("index").value;
   //bringing the members that already exists and store them in users array
   var users = [];
   users = JSON.parse(localStorage.getItem("users") || "[]");
   //validate the data
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
        //check if the email is unique
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

    //give every member an id
    let id = Math.floor(Math.random() * 1000000);

    //give every member a date of when he/she was added
    dateadded=Date.now();

    //add at the index specified or at 0 if the index is not specified
    users.splice(index, 0, {id: id, name: name ,email:email, major:major, role:role, biography:bio, dateadded:dateadded});
    
    //restore the array in the local storage
    localStorage.setItem("users", JSON.stringify(users));
    //refresh the fields and empty them
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("role").value="";
    document.getElementById("major").value="";
    document.getElementById("biography").value="";
    document.getElementById("index").value="";
    document.getElementById("FilterRoles").value="";


    //bring all members to the result div
    allmembers();
    console.log(JSON.stringify(users));
    console.log(index);
}
//function that delete a member it takes the id of the member
function deletemember(id){
    //bring the useres from the local storage
    var users = [];
    users = JSON.parse(localStorage.getItem("users") || "[]");
    //finding the member to delete
    for (var i = 0; i < users.length; i++) {
        var objToDElete = users[i];
    
        if (id==objToDElete.id) {
            //delete the member from the array
            users.splice(i, 1);
        }
    }
    //restoring the array
    localStorage.setItem("users", JSON.stringify(users));
    //bring all members after the deletion
    allmembers();
}
//search function that searches for a name in the members
function search(){
    //name is the value that is in teh search bar ex:("sh", "f","deema",...etc)
    name=document.getElementById("live_search").value;
    //we check if the value is not null so we search for the name in the array 
    if(name != null){
        //first we bring the array of all members
        var users = [];
        users = JSON.parse(localStorage.getItem("users") || "[]");
        //declaring a new array so we store the members that matches the search in it
        var getusers = [];
        //looping on users array and store the members that matches the search in he getusers array
        for (i = 0; i < users.length; i++) {
            if(users[i].name.includes(name))
                getusers.push(users[i])
        }
        //check if there is a member that matches the search to print them if not to display that there is no momber found
        if(getusers.length>0)
            PrintMemebers(getusers);
        else
        document.getElementById("result").innerHTML = "<h2 style='color= #ff4a4a;'>No Member Found</h2>";
    }else
    //if name is a null value then we print all members
    allmembers();
}
//function that compares the values of names to return to sort function when sorting A to Z
function compareAZ( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
}
//function that compares the values of names to return to sort function when sorting Z to A
function compareZA( a, b ) {
    if ( a.name > b.name ){
      return -1;
    }
    if ( a.name < b.name ){
      return 1;
    }
    return 0;
}
//function that compares the values of names to return to sort function when sorting newest
function compareOldest( a, b ) {
    return a.dateadded - b.dateadded;
}
//function that compares the values of dates to return to sort function when sorting oldest
function compareNewest( a, b ) {
    return b.dateadded - a.dateadded;
}
//function sort that sorts the useres as choosen
 function sort(){
     //first we bring the array of all members
     var users = [];
     users = JSON.parse(localStorage.getItem("users") || "[]");
    //get the value to sort by
     sorttype=document.getElementById("sort").value;
    // check the value of sort 
     if(sorttype == "A-Z"){ //sort from A to Z
        users.sort(compareAZ);
        PrintMemebers(users);
     }
     else if(sorttype == "Z-A"){ //sort from Z to A
        users.sort(compareZA);
        PrintMemebers(users);
     }
     else if(sorttype == "Newest"){ //sort from newest to oldest
        users.sort(compareNewest);
        PrintMemebers(users);
    }
    else if(sorttype == "Oldest"){ // sort from oldest to newest
        users.sort(compareOldest);
        PrintMemebers(users);
    } 
    else if(sorttype == null)
        allmembers();
 }
  
