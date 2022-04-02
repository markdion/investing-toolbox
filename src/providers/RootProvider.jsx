import { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const RootContext = createContext(null);

const initialState = {
  categories: new Map([
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
  ]),
  accounts: new Map([
    ["1", {
      name: "Account 1",
      amounts: {
        "1": 10000,
        "2": 5000,
        "3": 4000,
        "4": 8000,
        "5": 5000
      }
    }]
  ]),
  distribution: {
    "1": 40,
    "2": 15,
    "3": 25,
    "5": 20
  },
  contribution: 0
};

function categoriesReducer(state, action) {
  switch (action.type) {
    case 'addCategory': {
      const _state = {...state};
      const _categoryId = uuidv4();
      _state.categories.set(_categoryId, {
        name: "",
        isSuper: false,
        allocations: new Map()
      });
      const _accounts = _state.accounts;
      _accounts.forEach((value, accountId) => {
        _state.accounts.get(accountId).amounts[_categoryId] = 0;
      });
      return _state;
    }
    case 'changeCategoryName': {
      const _state = {...state};
      if (_state.categories.has(action.id)) {
        _state.categories.get(action.id).name = action.name;
      }
      return _state;
    }
    case 'toggleSuper': {
      const _state = {...state};
      if (_state.categories.has(action.id)) {
        _state.categories.get(action.id).isSuper = action.isSuper;
      }
      return _state;
    }
    case 'deleteCategory': {
      const _state = {...state};
      _state.categories.delete(action.id);
      const _accounts = _state.accounts;
      _accounts.forEach((value, accountId) => {
        delete _state.accounts.get(accountId).amounts[action.id];
      });
      return _state;
    }
    case 'addCategoryAllocation': {
      const _state = {...state};
      if (_state.categories.has(action.id)) {
        _state.categories.get(action.id).allocations.set(uuidv4(), {
          categoryId: "",
          percent: 0
        });
      }
      return _state;
    }
    case 'changeAllocationCategory': {
      const _state = {...state};
      if (_state.categories.has(action.categoryId) &&
          _state.categories.get(action.categoryId).allocations.has(action.allocationId)) {
        const _allocation = _state.categories.get(action.categoryId).allocations.get(action.allocationId);
        _allocation.categoryId = action.selectedCategoryId;
      }
      return _state;
    }
    case 'changeAllocationValue': {
      const _state = {...state};
      if (_state.categories.has(action.categoryId) &&
          _state.categories.get(action.categoryId).allocations.has(action.allocationId)) {
        const _allocation = _state.categories.get(action.categoryId).allocations.get(action.allocationId);
        _allocation.percent = action.value;
      }
      return _state;
    }
    case 'deleteCategoryAllocation': {
      const _state = {...state};
      if (_state.categories.has(action.categoryId) &&
          _state.categories.get(action.categoryId).allocations.has(action.allocationId)) {
        _state.categories.get(action.categoryId).allocations.delete(action.allocationId);
      }
      return _state;
    }
    case 'changeAccountName': {
      const _state = {...state};
      if (_state.accounts.has(action.id)) {
        _state.accounts.get(action.id).name = action.name;
      }
      return _state;
    }
    case 'changeAccountAmount': {
      const _state = {...state};
      if (_state.accounts.has(action.accountId)) {
        _state.accounts.get(action.accountId).amounts[action.categoryId] = action.amount;
      }
      return _state;
    }
    case 'addAccount': {
      const _state = {...state};
      const _accountId = uuidv4();
      _state.accounts.set(_accountId, {
        name: "",
        amounts: {}
      });
      Array.from(_state.categories).forEach(([categoryId, category], index) => {
        _state.accounts.get(_accountId).amounts[categoryId] = 0;
      });
      return _state;
    }
    case 'removeAccount': {
      const _state = {...state};
      _state.accounts.delete(action.accountId);
      return _state;
    }
    case 'changeDistribution': {
      const _state = {...state};
      _state.distribution[action.id] = action.amount;
      return _state;
    }
    case 'changeContributionAmount': {
      const _state = {...state};
      _state.contribution = action.amount;
      return _state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export default function RootProvider({children}) {
  const [state, dispatch] = useReducer(categoriesReducer, initialState);

  const value = {state, dispatch};
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>
}

export function useRootReducer() {
  const context = useContext(RootContext);
  if (context === undefined) {
    throw new Error('useRootReducer must be used within a RootProvider');
  }
  return context;
}