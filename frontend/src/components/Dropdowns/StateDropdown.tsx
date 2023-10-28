import { Select } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import { StateRes, StateSearchReq } from "../../models/Country";
import { StateApi } from "../../api";

interface StateDropdownParams {
  handleChange?: any;
  selectedState?: StateRes;
}

const StateDropdown = ({
  handleChange,
  selectedState,
}: StateDropdownParams) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<StateRes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadStates = () => {
    setIsLoading(true);
    StateApi.search(new StateSearchReq({ searchText: inputValue }, {}))
      .then((res) => {
        // console.log(res.pagedList);
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStates();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <Select
      getOptionLabel={(c) => c.stateName + ", " + c.country?.countryName || ""}
      getOptionValue={(c) => c.stateId || ""}
      options={items}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isClearable={true}
      placeholder="Select state..."
      isLoading={isLoading}
      value={selectedState}
    ></Select>
  );
};

export default StateDropdown;
