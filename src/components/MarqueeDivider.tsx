import React from 'react';

export const MarqueeDivider = () => {
  // Creating an array of text to repeat across the screen seamlessly
  const texts = Array(8).fill("CO₂ emissions Reach Record High in 2024");

  return (
    <div className="relative bg-[#a3e635] py-4 overflow-hidden border-y border-[#0a0a0a]">
      {/* Inline styles for the marquee keyframes to ensure it works without complex Tailwind config */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            white-space: nowrap;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
      
      <div className="flex whitespace-nowrap animate-marquee">
        {/* We double the content inside the marquee so it loops seamlessly */}
        <div className="flex items-center">
          {texts.map((text, i) => (
            <React.Fragment key={i}>
              <span className="text-[1.2rem] md:text-[1.5rem] font-bold tracking-tight text-[#0a0a0a] uppercase px-8">
                {text}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#0a0a0a] mx-2" />
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center">
          {texts.map((text, i) => (
            <React.Fragment key={i + 100}>
              <span className="text-[1.2rem] md:text-[1.5rem] font-bold tracking-tight text-[#0a0a0a] uppercase px-8">
                {text}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#0a0a0a] mx-2" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
