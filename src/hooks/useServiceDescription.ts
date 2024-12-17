import { useState, useEffect } from "react";
import SERVICE_DESCRIPTION from "../const";

export interface ServiceItem {
  id: number;
  imageUrl: string;
  content: string;
}

const useServiceDescription = (): ServiceItem[] => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const data: ServiceItem[] = SERVICE_DESCRIPTION;
    setServices(data);
  }, []);

  return services;
};

export default useServiceDescription;
