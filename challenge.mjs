import { send, doWork } from "./lib.mjs";

const NAME = process.env.NAME;

export async function onMessage(message) {
  console.log(`${NAME} RECIEVED:`, message);
}

export async function onStart() {
  console.log(`START: ${NAME}`);
}

export async function onRequest(word) {
  console.log(`WORK @ ${NAME}: ${await doWork(word)}`);
}
