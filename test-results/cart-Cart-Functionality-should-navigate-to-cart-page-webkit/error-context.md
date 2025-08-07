# Page snapshot

```yaml
- banner:
  - link "Shop":
    - /url: /
  - textbox "Buscar Productos ..."
  - button "Shopping cart with 1 items":
    - img
    - text: "1"
- main:
  - heading "Your Cart" [level=1]
  - paragraph: 1 item in your cart
  - text: Qty Product Total
  - button "Increase quantity": +
  - text: "1"
  - button "Decrease quantity": −
  - img "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
  - heading "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops" [level=3]
  - paragraph: $109.95 each
  - text: $109.95
  - button "Remove Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops from cart":
    - img
  - heading "Order Summary" [level=3]
  - paragraph: 1 item
  - text: $109.95
  - paragraph: Total
  - link "Continue Shopping":
    - /url: /
    - button "Continue Shopping"
  - button "Clear Cart"
  - button "Checkout"
- status: Added Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops to cart
- alert
```