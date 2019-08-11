var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "cat123",
  database: "bamazon_db"
});
var getResult;
function showAll (){
    connection.query ("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, result) {
        if (err) throw err;
       console.table(result);
        getResult = result;
        console.log("first quantity",result);
    });
}
showAll();

function getOrder() {

    connection.query("SELECT  product_name FROM products", function (err, result) {
        var productNames = [];
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            productNames.push(element.product_name);
        }        
        inquirer
            .prompt([
                {
                    name: "product",
                    type: "list",
                    message: "What would you like to buy?",
                    choices: productNames
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How namy items do you want to buy?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                var order = answer.product;
                console.log('order: ', order);

                var quantity = answer.quantity;
                console.log('quantity: ', quantity);
                
                var getResult = queryProduct(order, quantity);
                console.log("getResult: "+getResult);
                checkIfEnough(order, quantity, getResult);
                
            });
        });
}
getOrder();

function queryProduct (order, quantity) {
    var query = "SELECT product_name, price, stock_quantity FROM products WHERE product_name = '" + order + "' and stock_quantity >= " + quantity;
    var stockQuantity=0;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("#5"+JSON.stringify(res[0]));
        console.log("#6"+JSON.stringify(res[0]['stock_quantity']));
        stockQuantity = JSON.stringify(res[0]['stock_quantity']);
        return stockQuantity;
    });
    console.log("#7"+stockQuantity);
    
}
function checkIfEnough(order, result, quantity) {

    if (quantity >= result ) {
        inquirer
            .prompt("Insufficient quantity!");
    } else {
        var query = "update products set stock_quantity=" + result - quantity + "where product_name=" + order;
        inquirer
            .prompt("Your Order is complete!");
    }
}