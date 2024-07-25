import { prisma } from "@/lib/prisma";
import { Prisma, Tag } from "@prisma/client";
import { TagRepository } from "../tag-repository";

export class PrismaTagRepository implements TagRepository {
  async create(data: Prisma.TagCreateInput): Promise<Tag> {
    return prisma.tag.create({ data });
  }

  async findById(tagId: string): Promise<Tag | null> {
    return prisma.tag.findUnique({ where: { id: tagId } });
  }

  async findAll(): Promise<Tag[]> {
    return prisma.tag.findMany();
  }

  async update(tagId: string, data: Prisma.TagUpdateInput): Promise<Tag> {
    return prisma.tag.update({
      where: { id: tagId },
      data,
    });
  }

  async delete(tagId: string): Promise<Tag> {
    return prisma.tag.delete({ where: { id: tagId } });
  }
}
