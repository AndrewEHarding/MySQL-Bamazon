var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "SuperSecretPasswordHere",
  database: "bamazon"
});
var cLog = console.log;

function startBamazon() {
  cLog(`WELCOME TO BAMAZON, VALUED* CUSTOMER!`);
  connection.query('SELECT * FROM products', function (err, data) {
    if (err) throw err;


    function validation(value) {
      if (!isNaN(value) && parseInt(value) > 0 && parseInt(value) < data.length) {
        return true;
      }
      else {
        return false;
      }
    }

    function displayInventory() {
      cLog(`==========CURRENT INVENTORY==========`);
      cLog(`  `);
      data.forEach(element => {
        cLog(`SKU#: ${element.item_id} || Product: ${element.product_name} || Price: $${element.price}`);
      });
      cLog(`  `);
      cLog(`==========^ ^ ^ ^ ^ ^ ^ ^============`);
      purchaseInquire();
    }

    function purchaseInquire() {
      inquirer.prompt([
        {
          type: "input",
          name: "sku",
          message: "What is the SKU number of the item you would like to purchase?",
          validate: validation
        },
        {
          type: "input",
          name: "quantity",
          message: "How many would you like?",
          validate: validation
        }
      ]).then(function (input) {
        cLog(input.sku);
        cLog(input.quantity);
      })
    }
    
    displayInventory();

  })
}

startBamazon();