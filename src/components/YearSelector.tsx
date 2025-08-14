
import Select from './form/Select';
import { useYear } from '@/context/YearContext';

const optionsSelect = [
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
  ];
  
  export const YearSelector = () => {
    const {  setYear } = useYear();
    const handleChangeYear = (value: string) => {
        setYear(value);
    }

    return (
    <Select 
        placeholder="Seleccione año a consultar"
        options={optionsSelect}
        className="dark:bg-dark-900"
        onChange={handleChangeYear}
    />
    )
  }
  