create database bamazon_db;
use bamazon_db;
create table products (
   item_id int auto_increment not null,
   product_name varchar (255),
   department_name varchar (255),
   price decimal (10.2),
   stock_quantity integer,
   primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ('purse', 'accessories', 100, 5),
('gloves', 'accessories', 15, 100),
('scarf', 'accessories', 60, 120),
('chair', 'furniture', 120, 200),
('ottoman', 'furniture', 80, 300),
('sofa', 'furniture', 800, 150),
('drawer', 'furniture', 60, 20),
('watch', 'accessories', 200, 20),
('coffee-maker', 'appliance', 150, 50),
('meat-grinder', 'appliance', 350, 50),
('wallet', 'accessories', 100, 100);

select * from products;
SELECT product_name, price, stock_quantity FROM products WHERE product_name = 'purse' and stock_quantity >= 5;
use bamazon_db;
select * from products;
 UPDATE products SET stock_quantity = 150 WHERE product_name='purse';
