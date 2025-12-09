import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { ChevronRight } from 'lucide-react';

export function AccordionComp() {
  return (
    <Accordion
      className='flex w-full flex-col font-roboto'
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      variants={{
        expanded: { opacity: 1, scale: 1 },
        collapsed: { opacity: 0, scale: 0.7 },
      }}
    >

      {/* FAQ 1 */}
      <AccordionItem value='getting-started' className='py-2'>
        <AccordionTrigger className='w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50'>
          <div className='flex items-center'>
            <ChevronRight className='h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50' />
            <div className='ml-2 font-poppins'>How do I get started with FarmAtlas?</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className='origin-left'>
          <p className='pl-6 pr-2 text-zinc-500 dark:text-zinc-400 font-roboto tracking-wide text-sm'>
            Create your account, add your farm, and start registering animals.
            FarmAtlas walks you through setup in minutes—no spreadsheets, no
            complicated onboarding. Just clean, organized data from day one.
          </p>
        </AccordionContent>
      </AccordionItem>

      {/* FAQ 2 */}
      <AccordionItem value='data-tracking' className='py-2'>
        <AccordionTrigger className='w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50'>
          <div className='flex items-center'>
            <ChevronRight className='h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50' />
            <div className='ml-2 font-poppins'>What information can I track?</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className='origin-left'>
          <p className='pl-6 pr-2 text-zinc-500 dark:text-zinc-400 font-roboto tracking-wide text-sm'>
            FarmAtlas stores everything—birth records, weight logs, feed usage,
            breeding cycles, treatments, vaccination dates, expenses, and more.
            Every animal gets a complete, centralized timeline you can access
            instantly.
          </p>
        </AccordionContent>
      </AccordionItem>

      {/* FAQ 3 */}
      <AccordionItem value='roles-permissions' className='py-2'>
        <AccordionTrigger className='w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50'>
          <div className='flex items-center'>
            <ChevronRight className='h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50' />
            <div className='ml-2 font-poppins'>How does team access work?</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className='origin-left'>
          <p className='pl-6 pr-2 text-zinc-500 dark:text-zinc-400 font-roboto tracking-wide text-sm'>
            You control who sees what. Workers can log feed and usage data.
            Vets can update health records. Only the farm owner or admin can
            manage finances and settings. No unwanted access, no risk.
          </p>
        </AccordionContent>
      </AccordionItem>

      {/* FAQ 4 */}
      <AccordionItem value='profitability-tracking' className='py-2'>
        <AccordionTrigger className='w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50'>
          <div className='flex items-center'>
            <ChevronRight className='h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50' />
            <div className='ml-2 font-poppins'>How does FarmAtlas help me see profits?</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className='origin-left'>
          <p className='pl-6 pr-2 text-zinc-500 dark:text-zinc-400 font-roboto tracking-wide text-sm'>
            You get a simple, accurate view of income versus expenses—per month,
            per category, or for your entire farm. No accounting skills required.
            Just clear insights into what’s earning and what’s draining money.
          </p>
        </AccordionContent>
      </AccordionItem>

      {/* FAQ 5 */}
      <AccordionItem value='support' className='py-2'>
        <AccordionTrigger className='w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50'>
          <div className='flex items-center'>
            <ChevronRight className='h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50' />
            <div className='ml-2 font-poppins'>Where do I get help if I need it?</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className='origin-left'>
          <p className='pl-6 pr-2 text-zinc-500 dark:text-zinc-400 font-roboto tracking-wide text-sm'>
            You can reach FarmAtlas support directly from your dashboard. We also
            provide guides, quick-start tutorials, and a community channel where
            farmers share tips, workflow ideas, and real-world solutions.
          </p>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  );
}
