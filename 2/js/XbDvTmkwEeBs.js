
function eventLogOutput(imageUrlBefore,subCategory,caption,device,bukkenNo,shumokuCd){
    var imageUrlLogAfter

    // getパラメータ作成
    if (!imageUrlBefore == '') {
      var editImageUrl
      if (imageUrlBefore.indexOf('.jpeg') !== -1) {
        // 相対パス・絶対パスの判定
        if (imageUrlBefore.match(/^https?:\//) !== null) {
          editImageUrl = imageUrlBefore.match(/^https?:\/{2,}.*?(\/.*)\.[a-z]+([\?#;].*)?$/)[1]; // 流通SP
        } else {
          editImageUrl = imageUrlBefore.substring(0,imageUrlBefore.indexOf('.jpeg')); // 流通PC
        }
      } else {
        // 入稿の時、相対パス・絶対パスの判定
        if (imageUrlBefore.match(/^https?:\//) !== null) {
          editImageUrl = imageUrlBefore.match(/^https?:\/{2,}.*?(\/.*)\.[a-z]+([\?#;].*)?$/)[1]; //入稿PC
        } else {
          editImageUrl = imageUrlBefore.substring(0,imageUrlBefore.indexOf('.jpg')); // 入稿SP
        }
        editImageUrl = editImageUrl.split('-')[0];
      }
      imageUrlLogAfter = '?imageUrl=' + encodeURIComponent(editImageUrl);
    } else {
      imageUrlLogAfter = '?imageUrl=';
    }
    subCategory = (!subCategory) ? '&subCategory=未設定' : '&subCategory=' + subCategory;
    // "距離" 以降に表示されている距離を除去
    captionInfo = (!caption) ? '未設定' : (caption.indexOf("距離：") > -1) ? caption.substring(0,caption.indexOf("距離：")) : caption;
    caption = '&caption=' + encodeURI(captionInfo);
    device = (device.indexOf('iPhone') > 0 || device.indexOf('Android') > 0) ? '&device=SP' : '&device=PC';
    bukkenNo = (!bukkenNo) ? '&bukkenNo=' : '&bukkenNo=' + bukkenNo;
    shumokuCd = (!shumokuCd) ? '&syumokuCd=' : '&syumokuCd=' + shumokuCd;

    // URL作成
    var url ='';
    url = '/eventLogOutput/eventLogOutput.php' + imageUrlLogAfter + subCategory + caption + device + bukkenNo + shumokuCd;

    // ajax処理
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'html'
    })
}