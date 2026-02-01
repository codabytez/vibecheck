"use client";
import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
};

const StatCard: React.FC<Props> = ({
  title,
  children,
  className = "",
  action,
}) => {
  return (
    <div
      className={`bg-card-bg rounded-2xl p-8 neon-border-dashboard flex flex-col justify-between h-full relative group transition-all hover:bg-dark-green ${className}`}
    >
      {action && <div className="absolute top-6 right-6 z-10">{action}</div>}
      <div className="flex flex-col gap-2">
        <p className="text-neon-green/60 text-xs font-black uppercase tracking-widest">
          {title}
        </p>
        {children}
      </div>
    </div>
  );
};

export default StatCard;
