<?php
error_reporting(E_ALL ^E_NOTICE);
ini_set('display_errors', 1);
// Database Connection
require_once("php/MyGridFunc.php");
$encrypted_DBName = simple_crypt($key, "usrdb_kafflobx_help", $action = 'encrypt'); // Name of Database
$encrypted_DBUser = simple_crypt($key, "kafflobx", $action = 'encrypt'); // Username in Database
$encrypted_DBPaWo = simple_crypt($key, "Bay03ern", $action = 'encrypt'); // Passwort for Database
?>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Test My New Grid</title>
<script src="javascript/jquery-2.2.2.js"></script>
<script src="javascript/jsPDF.js"></script>
<script src="../includes/html_2_canvas.min.js"></script>
<script src="javascript/jquery-ui.js"></script>
<script src="javascript/jquery.ui.datepicker-de.js"></script>
<script src="javascript/MyNewGridLang.js"></script>
<script src="javascript/MyNewGrid_Class_min.js"></script>
<link rel="stylesheet" type="text/css" href="css/MyNewGrid.css">
<link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="css/jquery-ui.structure.css">
<link rel="stylesheet" type="text/css" href="css/jquery-ui.theme.css">
<script type="text/javascript">
db_name="<?php echo $encrypted_DBName; ?>"; db_user="<?php echo $encrypted_DBUser; ?>"; db_pawo="<?php echo $encrypted_DBPaWo; ?>";
//pers_id = 99;
$(document).ready(function() {
	myGrid1=new MainMyGridObject("myGrid1", "Grid1", "en", "./php/", "./", "./"); // ClassVariable, Div-ID, Path to PHP-Functions, images-folder, print*.php;
	myGrid1.setTableOptions("95%", "2px", "0px", "1", "With Extended Filter and no ID Column"); // width, padding, space, border, titelText
	myGrid1.setDatabase(db_name, db_user, db_pawo); // Database, Username, Password
	myGrid1.setDataSource("DB", "table_grid_test", "gr_id", "gr_date", "ASC"); // DB or AR, Connection, Tabelle oder Full-SQL, primary ID, OrderCol, Sort Direction: ASC or DESC
	myGrid1.setMyGridCols("all"); // "all", "include*col1,col2,...", "exclude*col1,col2,..." -Spalten
	myGrid1.setHeadAlign('12px','bold',new Array("gr_ordernr*center","gr_id*left","gr_date*center","gr_photo*center")); // fiedname*align (left, center or right)
	myGrid1.setColAlign('12px','normal',new Array("gr_ordernr*center","gr_id*left","gr_date*center")); // fiedname*align (left, center or right)
	myGrid1.setBoldCols(new Array("gr_date","gr_price")); // Values in Cols are shown in BOLD
	myGrid1.setHeaderCaption(new Array("gr_id*ID","gr_title*Titel:","gr_uname*Benutzer:","gr_ordernr*Order-Nr:","gr_company*Firma:","gr_article*Artikel:","gr_price*Preis:","gr_tax*MWSt.:","gr_total*Endpreis:","gr_check*Ok:","gr_photo*Bild:","gr_email*Emailadr.:","gr_date*Orderdatum:","gr_status*Status:")); // fieldname*Caption
	myGrid1.setShow(false,true,true,true,true); //ID-Col, Action-Col, Title-Row, Sum-Row, Navi-Row
	myGrid1.setShowIcons(16,true,true,true); // IconSize, Edit, Delete, Newline
	myGrid1.setExport(true,true,true); // Excel, Printer, PDF
	myGrid1.setWhereClause("table_grid_test.gr_id > 0"); // Fully qualified (with table name and dot) if used with LookUps
	myGrid1.setPropPage("detailPage","b_props.png","func","Show only"); // Path to page or function name, image, show=no save; edit=with save; func=function (Path is function name, tooltip;
	myGrid1.setBackgroundIf(new Array("gr_total*myBGColorFunc"));
	myGrid1.setFilter(true); // true=Quickfilter On (Quickfilter = only one Line of boxes); If empty: No Quick filter
	myGrid1.setLookUp(new Array("DB*gr_title*table_grid_titles*tfid*tfbez*var")); // FromDB DB*OrgField*FTable*FKey*ReturnField*returnType;
//	myGrid1.setFixColForInsert("pid="+pers_id); As Example!
//  myGrid1.setButton(new Array("db_field*Show...*./newPage.php)); // Show button in Col; Click calls function: function executeButton(‘Url‘,‘row_id‘) { ... }
//  myGrid1.setNoDataMsg("Keine Daten gefunden!");
//  myGrid1.setRowHighLight(false); Default is true!
//	myGrid1.setTextArea(new Array("gr_company")); // Set Field to a TextAreaBox in Edit and NewLine input
  myGrid1.setColorCols(new Array("gr_article*myColorFunc")); // fieldname*funcName
	myGrid1.setManualRefresh(); // Shows Icon in Titlebar for manual refresh of table
	myGrid1.setBoolCols(new Array("gr_check*null")); // Field*state (null, false, true)
	myGrid1.setSumCols('12px','bold',"view",new Array("gr_ordernr*int","gr_price*dec","gr_tax*dec","gr_total*dec")); // SumMode=all or view, field*type - type=dec or int
	myGrid1.setNumFormat(new Array("gr_ordernr#.*","gr_price#,:.:2*€","gr_tax#,:.:2*€","gr_total#,:.:2*€")); // Float: Decimal-Thousandmarker-Precision*Currency - Integer: only Thousandmarker used if present
	myGrid1.setDateFormat("GE", true); // GE=German; EN=English -- Default = MySQL-Database; true=Show Calendar on Input
	myGrid1.setTimeFormat("00:00");    // Set Timeformat to hour:minute only
	myGrid1.setValidRules(new Array("gr_title*sma*1*%","gr_uname*var*3*30","gr_ordernr*int*1*%","gr_price*dec*0.01*%","gr_tax*dec*0.01*%","gr_total*dec*0.01*%","gr_date*dat*2020-01-01*2022-01-01")); // ColName*type*minimal*maximal  (%=unimportant)
	myGrid1.setColsResize("Test_Grid-01"); // Cols are resizeable, Name of Field for stored in ColWidths
	myGrid1.setFitTextInLine("..."); // Cut Text to ColWidth with "x" on the end
	myGrid1.setNoInputFields(new Array("gr_status")); // Exclude Flieds from Update
	myGrid1.setNoInputFieldsAtNewLine(new Array("gr_check","gr_id")); // Exclude Flieds from Insert (must have default value!)
	myGrid1.setSuggestAtNewLine(new Array("gr_company*1*left","gr_article*1*left"));	// If ActionCol->ShowNewRow=true -> field*Chars before lookup*Where to find (left or middle)
	myGrid1.setCalcFieldAtNewLine(new Array("gr_price#gr_tax*gr_total*funcCalcNL"));  // Array with col names(#) * target col * name of function to calculate
	myGrid1.setEmailLinks(new Array("gr_email"));
	myGrid1.setFreeLookCols(new Array("gr_status*myFreeColLook")); //"Column name*function name"
	myGrid1.setImageCols("./photos/", new Array("gr_photo*24*24")); //Path prefix, Array of "Column name*width*height"
	myGrid1.setPrintOpts("Landscape","lt");
	myGrid1.setLanguage(0); // 0 to 2 only; DB-Value can have 3 values separated by * (star); Examle: "cat*Katze*Matze" (english*deutsch*albanian)
	myGrid1.Init();

	myGrid2=new MainMyGridObject("myGrid2", "Grid2", "de", "./php/", "./", "./php/"); // ClassVariable, Div-ID, Path to PHP-Functions, images-folder, print*.php;
	myGrid2.setTableOptions("95%", "2px", "0px", "1", "With minimum Options"); // width, padding, space, border, titelText
	myGrid2.setDatabase(db_name, db_user, db_pawo); // Database, Username, Password
	myGrid2.setDataSource("DB", "table_grid_test", "gr_id", "gr_date", "ASC"); // DB or AR, Connection, Tabelle oder Full-SQL, primary ID, OrderCol, Sort Direction: ASC or DESC
	myGrid2.setMyGridCols("all"); // "all", "include*col1,col2,...", "exclude*col1,col2,..." -Spalten
	myGrid2.Init();
	
	doUpdate();
});
function myFreeColLook(value) {
	switch(value) {
		case "3": var astr="<img src='images/led_green.png' width='16' height='16' alt='Green'>"; break;
		case "2": var astr="<img src='images/led_blue.png' width='16' height='16' alt='Green'>"; break;
		case "1": var astr="<img src='images/led_red.png' width='16' height='16' alt='Green'>"; break;
		default: var astr="<img src='images/led_yellow.png' width='16' height='16' alt='Green'>";
	}
	return astr;
}
function myBGColorFunc(value) {
	if (parseFloat(value) > 100) return "00FF99"; // Color code without "#"
	return "";
}
function myColorFunc(value) {
	if (value=="Trenchcoat") return "FF0000"; // Color code without "#"
	return "";
}
function detailPage(obj,tr_id,row_id) {
	// Call here your own page!
	alert("Function *detailPage()* was called!\n"+obj.TableID+'#'+tr_id+'#'+row_id);
	return "";
}
function afterDrawRow(z,rid) {
	// Manipulate with row-number and row-id
	// alert(z+"#"+rid); Show for every row!
	return ""; // must return empty string if all OK - otherwise error message
}
function number_format (number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
function funcCalcNL(sTarget,aCols) {   // Target-ID, CalcCols-IDs
	var sum=0.00;
	for(var x=0; x < aCols.length; x++) { // Each field
		sum+=makeSQLbetrag(-1,$("#"+aCols[x]).val(),",:.:2*€");
	}
	sum=number_format(sum,2,",",".");
	$("#"+sTarget).val(sum);
}
function doUpdate() { // Not for MyGrid
	var rsql=myGrid1.getSQL(); rsql=rsql.replace(/,/g,", ");
	$("#lbsql").text(rsql);
}
</script>
</head>
<body>
<p align="center" style="font-family:Verdana, Geneva, sans-serif; font-size:18px; font-weight:bold">Javascript Database Grid</p>
<p align="center" style="font-family:Verdana, Geneva, sans-serif; font-size:14px">Sortable, editable and highly configurable!</p>

<div id="Grid1" class="canvas_div_pdf" align="center"></div>
<p align="center"><label id="lbsql"></label>
<p>&nbsp;</p>
<p align="center">Grid 2 with the smallest option range possible!</p>
<div id="Grid2" align="center"></div>
<p>&nbsp;</p>
<p>Mail to: <a href="mailto:">alois@kaffl.org</a></p><br />
<div align="center"><img src="Doku/Grid.jpg" width="1625" height="358" alt="bild"></div>
</body>
</html>