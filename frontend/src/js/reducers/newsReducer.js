/**
 * Created by user on 31.08.2016.
 */
import {NEWS_ADD,NEWS_SET,NEWS_REMOVE,NEWS_GET_ERR,NEWS_EDIT,NEWS_EDIT_ERR} from '../constants/newsConst'

const initialState = {
	page: 1
};

export default function (state = initialState, action) {
	switch(action.type){
		case NEWS_ADD:
			let state2 = state.docs.slice();
			state2.unshift(action.payload);
			return {...state,
				docs: state2
			};
		case NEWS_EDIT:
			return state;
		case NEWS_EDIT_ERR:
			return state;
		case NEWS_SET:
			return action.payload;
		case NEWS_GET_ERR:
			return {err: action.payload};
		case NEWS_REMOVE:
			return {...state,
				docs: state.docs.filter(news => news._id != action.payload)
			};
		default:
			return state;
	}
}