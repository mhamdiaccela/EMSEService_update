var selectedRow = {
	currentContractLicenseNumber : "",
	contractDurationYears : "",
	contractStartDate : "",
	expectedContractEndDate : "",
	contractEndDate : "",
	signDate : "",
	issueDate : "",
	totalRentingFees : "",
	allocationCorrespondenceNumber : "",
	allocationCorrespondenceDate : "",
	caseFileBarcode : "",
	activitytype : "",
	surfacearea : "",
	ismortgaged : "",
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

	htmlOutput += '<tr><th></th><th>رقم العقد</th><th>طبيعية الاستغلال</th><th>نوع النشاط</th>';
	htmlOutput += '<th>رقم المخطط</th><th>رقم القطعة</th>   <th>رقم القسيمة</th>     <th>رقم الملف</th> </tr>';
	
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
		objData.surfacearea = arr[i]["surfacearea"];
		objData.utilization = arr[i]["utilization_ar"];
		objData.ismortgaged = arr[i]["ismortgaged"];
		objData.activitytype = arr[i]["activitytype_ar"];
		objData.agriculturePlotID = arr[i]["agriculturePlotID"];
		objData.mortgageDate = arr[i]["mortgageDate"];

		objData.mortgageEndDate = arr[i]["mortgageEndDate"];
		objData.plotStatus = arr[i]["plotStatus"];
		objData.contractType = arr[i]["contractType_ar"];
		objData.contractDurationYears = arr[i]["contractDurationYears"];
		
		
		objData.planNumber  = arr[i]["planNumber"];
		objData.blockNumber = arr[i]["blockNumber"];

		arrayOfData[i] = objData;

		htmlOutput += '<td><input type="radio" onclick="recordClick(this);" name="firs" value="' + arr[i]["itemId"] + '"></input></td>';
		htmlOutput += '<td>' + arr[i]["itemId"] + '</td>';
		htmlOutput += '<td>' + arr[i]["utilization_ar"] + '</td>';
		htmlOutput += '<td>' + arr[i]["activitytype_ar"] + '</td>';
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
			alert("الرجاء أختيار عقد");
			return;
		}
		if (globalVars.recordType == "AGCT") {

			winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_currentContractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_address").value = convertHTMLEncodedToText(selectedRow.Address1);
			winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_isMortgaged%3F_r1").value = selectedRow.ismortgaged == 'CHECKED' ? 'Yes' : "";
			winParent.document.getElementById("app_spec_info_CURRENTPLOTDETAILS_isMortgaged%3F_r2").value = selectedRow.ismortgaged == 'CHECKED' ? '' : "Yes";

			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "MAPC1") {

			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_firstContractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_firstAgriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_address").value = convertHTMLEncodedToText(selectedRow.Address1);
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_isMortgaged%3F_r1").value = selectedRow.ismortgaged == 'CHECKED' ? 'Yes' : "";
			winParent.document.getElementById("app_spec_info_FIRSTPLOTDETAILS_isMortgaged%3F_r2").value = selectedRow.ismortgaged == 'CHECKED' ? '' : "Yes";

			winParent.focus();
	
		} else if (globalVars.recordType == "MAPC2") {
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_secondContractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_secondAgriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_address").value = convertHTMLEncodedToText(selectedRow.Address1);
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_isMortgaged%3F_r1").value = selectedRow.ismortgaged == 'CHECKED' ? 'Yes' : "";
			winParent.document.getElementById("app_spec_info_SECONDPLOTDETAILS_isMortgaged%3F_r2").value = selectedRow.ismortgaged == 'CHECKED' ? '' : "Yes";

			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "MAPC3") {
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_thirdContractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_thirdAgriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_address").value = convertHTMLEncodedToText(selectedRow.Address1);
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_isMortgaged%3F_r1").value = selectedRow.ismortgaged == 'CHECKED' ? 'Yes' : "";
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_isMortgaged%3F_r2").value = selectedRow.ismortgaged == 'CHECKED' ? '' : "Yes";

			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "MAPC3") {
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_thirdContractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_thirdAgriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_address").value = convertHTMLEncodedToText(selectedRow.Address1);
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_isMortgaged%3F_r1").value = selectedRow.ismortgaged == 'CHECKED' ? 'Yes' : "";
			winParent.document.getElementById("app_spec_info_THIRDPLOTDETAILS_isMortgaged%3F_r2").value = selectedRow.ismortgaged == 'CHECKED' ? '' : "Yes";

			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "APIC") {
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_surfaceArea").value = selectedRow.surfacearea;

			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "APFI") {
			winParent.document.getElementById("app_spec_info_INSPECTIONDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_INSPECTIONDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;

			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "ACAR") {
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentContractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractType").value = convertHTMLEncodedToText(selectedRow.contractType);

			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "APCR") {
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_address").value = convertHTMLEncodedToText(selectedRow.Address1);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.surfacearea;

			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "TAPC") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_agriculturePlotID").value = selectedRow.agriculturePlotID;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_isMortgaged%3F_r1").value = selectedRow.ismortgaged == 'CHECKED' ? 'Yes' : "";
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_isMortgaged%3F_r2").value = selectedRow.ismortgaged == 'CHECKED' ? '' : "Yes";

			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "AAPC") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_currentContractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_UTILIZATIONDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_UTILIZATIONDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.surfacearea;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_isMortgaged%3F_r1").value = selectedRow.ismortgaged == 'CHECKED' ? 'Yes' : "";
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_isMortgaged%3F_r2").value = selectedRow.ismortgaged == 'CHECKED' ? '' : "Yes";
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_mortgageDate").value = selectedRow.mortgageDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_mortgageEndDate").value = selectedRow.mortgageEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_plotStatus").value = selectedRow.plotStatus;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractType").value = selectedRow.contractType;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractDurationYears").value = selectedRow.contractDurationYears;
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_agriculturePlotID").value = convertHTMLEncodedToText(selectedRow.agriculturePlotID);

			winParent.focus();
			window.close();

		} else if (globalVars.recordType == "CTIR") {
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentContractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_agriculturePlotID").value = convertHTMLEncodedToText(selectedRow.agriculturePlotID);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_utilization").value = convertHTMLEncodedToText(selectedRow.utilization);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_activityType").value = convertHTMLEncodedToText(selectedRow.activitytype);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_surfaceArea").value = convertHTMLEncodedToText(selectedRow.surfacearea);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_address").value = convertHTMLEncodedToText(selectedRow.Address1);

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