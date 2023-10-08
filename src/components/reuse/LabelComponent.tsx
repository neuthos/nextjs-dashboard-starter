import dynamic from 'next/dynamic';
import React from 'react';

interface LabelParam {
  label: string | any;
  description?: string;
  component?: any;

  type?: number;
}

const LabelComponent = ({
  label,
  component,
  description,
  type = 1,
}: LabelParam) => {
  if (type === 2) {
    return (
      <>
        {typeof label === 'string' ? (
          <p className="mb-2 text-[12px] font-bold text-[#627884]">{label}</p>
        ) : (
          label
        )}
        {description && (
          <p className="mb-2 text-[14px] font-bold text-[#2D353C]">
            {description}
          </p>
        )}
        {component}
      </>
    );
  }

  return (
    <>
      {typeof label === 'string' ? (
        <p className="mb-2 text-[12px] font-bold text-[#2D353C]">{label}</p>
      ) : (
        <div className="mb-2 text-[12px] font-bold text-[#2D353C]">{label}</div>
      )}
      {description && <p className="mb-2 text-[12px]">{description}</p>}
      {component}
    </>
  );
};

export default dynamic(() => Promise.resolve(LabelComponent));
