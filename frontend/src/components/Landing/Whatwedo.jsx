import { UniqueAccordion } from "../interactive-accordion";

export default function Whatwedo() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-12">
          <h1 className="text-4xl font-medium tracking-tight mb-3 text-balance font-poppins selection:bg-[#EA580C] selection:text-zinc-100">
            Farm Management. Simplified.
          </h1>
          <p className="text-muted-foreground text-lg font-inter selection:bg-[#EA580C] selection:text-zinc-100">
            Eliminate paper logs, spreadsheets, and data errors with one secure
            system for your whole team.
          </p>
        </div>
        <UniqueAccordion />
      </div>
    </main>
  );
}
