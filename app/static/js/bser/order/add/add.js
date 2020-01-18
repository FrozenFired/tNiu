$( function() {	
	$(".datepicker").datepicker();

	$("#genreIpt").change(function(e) {
		let str = ($(this).val()).split('-');
		$("#genre").val(str[0]);
		$("#price").val(str[1]);
	})
	$("#form").submit(function(e) {
		let extent = 0;
		$('.extent').each(function(index,elem){
			let et = parseInt($(elem).val());
			if(!isNaN(et)) {
				extent += et;
			}
		})
		let cter = $("#cterId").val();
		let price = parseFloat($("#price").val());
		if(cter.length < 20) {
			alert("请选择客户")
			e.preventDefault();
		} else if(extent < 1) {
			alert("请选择模型")
			e.preventDefault();
		} else if(isNaN(price)) {
			alert("请选择类型")
			e.preventDefault();
		}
	})
} );