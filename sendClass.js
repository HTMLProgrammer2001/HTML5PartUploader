class SendFile{
	constructor(file, onload, onerror){
		this.file = file;
		this.fileid = file.name.slice(0, file.name.lastIndexOf('.')) + file.size + file.lastModified + file.name.slice(file.name.lastIndexOf('.'));
		this.onload = onload;
		this.onerror = onerror;

		this.hasFileInfo();
	}

	hasFileInfo(){
		fetch('server.php?action=getInfo&fileid=' + this.fileid, {
			method: 'GET'
		}).then((res) => {
			res.json().then((json) => {
				this.uploadPart(json.start || 0);
			})
		}, (e) => {
			console.log(e);
		});
	}

	uploadPart(offset = 0, size = 1024*1024*5){
		let xhr = new XMLHttpRequest();

		xhr.upload.onprogress = (e) => {
			document.querySelector('.text').innerHTML = `${offset + e.loaded}/${this.file.size}`;
		}

		let thos = this;

		xhr.onloadend = () => {
				let res = +xhr.responseText;
				size = thos.file.size - res < size ? thos.file.size - res : size;
				if(thos.file.size <= res) {
					fetch('server.php?action=save&fileid=' + this.fileid, {
						method: 'GET'
					}).then((res) => {
						res.text().then((t) => {
							document.querySelector('.text').innerHTML = t; 
							if(thos.onload) 
								thos.onload();
						});
					});
					return;
				}
				setTimeout(() => thos.uploadPart(res, size), 500);
		}

		xhr.open('POST', 'server.php?action=sendPart&fileid=' + this.fileid, true);
		xhr.send(this.file.slice(offset, offset + size));
	}
}