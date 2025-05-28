const loginFormEl = document.querySelector("#login-form") as HTMLFormElement;
const emailField = document.querySelector("#email-field") as HTMLInputElement;
const passwordField = document.querySelector(
  "#password-field"
) as HTMLInputElement;

async function handleSignUP(event: any) {
  event.preventDefault();
  try {
    const resqest = await fetch(
      "https://jcc-utgitca-todos-app-backend.laravel.cloud/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "ajammeh@example.com",
          password: "password",
        }),
      }
    );

    const data = await resqest.json();
    console.log("data is =>", data);
  } catch (err) {
    console.log("opps something went wrong", err);
  }
}

loginFormEl.addEventListener("submit", handleSignUP);
