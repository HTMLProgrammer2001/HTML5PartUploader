<?php 

function gename($exten){
	$str = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
	$name = '';

	for($i = 0; $i < 12; $i++)
		$name.= $str[rand(0, strlen($str) - 1)];

	return $name.$exten;
}



if($_GET['action'] == 'getInfo'){
	$arr = array();
	if(file_exists('files/_' . $_GET['fileid'])){
		$arr['exist'] = True;
		$arr['start'] = filesize('files/_' . $_GET['fileid']);
	}

	echo json_encode($arr);
}
else if ($_GET['action'] == 'sendPart'){
	$fileid = $_GET['fileid'];
	if(!file_exists('files/_' . $fileid))
		$f = fopen('files/_' . $fileid, 'wb');
	else
		$f = fopen('files/_' . $fileid, 'ab');
	$part = fopen('php://input', 'rb');
	while(!feof($part)){
		fwrite($f, fread($part, 1024*1024));
	}

	fclose($f);

	echo filesize('files/_' . $fileid);
}
else if ($_GET['action'] == 'save'){
	rename('files/_' . $_GET['fileid'], 'files/' . gename(substr($_GET['fileid'], strrpos($_GET['fileid'], '.'))));
	echo 'File is saved';
}
?>