import axios from 'axios';
// Action Types
export const UPDATE_BASIC_SALARY = 'UPDATE_BASIC_SALARY';
export const UPDATE_EARNING_TITLE = 'UPDATE_EARNING_TITLE';
export const UPDATE_EARNING_AMOUNT = 'UPDATE_EARNING_AMOUNT';
export const ADD_EARNING = 'ADD_EARNING';
export const REMOVE_EARNING = 'REMOVE_EARNING';
export const TOGGLE_EPF_ETF = 'TOGGLE_EPF_ETF';
export const UPDATE_DEDUCTION_TITLE = 'UPDATE_DEDUCTION_TITLE';
export const UPDATE_DEDUCTION_AMOUNT = 'UPDATE_DEDUCTION_AMOUNT';
export const ADD_DEDUCTION = 'ADD_DEDUCTION';
export const REMOVE_DEDUCTION = 'REMOVE_DEDUCTION';
export const RESET_FORM = 'RESET_FORM';
export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA';




// Action Creators


export const updateFormData = (data) => ({
    type: UPDATE_FORM_DATA,
    payload: data
});


export const updateBasicSalary = (amount) => ({
    type: 'UPDATE_BASIC_SALARY',
    payload: amount
});

export const updateEarningTitle = (id, title) => ({
    type: 'UPDATE_EARNING_TITLE',
    payload: { id, title }
});

export const updateEarningAmount = (id, amount) => ({
    type: 'UPDATE_EARNING_AMOUNT',
    payload: { id, amount }
});

export const addEarning = () => ({
    type: 'ADD_EARNING'
});

export const removeEarning = (id) => ({
    type: 'REMOVE_EARNING',
    payload: id
});

export const toggleEPFETF = (id) => ({
    type: 'TOGGLE_EPFETF',
    payload: id
});

export const updateDeductionTitle = (id, title) => ({
    type: 'UPDATE_DEDUCTION_TITLE',
    payload: { id, title }
});

export const updateDeductionAmount = (id, amount) => ({
    type: 'UPDATE_DEDUCTION_AMOUNT',
    payload: { id, amount }
});

export const addDeduction = () => ({
    type: 'ADD_DEDUCTION'
});

export const removeDeduction = (id) => ({
    type: 'REMOVE_DEDUCTION',
    payload: id
});

export const resetForm = () => ({
    type: 'RESET_FORM'
});
