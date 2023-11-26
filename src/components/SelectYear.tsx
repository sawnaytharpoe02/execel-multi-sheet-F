import { Select } from 'flowbite-react';
import { v4 as uuidv4 } from 'uuid';

interface SelectYearProps {
  filterYear: {year: number}[];
  onSelectYear: (selectedYear: number) => void;
}

export default function SelectYear({ filterYear, onSelectYear } : SelectYearProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value, 10);
    onSelectYear(selectedYear);
  };
  return (
    <div className='max-w-40'>
      <label htmlFor="">Year</label>
      <Select onChange={handleChange}>
        {filterYear.map((e: any) => (
          <option key={uuidv4()} value={e.year}>
            {e.year}
          </option>
        ))}
      </Select>
    </div>
  );
}
