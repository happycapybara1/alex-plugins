#!/usr/bin/env node
// alex-ring — SessionStart hook.
//
// alex-superpowers and alex-ponytail stay quiet at session start while this
// plugin is enabled (each checks for it). This tells Claude to ask the user
// once, before the first coding reply, and to load both on a yes. Plain stdout
// becomes session context in Claude Code. Never blocks the session.

const INSTRUCTION = [
  'alex-ring: alex-superpowers and alex-ponytail are installed but not loaded.',
  'Before your first reply that involves code (writing, changing, reviewing or debugging it, or planning software),',
  'ask once with Yes/No options (AskUserQuestion): "Load superpowers + ponytail for this session?"',
  'Yes: load the skills alex-superpowers:using-superpowers and alex-ponytail:ponytail,',
  'say "Loaded: superpowers, ponytail." in one line, then answer. No: do not ask again this session.',
  '"code mode" means yes and "no plugins" means no; skip the question once they are loaded.',
  'With no one to answer, load them and say so.',
].join(' ');

try {
  process.stdout.write(INSTRUCTION + '\n');
} catch (e) {
  // Never block session start.
}
process.exit(0);
