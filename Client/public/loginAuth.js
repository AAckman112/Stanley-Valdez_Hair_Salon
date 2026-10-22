const form = document.getElementById("login-form");
          const message = document.getElementById("login-message");
        
          form.addEventListener("submit", async function(event)  {
            event.preventDefault();
        
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;
        
            try {
              const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
              });
        
              const data = await response.json();
        
              if (!response.ok) {
                message.textContent = data.message || "Sign-in failed.";
                return;
              }
        
              message.textContent = "Signed in successfully.";
              localStorage.setItem("authToken", data.token);
              // Use data.role to choose where to send the user next.

              switch (data.role) {
                case "admin": window.location.href = "dashboardAdmin.html"; break;
                case "stylist": window.location.href = "dashboardStylist.html"; break;
                case "client": window.location.href = "dashboardClient.html"; break;
              }
            } catch (error) {
              message.textContent = "Could not connect to the server.";
            }
          });