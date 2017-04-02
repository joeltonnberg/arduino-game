const GAME_WIDTH = 1000;
const GAME_HEIGHT = 700;
const MAX_VELOCITY = 1.5;
const MAX_ACCELERATION = 1.5;

/**
 *
 * @param vectorData
 * @param codes
 * @param humidity
 */
const adjust = (vectorData, codes, humidity) => {

    let adjustments = getVectorFromData(vectorData.acceleration, vectorData.velocity, codes, humidity);

    vectorData.acceleration.x = adjustments.x;
    vectorData.acceleration.y = adjustments.y;

    vectorData.velocity.x += vectorData.acceleration.x;
    vectorData.velocity.y += vectorData.acceleration.y;

    vectorData.velocity.x = _checkLimit(vectorData.velocity.x, MAX_VELOCITY);
    vectorData.velocity.y = _checkLimit(vectorData.velocity.y, MAX_VELOCITY);

    let newX = parseInt(Math.round(vectorData.position.x += vectorData.velocity.x));
    let newY = parseInt(Math.round(vectorData.position.y += vectorData.velocity.y));

    if(!outOfGameBoundsX(newX, GAME_WIDTH, 0)) {
        vectorData.position.x = newX;
    } else {
        vectorData.position.x = newX < 0 ? 0 : GAME_WIDTH
    }

    if(!outOfGameBoundsY(newY, GAME_HEIGHT, 0)) {
        vectorData.position.y = newY;
    } else {
        vectorData.position.y = newY < 0 ? 0 : GAME_HEIGHT;
    }

    return vectorData;
};

const getVectorFromData = (accelerationVector, velocityVector, codes, humidity) => {

    let movement = 0.05;

    codes.forEach((code) => {

        // Left
        if(code === 37 || code === 65) {
            accelerationVector.x -= movement
        }
        // Right
        if(code === 39 || code === 68) {
            accelerationVector.x += movement
        }
        /*
        if(code === 38 || code === 87) {
            accelerationVector.y -= movement;
        }

        if(code === 40 || code === 83) {
            accelerationVector.y += movement;
        }
        */
    });

    humidity = humidity > 100 ? 100 : humidity;
    accelerationVector.y -= ((20 - humidity)/ 100);

    accelerationVector.x = _checkLimit(accelerationVector.x, MAX_ACCELERATION);
    accelerationVector.y = _checkLimit(accelerationVector.y, MAX_ACCELERATION);

    return accelerationVector;
};

const _checkLimit = (value, limit) => {
    if(value > limit) {
        value = limit;
    }

    if(value < -limit) {
        value = -limit;
    }

    return value;
};

const outOfGameBoundsX = (x, gameWidth, tolerance) => ( (x < tolerance) || (x > gameWidth - tolerance));

const outOfGameBoundsY = (y, gameHeight, tolerance) => ( (y < tolerance) || (y > GAME_HEIGHT - tolerance));

module.exports = {adjust};