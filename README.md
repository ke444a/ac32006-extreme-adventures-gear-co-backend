# CRUD functionality description for each user role

### Sales representative
- Create new purchase with associated customer, branch, and employee
    * If it's a new customer, the customer entry should be added along with the purchase
- View all customers throughout the company
- View all customers of their particular branch
- View all purchases within their branch
    * Ability to filter out purchases by sales rep to see only purchases that they created
    * Ability to view purchase details (each purchase item with product details)
- Update purchase details in case of refund
- Update customer details
- Delete customer details
- Delete purchase details
    * They can only delete purchases that are associated with their branch


### Inventory manager
- Create new branch item
    * 'Branch item' refers to a product in the particular branch's inventory with a quantity
- View all branch items for their branch
- View upcoming shipments for their branch
- Update shipment status when it has arrived
- Update branch item quantity
- Delete branch item
    * Ability to delete branch item only if its quantity is 0


### Factory manager
- Create new shipment
- Create new manufactured product
- View all shipments made by their factory
- View all manufactured products made by their factory
- View all employees working in their factory
- Update shipment status
- Update manufactured product details
- Update employee details
- Delete shipment
- Delete manufactured product
- Delete employee


### CEO
- Create new employee
- Create new payroll for employees
- View all employees
- View payrolls
- View all payments
- View all purchases
    * Ability to filter out purchases by branch and/or sales rep
- Update payrolls
- Update employee details
- Delete payrolls
- Delete employee
