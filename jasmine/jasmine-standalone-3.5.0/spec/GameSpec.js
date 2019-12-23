
describe("Initializations", function () {
  it("are defined and correct", function () {
    expect(possibleRuns).toBeDefined();
    expect(possibleRuns).toEqual([0, 1, 2, 4, 6, 8]);
    expect(teamOneScore).toBeDefined();
    expect(teamOneScore).toEqual([]);
    expect(teamTwoScore).toBeDefined();
    expect(teamTwoScore).toEqual([]);
    expect(teamOneName).toBeDefined();
    expect(teamTwoName).toBeDefined();
    expect(matchOver).toBeDefined();
    expect(matchOver).toEqual(false);
  });
});

describe("select turn()", function () {
  it("are defined and correct", function () {
    expect(turn).toBeDefined();
    expect(typeof turn).toEqual('number');
    expect(turn).not.toBeGreaterThan(2);
    expect(turn).not.toBeLessThan(1);
  });
});