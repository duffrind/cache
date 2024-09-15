/**
 * 物件一覧 お気に入り登録削除処理 SMT地図以外
 *
 * @returns {Boolean}
 */
var cookie = document.cookie.split(";");
var favoriteModalDisable = false;

function addSingleFavorite(target, id) {
	var url = '';
	var msg = '削除';
	var type = 'single';

	if (target.hasClass('is-checked')) {
		url = '/simple_favorite/delete';
	} else {
		url = '/simple_favorite/regist';
		msg = '登録';
	}

	var param = getFavoriteParam(target, id, type);

	favoriteAjax(url, param, target, type, msg);

}

/**
 * まとめてお気に入り登録
 *
 * @returns {Boolean}
 */
function addMultipleFavorite(id) {

	var url = '/simple_favorite/regist';
	var msg = '登録';
	var type = 'multiple';
	var target = '';

	var param = getFavoriteParam('', id, type);

	if (param.BUKKEN_ART == '') {
		alert('物件が１つもチェックされていません。');
		return false;
	}

	var array = param.BUKKEN_ART.split(',');
	if(array.length > 50) {
		$('.check-alert').show();
		return;
	}

	favoriteAjax(url, param, target, type, msg);

}

/**
 * ajax実行
 *
 */
function favoriteAjax(url, param, target, type, msg) {
	$.ajax({
		type : "POST",
		url : url,
		dataType : "html",
		data : param,
	}).done(function(data,textStatus,jqXHR){
		// APIエラー
		var json = $.parseJSON(jqXHR.getResponseHeader('X-JSON'));
		if (json.APIERR) {
			alert('お気に入り' + msg + '処理に失敗しました。');
		}else{
			// クッキーを改めて取得
			cookie = document.cookie.split(";");
			var i;
			for(i = 0; i < cookie.length; i++){ // クッキー取り出し
				var cArray = cookie[i].split('='); // 分割して配列にする
				if( cArray[0] == ' favoritemodaldisable'){ // 取り出したいkeyと合致するかどうか
					favoriteModalDisable = true;
				}
			}
			if (type == 'single') {
				// 単一登録
				singleIcon(target, type);

			} else if (type == 'multiple') {
				// まとめて登録
				multipleIcon(type, param.BUKKEN, data);
			}

			// ヘッダーのお気に入り件数の更新
			var count = getKentoCount();
			$('#header_kento_count').get(0).innerHTML = count;

			// 物件ごとのお気に入り人数更新
			$(document).trigger('psl_exam_regist_complete', param.BUKKEN);
		}
	});
}

/**
 * 単一お気に入り登録
 * 表示切り替え
 *
 * @param target
 */
function singleIcon(target, type) {
	var locationPath = location.pathname;

	if (!target.hasClass('is-checked')) {
		var areaCd = $('#AREA').val();
		target.find('#favo_on, #favo_off').addClass('C0YL1_favorite_icon_on');
		target.find('#favo_on, #favo_off').removeClass('C0YL1_favorite_icon_off');
		target.find('#favo_on, #favo_off').html('<span data-span-type="favnum" data-get-keep-article-count-flag="1"></span>が登録中</span>');
		target.addClass('is-checked');
		if(favoriteModalDisable == false) {
			ModalView(target);
		}
		target.addClass('favorite-OFF-ModalTrigger');
		target.removeClass('favorite-ON-ModalTrigger');
		if (target.hasClass('is-alert')) {
			alert('お気に入りに追加しました。');
		}
	} else {
		target.find('#favo_on, #favo_off').addClass('C0YL1_favorite_icon_off');
		target.find('#favo_on, #favo_off').removeClass('C0YL1_favorite_icon_on');
		target.find('#favo_on, #favo_off').html("お気に入り登録");
		target.removeAttr('style').removeClass('is-checked');
		if(favoriteModalDisable == false) {
			ModalView(target);
		}
		target.addClass('favorite-ON-ModalTrigger');
		target.removeClass('favorite-OFF-ModalTrigger');
		if (target.hasClass('is-alert')) {
			alert('お気に入りから削除しました。');
		}
	}
}

/**
 * まとめてお気に入り登録
 * 表示切り替え
 *
 */
function multipleIcon(type, bukkenNo, html) {
	var locationPath = location.pathname;
	var aryBukken = bukkenNo.split(",");
	var areaCd = $('#AREA').val();

	for ( var i = 0; i < aryBukken.length; i++) {
		target = $('[data-bukken-no=' + aryBukken[i] + ']').find('.C0YL1_btn');
		if (!target.hasClass('is-checked')) {
			target.find('#favo_on, #favo_off').addClass('C0YL1_favorite_icon_on');
			target.find('#favo_on, #favo_off').removeClass('C0YL1_favorite_icon_off');
			target.find('#favo_on, #favo_off').html('<span data-span-type="favnum" data-get-keep-article-count-flag="1"></span>が登録中</span>');
			target.addClass('is-checked');
			// まとめての場合最後の一回だけモーダル立ち上げ
			if(i == aryBukken.length - 1 && favoriteModalDisable == false) {
				ModalView(target);
			}
			target.addClass('favorite-OFF-ModalTrigger');
			target.removeClass('favorite-ON-ModalTrigger');
		}
	}
}

function ModalView(target) {
	var test = target.hasClass('favorite-ON-ModalTrigger');
	if(target.hasClass('favorite-ON-ModalTrigger') == true) {
		var favoriteModalTrigger = $(".favorite-ON-ModalTrigger");
		var favoriteModal = $("#favorite-ON-Modal");
	} else {
		var favoriteModalTrigger = $(".favorite-OFF-ModalTrigger");
		var favoriteModal = $("#favorite-OFF-Modal");
	}
	favoriteModal.fadeIn(500);
	favoriteModal.find(".favorite-modal-btn-close").css("display", "block");
	favoriteModal.find(".innerContents").css("display", "block");
}

/**
 * パラメータ取得
 *
 * @returns
 */
function getFavoriteParam(target, id, type) {
	var param = new Object;
	// 共通パラメータ
	param['ITEM'] = $('#' + id + ' :hidden[name = "ITEM"]').val();
	param['SITECD'] = $('#' + id + ' :hidden[name = "SITECD"]').val();
	param['DOWN'] = $('#' + id + ' :hidden[name = "DOWN"]').val();
	param['ART'] = $('#' + id + ' :hidden[name = "ART"]').val();

	// 単一登録
	if (type == 'single') {
		var bukken = target.closest('[data-bukken-no]').attr('data-bukken-no');
		var ken =  target.closest('[data-kencd]').attr('data-kencd');
		param['BUKKEN'] = bukken;
		param['BKNO_KEN'] = bukken + '_' + ken;

		// 最近見た物件、買うをまとめての場合ITEM・ARTの設定を修正
		if( typeof target.closest('[data-item]').attr('data-item') !== 'undefined') {
			param['ITEM'] = target.closest('[data-item]').attr('data-item');
		}
		if( typeof target.closest('[data-art]').attr('data-art') !== 'undefined') {
			param['ART'] = target.closest('[data-art]').attr('data-art');
		}

		// マンション導線(ks21)からの流通物件登録は中古マンションとして取り扱う（入稿はボタンがないので登録自体不可）
		if(param['ITEM'] == 'ks' && param['ART'] == '21') {
			param['ART'] = '12';
		}

	} else if (type == 'multiple') {
		// まとめて登録
		if (id == 'search-parameter') {
			var name = 'list';
		} else {
			var name = 'BUKKEN_ART';
		}

		var checkBoxList = $('[name ="' + name + '[]"]:checked');
		var bukken_art = '';
		var bukkenNo = '';
		var tmpBukken = '';
		var bukkenKen = '';

		for ( var i = 0; i < checkBoxList.length; i++) {
			// BUKKEN_ART取得
			bukken_art += ',' + checkBoxList[i].value;

			// BUKKENとARTを分ける
			tmpBukken = checkBoxList[i].value.split('_');
			bukkenNo += ',' + tmpBukken[0];

			// 県コード取得
			var ken = $(checkBoxList[i]).closest('[data-kencd]').attr('data-kencd');
			var tmpBukkenKen = tmpBukken[0] + '_' + ken;
			bukkenKen += ',' + tmpBukkenKen;
		}

		// データが存在する場合、','を削除
		if (bukken_art.length > 0) {
			bukken_art = bukken_art.substring(1);
		}
		if (bukkenNo.length > 0) {
			bukkenNo = bukkenNo.substring(1);
		}
		if (bukkenKen.length > 0) {
			bukkenKen = bukkenKen.substring(1);
		}

		param['BUKKEN_ART'] = bukken_art;
		param['BUKKEN'] = bukkenNo;
		param['BKNO_KEN'] = bukkenKen;
	}

	return param;
}

//C0YL1 ここから
//C0YL1 お気に入りONモーダル
$(function() {
	var favoriteModalTrigger = $(".favorite-ON-ModalTrigger");
	var favoriteModal = $("#favorite-ON-Modal");
	$(".favorite-modal-btn-close").click(function () {
		if($('#not-show-again').prop('checked') == true) {
			modalViewSetting();
		}
		favoriteModal.fadeOut(100);
		favoriteModal.find(".favorite-modal-btn-close").css("display", "none");
		favoriteModal.find(".innerContents").css("display", "none");
		return false;
	});
	$(".favorite-modal-btn-close_bottom").click(function () {
		if($('#not-show-again').prop('checked') == true) {
			modalViewSetting();
		}
		favoriteModal.fadeOut(500);
		favoriteModal.find(".favorite-modal-btn-close").css("display", "none");
		favoriteModal.find(".innerContents").css("display", "none");
		return false;
	});
});

//C0YL1 お気に入りOFFモーダル
$(function() {
	var favoriteModalTrigger = $(".favorite-OFF-ModalTrigger");
	var favoriteModal = $("#favorite-OFF-Modal");
	$(".favorite-modal-btn-close").click(function () {
		favoriteModal.fadeOut(100);
		favoriteModal.find(".favorite-modal-btn-close").css("display", "none");
		favoriteModal.find(".innerContents").css("display", "none");
		return false;
	});
	$(".favorite-modal-btn-close_bottom").click(function () {
		favoriteModal.fadeOut(500);
		favoriteModal.find(".favorite-modal-btn-close").css("display", "none");
		favoriteModal.find(".innerContents").css("display", "none");
		return false;
	});
});

function modalViewSetting() {
	// お気に入り登録モーダルの表示設定
	var s2day = "Tue, 1-Jan-2030 00:00:00 GMT";
	document.cookie = 'favoritemodaldisable=1;path=/;expires=' + s2day;
}


//C0Z7C お気に入りリストの改修 お問い合わせボタンの出しわけ

$(window).scroll(function() {
	var element = document.getElementById('contact');
	var fixedtxt = document.getElementById('fixedText');
	if (fixedtxt !== null) {
		if( element !== null && element.classList.contains('fixed-bottom') == true ){
			fixedtxt.classList.add('c-white');
		}else{
			fixedtxt.classList.remove('c-white');
		}
	}
});

// チェックボックス連動
$(function () {
	$('[name="BUKKEN_ART[]"],[name="bottom_checkbox"]').on('change', function () {
		val = $(this).val();
		if ($(this).prop('checked')) {
			$("input:checkbox[value='" + val + "']").prop('checked', true);
		} else {
			$("input:checkbox[value='" + val + "']").prop('checked', false);
		}

		checkBknList();
	});
});

// スクロールヒント表示切替
$(function () {
		if ($(window).width() < $('.user-func_table').outerWidth(true)) {
			$('.scroll-modal').removeClass('scroll-modal--close');
		}

	//横スクロール
    $('.table-wrap').scroll(function () {
        $('.scroll-modal').addClass('scroll-modal--close');
    });
    // 縦スクロール
    $(window).scroll(function () {
        if ($('.scroll-modal').length && !$('.scroll-modal').hasClass('scroll-modal--close')) {
            $('.scroll-modal').addClass('scroll-modal--close');
        }
    });
});