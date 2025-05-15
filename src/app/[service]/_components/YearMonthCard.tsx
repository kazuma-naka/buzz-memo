import React from 'react';
import { Calendar } from 'lucide-react';

export const YearMonthCard: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center justify-center gap-2 text-gray-700 text-xl font-bold mb-3">
    <Calendar className="w-5 h-5" />
    <span>{label}</span>
  </div>
);
