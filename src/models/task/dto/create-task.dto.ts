import { User } from "../../user/entities/user.entity";

export class CreateTaskDto {
    name: string;
    content: string;
    owner: User;
}
