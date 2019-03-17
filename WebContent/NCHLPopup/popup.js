//alert('........ Hamdiiiiiiiiiiiiiiiiiii');
var selectedRow = {
	licenseNumber : "",
	chaletID : "",
	licenseIssuanceDate : "",
	IsResort : ""
}

function searchRecordRequest(licenseNumber, chaletID, licenseIssuanceDate, IsResort) {
	//alert('........ 1 searchRecordRequest');
	try {
		showSearchLoading();

		var returnValue = "";
		var prosData = "{sessionId:'" + globalVars.userSessionId + "', serviceProviderCode:'MOFK', callerId:'" + globalVars.currentUserID
				+ "', scriptName:'SEARCH_NCHL_RECORDS', parameters:[{Key:'licenseNumber', Value:'" + licenseNumber + "'}," + "{Key:'chaletID', Value:'"
				+ String(chaletID) + "'}," + "{Key:'licenseIssuanceDate', Value:'" + String(licenseIssuanceDate) + "'}," + "{Key:'IsResort', Value:'"
				+ String(IsResort) + "'}]}";
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

	htmlOutput += '<tr><th></th><th>License Number</th><th>Chalet ID</th><th>Issuances Date</th><th>Is Resort ?</th>';

	for (var i = 0; i < arr.length; i++) {
		if (i % 2 == 0) {
			htmlOutput += '<tr style="background-color: aliceBlue;">';
		} else {
			htmlOutput += '<tr onclick="showRow(this);">';
		}

		var objData = new Object();
		objData.licenseNumber = arr[i]["itemId"];
		objData.chaletID = arr[i]["chaletID"];
		objData.IsResort = arr[i]["IsResort"];
		objData.licenseIssuanceDate = arr[i]["licenseIssuanceDate"];
		
		arrayOfData[i] = objData;

		htmlOutput += '<td><input type="radio" onclick="recordClick(this);" name="firs" value="' + arr[i]["itemId"] + '"></input></td>';
		htmlOutput += '<td>' + arr[i]["chaletID"] + '</td>';
		htmlOutput += '<td>' + arr[i]["IsResort"] + '</td>';
		htmlOutput += '<td>' + arr[i]["licenseIssuanceDate"] + '</td>';
		htmlOutput += '</tr>';

	}
	$('#recordListTable').html(htmlOutput);
}

function buildRecordPageList(resultCount) {
	globalVars.resultCount = resultCount;
	var pageCount = Math.ceil(resultCount / globalVars.pageLimit);
	var htmlOutput = '<b>Result Page: </b>';
	for (var i = 0; i < pageCount; i++) {
		htmlOutput += '<a id="page-' + (i + 1) + '" href="#" style="margin-right:4px" onclick="searchRecordPage(' + (i + 1) + ')">' + (i + 1) + '</a>';
	}
	htmlOutput += '<a href="#" style="margin-right:4px" onclick="searchRecordPage(' + (globalVars.pageNumber + 1) + ')">Next &gt;&gt;</a>';
	$("#pageingDiv").html(htmlOutput);
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
				selectedRow.currentContractLicenseNumber = arrayOfData[data].itemId;
				selectedRow.caseFileBarcode = arrayOfData[data].caseFileBarcode;
				selectedRow.activitytype = arrayOfData[data].activitytype;
				selectedRow.surfacearea = arrayOfData[data].surfacearea;
				selectedRow.ismortgaged = arrayOfData[data].ismortgaged;
				selectedRow.utilization = arrayOfData[data].utilization;
				selectedRow.Address1 = arrayOfData[data].Address1;
				selectedRow.agriculturePlotID = arrayOfData[data].agriculturePlotID;
				selectedRow.mortgageDate = arrayOfData[data].mortgageDate;
				selectedRow.mortgageEndDate = arrayOfData[data].mortgageEndDate;
				selectedRow.plotStatus = arrayOfData[data].plotStatus;
				selectedRow.contractType = arrayOfData[data].contractType;
				selectedRow.contractDurationYears = arrayOfData[data].contractDurationYears;
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
	//alert('........ 1');
	searchRecordRequest($("#licenseNumber").val(), $("#chaletID").val(), $("#licenseIssuanceDate").val(), $("#IsResort").val(),
			pageNumber, globalVars.pageLimit);
}

function selectNCHL() {

	var winParent = window.opener;
	try {
		if (globalVars.selectedConsignee.length == 0) {
			alert("Please select a NCHL");
			return;
		}
		if (globalVars.recordType == "CCHA") {

			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_License Number").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_Chalet ID").value = selectedRow.agriculturePlotID;

			winParent.focus();
			window.opener.close();
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
