$( function() {
	let ajaxOrderUpdPd = "/bsOrderUpdPdAjax";
	let ajaxOrderDelPd = "/bsOrderDelPdAjax";


	$(".ordpd").blur(function(e) {
		let thdId = $(this).attr('id').split('-')[1];

		let quot = parseInt($(this).val());
		let orgQuot = parseInt($(".orgQuot-"+thdId).val());
		
		if(isNaN(quot)){
			alert("只接收数字")
			$(this).val(orgQuot)
		} else if(quot < 0) {
			alert("不可以输入负数")
			$(this).val(orgQuot)
		} else if(quot != orgQuot) {
			let form = $("#form-"+thdId);
			let obj = form.serialize();
			// console.log(obj)

			let ajaxOrderPd;
			// if(orgQuot == 0) {	// 增
			// 	ajaxOrderPd = ajaxOrderNewPd;
			// } else {
			if(quot != 0) {	// 改
				ajaxOrderPd = ajaxOrderUpdPd;
			} else {		// 删
				ajaxOrderPd = ajaxOrderDelPd;
			}
			// }
			$.ajax({
				type: "POST",
				url: ajaxOrderPd,
				data: obj,
				success: function(results) {
					if(results.success == 1) {
						window.location.reload()
					} else {
						$(this).val(orgQuot)
						$(".orgQuot-"+thdId).val(orgQuot)
					}
				}
			});
		}
	})
} );