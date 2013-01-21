var common = exports

var failCodes = common.failCodes = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Resize not allowed",
  404: "Item not found",
  409: "Build in progress",
  413: "Over Limit",
  415: "Bad Media Type",
  500: "Fault",
  503: "Service Unavailable"
};

var successCodes = common.successCodes = {
  200: "OK",
  202: "Accepted",
  203: "Non-authoritative information",
  204: "No content",
};