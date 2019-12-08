$( function() {
	// 显示客户信息
	let clientElm = function(cters, clientAjax, isMatch) {
		let str = "";
		for(let i=0; i<cters.length; i++) {
			let cter = cters[i];
			let note = "";
			if(cter.note) note = cter.note;
			str += '<div class="col-6 '+isMatch+'">'
				str += '<div class="card clientCard p-2 bg-light" ';
				str += 'id="'+cter.nome+'-'+cter._id+'">';
					//- img.card-img-top(src="..." alt="Card image cap")
					str += '<h5 class="card-title text-info">'+ cter.nome +'</h5>';
					str += '<p class="card-text">' 
						str += '<span>'+note+'</span>';
					str += '</p>'
				str += '</div>'
			str += '</div>'
		}
		$(clientAjax).append(str);
	}
	// 输出所有客户
	let ajaxClient = function() {
		$.ajax({
			type: 'GET',
			url: '/ajaxBsCterAll'
		})
		.done(function(results) {
			if(results.success === 1 && results.cters) {
				clientElm(results.cters, '.allCtersAjax')
			}
		})
	}
	ajaxClient();

	// 输入匹配客户
	let matchClient = "";
	$('#formCters').on("input", "#ajaxCters", function(e) {
		matchClient = $(this).val();
		$(".isMatch").remove()
		matchCters();
	})
	let matchCters = function() {
		if(matchClient.length > 0) {
			let keyword = encodeURIComponent(matchClient);
			let keytype = 'nome';
			$.ajax({
				type: 'GET',
				url: '/ajaxBsCters?keytype='+keytype+'&keyword=' + keyword
			})
			.done(function(results) {
				if(results.success === 1 && results.cters) {
					clientElm(results.cters, '.catersAjax', 'isMatch')
				}
			})
		}
	}
	/* ====================== 点击选择此订单的客户 ======================= */
	$('.clientSel').on("click", ".clientCard", function(e) {
		let strs = ($(this).attr('id')).split('-');
		let clientName = strs[0];
		let clientId = strs[1];

		$("#clientPage").hide()
		$("#clientBtn").text(clientName)
		$("#cterId").val(clientId)
	})
	/* ====================== 点击选择此订单的客户 ======================= */

	/* ====================== 点击选择此订单的客户 ======================= */
	$("#clientBtn").click(function(e) {
		$("#clientPage").toggle()
	})
} );