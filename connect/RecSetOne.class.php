<?php
class RecSetOne {
	protected $rsArr=array();
	protected $rsSql="none";
	protected $rsdbh=null;
	protected $stmt=null;
	protected $rsNumRows=0;
	protected $rowidx=0;
	protected $convDate=1;
	public $EOF=0;
	
	public function __construct($dbh, $sql, $convD) {
		$this->rsdbh=$dbh;
		$this->rsSql=stripslashes($sql);
		$this->convDate=$convD;
		$this->stmt = $this->rsdbh->query($this->rsSql);
		$this->rsNumRows=$this->stmt->rowCount();
		if ($this->rsNumRows > 0) {
			$this->rsArr = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
			$this->EOF = 0;
			return $this;
		} else {
			$this->EOF = 1;
			return 0;
		}
	}
	public function MoveFirst() {
		$this->rowidx=0; $this->EOF=0;
	}
	public function MoveNext() {
		$this->rowidx++; 
		if ($this->rowidx >= $this->rsNumRows) {
			$this->EOF=1;
		} else {
			$this->EOF=0;
		}
	}
	public function MovePrevious() {
		$this->rowidx--; 
		if ($this->rowidx < 0) {
			$this->EOF="1";
		} else {
			$this->EOF="0";
		}
	}
	public function MoveLast() {
		$this->rowidx=$this->rsNumRows-1; $this->EOF="0";
	}
	public function RecordCount() {
		return $this->rsNumRows;
	}
	public function Close() {
		$this->rsArr=array(); $this->rsNumRows=0; $this->rsSql="";
		$this->stmt=null;
	}
	public function Fields($fld="") {
//		return $fld.'#'.$this->rowidx;
		if ($this->EOF == 0) {
			try {
				if (strpos($fld,".") > 0) { $ap=explode(".",$fld); $fld=$ap[1]; }
				$data = $this->rsArr[$this->rowidx][$fld];
				if (strlen($data)==10 && $this->convDate==1) {
					if (strpos($data,"-") > 0) {
						if (substr($data,4,1)=="-" && substr($data,7,1)=="-") {
							$d=explode("-",$data);
							$data=$d[2].'.'.$d[1].'.'.$d[0];
						}
					}
				}
				return $data;
			} catch(Exception $e) {
				return $e->msg.'#'.$fld.'#'.$this->rowidx;
			}
		} else {
			return 0;
		}
	}
}
?>