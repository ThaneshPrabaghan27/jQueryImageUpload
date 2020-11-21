<!DOCTYPE html>
<html>
<head>
<title>Upload Images</title>

  <meta charset="UTF-8">
  <meta name="description" content="Image upload">
  <meta name="keywords" content="image, upload, free">
  
  <script src="script/jquery-3.5.1.js"></script> 
  <script src="script/pagination.js"></script>
  <script src="script/script.js"></script>
  <link rel="stylesheet" href="style/pagination.css"> 
  <link rel="stylesheet" href="style/style.css"> 
     
</head>
<body>

<div class="container">

	<br /><br />
	<div id="card">
		<div id="percentage"></div>
		<progress id="progress" value="0" max="100"></progress><br>
		<div id="status"></div>
	</div>
	<br /><br />
	
	<div id="error"></div>
	
	<br /><br />
	<div id="drag">
	<div id="drag-content">
	Drag & Drop<br /> your images<br /><br />
	<input type="file" id="image" multiple accept="image/*" />
	<input type="button" id="custom-upload-button" value="Upload Images" />
	</div>
	</div>
	
	<div id="album">
	<div id="data-container">
	</div>
	<div id="pagination"></div>
	</div>
	
	</div>
	
</body>
</html>

	<?php
	
	$image_array = array();
	
	foreach(glob('upload/*.*') as $image){
		array_push($image_array,'<img id="imageframe" src="'.$image.'" />');
	}
	
	?> 

<script>

$('#pagination').pagination({
		dataSource: <?php echo json_encode($image_array); ?>,
		locator:'data',
		totalNumber: <?php echo count($image_array); ?>,
		pageNumber: 1,
		pageSize: 4,
		pageRange: 2,
		showPrevious:true,
		showNext:true,
		showPageNumbers:true,
		prevText:'&laquo;',
		nextText:'&raquo;',
		ellipsisText:'...',
		activeClassName:'active',
		position: 'bottom',

    callback: function(data, pagination) {
		$('#data-container').html(data);
    }
})

</script>