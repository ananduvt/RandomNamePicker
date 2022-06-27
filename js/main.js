// need lot refactoring variables & functions

var allNames = new Array('Asha',
	'Bhanu',
	'Cerin',
	'Devi',
	'Ellen',
	'Farah',
	'Geetha',
	'Heena',
	'Indu');
var pickNameList = [];
var selectedNameList = [];

var keyFrames = '\
	@keyframes totop {\
	  0%   {left:0px; bottom:0px;}\
	  100% {left:0px; bottom:A_DYNAMIC_VALUEpx;}\
	}';

window.onload = function () {
	pickNameList = allNames.slice();
	loadNamesToPickList();

	// for congrats anime
	var numberOfStars = 100;
	for (var i = 0; i < numberOfStars; i++) {
		$('.congrats').append('<div class="blob fa fa-star ' + i + '"></div>');
	}

	toastMsg('toastInfo', 'Loaded Sample Names. Load File from Settings', 3000);
};

function toastMsg(type, msg, delay) {
	$('#' + type).toast({ delay: delay });
	$('.toast-body').text(msg);
	$('#' + type).toast('show');
}

function loadNamesToPickList() {
	document.getElementById("pickList").innerHTML = '';
	pickNameList.forEach(loadValue);
	function loadValue(value) {
		var innerDiv = document.createElement('div');
		innerDiv.className = 'pickListNames';
		innerDiv.innerHTML = value;
		document.getElementById("pickList").appendChild(innerDiv);
	}

	var listHeight = $(".listContainer").height();
	var pickHeight = $(".pickList").prop('scrollHeight');

	if (listHeight < pickHeight) {
		animeHeightSet(pickHeight - listHeight);
	}
	else {
		$(".pickList").css("animation-duration", "0s");
	}
}

function animeHeightSet(value) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, value);
	document.getElementsByTagName('head')[0].appendChild(style);

	$(".pickList").css("animation-duration", Math.floor((value / 10)) + "s");
}

function addToSelectedList() {
	clearSelectedList();

	selectedNameList.forEach(loadValue);
	function loadValue(value) {
		var innerDiv = document.createElement('div');
		innerDiv.className = 'selectedListNames h4 shadow';
		innerDiv.innerHTML = value;
		document.getElementById("selectedList").appendChild(innerDiv);
	}

	// var innerDiv = document.createElement('div');
	// innerDiv.className = 'selectedListNames h4 shadow';
	// innerDiv.innerHTML  = value;
	// document.getElementById("selectedList").appendChild(innerDiv);
	showWinnersDiv();
}

function clearSelectedList() {
	document.getElementById("selectedList").innerHTML = ''
}

function selectWinner() {
	if (pickNameList.length > 0) {
		var index = Math.floor(Math.random() * pickNameList.length)
		var winner = pickNameList[index];
		$("#winner").text(winner);
		$("#winnerModal").modal('show');

		congratsAnime();
		setTimeout(function () {
			congratsAnime();
		}, 2000);

		pickNameList.splice(index, 1);
		selectedNameList.push(winner);
		loadNamesToPickList();
	}
	else {
		toastMsg('toastWarn', 'No Name Available in Participants. Go to Settings', 3000);
	}
}

function loadWinners() {
	addToSelectedList();
}

function reset() {
	pickNameList = allNames.slice();
	loadNamesToPickList();
	selectedNameList = [];
	clearSelectedList();
	hideWinner();
	hideWinnerList();
	toastMsg('toastInfo', 'Reset Success', 2000)
}

function readFile() {
	$("#inputFile").click();
}

function readImage() {
	$("#inputImage").click();
}

function imageRead(input) {
	let file = input.files[0];
	let reader = new FileReader();
	if (file) {
		reader.readAsDataURL(file);
	}
	reader.onloadend = function(){
		document.getElementById('logo').style.backgroundImage = "url(" + reader.result + ")";        

		$("#imageNameDiv").removeClass("hide");
		$("#imageName").text(file.name);
		toastMsg('toastInfo', 'Logo Load Successful', 2000);
		$("#favicon").attr("href",reader.result);
	}

	reader.onerror = function () {
		toastMsg('toastWarn', 'File Read Error', 3000);
	};
}

function fileRead(input) {
	let file = input.files[0];
	let reader = new FileReader();
	if (file) {
		reader.readAsText(file);
	}
	reader.onload = function () {
		if (reader.result !== '') {
			if (reader.result.includes("\r")) {
				var spliter = "\r\n";
			}
			else {
				var spliter = "\n"
			}
			var textByLine = reader.result.split(spliter);
			array = textByLine.slice();
			allNames = array.filter(item => item);
			reset();

			$("#fileNameDiv").removeClass("hide");
			$("#fileName").text(file.name);
			toastMsg('toastInfo', 'File Load Successful', 2000)
		}
		else {
			toastMsg('toastWarn', 'File Error: Empty File', 3000);
		}
	};

	reader.onerror = function () {
		toastMsg('toastWarn', 'File Read Error', 3000);
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

// animations

function congratsAnime() {

	resetAnime();
	animateText();
	animateBlobs();
	confettiAnime();
	resetAnime();
}

function resetAnime() {
	$.each($('.blob'), function (i) {
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

	$.each($('.blob'), function (i) {
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
			onStart: function ($element) {
				$element.css('display', 'block');
			},
			onCompleteParams: [$blob],
			onComplete: function ($element) {
				$element.css('display', 'none');
			}
		});
	});
}

var colors = ["#FF0000", '#FF8000', "#FFFF00", "#80FF00", "#00FF00", "#00FF80", "#0000FF", "#8000FF", "#FF00FF"];

function confettiAnime() {

	confettiThrow();

	let x = setInterval(function () {
		confettiThrow();
	}, 1000);

	setTimeout(function () {
		clearInterval(x);
	}, 1500);
}

function confettiThrow() {
	for (i = 0; i < 10; i++) {
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

// settings functions

function settingsOpened() {
	$('#appTitleInput').val($("#appTitle").text());
	loadWinnersList(selectedNameList);
	loadParticipantList(allNames);
}

function appTitleChanged() {
	$("#appTitle").text($('#appTitleInput').val());
	document.title = $('#appTitleInput').val();
}

function searchParticipant(search) {
	let items = allNames.filter(function (e) {
		if (e.toUpperCase().startsWith(search.toUpperCase())) {
			return e;
		}
	});
	loadParticipantList(items);
}

function loadParticipantList(list) {
	$(".participantList").empty();
	list.forEach(loadValue);
	function loadValue(value) {
		if (pickNameList.includes(value)) {
			var childDiv = '<li><input type="checkbox" checked="true" name="' + value + '" class="participantCheckbox" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove from Participant"></input>' + value + '</li>';
		}
		else {
			var childDiv = '<li><input type="checkbox" name="' + value + '" class="participantCheckbox" data-bs-toggle="tooltip" data-bs-placement="top" title="Add as Participant"></input>' + value + '</li>';
		}
		$(".participantList").append(childDiv);
	}
	$(document).ready(function () {

		$(".participantList li").hover(function () {
			var name = $(this).text();
			if (!selectedNameList.includes(name)) {
				$(this).append('<span class= "bi bi-plus-lg addToWinner" id="addToWinner" onclick="addToWinnerList(\'' + name + '\')" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Winner"></span>');
			}
		}, function () {
			$('#addToWinner').remove();
		});

		$('.participantCheckbox').change(function () {
			var name = $(this)[0].name;
			if ($(this)[0].checked === true) {
				pickNameList.push(name);
				if (selectedNameList.indexOf(name) >= 0) {
					selectedNameList.splice(selectedNameList.indexOf(name), 1);
				}
				loadParticipantList(allNames);
				loadWinnersList(selectedNameList);
				loadNamesToPickList();
				addToSelectedList();
				if (selectedNameList.length === 0) {
					hideWinner();
					hideWinnerList();
				}
			}
			else {
				pickNameList.splice(pickNameList.indexOf(name), 1);
				loadNamesToPickList();
			}
		});
	});
}

function loadWinnersList(list) {
	$(".winnersList").empty();
	list.forEach(loadValue);

	function loadValue(value) {
		var childDiv = '<li><input type="checkbox" checked="true" name="' + value + '" class="winnerCheckbox" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove from Winner"></input>' + value + '</li>';
		$(".winnersList").append(childDiv);
		showWinnersList();
	}

	$(document).ready(function () {
		$('.winnerCheckbox').change(function () {
			var name = $(this)[0].name;
			pickNameList.push(name);
			selectedNameList.splice(selectedNameList.indexOf(name), 1);
			loadParticipantList(allNames);
			loadWinnersList(selectedNameList);
			loadNamesToPickList();
			addToSelectedList();
			if (selectedNameList.length === 0) {
				hideWinner();
				hideWinnerList();
			}
		});
	});
}

function addToWinnerList(name) {

	// console.log($('input[name='+name+']')[0].name);
	// $('input[name='+name+']')[0].checked = ! ($('input[name='+name+']')[0].checked);

	selectedNameList.push(name);
	if (pickNameList.indexOf(name) >= 0) {
		pickNameList.splice(pickNameList.indexOf(name), 1);
	}
	loadParticipantList(allNames);
	loadWinnersList(selectedNameList);
	loadNamesToPickList();
	addToSelectedList();
	if (selectedNameList.length === 0) {
		hideWinner();
		hideWinnerList();
	}
}

function showWinnersList() {
	$('#winnersList').removeClass("hide");
}

function hideWinnerList() {
	$('#winnersList').addClass("hide");
}
