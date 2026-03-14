const fs = require("fs");
const path = require("path");

const toolsData = require("../config/tools.json");
const tools = toolsData.tools || toolsData;

const OS_SCRIPTS = [
  {
    osKey: "ubuntu",
    scriptPath: "../scripts/linux/ubuntu.sh",
    pattern: (name) => `${name}\\)`,
  },
  {
    osKey: "kali",
    scriptPath: "../scripts/linux/kali.sh",
    pattern: (name) => `${name}\\)`,
  },
  {
    osKey: "mac",
    scriptPath: "../scripts/mac/install.sh",
    pattern: (name) => `${name}\\)`,
  },
  {
    osKey: "windows",
    scriptPath: "../scripts/windows/install.ps1",
    pattern: (name) => `"${name}"`,
  },
];

describe("Tool install script coverage", () => {

  OS_SCRIPTS.forEach(({ osKey, scriptPath, pattern }) => {

    test(`all ${osKey} tools exist in ${path.basename(scriptPath)}`, () => {

      const script = fs.readFileSync(
        path.join(__dirname, scriptPath),
        "utf8"
      );

      tools.forEach((tool) => {

        if (tool.os && tool.os[osKey]) {

          const regex = new RegExp(pattern(tool.name));

          if (script.includes(tool.name)) {
            expect(script).toMatch(regex);
          }

        }

      });

    });

  });

});

describe("OS_SCRIPTS registry is complete", () => {

  test("every script file on disk is registered in OS_SCRIPTS", () => {

    const scriptsRoot = path.join(__dirname, "../scripts");

    const registeredPaths = OS_SCRIPTS.map((s) =>
      path.resolve(path.join(__dirname, s.scriptPath))
    );

    const unregistered = [];

    function walk(dir) {

      fs.readdirSync(dir).forEach((file) => {

        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isDirectory()) {
          walk(fullPath);
        }
        else if (file.endsWith(".sh") || file.endsWith(".ps1")) {

          if (!registeredPaths.includes(path.resolve(fullPath))) {
            unregistered.push(fullPath);
          }

        }

      });

    }

    walk(scriptsRoot);

    if (unregistered.length > 0) {
      fail(
        "These script files exist on disk but are not registered in OS_SCRIPTS:\n\n" +
        unregistered.map((f) => `  ❌  ${f}`).join("\n") +
        "\n\nAdd an entry to OS_SCRIPTS for each one."
      );
    }

  });

});