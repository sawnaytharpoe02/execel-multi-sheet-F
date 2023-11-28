import { useState } from 'react';
import { Select } from 'flowbite-react';
import { v4 as uuidv4 } from 'uuid';

interface SelectYearProps {
  name: string;
  filterYear: { year: number }[];
  onSelectYear: (selectedYear: number) => void;
}

export default function SelectYear({
  name,
  filterYear,
  onSelectYear,
}: SelectYearProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value, 10);
    onSelectYear(selectedYear);
    setSelectedValue(e.target.value);
  };
  return (
    <div>
      <label htmlFor="">{name}</label>
      <Select onChange={handleChange} className="w-40" value={selectedValue}>
        <option>Please select year</option>
        {filterYear.map((e: any) => (
          <option key={uuidv4()} value={e.year}>
            {e.year}
          </option>
        ))}
      </Select>
    </div>
  );
}
