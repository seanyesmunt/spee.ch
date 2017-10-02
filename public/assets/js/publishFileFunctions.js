/* publish functions */

// When a file is selected for publish, validate that file and
// stage it so it will be ready when the publish button is clicked.
function previewAndStageFile(selectedFile){
	const publishForm = document.getElementById('publish-form-wrapper');
	var previewHolder = document.getElementById('asset-preview-holder');
	var dropzoneWrapper = document.getElementById('publish-dropzone-wrapper');
	var previewReader = new FileReader();
	var nameInput = document.getElementById('claim-name-input');
	// validate the file's name, type, and size
	try {
		validateFile(selectedFile);
	} catch (error) {
		showError('input-error-file-selection', error.message);
		return;
	}
	// set the image preview, if an image was provided
	if (selectedFile.type !== 'video/mp4') {
		previewReader.readAsDataURL(selectedFile);
		previewReader.onloadend = function () {
			previewHolder.innerHTML = '<img width="100%" src="' + previewReader.result + '" alt="image preview"/>';
		};
	}
    // hide the drop zone
    dropzoneWrapper.hidden = true;
    publishForm.hidden = false;
	// set the name input value to the image name if none is set yet
	if (nameInput.value === "") {
		var filename = selectedFile.name.substring(0, selectedFile.name.indexOf('.'))
		nameInput.value = cleanseClaimName(filename);
		checkClaimName(nameInput.value);
	}
	// store the selected file for upload
	stagedFiles = [selectedFile];
}

// Validate the publish submission and then trigger publishing.
function publishSelectedImage(event) {
	var claimName = document.getElementById('claim-name-input').value;
    var channelName = document.getElementById('channel-name-select').value;
    // prevent default so this script can handle submission
    event.preventDefault();
	// validate, submit, and handle response
	validateFilePublishSubmission(stagedFiles, claimName, channelName)
		.then(() => {
			uploader.submitFiles(stagedFiles);
		})
		.catch(error => {
			if (error.name === 'FileError') {
                showError(document.getElementById('input-error-file-selection'), error.message);
			} else if (error.name === 'NameError') {
				showError(document.getElementById('input-error-claim-name'), error.message);
            } else if (error.name === 'ChannelNameError'){
				console.log(error);
                showError(document.getElementById('input-error-channel-select'), error.message);
			} else {
				showError(document.getElementById('input-error-publish-submit'), error.message);
			}
			return;
		})
};