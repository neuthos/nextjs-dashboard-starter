/* eslint-disable no-console */
import { useEffect, useState } from 'react';

interface CustomSwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: any;
  disabled?: boolean;
  noCheckFirst?: boolean;
}

const SwitchCustom = ({
  label,
  checked = false,
  onChange = console.log,
  disabled = false,
  noCheckFirst = true,
}: CustomSwitchProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const switchCheck = () => {
    if (!noCheckFirst) {
      setIsChecked(!isChecked);
    }
    onChange(!isChecked);
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div className={`flex items-center gap-x-2`}>
      <label className={`flex cursor-pointer items-center`}>
        {isChecked ? (
          <svg
            width="56"
            height="32"
            viewBox="0 0 56 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative"
          >
            <path
              d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5H40C48.5604 0.5 55.5 7.43959 55.5 16C55.5 24.5604 48.5604 31.5 40 31.5H16C7.43959 31.5 0.5 24.5604 0.5 16Z"
              fill="#7D44F1"
              stroke="#7D44F1"
            />

            <path
              d="M40 29C47.1797 29 53 23.1797 53 16C53 8.8203 47.1797 3 40 3C32.8203 3 27 8.8203 27 16C27 23.1797 32.8203 29 40 29Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M45.9725 11.4305C46.1768 11.6362 46.1757 11.9686 45.9699 12.1729L38.2161 19.8729C38.0114 20.0762 37.6809 20.0762 37.4762 19.8729L34.0301 16.4507C33.8243 16.2464 33.8232 15.914 34.0275 15.7082C34.2318 15.5025 34.5642 15.5013 34.7699 15.7056L37.8462 18.7605L45.2301 11.4279C45.4358 11.2236 45.7682 11.2247 45.9725 11.4305Z"
              fill="#2D353C"
            />
          </svg>
        ) : (
          <svg
            width="56"
            height="32"
            viewBox="0 0 56 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 16C0 7.16344 7.16344 0 16 0H40C48.8366 0 56 7.16344 56 16C56 24.8366 48.8366 32 40 32H16C7.16344 32 0 24.8366 0 16Z"
              fill="white"
            />
            <path
              d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5H40C48.5604 0.5 55.5 7.43959 55.5 16C55.5 24.5604 48.5604 31.5 40 31.5H16C7.43959 31.5 0.5 24.5604 0.5 16Z"
              stroke="black"
              strokeOpacity="0.2"
            />
            <path
              d="M16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29Z"
              fill="black"
              fillOpacity="0.2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.4287 11.4292C11.6337 11.2241 11.9661 11.2241 12.1711 11.4292L15.9999 15.2579L19.8287 11.4292C20.0337 11.2241 20.3661 11.2241 20.5711 11.4292C20.7762 11.6342 20.7762 11.9666 20.5711 12.1716L16.7424 16.0004L20.5711 19.8292C20.7762 20.0342 20.7762 20.3666 20.5711 20.5716C20.3661 20.7766 20.0337 20.7766 19.8287 20.5716L15.9999 16.7429L12.1711 20.5716C11.9661 20.7766 11.6337 20.7766 11.4287 20.5716C11.2236 20.3666 11.2236 20.0342 11.4287 19.8292L15.2574 16.0004L11.4287 12.1716C11.2236 11.9666 11.2236 11.6342 11.4287 11.4292Z"
              fill="#2D353C"
            />
          </svg>
        )}

        <input
          type="checkbox"
          className="absolute left-0 top-0 z-20 m-0 hidden h-full w-full "
          checked={isChecked}
          onChange={switchCheck}
          disabled={disabled}
        />
      </label>
      <p
        style={{
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '125%',
          letterSpacing: '-0.14px',
          color: disabled ? '#627884' : '#2D353C',
        }}
        className="text-[14px] text-[#]"
      >
        {label}
      </p>
    </div>
  );
};

export default SwitchCustom;
