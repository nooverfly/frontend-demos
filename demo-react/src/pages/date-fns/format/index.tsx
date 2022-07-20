import { format } from "date-fns";

const DateFnsFormat = () => {
  return <div>{format(new Date(), "yyyy-MM-dd")}</div>;
};

export default DateFnsFormat;
