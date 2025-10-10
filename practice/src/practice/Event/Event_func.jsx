{/*In js function event like this ( onclick,onchange ), but in jsx function event 
    is like this ( onClick,onChange ), and this's called camelCase*/}

function Event_func() {

function handleclick() {
    alert("Button Clicked");
}

return (
    <div>  
         
    <button 
     onClick={() => handleclick()}>  {/*In this we do not call in function because function */}
     Click Me   {/*call like this handleclick() we are puting whole Arrow function in braket*/}
    </button>                         
     
    <button 
     onClick={handleclick}>   {/*In jsx we call function like this not like this handleclick()*/}
     Click Me
    </button>

    <button 
     onClick={() => alert("full function in button tag")}>
     Click Me
    </button>

    </div>
);
}

export default Event_func;