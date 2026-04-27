"use client";

import { useState } from "react";
import JsonView from "@uiw/react-json-view";
import { darkTheme } from "@uiw/react-json-view/dark";
import { lightTheme } from "@uiw/react-json-view/light";
import { Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { useTypeScriptConverter } from "@/context/TypeScriptConverterContext";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

type TypeScriptDictionary = Dictionary["typescript"];
type OutputTab = "type" | "json";

interface TypeScriptWorkspaceProps {
  dictionary: TypeScriptDictionary;
}

const TypeScriptWorkspace = ({ dictionary }: TypeScriptWorkspaceProps) => {
  const { theme } = useTheme();
  const isSidebarOpen = useSidebar((state) => state.isOpen);
  const clearOutput = useTypeScriptConverter((state) => state.clearOutput);
  const error = useTypeScriptConverter((state) => state.error);
  const jsonValue = useTypeScriptConverter((state) => state.jsonValue);
  const output = useTypeScriptConverter((state) => state.output);
  const rootName = useTypeScriptConverter((state) => state.rootName);
  const setRootName = useTypeScriptConverter((state) => state.setRootName);
  const status = useTypeScriptConverter((state) => state.status);
  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>("type");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const jsonViewTheme = theme === "dark" ? darkTheme : lightTheme;
  const outputText =
    status === "error"
      ? error === "empty"
        ? dictionary.emptyJsonMessage
        : dictionary.invalidJsonMessage
      : output || dictionary.placeholder;
  const canCopy = Boolean(output);
  const canClear = Boolean(output || jsonValue || status === "error");

  const copyOutput = async () => {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
    setCopyState("copied");
    window.setTimeout(() => setCopyState("idle"), 1200);
  };

  return (
    <main
      className={cn(
        "fixed bottom-5 right-5 top-24 z-10 flex flex-col gap-4 transition-all duration-300",
        isSidebarOpen
          ? "left-[calc(1rem+min(21.75rem,calc(100vw-1.5rem))+1.625rem)]"
          : "left-[calc(1rem+3.5rem+1.25rem)]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-foreground">
            {dictionary.title}
          </h1>
          <p className="truncate text-sm text-muted-foreground">
            {dictionary.description}
          </p>
        </div>
        <Button
          disabled={!canCopy}
          onClick={copyOutput}
          type="button"
          variant="outline"
        >
          <Copy aria-hidden="true" />
          {copyState === "copied"
            ? dictionary.copiedLabel
            : dictionary.copyLabel}
        </Button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-cols-[minmax(14rem,20rem)_1fr]">
        <section className="flex min-h-0 flex-col gap-3 rounded-lg border border-border bg-white/95 p-3 shadow-sm backdrop-blur dark:bg-bgColor/95">
          <label
            className="text-xs font-medium text-muted-foreground"
            htmlFor="type-name"
          >
            {dictionary.typeNameLabel}
          </label>
          <input
            className="h-9 rounded-xl border border-border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-ring focus:ring-3 focus:ring-ring/30 dark:bg-input/20"
            id="type-name"
            onChange={(event) => setRootName(event.target.value)}
            spellCheck={false}
            type="text"
            value={rootName}
          />

          {/* <label
            className="text-xs font-medium text-muted-foreground"
            htmlFor="typescript-options"
          >
            {dictionary.optionsLabel}
          </label> */}
          {/* <div
            className="grid gap-2 text-sm text-muted-foreground"
            id="typescript-options"
          >
            <label className="flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 dark:bg-input/20">
              <input checked readOnly type="checkbox" />
              {dictionary.interfaceLabel}
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 dark:bg-input/20">
              <input checked readOnly type="checkbox" />
              {dictionary.optionalLabel}
            </label>
          </div> */}
        </section>

        <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-white/95 shadow-sm backdrop-blur dark:bg-bgColor/95">
          <div className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-border/70 px-3 text-sm font-medium text-muted-foreground">
            <div className="flex min-w-0 items-center gap-3">
              {/* <span className="shrink-0">{dictionary.outputLabel}</span> */}
              <div
                aria-label={dictionary.outputTabsLabel}
                className="flex items-center rounded-full border border-border bg-background/70 p-0.5 dark:bg-input/20"
                role="tablist"
              >
                <button
                  aria-selected={activeOutputTab === "type"}
                  className={cn(
                    "h-7 rounded-full px-3 text-xs font-medium transition-colors",
                    activeOutputTab === "type"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                  onClick={() => setActiveOutputTab("type")}
                  role="tab"
                  type="button"
                >
                  {dictionary.typeTabLabel}
                </button>
                <button
                  aria-selected={activeOutputTab === "json"}
                  className={cn(
                    "h-7 rounded-full px-3 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
                    activeOutputTab === "json"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                  disabled={!jsonValue}
                  onClick={() => setActiveOutputTab("json")}
                  role="tab"
                  type="button"
                >
                  {dictionary.jsonTabLabel}
                </button>
              </div>
            </div>
            <Button
              disabled={!canClear}
              onClick={clearOutput}
              size="sm"
              type="button"
              variant="ghost"
            >
              <X aria-hidden="true" />
              {dictionary.clearLabel}
            </Button>
          </div>
          <div className="workspace-scrollbar min-h-0 flex-1 overflow-auto p-4">
            {activeOutputTab === "json" && jsonValue ? (
              <div className="rounded-lg border border-border bg-background/70 p-3 dark:bg-input/20 min-h-full">
                <JsonView
                  collapsed={100}
                  displayDataTypes={false}
                  enableClipboard
                  keyName={rootName}
                  shortenTextAfterLength={80}
                  style={{
                    ...jsonViewTheme,
                    backgroundColor: "transparent",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "14px",
                  }}
                  value={jsonValue}
                />
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-background/70 p-3 dark:bg-input/20 min-h-full">
                <pre
                  className={cn(
                    "font-mono text-sm leading-6",
                    status === "error"
                      ? "text-destructive"
                      : output
                        ? "text-foreground"
                        : "text-muted-foreground",
                  )}
                >
                  <code>{outputText}</code>
                </pre>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default TypeScriptWorkspace;
