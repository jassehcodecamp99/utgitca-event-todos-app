const signUpFormEl = document.querySelector("#sign-up-form") as HTMLFormElement;
const fullNameInpuEl = document.querySelector(
  "#fullname-field"
) as HTMLInputElement;
const emailInputEl = document.querySelector("#email-field") as HTMLInputElement;
const passwordInputEl = document.querySelector(
  "#password-field"
) as HTMLInputElement;

const confirmPasswordInputEl = document.querySelector(
  "#confirm-password-field"
) as HTMLInputElement;

const signUpButton = document.querySelector(
  "#signup-button"
) as HTMLButtonElement;

const errorStateEl = document.querySelector(
  "#error-state"
) as HTMLParagraphElement;

async function handleSignUP(event?: any) {
  event.preventDefault();

  signUpButton.textContent = "Loading...";
  signUpButton.disabled = true;
  signUpButton.classList.remove("cursor-pointer");
  signUpButton.classList.add("cursor-not-allowed");
  signUpButton.classList.add("animate-pulse");

  try {
    const response = await fetch(
      "https://jcc-utgitca-todos-app-backend.laravel.cloud/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fullNameInpuEl.value.trim(),
          email: emailInputEl.value.trim(),
          password: passwordInputEl.value.trim(),
          password_confirmation: confirmPasswordInputEl.value.trim(),
        }),
      }
    );

    console.log(response);
    const data = await response.json();

    if (!response.ok) {
      errorStateEl.textContent = await data.message;
    }

    console.log("data is =>", data);
  } catch (err) {
    console.log("opps something went wrong", err);
  } finally {
    signUpButton.textContent = "Sign up";
    signUpButton.disabled = false;
    signUpButton.classList.add("cursor-pointer");
    signUpButton.classList.remove("cursor-not-allowed");
    signUpButton.classList.remove("animate-pulse");
  }
}

signUpFormEl.addEventListener("submit", handleSignUP);
