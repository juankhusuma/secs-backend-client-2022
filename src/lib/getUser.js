import config from "../../config.json"

export default function getUser() {
    return localStorage.getItem("auth-token") ?  fetch(config.url, { headers: { "Authorization": "Bearer " + localStorage.getItem("auth-token") } })
        .then(res => res.json())
        .then(res => res.data)
        .catch(() => null)
        : null
}