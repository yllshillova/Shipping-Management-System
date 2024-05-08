﻿using Domain.Base;

namespace Domain.Entities.OrderAggregate
{
    public class OrderItem : EntityBase
    {
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
    }
}
