export interface User {
    _id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    gender: string;
    phone: string;
    photoURL: string;
    country: string;
    state: string;
    city: string;
    address: string;
    zipCode: string;
    occupation: string;
    licensePhotoFront: string;
    licensePhotoBack: string;
    licenseExpires: Date;
    documentType: string;
    documentNumber: string;
    documentPhotoFront: string;
    documentPhotoBack: string;
    roles: string[];
    remarks: string;
}
