function validateCard() {
  const cardNumberRaw = document.getElementById('cardNumber').value;
  const expDateRaw = document.getElementById('expDate').value;
  const cardHolderRaw = document.getElementById('cardHolder').value;
  const errorMsg = document.getElementById('error-msg');
  errorMsg.textContent = '';

  const cardNumber = cardNumberRaw.replace(/\s+/g, '').trim();
  const expDate = expDateRaw.trim();
  const cardHolder = cardHolderRaw.trim();

  // Validate card number: digits only, 16 digits, and Luhn check
  if (!/^\d{16}$/.test(cardNumber) || !luhnCheck(cardNumber)) {
    errorMsg.textContent = 'Please enter a valid 16-digit card number.';
    return false;
  }

  // Validate expiration date format MM/YY
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate)) {
    errorMsg.textContent = 'Expiration date must be in MM/YY format.';
    return false;
  }

  // Check if expiration date is in the future
  const [month, year] = expDate.split('/');
  const expDateObj = new Date(2000 + parseInt(year), parseInt(month), 0); // Last day of the month
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignore time part

  if (expDateObj < today) {
    errorMsg.textContent = 'Card has expired.';
    return false;
  }

  // Validate card holder name
  if (!/^[a-zA-Z\s]{2,}$/.test(cardHolder)) {
    errorMsg.textContent = 'Please enter a valid card holder name.';
    return false;
  }

  alert('Card is valid! Processing payment...');
  return true;
}

// Optional: Luhn algorithm for card number validation
function luhnCheck(num) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}
