/**
 *
 * @param x
 * @param y
 * @constructor
 */
const Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

/*
Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
};


Vector.prototype.getMagnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};


Vector.prototype.getAngle = function () {
    return Math.atan2(this.y,this.x);
};

Vector.fromAngle = function (angle, magnitude) {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};

Vector.getMagnitude = function(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

Vector.getAngle = function(vector) {
    return Math.atan2(vector.y,vector.x);
};
*/

module.exports = Vector;