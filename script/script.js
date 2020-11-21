$(document).ready(function(){
	
		$("#custom-upload-button").click(function(){
		$("#image").click();
		});
	
		$("#image").change(function(){
		
			var branch = $("#image").prop('files');
			var flag = validateUpload(branch);
			
			if(flag === "pass"){
				
				var formData = new FormData();
		
				for(var i=0;i < branch.length; i++){
					formData.append("image[]", branch[i]);
				}
		
				ajaxUpload(formData);
			}
			
		});
						
		$(document).on('dragover',function(event){
			event.preventDefault();
		});
		
		$(document).on('drop',function(event){
			event.preventDefault();
		});
		
		$('#drag').on('drop',function(event){
		
		event.preventDefault();
		
		var branch = event.originalEvent.dataTransfer.files;
		var flag = validateUpload(branch);
		
		if(flag === "pass"){
				
			var formData = new FormData();
		
			for(var i=0; i < branch.length; i++){
			formData.append('image[]',branch[i]);
			}
		
			ajaxUpload(formData);
			
		}
			
		});		
	});
	
	function validateUpload(branch){
	
		var error = [];
		var extensions = ["jpg", "png", "gif", "jpeg"];
		var flag = null;
		
		for(var i=0;i < branch.length; i++){
			
			var extension = branch[i].name.split('.').pop();
			
			if(branch[i].size < 5242880){
				if(extensions.includes(extension.toLowerCase())!== true){
				error.push(extension+" extension is not allowed in "+branch[i].name);
				}
			}else{
				error.push(branch[i].name+" is bigger than 5mb");
			}
		} 
		
			if(error.length !== 0){
			
				error.forEach(function(error) {
					$('#error').append("<div>"+error+"</div>");
				});
				
				flag = "error";
				
			}else{
				flag = "pass";
			}
			
			return flag;
	}
		
	function ajaxUpload(formData){
	
		$.ajax({
		
		 xhr: function() {
		 
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(event) {
				
					var percent  = (event.loaded / event.total)*100;
					
					$("#progress").css("display", "block");
					$("#percentage").html(Math.round(percent)+"%");
					$("#progress").val(Math.round(percent));
					$("#status").html(Math.round((event.loaded/(1024*1024)))+"mb of "+Math.round((event.total/(1024*1024)))+"mb uploaded");	
				
				}, false);
				
				xhr.addEventListener("load", function(event) {
					$("#progress").val(0);
					$("#progress").css("display", "none");
					$("#percentage").html("");
					$("#status").html(event.target.responseText);
					
					window.setTimeout(function(){
						window.location.reload();
					},1000);
					
				}, false);
				
				xhr.addEventListener("error", function(event) {
					$("#status").html("Upload error");
				}, false);
				
				xhr.addEventListener("abort", function(event) {
					$("#status").html("Upload canceled");
				}, false);

			return xhr;
		  },
	
		url:"process.php",
		type:"POST",
		data: formData,
		enctype: "multipart/form-data",
		cache: false,
		processData:false,
		contentType:false,
		success:function(data){
			//alert(data);
		},
		error:function(error){
			//alert(error);
		}
		});
	
	}