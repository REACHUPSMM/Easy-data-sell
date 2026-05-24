import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCA-CqdOOvUwcCx-LFfgsD44cQRCeI-G1U",
  authDomain: "data-seller-c30db.firebaseapp.com",
  projectId: "data-seller-c30db",
  storageBucket: "data-seller-c30db.firebasestorage.app",
  messagingSenderId: "33011133656",
  appId: "1:33011133656:web:cc11efa04fb5ea21ec3bad"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.loginUser = async function () {

  let phone =
  document.getElementById("phone").value.trim();

  let password =
  document.getElementById("password").value.trim();

  if (phone === "") {

    alert("Enter Mobile Number");

    return;
  }

  let premium = false;

  if (password === "2026dataearn") {

    premium = false;

  } else if (
    password === "2026datasellpremium"
  ) {

    premium = true;

  } else {

    alert("Wrong Password");

    return;
  }

  const userRef =
  doc(db, "users", phone);

  const userSnap =
  await getDoc(userRef);

  if (!userSnap.exists()) {

    await setDoc(userRef, {

      phone: phone,

      coins: 0,

      premium: premium,

      created:
      new Date().toISOString()

    });

  }

  localStorage.setItem(
    "phone",
    phone
  );

  window.location.href =
  "dashboard.html";
};

window.startSelling = async function () {

  const phone =
  localStorage.getItem("phone");

  const userRef =
  doc(db, "users", phone);

  const snap =
  await getDoc(userRef);

  let userData =
  snap.data();

  let coins =
  userData.coins || 0;

  let premium =
  userData.premium || false;

  let earningRate =
  premium ? 0.2 : 0.1;

  let duration =
  premium ? 999999 : 120;

  let timeLeft =
  duration;

  const timer =
  document.getElementById("timer");

  const coinDisplay =
  document.getElementById("coinDisplay");

  let interval =
  setInterval(async () => {

    coins += earningRate;

    coinDisplay.innerHTML =
    "🪙 " + coins.toFixed(1);

    await updateDoc(userRef, {

      coins: coins

    });

    timeLeft--;

    let mins =
    Math.floor(timeLeft / 60);

    let secs =
    timeLeft % 60;

    timer.innerHTML =
    `${mins}:${secs < 10 ? "0" + secs : secs}`;

    if (timeLeft <= 0 && !premium) {

      clearInterval(interval);

      alert("2 Minutes Completed ⏳");

      timer.innerHTML =
      "Cooldown 1:00";

      setTimeout(() => {

        timer.innerHTML =
        "02:00";

      }, 60000);
    }

  }, 1000);
};

window.requestWithdraw =
async function () {

  let upi =
  document.getElementById("upi").value;

  let amount =
  Number(
    document.getElementById("amount").value
  );

  if (upi === "") {

    alert("Enter UPI ID");

    return;
  }

  if (amount < 250) {

    alert("Minimum withdrawal ₹250");

    return;
  }

  await addDoc(
    collection(db, "withdrawals"),
    {

      phone:
      localStorage.getItem("phone"),

      upi: upi,

      amount: amount,

      status: "pending",

      created:
      new Date().toISOString()

    }
  );

  alert("Withdrawal Request Sent 🚀");
};
