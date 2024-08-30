const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  try {
    // Providing anything that is NaN should crash the programme
    if (isNaN(dividend) || isNaN(divider)) {
      throw new Error("Non-numeric input provided");
    }

    const dividendNumber = parseFloat(dividend);
    const dividerNumber = parseFloat(divider);

    // Validation when there are no values entered
    if (!dividend || !divider) {
      result.innerText = "Division not performed. Both values are required in inputs. Try again";
      return;
    }

    // An invalid division should log an error in the console
    if (dividerNumber === 0) {
      console.error(new Error("Division by zero"));
      result.innerText = "Division not performed. Invalid number provided. Try again";
      return;
    }

    const divisionResult = dividendNumber / dividerNumber;

    // Dividing numbers result in a whole number or decimal number
    if (Number.isInteger(divisionResult)) {
      result.innerText = divisionResult;
    } else {
      result.innerText = Math.floor(divisionResult);
    }

  } catch (error) {
    // Handling non-numerical inputs (critical error) - eg. Words or spaces
    console.error(error);
    document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page.</h1>";
  }
});