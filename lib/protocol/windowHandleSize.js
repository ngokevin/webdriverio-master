/**
 *
 * Protocol binding to get or change the size of the browser.
 *
 * <example>
    :windowHandleSize.js
    // get the size of
    // a specified window
    client.windowHandleSize('dc30381e-e2f3-9444-8bf3-12cc44e8372a', function(err,res) { .. });

    // the current window
    client.windowHandleSize(function(err,res) { ... });

    // change the position of
    // a specified window
    client.windowHandleSize('dc30381e-e2f3-9444-8bf3-12cc44e8372a', {width: 800, height: 600});

    // the current window
    client.windowHandleSize({width: 800, height: 600});
 * </example>
 *
 * @param {String=} windowHandle the window to receive/change the size
 * @param {Object=} dimension    the new size of the window
 *
 * @returns {Object} the size of the window (`{width: number, height: number}`)
 * @callbackParameter error, response
 *
 * @see  https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window/:windowHandle/size
 * @type protocol
 *
 */

var ErrorHandler = require('../utils/ErrorHandler.js');

module.exports = function windowHandleSize (windowHandle, size) {

    var data = {};

    /*!
     * make sure that callback contains chainit callback
     */
    var callback = arguments[arguments.length - 1];

    /*!
     * protocol options
     */
    var requestOptions = {
        path: '/session/:sessionId/window/:handle/size'.replace(/:handle/, typeof windowHandle === 'string' ? windowHandle : 'current'),
        method: 'GET'
    };

    /*!
     * get window size
     */
    if(typeof windowHandle === 'function' || (typeof windowHandle === 'string' && typeof size === 'function')) {
        return this.requestHandler.create(requestOptions, data, callback);
    }

    /*!
     * otherwise change window size
     */
    if(typeof windowHandle === 'object' && windowHandle.width && windowHandle.height) {
        requestOptions.method = 'POST';
        data = {
            width: windowHandle.width,
            height: windowHandle.height
        };
    } else if(typeof size === 'object' && size.width && size.height) {
        requestOptions.method = 'POST';
        data = {
            width: size.width,
            height: size.height
        };
    }

    /*!
     * type check
     */
    if(typeof data.width !== 'number' && typeof data.height !== 'number') {
        return callback(new ErrorHandler.ProtocolError('number or type of arguments don\'t agree with windowHandleSize protocol command'));
    }

    return this.requestHandler.create(requestOptions, data, callback);

};
