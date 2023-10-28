import React from "react";
import { AddressRes } from "../../models/Address";
import { Text } from "@chakra-ui/react";

interface AddressBlockParams {
  address?: AddressRes;
}

const AddressBlock = (p: AddressBlockParams) => {
  return (
    <div>
      <Text>{p.address?.fullName}</Text>
      <Text>{p.address?.phone}</Text>
      <Text>{p.address?.address1}</Text>
      <Text>{p.address?.address2}</Text>
      <Text>{p.address?.city}</Text>
      <Text>
        {p.address?.state?.stateName +
          ", " +
          p.address?.state?.country?.countryName}
      </Text>
    </div>
  );
};

export default AddressBlock;
