
//JSX means JavaScript XML or JavaScript Syntax Extension. 
//Its help to write html and js in react.

function Jsxmean() { 
    
const username="Suraj";
let a=21, b=19;

function fruit(){
    return "Mango";
}
function add(x,y){
    return x+y;
}
  return (
    <div>
        {username}
        <h1>Sum is {a+b}</h1>
        <button onClick={()=>{
            alert("Hello "+username);
        }}> Click Me</button>

        <h1>My fav fruit is {fruit()}</h1>
        <h1>Addition is {add(10,20)}</h1>
    </div>
  );
}
export default Jsxmean;