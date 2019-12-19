$( function() {
	$(".datepicker").datepicker();

	/* ------------------------------- 获取 url 中的参数 -------------------------------- */
	function getUrlParam(name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		let r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	/* ------------------------------- 获取 url 中的参数 -------------------------------- */


	/* --------- 根据URL参数 填充前端显示数值 ---------- */
	$("#atFm").val(getUrlParam('atFm'))
	$("#atTo").val(getUrlParam('atTo'))
	/* --------- 根据URL参数 填充前端显示数值 ---------- */

	/* ------------------------- 时间选择 -------------------------- */
	$("#atFm").change(function(e) {
		/* 优化：如果跟上次比较时间不变，可以不发生事件 */
		// 开始时间值
		let valAtFm = encodeURIComponent($(this).val())
		// 状态值
		let valStatus = getUrlParam('status')
		let status = '';
		if(valStatus) {
			status = 'status='+valStatus
		}
		// cter
		let valCter = getUrlParam('cter')
		let cter = '';
		if(valCter) {
			cter = 'cter='+valCter
		}
		// 结束时间值
		let valAtTo = valAtFm;
		window.location.href="/bsOrders?"+status+'&'+cter+'&atFm='+valAtFm+'&atTo='+valAtTo;
	})
	$(".cncAt").click(function(e) {
		/* 优化：如果跟上次比较时间不变，可以不发生事件 */
		// 状态值
		let valStatus = getUrlParam('status')
		let status = '';
		if(valStatus) {
			status = 'status='+valStatus
		}
		// cter
		let valCter = getUrlParam('cter')
		let cter = '';
		if(valCter) {
			cter = 'cter='+valCter
		}
		window.location.href="/bsOrders?"+status+'&'+cter;
	})
	$("#atTo").change(function(e) {
		/* 优化：如果跟上次比较时间不变，可以不发生事件 */
		let atTo = encodeURIComponent($(this).val())
		// 状态值
		let valStatus = getUrlParam('status')
		let status = '';
		if(valStatus) {
			status = 'status='+valStatus
		}
		// 开始时间值
		let valAtFm = getUrlParam('atFm')
		let atFm = '';
		if(valAtFm) {
			atFm = 'atFm='+valAtFm
		}
		// cter
		let valCter = getUrlParam('cter')
		let cter = '';
		if(valCter) {
			cter = 'cter='+valCter
		}
		// console.log(atFm)
		window.location.href="/bsOrders?"+status+'&'+cter+'&'+atFm+'&atTo='+atTo;
	})
	/* ------------------------- 时间选择 -------------------------- */














	/* ------------------------- Cter 选择 -------------------------- */
	$(".toCter").click(function(e) {
		let valCter = $(this).attr('id');
		// 状态值
		let valStatus = getUrlParam('status')
		let status = '';
		if(valStatus) {
			status = 'status='+valStatus
		}
		// 开始时间值
		let valAtFm = getUrlParam('atFm')
		let atFm = '';
		if(valAtFm) {
			atFm = 'atFm='+valAtFm
		}
		// 结束时间值
		let valAtTo = getUrlParam('atTo')
		let atTo = '';
		if(valAtTo) {
			atTo = 'atTo='+valAtTo
		}
		window.location.href="/bsOrders?"+status+'&cter='+valCter+'&'+atFm+'&'+atTo;
	})
	$(".cncCter").click(function(e) {
		// 状态值
		let valStatus = getUrlParam('status')
		let status = '';
		if(valStatus) {
			status = 'status='+valStatus
		}
		// 开始时间值
		let valAtFm = getUrlParam('atFm')
		let atFm = '';
		if(valAtFm) {
			atFm = 'atFm='+valAtFm
		}
		// 结束时间值
		let valAtTo = getUrlParam('atTo')
		let atTo = '';
		if(valAtTo) {
			atTo = 'atTo='+valAtTo
		}
		window.location.href="/bsOrders?"+status+'&'+atFm+'&'+atTo;
	})
	/* ------------------------- Cter 选择 -------------------------- */

	$(".shieldDel").click(function(e) {
		$(".multyDel").toggle();
		$(".iptOrder").toggle();
	})
	$(".delAjax").click(function(e) {
		let target = $(e.target)
		let id = target.data('id')
		let div = $('#card-' + id)
		$.ajax({
			type: 'DELETE',
			url: '/bsOrderDelAjax?id=' + id
		})
		.done(function(results) {
			if(results.success === 1) {
				if(div.length >0) {
					div.remove()
				}
			}
			if(results.success === 0) {
				alert(results.info)
			}
		})
	})
} );