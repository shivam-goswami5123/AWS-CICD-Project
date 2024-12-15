let addBtn=document.getElementById("add");
let clearBtn=document.getElementById("clear");
let clearAllBtn=document.getElementById("clearAll");
let noteContainer=document.getElementsByClassName("note-container")[0];
let temp="Empty ToDo List"
let count=0;

window.onload=()=>{
    count=localStorage.getItem("size");
    document.getElementById("input-text").value="";
}

addBtn.addEventListener('click',addNote);
clearBtn.addEventListener('click',clearRecentNote);
clearAllBtn.addEventListener('click',clearAllNote);

function addNote(){
    let inputText=document.getElementById("input-text").value;
    count=count+1;
    localStorage.setItem("size",count);
    localStorage.setItem(`note${count}`,inputText);
    let task=document.createElement("div");
    task.style.border="2px solid green";
    task.innerHTML=localStorage.getItem(`note${count}`);
    if(count-1==0)
    {
        noteContainer.innerHTML="";
    }
    noteContainer.appendChild(task);
    document.getElementById("input-text").value="";
}

function clearRecentNote(){
    localStorage.removeItem(`note${count}`);
    if(count>0)
    {
    count=count-1;
    }
    localStorage.setItem("size",count);
    noteContainer.removeChild(noteContainer.lastElementChild);
}

function clearAllNote(){
    localStorage.clear();
    count=0;
    noteContainer.innerHTML=temp;
}

localStorage.clear();

