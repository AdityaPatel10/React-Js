import React from 'react'

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Allow custom classes
}


function Container({ children, className }: ContainerProps) {
  return <div className={`w-full max-w mx-auto px-10 ${className}`}>{children}</div>;
}

export default Container;
