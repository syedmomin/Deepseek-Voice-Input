// Wait for the page to load
window.addEventListener("load", () => {
    // Find the Deepseek input field (adjust the selector as needed)
    const inputField = document.querySelector("input[type='text'], textarea");
  
    if (inputField) {
      // Create a voice icon button
      const voiceIcon = document.createElement("button");
      voiceIcon.style.position = "absolute";
      voiceIcon.style.right = "10px";
      voiceIcon.style.cursor = "pointer";
      voiceIcon.style.zIndex = "999999999";
      voiceIcon.style.background = "none";
      voiceIcon.style.border = "none"; // Remove default button border
  
      // Add the icon image
      const iconImage = document.createElement("img");
      iconImage.src = chrome.runtime.getURL("icon.png"); // Load the icon from the extension folder
      iconImage.alt = "Voice Icon";
      iconImage.style.width = "20px"; // Adjust size as needed
      iconImage.style.height = "20px"; // Adjust size as needed
      voiceIcon.appendChild(iconImage);
  
      // Insert the voice icon next to the input field
      inputField.insertAdjacentElement("afterend", voiceIcon);
  
      // Add click event to the voice icon
      voiceIcon.addEventListener("click", () => {
        startVoiceInput(inputField);
      });
    }
  });
  
  // Function to handle voice input
  function startVoiceInput(inputField) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Set language
    recognition.interimResults = false; // Only final results
    recognition.maxAlternatives = 1; // Only one result
  
    // Start speech recognition
    recognition.start();
  
    // On result, insert the transcript into the input field
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      inputField.value = transcript;
    };
  
    // Handle errors
    recognition.onerror = (event) => {
      console.error("Voice input error:", event.error);
      alert("Error occurred during voice input. Please try again.");
    };
  }