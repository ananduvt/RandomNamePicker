var names = new Array('Barbara McFell Tempo McKeteketly',
                      'Tempo McKeteketly Maonga Irpaae',
                      'Maonga Irpaae Jose Tunisia',
                      'Jose Tunisia Bob Bobson',
                      'Bob Bobson Barbara McFell');
var pickList = [];
var selectedList = [];
var winner = '';

var keyFrames = '\
	@keyframes totop {\
	  0%   {left:0px; bottom:0px;}\
	  100% {left:0px; bottom:A_DYNAMIC_VALUEpx;}\
	}';
	
window.onload = function() {
	pickList = names.slice();
	loadNamesToPickList();
	
	// for congrats anime
	var numberOfStars = 100;
	for (var i = 0; i < numberOfStars; i++) {
	  $('.congrats').append('<div class="blob fa fa-star ' + i + '"></div>');
	}	
	
	$("#toastStartup").toast({ delay: 3000 });
	$("#toastStartup").toast('show');	
};

function loadNamesToPickList(){
	pickList.forEach(loadValue);
	function loadValue(value){
		var innerDiv = document.createElement('div');
		innerDiv.className = 'pickListNames';
		innerDiv.innerHTML  = value;
		document.getElementById("pickList").appendChild(innerDiv);
	}
	
	var listHeight= $(".listContainer").height();
	var pickHeight = $(".pickList").prop('scrollHeight');
	
	if(listHeight < pickHeight){
		animeHeightSet(pickHeight - listHeight);
	}
}

function animeHeightSet(value){
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, value);
		document.getElementsByTagName('head')[0].appendChild(style);
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
		winner = pickList[index];
		$("#winner").text(winner);
		$("#winnerModal").modal('show');

		congratsAnime();
		setTimeout(function(){
			congratsAnime();
		},2000);
		
		pickList.splice(index,1);
		clearPickList();
		loadNamesToPickList();
	}
	else{
		window.alert("Names Over");
	}
}

function loadWinners(){	
	addToSelectedList(winner);
	showWinnersDiv(); 
}

function reset(){
	clearPickList();
	pickList = names.slice();
	loadNamesToPickList();
	selectedList = [];
	clearSelectedList();
	hideWinner();
	$("#toastReset").toast({ delay: 1000 });
	$("#toastReset").toast('show');	
}

function readFile(){
	document.getElementById("inputfile").click();
}

function fileRead(input) {      
	let file = input.files[0];
	let reader = new FileReader();
	reader.readAsText(file);

	reader.onload = function() {
		var textByLine = reader.result.split("\n");
		names = textByLine.slice();
		// console.log(names);
		reset();
		
		$("#toastLoad").toast({ delay: 2000 });
		$("#toastLoad").toast('show');
	};

	reader.onerror = function() {
		window.alert("File Load Failed");
		console.log(reader.error);
	};
}

function showWinnersDiv() {
  var element = document.getElementById("selected");
  element.classList.remove("hide");
}

function hideWinner() {
  var element = document.getElementById("selected");
  element.classList.add("hide");
}

function congratsAnime(){
	
	resetAnime();
	animateText();
	animateBlobs();
	confettiAnime();
	resetAnime();
}

function resetAnime() {
	$.each($('.blob'), function(i) {
		TweenMax.set($(this), { x: 0, y: 0, opacity: 1 });
	});
	
	TweenMax.set($('h1'), { scale: 1, opacity: 1, rotation: 0 });
}

function animateText() {
		TweenMax.from($('h1'), 0.8, {
		scale: 0.4,
		opacity: 0,
		rotation: 25,
		ease: Back.easeOut.config(6),
	});
}
	
function animateBlobs() {
	
	var xSeed = _.random(350, 380);
	var ySeed = _.random(120, 170);
	
	$.each($('.blob'), function(i) {
		var $blob = $(this);
		var speed = _.random(1, 5);
		var rotation = _.random(5, 100);
		var scale = _.random(0.8, 2.5);
		var x = _.random(-xSeed, xSeed);
		var y = _.random(-ySeed, ySeed);

		TweenMax.to($blob, speed, {
			x: x,
			y: y,
			ease: Power1.easeOut,
			opacity: 0,
			rotation: rotation,
			scale: scale,
			onStartParams: [$blob],
			onStart: function($element) {
				$element.css('display', 'block');
			},
			onCompleteParams: [$blob],
			onComplete: function($element) {
				$element.css('display', 'none');
			}
		});
	});
}

var colors = [ "#FF0000",'#FF8000', "#FFFF00","#80FF00","#00FF00","#00FF80","#0000FF","#8000FF","#FF00FF"];

function confettiAnime() {
 
	confettiThrow();
	
	let x = setInterval(function() {
		confettiThrow();
	}, 1000);
	
	setTimeout(function(){
		clearInterval(x);
	},1500);		
}

function confettiThrow(){
	for(i=0;i<10;i++){
		confetti({
		particleCount: 9,
		angle: 60,
		spread: 150,
		origin: { x: 0 },
		colors: colors,
	  });
	  confetti({
		particleCount: 9,
		angle: 120,
		spread: 150,
		origin: { x: 1 },
		colors: colors,
	  });
	}
}

