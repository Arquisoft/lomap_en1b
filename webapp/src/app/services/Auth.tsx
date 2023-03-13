export const login = async (providerURL : String) => {
    window.location.href = "http://localhost:8082/auth/login?providerURL=" + providerURL
}