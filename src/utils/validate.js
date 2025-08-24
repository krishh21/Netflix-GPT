export const checkValidation = (email, password) => {
  let emailCheck = null;
  let passwordCheck = [];

  // Email Validation using RegEx (Regular Expression)
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    emailCheck = "Invalid Email, Please enter the correct Email";
  }

  // Password Validation:
  // Check if password is at least 8 characters long
  if (!password || password.length < 8) {
    passwordCheck.push("Password must be at least 8 characters long.");
  }

  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    passwordCheck.push("Password must contain at least one uppercase letter.");
  }

  // Check if password contains at least one special character
  if (!/[@$!%*?&]/.test(password)) {
    passwordCheck.push("Password must contain at least one special character.");
  }

  return {
    emailCheck,
    passwordCheck,
  };
};
