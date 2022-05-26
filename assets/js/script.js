const root = $('#root');


// generate dynamic Clock header ------------------------------------------------------------------------------------------------------------------

let clockHeader = $('<h1>')
    .text(moment().format('LLLL'))
    .addClass('text-center m-3');
root.prepend(clockHeader);

setInterval(function(){
    clockHeader.text(moment().format('LLLL'));
    root.prepend(clockHeader);
}, 1000);


// event list content --------------------------------------------------------------------------------------------------------------------
let listContainer = $('<div class="row d-flex justify-content-center">');
root.append(listContainer);

// generate add event input block ---------------------------------------------------------------------------------------------------------------------
let addContainer = $('<div class="input-group mb-3 col-6">');

// add button
let addButton = $('<button class="btn btn-outline-success" type="button" id="button-addon1">')
    .addClass('addButton')
    .text('+');

// dropdown to select time
let timeDropdown = $('<button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">')
    .text('Select Timeslot ');
let dropDownMenu = $('<ul class="dropdown-menu">');
const timesArray = ['9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm'];
for(let i = 0; i < timesArray.length; i++){
    let timeEl = $('<li class="dropdown-item">')
        .addClass(`timeEl${i}`)
        .text(timesArray[i]);
    dropDownMenu.append(timeEl);
}

// input 
let addInput = $('<input type="text" class="form-control" placeholder="Add event here" aria-label="Example text with button addon" aria-describedby="button-addon1">');

// append
addContainer.append(addButton);
addContainer.append(timeDropdown);
addContainer.append(dropDownMenu);
addContainer.append(addInput);
listContainer.append(addContainer);

// to select time
dropDownMenu.on('click', '.dropdown-item', function(){
    let itemLi = this.textContent;
    timeDropdown.text(itemLi);
});

// generate event placeholders -----------------------------------------------------------------------------------------------

let placeholderGroup = $('<div class="input-group mb-3 justify-content-center">');
for(let i = 0; i < timesArray.length; i++){
    let placeholderItem = $('<span class="input-group-text col-8" id="inputGroup-sizing-default">')
        .addClass('item' + i)
        .text(timesArray[i]);
    placeholderGroup.append(placeholderItem);
}

listContainer.append(placeholderGroup);


// functions --------------------------------------------------------------------------------------------------------------------

// append items from local storage to placeholders
function appendFromLocal(){

}

// save user input to local storage
function saveEvent(){
    // Save related form data as an object
  let itemInput = {
    time: timeDropdown.textContent,
    event: addInput.value
  };
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("itemInput", JSON.stringify(itemInput));
  console.log('80');
  console.log(JSON.parse(localStorage.getItem("itemInput")));
}

// append items to placeholders
function appendEventItem(){
    for(let i = 0; i < timesArray.length; i++){
        if(timesArray[i] === timeDropdown.text()){
            $(`.item${i}`)
                .addClass('bg-light')
                .text(timesArray[i] + ' ' + addInput.val())
                .append('<button type="button" class="btn btn-dark btn-sm m-2">X</button>');
            return;
        }
    }
}

$('').on('click', function(){
    console.log('d');
    console.log($(this));
    $(this).parent().hide();
})

// to append list item
addButton.on('click', function(){
    // saveEvent();
    appendEventItem();
});