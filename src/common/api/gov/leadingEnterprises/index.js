import request from "@api/request";
//企业排名
export function entRankEntType(params) {
  return request({
    url: "/decisionAnalysis/entRankEntType",
    method: "get",
    params
  });
}
export function entRankEntLeader(params) {
  return request({
    url: "/decisionAnalysis/entRankEntLeader",
    method: "get",
    params
  });
}
export function entRankMuIndicator(params) {
  return request({
    url: "/decisionAnalysis/entRankMuIndicator",
    method: "get",
    params
  });
}
export function entRankIndicator(params) {
  return request({
    url: "/decisionAnalysis/entRankIndicator",
    method: "get",
    params
  });
}
export function entRankCount(params) {
  return request({
    url: "/decisionAnalysis/entRankCount",
    method: "get",
    params
  });
}
