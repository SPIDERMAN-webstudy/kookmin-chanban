import styles from "./styles.module.css";
const AgreeBtn = (props) => {
  return (
    <svg
      width="109"
      height="110"
      viewBox="0 0 109 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.agree}
      onClick={props.onClick}
    >
      <g filter="url(#filter0_d_583_302)">
        <circle cx="54.5" cy="52.5" r="49.5" fill="white" />
      </g>
      <g filter="url(#filter1_i_583_302)">
        <circle cx="54.5" cy="52.5" r="28" stroke="#B3D1FF" strokeWidth="9" />
      </g>
      <defs>
        <filter
          id="filter0_d_583_302"
          x="0"
          y="0.5"
          width="109"
          height="109"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.5" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_583_302"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_583_302"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_i_583_302"
          x="22"
          y="20"
          width="65"
          height="69"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_583_302"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default AgreeBtn;
