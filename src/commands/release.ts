import type { HandlerArgs } from "devkeeper"; // eslint-disable-line import/no-extraneous-dependencies

const describe = "Pulls source from git repository, adds all modified files, commits and push them to repository.";

async function handler({ intermodular, exitOnProcessFailure = true }: HandlerArgs): Promise<any> {
  // git pull && git add -A && git-cz && git push --follow-tags
  await intermodular.targetModule.command("git pull", { exitOnProcessFailure });
  await intermodular.targetModule.command("git add -A", { exitOnProcessFailure });
  await intermodular.targetModule.command("git-cz", { exitOnProcessFailure });
  await intermodular.targetModule.command("git push --follow-tags", { exitOnProcessFailure });
}

export { describe, handler };
