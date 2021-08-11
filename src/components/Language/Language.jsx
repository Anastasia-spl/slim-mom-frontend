import { useState } from 'react';

const Language = () => {
  const [isFlag, setFlag] = useState(true);
  const handleChangeLanguage = () => {
    isFlag ? setFlag(false) : setFlag(true);
  };
  const isFlagRussia = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9 6"
      width="18"
      height="12"
    >
      <rect fill="#fff" width="9" height="3" />
      <rect fill="#d52b1e" y="3" width="9" height="3" />
      <rect fill="#0039a6" y="2" width="9" height="2" />
    </svg>
  );
  const isFlagUkraine = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
      <rect width="18" height="12" fill="#005BBB" />
      <rect width="18" height="12" y="6" fill="#FFD500" />
    </svg>
  );
  return (
    <div onClick={handleChangeLanguage}>
      {isFlag ? isFlagRussia : isFlagUkraine}
    </div>
  );
};

export default Language;
