var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "cat123",
  database: "bamazon_db"
});

function showAll (){
    connection.query ("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, result) {
        if (err) throw err;
       console.table(result);
        getOrder();
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
                        if (!value)  {
                            return 'THERE WAS AN ERROR IN QUANTITY, REVIEW LINE ABOVE';
                        }
                        return true;
                    }
                }
            ])
            .then(function (answer) {
                var order = answer.product;
                console.log('order: ', order);

                var quantity = answer.quantity;
                console.log('quantity: ', quantity);
                queryProduct(order, quantity);
                
            });
        });
}


function queryProduct (order, quantity) {
    var query = "SELECT product_name, price, stock_quantity FROM products WHERE product_name = '" + order+"'";
    var stockQuantity=0;
    connection.query(query, function (err, res) {
       // console.log(res);
        if (err) {console.log("Insufficient quantity");}
        //console.log("#5:"+JSON.stringify(res[0]));
        //console.log("#6:"+JSON.stringify(res[0]['stock_quantity']));
        stockQuantity = JSON.stringify(res[0]['stock_quantity']);
        price = JSON.stringify(res[0]['price']);
        //console.log(price);
        //console.log("#7:"+stockQuantity);
        checkIfEnough(order, quantity, stockQuantity);
    });
    
}
function checkIfEnough(order, quantity, stockQuantity) {
    //console.log("did I get here?");
    
         if (stockQuantity>=quantity){
           // console.log("93:"+stockQuantity);
            //console.log("94:"+order);
            // var query = "UPDATE products SET stock_quantity= " + (stockQuantity - quantity) + " WHERE product_name=" + order;
            var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_name= ?"; 
            //console.log("query"+query);
            connection.query(query, [quantity, order], function (err) {
                if (err) throw err;
            console.log('paid: $'+price);
            console.log("Your order is complete");
            connection.end();
            });
        }
   
     else { console.log("Insufficient quantity");
        inquirer
        .prompt("Insufficient quantity!");
         //setTimeout(function(){ showAll(); }, 2000);
        connection.end();
    }

}

