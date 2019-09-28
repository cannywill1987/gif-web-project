import {combineReducers} from 'redux-immutable';
import {reducer as questionReducer} from '../pages/home/redux';


//这个questions在page里面获取的话因为已经分级了 所以增加questions
const reducer = combineReducers({
    questions: questionReducer
})

export default reducer;