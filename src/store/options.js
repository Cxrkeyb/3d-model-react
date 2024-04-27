import { create } from 'zustand';

const useOptionsStore = create((set) => ({
  selectedOption: '',
  validOptions: [
    { value: "LoftedBarn_6Wall_10x12_None_Wall1", label: "Wall 1" },
    { value: "LoftedBarn_6Wall_10x12_None_Wall2", label: "Wall 2" },
    { value: "LoftedBarn_6Wall_10x12_None_Wall3", label: "Wall 3" },
    { value: "LoftedBarn_6Wall_10x12_None_Wall4", label: "Wall 4" },
  ],
  setSelectedOption: (optionValue) => {
    set({ selectedOption: optionValue });
  },
}));

export default useOptionsStore;
