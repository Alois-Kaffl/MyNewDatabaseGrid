<?php
class RecSet {
	protected $rsArr=array();
	protected $rsSql="none";
	protected $rsdbh=null;
	protected $stmt=null;
	protected $rsNumRows=0;
	protected $rowidx=0;
	protected $nRS=null;
	protected $convDate=0;
	public $EOF=0;
	
	public function __construct($dbh,$convD=0) {
		$this->rsdbh=$dbh;
		$this->convDate=$convD;
	}
	public function SelectLimit($sql,$max=0,$start=0) {
		if ($max > 0) {
			$sql.=" LIMIT ".$start.",".$max;
		}
		$nRS=new RecSetOne($this->rsdbh, $sql, $this->convDate);
		if (is_object($nRS)) $this->EOF = 0;
		return $nRS;
	}
	public function Insert($sql) {
	    $this->rsSql=$sql;
		$this->stmt = $this->rsdbh->prepare($this->rsSql);
		$this->stmt->execute();
		return $this->rsdbh->lastInsertId();
	}
	public function Execute($sql) {
	    $this->rsSql=$sql;
		$this->stmt = $this->rsdbh->prepare($this->rsSql);
		$this->stmt->execute();
		return $this->stmt->rowCount()+1;
	}
	public function Delete($sql) {
	    $this->rsSql=$sql;
		$this->stmt = $this->rsdbh->prepare($this->rsSql);
		$ret=$this->stmt->execute();
		return $ret;
	}
	public function ErrorMsg() {
		return "FakeRecSet2->Fehler aufgetreten!";
	}
}
?>