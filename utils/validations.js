// Check if the email and password format is correct using helper functions

module.exports.isValidEmail = (email) => {
  // Check that the email address provided has the standard format
  // 'username@domain.extension'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // ^ - Means the beginning of the text string
  // [^\s@]+ – Represents one or more characters that are neither white space nor the @ symbol
  // @: Menas that the @ symbol should appear
  // [^\s@]+ – Represents one or more characters that are neither white space nor the @ symbol
  // \.: Means that a period (.) should appear
  // [^\s@]+ – Represents one or more characters that are neither white space nor the @ symbol
  // $: this indicates the end of the text string

  // Validate the format of the email address provided, ensuring that it contains
  // the necessary characters to be considered a valid one
  return emailRegex.test(email);
};

module.exports.isValidPassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:<,.>?/\\[\]|~]).{8,}$/;
  // ^ - beginning of the text string
  // (?=.*\d): ensures that the password contains at leasst one digit
  // (?=.*[a-z]): the password should contain at least one lowercase letter
  // (?=.*[A-Z]): the password should contain at least one uppercase letter
  // (?=.*[!@#$%^&*()\-_=+{};:<,.>?/\\[\]|~]): password should contain at least one special character
  // .{8,} – ensures that the password length is at least 8 characters

  // Validate that password meets the requirements defined in the passwordRegex
  return passwordRegex.test(password);
};
