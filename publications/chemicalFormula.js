var allElements = [
  ['H',1],
  ['Li',3],
  ['Be',4],
  ['B',5],
  ['C',6],
  ['N',7],
  ['O',8],
  ['F',9],
  ['Na',11],
  ['Mg',12],
  ['Al',13],
  ['Si',14],
  ['P',15],
  ['S',16],
  ['Cl',17],
  ['K',19],
  ['Ca',20],
  ['Sc',21],
  ['Ti',22],
  ['V',23],
  ['Cr',24],
  ['Mn',25],
  ['Fe',26],
  ['Co',27],
  ['Ni',28],
  ['Cu',29],
  ['Zn',30],
  ['Ga',31],
  ['Ge',32],
  ['As',33],
  ['Se',34],
  ['Br',35],
  ['Rb',37],
  ['Sr',38],
  ['Y',39],
  ['Zr',40],
  ['Mo',42],
  ['Ru',44],
  ['Rh',45],
  ['Pd',46],
  ['Ag',47],
  ['Cd',48],
  ['In',49],
  ['Sn',50],
  ['Sb',51],
  ['Te',52],
  ['I',53],
  ['Cs',55],
  ['Ba',56],
  ['La',57],
  ['Ce',58],
  ['Pr',59],
  ['Nd',60],
  ['Eu',63],
  ['Gd',64],
  ['Tb',65],
  ['Dy',66],
  ['Ho',67],
  ['Er',68],
  ['Tm',69],
  ['Lu',71],
  ['Hf',72],
  ['Ta',73],
  ['W',74],
  ['Re',75],
  ['Os',76],
  ['Ir',77],
  ['Pt',78],
  ['Au',79],
  ['Hg',80],
  ['Tl',81],
  ['Pb',82],
  ['Bi',83],
  ['U',92]
];

$(document).ready(function() {
  $('#elements_number').val("0");
  $("#spaceittext").on('input', function() {
      var d = $(this).val();
      if (d.length > 0 && !($("#restriction2_enabled").is(":checked")))
        $('#restriction2_enabled').trigger("click");
      else if (d.length == 0 && ($("#restriction2_enabled").is(":checked")))
        $('#restriction2_enabled').trigger("click");
    });
    $("#add_element").click(function() {

      //Get all selected elements
      var allLists = $(".elementList");
      if (allLists.length == allElements.length)
        return;

      var el_number = parseInt($('#elements_number').val()) + 1;
      if (!($("#restriction3_enabled").is(":checked"))) {
        $('#restriction3_enabled').trigger("click");
      }
      var element_name = 'element__' + el_number.toString();
      $('#elements_number').val(el_number)

      var span = $("<span/>", {"id": element_name});
      var p = $("<p/>");
      var input = $("<input/>", {"type": "number",
                                 "min": "0",
                                 "value": "1", 
                                 "name": element_name + "__number", 
                                 "placeholder": "# of atoms (optional)"});

      var select = $("<select/>", {"name": element_name, "class": "elementList"});

      var selectedElements = [];
      for (var i = 0; i < allLists.length; i++)
        selectedElements.push(allLists.eq(i).find(":selected").val());

      for (var i = 0; i < allElements.length; i++)
      {
        if ($.inArray(allElements[i][0], selectedElements) != -1)
          continue;

        var opt = $("<option/>", {"value": allElements[i][0]});
        opt.text(allElements[i][0] + " (Z=" + allElements[i][1] + ")");
        select.append(opt);
      }

      p.append(select);
      p.append(input);
      span.append(p);

      $('#fourmula_elemnts').append(span);

    $('#remove_last_element_wrap').show();
  });

  $('#remove_last_element_wrap').hide();
   
  $('#remove_last_element').click(function() {
    var el_number = parseInt($('#elements_number').val());
    var element_name = 'element__' + el_number.toString();
    $('#' + element_name).remove();
    el_number--;
    $('#elements_number').val(el_number);
    if (el_number == 0) {
      $('#remove_last_element_wrap').hide();
      if ($("#restriction3_enabled").is(":checked")) {
        $('#restriction3_enabled').trigger("click");
      }
    }
  });
});