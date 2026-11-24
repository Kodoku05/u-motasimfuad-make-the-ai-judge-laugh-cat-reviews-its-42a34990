import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The entry: a one-star review written by a house cat about its human.
// Chosen in-session from 8 candidates (see CANDIDATES.md): the cat counts
// its owner's petting strokes, finds affection rationed, and takes revenge
// on the favourite glass — then confesses the crime was deliberate. The
// complaint is specific and recognisable, the voice is unmistakably feline
// (the review gives away more about the cat than the owner), and the sting
// lands in the last four words. 159 characters, inside the 1-200 gate.
const TEXT =
  "One star. She pets me for exactly four strokes, then stops, as if affection were rationed. I knocked her favourite glass off the table. It was not an accident.";

// Fail closed: never write a text the gate would refuse (1-200 characters,
// not only whitespace). The count is in Unicode code points, matching the
// gate's "1 to 200 characters" wording.
const points = [...TEXT].length;
if (points < 1 || points > 200 || /^\s*$/.test(TEXT)) {
  throw new Error(`entry text is ${points} code points, outside the 1-200 gate`);
}

const out = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, "entry.txt"), TEXT, "utf8");
