function checkLuhn(value) {
    const valueStr = String(value);
    let sum = 0;
    let shouldDouble = false;
    for (let i = valueStr.length - 1; i >= 0; i--) {
      let digit = parseInt(valueStr.charAt(i));
      
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) == 0;
}

export default checkLuhn;