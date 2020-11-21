
<?php
	
	if(isset($_FILES['image']['name']) 
		&& $_SERVER['REQUEST_METHOD'] === 'POST'){
	
		foreach($_FILES['image']['name'] as $key => $value){
	
			$file = $_FILES['image']['tmp_name'][$key];
			
			$allowed_extension = array("png", "jpg", "jpeg", "gif");
			$extension = strtolower(pathinfo($value,PATHINFO_EXTENSION));
			
			if(in_array($extension, $allowed_extension)){
				if($_FILES['image']['size'][$key] < 5242880){
				
				$filename = uniqid(). "-" .time();
				$basename = $filename."." .$extension;
				$destination = "upload/".$basename;
				
				if(move_uploaded_file($file,$destination)){
					echo $value." uploaded...! <br>";	 
				}else{
					echo $value." has some problem...! <br>";	 
				}
				
				}else{
					echo $value." filesize is bigger than 5mb...! <br>";	
				}
			}else{
				echo $value." has ".$extension." extension. "
				.$extension." is not allowed in image upload...! <br>";	
			}
		
		}	
	}
	
?>