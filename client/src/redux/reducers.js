import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    SAVE_DATA_REQUEST,
    SAVE_DATA_SUCCESS,
    SAVE_DATA_FAILURE,
  
} from './action';


const initialState = {
    basicSalary: '',
    earnings: [],
    deductions: [],
    loading: false,
    error: null,
    saveSuccess: false
};

function salaryReducer(state = initialState, action) {
    switch (action.type) {


        case FETCH_DATA_REQUEST:
            case SAVE_DATA_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: null
                };
            case FETCH_DATA_SUCCESS:
                return {
                    ...state,
                    basicSalary: action.payload.basicSalary,
                    earnings: action.payload.earnings,
                    deductions: action.payload.deductions,
                    loading: false
                };
            case FETCH_DATA_FAILURE:
            case SAVE_DATA_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };
            case SAVE_DATA_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    saveSuccess: true
                };

        case 'UPDATE_BASIC_SALARY':
            return { ...state, basicSalary: action.payload };
        case 'UPDATE_EARNING_TITLE':
            return {
                ...state,
                earnings: state.earnings.map(earning =>
                    earning.id === action.payload.id ? { ...earning, title: action.payload.title } : earning
                )
            };
        case 'UPDATE_EARNING_AMOUNT':
            return {
                ...state,
                earnings: state.earnings.map(earning =>
                    earning.id === action.payload.id ? { ...earning, amount: action.payload.amount } : earning
                )
            };
        case 'ADD_EARNING':
            return {
                ...state,
                earnings: [...state.earnings, { id: Date.now(), title: '', amount: '', epfEtf: false }]
            };
        case 'REMOVE_EARNING':
            return {
                ...state,
                earnings: state.earnings.filter(earning => earning.id !== action.payload)
            };
        case 'TOGGLE_EPFETF':
            return {
                ...state,
                earnings: state.earnings.map(earning =>
                    earning.id === action.payload ? { ...earning, epfEtf: !earning.epfEtf } : earning
                )
            };
        case 'UPDATE_DEDUCTION_TITLE':
            return {
                ...state,
                deductions: state.deductions.map(deduction =>
                    deduction.id === action.payload.id ? { ...deduction, title: action.payload.title } : deduction
                )
            };
        case 'UPDATE_DEDUCTION_AMOUNT':
            return {
                ...state,
                deductions: state.deductions.map(deduction =>
                    deduction.id === action.payload.id ? { ...deduction, amount: action.payload.amount } : deduction
                )
            };
        case 'ADD_DEDUCTION':
            return {
                ...state,
                deductions: [...state.deductions, { id: Date.now(), title: '', amount: '', epfEtf: false }]
            };
        case 'REMOVE_DEDUCTION':
            return {
                ...state,
                deductions: state.deductions.filter(deduction => deduction.id !== action.payload)
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
}

export default salaryReducer;
