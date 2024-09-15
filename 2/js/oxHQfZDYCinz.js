window.addEventListener('DOMContentLoaded', function(){
	kariireInit();
});

/**
 * 入口
 * @param {*} item 
 */
function kariireInit(item) {
	removeKariire();
	var data = getScriptParams();
	var kariamount = getCookie('kariamount');
	if (data != null && '1' == getCookie('karisimu') && !!kariamount) {
		if (!item) {
			item = data['item'];
		}
		loadKariire(item, data['smp'], data['beforetag'], data['aftertag'], kariamount);
	}
}

/**
 * 借入可能額シミュレーション結果を初期ロード
 * @returns 
 */
function getScriptParams() {
	var scripts = document.getElementsByTagName('script');
	var src = '';
	for (var i = 0; i < scripts.length; i++) {
		src = scripts[i].src;
		if (src.indexOf('kariireResult.js') >= 0) {
			break;
		}
	}

	var result = null;
	if ('' != src) {
		result = new Object();
		var query = src.substring(src.indexOf('?') + 1);
		var parameters = query.split('&');
		for (var i = 0; i < parameters.length; i++) {
			var element = parameters[i].split('=');
			var paramName = decodeURIComponent(element[0]);
			var paramValue = decodeURIComponent(element[1]);
			result[paramName] = paramValue;
		}
	}

	return result;
}

/**
 * クッキー取得
 * @param {*} kword 
 * @returns 
 */
function getCookie(kword) {
	if (typeof (kword) == "undefined")
		return "";
	kword = kword + "=";
	kdata = "";
	scookie = document.cookie + ";";
	start = scookie.indexOf(kword);
	if (start != -1) {
		end = scookie.indexOf(";", start);
		kdata = unescape(scookie.substring(start + kword.length, end)); // データ取り出し
	}
	return kdata;
}

/**
 * 借入可能額シミュレーション結果をcookieより取得
 * @param {*} item 
 * @param {*} smp 
 * @param {*} beforetag 
 * @param {*} aftertag 
 * @param {*} kariamount 
 */
function loadKariire(item, smp, beforetag, aftertag, kariamount) {
	if (('ks' == item || 'js' == item) && (!!beforetag || !!aftertag)) {
		if (!smp || '1' != smp) {
			setPcKariire(kariamount, beforetag, aftertag);
		} else {
			setSpKariire(kariamount, beforetag, aftertag);
		}
	}
}

/** 画面から借入可能額シミュレーション結果を削除 */
function removeKariire() {
	if ($('div#header-func_kariire').length) {
		$('div#header-func_kariire').remove();
	}
	if ($('form#kariire-form').length) {
		$('form#kariire-form').remove();
	}
}

/**
 * PC画面用借入可能額シミュレーション結果htmlを作成
 * @param {*} kariamount 借入可能額
 * @param {*} beforetag 
 * @param {*} aftertag 
 */
function setPcKariire(kariamount, beforetag, aftertag) {
	if (kariamount != null) {
		var html = '';
		html += '<div class="l-header-func__btn" id="header-func_kariire" style="display: none;">';
		html += '	<link rel="stylesheet" href="/static/20240909-140904327/ajax/css/std/kariireResult.css" media="screen">';
		html += '	<div class="kariire-num" onclick="kariire();" data-event="clicktracking" data-category="借入可能額シミュレーション" data-action="クリック" data-label="借入可能額シミュレーション結果表示_ヘッダー">';
		html += '		<div id="kariire-start" class="kariire-num__start">';
		html += '			<p>Click!</p>';
		html += '		</div>';
		html += '		<div id="kariire-result" class="kariire-num__result" style="display: none;">';
		html += '			<div id="change-number-1" class="change-number"></div>';
		html += '			<div id="change-number-2" class="change-number"></div>';
		html += '			<div id="change-number-3" class="change-number"></div>';
		html += '			<div id="change-number-4" class="change-number"></div>';
		html += '		</div>';
		html += '	</div>';
		html += '	<div class="kariire-text">';
		html += '		<p>前回の借入可能額<br>シミュレーション結果</p>';
		html += '		<a class="kariire-link" href="javascript:void(0);" onclick="document.forms[\'kariire-form\'].submit();"';
		html += '			data-event="clicktracking" data-category="借入可能額シミュレーション" data-action="遷移" data-label="借入可能額シミュレーション結果表示_ヘッダー">詳細を見る</a>';
		html += '	</div>';
		html += '</div>';
		html += '<form id="kariire-form" action="/kariiregaku_simulation/result/" target="_blank" method="post">';
		html += '	<input type="hidden" id="kariire-loanAmount" name="kariire-loanAmount" value="' + kariamount + '">';
		html += '</form>';

		addhtml(html, beforetag, aftertag);
	}
}

/**
 * SP画面用借入可能額シミュレーション結果htmlを作成
 * @param {*} kariamount 
 * @param {*} beforetag 
 * @param {*} aftertag 
 */
function setSpKariire(kariamount, beforetag, aftertag) {
	if (kariamount != null) {
		if ($('div#header-func_kariire').length) {
			$('div#header-func_kariire').remove();
		}
		var html = '';
		html += '<div class="kariire-conteiner" id="header-func_kariire" style="display: none;">';
		html += '	<link rel="stylesheet" href="/static/20240909-140904327/ajax/css/std/smp/kariireResult.css" media="screen">';
		html += '	<p class="kariire-conteiner__title">前回の借入可能額<br class="kariire-br">シミュレーション結果</p>';
		html += '	<div class="kariire-num" onclick="kariire()" data-event="clicktracking" data-category="借入可能額シミュレーション" data-action="クリック" data-label="借入可能額シミュレーション結果表示_ヘッダー">';
		html += '	  <div id="kariire-start" class="kariire-num__start">';
		html += '		<p>Tap!</p>';
		html += '	  </div>';
		html += '	  <div id="kariire-result" class="kariire-num__result" style="display: none;">';
		html += '		<div id="change-number-1" class="change-number"></div>';
		html += '		<div id="change-number-2" class="change-number"></div>';
		html += '		<div id="change-number-3" class="change-number"></div>';
		html += '		<div id="change-number-4" class="change-number"></div>';
		html += '	  </div>';
		html += '	</div>';
		html += '	<a class="kariire-conteiner__link" href="javascript:void(0);" onclick="document.forms[\'kariire-form\'].submit();"';
		html += '		data-event="clicktracking" data-category="借入可能額シミュレーション" data-action="遷移" data-label="借入可能額シミュレーション結果表示_ヘッダー">詳細を見る</a>';
		html += '</div>';
		html += '<form id="kariire-form" action="/kariiregaku_simulation/result/" target="_blank" method="post">';
		html += '	<input type="hidden" id="kariire-loanAmount" name="kariire-loanAmount" value="' + kariamount + '">';
		html += '</form>';

		addhtml(html, beforetag, aftertag);
	}
}

/**
 * 借入可能額シミュレーション結果を画面に表示
 * @param {*} html 
 * @param {*} beforetag 
 * @param {*} aftertag 
 * @param {*} showtag 
 */
function addhtml(html, beforetag, aftertag, showtag) {
	if (!aftertag) {
		beforetag = decodeURI(beforetag);
		if ($(beforetag).length) {
			$(beforetag).after(html);
		}
	} else {
		aftertag = decodeURI(aftertag);
		if ($(aftertag).length) {
			$(aftertag).before(html);
		}
	}
	if ($('div#header-func_kariire').length) {
		setTimeout( function () {
			$('div#header-func_kariire').show();
		}, 100);
	}
}

/**
 * 借入可能額取得ファサードを実行
 * @param {*} mortgageType 登録(更新):C, 取得:R, 削除:D
 * @param {*} beforetag 
 * @param {*} aftertag 
 * @param {*} callback 
 */
function callMortgageInfo(mortgageType, beforetag, aftertag, callback) {
	$.ajax({
		type : "GET",
		data : $.param({
			PROCESS_TYPE : mortgageType
		}),
		url : '/mortgage/CallMortgageInfo.php',
	}).done(function(data, status, xhr) {
		if (data != null && '' != data && callback != null) {
			try {
				callback(JSON.parse(data), beforetag, aftertag);
			} catch (e) {// jsonフォーマットが間違ってた時にエラーが返ってくる
			}
		}
	}).fail(function(xhr, status, error) {
	});
}

/** 借入可能額シミュレーション結果をクリック */
function kariire() {

	if (document.getElementById('kariire-loanAmount') != null) {
		var result = document.getElementById('kariire-loanAmount').value;
		var kariireStart = document.getElementById('kariire-start');
		var kariireResult = document.getElementById('kariire-result');

		var resultSort = ("0000" + result).slice(-4);
		var ones = Number(String(resultSort).slice(0, 1));
		var tens = Number(String(resultSort).slice(1, 2));
		var hundreds = Number(String(resultSort).slice(2, 3));
		var thousands = Number(String(resultSort).slice(3, 4));
		var resultList = [ ones, tens, hundreds, thousands ];

		var changeNum1 = document.getElementById('change-number-1');
		var changeNum2 = document.getElementById('change-number-2');
		var changeNum3 = document.getElementById('change-number-3');
		var changeNum4 = document.getElementById('change-number-4');
		var changeNumList = [ changeNum1, changeNum2, changeNum3, changeNum4 ];

		var beforeNum = '<span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>';

		if (kariireResult.hasAttribute('style')) {
			kariireStart.style.display = "none";
			kariireResult.removeAttribute('style');

			// 0～9の数字をスロットの各リールに追加
			for (var i = 0; i < changeNumList.length; i++) {// スロットの値を受け取ってる
				changeNumList[i].innerHTML = beforeNum;
				changeNumList[i].classList.add("change-number-" + (i + 1));
			}

			// スロットの各リールにの数字が最後になるまで数字を追加
			console.log(resultList);
			for (var i = 0; i < 4; i++) {
				for (var m = 0; m < resultList[i] + 1; m++) {
					let span = document.createElement("span");
					span.textContent = m;
					changeNumList[i].append(span);
				}
				if (resultList[0] == 0) { // 千の位が0の時 表示なし
					let span = document.createElement("span");
					span.textContent = "";
					changeNumList[0].append(span);
				}
			}
			callMortgageInfo('U', null, null, null);
		}

		else {
			kariireStart.removeAttribute('style');
			kariireResult.style.display = "none";

			for (var i = 0; i < changeNumList.length; i++) {
				changeNumList[i].innerHTML = "";
			}
		}
	}
}

/**
 * 借入可能額シミュレーション結果を削除
 * @returns 
 */
function functionDataDelete() {
	if (!confirm('削除しますか？')) {
		/* キャンセルの時の処理 */
		return false;
	} else {
		/* OKの時の処理 */
		callMortgageInfo('D', null, null, function(data) {
			document.location.href = '/kariiregaku_simulation/';
		});
	}
}
