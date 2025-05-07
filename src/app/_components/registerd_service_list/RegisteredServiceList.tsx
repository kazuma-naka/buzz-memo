import { Service } from '@/types/service';
import ServiceCard from './ServiceCard';

interface RegisteredServiceListProps {
  services: Service[];
}

export default function RegisteredServiceList({
  services,
}: RegisteredServiceListProps) {
  return (
    <div className="space-y-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
