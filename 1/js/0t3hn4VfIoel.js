var CUSTOM_ITEM_MAPPING={ITEMNUM:{"10":{name:"data-display",value:"10"},"20":{name:"data-display",value:"20"},"30":{name:"data-display",value:"30"},"40":{name:"data-display",value:"40"},"50":{name:"data-display",value:"50"}},TATEMONONUM:{"10":{name:"data-display-building",value:"10"},"20":{name:"data-display-building",value:"20"},"30":{name:"data-display-building",value:"30"}},SORT:{"7":{name:"data-sort",value:"lowprice"},"8":{name:"data-sort",value:"highprice"},"1":{name:"data-sort",value:"station"},"3":{name:"data-sort",value:"address"},"5":{name:"data-sort",value:"nearstation"},"9":{name:"data-sort",value:"plan"},"12":{name:"data-sort",value:"buildingarea"},"16":{name:"data-sort",value:"landarea"},"20":{name:"data-sort",value:"builtyears"},"33":{name:"data-sort",value:"newarrivals"},"25":{name:"data-sort",value:"nearinputstation1"},"37":{name:"data-sort",value:"nearinputstation2"},"0":{name:"data-sort",value:"none"},"95":{name:"data-sort",value:"none"}}};var CUSTOM_ITEM_SORT_MAPPING={PB0G:{name:"data-clicksort",value:"photo"},PB0H:{name:"data-clicksort",value:"floorplan"},"1":{name:"data-clicksort",value:"access"},"2":{name:"data-clicksort",value:"access"},"3":{name:"data-clicksort",value:"address"},"4":{name:"data-clicksort",value:"address"},"5":{name:"data-clicksort",value:"station"},"6":{name:"data-clicksort",value:"station"},"7":{name:"data-clicksort",value:"price"},"8":{name:"data-clicksort",value:"price"},"9":{name:"data-clicksort",value:"room"},"10":{name:"data-clicksort",value:"room"},"11":{name:"data-clicksort",value:"buildingarea"},"12":{name:"data-clicksort",value:"buildingarea"},"11exc":{name:"data-clicksort",value:"exclusivearea"},"12exc":{name:"data-clicksort",value:"exclusivearea"},"15":{name:"data-clicksort",value:"landarea"},"16":{name:"data-clicksort",value:"landarea"},"17":{name:"data-clicksort",value:"item"},"18":{name:"data-clicksort",value:"item"},"19":{name:"data-clicksort",value:"builtyears"},"20":{name:"data-clicksort",value:"builtyears"}};function pushGapCustomForSelect(b){var a=$(b.target);pushGapCustomForSelectComm(a.prop("name"),a.val())}function pushGapCustomForSelectComm(d,b){var a={};var f={};var c,e;a=CUSTOM_ITEM_MAPPING[d];if(typeof a!=="undefined"&&Object.keys(a).length>0){f=a[b];if(typeof f!=="undefined"&&Object.keys(f).length>0){c=f.name;e=f.value;if(c&&e){pushGapCustom("data-pv",c,e)}}}}function pushGapCustomForPaging(a){pushGapCustom("data-pv","data-paging",a)}function pushGapCustomForPagingPost(a){pushGapCustom("event","data-paging",a)}function pushGapCustomForItemsort(c){var f={};var a,e,d,g;var b=$(c.target);$dataval=b.attr("data-value");$text=b.text();if(($dataval=="11"||$dataval=="12")&&$text=="専有面積"){$dataval=$dataval+"exc"}f=CUSTOM_ITEM_SORT_MAPPING[$dataval];if(typeof f!=="undefined"&&Object.keys(f).length>0){a=f.name;e=f.value;if(a&&e){pushGapCustom("data-pv",a,e)}}}function pushGapCustomForModal(a,b){pushGapCustomForModalComm("data-pv",a,b)}function pushGapCustomForModalPost(a,b){pushGapCustomForModalComm("event",a,b)}function pushGapCustomForModalComm(a,b,d){var c={};c[a]="virtual";c["data-url"]=location.protocol+"//"+b;c["data-title"]=d;if(location.host!=="www.athome.co.jp"){console.log(c)}dataLayer.push(c)}function pushGapCustomForSwitch(a){pushGapCustom("event","data-display-switch",a)}function pushGapCustom(a,c,e){var d={};var b=location.protocol+"//"+location.host+location.pathname;d[a]="virtual";d["data-url"]=b;d[c]=e;if(location.host!=="www.athome.co.jp"){console.log(d)}dataLayer.push(d)}function pushGapCustomForSwipe(){var a={};a.event="gazou_swipe";a["data-category"]="物件一覧";a["data-action"]="画像";a["data-label"]="スワイプ";if(location.host!=="www.athome.co.jp"){console.log(a)}dataLayer.push(a)}function pushGapCustomGeneralEvent(d,c,e,a){var b={};b.event=d;b.category=c;b.action=e;b.label=a;if(location.host!=="www.athome.co.jp"){console.log(b)}dataLayer.push(b)}function pushGapCustomDataEvent(d,c,e,a){var b={};b.event=d;b["data-category"]=c;b["data-action"]=e;b["data-label"]=a;if(location.host!=="www.athome.co.jp"){console.log(b)}dataLayer.push(b)}function pushGapCustomForByallModal(b){var a={};a.event="buy-all";a["data-category"]="買うまとめ検索";a["data-action"]="種目";b.forEach(function(d){var c="";switch(d){case"kb551":c="新築マンション";break;case"kb552":c="中古マンション";break;case"kb553":c="新築戸建";break;case"kb554":c="中古戸建";break;case"kb555":c="土地";break;default:break}if(c!=null&&c!=""){if(a["data-label"]){a["data-label"]=a["data-label"]+","+c}else{a["data-label"]=c}}});if(location.host!=="www.athome.co.jp"){console.log(a)}dataLayer.push(a)}function pushGapCustomForAccordion_button(a){var b={};b["data-event"]="clicktracking";b["data-category"]="お気に入り";b["data-action"]="逆お気に入り";b["data-label"]=a;if(location.host!=="www.athome.co.jp"){console.log(b)}dataLayer.push(b)}function pushGapCustomForVirtualPageEvent(b,c){var a={};a.event=b;a.virtualPageView=c;if(location.host!=="www.athome.co.jp"){console.log(a)}dataLayer.push(a)};