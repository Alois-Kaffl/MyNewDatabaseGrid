<?php
error_reporting(E_ALL ^ E_NOTICE);
ini_set('display_errors', 1);
header("X-XSS-Protection: 0");
$html=stripslashes($_POST["grHtml"]);
$orie=$_POST["orient"];
$align=$_POST["align"];
//$width=$_POST["breite"];
//$height=$_POST["hoehe"];
if ($orie=="Landscape") {
	$wi="27.5cm"; $hi="18cm";
} else {
	$wi="18cm"; $hi="27.5cm";	
}
//$tmarg="44px";
$h_align="left"; $v_align="top";
switch($align) {
	case "ct": $h_align="center"; $v_align="top"; break;
	case "lt": $h_align="left"; $v_align="top"; break;
	case "rt": $h_align="right"; $v_align="top"; break;
	case "cc": $h_align="center"; $v_align="center"; break;
	case "lc": $h_align="left"; $v_align="center"; break;
	case "rc": $h_align="right"; $v_align="center"; break;
	case "cb": $h_align="center"; $v_align="bottom"; break;
	case "lb": $h_align="left"; $v_align="bottom"; break;
	case "rb": $h_align="right"; $v_align="bottom"; break;
}
//echo $orie.'#'.$h_align.'#'.$v_align.'#'.$width.'#'.$height;
//exit();
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Print Table</title>
<script src="javascript/jquery-2.2.2.js"></script>
<link rel="stylesheet" type="text/css" href="css/MyNewGrid.css">
<style type="text/css">
table, document {
	font-family:Verdana, Geneva, sans-serif;
	font-size:10px;
}
#prtDiv {
	position:absolute;
	left:0;
	top:30;
	width:<?php echo $wi; ?>;
	height:<?php echo $hi; ?>;
	border:thin solid white;
	z-index:5;
}
#tblDiv {
	position:absolute;
	left:0;
	top:0;
	width:<?php echo $wi; ?>;
	height:<?php echo $hi; ?>;
	border:thin solid white;
	z-index:10;
}
.outer {
	background-color:#FFF;
}
</style>

<script type="text/javascript">
$(document).ready(function() {
	var col=1;
	$("table").width("100%");
	$('*').removeAttr("onmouseout").removeAttr("onmouseover");
	$(".header").css("cursor","default");
	if ($("[name='aktiv']").length > 0){
		$("[name='aktiv']").remove(); col++;
	}
	$('.dataRow').css("font-size","10px");
	$("[name='gridbox-aktiv']").remove();
	var leng = $(".title-box").prop("colspan");
	$(".title-box").prop("colspan", leng-col);
	$(".headhrow").remove();
	$(this).css('cursor','default');
	$(".gridboxisFilter").remove();
	$(".action, .th_action").remove();
	$(".myGridActionSumRow").remove();
	$(".navirow").remove();
	$(".fiMsg").remove();
	$(".AktFiBox").remove();
	$(".filterrow").remove();
	$('*').unbind();
	var mainW=$("#prtDiv").width();
	var mainH=$("#prtDiv").height();
	var tblW=$("#tblDiv").width();
	var tblH=$("#tblDiv").height();
	$("#tblDiv").width(mainW);
	switch("<?php echo $v_align; ?>") {
		case "center": {
			var ttop=((mainH/2)-(tblH / 2));
			$("#tblDiv").css("top", ttop); 
			break;
		}
		case "bottom": {
			$("#tblDiv").css("top",(mainH) - (tblH));
		}
	}
	$("#btnPrint").printPreview({
			obj2print:'#prtDiv',
			width:mainW,
			height:(mainH+30)
	});
});
</script>
</head>

<body>
<div id="prtDiv" align="<?php echo $h_align; ?>">
	<div class="inner" id="tblDiv"><?php echo $html; ?></div>
</div>
</body>
</html>