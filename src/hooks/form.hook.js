import { useState } from "react";

const useForm = () => {
  const [formList, setFormList] = useState(null);
  return { formList, setFormList };
}

export default useForm;
