var selectedRow = {
		auctionId: "",
		parcelId: ""
}

function updateWithdrawError(param) {
	//alert("The deposit must be paid to be withdrawn.");
}

function updateConfiscateError(param) {
	//alert("The deposit must be paid to be confiscated.");
}

function searchRecordRequest(auctionId, parcelId, projectName, page, limit) {
	try {
		showSearchLoading();

		var returnValue = "";
		var prosData = "{sessionId:'" + globalVars.userSessionId + "', serviceProviderCode:'MOFK', callerId:'" + globalVars.currentUserID
			+ "', scriptName:'SEARCH_APPP_RECORDS', parameters:[{Key:'auctionId', Value:'" + auctionId + "'}," + "{Key:'parcelId', Value:'"
			+ String(parcelId) + "'},"
			+ "{Key:'pageLimit', Value:'" + page + "," + limit + "'},"
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

	htmlOutput += '<tr><th></th><th>Auction ID</th><th>Plot ID</th>';

	for (var i = 0; i < arr.length; i++) {
		if (i % 2 == 0) {
			htmlOutput += '<tr style="background-color: aliceBlue;">';
		} else {
			htmlOutput += '<tr onclick="showRow(this);">';
		}

		var objData = new Object();
		objData.auctionId = arr[i]["itemId"];
		objData.parcelId = arr[i]["Parcel ID"];

		arrayOfData[i] = objData;

		htmlOutput += '<td><input type="radio" onclick="recordClick(this);" name="firs" value="' + objData.auctionId + '"></input></td>';
		htmlOutput += '<td>' + objData.auctionId + '</td>';
		htmlOutput += '<td>' + objData.parcelId + '</td>';
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
			if (obj.value == arrayOfData[data].auctionId) {
				selectedRow.auctionId = arrayOfData[data].auctionId;
				selectedRow.parcelId = arrayOfData[data].parcelId;
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
	$("#auctionId").val("");
	$("#parcelId").val("");
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
	searchRecordRequest($("#auctionId").val(), $("#parcelId").val(), pageNumber, globalVars.pageLimit);
}

function selectAPPP() {
	var winParent = window.opener;
	try {
		if (globalVars.selectedConsignee.length == 0) {
			alert("Please select Auction");
			return;
		}
		
		if (globalVars.recordType == "AREG") {

			winParent.document.getElementById("app_spec_info_AUCTION_DATA_Auction_ID").value = selectedRow.auctionId;
			winParent.document.getElementById("app_spec_info_REGISTRATION_APPLICANT_DATA_Plot_ID").value = selectedRow.parcelId;

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
	$("#auctionId").val("");
	$("#parcelId").val("");
	$('#searchResultContainer').css('display', 'none');
	$('#noFirsLabel').css('display', 'none');
	globalVars.pageNumber = 1;
	globalVars.selectedConsignee = "";
	globalVars.selectedConsigneeEnglishName = "";
}
