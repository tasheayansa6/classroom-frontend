import {
  BaseRecord,
  DataProvider,
  GetListParams,
  GetListResponse,
  GetOneParams,
  GetOneResponse,
} from "@refinedev/core";

import { Subject } from "../types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "CS",
    description:
        "An introductory course covering the fundamental concepts of computer science and programming.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    department: "Math",
    description: "Advanced study of integration, sequences, series, and power series.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    code: "ENG102",
    name: "Literature and Composition",
    department: "English",
    description:
        "A course focused on critical reading and writing through the study of various literary genres.",
    createdAt: new Date().toISOString(),
  },
];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
                                                           resource,
                                                         }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource === "subjects") {
      return {
        data: MOCK_SUBJECTS as unknown as TData[],
        total: MOCK_SUBJECTS.length,
      };
    }

    return {
      data: [] as TData[],
      total: 0,
    };
  },

  getOne: async <TData extends BaseRecord = BaseRecord>({
                                                          resource,
                                                          id,
                                                        }: GetOneParams): Promise<GetOneResponse<TData>> => {
    if (resource === "subjects") {
      const subject = MOCK_SUBJECTS.find((s) => s.id === Number(id));
      if (!subject) throw new Error("Subject not found");
      return { data: subject as unknown as TData };
    }
    throw new Error("Resource not found in mock");
  },

  create: async () => {
    throw new Error("This function is not implemented in mock");
  },

  update: async () => {
    throw new Error("This function is not implemented in mock");
  },

  deleteOne: async () => {
    throw new Error("This function is not implemented in mock");
  },

  getApiUrl: () => "",
};
