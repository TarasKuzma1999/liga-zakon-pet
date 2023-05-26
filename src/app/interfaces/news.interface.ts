export interface News {
  ID: string;
  title: string;
  description: string;
  date: string;
  link: string;
  isTop: boolean;
  commentsCount: number;
  viewCount: number;
  tags: Tag[];
  image: string;
  imageSource: string;
  imageSmall: string;
  imageMiddle: string;
}

export interface Tag {
  title: string;
  url: string;
  id: string;
}
