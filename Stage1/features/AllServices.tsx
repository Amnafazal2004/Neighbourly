"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Service {
  id: string; 
  title: string;
  description: string;
  authorId: string;
}

const AllServices = () => {
  const [services, setServices] = useState<Service[] | null>(null);

  const fetchServices = async () => {
    try {
      const response = await axios.get<{ success: boolean; services: Service[] }>(
        "/api/Services"
      );

      if (!response.data || !response.data.success) {
        console.error("Services not found");
        return;
      }
      setServices(response.data.services);
      console.log(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(()=>{
    fetchServices()
  },[])

  return (
    <div>
      {services && services.length > 0 ? (
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              {service.title} - {service.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No services loaded.</p>
      )}
    </div>
  );
};

export default AllServices;
