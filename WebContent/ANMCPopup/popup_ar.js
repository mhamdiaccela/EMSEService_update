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
	annualRentingFees : "",
	feesPerActivity: "",
	rentingCalculationMethod:""
};

var commercialActivityDDL = {
	"select" : {
		"ar_AE" : "--أختيار--",
		"en_US" : "--select--"
	},
	"Alwafaraa WorkMarkets and Stores" : {
		"ar_AE" : "ورش ومحلات الوفرة",
		"en_US" : "Alwafaraa WorkMarkets and Stores"
	},
	"Antennas" : {
		"ar_AE" : "هوائيات ( أنتينات )",
		"en_US" : "Antennas"
	},
	"Banks/Telecommunications Companies" : {
		"ar_AE" : "البنوك وشركات الاتصالات",
		"en_US" : "Banks/Telecommunications Companies"
	},
	"Bird Market" : {
		"ar_AE" : "محلات سوق الطيور بالري",
		"en_US" : "Bird Market"
	},
	"Commercial Sites (Inside Capital)" : {
		"ar_AE" : "(داخل العاصمة) مواقع تجارية",
		"en_US" : "Commercial Sites (Inside Capital)"
	},
	"Driving Schools" : {
		"ar_AE" : "مواقع تعليم قيادة السيارات",
		"en_US" : "Driving Schools"
	},
	"Expropriated Diwans" : {
		"ar_AE" : "الدواوين المستملكة",
		"en_US" : "Expropriated Diwans"
	},
	"Expropriated Houses" : {
		"ar_AE" : "بيوت مستملكة مستغلة من قبل جمعيات النفع العام والمؤسسات الحكومية",
		"en_US" : "Expropriated Houses"
	},
	"Expropriated Real Estate-Different Utilizations" : {
		"ar_AE" : "عقارات مستملكة ذات استغلالات مختلفة",
		"en_US" : "Expropriated Real Estate-Different Utilizations"
	},
	"Kiosks Used as Service Sites" : {
		"ar_AE" : "أكشاك مستغلة كمواقع خدمية",
		"en_US" : "Kiosks Used as Service Sites"
	},
	"Land Sites" : {
		"ar_AE" : "مواقع قطع الأراضي",
		"en_US" : "Land Sites"
	},
	"Large Markets" : {
		"ar_AE" : "المحلات الكبيرة",
		"en_US" : "Large Markets"
	},
	"Large workMarkets" : {
		"ar_AE" : "الورش الكبيرة",
		"en_US" : "Large workMarkets"
	},
	"Markets (Inside Capital)" : {
		"ar_AE" : "محلات الأسواق (داخل العاصمة)",
		"en_US" : "Markets (Inside Capital)"
	},
	"Markets inside Interior Market" : {
		"ar_AE" : "المحلات بالسوق الداخلي",
		"en_US" : "Markets inside Interior Market"
	},
	"Plots (Remote Areas)" : {
		"ar_AE" : "مواقع قطع أراضي (بمناطق نائية)",
		"en_US" : "Plots (Remote Areas)"
	},
	"Restaurants/Kiosks(Printing/Accessories)" : {
		"ar_AE" : "المطاعم وأكشاك (الطباعة/المكتبة)",
		"en_US" : "Restaurants/Kiosks(Printing/Accessories)"
	},
	"Sale of Fodders" : {
		"ar_AE" : "مواقع بيع الأعلاف",
		"en_US" : "Sale of Fodders"
	},
	"Signal Station" : {
		"ar_AE" : "محطات التقوية",
		"en_US" : "Signal Station"
	},
	"Sites include Stores" : {
		"ar_AE" : "بسطات تضم مخازن",
		"en_US" : "Sites include Stores"
	},
	"Small Markets" : {
		"ar_AE" : "المحلات الصغيرة الجانبية",
		"en_US" : "Small Markets"
	},
	"Small WorkMarkets" : {
		"ar_AE" : "الورش الصغيرة الجانبية",
		"en_US" : "Small WorkMarkets"
	},
	"Women Market Sites" : {
		"ar_AE" : "مواقع بسطات سوق الحريم",
		"en_US" : "Women Market Sites"
	},
}
var utilizationDDLValues = {
	"select" : {
		"ar_AE" : "--أختيار--",
		"en_US" : "--select--"
	},
	"Commercial Markets" : {
		"ar_AE" : "الأسواق التجارية",
		"en_US" : "Commercial Markets"
	},
	"Complex of Ministries" : {
		"ar_AE" : "مواقع مجمع الوزارات",
		"en_US" : "Complex of Ministries"
	},
	"Expropriate Real Estate" : {
		"ar_AE" : "العقارات المستملكة",
		"en_US" : "Expropriate Real Estate"
	},
	"Interior Market" : {
		"ar_AE" : "السوق الداخلي",
		"en_US" : "Interior Market"
	},
	"Workshops and shops of the new city of Khiran" : {
		"ar_AE" : "ورش ومحلات مدينة الخيران",
		"en_US" : "Workshops and shops of the new city of Khiran"
	},
}

function initPopup(){
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

	htmlOutput += '<tr><th></th><th>رقم العقد</th><th>تصنيف الاستغلال</th><th>موقع السوق</th><th>المساحة</th>';
	htmlOutput += '<th>رقم السوق</th> <th>اسم المستغل</th></tr>';

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
		objData.feesPerActivity = arr[i]["feesPerActivity"];
		objData.rentingCalculationMethod = arr[i]["rentingCalculationMethod"];

		arrayOfData[i] = objData;

		htmlOutput += '<td><input type="radio" onclick="recordClick(this);" name="firs" value="' + arr[i]["itemId"] + '"></input></td>';
		htmlOutput += '<td>' + arr[i]["itemId"] + '</td>';
		htmlOutput += '<td>' + arr[i]["commercialActivity_ar"] + '</td>';
		htmlOutput += '<td>' + arr[i]["utilization_ar"] + '</td>';
		htmlOutput += '<td>' + arr[i]["area"] + '</td>';
		htmlOutput += '<td>' + arr[i]["marketNumber"] + '</td>';
		htmlOutput += '<td>' + arr[i]["marketName"] + '</td>';
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
				selectedRow.feesPerActivity = arrayOfData[data].feesPerActivity;
				selectedRow.rentingCalculationMethod = arrayOfData[data].rentingCalculationMethod;
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
	searchRecordRequest($("#utilization").val(), $("#commercialActivity").val(), $("#marketNumber").val(), pageNumber, globalVars.pageLimit);
}

function selectANMC() {
	var winParent;
	winParent = window.opener;
	try {
		if (globalVars.selectedConsignee.length == 0) {
			alert("الرجاء أختيار عقد");
			return;
		}
		if (globalVars.recordType == "MACR") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_surfaceArea").value = selectedRow.area;

			winParent.focus();
			
			window.close();
		} else if (globalVars.recordType == "DMCT") {

			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_commercialActivity").value = convertHTMLEncodedToText(selectedRow.commercialActivity);
			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_marketName").value = convertHTMLEncodedToText(selectedRow.marketName);
			winParent.document.getElementById("app_spec_info_CURRENTMARKETDETAILS_utilization").value = selectedRow.utilization;

			winParent.focus();
			 
			window.close();
		} else if (globalVars.recordType == "MIRE") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);

			winParent.focus();
			 
			window.close();
		} else if (globalVars.recordType == "MMCT1") {

			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_firstContractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_commercialActivity").value = convertHTMLEncodedToText(selectedRow.commercialActivity);
			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_marketName").value = convertHTMLEncodedToText(selectedRow.marketName);
			winParent.document.getElementById("app_spec_info_FIRSTMARKETDETAILS_utilization").value = selectedRow.utilization;

			winParent.focus();
			 
			window.close();
		} else if (globalVars.recordType == "MMCT2") {

			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_secondContractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_commercialActivity").value = convertHTMLEncodedToText(selectedRow.commercialActivity);
			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_marketName").value = convertHTMLEncodedToText(selectedRow.marketName);
			winParent.document.getElementById("app_spec_info_SECONDMARKETDETAILS_utilization").value = selectedRow.utilization;

			winParent.focus();
			 
			window.close();
		} else if (globalVars.recordType == "RMCT") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_currentContractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_commercialActivity").value = convertHTMLEncodedToText(selectedRow.commercialActivity);
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_marketName").value = convertHTMLEncodedToText(selectedRow.marketName);
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_utilization").value = selectedRow.utilization;
			
			winParent.focus();
			 
			window.close();
		} else if (globalVars.recordType == "TMCT") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_commercialActivity").value = convertHTMLEncodedToText(selectedRow.commercialActivity);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_marketName").value = convertHTMLEncodedToText(selectedRow.marketName);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_utilization").value = selectedRow.utilization;

			winParent.focus();
			 
			window.close();
		} else if (globalVars.recordType == "MCCT") {

			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_currentContractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_marketName").value = convertHTMLEncodedToText(selectedRow.marketName);
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_annualRentingFees").value = selectedRow.annualRentingFees;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractDurationYears").value = selectedRow.contractDurationYears;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractEndDate").value = selectedRow.contractEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractStartDate").value = selectedRow.contractStartDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractType").value = convertHTMLEncodedToText(selectedRow.contractType);
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_expectedContractEndDate").value = selectedRow.expectedContractEndDate;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_totalRentingFees").value = selectedRow.totalRentingFees;
			winParent.document.getElementById("app_spec_info_UTILIZATIONDETAILS_utilization").value = sconvertHTMLEncodedToText(electedRow.utilization);
			winParent.document.getElementById("app_spec_info_UTILIZATIONDETAILS_commercialActivity").value = convertHTMLEncodedToText(selectedRow.commercialActivity);

			winParent.focus();
			 
			window.close();
		} else if (globalVars.recordType == "TICT") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_currentContractLicenseNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_MarketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_Area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_commercialActivity").value = convertHTMLEncodedToText(selectedRow.commercialActivity);
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_MarketName").value = convertHTMLEncodedToText(selectedRow.marketName);
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_utilization").value = selectedRow.utilization;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_annualRentingFees").value = selectedRow.annualRentingFees;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractDurationYears").value = selectedRow.contractDurationYears;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractEndDate").value = selectedRow.contractEndDate;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractStartDate").value = selectedRow.contractStartDate;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractType").value = convertHTMLEncodedToText(selectedRow.contractType);
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_expectedContractEndDate").value = selectedRow.expectedContractEndDate;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_totalRentingFees").value = selectedRow.totalRentingFees;
			//winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_feesPerActivity").value = selectedRow.feesPerActivity;

			winParent.focus();
			 
			window.close();
		}else if (globalVars.recordType == "VMCT") {

			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_annualRentingFees").value = selectedRow.annualRentingFees;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractDurationYears").value = selectedRow.contractDurationYears;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractEndDate").value = selectedRow.contractEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractStartDate").value = selectedRow.contractStartDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_contractType").value = convertHTMLEncodedToText(selectedRow.contractType);
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_expectedContractEndDate").value = selectedRow.expectedContractEndDate;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_totalRentingFees").value = selectedRow.totalRentingFees;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_feesPerActivity").value = selectedRow.feesPerActivity;
			winParent.document.getElementById("app_spec_info_CONTRACTDETAILS_rentingCalculationMethod").value = selectedRow.rentingCalculationMethod;
			
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_marketNumber").value = selectedRow.marketNumber;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_area").value = selectedRow.area;
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_commercialActivity").value = convertHTMLEncodedToText(selectedRow.commercialActivity);
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_marketName").value = convertHTMLEncodedToText(selectedRow.marketName);
			winParent.document.getElementById("app_spec_info_MARKETDETAILS_utilization").value = selectedRow.utilization;
			
			winParent.focus();
			 
			window.close();
		}  else if (globalVars.recordType == "MISC") {
			winParent.document.getElementById("app_spec_info_REQUESTDETAILS_contractNumber").value = convertHTMLEncodedToText(globalVars.selectedConsignee);
			
			winParent.focus();
			 
			window.close()
		}

	} catch (error) {
		alert(error.message);
	}
}

function closeWindow() {
	window.close();
	 
}

function resetRecordSearch() {
	loadDDLValues();
	$("#marketNumber").val("");
	$('#searchResultContainer').css('display', 'none');
	$('#noFirsLabel').css('display', 'none');
	globalVars.pageNumber = 1;
	globalVars.selectedConsignee = "";
	globalVars.selectedConsigneeEnglishName = "";
}
