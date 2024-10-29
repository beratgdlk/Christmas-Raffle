let emails = [];

// Add email to the list
function addEmail() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();

    if (validateEmail(email)) {
        emails.push(email);
        displayEmails();
        emailInput.value = ""; // Clear the input field
    } else {
        alert("Please enter a valid email address!");
    }
}

// Validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Display emails in the list
function displayEmails() {
    const emailList = document.getElementById('emailList');
    emailList.innerHTML = "";

    emails.forEach((email) => {
        const li = document.createElement('li');
        li.textContent = email;
        emailList.appendChild(li);
    });
}

// Start the raffle and pair emails
function startRaffle() {
    if (emails.length < 2) {
        alert("Please add at least two emails to start the raffle!");
        return;
    }

    let shuffledEmails = shuffleArray([...emails]);
    let pairs = [];

    for (let i = 0; i < shuffledEmails.length; i++) {
        let receiverIndex = (i + 1) % shuffledEmails.length;
        pairs.push({
            sender: shuffledEmails[i],
            receiver: shuffledEmails[receiverIndex]
        });
    }

    console.log(pairs); // Check pairs in console (hidden from UI)
    alert("Raffle is completed! Results will be sent via email.");
}

// Shuffle the array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Simulate sending emails (placeholder)
async function sendEmails() {
    if (emails.length < 2) {
        alert("Please start the raffle before sending emails!");
        return;
    }

    let shuffledEmails = shuffleArray([...emails]);
    for (let i = 0; i < shuffledEmails.length; i++) {
        let receiverIndex = (i + 1) % shuffledEmails.length;
        let sender = shuffledEmails[i];
        let receiver = shuffledEmails[receiverIndex];

        // API isteği ile e-posta gönder
        await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sender, receiver })
        });
    }

    alert("Emails sent! (Check console for simulation)");
}
