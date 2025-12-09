import React from 'react'
import { BorderTrail } from './ui/border-trail';

export function BorderTrailCard1({ children, className = '', ...props }) {
  return (
    <div
      className={`relative flex h-[200px] w-[300px] flex-col justify-center rounded-md bg-zinc-200 px-5 py-2 dark:bg-zinc-800 ${className}`}
      {...props}
    >
      <BorderTrail
        style={{
          boxShadow:
            '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
        }}
        size={100}
      />

      <div className="flex flex-col space-y-2 w-full">
        {children}
      </div>
    </div>
  );
}
