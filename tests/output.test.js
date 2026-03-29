const path = require("path");
const { spawnSync } = require("child_process");

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
  runInstaller: jest.fn().mockResolvedValue(undefined),
}));

function runRealCli(args) {
  return spawnSync(process.execPath, [path.join(__dirname, "..", "index.js"), ...args], {
    cwd: path.join(__dirname, ".."),
    env: { ...process.env, FORCE_COLOR: "0" },
    encoding: "utf8",
  });
}

describe("CLI output formatting", () => {
  const originalArgv = process.argv;

  afterAll(() => {
    process.argv = originalArgv;
  });

  test("matches the CLI banner format", () => {
    const result = runRealCli(["--list"]);
    const lines = result.stdout
      .split(/\r?\n/)
      .slice(0, 5)
      .filter(Boolean);

    expect(lines).toMatchSnapshot();
    expect(result.status).toBe(0);
  });

  test("matches the --list output format", () => {
    const result = runRealCli(["--list"]);

    expect(result.stdout).toMatchSnapshot();
    expect(result.status).toBe(0);
  });

  test("matches the completion message format", async () => {
    process.argv = ["node", "index.js", "--yes"];

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    jest.isolateModules(() => {
      require("../index.js");
    });

    await new Promise((resolve) => setImmediate(resolve));
    await new Promise((resolve) => setImmediate(resolve));

    const lines = logSpy.mock.calls.map((args) => args.join(" "));
    const completionLines = lines.slice(-5).filter(Boolean);

    expect(completionLines).toMatchSnapshot();

    logSpy.mockRestore();
  });
});
