var selectedRow = {
	annualRentingFees : "",
	caseFileBarcode : "",
	commericialName : "",
	contractDurationYears : "",
	contractEndDate : "",
	contractStartDate : "",
	contractType : "",
	expectedContractEndDate : "",
	totalRentingFees : "",
	currentContractNumber : "",
	isAllocationLetterAvailable : "",
	planNumber : "",
	plotID : "",
	surfaceArea : "",
	allocationEntity : "",
	blockNumber : "",
	contractApplicationType : "",
	address : ""
};

function searchRecordRequest(planNumber, plotID, commericialName, blockNumber, ALTID, page, limit) {
	try {
		showSearchLoading();

		var returnValue = "";
		var prosData = "{sessionId:'" + globalVars.userSessionId + "', serviceProviderCode:'MOFK', callerId:'" + globalVars.currentUserID
				+ "', scriptName:'SEARCH_PLCA_RECORDS', parameters:[{Key:'planNumber', Value:'" + planNumber + "'}," + "{Key:'plotID', Value:'" + String(plotID) + "'},"
				+ "{Key:'commericialName', Value:'" + String(commericialName) + "'}," + "{Key:'ALTID', Value:'" + String(ALTID) + "'}," + "{Key:'blockNumber', Value:'"
				+ String(blockNumber) + "'}," + "{Key:'pageLimit', Value:'" + page + "," + limit + "'}," + "{Key:'action', Value:'searchRecordRecords'}]}";
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

	htmlOutput += '<tr><th></th><th>رقم العقد</th><th>الاسم التجارى</th><th>رقم المخطط</th>';
	htmlOutput += '<th>رقم القطعة</th>  <th>رقم القسيمة</th> </tr>';

	for (var i = 0; i < arr.length; i++) {
		if (i % 2 == 0) {
			htmlOutput += '<tr style="background-color: aliceBlue;">';
		} else {
			htmlOutput += '<tr onclick="showRow(this);">';
		}
		var objData = new Object();
		objData.itemId = arr[i]["itemId"];
		objData.annualRentingFees = arr[i]["annualRentingFees"];
		objData.caseFileBarcode = arr[i]["caseFileBarcode"];
		objData.commericialName = arr[i]["commericialName"];
		objData.contractDurationYears = arr[i]["contractDurationYears"];
		objData.contractEndDate = arr[i]["contractEndDate"];
		objData.contractStartDate = arr[i]["contractStartDate"];
		objData.contractType = arr[i]["contractType"];
		objData.expectedContractEndDate = arr[i]["expectedContractEndDate"];
		objData.totalRentingFees = arr[i]["totalRentingFees"];
		objData.currentContractNumber = arr[i]["currentContractNumber"];
		objData.isAllocationLetterAvailable = arr[i]["isAllocationLetterAvailable"];
		objData.planNumber = arr[i]["planNumber"];
		objData.plotID = arr[i]["plotID"];
		objData.surfaceArea = arr[i]["surfaceArea"];
		objData.allocationEntity = arr[i]["allocationEntity"];
		objData.blockNumber = arr[i]["blockNumber"];
		objData.contractApplicationType = arr[i]["contractApplicationType"];
		arr[i]["address"] = decode64(arr[i]["address"]);
		objData.address = arr[i]["address"];
		arrayOfData[i] = objData;

		htmlOutput += '<td><input type="radio" onclick="recordClick(this);" name="firs" value="' + arr[i]["itemId"] + '"></input></td>';
		htmlOutput += '<td>' + arr[i]["itemId"] + '</td>';
		htmlOutput += '<td>' + arr[i]["commericialName"] + '</td>';
		htmlOutput += '<td>' + arr[i]["planNumber"] + '</td>';
		htmlOutput += '<td>' + arr[i]["blockNumber"] + '</td>';
		htmlOutput += '<td>' + arr[i]["plotID"] + '</td>';
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
				selectedRow.currentContractLicenseNumber = arrayOfData[data].itemId;

				selectedRow.annualRentingFees = arrayOfData[data].annualRentingFees;
				selectedRow.caseFileBarcode = arrayOfData[data].caseFileBarcode;
				selectedRow.commericialName = arrayOfData[data].commericialName;
				selectedRow.contractDurationYears = arrayOfData[data].contractDurationYears;
				selectedRow.contractEndDate = arrayOfData[data].contractEndDate;
				selectedRow.contractStartDate = arrayOfData[data].contractStartDate;
				selectedRow.contractType = arrayOfData[data].contractType;
				selectedRow.expectedContractEndDate = arrayOfData[data].expectedContractEndDate;
				selectedRow.totalRentingFees = arrayOfData[data].totalRentingFees;
				selectedRow.currentContractNumber = arrayOfData[data].currentContractNumber;
				selectedRow.isAllocationLetterAvailable = arrayOfData[data].isAllocationLetterAvailable;
				selectedRow.planNumber = arrayOfData[data].planNumber;
				selectedRow.plotID = arrayOfData[data].plotID;
				selectedRow.surfaceArea = arrayOfData[data].surfaceArea;
				selectedRow.allocationEntity = arrayOfData[data].allocationEntity;
				selectedRow.blockNumber = arrayOfData[data].blockNumber;
				selectedRow.contractApplicationType = arrayOfData[data].contractApplicationType;
				selectedRow.address = arrayOfData[data].address;
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
	searchRecordRequest($("#planNumber").val(), $("#plotID").val(), $("#commericialName").val(), $("#blockNumber").val(), $("#ALTID").val(), pageNumber, globalVars.pageLimit);
}

function selectPLCA() {

	var winParent = window.opener;
	try {
		if (globalVars.selectedConsignee.length == 0) {
			alert("الرجاء أختيار عقد");
			return;
		}
		if (globalVars.recordType == "CHPO") {

			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_currentContractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_annualRentingFees").value = convertHTMLEncodedToText(selectedRow.annualRentingFees);
			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_plotID").value = selectedRow.plotID;
			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_surfaceArea").value = selectedRow.surfaceArea;
			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_totalRentingFees").value = convertHTMLEncodedToText(selectedRow.totalRentingFees);
			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "PLCR") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_plotID").value = selectedRow.plotID;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.surfaceArea;
			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "ISPO") {

			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_plotID").value = selectedRow.plotID;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_surfaceArea").value = selectedRow.surfaceArea;
			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "APPO") {
			winParent.document.getElementById("app_spec_info_INSPECTIONDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_INSPECTIONDETAILS_plotID").value = convertHTMLEncodedToText(selectedRow.plotID);
			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "PSPO") {

			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_annualRentingFees").value = selectedRow.annualRentingFees;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_plotID").value = selectedRow.plotID;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_surfaceArea").value = selectedRow.surfaceArea;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_totalRentingFees").value = selectedRow.totalRentingFees;
			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "TAPO") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_plotID").value = selectedRow.plotID;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.surfaceArea;
			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "PLCA") {

			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentContractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_allocationEntity").value = convertHTMLEncodedToText(selectedRow.allocationEntity);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_plotID").value = selectedRow.plotID;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_surfaceArea").value = selectedRow.surfaceArea;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_blockNumber").value = selectedRow.blockNumber;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_isAllocationLetterAvailable").value = selectedRow.isAllocationLetterAvailable;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_planNumber").value = selectedRow.planNumber;
			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "APCO") {

			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_currentContractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_allocationEntity").value = convertHTMLEncodedToText(selectedRow.allocationEntity);
			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_plotID").value = selectedRow.plotID;
			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_surfaceArea").value = selectedRow.surfaceArea;
			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_totalRentingFees").value = selectedRow.totalRentingFees;
			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_annualRentingFees").value = selectedRow.annualRentingFees;
			winParent.document.getElementById("app_spec_info_CURRENTCONTRACTDETAILS_address").value = selectedRow.address;
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
	$("#ALTID").val("");
	$("#planNumber").val("");
	$("#blockNumber").val("");
	$("#plotID").val("");
	$("#commericialName").val("");
	$('#searchResultContainer').css('display', 'none');
	$('#noFirsLabel').css('display', 'none');
	globalVars.pageNumber = 1;
	globalVars.selectedConsignee = "";
	globalVars.selectedConsigneeEnglishName = "";
}
