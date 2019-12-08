$( function() {
	let tmplets;
	// 输入模板号码，模糊匹配出模板
	$("#form").on('input', '#ajaxTmplet', function(e) {
		let str = $(this).val().replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();;
		if(str.length > 0) {
			$.ajax({
				type: 'get',
				url: '/bsTmpletAjaxTmplets?str='+str
			})
			.done(function(results) {
				if(results.success === 1) {
					tmplets = results.tmplets;
					$('.tmpletsCard').remove(); // 清除上次的ajaxProds
					$('.tmpletCard').remove();	// 清除上次的ajaxProds
					$('.tmpletImg').remove();	// 清除上次的ajaxProds
					let iTmp = 0;
					for(; iTmp < tmplets.length; iTmp++) {
						showTmplets(tmplets[iTmp], iTmp)
					}
				}
			})
		}
	})
	// 前端显示获取的 所有被模糊匹配的tmplets
	let showTmplets = function(tmplet, iTmp) {
		let str = "";
		str += '<div class="p-2 my-3 border bg-light tmpletsCard" ';
		str += 'id="tmpletsCard-'+iTmp+'">'
			str += '<div class="row">'
				str += '<div class="col-4">'
				str += '<div class="row text-right">'
					str += '<img class="card-img ml-1" src='+tmplet.photo;
					str += ' width="95%" style="max-width: 90px; max-height: 120px"/>';
				str += '</div>';
				str += '</div>';
				str += '<div class="col-8">'
					str += '<div class="row">'

						str += '<h3 class="col-lg-12 text-left">'+tmplet.code+'</h3>';

						str += '<div class="col-lg-12 text-left">'+tmplet.codeNum+'</div>';

						str += '<div class="col-lg-12 text-left">'+tmplet.nome+'</div>';

					str += '</div>';
				str += '</div>';
			str += '</div>';
		str += '</div>';
		
		$("#tmplets").append(str);
	}

	$("#tmplets").on('click', '.tmpletsCard', function(e) {
		let iTmp = ($(this).attr('id')).split('-')[1];
		let tmplet = tmplets[iTmp];
		$("#tmpletId").val(tmplet._id)
		$('.tmpletsCard').remove(); // 清除上次的ajaxProds
		showTmplet(tmplet)
	})
	// 前端展示此 tmplet 的基本信息
	let showTmplet = function(tmplet) {
		let str = "";
		str += '<div class="my-3 p-2 border bg-light tmpletCard">';
			str += '<div class="row text-center">'
				str += '<div class="col-4">';
				str += '<h3 text-info>'+tmplet.code+'</h3>';
				str += '</div>';
				str += '<div class="col-4">';
				str += '<h3 text-info>'+tmplet.codeNum+'</h3>';
				str += '</div>';
				str += '<div class="col-4">';
				str += '<h3 text-info>'+tmplet.nome+'</h3>';
				str += '</div>';
			str += '</div>';

			str += '<hr/>';
			for(let iCl in tmplet.colors) {
				let color = tmplet.colors[iCl];
				str += '<div class="form-group row">'
					str += '<label class="col-4 col-form-label text-center">';
						str += tmplet.code+color.code;
					str += '</label>';
					str += '<input type="hidden" name="obj[colors]['+iCl;
					str += '][code]" value='+tmplet.code+'V'+color.code+'>';

					str += '<label class="col-4 col-form-label text-center">';
						str += color.color;
					str += '</label>';
					str += '<input type="hidden" name="obj[colors]['+iCl;
					str += '][color]" value='+color.color+'>';

					str += '<div class="col-4">';
						str += '<input class="form-control extent" type="number"'
						str += 'name="obj[colors]['+iCl+'][extent]">';
					str += '</div>';
				str += '</div>';
			}
		str += '</div>';
		
		$("#tmpletCls").append(str);
		$("#tmpletImg").append('<img class="tmpletImg" src="'+tmplet.photo+'" width="100%" />')
	}
} );