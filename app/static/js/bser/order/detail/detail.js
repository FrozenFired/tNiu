$( function() {
	$("#downBtn").click(function(e) {
		$(".downBtn").toggle()
	})
	$("#optBtn").click(function(e) {
		$(".optBtn").toggle()
	})

	/* ----------------- 第二导航 ----------------------*/
	$("#infoSketch").css({"background-color": "white"});
	$("#infoPrice").click(function(e) {
		$(".infoSecNav").css({"background-color": "#b4d145"});
		$(this).css({"background-color": "white"});
		$(".infoPrice").show();
		$(".infoSketch").hide();
		$(".infoSend").hide();
	})
	$("#infoSend").click(function(e) {
		$(".infoSecNav").css({"background-color": "#b4d145"});
		$(this).css({"background-color": "white"});
		$(".infoSend").show();
		$(".infoSketch").hide();
		$(".infoPrice").hide();
	})
	$("#infoSketch").click(function(e) {
		$(".infoSecNav").css({"background-color": "#b4d145"});
		$(this).css({"background-color": "white"});
		$(".infoSketch").show();
		$(".infoSend").hide();
		$(".infoPrice").hide();
	})
	/* ----------------- 第二导航 ----------------------*/


	/* --- 打印订单功能（必须电脑登录打印员，并连接打印机） -----*/
	$("#print").click(function(e) {
		$("#infoPrice").click();
		window.print();
	})
	/* --- 打印订单功能（必须电脑登录打印员，并连接打印机） -----*/


	// 更改备注
	$("#noteLab").click(function(e) {
		$(".orgNote").hide();
		$(".fixNote").show();
		$("#iptNote").val($("#orgNote").val())
		$("#iptNote").focus();
	})
	$("#cancelUp").click(function(e) {
		$(".orgNote").show();
		$(".fixNote").hide();
	})
	$("#iptNote").blur(function(e) {
		$("#orderUpdNote").submit();
	})
} );