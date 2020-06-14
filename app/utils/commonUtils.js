import history from "./history";

export function errorHandler(error) {
	let message = '';
	if (error.response) {
		if (error.response.status === 401) {
			message = error.response.data.message;
		} else if (error.response.status === 400) {
			message = error.response.data.message;
		} else if (error.response.status === 403) {
			history.push("/error403")
		} else if (error.response.status === 404) {
			history.push("/error404")
		} else {
			message = error.response.data.message;
		}
	} else {
		console.log("error", error)
	}
	return message
}


    // getHeaders = () => {
  // 	let auth = `Bearer ${window.location.host.split('.')[0] === 'app' ? sessionStorage.token : localStorage.token}`;
  // 	return {
  // 		headers: {
  // 			'X-Authorization': auth,
  // 			'x-project-id': localStorage.selectedProjectId
  // 		}
  // 	}
  // }