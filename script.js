window.onload = () => {
	document.querySelector('.drop').addEventListener('dragenter', (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.target.classList.add('drop-dragged');
	}, false);

	document.querySelector('.drop').addEventListener('dragover', (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = 'copy';
	});

	document.querySelector('.drop').addEventListener('drop', async (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.target.classList.remove('drop-dragged');

		let files = e.dataTransfer.files;
		
		for(let i = 0; i < files.length; i++){
			await new Promise( (response, reject) => {
				new SendFile(files[i], response, reject);
			} ).catch( (e) => console.log(`Error at file ${files[i]}: (${e.name})${e.message}`));
		}

	}, false);

	document.getElementById('fileUploader').addEventListener('change', async (e) => {
		let files = e.target.files;
		
		for(let i = 0; i < files.length; i++){
			await new Promise( (response, reject) => {
				new SendFile(files[i], response, reject);
			} ).catch( (e) => console.log(`Error at file ${files[i]}: (${e.name})${e.message}`));
		}
	});
}
