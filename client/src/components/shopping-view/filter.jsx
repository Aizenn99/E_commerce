import { filterOptions } from "@/config";
import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const ProductFilter = ({ Filters, handlefilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem}>
            <h3 className="text-base font-medium">{keyItem}</h3>
            <div className="grid gap-2 mt-2">
              {filterOptions[keyItem].map((option) => (
                <Label
                  key={option.id}
                  className="flex items-center gap-2 font-normal"
                >
                  <Checkbox
                    checked={
                      Filters &&
                      Object.keys(Filters).length > 0 &&
                      Filters[keyItem] &&
                      Filters[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handlefilter(keyItem, option.id)}
                  />
                  {option.label}
                </Label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
