import Rating from "../../Elements/Rating";
import { RateProps, ReduxState } from "../../../utils/interfaces";
import { notify } from "../../../utils/notifications";
import { rateEvent } from "../../../store/events";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";

const Rate = ({ rating, creator, _id }: RateProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );

  const handleRate = (newRating: number) => {
    if (creator?._id === currentUser?._id) {
      notify("You can't rate your own event.");
    } else {
      _id && dispatch(rateEvent?.({ id: _id, rating: newRating }));
    }
  };

  return (
    <>
      {rating ? (
        <Rating
          rating={rating}
          handleRate={handleRate}
          margin={".5rem 0 0 0"}
        />
      ) : null}
    </>
  );
};

export default Rate;
