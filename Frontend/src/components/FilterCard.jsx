import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const filterData = [
  {
    filterType: "Location",
    array: ["Gurgaon", "Banglore", "Pune", "Mumbai", "Hyderabad"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["8-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = ({ onFilterChange }) => {
  return (
    <div className="w-full bg-white p-3 rounded-md flex flex-col items-center">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="w-full my-3 border-gray-300" />

      <RadioGroup onValueChange={onFilterChange}>
        {filterData.map((data, index) => (
          <div key={data.filterType} className="flex flex-col gap-1">
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
