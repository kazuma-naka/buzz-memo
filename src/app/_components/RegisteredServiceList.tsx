type Service = {
  id: string;
  title: string;
  path: string;
};

interface RegisteredServicesProps {
  services: Service[];
}

export default function RegisteredServiceList({
  services,
}: RegisteredServicesProps) {}
