document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const uploadForm = document.getElementById('uploadForm');
    const statusMessage = document.getElementById('statusMessage');

    // Checkbox elements
    const staticRunCheckbox = document.getElementById('staticRun');
    const normalRunsCheckbox = document.getElementById('normalRuns');
    const delayRunsCheckbox = document.getElementById('delayRuns');

    // Nested options containers
    const staticRunOptions = document.getElementById('staticRunOptions');
    const normalRunsOptions = document.getElementById('normalRunsOptions');
    const delayRunsOptions = document.getElementById('delayRunsOptions');

    // Toggle nested options based on checkbox state
    staticRunCheckbox.addEventListener('change', () => {
        staticRunOptions.style.display = staticRunCheckbox.checked ? 'block' : 'none';
    });

    normalRunsCheckbox.addEventListener('change', () => {
        normalRunsOptions.style.display = normalRunsCheckbox.checked ? 'block' : 'none';
    });

    delayRunsCheckbox.addEventListener('change', () => {
        delayRunsOptions.style.display = delayRunsCheckbox.checked ? 'block' : 'none';
    });

    // Display the selected file name
    fileInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (!file.name.toLowerCase().endsWith('.zip')) {
                fileNameDisplay.textContent = 'Please select a .zip file.';
                statusMessage.textContent = 'Only .zip files are allowed.';
                statusMessage.classList.add('error');
                statusMessage.style.display = 'block';
                fileInput.value = ''; // Clear the invalid file
                return;
            }
            fileNameDisplay.textContent = file.name;
            statusMessage.style.display = 'none'; // Hide status message on new file selection
        } else {
            fileNameDisplay.textContent = 'Choose a file...';
        }
    });

    // Collect form data as JSON
    function collectFormData() {
        const formData = {
            submissionType: 'OpenTrack Submission',
            simulationOptions: {
                staticRun: {
                    enabled: staticRunCheckbox.checked,
                    useCNandVIA: staticRunCheckbox.checked ? document.getElementById('staticUseCN').checked : false
                },
                normalRuns: {
                    enabled: normalRunsCheckbox.checked,
                    numberOfRuns: normalRunsCheckbox.checked ? parseInt(document.getElementById('normalRunsNumber').value) || 0 : 0,
                    useCNandVIA: normalRunsCheckbox.checked ? document.getElementById('normalUseCN').checked : false,
                    includeFreight: normalRunsCheckbox.checked ? document.getElementById('normalIncludeFreight').checked : false
                },
                delayRuns: {
                    enabled: delayRunsCheckbox.checked,
                    numberOfRuns: delayRunsCheckbox.checked ? parseInt(document.getElementById('delayRunsNumber').value) || 0 : 0,
                    useCNandVIA: delayRunsCheckbox.checked ? document.getElementById('delayUseCN').checked : false,
                    includeFreight: delayRunsCheckbox.checked ? document.getElementById('delayIncludeFreight').checked : false
                }
            },
            fileName: fileInput.files.length > 0 ? fileInput.files[0].name : null,
            timestamp: new Date().toISOString()
        };
        
        return formData;
    }

    // Handle form submission
    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        statusMessage.style.display = 'none'; // Hide previous status message
        statusMessage.className = 'status-message'; // Reset classes

        if (fileInput.files.length === 0) {
            displayStatus('Please select a file to upload.', 'error');
            return;
        }

        // Collect form data as JSON
        const jsonData = collectFormData();
        console.log('Form Data JSON:', JSON.stringify(jsonData, null, 2));

        const formData = new FormData();
        formData.append('uploadedFile', fileInput.files[0]);
        formData.append('formData', JSON.stringify(jsonData)); // Add JSON data to the upload

        // Backend endpoint
        const uploadUrl = 'https://hudqddczfl.execute-api.ca-central-1.amazonaws.com/dev/upload';

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
                
                // Optional: Clear the form
                uploadForm.reset();
                fileNameDisplay.textContent = 'Choose a file...';
                
                // Hide all nested options
                staticRunOptions.style.display = 'none';
                normalRunsOptions.style.display = 'none';
                delayRunsOptions.style.display = 'none';
            } else {
                const errorData = await response.json();
                displayStatus(`Error: ${errorData.message || 'Failed to upload file.'}`, 'error');
            }
        } catch (error) {
            console.error('Network or upload error:', error);
            displayStatus(`Network error: ${error.message}`, 'error');
        }
    });

    function displayStatus(message, type = '') {
        statusMessage.textContent = message;
        statusMessage.classList.remove('success', 'error');
        
        if (type) {
            statusMessage.classList.add(type);
        }
        statusMessage.style.display = 'block';
    }
});
