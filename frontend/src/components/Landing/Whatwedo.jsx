import { UniqueAccordion } from "../interactive-accordion";

export default function Whatwedo() {
  return (
    <main
      className="
        min-h-auto md:min-h-screen
        flex
        items-start md:items-center
        justify-center
        px-4 sm:px-6 md:p-8
        py-12 md:py-0
      "
    >
      <div className="w-full max-w-2xl">
        <div className="mb-8 md:mb-12">
          <h1
            className="
              text-2xl sm:text-3xl md:text-4xl
              font-medium tracking-tight
              mb-3
              text-balance
              font-poppins
              selection:bg-[#EA580C] selection:text-zinc-100
              text-zinc-700 dark:text-zinc-500
            "
          >
            Farm Management.{" "}
            <span className="dark:text-zinc-200 text-zinc-900">
              Simplified.
            </span>
          </h1>

          <p
            className="
              text-sm sm:text-base md:text-lg
              text-muted-foreground
              font-inter
              selection:bg-[#EA580C] selection:text-zinc-100
            "
          >
            Eliminate paper logs, spreadsheets, and data errors with one secure
            system for your whole team.
          </p>
        </div>

        <UniqueAccordion />
      </div>
    </main>
  );
}
