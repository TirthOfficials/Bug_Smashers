  
 //document.addEventListener('click',sendmail())


  function sendmail(){
    //var name2 = $('#name').val();
    var email2 = $('#Cont_Email').val();
    
    //var num12 = document.getElementById("num123").innerHTML = Math.floor(Math.random() * 10000);
    var mess= 'Hello buyer!!!,<br><br>Thank you for contacting us, we will contact you back within a few days to answer your query.<br><br>Team Electro Trade'
    
    //var Body = 'Name: '+name2+'<br>Email: '+email2+'<br>'+mess;
  
  Email.send({
    SecureToken : "7590a634-fc1b-40b1-857c-3398294a8beb",
    //SecureToken : "smtp.gmail.com",
    Host : "smtp.elasticemail.com",
    Username : "bugsmashers01@gmail.com",
    Password : "0B2323505365F07044E3782E107347ECA2FB",
    To : email2,
    From : "bugsmashers01@gmail.com",
    Subject : "Electro Trade Welcomes You ",
    Body : mess
  }).then(
  message => {
    if(message=='OK'){
      alert("Thank You, An Email has been sent to you")
    }
    else{
      console.error (message)
      alert('There is an error while sending mail')
    }
  }
  );
}