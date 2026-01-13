function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    document.getElementById("loginError").classList.add("d-none");

    if (username === "user" && password === "user") {
        showUserView();
    } else if (username === "admin" && password === "admin") {
        showAdminView();
    } else {
        document.getElementById("loginError").classList.remove("d-none");
    }
}

function logout() {
    document.getElementById("adminView").classList.add("d-none");
    document.getElementById("userView").classList.add("d-none");
    document.getElementById("loginView").classList.remove("d-none");
}

function showUserView() {
    document.getElementById("loginView").classList.add("d-none");
    document.getElementById("userView").classList.remove("d-none");
}

function showAdminView() {
    document.getElementById("loginView").classList.add("d-none");
    document.getElementById("adminView").classList.remove("d-none");
}

function vote() {
    document.getElementById("voteResult").classList.remove("d-none");
}