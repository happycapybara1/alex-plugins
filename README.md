# alex-plugins

My Claude Code marketplace, `alex`, and the `alex-plugins-home` plugin: one install for all four plugins, and each loads only when I tick it.

| Plugin | What it does |
|---|---|
| `alex-plugins-home` | Before the first reply that involves code, asks once which plugins to load, with a checkbox each for Superpowers, Ponytail and ADHD mode. Installing it installs the other three. |
| `alex-superpowers` | Planning, test-first, debugging and review workflows ([repo](https://github.com/happycapybara1/alex-superpowers), fork of obra/superpowers). |
| `alex-ponytail` | The smallest change that fully solves the task ([repo](https://github.com/happycapybara1/alex-ponytail), fork of DietrichGebert/ponytail). |
| `alex-i-have-adhd` | Action-first replies. Say "adhd mode" to turn it on, "stop adhd mode" to turn it off ([repo](https://github.com/happycapybara1/alex-i-have-adhd), fork of ayghri/i-have-adhd). |

## Install

In a terminal or Command Prompt:

```bash
claude plugin marketplace add happycapybara1/alex-plugins-home
```

```bash
claude plugin install alex-plugins-home@alex
```

Inside a Claude Code session (also the desktop app's Code tab), send `/plugin marketplace add happycapybara1/alex-plugins-home`, then `/plugin install alex-plugins-home@alex`.

If you installed any of the three from their own marketplaces before, uninstall those first, so nothing loads twice (for example `claude plugin uninstall alex-superpowers@alex-superpowers`).

## How it works

- **Session start:** superpowers, ponytail and i-have-adhd stay quiet. The ring adds about 300 tokens.
- **First message that looks like code:** Claude asks "Which plugins should I load for this session?" with checkboxes for Superpowers, Ponytail and ADHD mode. It loads what you tick and says so in one line. Nothing ticked: it carries on and doesn't ask again that session.
- **Shortcuts:** "code mode" loads Superpowers and Ponytail without asking; "no plugins" skips them.
- **ADHD:** "adhd mode" (or "adhd on") turns it on and Claude confirms in one line; "stop adhd mode" turns it off.
- **Your own ponytail default wins:** if you set `PONYTAIL_DEFAULT_MODE` or ponytail's config file, ponytail starts at that level.
- **Without the ring:** disable `alex-plugins-home@alex` and superpowers and ponytail start automatically again, as on their own.

## Limits

- Claude Code only (terminal, desktop app, IDE). Web sessions at claude.ai/code don't load plugins you install yourself.
- While the ring is enabled, Claude Code keeps its three dependencies on: disable the ring first to turn one of them off.
- In a run with no one to answer (`claude -p`, scheduled tasks), Claude loads both without asking and says so.

## Update

```bash
claude plugin marketplace update alex
```

Then update each plugin, for example:

```bash
claude plugin update alex-plugins-home@alex
```

## Uninstall

Removing the marketplace uninstalls all four plugins:

```bash
claude plugin marketplace remove alex
```

## Tests

```bash
npm test
```
