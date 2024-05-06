
export async function getItem(key, default_value) {
    return JSON.parse(localStorage.getItem(key)) ?? default_value
}

export async function setItem(key, params) {
    return localStorage.setItem(key, JSON.stringify(params))
}


export async function removeItem(key) {
    return localStorage.removeItem(key)
}

