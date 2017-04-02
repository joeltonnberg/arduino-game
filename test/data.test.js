let chai = require('chai');
let expect = chai.expect; // we are using the "expect" style of Chai
let data = require('./../src/data.js');

describe("", () => {

    describe("size", () => {
        it("should return an int", () => {
            expect(data.size()).to.be.a("number");
        });

        it("should return 150 as default", () => {
            expect(data.size()).to.equal(150);
        });

    });

    describe("humidity", () => {
        it("should return an int", () => {
            expect(data.humidity()).to.be.a("number");
        });

        it("should return 0 as default", () => {
            expect(data.humidity()).to.equal(0);
        });
    });

    describe("_getHumidity", () => {

        let serialData = "100:200";

        let serialDataNewLine = "100:400\r";

        it("should return an int", () => {
            expect(data._getHumidity(serialData)).to.be.a("number");
        });

        it("should return 200", () => {
            expect(data._getHumidity(serialData)).to.equal(200);
        });

        it("should return 400", () => {
            expect(data._getHumidity(serialDataNewLine)).to.equal(400);
        });
    });

    describe("_newValueForSize", () => {

        it("should return an int", () => {
            expect(data._newValueForSize(0,0)).to.be.a("number");
        });

        it("should return 150", () => {
            expect(data._newValueForSize(0,0)).to.equal(150);
        });

        it("should return 100", () => {
            expect(data._newValueForSize(10,5)).to.equal(100);
        });

        it("should return 20", () => {
            expect(data._newValueForSize(20, 0)).to.equal(20);
        });

        it("should return 250", () => {
            expect(data._newValueForSize(0, 400)).to.equal(250);
        });

    });

    describe("_resetDistanceBase", () => {

        //  (base, lastDistance, distance) => base === 0 || Math.abs(lastDistance - distance) > 15;

        it("should return a boolean", () => {
            expect(data._resetDistanceBase(0, 500, 500)).to.be.a("boolean");
        });

        it("should be true of current distance base is 0", () => {
            expect(data._resetDistanceBase(0, 300, 300)).to.be.true
        });

        it("should be true of current distance base is 0", () => {
            expect(data._resetDistanceBase(0, 300, 300)).to.be.true
        });

    });
});