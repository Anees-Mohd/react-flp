import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui';
import { useSelector } from 'react-redux';
let privateurl = process.env.REACT_APP_PRIVATE_URL;
let publicurl = process.env.REACT_APP_PUBLIC_URL;

const Home = () => {
    const dispatch = useDispatch();
    const [stats, setStats] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    useEffect(() => {
        fetch(publicurl + 'contact')
            .then((res) => res.json())
            .then((data) => {
                setStats(data.data);
                setIsLoading(true);
            }).catch((err) => {
                console.log('Error Occurred in Function Call Cantact Event.');
            })
        return () => {
        }
    }, [])


    const toggleCartHandler = () => {
        dispatch(uiActions.toggle());
    };

    return (
        <>
            <div className="flp-tp-region pb-5">
                <div className="container ">
                    <div className="flp-menubar mt-5 d-inline-block">
                        <div className="row">
                            <div className="col-lg-3 col-md-3  col-sm-12"  >
                                <img src={privateurl + 'assets/images/Logo with text.png'} className="img-fluid-header flp-logo" alt="logo" />
                            </div>
                            <div className="col-lg-5 col-md-5  col-sm-12">
                                <ul className="flp-menu mt-2">
                                    <li>Home</li>
                                    <li>Form</li>
                                    <li>Menu</li>
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-4  col-sm-12">
                                <button className="btn btnLogin">Log In</button>
                                <img src={privateurl + "assets/images/Cart without text.png"} onClick={toggleCartHandler} className="img-fluid-header flp-cart mt-1 mr-5" alt="cart" />
                                <span className="badge">{cartItems?.length}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flp-header-home">
                        <section>
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-sm-12">
                                    <div className="mt-8">
                                        <p className="mt-5 flp-home-main-content" >Different Spice For A Different Taste</p>
                                        <p className="mt-3 flp-home-text-content">Lorem Ipsum dolor sit amet consectrtur adipiscing elit, nulla enim posuere quis consequat</p>
                                        <div className="flp-header-btn-content mt-5">
                                            <button className="btn btnStarted" >GET STARTED</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-7 col-sm-12">
                                    <img src={privateurl + "assets/images/Header image.png"} className="img-fluid-main flp-home" alt="main" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-7 col-md-7 col-sm-12">
                                    <img src={privateurl + "assets/images/Grass.png"} className="img-fluid-header flp-grass" alt="logo" />
                                </div>
                            </div>

                        </section>
                    </div>
                    <div className="flp-stats mt-4 ">
                        <section>
                            <div className="row " >
                                {!isLoading && <div>Loading..</div>}
                                {isLoading && stats?.map((stat, index) => (
                                    <div className="col-lg-4 col-md-4 col-sm-12 " key={index}>
                                        <div className={index % 2 === 0 ? 'stats m-0.5 white' : 'stats m-0.5 yellow'} >
                                            <img class="img-stat thumb" src={stat.icon} alt=""></img>
                                            <p className="statDesc">{stat.description}</p>
                                            <p className="statTitle pb-4">{stat.title} </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>


                </div>
            </div >
        </>
    )
}

export default Home;