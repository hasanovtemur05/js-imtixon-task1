const add_task = document.getElementById("add")
const save = document.getElementById("save_modal")
const result = document.getElementById("result")
const delete_modal = document.getElementById("delete_modal")
let form = {}
let product = []
let baseUrl = "http://localhost:3000/avto"
document.addEventListener('DOMContentLoaded', function(event){
    event.preventDefault()
    const modal = document.getElementById('modal');
    add_task.addEventListener('click', () => {
        modal.style.display = 'block';
    });
     save.addEventListener("click", saveProduct)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    getProducts()
});

delete_modal.addEventListener("click", function(){
    modal.style.display = "none"
})

 async function saveProduct(){
    try{
        let response = await fetch(`${baseUrl}`,{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)

    })
   
    
    }catch(error){
        console.log(error);
        
    }
}

async function getProducts(){
    try{
        const response = await fetch(`${baseUrl}`)
        product = await response.json()
        displayProduct()
    }catch(error){
        console.log(error);
        
    }
}

function handleChange(event){
    const {name, value} = event.target
    form = {...form, [name] : value}

}

function displayProduct(){
    result.innerHTML = ""
    product.forEach((item) => {
        result.innerHTML += `
        <div id="hero">
            <h1 class="title_hero">${item.name}</h1>
            <p class="desc">Color: <span class="item">${item.color}</span></p>
            <p class="desc">Brand: <span class="item">${item.brand}</span></p>
            <p class="desc">Feul: <span class="item">${item.fuel}</span></p>
            <p class="desc">Horsepower: <span class="item">${item.horsepower}</span></p>
            <p class="desc">Transmission: <span class="item">${item.transmission}</span></p>
            <p class="desc">Condition: <span class="item">${item.condition}</span></p>
            <p class="desc">Price: <span class="item">${item.price}</span></p>
            <div class="btns">
                <button class="edit_hero">edit</button>
                <button class="delete_hero" onclick="deleteProduct("${item.id}")">delete</button>
            </div>
        </div>
        `
        
     
    })
    
}

async function deleteProduct(id){
    try{
        await fetch(`${baseUrl}/${id}`,{
            method: "DELETE"
        })
    }catch(error){
        console.log(error);
        
    }
}
