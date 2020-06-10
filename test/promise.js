let chai = require("chai");
let promised = require("chai-as-promised");
chai.use(promised);
let expect = chai.expect;

async function sampleAsync(a) {
  if (a == 0) throw new Error("test");
  return 1;
}

describe("sampleAsync", () => {
  describe("Good path", () => {
    it("Good with Chai as Promised", (done) => {
      expect(sampleAsync(1)).to.eventually.equal(1).notify(done);
    });
    it("Good without Chai-as-promised", (done) => {
      sampleAsync(1).then( (res) => {
        expect(res).to.equal(1);
        done();
      });
    });
  });
  describe("Bad path", () => { 
    it("Rejection without Chai-as-promised", (done) => {
      sampleAsync(0).catch((err) => {
        expect(err).to.be.an('error');
        expect(err.message).to.be.eql("test");
        done();
      });
    });
    it("Rejection with Chai-as-promised", (done) => {
      expect(sampleAsync(0)).to.be.rejected.notify(done);
    });
  });
});

