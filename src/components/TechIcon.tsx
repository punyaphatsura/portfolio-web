import { baseTechIcons } from '@assets/tech';
import Image from 'next/image';
import React, { FC } from 'react';

interface Props {
  tech: string;
}

const TechIcon: FC<Props> = ({ tech }) => {
  return (
    <Image
      alt={tech}
      className="mr-2 size-8 object-contain transition-transform hover:scale-125 active:scale-90 md:mr-3 md:size-10"
      src={baseTechIcons.filter((b) => b.name === tech)[0]?.icon}
    />
  );
};

export default TechIcon;
