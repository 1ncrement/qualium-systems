/**
 * Created by user on 31.08.2016.
 */
import {NEWS_SET,NEWS_REMOVE} from '../constants/newsConst'

const initialState = {
	page: 1
};

export default function (state = initialState, action) {
	switch(action.type){
		case NEWS_SET:
			return action.payload;
		case NEWS_REMOVE:
			return state;
		default:
			return state;
	}
}