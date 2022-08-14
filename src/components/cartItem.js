import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart';

const CartItem = (props) => {
    const dispatch = useDispatch();

    const { title, quantity, total, price, id, image } = props.item;

    const removeItemHandler = () => {
        dispatch(cartActions.removeItemFromCart(id));
    };

    const addItemHandler = () => {
        dispatch(
            cartActions.addItemToCart({
                id,
                title,
                price,
                image
            })
        );
    };

    const RemoveAll = () => {
        dispatch(
            cartActions.removeAllFromCart(id)
        );
    }

    return (
        <>
            <div className="row mb-3 pr-4">
                <div className="col-4">
                    <img class="img-fluids thumb" src={image} alt=""></img>
                    <div className="mt-1">
                        <a href="/#" className="remove" onClick={RemoveAll}>Remove</a>
                    </div>
                </div>
                <div className="col-6">
                    <div className="col-12"><span className="items">{title}</span></div>
                    <div className="row mt-4">
                        <div className="col-4">
                            <button className="actions"><span onClick={removeItemHandler} className="actionItems">-</span></button>
                        </div>
                        <div className="col-2"><span className="quantity">{quantity}</span></div>
                        <div className="col-4">
                            <button className="actions"><span onClick={addItemHandler} className="actionItemsb">+</span></button>
                        </div>
                    </div>
                </div>
                <div className="col-2 mt-6 ">
                    <span className="quantity"> ${total.toFixed(2)}{' '}</span>
                </div>
            </div>

        </>
    );
};

export default CartItem;
