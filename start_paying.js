function validateCard() {
  const cardNumber = document.getElementById('cardNumber').value.trim();
  const expDate = document.getElementById('expDate').value.trim();
  const cardHolder = document.getElementById('cardHolder').value.trim();
  const errorMsg = document.getElementById('error-msg');
  errorMsg.textContent = '';

  // Validate card number: digits only, 16 digits ignoring spaces
  const cardNumberClean = cardNumber.replace(/\s+/g, '');
  if (!/^\d{16}$/.test(cardNumberClean)) {
    errorMsg.textContent = 'Please enter a valid 16-digit card number.';
    return false;
  }

  // Validate expiration date MM/YY
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate)) {
    errorMsg.textContent = 'Expiration date must be in MM/YY format.';
    return false;
  }

  // Check if expiration date is in the future
  const [month, year] = expDate.split('/');
  const exp = new Date(`20${year}`, month); // 1st day of next month
  const now = new Date();
  if (exp <= now) {
    errorMsg.textContent = 'Card has expired.';
    return false;
  }

  // Validate card holder name (letters and spaces only, at least 2 characters)
  if (!/^[a-zA-Z\s]{2,}$/.test(cardHolder)) {
    errorMsg.textContent = 'Please enter a valid card holder name.';
    return false;
  }

  alert('Card is valid! Processing payment...');
  return true;
}