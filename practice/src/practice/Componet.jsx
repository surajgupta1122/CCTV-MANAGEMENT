function Componet() {
  return (<div>
    Hello its componet

  </div>
  );
}
export default Componet;

function Fruit() { //component
  return (<div>
     <h1>Banana{" "+sum()}</h1> {/*function call*/}
    </div>
    );
}

function sum() { //function
    return 2 + 2;
}
export {Fruit};