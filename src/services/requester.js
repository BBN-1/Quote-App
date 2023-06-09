const request = async (method, url, data) => {
    try {
        let buildRequest;

        let authData = localStorage.getItem("auth");

        let auth;

        //parse auth data from local storage
        if (authData) {
            auth = JSON.parse(authData);
        }

        let headers = {};

        //add access token to headers if user is logged in
        if (auth && auth.accessToken) {
            headers["X-Authorization"] = auth.accessToken;
        }

        if (method === "GET") {
            buildRequest = fetch(url, { headers });
        } else {
            buildRequest = fetch(url, {
                method: method,
                headers: {
                    ...headers,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }

        const response = await buildRequest;

        
        
        //handle access token expiration ( Forbidden 403 error ) on server restart
        if (response.status === 403) {
            localStorage.removeItem("auth");
        }

        

        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
    }
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const patch = request.bind({}, "PATCH");
export const put = request.bind({}, "PUT");
export const del = request.bind({}, "DELETE");
