var selectedRow = {
	currentContractLicenseNumber : "",
	contractDurationYears : "",
	contractStartDate : "",
	expectedContractEndDate : "",
	contractEndDate : "",
	signDate : "",
	issueDate : "",
	totalRentingFees : "",
	annualRentingFees : "",
	allocationCorrespondenceNumber : "",
	allocationCorrespondenceDate : "",
	activitytype : "",
	surfacearea : "",
	ismortgaged : "",
	caseFileBarcode : "",
	utilization : "",
	Address1 : "",
	agriculturePlotID : "",
	mortgageDate : "",
	mortgageEndDate : "",
	plotStatus : "",
	contractType : "",
	contractDurationYears : "",
	planNumber : "",
	blockNumber : ""

}

function searchRecordRequest(planNumber, currentContractLicenseNumber, agriculturePlotID, caseFileBarcode, blockNumber, page, limit) {
	try {
		showSearchLoading();

		var returnValue = "";
		var prosData = "{sessionId:'" + globalVars.userSessionId + "', serviceProviderCode:'MOFK', callerId:'" + globalVars.currentUserID
				+ "', scriptName:'SEARCH_AGCT_RECORDS', parameters:[{Key:'planNumber', Value:'" + planNumber + "'}," + "{Key:'currentContractLicenseNumber', Value:'"
				+ String(currentContractLicenseNumber) + "'}," + "{Key:'agriculturePlotID', Value:'" + String(agriculturePlotID) + "'}," + "{Key:'caseFileBarcode', Value:'"
				+ String(caseFileBarcode) + "'}," + "{Key:'blockNumber', Value:'" + String(blockNumber) + "'}," + "{Key:'pageLimit', Value:'" + page + "," + limit + "'},"
				+ "{Key:'action', Value:'searchRecordRecords'}]}";
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

	htmlOutput += '<tr><th></th><th>Contract Number</th><th>Utilization</th><th>Activity type</th>';
	htmlOutput += '<th>Plan Number</th><th>Block Number</th><th>Plot Number</th><th>Case file barcode</th> </tr>';

	for (var i = 0; i < arr.length; i++) {
		if (i % 2 == 0) {
			htmlOutput += '<tr style="background-color: aliceBlue;">';
		} else {
			htmlOutput += '<tr onclick="showRow(this);">';
		}

		var objData = new Object();
		objData.itemId = arr[i]["itemId"];
		objData.caseFileBarcode = arr[i]["caseFileBarcode"];
		objData.Address1 = arr[i]["Address1"];
		
		objData.planNumber  = arr[i]["planNumber"];
		objData.blockNumber = arr[i]["blockNumber"];
		
		objData.surfacearea = arr[i]["surfacearea"];
		objData.utilization = arr[i]["utilization"];
		objData.ismortgaged = arr[i]["isMortgaged?"];
		objData.activitytype = arr[i]["activitytype"];
		objData.agriculturePlotID = arr[i]["agriculturePlotID"];
		objData.mortgageDate = arr[i]["mortgageDate"];

		objData.mortgageEndDate = arr[i]["mortgageEndDate"];
		objData.plotStatus = arr[i]["plotStatus"];
		objData.contractType = arr[i]["contractType"];
		objData.contractDurationYears = arr[i]["contractDurationYears"];
		
		objData.contractEndDate = arr[i]["contractEndDate"];
		objData.contractStartDate = arr[i]["contractStartDate"];
		objData.contractType = arr[i]["contractType"];
		objData.expectedContractEndDate = arr[i]["expectedContractEndDate"];
		objData.annualRentingFees = arr[i]["annualRentingFees"];
		objData.totalRentingFees = arr[i]["totalRentingFees"];
		objData.planNumber  = arr[i]["planNumber"];
		objData.blockNumber = arr[i]["blockNumber"];
		arrayOfData[i] = objData;

		htmlOutput += '<td><input type="radio" onclick="recordClick(this);" name="firs" value="' + arr[i]["itemId"] + '"></input></td>';
		
		htmlOutput += '<td>' + arr[i]["itemId"] + '</td>';
		htmlOutput += '<td>' + arr[i]["utilization"] + '</td>';
		htmlOutput += '<td>' + arr[i]["activitytype"] + '</td>';
		htmlOutput += '<td>' + arr[i]["planNumber"] + '</td>';
		htmlOutput += '<td>' + arr[i]["blockNumber"] + '</td>';
		htmlOutput += '<td>' + arr[i]["agriculturePlotID"] + '</td>';
		htmlOutput += '<td>' + arr[i]["caseFileBarcode"] + '</td>';
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
				selectedRow.contractStartDate = arrayOfData[data].contractStartDate;
				selectedRow.expectedContractEndDate = arrayOfData[data].expectedContractEndDate;
				selectedRow.contractEndDate = arrayOfData[data].contractEndDate;
				selectedRow.totalRentingFees = arrayOfData[data].totalRentingFees;
				selectedRow.annualRentingFees = arrayOfData[data].annualRentingFees;
				selectedRow.planNumber = arrayOfData[data].planNumber;
				selectedRow.blockNumber = arrayOfData[data].blockNumber;
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
	searchRecordRequest($("#planNumber").val(), $("#currentContractLicenseNumber").val(), $("#agriculturePlotID").val(), $("#caseFileBarcode").val(), $("#blockNumber").val(),
			pageNumber, globalVars.pageLimit);
}

function selectAGCT() {

	var winParent = window.opener;
	try {
		if (globalVars.selectedConsignee.length == 0) {
			alert("Please select a AGCT");
			return;
		}
		if (globalVars.recordType == "AGCT") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_currentContractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_planNumber").value = selectedRow.planNumber;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_blockNumber").value = selectedRow.blockNumber;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			//winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_utilization").value = selectedRow.utilization;
			//winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_activityType").value = selectedRow.activitytype;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_Address1").value = selectedRow.Address1;
			//winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_isMortgaged%3F_r1").checked = selectedRow.ismortgaged == 'Yes' ? true : false;
			//winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_isMortgaged%3F_r2").checked = selectedRow.ismortgaged == 'No' ? true : false;

			winParent.focus();
			
			window.close();
		} else if (globalVars.recordType == "MAPC1") {
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_firstContractNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_firstAgriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_utilization").value = selectedRow.utilization;
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_activityType").value = selectedRow.activitytype;
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_address").value = selectedRow.Address1;
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_isMortgaged%3F_r1").checked = selectedRow.ismortgaged == 'Yes' ? true : false;
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_isMortgaged%3F_r2").checked = selectedRow.ismortgaged == 'No' ? true : false;

			winParent.focus();
			window.close();
			
		} else if (globalVars.recordType == "MAPC2") {
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_secondContractNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_secondAgriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_utilization").value = selectedRow.utilization;
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_activityType").value = selectedRow.activitytype;
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_address").value = selectedRow.Address1;
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_isMortgaged%3F_r1").checked = selectedRow.ismortgaged == 'Yes' ? true : false;
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_isMortgaged%3F_r2").checked = selectedRow.ismortgaged == 'No' ? true : false;

			winParent.focus();
			window.close();
			
		} else if (globalVars.recordType == "APIC") {
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractLicenseNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_utilization").value = selectedRow.utilization;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_activityType").value = selectedRow.activitytype;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_surfaceArea").value = selectedRow.surfacearea;

			winParent.focus();
			window.close();
		} else if (globalVars.recordType == "APFI") {
			winParent.document.getElementById("app_spec_info_INSPECTIONDETAILS_contractNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_INSPECTIONDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;

			winParent.focus();
			window.close();
			
		} else if (globalVars.recordType == "ACAR") {
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentContractLicenseNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_utilization").value = selectedRow.utilization;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_activityType").value = selectedRow.activitytype;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractType").value = selectedRow.contractType;

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractDurationYears").value = selectedRow.contractDurationYears;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractStartDate").value = selectedRow.contractStartDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_expectedContractEndDate").value = selectedRow.expectedContractEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractEndDate").value = selectedRow.contractEndDate;
			winParent.document.getElementById("app_spec_info_MORTGAGEDETAILS_isMortgaged%3F_r1").checked = selectedRow.ismortgaged == 'Yes' ? true : false;
			winParent.document.getElementById("app_spec_info_MORTGAGEDETAILS_isMortgaged%3F_r2").checked = selectedRow.ismortgaged == 'No' ? true : false;
			//winParent.document.getElementById("app_spec_info_MORTGAGEDETAILS_mortgageDate").value = selectedRow.mortgageDate;
			//winParent.document.getElementById("app_spec_info_MORTGAGEDETAILS_mortgageEndDate").value = selectedRow.mortgageEndDate;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_caseFileBarcode").value = selectedRow.caseFileBarcode;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_annualRentingFees").value = selectedRow.annualRentingFees;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_totalRentingFees").value = selectedRow.totalRentingFees;
			
			winParent.focus();
			window.close();
			
		} else if (globalVars.recordType == "APCR") {
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_address").value = selectedRow.Address1;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.surfacearea;

			winParent.focus();
			window.close();
			
		} else if (globalVars.recordType == "TAPC") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_isMortgaged%3F_r1").checked = selectedRow.ismortgaged == 'Yes' ? true : false;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_isMortgaged%3F_r2").checked = selectedRow.ismortgaged == 'No' ? true : false;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_caseFileBarcode").value = selectedRow.caseFileBarcode;

			winParent.focus();
			window.close();

		}else if (globalVars.recordType == "AAPC") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_currentContractLicenseNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_UTILIZATIONDETAILS_utilization").value = selectedRow.utilization;
			winParent.document.getElementById("app_spec_info_UTILIZATIONDETAILS_activityType").value = selectedRow.activitytype;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_isMortgaged%3F_r1").checked = selectedRow.ismortgaged == 'Yes' ? true : false;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_isMortgaged%3F_r2").checked = selectedRow.ismortgaged == 'No' ? true : false;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_mortgageDate").value = selectedRow.mortgageDate;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_mortgageEndDate").value = selectedRow.mortgageEndDate;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_plotStatus").value = selectedRow.plotStatus;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractType").value = selectedRow.contractType;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractDurationYears").value = selectedRow.contractDurationYears;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_agriculturePlotID").value = convertHTMLEncodedToText(selectedRow.agriculturePlotID);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractStartDate").value = convertHTMLEncodedToText(selectedRow.contractStartDate);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_expectedContractEndDate").value = convertHTMLEncodedToText(selectedRow.expectedContractEndDate);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractEndDate").value = convertHTMLEncodedToText(selectedRow.contractEndDate);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_caseFileBarcode").value = selectedRow.caseFileBarcode;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_planNumber").value = selectedRow.planNumber;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_blockNumber").value = selectedRow.blockNumber;

			winParent.focus();
			window.close();
			
		} else if (globalVars.recordType == "CTIR") {
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentContractLicenseNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_utilization").value = selectedRow.utilization;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_activityType").value = selectedRow.activitytype;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_address").value = selectedRow.Address1;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractDurationYears").value = selectedRow.contractDurationYears;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractStartDate").value = convertHTMLEncodedToText(selectedRow.contractStartDate);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_expectedContractEndDate").value = convertHTMLEncodedToText(selectedRow.expectedContractEndDate);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractEndDate").value = convertHTMLEncodedToText(selectedRow.contractEndDate);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_annualRentingFees").value = selectedRow.annualRentingFees;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_totalRentingFees").value = selectedRow.totalRentingFees;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractType").value = convertHTMLEncodedToText(selectedRow.contractType);
			winParent.document.getElementById("app_spec_info_MORTGAGEDETAILS_isMortgaged%3F_r1").checked = selectedRow.ismortgaged == 'Yes' ? true : false;
			winParent.document.getElementById("app_spec_info_MORTGAGEDETAILS_isMortgaged%3F_r2").checked = selectedRow.ismortgaged == 'No' ? true : false;
			//winParent.document.getElementById("app_spec_info_MORTGAGEDETAILS_mortgageDate").value = convertHTMLEncodedToText(selectedRow.mortgageDate);
			//winParent.document.getElementById("app_spec_info_MORTGAGEDETAILS_mortgageEndDate").value = convertHTMLEncodedToText(selectedRow.mortgageEndDate);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_caseFileBarcode").value = selectedRow.caseFileBarcode;

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
	$("#currentContractLicenseNumber").val("");
	$("#planNumber").val("");
	$("#agriculturePlotID").val("");
	$("#caseFileBarcode").val("");
	$("#blockNumber").val("");
	$('#searchResultContainer').css('display', 'none');
	$('#noFirsLabel').css('display', 'none');
	globalVars.pageNumber = 1;
	globalVars.selectedConsignee = "";
	globalVars.selectedConsigneeEnglishName = "";
}
