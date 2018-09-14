# MySQL-Bamazon
## MySQL Web Store Application

### **Setup**
1. Place the **MySQL_Bamazon** folder into your virtual machine and `vagrant up`
2. Run `vagrant ssh`, then `cd/var/code`
3. `cd` into the **MySQL-Bamazon** folder and run `npm install`
4. Start the application with `node bamazonCustomer.js`

When accessing the Customer application for **Bamazon**, the current store inventory will be displayed. Then the customer will be prompted to make an order by using a product SKU number and the amount desired. The application will query the database to verify that the product SKU exists, and that the product is in stock. If the quantity requested is more than is in stock, the customer will be informed and will be promted for another order. The database will be modified if an item is ordered and the connection will end.

### *Example Purchase:*
![full-function.gif](https://github.com/AndrewEHarding/MySQL-Bamazon/blob/master/readme-images/full-function.gif?raw=true)

Bamazon will validate user inputs. Both will be checked to be a number, and the item SKU will return `false` if not in inventory.

### *Validation:*
![validation.gif](https://github.com/AndrewEHarding/MySQL-Bamazon/blob/master/readme-images/validation.gif?raw=true)