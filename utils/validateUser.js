function sanitize(string) {
  return string.trim()
}

module.exports = userData => {
  const nameRegExp = /[0-9A-Za-zА-Яа-я\s+-]/
  const loginRegExp = /^[a-z0-9]+$/
  const sanitizedName = sanitize(userData.name)
  const sanitizedLogin = sanitize(userData.login)

  if (!sanitizedName || typeof sanitizedName !== 'string' || !sanitizedName.match(nameRegExp)) {
    return 'Name can\'t be blank and must contain only latin, cyrillic letters and numbers'
  }
  if (!sanitizedLogin || typeof sanitizedLogin !== 'string' || !sanitizedLogin.match(loginRegExp)) {
    return 'Login must be unique and contain only lower case letters and numbers'
  }
  if (!userData.password || typeof userData.password !== 'string' || userData.password.length < 8) {
    return 'Password must be at least 8 characters'
  } 
  if (typeof userData.confirm_password !== 'string' || userData.password !== userData.confirm_password) {
    return 'Passwords don\'t match'
  } else {
    return 'Validated'
  }
}