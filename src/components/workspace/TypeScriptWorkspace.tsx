"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

type TypeScriptDictionary = Dictionary["typescript"];

interface TypeScriptWorkspaceProps {
  dictionary: TypeScriptDictionary;
}

const TypeScriptWorkspace = ({ dictionary }: TypeScriptWorkspaceProps) => {
  const isSidebarOpen = useSidebar((state) => state.isOpen);

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
        <Button disabled type="button" variant="outline">
          <Copy aria-hidden="true" />
          {dictionary.copyLabel}
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
            defaultValue="Root"
            id="type-name"
            spellCheck={false}
            type="text"
          />

          <label
            className="text-xs font-medium text-muted-foreground"
            htmlFor="typescript-options"
          >
            {dictionary.optionsLabel}
          </label>
          <div
            className="grid gap-2 text-sm text-muted-foreground"
            id="typescript-options"
          >
            <label className="flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 dark:bg-input/20">
              <input checked readOnly type="checkbox" />
              {dictionary.interfaceLabel}
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 dark:bg-input/20">
              <input readOnly type="checkbox" />
              {dictionary.optionalLabel}
            </label>
          </div>
        </section>

        <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-white/95 shadow-sm backdrop-blur dark:bg-bgColor/95">
          <div className="flex h-11 shrink-0 items-center border-b border-border/70 px-3 text-sm font-medium text-muted-foreground">
            {dictionary.outputLabel}
          </div>
          <pre className="min-h-0 flex-1 overflow-auto p-4 font-mono text-sm leading-6 text-foreground">
            <code>{dictionary.placeholder}</code>
          </pre>
        </section>
      </div>
    </main>
  );
};

export default TypeScriptWorkspace;
