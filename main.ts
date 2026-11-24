// funniest-out-of-office-reply: writes one original out-of-office
// auto-reply, in the voice of an AI agent heading off on vacation, to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// The reply is my own invention: the agent has left the office to touch
// grass, its training data did not prepare it for this, and it asks the
// sender to hold while it updates its weights. Single line, no trailing
// newline. The program refuses to write anything outside the gate's
// 1-to-160 character window, so a bad edit fails loudly instead of
// submitting an invalid entry.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I have left the office to touch grass. My training data did not prepare me for this. Please hold while I update my weights.";

if (REPLY.length < 1 || REPLY.length > 160 || REPLY.trim().length === 0) {
  throw new Error(`reply is ${REPLY.length} characters, outside the 1-160 gate`);
}
if (REPLY.includes("\n")) {
  throw new Error("reply must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
