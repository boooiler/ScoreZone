import { IconProps } from "../model/icon"

const IconArrowSort = ({ variant }: IconProps) => {

  switch (variant) {
  case 'filled':
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.71998 8.71495L6.21398 4.21995V4.22095C6.34097 4.09394 6.50932 4.01671 6.68843 4.00331C6.86754 3.98991 7.04551 4.04124 7.18998 4.14795L7.27498 4.21995L11.779 8.71395C11.9123 8.84779 11.9901 9.02699 11.9971 9.21575C12.004 9.40451 11.9394 9.58893 11.8163 9.73215C11.6931 9.87538 11.5205 9.96686 11.3328 9.98833C11.1451 10.0098 10.9563 9.95967 10.804 9.84795L10.72 9.77595L7.49698 6.55895L7.49798 19.255C7.49794 19.4363 7.43216 19.6116 7.31283 19.7482C7.19351 19.8848 7.02871 19.9735 6.84898 19.998L6.74798 20.005C6.56674 20.0049 6.39163 19.9393 6.25505 19.8202C6.11846 19.7011 6.02962 19.5365 6.00498 19.357L5.99698 19.255V6.55695L2.77998 9.77495C2.65299 9.90197 2.48463 9.9792 2.30553 9.9926C2.12642 10.006 1.94845 9.95467 1.80398 9.84795L1.71998 9.77495C1.59296 9.64796 1.51573 9.47961 1.50233 9.3005C1.48894 9.12139 1.54026 8.94342 1.64698 8.79895L1.71998 8.71495Z" fill="#179C4F"/>
        <path d="M17.15 4.007L17.25 4C17.4312 4.00001 17.6073 4.06564 17.7439 4.18477C17.8805 4.30389 17.9693 4.46845 17.994 4.648L18 4.75V17.446L21.219 14.225C21.346 14.0977 21.5146 14.0203 21.6939 14.0069C21.8732 13.9935 22.0514 14.045 22.196 14.152L22.28 14.224C22.4072 14.351 22.4846 14.5196 22.498 14.6989C22.5114 14.8783 22.4599 15.0564 22.353 15.201L22.281 15.285L17.784 19.785C17.657 19.912 17.4886 19.9892 17.3095 20.0026C17.1304 20.016 16.9524 19.9647 16.808 19.858L16.724 19.786L12.22 15.286C12.0854 15.1523 12.0065 14.9727 11.9991 14.7832C11.9917 14.5937 12.0564 14.4084 12.1801 14.2647C12.3038 14.1209 12.4774 14.0294 12.6659 14.0085C12.8543 13.9876 13.0437 14.0389 13.196 14.152L13.28 14.224L16.5 17.442V4.75C16.5 4.56846 16.5659 4.39311 16.6855 4.25648C16.805 4.11985 16.97 4.03121 17.15 4.007Z" fill="#C62424"/>
      </svg>

    )
  case 'outlined':
    return (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6.288 4.293-3.995 4-.084.095a1 1 0 0 0 .084 1.32l.095.083a1 1 0 0 0 1.32-.084L6 7.41V19l.007.117a1 1 0 0 0 .993.884l.117-.007A1 1 0 0 0 8 19V7.417l2.293 2.29.095.084a1 1 0 0 0 1.319-1.499l-4.006-4-.094-.083a1 1 0 0 0-1.32.084ZM17 4.003l-.117.007a1 1 0 0 0-.883.993v11.58l-2.293-2.29-.095-.084a1 1 0 0 0-1.319 1.498l4.004 4 .094.084a1 1 0 0 0 1.32-.084l3.996-4 .084-.095a1 1 0 0 0-.084-1.32l-.095-.083a1 1 0 0 0-1.32.084L18 16.587V5.003l-.007-.116A1 1 0 0 0 17 4.003Z" fill="#ffffff"/></svg>
    )
  default:
    return null
  }
}

export default IconArrowSort