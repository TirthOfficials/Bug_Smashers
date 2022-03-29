  
 //document.addEventListener('click',sendmail())


  function sendmail(){
    var name2 = $('#name').val();
    var email2 = $('#email').val();
    
    //var num12 = document.getElementById("num123").innerHTML = Math.floor(Math.random() * 10000);
    var mess= 'Hello,<br><br>Specifications about your product have been submitted successfully.<br>You will receive a security deposit of Rs. 8000 for the Laptop.<br><br>Within a few days, our employee will visit the address you have submitted to check the product and accordingly, you will be provided with the actual price for that product.<br><br>Thank you for trusting Electro-trade. If you liked our services, do recommend it to your friends and family.'
    
    var Body = 'Name: '+name2+'<br>Email: '+email2+'<br>'+mess;
  
  Email.send({
    SecureToken : "7590a634-fc1b-40b1-857c-3398294a8beb",
    //SecureToken : "smtp.gmail.com",
    Host : "smtp.elasticemail.com",
    Username : "bugsmashers01@gmail.com",
    Password : "0B2323505365F07044E3782E107347ECA2FB",
    To : email2,
    From : "bugsmashers01@gmail.com",
    Subject : "Thanks for selling your product to Electro Trade Mr./Mrs. "+name2,
    Body : Body
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