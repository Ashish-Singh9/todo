const d = new Date();
var a=document.getElementById("time");
a.innerHTML+= d.getDate();
a.innerHTML += "/"+(d.getMonth() + 1);
a.innerHTML +="/" +d.getFullYear();

var btn=document.getElementById('add');
var rmv=document.getElementById('remove');
var pa=document.getElementById('To_do_cont');
var inp=document.getElementById('inpt');
let stored_todo = localStorage.getItem("todos");
var to_do_arr=[];

if(stored_todo)
{
    to_do_arr = JSON.parse(stored_todo);
}

to_do_arr.forEach(function(todo)
{
    addToDom(todo);
})


    //when enter is being click
    inp.addEventListener('keyup',function(event){
        var to_do=inp.value;
        if(event.keyCode === 13 && to_do)
        {
            create_addText(to_do);
            inp.value = "" 
        }
        
    })
    pa.addEventListener('click',delete_check);
    function delete_check(e){
        const item=e.target;
        //console.log(item.parentElement.children[0].innerText);
        
        if(item.classList[0]==="remove")
        {
            const parent=item.parentElement;
            var index = to_do_arr.indexOf(item.parentElement.children[0].innerText);
            //console.log(index);
            to_do_arr.splice(index, 1);
           // console.log(to_do_arr);
            localStorage.setItem("todos", JSON.stringify(to_do_arr) );
            parent.remove();
            
        }
    }
    function create_addText(to_do){
         
          
          //for removing directly onclicking of li element
          
          to_do_arr.push(to_do);
          localStorage.setItem("todos", JSON.stringify(to_do_arr) );
          addToDom(to_do);
          

    }

    function addToDom(to_do){
        const div=document.createElement('div');
          const li=document.createElement('li');
          li.classList.add('lii');
          div.classList.add('list_items');
          const label=document.createElement('label');
          const input=document.createElement('input');
          const span=document.createElement('span');

          li.innerText=to_do;

          var bt=document.createElement('button');
          bt.classList.add('remove');
          bt.classList.add('border');
          bt.innerHTML="X";

          label.classList.add('container');
          input.setAttribute('type','checkbox');
          span.classList.add('checkmark');
          span.addEventListener("click",fun);
          label.appendChild(input);
          label.appendChild(span);


          div.appendChild(li);
          div.appendChild(label);
          div.appendChild(bt);
          pa.appendChild(div);
    }

    function fun(event)
    {
        if(!event.target.parentElement.children[0].checked==true)
        event.target.parentElement.parentElement.children[0].style.textDecoration = "line-through";
        else
        event.target.parentElement.parentElement.children[0].style.textDecoration = "none";
    }    
