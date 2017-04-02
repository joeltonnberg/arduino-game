const SerialPort = require('serialport');

let _size = 150, _humidity = 0, _distanceBase = 0, _lastDistance = 0, _codes = [];

/**
 *
 */
const init = (port) => port.on('data', (data) => _onData(data));

/**
 *
 */
const connectSerialPort = (serialPortName) => new SerialPort(serialPortName, {parser: SerialPort.parsers.readline('\n')});

/**
 *
 */
const serialPortName = () => "/dev/cu.usbmodem1411";

/**
 *
 * @param data
 * @private
 */
const _onData = (data) => {
    if(data) {
        _size = _getSize(data,  _size);
        _humidity = _getHumidity(data);
    }
};

/**
 *
 * @param newReading
 * @param currentSize
 * @private
 */
const _getSize = (newReading, currentSize) => {

    let distance = newReading.split(":")[0];

    // Do nothing if too close or too far
    if(distance < 2 || distance > 2000) {
        return currentSize;
    }

    if(_resetDistanceBase(_distanceBase, _lastDistance, distance)) {
        _distanceBase = distance;
    }

    _lastDistance = distance;

    return _newValueForSize(_distanceBase, distance);
};

/**
 *
 * @param base
 * @param lastDistance
 * @param distance
 * @private
 */
const _resetDistanceBase = (base, lastDistance, distance) => base === 0 || Math.abs(lastDistance - distance) > 15;

/**
 *
 * @param base
 * @param distance
 * @private
 */
const _newValueForSize = (base, distance) => {
    let newValue = 150 + ((distance -base)*10);

    if(newValue < 20) newValue = 20;
    if(newValue > 300) newValue = 250;

    return newValue;
};


/**
 *
 * @param data
 * @private
 */
const _getHumidity = (data) => parseInt(data.split(":")[1].split('\r')[0]);


/**
 *
 */
const size = () => _size;

/**
 *
 */
const humidity = () => _humidity;

/**
 *
 * @param codes
 */
const keyCodes = (codes) => codes ? _codes = codes : _codes;


module.exports = {init,connectSerialPort, serialPortName, size, humidity, _getHumidity, _getSize, _newValueForSize, _resetDistanceBase, keyCodes};