const { pick, isEmpty, isInteger } = require('lodash')
    , logger = require('loglevel')
    // , stringSanitizer = require('string-sanitizer');

/**
 * Keep space on String
 * @param {String} str 
 * 
 */
const stringSanitizeKeepSpace = function(str) {
    var str2 = str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
    return str2.replace(/ /g, " ");
};

/**
 * Throw an error with set the httpStatuCode value
 *
 * @param {string} message
 * @param {number} httpStatusCode
 */
const throwErrorsHttp = (message = 'Error', httpStatusCode = 400) => {
    const error = new Error(message);
    error.httpStatusCode = httpStatusCode;
    throw error;
};

/**
 * Set default value if value is empty.
 * @param {string} value 
 * @param {string} defaultValue 
 */
const defaultToIfEmpty = (value, defaultValue) => {
    if( isEmpty(value) ) {
        return isInteger(value) ? value : defaultValue;
    };

    return value;
};

/**
 * Set Central Log
 * @param {Object} options 
 * @param {String} options.level
 * @param {String} options.method
 * @param {String} options.message
 * @param {Error=} options.error 
 * @param {String=} options.others
 */
const setLog = (options) => {
    const payload = pick(options, ['level', 'method', 'message', 'error', 'others']);

    let output = stringSanitizeKeepSpace(`${payload.level}`);
    output += ':';
    output += stringSanitizeKeepSpace(`${payload.method}`);
    output += '-> ';
    output += stringSanitizeKeepSpace(`${payload.message}`);

    if(payload.others) output += ` (${stringSanitizeKeepSpace(`${payload.others}`)})`;

    logger.info(output);
    console.log(output);

    if(payload.error) logger.warn(payload.error);
}


module.exports = { 
    defaultToIfEmpty,
    throwErrorsHttp,
    stringSanitizeKeepSpace,
    setLog, 
};
