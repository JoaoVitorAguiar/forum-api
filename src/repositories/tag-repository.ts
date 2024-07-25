import { Prisma, Tag } from "@prisma/client";

export interface TagRepository {
  create(data: Prisma.TagCreateInput): Promise<Tag>;
  findById(tagId: string): Promise<Tag | null>;
  findAll(): Promise<Tag[]>;
  update(tagId: string, data: Prisma.TagUpdateInput): Promise<Tag>;
  delete(tagId: string): Promise<Tag>;
}
