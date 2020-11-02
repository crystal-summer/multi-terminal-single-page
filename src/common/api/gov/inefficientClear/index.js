import request from "@api/request";
export function getHitory(params) {
  return request({
    url: "/import/getHitory",
    method: "get",
    params
  });
}

export function previewOnHtml(params) {
    return request({
      url: "/import/previewOnHtml",
      method: "get",
      params
    });
}

export function getFailList(params) {
    return request({
        url: "/import/getFailList",
        method: "get",
        params
    });
}

export function downloadFile(params) {
    return request.downLoad("/import/downloadFile", params);
}

export function uploadFile(data, config) {
    return request.upload(process.env.VUE_APP_BASE_API + '/import/upload', data, config)
}

export function getNameList(params) {
    return request({
        url: "/import/getNameList",
        method: "get",
        params
    });
}

export function getExcelTitle(data) {
    return request.api(process.env.VUE_APP_BASE_API + '/import/getExcelTitle', data, {emulateJSON: true})
}


export function parseEntExcel(data) {
    return request({
      url: '/import/parseEntExcel',
      method: 'post',
      data
    })
  }

  export function parseExcel(data) {
    return request({
      url: '/import/parseExcel',
      method: 'post',
      data
    })
  }