import { PluginTestHelper } from "devkeeper"; // eslint-disable-line import/no-extraneous-dependencies

let helper: PluginTestHelper;

beforeAll(async () => {
  helper = await PluginTestHelper.create("target-module");
});

describe("prettier", () => {
  it("should build project.", async () => {
    await helper.runCommand("build");
    const fileExists = await helper.targetModule.exists("dist/address.d.ts");
    expect(fileExists).toBe(true);
  }, 10000);
});
