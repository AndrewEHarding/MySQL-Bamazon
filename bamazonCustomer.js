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

function purchaseInquire() {
  inquirer.prompt([
    {
      type: "input",
      name: "sku",
      message: "What is the SKU number of the item you would like to purchase?",
    },
    {

    }
  ]).then(function (input) {

  })

}

function fullInventory() {
  cLog(`WELCOME TO BAMAZON, VALUED* CUSTOMER!`);
  connection.query('SELECT * FROM products', function (err, data) {
    if (err) throw err;

    cLog(`==========CURRENT INVENTORY==========`);
    data.forEach(element => {
      cLog(`SKU#: ${element.item_id} || Product: ${element.product_name} || Price: $${element.price}`);
    });
    cLog(`==========^ ^ ^ ^ ^ ^ ^ ^============`);

  })

  purchaseInquire();

}

fullInventory();