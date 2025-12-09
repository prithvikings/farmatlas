import React from 'react'

const Features = () => {
  const cardInfo = [
    {
      id: 1,
      title: "Delegation Without Risk",
      desc: "Assign specific, limited access to Workers (Feed/Usage) and Vets (Health Records). The Admin alone controls all finances and settings."
    },
    {
      id: 2,
      title: "Zero Data Guesswork",
      desc: "Instantly access the complete, centralized history for every animal—from birth records and feed logs to treatment dates. Eliminate errors and misplaced paperwork."
    },
    {
      id: 3,
      title: "See True Profitability",
      desc: "Simple, integrated financial tracking (Income vs. Expense). Filter by month or category to see where you are making or losing money. No accounting degree required."
    }
  ]

  return (
    <div>
      <div className='grid grid-cols-3 gap-6'>
        {cardInfo.map(card => (
          <div
            key={card.id}
            className='bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300'
          >
            <h2 className='font-poppins text-xl font-medium mb-4'>{card.title}</h2>
            <p className='font-inter text-sm text-zinc-700'>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
