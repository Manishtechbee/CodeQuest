import { useState } from 'react';

interface ScoreSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function ScoreSlider({ label, value, onChange, max = 10 }: ScoreSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-medium">{label}</label>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {value}/{max}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-gradient-to-r
          [&::-webkit-slider-thumb]:from-purple-500
          [&::-webkit-slider-thumb]:to-pink-500
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-gradient-to-r
          [&::-moz-range-thumb]:from-purple-500
          [&::-moz-range-thumb]:to-pink-500
          [&::-moz-range-thumb]:cursor-pointer
          [&::-moz-range-thumb]:border-0
        "
      />
    </div>
  );
}
