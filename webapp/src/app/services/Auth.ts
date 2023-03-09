export const login = async (providerURL : String) => {
    const loginURL = await fetch('http://127.0.0.1:8082/auth/login',{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: "include",
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({provider: providerURL })
    })
    window.location.href = await loginURL.json(); //Redirect to provider auth
}


export const confirmLogin =  (params : String) => {
    return fetch("http://127.0.0.1:8082/auth/loginconfirm"+params, {
        credentials: "include",
        method: "POST"
    })
}