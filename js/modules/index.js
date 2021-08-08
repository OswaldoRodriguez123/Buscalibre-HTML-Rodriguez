const default_options = {
  dom: '<"dataTables_wrapper dt-bootstrap"<"row"<"col-xl-12 d-block d-sm-flex d-xl-block justify-content-center dataTables_wrapper"<"d-block d-lg-inline-flex mr-0 mr-sm-3"fr><"d-block d-lg-inline-flex d-buttons"B>>>t<"row"<"col-sm-5"i><"col-sm-7"p>>>',
  buttons: [{ extend: "excel", className: "btn-success btn-sm" }],
  responsive: true,
  processing: true,
  serverSide: false,
  deferRender: true,
  language: {
    url: "assets/plugins/datatables.net/Spanish.json",
  },
};

const Page = (() => {
  "use strict";
  return {
    init: function () {
      getTextPrint();
    },
  };
})();

$(document).ready(function () {
  Page.init();
});
const getTextPrint = () => {
  startLoading();
  $.ajax({
    url: "https://buscalibre-php-rest-api-rodriguez.000webhostapp.com/api/get.php",
    type: "GET",
    success: function (response) {
      const options = default_options;
      (options.data = response.body),
        (options.columns = [
          { data: "id" },
          { data: "letra" },
          { data: "texto" },
          { data: "fecha" },
        ]);

      text_table = $("#text_table").DataTable(options);
      endLoading();
    },
    error: function (e) {
      showAlert(e, "error");
    },
  });
};
