document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm_password").value.trim();

  if (!email || !username || !password || !confirmPassword) {
    alert("Mohon lengkapi semua field.");
    return;
  }

  if (password.length < 6) {
    alert("Password minimal 6 karakter.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password dan konfirmasi tidak cocok.");
    return;
  }

  try {
    const res = await fetch("https://projek-be-559917148272.us-central1.run.app/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name: username, pass: password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Registrasi berhasil! Silakan login.");
      window.location.href = "login.html";
    } else {
      alert("❌ " + (data.message || "Gagal registrasi."));
    }
  } catch (err) {
    console.error("Register error:", err);
    alert("❌ Gagal koneksi ke server.");
  }
});
