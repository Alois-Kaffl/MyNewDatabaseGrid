<?php
require_once("FakeRecSet2.class.php");
require_once("RecSetOne.class.php");
if (!function_exists("simple_crypt")) {
	function simple_crypt($key, $string, $action = 'decrypt'){
		$res = '';
		if($action !== 'encrypt'){
			$string = base64_decode($string);
		} 
		for( $i = 0; $i < strlen($string); $i++){
				$c = ord(substr($string, $i));
				if($action == 'encrypt'){
					$c += ord(substr($key, (($i + 1) % strlen($key))));
					$res .= chr($c & 0xFF);
				}else{
					$c -= ord(substr($key, (($i + 1) % strlen($key))));
					$res .= chr(abs($c) & 0xFF);
				}
		}
		if($action == 'encrypt'){
			$res = base64_encode($res);
		} 
		return $res;
	}
}
$key="MyNewGridKey";
$decrypted_db = simple_crypt($key, $_REQUEST['dbase'], $action = 'decrypt');
$decrypted_user = simple_crypt($key, $_REQUEST['user'], $action = 'decrypt');
$decrypted_pawo = simple_crypt($key, $_REQUEST['pawo'], $action = 'decrypt');
try {
	$dsn = "mysql:host=localhost;dbname=".$decrypted_db;
	$username = $decrypted_user;
	$password = $decrypted_pawo;
	$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'); 
	$dbh = new PDO($dsn, $username, $password, $options);
	$dbh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	$PDO_Conn=new RecSet($dbh,0);
} catch(PDOException $e) {
	die("Sorry, an error has occurred. Please try your request later\n" . $e->getMessage());
}
session_start();
?>