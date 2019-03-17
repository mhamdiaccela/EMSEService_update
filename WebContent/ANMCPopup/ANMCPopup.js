var selectedRow = {
	marketNumber : "",
	area : "",
	commercialActivity : "",
	utilization : "",
	marketName : "",
	contractDurationYears : "",
	contractEndDate : "",
	contractType : "",
	contractStartDate : "",
	ContractUsage : "",
	expectedContractEndDate : "",
	totalRentingFees : "",
	annualRentingFees : ""
};

var globalVars = {
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
	resultCount : 0,
	childWindow : false,
	alterColor : true
}
var commercialActivityDDL = {
	"select" : {
		"ar" : "--أختيار--",
		"en" : "--select--"
	},
	"Alwafaraa WorkMarkets and Stores" : {
		"ar" : "ورش ومحلات الوفرة",
		"en" : "Alwafaraa WorkMarkets and Stores"
	},
	"Antennas" : {
		"ar" : "هوائيات ( أنتينات )",
		"en" : "Antennas"
	},
	"Banks/Telecommunications Companies" : {
		"ar" : "البنوك وشركات الاتصالات",
		"en" : "Banks/Telecommunications Companies"
	},
	"Bird Market" : {
		"ar" : "محلات سوق الطيور بالري",
		"en" : "Bird Market"
	},
	"Commercial Sites (Inside Capital)" : {
		"ar" : "(داخل العاصمة) مواقع تجارية",
		"en" : "Commercial Sites (Inside Capital)"
	},
	"Driving Schools" : {
		"ar" : "مواقع تعليم قيادة السيارات",
		"en" : "Driving Schools"
	},
	"Expropriated Diwans" : {
		"ar" : "الدواوين المستملكة",
		"en" : "Expropriated Diwans"
	},
	"Expropriated Houses" : {
		"ar" : "بيوت مستملكة مستغلة من قبل جمعيات النفع العام والمؤسسات الحكومية",
		"en" : "Expropriated Houses"
	},
	"Expropriated Real Estate-Different Utilizations" : {
		"ar" : "عقارات مستملكة ذات استغلالات مختلفة",
		"en" : "Expropriated Real Estate-Different Utilizations"
	},
	"Kiosks Used as Service Sites" : {
		"ar" : "أكشاك مستغلة كمواقع خدمية",
		"en" : "Kiosks Used as Service Sites"
	},
	"Land Sites" : {
		"ar" : "مواقع قطع الأراضي",
		"en" : "Land Sites"
	},
	"Large Markets" : {
		"ar" : "المحلات الكبيرة",
		"en" : "Large Markets"
	},
	"Large workMarkets" : {
		"ar" : "الورش الكبيرة",
		"en" : "Large workMarkets"
	},
	"Markets (Inside Capital)" : {
		"ar" : "محلات الأسواق (داخل العاصمة)",
		"en" : "Markets (Inside Capital)"
	},
	"Markets inside Interior Market" : {
		"ar" : "المحلات بالسوق الداخلي",
		"en" : "Markets inside Interior Market"
	},
	"Plots (Remote Areas)" : {
		"ar" : "مواقع قطع أراضي (بمناطق نائية)",
		"en" : "Plots (Remote Areas)"
	},
	"Restaurants/Kiosks(Printing/Accessories)" : {
		"ar" : "المطاعم وأكشاك (الطباعة/المكتبة)",
		"en" : "Restaurants/Kiosks(Printing/Accessories)"
	},
	"Sale of Fodders" : {
		"ar" : "مواقع بيع الأعلاف",
		"en" : "Sale of Fodders"
	},
	"Signal Station" : {
		"ar" : "محطات التقوية",
		"en" : "Signal Station"
	},
	"Sites include Stores" : {
		"ar" : "بسطات تضم مخازن",
		"en" : "Sites include Stores"
	},
	"Small Markets" : {
		"ar" : "المحلات الصغيرة الجانبية",
		"en" : "Small Markets"
	},
	"Small WorkMarkets" : {
		"ar" : "الورش الصغيرة الجانبية",
		"en" : "Small WorkMarkets"
	},
	"Women Market Sites" : {
		"ar" : "مواقع بسطات سوق الحريم",
		"en" : "Women Market Sites"
	},
}
var utilizationDDLValues = {
	"select" : {
		"ar" : "--أختيار--",
		"en" : "--select--"
	},
	"Commercial Markets" : {
		"ar" : "الأسواق التجارية",
		"en" : "Commercial Markets"
	},
	"Complex of Ministries" : {
		"ar" : "مواقع مجمع الوزارات",
		"en" : "Complex of Ministries"
	},
	"Expropriate Real Estate" : {
		"ar" : "العقارات المستملكة",
		"en" : "Expropriate Real Estate"
	},
	"Interior Market" : {
		"ar" : "السوق الداخلي",
		"en" : "Interior Market"
	},
	"Workshops and shops of the new city of Khiran" : {
		"ar" : "ورش ومحلات مدينة الخيران",
		"en" : "Workshops and shops of the new city of Khiran"
	},
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

	loadDDLValues();
}

function loadDDLValues() {
	var html = '';
	for ( var value in utilizationDDLValues) {
		html += "<option value='" + value + "'>" + utilizationDDLValues[value][globalVars.lang] + "</option>"
	}
	document.getElementById("utilization").innerHTML = html;
	html = '';
	for ( var value in commercialActivityDDL) {
		html += "<option value='" + value + "'>" + commercialActivityDDL[value][globalVars.lang] + "</option>"
	}
	document.getElementById("commercialActivity").innerHTML = html;
}

function updateWithdrawError(param) {
	alert("The deposit must be paid to be withdrawn.");
}

function updateConfiscateError(param) {
	alert("The deposit must be paid to be confiscated.");
}

function searchRecordRequest(utilization, commercialActivity, marketNumber, page, limit) {
	try {
		utilization = utilization == "select" ? "" : utilization;
		commercialActivity = commercialActivity == "select" ? "" : commercialActivity;
		showSearchLoading();
		var returnValue = "";
		var prosData = "{sessionId:'" + globalVars.userSessionId + "', serviceProviderCode:'MOFK', callerId:'" + globalVars.currentUserID
				+ "', scriptName:'SEARCH_ANMC_RECORDS', parameters:[{Key:'utilization', Value:'" + utilization + "'}," + "{Key:'commercialActivity', Value:'"
				+ String(commercialActivity) + "'}," + "{Key:'marketNumber', Value:'" + String(marketNumber) + "'}," + "{Key:'pageLimit', Value:'" + page + "," + limit + "'},"
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

	htmlOutput += '<tr><th></th><th>Contract Number</th><th>Commercial Activity</th><th>Utilization</th><th>Surface Area</th>';
	htmlOutput += '<th>Market Number</th> <th>Market Name</th></tr>';

	for (var i = 0; i < arr.length; i++) {
		if (i % 2 == 0) {
			htmlOutput += '<tr style="background-color: aliceBlue;">';
		} else {
			htmlOutput += '<tr onclick="showRow(this);">';
		}

		var objData = new Object();
		objData.itemId = arr[i]["itemId"];
		objData.marketNumber = arr[i]["marketNumber"];
		objData.area = arr[i]["area"];
		objData.commercialActivity = arr[i]["commercialActivity"];
		objData.utilization = arr[i]["utilization"];
		objData.marketName = arr[i]["marketName"];
		objData.contractDurationYears = arr[i]["contractDurationYears"];
		objData.contractEndDate = arr[i]["contractEndDate"];
		objData.contractType = arr[i]["contractType"];
		objData.contractStartDate = arr[i]["contractStartDate"];
		objData.ContractUsage = arr[i]["Contract Usage"];
		objData.expectedContractEndDate = arr[i]["expectedContractEndDate"];
		objData.totalRentingFees = arr[i]["totalRentingFees"];
		objData.annualRentingFees = arr[i]["annualRentingFees"];

		arrayOfData[i] = objData;

		htmlOutput += '<td><input type="radio" onclick="recordClick(this);" name="firs" value="' + arr[i]["itemId"] + '"></input></td>';
		htmlOutput += '<td>' + arr[i]["itemId"] + '</td>';
		htmlOutput += '<td>' + arr[i]["commercialActivity"] + '</td>';
		htmlOutput += '<td>' + arr[i]["utilization"] + '</td>';
		htmlOutput += '<td>' + arr[i]["area"] + '</td>';
		htmlOutput += '<td>' + arr[i]["marketNumber"] + '</td>';
		htmlOutput += '<td>' + arr[i]["marketName"] + '</td>';
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
				selectedRow.marketNumber = arrayOfData[data].marketNumber;
				selectedRow.area = arrayOfData[data].area;
				selectedRow.commercialActivity = arrayOfData[data].commercialActivity;
				selectedRow.utilization = arrayOfData[data].utilization;
				selectedRow.marketName = arrayOfData[data].marketName;
				selectedRow.contractDurationYears = arrayOfData[data].contractDurationYears;
				selectedRow.contractEndDate = arrayOfData[data].contractEndDate;
				selectedRow.contractType = arrayOfData[data].contractType;
				selectedRow.contractStartDate = arrayOfData[data].contractStartDate;
				selectedRow.ContractUsage = arrayOfData[data].ContractUsage;
				selectedRow.expectedContractEndDate = arrayOfData[data].expectedContractEndDate;
				selectedRow.totalRentingFees = arrayOfData[data].totalRentingFees;
				selectedRow.annualRentingFees = arrayOfData[data].annualRentingFees;

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

function showAddLoading() {
	$('#addDepositParentDiv').append(
			'<div id="addLoading" class="transparent" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;background-color: #000000;padding: 20px 20px 0px 20px">'
					+ '<img src="' + globalVars.resourcesUrl + 'ajax-loader.gif" style="position: absolute;top: 45%;left: 45%;"></div>');
}

function showSearchLoading() {
	$('#searchParentDiv').append(
			'<div id="searchLoading" class="transparent" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;background-color: #000000;padding: 20px 20px 0px 20px">'
					+ '<img src="' + globalVars.resourcesUrl + 'ajax-loader.gif" style="position: absolute;top: 45%;left: 45%;"></div>');
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
	searchRecordRequest($("#utilization").val(), $("#commercialActivity").val(), $("#marketNumber").val(), pageNumber, globalVars.pageLimit);
}

function selectANMC() {
	var winParent;
	winParent = window.opener;
	try {
		if (globalVars.selectedConsignee.length == 0) {
			alert("Please select a ANMC");
			return;
		}
		if (globalVars.recordType == "MACR") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.area;

			winParent.focus();
			window.opener.close();
			window.close();
		} else if (globalVars.recordType == "DMCT") {

			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_contractNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_commercialActivity").value = selectedRow.commercialActivity;
			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_marketName").value = selectedRow.marketName;
			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_utilization").value = selectedRow.utilization;

			winParent.focus();
			window.opener.close();
			window.close();
		} else if (globalVars.recordType == "MIRE") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = globalVars.selectedConsignee;

			winParent.focus();
			window.opener.close();
			window.close();
		} else if (globalVars.recordType == "MMCT1") {

			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_firstContractNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_commercialActivity").value = selectedRow.commercialActivity;
			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_marketName").value = selectedRow.marketName;
			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_utilization").value = selectedRow.utilization;

			winParent.focus();
			window.opener.close();
			window.close();
		} else if (globalVars.recordType == "MMCT2") {

			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_secondContractNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_commercialActivity").value = selectedRow.commercialActivity;
			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_marketName").value = selectedRow.marketName;
			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_utilization").value = selectedRow.utilization;

			winParent.focus();
			window.opener.close();
			window.close();
		} else if (globalVars.recordType == "RMCT") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_currentContractLicenseNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_commercialActivity").value = selectedRow.commercialActivity;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_marketName").value = selectedRow.marketName;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_utilization").value = selectedRow.utilization;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_annualRentingFees").value = selectedRow.annualRentingFees;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractDurationYears").value = selectedRow.contractDurationYears;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractEndDate").value = selectedRow.contractEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractStartDate").value = selectedRow.contractStartDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractType").value = selectedRow.contractType;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_expectedContractEndDate").value = selectedRow.expectedContractEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_totalRentingFees").value = selectedRow.totalRentingFees;

			winParent.focus();
			window.opener.close();
			window.close();
		} else if (globalVars.recordType == "TMCT") {


			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_commercialActivity").value = selectedRow.commercialActivity;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_marketName").value = selectedRow.marketName;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_utilization").value = selectedRow.utilization;

			winParent.focus();
			window.opener.close();
			window.close();
		} else if (globalVars.recordType == "MCCT") {

			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentContractLicenseNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_marketName").value = selectedRow.marketName;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_annualRentingFees").value = selectedRow.annualRentingFees;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractDurationYears").value = selectedRow.contractDurationYears;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractEndDate").value = selectedRow.contractEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractStartDate").value = selectedRow.contractStartDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractType").value = selectedRow.contractType;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_expectedContractEndDate").value = selectedRow.expectedContractEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_totalRentingFees").value = selectedRow.totalRentingFees;

			winParent.focus();
			window.opener.close();
			window.close();
		} else if (globalVars.recordType == "TICT") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_currentContractLicenseNumber").value = globalVars.selectedConsignee;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_MarketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_commercialActivity").value = selectedRow.commercialActivity;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_MarketName").value = selectedRow.marketName;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_utilization").value = selectedRow.utilization;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_annualRentingFees").value = selectedRow.annualRentingFees;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractDurationYears").value = selectedRow.contractDurationYears;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractEndDate").value = selectedRow.contractEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractStartDate").value = selectedRow.contractStartDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractType").value = selectedRow.contractType;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_expectedContractEndDate").value = selectedRow.expectedContractEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_totalRentingFees").value = selectedRow.totalRentingFees;

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
	window.opener.close();
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