
function Arr_obj() {

const UserObj={
    name:"Suraj",
    age:22,
    city:"Delhi",
}
const UserArr=["Suraj","Ankit","Rohit","Aman"];
    return (
        <div>
            <h1>{UserObj.age}</h1>
            <h1>{UserArr[0]}</h1>
        </div>
    );
}

export default Arr_obj;