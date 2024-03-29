import {useEffect, useState} from "react";

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {chargePayment, getPublicKey} from "../../service/CRUDPayment";
import AddressForm from "./AddressForm";
import ReviewOrder from "./ReviewOrder";
import {getAuthUser} from "../../service/CRUDUsers";
import {useNavigate, useParams} from "react-router-dom";
import {useAuthHeader, useIsAuthenticated} from "react-auth-kit";
import {getTravelPackageByRoomId, verifyPeriodOfTime} from "../../service/CRUDTravelPackages";
import {getRoomById} from "../../service/CRUDRooms";

const Payment = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [currentRoom, setCurrentRoom] = useState(null);
    const [currentTravelPackage, setCurrentTravelPackage] = useState(null);
    const {city, housingName, travelType, room, checkIn, checkOut, price} = useParams();

    const [personalInfo, setPersonalInfo] = useState({
        email: "",
        phoneNumber: "",
        name: "",
        check_in: checkIn,
        check_out: checkOut,
        bought: false,

        country: "",
        county: "",
        city: "",
        amount: 0,

        travelType: travelType,
        userId: {},
        roomId: room
    });

    const [authUser, setAuthUser] = useState({});
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    const token = useAuthHeader();

    useEffect(() => {
        getPublicKey().then((publishableKey) => {
            setStripePromise(loadStripe(publishableKey.key));
        })
    }, []);

    useEffect(() => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        if ((checkOutDate.getTime() - checkInDate.getTime()) < 0) {
            navigate("/error");
        }

        if (travelType === "travelPackage"){
            verifyPeriodOfTime(room, checkIn, checkOut).then(res => {
                if (!res){
                    navigate("/error");
                } else {
                    getTravelPackageByRoomId(room, checkIn, checkOut).then(travelPackage => {
                        setCurrentTravelPackage(travelPackage);
                    })
                }
            })
        } else {
            getRoomById(room).then(room => {
                setCurrentRoom(room);
            })
        }

        if (!isAuth()) {
            navigate("/login");
        }

        getAuthUser(token()).then((user) => {
            setAuthUser(user);
        })
    }, []);

    useEffect(() => {
        if (personalInfo.name.trim().length !== 0 && personalInfo.name.trim().includes(" ") && personalInfo.email !== "" && personalInfo.phoneNumber !== ""
            && personalInfo.city !== "" && personalInfo.country !== "" && personalInfo.county !== ""){
            chargePayment(personalInfo).then((clientSecret) => {
                setClientSecret(clientSecret.key);
            })
        } else {
            setClientSecret("");
        }
    }, [personalInfo]);

    return (
        <div className="col-12 text-center">
            <div className="col-12 row d-flex justify-content-center">
                <div className="col-5">
                    <AddressForm data={personalInfo} dataCallback={setPersonalInfo} user={authUser} travelPackage={currentTravelPackage} room={currentRoom}/>
                </div>
                <div className="col-5">
                    <ReviewOrder personalInfo={personalInfo}/>
                </div>
            </div>

            <div className="col-5 align-items-center text-center m-0 d-inline-block">
                    <h3 className="mb-4">Payment details</h3>
                    {clientSecret && stripePromise && (
                        <Elements stripe={stripePromise} options={{clientSecret}}>
                            <CheckoutForm reservationData={personalInfo} travelType={travelType} roomId={room} checkIn={checkIn} checkOut={checkOut}/>
                        </Elements>
                    )}
            </div>
        </div>
    );
}

export default Payment;