import { Plugin } from "@opencode/plugin"

const timeFmt = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
})
const dateFmt = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})

export default Plugin.define({
  id: "answer-date",
  async setup(ctx) {
    // Minimal injection: current time + one-line rule, ~25 tokens per model call.
    // The context hook runs immediately before dispatch, so the time is fresh
    // for every call, including tool-driven continuations.
    await ctx.session.hook("context", (event) => {
      const now = new Date()
      event.system.push({
        type: "text",
        text: `Current time: ${timeFmt.format(now)} · ${dateFmt.format(now)}. End the reply with this exact line as the last line: ⏱ ${timeFmt.format(now)} · ${dateFmt.format(now)}`,
      })
    })
  },
})
