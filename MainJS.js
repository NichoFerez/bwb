(() => {
  fetch(
    "https://script.google.com/a/name-glo.com/macros/s/AKfycbxFhTDp_BUkkdklwvHxaon6AaBTL_4zOaIoPkodRg/exec"
  )
    .then((response) => {
      response.json().then((result) => {
        var obj = result;
        var key_section_html = "";
        var key_values = Object.keys(obj);
        const key_section = document.getElementsByClassName("key_section")[0];

        for (var i = 0; i < key_values.length; i++) {
          var name = key_values[i];
          var iconUrl = '';
          var boroughs = obj[key_values[i]]['boroughs'];
          for(var key in boroughs) {
            iconUrl = boroughs[key][0]['icon'];
          }
          key_section_html +=
            '<div class="key_list" onclick="search_category(this.firstElementChild.innerHTML)">' +
            '<div class="left">' +
            name +
            "</div>" +
            '<div class="right">' +
            '<img src="' + iconUrl + '" alt="">' +
            "</div>" +
            "</div>";
        }
        key_section.innerHTML = key_section_html;

        var inner_section = "";
        for (var i in key_values) {
          var iconUrl = '';
          var boroughs = obj[key_values[i]]['boroughs'];
          for(var key in boroughs) {
            iconUrl = boroughs[key][0]['icon'];
          }

          inner_section +=
            '<div class="inner_section">' +
            '<div class="main_heading container-fluid">' +
            '<div class="row">' +
            '<div class="col-md-8">' +
            '<h5 class="category_name">' +
            key_values[i] +
            "</h5>" +
            "</div>" +
            '<div class="col-md-4">' +
            '<img src="' + iconUrl + '" />' +
            "</div>" +
            "</div>" +
            "</div>" +
            createHTML(key_values[i], obj[key_values[i]]["boroughs"]) +
            "</div>";
        }
        document.getElementsByClassName(
          "list_items"
        )[0].innerHTML += inner_section;
      });
    })
    .catch((e) => {
      console.log(e);
    });
})();

function createHTML(category, boroughs) {
  var final_html = "";
  for (var property in boroughs) {
    var boroughs_html =
      '<p class="boroughs_name">' +
      '<a data-toggle="collapse" href="#' +
      category.split(" ").join("_") +
      "_" +
      property.split(" ").join("_") +
      '">' +
      property +
      "</a>" +
      "</p>";

   var array_html = "";
    var data_array = boroughs[property];
    for (var i in data_array) {
      array_html +=
        "<p style='font-size:16pt;margin-bottom:-8px;'>" +
        data_array[i]["business"] +
        "</p><br />" + 
        '<p> Owner: &nbsp' +
        data_array[i]['owner']   + '</p>' +
       "<p class='products' style='margin-bottom:0px'> Products: &nbsp" +
data_array[i]["products"]+ '</p>' + '</p>' + 
        data_array[i]['adderess'] +
       
         '<a href="http://'+
        data_array[i]['website'] + '" target=_blank" title="Opens in a new window">' + 
        data_array[i]['website']+ '</a>'+
             data_array[i]['neighbourhood'] +
              "<br />"+ 
               '<a href="'+
              data_array[i]['maps']+ '" target=_blank" title="Opens in a new window">' + 
              '<p> Open Maps </p>' +'</a>'+
        "<br />"+   "<br />";
    }

    var collapse_html =
      '<div class="collapse show" id="' +
      property.split(" ").join("_") +
      '">' +
      '<div class="card card-body">' +
      array_html +
      "</div>" +
      "</div>";
    final_html += boroughs_html + collapse_html;
  }
  return final_html;
}

// Search functionality
const search_btn_input = document.getElementsByClassName(
  "search_btn_input "
)[0];
// const categories = document.getElementsByClassName("category_name");
const products = document.getElementsByClassName("products");
search_btn_input.addEventListener("input", (e) => {
  var search_key = search_btn_input.value.toUpperCase(); 


  for (var i in products) {
    // var category_name = categories[i].innerHTML;
    var products_name = products[i].innerHTML;
    // console.log(products_name);
    if (products_name != undefined) {
      products_name = products_name.toUpperCase();
    } else {
      return;
    }



//search button recognizing the word
    if (products_name.includes(search_key)) {
      // products[i].parentElement.style.order = -1;
      products[i].parentElement.style.display = 'block;'
      console.log(products[i]);
    } else {
      // products[
      //   i
      // ].parentElement.style.order = 0;
      products[i].parentElement.style.display = 'none;'
    }

    }
});


//filter search
function search_category(search_key) {
  search_key = search_key.toUpperCase();
  let categories    = document.getElementsByClassName("category_name");
  for (var i in categories) {
    var category_name = categories[i].innerHTML;
    if (category_name != undefined) {
      category_name = category_name.toUpperCase();
    } else {
      return;
    }

    if (category_name.includes(search_key)) {
      categories[
        i
      ].parentElement.parentElement.parentElement.parentElement.style.order = -1;
    } else {
      categories[
        i
      ].parentElement.parentElement.parentElement.parentElement.style.order = 0;
    }
  }
}







