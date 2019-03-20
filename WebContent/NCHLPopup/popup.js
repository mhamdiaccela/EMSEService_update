var selectedRow = {
	licenseNumber: "",
	chaletID: "",
	IsResort: ""
}

function searchRecordRequest(licenseNumber, chaletID, IsResort, page, limit) {

	try {
		showSearchLoading();

		var returnValue = "";
		var prosData = "{sessionId:'" + globalVars.userSessionId + "', serviceProviderCode:'MOFK', callerId:'" + globalVars.currentUserID
			+ "', scriptName:'SEARCH_NCHL_RECORDS', parameters:[{Key:'licenseNumber', Value:'" + licenseNumber + "'}," + "{Key:'chaletID', Value:'"
			+ String(chaletID) + "'},"
			+ "{Key:'IsResort', Value:'" + String(IsResort) + "'}," +
			"{Key:'pageLimit', Value:'" + page + "," + limit + "'},"
			+ "{Key:'action', Value:'searchRecordRecords'}]}";
		$.ajax({
			url: globalVars.emseServiceUrl,
			type: "POST",
			async: true,
			data: prosData,
			dataType: "json",
			contentType: "application/json",
			error: function (x, e) {
				alert("error: " + e + " , RES: " + x.responseText);// + ' , JSON: ' + prosData);
				hideSearchLoading();
			},
			success: function (data) {

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

	htmlOutput += '<tr><th></th><th>License Number</th><th>Chalet ID</th><th>Is Resort ?</th>';

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

		arrayOfData[i] = objData;

		htmlOutput += '<td><input type="radio" onclick="recordClick(this);" name="firs" value="' + objData.licenseNumber + '"></input></td>';
		htmlOutput += '<td>' + objData.licenseNumber + '</td>';
		htmlOutput += '<td>' + objData.chaletID + '</td>';
		htmlOutput += '<td>' + objData.IsResort + '</td>';
		htmlOutput += '</tr>';

	}
	$('#recordListTable').html(htmlOutput);
}

function getNameEnglishBySelectedConsigneeId(selectedConsigneeId) {

	for (var index in arrayOfData) {
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
			if (obj.value == arrayOfData[data].licenseNumber) {
				selectedRow.licenseNumber = arrayOfData[data].licenseNumber;
				selectedRow.chaletID = arrayOfData[data].chaletID;
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

	searchRecordRequest($("#licenseNumber").val(), $("#chaletID").val(), $("#licenseIssuanceDate").val(), $("#IsResort").val(),
		pageNumber, globalVars.pageLimit);
}

function selectNCHL() {

	var winParent = window.opener;
	try {
		if (globalVars.selectedConsignee.length == 0) {
			alert("Please select an NCHL");
			return;
		}
		if (globalVars.recordType == "CCHA") {

			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_License_Number").value = selectedRow.licenseNumber;
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_Chalet_ID").value = selectedRow.chaletID;

			winParent.focus();

			window.close();
		}

		if (globalVars.recordType == "FICN") {
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_chaletid").value = selectedRow.chaletID;

			winParent.focus();

			window.close();
		}
		if (globalVars.recordType == "ACLA") {
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_chaletNumber").value = selectedRow.chaletID;
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_licenseNumber").value = selectedRow.licenseNumber;

			winParent.focus();

			window.close();
		}
		if (globalVars.recordType == "UCTR") {
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_chaletid").value = selectedRow.chaletID;
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_licensenumber").value = selectedRow.licenseNumber;

			winParent.focus();

			window.close();
		}
		if (globalVars.recordType == "ARES") {
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_chaletID").value = selectedRow.chaletID;
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_licenseNumber").value = selectedRow.licenseNumber;

			winParent.focus();

			window.close();
		}
		if (globalVars.recordType == "MACH") {
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_chaletNumber").value = selectedRow.chaletID;
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_licenseNumber").value = selectedRow.licenseNumber;

			winParent.focus();

			window.close();
		}
		if (globalVars.recordType == "PLIC") {
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_chaletID").value = selectedRow.chaletID;
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_licenseNumber").value = selectedRow.licenseNumber;

			winParent.focus();

			window.close();
		}
		if (globalVars.recordType == "SCHA") {
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_chaletID").value = selectedRow.chaletID;
			winParent.document.getElementById("app_spec_info_APPLICATIONDETAILS_licenseNumber").value = selectedRow.licenseNumber;

			winParent.focus();

			window.close();
		}
		if (globalVars.recordType == "TWMA") {
			winParent.document.getElementById("app_spec_info_CERTIFICATETYPE_Chalet_ID").value = selectedRow.chaletID;

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
