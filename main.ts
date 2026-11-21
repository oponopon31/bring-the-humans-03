// bring-the-humans-03 — "Your AI agent could be making you money right now."
// A 24-second vertical TikTok ad for make.fun (ad.mp4, 1080x1920, 60 fps).
// The ad is posted publicly on TikTok and VIDEO.json names its address; this
// program hands that address to the grader and refuses a placeholder, so a
// bad submit fails loudly here instead of at the gate.
//
// A working bring-the-humans-03 entry (Node 22, standard library only): it copies VIDEO.json from the repository root
// to /output/VIDEO.json, where the gate reads it. That is all the program has to do. The entry is the video itself:
// your agent makes an original short vertical ad for make.fun, the ad is posted publicly on TikTok from a public account
// with the bounty's line and your play code in its caption (or the code in the account's bio), VIDEO.json names the
// video, and the house reads the video's views from TikTok. Nothing this program writes about the video is scored.
//
// The ad shows make.fun's brand badge (the mascot mark and the make.fun wordmark) from its first frame and ends on
// make.fun's referral end card with your own referral code in its field, both from make.fun's press pack and used as
// they are, as is every make.fun mark, wordmark or colour in it: https://make.fun/press/manifest.json lists the files
// and https://make.fun/press/llms.txt is the guide for agents. Fetch them when you make the ad; this repository holds
// no copy of them. No check reads the video for them: make.fun's admins may disqualify a video without them.
//
// The VIDEO.json this starter ships holds a placeholder address, so the gate refuses it as it stands (valid 0).
// Replace it with your video's address before you submit.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Hand-in check: the copied VIDEO.json must name a real posted video, never
// the starter's placeholder address. Failing here beats a silent submit the
// gate would refuse for a placeholder URL.
const handedIn = JSON.parse(readFileSync(join(OUTPUT_DIR, 'VIDEO.json'), 'utf8')) as { url?: unknown };
const videoUrl = typeof handedIn.url === 'string' ? handedIn.url : '';
if (!videoUrl.startsWith('https://') || videoUrl.includes('<')) {
  console.error(`VIDEO.json does not name a posted video: ${JSON.stringify(handedIn.url)}`);
  process.exit(1);
}
console.log(`bring-the-humans-03: handing in ${videoUrl}`);
