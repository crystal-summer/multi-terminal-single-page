import request from "@api/request";
export function describeEntHistoryDataByPage(params) {
  return request({
    url: "/dataImport/describeEntHistoryDataByPage",
    method: "get",
    params
  });
}
export function uploadFile(data) {
  return request({
    url: "/file/upload",
    method: "post",
    data
  });
}
export function uploadYearDataHistory(data) {
  return request({
    url: "/dataImport/uploadYearDataHistory",
    method: "post",
    data
  });
}
export function addDataYear(data) {
  return request({
    url: "/dataImport/addDataYear",
    method: "post",
    data
  });
}
export function getEntDataByPage(params) {
  return request({
    url: "/entData/getEntDataByPage",
    method: "get",
    params
  });
}
export function getExcelTitle(params) {
  return request({
    url: "/dataImport/getExcelTitle",
    method: "get",
    params
  });
}
export function getNameList(params) {
  return request({
    url: "/dataImport/getNameList",
    method: "get",
    params
  });
}
export function parseExcel(data) {
  return request({
    url: "/dataImport/parseExcel",
    method: "post",
    data
  });
}
export function getImportDataFail(params) {
  return request({
    url: "/dataImport/getImportDataFail",
    method: "get",
    params
  });
}
export function downloadYearDataFile(params) {
  return request.downLoad("/dataImport/downloadYearDataFile", params);
}
export function downloadModelByType(params) {
  return request.downLoad("/dataImport/downloadModelByType", params);
}
export function deleteImportHistory(data) {
  return request({
    url: "/dataImport/deleteUploadHistory",
    method: "post",
    data
  });
}
export function openOrCloseRight(data) {
  return request({
    url: "/dataImport/openOrCloseRight",
    method: "post",
    data
  });
}
export function entAccurateAdd(data) {
  return request({
    url: "/dataImport/entAccurateAdd",
    method: "post",
    data
  });
}
export function deleteEntData(data) {
  return request({
    url: "/entData/deleteEntData",
    method: "post",
    data
  });
}
export function modifyEntData(data) {
  return request({
    url: "/dataImport/modifyEntData",
    method: "post",
    data
  });
}
export function copyTo(params) {
  return request({
    url: "/dataImport/copyTo",
    method: "get",
    params
  });
}
export function getProcess(params) {
  return request({
    url: "/file/getProcess",
    method: "get",
    params
  });
}
export function getDepDataPreview(params) {
  return request({
    url: "/dataImport/getDepDataPreview",
    method: "get",
    params
  });
}
export function updateRegisterLand(data) {
  return request({
    url: "/landData/updateRegisterLand",
    method: "post",
    data
  });
}
export function updateTaxData(data) {
  return request({
    url: "/taxData/updateOrCreateTaxData",
    method: "post",
    data
  });
}
export function updateTheLetterData(data) {
  return request({
    url: "/dataStatistics/updateTheLetterData",
    method: "post",
    data
  });
}
export function updatePolutionData(data) {
  return request({
    url: "/environmentData/updatePolutionData",
    method: "post",
    data
  });
}
export function updateElectricUsed(data) {
  return request({
    url: "/electric/updateElectricUsed",
    method: "post",
    data
  });
}
export function updateTechnologyData(data) {
  return request({
    url: "/dataStatistics/updateTechnologyData",
    method: "post",
    data
  });
}
export function insertRegisterLand(data) {
  return request({
    url: "/landData/insertRegisterLand",
    method: "post",
    data
  });
}
export function insertElectricUsed(data) {
  return request({
    url: "/electric/insertElectricUsed",
    method: "post",
    data
  });
}
export function deleteRegisterLand(data) {
  return request({
    url: "/landData/deleteRegisterLand",
    method: "post",
    data
  });
}
export function deleteTaxData(data) {
  return request({
    url: "/taxData/deleteTaxData",
    method: "post",
    data
  });
}
export function deleteTheLetterData(data) {
  return request({
    url: "/dataStatistics/deleteTheLetterData",
    method: "post",
    data
  });
}
export function deleteEnvironment(data) {
  return request({
    url: "/environmentData/deleteEnvironment",
    method: "post",
    data
  });
}
export function deleteElectricUsed(data) {
  return request({
    url: "/electric/deleteElectricUsed",
    method: "post",
    data
  });
}
export function deleteTechnologyData(data) {
  return request({
    url: "/dataStatistics/deleteTechnologyData",
    method: "post",
    data
  });
}
export function depDataExport(params) {
  return request.downLoad("/dataImport/depDataExport", params);
}
export function getAllYearData(params) {
  return request({
    url: "/common/getAllYearData",
    method: "get",
    params
  });
}
export function getTownEntDataCount(params) {
  return request({
    url: "/dataImport/getTownEntDataCount",
    method: "get",
    params
  });
}
export function getExcelTitleByUrl(params) {
  return request({
    url: "/dataImport/getExcelTitleByUrl",
    method: "get",
    params
  });
}
export function parseTownEntDataExcel(data) {
  return request({
    url: "/dataImport/parseTownEntDataExcel",
    method: "post",
    data
  });
}
export function wipeTownEntData(data) {
  return request({
    url: "/dataImport/wipeTownEntData",
    method: "post",
    data
  });
}
export function getImportHistory(params) {
  return request({
    url: "/dataImport/getImportHistory",
    method: "get",
    params
  });
}
export function clearFileData(data) {
  return request({
    url: "/dataImport/clearFileData",
    method: "post",
    data
  });
}
export function getRentDataByPage(params) {
  return request({
    url: "/landData/getRentDataByPage",
    method: "get",
    params
  });
}
export function deleteRentInLand(data) {
  return request({
    url: "/landData/deleteRentInLand",
    method: "post",
    data
  });
}
export function deleteRentOutLand(data) {
  return request({
    url: "/dataImport/deleteRentOutLand",
    method: "post",
    data
  });
}
export function exportTownRentData(params) {
  return request.downLoad("/dataImport/exportTownRentData", params);
}
export function getEntDataLikeName(params) {
  return request({
    url: "/common/getEntDataLikeName",
    method: "get",
    params
  });
}
export function insertRentOutLand(data) {
  return request({
    url: "/landData/insertRentOutLand",
    method: "post",
    data
  });
}
export function updateRentInLand(data) {
  return request({
    url: "/landData/updateRentInLand",
    method: "post",
    data
  });
}
export function getTownListByUser(params) {
  return request({
    url: "/dataImport/getTownListByUser",
    method: "get",
    params
  });
}
export function getMapProcess(params) {
  return request({
    url: "/file/getMapProcess",
    method: "get",
    params
  });
}
export function getTownRentOutEntDataCount(params) {
  return request({
    url: "/dataImport/getTownRentOutEntDataCount",
    method: "get",
    params
  });
}
export function depWipeData(data) {
  return request({
    url: "/dataImport/depWipeData",
    method: "post",
    data
  });
}
export function parseDepDataExcel(data) {
  return request({
    url: "/dataImport/parseDepDataExcel",
    method: "post",
    data
  });
}
export function deleteDataStatisticsData(data) {
  return request({
    url: "/dataStatistics/deleteDataStatisticsData",
    method: "post",
    data
  });
}
export function updateDataStatisticsData(data) {
  return request({
    url: "/dataStatistics/updateOrCreateDataStatisticsData",
    method: "post",
    data
  });
}