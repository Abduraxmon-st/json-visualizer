"use client";

import { useState } from "react";
import { Braces, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";

type SidebarDictionary = Dictionary["sidebar"];
type NodePosition = "top" | "left" | "bottom" | "right";

interface SidebarProps {
  dictionary: SidebarDictionary;
}

const positionOptions: NodePosition[] = ["top", "left", "bottom", "right"];

const Sidebar = ({ dictionary }: SidebarProps) => {
  const isOpen = useSidebar((state) => state.isOpen);
  const toggleSidebar = useSidebar((state) => state.toggleSidebar);
  const [jsonInput, setJsonInput] = useState("");
  const [position, setPosition] = useState<NodePosition>("top");

  const clearJsonInput = () => {
    setJsonInput("");
  };

  return (
    <aside
      aria-label={dictionary.label}
      className={cn(
        "fixed left-4 top-5 bottom-5 z-80 flex flex-col overflow-hidden border border-border bg-white/95 text-foreground shadow-sm backdrop-blur transition-[width] duration-300 dark:bg-bgColor/95 dark:shadow-lg rounded-4xl",
        isOpen ? "w-[min(22rem,calc(100vw-1.5rem))]" : "w-14",
      )}
    >
      <div
        className={cn(
          "flex h-14 shrink-0 items-center gap-2 border-b border-border/70 px-3",
          isOpen ? "justify-between" : "justify-center border-b-0",
        )}
      >
        {isOpen ? (
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 dark:bg-input/30">
              <Braces className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-black dark:text-white">
                {dictionary.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {dictionary.description}
              </p>
            </div>
          </div>
        ) : null}

        <Button
          aria-expanded={isOpen}
          aria-label={isOpen ? dictionary.closeLabel : dictionary.openLabel}
          className="rounded-full"
          onClick={toggleSidebar}
          size="icon-sm"
          title={isOpen ? dictionary.closeLabel : dictionary.openLabel}
          type="button"
          variant="outline"
        >
          {isOpen ? (
            <PanelLeftClose aria-hidden="true" />
          ) : (
            <PanelLeftOpen aria-hidden="true" />
          )}
        </Button>
      </div>

      {isOpen ? (
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-3">
          <label
            className="text-xs font-medium text-muted-foreground"
            htmlFor="json-input"
          >
            {dictionary.textareaLabel}
          </label>
          <div className="relative min-h-0 flex-1">
            <textarea
              style={{ scrollbarWidth: "none" }}
              className="size-full resize-none rounded-2xl border border-border bg-background/80 p-3 pr-11 text-sm leading-6 text-foreground shadow-inner outline-none transition placeholder:text-muted-foreground/70 focus:border-ring focus:ring-3 focus:ring-ring/30 dark:bg-input/20"
              id="json-input"
              onChange={(event) => setJsonInput(event.target.value)}
              placeholder={dictionary.placeholder}
              spellCheck={false}
              value={jsonInput}
            />
            {jsonInput ? (
              <Button
                aria-label={dictionary.clearLabel}
                className="absolute right-2 top-2 rounded-full bg-background/90 shadow-sm dark:bg-input/90"
                onClick={clearJsonInput}
                size="icon-sm"
                title={dictionary.clearLabel}
                type="button"
                variant="outline"
              >
                <X aria-hidden="true" />
              </Button>
            ) : null}
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                {dictionary.positionLabel}
              </p>
              <div
                aria-label={dictionary.positionLabel}
                className="grid grid-cols-4 gap-1 rounded-2xl border border-border bg-background/70 p-1 dark:bg-input/20"
                role="group"
              >
                {positionOptions.map((option) => {
                  const isActive = option === position;

                  return (
                    <button
                      aria-pressed={isActive}
                      className={cn(
                        "h-7 rounded-xl px-1 text-xs font-medium capitalize transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                      )}
                      key={option}
                      onClick={() => setPosition(option)}
                      type="button"
                    >
                      {dictionary.positionOptions[option]}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button">{dictionary.visualizeLabel}</Button>
              <Button onClick={clearJsonInput} type="button" variant="outline">
                {dictionary.clearLabel}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  );
};

export default Sidebar;
