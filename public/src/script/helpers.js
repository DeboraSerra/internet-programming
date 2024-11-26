export function validatePassword(password) {
  /**
   * first rule: 8 characters long at least.
   * Second rule: At least 1 special characters.
   * Third rule: One Caps letter.
   * Forth rule: One lower case letter.
   * Fifth rule: Require a number.
   */
  if (/\s/g.test(password)) {
    return false;
  }
  const specialCharacterRegex = /\W/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const numberRegex = /\d/;

  const urlRegex =
    /[(http(s)?)?://(www\.)?a-zA-Z0-9@:%\._+~#=]{2,256}\.[a-z]{2,6}\b([-\d@:%_+\.~#?&//=]*)/gi;
  const scriptRegex = /<[^>]+>/g;
  if (urlRegex.test(password) || scriptRegex.test(password)) {
    return false;
  }

  return (
    password.length >= 8 &&
    specialCharacterRegex.test(password) &&
    upperCaseRegex.test(password) &&
    lowerCaseRegex.test(password) &&
    numberRegex.test(password)
  );
}

export function validateEmail(email) {
  const charactersAllowed = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return charactersAllowed.test(email);
}

export function maskPhone(phone) {
  const newPhone = phone
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  return newPhone;
}
