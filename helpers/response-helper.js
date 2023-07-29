// Response format for success
const successResponse = (message = "", data = null,statusCode = 201) => {
    let response = {
        status: "success",
        statusCode,
        message,
    }
    if (data) response.data = data

    return response;
};

// Response format for error
const errorResponse = (message = "", statusCode = 400) => {
    return {
        status: "error",
        statusCode,
        message
    };
};

module.exports = { successResponse, errorResponse }