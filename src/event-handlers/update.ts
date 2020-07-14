import union from "lodash.union";
import type { HandlerArgs } from "devkeeper"; // eslint-disable-line import/no-extraneous-dependencies

const spdxLicenseList = require("spdx-license-list/full"); // eslint-disable-line @typescript-eslint/no-var-requires

const packageJsonFiles = ["/bin", "/lib/**/!(*.spec|*.test)*.*", "/dist/**/!(*.spec|*.test)*.*", "/@types", "/module-files"];

export default async function handler({ intermodular }: HandlerArgs): Promise<void> {
  const { targetModule } = intermodular;

  const license = targetModule.package.get("license");
  targetModule.package.set("files", union(targetModule.package.get("files") || [], packageJsonFiles)); // Add `packageJsonFiles` to existing files.

  const options = { if: (value?: string) => !value?.startsWith("devkeeper") };
  targetModule.package.set("scripts.build", "devkeeper build", options);
  targetModule.package.set("scripts.test", "devkeeper test", options);
  targetModule.package.set("scripts.lint", "devkeeper lint", options);
  targetModule.package.set("scripts.format", "devkeeper format", options);
  targetModule.package.set("scripts.release", "devkeeper release", options);
  targetModule.package.set("scripts.readme", "devkeeper readme", options);

  await Promise.all([
    intermodular.copy("module-files/.gitignore-for-target", ".gitignore", { overwrite: true }),
    targetModule.write("LICENSE", spdxLicenseList[license]?.licenseText, { overwrite: true, if: (content: any) => content !== undefined }),
  ]);
}
