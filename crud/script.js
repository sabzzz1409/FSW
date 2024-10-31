// initial data
var cars=[
    {brand:"Audi",image:'assests/obj1.png',price:2000,qty:1},
    {brand:"Mini cooper",image:'assests/obj2.png',price:3000,qty:2},
    {brand:"BMW",image:'assests/obj3.png',price:4000,qty:3},
    {brand:"Polo",image:'assests/obj4.png',price:5000,qty:5},
    {brand:"Thar",image:'assests/obj5.png',price:6000,qty:5},
    {brand:"Jaguar",image:'assests/obj6.png',price:7000,qty:6}
]
// memory keep
var memo
// final display of image
function filterCars(dataS){
    let res=dataS
  
    box.addEventListener('input',()=>{
        res = dataS.filter(car=>car.brand.includes(box.value))
        memo = res
        renderCars(res)
    })

    if(memo==null){
        renderCars(res)
    }else{
        res=memo
        renderCars(res)
    }
}
// rendering and filling of data
function renderCars(productData){
    root.innerHTML=productData.map((element,index)=>{
        return(`
            <tr>
                <td>${index+1}</td>
                <td>${element.brand}<i class="fa-solid fa-pen" data-brand="${element.brand}" data-action="nameEdit"></i></td>
                <td><img src='${element.image}' width="50px" height="50px"/><i class="fa-solid fa-pen" data-brand="${element.brand}" data-action="imageEdit"></i></td>
                <td>
                    <i class="fa-solid fa-minus" data-brand="${element.brand}" data-action="decrement"></i>
                    ${element.qty}
                    <i class="fa-solid fa-plus" data-brand="${element.brand}" data-action="increment"></i>
                </td>
                <td>&#8377;${element.price.toFixed(2)}<i class="fa-solid fa-pen" data-brand="${element.brand}" data-action="priceEdit"></i></td>
                <td>&#8377;${(element.qty*element.price).toFixed(2)}</td>
                <td><i class="fa-solid fa-trash text-danger" data-brand="${element.brand}" data-action="deletion"></i></td>
                <td><i class="fa-solid fa-pen" data-brand="${element.brand}" data-action="Edit"></i></td>
            </tr>
        `)
    }).join('')
    let grandTotal=productData.reduce((sum,car)=>sum+(car.qty*car.price),0)
    total.innerHTML=`&#8377;${grandTotal.toFixed(2)}`
}
//main
document.addEventListener('DOMContentLoaded',filterCars(cars))
// any changes to table
root.addEventListener('click',function(event){
    const target=event.target
    let brand=target.dataset.brand
    const action=target.dataset.action

    if(action==='increment'){
        cars.find(car=>car.brand==brand).qty++
    }
    else if(action==='decrement' && cars.find(car=>car.brand==brand).qty>0){
        cars.find(car=>car.brand==brand).qty--
    }
    else if(action==='deletion'){
        cars=cars.filter(car=>car.brand!=brand)
        if(memo!=null){
            memo=memo.filter(car=>car.brand!=brand)
        }
    }
    else if(action=='nameEdit'){
        while(true){
            let newName = prompt("Enter Name")
            if(newName!=''){
                cars.find(car=>car.brand==brand).brand=newName
                break
            }
            else{
                alert("Enter Properly")
            }
        }
    }
    else if(action=='imageEdit'){
        while(true){
            let newpic = prompt("Enter image Url")
            if(newpic!=''){
                cars.find(car=>car.brand==brand).image=newpic
                break
            }
            else{
                alert("Enter Properly")
            }
        }
    }
    else if(action=='priceEdit'){
        while(true){
            let newPrice = prompt("Enter Price")
            if(newPrice!=''){
                cars.find(car=>car.brand==brand).price=parseFloat(newPrice)
                break
            }
            else{
                alert("Enter Properly")
            }
        }
    }
    else if(action=='Edit'){
        while(true){
            let newName = prompt("Enter Name")
            let newpic = prompt("Enter image Url")
            let newPrice = prompt("Enter Price")
            if(newName&&newpic&&newPrice){
                cars.find(car=>car.brand==brand).brand=newName
                brand = newName
                cars.find(car=>car.brand==brand).image=newpic
                cars.find(car=>car.brand==brand).price=parseFloat(newPrice)
                break
            }
            else{
                alert("Enter Properly")
            }
        }
    }
    filterCars(cars)
    
})
// to add data
function fill(){
    inpBrand = prompt('Enter Car Name...')
    inpImage = prompt('Enter Car Image URL...')
    inpPrice = parseFloat(prompt('Enter Car price...'))
    inpQty = parseInt(prompt('Enter Car Quantity...'))
    if(inpBrand&&inpImage&&inpPrice&&inpQty){
        let newCar={brand: inpBrand,
            image: inpImage,
            price: inpPrice,
            qty: inpQty}
        cars.push(newCar)
        filterCars(cars)
    }else{
        alert("fill the data properly")
    }
}

 // renderCars << filterCars,memo <= initial data << main
// click to action 
// butt