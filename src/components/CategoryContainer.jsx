import { Box, Button } from "@mui/material";
import { useState } from "react";
import Category from "./Category";
import { v4 as uuidv4 } from "uuid";


export default function CategoryContainer() {

  const [categories, setCategories] = useState(new Map([
    ["1", {
      name: "US",
      isSuper: false,
      allocations: new Map()
    }],
    ["2", {
      name: "Canada",
      isSuper: false,
      allocations: new Map()
    }],
    ["3", {
      name: "International",
      isSuper: false,
      allocations: new Map()
    }],
    ["4", {
      name: "Total Market ETF",
      isSuper: true,
      allocations: new Map([
        ["11", {
          categoryId: "1",
          percent: 40
        }],
        ["22", {
          categoryId: "2",
          percent: 30
        }],
        ["33", {
          categoryId: "3",
          percent: 30
        }],
      ])
    }],
    ["5", {
      name: "Bonds",
      isSuper: false,
      allocations: new Map()
    }],
  ]));

  const addCategory = () => {
    const _categories = new Map(categories);
    _categories.set(uuidv4(), {
      name: "",
      isSuper: false,
      allocations: new Map()
    });
    setCategories(_categories);
  }

  const onChangeCategoryName = (id, name) => {
    const _categories = new Map(categories);
    if (_categories.has(id)) {
      const _category = _categories.get(id);
      _category.name = name;
      _categories.set(id, _category);
      setCategories(_categories);
    }
  }

  const onToggleSuper = (id, checked) => {
    const _categories = new Map(categories);
    if (_categories.has(id)) {
      const _category = _categories.get(id);
      _category.isSuper = checked;
      _categories.set(id, _category);
      setCategories(_categories);
    }
  }

  const deleteCategory = (id) => {
    const _categories = new Map(categories);
    const success = _categories.delete(id);
    if (success) {
      setCategories(_categories);
    }
  }

  const addCategoryAllocation = (id) => {
    const _categories = new Map(categories);
    if (_categories.has(id)) {
      const _category = _categories.get(id);
      const _allocations = new Map(_category.allocations);
      _allocations.set(uuidv4(), {
        categoryId: "",
        percent: 0
      });
      _category.allocations = _allocations;
      _categories.set(id, _category);
      setCategories(_categories);
    }
  }

  const deleteCategoryAllocation = (categoryId, allocationId) => {
    const _categories = new Map(categories);
    if (_categories.has(categoryId)) {
      const _category = _categories.get(categoryId);
      const _allocations = new Map(_category.allocations);
      const success = _allocations.delete(allocationId);
      if (success) {
        _category.allocations = _allocations;
        _categories.set(categoryId, _category);
        setCategories(_categories);
      }
    }
  }

  const onChangeAllocationCategorySelected = (categoryId, allocationId, selectedCategoryId) => {
    const _categories = new Map(categories);
    if (_categories.has(categoryId)) {
      const _category = _categories.get(categoryId);
      const _allocations = new Map(_category.allocations);
      const _allocation = _allocations.get(allocationId);
      _allocation.categoryId = selectedCategoryId;
      _allocations.set(allocationId, _allocation);
      _category.allocations = _allocations;
      _categories.set(categoryId, _category);
      setCategories(_categories);
    }
  }

  const onChangeAllocationValue = (categoryId, allocationId, value) => {
    const _categories = new Map(categories);
    if (_categories.has(categoryId)) {
      const _category = _categories.get(categoryId);
      const _allocations = new Map(_category.allocations);
      const _allocation = _allocations.get(allocationId);
      _allocation.percent = value;
      _allocations.set(allocationId, _allocation);
      _category.allocations = _allocations;
      _categories.set(categoryId, _category);
      setCategories(_categories);
    }
  }

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "column",
      width: "100%"
    }}>
      <Button
        sx={{ margin: "1rem 0", width: "fit-content" }}
        variant="contained"
        onClick={addCategory}>
        Add Category
      </Button>
      <Box sx={{
        width: "100%"
      }}>
        {categories &&
          Array.from(categories).map(([categoryId, category], index) => (
            <Category
              key={categoryId}
              categoryId={categoryId}
              category={category}
              onChangeName={onChangeCategoryName}
              onToggleSuper={onToggleSuper}
              deleteCategory={deleteCategory}
              addCategoryAllocation={addCategoryAllocation}
              onChangeAllocationCategorySelected={onChangeAllocationCategorySelected}
              onChangeAllocationValue={onChangeAllocationValue}
              onDeleteAllocation={deleteCategoryAllocation}
              allCategories={
                new Map(Array.from(categories).filter((c) => c[0] !== categoryId))
              }
            />
          ))}
      </Box>
    </Box>
  )
}