import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessesByCurrentUser } from "../../redux/business.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteBusinessModal from "../DeleteBusinessModal";

const ManageBusinesses = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const businesses = useSelector((state) =>
        Object.values(state.businessState)
            ? Object.values(state.businessState)
            : []
    );

    useEffect(() => {
        dispatch(getBusinessesByCurrentUser());
    }, [dispatch]);

    const defaultimage =
        "https://pbs.twimg.com/media/FgfRWcSVsAEi6y2?format=jpg&name=small";

    const priceToDollarSign = (price) => "$".repeat(price);

    console.log("LOOK HERE =>>>>:", businesses);

    return (
        <div>
            <div className="manage-businesses-header">
                <h1>Manage Your Businesses</h1>
                <Link to="/businesses/new">
                    <button>Create a New Business</button>
                </Link>
            </div>

            <div className="business-container-manage-businesses">
                {businesses.map(
                    ({
                        id,
                        BusinessImages,
                        name,
                        city,
                        state,
                        price,
                        avgRating,
                    }) => {
                        const imageUrl =
                            BusinessImages && BusinessImages.length > 0
                                ? BusinessImages[0].url
                                : defaultimage;

                        const priceSigns = priceToDollarSign(price);

                        return (
                            <span
                                key={id}
                                className="business-manage-businesses"
                                title={`This is the tooltip: ${name}`}
                            >
                                <Link to={`/businesses/${id}`}>
                                    <img src={imageUrl} alt={name} />

                                    <div className="business-details-manage-businesses">
                                        <div> {name} </div>
                                        <span>
                                            {city}, {state}
                                        </span>
                                        <span>
                                            {avgRating ? (
                                                <>
                                                    <FaStar />{" "}
                                                    {avgRating.toFixed(2)}
                                                </>
                                            ) : (
                                                <>
                                                    <FaStar />
                                                    {" 0.00 (New)"}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    <span>{priceSigns}</span>
                                </Link>

                                <div>
                                    <Link to={`/businesses/${id}/edit`}>
                                        <button>Update</button>
                                    </Link>
                                    <button>
                                        <OpenModalMenuItem
                                            itemText="Delete"
                                            modalComponent={
                                                <DeleteBusinessModal
                                                    businessId={id}
                                                />
                                            }
                                        />
                                    </button>
                                </div>
                            </span>
                        );
                    }
                )}
            </div>
        </div>
    );
};

export default ManageBusinesses;
