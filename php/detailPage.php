<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$id=$_GET["row_id"];
$mode=$_GET["mode"];

?>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Details Page</title>
<script src="../includes/jquery-2.2.2.js"></script>
<link rel="stylesheet" type="text/css" href="MyNewGrid.css">

<script type="text/javascript">
$(document).ready(function() {
	// javascript here
	$("#rid").val("<?php echo $id; ?>");
	$("#detmode").val("<?php echo $mode; ?>");
});
</script>
</head>

<body>
<p>
  <label for="rid">Row-ID:</label>
  <input type="text" name="rid" id="rid" va>
</p>
<p>
  <label for="detmode">D-Mode:</label>
  <input type="text" name="detmode" id="detmode">
</p>
<div id="propDiv">
</div>
</body>
</html>