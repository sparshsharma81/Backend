
var arr = [1,2,4,5,6,7];
// arr.forEach(function(val){
// console.log(val + " hello world")});
// here we used for each function in js 


//map used to return a new type of array...
 var ans = arr.map((val)=>{ //in the an there is an array created which will return 13 at every index
    return 13;


 });//map baiscally use hota hai jab ham apne array se ek aur array create karna chahte hai....
//  console.log(ans); this will print the ans which is map of array 


var filter_ans = arr.filter((val)=>{
    if(val>=0){return true;}
    //else case likhne ki jarurat nahi hai..vo bydefault hi false hoga....
});
/////filter is used to filter out specific values and store them in an array
// console.log(filter_ans);


//index of --- basically this is used to search an element in the array....
//arr.indexof(323); --- -this will return -1 if the array is not present in that



// OBJECTS IN JS 
/*

basically kuch bhi left side me likha ho..aur kuch bhi right side me likha ho..aur vo sab curly bracket ke andar ho...

{
kuch bhi left side: kuch bhi right side,
hmesha left: hmesha right;
}

var store ={
kuch bhi left side: kuch bhi right side,
hmesha left: hmesha right;
}
var object = {
name : "sparsh",
age = 20;
}


if we do 
Object.freeze(obj); --- this will freeze the objects and no changes will be happen after that...

asynchrounous and synchronous code
 

asynchrounous --- line by line code chale..
