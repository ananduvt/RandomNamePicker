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
	innerDiv.className = 'selectedListNames';
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
	clearSelectedList()
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
		console.log(reader.result);
		var textByLine = reader.result.split("\n")
		console.log(textByLine);
		names = textByLine.slice();
		reset();
	};

	reader.onerror = function() {
		console.log(reader.error);
	};
}