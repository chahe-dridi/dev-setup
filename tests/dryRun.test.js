const toolsConfig = require("../config/tools.json");

const passthrough = (value) => value;

jest.mock("chalk", () => {
  const bold = Object.assign(passthrough, {
    cyan: passthrough,
    green: passthrough,
  });

  return {
    bold,
    gray: passthrough,
    green: passthrough,
    blue: passthrough,
    red: passthrough,
    yellow: passthrough,
    cyan: passthrough,
    underline: passthrough,
  };
});

jest.mock("../src/detectOS", () =>
  jest.fn(() => ({
    id: "windows",
    label: "Windows",
    scriptPath: "scripts/windows/install.ps1",
    packageManager: "winget",
  }))
);

jest.mock("../src/installer", () => ({
  runInstaller: jest.fn(),
}));

jest.mock("../src/logger", () => ({
  success: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  step: jest.fn(),
}));

describe("CLI --dry-run", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.argv = ["node", "index.js", "--dry-run", "--yes"];
  });

  afterAll(() => {
    process.argv = originalArgv;
  });

  test("skips installation, prints dry-run output for each tool, and exits cleanly", async () => {
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    jest.isolateModules(() => {
      require("../index.js");
    });

    await new Promise((resolve) => setImmediate(resolve));
    await new Promise((resolve) => setImmediate(resolve));

    const { runInstaller } = require("../src/installer");
    const dryRunLines = logSpy.mock.calls
      .map((args) => args.join(" "))
      .filter((line) => line.includes("[dry-run]"));

    const expectedTools = toolsConfig.tools.filter(
      (tool) => tool.os && tool.os.windows !== false
    );

    expect(runInstaller).not.toHaveBeenCalled();
    expect(exitSpy).not.toHaveBeenCalled();
    expect(dryRunLines).toHaveLength(expectedTools.length);
    dryRunLines.forEach((line) => {
      expect(line).toContain("[dry-run]");
    });

    logSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
