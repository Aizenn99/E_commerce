import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop-slice/products-slice";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [Filters, setFilters] = useState({});
  const [sort, setsort] = useState(null);
  const [SearchParams, setsearchparams] = useSearchParams();
  const [OpenDetailsDialog, setOpenDetailsDialog] = useState(false);

  //CREATE PARAM SEARCH

  function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const key in filterParams) {
      if (Array.isArray(filterParams[key]) && filterParams[key].length > 0) {
        const paramValue = filterParams[key].join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParams.join("&");
  }

  //handle sort

  function handleSort(value) {
    setsort(value);
  }

  // handlefilter

  function handlefilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...Filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    // setting that in checkbox it will be in same array now

    setFilters(cpyFilters);
    sessionStorage.setItem("Filters", JSON.stringify(cpyFilters));
  }

  //handle product details

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
    setOpenDetailsDialog(true);
  }

  //use effect

  useEffect(() => {
    setsort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("Filters")) || {});
  }, []);

  useEffect(() => {
    if (Filters && Object.keys(Filters).length > 0) {
      const createQueryString = createSearchParamsHelper(Filters);
      setsearchparams(new URLSearchParams(createQueryString));

      console.log(Filters, SearchParams.toString(), "Filters");
    }
  }, [Filters]);

  useEffect(() => {
    if (Filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: Filters, sortParams: sort })
      );
  }, [dispatch, sort, Filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  //mainnnn

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 ">
      <ProductFilter Filters={Filters} handlefilter={handlefilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex  items-center justify-between">
          <h2 className="text-lg font-medium">All Products</h2>
          <div className="flex items-center gap-3 ">
            <span className="text-muted-foreground ">
              {productList?.length} Products{" "}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown />
                  <span>Sort By </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  key={productItem.id}
                  product={productItem}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={OpenDetailsDialog}
        setopen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingListing;
