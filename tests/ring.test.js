#!/usr/bin/env node
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ring = path.join(root, 'plugins', 'alex-ring');
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));

function runHook(input) {
  return spawnSync(process.execPath, [path.join(ring, 'hooks', 'ring-start.js')], {
    input,
    env: { PATH: process.env.PATH, CLAUDE_PLUGIN_ROOT: ring },
    encoding: 'utf8',
    timeout: 10000,
  });
}

test('the session-start text tells Claude to ask once and what to load on a yes', () => {
  const result = runHook(JSON.stringify({ source: 'startup' }));
  assert.equal(result.status, 0, result.stderr);
  const text = result.stdout;
  for (const phrase of [
    'AskUserQuestion',
    'Load superpowers + ponytail for this session?',
    'alex-superpowers:using-superpowers',
    'alex-ponytail:ponytail',
    'Loaded: superpowers, ponytail.',
    'code mode',
    'no plugins',
  ]) {
    assert.ok(text.includes(phrase), `missing: ${phrase}`);
  }
  assert.ok(text.split(/\s+/).filter(Boolean).length < 100, 'keep the always-on text short');
});

test('the hook never blocks session start, whatever arrives on stdin', () => {
  for (const input of ['', 'not json']) {
    const result = runHook(input);
    assert.equal(result.status, 0);
  }
});

test('hooks.json runs the hook on startup, clear and compact, not on resume', () => {
  const hooks = readJson('plugins/alex-ring/hooks/hooks.json').hooks;
  assert.deepEqual(Object.keys(hooks), ['SessionStart']);
  const [entry] = hooks.SessionStart;
  assert.equal(entry.matcher, 'startup|clear|compact');
  // Same Windows-safe form as alex-ponytail: no shell quoting of the plugin path.
  assert.match(entry.hooks[0].command, /^node -e "require\(require\('path'\)\.join\(process\.env\.CLAUDE_PLUGIN_ROOT/);
});

test('the marketplace lists the ring and the three plugins it depends on', () => {
  const market = readJson('.claude-plugin/marketplace.json');
  assert.equal(market.name, 'alex');
  const names = market.plugins.map((p) => p.name);
  assert.deepEqual(names, ['alex-ring', 'alex-superpowers', 'alex-ponytail', 'alex-i-have-adhd']);
  const ringEntry = market.plugins[0];
  assert.equal(ringEntry.source, './plugins/alex-ring');
  for (const plugin of market.plugins.slice(1)) {
    assert.deepEqual(plugin.source, { source: 'github', repo: `happycapybara1/${plugin.name}` });
  }
  const manifest = readJson('plugins/alex-ring/.claude-plugin/plugin.json');
  assert.equal(manifest.name, 'alex-ring');
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
  assert.deepEqual(manifest.dependencies, names.slice(1));
});
