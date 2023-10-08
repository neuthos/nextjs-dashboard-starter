import { Tooltip } from 'antd';

const EditIcon = ({ onClick, toolTipMsg }: any) => {
  if (toolTipMsg) {
    return (
      <>
        <Tooltip placement="top" title={toolTipMsg} arrow={true}>
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="currentColor"
            className="cursor-pointer"
            onClick={onClick}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.9749 13.0531C28.0489 11.9793 29.79 11.9794 30.8639 13.0533C31.9378 14.1272 31.9378 15.8684 30.8639 16.9423L19.023 28.7776L18.9737 28.8269C18.3092 29.4915 17.9127 29.8881 17.459 30.2124C17.0567 30.5001 16.6239 30.7426 16.1686 30.9357C15.431 31.2485 14.6115 31.4289 13.8842 31.5889C13.6651 31.6372 13.4543 31.6835 13.2567 31.7311C13.0151 31.7894 12.7602 31.7241 12.5764 31.5568C12.3925 31.3895 12.3034 31.142 12.3386 30.8959C12.3613 30.7374 12.3826 30.5703 12.4048 30.3971C12.4962 29.6827 12.6009 28.8646 12.863 28.1116C13.0537 27.5639 13.3141 27.043 13.6379 26.5618C14.0032 26.0191 14.471 25.5513 15.255 24.7674L15.3135 24.7089L26.9749 13.0531C26.975 13.0531 26.9749 13.0532 26.9749 13.0531ZM29.8032 14.1139C29.3151 13.6258 28.5236 13.6258 28.0355 14.1139L26.5932 15.5555L28.3585 17.3257L29.8032 15.8817C30.2914 15.3935 30.2914 14.6021 29.8032 14.1139ZM27.2976 18.3861L25.5323 16.6159L16.3741 25.7696C16.3741 25.7696 16.3742 25.7696 16.3741 25.7696C15.5145 26.6292 15.1568 26.9915 14.8823 27.3993C14.6305 27.7735 14.4279 28.1787 14.2797 28.6047C14.1222 29.0572 14.0384 29.5254 13.9672 30.0327C14.5428 29.9034 15.0734 29.7709 15.5829 29.5548C15.9371 29.4046 16.2737 29.2159 16.5866 28.9922C16.9275 28.7484 17.2341 28.4452 17.9624 27.7169L27.2976 18.3861Z"
              fill="#2D353C"
            />
          </svg>
        </Tooltip>
      </>
    );
  }

  return (
    <>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="currentColor"
        className="cursor-pointer"
        onClick={onClick}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.9749 13.0531C28.0489 11.9793 29.79 11.9794 30.8639 13.0533C31.9378 14.1272 31.9378 15.8684 30.8639 16.9423L19.023 28.7776L18.9737 28.8269C18.3092 29.4915 17.9127 29.8881 17.459 30.2124C17.0567 30.5001 16.6239 30.7426 16.1686 30.9357C15.431 31.2485 14.6115 31.4289 13.8842 31.5889C13.6651 31.6372 13.4543 31.6835 13.2567 31.7311C13.0151 31.7894 12.7602 31.7241 12.5764 31.5568C12.3925 31.3895 12.3034 31.142 12.3386 30.8959C12.3613 30.7374 12.3826 30.5703 12.4048 30.3971C12.4962 29.6827 12.6009 28.8646 12.863 28.1116C13.0537 27.5639 13.3141 27.043 13.6379 26.5618C14.0032 26.0191 14.471 25.5513 15.255 24.7674L15.3135 24.7089L26.9749 13.0531C26.975 13.0531 26.9749 13.0532 26.9749 13.0531ZM29.8032 14.1139C29.3151 13.6258 28.5236 13.6258 28.0355 14.1139L26.5932 15.5555L28.3585 17.3257L29.8032 15.8817C30.2914 15.3935 30.2914 14.6021 29.8032 14.1139ZM27.2976 18.3861L25.5323 16.6159L16.3741 25.7696C16.3741 25.7696 16.3742 25.7696 16.3741 25.7696C15.5145 26.6292 15.1568 26.9915 14.8823 27.3993C14.6305 27.7735 14.4279 28.1787 14.2797 28.6047C14.1222 29.0572 14.0384 29.5254 13.9672 30.0327C14.5428 29.9034 15.0734 29.7709 15.5829 29.5548C15.9371 29.4046 16.2737 29.2159 16.5866 28.9922C16.9275 28.7484 17.2341 28.4452 17.9624 27.7169L27.2976 18.3861Z"
          fill="#2D353C"
        />
      </svg>
    </>
  );
};

export default EditIcon;
