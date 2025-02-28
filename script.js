const firebaseConfig = {
    apiKey: "TA_CLE_API",
    authDomain: "TON_PROJECT.firebaseapp.com",
    projectId: "TON_PROJECT",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById("login-container").style.display = "none";
            document.getElementById("form-container").style.display = "block";
        })
        .catch((error) => alert(error.message));
});

auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection("formulaires").orderBy("numero", "desc").limit(1).get().then((docs) => {
            let numero = 1;
            docs.forEach((doc) => numero = doc.data().numero + 1);
            document.getElementById("numero").value = numero;
        });
    }
});