//2st
curl -X POST localhost:8123 
curl http://default:Prod%40123@localhost:8123/?database=report_dw&query=
SELECT op10.order_id,
op10.order_product_id,
op10.firstname,
op10.lastname,
op10.email,
op10.order_product_total,
op10.discount_value,
op10.convenience_charges,
op10.date_added,
op10.name,
op10.price,
op10.quantity,
op10.delivery_status,
op10.conversion_factor,
op10.total_voucher_amount,
op10.total_point_amount,
op10.total_payment_amount,
op10.total_point,
op10.order_type 
FROM 
(SELECT 
op9.OrderId AS order_id,
op9.OrderProductId AS order_product_id,
op9.FirstName AS firstname,
op9.LastName AS lastname,
op9.Email AS email,
op9.OrderProductTotal AS order_product_total,
op9.DiscountValue AS discount_value,
op9.ConvenienceCharges AS convenience_charges,
op9.DateAdded AS date_added,
op9.Name AS name,
op9.Price AS price,
op9.Quantity AS quantity,
op9.DeliveryStatus AS delivery_status,
op9.ClientId,
op9.CustomerId,
op9.OrderType AS order_type,
(op9.TotalVoucherPayment + op9.TotalCouponPayment + op9.TotalPointPayment + op9.TotalPayment - op9.ConvenienceCharges) AS TotalOrderPayment,
((op9.OrderProductTotal - op9.DiscountValue)/TotalOrderPayment) AS OrderConversionRate,
dxc.ConversionFactor AS conversion_factor,
round(OrderConversionRate*op9.TotalVoucherPayment,2) AS total_voucher_amount,
round(OrderConversionRate*op9.TotalPointPayment,2) AS total_point_amount,
round(OrderConversionRate*op9.TotalPayment,2) AS total_payment_amount,
round(total_point_amount/conversion_factor,2) AS total_point 
FROM 
(SELECT
op8.*,
ch.TotalCouponPayment 
FROM 
(SELECT 
op7.*,
vh.TotalVoucherPayment
FROM
(SELECT 
op6.*,
ph.TotalPointPayment 
FROM 
(SELECT 
op5.*,
multiIf(isNull(ExOrderId),'Voucher','Experience') as OrderType
FROM 
(SELECT
op4.*,
fact_plum_order_total_view.value AS ConvenienceCharges 
FROM 
(SELECT op3.*,
IF(op3.TotalAfterDiscount != 0,op3.TotalAfterDiscount,fact_plum_order_total_view.value) AS DiscountValue 
FROM 
(SELECT 
op2.*,
dim_plum_order_status_view.name AS OrderStatus 
FROM 
(SELECT fact_plum_order.client_id AS ClientId,
fact_plum_order.customer_id AS CustomerId,
fact_plum_order.date_added AS DateAdded,
fact_plum_order.delivery_status AS DeliveryStatus,
fact_plum_order.email AS Email,
fact_plum_order.firstname AS FirstName,
fact_plum_order.lastname AS LastName,
fact_plum_order.order_status_id AS OrderStatusId,
op1.*,
multiIf(fact_plum_order.total > 0, (abs(fact_plum_order.total)/fact_plum_order.currency_value),0) AS TotalPayment 
FROM 
fact_plum_order final INNER JOIN
(SELECT company_id,order_product_id AS OrderProductId,
groupArray(order_id)[1] AS OrderId,
groupArray(product_id)[1] AS ProductId,
groupArray(name)[1] AS Name,
groupArray(price)[1] AS Price,
groupArray(quantity)[1] AS Quantity,
groupArray(total)[1] AS OrderProductTotal,
groupArray(receiver_mobile_number)[1] AS ReceiverMobileNumber,
groupArray(order_product_status)[1] AS OrderProductStatus,
groupArray(product_discount)[1] AS ProductDiscount,
groupArray(total_after_discount)[1] AS TotalAfterDiscount FROM fact_plum_engage_order_to_company final inner join fact_plum_order_product_view ON fact_plum_engage_order_to_company.order_id = fact_plum_order_product_view.order_id WHERE company_id = 143 GROUP BY company_id,order_product_id) op1 ON op1.OrderId = fact_plum_order.order_id PREWHERE date_added_id between 20190101 AND 20191227) op2 LEFT JOIN dim_plum_order_status_view ON dim_plum_order_status_view.order_status_id = op2.OrderStatusId) op3 LEFT JOIN fact_plum_order_total_view ON fact_plum_order_total_view.order_id = op3.OrderId AND fact_plum_order_total_view.code = 'offer_discount') op4 LEFT JOIN fact_plum_order_total_view ON fact_plum_order_total_view.order_id = op4.OrderId AND fact_plum_order_total_view.code = 'convenience_charges') op5 LEFT JOIN (SELECT exp0.ExOrderId,exp1.ExperienceId FROM (select order_id AS ExOrderId,order_experience_id FROM fact_plum_xoxo_box_description PREWHERE created_date_id between 20190101 AND 20191227 WHERE order_experience_id > 0) exp0 INNER JOIN (select experience_id AS ExperienceId,order_id FROM fact_plum_order_experience final PREWHERE date_added_id between 20190101 AND 20191227) exp1 ON exp0.order_experience_id = toInt32(exp1.order_id)) exp ON toInt32(op5.OrderId) = exp.ExOrderId) op6 LEFT JOIN (select order_id AS PointsOrderId, ifNull(sum(abs(amount)),0) AS TotalPointPayment from fact_plum_points_history final PREWHERE date_added_id between 20190101 AND 20191227 group by order_id) ph ON op6.OrderId = ph.PointsOrderId) op7 LEFT JOIN (select order_id AS VoucherOrderId, ifNull(sum(abs(amount)),0) AS TotalVoucherPayment from fact_plum_voucher_history_view WHERE date_added_id between 20190101 AND 20191227 group by order_id) vh ON op7.OrderId = vh.VoucherOrderId) op8
	LEFT JOIN (select order_id AS CouponOrderId, ifNull(sum(abs(amount)),0) AS TotalCouponPayment from fact_plum_coupon_history final PREWHERE date_added_id between 20190101 AND 20191227 group by order_id) ch ON op8.OrderId = ch.CouponOrderId) op9 INNER JOIN (select company_id,gx_client_id,conversion_factor AS ConversionFactor FROM xc.company_id) op10 limit 5;dim_xoxoengage_company_view WHERE company_id = 143) dxc ON op9.company_id = d




SELECT count() 
FROM 
fact_plum_order final INNER JOIN
(SELECT company_id,order_product_id AS OrderProductId,
groupArray(order_id)[1] AS OrderId,
groupArray(product_id)[1] AS ProductId,
groupArray(name)[1] AS Name,
groupArray(price)[1] AS Price,
groupArray(quantity)[1] AS Quantity,
groupArray(total)[1] AS OrderProductTotal,
groupArray(receiver_mobile_number)[1] AS ReceiverMobileNumber,
groupArray(order_product_status)[1] AS OrderProductStatus,
groupArray(product_discount)[1] AS ProductDiscount,
groupArray(total_after_discount)[1] AS TotalAfterDiscount FROM fact_plum_engage_order_to_company final inner join fact_plum_order_product_view ON fact_plum_engage_order_to_company.order_id = fact_plum_order_product_view.order_id GROUP BY company_id,order_product_id) op1 ON op1.OrderId = fact_plum_order.order_id

SELECT count()
FROM fact_xoxoengage_orders FINAL
INNER JOIN fact_plum_order FINAL ON toUInt32OrZero(fact_xoxoengage_orders.third_party_order_id) = fact_plum_order.order_id