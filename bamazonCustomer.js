// Require NPM packages
var inquirer = require('inquirer');
var mysql = require('mysql');
// Set database connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "SuperSecretPasswordHere",
  database: "bamazon"
});
// This saves me so much time when debugging
var cLog = console.log;

function startBamazon() {
  cLog(`  `);
  cLog(`WELCOME TO BAMAZON, VALUED* CUSTOMER!`);
  // *May be subject to terms and conditions
  // All functions are wrapped in the connection query to have scope with data
  connection.query('SELECT * FROM products', function (err, data) {
    if (err) throw err;

    function skuValidation(value) {
      if (!isNaN(value) && parseInt(value) > 0 && parseInt(value) < data.length) {
        return true;
      }
      else {
        cLog(`  Not a SKU# in inventory!`);
        return false;
      }
    }

    function qntyValidation(value) {
      if (!isNaN(value) && parseInt(value) > 0) {
        return true;
      }
      else {
        cLog(`  Must be a valid number!`);
        return false;
      }
    }

    function displayInventory() {
      cLog(`  `);
      cLog(`==========CURRENT INVENTORY==========`);
      data.forEach(element => {
        cLog(`SKU#: ${element.item_id} || Product: ${element.product_name} || Price: $${element.price}`);
      });
      cLog(`==========^ ^ ^ ^ ^ ^ ^ ^============`);
      cLog(`  `);
      purchaseInquire();
    }

    function purchaseInquire() {
      inquirer.prompt([
        {
          type: "input",
          name: "sku",
          message: "What is the SKU number of the item you would like to purchase?",
          validate: skuValidation
        },
        {
          type: "input",
          name: "quantity",
          message: "How many would you like?",
          validate: qntyValidation
        }
      ]).then(function (input) {
        var quantity = input.quantity;
        // -1 to make the SKU selected match the array
        var sku = input.sku - 1;
        cLog(`Checking inventory for ${quantity} of SKU#${sku}...`);
        if (quantity > data[sku].stock_quantity) {
          cLog(`Insufficient quantity!`);
          cLog(`Would you like to make another order?`);
          purchaseInquire();
        }
        else {
          cLog(`Items in stock!`);

          connection.query(`UPDATE products SET ? WHERE ?`,
            [
              { stock_quantity: (data[sku].stock_quantity - quantity) },
              { item_id: sku }
            ],
            function (err, data) {
              if (err) throw err;

            });

          cLog(`Your order has been recieved. Your total is $${data[sku].price * quantity}.`);
          connection.end();
        }
      })
    }

    displayInventory();

  })
}

startBamazon();