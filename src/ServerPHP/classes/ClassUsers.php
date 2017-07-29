
<?php 
include "ClassDatabase.php";
class myUser {
	public $user_id;
    public $user_name;	
	public $pass;
	public $email;
	function __construct( ){
		$this->user_id = intval($this->user_id);
	}
}

class USER{
	private $user_id;
    private $user_name;	
	private $pass;
	private $email;
	
	private static $database;
	
	function __construct( $user_name, $pass, $email, $user_id = null){
		$this->user_id = $user_id;
        $this->user_name = $user_name;
	    $this->pass = $pass;
	    $this->email = $email;
	}
	public static function Init_Database(){
		if(! isset(self::$database)){
			self::$database = new Database();
		}
	}
	public function Save(){
		return isset($this->user_id)? $this->Update() : $this->Create();
	}
	public function Update(){
		return $this->Update_Password();
	}
	
	public function Update_Password(){
		$query = "UPDATE site_users SET Pass = '$this->pass' WHERE user_name = '$this->user_name' OR email = '$this->email'";
		self::Init_Database();
		try{
			self::$database->Connection->exec($query);
			return array('Status'=>'Success','Error'=>'');
		}catch(PDOException $e){			
			return array('Status'=>'Failed','Error'=>$e->getMessage());
		}
	}
	
	public function CreateAndReturnUser(){		
		if(self::User_Exists( $this->user_name, $this->pass)){
			return array('Error'=>'User Exists');
		}
		if(self::Email_Exists( $this->email)){
			return array('Error'=>'Email Exists');
		}
		if(self::Username_Exists( $this->user_name)){
			return array('Error'=>'Username Exists');
		}
		if(self::Username_Email_Exists( $this->user_name, $this->email)){
			return array('Error'=>'Username and Email Exists');
		}
		$query = "INSERT INTO site_users(user_id, user_name, email, pass) ";
		$query .= " VALUES(?,?,?,?)";
		self::Init_Database();		
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->bindParam(1, $this->user_id);
            $sql->bindParam(2, $this->user_name);
			$sql->bindParam(3, $this->email);
			$sql->bindParam(4, $this->pass);			
			$sql->execute();
			$last_id = self::$database->Connection->LastInsertId();
			$query2 = " SELECT * FROM site_users WHERE user_id = $last_id ";
			$sql2 = self::$database->Connection->prepare($query2);
			$sql2->execute();
			$result = $sql2->fetchAll(PDO::FETCH_CLASS,"myUser");
			return $result;
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage()); 
		}
		
	}

	public  function checkUser(){
		$query = "SELECT * FROM site_users WHERE (user_name = '$this->user_name' OR email = '$this->email') AND pass = '$this->pass'";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetchAll(PDO::FETCH_CLASS,"myUser");
			
			return $result;
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}
	}
	
	public static function User_Exists($user_name, $pass){
		$query = "SELECT user_id FROM site_users WHERE user_name = '$user_name' AND pass = '$pass'";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetch(PDO::FETCH_OBJ);
			
			return !empty($result->user_id);
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}
	}
	public static function Email_Exists($email){
		$query = "SELECT user_id FROM site_users WHERE email = '$email' ";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetch(PDO::FETCH_OBJ);
			
			return !empty($result->user_id);
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}
	}
	public static function Username_Exists($user_name){
		$query = "SELECT user_id FROM site_users WHERE user_name = '$user_name' ";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetch(PDO::FETCH_OBJ);
			
			return !empty($result->user_id);
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}
	}
	public static function Username_Email_Exists($user_name,$email){
		$query = "SELECT user_id FROM site_users WHERE user_name = '$user_name' AND email = '$email'";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetch(PDO::FETCH_OBJ);
			
			return !empty($result->user_id);
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}
	}
	public static function get_UserID($user_name, $email){
		$query = "SELECT user_id FROM site_users WHERE user_name = '$user_name' AND email = '$email'";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetch(PDO::FETCH_OBJ);
			if($result != null){
				return $result->user_id;
			}else
				return null;
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}
	}	
}
?>