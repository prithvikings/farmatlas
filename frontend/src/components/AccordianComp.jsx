import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { ChevronRight } from "lucide-react";

export function AccordionComp() {
  return (
    <Accordion
      className="flex w-full flex-col font-roboto"
      transition={{
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      {[
        {
          value: "getting-started",
          q: "How do I get started with FarmAtlas?",
          a: "Create your account, add your farm, and start registering animals. FarmAtlas walks you through setup in minutes—no spreadsheets, no complicated onboarding.",
        },
        {
          value: "data-tracking",
          q: "What information can I track?",
          a: "FarmAtlas stores everything—birth records, weight logs, feed usage, breeding cycles, treatments, vaccination dates, expenses, and more.",
        },
        {
          value: "roles-permissions",
          q: "How does team access work?",
          a: "Workers can log feed and usage data. Vets update health records. Only admins manage finances and settings.",
        },
        {
          value: "profitability-tracking",
          q: "How does FarmAtlas help me see profits?",
          a: "Get a clear view of income versus expenses—per month, category, or across your entire farm.",
        },
        {
          value: "support",
          q: "Where do I get help if I need it?",
          a: "Reach support from your dashboard, access guides, tutorials, and community-driven solutions.",
        },
      ].map((item) => (
        <AccordionItem key={item.value} value={item.value} className="py-2">
          <AccordionTrigger
            className="
              w-full
              text-left
              py-2
              text-zinc-950 dark:text-zinc-50
              selection:bg-[#EA580C] selection:text-zinc-100
            "
          >
            <div className="flex items-start">
              <ChevronRight
                className="
                  h-4 w-4
                  mt-0.5
                  mr-2
                  transition-transform duration-200
                  group-data-expanded:rotate-90
                "
              />
              <span className="font-poppins text-sm sm:text-base">
                {item.q}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent
            className="
              overflow-hidden
              data-[state=open]:animate-accordion-down
              data-[state=closed]:animate-accordion-up
            "
          >
            <p
              className="
                pl-6
                pr-2
                pt-2
                text-xs sm:text-sm
                text-zinc-500 dark:text-zinc-400
                font-roboto
                tracking-wide
              "
            >
              {item.a}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
