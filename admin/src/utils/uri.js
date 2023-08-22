
const urlParams = new URLSearchParams(window.location.search)

export const getUriParam = name => urlParams.get(name)