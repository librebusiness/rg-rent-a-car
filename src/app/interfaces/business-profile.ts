export interface BusinessProfile {
    _id: string;
    user: string;
    businessName: string;
    slug: string;
    description: string;
    logo: string;
    contactNumber: string;
    email: string;
    address: string;
    country: string;
    state: string;
    city: string;
    services: string[];
    primary: boolean;
}