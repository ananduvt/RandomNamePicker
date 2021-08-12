var names = new Array('Barbara McFell',
                      'Tempo McKeteketly',
                      'Maonga Irpaae',
                      'Jose Tunisia',
                      'Bob Bobson');
var pickList = [];
var selectedList = [];

function loadNames(){
	pickList.forEach(loadValue);
	function loadValue(value){
		var innerDiv = document.createElement('div');
		innerDiv.className = 'pickListNames';
		innerDiv.innerHTML  = value;
		document.getElementById("pickList").appendChild(innerDiv);
	}
}

function addToSelectedList(value){
	var innerDiv = document.createElement('div');
	innerDiv.className = 'selectedListNames h4 shadow';
	innerDiv.innerHTML  = value;
	document.getElementById("selectedList").appendChild(innerDiv);
}

function clearSelectedList(){
	document.getElementById("selectedList").innerHTML =''
}

function clearPickList(){
	document.getElementById("pickList").innerHTML =''
}

function selectWinner(){
	if(pickList.length > 0){
		var index = Math.floor(Math.random()*pickList.length)
		var item = pickList[index];
		window.alert(item);
		pickList.splice(index,1);
		clearPickList();
		loadNames();
		addToSelectedList(item);
		showWinner(); 
	}
	else{
		window.alert("Names Over");
	}
}

function reset(){
	clearPickList();
	pickList = names.slice();
	loadNames();
	selectedList = [];
	clearSelectedList();
	hideWinner();
	$("#toastReset").toast({ delay: 1000 });
	$("#toastReset").toast('show');	
}

window.onload = function() {
	pickList = names.slice();
	loadNames();

};

function readFile(){
	document.getElementById("inputfile").click();
}

function fileRead(input) {      
	let file = input.files[0];
	let reader = new FileReader();
	reader.readAsText(file);

	reader.onload = function() {
		// console.log(reader.result);
		var textByLine = reader.result.split("\n");
		// console.log(textByLine);
		names = textByLine.slice();
		reset();
		
		$(".offcanvas").toggle();
		$(".offcanvas-backdrop").hide();
		
		$("#toastLoad").toast({ delay: 2000 });
		$("#toastLoad").toast('show');
	};

	reader.onerror = function() {
		window.alert("File Load Failed");
		console.log(reader.error);
	};
}

function showWinner() {
  var element = document.getElementById("selected");
  element.classList.remove("hide");
}

function hideWinner() {
  var element = document.getElementById("selected");
  element.classList.add("hide");
}