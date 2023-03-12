export const login = async (providerURL : String) => {
    window.location.href = "http://localhost:8082/auth/login?providerURL=" + providerURL
}


export const confirmLogin =  (params : String) => {
    return fetch("http://127.0.0.1:8082/auth/loginconfirm"+params, {
        credentials: "include",
        method: "GET"
    })
}