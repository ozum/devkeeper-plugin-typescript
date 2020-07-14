import type { HandlerArgs } from "devkeeper"; // eslint-disable-line import/no-extraneous-dependencies

const describe = "Builds source code.";

async function handler({ intermodular, devkeeper, exitOnProcessFailure = true, ...extraArgs }: HandlerArgs): Promise<any> {
  return intermodular.targetModule.execute("tsc", devkeeper.cleanArgs(extraArgs, { args: ["--incremental"] }), { exitOnProcessFailure });
}

export { describe, handler };
