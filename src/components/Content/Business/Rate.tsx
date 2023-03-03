import Rating from "../../Elements/Rating";
import { RateProps, ReduxState } from "../../../utils/interfaces";
import { notify } from "../../../utils/notifications";
import { rateBusiness } from "../../../store/businesses";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";

const Rate = ({ rating, creator, _id }: RateProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );

  const handleRate = (newRating: number) => {
    if (creator?._id === currentUser?._id) {
      notify("You can't rate your own business.");
    } else {
      _id && dispatch(rateBusiness?.({ id: _id, rating: newRating }));
    }
  };

  return (
    <>{rating ? <Rating rating={rating} handleRate={handleRate} /> : null}</>
  );
};

export default Rate;
