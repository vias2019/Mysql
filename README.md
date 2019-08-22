# Mysql

________________________________________
<b>ABOUT THE APP</b>
Bamazon is an Amazon-like storefront based on the MySQL. The app will take in orders from customers and deplete stock from the store's inventory. 

Steps:
1. This application will first display all of the items available for sale including the ids, names, and prices of products for sale.

2. The app thrn prompts users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

3. Once the customer has placed the order, the application should check if the store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

   However, if yothe ur store _does_ have enough of the product, the customer's order will be fulfilled.
   * The SQL database will be updated to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.


__________________________________________________________________________________________
  <b>node test - initial run</b>
_________________________________________________________________________________

![image](/pictures/node_test.jpg)


_____________________________________________________________________________________

  <b>insufficient quantity</b>
_____________________________________________________________________________________
![image](/pictures/insufficient_quantity.jpg)


 _____________________________________________________________________________________	

  <b>user choice from drop-down menu and input of quantity</b>
_____________________________________________________________________________________
![image](/pictures/user_choice_input.jpg)
 

_____________________________________________________________________________________

  <b>complete order</b>
_____________________________________________________________________________________
 ![image](/pictures/complete_order.jpg)