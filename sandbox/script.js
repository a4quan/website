document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const uploadForm = document.getElementById('uploadForm');
    const statusMessage = document.getElementById('statusMessage');

    // Display the selected file name
    fileInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            fileNameDisplay.textContent = event.target.files[0].name;
            statusMessage.style.display = 'none'; // Hide status message on new file selection
        } else {
            fileNameDisplay.textContent = 'Choose a file...';
        }
    });

    // Handle form submission
    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        statusMessage.style.display = 'none'; // Hide previous status message
        statusMessage.className = 'status-message'; // Reset classes

        if (fileInput.files.length === 0) {
            displayStatus('Please select a file to upload.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('uploadedFile', fileInput.files[0]); // 'uploadedFile' is the name of the input

        // You will replace this URL with your actual backend endpoint
        const uploadUrl = 'https://hudqddczfl.execute-api.ca-central-1.amazonaws.com/upload'; // Placeholder for your backend URL

        try {
            displayStatus('Uploading...'); // Show uploading message
            
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
                // Do NOT set Content-Type header when using FormData,
                // the browser sets it automatically with the correct boundary
            });

            if (response.ok) {
                const result = await response.json();
                displayStatus(`Success! ${result.message || 'File uploaded successfully.'}`, 'success');
                // Optional: Clear the form or update UI
                uploadForm.reset();
                fileNameDisplay.textContent = 'Choose a file...';
            } else {
                const errorData = await response.json();
                displayStatus(`Error: ${errorData.message || 'Failed to upload file.'}`, 'error');
            }
        } catch (error) {
            console.error('Network or upload error:', error);
            displayStatus(`Network error: ${error.message}`, 'error');
        }
    });

    function displayStatus(message, type = '') { // Assign a default empty string for type
        statusMessage.textContent = message;
        // Clear existing type classes first if they might persist from previous calls
        statusMessage.classList.remove('success', 'error'); // Clear previous status
        
        if (type) { // Only add class if 'type' is not empty
            statusMessage.classList.add(type); 
        }
        statusMessage.style.display = 'block';
    }
});