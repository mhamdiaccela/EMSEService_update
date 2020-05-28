var selectedRow = {
	coopName : "",
	coopNumber : "",
	surfaceArea : "",
	address : "",
	numberOfDirectInvestment : "",
	numberOfIndirectInvestment : "",
	numberOfVacantSites : ""
}

function searchRecordRequest(coopName, coopNumber, page, limit) {
	try {
		showSearchLoading();

		var returnValue = "";
		var prosData = "{sessionId:'" + globalVars.userSessionId + "', serviceProviderCode:'MOFK', callerId:'" + globalVars.currentUserID
				+ "', scriptName:'SEARCH_COCT_RECORDS', parameters:[{Key:'coopName', Value:'" + coopName + "'}," + "{Key:'coopNumber', Value:'" + String(coopNumber) + "'},"
				+ "{Key:'pageLimit', Value:'" + page + "," + limit + "'}," + "{Key:'action', Value:'searchRecordRecords'}]}";
		$.ajax({
			url : globalVars.emseServiceUrl,
			type : "POST",
			async : true,
			data : prosData,
			dataType : "json",
			contentType : "application/json",
			error : function(x, e) {
				alert("error: " + e + x.responseText);
				hideSearchLoading();
			},
			success : function(data) {

				var responseHTML = data.d;
				if (responseHTML && responseHTML.output && responseHTML.output.wholeResults) {
					var arr = responseHTML.output.wholeResults;
					var outObj;
					for (var i = 0; i < arr.length; i++) {
						if (arr[i].key == "result") {
							outObj = JSON.parse(arr[i].value);
							break;
						}
					}

					if (outObj) {
						builRecordlist(outObj.items);
						buildRecordPageList(outObj.resultCount);
						$("#page-" + globalVars.pageNumber).css("color", "red");
						$("#page-" + globalVars.pageNumber).css("text-decoration", "underline");
					}
				}
				hideSearchLoading();
			}
		});
		return returnValue;
	} catch (e) {
		alert("main error:" + e.message);
		hideSearchLoading();
	}
}
var arrayOfData = [];
function builRecordlist(arr) {
	var htmlOutput = '';
	if (arr.length > 0) {
		$('#searchResultContainer').css('display', 'block');
		$('#noFirsLabel').css('display', 'none');
		$("#pageingDiv").css('display', 'block');
	} else {
		$('#searchResultContainer').css('display', 'none');
		$('#noFirsLabel').css('display', 'block');
		$("#pageingDiv").css('display', 'none');
	}

	htmlOutput += '<tr><th></th><th>Contract Number</th><th>COOP Number</th><th>COOP Name</th><th>Surface Area</th>';
	htmlOutput += '<th>Address</th> </tr>';

	for (var i = 0; i < arr.length; i++) {
		if (i % 2 == 0) {
			htmlOutput += '<tr style="background-color: aliceBlue;">';
		} else {
			htmlOutput += '<tr onclick="showRow(this);">';
		}

		var objData = new Object();
		objData.itemId = arr[i]["itemId"];
		objData.coopNumber = arr[i]["coopNumber"];
		objData.coopName = arr[i]["coopName"];
		objData.surfaceArea = arr[i]["surfaceArea"];
		objData.numberOfDirectInvestment = arr[i]["numberOfDirectInvestment"];
		objData.numberOfIndirectInvestment = arr[i]["numberOfIndirectInvestment"];
		objData.numberOfVacantSites = arr[i]["numberOfVacantSites"];
		arr[i]["address"] = decode64(arr[i]["address"]);
		objData.address = arr[i]["address"];
		arrayOfData[i] = objData;

		htmlOutput += '<td><input type="radio" onclick="recordClick(this);" name="firs" value="' + arr[i]["itemId"] + '"></input></td>';
		htmlOutput += '<td>' + arr[i]["itemId"] + '</td>';
		htmlOutput += '<td>' + arr[i]["coopNumber"] + '</td>';
		htmlOutput += '<td>' + arr[i]["coopName"] + '</td>';
		htmlOutput += '<td>' + arr[i]["surfaceArea"] + '</td>';
		htmlOutput += '<td>' + arr[i]["address"] + '</td>';
		htmlOutput += '</tr>';
	}
	$('#recordListTable').html(htmlOutput);
}

function getNameEnglishBySelectedConsigneeId(selectedConsigneeId) {

	for ( var index in arrayOfData) {
		var object = arrayOfData[index];
		if (object.consigneeId == selectedConsigneeId) {
			return object.consigneeEnglishName;
		}
	}
}
function recordClick(obj) {
	try {

		globalVars.selectedConsignee = obj.value;
		for (data in arrayOfData) {
			if (obj.value == arrayOfData[data].itemId) {
				selectedRow.coopName = arrayOfData[data].coopName;
				selectedRow.coopNumber = arrayOfData[data].coopNumber;
				selectedRow.surfaceArea = arrayOfData[data].surfaceArea;
				selectedRow.address = arrayOfData[data].address;
				selectedRow.numberOfDirectInvestment = arrayOfData[data].numberOfDirectInvestment;
				selectedRow.numberOfIndirectInvestment = arrayOfData[data].numberOfIndirectInvestment;
				selectedRow.numberOfVacantSites = arrayOfData[data].numberOfVacantSites;
				break;
			}

		}

		//globalVars.selectedConsigneeEnglishName = getNameEnglishBySelectedConsigneeId(obj.value);
	} catch (error) {
		//alert(error.message);
	}
}

function depositChanged(obj) {
	var amount = 0;
	var showFirsRecord = "none";
	if (obj.value == "Food Trade Additional Deposit") {
		amount = 0;
	} else if (obj.value == "Food Trade Consignment Deposit") {
		amount = 0;
		showFirsRecord = "block";
	} else if (obj.value == "Food Trade General Deposit") {
		amount = 15000;
	} else if (obj.value == "Food Trade Global Village Deposit") {
		amount = 2000;
	} else if (obj.value == "Food Trade Re-export Deposit") {
		amount = 50000;
	}
	$("#fineValue").val("" + amount);
	$("#imposedFee").val("" + amount);
	$("#firsRecord").css("display", (showFirsRecord == "block" ? "inline-block" : showFirsRecord));
	$("#firsRecordLabel").css("display", showFirsRecord);
	$("#searchBtn").css("display", (showFirsRecord == "block" ? "inline-block" : showFirsRecord));
}

function resetForm() {
	$("#depositSelect").val("-1");
	$("#firsRecord").val("");
	$("#fineValue").val("");
	$("#imposedFee").val("");
	$("#firsRecord").css("display", "none");
	$("#firsRecordLabel").css("display", "none");
	$("#searchBtn").css("display", "none");
}

function searchRecordPage(pageNumber) {
	if (pageNumber > (Math.ceil(globalVars.resultCount / globalVars.pageLimit))) {
		return;
	}
	if (pageNumber < 1) {
		return;
	}

	globalVars.pageNumber = pageNumber;
	globalVars.pageLimit = 5;
	searchRecord(pageNumber);
}

function searchRecord(pageNumber) {
	globalVars.pageLimit = 5;
	searchRecordRequest($("#coopName").val(), $("#coopNumber").val(), pageNumber, globalVars.pageLimit);
}

function selectCOOP() {
	var winParent;
	try {
		if (globalVars.selectedConsignee.length == 0) {
			alert("Please select a COOP");
			return;
		}
		if (globalVars.recordType == "COCR") {
			winParent = window.opener;

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_coopName").value = selectedRow.coopName;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_coopNumber").value = selectedRow.coopNumber;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.surfaceArea;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_address").value = selectedRow.address;

			winParent.focus();
			window.close();
		} else if (globalVars.recordType == "COCT") {
			winParent = window.opener;
			winParent.document.getElementById("app_spec_info_COOPDETAILS_previousContractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_COOPDETAILS_coopName").value = convertHTMLEncodedToText(selectedRow.coopName);
			winParent.document.getElementById("app_spec_info_COOPDETAILS_coopNumber").value = convertHTMLEncodedToText(selectedRow.coopNumber);
			winParent.document.getElementById("app_spec_info_COOPDETAILS_surfaceArea").value = convertHTMLEncodedToText(selectedRow.surfaceArea);
			winParent.document.getElementById("app_spec_info_COOPDETAILS_numberOfDirectInvestment").value = convertHTMLEncodedToText(selectedRow.numberOfDirectInvestment);
			winParent.document.getElementById("app_spec_info_COOPDETAILS_numberOfIndirectInvestment").value = convertHTMLEncodedToText(selectedRow.numberOfIndirectInvestment);
			winParent.document.getElementById("app_spec_info_COOPDETAILS_numberOfVacantSites").value = convertHTMLEncodedToText(selectedRow.numberOfVacantSites);

			winParent.focus();
			window.close();
		}else if (globalVars.recordType == "COIC") {
			winParent = window.opener;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_coopNumber").value = convertHTMLEncodedToText(selectedRow.coopNumber);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_coopName").value = convertHTMLEncodedToText(selectedRow.coopName);
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = convertHTMLEncodedToText(selectedRow.surfaceArea);
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_address").value = convertHTMLEncodedToText(selectedRow.address); 
			winParent.focus();
			window.close();
		}else if (globalVars.recordType == "CORI") {
			winParent = window.opener;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_coopNumber").value = convertHTMLEncodedToText(selectedRow.coopNumber);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_coopName").value = convertHTMLEncodedToText(selectedRow.coopName);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = convertHTMLEncodedToText(selectedRow.surfaceArea);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_address").value = convertHTMLEncodedToText(selectedRow.address);
			winParent.focus();
			window.close();
			
		}else if (globalVars.recordType == "COHS") {
			winParent = window.opener;
			winParent.document.getElementById("app_spec_info_GENERAL_contractid").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_GENERAL_location").value = convertHTMLEncodedToText(selectedRow.address);
			winParent.focus();
			window.close();
		}

	} catch (error) {
		alert(error.message);
	}
}

function closeWindow() {
	window.close();
}

function resetRecordSearch() {
	$("#coopName").val("");
	$("#coopNumber").val("");
	$('#searchResultContainer').css('display', 'none');
	$('#noFirsLabel').css('display', 'none');
	globalVars.pageNumber = 1;
	globalVars.selectedConsignee = "";
	globalVars.selectedConsigneeEnglishName = "";
}
