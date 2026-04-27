"use client";

import JSON5 from "json5";
import JsonToTS from "json-to-ts";
import { create } from "zustand";

type ConversionStatus = "idle" | "success" | "error";
type ConversionError = "" | "empty" | "invalid";

interface TypeScriptConverterState {
  error: ConversionError;
  jsonValue: object | null;
  output: string;
  rootName: string;
  status: ConversionStatus;
  clearOutput: () => void;
  convertJson: (sourceJson: string) => void;
  setRootName: (rootName: string) => void;
}

const DEFAULT_ROOT_NAME = "RootObject";

function normalizeRootName(rootName: string) {
  const cleanName = rootName.trim().replace(/[^\w$]/g, "");

  if (!cleanName) {
    return DEFAULT_ROOT_NAME;
  }

  return /^\d/.test(cleanName) ? `_${cleanName}` : cleanName;
}

function parseTypeSource(sourceJson: string) {
  try {
    return JSON.parse(sourceJson);
  } catch {
    return JSON5.parse(sourceJson);
  }
}

function getJsonViewValue(json: unknown): object {
  if (typeof json === "object" && json !== null) {
    return json;
  }

  return { value: json };
}

export const useTypeScriptConverter = create<TypeScriptConverterState>(
  (set, get) => ({
    error: "",
    jsonValue: null,
    output: "",
    rootName: DEFAULT_ROOT_NAME,
    status: "idle",
    clearOutput: () =>
      set({ error: "", jsonValue: null, output: "", status: "idle" }),
    convertJson: (sourceJson) => {
      if (!sourceJson.trim()) {
        set({
          error: "empty",
          jsonValue: null,
          output: "",
          status: "error",
        });
        return;
      }
      try {
        const json = parseTypeSource(sourceJson);
        const rootName = normalizeRootName(get().rootName);
        const interfaces = JsonToTS(json, { rootName });

        set({
          error: "",
          jsonValue: getJsonViewValue(json),
          output: interfaces.join("\n\n"),
          rootName,
          status: "success",
        });
      } catch {
        set({
          error: "invalid",
          jsonValue: null,
          output: "",
          status: "error",
        });
      }
    },
    setRootName: (rootName) => set({ rootName }),
  }),
);
