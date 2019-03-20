var globalVars = {
	emseAssetsUrl : "/EMSEService/assets",
	emseServiceUrl : "/EMSEService/Service",
	resourcesUrl : "",
	currentUserID : "",
	userSessionId : "",
	recordType : "",
	lang : "",
	hasMainDepositType : false,
	selectedConsignee : "",
	selectedConsigneeEnglishName : "",
	pageNumber : 1,
	pageLimit : 4,
	pageCount : 0,
	pageBlock: 1,
	pageBlockLimit: 20,
	resultCount : 0,
	childWindow : false,
	alterColor : true
}
function initJSPage(resourcesUrl, currentUserID, userSessionId, lang, conpId, childrenArr, resizeWindow, recordType, window) {
	//var filename = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
	//var langPostfix = filename.substring(filename.lastIndexOf(".") - 3, filename.lastIndexOf("."));
	var langPostfix = "";
	if (lang == "ar_AE"){
		langPostfix = "_ar";
	}
	loadjscssfile("https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css", "css");
	// Load JQuery then load FIRSPopup.js before we start executing our JS
	loadScript("https://code.jquery.com/jquery-1.11.3.min.js", function() {
		loadScript("popup"+langPostfix+".js", function() {
			try {
				initJS(resourcesUrl, currentUserID, userSessionId, lang, false, recordType);

			} catch (error) {
				alert(error.message);
			}
			$(window).on("beforeunload", function() {
				if (globalVars.childWindow) {
					globalVars.childWindow.close();
				}
			})
		});
	});

	try {
		//loadjscssfile("https://code.jquery.com/jquery-1.11.3.min.js", "js" , docObject);
		loadScript("https://code.jquery.com/ui/1.11.4/jquery-ui.js", function() {
			$("#fromDate").datepicker({
				dateFormat : "yy-mm-dd"
			});
			$("#toDate").datepicker({
				dateFormat : "yy-mm-dd"
			});

		});

	} catch (error) {
		alert(error.message);
	}
}

function initJS(resourcesUrl, currentUserID, userSessionId, lang, resizeWindow, recordType) {
	globalVars.resourcesUrl = resourcesUrl;
	globalVars.currentUserID = currentUserID;
	globalVars.userSessionId = userSessionId;
	globalVars.lang = lang;
	globalVars.recordType = recordType;

	if (resizeWindow) {
		window.resizeTo(window.screen.availWidth - 350, window.screen.availHeight - 100);
	}
	if (typeof initPopup!="undefined"){
		initPopup();		
	}
}

function loadScript(url, callback) {

	var script = document.createElement("script")
	script.type = "text/javascript";
	if (script.readyState) { //IE
		script.onreadystatechange = callback;
	} else { //Others
		script.onload = callback;
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function loadCss(url, callback) {
	var script = document.createElement("link")
	script.type = "text/css";
	if (script.readyState) { //IE
		script.onreadystatechange = function() {
			if (script.readyState === "loaded" || script.readyState === "complete") {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else { //Others
		script.onload = function() {
			callback();
		};
	}
	script.href = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function loadjscssfile(filename, filetype) {
	if (filetype == "js") { //if filename is a external JavaScript file
		var fileref = document.createElement('script')
		fileref.setAttribute("type", "text/javascript")
		fileref.setAttribute("src", filename)
	} else if (filetype == "css") { //if filename is an external CSS file
		var fileref = document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filename)
	}

	if (typeof fileref != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(fileref)
	}

}

function buildRecordPageList(resultCount) {
	var pageCount = Math.ceil(resultCount / globalVars.pageLimit);
	globalVars.pageCount = pageCount;
	globalVars.resultCount = resultCount;
	globalVars.pageBlock = Math.ceil(globalVars.pageNumber/globalVars.pageBlockLimit);
	globalVars.pageBlockTotal = Math.ceil(pageCount/globalVars.pageBlockLimit);

	if (globalVars.lang == "ar_AE"){
		var htmlOutput = '<div class="results_header">النتائج</div>';
	}else{
		var htmlOutput = '<div class="results_header">Results</div>';
	}
	var showBlockClass = " enable_block show_block";
	var firstBlockClass = (globalVars.pageBlock==1)?showBlockClass:"";
	htmlOutput += '<div class="paging_container"><span href="#" class="paging paging_prev" style="margin-right:4px" onclick="gotoPrev()">prev &lt;&lt;</span><div class="paging_block_container"><div class="paging_block'+firstBlockClass+'" id="paging_block_1">';
	for (var i = 0; i < pageCount; i++) {
		htmlOutput += '<a id="page-' + (i + 1) + '" href="#" style="margin-right:4px" onclick="searchRecordPage(' + (i + 1) + ')">' + (i + 1) + '</a>';
		if ( (((i+1) % globalVars.pageBlockLimit) == 0) &&  (i != pageCount-1 ) ){
			var thisPageBlock = (parseInt(i+1)/globalVars.pageBlockLimit) + 1;
			var blockClass = (globalVars.pageBlock==thisPageBlock)?showBlockClass:"";
			htmlOutput += '<span class="paging dots" onclick="gotoNext()">...</span></div><div class="paging_block'+blockClass+'" id="paging_block_'+thisPageBlock+'">';
		}
	}
	htmlOutput += '</div></div>';
	htmlOutput += '<span href="#" class="paging paging_next" style="margin-right:4px" onclick="gotoNext()">next &gt;&gt;</span></div>';
	$("#pageingDiv").html(htmlOutput);
}
function gotoNext(){
	var newPageBlock = globalVars.pageBlock + 1;
	if (newPageBlock>globalVars.pageBlockTotal){
		return false;
	}else{
		globalVars.pageBlock = newPageBlock;
		$(".paging_block").removeClass("slide_right");
		$(".paging_block").removeClass("slide_left");
		$(".paging_block").removeClass("show_block");
		setTimeout(function(){
			$(".paging_block").removeClass("enable_block");
			setTimeout(function(){
				$("#paging_block_"+newPageBlock).addClass("slide_left");
				setTimeout(function(){
					$("#paging_block_"+newPageBlock).addClass("enable_block");
					setTimeout(function(){
						$("#paging_block_"+newPageBlock).addClass("show_block");
					}, 10);
				}, 10);
			}, 10);			
		}, 300);
	}
}
function gotoPrev(){
	var newPageBlock = globalVars.pageBlock - 1;
	if (newPageBlock<=0){
		return false;
	}else{
		globalVars.pageBlock = newPageBlock;
		$(".paging_block").removeClass("slide_right");		
//		$(".paging_block").removeClass("slide_left");
		$(".paging_block").removeClass("show_block");
		setTimeout(function(){
			$(".paging_block").removeClass("enable_block");
			setTimeout(function(){
				$("#paging_block_"+newPageBlock).addClass("slide_left");
				$("#paging_block_"+newPageBlock).addClass("slide_right");
				setTimeout(function(){
					$("#paging_block_"+newPageBlock).addClass("enable_block");
					setTimeout(function(){
						$("#paging_block_"+newPageBlock).addClass("show_block");
					}, 10);
				}, 10);
			}, 10);			
		}, 300);
	}
}

function updateWithdrawError(param) {
	alert("The deposit must be paid to be withdrawn.");
}

function updateConfiscateError(param) {
	alert("The deposit must be paid to be confiscated.");
}

function showAddLoading() {
	$('#addDepositParentDiv').append(
			'<div id="addLoading" class="transparent" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;background-color: #000000;padding: 20px 20px 0px 20px">'
					+ '<img src="' + globalVars.emseAssetsUrl + '/ajax-loader.gif" style="position: absolute;top: 45%;left: 45%;"></div>');
}

function showSearchLoading() {
	$('#searchParentDiv').append(
			'<div id="searchLoading" class="transparent" style="width: 100%;height: 100%;position: fixed; top: 0;left: 0;background-color: #000000;padding: 20px 20px 0px 20px">'
					+ '<img src="' + globalVars.emseAssetsUrl + '/ajax-loader.gif" style="position: absolute;top: 45%;left: 45%;"></div>');
}

function hideAddLoading() {
	$('#addLoading').remove();
}

function hideSearchLoading() {
	$('#searchLoading').remove();
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function closeWindow() {
	window.close();
}
function convertHTMLEncodedToText(htmlEncoded){
	var result = $('<textarea />').html(htmlEncoded).text();
	return result;
}
function decode64(input) {

	var keyStr = "ABCDEFGHIJKLMNOP" +

	"QRSTUVWXYZabcdef" +

	"ghijklmnopqrstuv" +

	"wxyz0123456789+/" +

	"=";

	var output = "";

	var chr1, chr2, chr3 = "";

	var enc1, enc2, enc3, enc4 = "";

	var i = 0;

	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =

	var base64test = /[^A-Za-z0-9\+\/\=]/g;

	if (base64test.exec(input)) {

		alert("There were invalid base64 characters in the input text.\n" +

		"Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +

		"Expect errors in decoding.");

	}

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	do {

		enc1 = keyStr.indexOf(input.charAt(i++));

		enc2 = keyStr.indexOf(input.charAt(i++));

		enc3 = keyStr.indexOf(input.charAt(i++));

		enc4 = keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);

		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);

		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {

			output = output + String.fromCharCode(chr2);

		}

		if (enc4 != 64) {

			output = output + String.fromCharCode(chr3);

		}

		chr1 = chr2 = chr3 = "";

		enc1 = enc2 = enc3 = enc4 = "";

	} while (i < input.length);

	return unescape(output);

}