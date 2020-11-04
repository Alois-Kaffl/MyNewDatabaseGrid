// JavaScript Document
ytimer=null; start_up=true; skip=false;
$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};
jQuery.fn.center = function (div) {
	this.css("position", "absolute");
	var position = div.position();
	this.css("top", Math.max(0, ((div.height() - this.outerHeight()) / 2) + position.top) + "px");
	this.css("left", Math.max(0, ((div.width() - this.outerWidth()) / 2) + position.left) + "px");
	return this;
};
jQuery.fn.centerScreen = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
};
function MainMyGridObject (objName, divName, dla, path_php, path_img, path_print) {
  try {
	if (path_print==undefined) path_print="./php/";
	this.Lang=dlang[dla];
	this.ObjName=objName; this.DivID=divName; this.TableID="gr"+divName; this.MyPath=path_php;//+"MyNewGrid/";
	this.ShowTitle=true; this.TitleText="Titel"; this.PrtTblPath=path_print; this.ImagesPath=path_img; this.Stop=false;
	this.showFilter=false; this.QuickFilter=false; this.FilterSql=""; this.noFiLook=true; this.showFilter2=false;
	this.showNaviRow=true; this.StartRow=0; this.AnzRows=25; this.TotalRows=0; this.Language=-1;
	this.TbWidth="90%"; this.TbPadding="1"; this.TbSpacing="0"; this.TbBorder="0";
	this.DataSource="DB"; this.DataTable=""; this.DbName=""; this.UName=""; this.PaWo="";
	this.Sql=""; this.FullSql=""; this.PrimID=""; this.RecSet={}; this.NoInput=new Array(); this.NoInputNL=new Array();
	this.TxtArea=new Array(); this.ColButton=new Array();
	this.ShowCols=""; this.ShowID=true; this.ShowAction=true;
	this.ShowEdit=true; this.ShowDelete=true; this.ShowNewLine=true; this.IconSize=16;
	this.Spalten=[]; ColNamesStr=""; this.AnzCols=0; this.HighLight=true;
	this.HeaderCaps=[]; this.ColAlign=[]; this.OrderCol=""; this.OrderDir="ASC"; this.AktOrderCol="";
	this.BoolCols=[]; this.WhereClause=""; this.isDelEdi=-1; this.ValidRules=new Array();
	this.ShowXLS=false; this.ShowPRT=false; this.ShowPDF=false; this.ShowManRefresh=false;
	this.HFontSize='10px'; this.HFontWeight="bold"; this.CFontSize='10px'; this.CFontWeight="normal";
	this.SFontSize='12px'; this.SFontWeight="bold"; this.TimeFormat="hh:mm:ss";
	this.showSumRow=false; this.SumCols=new Array(); this.SumMode="all"; this.SumLineDa=false; this.SumVals=new Array();
	this.NumFormat=new Array(); this.DateFormat="SQL"; this.ShowCal=false; this.ShowAllExec=false; this.AllExecFunc="";
	this.LookUp=new Array(); this.Lookfields=""; this.ColResize=false; this.DbGridForSize="";
	this.FixColForInsert=new Array(); this.PrtOrient="hoch"; this.PrtAlign="cc";
	this.FitTextInLine=false; this.textEnd="..."; this.PropPath=""; this.PropMode="show"; this.ShowDetailPage=false;
	this.DetailImg=""; this.ToolTip=""; this.Suggest=new Array(); this.CalcNL=new Array();
	this.EmailLinks=new Array(); this.BoldCols=new Array(); this.ColorCols=new Array(); this.FreeLookCols=new Array(); this.BackCols=new Array();
	this.ImageCols=new Array(); this.ImagePath="./"; this.NoDataMsg="No data found!";
	this.IconCondEd="show"; this.IconCondCa="show"; this.IconCondPr="show";
	this.LastSQL=""; this.LastJson=Object; this.oldValues=new Array(); this.LastRowID=0;
	
	this.getLastRowID=getLastRowID;
	this.getSQL=getSQL;
	this.getLastSQL=getLastSQL;
	this.getLastJson=getLastJson;
	this.setButton=setButton;
	this.setRowHiLight=setRowHiLight;
	this.setImageCols=setImageCols;
	this.setFreeLookCols=setFreeLookCols;
	this.setColorCols=setColorCols;
	this.setBoldCols=setBoldCols;
	this.setBackgroundIf=setBackgroundIf;
	this.setEmailLinks=setEmailLinks;
	this.setLanguage=setLanguage;
	this.setCalcFieldAtNewLine=setCalcFieldAtNewLine;
	this.setSuggestAtNewLine=setSuggestAtNewLine;
	this.setManualRefresh=setManualRefresh;
	this.setPropPage=setPropPage;
	this.setPrintOpts=setPrintOpts;
	this.setFixColForInsert=setFixColForInsert;
	this.setFitTextInLine=setFitTextInLine;
	this.setNoInputFields=setNoInputFields;
	this.setNoInputFieldsAtNewLine=setNoInputFieldsAtNewLine;
	this.setTextArea=setTextArea;
	this.setValidRules=setValidRules;
	this.setWhereClause=setWhereClause;
	this.setDateFormat=setDateFormat;
	this.setTimeFormat=setTimeFormat;
	this.setLookUp=setLookUp;
	this.setNumFormat=setNumFormat;
	this.setFilter=setFilter;
	this.setHeaderCaption=setHeaderCaption;
	this.setMyGridCols=setMyGridCols;
	this.setColsResize=setColsResize;
	this.setBoolCols=setBoolCols;
	this.setSumCols=setSumCols;
	this.setHeadAlign=setHeadAlign;
	this.setColAlign=setColAlign;
	this.setShow=setShow;
	this.setExport=setExport;
	this.setShowIcons=setShowIcons;
	this.setShowIconsIf=setShowIconsIf;
	this.setShowAllExec=setShowAllExec;
	this.setDataSource=setDataSource;
	this.setDatabase=setDatabase;
	this.setTableOptions=setTableOptions;
	this.setNoDataMsg=setNoDataMsg;
	this.ReloadLines=ReloadLines;
	this.ClearAllFilter=ClearAllFilter;
	this.Init=Init;	
  } catch (e) {
	  alert(e+" Fehler! In MainTableObject");
  }
}
function setLanguage(lg) { // 0 to 2 only
	if (lg >= 0 && lg <= 2) {
		this.Language=lg;
	}
}
function setShowAllExec(b,f) {
	this.ShowAllExec=b;
	this.AllExecFunc=f;
}
function getLastRowID() {
	return this.LastRowID;
}
function getSQL() {
	return this.Sql;
}
function getLastSQL() {
	return this.LastSQL;
}
function getLastJson() {
	return this.LastJson;
}
function setButton(aB) {
	this.ColButton=aB;
}
function setRowHiLight(bH) {
	this.HighLight=bH;
}
function setNoDataMsg(sTxt) {
	this.NoDataMsg=sTxt;
}
function setImageCols(path,aIC) {
	this.ImagePath=path;
	this.ImageCols=aIC;
}
function setFreeLookCols(aFLC) {
	this.FreeLookCols=aFLC;
}
function setColorCols(aCC) {
	this.ColorCols=aCC;
}
function setBackgroundIf(aBg) {
	this.BackCols=aBg;
}
function setBoldCols(aBC) {
	this.BoldCols=aBC;
}
function setEmailLinks(aEL) {
	this.EmailLinks=aEL;
}
function setCalcFieldAtNewLine(aCalc) {
	this.CalcNL=aCalc;
}
function setSuggestAtNewLine(arr) {
	this.Suggest=arr;
}
function setManualRefresh() {
	this.ShowManRefresh=true;
}
function setPropPage(path,img,mode,tool_tip) {
	this.PropPath=path; this.PropMode=mode;
	this.ShowDetailPage=true;
	this.DetailImg=img; this.ToolTip=tool_tip;
}
function setPrintOpts(ori,ali) {
	this.PrtOrient=ori; this.PrtAlign=ali;
}
function setFixColForInsert(aFiCo) {
	this.FixColForInsert=aFiCo;
}
function setFitTextInLine(ende) {
	this.FitTextInLine=true;
	this.textEnd=ende;
}
function setNoInputFields(aI) {
	this.NoInput=aI;
}
function setNoInputFieldsAtNewLine(aI) {
	this.NoInputNL=aI;
}
function setTextArea(aTA) {
	this.TxtArea=aTA;
}
function setValidRules(afield)  {
	this.ValidRules=afield;
}
function setWhereClause(wcl) {
	this.WhereClause=wcl;
}
function setLookUp(aL) {
	this.LookUp=aL;
}
function setDateFormat(df,cal) {
	this.DateFormat=df; this.ShowCal=cal;
}
function setTimeFormat(tf) {
	this.TimeFormat=tf;
}
function setNumFormat(aNF) {
	this.NumFormat=aNF;
}
function setSumCols(fs,fw,m,aSum) {
	this.SFontSize=fs; this.SFontWeight=fw;
	this.SumMode=m; this.showSumRow=true; this.SumCols=aSum;
}
function setExport(xls,prt,pdf) {
	if (pdf==undefined) this.ShowPDF=false;
	this.ShowXLS=xls; this.ShowPRT=prt; this.ShowPDF=pdf;
}
function setHeadAlign(fs,fw,aCa) {
	this.HFontSize=fs; this.HFontWeight=fw;	this.HeadAlign=aCa;
}
function setColAlign(fs,fw,aCa) {
	this.CFontSize=fs; this.CFontWeight=fw;	this.ColAlign=aCa;
}
function setShowIcons(s,ed,de,nl) {
	this.IconSize=s+"px";
	this.ShowEdit=ed; this.ShowDelete=de; this.ShowNewLine=nl;
}
function setShowIconsIf(ed,can,prop) {
	if (ed != "") this.IconCondEd=ed;
	if (can != "") this.IconCondCa=can;
	if (prop != "") this.IconCondPr=prop;
}
function setShow(id,ac,ti,su,na) {
	this.ShowID=id; this.ShowAction=ac; this.ShowTitle=ti; this.showSumRow=su; this.showNaviRow=na;
}
function setBoolCols(aBool) {
	this.BoolCols=aBool;
}
function setMyGridCols(ctyp) {
	var tmp=ctyp.replace(/ /g,'');
	this.ShowCols=ctyp;
}
function setColsResize(fld) {
	this.ColResize=true; this.DbGridForSize=fld;
}
function setDataSource(dtyp, dtable, prim, ocol, odir) {
	this.DataSource=dtyp; dtable1=dtable.toLowerCase();
	if (dtable1.indexOf("from") > 0) {
		this.FullSql=dtable;
		var pos=dtable1.indexOf("from")+5;
		var end=dtable1.indexOf("where");
		var xstr=dtable1.substr(pos, pos, end-pos); 
		var sArg=xstr.split(" ");
		this.DataTable=sArg[0];
		
	} else {
		this.DataTable=dtable;
	}
	this.PrimID=prim; this.OrderCol=ocol; this.OrderDir=odir; this.AktOrderCol=ocol;
}
function setDatabase(db,un,pw) {
	this.DbName=db; this.UName=un; this.PaWo=pw;
}
function setTableOptions(wid,pad,spa,bor,tit) {
	this.TbWidth=wid; this.TbPadding=pad; this.TbSpacing=spa; this.TbBorder=bor; this.TitleText=tit;
}
function setHeaderCaption(aHC) {
	this.HeaderCaps=aHC;
}
function setFilter(qui,noFi) {
	if (qui==undefined) qui=false;
	if (noFi==undefined) noFi=false;
	this.showFilter=true; this.QuickFilter=qui; this.showFilter2=noFi;
}
function doExcel(obj) {
	var caps="";
	$("."+obj.DivID+"_header").each(function(index, element) {
    caps+=$(element).text()+",";
  });
	caps=caps.slice(0,-1);
	var flds="";
	$("."+obj.DivID+"_header").each(function(index, element) {
    flds+=$(element).attr("name")+",";
  });
	flds=flds.slice(0,-1);
	var sql=obj.Sql;
	var keys=new Array("dbase","user","pawo","GridName","captions","felder","sql");
	var values=new Array(db_name,db_user,db_pawo,obj.ObjName,caps,flds,sql); // xlshtml
	windowOpenInPost("Excel",obj.PrtTblPath+"printXls.php", "", "", keys, values);
//	alert(caps+"#"+flds);
}
function doPDF(obj) {
	var divHeight = $('#Grid1').height();
	var divWidth = $('#Grid1').width();
	var ratio = divHeight / divWidth;
	html2canvas(document.getElementById('Grid1')).then(function(canvas){
			var wid=0;
			var hgt=0
			var img = canvas.toDataURL("image/png", wid = canvas.width, hgt = canvas.height);
			var hratio = hgt/wid
			var doc = new jsPDF('l','pt','a4');
			var width = doc.internal.pageSize.width-20;    
			var height = width * hratio
			doc.addImage(img,'JPEG',10,50, width, height);
			doc.save('Test.pdf');
	});
}
function doPrintTbl(obj) {
	var twidth=$("#tbl_"+obj.DivID).innerWidth(); var theight=$("#tbl_"+obj.DivID).innerHeight(); 
	var tfilter="";
	var prthtml=$("#"+obj.DivID).html();
	var arrFi=new Array(); var parent=null;
	$(".filtd1").each(function(idx,ele) {
		var ziel_id=ele.id; // Ziel-ID
		var tmp=$(ele).children("div:first-child").get(0);
		var quel_id=$(tmp).children(":first").prop("id");
		if (quel_id != undefined) {
			var aid=quel_id.split("_");
			var art=aid[1];
			var ret=$("#"+quel_id).val();
			switch(art) {
				case "txFi": {
					var ret=$("#"+quel_id).val();
					if (ret != "") tfilter+=ziel_id+'#'+ret+'*'; break; }
				case "seFi": {
					var ret=$("#"+quel_id).val();
					if (ret != "0") tfilter+=ziel_id+'#'+ret+'*'; break; }
				case "chFi": {
					var ret=$(ele).prop("checked");
					tfilter+=ziel_id+'#'+ret+'*'; break; }
			}
		}
	});
	$(".filtd2").each(function(idx,ele) {
		var ziel_id=ele.id; // Ziel-ID
		var tmp=$(ele).children("div:first-child").get(0);
		var quel_id=$(tmp).children(":first").prop("id");
		if (quel_id != undefined) {
			var aid=quel_id.split("_");
			var art=aid[1];
			var ret=$("#"+quel_id).val();
			switch(art) {
				case "txFi": {
					var ret=$("#"+quel_id).val();
					if (ret != "") tfilter+=ziel_id+'#'+ret+'*'; break; }
				case "seFi": {
					var ret=$("#"+quel_id).val();
					if (ret != "") tfilter+=ziel_id+'#'+ret+'*'; break; }
				case "chFi": {
					var ret=$(ele).prop("checked");
					tfilter+=ziel_id+'#'+ret+'*'; break; }
			}
		}
	});
	tfilter=tfilter.substr(0,tfilter.length-1);
	var keys=new Array("grHtml","orient","align","filter");
	var values=new Array(prthtml,obj.PrtOrient,obj.PrtAlign,tfilter);
	windowOpenInPost("Print",obj.PrtTblPath+"printTbl.php", "", "", keys, values);
}
function windowOpenInPost(titel,actionUrl,windowName, windowFeatures, keyParams, valueParams) {
	var mapForm = document.createElement("form");
	var milliseconds = new Date().getTime();
	windowName = windowName+milliseconds;
    mapForm.target = windowName;
    mapForm.method = "POST";
    mapForm.action = actionUrl;
    if (keyParams && valueParams && (keyParams.length == valueParams.length)){
        for (var i = 0; i < keyParams.length; i++){
        var mapInput = document.createElement("input");
            mapInput.type = "hidden";
            mapInput.name = keyParams[i];
            mapInput.value = valueParams[i];
            mapForm.appendChild(mapInput);
        }
        document.body.appendChild(mapForm);
    }
    map = window.open('', windowName, windowFeatures);
	if (map) {
		mapForm.submit();
		timerObj = window.setInterval("ReTitle('"+titel+"')", 10);
	} else {
		alert('You must allow popups for this map to work.');
	}
}
function ReTitle(newTitle){
    if (map.document.readyState == 'complete') {
        map.document.title=newTitle;
        window.clearInterval(timerObj);
    }
}
function setBold(ele,hl) {
    if (hl) {
		tmpClass=($("#"+ele.id).hasClass("myGridOddRow")) ? "myGridOddRow" : "myGridEvenRow";
		tmpClass2=($("#"+ele.id).hasClass("myGridOddRow")) ? "tOdd" : "tEven";
		if (tmpClass=="myGridOddRow") {
			$("#"+ele.id).not(".aktionCell").removeClass("tOdd");
		} else {
			$("#"+ele.id).not(".aktionCell").removeClass("tEven");
		}
		$("#"+ele.id).not(".aktionCell").removeClass(tmpClass).addClass("myGridHighLightRow");
		$("#"+ele.id).find(".aktionCell").removeClass("myGridActionRow").addClass("myGridActionRowHL");
    }
}
function setNorm(ele,hl) {
    if (hl) {
		$("#"+ele.id).not(".aktionCell").removeClass("myGridHighLightRow").addClass(tmpClass2).addClass(tmpClass);
		$("#"+ele.id).find(".aktionCell").removeClass("myGridActionRowHL").addClass("myGridActionRow");
    }
}
function doEdit(obj,ele,zeile) {
	var rowid=$("#"+obj.DivID+"z_"+zeile).data("keywert");
//	alert($("#"+obj.DivID+"z_"+zeile).data("keywert"));
	var fnstring = "beforeEdit"; var retu="";
	var fn = window[fnstring];
	if (typeof fn === "function") {
		retu=fn(obj.DivID+"z_"+zeile,rowid);
	}
	if (retu!="") {
//		alert(retu);
	} else {
		var lval=$(this).data("lookval");
//		alert("Start: "+lval);
		$("#"+obj.DivID+"js_load").center($("#tbl_"+obj.DivID)).show();
		obj.isDelEdi=1;
		$("."+obj.DivID+"-edit, ."+obj.DivID+"-delete, ."+obj.DivID+"-detailpage, ."+obj.DivID+"-detailfunc").hide();
		$("#"+obj.DivID+"sav_"+zeile+", #"+obj.DivID+"can_"+zeile).show();
		$("#btButton_"+zeile).hide();
		obj.oldValues.length = 0;
		$("."+obj.DivID+"z_"+zeile).each(function(i) {
			var finaT=$(this).prop("id").split("#"); var fina=finaT[1]; skip=false; inpSkip=false;
			for (var xx in obj.NoInput) {
				if (fina==obj.NoInput[xx]) {
					inpSkip=true; break;
				}
			}
			var lval=$(this).data("lookval");
//			alert(lval);
			if (inpSkip==false) {
				
				obj.oldValues.push(lval);
				for (var lup in obj.LookUp) {
					tlup=obj.LookUp[lup].split("*"); //1=ofield,2=table,3=fkey,4=return_field,5=type,6=WhereClause,7=FiNoSel,8=orderFld
					var whereCl=""; var orderBy="";
					if (tlup[6]==undefined) tlup[6]="null";
					if (tlup[7]==undefined) tlup[7]=false;
					if (tlup[8]==undefined) tlup[8]="null";
					if (tlup[8] != "null") orderBy=" ORDER BY "+tlup[8];
					if (tlup[0]=="DB" && tlup[1]==fina) { //Spalte = LookUp
						var wc=tlup[6];
						if (wc.indexOf("XXX") > 0) {
							wc=wc.replace("XXX",lval);
						}
						if (tlup[6] != "null") whereCl=" WHERE "+wc;
						var inp="<div id='ip_"+i+"'><select id='selbox_"+i+"' class='editbox' data-spname='"+fina+"'>";
						var sql="SELECT DISTINCT "+tlup[3]+" as tkey, "+tlup[4]+" as item FROM "+tlup[2]+whereCl+orderBy+" ";
						var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=drawRowsJson", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "sql": sql, "cnams": "tkey,item"}, async: false}).responseText;
						var oRecSet=$.parseJSON(result);
						var total=oRecSet.opts[1].total;
						obj.LastSQL=sql; obj.LastJson=oRecSet;
						inp+="<option value='0'></option>";
//						if (tlup[7] && (lval != 0 && lval != null)) inp+="<option value='"+lval+"' style='color:red'>"+lval+"</option>";
//						inp+="<option value='0'>"+"#leer#>"+"</option>";
						for (var r in oRecSet.rows) {
							inp+="<option value='"+oRecSet.rows[r].tkey+"'>"+oRecSet.rows[r].item+"</option>";
						}
						inp+="</select></div>";
						$(this).html(inp);
						if (lval=="") lval="0";
						$("#selbox_"+i).val(lval);
						skip=true;
					} else if (tlup[0]=="AR" && tlup[1]==fina) {
						var ta=$(this).css("text-align");
						var inp="<div id='ip_"+i+"'><select id='selbox_"+i+"' class='editbox' data-spname='"+fina+"'>";
						var arrName=tlup[2]; var aray=eval(arrName);
						for(var index in aray) {
							inp+="<option value='"+(aray[index])+"'>"+(aray[index])+"</option>";
						}
						inp+="</select></div>";
						$(this).html(inp);
						$("#selbox_"+i).css("text-align",ta).val($(this).data("lookval"));
						skip=true;
					}
				}
				if (skip==false) {
					if (!(fina == obj.PrimID)) {
						var typ=obj.Spalten[fina].coltyp; var isDat="";
						if (typ=="dat") isDat=" eddate";
						if ($(this).hasClass("Bool") == false) {
							$(this).css("padding","0");
							var ta=$(this).css("text-align");
							if (typ=="image" || typ=="free") {
								var va=$(this).data("keyval");
							} else {
								var va=$(this).text();
							}
							var isTxtArea=false;
							for (var xt in obj.TxtArea) {
								var aTmp=obj.TxtArea[xt].split("*");
								if (fina == aTmp[0]) { // Ist TextArea
									isTxtArea=true;
								}
							}
							if (isTxtArea===false) {
								var inp="<div id='ip_"+i+"'><input type='text' id='inpbox_"+i+"' class='editbox"+isDat+"' data-spname='"+fina+"' value='"+va+"' style='text-align: "+ta+"'></div>";
							} else {
								var inp="<div id='ip_"+i+"'><textarea id='inpbox_"+i+"' class='editbox' data-spname='"+fina+"' cols='"+aTmp[1]+"' rows='"+aTmp[2]+"'>"+va+"</textarea></div>";
							}
							$(this).html(inp);
							if (obj.ShowCal) {
								$(".eddate").datepicker({
									autoclose: true
								});
							}
						} else {
							var va=$(this).children(":first").prop("checked"); if (va) { var bowe="checked"; } else { var bowe=""; }
							var tmp2="<input type='checkbox' class='editbox aktivbool' id='inpbox_"+i+"' data-spname='"+fina+"' onClick='doCheckBool(this)' "+bowe+">";
							tmp="<div id='ip_"+i+"' style='border: thin solid black; background-color: white'>"+tmp2+"</div>";
							$(this).html(tmp);
						}
					}
				}
			}
		});
		$("#"+obj.DivID+"js_load").hide();
	}
}
function doMyGrDelete(obj,ele,zeile) {
	var rowid=$("#"+obj.DivID+"z_"+zeile).data("keywert");
	var fnstring = "beforeDelete"; var retu="";
	var fn = window[fnstring];
	if (typeof fn === "function") {
		retu=fn(obj.DivID+"#z_"+zeile,rowid);
	}
	if (retu!="") {
		alert(retu);
	} else {
		$("#"+obj.DivID+"js_load").center($("#tbl_"+obj.DivID)).show();
		obj.isDelEdi=0;
		// Hide all Icons
		$("."+obj.DivID+"-edit, ."+obj.DivID+"-delete, ."+obj.DivID+"-detailpage, ."+obj.DivID+"-detailfunc").hide();
		// Show Save and Cancel
		$("#"+obj.DivID+"sav_"+zeile+", #"+obj.DivID+"can_"+zeile).show();
		// Make Strike through
		$("."+obj.DivID+"z_"+zeile).css("textDecoration","line-through");
		$("#"+obj.DivID+"js_load").hide();
	}
}
function doEdDelCancel(obj,ele,zeile,mode) {
	$("#"+obj.DivID+"js_load").center($("#tbl_"+obj.DivID)).show();
	$("."+obj.DivID+"-save, ."+obj.DivID+"-cancel").hide();
	$("."+obj.DivID+"-edit, ."+obj.DivID+"-delete, ."+obj.DivID+"-detailpage, ."+obj.DivID+"-detailfunc").show();
	if (obj.isDelEdi==0) { // DelCancel
		$("."+obj.DivID+"z_"+zeile).css("textDecoration","none");
	} else {    		   // EdiCancel
		// Hide EditBoxes
		ReloadLines(9,obj);
	}
	$("#"+obj.DivID+"js_load").hide();
}
function doEdDelSave(obj,ele,rowid,zeile,mode) {
	$("#"+obj.DivID+"js_load").center($("#tbl_"+obj.DivID)).show();
	if (obj.isDelEdi==0) { // DelSave
		if (confirm(obj.Lang["confirmDelete"])) {
			var fnstring = "beforeDeleteRow"; var retu="";
			var fn = window[fnstring];
			if (typeof fn === "function") {
				retu=fn(obj.DivID+"z_"+zeile,rowid);
			}
			if (retu!="") {
				if (retu=="cancel") {
					alert("Der Löschvorgang wird abgebrochen!");
				} else {
					alert("Called Function '"+fnstring+"' returned: "+retu);
				}
				doEdDelCancel(obj,ele,zeile,mode)
			} else {
				var sql="DELETE FROM "+obj.DataTable+" WHERE "+obj.PrimID+"="+rowid;
				var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=execDel", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "SQL": sql}, async: false}).responseText;
				var fnstring = "afterDeleteRow"; var retu="";
				var fn = window[fnstring];
				if (typeof fn === "function") {
					retu=fn(obj.DivID+"z_"+zeile,rowid);
				}
				if (retu!="") {
					alert("Called Function '"+fnstring+"' returned: "+retu);
				}
				ReloadLines(9,obj);
			}
			$("."+obj.DivID+"-save, ."+obj.DivID+"-cancel").hide();
			$("."+obj.DivID+"-edit, ."+obj.DivID+"-delete, ."+obj.DivID+"-detailpage, ."+obj.DivID+"-detailfunc").show();
		} else {
			$("."+obj.DivID+"z_"+zeile).css("textDecoration","none");
		}
	} else {       // EdiSave
		// Save Edits
		var fehler=false; var setflds="";
		$(".editbox").each(function(i) {
			var boxval=$(this).val(); 
			var fina=$(this).data("spname");
			var typ=obj.Spalten[fina].coltyp;
			if (typ=="tin") { boxval=($(this).prop("checked")) ? "1":"0"; }
			var ret=ValidateWert(obj,boxval,fina,typ);
			ret=ret.split("*");
			if (ret[0]==0 && (ret[1] === "" || ret[1]=="''" || ret[1]=="'NaN'")) { // Fehlerhaft
				$(this).css("border-color","red");
				fehler=true;
			} else {
				$(this).css("border-color","black");
			}
			setflds+=fina+"="+ret[1]+",";
		});
		if (fehler==false) {
			setflds=setflds.substr(0,setflds.length-1);
			var fnstring = "beforeEditSaveRow"; var retu="";
			var fn = window[fnstring];
			if (typeof fn === "function") {
				retu=fn(obj.DivID+"z_"+zeile,rowid);
			}
			if (retu!="") {
				alert("Called Function '"+fnstring+"' returned: "+retu);
			}
			var sql="UPDATE "+obj.DataTable+" SET "+setflds+" WHERE "+obj.PrimID+"="+rowid;
			var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=execUpd", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "SQL": sql}, async: false}).responseText;
			var oRecSet=$.parseJSON(result);
			if (result > 0) {
				obj.LastSQL=sql; obj.LastJson=oRecSet;
				var fnstring = "afterEditSaveRow"; var retu="";
				var fn = window[fnstring];
				if (typeof fn === "function") {
					retu=fn(rowid,sql,setflds);
				}
				if (retu!="" || retu==undefined) {
					alert("Called Function '"+fnstring+"' returned: "+retu);
				}
				ReloadLines(9,obj);
				$("."+obj.DivID+"-save, ."+obj.DivID+"-cancel").hide();
				$("."+obj.DivID+"-edit, ."+obj.DivID+"-delete, ."+obj.DivID+"-detailpage, ."+obj.DivID+"-detailfunc").show();
			} else {
				alert("Esit ein Fehler beim Update aufgetreten!");
			}
		}
	}
	$("#"+obj.DivID+"js_load").hide();
}
function doNewLine(obj) {
	var lastBoxID="";
	$("#"+obj.DivID+"js_load").center($("#tbl_"+obj.DivID)).show();
	$("."+obj.DivID+"-edit, ."+obj.DivID+"-delete, ."+obj.DivID+"-detailpage, ."+obj.DivID+"-detailfunc").hide();
	var row="<tr id='"+obj.DivID+"_new'>";
	$("."+obj.DivID+"_header").each(function(i) {
		row+="<td class='dataRowNL'>";
		var finaT=$(this).prop("id").split("-"); var fina=finaT[1]; var skip=false; var inpSkip=false;
		for (var xx in obj.NoInputNL) {
			if (fina==obj.NoInputNL[xx]) {
				inpSkip=true; break;
			}
		}
		if (inpSkip==false) {
			for (var lup in obj.LookUp) {
				tlup=obj.LookUp[lup].split("*"); //1=ofield,2=table,3=fkey,4=return_field,5=type,6=WhereClause
				var whereCl="";
				if (tlup[0]=="DB" && tlup[1]==fina) { //Spalte = LookUp
					lastBoxID=obj.DivID+"_selbox_"+i;
					if (tlup[6]==undefined) tlup[6]="null";
					if (tlup[7]==undefined) tlup[7]=false;
					if (tlup[8]==undefined) tlup[8]="null";					
					if (tlup[6] != "null") whereCl=" WHERE "+tlup[6];
					row+="<div id='ip_"+i+"'><select id='"+obj.DivID+"_selbox_"+i+"' class='newbox' data-spname='"+fina+"'>";
					var sql="SELECT DISTINCT "+tlup[3]+" as tkey, "+tlup[4]+" as item FROM "+tlup[2]+whereCl+" ORDER BY "+tlup[4]+" ";
					var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=drawRowsJson", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "sql": sql, "cnams": "tkey,item"}, async: false}).responseText;
					var oRecSet=$.parseJSON(result);
					var total=oRecSet.opts[1].total;
					obj.LastSQL=sql; obj.LastJson=oRecSet;
					row+="<option value='0'></option>";
					for (var r in oRecSet.rows) {
						row+="<option value='"+oRecSet.rows[r].tkey+"'>"+oRecSet.rows[r].item+"</option>";
					}
					row+="</select></div>";
					skip=true;
				} else if (tlup[0]=="AR" && tlup[1]==fina) {
					lastBoxID=obj.DivID+"_selbox_"+i;
					row+="<div id='ip_"+i+"'><select id='"+obj.DivID+"_selbox_"+i+"' class='newbox' data-spname='"+fina+"'>";
					var arrName=tlup[2]; var aray=eval(arrName);
					for(var index in aray) {
						row+="<option value='"+(aray[index])+"'>"+(aray[index])+"</option>";
					}
					row+="</select></div>";
					skip=true;
				}
			}
			if (skip==false) {
				if (!(fina == obj.PrimID)) {
					var typ=obj.Spalten[fina].coltyp; var isDat="";
					if (typ=="dat") isDat=" eddate";
					if (typ != "tin") {
						var ta=$(this).css("text-align");
						lastBoxID=obj.DivID+"_inpbox_"+i;
						var isTxtArea=false;
						for (var xt in obj.TxtArea) {
							var aTmp=obj.TxtArea[xt].split("*");
							if (fina == aTmp[0]) { // Ist TextArea
								isTxtArea=true;
							}
						}
						if (isTxtArea===false) {
							row+="<div id='ip_"+i+"'><input type='text' id='"+obj.DivID+"_inpbox_"+i+"' class='newbox"+isDat+"' data-spname='"+fina+"' value='' style='text-align: "+ta+"' name='"+obj.DivID+"-"+fina+"-NL'></div>";
						} else {
							row+="<div id='ip_"+i+"'><textarea id='"+obj.DivID+"_inpbox_"+i+"' name='"+obj.DivID+"-"+fina+"-NL' class='newbox' data-spname='"+fina+"' cols='"+aTmp[1]+"' rows='"+aTmp[2]+"'></textarea></div>";							
						}
					} else {
						var tmp2="<input type='checkbox' class='newbox aktivbool' id='"+obj.DivID+"_inpbox_"+i+"' name='"+obj.DivID+"-"+fina+"-NL' data-spname='"+fina+"' onClick='doCheckBool(this)'>";
						row+="<div id='ip_"+i+"' style='text-align: center; border: thin solid black; background-color: white'>"+tmp2+"</div>";
					}
				}
			}
			row+="</td>";
		}
	});
	$("."+obj.DivID+"noData").hide();
	row+="<td align='center' class='dataRowNL'>";
	row+="<img id='"+obj.DivID+"sav_0' name='"+obj.DivID+":0' class='"+obj.DivID+"-save' title='"+obj.Lang["Save"]+"' src='"+obj.ImagesPath+"images/b_save.png' heigth="+obj.IconSize+" width="+obj.IconSize+" style='cursor:pointer; vertical-align: middle' onclick='doNewSave("+obj.ObjName+",this)'><img id='"+obj.DivID+"pxdel_3' class='aktion' name='"+obj.DivID+"pxdel_3' src='"+obj.ImagesPath+"images/1pixel.gif' heigth='"+obj.IconSize+"' width='3px'>";
	row+="<img id='"+obj.DivID+"can_0' name='"+obj.DivID+":0' class='"+obj.DivID+"-cancel' title='"+obj.Lang["Cancel"]+"' src='"+obj.ImagesPath+"images/b_cancel.png' heigth="+obj.IconSize+" width="+obj.IconSize+" style='cursor:pointer; vertical-align: middle' onclick='doNewCancel("+obj.ObjName+",this)'><img id='"+obj.DivID+"pxdel_2' class='aktion' name='"+obj.DivID+"pxdel_2' src='"+obj.ImagesPath+"images/1pixel.gif' heigth='"+obj.IconSize+"' width='3px'>";
	row+="</td></tr>";
	if (obj.showSumRow==false) {
		$("#"+obj.DivID+"_navi").before(row);
	} else {
		$("#"+obj.DivID+"_sum").before(row);
	}
	if (obj.ShowCal) {
		$(".eddate").datepicker({
			autoclose: true
		});
	}
	$(".newbox").parent().css("padding","0");
	for (var idx in obj.CalcNL) {
		// [name='"+obj.DivID+"-"+feld+"-NL']
		var ar=obj.CalcNL[idx].split("*"); var calcFlds=ar[0]; var zielFld=ar[1]; var funcNam=ar[2];
		var calc_flds=calcFlds.split("#"); var anzflds=calc_flds.length; calc_ids=new Array();
		for(var x=0; x < anzflds; x++) {
			calc_ids[x]=$("[name='"+obj.DivID+"-"+calc_flds[x] +"-NL'").prop("id");
		}
		var target_id=$("[name='"+obj.DivID+"-"+zielFld +"-NL'").prop("id");
		$("#"+target_id).css("background-color","#FF9");
		$("#"+target_id).on("focus", {"id": target_id}, function(e) {
			var retu="";
			var fn = window[funcNam];
			if (typeof fn === "function") {
				retu=fn(target_id,calc_ids);
			}
		});
	}
	for (var idx in obj.Suggest) {
		var tmp=obj.Suggest[idx].split("*"); var feld=tmp[0]; var zei=tmp[1]; var wo=tmp[2];
		$("[name='"+obj.DivID+"-"+feld+"-NL']").addClass("autocomp");
	}
	$('.autocomp').on("focus", function() {
    var feld=$(this).data('spname');
		$(this).autocomplete({		
      source: function (request, response) {
        $.ajax({
        			type: "POST",
        			url: obj.MyPath+"MyNewGridPhpFunc.php",
        			data: {"term": request.term,"func": "autocomp_f","dbase": obj.DbName,"user": obj.UName,"pawo":obj.PaWo, "tabelle": obj.DataTable, "feld": feld, "wo": wo},
        			success: response,
        			dataType: 'json'
				});
			},
			delay: 500, 
		  minLength: zei,
			select: function( event, ui ) {
				var alt=$(this).prop("id");
				var tmp=alt.split("_");
				var tmpAnz=tmp[1];
				var neuAnz=parseInt(tmpAnz)+1;
				var neuName=tmp[0]+"_"+neuAnz.toString();
				$("#"+neuName).focus();
			}
	  });
	});
	var fnstring = "beforeInputNewRec"; var retu="";
	var fn = window[fnstring];
	if (typeof fn === "function") {
		retu=fn("newbox", lastBoxID);
	}
	$("#"+obj.DivID+"js_load").hide();
}
function doNewCancel(obj) {
	$("#"+obj.DivID+"js_load").center($("#tbl_"+obj.DivID)).show();
	$("#"+obj.DivID+"_new").remove();
	$("."+obj.DivID+"noData").show();
	$("."+obj.DivID+"-edit, ."+obj.DivID+"-delete, ."+obj.DivID+"-detailpage, ."+obj.DivID+"-detailfunc").show();	
//	$("#"+obj.DivID+"z_1").hide();
	$("#"+obj.DivID+"js_load").hide();
}
function doNewSave(obj) {
	$("#"+obj.DivID+"js_load").center($("#tbl_"+obj.DivID)).show();
	var fehler=false; var setflds="("; var setvals="(";
	$(".newbox").each(function(i) {
		var boxval=$(this).val(); 
		var fina=$(this).data("spname");
		var typ=obj.Spalten[fina].coltyp;
		if (typ=="tin") { boxval=($(this).prop("checked")) ? "1":"0"; }
		var ret=ValidateWert(obj,boxval,fina,typ);
		ret=ret.split("*"); 
		if (ret[0]==0 && (ret[1] === "" || ret[1]=="''" || ret[1]=="NaN" || ret[1]=="'NaN'")) { // Fehlerhaft
			$(this).css("border-color","red");
			fehler=true;
		} else {
			$(this).css("border-color","black");
		}
		setflds+=fina+","; setvals+=ret[1]+",";
	});
	if (fehler==false) {
		for (var fi in obj.FixColForInsert) {
			var ctmp=obj.FixColForInsert[fi].split("*");
			switch(ctmp[2]) {
				case "int": setflds+=ctmp[0]+","; setvals+=ctmp[1]+","; break;
				default: setflds+=ctmp[0]+",'"; setvals+=ctmp[1]+"',";
			}
		}
		setflds=setflds.substr(0,setflds.length-1);
		setvals=setvals.substr(0,setvals.length-1);
		var sql="INSERT INTO "+obj.DataTable+" "+setflds+") VALUES "+setvals+")";
		var sqlold=sql;
		var fnstring = "beforeInsertNewRec"; var retu="#";
		var fn = window[fnstring];
		if (typeof fn === "function") {
			retu=fn(obj,"newbox", "dataRowNL", sql);
		}
		if (retu=="") {
			alert("Called Function '"+fnstring+"' returned: "+retu);
		} else {
			if (retu != "#") sql=retu;
			var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=execIns", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "SQL": sql}, async: false}).responseText;
			var oRecSet=$.parseJSON(result);
			obj.LastSQL=sql; obj.LastJson=oRecSet;
			if (result > 0) {
				var fnstring = "afterInsertNewRec"; var retu="";
				var fn = window[fnstring];
				if (typeof fn === "function") {
					retu=fn(result,obj.DivID);
				}
				if (retu!="" || retu==undefined) {
					alert("Called Function '"+fnstring+"' returned: "+retu);
				}
			}
			ReloadLines(9,obj);
			$("#"+obj.DivID+"_new").remove();
			$("."+obj.DivID+"-edit, ."+obj.DivID+"-delete, ."+obj.DivID+"-detailpage, ."+obj.DivID+"-detailfunc").show();
		}
	}
	$("#"+obj.DivID+"js_load").hide();
}
function doCheckBool(ele,obj) {
	var state=$(ele).prop("checked");
	if (!($(ele).hasClass("aktivbool"))) {
		$(ele).prop("checked",!state);
	}
}
function stripINTformat(we,fm) {
	if (fm==".") return we;
	var ar=fm.split("#"); var th=ar[0]; var cu=ar[1];
	if (cu.length > 0) {
		var ap=we.split(" "); we=ap[0];
	}
	return we.replace(th,"");
}
function ValidateWert(obj,wert,field,typ) {
	var fmt=getColNumFormat(obj,field);
	for (var x in obj.ValidRules) {
		var tmp=obj.ValidRules[x].split("*"); var fld=tmp[0]; var rule=tmp[1]; var mini=tmp[2]; var maxi=tmp[3];
		if (field==fld) {
			switch (typ) {
				case "dec":
				case "flo":
				case "dou": wert=parseFloat(makeSQLbetrag(-1,wert,fmt)); wert="'"+wert+"'";
							if (mini != "%") mini=parseFloat(makeSQLbetrag(-1,mini,fmt));
							if (maxi != "%") maxi=parseFloat(makeSQLbetrag(-1,maxi,fmt));
							if (mini != "%" && wert < mini) wert="";
							if (maxi != "%" && wert > maxi) wert=""; 
							break;
				case "sma":
				case "int":
				case "big":
				case "med": wert=parseInt(stripINTformat(wert,fmt));
							if (mini != "%") mini=parseInt(mini);
							if (maxi != "%") maxi=parseInt(maxi);
							if (mini != "%" && wert < mini) wert="";
							if (maxi != "%" && wert > maxi) wert="";
							break;
				case "tin": break;
				case "tim": if (wert=="") {
								wert="00:00";
							} else {
								wertlen=wert.length; wert="'"+wert+"'";
								if (mini != "%" && wertlen < mini) wert="00:00";
								if (maxi != "%" && wertlen > maxi) wert="00:00";
							}
							break;
				case "dat": if (wert=="") {
								wert="0000-00-00";
							} else {
								twert=makeSQLdatum(obj,wert); wert="'"+twert+"'";
								if (mini != "%") mini=makeSQLdatum(obj,mini);
								if (maxi != "%") maxi=makeSQLdatum(obj,maxi);
								if (mini != "%" && twert < mini) wert="0000-00-00";
								if (maxi != "%" && twert > maxi) wert="0000-00-00";
							}
							break;
				case "eml": if (checkEmail(wert)) { wert="'"+wert+"'"; } else { wert=""; } ; break;
				case "image":
				case "tex":
				case "free":
				case "var": wertlen=wert.length; wert="'"+wert+"'";
							if (mini != "%" && wertlen < mini) wert="";
							if (maxi != "%" && wertlen > maxi) wert=""; break;
			}
			if (wert==="" || wert=="0000-00-00") { // Not Ok
				return "0*";
			} else {
				return "0*"+wert.toString();
			}
		}
	}
	switch (typ) {
		case "dec":
		case "flo":
		case "dou": wert=makeSQLbetrag(obj,wert,fmt); break; //  wert="'"+wert+"'"; break;
		case "sma":
		case "int":
		case "big":
		case "med":
		case "tin": wert=parseInt(wert); break; 
		case "dat": if (wert=="''") {
									 wert="'0000-00-00'";
								} else { 
									wert="'"+makeSQLdatum(obj,wert)+"'";
							  } break;
		case "eml": if (checkEmail(wert)) { wert="'"+wert+"'"; } else { wert=""; } break;
		case "image":
		case "tim": if (wert=="''") { wert="'00:00:00'"; } else { wert="'"+wert+"'"; } break;
		case "cha":
		case "tex":
		case "free":
		case "var": wert="'"+wert+"'";
	}
	return "1*"+wert.toString();
}
function DrawFilter(obj) {
	// i=Spaltenname; obj.DivID=gridbox; 
	var ret=""; var ret2=""; var isQuick=obj.QuickFilter;
	for(i in obj.Spalten) {  // Alle Spalten durchlaufen
		if (obj.ShowID==true || i != obj.PrimID) {
			var coltype=""; var isLookUpCol=false;
			// test if LookUp
			for (var lup in obj.LookUp) {
				var noFiSel=false;
				tlup=obj.LookUp[lup].split("*"); //1=ofield,2=table,3=fkey,4=return_field,5=typ,6=WhereClause,7=NoSel,8=OrderBy
				orgField=tlup[1]; retField="Look_"+tlup[1];
				if (i == orgField) {
					coltype=tlup[5]; // ColType des Rückgabewertes
					isLookUpCol=true;
					if (tlup[7] != undefined) {
						if (tlup[7]=="true") { var isbool=true; } else {var isbool=false; }
						noFiSel=isbool; // Textbox anstatt SelectBox wenn true
					}
					break;
				}
			} 
			// test if BoolCol
			var isBool=false; var boolState="null";
			for (var bo in obj.BoolCols) {
				var arboolflds=obj.BoolCols[bo].split("*");
				if (i==arboolflds[0]) { isBool=true; boolState=arboolflds[1]; break; }
			}
			// test if Datum
			if (obj.Spalten[i].coltyp=="dat") { var dat="filterdate"; } else { var dat=""; }
			// end tests
			var selForZahl="<td id='"+obj.DivID+"-fis-"+i+"' class='filteropt filtd2'><div><select name='"+i+"' class='"+obj.DivID+"-FiSel filtersel qFi select' id='"+obj.DivID+"_seFi_"+i+"' onchange='doSelect(event,this,"+obj.ObjName+")'><option value='0' selected>"+obj.Lang["F1"]+"</option><option value='1'>=</option><option value='2'>&gt;</option><option value='3'>&gt;=</option><option value='4'>&lt;</option><option value='5'>&lt;=</option><option value='6'>&lt;&gt;</option></select></td>"; //  Für Zahl
			var selForText="<td id='"+obj.DivID+"-fis-"+i+"' class='filteropt filtd2'><div><select name='"+i+"' class='"+obj.DivID+"-FiSel filtersel qFi select' id='"+obj.DivID+"_seFi_"+i+"' onchange='doSelect(event,this,"+obj.ObjName+")'><option value='0' selected>"+obj.Lang["F1"]+"</option><option value='7'>"+obj.Lang["F2"]+"</option><option value='8'>"+obj.Lang["F3"]+"</option><option value='9'>"+obj.Lang["F4"]+"</option></div></td>"; // für Text
			var al="left";
			if (i == obj.PrimID) { // Wenn ID-Spalte angezeigt werden soll
				al="center";
				if (isQuick==false) {
					ret+="<td id='"+obj.DivID+"-fib-"+i+"' class='filtertxt fi1'><div><input name='"+i+"' type='text' id='"+obj.DivID+"_txFi_"+i+"' class='"+obj.DivID+"-FiBox filterbox qFi text' style='text-align: "+al+"; height=19px' value=''></td>";
					ret2+=selForZahl;
				} else {
					ret+="<td id='"+obj.DivID+"-fib-"+i+"' class='filtertxt fi1'><div></div></td>";
					ret2+="<td><div></div></td>";					
				}
			} else if (isBool) {  // Bool Column
				if (isQuick==false) {
					ret+="<td id='"+obj.DivID+"-fib-"+i+"' class='"+obj.DivID+"-FiBox filtertxt fi1' align='center'></td>";
					ret2+="<td id='"+obj.DivID+"-fib-"+i+"' class='filtertxt fi2' align='center'><input name='"+i+"' type='checkbox' class='"+obj.DivID+"-FiBox "+obj.DivID+"-FiChk bool_"+boolState+" qFi chk' id='"+obj.DivID+"_chFi_"+i+"' onClick='doSelect(event, this,"+obj.ObjName+")' value='-1'></td>";
				} else {
					ret+="<td id='"+obj.DivID+"-fib-"+i+"' class='filtertxt fi1' align='center'><input name='"+i+"' type='checkbox' class='"+obj.DivID+"-FiBox "+obj.DivID+"-FiChk bool_"+boolState+" qFi chk' id='"+obj.DivID+"_chFi_"+i+"' onClick='doQuickSelect(event, this,"+obj.ObjName+",true)' value='-1'></td>";
					ret2+="<td><div></div></td>"; // Für Bool
				}
				var addi=" AND ";
				switch (boolState) {
					case "null": obj.FilterSql=""; break;
					case "true": obj.FilterSql+=(obj.FilterSql.length == 0) ? arboolflds[0]+"=1":addi+arboolflds[0]+"=1"; break;
					case "false": obj.FilterSql+=(obj.FilterSql.length == 0) ? arboolflds[0]+"=0":addi+arboolflds[0]+"=0"; break;
				}
			} else if (dat=="filterdate") {
				ret+="<td id='"+obj.DivID+"-fib-"+i+"' class='filtertxt filtd1'><div><input name='"+i+"' type='text' id='"+obj.DivID+"_txFi_"+i+"' class='"+obj.DivID+"-FiBox filterdat eddate qFi text' ";
				if (isQuick==false) {
					ret+="value=''></div></td>";
				} else {
					ret+="onChange='doQuickSelect(event, this,"+obj.ObjName+","+obj.QuickFilter+")' value=''></div></td>";
				}
				ret2+=selForZahl; //  Für Zahl
			} else if (isLookUpCol && noFiSel==false) {  // ret = Klappbox mit Füllung
				if (isQuick==false) {
					ret2+="<td id='"+obj.DivID+"-fis-"+i+"' class='filteropt filtd1'><div>";
					ret2+="<select name='"+i+"' class='"+obj.DivID+"-FiBox filtersel qFi lookup' id='"+obj.DivID+"_seFi_"+i+"' ";
					ret2+="onChange='doSelect(event, this,"+obj.ObjName+")'>";
				} else {
					ret+="<td id='"+obj.DivID+"-fis-"+i+"' class='filteropt filtd1'><div>";
					ret+="<select name='"+i+"' class='"+obj.DivID+"-FiBox filtersel qFi lookup' id='"+obj.DivID+"_seFi_"+i+"' ";
					ret+="onChange='doQuickSelect(event, this,"+obj.ObjName+","+obj.QuickFilter+")'>";
				}
				// Get Options
					if (tlup[6]==undefined) tlup[6]="null";
					if (tlup[7]==undefined) tlup[7]=false;
					if (tlup[8]==undefined) tlup[8]="null";				
				if (tlup[6] != "null") { whereCl=" WHERE "+tlup[6]; } else { whereCl=""; }
				if (tlup[8] == "null") { var ordby="wert"; } else { var ordby=tlup[8]; }
				var tsql="SELECT DISTINCT "+tlup[3]+" as tid,"+tlup[4]+" as wert FROM "+tlup[2]+whereCl+" ORDER BY "+ordby;
				var cnams="tid,wert";
				var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=drawRowsJson", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "sql": tsql, "cnams": cnams}, async: false}).responseText;
				var RecSetT=$.parseJSON(result);
				obj.LastSQL=tsql; obj.LastJson=RecSetT;
				if (isQuick==false) {
					ret2+="<option value='0' selected> </option>";
					for (var r in RecSetT.rows) {
						ret2+="<option value='"+RecSetT.rows[r].wert+"'>"+RecSetT.rows[r].wert+"</option>";
					}
					ret2+="</select></div></td>";
					ret+="<td id='"+obj.DivID+"-fib-"+i+"' class='filtertxt fi1'><div></div></td>";
				} else {
					ret+="<option value='0' selected> </option>";
					for (var r in RecSetT.rows) {
						ret+="<option value='"+RecSetT.rows[r].wert+"'>"+RecSetT.rows[r].wert+"</option>";
					}
					ret+="</select></div></td>";
					ret2+="<td><div></div></td>";
				}
			
			} else { // Text Column (Rest)
				var selFor=selForText;
//				if (al != "left") {
					switch(obj.Spalten[i].coltyp) {
						case "dec":
						case "flo":
						case "dou":
						case "int":
						case "big":
						case "med":
						case "tin": al="right"; selFor=selForZahl; break;
						case "tim":
						case "dat": al="center"; selFor=selForText;
					}
					for(c in obj.ColAlign) {
						var ca=obj.ColAlign[c].split("*");
						var fn=ca[0];
						if (obj.Spalten[i].feldname==fn) {
							al=ca[1];
						}
					}
//				}
				if (isQuick==false) {
					ret+="<td id='"+obj.DivID+"-fib-"+i+"' class='filtertxt filtd1'><div><input name='"+i+"' type='text' id='"+obj.DivID+"_txFi_"+i+"' class='"+obj.DivID+"-FiBox filterbox qFi text' style='text-align: "+al+"; height=19px' value=''></div></td>";
					ret2+=selFor;
				} else {
					ret+="<td id='"+obj.DivID+"-fib-"+i+"' class='filtertxt filtd1'><div><input name='"+i+"' type='text' id='"+obj.DivID+"_txFi_"+i+"' class='"+obj.DivID+"-FiBox filterbox qFi text' style='text-align: "+al+"; height:19px' onKeyup='doQuickSelect(event, this,"+obj.ObjName+","+obj.QuickFilter+")' value=''></div></td>";
					ret2+="<td><div></div></td>";
				}
			}
		}
	}
	if (obj.ShowAction) {
		if (isQuick==false) {
			ret+="<td id='fitxt' class='AktFiBox' style='text-align=center'>Filter</td>";
			ret2+="<td id='fisel' class='AktFiBox'><img src='"+obj.ImagesPath+"images/filter.png' height='14px' width='16px' title='"+obj.Lang["FiTxt"]+"' style='vertical-align: middle'>&nbsp;<img src='"+obj.ImagesPath+"images/b_drop.png' height='14px' width='16px' title='"+obj.Lang["FiClear"]+"' style='cursor:pointer; vertical-align: middle' onclick='ClearAllFilter("+obj.ObjName+", true)'></td>";
		} else {
			if (isQuick==false) {
				ret+="<td id='fisel' class='AktFiBox'>Filter</td>";
			} else {
				ret+="<td id='fisel' class='AktFiBox'><img src='"+obj.ImagesPath+"images/filter.png' height='14px' width='16px' title='"+obj.Lang["FiTxt"]+"' style='vertical-align: middle'>&nbsp;<img src='"+obj.ImagesPath+"images/b_drop.png' height='14px' width='16px' title='"+obj.Lang["FiClear"]+"' style='cursor:pointer; vertical-align: middle' onclick='ClearAllFilter("+obj.ObjName+", true)'></td>";
			}
			ret2+="<td id='fisel' class='AktFiBox'><img src='"+obj.ImagesPath+"images/filter.png' height='14px' width='16px' title='"+obj.Lang["FiTxt"]+"' style='vertical-align: middle'>&nbsp;<img src='"+obj.ImagesPath+"images/b_drop.png' height='14px' width='16px' title='"+obj.Lang["FiClear"]+"' style='cursor:pointer; vertical-align: middle' onclick='ClearAllFilter("+obj.ObjName+", true)'></td>";
		}
	}
	$("#"+obj.DivID+"_fiBox").html(ret);
	if (isQuick==false) { $("#"+obj.DivID+"_fiSel").html(ret2) } else { $("#"+obj.DivID+"_fiSel").remove(); };
	$(".bool_null").prop("indeterminate", true);
	$(".bool_true").prop("indeterminate", false).prop("checked", true);
	$(".bool_false").prop("indeterminate", false).prop("checked", false);
}
function doSelect(eve,ele,obj) {
	if ($(ele).prop("type")=="checkbox" && $(ele).hasClass("bool_null")) {
		$(".bool_null").prop("checked",true);
		$(ele).removeClass("bool_null");
		$(ele).addClass("bool_true");
		$(ele).val("true");
		bs="10";
	} else if ($(ele).prop("type")=="checkbox" && $(ele).hasClass("bool_true")) {
		$(".bool_true").prop("checked",false);
		$(ele).removeClass("bool_true");
		$(ele).addClass("bool_false");
		$(ele).val("false");
		bs="11";
	} else if ($(ele).prop("type")=="checkbox" && $(ele).hasClass("bool_false")) {
		$(".bool_false").prop("indeterminate",true);
		$(ele).removeClass("bool_false");
		$(ele).addClass("bool_null");
		$(ele).val("egal");
		bs="0";
	}
	var sql="";
	$("."+obj.DivID+"-FiBox").each(function(i) {
		if ($(this).val() == "") $(this).css("background","white");
			if ($(this).val() != "" || $(this).prop("type")=="checkbox") {
				var cn=$(this).prop("name");
				var tx=$(this).val(); 
				$(this).addClass("fiSelected");
				var opp = $("#"+obj.DivID+"_seFi_"+cn).val(); var op="";
				if (opp==0) $(this).removeClass("fiSelected").val("");
				if ($(this).prop("type")=="checkbox") opp=20;
				for (var lup in obj.LookUp) {
					tlup=obj.LookUp[lup].split("*"); //1=ofield,2=table,3=fkey,4=return_field,5=typ,6=WhereClause
					var orgField=tlup[1]; var retField="Look_"+tlup[1]; var whereCl="";
					if (tlup[0]=="DB" && cn == orgField) {
						//cn=retField; coltyp=tlup[4];
						if (tlup[6]==undefined) tlup[6]="null";
						if (tlup[7]==undefined) tlup[7]=false;
						if (tlup[8]==undefined) tlup[8]="null";
						if (tlup[6] != "null") whereCl=" AND "+tlup[6];
						var oppl = $("#"+obj.DivID+"_seFi_"+$(this).prop("name")).val();
						var dlike="%"+tx+"%";
						var cnams="id,rfield";
						var tsql="SELECT DISTINCT "+tlup[3]+" as id,"+tlup[4]+" as rfield FROM "+tlup[2]+" WHERE "+tlup[4]+" LIKE '"+dlike+"'"+whereCl;
						var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=drawRowsJson", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "sql": tsql, "cnams": cnams}, async: false}).responseText;
						var RecSetT=$.parseJSON(result);
						obj.LastSQL=tsql; obj.LastJson=RecSetT;
						var ids="(";
						for (var r in RecSetT.rows) {
							ids+=obj.DataTable+"."+orgField+"="+RecSetT.rows[r].id+" OR ";
						}
						ids=ids.substr(0,ids.length-4)+") AND "; opp="12";
						break;
					}// else if (tlup[0]=="AR" && tlup[1]==cn) {
//						alert("AR: "+tlup[1]);
//					}
				}
				switch(opp) {
					case "1": {op="="; break;}
					case "2": {op=">"; break;}
					case "3": {op=">="; break;}
					case "4": {op="<"; break;}
					case "5": {op="<="; break;}
					case "6": {op="<>"; break;}
					case "7": {op=" LIKE '#%'"; break;}
					case "8": {op=" LIKE '%#%'"; break;}
					case "9": {op=" LIKE '%#'"; break;}
//					case "10": {op="=1"; break;}
//					case "11": {op="=0";}
				}
				var coltyp=obj.Spalten[cn].coltyp;
				var r=op.indexOf("#");
				if (r >= 0) {
					op=op.replace(/#/, $(this).val());
					sql+=obj.DataTable+"."+cn+op+" AND ";
				} else if (opp == 20) {
					if ($(this).prop("indeterminate")==false) {
						$("#"+obj.DivID+"-fib-"+cn).css("fiSelected");
						if ($(this).prop("checked")==true) {
							sql+=obj.DataTable+"."+cn+"=1 AND ";
						} else {
							sql+=obj.DataTable+"."+cn+"=0 AND ";
						}
					} else {
						$("#"+obj.DivID+"-fib-"+cn).css("background","white");
					}
				} else if (opp == 12) {
					if (ids !=") AND ") sql+=ids;
				} else if (opp > 9) {
					sql+=obj.DataTable+"."+cn+op+" AND ";
				} else if (opp > 0) {
					switch(coltyp) {
//						case "tin": {if (tx=="-1") {op="0";} else {op="=";}; opp=1; doSearch=true; break;}
						case "sma":
						case "med":
						case "int":
						case "big": {
							sql+=obj.DataTable+"."+cn+op+$(this).val()+" AND ";
							doSearch=true; break;
						}
						case "flo":
						case "dou": 
						case "dec": {
							var fmt=getColNumFormat(obj,cn);
							sql+=obj.DataTable+"."+cn+op+makeSQLbetrag(obj,$(this).val(),fmt)+" AND ";
							doSearch=true; break;
						}
						case "dat": {
							sql+=obj.DataTable+"."+cn+op+"'"+makeSQLdatum(obj,$(this).val())+"' AND ";
							doSearch=true; break;}
						case "var":
						case "tex":
						case "eml":
						case "image":
						case "cha": {op=" LIKE '%#%'"; opp=3; doSearch=true; break;}
						case "look": op=""; opp=5; doSearch=true;
					}
				}
			}
//		}
	});
	if (sql.length > 3) { sql=sql.substr(0, sql.length - 4); obj.wasFiSql=true; }
	if (sql.length < 3) { obj.wasFiSql=false; sql=""; }
	obj.FilterSql=sql;
	obj.StartRow=0;
	ReloadLines(0, obj)
}
function doQuickSelect(event,ele,obj,quickFi) {
	var sql=""; var tx=""; var doSearch=false; var bs="0"; var cn=$(ele).prop("name"); var minChar=obj.QuickChar; var timeout=null;
	if ($(ele).prop("type")=="checkbox" && $(ele).hasClass("bool_null")) {
		$(".bool_null").prop("checked",true);
		$(ele).removeClass("bool_null");
		$(ele).addClass("bool_true");
		$(ele).val("true");
		bs="10";
	} else if ($(ele).prop("type")=="checkbox" && $(ele).hasClass("bool_true")) {
		$(".bool_true").prop("checked",false);
		$(ele).removeClass("bool_true");
		$(ele).addClass("bool_false");
		$(ele).val("false");
		bs="11";
	} else if ($(ele).prop("type")=="checkbox" && $(ele).hasClass("bool_false")) {
		$(".bool_false").prop("indeterminate",true);
		$(ele).removeClass("bool_false");
		$(ele).addClass("bool_null");
		$(ele).val("egal");
		bs="0";
	}
	var sql=""; var op="";
	if (quickFi==false) { // Kein Quick-Filter
		switch(bs) {
			case "10": {op="=1"; break;}
			case "11": {op="=0";}
		}
		if (bs > 9) { sql+=obj.DataTable+"."+cn+op+" AND "; }
		if (sql.length > 3) sql=sql.substr(0, sql.length - 4);
		obj.FilterSql=sql;
		obj.StartRow=0;
		ReloadLines(0, obj)		
	} else {
		if(ytimer) {
			clearTimeout(ytimer);
		}
		ytimer = setTimeout(function(){
		  if (skip==false) {
			var x = event.which || event.keyCode;
			if ($(ele).val().length < minChar) return;
			$("."+obj.DivID+"-FiBox").each(function(i) {
				var inh=$(this).val();
				var len=($(this).val().length);
				if ($(this).val() != "" && $(this).val() != 0 && $(this).val() !== null) {
					var cn=$(this).attr("name");
					var typ=$(this).attr("type");
					tx=$(this).val();
					if (typ=="checkbox") { 
						switch($(this).val()) {
							case "true": tx="1"; break;
							case "false": tx="0"; break;
							case "egal": tx="-1";
						}
					}
					var coltyp=obj.Spalten[cn].coltyp; var whereCl="";
					for (var lup in obj.LookUp) {
						var noFiSel=false;
						tlup=obj.LookUp[lup].split("*"); //1=ofield,2=table,3=fkey,4=return_field,5=typ,6=WhereClause,7=NoFiSel,8=ordby
						orgField=tlup[1]; retField="Look_"+tlup[1];
						if (tlup[6]==undefined) tlup[6]="null";
						if (tlup[7]==undefined) tlup[7]=false;
						if (tlup[8]==undefined) tlup[8]="null";
						if (tlup[7] != undefined) {
							if (tlup[7]=="true") { var isbool=true; } else {var isbool=false; }
							noFiSel=isbool; // Textbox anstatt SelectBox wenn true
						}
						if (tlup[0]=="DB" && cn == orgField && noFiSel==false) {
							//cn=retField; coltyp=tlup[4];
							if (tlup[6] != "null") whereCl=" AND "+tlup[6];
							var cnams="tid,rfield";
							var tsql="SELECT DISTINCT "+tlup[3]+" as tid,"+tlup[4]+" as rfield FROM "+tlup[2]+" WHERE "+tlup[4]+" LIKE '%"+tx+"%'"+whereCl+" ";
							var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=drawRowsJson", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "sql": tsql, "cnams": cnams}, async: false}).responseText;
							var RecSetT=$.parseJSON(result);
							obj.LastSQL=tsql; obj.LastJson=RecSetT;
							var ids="(";
							for (var r in RecSetT.rows) {
								if (tlup[3]==tlup[4]) {
									ids+=obj.DataTable+"."+orgField+"='"+RecSetT.rows[r].rfield+"' OR ";
								} else {
									ids+=obj.DataTable+"."+orgField+"="+RecSetT.rows[r].tid+" OR ";
								}
							}
							ids=ids.substr(0,ids.length-4)+") AND "; coltyp="look";
							break;
						}// else if (tlup[0]=="AR" && tlup[1]==cn) {
//							alert("AR: "+tlup[1]);
//						}
					} 
					switch(coltyp) {
						case "tin": {if (tx=="-1") {op="0";} else {op="=";}; opp=1; doSearch=true; break;}
						case "sma":
						case "med":
						case "int":
						case "flo":
						case "dou":
						case "dec": {
							op1=tx.substr(0,1); var op2=tx.substr(1,1); var onetwo=0;
							if (op2.charCodeAt(0)<60) { onetwo=1; } else { onetwo=2; }
							if (op1.charCodeAt(0)<60) { onetwo=0; }
							if (onetwo==0) { op="="; }
							if (onetwo==1) { op=op1; tx=tx.substr(1); }
							if (onetwo==2) { op=op1+op2; tx=tx.substr(2); }
							
							opp=2; 
							doSearch=true; break;
						}
						case "dat":
							{op="="; opp=4; if (tx.length==10) doSearch=true; break;}
						case "var":
						case "tex":
						case "eml":
						case "image":
						case "cha":
							{op=" LIKE '%#%'"; opp=3; doSearch=true; break;}
						case "look":
							op=""; opp=5; doSearch=true;
					}
					if (op.indexOf("#") >= 0) {
						if (tx != "leer") {
							op=op.replace(/#/, tx);
							if (cn.indexOf("*") > -1) {
								var arCn=cn.split("*"); var conc="CONCAT(";
								for(var ix in arCn) {
									var tcn=arCn[ix]; conc+=tcn+", ', ', ";
								}
								if (conc.length > 3) conc=conc.substr(0, conc.length - 8);
								conc+=")"; cn=conc;
							}
							sql+=cn+op+" AND ";
						}
					} else if (opp == 1) {
						if (op != "0") sql+=cn+op+tx+" AND ";
					} else if (opp == 2) {
						var fmt=getColNumFormat(obj,cn);
						sql+=cn+op+makeSQLbetrag(obj,tx,fmt)+" AND ";
					} else if (opp == 5) {
						if (ids !=") AND ") sql+=ids;
					} else if (opp == 4) {
						if (tx.length==4 && parseInt(tx)>1900) {
							sql+="YEAR("+cn+")"+op+tx+" AND "; doSearch=true;
						} else {
							sql+=cn+op+"'"+makeSQLdatum(obj,tx)+"' AND ";
						}
					}
					var cvbn=2;
				}
			});
			if (sql.length > 3) sql=sql.substr(0, sql.length - 4);
			if (sql == "") { doSearch=true; }
			if (doSearch) {
				obj.FilterSql=sql;
				obj.StartRow=0; //obj.wasFiSql=true;
				ReloadLines(0, obj);
			}
			event.stopPropagation();
		  }
		}, 1000);
	}
}
function ClearAllFilter(obj) {
	obj.FilterSql="";
	$("."+obj.DivID+"-FiChk").each(function(idx) {
		var fld=$(this).prop("name");
		$(this).removeClass("bool_null","bool_true","bool_false");
		for (var bo in obj.BoolCols) {
			var arboolflds=obj.BoolCols[bo].split("*");
			if (fld==arboolflds[0]) { 
				boolState=arboolflds[1]; 
				$(this).addClass("bool_"+boolState);
				var addi=" AND ";
				switch (boolState) {
					case "null": obj.FilterSql="";
						 $(".bool_null").prop("indeterminate", true); break;
					case "true": obj.FilterSql+=(obj.FilterSql.length == 0) ? arboolflds[0]+"=1":addi+arboolflds[0]+"=1";
						 $(".bool_true").prop("indeterminate", false); 
						 $(".bool_true").prop("checked", true); break;
					case "false": obj.FilterSql+=(obj.FilterSql.length == 0) ? arboolflds[0]+"=0":addi+arboolflds[0]+"=0";
						 $(".bool_false").prop("indeterminate", false); 
						 $(".bool_false").prop("checked", false); break;
				}
				break;
			}
		}
	});
	skip=true;
	$("."+obj.DivID+"-FiBox:text").val("");
	$("."+obj.DivID+"-FiBox.lookup").val(0);
	$("."+obj.DivID+"-FiBox").removeClass("fiSelected");
	$("."+obj.DivID+"-FiSel").val("0");
	obj.StartRow=0;
	ReloadLines(0,obj);
	skip=false;
}
function makeSQLbetrag(obj,wt,fmt) {
	if (fmt != ".") {
		var ret=wt; var aMask=fmt.split(":");
		var dec=aMask[0]; var tau=aMask[1]; var nk=aMask[2];
		for(x=wt.length-1; x > 0; x--) {
			//Dezimal ersetzen
			var p=wt.charAt(x);
			if (p==dec) {
				ret=wt.replace(tau,"");
				ret=ret.replace(dec,".");
			}
		}
		if (obj==-1) {
			return parseFloat(ret);
		} else {
			return "'"+parseFloat(ret)+"'";
		}
	} else {
		return wt;
	}
}
function makeSQLdatum(obj,dt) {
	dt=dt.replace(/'/g,"");
	if (dt.substr(4, 1)=="-" && dt.substr(7, 1)=="-") {
		return dt;
	}
	var ret=dt; var aMask=obj.DateFormat;
	if (dt=="NULL" || dt=="") return dt;
	switch(aMask) {
		case "EN": { //amerikanisch
			var mo=dt.substr(0,2); var tg=dt.substr(3,2); var ja=dt.substr(6); break; }
		case "GE": { // deutsch
			var tg=dt.substr(0,2); var mo=dt.substr(3,2); var ja=dt.substr(6); break; }
	}
	ret=ja+"-"+mo+"-"+tg; 
	
	return ret;
}
function MakeSQL(obj) {
	var lookup=""; var lookRetFields=""; obj.LookFields=""; var whereCl=""; var idx=1;
	for (var lup in obj.LookUp) {
		tlup=obj.LookUp[lup].split("*"); //0=DB,1=ofield,2=table,3=fkey,4=return_field,5=typ,6=WhereClause,NoField,OrderBy
		if (tlup[6]==undefined) tlup[6]="null";
		if (tlup[7]==undefined) tlup[7]=false;
		if (tlup[8]==undefined) tlup[8]="null";
		if (tlup[6] != "null") whereCl=" WHERE "+tlup[6];
		if (tlup[0]=="DB") {
			lookup+=" LEFT JOIN "+tlup[2]+" as "+tlup[2]+idx+" ON "+tlup[2]+idx+"."+tlup[3]+"="+obj.DataTable+"."+tlup[1];
			if (tlup[4].indexOf("CONCAT") >= 0) {
				var atmp=tlup[4].split("("); var tfld=atmp[1].replace(")","");
				var atmp=tfld.split(",");
				var concflds="";
				for (index = 0; index < atmp.length; ++index) {
					if (atmp[index].length > 3) {
						concflds+=tlup[2]+idx+"."+atmp[index]+",";
					} else {
						concflds+=atmp[index]+",";
					}
				}
				concflds=concflds.substr(0,concflds.length - 1);
				lookRetFields+=",CONCAT("+concflds+") as Look_"+tlup[1];
			} else {
				lookRetFields+=","+tlup[2]+idx+"."+tlup[4]+" as Look_"+tlup[1];
			}
			obj.LookFields+=",Look_"+tlup[1];
			idx++;
		}
	}
	var wc="";
	if (obj.FullSql=="") { // Make SQL
		if (obj.WhereClause != "") {
			wc="WHERE "+obj.WhereClause+" ";
			if (obj.FilterSql != "") wc=wc+"AND "+obj.FilterSql+" ";
		} else {
			if (obj.FilterSql != "") {
				wc="WHERE "+obj.FilterSql+" ";
			}
		}
		obj.Sql="SELECT DISTINCT "+obj.ColNamesStr+lookRetFields+" FROM "+obj.DataTable+lookup+" "+wc+"ORDER BY "+obj.OrderCol+" "+obj.OrderDir+" LIMIT "+obj.StartRow+","+obj.AnzRows;
//		$("#"+obj.DivID+"msgFi").hide();
	} else {
		obj.Sql=obj.FullSql;
	}
}
function ReloadLines(goto,obj) {
	$("#"+obj.DivID+"js_load").show();
	
	switch(goto) {
		case 0: obj.StartRow=0; break;  //first
		case 1: obj.StartRow-=parseInt(obj.AnzRows); if (obj.StartRow<0) obj.StartRow=0; break;  //next
		case 2: obj.StartRow+=parseInt(obj.AnzRows); if (obj.StartRow>obj.TotalRows) obj.StartRow=obj.TotalRows-parseInt(obj.AnzRows); break;  //prev
		case 3: obj.StartRow=obj.TotalRows-parseInt(obj.AnzRows);  //last
	}
	if (obj.StartRow<0) obj.StartRow=0;
	DrawRows(obj);
	var von=parseInt(obj.StartRow); von++;
	var bis=parseInt(obj.StartRow)+parseInt(obj.AnzRows);
	if (bis > obj.TotalRows) bis=obj.TotalRows;
	if (obj.TotalRows==0) von=0;
	var iTxt = String.fromCharCode(160)+obj.Lang["Zeilen"]+" "+von+" "+obj.Lang["Bis"]+" "+bis+" "+obj.Lang["Von"]+" "+obj.TotalRows;
	$("#"+obj.DivID+"counter").html(iTxt);
//	if (parseInt(obj.TotalRows) <= parseInt(obj.AnzRows)) { $(".picnavi"+obj.DivID).hide(); } else { $(".picnavi"+obj.DivID).show();	}
	$("#j"+obj.DivID+"s_load").hide();
}
function checkEmail(wert) {
	var ret = false, t1=false, t2=false;
	if (wert.indexOf("@") > 0) t1=true;
	if (wert.indexOf(".") > 0) t2=true;
	if (t1 && t2) return true;
	return false;
}
function DrawRows(obj) {
	if (start_up==false) {
		$("#"+obj.DivID+"js_load").center($("#tbl_"+obj.DivID)).show();
	}
	MakeSQL(obj);
	var tsql="SELECT MAX("+obj.PrimID+") as maxID FROM "+obj.DataTable;
	var tres = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=drawRowsJson", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "fullsql": 0, "sql": tsql, "cnams": "maxID"}, async: false}).responseText;
	var rset=$.parseJSON(tres);
	obj.LastRowID=rset.rows[0].maxID;
	if (obj.FullSql == "") {
		var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=drawRowsJson", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "fullsql": 0, "sql": obj.Sql, "cnams": obj.ColNamesStr+obj.LookFields}, async: false}).responseText;
	} else {
		var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=drawRowsJson", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "fullsql": 1, "sql": obj.Sql, "cnams": obj.ColNamesStr}, async: false}).responseText;		
	}
	$("."+obj.DivID+"zrow").remove();
	obj.RecSet=$.parseJSON(result); 
	obj.LastSQL=obj.Sql; obj.LastJson=obj.RecSet;
	var ret=""; var ret2=""; var zeile=0; var RowId=0; obj.SumVals=new Array();
	obj.TotalRows=obj.RecSet.opts[1].total;
	if (obj.TotalRows < 2 && obj.showFilter2) {
		$("#"+obj.DivID+"_fiBox").hide();
	} else {
		$("#"+obj.DivID+"_fiBox").show();
	}
	obj.LastSQL=obj.Sql; obj.LastJson=obj.RecSet;
	$("#"+obj.DivID+"_noData").remove();
	if (obj.TotalRows==0) { 
		var count=0;
		ret2+="<tr id='"+obj.DivID+"z_1' class='tOdd myGridOddRow "+obj.DivID+"Z1'>";
		for (var f in obj.Spalten) {
			if (obj.ShowID==true || f != obj.PrimID) {
				ret2+="<td id='"+obj.DivID+"#"+f+"#z_"+zeile+"' class='"+obj.DivID+"z_1'>&nbsp;</td>";
				count++;
			}
		}
		ret+="<tr id='"+obj.DivID+"_noData' class='noData'><td colspan='"+(count+1)+"' style='text-align: center'>"+obj.NoDataMsg+"</td></tr>";
		if (obj.showSumRow==false) {
			$("#"+obj.DivID+"_navi").before(ret);
			$("#"+obj.DivID+"_navi").before(ret2);
		} else {
			$("#"+obj.DivID+"_sum").before(ret);
			$("#"+obj.DivID+"_sum").before(ret2);
		}
		$("#"+obj.DivID+"z_1").remove();
		if (obj.TotalRows < 2 && obj.showFilter2) {
			$(".filterrow").hide();
		}
	} else {
		var isEdCond=false; var isCaCond=false; var isPrCond=false;
		if (obj.IconCondEd != "show") {
			var tmpiced=obj.IconCondEd.split("*");
			var edicFld=tmpiced[0]; var edicop=tmpiced[1]; var edicwert=tmpiced[2];  // feld - operator - wert
			isEdCond=true;
		}
		if (obj.IconCondCa != "show") {
			var tmpicca=obj.IconCondCa.split("*");
			var caicFld=tmpicca[0]; var caicop=tmpicca[1]; var caicwert=tmpicca[2];
			isCaCond=true;
		}
		if (obj.IconCondPr != "show") {
			var tmpicpr=obj.IconCondPr.split("*");
			var pricFld=tmpicpr[0]; var pricop=tmpicpr[1]; var pricwert=tmpicpr[2];
			isPrCond=true;
		}
		for (var r in obj.RecSet.rows) {
			zeile++; RowId=obj.RecSet.rows[r][obj.DataTable+'.'+obj.PrimID];
			if (RowId==undefined) RowId=obj.RecSet.rows[r][obj.PrimID];
			ret+="<tr id='"+obj.DivID+"z_"+zeile+"' class='tabRow tOdd myGridOddRow "+obj.DivID+"zrow' onmouseover='setBold(this,"+obj.HighLight+")' onmouseout='setNorm(this,"+obj.HighLight+")' data-keyWert='"+RowId+"'>";
			var showCaIcon=true; var showEdIcon=true; var showPrIcon=true;
			for (var f in obj.Spalten) {
				if (obj.ShowID==true || (f != obj.PrimID && jQuery.inArray(f, obj.OwnerOnly == 'done'))) {
					var isBool=false,modus="Text",bowe="", inset="";
					switch(obj.Spalten[f].coltyp) {
						case "flo":
						case "dec": modus="Float"; break;
						case "int":
						case "big":
						case "med":
						case "sma":
						case "tin": modus="Int"; break;
						case "var":
						case "tex": modus="Text"; break;
					}
					var isButton=false, btBuUrl="", btBuTxt="";
					for (var bt in obj.ColButton) {
						var itmp=obj.ColButton[bt].split("*");
						if (itmp[0]==f) {
							btBuTxt=itmp[1]; btBuUrl=itmp[2];
							obj.Spalten[f].coltyp="button";
							modus="button"; isButton=true; break;
						}
					}
					
					var isBild=false, path=obj.ImagePath, imgW=32, imgH=32; 
					for (var im in obj.ImageCols) {
						var itmp=obj.ImageCols[im].split("*");
						if (itmp[0]==f) {
							imgW=itmp[1]; imgH=itmp[2];
							obj.Spalten[f].coltyp="image";
							modus="image"; isBild=true; break;
						}
					}
					var funcNa="";
					for (var fl in obj.FreeLookCols) {
						var ctmp=obj.FreeLookCols[fl].split("*");
						if (ctmp[0]==f) {
							funcNa=ctmp[1];
							obj.Spalten[f].coltyp="free";
							modus="FreeLook"; break;
						}
					}
					var funcNaC=""; var color=false;
					for (var co in obj.ColorCols) {
						var ctmp=obj.ColorCols[co].split("*");
						if (ctmp[0]==f) {	 // col name
							funcNaC=ctmp[1];  // funcname
							color=true; break;
						}
					}
					var funcNaBC=""; backcolor=false;
					for (var bc in obj.BackCols) {
						var ctmp=obj.BackCols[bc].split("*");
						if (ctmp[0]==f) {
							funcNaBC=ctmp[1];
							backcolor=true; break;
						}
					}
					var fett=false;
					for (var im in obj.BoldCols) {
						var fettcol=obj.BoldCols[im];
						if (f==fettcol) {
							fett=true; break;
						}
					}
					for (var em in obj.EmailLinks) {
						var emailfld=obj.EmailLinks[em];
						if (f==emailfld) { 
							obj.Spalten[f].coltyp="eml";
							modus="Email"; break;
							}
					}
					for (var bo in obj.BoolCols) {
						var arboolflds=obj.BoolCols[bo].split("*");
						if (f==arboolflds[0]) { modus="Bool"; break; }
					}
					if (obj.Spalten[f].coltyp=="dat") modus="Date";
					if (obj.Spalten[f].coltyp=="tim") modus="Time";
					var ali="left";
					switch(obj.Spalten[f].coltyp) {
						case "dec":
						case "flo":
						case "dou":
						case "int":
						case "big":
						case "med":
						case "tin": ali="right"; break;
						case "eml": ali="left"; break;
	//					case "free":
						case "image":
						case "tim":
						case "dat": ali="center";
					}
					for(c in obj.ColAlign) {
						var ca=obj.ColAlign[c].split("*");
						var feldn=ca[0];
						if (f==obj.PrimID) {
							ali="center";
						}
						if (f==feldn) {
							ali=ca[1];
						}
					}
					if (obj.FullSql != "") {
						var fname=f; var wert=obj.RecSet.rows[r][fname]; var lookval=wert;
					} else {
						var fname=f; var wert=obj.RecSet.rows[r][obj.DataTable+'.'+fname]; var lookval=wert;
					}
					if (isEdCond) {
						if (edicFld==f && !eval(wert+edicop+edicwert)) {
							showEdIcon=false;
						}
					}
					if (isCaCond) {
						if (caicFld==f && !eval(wert+caicop+caicwert)) {
							showCaIcon=false;
						}
					}
					if (isPrCond) {
						if (pricFld==f && !eval(wert+pricop+pricwert)) {
							showPrIcon=false;
						}
					}
					for (var lup in obj.LookUp) {
						tlup=obj.LookUp[lup].split("*"); //1=ofield,2=table,3=fkey,4=return_field,5=type,6=where
						if (tlup[0]=="DB" && tlup[1]==f) { //Spalte = LookUp
							wert=obj.RecSet.rows[r]["Look_"+fname];
							switch(tlup[5]) {
								case "flo":
								case "dec": modus="Float"; break;
								case "int":
								case "big":
								case "med":
								case "sma":
								case "tin": modus="Int"; break;
								case "var": modus="Text"; break;
							}
						}
					}
					var ok=true, oldWert=wert, tmpWert=wert;
					for (var s in obj.SumCols) {
						var tmp=obj.SumCols[s].split("*");
						if (tmp[0]==f) {
							if (obj.SumVals[f]==undefined) obj.SumVals[f]=0;
							if (!(wert==undefined)) {
								if (modus=="Int") {
									obj.SumVals[f]+=parseInt(wert);
								}
								if (modus=="Float") {
									obj.SumVals[f]+=parseFloat(wert);
								}
							}
						}
					}
					var org_wert=wert;
					switch(modus) {
						case "FreeLook": ali="center"; oldWert=wert; if (funcNa!="") wert=eval(funcNa+"('"+wert+"');"); break;
						case "Email": var isEmail=checkEmail(wert); if (isEmail) {wert="<a href=\"mailto:"+wert+"\">"+wert+"</a>"; }; break;
						case "Bool": if (wert==0) {bowe=""; bw="0";} else {bowe=" checked"; bw="1";}; ret+="<td id='"+obj.DivID+"#"+fname+"#z_"+zeile+"' class='dataRow "+modus+" "+obj.DivID+"z_"+zeile+"' align='center' name='"+obj.DivID+"-"+fname+"'><input type='checkbox' class='"+obj.DivID+"_Chk' id='"+obj.DivID+"chk_"+zeile+"' data-keyVal='"+bw+"' onClick='doCheckBool(this)' "+bowe+"></td>"; ok=false; break;
						case "Date": wert=getDateFormat(obj,wert); ok=true; break;
						case "Time": if (wert=="00:00:00") { wert=""; ok=true; break; }
									 if (obj.TimeFormat="hh:mm") { wert=wert.slice(0,-3); ok=true; break; }
						case "Float": wert=getFormat("float", wert, obj.Spalten[f].colfmt); ok=true; break;
						case "Int": wert=getFormat("int", wert, obj.Spalten[f].colfmt); ok=true; break;
						case "Text": wert=getMaxChar(obj,obj.Spalten[f].colwidth,wert); ok=true;
					}
					if (fett) { var fowe="bold"; } else { var fowe="normal"; }
					var tFarb="";
					if (color) {
						if (funcNaC!="") tFarb=eval(funcNaC+"('"+org_wert+"');");
						if (tFarb != "") {
							tFarb="; color:#"+tFarb;
						}
					}
					var tBFarb="";
					if (backcolor) {
						if (funcNaBC!="") tBFarb=eval(funcNaBC+"('"+org_wert+"');");
						if (tBFarb != "") {
							tBFarb="; background-color:#"+tBFarb;
						}
					}
					var wert1=wert; var keywert=oldWert; var inset=""; var wert2="";
					if (isButton) {
						wert2="<input type='button' id='btButton_"+zeile+"' style='cursor: pointer' value='"+btBuTxt+"' onclick='executeButton(\""+btBuUrl+"\","+RowId+")'>";
						wert1=wert2;
					}
					if (isBild) {
						if (wert=="" || wert=="''") {
							wert1="Kein Bild...";
						} else {
							var imgWi="", imgHi="";
							if (imgW!="auto") imgWi="width='"+imgW+"'";
							if (imgH!="auto") imgHi="height='"+imgH+"'";
							var d = new Date();
							var n = d.getTime();
							wert1="<img src='"+path+"/"+wert1+"?t="+n+"' "+imgWi+" "+imgHi+">";
						}
					}
					if (obj.Language > -1) {
						if (modus=="Text") {
							var t=wert1;
							if (t.indexOf("*")) {
								var at=t.split("*");
								var le=at.length;
								wert1=at[obj.Language];
							}
						}
					}
//					alert(lookval);
					if (ok) ret+="<td id='"+obj.DivID+"#"+fname+"#z_"+zeile+"' data-type='"+modus+"' data-lookVal='"+lookval+"' data-keyVal='"+oldWert+"' data-keyWert='"+keywert+"' data-keyID='"+RowId+"' class='dataRow "+modus+" "+obj.DivID+"z_"+zeile+"' name='"+obj.DivID+"-"+fname+"' style='font-size: "+obj.CFontSize+"; font-weight: "+fowe+"; text-align:"+ali+tFarb+tBFarb+"; line-height: "+(parseInt(obj.CFontSize)+2)+"px'>"+wert1+"</td>";
				}
			}
			if (obj.ShowAction) {
				ret+="<td id='"+obj.DivID+"z"+zeile+"#c_Aktion' name='"+obj.DivID+"a"+zeile+"' class='action dataRow aktionCell myGridActionRow' valign='middle' align='center'>&nbsp;";
				if (obj.ShowEdit) {
					if (showEdIcon) {
						ret+="<img id='"+obj.DivID+"edi_"+zeile+"' name='"+obj.DivID+":"+RowId+"' class='"+obj.DivID+"-edit' title='"+obj.Lang["Change"]+"' src='"+obj.ImagesPath+"images/b_edit.png' heigth="+obj.IconSize+" width="+obj.IconSize+" style='cursor:pointer; vertical-align: middle' onclick='doEdit("+obj.ObjName+",this,"+zeile+")'><img id='"+obj.DivID+"pxedi_1' class='aktion' name='"+obj.DivID+"pxedi_1' src='"+obj.ImagesPath+"images/1pixel.gif' heigth='"+obj.IconSize+"' width='3px'>";
					}
				}
				if (obj.ShowDelete) {
					if (showCaIcon) {
						ret+="<img id='"+obj.DivID+"del_"+zeile+"' name='"+obj.DivID+":"+RowId+"' class='"+obj.DivID+"-delete' title='"+obj.Lang["Erase"]+"' src='"+obj.ImagesPath+"images/b_drop.png' heigth="+obj.IconSize+" width="+obj.IconSize+" style='cursor:pointer; vertical-align: middle' onclick='doMyGrDelete("+obj.ObjName+",this,"+zeile+")'><img id='"+obj.DivID+"pxdel_1' class='aktion' name='"+obj.DivID+"pxdel_1' src='"+obj.ImagesPath+"images/1pixel.gif' heigth='"+obj.IconSize+"' width='1px'>";
					}
				}
				if (obj.ShowEdit || obj.ShowDelete) {
					ret+="<img id='"+obj.DivID+"sav_"+zeile+"' name='"+obj.DivID+":"+RowId+"' class='"+obj.DivID+"-save' title='"+obj.Lang["Save"]+"' src='"+obj.ImagesPath+"images/b_save.png' heigth="+obj.IconSize+" width="+obj.IconSize+" style='cursor:pointer; vertical-align: middle' onclick='doEdDelSave("+obj.ObjName+",this,"+RowId+","+zeile+",1)'><img id='"+obj.DivID+"pxdel_3' class='aktion' name='"+obj.DivID+"pxdel_3' src='"+obj.ImagesPath+"images/1pixel.gif' heigth='"+obj.IconSize+"' width='3px'>";
					ret+="<img id='"+obj.DivID+"can_"+zeile+"' name='"+obj.DivID+":"+RowId+"' class='"+obj.DivID+"-cancel' title='"+obj.Lang["Cancel"]+"' src='"+obj.ImagesPath+"images/b_cancel.png' heigth="+obj.IconSize+" width="+obj.IconSize+" style='cursor:pointer; vertical-align: middle' onclick='doEdDelCancel("+obj.ObjName+",this,"+zeile+",0)'><img id='"+obj.DivID+"pxdel_2' class='"+obj.DivID+"-cancel aktion' name='"+obj.DivID+"pxdel_2' src='"+obj.ImagesPath+"images/1pixel.gif' heigth='"+obj.IconSize+"' width='3px'>";
				}
				if (obj.ShowDetailPage && (obj.DetailImg!="")) {
					if (showPrIcon) {
						if (obj.ToolTip=="") { var tp=obj.Lang["DShow"]; } else { var tp=obj.ToolTip; }
						ret+="<img id='"+obj.DivID+"pag_"+zeile+"' name='"+obj.DivID+":"+RowId+"' class='"+obj.DivID+"-detailpage' title='"+tp+"' src='"+obj.ImagesPath+"images/"+obj.DetailImg+"' heigth="+obj.IconSize+" width="+obj.IconSize+" style='cursor:pointer; vertical-align: middle' onclick='doPage("+obj.ObjName+","+obj.DivID+"z_"+zeile+","+RowId+")'>";
						ret+="<img id='"+obj.DivID+"pxpag_1' class='aktion' name='"+obj.DivID+"pxpag_1' src='"+obj.ImagesPath+"images/1pixel.gif' heigth='"+obj.IconSize+"' width='1px'>";
					}
				}
				ret+="</td>";
			}
			ret+="</tr>";
			if (obj.showSumRow==false) {
				$("#"+obj.DivID+"_navi").before(ret);
			} else {
				$("#"+obj.DivID+"_sum").before(ret);
			}
			ret="";
			var fnstring = "afterDrawRow"; var retu="";
			var fn = window[fnstring];
			if (typeof fn === "function") {	retu=fn(obj.DivID+"z_"+zeile,RowId); }
			if (retu!="") {
				alert("Called Function '"+fnstring+"' returned: "+retu);
			} 
		}
	}
	$("."+obj.DivID+"zrow:odd").removeClass("tOdd").addClass("tEven").removeClass("myGridOddRow").addClass("myGridEvenRow");
	$("."+obj.DivID+"-save, ."+obj.DivID+"-cancel").hide();
	$(".cancel").hide();
	if (obj.showSumRow) {
		DrawSumRow(obj);
	} else {
		$("#"+obj.DivID+"_sum").remove();
	}
	DrawNaviRow(obj);
	if (parseInt(obj.TotalRows) <= parseInt(obj.AnzRows)) { $(".picnavi"+obj.DivID).hide(); } else { $(".picnavi"+obj.DivID).show();	}
	$("#"+obj.DivID+"js_load").hide();
}
function doPage(obj,tr_id,rowID) {
	if (obj.PropMode=="func") {
		// Call Detail Func
		var fnstring = obj.PropPath; var ret=true;
		var fn = window[fnstring];
		if (typeof fn === "function") {	
			ret=fn(obj,tr_id.id,rowID); 
		}
		if (ret==false) {
			alert("Called Function '"+fnstring+"' returned false!");
		}
	} else {
		var fnstring = "beforePropPage"; var ret="";
		var fn = window[fnstring];
		if (typeof fn === "function") {	
			ret=fn(obj,tr_id.id,rowID); 
		}
		if (ret!="") {
			return false;
		}
		// open DetailPage
		var w=window.open(obj.PropPath+"?row_id="+rowID+"&mode="+obj.PropMode,"details");
	}
}
function number_format(number, decimals, dec_point, thousands_sep) {
  	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  	var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k).toFixed(prec);
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
function getMaxChar(obj,colw,wert) {
	if (obj.FitTextInLine) {
		//cut text to size
		if ($.fn.textWidth(wert, obj.CFontSize) > colw) {
			for (var x=wert.length; x>0; x--) {
				wert=wert.substr(0,x);
				if ($.fn.textWidth(wert+obj.textEnd, obj.CFontSize) < colw) break;
			}
			wert=wert+obj.textEnd;
		}
	}
	return wert;
}
function getColNumFormat(obj,cn) {
	for(var i in obj.NumFormat) {
		var atf=obj.NumFormat[i].split("#");
		if (atf[0]==cn) {
			var atfd=atf[1].split("*"); var afm=atfd[0]+"# "+atfd[1];
			return afm;
		}
	}
	return ".";
}
function getDateFormat(obj,wert) {
	if (wert=="0000-00-00") { wert=""; return wert; }
	var a=wert.split("-"); var j=a[0]; var m=a[1]; var d=a[2];
	switch(obj.DateFormat) {
		case "GE": wert=d+'.'+m+'.'+j; break;
		case "EN": wert=m+'/'+d+'/'+j; break;
		case "SQL":
	}
	return wert;
}
function getFormat(art,wert,fmt) {
	if (art=="float") {
		if (fmt!="*" && fmt!=".") {
			var a=fmt.split("*"); var b=a[0].split(":"); var cur=a[1];
			var dez=b[0]; th=b[1]; var nk=b[2];
			if (isNaN(wert)) wert=0.00;
			if (cur!=undefined) {
				wert=number_format(wert,nk,dez,th);
				if (cur.length>0) wert+=" "+cur;
			}
		}
	}
	if (art=="int") {
		if (fmt!="*" && fmt!=".") {
			var a=fmt.split("*"); var th=a[0]; var cur=a[1];
			if (cur!=undefined) {
				wert=number_format(wert,0,".",th);
				if (cur.length>0) wert+=" "+cur;
			}
		}
	}
	return wert.toString();
}
function DrawSumRow(obj) {
	if (obj.showSumRow) {
		var result=""; var idx=0; var felder=""; var fnams="";
		for(var i in obj.Spalten) {
			var summe=""; //String.fromCharCode(160);
			var ali="right";
			for(c in obj.ColAlign) {
				var ca=obj.ColAlign[c].split("*");
				if (i==ca[0]) { ali=ca[1]; break; }
			}
			if (obj.ShowID==true || i != obj.PrimID) {
				for(var s in obj.SumCols) {
					var aCol=obj.SumCols[s].split("*");
					if (aCol[0] == i) {
						felder+="SUM("+i+") as "+i+",";
						fnams+=i+",";
						switch(obj.Spalten[i].coltyp) {
							case "flo":
							case "dec": modus="float"; break;
							case "int":
							case "big":
							case "med":
							case "tin": modus="int"; break;
						}
						var txt=getFormat(modus,0,obj.Spalten[i].colfmt);
						summe=txt;
					}
				}
				result+="<td name='"+obj.DivID+"sumCell' class='dataRow tsumme myGridSumRow' align='right'><div id='"+obj.DivID+"sum_"+i+"' class='myGridSumVal' style='margin-left:"+obj.TbPadding+"px; margin-right:"+obj.TbPadding+"px; font-size:"+obj.SFontSize+"; font-weight:"+obj.SFontWeight+"; text-align:"+ali+"'>"+summe+"</div></td>";
				summe="";
			}
		}
		fnams=fnams.slice(0,-1);
		if (obj.FullSql=="") { var full=0; } else { var full=1; }
		if (obj.SumMode=="all") {
			felder=felder.substr(0,felder.length-1);
			var erg=$.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=getFieldsSum", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "fullsql": full, "sql": obj.Sql, "fields":felder, "cnams": fnams, "mode": obj.SumMode}, async: false}).responseText;
			var afld=erg.split(":");
		} else {
			var tfld=obj.SumVals; var afld=new Array();
			for (x in tfld) {
				afld.push(x+"*"+tfld[x]);
			}
		}
		if (obj.ShowAction) {
			result+="<td id='"+obj.DivID+"sumAktion' name='"+obj.DivID+"sumAktion' class='dataRow tsumme myGridActionSumRow' align='center'><select class='sumsel' name='"+obj.DivID+"selsummode' id='"+obj.DivID+"selsummode' onchange='setSumMode(this,"+obj.ObjName+")' style='height:20px'><option value='all'>all</option><option value='view'>view</option><option value='filter'>filter</option></select></td>";
		}
		$("#"+obj.DivID+"_sum").html(result);
		switch(obj.SumMode) {
			case "all": idx=0; break;
			case "view": idx=1; break;
			case "filter": idx=2;
		}
		$("select#"+obj.DivID+"selsummode option:eq("+idx+")").prop("selected", true);
		for(var x in afld) {
			var tfld=afld[x].split("*"); var fld=tfld[0]; var wert=tfld[1]; var modus="float";
			switch(obj.Spalten[fld].coltyp) {
				case "flo":
				case "dec": modus="float"; wert=parseFloat(tfld[1]); break;
				case "int":
				case "big":
				case "med":
				case "tin": modus="int"; wert=parseInt(tfld[1]); break;
			}
			$("#"+obj.DivID+"sum_"+fld).text(getFormat(modus,wert,obj.Spalten[fld].colfmt));
			var ali="right";
			for(c in obj.ColAlign) {
				var ca=obj.ColAlign[c].split("*");
				if (fld==ca[0]) { ali=ca[1]; break; }
			}
			$("#"+obj.DivID+"sum_"+fld).css("text-align",ali);
		}

	}
	obj.SumLineDa=true;	
}
function setSumMode(ele,obj) {
	obj.SumMode=ele.value;
	DrawSumRow(obj);
}
function DrawNaviRow(obj) {
	var anz=0;
	for(var i in obj.Spalten) {
		if (obj.ShowID==true || obj.Spalten[i].feldname != obj.PrimID) {
			anz++;
		}
	}
	var von=parseInt(obj.StartRow); von++;
	var bis=parseInt(obj.StartRow+obj.AnzRows);
	if (bis > obj.TotalRows) bis=obj.TotalRows;
	if (obj.TotalRows==0) von=0;
	var iTxt = String.fromCharCode(160)+obj.Lang["Zeilen"]+" "+von+" "+obj.Lang["Bis"]+" "+bis+" "+obj.Lang["Von"]+" "+obj.TotalRows;
	var result="<td class='dataRow tnavi myGridNaviRow' colspan="+anz+" align='center'><div class='innernavi'  style='float: left;'>&nbsp;<img src='"+obj.ImagesPath+"images/b_db_start.png' onClick='ReloadLines(0,"+obj.ObjName+")' class='picnavi"+obj.DivID+"' alt='anfang' width='16' height='16' border='0' align='absmiddle' title='"+obj.Lang["First"]+"' style='cursor:pointer;' /> <img src='"+obj.ImagesPath+"images/b_db_prev.png' onClick='ReloadLines(1,"+obj.ObjName+")' class='picnavi"+obj.DivID+"' alt='zurueck' width='16' height='16' border='0' align='absmiddle' title='"+obj.Lang["Prev"]+"' style='cursor:pointer;' /> <img src='"+obj.ImagesPath+"images/b_db_next.png' onClick='ReloadLines(2,"+obj.ObjName+")' class='picnavi"+obj.DivID+"' alt='weiter' width='16' height='16' border='0' align='absmiddle' title='"+obj.Lang["Next"]+"' style='cursor:pointer;' /> <img src='"+obj.ImagesPath+"images/b_db_end.png' onClick='ReloadLines(3,"+obj.ObjName+")' class='picnavi"+obj.DivID+"' alt='ende' width='16' height='16' border='0' align='absmiddle' title='"+obj.Lang["Last"]+"' style='cursor:pointer;' /></div>";
	result+="<div id='"+obj.DivID+"counter' class='divtxt myGridNaviRow innernavi' style='float: left; width: auto;'>"+iTxt+"</div><div class='divtxt myGridNaviRow innernavi' style='float: left; width: 60px'>&nbsp;-&nbsp;Max. </div><input type='text' id='"+obj.DivID+"_navsel' align='top' class='divtxt myGridNaviRow zentr innernavi' size='2' onChange='ChangeAnzRows("+obj.ObjName+", this.value)' value='"+obj.AnzRows+"' style='float: left; margin-top:0px; width: 35px; height: 20px; border-style: solid; border-width:thin; font-size:12px; border-color:#000; background-color:#FFF' /><div class='divtxt myGridNaviRow innernavi' style='float: left; width: 60px'>&nbsp;"+obj.Lang["Rows"]+"</div><div class='divtxt myGridNaviRow innernavi' style='float: left; width: 350px; color:#0000FF'> - &copy; by Alois Kaffl, Germany (Demoversion)</div>";
	//<div class='divtxt myGridNaviRow' style='float: left; width: auto; color: red'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+obj.Lang["CopyR"]+"</div>
	result+="</div><div id='export' style='float: right; width: 100;'>";
	if (obj.ShowXLS) {
		result+="&nbsp;<img id='icoExcel' src='"+obj.ImagesPath+"images/XLS.png' title='"+obj.Lang["XLS"]+"' alt='Excel' width='22' height='22' border='1' align='absmiddle' style='cursor:pointer' onclick='doExcel("+obj.ObjName+")' />"; }
	if (obj.ShowPRT) {
		result+="&nbsp;<img id='icoPrint' src='"+obj.ImagesPath+"images/b_print.png' title='"+obj.Lang["PRT"]+"' alt='Print' width='22' height='22' border='1' align='absmiddle' style='cursor:pointer;' onclick='doPrintTbl("+obj.ObjName+")' />"; }
	if (obj.ShowPDF) {
		result+="&nbsp;<img id='icoPdf' src='"+obj.ImagesPath+"images/PDF.png' title='"+obj.Lang["PDF"]+"' alt='Pdf' width='22' height='22' border='1' align='absmiddle' style='cursor:pointer' onclick='doPDF("+obj.ObjName+")' />"; }
	result+="</div></th>";
	if (obj.ShowAction) {
		result+="<th class='dataRow tnavi myGridActionNaviRow' align='center'>";
		if (obj.ShowNewLine) {
			result+="<img src='"+obj.ImagesPath+"images/b_insert.png' class='newPic' alt='neu' width='22' height='22' border='1' align='absmiddle' title='Neuen Datensatz hinzuf&uuml;gen' style='cursor:pointer;' onclick='doNewLine("+obj.ObjName+")' />&nbsp;";
		} else if (obj.ShowAllExec) {
			result+="<input type='button' style='font-weight:bold' value='Ausführen' onclick='"+obj.AllExecFunc+"' />";
		} else {
			result+="&nbsp;";
		}
		result+="</th>";
	}
	$("#"+obj.DivID+"_navi").html(result);
	if (obj.showNaviRow==false) $(".innernavi").hide();
	$("#"+obj.DivID+"js_navi_load").hide();
}
function ChangeAnzRows(obj, mx) {
	$("#"+obj.DivID+"js_navi_load").show();
	obj.AnzRows=mx;
	var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=saveAnzZeilen", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "table": "col_widths", "col_string_id": obj.DbGridForSize, "zeilen": mx}, async: false}).responseText;
	obj.ReloadLines(0,obj);
	$("#"+obj.DivID+"js_navi_load").hide();
}
function DrawHeader(obj) {
	var ret=""; var ret1=""; var dir_img="up"; var img="";
	if (obj.OrderDir.toLowerCase() == "asc") { dir_img="down"; }
	for(i in obj.Spalten) {
		var pic_v="<img src='"+obj.ImagesPath+"images/sort_"+dir_img+".png' class='sort_img' alt='sort' name='"+dir_img+"' width='12' height='10' align='bottom' id='img_"+obj.DivID+i+"' />";
		var order_col=obj.OrderCol;
		if (obj.ShowID==true || i != obj.PrimID) {
			if (obj.OrderCol.indexOf(",") > 1) {
				var aorco=obj.OrderCol.split(",");
				order_col=aorco[0];
			}
			if (order_col==i) { img=pic_v; da=true; } else { img=""; }
			var cw=obj.Spalten[i].colwidth;
			if (i == obj.PrimID && obj.ShowID==false) {
				ret+="<th id='"+obj.DivID+"-"+i+"' name='"+obj.DivID+"Head' class='dataRow "+obj.DivID+"_header"+"' style='font-size:"+obj.HFontSize+"; font-weight:"+obj.HFontWeight+"; margin-left:"+obj.TbPadding+"px; margin-right:"+obj.TbPadding+"px; text-align: left; width: "+cw+"'>"+obj.Spalten[i].anzeige+"</th>";
			} else {
				var al="left";
				switch(obj.Spalten[i].coltyp) {
					case "dec":
					case "flo":
					case "dou":
					case "int":
					case "big":
					case "med": al="right"; break;
					case "image":
					case "tin": al="center"; break;
					case "dat": al="center";
				}
				for(c in obj.HeadAlign) {
					var ca=obj.HeadAlign[c].split("*");
					var fn=ca[0];
					if (obj.Spalten[i].feldname==fn) {
						al=ca[1];
					}
				}
				ret+="<th id='"+obj.DivID+"-"+i+"' name='"+i+"' class='dataRow "+obj.DivID+"_header"+"'";
				ret+=" style='font-size:"+obj.HFontSize+"; font-weight:"+obj.HFontWeight+"; margin-left:"+obj.TbPadding+"px; margin-right:"+obj.TbPadding+"px; text-align:"+al+"; width: "+cw+"' onClick='doChangeDir(this,"+obj.ObjName+")'>"+obj.Spalten[i].anzeige+"<span id='"+obj.DivID+"-i-"+i+"'>"+img+"</span></th>";
			}
		}
	}
	if (obj.ShowAction) {
		ret+="<th id='"+obj.DivID+"_Aktion' name='"+obj.DivID+"_Aktion' class='th_action dataRow' style='font-size:"+obj.HFontSize+"; font-weight:"+obj.HFontWeight+"; margin-left:"+obj.TbPadding+"px; margin-right:"+obj.TbPadding+"px; text-align: center; cursor:default'>"+obj.Lang["Aktion"]+"</th>";
	}
	$("#"+obj.DivID+"_header").html(ret);
//	for(i in obj.Spalten) {
//		$("#"+obj.DivID+"-"+i).css("width",obj.Spalten[i].colwidth);
//	}
}
function doChangeDir(ele,obj) {
	if (obj.Stop) { obj.Stop=false; return; }
	$("#"+obj.DivID+"js_load").show();
	var id=ele.id; var t=id.split("-"); var spx=t[1].split("#"); var sp_id=obj.DivID+"-i-"+spx[0];
	var ord_col=new Array(); var ismore=false;
	if (obj.OrderCol.indexOf(",") > 1) {
		var aorco=obj.OrderCol.split(",");
		ord_col[0]=aorco[0]; ord_col[1]=aorco[1];
		ismore=true;
	}
	var dir=$(".sort_img").prop("src");
	if ($("#"+sp_id).html()=="") { // Neue Column und down
		var dir_img="down";
		obj.OrderCol=t[1]; if (ismore) obj.OrderCol=obj.OrderCol+","+ord_col[1];
		obj.OrderDir="ASC";
//		ReloadLines(9,obj);
	} else { // Neue richtung
		var pos=dir.indexOf("down");
		if (pos > 0) { var dir_img="up"; } else { var dir_img="down"; }
		obj.OrderCol=t[1]; if (ismore) obj.OrderCol=obj.OrderCol+","+ord_col[1];
		if (dir_img=="down") { obj.OrderDir="ASC"; } else { obj.OrderDir="DESC"; }
	}	
	$(".sort_img").remove();
	var pic_v="<img src='"+obj.ImagesPath+"images/sort_"+dir_img+".png' class='sort_img' alt='sort' name='"+dir_img+"' width='12' height='10' align='bottom' id='img_"+obj.DivID+t[1]+"' />";
	$("#"+sp_id).html(pic_v);
	DrawRows(obj);
}
function doHeaderCaps(obj) {
	for(var i in obj.HeaderCaps) {
		var t=obj.HeaderCaps[i].split("*");
		var fld=t[0]; var cap=t[1];
		for(var i in obj.Spalten) {
			if (obj.Spalten[i].feldname==fld) {
				obj.Spalten[i].anzeige=cap;
			}
		}
	}
}
function getFromPHP (what, obj, fld) {
	var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func="+what, data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "table": obj.DataTable, "field": fld},  async: false}).responseText;
	return result;
}
function getColW(typ) {
	cw="0px";
	switch(typ) {
		case "big": cw="60px"; break;
		case "sma": cw="50px"; break;
		case "tin": cw="40px"; break;
		case "int": cw="60px"; break;
		case "dec":
		case "dou": cw="90px"; break;
		case "var": cw="160px"; break;
		case "tex": cw="140px"; break;
		case "dat": cw="80px"; break;
		case "akt1": cw="40px"; break;
		case "akt2": cw="65px"; break;
	}
	return cw;
}
function getDbCols(obj) {
	var count=0; var result="None"; var str="";
	if (obj.ColResize==true) { // GetColWidths from DB
		result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=getColWidth", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "table": "col_widths", "col_string_id": obj.DbGridForSize}, async: false}).responseText;
		var tmp=result.split("#"); var aCols=tmp[0].split(","); var maxZeilen=tmp[1];
		if (tmp!="None") { obj.AnzRows=maxZeilen; result=tmp; }
		result=tmp;
		start_up=true;
	}
	if (obj.FullSql=="") {
		var typ="";
		if (obj.DataSource=="DB") {
			if (obj.ShowCols=="all") {
				var res=getFromPHP ("getColTypes", obj, "");
				var arrTypes=res.split("#");
				var res=getFromPHP ("getColNames", obj, "");
				var aCo=res.split("#"); var cw="100px";
				for (var i in aCo) {
					var aCoT=aCo[i].split("*");
					for (var t in arrTypes) {
						var erg=arrTypes[t].split("*");
						if (erg[0]==aCoT[0]) {
							typ=erg[1]; break;
						}
					}
					if (result=="None") {
						var cw=getColW(typ.substr(0,3));
					} else {
						for(var z in aCols) {
							var at=aCols[z].split(":");
							if (aCoT[0]==at[0]) {
								var cw=at[1]; break;
							}
						}
					}
					var oCol={feldname: aCoT[0], anzeige: aCoT[0], coltyp: aCoT[1].substr(0,3), colwidth: cw, colfmt: typ};
					obj.Spalten[aCoT[0]]=oCol; //obj.Spalten.push(oCol);
					str+=obj.DataTable+"."+aCoT[0]+",";
					count++;
				}
				obj.ColNamesStr=str.substr(0,str.length-1);
			}
			if (obj.ShowCols!="all") {
				var atcol=obj.ShowCols.split("*");
				var tcol=atcol[1].replace(/\s/g, "");
				var pCols=tcol.split(",");
				var aCo=tcol.split(","); var str="";
				var res=getFromPHP ("getColTypes", obj, "");
				var arrTypes=res.split("#");
				if (atcol[0]=="include") {
					if ($.inArray(obj.PrimID,pCols)==-1) tcol=obj.PrimID+","+tcol;
					for (var i in aCo) {
						var aCoT=aCo[i].split("*");
						for (var t in arrTypes) {
							var erg=arrTypes[t].split("*");
							if (erg[0]==aCoT[0]) {
								typ=erg[1]; break;
							}
						}
						if (result=="None") {
							var cw=getColW(typ.substr(0,3));
						} else {
							for(var z in aCols) {
								var at=aCols[z].split(":");
								if (aCo[i]==at[0]) {
									var cw=at[1]; break;
								}
							}
						}
						var oCol={feldname: aCo[i], anzeige: aCo[i], coltyp: erg[1].substr(0,3), colwidth: cw, colfmt: typ};
						obj.Spalten[aCo[i]]=oCol; //obj.Spalten.push(oCol);
						str+=obj.DataTable+"."+aCo[i]+",";
						count++;
					}
				} else {  // exclude
					var res=getFromPHP ("getColNames", obj, "");
					var aCoN=res.split("#");
					for (var i in aCoN) {
						var aCoT=aCoN[i].split("*");
						if ($.inArray(aCoT[0], aCo)==-1) {
							for (var t in arrTypes) {
								var erg=arrTypes[t].split("*");
								if (erg[0]==aCoT[0]) {
									typ=erg[1]; break;
								}
							}
							if (result=="None") {
								var cw=getColW(typ.substr(0,3));
							} else {
								for(var z in aCols) {
									var at=aCols[z].split(":");
									if (aCoT[0]==at[0]) {
										var cw=at[1]; break;
									}
								}
							}
							var oCol={feldname: aCoT[0], anzeige: aCoT[0], coltyp: aCoT[1].substr(0,3), colwidth: cw, colfmt: typ};
							obj.Spalten[aCoT[0]]=oCol; //obj.Spalten.push(oCol);
							str+=obj.DataTable+"."+aCoT[0]+",";
							count++;
						}
					}
				}
				obj.ColNamesStr=str.substr(0,str.length-1);
			}
		} else {
			// Cols from Array
		}
	} else {
// 		get from fullsql
		var atcol=obj.ShowCols.split("*");
		var acols=atcol[1].split(",");
		for (var i in acols) {
			var aco=acols[i].split("#"); var colname=aco[0]; var coltyp=aco[1];
			if (result=="None") {
				var cw=getColW(coltyp);
			} else {
				for(var z in aCols) {
					var at=aCols[z].split(":");
					if (colname==at[0]) {
						var cw=at[1]; break;
					}
				}
			}
			var oCol={feldname: colname, anzeige: colname, coltyp: coltyp, colwidth: cw, colfmt: coltyp};
			obj.Spalten[colname]=oCol;
			str+=colname+",";
			count++;
		}
		count++;
		obj.ColNamesStr=str.substr(0,str.length-1);
	}
	obj.AnzCols=count - parseInt((obj.ShowID==false) ? 1:0) + parseInt((obj.ShowAction==true) ? 1:0);
}
function saveColWidths(obj) {
	var argum=""; //obj=$(thobj).parent().parent().parent();
	if (obj.ColResize==true && start_up==false) {
		$("th").each(function(idx){
			var tid=this.id;
			if (tid.indexOf("-")>1) {
				var arr=tid.split("-"); var feld=arr[1];
				argum+=feld+":"+$(this).innerWidth()+",";
			}
		});
		if (argum.length > 0) argum=argum.substr(0, argum.length-1);
		var result = $.ajax({type: "POST", url: obj.MyPath+"MyNewGridPhpFunc.php?func=saveColWidth", data: {"dbase": obj.DbName, "user": obj.UName, "pawo": obj.PaWo, "table": "col_widths", "col_string_id": obj.DbGridForSize, "col_widths": argum}, async: false}).responseText;
	}
	start_up=false;
}
function fitInRow(event, ui, alle, obj) {
	obj.Stop=true;
	if (alle) {
		for(x in obj.Spalten) {
			var fn=obj.Spalten[x].feldname;
			if (obj.Spalten[x].coltyp != "eml" && obj.Spalten[x].coltyp != "free" && obj.Spalten[x].coltyp != "image") {
				var aid=obj.DivID+"-"+fn;
				$("td[name='"+aid+"']").each(function(idx) {
					var afnam=aid.split("-");
					fname=afnam[1];
					var typ=obj.Spalten[fname].coltyp;
					if (typ=="var" || typ=="int" || typ=="med" || typ=="tin" || typ=="big") {
						var w=$(this).data('keyWert');
						var cw=$("#"+aid).innerWidth();
						var wret=getMaxChar(obj,cw,w);
						$(this).text(wret);
					}
				});
			}
		}
	} else {
		var aid=ui.element[0].id;
		$("td[name='"+aid+"']").each(function(idx) {
			var afnam=aid.split("-");
			fname=afnam[1];
			var typ=obj.Spalten[fname].coltyp;
			if (typ=="var" || typ=="int" || typ=="med" || typ=="tin" || typ=="big") {
				var w=$(this).data('keyWert');
				var cw=$("#"+aid).innerWidth();
				var wret=getMaxChar(obj,cw,w);
				$(this).text(wret);
			}
		});
		event.stopPropagation();
	}
	if (start_up==false) saveColWidths(obj);
}
function Init() { // javascript/MyNewGridLang-de.js
	$("#"+this.DivID).html("<div id='"+this.DivID+"js_load' style='background-color: white; border: 2px solid black; position:absolute; left:356px; top:238px; width:138px; height:81px; z-index:100; text-align: center;'><img src='"+this.ImagesPath+"images/ajax-loader.gif' width='48' height='48' vspace='16px'></div><table id='tbl_"+this.DivID+"' width="+this.TbWidth+" border='0' align='center' cellpadding='"+this.TbPadding+"px' cellspacing='"+this.TbSpacing+"px'><tr id='"+this.DivID+"_titel'></tr><tr id='"+this.DivID+"_fiBox' class='hasBorder "+this.DivID+"isFilter gridtxtrow filterrow' style='height:19px'><td>"+this.DivID+"_fiBox</td></tr><tr id='"+this.DivID+"_fiSel' class='hasBorder "+this.DivID+"isFilter gridselrow filterrow' style='height:19px'><td>"+this.DivID+"_fiSel</td></tr><tr id='"+this.DivID+"_header' class='header' style='border: thin solid#cbcbcb'><td>"+this.DivID+"_header</td></tr><tr id='"+this.DivID+"zrow' class='hasBorder tEven "+this.DivID+"zrow' onmouseover='setBold(this,"+this.HighLight+")' onmouseout='setNorm(this,"+this.HighLight+")' style='padding:2px'><td class='tCell' style='padding:2px'>"+this.DivID+"_rows</td></tr><tr id='"+this.DivID+"_sum' class='hasBorder sumrow'><td>"+this.DivID+"_sum</td></tr><tr id='"+this.DivID+"_navi' class='hasBorder navirow' style='padding:2px'><td>"+this.DivID+"_navi</td></tr></table><div id='"+this.DivID+"_msgFi' class='fiMsg' align='center'>Eine Filtermöglichkeit erscheint erst, wenn mehr als 1 Datensatz gefunden wurde!</div>");
	$("#tbl_"+this.DivID).hide(); $("#"+this.DivID+"js_load").hide();
	$("#"+this.DivID+"_msgFi").hide();
	if (this.ShowTitle==false) $("#"+this.DivID+"_title").remove();
	if (this.showFilter==false) $("."+this.DivID+"isFilter").remove();
	if (this.showSumRow==false) $("#"+this.DivID+"_sum").remove();
	if (this.showNaviRow==false) $("#"+this.DivID+"_navi").remove();
	if (this.ShowManRefresh==false) $("#"+this.DivID+"-ReLoad").remove();
	$("#"+this.DivID+"js_load").centerScreen();
	if (this.ColAlign == undefined) {
		this.ColAlign=this.HeadAlign;
	}
	getDbCols(this);
	for (var x in this.NumFormat) {
		var nf=this.NumFormat[x].split("#");
		this.Spalten[nf[0]].colfmt=nf[1];
	}
	doHeaderCaps(this);
//	DrawNaviRow(this);
//	$("#tbl_"+this.DivID).show();
	DrawHeader(this);
	// Titel
	$("#"+this.DivID+"_titel").html("<td id='"+this.DivID+"_title' class='title-box'  colspan='"+this.AnzCols+"'>"+this.TitleText+" <img class='imgReload' src='"+this.ImagesPath+"images/reload.png' id='"+this.DivID+"-ReLoad' onClick='ReloadLines(0,"+this.ObjName+")' width='16' height='16' style='cursor:pointer; align:absmiddle' title='Reload Tabelle'><label id='lbSaved' class='lbSave' style='color: red'>Daten gespeichert!</label></td>");
	// Filter
	if (this.showFilter) DrawFilter(this);
	// Inhalt
//	$("#tbl_"+this.DivID).show(); //$("#"+this.DivID+"_msgFi").show();
	DrawRows(this);
	for(i in this.Spalten) {
		$("#"+this.DivID+"-"+i).css("width",this.Spalten[i].colwidth);
	}
	
//	$("#tbl_"+this.DivID).show();
	if (this.DateFormat != "SQL") {
		if (this.DateFormat=="GE") { var df="de"; } else { var df="en"; }
		$.datepicker.setDefaults({
			regional: df,
			changeMonth: true,
			changeYear: true
		});
		$(".filterdat").datepicker({
			autoclose: true
		});
	}
	if (this.ShowDetailPage) {var aw=71;} else {var aw=53;}
	if (this.ColResize) {
		var mobj=this;
		$("#tbl_"+this.DivID+" th").resizable({
			handles: "e",
			border: "1px",
			marginLeft: "0px",
			marginRight: "0px",
			minWidth: "66px",
			resize: function (event, ui) {
				$(".header").css("border","thin solid #CBCBCB"); 
		  	},
			stop: function (event, ui) {
				fitInRow(event, ui, false, mobj);
			}
	    });
	}
  	$("#"+this.DivID+"js_load").hide(); 
	$("#tbl_"+this.DivID).show(); //$("#"+this.DivID+"_msgFi").show();
	if (this.ShowDetailPage) {var aw=63;} else {var aw=53;}
	$("#"+this.DivID+"_Aktion").css("width",aw+"px");
	fitInRow(null,null,true,this);
	start_up=false; gStop=false;
	$(".lbSave").hide();
}
