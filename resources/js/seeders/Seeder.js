define([
    'jquery',
    'underscore',
    'backbone',
    'models/MealModel'
], function($, _, Backbone, MealModel){

    var seedMeals = function(){

        var meals = [];

        meals.push(new MealModel({name: "Almondegas"}));
        meals.push(new MealModel({name: "Arroz de Frango"}));
        meals.push(new MealModel({name: "Arroz de Pato"}));
        meals.push(new MealModel({name: "Arroz de Polvo"}));
        meals.push(new MealModel({name: "Bacalhau com Natas"}));
        meals.push(new MealModel({name: "Bacalhau frito"}));
        meals.push(new MealModel({name: "Bifanas"}));
        meals.push(new MealModel({name: "Bifinhos grelhados"}));
        meals.push(new MealModel({name: "Filetes de pescada"}));
        meals.push(new MealModel({name: "Bolinhos de Bacalhau"}));
        meals.push(new MealModel({name: "Cachorros"}));
        meals.push(new MealModel({name: "Carne assada"}));
        meals.push(new MealModel({name: "Carne estufada"}));
        meals.push(new MealModel({name: "Costela"}));
        meals.push(new MealModel({name: "Costeletas"}));
        meals.push(new MealModel({name: "Empadão"}));
        meals.push(new MealModel({name: "Fêveras"}));
        meals.push(new MealModel({name: "Francesinha"}));
        meals.push(new MealModel({name: "Frango no churrasco"}));
        meals.push(new MealModel({name: "Frango assado"}));
        meals.push(new MealModel({name: "Frango frito"}));
        meals.push(new MealModel({name: "Grelhado misto"}));
        meals.push(new MealModel({name: "Hamburgers"}));
        meals.push(new MealModel({name: "Lasanha"}));
        meals.push(new MealModel({name: "Massa à Bolonhesa"}));
        meals.push(new MealModel({name: "Massa à Carbonara"}));
        meals.push(new MealModel({name: "Massa com Frango"}));
        meals.push(new MealModel({name: "Peixe Grelhado"}));
        meals.push(new MealModel({name: "Pizza"}));
        meals.push(new MealModel({name: "Quiche"}));
        meals.push(new MealModel({name: "Rissóis"}));
        meals.push(new MealModel({name: "Salmão"}));
        meals.push(new MealModel({name: "Strogonoff"}));

        var saveMeal = function(meals, i){
            if(typeof(meals[i]) != 'undefined'){
                meals[i].save(null, {success: function(){
                    i++;
                    saveMeal(meals, i);
                }});
            }else{
                return;
            }
        };
        saveMeal(meals, 0);
    };

    return {
        seedMeals: seedMeals
    };
});
