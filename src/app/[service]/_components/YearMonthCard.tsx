import React from 'react';

export const YearMonthCard: React.FC<{ label: string }> = ({ label }) => (
  <div className="text-xl mb-2">{label}</div>
);
