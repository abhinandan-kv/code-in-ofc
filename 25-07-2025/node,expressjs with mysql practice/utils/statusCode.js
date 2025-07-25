const statusCodes = {
  ServerError: {
    code: 500,
    msg: "Internal Server Error",
  },
  ClientError: {
    code: 400,
    msg: "Bad Request",
    msgMissingField:"Missing Field Or Wrong type"
  },
  RedirectionError: {
    code: 301,
    msg: "Moved Permanately",
  },
  Success200: {
    code: 200,
    msg: "OK success",
  },
  Success201: {
    code: 201,
    msg: "Created",
  },
  Success202: {
    code: 202,
    msg: "Accepted",
  },
  Success203: {
    code: 203,
    msg: "Non Authoritative Information",
  },
  Success204: {
    code: 204,
    msg: "No content",
  },
  Success205: {
    code: 205,
    msg: "Reset Content",
  },
  Information100: {
    code: 100,
    msg: "Continue",
  },
  Information101: {
    code: 101,
    msg: "Switching Protocols",
  },
  Information102: {
    code: 102,
    msg: "Early Hints",
  },
};

export default statusCodes;
