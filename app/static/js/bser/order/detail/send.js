$( function() {
	$(".btnPdAjax").click(function(e) {
		let thdId = $(this).attr('id').split('-')[1];
		let form = $("#formPdAjax-"+thdId);
		let data = form.serialize();
		let url = form.attr('action');
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function(results) {
				if(results.success == 1) {
					window.location.reload();
				} else {
				}
			}
		});
	})
});