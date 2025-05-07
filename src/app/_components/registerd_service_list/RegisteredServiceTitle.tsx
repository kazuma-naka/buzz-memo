'use client';

import MotionLink from '@/components/MotionLink';
import { Service } from '@/types/service';

interface RegisteredServiceTitleProps {
  service: Service;
}

export default function RegisteredServiceTitle({
  service,
}: RegisteredServiceTitleProps) {
  return (
    <MotionLink
      href={`/${service.path.toLowerCase().replace(/ /g, '_')}`}
      whileHover={{
        scale: 1.05,
        y: -2,
        color: '#91AFBB',
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="inline-block"
    >
      <span className="text-xl font-semibold">{service.title}</span>
    </MotionLink>
  );
}
