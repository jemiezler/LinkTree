import { PartialType } from '@nestjs/mapped-types';
import { LinkItemDto } from './create-link-user.dto';

export class UpdateLinkDto extends PartialType(LinkItemDto) {}
