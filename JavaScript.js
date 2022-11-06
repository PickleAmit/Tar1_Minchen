//onload start function
function start() {
    let str = "";
    str += "<div>";
    str += "<h3>Dish Recipe details: </h3>";
    str += "<img src='https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/beef-pad-thai-43f58743.jpg' alt='Pad thai picture'>";
    str += "<p>dish name:pad thai</p>";
    str += "<p>Cooking method: blabla</p>";
    str += "<p>Total cooking time: 60 minutes</p>";
    str += "<p>total calories: 209</p>";
    str += "<button onclick='showIngredients(`pad thai`)' id='pad thai'>Show ingredients</button>";
    str += "</div>";
    document.getElementById("main").innerHTML = str;
    //on hover function
    $(".btnRound").mouseover(function () {
        $(this).css({ 'transform': 'rotate(360deg)' });
    });
    $(".btnRound").mouseleave(function () {
        $(this).css({ 'transform': 'rotate(0deg)' })
    })
}

//function addNewRecipe
function addNewRecipe() {
    let str = "";
    str += "<div id='simpleFormRec' style='display: block;'>";
    str += "<label for='recipeName'>Recipe name: </label><br><input type='text' id='recipeName'<br><br>";
    str += "<label for='recipeMethod'>Recipe cooking method:</label><br><input type'text' id='recipeMethod'<br><br>";
    str += "<label for='recipeTime'>Recipe cooking time:</label><br><input type='text' id='recipeTime'<br><br>";
    str += "<label for='recipeImage'>Recipe Image (URL):</label><br><input type='text' id='recipeImage'<br><br>";
    str += "<h3>Choose ingredients</h3>";
    str += "<div id='formGrid'>";
    for (var i = 0; i < ingredientJson.length; i++) {
        let name = ingredientJson[i].name;
        let image = ingredientJson[i].image
        str += "<label>";
        str += "add";
        str += "<input id='food_" + i + "' type='checkbox'>";
        str += "<div id='item" + i + "'>";
        str += "<p> ingredient details: </p>";
        str += "<img src='" + image + "' alt='" + name + " picture'";
        str += "<span>" + name + "</span><br>";
        str += "<span>calories: " + ingredientJson[i].calories + "</span>";
        str += "</div>";
        str += "</label>"
    }
    str += "</div>";
    str += "<button onclick='createRecepie()'>Create recipe</button>";
    str += "<button class='btnClose'>Close</button>";
    str += "<hr></div>";
    document.getElementById("simpleForm").innerHTML = str;
    closeForm(true);
}

//function addNewIngredient
function addNewIngredient() {
    let str = "";
    str += "<div id='simpleFormIng style='display: block;'>";
    str += "<label for='IngredientName'>Ingredient name: </label><br>";
    str += "<input type='text' id='IngredientName'><br><br>";
    str += "<label for='IngredientImage'>Ingredient Image (URL): </label><br>";
    str += "<input type='text' id='IngredientImage'><br><br>";
    str += "<label for='IngredientCalories'>Ingredient Calories: </label><br>";
    str += "<input type='text' id='IngredientCalories'><br><br>";
    str += "<button onclick='createIngredient()'>Create Ingredient</button>";
    str += "<button class='btnClose''>Close</button>";
    str += "<hr></div>";
    document.getElementById("simpleForm").innerHTML = str;
    closeForm(true);
}

//create Ingredient function
function createIngredient() {
    let ingredientName, ingredientImage, ingredientCalories;
    ingredientName = document.getElementById("IngredientName").value;
    ingredientImage = document.getElementById("IngredientImage").value;
    ingredientCalories = document.getElementById("IngredientCalories").value;
    let newIngredient = new Ingredient(ingredientJson.length + 1, ingredientName, ingredientImage, ingredientCalories);
    ingredientJson.push(newIngredient);
}

//close form Function
function closeForm(close) {
    //$(document).ready(function () {
    $(".btnClose").click(function () {
        $("#simpleForm").hide();
    });
    if (document.getElementById("simpleForm").style.display == "none" || document.getElementById("simpleForm").style.display == "") {
        $("#simpleForm").show();
    }
    else if (document.getElementById("simpleForm").style.display == "block") {
        $("#simpleForm").show();
    }
    //});
}

//create recipe
recipes = [{ name: 'pad thai', id: '0' }, { name: 'pad thai', id: 1 }, { name: 'pad thai', id: 2 }, { name: 'pad thai', id: 3 }];
function createRecepie() {
    let recipeName = document.getElementById("recipeName").value.toLowerCase();
    let cookingMethod = document.getElementById("recipeMethod").value;
    let recipeTime = document.getElementById("recipeTime").value;
    let recipeImage = document.getElementById("recipeImage").value;
    let totalCalories = 0;
    for (var i = 0; i < ingredientJson.length; i++) {
        if (document.getElementById(`food_${i}`).checked) {
            totalCalories += parseInt(ingredientJson[i].calories);
            //recipes[document.getElementById("recipeName").value].push({ name: ingredientJson[i].name, id: i });
            recipes.push({ name: recipeName, id: i });
        }
    }
    let str = "";
    str += "<div>";
    str += "<h3>Dish Recipe details: </h3>";
    str += `<img src='${recipeImage}' alt='${recipeName} picture'>`;
    str += `<p>dish name: ${recipeName}</p>`;
    str += `<p>Cooking method: ${cookingMethod}</p>`;
    str += `<p>Total cooking time: ${recipeTime} minutes</p>`;
    str += `<p>total calories: ${totalCalories}</p>`;
    str += `<button onclick="showIngredients('${recipeName}')" id="${recipeName}">Show ingredients</button>`;
    str += "</div>";
    document.getElementById("main").innerHTML += str;
    closeForm(true);
}

//show Ingredients

function showIngredients(recipeName) {
    let str = "";
    for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].name == recipeName) {
            let ingredientId = recipes[i].id;
            str += Render(ingredientJson[ingredientId].name, ingredientId);
        }
    }
    document.getElementById("popupElements").innerHTML = str;
    document.getElementById("popupModal").style.display = 'block';
    document.getElementById("popupModal").style.overflow = 'auto';
}

function closePopUp() {
    document.getElementById("popupModal").style.display = 'none';
}

//ingredients data

class Ingredient {
    constructor(id, name, image, calories) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.calories = calories;
    }
}
//render function -- Couldn't call it when it was inside class Ingredient
function Render(recipeName, ingredientId) {
    let str = "";
    str += "<div id='item" + ingredientId + "'>";
    str += "<p> ingredient details: </p>";
    str += "<img src='" + ingredientJson[ingredientId].image + "' alt='" + recipeName + " picture'";
    str += "<span>" + recipeName + "</span><br>";
    str += "<span>calories: " + ingredientJson[ingredientId].calories + "</span>";
    str += "</div>";
    return str;
}


const ingredientJson = [
    {
        id: 1,
        name: 'Broccoli',
        image: 'https://www.health.harvard.edu/media/content/images/p7_Broccoli_HH1812_gi905351392.jpg',
        calories: 34
    },
    {
        id: 2,
        name: 'Cauliflower',
        image: 'http://t3.gstatic.com/images?q=tbn:ANd9GcSeg3atgP35f83U_eFhOPcnD6-ZDUh19g0EhYvLjznjfW4p6tzcSyr1qLHAEA7Q0zPZSJqjUuX-XhQA2aLcggM',
        calories: 25
    },
    {
        id: 3,
        name: 'Noodles',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Fresh_ramen_noodle_001.jpg',
        calories: 138
    },
    {
        id: 4,
        name: 'Soy sauce',
        image: 'https://cdn.shopify.com/s/files/1/0206/9470/products/10683_HFARM_49645309-3_grande.jpeg?v=1441105440',
        calories: 12
    }
]

