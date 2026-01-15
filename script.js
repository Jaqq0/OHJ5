const loginView = document.getElementById("loginView");
const userView = document.getElementById("userView");
const adminView = document.getElementById("adminView");

let polls = [
    {
        id: 1,
        title: "Mikä on lempivärisi?",
        hasVoted: false,
        options: [
            {name: "Punainen", votes: 0},
            {name: "Sininen", votes: 0},
            {name: "Vihreä", votes: 0}
        ]
    },
    {
        id: 2,
        title: "Mikä on lempiruokasi?",
        hasVoted: false,
        options: [
            {name: "Pizza", votes: 0},
            {name: "Sushi", votes: 0},
            {name: "Hampurilainen", votes: 0}
        ]
    }
];

function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    loginError.classList.add("d-none");

    if (u === "user" && p === "user") showUserView();
    else if (u === "admin" && p === "admin") showAdminView();
    else loginError.classList.remove("d-none");
}

function logout() {
    loginView.classList.remove("d-none");
    userView.classList.add("d-none");
    adminView.classList.add("d-none");
}

function showUserView() {
    loginView.classList.add("d-none");
    userView.classList.remove("d-none");
    renderUserPolls();
}

function showAdminView() {
    loginView.classList.add("d-none");
    adminView.classList.remove("d-none");
    renderAdminPolls();
}

function renderUserPolls() {
  const container = document.getElementById("userPolls");
  container.innerHTML = "";

  if (polls.length === 0) {
    container.innerHTML = `<div class="alert alert-warning">Ei aktiivisia äänestyksiä.</div>`;
    return;
  }

    polls.forEach(poll => {
    let html = `<div class="card p-3 mb-3">
        <h5>${poll.title}</h5>`;

    poll.options.forEach((o, i) => {
        html += `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="poll${poll.id}" value="${i}" ${poll.hasVoted ? "disabled" : ""}>
            <label class="form-check-label">${o.name}</label>
        </div>`;
    });

    html += `
        <button class="btn btn-success mt-2"
            onclick="vote(${poll.id})"
            ${poll.hasVoted ? "disabled" : ""}>
            Äänestä
        </button>`;

        html += `<div id="result${poll.id}" class="mt-2"></div>`;

    if (poll.hasVoted) {
        const total = poll.options.reduce((s, o) => s + o.votes, 0);
        html += "<div class='mt-2'><strong>Tulokset:</strong><ul>";

        poll.options.forEach(o => {
            const percent = total ? Math.round((o.votes / total) * 100) : 0;
            html += `<li>${o.name}: ${o.votes} ääntä (${percent}%)</li>`;
        });

        html += "</ul></div>";
    }

    html += "</div>";
    container.innerHTML += html;
  });
}

function vote(pollId) {
    const poll = polls.find(p => p.id === pollId);

    if (poll.hasVoted) {
        showVoteError(pollId);
        return;
    }

    const selected = document.querySelector(`input[name="poll${pollId}"]:checked`);

    if (!selected) {
        showVoteError(pollId, "Valitse vaihtoehto ennen äänestämistä.");
        return;
    }

    poll.options[selected.value].votes++;
    poll.hasVoted = true;
    renderUserPolls();
}



function renderAdminPolls() {
    const container = document.getElementById("adminPolls");
    container.innerHTML = "";

    if (polls.length === 0) {
        container.innerHTML = `<div class="alert alert-warning">Ei aktiivisia äänestyksiä.</div>`;
        return;
    }

    polls.forEach(poll => {
        container.innerHTML += `
        <div class="card p-3 mb-3">
            <strong>${poll.title}</strong>
            <button class="btn btn-danger btn-sm mt-2" onclick="deletePoll(${poll.id})">
                Poista äänestys
            </button>
        </div>`;
    });
}

function deletePoll(id) {
    if (!confirm("Haluatko varmasti poistaa tämän äänestyksen?")) return;
    polls =polls.filter(p => p.id !== id);
    renderAdminPolls();
}

function showVoteError(pollId, message = "Olet jo äänestänyt tässä äänestyksessä.") {
    const resultDiv = document.getElementById(`result${pollId}`);
    resultDiv.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}

function addPoll() {
    const titleInput = document.getElementById("newPollTitle");
    const optionsInput = document.getElementById("newPollOptions");

    const title = titleInput.value.trim();
    const optionsRaw = optionsInput.value.trim();

    if (!title || !optionsRaw) {
        alert("Täytä äänestyksen otsikko ja vaihtoehdot.");
        return;
    }

    const options = optionsRaw.split("\n").map(o => o.trim()).filter(o => o !== "").map(o => ({name: o, votes: 0}));

    if (options.length < 2) {
        alert(" Anna vähintään kaksi vaihtoehtoa.");
        return;
    }

    const newPoll = {
        id: Date.now(),
        title,
        hasVoted: false,
        options
    };

    polls.push(newPoll);

    titleInput.value = "";
    optionsInput.value = "";

    renderAdminPolls();
}
