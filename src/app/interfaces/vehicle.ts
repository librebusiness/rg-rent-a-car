export interface Vehicle {
    _id: string;
    make: string;
    category: string;
    vehicleType: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    vin: string;
    mileage: number;
    pricePerDay: number;
    status: string;
    fuelType: string;
    transmissionType: string;
    seatingCapacity: number;
    features: string[];
    image: string;
    description: string;
    location: string;
    insuranceStatus: string;
    insuranceCompany: string;
    insuranceEndDate: Date;
    remarks: string;
}