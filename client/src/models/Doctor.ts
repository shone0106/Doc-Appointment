export default interface Doctor {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    specialization: string;
    experience: string;
    feesPerCunsaltation: number;
    status?: string;
    timings: string;
}