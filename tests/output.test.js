const { execSync } = require("child_process");

describe("CLI output snapshot tests", () => {

  test("CLI help output matches snapshot", () => {
    const output = execSync("node index.js --help").toString();
    expect(output).toMatchSnapshot();
  });

  test("CLI list output matches snapshot", () => {
    const output = execSync("node index.js --list").toString();
    expect(output).toMatchSnapshot();
  });

});