import {createSlice} from '@reduxjs/toolkit';
import initialEmployees from './employees.json';

const initialState = {
  employees: initialEmployees,
  currentPage: 1,
  pageSize: 9,
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const {id, ...updatedData} = action.payload;
      const index = state.employees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...updatedData,
        };
      }
    },
    deleteEmployee: (state, action) => {
      const id = action.payload;
      state.employees = state.employees.filter((emp) => emp.id !== id);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setCurrentPage,
  setPageSize,
} = employeeSlice.actions;

export default employeeSlice.reducer;

export const selectCurrentPage = (state) => state.employee.currentPage;
export const selectPageSize = (state) => state.employee.pageSize;
export const selectTotalCount = (state) => state.employee.employees.length;
export const selectVisibleEmployees = (state) => {
  const {employees, currentPage, pageSize} = state.employee;
  const start = (currentPage - 1) * pageSize;
  return employees.slice(start, start + pageSize);
};
export const selectEmployeeById = (state, id) =>
  state.employee.employees.find((emp) => emp.id === id);
