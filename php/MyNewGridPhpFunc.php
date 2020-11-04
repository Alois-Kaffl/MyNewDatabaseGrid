<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-type:text/plain encoding=\"utf-8\"");
require_once("../connect/PDO_Conn.php");
$what=$_REQUEST['func'];
	
if ($what=="autocomp_f") {
	$Tabelle=$_REQUEST['tabelle'];
	$Feld=$_REQUEST['feld'];
	$Wo=$_REQUEST['wo']; if ($Wo=="left") { $w=""; } else { $w="%"; }
	$search=$_REQUEST['term'];
	$query = "SELECT DISTINCT ".$Feld." FROM ".$Tabelle." WHERE ".$Feld." LIKE '".$w.$search."%' ORDER BY ".$Feld." LIMIT 15";
	$Rec=$PDO_Conn->SelectLimit($query);
	$RecCount=$Rec->RecordCount();
	$fnames="[";
	while (!$Rec->EOF) {
		$fnames.="\"".$Rec->Fields($Feld)."\",";
		$Rec->MoveNext();
	}
	$fnames=substr($fnames,0,strlen($fnames)-1)."]";
//	$Rec->Close();
//	print $query.'#'.print_r($Rec);
	print $fnames;
}
if ($what=="execDel") {
	$sql=stripslashes($_REQUEST['SQL']);
	$Rec=$PDO_Conn->Delete($sql);
	print $Rec;
}
if ($what=="execUpd") {
	$sql=stripslashes($_REQUEST['SQL']);
	$Rec=$PDO_Conn->Execute($sql);
	print $Rec;
}
if ($what=="execIns") {
	$sql=stripslashes($_REQUEST['SQL']);
	$Rec=$PDO_Conn->Insert($sql);
	print $Rec;
}
if ($what=="getColNames") {
	$fnames=""; $tabelle=$_REQUEST['table'];
	$sql="SELECT column_name as Field,column_type as Type FROM information_schema.columns WHERE table_name='".$tabelle."'";
	$Rec=$PDO_Conn->SelectLimit($sql);
	$RecCount=$Rec->RecordCount();
	while (!$Rec->EOF) {
		$fnames.=$Rec->Fields("Field")."*".$Rec->Fields("Type")."#";
		$Rec->MoveNext();
	}
	$Rec->Close();
//	$fnames.="Aktion"."*int";
	$fnames=substr($fnames,0,strlen($fnames)-1);
	print $fnames;
}
if ($what=="getColTypes") {
	$fnames=""; $tabelle=$_REQUEST['table'];
	if (isset($_REQUEST['field']) && strlen($_REQUEST['field']) > 0) {
		$sql="SELECT column_name as Field,column_type as Type FROM information_schema.columns WHERE table_name='".$tabelle."' AND column_name='".$_REQUEST['field']."'";
	} else {
		$sql="SELECT column_name as Field,column_type as Type FROM information_schema.columns WHERE table_name='".$tabelle."'";
	}
	$Rec=$PDO_Conn->SelectLimit($sql);
	$RecCount=$Rec->RecordCount();
//	echo $sql."#".$RecCount; exit();
	while (!$Rec->EOF) {
		$fnames.=$Rec->Fields("Field")."*".$Rec->Fields("Type")."#";
		$Rec->MoveNext();
	}
	$Rec->Close();
	$fnames=substr($fnames,0,strlen($fnames)-1);
	print $fnames;
//	print $sql;
}
if ($what=="drawRowsJson") {
	$fnames=""; $full=0;
	$sql=stripslashes($_REQUEST['sql']);
	if (isset($_REQUEST['fullsql'])) $full=stripslashes($_REQUEST['fullsql']);
	$pos=strpos($sql,"LIMIT");
	if ($pos !== false && $full==0) {
		$sqlT=substr($sql,0,$pos-1);
	} else {
		$sqlT=$sql;
	}
	$cnams=explode(",",stripslashes($_REQUEST['cnams']));
//	print $sql.'#'.$cnams;
	$RecT=$PDO_Conn->SelectLimit($sqlT);
	$totrowsT=$RecT->RecordCount();
	$Rec=$PDO_Conn->SelectLimit($sql);
	$totrows=$Rec->RecordCount();
//	print_r($Rec);
	$fnames.="{ \"rows\": [ ";
	while(!$Rec->EOF) {
		$fnames.="{";
		foreach($cnams as $fld) {
//			print $fld.'#'.$Rec->Fields($fld);
			$str=trim(str_replace (array("\n", "\r"), " ", $Rec->Fields($fld)));
			$fnames.="\"".$fld."\": \"".$str."\",";
		}
		$fnames=substr($fnames,0,strlen($fnames)-1)."},";
		$Rec->MoveNext();
	}
	$fnames=substr($fnames,0,strlen($fnames)-1)."], \"opts\": [{ \"anzahl\": \"".$totrows."\"}, { \"total\": \"".$totrowsT."\"}] }";
	print $fnames;
//	print $sqlT.'#<br>#'.$sql.'#<br>#'.$_REQUEST['cnams'];
}
if ($what=="getLookUp") {
	$fn=stripslashes($_REQUEST['ofield']);
	$ft=stripslashes($_REQUEST['ftable']);
	$fk=stripslashes($_REQUEST['fkey']);
	$ff=stripslashes($_REQUEST['ffield']);
	$sql="SELECT ".$ff." as retVal FROM ".$ft." WHERE ".$fk."=".$fn." LIMIT 1";
	$Rec=$PDO_Conn->SelectLimit($sql);
	$fnames="{ \"rows\": [ {";
	$str=trim(str_replace (array("\n", "\r"), " ", $Rec->Fields("retVal")));
	$fnames.="\"retVal\": \"".$str."\"}]}";
	print $fnames;
//	print $sql;
}
if ($what=="getFieldsSum") {
	$fnames=""; $full=0;
	$sql=$_REQUEST['sql']." ";
	if (isset($_REQUEST['fullsql'])) $full=stripslashes($_REQUEST['fullsql']);
	$pos=strpos($_REQUEST['sql'],"LIMIT");
	if ($pos > 1 && $full==0) {
		$sqlT=substr($_REQUEST['sql'],0,$pos-1);
	} else {
		$sqlT=$_REQUEST['sql'];
	}
	$sql=strtolower($_REQUEST['sql']);
	$mode=$_REQUEST['mode'];
	switch($mode) {
		case "all": $sql1=$sqlT; break;
		case "view": $sql1=$sql; break;
		case "filter": $sql1=$sqlT;
	}
	$flds=$_REQUEST['cnams'];
	$filds=$_REQUEST['fields'];
	$cnams=explode(",",$_REQUEST['cnams']);
	$posFrom=strpos($sql,"select ")+7; $posWhere=strpos($sql," from ");
	$sql=substr($sql1,0,$posFrom).$filds." ".substr($sql1,$posWhere+1);
//	print "SQL:".$sql1.'#'.$sql; exit();
	$Rec=$PDO_Conn->SelectLimit($sql);
	$totrows=$Rec->RecordCount();
	foreach($cnams as $fld) {
		$pos=strpos($fld,"as");
		if ($pos > 1) {
			$fl=substr($fld,$pos+3);
		} else {
			$fl=$fld;
		}
		$fnames.=$fl."*".$Rec->Fields($fl).":";
	}
	$fnames=substr($fnames,0,strlen($fnames)-1);
	print $fnames;
//	print $sql;
}
if ($what=="getColWidth") {
	$flds=""; $vals="";
	$tabelle=$_REQUEST['table'];
	$col_id=$_REQUEST['col_string_id'];
	
	try {
		$sql="SELECT * FROM $tabelle WHERE col_string_id='".$col_id."'";
		$Rec2=$PDO_Conn->SelectLimit($sql);
		$RecCount=$Rec2->RecordCount();
		if ($RecCount==0) {
			print "None";
		} else {
			print $Rec2->Fields("col_widths")."#".$Rec2->Fields("zeilen"); //."#".$Rec2->Fields("Aktion");
		}
	} catch(PDOException $ex) {
		print "None";
//		echo "An Error occured! # ".$ex->getMessage(); //user friendly message
//		return false;
	}
}
if ($what=="saveColWidth") {
	$flds=""; $vals="";
	$tabelle=$_REQUEST['table'];
	$col_id=$_REQUEST['col_string_id'];
	$col_wi=$_REQUEST['col_widths'];
	$sql="SELECT * FROM $tabelle";
	try {
		$ResultT=$PDO_Conn->SelectLimit($sql);
		$RecCount=$ResultT->RecordCount();
		$ResultT->Close();
//		print "Is Table da? -> ";
	} catch(PDOException $er) {
		print "Nein! # ";
		// Keine tabelle vorhanden _ Create Table
		$sql="CREATE TABLE `col_widths` (`col_id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,`col_string_id` varchar(30) NOT NULL DEFAULT '', `col_widths` mediumtext NOT NULL, `zeilen` tinyint(3) unsigned NOT NULL DEFAULT 20, PRIMARY KEY (`col_id`)
) ENGINE=MyIsam DEFAULT CHARSET=utf8;";
		$ResultT=$PDO_Conn->Execute($sql);
//		print " Erzeugt! #";
	}
//	print "Ja!"; exit();
	// Tabelle vorhanden
	$sql="SELECT * FROM $tabelle WHERE col_string_id='".$col_id."'";
	$ResultT=$PDO_Conn->SelectLimit($sql);
	$RecCount=$ResultT->RecordCount();
	if ($RecCount==0) {
		// Noch nicht da -> Insert
		$sql = "INSERT INTO ".$tabelle." (col_string_id, col_widths) VALUES ('".$col_id."','".$col_wi."')";
		$PDO_Conn->Execute($sql);
	} else {
		// Da -> Update
		$sql = "UPDATE ".$tabelle." SET col_widths='".$col_wi."' WHERE col_string_id='".$col_id."'";
		$PDO_Conn->Execute($sql);
	}
	$ResultT->Close();
//	print $sql;
	print "Done";
}
if ($what=="saveAnzZeilen") {
	$flds=""; $vals="";
	$tabelle=$_REQUEST['table'];
	$col_id=$_REQUEST['col_string_id'];
	$col_wi=$_REQUEST['zeilen'];
	$sql="SELECT * FROM $tabelle";
	try {
		$ResultT=$PDO_Conn->SelectLimit($sql);
		$RecCount=$ResultT->RecordCount();
		$ResultT->Close();
	} catch(PDOException $er) {
		// Keine tabelle vorhanden _ Create Table
		$sql="CREATE TABLE `col_widths` (`col_id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,`col_string_id` varchar(30) NOT NULL DEFAULT '', `col_widths` mediumtext NOT NULL, `zeilen` tinyint(3) unsigned NOT NULL DEFAULT 20, PRIMARY KEY (`col_id`)
) ENGINE=MyIsam DEFAULT CHARSET=utf8;";
		$ResultT=$PDO_Conn->Execute($sql);
	}
	// Tabelle vorhanden
	$sql="SELECT * FROM $tabelle WHERE col_string_id='".$col_id."'";
	$ResultT=$PDO_Conn->SelectLimit($sql);
	$RecCount=$ResultT->RecordCount();
	if ($RecCount==0) {
		// Noch nicht da -> Insert
		$sql = "INSERT INTO ".$tabelle." (col_string_id, zeilen) VALUES ('".$col_id."',".$col_wi.")";
		$PDO_Conn->Execute($sql);
	} else {
		// Da -> Update
		$sql = "UPDATE ".$tabelle." SET zeilen=".$col_wi." WHERE col_string_id='".$col_id."'";
		$PDO_Conn->Execute($sql);
	}
	$ResultT->Close();
	print "Done";
}

?>