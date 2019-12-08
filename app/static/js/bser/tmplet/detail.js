$( function() {
	let orgColors =  JSON.parse($("#colors").val());

	/* ====================== 图片放缩 ====================== */
	$("#imgClick").on('click', '.imgSmall', function(e) {
		$("#imgClick").removeClass("col-4").addClass( "col-12" );
		$(this).removeClass("imgSmall").addClass( "imgBig" );
	})
	$("#imgClick").on('click', '.imgBig', function(e) {
		$("#imgClick").removeClass("col-12").addClass( "col-4" );
		$(this).removeClass("imgBig").addClass( "imgSmall" );
	})
	/* ====================== 图片放缩 ====================== */



	/* =================== 显示或隐藏添加颜色的表格 =================== */
	$("#addColor").click(function(e) {
		$("#formAdd").toggle();
	})
	/* =================== 显示或隐藏添加颜色的表格 =================== */


	/* =================== 提交添加颜色表格验证 =================== */
	$("#btnAdd").click(function(e) {
		let code = $("#codeIpt").val();
		let color = $("#colorIpt").val();

		let icl = 0;
		for(;icl<orgColors.length;icl++){
			if(orgColors[icl].color == color || orgColors[icl].code == code) break;
		}
		if(icl == orgColors.length) {
			let form = $("#formAdd");
			let data = form.serialize();
			let url = form.attr('action');
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				success: function(results) {
					window.location.reload();
					// if(results.success == 1) {
					// 	window.location.reload();
					// } else {
					// }
				}
			});
		} else {
			alert("已经存在此颜色或号码")
		}
	})
	/* =================== 提交添加颜色表格验证 =================== */





	/* =================== 显示或隐藏删除颜色的按钮 =================== */
	$("#delColor").click(function(e) {
		$(".btnDel").toggle();
	})
	/* =================== 显示或隐藏删除颜色的按钮 =================== */


	/* =================== 删除颜色 =================== */
	$(".btnDel").click(function(e) {
		let target = $(e.target)
		let id = target.data('id')
		let form = $("#formDel-"+id);
		let data = form.serialize();
		let url = form.attr('action');
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function(results) {
				window.location.reload();
				// if(results.success == 1) {
				// 	window.location.reload();
				// } else {
				// }
			}
		});
	})
	/* =================== 删除颜色 =================== */
} );