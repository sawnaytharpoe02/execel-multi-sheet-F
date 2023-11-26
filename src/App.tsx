import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Table, Button } from 'flowbite-react';
import SelectYear from './components/SelectYear';

type IData = {
  athlete: string;
  sport: string;
  year: number;
  date: string;
  age: number;
};

type IYear = {
  year: number;
};
const App = () => {
  const [data, setData] = useState<IData[]>([]);
  const [filterYear, setFilterYear] = useState<IYear[]>([]);
  const [selectedFromYear, setSelectedFromYear] = useState<number | null>(null);
  const [selectedToYear, setSelectedToYear] = useState<number | null>(null);

  const uniqueYearSet = new Set<number>();
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      );
      const jsonData = await response.json();

      const formattedData: IData[] = jsonData?.map((athlete: any) => ({
        athlete: athlete.athlete,
        year: athlete.year,
        sport: athlete.sport,
        date: athlete.date,
        age: athlete.age,
      }));

      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const selectedYearFun = async () => {
    const selectedYear: IYear[] = data
      ?.filter((e: any) => {
        if (!uniqueYearSet.has(e.year)) {
          uniqueYearSet.add(e.year);
          return true;
        } else {
          return false;
        }
      })
      .map((e: any) => ({
        year: e.year,
      }))
      .sort((a: any, b: any) => a.year - b.year);
    setFilterYear(selectedYear);
  };

  const handleFromYearChange = (selectedYear: number) => {
    setSelectedFromYear(selectedYear);
  };

  const handleToYearChange = (selectedYear: number) => {
    setSelectedToYear(selectedYear);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    selectedYearFun();
  }, [data]);

  console.log('from',selectedFromYear);
  console.log('to',selectedToYear)

  return (
    <div className="overflow-x-auto p-12 bg-slate-600 min-h-screen">
      <div>
        <div className="w-40 flex">
          <SelectYear
            filterYear={filterYear}
            onSelectYear={handleFromYearChange}
          />
          <SelectYear
            filterYear={filterYear}
            onSelectYear={handleToYearChange}
          />
        </div>
      </div>
      <Button className="mb-4">Export</Button>
      {data?.length}
      <Table>
        <Table.Head>
          <Table.HeadCell>Athlete Name</Table.HeadCell>
          <Table.HeadCell>Year</Table.HeadCell>
          <Table.HeadCell>Sport</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Age</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.map((row) => (
            <Table.Row
              key={uuidv4()}
              className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{row.athlete}</Table.Cell>
              <Table.Cell>{row.year}</Table.Cell>
              <Table.Cell>{row.sport}</Table.Cell>
              <Table.Cell>{row.date}</Table.Cell>
              <Table.Cell>{row.age}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default App;
