import useOptionsStore from "../store/options";

const Dropdown = () => {
  const { validOptions, selectedOption, setSelectedOption } = useOptionsStore();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="relative m-5">
      <label htmlFor="wallSelect" className="mr-2 text-lg text-white">
        Choose a Wall:
      </label>
      <select
        id="wallSelect"
        className="p-2 text-lg rounded-md border border-gray-300 bg-gray-100"
        value={selectedOption}
        onChange={handleChange}
      >
        {/* default option */}
        <option value="" disabled>
          Select a wall
        </option>
        {validOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
