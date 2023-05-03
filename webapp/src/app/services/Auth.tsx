export const login = async (providerURL : String) => {
    window.location.href = "http://api.lomap.mariopdev.com/auth/login?providerURL=" + providerURL

}

export const logout = async () => {
    window.location.href = "http://api.lomap.mariopdev.com/auth/logout"
}