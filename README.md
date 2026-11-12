# opencode-answer-date

OpenCode V2 plugin: appends a wall-clock timestamp line to the end of **every assistant reply**:

```
⏱ 14:23:07 · 13.11.2026
```

## How it works

A server plugin registers a `context` hook that, immediately before each model
request, injects the current wall-clock time (second precision, `ru-RU`
locale) into the system context along with a one-line instruction to finish the
reply with a timestamp line. The timestamp is part of the reply text itself, so
it is visible in the TUI, preserved in session history, and copied together
with the reply.

Token cost: ~25 input tokens per model call (including intermediate tool-driven
steps) and ~15 output tokens per reply.

## Installation

### As an npm package

Add to `~/.config/opencode/opencode.json(c)`:

```jsonc
{
  "plugins": ["opencode-answer-date"]
}
```

### As a local plugin

Copy `src/index.ts` to `<global-config>/plugins/answer-date/index.ts` — OpenCode
picks it up automatically, no build required.

## Format

The format is defined in `src/index.ts` via `Intl.DateTimeFormat("ru-RU", ...)`;
change it to match your locale and rebuild (`bun run build`).

## License

MIT
