<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('Europe/London');
/** PHPExcel */
require_once 'php/PHPExcel.php';
require_once("connect/PDO_Conn.php");
// Create new PHPExcel object
$objPHPExcel = new PHPExcel();
$dbn=$_POST['dbase'];
$dbu=$_POST['user'];
$dbp=$_POST['pawo'];
$h=$_POST['captions'];
$headers=explode(",",$h);
$felder=$_POST['felder'];
$arFelder=explode(",",$felder);
$sql=$_POST['sql'];
$recIT=$PDO_Conn->SelectLimit($sql);
//echo $dbn.'#'.$dbu.'#'.$dbp;
//exit();

$objPHPExcel->getProperties()->setCreator("Alois Kaffl")
							 ->setLastModifiedBy("Alois Kaffl")
							 ->setTitle("HTML-Table to Excel")
							 ->setSubject("HTML-Table to Excel")
							 ->setDescription("Tabelle, generated from Html using MyNewGrid.")
							 ->setKeywords("Excel 2007 openxml php")
							 ->setCategory("HTML-Tabelle file");
// Add some data
$bu="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
$arbu=explode(",",$bu);
$idx=0; $item="";
function setHeader($itm, $key) {
	global $idx, $arbu, $objPHPExcel, $item;
	$tbu=$arbu[$idx]."1"; 
	$objPHPExcel->setActiveSheetIndex(0)->setCellValue($tbu, $itm);
	$idx++;
}
array_walk($headers,"setHeader");
$anzHeader=$idx;
$row=1;
while(!$recIT->EOF) {
	$row++; $roit="";
	for($x=0; $x < $anzHeader; $x++) {
		$fld=$arFelder[$x];
		$item=$recIT->Fields($fld);
		if($item=="" || $item=="null") $item=NULL;
		$objPHPExcel->setActiveSheetIndex(0)->setCellValue($arbu[$x].$row, $item);
	}
	$recIT->MoveNext();
}
$header = 'a1:'.$arbu[--$idx].'1';
$objPHPExcel->getActiveSheet()->getStyle($header)->getFill()->setFillType(\PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('00ffff00');

foreach(range('A',$arbu[$anzHeader+2]) as $columnID) {
    $objPHPExcel->getActiveSheet()->getColumnDimension($columnID)
        ->setAutoSize(true);
}
$objPHPExcel->getActiveSheet()->calculateColumnWidths();
// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('myNewGrid-Table');
// Set active sheet index to the first sheet, so Excel opens this as the first sheet
$objPHPExcel->setActiveSheetIndex(0);
// Redirect output to a client's web browser (Excel2007)
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="myNewGrid.xlsx"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');
?>