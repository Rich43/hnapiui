import {
    BULK_INSERT_ID_TYPE,
    DISPLAY_TYPE,
    INSERT_ID_TYPE,
    UPDATE_COMMENT_TYPE,
    UPDATE_DISPLAYED_DATA_TYPE
} from "../actions";

export const initialState = {counter: 0, lastInsertStart: 0, lastDisplayIndex: 0, displayedData: [], data: [], comments: {}};

const defaultReducer = (state = initialState, action) => {
    const newState = {...state, data: state.data.slice()};
    newState.lastInsertStart = newState.counter;
    switch (action.type) {
        case DISPLAY_TYPE:
            newState.displayedData = newState.displayedData.concat(newState.data.slice(0, action.count));
            newState.data = newState.data.slice(action.count);
            newState.lastDisplayIndex = newState.displayedData.length ? newState.displayedData[newState.displayedData.length - 1].id : 0;
            return newState;
        case UPDATE_DISPLAYED_DATA_TYPE:
            const displayedDataIndex = newState.displayedData.findIndex(row => row.id === action.id);
            if (displayedDataIndex === -1) {
                console.error(`Could not find ${action.id}`);
                return state;
            }
            newState.displayedData[displayedDataIndex] = {...newState.displayedData[displayedDataIndex], loading: false, data: action.data};
            return newState;
        case UPDATE_COMMENT_TYPE:
            newState.comments[action.id] = action.data;
            return newState;
        case INSERT_ID_TYPE:
            newState.data.push({index: newState.counter, id: action.id, loading: true, data: {}});
            newState.counter++;
            return newState;
        case BULK_INSERT_ID_TYPE:
            for (const row of action.data) {
                newState.data.push({index: newState.counter, id: row, loading: true, data: {}});
                newState.counter++;
            }
            return newState;
        default:
            return state;
    }
}

export default defaultReducer;
