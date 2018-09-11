var cLog = console.log;

var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "SuperSecretPasswordHere",
  database: "bamazon"
});

function fullInventory() {
  cLog(`WELCOME TO BAMAZON, VALUED* CUSTOMER!`);
  connection.query('SELECT * FROM products', function(err, data) {
    if (err) throw err;

    cLog(`==========CURRENT INVENTORY==========`);
    for (var i = 0; i < data.length; i++){
      cLog(`SKU#: ${data[i].item_id} || Product: ${data[i].product_name} || Department: ${data[i].department_name} || Price: $${data[i].price} || In Stock: ${data[i].stock_quantity}`)
    }
    cLog(`==========^ ^ ^ ^ ^ ^ ^ ^============`);

  })

}

fullInventory();