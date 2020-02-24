import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.open,
    TaskStatus.inprogress,
    TaskStatus.done
  ]
  transform(value: any) {
    if(!this.isStatusAllowed(value)) {
      throw new BadRequestException(`无法将Task的状态更改为${value}`)
    }
    return value;
  }

  private isStatusAllowed(status: any) {
    return this.allowedStatus.includes(status)
  }
}