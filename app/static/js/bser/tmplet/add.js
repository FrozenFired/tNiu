$( function() {
	/* =================== 前端图片处理 =================== */
	$("#crtImg").click(function(e) {
		$("#uploadPhoto").click();
	})
	$("#uploadPhoto").change(function(e) {
		var f = document.getElementById('uploadPhoto').files[0];
		var src = window.URL.createObjectURL(f);
		document.getElementById('crtImg').src = src;
		$("#crtImg").removeClass("rounded-circle")
	})
	/* =================== 前端图片处理 =================== */

	$("#form").submit(function(e) {
		let codeIpt = $("#codeIpt").val()
		let codeNumIpt = $("#codeNumIpt").val()
		let nomeIpt = $("#nomeIpt").val()
		if(codeIpt.length<1) {
			$("#codeLab").addClass('text-danger')
			e.preventDefault();
		} else if(String(codeNumIpt).length<1) {
			$("#codeNumLab").addClass('text-danger')
			e.preventDefault();
		} else if(nomeIpt.length<1) {
			$("#nomeLab").addClass('text-danger')
			e.preventDefault();
		}
	})

} );