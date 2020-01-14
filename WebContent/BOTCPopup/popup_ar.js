var selectedRow = {
	contractNumber : "",
	projectName : "",
	status : "",
	projectDescription : "",
	designPhaseStartDate : "",
	executionPhaseStartDate : "",
	licensingPhaseStartDate : "",
	operationPhaseStartDate : "",
	designPhasePlannedEndDate : "",
	executionPhasePlannedEndDate : "",
	licensingPhasePlannedEndDate : "",
	operationPhasePlannedEndDate : "",
	rentAmount : "",
	totalRentAmount : "",
	lawType : "",
	assigningEntity : "",
	projectActivity : "",
	projectLandArea : "",
	surveyPlan : "",
	contractSignOffDate : "",
	contractStartDate : "",
	contractEndDate : "",
	projectAmount : "",
	periodicMaintenanceGuarantee : ""
	
}

function updateWithdrawError(param) {
	//alert("The deposit must be paid to be withdrawn.");
}

function updateConfiscateError(param) {
	//alert("The deposit must be paid to be confiscated.");
}

function searchRecordRequest(contractNumber, projectName, page, limit) {
	try {
		showSearchLoading();

		var returnValue = "";
		var prosData = "{sessionId:'" + globalVars.userSessionId + "', serviceProviderCode:'MOFK', callerId:'" + globalVars.currentUserID
				+ "', scriptName:'SEARCH_BOTC_RECORDS', parameters:[{Key:'contractNumber', Value:'" + contractNumber + "'}," + "{Key:'projectName', Value:'" + String(projectName)
				+ "'}," + "{Key:'pageLimit', Value:'" + page + "," + limit + "'}," + "{Key:'action', Value:'searchRecordRecords'}]}";
		$.ajax({
			url : globalVars.emseServiceUrl,
			type : "POST",
			async : true,
			data : prosData,
			dataType : "json",
			contentType : "application/json",
			error : function(x, e) {
				alert("error: " + e + " , RES: " + x.responseText);// + ' , JSON: ' + prosData);
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

	htmlOutput += '<tr><th></th><th>رقم العقد</th><th>اسم المشروع</th>';
	htmlOutput += '<th style="display:none;">Project description</th><th style="display:none;">Design phase start date</th><th style="display:none;">Execution phase start date</th><th style="display:none;">Licensing phase start date</th>';
	htmlOutput += '<th style="display:none;">Operation phase start date</th><th style="display:none;">Design phase planned end date</th><th style="display:none;">Execution phase planned end date</th><th style="display:none;">Licensing phase planned end date</th>';
	htmlOutput += '<th style="display:none;">Operation phase planned end date</th><th style="display:none;">Rent amount</th><th style="display:none;">Total rent amount</th><th style="display:none;">Law type</th>';
	htmlOutput += '<th style="display:none;">Assigning entity</th><th style="display:none;">Project activity</th><th style="display:none;">Project land area</th><th style="display:none;">Survey Plan</th>';
	htmlOutput += '<th style="display:none;">Contract sign-off date</th><th style="display:none;">Contract start date</th><th style="display:none;">Contract end date</th><th style="display:none;">ProjectAmount</th>';
	htmlOutput += '<th style="display:none;">Periodic Maintenance guarantee</th>';
	htmlOutput += '<th style="display:none;">status</th>';
	
	for (var i = 0; i < arr.length; i++) {
		if (i % 2 == 0) {
			htmlOutput += '<tr style="background-color: aliceBlue;">';
		} else {
			htmlOutput += '<tr onclick="showRow(this);">';
		}

		var objData = new Object();
		objData.contractNumber = arr[i]["itemId"];
		objData.projectName = arr[i]["Project name"];
		objData.projectDescription = arr[i]["Project description"];
		objData.designPhaseStartDate = arr[i]["Design phase start date"];
		objData.executionPhaseStartDate = arr[i]["Execution phase start date"];
		objData.licensingPhaseStartDate = arr[i]["Licensing phase start date"];
		objData.operationPhaseStartDate = arr[i]["Operation phase start date"];
		objData.designPhasePlannedEndDate = arr[i]["Design phase planned end date"];
		objData.executionPhasePlannedEndDate = arr[i]["Execution phase planned end date"];
		objData.licensingPhasePlannedEndDate = arr[i]["Licensing phase planned end date"];
		objData.operationPhasePlannedEndDate = arr[i]["Operation phase planned end date"];
		objData.rentAmount = arr[i]["Rent amount"];
		objData.totalRentAmount = arr[i]["Total rent amount"];
		objData.lawType = arr[i]["Law type"];
		objData.assigningEntity = arr[i]["Assigning entity"];
		objData.projectActivity = arr[i]["Project activity"];
		objData.projectLandArea = arr[i]["Project land area"];
		objData.surveyPlan = arr[i]["Survey Plan"];
		objData.contractSignOffDate = arr[i]["Contract sign-off date"];
		objData.contractStartDate = arr[i]["Contract start date"];
		objData.contractEndDate = arr[i]["Contract end date"];
		objData.projectAmount = arr[i]["ProjectAmount"];
		objData.periodicMaintenanceGuarantee = arr[i]["Periodic Maintenance guarantee"];
		objData.status = arr[i]["status"];

		arrayOfData[i] = objData;

		htmlOutput += '<td><input type="radio" onclick="recordClick(this);" name="firs" value="' + objData.contractNumber + '"></input></td>';
		htmlOutput += '<td>' + objData.contractNumber + '</td>';
		htmlOutput += '<td>' + objData.projectName + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.projectDescription + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.designPhaseStartDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.executionPhaseStartDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.licensingPhaseStartDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.operationPhaseStartDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.designPhasePlannedEndDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.executionPhasePlannedEndDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.licensingPhasePlannedEndDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.operationPhasePlannedEndDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.rentAmount + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.totalRentAmount + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.lawType + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.assigningEntity + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.projectActivity + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.projectLandArea + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.surveyPlan + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.contractSignOffDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.contractStartDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.contractEndDate + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.projectAmount + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.periodicMaintenanceGuarantee + '</td>';
		htmlOutput += '<td style="display:none;">' + objData.status + '</td>';
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
			if (obj.value == arrayOfData[data].contractNumber) {
				selectedRow.contractNumber = arrayOfData[data].contractNumber;
				selectedRow.projectName = arrayOfData[data].projectName;
				selectedRow.status = arrayOfData[data].status;
				selectedRow.projectDescription = arrayOfData[data].projectDescription;
				selectedRow.designPhaseStartDate = arrayOfData[data].designPhaseStartDate;
				selectedRow.executionPhaseStartDate = arrayOfData[data].executionPhaseStartDate;
				selectedRow.licensingPhaseStartDate = arrayOfData[data].licensingPhaseStartDate;
				selectedRow.operationPhaseStartDate = arrayOfData[data].operationPhaseStartDate;
				selectedRow.designPhasePlannedEndDate = arrayOfData[data].designPhasePlannedEndDate;
				selectedRow.executionPhasePlannedEndDate = arrayOfData[data].executionPhasePlannedEndDate;
				selectedRow.licensingPhasePlannedEndDate = arrayOfData[data].licensingPhasePlannedEndDate;
				selectedRow.operationPhasePlannedEndDate = arrayOfData[data].operationPhasePlannedEndDate;
				selectedRow.rentAmount = arrayOfData[data].rentAmount;
				selectedRow.totalRentAmount = arrayOfData[data].totalRentAmount;
				selectedRow.lawType = arrayOfData[data].lawType;
				selectedRow.assigningEntity = arrayOfData[data].assigningEntity;
				selectedRow.projectActivity = arrayOfData[data].projectActivity;
				selectedRow.projectLandArea = arrayOfData[data].projectLandArea;
				selectedRow.surveyPlan = arrayOfData[data].surveyPlan;
				selectedRow.contractSignOffDate = arrayOfData[data].contractSignOffDate;
				selectedRow.contractStartDate = arrayOfData[data].contractStartDate;
				selectedRow.contractEndDate = arrayOfData[data].contractEndDate;
				selectedRow.projectAmount = arrayOfData[data].projectAmount;
				selectedRow.periodicMaintenanceGuarantee = arrayOfData[data].periodicMaintenanceGuarantee;
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
	$("#contractNumber").val("");
	$("#projectName").val("");
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
	searchRecordRequest($("#contractNumber").val(), $("#projectName").val(), pageNumber, globalVars.pageLimit);
}

function selectBOTC() {
	var winParent = window.opener;
	try {
		if (globalVars.selectedConsignee.length == 0) {
			alert("الرجاء اختيار عقد");
			return;
		}

		if (globalVars.recordType == "BOTA") {

			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractNumber").value = convertHTMLEncodedToText(selectedRow.contractNumber);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_projectName").value = convertHTMLEncodedToText(selectedRow.projectName);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_description").value = convertHTMLEncodedToText(selectedRow.projectDescription);
			
			winParent.focus();

			window.close();
		}
		
		if (globalVars.recordType == "BOTP") {

			winParent.document.getElementById("app_spec_info_PENALTYDETAILS_contractNumber").value = convertHTMLEncodedToText(selectedRow.contractNumber);
			winParent.document.getElementById("app_spec_info_PENALTYDETAILS_projectName").value = convertHTMLEncodedToText(selectedRow.projectName);

			winParent.focus();

			window.close();
		}
		
		if (globalVars.recordType == "BOTE") {

			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractNumber").value = convertHTMLEncodedToText(selectedRow.contractNumber);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_projectName").value = convertHTMLEncodedToText(selectedRow.projectName);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_description").value = convertHTMLEncodedToText(selectedRow.projectDescription);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentPhase").value = convertHTMLEncodedToText(selectedRow.status);
			if (selectedRow.status == "Design phase") {
				winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentStartDate").value = convertHTMLEncodedToText(selectedRow.designPhaseStartDate);
				winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentEndDate").value = convertHTMLEncodedToText(selectedRow.designPhasePlannedEndDate);
			} else if (selectedRow.status == "Execution phase") {
				winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentStartDate").value = convertHTMLEncodedToText(selectedRow.executionPhaseStartDate);
				winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentEndDate").value = convertHTMLEncodedToText(selectedRow.executionPhasePlannedEndDate);
			} else if (selectedRow.status == "Operation phase") {
				winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentStartDate").value = convertHTMLEncodedToText(selectedRow.operationPhaseStartDate);
				winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentEndDate").value = convertHTMLEncodedToText(selectedRow.operationPhasePlannedEndDate);
			} else if (selectedRow.status == "Licensing phase") {
				winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentStartDate").value = convertHTMLEncodedToText(selectedRow.licensingPhaseStartDate);
				winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentEndDate").value = convertHTMLEncodedToText(selectedRow.licensingPhasePlannedEndDate);
			}

			winParent.focus();

			window.close();
		}
		
		if (globalVars.recordType == "BOTI") {
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractNumber").value = convertHTMLEncodedToText(selectedRow.contractNumber);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_projectName").value = convertHTMLEncodedToText(selectedRow.projectName);
			winParent.document.getElementById("app_spec_info_PHASEINFORMATION_currentPhase").value = convertHTMLEncodedToText(selectedRow.status);

			winParent.focus();

			window.close();
		}

		if (globalVars.recordType == "BOTG") {

			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractNumber").value = convertHTMLEncodedToText(selectedRow.contractNumber);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_projectName").value = convertHTMLEncodedToText(selectedRow.projectName);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_description").value = convertHTMLEncodedToText(selectedRow.projectDescription);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentPhase").value = convertHTMLEncodedToText(selectedRow.status);
			
			winParent.focus();

			window.close();
		}
		
		if (globalVars.recordType == "BOTR") {

			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractNumber").value = convertHTMLEncodedToText(selectedRow.contractNumber);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_projectName").value = convertHTMLEncodedToText(selectedRow.projectName);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_description").value = convertHTMLEncodedToText(selectedRow.projectDescription);
			
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_Current_Rent_amount").value = convertHTMLEncodedToText(selectedRow.rentAmount);
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_Current_Total_rent_amount").value = convertHTMLEncodedToText(selectedRow.totalRentAmount);
			winParent.document.getElementById("app_spec_info_CURRENT_CONTRACT_DETAILS_Law_type").value = convertHTMLEncodedToText(selectedRow.lawType);
			winParent.document.getElementById("app_spec_info_CURRENT_CONTRACT_DETAILS_Assigning_entity").value = convertHTMLEncodedToText(selectedRow.assigningEntity);
			winParent.document.getElementById("app_spec_info_CURRENT_CONTRACT_DETAILS_Project_activity").value = convertHTMLEncodedToText(selectedRow.projectActivity);
			winParent.document.getElementById("app_spec_info_CONTRACT_DETAILS_Survey_Plan").value = convertHTMLEncodedToText(selectedRow.surveyPlan);
			winParent.document.getElementById("app_spec_info_CONTRACT_DETAILS_Contract_sign_off_date").value = convertHTMLEncodedToText(selectedRow.contractSignOffDate);
			winParent.document.getElementById("app_spec_info_CONTRACT_DETAILS_Contract_start_date").value = convertHTMLEncodedToText(selectedRow.contractStartDate);
			winParent.document.getElementById("app_spec_info_CONTRACT_DETAILS_Contract_end_date").value = convertHTMLEncodedToText(selectedRow.contractEndDate);
			winParent.document.getElementById("app_spec_info_CONTRACT_DETAILS_Project_Amount").value = convertHTMLEncodedToText(selectedRow.projectAmount);
			winParent.document.getElementById("app_spec_info_CONTRACT_DETAILS_Periodic_Maintenance_Guarantee").value = convertHTMLEncodedToText(selectedRow.periodicMaintenanceGuarantee);
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
	$("#contractNumber").val("");
	$("#projectName").val("");
	$('#searchResultContainer').css('display', 'none');
	$('#noFirsLabel').css('display', 'none');
	globalVars.pageNumber = 1;
	globalVars.selectedConsignee = "";
	globalVars.selectedConsigneeEnglishName = "";
}
