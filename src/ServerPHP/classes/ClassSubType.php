<?php
include "ClassDatabase.php";
class mySubType{
	public  $sub_id;
    public $sub_type_name;
	function __construct(){
		$this->sub_id=intval($this->sub_id);
	} 
}
class myImage {
	public $image_id;
    public $image_name;
	function __construct(){
		$this->image_id=intval($this->image_id);
	} 
}

class myRecipe{
	public  $recipe_id;
   public  $description;
   public $preperation_time;
   public $cooking_time;
   public $serving;
   public $rating;
   public $recepie_date;
   function __construct(){
		$this->recipe_id=intval($this->recipe_id);
		$this->serving = intval($this->serving);
		$this->rating = intval($this->rating);
	} 
}
 class  myIngridient{
   public  $ingridient_id;
   public  $ingridient_name;
   function __construct(){
		$this->ingridient_id=intval($this->ingridient_id);
	}
}

 function myFunRecipeIngrident($recipe_id,$description,$ingridient_id,$ingridient_name,$unit,$quantity){
	$result=array(
		"recipe"=>array("recipe_id"=>$recipe_id, "description"=>$description),
		"ingridient"=>array("ingridient_id"=>$ingridient_id, "ingridient_name"=>$ingridient_name),
		"unit"=> $unit,
		"quantity"=> $quantity
	);	
return $result;
}
class myRecipeIngrident {
	
	public $recipe_id;
    public $ingridient_id;
	public $unit;   
    public $quantity;	
    function __construct(){
		$this->quantity=doubleval($this->quantity);		
		$this->recipe_id=intval($this->recipe_id);		
		$this->ingridient_id=intval($this->ingridient_id);
	}
}

class myCategory{
	
	public $category_id;
	public  $sub_id;
    public $basic_food_category;
	public $image_id;
	function __construct(){
		$this->category_id=intval($this->category_id);
		$this->sub_id=intval($this->sub_id);
		$this->image_id=intval($this->image_id);
	} 
}

class myFoodCategory{
	
	public $food_category_id;
    public $category_id;
    public $food_id;
	function __construct(){
		$this->food_category_id=intval($this->food_category_id);
		$this->category_id=intval($this->category_id);
		$this->food_id=intval($this->food_id);
	} 
}
class myFood{
	public $food_id;
    public $food_name;
    public $food_img_id;
    public $sub_food_type;    
    public $recipe_id;
	function __construct(){
		$this->food_id= intval($this->food_id);
		$this->food_img_id= intval($this->food_img_id);
		$this->sub_food_type= intval($this->sub_food_type);		
		$this->recipe_id= intval($this->recipe_id);
	}
}
class myUserRecipe{
	public $user_recipe_id;
	public $user_id;
	public $recipe_id ;
	public $rating;
	public $rate_date;
	function __construct(){
		$this->user_recipe_id= intval($this->user_recipe_id);
		$this->user_id= intval($this->user_id);
		$this->recipe_id= intval($this->recipe_id);		
		$this->rating= intval($this->rating);
	}
}
class SubType{
    //proprties
    private  $sub_id;
    private $sub_type_name;
    private static $database;
    function __construct( ){
		self::Init_Database();
	}
	public static function Init_Database(){
		if(! isset(self::$database)){
			self::$database = new Database();
		}
	}

    public  function getAllStuff($tableName,$className){       
		$query = "SELECT * FROM $tableName ";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetchAll(PDO::FETCH_CLASS,$className);
			if($result != null){				
				return $result;
			}else
				return null;
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}		
    }

public  function getAllFav($tableName,$className,$user_id){       
		$query = "SELECT * FROM $tableName where user_id = $user_id ";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetchAll(PDO::FETCH_CLASS,$className);
			if($result != null){				
				return $result;
			}else
				return null;
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}		
    }

	
public  function deleteSomeFav($tableName,$className,$user_id,$recipe_ids){       
		$query = "DELETE FROM $tableName where user_id = $user_id AND recipe_id IN ( $recipe_ids )";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			
			return array('Status'=>'Success','Error'=>'');
			
		}catch(PDOException $e){
			self::$database->Connection->rollback();
			return array('Status'=>'Failed','Error'=>$e->getMessage());
		}		
    }

	
public  function updateSomeFav($tableName,$className,$user_id,$recipe_id,$rating){       
		$query = "UPDATE $tableName SET rating = $rating where user_id = $user_id AND recipe_id =$recipe_id";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			
			return array('Status'=>'Success','Error'=>'');
			
		}catch(PDOException $e){
			$connection->rollback(); 
			return array('Status'=>'Failed','Error'=>$e->getMessage());
		}		
    }

public  function getAllRecipes(){       
		$query = "SELECT r.recipe_id ,Floor(avg(rating)) rating, description, preperation_time, cooking_time, serving, recepie_date ";
		$query .=" FROM recipes r LEFT JOIN users_recipes ur ON r.recipe_id = ur.recipe_id GROUP By r.recipe_id ";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetchAll(PDO::FETCH_CLASS,"myRecipe");
			if($result != null){				
				return $result;
			}else
				return null;
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}		
    }

public function createNewFavorateAndReturn($user_id,$recipe_id ,$rating,$rate_date){
	$query = "INSERT INTO users_recipes(user_id,recipe_id ,rating,rate_date) ";
		$query .= " VALUES(?,?,?,?)";
		self::Init_Database();		
		try{
			$sql = self::$database->Connection->prepare($query);			
            $sql->bindParam(1, $user_id);
			$sql->bindParam(2, $recipe_id);
			$sql->bindParam(3, $rating);
			$sql->bindParam(4, $rate_date);			
			$sql->execute();
			$last_id = self::$database->Connection->LastInsertId();
			$query2 = " SELECT * FROM users_recipes WHERE user_recipe_id = $last_id ";
			$sql2 = self::$database->Connection->prepare($query2);
			$sql2->execute();
			$result = $sql2->fetchAll(PDO::FETCH_CLASS,"myUserRecipe");
			return $result;
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage()); 
		}
		
}

public  function getAllIngRecp($recipeid){       
		$query = "SELECT recipe_id, ingridient_id, unit, quantity FROM recipes_ingridients ";// , r.description, i.ingridient_id,i.ingridient_name, ri.unit, ri.quantity
		$query .=" where recipe_id= $recipeid";		
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			//var_dump(PDO::FETCH_CLASS,'myRecipeIngrident');
			//$sql->setFetchMode(PDO::FETCH_FUNC, "myFunRecipeIngrident");//,'myIngridient','myRecipeIngrident'
			$result = $sql->fetchAll(PDO::FETCH_CLASS, "myRecipeIngrident");//FETCH_OBJ//FETCH_CLASS|PDO::FETCH_PROPS_LATE,'myRecipeIngrident'
			if($result != null){				
				return $result;
			}else
				return null;
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}	
   }

public function getFoodCategory($foodid){
	$query = "SELECT c.category_id, sub_id, basic_food_category, image_id FROM category c, food_category fc ";
	$query .= " WHERE c.category_id=fc.category_id AND fc.food_id= '$foodid'";
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetchAll(PDO::FETCH_CLASS,"myCategory");
			if($result != null){				
				return $result;
			}else
				return array('Error'=>'Nothing was found....');			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}	
}

public  function getAllFood($subId,$categoryId) {
	$query = "SELECT foods.food_id, food_name, food_img_id, sub_food_type ,recipe_id FROM foods, food_category ";// , r.description, i.ingridient_id,i.ingridient_name, ri.unit, ri.quantity
		$query .=" where foods.food_id=food_category.food_id";
		$query .=" and sub_food_type= $subId and category_id= $categoryId";		
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			//var_dump(PDO::FETCH_CLASS,'myRecipeIngrident');
			//$sql->setFetchMode(PDO::FETCH_FUNC, "myFunRecipeIngrident");//,'myIngridient','myRecipeIngrident'
			$result = $sql->fetchAll(PDO::FETCH_CLASS, "myFood");//FETCH_OBJ//FETCH_CLASS|PDO::FETCH_PROPS_LATE,'myRecipeIngrident'
			if($result != null){				
				return $result;
			}else
				return null;
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}	

}



public  function getFoodsByName($foodName) {
	$query = "SELECT foods.food_id, food_name, food_img_id, sub_food_type ,recipe_id FROM foods where food_name Like '%$foodName%'";
				
		self::Init_Database();
		try{
			$sql = self::$database->Connection->prepare($query);
			$sql->execute();
			$result = $sql->fetchAll(PDO::FETCH_CLASS, "myFood");
			if($result != null){				
				return $result;
			}else
				return null;
			
		}catch(PDOException $e){
			return array('Error'=>$e->getMessage());
		}	

}
}

?>