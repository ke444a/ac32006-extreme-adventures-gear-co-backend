interface IEmployee {
    id: number;
    name: string;
    phone_number: string;
    age: number;
    salary: number;
    hire_date: string;
    employment_type: "full_time" | "part_time";
    work_schedule_id: number;
    location_id: number;
    role: string;
    branch_id?: number;
}
