document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    const loginButton =
        document.getElementById("loginButton");

    const loginMessage =
        document.getElementById("loginMessage");


    if (!loginForm) {
        return;
    }


    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        loginButton.disabled = true;

        loginButton.textContent = "Logging in...";

        loginMessage.textContent = "";


        try {

            const response = await fetch(
                "https://api.skillitize.com/login.php",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const result =
                await response.json();


            if (result.success) {

                /*
                Store token locally.
                This token is what the admin
                dashboard will use to call
                protected APIs.
                */

                localStorage.setItem(
                    "skillitize_admin_token",
                    result.token
                );


                localStorage.setItem(
                    "skillitize_admin",
                    JSON.stringify(result.admin)
                );


                loginMessage.textContent =
                    "Login successful. Redirecting...";


                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 500);


            } else {

                loginMessage.textContent =
                    result.message ||
                    "Login failed.";

            }

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            loginMessage.textContent =
                "Unable to connect to server.";

        }


        loginButton.disabled = false;

        loginButton.textContent = "Login";

    });

});