const add_task = document.getElementById("add")
const save = document.getElementById("save_modal")
const result = document.getElementById("result")
const delete_modal = document.getElementById("delete_modal")
const pagination = document.getElementById("pagination")

let current_page = 1
let product_per_page = 2

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

async function saveProduct() {
    try {
        let method = form.id ? "PUT" : "POST";
        let url = form.id ? `${baseUrl}/${form.id}` : baseUrl;
        
        let response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        if (response.ok) {
            form = {};
            document.getElementById('modal').style.display = 'none';
            getProducts();
        }
    } catch (error) {
        console.log(error);
    }
}

async function getProducts(){
    try{
        const response = await fetch(`${baseUrl}`)
        product = await response.json()
        displayProduct()
        paginationProduct()
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
    let start_index = (current_page - 1) * product_per_page
    let end_index = start_index + product_per_page
    let pagination_product = product.slice(start_index, end_index)
    pagination_product.forEach((item) => {
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
                <button class="edit_hero" onclick="editProduct('${item.id}')">edit</button>
                <button class="delete_hero" onclick="deleteProduct('${item.id}')">delete</button>
            </div>
        </div>
        `
    })
}

function paginationProduct(){
    pagination.innerHTML = ""
    let page_count = Math.ceil(product.length / product_per_page)
    for(let i = 1; i <= page_count; i++){
        let btn = document.createElement("button")
        btn.innerText = i
        if (i === current_page) btn.classList.add("active")
        btn.addEventListener('click', function() {
            current_page = i
            displayProduct()
            paginationProduct()
        });
        pagination.appendChild(btn)
    }
}

async function deleteProduct(id){
    try{
        await fetch(`${baseUrl}/${id}`,{
            method: "DELETE"
        })
        getProducts(); 
    }catch(error){
        console.log(error);
    }
}

async function editProduct(id) {
    let obj = product.find((item) => item.id == id);
    
    if (obj) {
        form = { ...obj }; 
        document.querySelector("input[name='name']").value = form.name
        document.querySelector("input[name='color']").value = form.color
        document.querySelector("input[name='year']").value = form.year
        document.querySelector("input[name='brand']").value = form.brand
        document.querySelector("input[name='fuel']").value = form.fuel
        document.querySelector("input[name='horsepower']").value = form.horsepower
        document.querySelector("input[name='transmission']").value = form.transmission
        document.querySelector("input[name='condition']").value = form.condition
        document.querySelector("input[name='price']").value = form.price
    
        modal.style.display = 'block'; 
    }
}

    
   
   



