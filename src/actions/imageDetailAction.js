export const imageDetailAction = (params) => dispatch => {
	dispatch({
		type:"UPDATE_IMAGE_DETAIL",
		payload:params
	})
}