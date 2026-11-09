import React from 'react';
export default function StickyCardsDemo() {
  return (
<div className='w-full mx-auto flex items-center justify-center flex-col relative py-12'>
          <div className='w-1/2 h-72 sticky top-9 bg-gray-100 border border-black text-black flex items-center justify-center'>hello i am page 1</div>
          <div className='w-1/2 h-72 top-12 sticky bg-gray-100 border border-black text-black flex items-center justify-center'>hello i am page 2</div>
          <div className='w-1/2 h-72 sticky top-14 bg-gray-100 border border-black text-black flex items-center justify-center'>hello i am page 3</div>
          <div className='w-1/2 h-72 sticky top-16 bg-gray-100 border border-black text-black flex items-center justify-center'>hello i am page 4</div>
        </div>
  );
}


