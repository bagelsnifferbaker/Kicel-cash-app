document.getElementById('payment-form').addEventListener('submit', validateCard);

function validateCard(event) {
  event.preventDefault(); // This is crucial!

  const cardNumberRaw = document.getElementById('cardNumber').value;
  const expDateRaw = document.getElementById('expDate').value;
  const cardHolderRaw = document.getElementById('cardHolder').value;
  const errorMsg = document.getElementById('error-msg');
  errorMsg.textContent = '';

  const cardNumber = cardNumberRaw.replace(/\s+/g, '').trim();
  const expDate = expDateRaw.trim();
  const cardHolder = cardHolderRaw.trim();

  if (!/^\d{16}$/.test(cardNumber) || !luhnCheck(cardNumber)) {
    errorMsg.textContent = 'Please enter a valid 16-digit card number.';
    return;
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate)) {
    errorMsg.textContent = 'Expiration date must be in MM/YY format.';
    return;
  }

  const [month, year] = expDate.split('/');
  const expDateObj = new Date(2000 + parseInt(year), parseInt(month), 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (expDateObj < today) {
    errorMsg.textContent = 'Card has expired.';
    return;
  }

  if (!/^[a-zA-Z\s]{2,}$/.test(cardHolder)) {
    errorMsg.textContent = 'Please enter a valid card holder name.';
    return;
  }

  alert('Card is valid! Processing payment...');
}

// Luhn Check Function
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
