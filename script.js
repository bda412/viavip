 var first, last, email, password, amountOfPoints
 var allTextLines;
 var headers = [];
 var lines = [];
 var data = [];
 var tarr = [];
 var results;
 var emailInTable;
 var person = {};
 //TR table row
 //TD table data

 function loginAuth() {
     email = document.getElementById("email").value;
     password = document.getElementById("password").value;
     //console.log("username: " + email + " and Pass: " + password);

     if (email.length <= 0 || password.length <= 0) {
         alert("Not Authenticated");
     } else if (email.search("@") <= 1) {
         alert("invalid email. Try again"); ///change to updating html elements on this 
     } else {

         readCSV();
     }

 }


 function readCSV() {

     $(document).ready(function () {

         $.ajax({

             type: "GET",

             url: "info.csv",

             dataType: "text",

             success: function (data) {
                 processData(data);
             }

         });

     });

 }

 function processData(allText) {
     if (lines.length == 0) {
         allTextLines = allText.split(/\r\n|\n/);

         headers = allTextLines[0].split(',');

         for (var i = 1; i < allTextLines.length; i++) {

             data = allTextLines[i].split(',');

             if (data.length == headers.length) {

                 tarr = [];

                 for (var j = 0; j < headers.length; j++) {

                     tarr.push(headers[j] + ":" + data[j]);

                 }
                 lines.push(tarr);
             }

         }
         searchData();
         //console.log("first pass")
     } else {
         searchData();

     }

 }


 function searchData() {
     //Email index is 2
     //console.log(lines.length);
     for (var i = 0; i < lines.length; i++) {
         //console.log(email.toLowerCase());
         //console.log(lines[i][2].toLowerCase());
         if (lines[i][2].toLowerCase().includes(email.toLowerCase(), 0)) {
             emailInTable = lines[i];
             break;
         } else {
             console.log("REDIRECT TO new user");
         }

     }
     person = {
         firstName: emailInTable[0],
         lastName: emailInTable[1],
         userEmail: emailInTable[2],
         userPass: emailInTable[3],
         userPoints: emailInTable[4]
     };
     authUser();

 }



 function authUser() {
     //console.log(person.firstName);
     person.firstName = person.firstName.substring(person.firstName.search(":") + 1, person.firstName.length).trim();
     person.lastName = person.lastName.substring(person.lastName.search(":") + 1, person.lastName.length).trim();
     person.userEmail = person.userEmail.substring(person.userEmail.search(":") + 1, person.userEmail.length).trim();
     person.userPass = person.userPass.substring(person.userPass.search(":") + 1, person.userPass.length).trim();
     person.userPoints = person.userPoints.substring(person.userPoints.search(":") + 1, person.userPoints.length).trim();
     //console.log(person);
     if (person.userPass != password) {
         alert("User not Authenticated"); //throw an html error
     } else {
         console.log("success");
         editUser();
     }
 }


 function createUser() {
     //insertRow();

 }

 function editUser() {
     window.open("index.html", "_self");
     document.getElementById("numberOfPoints").innerHTML() = person.userPoints;
     console.log(person.userPoints);

 }

 function onlineTicketPurchase() {

 }

 function qrCodeScanClick() {

 }
