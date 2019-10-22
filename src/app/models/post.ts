export class Post {
    id: string;
    title: string;
    description: string;
    content: string;
    avartar: string;
    date_create: Number;
    date_update: Number;
    id_category: Number;
    slug: string;
    status: boolean;
    constructor(){
      this.status = false;
    }
  }