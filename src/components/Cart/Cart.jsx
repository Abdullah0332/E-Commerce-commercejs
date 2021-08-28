import React from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link, useLocation } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCard = () => (
    <Typography variant="subtitle1">
      You have no item in your shopping cart, start adding some! {"  "}
      <Link to="/" className={classes.link}>
        Start Adding Some
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h6">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="medium"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="medium"
            type="button"
            variant="contained"
            color="primary"
          >
            Check Out
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items)
    return <h1 style={{ marginTop: "100px" }}>Loading...</h1>;

  return (
    <Container>
      <br />
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant="h4">
          Your Shopping Cart
        </Typography>
        <br />
        <br />
        {!cart.line_items.length ? <EmptyCard /> : <FilledCart />}
      </div>
    </Container>
  );
};

export default Cart;
