//************** SPECIF CRUD ********

window.onload=function(){
	(document.getElementById("inputId")).disabled=true; //if auto_incr
	initListeners(); 
}

function objectFromInput(){
	let id = (document.getElementById("inputId")).value;
	if(!isNaN(id)) id = Number(id);
	if(id=="")id=null;
	
	let label = (document.getElementById("inputLabel")).value;
	let balance = Number((document.getElementById("inputBalance")).value);
	
	document.getElementById("spanMsg").innerHTML="";
	let obj = { num : id,
				label: label,
	            balance :balance
	            };
	return obj;
}

function displayObject(obj){
	(document.getElementById("inputId")).value=obj.num;
	(document.getElementById("inputLabel")).value=obj.label;
	(document.getElementById("inputBalance")).value=obj.balance;
}

function insertRowCells(row,obj){
	(row.insertCell(0)).innerHTML = obj.num;
	(row.insertCell(1)).innerHTML = obj.label;
	(row.insertCell(2)).innerHTML = obj.balance;
}


function blankObject(){
	return {num:"" , label: "" , balance :0  };	
}

function getWsBaseUrl(){
	return "bank-api/accounts";	
}

//obj = object with values to check
//action = "add" or "update" or ...
function canDoAction(action,obj){
	ok=true; //by default
	if(obj.label==null || obj.label == "")
	  ok=false;
	return ok;
}
