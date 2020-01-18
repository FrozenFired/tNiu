$(function() {
	let order =  JSON.parse($("#order").val());
	let shipsVal = function() {
		let ships = 0;
		$('.ship').each(function(index,elem){
			let sp = parseInt($(elem).val())
			if(!isNaN(sp)) {
				ships += sp;
			}
		});
		$("#ship").text(ships+ ' ( ' + (ships*order.price).toFixed(2) + '€ )');
	}
	shipsVal();
	$(".ship").change(function(e) {
		let orderId  = ($(this).attr('id')).split('-')[0]
		let colorId = ($(this).attr('id')).split('-')[1]
		let extent = parseInt($("#et-"+colorId).val());
		let ship = $(this).val();
		
		shipsVal()

		$.ajax({
			type: 'GET',
			url: '/bsOrderClUpAjax?orderId=' + orderId + '&colorId=' + colorId + '&ship='+ship
		})
		.done(function(results) {
			if(results.success === 0) {
				alert(results.info)
			} else {
			}
		})
	})
})