const root = $('#root');


// Clock header -----------------------------------------------------

let clockHeader = $('<h1>')
    .text(moment().format('LLLL'))
    .addClass('text-center m-3');
root.prepend(clockHeader);

setInterval(function(){
    clockHeader.text(moment().format('LLLL'));
    root.prepend(clockHeader);
}, 1000);

// event list content -----------------------------------------------
let listContainer = $('<div class="row d-flex justify-content-center">');
root.append(listContainer);

// add event --------------------------------------------------------
let addContainer = $('<div class="input-group mb-3 col-6">');
let addButton = $('<button class="btn btn-outline-success" type="button" id="button-addon1">')
    .text('+');
let addInput = $('<input type="text" class="form-control" placeholder="Add event here" aria-label="Example text with button addon" aria-describedby="button-addon1">');

addContainer.append(addButton);
addContainer.append(addInput);

listContainer.append(addContainer);

// event list -------------------------------------------------------