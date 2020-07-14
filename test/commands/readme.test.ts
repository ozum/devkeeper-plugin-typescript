import { PluginTestHelper } from "devkeeper"; // eslint-disable-line import/no-extraneous-dependencies

let helper: PluginTestHelper;

beforeAll(async () => {
  helper = await PluginTestHelper.create("target-module");
});

describe("readme", () => {
  it("should create readme.", async () => {
    await helper.runCommand("readme");
    const readmeExists = await helper.targetModule.exists("README.md");
    expect(readmeExists).toBe(true);
  }, 15000);
});
