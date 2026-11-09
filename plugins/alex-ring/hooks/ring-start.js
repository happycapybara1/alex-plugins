#!/usr/bin/env node
// alex-ring — SessionStart hook.
//
// alex-superpowers and alex-ponytail stay quiet at session start while this
// plugin is enabled (each checks for it). This tells Claude to ask the user
// once, before the first coding reply, with a checkbox per plugin. Plain stdout
// becomes session context in Claude Code. Never blocks the session.

const INSTRUCTION = [
  'alex-ring: alex-superpowers, alex-ponytail and alex-i-have-adhd are installed but not loaded.',
  'Before your first reply that involves code (writing, changing, reviewing or debugging it, or planning software),',
  'ask once with AskUserQuestion, multiSelect true: "Which plugins should I load for this session?"',
  'Options: "Superpowers" (plan, test first, debug, review), "Ponytail" (smallest change that works),',
  '"ADHD mode" (action-first replies); leave out any already on.',
  'Then load what was ticked: Superpowers = skill alex-superpowers:using-superpowers, Ponytail = skill alex-ponytail:ponytail;',
  'ADHD mode turns on by itself from the answer. Say what is loaded in one line ("Loaded: superpowers, ponytail."), then answer.',
  'Nothing ticked: do not ask again this session. "code mode" means Superpowers + Ponytail without asking, "no plugins" means none.',
  'With no one to answer, load Superpowers and Ponytail and say so.',
].join(' ');

try {
  process.stdout.write(INSTRUCTION + '\n');
} catch (e) {
  // Never block session start.
}
process.exit(0);
