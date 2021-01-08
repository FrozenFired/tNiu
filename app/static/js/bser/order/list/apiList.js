$(()=> {
	$(".datepicker").datepicker();
	getDateFunc = (date) => {
		let strDate = date.getDate();
		if (strDate >= 1 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		return strDate;
	}
	getMonthFunc = (date) => {
		let nowMonth = date.getMonth() + 1;
		if (nowMonth >= 1 && nowMonth <= 9) {
			nowMonth = "0" + nowMonth;
		}
		return nowMonth;
	}
	getTodayFormatFunc = (date) => {
		let nowMonth = date.getMonth() + 1;
		if (nowMonth >= 1 && nowMonth <= 9) {
			nowMonth = "0" + nowMonth;
		}
		let strDate = date.getDate();
		if (strDate >= 1 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		let seperator = "/";
		let nowDate = nowMonth + seperator + strDate + seperator + date.getFullYear();
		return nowDate;
	}
	let date = new Date();
	// let nowDate = datepickerFormat(date)
	// console.log(nowDate)
	$("#edFm").val(getMonthFunc(date)+'/01/'+date.getFullYear())
	// $("#atTo").val(nowDate)
	appendOrders = (orders) => {
		// console.log(orders)
		$(".ordersElement").remove();
		let extents = 0;
		let imp = 0;
		let str = "";
		for(i in orders) {
			let order = orders[i];
			str += '<div class="ordersElement card order bg-light text-dark mt-3 p-3">'
				str += '<div class="row">'
					str += '<div class="col-12 col-md-3">'
						str += '<a class="btn btn-default text-dark" href="/bsOrder/'+order._id+'">'
							let codeTextColor = "text-dark";
							if(order.status == 1) codeTextColor = "text-success";
							str += '<h3 class="'+codeTextColor+'">'+order.code+'</h3>'
						str += '</a>'
					str += '</div>'
					str += '<div class="col-12 col-md-3">'
						if(order.tmplet) {
							let tmplet = order.tmplet;
							str += '<h3>'+tmplet.code + ' '+ tmplet.nome + '</h3>'
						}
					str += '</div>'
					str += '<div class="col-12 col-md-3">'
						str += '<h3>'+order.drap+'</h3>'
					str += '</div>'
					str += '<div class="col-12 col-md-3">'
						if(order.cter) {
							let cter = order.cter;
							str += '<h3 class="toCter" id="'+cter._id+'-'+cter.nome+'">'+cter.nome+'</h3>'
						}
					str += '</div>'
				str += '</div>'
				str += '<div class="row">'
					let extentTot = 0;
					for(j in order.colors) {
						let color = order.colors[j];
						if(!isNaN(parseInt(color.extent)) && !isNaN(parseFloat(order.price))) {
							extents += parseInt(color.extent);
							extentTot += parseInt(color.extent);
						}
						str += '<div class="col-6 col-md-4">'
							if(order.status == 0){
								str += '<span class="text-info">['+color.code+' '+color.color+' '+color.extent+'米]</span>';
							}
							else
								str += '<span class="text-warning">['+color.code+' '+color.color+' '+color.ship+'米]</span>';
						str += '</div>'
					}
					str += '<div class="col-6 col-md-4">'
						str += '<h4 class="text-warning">总米数： '+extentTot+'</h4>'
					str += '</div>'
					str += '<div class="col-6 col-md-4">'
						str += '<h4 class="text-warning">总价格： '+ (extentTot * order.price).toFixed(2) + '</h4>'
					str += '</div>'
				str += '</div>'
			str += '</div>'

			imp += extentTot * order.price;
		}
		$("#ordersElement").append(str);
		$("#extents").text(extents)
		$("#imp").text(imp.toFixed(2))
	}
	getOrders = () => {
		let form = $("#orderFilterForm");
		let data = form.serialize();
		$.ajax({
			type: "GET",
			url: '/api/bsOrders?'+data,
			// data: date,
			success: function(result) {
				// console.log(result)
				if(result.status == 200) {
					orders = result.data.orders;
					appendOrders(orders);
					// for(i in orders) {
					// 	console.log(orders[i].code)
					// 	console.log(orders[i].status)
					// }
				} else {
				}
			}
		});
	}
	getOrders();

	$("#statusBtn").change(function() {
		getOrders();
	})
	$("#genreSel").change(function() {
		getOrders();
	})
	$("#ajaxKey").blur(function() {
		getOrders();
	})
	$("#atFm").change(function() {
		getOrders();
	})
	$("#atTo").change(function() {
		getOrders();
	})
	$("#edFm").change(function() {
		getOrders();
	})
	$("#edTo").change(function() {
		getOrders();
	})
	$("#ordersElement").on("click", ".toCter", function(e) {
		// let target = $(e.target);
		// let nome = target.data('nome');
		let str = $(this).attr("id").split("-");
		let id = str[0]
		let nome = str[1]
		console.log(id)
		console.log(nome)
		$("#cterCode").text(nome)
		$("#cterId").val(id)
		$("#cncCter").show();
		getOrders();
	})
	$("#cncCter").click(function() {
		$("#cterCode").text("全部客户")
		$("#cterId").val("")
		$("#cncCter").hide();
		getOrders();
	})
})