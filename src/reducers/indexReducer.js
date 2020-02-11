const req = require.context('../../public/img', false, /.*\.jpg$/)

const initialState = {
  image_lists: []
};

req.keys().forEach(function(key,indx) {
	initialState['image_lists'][indx+1+'jpg'] = {
		name:"",
		src:req(key),
		description:""
	};
});

export default (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_IMAGE_DETAIL':
			let image_lists = state.image_lists
			image_lists[action.payload.id] = {
				...image_lists[action.payload.id],
				name:action.payload.name,
				description:action.payload.description
			}
			return {
				...state,
				image_lists
			}
		default:
			return state

	}
}