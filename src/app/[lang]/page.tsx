import WorkspaceView from "@/components/workspace/WorkspaceView";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <div>
      <WorkspaceView
        dictionary={{
          flow: dictionary.flow,
          typescript: dictionary.typescript,
        }}
        key={lang}
      />
    </div>
  );
}
