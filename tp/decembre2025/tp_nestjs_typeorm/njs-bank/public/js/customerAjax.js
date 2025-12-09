//************** SPECIF CRUD ********

window.onload=function(){
	(document.getElementById("inputId")).disabled=true; //if auto_incr
	initListeners(); 
}

function objectFromInput(){
	let id = (document.getElementById("inputId")).value;
	if(!isNaN(id)) id = Number(id);
	if(id=="")id=null;
	
	let firstname = (document.getElementById("inputFirstname")).value;
	let lastname = (document.getElementById("inputLastname")).value;
	let email = (document.getElementById("inputEmail")).value;

	document.getElementById("spanMsg").innerHTML="";
	let obj = { id : id,
				firstname: firstname,
	            lastname :lastname,
				email:email
	            };
	return obj;
}

function displayObject(obj){
	(document.getElementById("inputId")).value=obj.id;
	(document.getElementById("inputFirstname")).value=obj.firstname;
	(document.getElementById("inputLastname")).value=obj.lastname;
	(document.getElementById("inputEmail")).value=obj.email;
}

function insertRowCells(row,obj){
	(row.insertCell(0)).innerHTML = obj.id;
	(row.insertCell(1)).innerHTML = obj.firstname;
	(row.insertCell(2)).innerHTML = obj.lastname;
	(row.insertCell(3)).innerHTML = obj.email;
}


function blankObject(){
	return {id:"" , firstname: "myfirstname" , lastname :"myLastName",email:"aaa.bbb@xyz.com"  };	
}

function getWsBaseUrl(){
	return "bank-api/customers";	
}

//obj = object with values to check
//action = "add" or "update" or ...
function canDoAction(action,obj){
	ok=true; //by default
	/*
	if(obj.firstname==null || obj.title == "")
	  ok=false;
	if(obj.lastname==null || obj.lastname == "")
	  ok=false;
	if(obj.email==null || obj.email == "")
		ok=false;
	*/
	return ok;
}
