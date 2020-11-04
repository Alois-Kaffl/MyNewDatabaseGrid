<?php 
$key="MyNewGridKey";
function simple_crypt($key, $string, $action = 'encrypt'){
//	echo $key.'#';
	$key="MyNewGridKey";
	$res = '';
	if($action !== 'encrypt'){
		$string = base64_decode($string);
	} 
	for( $i = 0; $i < strlen($string); $i++){
			$c = ord(substr($string, $i));
			if($action == 'encrypt'){
				try {
					$c += ord(substr($key, (($i + 1) % strlen($key))));
					$res .= chr($c & 0xFF);
				} catch (Exception $e) {
			    echo 'Caught exception: ',  $e->getMessage(), "\n";
				}
			}else{
				$c -= ord(substr($key, (($i + 1) % strlen($key))));
				$res .= chr(abs($c) & 0xFF);
			}
	}
	if($action == 'encrypt'){
		$res = base64_encode($res);
	}
//	echo $key;
	return $res;
}
function setMyGridDB($db,$un,$pw) {
	$encrypted_DBName = simple_crypt($key, $db, $action = 'encrypt');
	$encrypted_DBUser = simple_crypt($key, $un, $action = 'encrypt');
	$encrypted_DBPaWo = simple_crypt($key, $pw, $action = 'encrypt');
	$ret[]=$encrypted_DBName;
	$ret[]=$encrypted_DBUser;
	$ret[]=$encrypted_DBPaWo;
	return $ret;
}
?>