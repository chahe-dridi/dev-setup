const fs = require("fs");
const path = require("path");


const toolsData = require("../config/tools.json");
const tools = toolsData.tools || toolsData;
const ubuntuScript =fs.readFileSync(
  path.join(__dirname, "../scripts/linux/ubuntu.sh"),
  "utf8"
);

const macScript =fs.readFileSync(
  path.join(__dirname, "../scripts/mac/install.sh"),
  "utf8"
);

const windowsScript =fs.readFileSync(
  path.join(__dirname, "../scripts/windows/install.ps1"),
  "utf8"
);

describe("Tool install script coverage", () => {

  test("Ubuntu tools exist in ubuntu.sh", () => {
    tools.forEach(tool =>{
      if (tool.ubuntu) {
        const regex = new RegExp(`${tool.name}\\)`);
        expect(ubuntuScript).toMatch(regex);
      }
    });
  });

 test("Mac tools exist in install.sh", () => {
    tools.forEach(tool => {
      if (tool.mac) {
        const regex = new RegExp(`${tool.name}\\)`);
        expect(macScript).toMatch(regex);
      }
    });
  });

  test("Windows tools exist in install.ps1", () => {
    tools.forEach(tool => {
      if (tool.windows) {
        const regex = new RegExp(`"${tool.name}"`);
        expect(windowsScript).toMatch(regex);
      }
    });
  });

});      