document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append("document", file);
  
    // Show loading indicator
    const loadingElement = document.getElementById("loading");
    const summaryContainer = document.getElementById("summaryContainer");
    const summaryElement = document.getElementById("summary");
  
    loadingElement.style.display = "block";
    summaryContainer.style.display = "none";
  
    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to summarize document. Please try again.");
      }
  
      const data = await response.json();
      const summary = data.summary;
  
      // Hide loading and display summary
      loadingElement.style.display = "none";
      summaryContainer.style.display = "block";
      summaryElement.textContent = summary;
    } catch (error) {
      loadingElement.style.display = "none";
      alert("Error: " + error.message);
    }
  });
  