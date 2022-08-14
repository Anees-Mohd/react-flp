import { useEffect, useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import { Shimmer } from 'react-shimmer'
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart';
import { useSelector } from 'react-redux';

let publicurl = process.env.REACT_APP_PUBLIC_URL;
let privateurl = process.env.REACT_APP_PRIVATE_URL;


const Popularmenu = () => {

    const cartItems = useSelector((state) => state.cart.items);

    const dispatch = useDispatch();
    const options =
    {
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 4,
            },
        },
    }
    const [popularMenu, setPopularMenu] = useState('');
    const [category, setCategory] = useState('pizza');
    const [categoryItems, setCategoryItems] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isItemsLoading, setItemsIsLoading] = useState(false);
    useEffect(() => {
        fetch(publicurl + 'category')
            .then((res) => res.json())
            .then((data) => {
                setPopularMenu(data.data);
                setIsLoading(true);
            }).catch((err) => {
                console.log('Error Occurred in Function Call  Event.');
            })
        return () => {
        }
    }, [isLoading, cartItems])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(publicurl + `category/${category}`, { signal })
            .then((res) => res.json())
            .then((data) => {
                setCategoryItems(data.data);
                setItemsIsLoading(true);
                console.log(categoryItems);
            }).catch((err) => {
                console.log('Error Occurred in Function Call Event.');
            })
        return () => {
            controller.abort();
        }
    }, [category])

    const handleLoad = (e) => {
        setCategory(e.target.id.replace('-tab', ''));
        setItemsIsLoading(false);
    }

    const addToCartHandler = (e) => {
        console.log(e.target.id);
        const item = categoryItems.find((item) => item.id === e.target.id);
        const { title, price, id, image } = item;
        dispatch(
            cartActions.addItemToCart({
                id,
                title,
                price,
                image
            })
        );
    };


    return (
        <div className="container mt-8">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <p className="flp-form-main-content"> Our Popular Menu </p>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <p className="flp-form-text-content"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </p>
                </div>
            </div>

            <div className="row">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {!isLoading && <div>Loading</div>}
                    {isLoading && popularMenu?.map((menu, index) => (
                        <li className="nav-item" key={menu.slug} id={menu.slug} onClick={handleLoad}>
                            <a className={index === 0 ? "nav-link active" : "nav-link"} id={menu.slug + "-tab"} data-toggle="tab" href={"#" + menu.slug} role="tab" aria-controls={menu.slug} aria-selected="true">
                                <img src={menu.icon} alt="img" id={menu.slug} className="menuIcon"></img> <span id={menu.slug} className="tabtext"> {menu.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="col-md-12">
                    {!isItemsLoading && <div className="row">
                        <div className="col-md-12 mt-4">
                            <div className="col-md-4">
                                {<Shimmer width={1000} height={300} />}
                            </div>

                        </div>
                    </div>
                    }
                    {isItemsLoading && (
                        <OwlCarousel items={4} className="owl-carousel-category" margin={8} {...options} autoplay={false} autoplayTimeout={5000} nav={true}>
                            {categoryItems.map((items) => (
                                <div className="mb-3 pad0" key={items.id} >
                                    <div className="image-card p-2">
                                        <div className="image-card-image">
                                            <img className="img-fluid thumb" src={items.image} alt="" />
                                        </div>
                                        <div className="image-card-body">
                                            <div className="imgtext p-1">
                                                <span>{items.title}</span>
                                            </div>
                                            <div className="imgtext p-1">
                                                <span className="yellowic">{items.currency}</span> {items.price}
                                            </div>
                                            <div className="imgtext p-1 pb-4 col-12">
                                                {cartItems.find((itm) => itm.id === items.id) ? (
                                                    <button key={items.id} className="addToCartBtn" id={items.id}> Added
                                                    </button>
                                                ) : (<>
                                                    <button className="addToCartBtn" id={items.id} onClick={addToCartHandler}> Add to Cart
                                                    </button>
                                                    <img className="addToCartIcon" alt="cart" src={privateurl + "assets/images/Cart without text.png"} id={items.id} onClick={addToCartHandler}></img>

                                                </>)}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>)
                    }
                </div>
            </div>
        </div >



    );
}

export default Popularmenu;