const initialState = {
    test: 'Hello redux'
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'CONSOLE_LOG':
             return {
                ...state,
                test: 'false'
             }
        default: 
            return state;   

    }
}

export default reducer; 


