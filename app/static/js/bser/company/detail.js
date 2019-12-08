$( function() {
	let orgGenres =  JSON.parse($("#genres").val());



	/* =================== 显示或隐藏添加颜色的表格 =================== */
	$("#addGenre").click(function(e) {
		$("#formAdd").toggle();
	})
	/* =================== 显示或隐藏添加颜色的表格 =================== */


	/* =================== 提交添加颜色表格验证 =================== */
	$("#btnAdd").click(function(e) {
		let genre = $("#genreIpt").val();

		let icl = 0;
		for(;icl<orgGenres.length;icl++){
			if(orgGenres[icl].genre == genre) break;
		}
		if(icl == orgGenres.length) {
			let form = $("#formAdd");
			let data = form.serialize();
			let url = form.attr('action');
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				success: function(results) {
					window.location.reload();
				}
			});
		} else {
			alert("已经存在此颜色或号码")
		}
	})
	/* =================== 提交添加颜色表格验证 =================== */





	/* =================== 显示或隐藏删除颜色的按钮 =================== */
	$("#delGenre").click(function(e) {
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