import React from 'react'
function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w mx-auto px-10">{children}</div>;
}

export default Container;
