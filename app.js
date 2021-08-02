// // TO-DO-list
let alertvalue = document.getElementById("error")
let listItem = document.getElementById('list-item');
let db = firebase.firestore();

function addList() {
    let listItemDetails = {
        item: listItem.value,
        timeStamp: new Date()
    }

    db.collection("taskList").add(listItemDetails)
        .then((savedItem) => {
            console.log(savedItem, 'savedItem');
        });

}













function fetchAllLists() {
    db.collection("taskList")
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    let tasksObj = change.doc.data();
                    tasksObj.id = change.doc.id;
                    showListInDOM(tasksObj)
                }
                if (change.type === "removed") {
                    console.log("Removed list: ", change.doc.id);
                    removeListFromDOM(change.doc.id);
                }
                if (change.type === "modified") {
                    console.log("modified list: ", change.doc.id);
                    let tasksObj = change.doc.data();
                    tasksObj.id = change.doc.id;
                    updateListFromDOM(tasksObj);
                }

            });
        });
}

let allTasksUl = document.getElementById('all-tasks');

function showListInDOM(task) {
    let li = document.createElement('li');
    let taskText = document.createTextNode(task.item);
    li.appendChild(taskText)
    li.setAttribute('id', task.id)
    let btn = document.createElement('button');
    let btnText = document.createTextNode('delete');
    btn.setAttribute('onClick', 'deleteListItem(this)');
    btn.appendChild(btnText);


    let btnEdit = document.createElement('button');
    let btnTextEdit = document.createTextNode('Edit');
    btnEdit.setAttribute('onClick', 'editListItem(this)');
    btnEdit.appendChild(btnTextEdit);


    li.appendChild(btn);
    li.appendChild(btnEdit);

    allTasksUl.appendChild(li);
}


function deleteListItem(btnElement) {
    let docId = btnElement.parentNode.id;
    db.collection("taskList").doc(docId).delete()
        // .then(() => {
        //     removeListFromDOM(docId);
        // });
}


function removeListFromDOM(id) {
    let targetToRemove = document.getElementById(id);
    allTasksUl.removeChild(targetToRemove);
}


let addBtn = document.getElementById('add-btn');
let editDocId;

function editListItem(editBtnElement) {
    // console.log(editBtnElement.parentNode.id);
    editDocId = editBtnElement.parentNode.id;
    let editedText = editBtnElement.parentNode.firstChild.nodeValue;
    listItem.value = editedText;
    addBtn.innerHTML = 'Update';
    addBtn.setAttribute('onClick', 'updateListItem(this)');

}

function updateListItem(addBtnElement) {
    console.log(addBtnElement, listItem.value);
    db.collection('taskList').doc(editDocId).update({ item: listItem.value })
        .then(() => {
            listItem.value = "";
            addBtn.innerHTML = 'Add';
            addBtn.setAttribute('onClick', 'addList()');
            editDocId = undefined;
        })
        // listItem.value = "";
        // addBtn.innerHTML = 'Add';
        // addBtn.setAttribute('onClick', 'addList()');
        // editDocId = undefined;

}

function updateListFromDOM(modifiedEl) {
    let modifiedDOM = document.getElementById(modifiedEl.id);
    modifiedDOM.firstChild.nodeValue = modifiedEl.item;
}
