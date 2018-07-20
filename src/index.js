getCards().then(function (data) {
  showCards(data)

}).catch(function(err) {
  console.log(err)
});

function getCards() {
  return new Promise (function(resolve, reject) {

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/posts",
        "method": "GET",
        "headers": {
          "Cache-Control": "no-cache",
          "Postman-Token": "9a8eed62-ee92-4832-8f23-1a5d578c7c87"
        }
     }
    $.ajax(settings).done(function (response) {
       resolve(response);
    });

  })
}

 $( function() {
    $( ".sortable" ).sortable();
    $( ".sortable" ).disableSelection();
  } );
var globalData = [];
function showCards(record) {
  var cardCol = document.getElementById("cardCol");
    for(var i=0; i<record.length; i++) {
       var card = document.createElement("div");
       card.className = "card";
       //card.id = record[i].cardId;
       card.id = record[i].id;
       card.style.height = "300px";
       card.style.width = "300px";
       card.style.padding = "10px";
       card.style.margin = "10px";
       var headerDiv = document.createElement("div");
       headerDiv.id = "header-div";
       var cardLabel = document.createElement("h1");
       cardLabel.innerHTML = record[i].cardTitle;
       headerDiv.appendChild(cardLabel);
       card.appendChild(headerDiv);
       
       var bodyDiv = document.createElement("div");
       bodyDiv.className = 'card-body';
       
       bodyDiv.style.backgroundColor = '#d2cdcd';
       
       listData = record[i].listData;
        for(var j=0;j<listData.length; j++){
             var listObj = listData[j];

//********************
      var newRow = document.createElement("div");
     
      newRow.className = "row";

      var col1 = document.createElement("div");
      var col2 = document.createElement("div");
      var col3 = document.createElement("div");
      col1.className = "col-md-1";
      col2.className = "col-md-5";
      col3.className = "col-md-5";

       var checkbox = document.createElement("INPUT");
       checkbox.setAttribute("type", "checkbox");
       checkbox.checked = listObj.isChecked;
       checkbox.disabled = true;
       col1.appendChild(checkbox);
    
      var paragraph = document.createElement("p");
      paragraph.innerHTML = listObj.text;
      col2.appendChild(paragraph);

      var paragraph1 = document.createElement("p");
      paragraph1.style.fontSize = "10px";
      if(listObj.isChecked == true)
        paragraph1.innerHTML = listObj.time;

      col3.appendChild(paragraph1);
   
    
    newRow.appendChild(col1);
    newRow.appendChild(col2);
    newRow.appendChild(col3);
    //alert("if");
    
    bodyDiv.appendChild(newRow);



           }

        card.appendChild(bodyDiv);

        // testing : start
        var buttonRow = document.createElement("div");
        buttonRow.className = "row";
        buttonRow.style.justifyContent = "space-around";
        buttonRow.style.padding = "2px";
        var deleteButton = document.createElement("button");
        deleteButton.style.width = "40%";
        deleteButton.style.padding = "2px";
        deleteButton.className = "deleteBtn fa fa-trash";
        deleteButton.addEventListener('click',function() {
        deleteCard(event.path[2].id, record);
        });
        buttonRow.appendChild(deleteButton);
        

        var viewButton = document.createElement("button");
        viewButton.style.width = "40%";
        viewButton.innerText = "View";
        viewButton.style.padding = "2px";
       

        viewButton.addEventListener('click',function() {
          var cardObj = "";
          var clone = record.slice(0);
          for(var i=0; i < clone.length; i++) {
          if(clone[i].id == event.path[2].id)
          {
            cardObj = clone.splice(i,1);
          }
        }
        viewCard(cardObj);
        });
       
        buttonRow.appendChild(viewButton);

        card.appendChild(buttonRow);
cardCol.appendChild(card);
globalData = record;
}
}


// function for addcard
  var addItems = document.getElementById("addItems");
  addItems.onclick = function() {
    createRow();
    
  }

 var createNewCard = document.getElementById("createNewCard");
 createNewCard.onclick = function() {
   var addItemsList = document.getElementById("addItemsList");
   while (addItemsList.hasChildNodes()) {
    addItemsList.removeChild(addItemsList.childNodes[0]);
    }
    document.getElementById("newCardTitle").value="";
 }

  function createRow() {  
    
    var addItemsList = document.getElementById("addItemsList");
     var rowName = document.getElementsByName("rowName");

     if(rowName.length <= 0){
      var newRow = document.createElement("div");
      var att = document.createAttribute("name");       
      att.value = "rowName";                           
      newRow.setAttributeNode(att); 
      newRow.id = "row1";
      newRow.className = "row";
      addItemsList.appendChild(newRow);

      var col1 = document.createElement("div");
    var col2 = document.createElement("div");
    col1.className = "col-md-1";
    col2.className = "col-md-10";


    var inputCheckbox = document.createElement("INPUT");
    inputCheckbox.setAttribute("type", "checkbox");

    col1.appendChild(inputCheckbox);
    
    var inputTextData = document.createElement("INPUT");
    inputTextData.setAttribute("type", "text");
    inputTextData.placeholder = "Enter list item here";
    col2.appendChild(inputTextData);
    
    newRow.appendChild(col1);
    newRow.appendChild(col2);
    
    addItemsList.appendChild(newRow);
     }
     else {
     
        var newRow = document.createElement("div");
      var att = document.createAttribute("name");       
      att.value = "rowName";                           
      newRow.setAttributeNode(att); 
      newRow.id = "row"+(rowName.length+1);
      newRow.className = "row dataDivs ";
      addItemsList.appendChild(newRow);

      var col1 = document.createElement("div");
    var col2 = document.createElement("div");
    col1.className = "col-md-1";
    col2.className = "col-md-10";


    var inputCheckbox = document.createElement("INPUT");
    inputCheckbox.setAttribute("type", "checkbox");

    col1.appendChild(inputCheckbox);
    
    var inputTextData = document.createElement("INPUT");

    inputTextData.setAttribute("type", "text");
    inputTextData.placeholder = "Enter list item here";
    col2.appendChild(inputTextData);
    newRow.appendChild(col1);
    newRow.appendChild(col2);
    addItemsList.appendChild(newRow);
     }
  }

   // save work - values into json
  var saveCard = document.getElementById("saveCard");
  saveCard.onclick = function saveJson(){
        var record = globalData;
        var lastInsertedCardId = record[record.length-1].cardId;
        var newCardId = lastInsertedCardId.substring(4);
        newCardId = ++newCardId;
        newCardId = 'card'+newCardId;


        var newCardTitle = document.querySelector("#newCardTitle").value;
        if(newCardTitle=="") {
          alert("Title is required");
          return;
        }
        var newlistData = "[ ";
        var allTextContent = document.querySelectorAll("#addItemsList input[type=text]");
        var allCheckBoxContent = document.querySelectorAll("#addItemsList input[type=checkbox]");


        function memo(text, time, isChecked){
        this.text = text;
        this.time = time;
        this.isChecked = isChecked;
        }

        //date manipulate :start
        var currentdate = new Date(); 
        var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        var content = [];
        for(var k=0; k<allTextContent.length; k++){
          var objForList = new memo(allTextContent[k].value,datetime,allCheckBoxContent[k].checked);
        content.push(objForList);
        }
         var contentString = JSON.stringify(content);
         var contentJson = JSON.parse(contentString);
        var newCardObject = {
          "cardId" : newCardId,
          "cardTitle" : newCardTitle,
          "listData" : contentJson
        };
        var myJsonString = JSON.stringify(newCardObject); // giving json in string format
        
        //ajax call to save data
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3000/posts",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Postman-Token": "91edf567-3f64-4534-a1e5-006b2bc0656f"
  },
  "processData": false,
  "data": myJsonString
}

$.ajax(settings).done(function (response) {
});

var cardCol = document.getElementById("cardCol");
    while (cardCol.hasChildNodes()) {
    cardCol.removeChild(cardCol.childNodes[0]);
    }
  getCards().then(function (data) {
  showCards(data)

}).catch(function(err) {
  console.log(err)
});  
}





function deleteCard(id,record) {
          

          var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3000/posts/"+id,
          "method": "DELETE",
          "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Postman-Token": "4a25acc5-88a1-4844-a88d-d5a464f8fddb"
          }
        }

        $.ajax(settings).done(function (response) {
        });


        var cardCol = document.getElementById("cardCol");
        while (cardCol.hasChildNodes()) {
        cardCol.removeChild(cardCol.childNodes[0]);
        }

        getCards().then(function (data) {
        showCards(data)

        }).catch(function(err) {
        console.log(err)
        });

}
         
    function viewCard(cardObj) {

      var viewContent = document.getElementById("viewContent");
        while (viewContent.hasChildNodes()) {
        viewContent.removeChild(viewContent.childNodes[0]);
        }
      
      document.getElementById("viewId").click();
      document.getElementById("viewTitle").innerHTML = cardObj[0].cardTitle;
      document.getElementById("viewContent").style.height = "60vh";
      var listObj = cardObj[0].listData;

      var hiddenInputBox = document.createElement("INPUT");
      hiddenInputBox.setAttribute("type", "hidden");
      hiddenInputBox.id = "hidden-box";
      hiddenInputBox.value = cardObj[0].id;
       document.getElementById("viewTitle").appendChild(hiddenInputBox);
      
      for(var k=0; k < listObj.length; k++) {
           var newRow = document.createElement("div");
                 
       newRow.className = "row";
       var col1 = document.createElement("div");
       var col2 = document.createElement("div");
       var col3 = document.createElement("div");
       col1.className = "col-md-1";
       col2.className = "col-md-5";
       col3.className = "col-md-5";

       var checkbox = document.createElement("INPUT");
       checkbox.setAttribute("type", "checkbox");
       checkbox.checked = listObj[k].isChecked;
       col1.appendChild(checkbox);
    
      var paragraph = document.createElement("p");
      paragraph.innerHTML = listObj[k].text;
      col2.appendChild(paragraph);

      var paragraph1 = document.createElement("span");
      paragraph1.style.fontSize = "10px";
      if(listObj[k].isChecked == true)
        paragraph1.innerHTML = listObj[k].time;
    col3.appendChild(paragraph1);  
    newRow.appendChild(col1);
    newRow.appendChild(col2);
    newRow.appendChild(col3);
     document.getElementById("viewContent").appendChild(newRow);
      }

    }


// SAVE VIEW CARD
var saveViewedCard = document.getElementById("saveViewedCard");
saveViewedCard.onclick = function(){
      
      var title = document.getElementById("viewTitle").innerHTML;
      console.log(title);
      var id = document.getElementById("hidden-box").value;
      console.log(id);
       var allCheckBoxContent = document.querySelectorAll("#viewContent input[type=checkbox]");
       var allTextContent = document.querySelectorAll("#viewContent p");
       var allTimeContent = document.querySelectorAll("#viewContent span");
       console.log("allCheckBoxContent = ",allCheckBoxContent);
       console.log("allTextContent = ",allTextContent);
       console.log("allTimeContent = ",allTimeContent);



        function memo(text, time, isChecked){
          this.text = text;
          this.time = time;
          this.isChecked = isChecked;
        }

        //date manipulate :start
        var currentdate = new Date(); 
        var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        var content = [];
        for(var k=0; k<allTextContent.length; k++){
          var objForList = new memo(allTextContent[k].textContent,datetime,allCheckBoxContent[k].checked);
          content.push(objForList);
        }
         var contentString = JSON.stringify(content);
         var contentJson = JSON.parse(contentString);
        var newCardObject = {
          "cardId" : id,
          "cardTitle" : title,
          "listData" : contentJson
        };
        var myJsonString = JSON.stringify(newCardObject); // giving json in string format

        var settings = {
              "async": true,
              "crossDomain": true,
              "url": "http://localhost:3000/posts/"+id,
              "method": "PUT",
              "headers": {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Postman-Token": "f7b4830a-87c4-4d3d-a0c5-7eafbb1bb3c7"
              },
              "processData": false,
              "data": myJsonString
            }

            $.ajax(settings).done(function (response) {
              console.log(response);
            });


          var cardCol = document.getElementById("cardCol");
              while (cardCol.hasChildNodes()) {
              cardCol.removeChild(cardCol.childNodes[0]);
              }
            getCards().then(function (data) {
            showCards(data)

          }).catch(function(err) {
            console.log(err)
          });  
       
    }

