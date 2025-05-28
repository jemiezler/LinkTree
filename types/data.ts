type Link = {
  _id: string;
  name: string;
  link: string;
};

type User = {
  name: string;
  role: string;
  image: string;
  link: Link[];
};