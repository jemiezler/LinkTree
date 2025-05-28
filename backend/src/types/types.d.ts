export type LinkType = {
  _id: Types.ObjectId;
  name: string;
  link: string;
};
export type UserType = {
  name: string;
  role: string;
  image: string;
  link: LinkType[];
};
