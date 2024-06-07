// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import Calculator from './Calculator';
// import * as actions from '../redux/action';

// // Mocking localStorage
// const localStorageMock = (() => {
//   let store = {};
//   return {
//     getItem: (key) => store[key] || null,
//     setItem: (key, value) => {
//       store[key] = value.toString();
//     },
//     clear: () => {
//       store = {};
//     },
//   };
// })();
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// const mockStore = configureStore([]);

// describe('Calculator Component', () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore({
//       basicSalary: 0,
//       earnings: [],
//       deductions: [],
//     });
//     localStorageMock.clear();
//   });

//   test('renders Calculator component correctly', () => {
//     render(
//       <Provider store={store}>
//         <Calculator />
//       </Provider>
//     );
//     expect(screen.getByText(/Calculate Your Salary/i)).toBeInTheDocument();
//   });

//   test('handles basic salary input change', () => {
//     render(
//       <Provider store={store}>
//         <Calculator />
//       </Provider>
//     );
//     const input = screen.getByPlaceholderText('Amount');
//     fireEvent.change(input, { target: { value: '50000' } });
//     expect(actions.updateBasicSalary).toHaveBeenCalledWith(50000);
//   });

//   test('handles adding a new earning', () => {
//     render(
//       <Provider store={store}>
//         <Calculator />
//       </Provider>
//     );
//     const addButton = screen.getByText('+ Add New Allowance');
//     fireEvent.click(addButton);
//     expect(actions.addEarning).toHaveBeenCalled();
//   });

//   test('handles removing an earning', () => {
//     store = mockStore({
//       basicSalary: 0,
//       earnings: [{ id: 1, title: 'Allowance', amount: 5000, epfEtf: false }],
//       deductions: [],
//     });
//     render(
//       <Provider store={store}>
//         <Calculator />
//       </Provider>
//     );
//     const removeButton = screen.getByAltText('remove');
//     fireEvent.click(removeButton);
//     expect(actions.removeEarning).toHaveBeenCalledWith(1);
//   });

//   test('handles toggling EPF/ETF', () => {
//     store = mockStore({
//       basicSalary: 0,
//       earnings: [{ id: 1, title: 'Allowance', amount: 5000, epfEtf: false }],
//       deductions: [],
//     });
//     render(
//       <Provider store={store}>
//         <Calculator />
//       </Provider>
//     );
//     const checkbox = screen.getByRole('checkbox');
//     fireEvent.click(checkbox);
//     expect(actions.toggleEPFETF).toHaveBeenCalledWith(1);
//   });

//   test('calculates total earnings correctly', () => {
//     store = mockStore({
//       basicSalary: 50000,
//       earnings: [
//         { id: 1, title: 'Allowance', amount: 10000, epfEtf: true },
//         { id: 2, title: 'Bonus', amount: 5000, epfEtf: false },
//       ],
//       deductions: [],
//     });
//     render(
//       <Provider store={store}>
//         <Calculator />
//       </Provider>
//     );
//     expect(screen.getByText(/Gross Earning/i)).toBeInTheDocument();
//     expect(screen.getByText(/65,000.00/i)).toBeInTheDocument();
//   });

//   test('calculates gross deduction correctly', () => {
//     store = mockStore({
//       basicSalary: 50000,
//       earnings: [],
//       deductions: [
//         { id: 1, title: 'Loan', amount: 10000 },
//         { id: 2, title: 'Advance', amount: 5000 },
//       ],
//     });
//     render(
//       <Provider store={store}>
//         <Calculator />
//       </Provider>
//     );
//     expect(screen.getByText(/Gross Deduction/i)).toBeInTheDocument();
//     expect(screen.getByText(/-15,000.00/i)).toBeInTheDocument();
//   });

//   test('saves to localStorage on formData change', () => {
//     render(
//       <Provider store={store}>
//         <Calculator />
//       </Provider>
//     );
//     const input = screen.getByPlaceholderText('Amount');
//     fireEvent.change(input, { target: { value: '50000' } });
//     expect(localStorage.getItem('formData')).toContain('"basicSalary":50000');
//   });

//   test('loads from localStorage on component mount', () => {
//     localStorage.setItem(
//       'formData',
//       JSON.stringify({
//         basicSalary: 60000,
//         earnings: [],
//         deductions: [],
//       })
//     );
//     render(
//       <Provider store={store}>
//         <Calculator />
//       </Provider>
//     );
//     expect(screen.getByPlaceholderText('Amount').value).toBe('60000');
//   });

//   test('handles form reset', () => {
//     store = mockStore({
//       basicSalary: 50000,
//       earnings: [
//         { id: 1, title: 'Allowance', amount: 10000, epfEtf: true },
//       ],
//       deductions: [
//         { id: 1, title: 'Loan', amount: 5000 },
//       ],
//     });
//     render(
//       <Provider store={store}>
//         <Calculator />
//       </Provider>
//     );
//     const resetButton = screen.getByText(/Reset/i);
//     fireEvent.click(resetButton);
//     expect(actions.resetForm).toHaveBeenCalled();
//   });
// });
