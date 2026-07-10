import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string; id: string };

const GREETING: Msg = {
  id: "greet",
  role: "assistant",
  content:
    "Ahoj, som **Wiz** 🐝 — konopno-tatranský sprievodca TatraCannaBees. Pýtaj sa: o značke, o poliach, o WHX Dubai, alebo o čomkoľvek. (Právne veci ti nepokecám, ale odporučím kam sa pozrieť.)",
};

export function WizChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Mobile: track the on-screen keyboard via visualViewport so the composer
  // never disappears under it. We set a CSS var --wiz-h with the usable height.
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      const h = vv.height;
      panelRef.current?.style.setProperty("--wiz-h", `${h}px`);
      // Also nudge the panel down by offsetTop so it stays anchored on iOS.
      panelRef.current?.style.setProperty("--wiz-offset", `${vv.offsetTop}px`);
      // Keep scroll pinned so streamed text stays visible above the input.
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: text };
    const assistantId = crypto.randomUUID();
    setMessages((m) => [...m, userMsg, { id: assistantId, role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const uiMessages = [...messages, userMsg]
        .filter((m) => m.id !== "greet")
        .map((m) => ({
          id: m.id,
          role: m.role,
          parts: [{ type: "text", text: m.content }],
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: uiMessages }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text());

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const evt = JSON.parse(payload);
            if (evt.type === "text-delta" && typeof evt.delta === "string") {
              acc += evt.delta;
              setMessages((m) =>
                m.map((msg) => (msg.id === assistantId ? { ...msg, content: acc } : msg)),
              );
            }
          } catch {
            /* ignore keepalives */
          }
        }
      }
      if (!acc) {
        setMessages((m) =>
          m.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: "Hmm, včielka mi odletela. Skús to znova o chvíľu." }
              : msg,
          ),
        );
      }
    } catch (e) {
      const err = e instanceof Error ? e.message : "Niečo sa pokazilo.";
      setMessages((m) =>
        m.map((msg) =>
          msg.id === assistantId ? { ...msg, content: `Prepáč, teraz to nejde: ${err}` } : msg,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 rounded-full bg-honey text-honey-foreground pl-4 pr-5 py-3 shadow-glow hover:scale-105 transition-transform"
          aria-label="Chat with Wiz"
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-honey-foreground/10">
            <Sparkles className="h-4 w-4" />
            <span className="absolute inset-0 rounded-full ring-2 ring-honey-foreground/40 animate-ping" />
          </span>
          <span className="text-sm font-semibold hidden sm:inline">Spýtaj sa Wiza</span>
        </button>
      )}

      {open && (
        <div
          ref={panelRef}
          style={{
            height: "var(--wiz-h, 100dvh)",
            top: "var(--wiz-offset, 0px)",
          }}
          className="fixed inset-x-0 z-50 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:top-auto sm:!h-[600px] sm:w-[400px] sm:rounded-2xl flex flex-col border border-border bg-card shadow-elev overflow-hidden animate-reveal-up"
        >
          <header className="flex items-center justify-between border-b border-border px-4 py-3 bg-leaf-gradient text-leaf-foreground">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-background/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display font-semibold leading-none">Wiz</div>
                <div className="text-[11px] opacity-80">tatranský AI sprievodca</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Zavrieť" className="opacity-80 hover:opacity-100">
              <X className="h-5 w-5" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                {m.role === "user" ? (
                  <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-honey text-honey-foreground px-3 py-2 text-sm">
                    {m.content}
                  </div>
                ) : (
                  <div className="max-w-[90%] text-sm text-foreground prose prose-sm prose-invert prose-p:my-2 prose-headings:font-display">
                    <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-honey animate-pulse" /> Wiz premýšľa…
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-border p-3 flex gap-2"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Napíš Wizovi…"
              className="flex-1 resize-none rounded-xl bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey max-h-32"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey text-honey-foreground disabled:opacity-40"
              aria-label="Odoslať"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
          aria-label="Zavrieť chat"
        />
      )}
    </>
  );
}

// Floating chat trigger uses MessageCircle icon on fallback
export { MessageCircle };
