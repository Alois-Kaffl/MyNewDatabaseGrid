<?php
function show_xy($fsize, $tx, $x, $y) {
	global $pdf;
	$pdf->addText($x, $y, $fsize, $tx);
	return true;	
}
function show_boxed($box, $fs, $tx, $lx, $ty, $wi, $bh, $al='left', $ku=0, $maxh=0, $isfett=0, $doFett=false) {
	global $pdf, $boldFont, $normFont;
	$pdf->selectFont($normFont);
	if ($doFett) $pdf->selectFont($boldFont);
	$tx=str_replace(chr(13)," ", $tx);
	$tx=str_replace(chr(10),"", $tx);
	$wy = $pdf->getFontHeight($fs);
	$t = ($bh-$wy); $t = $ty + $t+2;
	$z=0;
	if ($ku == 2) { // Mit Zeilenumbruch bei Wort und Boxvergrößerung
		$arr=explode(" ", $tx); $zeile="";
		foreach($arr as $wort) {
			$old=$zeile;
			$zeile.=$wort.' ';
			$wx = $pdf->getTextWidth($fs, $zeile);
			if ($wx > ($wi-24)) {
				$zeile=$old;
				$tx=$zeile; $pdf->addText($lx+2, $t-($z*$wy), $fs, $tx);
				$zeile=$wort.' ';
				$z++;
			}
		}
		$tx=$zeile; $pdf->addText($lx+2, $t-($z*$wy), $fs, $tx);
		if ($maxh <= $z) $maxh=$z;
		return $z;
	}
	if ($box == 2) { 
		$pdf->setColor(0.9,0.9,0.9);
		$pdf->filledRectangle($lx, $ty, $wi, $bh);
		$pdf->setColor(0,0,0);
		$pdf->rectangle($lx, $ty, $wi, $bh);
	}
	if ($box == 3) { 
		$pdf->setColor(1,1,1);
		$pdf->filledRectangle($lx, $ty, $wi, $bh);
		$pdf->setColor(0,0,0);
	}
	if ($box == 1) { $pdf->rectangle($lx, $ty, $wi, $bh); }
	$pdf->setColor(0,0,0);
	$wx = $pdf->getTextWidth($fs, $tx); $kurz=false;
	if ($ku == 1) { // Nur 1 Zeile mit ... am Ende
		$minus=15;
		if ($isfett==1) $minus=25;
		while ($wx >= ($wi-$minus)) {
			$tx=substr($tx,0, strlen($tx)-1);
			$wx = $pdf->getTextWidth($fs, $tx.'...');	$kurz=true;
		}
		if ($kurz) $tx.="...";
	}
	if ($ku < 4) {
		switch ($al) {
			case "center" : { $pdf->addText($lx+(($wi-$wx)/2), $t, $fs, $tx); break; }
			case "left" : { $pdf->addText($lx+2, $t, $fs, $tx); break; }
			case "right" : { $pdf->addText($lx+$wi-$wx-5, $t, $fs, $tx); break; }
		}
	}
	return $z;
}
function show_pdf_text($txt,$x,$y,$w,$h,$fs,$bo=1,$boco=array(0,0,0),$fico=array(0.9,0.9,0.9),$txco=array(0,0,0),$xal="left",$yal="middle",$xmarg=0,$ymarg=0,$maxChar=0,$bold=false) {
	global $pdf, $boldFont, $normFont;
	if ($bold==false) {
		$pdf->selectFont($normFont);
	} else {
		$pdf->selectFont($boldFont);
	}
	$pdf->setStrokeColor($boco[0],$boco[1],$boco[2]);
	// Split txt and enlarge box - keep width
	$tyh=$pdf->getFontHeight($fs)-5;
	if ($maxChar == -1) {
		$z=1;
		$arr=explode(" ", $txt); $zeile="";
		foreach($arr as $wort) {
			$old=$zeile;
			$zeile.=$wort.' ';
			$wx = $pdf->getTextWidth($fs, $zeile);
			$pdf->setColor($txco[0],$txco[1],$txco[2]);
			if ($wx > ($w)) {
				$zeile=$old;
				$txt=$zeile; $pdf->addText($x+$xmarg, $y-($tyh)-$ymarg, $fs, $txt);
				$zeile=$wort.' ';
				$z++; $y=$y-$fs;
			}
			if (strlen($zeile) > 0) {
				$txt=$zeile; $pdf->addText($x+$xmarg, $y-($tyh)-$ymarg, $fs, $txt);
			}
		}
		$th=$z*$fs+$ymarg-1;
		$y=$y-$tyh-($ymarg*2)-3+$ymarg;
		$pdf->rectangle($x, $y, $w, $th+1);
		$lw=((int) ($x+$w)); $ly=((int) $y);
		return $lw.":".$ly;
	}
	$pdf->setColor($boco[0],$boco[1],$boco[2]);
	if ($bo==2) { // Rand mit Füllung
		$pdf->setColor($fico[0],$fico[1],$fico[2]);
		$pdf->filledRectangle($x, $y-$h, $w, $h);
		$pdf->setColor($boco[0],$boco[1],$boco[2]);
		$pdf->rectangle($x, $y-$h, $w, $h);
	}
	if ($bo==1) { //Nur Rand
		$pdf->setColor($boco[0],$boco[1],$boco[2]);
		$pdf->rectangle($x, $y-$h, $w, $h);
	}
	$txw = $pdf->getTextWidth($fs, $txt);
	// Cut to MaxChar
	if ($maxChar > 0) {
		if(strlen($txt) > $maxChar) {
			$txt=substr($txt,0,$maxChar)."...";
			$txw = $pdf->getTextWidth($fs, $txt);
		}
	}
	$px=$x; $py=$y;
	// Horizontal alignment
	switch($xal) {
		case "left":	$px=$x+$xmargt;
		case "center":	$px=$x+($w/2) - ($txw/2); break;
		case "right":  	$px=$x+$w-$txw-$xmarg;
	}
	// Vertical alignment
	switch($yal) {
		case "top":		$py=$y+$h-($tyh)-$ymarg; break;
		case "middle":	$py=$y+($h/2)-($tyh/2); break;
		case "down":	$py=$y+$ymarg;
	}
	$pdf->setColor($txco[0],$txco[1],$txco[2]);
	$pdf->addText($px, $py-$h, $fs, $txt);
	$lw=((int) ($x+$w)); $ly=((int) ($y-$h));
	return $lw.":".$ly;
//	return ($y-$h);
}
function show_boxed_neu($box, $fs, $tx, $lx, $ty, $wi, $bh, $al='left', $ku=0, $maxh=1, $valign="vtop", $tfarb=array(0,0,0), $isfett=0) {
	global $pdf;
	$tx=str_replace(chr(13)," ", $tx);
	$tx=str_replace(chr(10),"", $tx);
	$wy = $pdf->getFontHeight($fs);
	$t = ($bh-$wy); $t = $ty + $t+2;
	$z=0; $pdf->setColor($tfarb[0],$tfarb[1],$tfarb[2]);
	if ($ku == 2) { // Mit Zeilenumbruch bei Wort und Boxvergrößerung
		if ($maxh==0) $valign="vtop";
		if ($valign=="vcenter") { $t = ($bh-$wy) / 2; $t = $ty + $t-($bh/2)+2; }
		if ($valign=="vtop") { $t = ($bh-$wy) / 2; $t = $ty + $t+2; }
		$arr=explode(" ", $tx); $zeile="";
		foreach($arr as $wort) {
			$old=$zeile;
			$zeile.=$wort.' ';
			$wx = $pdf->getTextWidth($fs, $zeile);
			if ($wx > ($wi-2)) {
				$zeile=$old;
				$tx=$zeile; $wx = $pdf->getTextWidth($fs, $zeile);
				switch ($al) {
					case "center" : { $pdf->addText($lx+(($wi-$wx)/2)+1, $t-(($z-1)*$wy+2), $fs, $tx); break; }
					case "left" : { $pdf->addText($lx+2, $t-($z*$wy), $fs, $tx); break; }
					case "right" : { $pdf->addText($lx+$wi-$wx-5, $t-($z*$wy), $fs, $tx); break; }
				}
//				$pdf->addText($lx+2, $t-($z*$wy), $fs, $tx);
				$zeile=$wort.' ';
				$z++;
			}
		}
		$tx=$zeile; // $pdf->addText($lx+2, $t-($z*$wy), $fs, $tx);
		$wx = $pdf->getTextWidth($fs, $zeile);
		switch ($al) {
			case "center" : { $pdf->addText($lx+(($wi-$wx)/2)+1, $t-(($z-1)*$wy+2), $fs, $tx); break; }
			case "left" : { $pdf->addText($lx+2, $t-($z*$wy), $fs, $tx); break; }
			case "right" : { $pdf->addText($lx+$wi-$wx-5, $t-($z*$wy), $fs, $tx); break; }
		}
//		if ($maxh <= $z) $maxh=$z;
	}
	if ($box == 2) { 
		$pdf->setColor(0.9,0.9,0.9);
		$pdf->filledRectangle($lx, $ty-($bh*$maxh), $wi, $bh*($maxh+1));
		$pdf->setColor($tfarb[0],$tfarb[1],$tfarb[2]);
		$pdf->rectangle($lx, $ty-($bh*$maxh), $wi, $bh*($maxh+1));
	}
	if ($box == 1) { 
		$pdf->rectangle($lx, $ty-($bh*$maxh), $wi, $bh*($maxh+1));
	}
	$pdf->setColor($tfarb[0],$tfarb[1],$tfarb[2]);
	$wx = $pdf->getTextWidth($fs, $tx); $kurz=false;
	if ($ku == 1) { // Nur 1 Zeile mit ... am Ende
		$minus=12;
		if ($isfett==1) $minus=22;
		while ($wx >= ($wi-$minus)) {
			$tx=substr($tx,0, strlen($tx)-1);
			$wx = $pdf->getTextWidth($fs, $tx.'...'); $kurz=true;
		}
		if ($kurz) $tx.="...";
	}
	if ($ku < 2) {
		if ($valign=="vtop") { $dt=1; } else { $dt=7; }
		switch ($al) {
			case "center" : { $pdf->addText($lx+(($wi-$wx)/2), $t-$dt, $fs, $tx); break; }
			case "left" : { $pdf->addText($lx+2, $t-$dt, $fs, $tx); break; }
			case "right" : { $pdf->addText($lx+$wi-$wx-5, $t-$dt, $fs, $tx); break; }
		}
	}
	return $z;
}
function getMaxZeilen($fs, $tx, $wi) {
	global $pdf;
	$tx=str_replace(chr(13)," ", $tx);
	$tx=str_replace(chr(10),"", $tx);
	$wy = $pdf->getFontHeight($fs);
	$z=0;
	$arr=explode(" ", $tx); $zeile="";
	foreach($arr as $wort) {
		$zeile.=$wort.' ';
		$wx = $pdf->getTextWidth($fs, $zeile);
		if ($wx > ($wi-24)) {
			$zeile=$wort.' ';
			$z++;
		}
	}
	return $z;
}
function datediff($interval, $datefrom, $dateto, $using_timestamps = false) {
  if (!function_exists("fullyears")) {  
	  function fullyears($datefrom, $dateto, $difference) {
		  $years_difference = floor($difference / 31536000);
		  if (mktime(date("H", $datefrom), date("i", $datefrom), date("s", $datefrom), date("n", $datefrom), date("j", $datefrom), date("Y", $datefrom)+$years_difference) > $dateto) {
			$years_difference--;
		  }
		  if (mktime(date("H", $dateto), date("i", $dateto), date("s", $dateto), date("n", $dateto), date("j", $dateto), date("Y", $dateto)-($years_difference+1)) > $datefrom) {
			$years_difference++;
		  }
		  return $years_difference;
	  }
  }
  if (!function_exists("fullmonths")) {
	  function fullmonths($datefrom, $dateto, $difference) {
		  $months_difference = floor($difference / 2678400);
		  while (mktime(date("H", $datefrom), date("i", $datefrom), date("s", $datefrom), date("n", $datefrom)+($months_difference), date("j", $dateto), date("Y", $datefrom)) < $dateto) {
			$months_difference++;
		  }
		  $months_difference--;
		  return $months_difference;
	  }
   }
  /*
    $interval can be:
    yyyy - Number of full years
    q - Number of full quarters
    m - Number of full months
    y - Difference between day numbers
      (eg 1st Jan 2004 is "1", the first day. 2nd Feb 2003 is "33". The datediff is "-32".)
    d - Number of full days
    w - Number of full weekdays
    ww - Number of full weeks
    h - Number of full hours
    n - Number of full minutes
    s - Number of full seconds (default)
  */
  
  if (!$using_timestamps) {
    if (strstr($datefrom, '-') == false) {
		$tmp = explode('.',$datefrom);
		$datefrom = $tmp[1].'/'.$tmp[0].'/'.$tmp[2];
	}
    if (strstr($dateto, '-') == false) {
		$tmp = explode('.',$dateto);
		$dateto = $tmp[1].'/'.$tmp[0].'/'.$tmp[2];
	}
    $datefrom = strtotime($datefrom, 0);
    $dateto = strtotime($dateto, 0);
  }
  $difference = $dateto - $datefrom; // Difference in seconds
   
  switch($interval) {
   
    case 'yyyy': // Number of full years
      $datediff = fullyears($datefrom, $dateto, $difference);
      break;

    case "q": // Number of full quarters
      $quarters_difference = floor($difference / 8035200);
      while (mktime(date("H", $datefrom), date("i", $datefrom), date("s", $datefrom), date("n", $datefrom)+($quarters_difference*3), date("j", $dateto), date("Y", $datefrom)) < $dateto) {
        $quarters_difference++;
      }
      $quarters_difference--;
      $datediff = $quarters_difference;
      break;

    case "m": // Number of full months
      $datediff = fullmonths($datefrom, $dateto, $difference);
      break;

    case 'y': // Difference between day numbers
      $datediff = date("z", $dateto) - date("z", $datefrom);
      break;

    case "d": // Number of full days
      $datediff = floor($difference / 86400);
      break;

    case "w": // Number of full weekdays
      $days_difference = floor($difference / 86400);
      $weeks_difference = floor($days_difference / 7); // Complete weeks
      $first_day = date("w", $datefrom);
      $days_remainder = floor($days_difference % 7);
      $odd_days = $first_day + $days_remainder; // Do we have a Saturday or Sunday in the remainder?
      if ($odd_days > 7) { // Sunday
        $days_remainder--;
      }
      if ($odd_days > 6) { // Saturday
        $days_remainder--;
      }
      $datediff = ($weeks_difference * 5) + $days_remainder;
      break;

    case "ww": // Number of full weeks
      $datediff = floor($difference / 604800);
      break;

    case "h": // Number of full hours
      $datediff = floor($difference / 3600);
      break;

    case "n": // Number of full minutes
      $datediff = floor($difference / 60);
      break;

    default: // Number of full seconds (default)
      $datediff = $difference;
      break;
  }    
  return $datediff;
}

function GetSQLDatum($datum) {
	if ($datum=="") return NULL;
	if (strstr($datum, '-') == false) {
		$tmp = explode('.',$datum);
		$datum = $tmp[2].'-'.$tmp[1].'-'.$tmp[0];
	}
	return $datum;
}
function GetEngDatum($datum) {
	if (strstr($datum, '-') == false) {
		$tmp = explode('.',$datum);
		$datum = $tmp[1].'/'.$tmp[0].'/'.$tmp[2];
	}
	return $datum;
}
function GetDtDatum($datum) {
	if ($datum=="" || $datum=="00.00.0000" || $datum=="0000-00-00") return "";
	$dat=$datum;
	if (strpos($dat,"-") > 0) {
		$m=explode('-',$dat);
		$dat=$m[2].'.'.$m[1].'.'.$m[0];
	}
	return $dat;
}
function GetSQLBetrag($betr, $r="FALSE") {
	$dezk = strrpos($betr, ",");
	$dezp = strrpos($betr, ".");
	if ($dezk > $dezp) {  //Dezpunkt = Komma (deutsch)	
		$betr = str_replace(".", "", $betr);    //Tausender entfernen
		$betr = str_replace(",", ".", $betr);   //Komma in Punkt umwandeln
	} else {              //Dezpunkt = Punkt (englisch)
		$betr = str_replace(",", "", $betr);    //Tausender entfernen
	}	
	if ($r=="TRUE" And $betr > 0) {
		return round($betr, 2);
	} else {
		return $betr;
	}
}
  
if (!function_exists("GetSQLValueString")) {
  function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") {
    switch ($theType) {
      case "text":
        $theValue = ($theValue != "") ? "'" . $theValue . "'" : "''";
        break;    
      case "long":
      case "int":
        $theValue = ($theValue != "") ? intval($theValue) : "NULL";
        break;
      case "double":
        $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "'0.00'";
		break;
      case "date":
        // format the date according to the current locale
        global $KT_localFormat;
        global $KT_serverFormat;
        if ($theValue != "") {
//            $theValue = KT_convertDate($theValue, $KT_localFormat, $KT_serverFormat);
        }
        $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
        break;
      case "defined":
        $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
        break;
    }
    return $theValue;
  }
}

if (!function_exists("KT_redir")) {
		function KT_redir($url) {
			global $_SERVER;
			$protocol = "http://";;
			$server_name = $_SERVER["HTTP_HOST"];
			if ($server_name != '') {
				$protocol = "http://";;
				if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == "on")) {
					$protocol = "https://";;;
				}
				if (preg_match("#^/#", $url)) {
					$url = $protocol.$server_name.$url;
				} else if (!preg_match("#^[a-z]+://#", $url)) {
					$url = $protocol.$server_name.(preg_replace("#/[^/]*$#", "/", $_SERVER["PHP_SELF"])).$url;
				}
				header("Location: ".$url);
			}
			exit;
		}
}

?>
