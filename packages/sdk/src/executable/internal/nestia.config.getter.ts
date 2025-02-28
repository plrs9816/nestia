import { WorkerServer } from "tgrid/protocols/workers/WorkerServer";

import { NestiaSdkConfig } from "./NestiaSdkConfig";

async function main(): Promise<void> {
    const worker = new WorkerServer();
    await worker.open(NestiaSdkConfig);
}
main().catch((exp) => {
    console.log(exp);
    process.exit(-1);
});
