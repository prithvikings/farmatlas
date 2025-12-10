import { AnimatedBackground } from './ui/animated-background';

export function BentoItem() {
  const ITEMS = [
    {
      id: 1,
      title: 'Individual Animal Profiles',
      description:
        'Log every animal with a unique ID, species, and status (Sick, Sold, Active). Access the full history of any animal in one click.',
      className: ''
    },
    {
      id: 2,
      title: 'Real-Time Health Records',
      description:
        'Vets and Admins instantly log treatments, vaccinations, and notes. Get proactive alerts on current health issues.',
      className: ''
    },
    {
      id: 3,
      title: 'Simple Worker Feed Logging',
      description:
        'Your field workers quickly log the exact feed type and quantity. End feeding guesswork and ensure compliance.',
      className: ''
    },
    {
      id: 4,
      title: 'Secure Financial Oversight',
      description:
        "Track income, expenses, and net profitability (Admin-only access). Know your farm's true financial health without sharing sensitive data.",
      className: 'col-span-2'
    },
    {
      id: 5,
      title: 'Low-Stock Inventory Alerts',
      description:
        'Track feed, medicine, and supply stock. Workers log usage; the Admin dashboard flags items below your defined threshold.',
      className: ''
    }
  ];

  return (
    <div className="grid grid-cols-2 p-10 md:grid-cols-3 gap-4">
      <AnimatedBackground
        className="rounded-lg bg-zinc-200 dark:bg-zinc-900"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        enableHover
      >
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className={`bento-item bg-zinc-300 dark:bg-zinc-800 px-4 py-6 rounded-lg ${item.className}`}
            data-id={`card-${item.id}`}
          >
            <h3 className="font-poppins text-lg font-medium text-zinc-800 dark:text-zinc-50">
              {item.title}
            </h3>
            <p className="font-inter text-sm mt-4 text-zinc-700 dark:text-zinc-300">
              {item.description}
            </p>
          </div>
        ))}
      </AnimatedBackground>
    </div>
  );
}
