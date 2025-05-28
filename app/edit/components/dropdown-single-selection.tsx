import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

export default function DropdownSingleSelection() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Select Role"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="w-full h-[50px] capitalize text-sm justify-start bg-white" variant="bordered">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
      >
        <DropdownItem key="DEV">DEV</DropdownItem>
        <DropdownItem key="AE">AE</DropdownItem>
        <DropdownItem key="GA">GA</DropdownItem>
        <DropdownItem key="CT">CT</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}