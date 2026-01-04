// 1) WhatsApp number (international format, no +, no spaces)
const WHATSAPP_NUMBER = "17746064800"; // <-- change to your WhatsApp number

// 2) Google Apps Script Web App URL (paste after you deploy)
const APPS_SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE"; // <-- important

function setWhatsappLink(){
  const btn = document.getElementById("waBtn");
  if(!btn) return;
  const msg = encodeURIComponent("Hi STS IT Services, I need details about training/project support/interview assistance.");
  btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

async function handleContactSubmit(e){
  e.preventDefault();
  const statusEl = document.getElementById("formStatus");
  statusEl.className = "status";
  statusEl.textContent = "Sending...";

  // Basic validations
  if(APPS_SCRIPT_URL.includes("PASTE_YOUR_WEB_APP_URL_HERE")){
    statusEl.className = "status err";
    statusEl.textContent = "Apps Script URL not set. Please paste your Web App URL in script.js";
    return;
  }

  const form = e.target;
  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    service: form.service.value,
    message: form.message.value.trim()
  };

  try{
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if(data && data.ok){
      statusEl.className = "status ok";
      statusEl.textContent = "✅ Message sent successfully! We will contact you soon.";
      form.reset();
    }else{
      statusEl.className = "status err";
      statusEl.textContent = "❌ Failed to send. Please try again or WhatsApp us.";
    }
  }catch(err){
    statusEl.className = "status err";
    statusEl.textContent = "❌ Network error. Please try again or WhatsApp us.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setWhatsappLink();
  const form = document.getElementById("contactForm");
  if(form) form.addEventListener("submit", handleContactSubmit);
});
