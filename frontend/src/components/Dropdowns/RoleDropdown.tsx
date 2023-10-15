import { Select } from "chakra-react-select";
import React, { useEffect, useState } from "react";
import RoleRes from "../../models/User/RoleRes";
import { UserApi } from "../../api/UserApi";

interface RoleDropdownParams {
  handleChange?: any;
  selectedRole?: RoleRes;
}

const RoleDropdown = ({ handleChange, selectedRole }: RoleDropdownParams) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<RoleRes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCountries = () => {
    setIsLoading(true);
    UserApi.getAllRoles()
      .then((res) => {
        setItems(res);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCountries();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <Select
      getOptionLabel={(c) => c.roleName || ""}
      getOptionValue={(c) => c.roleName || ""}
      options={items}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isClearable={true}
      placeholder="Select role..."
      isLoading={isLoading}
      value={selectedRole}
    ></Select>
  );
};

export default RoleDropdown;
