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

function genPlaceholders(){
    let placeholderGroup = $('<div class="input-group mb-3 justify-content-center">')
        .addClass('placeholderContainer');
    for(let i = 0; i < timesArray.length; i++){
        let placeholderItem = $('<span class="input-group-text col-8" id="inputGroup-sizing-default">')
            .addClass('item' + i)
            .text(timesArray[i]);
        placeholderGroup.append(placeholderItem);
    }
    let clearAllButton = $('<button type="button" class="btn btn-primary col-5 m-5">')
        .addClass('clearAllBtn')
        .text('Clear All');
    placeholderGroup.append(clearAllButton);

    listContainer.append(placeholderGroup);

    $('.clearAllBtn').on('click', function(){
        localStorage.clear();
        $('.placeholderContainer').empty();
        genPlaceholders();
    })
}
genPlaceholders();


// functions --------------------------------------------------------------------------------------------------------------------

// append items from local storage to placeholders
function appendFromLocal(){
    if(localStorage.getItem("savedEvents") === null){
        return;
    }else{
        let localSavedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

        for(let j = 0; j < localSavedEvents.length; j++){
            for(let i = 0; i < timesArray.length; i++){
                if(timesArray[i] === localSavedEvents[j].time){
                    $(`.item${i}`)
                        .addClass('bg-light')
                        .text(timesArray[i] + ' - ' + localSavedEvents[j].event)
                }
            }
        }
        return;
    }
}
appendFromLocal();

// save user input to local storage
let savedEvents = [];
function saveEvent(){
    // Save related form data as an object
  let savedItem = {
    time: timeDropdown.text(),
    event: addInput.val()
  }

  savedEvents.push(savedItem);

  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
}

// append items to placeholders
function appendEventItem(){
    for(let i = 0; i < timesArray.length; i++){
        if(timesArray[i] === timeDropdown.text()){
            $(`.item${i}`)
                .addClass('bg-light')
                .text(timesArray[i] + ' - ' + addInput.val())
            return;
        }
    }
}

// to append list item
addButton.on('click', function(){
    // saveEvent();
    appendEventItem();
    saveEvent();
});