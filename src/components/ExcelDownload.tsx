import * as XLSX from 'xlsx';
import { Button } from 'flowbite-react';

type IData = {
  athlete: string;
  sport: string;
  year: number;
  country: string;
  date: string;
  age: number;
};

type IProps = {
  data: IData[];
  fileName: string;
  selectedFromYear: number | null;
  selectedToYear: number | null;
};

export const ExcelDownloadButton = ({
  data,
  fileName,
  selectedFromYear,
  selectedToYear,
}: IProps) => {
  const handleExcelDownload = () => {
    const workbook = XLSX.utils.book_new();

    if (selectedFromYear !== null && selectedToYear !== null) {
      for (let year = selectedFromYear; year <= selectedToYear; year++) {
        const yearData = data.filter((item) => item.year === year);

        // Check if there is data for the current year
        if (yearData.length > 0) {
          const worksheet = XLSX.utils.json_to_sheet(yearData);
          XLSX.utils.book_append_sheet(workbook, worksheet, `Year ${year}`);
        }
      }
    } else {
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'All Year');
    }

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleExcelDownload}>Export</Button>;
};
