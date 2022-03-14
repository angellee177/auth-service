
exports.successResponse = (message, data) => {
    return ({
        success: true,
        message: message,
        result: data,
    })
}

exports.errorResponse = (message) => {
    return ({
        success: false,
        message: message,
    })
}