"use client";

import TestFlow from "@/components/test/TestFlow";
import TypeScriptWorkspace from "@/components/workspace/TypeScriptWorkspace";
import { useWorkspaceView } from "@/context/ViewContext";
import type { Dictionary } from "@/i18n/dictionaries";

interface WorkspaceViewProps {
  dictionary: {
    flow: Dictionary["flow"];
    typescript: Dictionary["typescript"];
  };
}

const WorkspaceView = ({ dictionary }: WorkspaceViewProps) => {
  const activeView = useWorkspaceView((state) => state.activeView);

  if (activeView === "typescript") {
    return <TypeScriptWorkspace dictionary={dictionary.typescript} />;
  }

  return <TestFlow dictionary={dictionary.flow} />;
};

export default WorkspaceView;
